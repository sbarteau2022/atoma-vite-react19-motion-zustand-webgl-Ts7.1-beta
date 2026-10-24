import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Cloud, LockKeyhole } from "lucide-react";

const providers = [
  { key:"apple", label:"Apple", env:"VITE_OAUTH_APPLE_URL", glyph:"A" },
  { key:"google", label:"Google", env:"VITE_OAUTH_GOOGLE_URL", glyph:"G" },
  { key:"github", label:"GitHub", env:"VITE_OAUTH_GITHUB_URL", glyph:"GH" },
  { key:"cloudflare", label:"Cloudflare Access", env:"VITE_OAUTH_CLOUDFLARE_ACCESS_URL", glyph:"cloudflare" },
] as const;
type ProviderKey = typeof providers[number]["key"];

function OAuthOptions() {
  const [message,setMessage]=useState("");
  function start(provider: ProviderKey) {
    const item=providers.find(candidate=>candidate.key===provider)!;
    const envName=item.env as keyof ImportMetaEnv;
    const target=import.meta.env[envName];
    if (target) { window.location.assign(target); return; }
    setMessage(`${item.label} sign-in is scaffolded. Configure ${item.env} and the matching OAuth callback before enabling accounts.`);
  }
  return <div className="oauth-block"><div className="oauth-heading"><LockKeyhole size={13}/> SIGN IN WITH YOUR ACCOUNT</div><div className="oauth-options">{providers.map(item=><button key={item.key} onClick={()=>start(item.key)}><span className={`oauth-glyph oauth-${item.key}`}>{item.glyph==="cloudflare"?<Cloud size={16}/>:item.glyph}</span>{item.label}<ArrowUpRight size={12}/></button>)}</div>{message?<p className="oauth-status" role="status">{message}</p>:<p className="oauth-status">OAuth UI is ready; provider secrets and callback routes are backend configuration.</p>}<small>Cloudflare Access can broker workspace identity. Apple, Google, and GitHub require provider registration and callback URLs.</small></div>;
}

export function Login() {
  return <div className="auth-wrap auth-elevated"><div className="auth-logo"><img src="/atoma-mark.svg" alt=""/><span><b>ATOMA</b><small>ENGINEERING LABS</small></span></div><div className="micro">ACCOUNT ACCESS</div><h1>Sign in to your workspace.</h1><p>One identity across research, design, and the Brigade. Your organization controls access and session policy.</p><OAuthOptions/><p className="auth-switch">New here? <Link to="/signup">Request early access</Link>.</p></div>;
}

export function Signup() {
  const [requested,setRequested]=useState(false);
  return <div className="auth-wrap auth-elevated"><div className="auth-logo"><img src="/atoma-mark.svg" alt=""/><span><b>ATOMA</b><small>ENGINEERING LABS</small></span></div><div className="micro">EARLY ACCESS</div><h1>Build with first principles.</h1><p>Request an invitation to the Brigade, MadMind harness, and Research Hub. Account creation and provider sign-in will activate with the service.</p><OAuthOptions/><div className="auth-request"><span>Already on the access list?</span><button onClick={()=>setRequested(true)}>{requested?<><Check size={13}/> Request noted</>:"Request an invitation"}</button><small>Invitation delivery is not connected yet.</small></div><p className="auth-switch">Already have access? <Link to="/login">Log in</Link>.</p></div>;
}
