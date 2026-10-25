import {accountMailConfigured,sendAccountMail} from "../../server/accountMail.js";
const json = (data, status = 200, headers = {}) => Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers } });
const fail = (message, status = 400) => { throw Object.assign(new Error(message), { status }); };
const hex = bytes => Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
const hash = async text => hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)));
const random = () => hex(crypto.getRandomValues(new Uint8Array(32)));
async function passwordHash(password, salt) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations: 100000 }, key, 256));
}
async function body(request) {
  if (!request.headers.get("Content-Type")?.includes("application/json")) fail("JSON required", 415);
  const reader = request.body?.getReader();
  if (!reader) fail("JSON required");
  const chunks=[];let size=0;
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>16000){await reader.cancel();fail("Request too large",413)}chunks.push(value)}
  const joined=new Uint8Array(size);let offset=0;for(const chunk of chunks){joined.set(chunk,offset);offset+=chunk.byteLength}
  const raw = new TextDecoder().decode(joined);
  try { const value = JSON.parse(raw); if (!value || Array.isArray(value) || typeof value !== "object") fail("Invalid JSON"); return value; } catch { fail("Invalid JSON"); }
}
const passwordValue = value => { if(typeof value !== "string" || value.length < 12 || value.length > 128 || !value.trim()) fail("Use a password of 12 to 128 characters"); return value; };
const emailValue = value => {const email=text(value,254).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fail("Enter a valid email");return email};
const mailReady = accountMailConfigured;
async function emailBudget(env,email,purpose){
  const now=Date.now(),key=await hash(`account-mail:${email}:${purpose}:${Math.floor(now/3600000)}`);
  const row=await env.PROFILES.prepare("INSERT INTO rate_limits(key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count").bind(key,now+3600000).first();
  if(row.count>3)return false;
  const daily=await env.PROFILES.prepare("INSERT INTO rate_limits(key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count").bind(`account-mail-global:${Math.floor(now/86400000)}`,now+86400000).first();
  return daily.count<=200;
}
async function sendAccountLink(env,account,purpose){
  if(!await emailBudget(env,account.email,purpose))return;
  const token=random(),digest=await hash(token),now=Date.now(),isReset=purpose==="reset";
  const origin=new URL(env.AUTH_PUBLIC_ORIGIN);
  if(origin.protocol!=="https:" || origin.pathname!=="/" || origin.search || origin.hash)throw Error("Invalid account origin");
  const link=new URL(isReset?"/reset-password":"/verify-email",origin);link.hash=`token=${token}`;
  await env.PROFILES.prepare("INSERT INTO account_tokens(token_hash,user_id,purpose,expires_at,created_at) VALUES (?,?,?,?,?)").bind(digest,account.id,purpose,now+(isReset?1800000:86400000),now).run();
  const action=isReset?"Reset your password":"Verify your email",expiry=isReset?"30 minutes":"24 hours";
  try{
    const result=await sendAccountMail(env,{from:{email:env.AUTH_EMAIL_FROM,name:"Atoma Engineering Labs"},to:account.email,subject:`${action} · Atoma`,text:`${action}\n\nOpen this link to continue:\n${link.href}\n\nThis link expires in ${expiry} and can be used once. If you did not request it, you can ignore this email. Atoma will never ask for your password by email.`,html:`<h1>${action}</h1><p><a href="${link.href}">${action}</a></p><p>This link expires in ${expiry} and can be used once. If you did not request it, ignore this email.</p><p>Atoma Engineering Labs will never ask for your password by email.</p>`});
    if(!result?.messageId)throw Error("Email not accepted");
  }catch{
    await env.PROFILES.prepare("DELETE FROM account_tokens WHERE token_hash=?").bind(digest).run();
    // Do not expose recipient addresses, tokens, or provider details to logs.
    console.error("Atoma account email delivery failed");
    throw Error("Account email delivery failed");
  }
}
const text = (value, max, min = 1) => { if (typeof value !== "string" || value.trim().length < min || value.length > max) fail("Invalid field length"); return value.trim(); };
async function user(request, env) {
  const token = request.headers.get("Cookie")?.match(/(?:^|; )atoma_session=([a-f0-9]{64})(?:;|$)/)?.[1];
  if (!token) fail("Sign in to continue", 401);
  const row = await env.PROFILES.prepare("SELECT users.id, users.name, users.email, users.email_verified_at FROM sessions JOIN users ON users.id=sessions.user_id WHERE token_hash=? AND expires_at>?").bind(await hash(token), Date.now()).first();
  if (!row) fail("Session expired. Sign in again", 401);
  return row;
}
async function limit(request, env, path) {
  const now = Date.now();
  const key = await hash(`${request.headers.get("CF-Connecting-IP") || "local"}:${path}:${Math.floor(now / 3600000)}`);
  const row = await env.PROFILES.prepare("INSERT INTO rate_limits(key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count").bind(key, now + 3600000).first();
  if (row.count > (path === "chat" ? 20 : 30)) fail("Hourly limit reached. Please try again later", 429);
}
export async function onRequest({ request, env, waitUntil }) {
  try {
    const url = new URL(request.url), path = url.pathname.replace(/^\/api\//, "");
    if (request.method === "POST") {
      if (request.headers.get("Origin") !== url.origin) fail("Origin rejected", 403);
      await limit(request, env, path);
      waitUntil(env.PROFILES.batch([env.PROFILES.prepare("DELETE FROM rate_limits WHERE expires_at<?").bind(Date.now()), env.PROFILES.prepare("DELETE FROM sessions WHERE expires_at<?").bind(Date.now()), env.PROFILES.prepare("DELETE FROM account_tokens WHERE expires_at<? OR consumed_at IS NOT NULL").bind(Date.now())]));
    }
    if (path === "health" && request.method === "GET") {
      await Promise.all([env.PROFILES.prepare("SELECT 1").first(), env.RESEARCH.prepare("SELECT 1").first()]);
      return json({ ok: true, ai: Boolean(env.AI), profiles: true, research: true });
    }
    if (path === "papers" && request.method === "GET") {
      const { results } = await env.RESEARCH.prepare("SELECT * FROM papers ORDER BY id DESC LIMIT 100").all();
      return json({ papers: results.map(p => ({ ...p, tags: JSON.parse(p.tags) })) });
    }
    if (path === "auth-status" && request.method === "GET") return json({ emailAvailable: mailReady(env) });
    if ((path === "forgot-password" || path === "resend-verification") && request.method === "POST") {
      const data=await body(request),email=emailValue(data.email);
      if(!mailReady(env))return json({error:"Account email delivery is being configured. Please try again later."},503);
      const account=await env.PROFILES.prepare("SELECT id,email,email_verified_at FROM users WHERE email=?").bind(email).first();
      // Always return the same response for known, unknown, verified, limited or failed delivery.
      if(account && (path === "forgot-password" || !account.email_verified_at)){
        waitUntil(sendAccountLink(env,account,path === "forgot-password"?"reset":"verify").catch(()=>{}));
      }
      return json({message:"Request received. If this address is eligible, check your inbox for a link. You can request another link later if needed."});
    }
    if ((path === "reset-password" || path === "verify-email") && request.method === "POST") {
      const data=await body(request);
      if(typeof data.token!=="string" || !/^[a-f0-9]{64}$/.test(data.token))fail("This link is invalid or expired. Request a new one.");
      const digest=await hash(data.token),purpose=path === "reset-password"?"reset":"verify",now=Date.now();
      const selector="SELECT user_id FROM account_tokens WHERE token_hash=? AND purpose=? AND consumed_at IS NULL AND expires_at>?";
      const query=(sql,values=[])=>env.PROFILES.prepare(sql).bind(...values,digest,purpose,now);
      const steps=[];
      if(purpose === "reset"){
        const password=passwordValue(data.password),salt=random();
        steps.push(query(`UPDATE users SET password_hash=?,salt=? WHERE id=(${selector})`,[await passwordHash(password,salt),salt]));
        steps.push(query(`DELETE FROM sessions WHERE user_id=(${selector})`));
      }else steps.push(query(`UPDATE users SET email_verified_at=? WHERE id=(${selector})`,[now]));
      steps.push(query(`UPDATE account_tokens SET consumed_at=? WHERE purpose=? AND user_id=(${selector}) RETURNING token_hash`,[now,purpose]));
      const results=await env.PROFILES.batch(steps);
      if(!results.at(-1).results?.some(row=>row.token_hash===digest))fail("This link is invalid or expired. Request a new one.");
      return json({message:purpose === "reset"?"Password updated. Sign in with your new password.":"Email verified. Your account now shows verified email ownership."},200,purpose === "reset"?{"Set-Cookie":"atoma_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0"}:{});
    }
    if (path === "profile" && request.method === "GET") return json({ user: await user(request, env) });
    if ((path === "signup" || path === "login") && request.method === "POST") {
      const data = await body(request), email = text(data.email, 254).toLowerCase(), password = passwordValue(data.password);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail("Enter a valid email");
      let account, credentialHash;
      if (path === "signup") {
        const name = text(data.name, 80), salt = random(), id = crypto.randomUUID();
        const existing = await env.PROFILES.prepare("SELECT id FROM users WHERE email=?").bind(email).first();
        if (existing) fail("Unable to create account. Try signing in", 409);
        credentialHash=await passwordHash(password,salt);
        await env.PROFILES.prepare("INSERT INTO users(id,email,name,password_hash,salt) VALUES (?,?,?,?,?)").bind(id,email,name,credentialHash,salt).run();
        account = { id, email, name, email_verified_at:null };
        // Signup remains usable if delivery is not configured or is temporarily down.
        if(mailReady(env))waitUntil(sendAccountLink(env,account,"verify").catch(()=>{}));
      } else {
        const row = await env.PROFILES.prepare("SELECT * FROM users WHERE email=?").bind(email).first();
        const candidate = await passwordHash(password, row?.salt || "missing-account-dummy-salt");
        if (!row || candidate !== row.password_hash) fail("Email or password is incorrect", 401);
        credentialHash=row.password_hash;
        account = { id: row.id, email: row.email, name: row.name, email_verified_at:row.email_verified_at };
      }
      const token = random();
      // A reset may happen while hashing a login password. Issue a session only
      // if the exact credential that was validated still belongs to this user.
      const issued=await env.PROFILES.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) SELECT ?,id,? FROM users WHERE id=? AND password_hash=? RETURNING user_id").bind(await hash(token),Date.now()+604800000,account.id,credentialHash).first();
      if(!issued)fail("Credentials changed. Sign in again with your current password.",401);
      return json({ user: account }, 200, { "Set-Cookie": `atoma_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800` });
    }
    if (path === "logout" && request.method === "POST") {
      const token = request.headers.get("Cookie")?.match(/atoma_session=([a-f0-9]{64})/)?.[1];
      if (token) await env.PROFILES.prepare("DELETE FROM sessions WHERE token_hash=?").bind(await hash(token)).run();
      return json({ ok: true }, 200, { "Set-Cookie": "atoma_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0" });
    }
    if (path === "bookmarks") {
      const account = await user(request, env);
      if (request.method === "GET") return json({ bookmarks: (await env.RESEARCH.prepare("SELECT paper_id FROM bookmarks WHERE user_id=?").bind(account.id).all()).results });
      if (request.method === "POST") {
        const data = await body(request), paper = text(data.paperId, 80);
        if (!await env.RESEARCH.prepare("SELECT id FROM papers WHERE id=?").bind(paper).first()) fail("Paper not found", 404);
        await env.RESEARCH.prepare("INSERT OR IGNORE INTO bookmarks(user_id,paper_id) VALUES (?,?)").bind(account.id, paper).run();
        return json({ ok: true });
      }
    }
    if (path === "contact" && request.method === "POST") {
      const data = await body(request), email = text(data.email, 254);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail("Enter a valid email");
      await env.PROFILES.prepare("INSERT INTO contacts(id,name,email,topic,message) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(), text(data.name,80), email, text(data.topic,80), text(data.message,5000)).run();
      return json({ ok: true });
    }
    if (path === "chat" && request.method === "POST") {
      const data = await body(request), message = text(data.message, 2000);
      let context = "";
      if (data.paperId) {
        const paper = await env.RESEARCH.prepare("SELECT * FROM papers WHERE id=?").bind(text(data.paperId,80)).first();
        if (!paper) fail("Paper not found",404);
        context = `Selected source: ${paper.title}. ${paper.summary} ${paper.abstract} URL: ${paper.url}. You have only an editorial note, not the full manuscript. Cite the URL and disclose that limitation.`;
      }
      const daily = await env.PROFILES.prepare("INSERT INTO rate_limits(key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count").bind(`ai-global:${Math.floor(Date.now()/86400000)}`,Date.now()+86400000).first();
      if(daily.count>200) fail("The public AI daily budget has been reached. Please return tomorrow",429);
      const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fp8", { messages: [{ role: "system", content: `You are Atoma's public guide. Be concise, helpful, and honest. Atoma Engineering Labs is an independent solo developer studio. Brigade is an interactive frontend preview, not a live agent executor. MadMind is a harness design; native Rust/Metal serving is in development. Hyperbolic KV is roadmap. Research Hub has a small curated database with source links, not a comprehensive index. Never invent benchmarks, sponsors, releases, or shipped capabilities. Do not claim tool access. Direct visitors to /brigade, /research-hub, /mission, or /contact. ${context}` }, { role: "user", content: message }], max_tokens: 450 });
      if (typeof result.response !== "string" || !result.response.trim()) fail("The AI is unavailable. Please try again", 503);
      return json({ reply: result.response });
    }
    return json({ error: "Endpoint not found" }, 404);
  } catch (error) { return json({ error: error.status ? error.message : "Service temporarily unavailable. Please try again." }, error.status || 503); }
}
