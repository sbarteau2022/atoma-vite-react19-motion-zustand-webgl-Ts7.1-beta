import {useState, type FormEvent} from "react";
import {Link} from "react-router-dom";
import {readAccountToken, requestAccountAction} from "../utils/accountActions";

export function AccountEmail({mode}:{mode:"forgot"|"reset"|"verify"}){
  const [token]=useState(readAccountToken),[busy,setBusy]=useState(false),[message,setMessage]=useState(""),[done,setDone]=useState(false);
  const title=mode==="forgot"?"Get back to your work.":mode==="reset"?"Choose a new password.":"Make your email official.";
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(busy||done)return;
    const values=Object.fromEntries(new FormData(e.currentTarget));
    if(mode==="reset" && values.password!==values.confirm){setMessage("Passwords do not match.");return}
    setBusy(true);setMessage("");
    try{const data=await requestAccountAction(mode==="forgot"?"forgot-password":mode==="reset"?"reset-password":"verify-email",mode==="forgot"?{email:values.email}:{token,...(mode==="reset"?{password:values.password}:{})});setMessage(data.message);setDone(true)}catch(e){setMessage(e instanceof Error?e.message:"Unable to connect. Try again.")}finally{setBusy(false)}
  }
  const missing=mode!=="forgot"&&!token;
  return <div className="auth-wrap auth-elevated"><div className="auth-logo"><img src="/atoma-atom.png" alt=""/><span><b>ATOMA</b><small>ENGINEERING LABS</small></span></div><div className="micro">{mode==="forgot"?"ACCOUNT RECOVERY":mode==="reset"?"SECURE PASSWORD RESET":"EMAIL OWNERSHIP"}</div><h1>{title}</h1><p>{mode==="forgot"?"Enter your account email. If it is eligible, we will send a link that expires in 30 minutes.":mode==="reset"?"Resetting your password signs out every existing session. Use a unique password of 12 to 128 characters.":"Confirm that this inbox belongs to you. The link expires after 24 hours and works once."}</p>{missing?<p role="alert">This link is missing its token. Request a new link below.</p>:!done&&<form className="account-form" onSubmit={submit}>{mode==="forgot"&&<label>Email<input type="email" name="email" autoComplete="email" required maxLength={254}/></label>}{mode==="reset"&&<><label>New password<input name="password" type="password" autoComplete="new-password" required minLength={12} maxLength={128}/></label><label>Confirm new password<input name="confirm" type="password" autoComplete="new-password" required minLength={12} maxLength={128}/></label></>}<button className="btn btn-white" disabled={busy}>{busy?"Working…":mode==="forgot"?"Request reset link ↗":mode==="reset"?"Update password ↗":"Verify my email ↗"}</button></form>}{message&&<p role={done?"status":"alert"}>{message}</p>}<p className="auth-switch"><Link to="/login">Return to sign in</Link>{mode==="reset"&&<> · <Link to="/forgot-password">Request a new reset link</Link></>}{mode==="verify"&&<> · <Link to="/login">Sign in to resend verification</Link></>}</p></div>
}
