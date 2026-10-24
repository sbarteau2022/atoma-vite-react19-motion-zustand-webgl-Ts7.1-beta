import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { DoubleBezelCard } from "../components/DoubleBezelCard.tsx";
import { Lock, ArrowRight, ShieldCheck, Check } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative min-h-screen px-4 pt-32 pb-20 font-sans flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <DoubleBezelCard>
          <div className="text-center font-mono">
            <span className="text-[10px] uppercase tracking-widest text-[#4fe3ea]">Account Access</span>
            <h1 className="mt-2 text-2xl font-bold text-white">Log in</h1>
            <p className="mt-2 text-xs text-[#8b9595] leading-relaxed">
              Accounts open at v1 launch. Sign-in will run through Cloudflare Access — no password of yours is ever stored by this site.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-6 space-y-4 font-mono text-xs"
          >
            <div>
              <label className="block text-[#8b9595] text-[11px] mb-1.5">Developer Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@domain.com"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-white placeholder-[#5b6464] focus:border-[#4fe3ea] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full border border-white/15 bg-white py-2.5 font-semibold text-black hover:bg-[#e9eded] transition-colors"
            >
              {submitted ? "Added to v1 Access List" : "Request Launch Access"}
            </button>
          </form>

          <div className="mt-6 border-t border-white/5 pt-4 text-center font-mono text-xs text-[#8b9595]">
            New to Atoma?{" "}
            <Link to="/signup" className="text-[#4fe3ea] hover:underline">
              Sign up free
            </Link>
          </div>
        </DoubleBezelCard>
      </motion.div>
    </div>
  );
}

export function Signup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative min-h-screen px-4 pt-32 pb-20 font-sans flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <DoubleBezelCard>
          <div className="text-center font-mono">
            <span className="text-[10px] uppercase tracking-widest text-[#4fe3ea]">Early Access</span>
            <h1 className="mt-2 text-2xl font-bold text-white">Get v1 free</h1>
            <p className="mt-2 text-xs text-[#8b9595] leading-relaxed">
              One email. We will write once when v1 ships — the Brigade App, the MadMind harness and Research Hub API keys — and never before, never for marketing spam.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-6 space-y-4 font-mono text-xs"
          >
            <div>
              <label className="block text-[#8b9595] text-[11px] mb-1.5">Developer Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@domain.com"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-white placeholder-[#5b6464] focus:border-[#4fe3ea] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full border border-white/15 bg-white py-2.5 font-semibold text-black hover:bg-[#e9eded] transition-colors"
            >
              {submitted ? "Signed up for v1 Launch" : "Notify me at Launch"}
            </button>
          </form>

          <div className="mt-6 border-t border-white/5 pt-4 text-center font-mono text-xs text-[#8b9595]">
            Already signed up?{" "}
            <Link to="/login" className="text-[#4fe3ea] hover:underline">
              Log in
            </Link>
          </div>
        </DoubleBezelCard>
      </motion.div>
    </div>
  );
}
