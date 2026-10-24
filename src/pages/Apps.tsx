import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { DoubleBezelCard } from "../components/DoubleBezelCard.tsx";
import { InteractiveConsole } from "../components/InteractiveConsole.tsx";
import { Layers, Users, Cpu, FileCode, Shield, Activity, ArrowRight, Download, Laptop, Cloud } from "lucide-react";

export default function Apps() {
  const anatomyCards = [
    {
      title: "Pipelines",
      icon: Layers,
      color: "text-[#4fe3ea]",
      body: "Work as a living graph. A pipeline is a plan you can watch: nodes are steps, edges are handoffs, and the frontier — what is running right now — is always visible.",
    },
    {
      title: "Agents",
      icon: Users,
      color: "text-[#3ddc84]",
      body: "The brigade itself: planner, builder, researcher, judge. Each agent has a named role, a pinned model and a budget it cannot quietly exceed.",
    },
    {
      title: "MCP Servers",
      icon: Cpu,
      color: "text-[#f0a832]",
      body: "The tools the brigade may touch, attached as protocol servers — typed, sandboxed, and listed in the open. See the Plug-ins page for the servers themselves.",
    },
    {
      title: "Skills",
      icon: FileCode,
      color: "text-[#4fe3ea]",
      body: "Portable Skills.md files the brigade loads for a job. A skill is a contract: what it does, which tools it may use, when it applies.",
    },
    {
      title: "Audit Log",
      icon: Shield,
      color: "text-[#3ddc84]",
      body: "The append-only ledger of every run: plans, packets, judge verdicts, receipts. Yesterday's run can be audited next week, node by node.",
    },
    {
      title: "Telemetry, always on",
      icon: Activity,
      color: "text-[#f0a832]",
      body: "Unified memory, GPU load and KV cache sit in the rail next to the work — the machine's state is part of the run's record, not a surprise in a log. Traces seal, audit hashes verify, zero egress.",
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
        <span className="font-mono text-xs uppercase tracking-widest text-[#4fe3ea]">Apps</span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
          The Brigade App: a crew that shows its work.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#8b9595]">
          One local-first workspace where a brigade of agents plans, builds and checks software in the open — every step traced, every decision auditable, nothing leaving your machine.
        </p>
        <div className="mt-6 flex items-center gap-3 font-mono text-xs">
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[#f0a832]">
            v1 · IN BUILD
          </span>
          <span className="rounded-full border border-[#3ddc84]/30 bg-[#3ddc84]/10 px-3 py-1 text-[#3ddc84]">
            v1 IS FREE
          </span>
        </div>
      </motion.div>

      {/* Interactive Workspace Simulator */}
      <div className="mt-12">
        <InteractiveConsole />
        <div className="text-center font-mono text-[11px] text-[#5b6464] mt-2">
          Fig A.1 — Brigade workspace · interactive interface mock
        </div>
      </div>

      {/* Anatomy of the workspace */}
      <section className="mt-24 pt-12 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Anatomy of the workspace
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {anatomyCards.map((card) => {
            const Icon = card.icon;
            return (
              <DoubleBezelCard key={card.title}>
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${card.color}`} />
                  <h3 className="font-mono text-sm font-bold text-white">{card.title}</h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#8b9595]">{card.body}</p>
              </DoubleBezelCard>
            );
          })}
        </div>
      </section>

      {/* Two ways in */}
      <section className="mt-24 pt-12 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Two ways in
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DoubleBezelCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
                <Laptop className="h-4 w-4 text-[#4fe3ea]" />
                Native build
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] text-[#f0a832]">
                SHIPS WITH V1
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#8b9595]">
              Download for Mac, Linux or Windows and run the whole brigade locally against your own models. Your missions, files and run records stay on your machine. This is the daily driver.
            </p>
          </DoubleBezelCard>

          <DoubleBezelCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
                <Cloud className="h-4 w-4 text-[#3ddc84]" />
                Cloud lane
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] text-[#f0a832]">
                SHIPS WITH V1
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#8b9595]">
              Open the site, sign up, run a mission in your browser. The fastest way to see what a brigade does differently — no hardware requirement, nothing to uninstall if it is not for you.
            </p>
          </DoubleBezelCard>
        </div>
      </section>

      {/* Downloads */}
      <section className="mt-24 pt-12 border-t border-white/5" id="downloads">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Downloads
        </h2>
        <p className="mt-2 text-xs text-[#8b9595]">
          Native builds ship with v1. Until they land, the honest button is the launch list — one email when the builds are ready, and nothing before.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {["macOS", "Linux", "Windows"].map((os) => (
            <DoubleBezelCard key={os}>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white">{os}</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-[#f0a832]">
                  IN BUILD
                </span>
              </div>
              <p className="mt-2 font-sans text-xs text-[#8b9595]">
                Brigade App v1, native. Local models, local ledger.
              </p>
              <div className="mt-6">
                <Link
                  to="/signup"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Notify me at launch
                </Link>
              </div>
            </DoubleBezelCard>
          ))}
        </div>
      </section>

      {/* The harness inside: MadMind */}
      <section className="mt-24 pt-12 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          The harness inside: MadMind
        </h2>
        <div className="mt-8">
          <DoubleBezelCard>
            <p className="text-sm leading-relaxed text-[#8b9595]">
              The Brigade App's build work runs on <b className="text-white">MadMind</b>, our dual agentic harness: a builder lane takes the first pass, a contributor lane reviews, and deterministic judges decide when a step is done — with the receipt to prove it. MadMind v0.1.0 is live on our bench today, behind a single front door: <i>"What are we designing today?"</i>
            </p>
            <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs">
              <Link
                to="/harness"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-black hover:bg-[#e9eded] transition-colors"
              >
                Inside MadMind <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/tooling"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white hover:bg-white/10 transition-colors"
              >
                Tools &amp; Skills
              </Link>
            </div>
          </DoubleBezelCard>
        </div>
      </section>

    </div>
  );
}
