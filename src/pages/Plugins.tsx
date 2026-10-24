import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { DoubleBezelCard } from "../components/DoubleBezelCard.tsx";
import { Cpu, Terminal, Shield, CheckCircle2, ArrowRight } from "lucide-react";

export default function Plugins() {
  const mcpList = [
    {
      name: "atoma-fs",
      transport: "stdio",
      tools: 14,
      desc: "Workspace filesystem: read, write, search — rooted at the project you opened, nothing above it.",
      status: "In build",
    },
    {
      name: "atoma-research",
      transport: "http",
      tools: 9,
      desc: "Research access for agents: search and read the Research Hub index and your local library.",
      status: "In build",
    },
    {
      name: "atoma-infer-metal",
      transport: "stdio",
      tools: 6,
      desc: "Local inference on Apple silicon: run the models already on your machine as a tool any agent can call.",
      status: "In build",
    },
    {
      name: "atoma-git",
      transport: "stdio",
      tools: 8,
      desc: "Repository work with guardrails: status, diff, branch, commit — history rewriting stays a human's job.",
      status: "In build",
    },
  ];

  const rules = [
    ["Typed, end to end", "Every tool is a schema: named inputs, named outputs, no stringly-typed surprises. The harness validates calls before they run and results before they are believed."],
    ["Sandboxed by default", "A filesystem server sees the workspace it was given — not your home directory, not your keys. Reach is granted per server, per run, and it expires with the run."],
    ["Observable, always", "Every call lands on the ledger with its inputs, outputs and cost. A tool the audit log cannot see is a tool the brigade does not get."],
    ["Least privilege", "Servers expose the smallest surface that does the job: read before write, list before delete, dry-run before destructive."],
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
        <span className="font-mono text-xs uppercase tracking-widest text-[#4fe3ea]">Plug-ins · MCP Servers</span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
          Tools the brigade may touch — on the record.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#8b9595]">
          The Model Context Protocol is how agents reach tools. Our servers are drop-in MCP servers for filesystem, git, research and local inference — built to one standard: typed, sandboxed, observable.
        </p>
        <div className="mt-6 flex items-center gap-3 font-mono text-xs">
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[#f0a832]">
            SHIPPING WITH V1 · IN BUILD
          </span>
        </div>
      </motion.div>

      {/* The Servers Table */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          The servers
        </h2>
        <div className="mt-8 space-y-4 font-mono text-xs">
          {mcpList.map((server) => (
            <DoubleBezelCard key={server.name}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#3ddc84] animate-pulse" />
                  <span className="font-bold text-white text-sm">{server.name}</span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[#4fe3ea] text-[10px]">
                    {server.transport} · {server.tools} tools
                  </span>
                </div>
                <span className="rounded bg-white/5 px-2.5 py-0.5 text-[#f0a832] text-[10px] w-fit">
                  {server.status}
                </span>
              </div>
              <p className="mt-2.5 font-sans text-xs text-[#8b9595] leading-relaxed">
                {server.desc}
              </p>
            </DoubleBezelCard>
          ))}
        </div>
      </section>

      {/* The Rules */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Four rules for any server
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {rules.map(([title, desc]) => (
            <DoubleBezelCard key={title}>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-[#4fe3ea]" />
                {title}
              </h3>
              <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">
                {desc}
              </p>
            </DoubleBezelCard>
          ))}
        </div>
      </section>

    </div>
  );
}
