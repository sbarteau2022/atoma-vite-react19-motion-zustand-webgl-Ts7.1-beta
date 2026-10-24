import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { DoubleBezelCard } from "../components/DoubleBezelCard.tsx";
import { ArrowRight, ShieldCheck, CheckCircle2, AlertOctagon, Terminal, Activity, FileCheck, Layers } from "lucide-react";

export default function Harness() {
  const flowSteps = [
    {
      step: "STEP 01",
      title: "Describe",
      body: 'One front door, one sentence of work. MadMind opens with a question — "What are we designing today?" — and nothing else competing for your attention.',
    },
    {
      step: "STEP 02",
      title: "Plan, as data",
      body: "The plan lane thinks at full depth and writes the runbook: a graph of packets with dependencies and the judge each packet must pass. The plan exists before any execution token is spent.",
    },
    {
      step: "STEP 03",
      title: "The Judge gate",
      body: "Deterministic judges check the plan and, later, every packet's output. A packet completes only on a judge pass — and every completion is a receipt.",
    },
    {
      step: "STEP 04",
      title: "Execute, on the record",
      body: "The code lane executes packet by packet while the realtime ledger streams what happened. Watch it live, or audit it next week; it is the same record.",
    },
  ];

  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 font-sans max-w-6xl mx-auto">
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#4fe3ea]">Harness · MadMind</span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
          Two lanes. One judge. No black box.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#8b9595]">
          MadMind is the dual agentic harness the Brigade App builds with: a builder lane and a contributor lane, working under deterministic judges, with a realtime ledger underneath. It is the discipline of the lab, made into a product surface.
        </p>
        <div className="mt-6 flex items-center gap-3 font-mono text-xs">
          <span className="rounded-full border border-[#3ddc84]/30 bg-[#3ddc84]/10 px-3 py-1 text-[#3ddc84]">
            MADMIND V0.1.0 · LIVE ON THE BENCH
          </span>
        </div>
      </motion.div>

      {/* The Two Lanes */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          The two lanes
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DoubleBezelCard>
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#5b6464]">LANE 01 — BUILDER</span>
              <span className="text-[#3ddc84]">LOCAL</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-white">Qwen, local</h3>
            <p className="mt-3 text-xs leading-relaxed text-[#8b9595]">
              The builder lane takes the first pass: it plans, writes and executes on a local model running on your own hardware. Fast, private, and always the first set of hands on the work.
            </p>
          </DoubleBezelCard>

          <DoubleBezelCard>
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#5b6464]">LANE 02 — CONTRIBUTOR</span>
              <span className="text-[#f0a832]">GATED</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-white">Muse Spark 1.3, gated</h3>
            <p className="mt-3 text-xs leading-relaxed text-[#8b9595]">
              The contributor lane is the second pair of eyes: review, counter-argument and polish from a frontier model — behind an explicit gate, so nothing leaves the machine unless that lane is opened on purpose.
            </p>
          </DoubleBezelCard>
        </div>
        <p className="mt-6 font-mono text-xs text-[#8b9595]">
          Neither lane grades its own homework. Completion belongs to the judges, and the ledger belongs to you.
        </p>
      </section>

      {/* How a run moves */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          How a run moves
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {flowSteps.map((step) => (
            <DoubleBezelCard key={step.step}>
              <span className="text-[10px] text-[#4fe3ea] uppercase font-bold">{step.step}</span>
              <h3 className="mt-1 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">{step.body}</p>
            </DoubleBezelCard>
          ))}
        </div>
      </section>

      {/* Failure has a doctrine */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Failure has a doctrine
        </h2>
        <p className="mt-2 text-xs text-[#8b9595]">
          Judges fail packets. What happens next is written down, not improvised:
        </p>
        <div className="mt-6 space-y-3 font-mono text-xs">
          <div className="rounded-xl border border-white/10 bg-[#080a0e]/60 p-4">
            <span className="text-white font-bold">· First failure:</span>{" "}
            <span className="text-[#8b9595]">the packet is re-approached with a material change. Retrying the identical approach is a violation, not a strategy.</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#080a0e]/60 p-4">
            <span className="text-white font-bold">· Second failure:</span>{" "}
            <span className="text-[#8b9595]">the packet escalates — packet, receipts and judge outputs go to the orchestrator, and the new approach is pre-registered, with its success criteria, before anyone touches it again.</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#080a0e]/60 p-4">
            <span className="text-white font-bold">· No fallback declared:</span>{" "}
            <span className="text-[#8b9595]">a packet with no declared fallback escalates after the first strike. Silence is never a passing grade.</span>
          </div>
        </div>
      </section>

      {/* Receipts, ledger, taps */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Receipts, ledger, taps
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <DoubleBezelCard>
            <div className="flex items-center gap-2 text-[#4fe3ea] font-bold">
              <FileCheck className="h-4 w-4" />
              Receipts
            </div>
            <p className="mt-3 font-sans text-xs text-[#8b9595] leading-relaxed">
              Every packet completion is a receipt: what ran, which judge passed it, what it produced. A run is a chain of receipts, not a chat transcript you have to take on faith.
            </p>
          </DoubleBezelCard>

          <DoubleBezelCard>
            <div className="flex items-center gap-2 text-[#3ddc84] font-bold">
              <ShieldCheck className="h-4 w-4" />
              Realtime ledger
            </div>
            <p className="mt-3 font-sans text-xs text-[#8b9595] leading-relaxed">
              The console's ledger strip is fed by the backend's event spine as runs happen — plan, packet, judge and escalation events in order, append-only. The audit view and the live view are the same data.
            </p>
          </DoubleBezelCard>

          <DoubleBezelCard>
            <div className="flex items-center gap-2 text-[#f0a832] font-bold">
              <Activity className="h-4 w-4" />
              Telemetry taps
            </div>
            <p className="mt-3 font-sans text-xs text-[#8b9595] leading-relaxed">
              18 catalogued taps across 7 categories — plan, packet, action, judge, model, escalation, run — each one gateable per category, with dropped events counted rather than lost silently.
            </p>
          </DoubleBezelCard>
        </div>
      </section>

      {/* The ten-second test */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          The ten-second test
        </h2>
        <p className="mt-2 text-xs text-[#8b9595]">
          Ask any agent product three questions. MadMind is built so all three have answers:
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <DoubleBezelCard>
            <span className="text-[10px] text-[#5b6464] uppercase font-bold">BEFORE</span>
            <h3 className="mt-1 text-sm font-bold text-white">"Show me the plan first"</h3>
            <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">
              The plan is data — steps, dependencies, judges — written before execution begins. You approve the shape, not a promise.
            </p>
          </DoubleBezelCard>

          <DoubleBezelCard>
            <span className="text-[10px] text-[#5b6464] uppercase font-bold">DURING</span>
            <h3 className="mt-1 text-sm font-bold text-white">"Can a step fail loudly?"</h3>
            <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">
              A step that fails its judge is blocked, with the reason on the record — never quietly retried into a confident-sounding answer.
            </p>
          </DoubleBezelCard>

          <DoubleBezelCard>
            <span className="text-[10px] text-[#5b6464] uppercase font-bold">AFTER</span>
            <h3 className="mt-1 text-sm font-bold text-white">"Can I audit yesterday's run?"</h3>
            <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">
              The append-only ledger holds what ran, what passed, what it cost. The run you audit next week is the run that actually happened.
            </p>
          </DoubleBezelCard>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 font-mono text-xs">
          <Link
            to="/apps"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-black hover:bg-[#e9eded] transition-colors"
          >
            MadMind inside the Brigade App <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/plugins"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10 transition-colors"
          >
            The MCP servers it drives
          </Link>
        </div>
      </section>

    </div>
  );
}
