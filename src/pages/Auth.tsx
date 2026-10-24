import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="auth-wrap">
      <div className="micro">Account</div>
      <h1>Log in</h1>
      <p>
        Accounts open at v1 launch. Sign-in will run through Cloudflare
        Access — no password of yours is ever stored by this site.
      </p>
      <form className="shell" onSubmit={(e) => e.preventDefault()}>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" disabled />
        </label>
        <button className="btn" type="submit" disabled>Log in — opens at launch</button>
      </form>
      <p>New here? <Link to="/signup">Sign up free</Link>.</p>
    </div>
  );
}

export function Signup() {
  return (
    <div className="auth-wrap">
      <div className="micro">Account</div>
      <h1>Get v1 free</h1>
      <p>
        One email. We'll write once when v1 ships — the Brigade App, the
        MadMind harness and Research Hub API keys — and never before, never
        for anything else. Our data practices fit in one paragraph, printed
        in the footer of every page on this site.
      </p>
      <form className="shell" onSubmit={(e) => e.preventDefault()}>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" disabled />
        </label>
        <button className="btn btn-primary" type="submit" disabled>Sign up — opens at launch</button>
      </form>
      <p>Already signed up? <Link to="/login">Log in</Link>.</p>
    </div>
  );
}
