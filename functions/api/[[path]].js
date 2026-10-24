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
const text = (value, max, min = 1) => { if (typeof value !== "string" || value.trim().length < min || value.length > max) fail("Invalid field length"); return value.trim(); };
async function user(request, env) {
  const token = request.headers.get("Cookie")?.match(/(?:^|; )atoma_session=([a-f0-9]{64})(?:;|$)/)?.[1];
  if (!token) fail("Sign in to continue", 401);
  const row = await env.PROFILES.prepare("SELECT users.id, users.name, users.email FROM sessions JOIN users ON users.id=sessions.user_id WHERE token_hash=? AND expires_at>?").bind(await hash(token), Date.now()).first();
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
      waitUntil(env.PROFILES.batch([env.PROFILES.prepare("DELETE FROM rate_limits WHERE expires_at<?").bind(Date.now()), env.PROFILES.prepare("DELETE FROM sessions WHERE expires_at<?").bind(Date.now())]));
    }
    if (path === "health" && request.method === "GET") {
      await Promise.all([env.PROFILES.prepare("SELECT 1").first(), env.RESEARCH.prepare("SELECT 1").first()]);
      return json({ ok: true, ai: Boolean(env.AI), profiles: true, research: true });
    }
    if (path === "papers" && request.method === "GET") {
      const { results } = await env.RESEARCH.prepare("SELECT * FROM papers ORDER BY id DESC LIMIT 100").all();
      return json({ papers: results.map(p => ({ ...p, tags: JSON.parse(p.tags) })) });
    }
    if (path === "profile" && request.method === "GET") return json({ user: await user(request, env) });
    if ((path === "signup" || path === "login") && request.method === "POST") {
      const data = await body(request), email = text(data.email, 254).toLowerCase(), password = text(data.password, 128, 12);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail("Enter a valid email");
      let account;
      if (path === "signup") {
        const name = text(data.name, 80), salt = random(), id = crypto.randomUUID();
        const existing = await env.PROFILES.prepare("SELECT id FROM users WHERE email=?").bind(email).first();
        if (existing) fail("Unable to create account. Try signing in", 409);
        await env.PROFILES.prepare("INSERT INTO users(id,email,name,password_hash,salt) VALUES (?,?,?,?,?)").bind(id, email, name, await passwordHash(password, salt), salt).run();
        account = { id, email, name };
      } else {
        const row = await env.PROFILES.prepare("SELECT * FROM users WHERE email=?").bind(email).first();
        const candidate = await passwordHash(password, row?.salt || "missing-account-dummy-salt");
        if (!row || candidate !== row.password_hash) fail("Email or password is incorrect", 401);
        account = { id: row.id, email: row.email, name: row.name };
      }
      const token = random();
      await env.PROFILES.prepare("INSERT INTO sessions VALUES (?,?,?)").bind(await hash(token), account.id, Date.now() + 604800000).run();
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
