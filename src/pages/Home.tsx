import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight, ShieldCheck, Terminal, Cpu, HardDrive, CheckCircle2 } from "lucide-react";
import { ToroidCanvas } from "../components/ToroidCanvas.tsx";
import { InteractiveConsole } from "../components/InteractiveConsole.tsx";
import { DoubleBezelCard } from "../components/DoubleBezelCard.tsx";
import { NumberTicker } from "../components/NumberTicker.tsx";
import { InteractiveApiSandbox } from "../components/InteractiveApiSandbox.tsx";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pt-24 pb-20 font-sans">
      
      {/* Dynamic Toroid WebGL Background */}
      <ToroidCanvas className="opacity-75" intensity={1.1} />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-12 pb-16 text-center">
        {/* New Benchmark Chip */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="inline-block"
        >
          <Link
            to="/harness"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-[#8b9595] backdrop-blur-xl transition-all duration-300 hover:border-[#4fe3ea]/50 hover:bg-white/[0.08] hover:text-white"
          >
            <span className="rounded-full bg-[#4fe3ea]/20 px-2 py-0.5 text-[10px] font-bold text-[#4fe3ea]">
              NEW
            </span>
            <span>MadMind v0.1.0 — dual-lane harness is live on the bench</span>
            <ArrowRight className="h-3 w-3 text-[#4fe3ea] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Hero Lede / Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="mx-auto mt-6 max-w-3xl"
        >
          <h1 className="sr-only">Atoma Labs — Agentic Tooling for Solo Developers</h1>
          <p className="font-mono text-sm uppercase tracking-[0.22em] text-[#4fe3ea] mb-3">
            Local-First Sovereign AI
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed text-[#e9eded]">
            Atoma Labs builds agentic tooling for solo developers — MCP servers,
            Skills.md, harnesses and research-grade labs engineered for
            constrained hardware.
          </p>
        </motion.div>

        {/* Hero CTA Button Island */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Button-in-Button Launch Brigade */}
          <Link
            to="/apps"
            className="group relative inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-mono text-xs font-semibold text-black transition-all duration-300 hover:bg-[#e9eded] active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span>Launch Brigade demo</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-3.5 w-3.5 text-black" />
            </span>
          </Link>

          {/* Download App Pill */}
          <Link
            to="/apps#downloads"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]"
          >
            <span>Download app</span>
            <span className="flex items-center gap-1 text-[10px] text-[#8b9595]">
              (macOS · Linux · Windows)
            </span>
          </Link>
        </motion.div>

        {/* The Living Interactive IDE Console */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="mt-12"
        >
          <InteractiveConsole />
        </motion.div>
      </section>

      {/* Section 1.0: Brigade App */}
      <section className="relative mx-auto max-w-6xl px-4 py-24 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5b6464]">
              <span className="text-[#4fe3ea]">1.0</span>
              <span>Brigade App v1</span>
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
              An agent brigade <span className="text-[#8b9595] font-light">that answers to you.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8b9595]">
            Deterministic token generation and continuous graph orchestration in one local-first workspace.
            Every step is traced, every decision auditable, <b className="text-white">nothing leaves your machine</b>.
            The brigade plans in the open, works under judges, and answers to the person who owns the hardware — you.
          </p>
        </div>

        {/* Live Workspace Run Grid */}
        <DoubleBezelCard>
          <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
            <span className="font-semibold text-white">Active Runs</span>
            <span className="text-[#4fe3ea]">4 agents · local</span>
          </div>
          <div className="mt-4 space-y-3 font-mono text-xs">
            {[
              { id: "BRG-142", name: "Refactor tokio runtime scheduler", role: "PLANNER", time: "just now", status: "running" },
              { id: "BRG-141", name: "Index arxiv cs.AI — last 24h", role: "RESEARCHER", time: "2m ago", status: "running" },
              { id: "BRG-139", name: "Quantize 7B to Q4_K_M for M2 8GB", role: "LABS", time: "14m ago", status: "running" },
              { id: "BRG-137", name: "Generate Skills.md for repo tooling", role: "QUEUED", time: "1h ago", status: "queued" },
            ].map((run) => (
              <div
                key={run.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-white/5 bg-black/40 p-3.5 transition-all hover:border-[#4fe3ea]/30"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#3ddc84] animate-pulse" />
                  <span className="font-bold text-white">{run.id}</span>
                  <span className="text-[#8b9595]">{run.name}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[#4fe3ea]">{run.role}</span>
                  <span className="text-[#5b6464]">{run.time}</span>
                </div>
              </div>
            ))}
          </div>
        </DoubleBezelCard>
      </section>

      {/* Section 2.0: Infrastructure, not wrappers */}
      <section className="relative mx-auto max-w-6xl px-4 py-24 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5b6464]">
              <span className="text-[#4fe3ea]">2.0</span>
              <span>MCP · Tools · Skills · Labs</span>
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
              Infrastructure, not wrappers. <span className="text-[#8b9595] font-light">Built to be composed.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8b9595]">
            Most agent tooling is a prompt in a trench coat. Ours is the layer underneath: protocol servers,
            portable skills and harnesses you can inspect, pin and reuse — <b className="text-white">composed, not rented</b>.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Bento Card 1: Production MCP Servers */}
          <DoubleBezelCard>
            <div className="font-mono text-xs text-[#4fe3ea]">▤ MCP SERVERS</div>
            <h3 className="mt-2 text-xl font-bold text-white">
              Production-grade Model Context Protocol servers.
            </h3>
            <p className="mt-2 text-sm text-[#8b9595]">
              Drop-in servers for filesystem, git, research and local inference — typed, sandboxed, and observable.
            </p>
            <div className="mt-5 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between rounded-lg bg-black/50 p-2.5 border border-white/5">
                <span className="text-white">atoma-fs</span>
                <span className="text-[#8b9595]">stdio · 14 tools</span>
                <span className="text-[#3ddc84] flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#3ddc84]" />healthy</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-black/50 p-2.5 border border-white/5">
                <span className="text-white">atoma-research</span>
                <span className="text-[#8b9595]">http · 9 tools</span>
                <span className="text-[#3ddc84] flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#3ddc84]" />healthy</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-black/50 p-2.5 border border-white/5">
                <span className="text-white">atoma-infer-metal</span>
                <span className="text-[#8b9595]">stdio · 6 tools</span>
                <span className="text-[#f0a832] flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#f0a832]" />warning</span>
              </div>
            </div>
            <Link to="/plugins" className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-[#4fe3ea] hover:underline">
              How the servers are built →
            </Link>
          </DoubleBezelCard>

          {/* Bento Card 2: Portable Skills.md */}
          <DoubleBezelCard>
            <div className="font-mono text-xs text-[#4fe3ea]">✎ SKILLS.MD</div>
            <h3 className="mt-2 text-xl font-bold text-white">Portable agent skills.</h3>
            <p className="mt-2 text-sm text-[#8b9595]">
              A skill is a markdown file with a contract: what it does, which tools it may touch, when it applies.
              It travels between harnesses because it was never locked inside one.
            </p>
            <div className="mt-5 rounded-xl border border-white/5 bg-black/60 p-3 font-mono text-xs text-[#8b9595] leading-relaxed">
              <div><span className="text-[#f0a832]">name:</span> <span className="text-[#3ddc84]">rust-refactor</span></div>
              <div><span className="text-[#f0a832]">tools:</span> [fs, cargo]</div>
              <div className="mt-1 text-[#5b6464]"># When to use</div>
              <div>Apply when a crate fails clippy -D warnings.</div>
            </div>
            <Link to="/tooling" className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-[#4fe3ea] hover:underline">
              The Skills.md format →
            </Link>
          </DoubleBezelCard>

          {/* Bento Card 3: Agentic Harnesses & Pass Rate */}
          <DoubleBezelCard>
            <div className="font-mono text-xs text-[#4fe3ea]">▦ AGENTIC HARNESSES</div>
            <h3 className="mt-2 text-xl font-bold text-white">
              Evaluate tool-calling like you test code.
            </h3>
            <p className="mt-2 text-sm text-[#8b9595]">
              MadMind runs two lanes — a builder and a contributor — under deterministic judges.
              A run completes only when its receipts pass.
            </p>
            <div className="mt-6 flex items-end gap-2 h-20 pt-4 border-b border-white/5">
              {[34, 46, 42, 58, 64, 71, 79, 96].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t transition-all duration-700 ${
                      i === 7 ? "bg-[#4fe3ea] shadow-[0_0_12px_#4fe3ea]" : "bg-white/10"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#5b6464]">
              <span>run 01</span>
              <span>judge pass rate, by run · latest (96%)</span>
            </div>
            <Link to="/harness" className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-[#4fe3ea] hover:underline">
              Inside the harness →
            </Link>
          </DoubleBezelCard>

          {/* Bento Card 4: Research-Grade Labs (Ramp Metrics) */}
          <DoubleBezelCard>
            <div className="font-mono text-xs text-[#4fe3ea]">⚗ RESEARCH-GRADE LABS</div>
            <h3 className="mt-2 text-xl font-bold text-white">
              Frontier techniques on the hardware you own.
            </h3>
            <p className="mt-2 text-sm text-[#8b9595]">
              Quantization, speculative decoding and KV-cache work — running against your own hardware without paying cloud tolls.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 font-mono text-center">
              <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                <div className="text-xl font-bold text-[#4fe3ea]">
                  <NumberTicker value={25.2} decimals={1} suffix=" tok/s" />
                </div>
                <div className="text-[10px] text-[#5b6464] mt-1">decode rate</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                <div className="text-xl font-bold text-white">8.8 / 16 GB</div>
                <div className="text-[10px] text-[#5b6464] mt-1">unified RAM</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                <div className="text-xl font-bold text-[#3ddc84]">230 / 256</div>
                <div className="text-[10px] text-[#5b6464] mt-1">ctx window</div>
              </div>
            </div>
            <Link to="/research-hub" className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-[#4fe3ea] hover:underline">
              The research preprints →
            </Link>
          </DoubleBezelCard>

        </div>
      </section>

      {/* Section 3.0: The state of AI, one API call away */}
      <section className="relative mx-auto max-w-6xl px-4 py-24 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5b6464]">
              <span className="text-[#4fe3ea]">3.0</span>
              <span>Local API &amp; SDK</span>
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
              The state of AI, <span className="text-[#8b9595] font-light">one API call away.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8b9595]">
            Run missions programmatically from your existing toolchains. Compatible with OpenAI format,
            augmented with deterministic judge gates and immutable receipt headers.
          </p>
        </div>

        <InteractiveApiSandbox />
      </section>

      {/* Section 4.0: Shipped in the open, every week */}
      <section className="relative mx-auto max-w-6xl px-4 py-24 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5b6464]">
              <span className="text-[#4fe3ea]">4.0</span>
              <span>Changelog</span>
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
              Shipped in the open, <span className="text-[#8b9595] font-light">every week.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8b9595]">
            We build in public with weekly cadence. When a run fails, the failure is named;
            when a commit lands, the diff is linked.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              version: "v0.1.0",
              date: "OCT 20, 2026",
              title: "MadMind Initial Bench",
              detail: "Dual-lane harness live with Qwen local planner and Muse Spark contributor behind formal gate.",
              hash: "0x7bf812",
            },
            {
              version: "v0.0.9",
              date: "OCT 14, 2026",
              title: "Pure rust-refactor MCP server",
              detail: "14 tools released covering AST traversal, clippy automation, and transactional diff rollback.",
              hash: "0x3fe19b",
            },
            {
              version: "v0.0.8",
              date: "OCT 07, 2026",
              title: "Quantization sweep for M2 Apple Silicon",
              detail: "Verified Q4_K_M vs Q5_K_M perplexity curve. Zero loss on coding and logic benchmarks.",
              hash: "0x9c42ff",
            },
          ].map((item) => (
            <div
              key={item.version}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#080a0e]/60 p-4 font-mono text-xs backdrop-blur-xl transition-all hover:border-[#4fe3ea]/30"
            >
              <div className="flex items-center gap-3">
                <span className="rounded bg-white/10 px-2 py-0.5 text-white font-bold">{item.version}</span>
                <span className="text-[#5b6464]">{item.date}</span>
                <span className="text-[#e9eded] font-medium">{item.title}</span>
              </div>
              <div className="text-[11px] text-[#8b9595] sm:max-w-md truncate">{item.detail}</div>
              <span className="text-[10px] text-[#4fe3ea] font-mono">{item.hash}</span>
            </div>
          ))}
        </div>

        {/* Newsletter / Launch Waitlist Box */}
        <div className="mt-16 mx-auto max-w-xl text-center">
          <DoubleBezelCard>
            <h3 className="text-xl font-bold text-white">Get updates on releases and research.</h3>
            <p className="mt-2 text-xs text-[#8b9595]">
              No marketing noise. One email per major milestone or benchmark release.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you. You're on the launch list.");
              }}
              className="mt-5 flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="developer@domain.com"
                className="flex-1 rounded-full border border-white/15 bg-black/60 px-4 py-2.5 font-mono text-xs text-white placeholder-[#5b6464] focus:border-[#4fe3ea] focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-5 py-2.5 font-mono text-xs font-semibold text-black hover:bg-[#e9eded] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </DoubleBezelCard>
        </div>
      </section>

    </div>
  );
}
