import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { DoubleBezelCard } from "../components/DoubleBezelCard.tsx";
import { ArrowRight } from "lucide-react";

const PRINCIPLES = [
  ["Local first", "The default home for your work is your machine. Cloud is a lane you choose, never a toll your tools quietly pay."],
  ["Plan before execution", "Work is written as a plan — steps, dependencies, judges — before it is executed. You approve the shape, not a promise."],
  ["Judges, not vibes", "A step completes when a deterministic check passes it, and the receipt says so. Fluency is not evidence."],
  ["Failure is named", "A blocked step is blocked in the open, with the reason on the record. Nothing is quietly retried into a confident-sounding answer."],
  ["Claims carry labels", "Shipped, in build, roadmap — every claim on this site and in our tools carries its status. Numbers ship with their scope or not at all."],
  ["Wrong stays on the record", "The ledger is append-only. When we get something wrong, the correction goes next to the claim, not over it."],
];

export default function Mission() {
  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 font-sans max-w-6xl mx-auto">
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#4fe3ea]">Mission</span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
          Serious agent tooling, for the person working alone.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#8b9595]">
          Atoma Labs is an independent studio building agentic tools for solo developers — the people shipping real software on one machine, with no platform team and no patience for black boxes. Our tools run on constrained hardware, plan in the open, and prove what they did.
        </p>
      </motion.div>

      {/* Why we exist */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Why we exist
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#8b9595] max-w-3xl">
          <p>
            The agent stack is being built for clusters and contracts: hosted models, metered calls, telemetry flowing out by default. That stack is powerful — and it answers to someone else. A solo developer's machine is idle most of the day while being entirely capable of running serious models. The missing piece was never compute. It is tooling that treats a single machine as a first-class place to build, and an agent's work as something that must be shown, not trusted.
          </p>
          <p>
            So we build the layer that runs at home: a brigade app that orchestrates agents as a visible graph, a harness that gates work behind deterministic judges, protocol servers and portable skills that compose instead of locking in, and a research hub that feeds the agents real literature. Everything local-first, everything auditable.
          </p>
        </div>
      </section>

      {/* The Principles */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          The principles
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {PRINCIPLES.map(([name, body], i) => (
            <DoubleBezelCard key={name}>
              <span className="text-[10px] text-[#4fe3ea] font-bold">P—0{i + 1}</span>
              <h3 className="mt-1 text-base font-bold text-white">{name}</h3>
              <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">{body}</p>
            </DoubleBezelCard>
          ))}
        </div>
      </section>

      {/* The Version Line is the Geometry Line */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          The version line is the geometry line
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#8b9595] max-w-3xl">
          We say this plainly because it organizes everything we ship.{" "}
          <b className="text-white">v1 is the standard, exact world</b>: standard models, a plan tree, a deterministic controller that audits coverage from the plan itself.{" "}
          <b className="text-white">v2 is the direction after it</b>: a multi-model mind with a hyperbolic geometry — nested maps, near-constant-time recall, a brigade you carve yourself. v2 is roadmap, and it is labeled roadmap everywhere it appears.
        </p>

        <div className="mt-8">
          <DoubleBezelCard>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <span className="font-bold text-white">v1 — standard models</span>
                <span className="text-[#8b9595] sm:max-w-md">A flat, exact map: token-prefix tree, plan tree, deterministic judges. The Brigade App and MadMind as they ship.</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[#f0a832] text-[10px]">In build</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <span className="font-bold text-white">v2 — the multi-model mind</span>
                <span className="text-[#8b9595] sm:max-w-md">Nested hyperbolic KV maps, toroidal encoders, custom brigades — your swarm, your specialists, your judges.</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[#8b9595] text-[10px]">Roadmap</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-white">v2 tiers</span>
                <span className="text-[#8b9595] sm:max-w-md">Paid tiers live at the v2 scale line. v1's basics are free and never become a teaser.</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[#8b9595] text-[10px]">Roadmap</span>
              </div>
            </div>
          </DoubleBezelCard>
        </div>
      </section>

      {/* Who Builds It */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Who builds it
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#8b9595] max-w-3xl">
          Atoma Labs is built in Missouri by an independent studio, in the open, on a weekly cadence — the{" "}
          <Link to="/#changelog" className="text-[#4fe3ea] hover:underline">
            changelog
          </Link>{" "}
          is the record. The current build is entered in the Meta Global AI Developer Hackathon, October 26 – November 4, 2026. After judging ends, the work continues: this is a business, not a ten-day spike.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs">
          <Link
            to="/apps"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-black hover:bg-[#e9eded] transition-colors"
          >
            See the apps <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10 transition-colors"
          >
            Talk to the team
          </Link>
        </div>
      </section>

    </div>
  );
}
