import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { DoubleBezelCard } from "../components/DoubleBezelCard.tsx";
import { FileCode, CheckCircle2, Shield, ArrowRight, Copy } from "lucide-react";
import { useState } from "react";

export default function Tooling() {
  const [copied, setCopied] = useState(false);

  const sampleSkill = `---
name: rust-refactor
version: 1.2.0
tools: [fs, cargo]
triggers: crate fails clippy -D warnings
---

# When to use
Apply when a crate fails clippy -D warnings
and the fix is structural, not cosmetic.

# Method
1. Read the warnings as a list, not a mood.
2. Fix causes in dependency order.
3. Re-run clippy + tests; attach both outputs
   to the receipt before claiming done.`;

  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 font-sans max-w-6xl mx-auto">
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#4fe3ea]">Tooling · Tools &amp; Skills</span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
          Skills.md: agent skills that travel.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#8b9595]">
          A skill should be a file, not a feature. Skills.md is our portable format for agent capabilities: plain markdown with a small front-matter contract — readable by a human, loadable by any harness, versioned like code.
        </p>
      </motion.div>

      {/* Anatomy of a skill */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Anatomy of a skill
        </h2>
        <p className="mt-2 text-sm text-[#8b9595] max-w-3xl">
          Every skill opens with front matter that declares its contract, followed by the instructions themselves. The contract is the part most "prompt libraries" skip — and the part that makes a skill safe to compose.
        </p>

        {/* Code Snippet Card with Copy */}
        <div className="mt-8">
          <DoubleBezelCard>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
              <span className="text-[#4fe3ea] font-bold">rust-refactor.md</span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(sampleSkill);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 text-[11px] text-[#8b9595] hover:text-white"
              >
                <Copy className="h-3 w-3" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="mt-3 overflow-x-auto font-mono text-xs text-[#e9eded] leading-relaxed">
              {sampleSkill}
            </pre>
          </DoubleBezelCard>
        </div>

        {/* Contract Fields Table */}
        <div className="mt-8">
          <DoubleBezelCard>
            <div className="space-y-4 font-mono text-xs">
              {[
                ["name", "The skill's identity. Stable across harnesses; renaming a skill is a breaking change."],
                ["version", "Semver. A run pins the version it used, so a receipt can be re-checked against the exact skill that produced it."],
                ["tools", "The complete list of tools the skill may touch. Anything not listed is out of bounds — the harness enforces it."],
                ["triggers", "When the skill applies, written for the planner. Vague triggers make vague brigades."],
              ].map(([key, desc]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-4 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <span className="font-bold text-[#4fe3ea] sm:w-28 shrink-0">{key}</span>
                  <span className="text-[#8b9595] leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>
          </DoubleBezelCard>
        </div>
      </section>

      {/* How skills compose */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          How skills compose
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <DoubleBezelCard>
            <h3 className="text-sm font-bold text-white">Declared, not ambient</h3>
            <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">
              A plan names the skills it will use, the way a build names its dependencies. Nothing loads silently because a model felt like it.
            </p>
          </DoubleBezelCard>

          <DoubleBezelCard>
            <h3 className="text-sm font-bold text-white">Least tool, by contract</h3>
            <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">
              The front matter is a permission slip: a skill that declares [fs, cargo] cannot reach the network, no matter what its prose says.
            </p>
          </DoubleBezelCard>

          <DoubleBezelCard>
            <h3 className="text-sm font-bold text-white">Receipts cite skills</h3>
            <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">
              When a packet completes, its receipt names the skill and version behind it. If a skill misbehaves, you can find every run it touched.
            </p>
          </DoubleBezelCard>
        </div>
      </section>

    </div>
  );
}
