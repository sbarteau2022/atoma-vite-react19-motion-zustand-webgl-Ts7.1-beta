import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBrigadeStore, PipelineStep } from "../store/useBrigadeStore.ts";
import { Play, Pause, CheckCircle2, ShieldCheck, Terminal, Cpu, HardDrive, Zap, Layers, FileText } from "lucide-react";

export function InteractiveConsole() {
  const {
    activeTab,
    setActiveTab,
    selectedRunId,
    setSelectedRunId,
    selectedStepId,
    setSelectedStepId,
    isPlaying,
    togglePlaying,
    runs,
    agents,
    mcpServers,
    skills,
    ledgerEvents,
    telemetry,
    toksSeries,
    tickTelemetry,
  } = useBrigadeStore();

  const [copiedContract, setCopiedContract] = useState(false);

  // Interval for live telemetry simulation
  useEffect(() => {
    const timer = setInterval(() => {
      tickTelemetry();
    }, 1200);
    return () => clearInterval(timer);
  }, [tickTelemetry]);

  const activeRun = runs.find((r) => r.id === selectedRunId) || runs[0];
  const activeStep: PipelineStep =
    activeRun.steps.find((s) => s.id === selectedStepId) || activeRun.steps[0] || {
      id: "unknown",
      name: "Step",
      lane: "local",
      model: "qwen",
      judge: "standard",
      status: "running",
      summary: "Processing...",
      detail: "Active",
    };

  // Polyline coordinates for the live tok/s chart
  const chartPoints = toksSeries
    .map((val, idx) => {
      const x = (idx / (toksSeries.length - 1)) * 220;
      const y = 48 - ((val - 20) / 10) * 36;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="relative mx-auto w-full max-w-[1240px] px-2 py-6">
      {/* Container with Linear-style collage flanking panels and central console */}
      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        
        {/* Left Side Panels (01 & 02) */}
        <div className="hidden flex-col gap-6 lg:col-span-3 lg:flex">
          {/* Panel 01: Brigade App Mobile Simulator */}
          <div className="group relative rounded-2xl border border-white/10 bg-[#090b0e]/80 p-3.5 backdrop-blur-xl transition-all duration-500 hover:border-[#4fe3ea]/40 hover:shadow-[0_0_25px_rgba(79,227,234,0.12)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] tracking-widest text-[#8b9595] uppercase font-mono">
              <span>Brigade App v1</span>
              <span className="text-[#4fe3ea]">01</span>
            </div>
            <div className="mt-3 rounded-xl border border-white/5 bg-[#050607] p-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">BRG-142</span>
                <span className="text-[10px] text-[#3ddc84]">running</span>
              </div>
              <div className="mt-1 text-[11px] text-[#8b9595]">step 4 of 7 · build</div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-[#4fe3ea]"
                  animate={{ width: `${activeRun.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="h-2 w-3/4 rounded bg-white/5" />
                <div className="h-2 w-1/2 rounded bg-white/5" />
              </div>
              <div className="relative mt-4 flex h-20 items-center justify-center overflow-hidden rounded-lg bg-black/40">
                <div className="absolute h-14 w-14 rounded-full border border-[#4fe3ea]/30 animate-spin" style={{ animationDuration: "12s" }} />
                <div className="absolute h-8 w-8 rounded-full border border-[#f0a832]/40" />
                <div className="h-2 w-2 rounded-full bg-[#4fe3ea] shadow-[0_0_8px_#4fe3ea]" />
              </div>
            </div>
          </div>

          {/* Panel 02: Hardware Rack with Live Wave */}
          <div className="group relative rounded-2xl border border-white/10 bg-[#090b0e]/80 p-3.5 backdrop-blur-xl transition-all duration-500 hover:border-[#4fe3ea]/40 hover:shadow-[0_0_25px_rgba(79,227,234,0.12)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] tracking-widest text-[#8b9595] uppercase font-mono">
              <span>MCP Servers</span>
              <span className="text-[#4fe3ea]">02</span>
            </div>
            <div className="mt-3 space-y-2 rounded-xl border border-white/5 bg-[#050607] p-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#3ddc84] animate-pulse" />
                <span className="text-white text-[11px]">atoma-fs</span>
                <span className="ml-auto text-[10px] text-[#8b9595]">14 tools</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#4fe3ea]" />
                <span className="text-white text-[11px]">atoma-research</span>
                <span className="ml-auto text-[10px] text-[#8b9595]">9 tools</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f0a832]" />
                <span className="text-white text-[11px]">atoma-infer-metal</span>
                <span className="ml-auto text-[10px] text-[#8b9595]">0.2ms</span>
              </div>
              <div className="mt-2 pt-2 border-t border-white/5">
                <svg className="h-10 w-full" viewBox="0 0 200 64" preserveAspectRatio="none">
                  <polyline
                    points="0,40 18,38 36,42 54,30 72,34 90,22 108,28 126,16 144,24 162,14 180,20 200,10"
                    fill="none"
                    stroke="#4fe3ea"
                    strokeWidth="1.6"
                    opacity="0.85"
                  />
                  <polyline
                    points="0,50 20,47 40,52 60,44 80,48 100,38 120,43 140,34 160,40 180,32 200,36"
                    fill="none"
                    stroke="#3d7bff"
                    strokeWidth="1.2"
                    opacity="0.55"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Central Orchestrator Console (Linear / Ramp Double-Bezel Architecture) */}
        <div className="col-span-1 lg:col-span-6">
          <div className="relative rounded-[1.6rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-transparent p-1 shadow-2xl backdrop-blur-2xl">
            <div className="relative overflow-hidden rounded-[calc(1.6rem-0.25rem)] border border-white/10 bg-[#07090c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              
              {/* Window Titlebar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#090c10] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5a5a]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#f0a832]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#3ddc84]/80" />
                  <span className="ml-3 font-mono text-[11px] text-[#8b9595]">
                    brigade://pipeline/{activeRun.id.toLowerCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlaying}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-[#e9eded] transition-colors hover:bg-white/10 active:scale-95"
                    title={isPlaying ? "Pause simulation" : "Resume simulation"}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-3 w-3 text-[#f0a832]" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 text-[#3ddc84]" />
                        <span>SIMULATE</span>
                      </>
                    )}
                  </button>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#3ddc84]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#3ddc84]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3ddc84] animate-pulse" />
                    LIVE
                  </span>
                </div>
              </div>

              {/* Console Layout: Navigation Sidebar + Stage */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
                
                {/* Left Mini-Nav */}
                <div className="border-b md:border-b-0 md:border-r border-white/10 bg-[#080a0e] p-3 md:col-span-3">
                  <span className="px-2 font-mono text-[10px] tracking-widest text-[#5b6464] uppercase">
                    Workspace
                  </span>
                  <div className="mt-2 space-y-1">
                    {[
                      { id: "pipelines", label: "Pipelines", icon: "▦", count: runs.length },
                      { id: "agents", label: "Agents", icon: "◈", count: agents.length },
                      { id: "mcp", label: "MCP Servers", icon: "▤", count: mcpServers.length },
                      { id: "skills", label: "Skills", icon: "✦", count: skills.length },
                      { id: "audit", label: "Audit Log", icon: "☰", count: ledgerEvents.length },
                    ].map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 font-mono text-xs transition-all ${
                            isActive
                              ? "bg-white/10 text-[#4fe3ea] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] font-semibold"
                              : "text-[#8b9595] hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className={isActive ? "text-[#4fe3ea]" : "text-[#5b6464]"}>
                              {tab.icon}
                            </span>
                            {tab.label}
                          </span>
                          <span className="rounded bg-black/40 px-1.5 py-0.5 text-[9px] text-[#8b9595]">
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Runs Selector (when on pipelines tab) */}
                  {activeTab === "pipelines" && (
                    <div className="mt-5 border-t border-white/5 pt-3">
                      <span className="px-2 font-mono text-[10px] tracking-widest text-[#5b6464] uppercase">
                        Active Runs
                      </span>
                      <div className="mt-2 space-y-1">
                        {runs.map((run) => (
                          <button
                            key={run.id}
                            onClick={() => setSelectedRunId(run.id)}
                            className={`w-full text-left rounded-md p-2 font-mono text-[11px] transition-all ${
                              selectedRunId === run.id
                                ? "border border-[#4fe3ea]/30 bg-[#4fe3ea]/10 text-white"
                                : "text-[#8b9595] hover:bg-white/5 hover:text-[#e9eded]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#4fe3ea]">{run.id}</span>
                              <span
                                className={`text-[9px] ${
                                  run.status === "running" ? "text-[#3ddc84]" : "text-[#f0a832]"
                                }`}
                              >
                                {run.status}
                              </span>
                            </div>
                            <div className="truncate text-[10px] text-[#8b9595]">{run.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Interactive Stage */}
                <div className="p-4 md:col-span-9 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    
                    {/* PIPELINES TAB VIEW */}
                    {activeTab === "pipelines" && (
                      <motion.div
                        key="tab-pipelines"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {/* Run Headline */}
                        <div className="border-b border-white/5 pb-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-semibold text-white">
                              {activeRun.id} — {activeRun.name}
                            </span>
                            <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[#4fe3ea]">
                              {activeRun.role}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Graph Node Strip (Plan -> Judge -> Build -> Test -> Ship) */}
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#5b6464] mb-1.5">
                            Pipeline Flow · Click a node to inspect
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {activeRun.steps.map((step, idx) => {
                              const isSelected = selectedStepId === step.id;
                              const isVerified = step.status === "verified";
                              const isRunning = step.status === "running";

                              return (
                                <button
                                  key={step.id}
                                  onClick={() => setSelectedStepId(step.id)}
                                  className={`relative flex flex-col text-left rounded-lg p-2.5 font-mono text-xs transition-all ${
                                    isSelected
                                      ? "border border-[#4fe3ea] bg-[#4fe3ea]/10 shadow-[0_0_15px_rgba(79,227,234,0.15)] text-white"
                                      : "border border-white/10 bg-white/[0.02] text-[#8b9595] hover:border-white/20 hover:text-white"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-white uppercase text-[11px]">
                                      {step.name}
                                    </span>
                                    {isVerified && <CheckCircle2 className="h-3 w-3 text-[#3ddc84]" />}
                                    {isRunning && (
                                      <span className="h-2 w-2 rounded-full bg-[#4fe3ea] animate-pulse" />
                                    )}
                                  </div>
                                  <span className="text-[10px] text-[#8b9595] truncate mt-1">
                                    {step.lane}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Selected Step Inspector Card */}
                        <div className="rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px]">
                            <span className="text-white font-semibold">
                              Packet · {activeStep.name} ({activeStep.status})
                            </span>
                            <span className="text-[#8b9595] text-[10px]">
                              Judge: <b className="text-[#f0a832]">{activeStep.judge}</b>
                            </span>
                          </div>

                          <div className="mt-2 text-[11px] text-[#8b9595]">
                            {activeStep.summary}
                          </div>

                          {activeStep.receipt && (
                            <div className="mt-2 rounded bg-black/60 p-2 text-[10px] text-[#3ddc84] border border-[#3ddc84]/20">
                              <div className="flex items-center justify-between font-bold">
                                <span>RECEIPT {activeStep.receipt.hash}</span>
                                <span>VERDICT: {activeStep.receipt.verdict}</span>
                              </div>
                              <div className="text-[9px] text-[#8b9595] mt-1">
                                Invariants: {activeStep.receipt.invariants.join(" · ")}
                              </div>
                            </div>
                          )}

                          {activeStep.codeSnippet && (
                            <pre className="mt-2 overflow-x-auto rounded bg-black/80 p-2 font-mono text-[10px] text-[#4fe3ea] border border-white/5">
                              {activeStep.codeSnippet}
                            </pre>
                          )}
                        </div>

                        {/* Live Telemetry Speed Chart & Gauges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          {/* Speed Chart */}
                          <div className="rounded-lg border border-white/10 bg-black/30 p-2.5 font-mono text-xs">
                            <div className="flex items-center justify-between text-[10px] text-[#8b9595]">
                              <span>Decode Speed</span>
                              <b className="text-[#4fe3ea]">{telemetry.decodeSpeed} tok/s</b>
                            </div>
                            <div className="mt-2 h-10 w-full">
                              <svg className="h-full w-full" viewBox="0 0 220 52" preserveAspectRatio="none">
                                <polyline
                                  points={chartPoints}
                                  fill="none"
                                  stroke="#4fe3ea"
                                  strokeWidth="1.8"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* GPU Gauge */}
                          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-2.5 font-mono text-xs">
                            <div
                              className="relative flex h-10 w-10 items-center justify-center rounded-full"
                              style={{
                                background: `conic-gradient(#4fe3ea 0% ${telemetry.gpuUsage}%, rgba(255,255,255,0.08) ${telemetry.gpuUsage}% 100%)`,
                              }}
                            >
                              <div className="h-7 w-7 rounded-full bg-[#07090c] flex items-center justify-center text-[9px] font-bold text-white">
                                {telemetry.gpuUsage}%
                              </div>
                            </div>
                            <div>
                              <div className="text-[11px] font-semibold text-white">GPU Metal</div>
                              <div className="text-[10px] text-[#8b9595]">Apple M2 Max</div>
                            </div>
                          </div>

                          {/* Memory Gauge */}
                          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-2.5 font-mono text-xs">
                            <div
                              className="relative flex h-10 w-10 items-center justify-center rounded-full"
                              style={{
                                background: `conic-gradient(#3ddc84 0% 72%, rgba(255,255,255,0.08) 72% 100%)`,
                              }}
                            >
                              <div className="h-7 w-7 rounded-full bg-[#07090c] flex items-center justify-center text-[9px] font-bold text-white">
                                72%
                              </div>
                            </div>
                            <div>
                              <div className="text-[11px] font-semibold text-white">{telemetry.memoryUsage} / 8 GB</div>
                              <div className="text-[10px] text-[#8b9595]">Unified RAM</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* AGENTS TAB VIEW */}
                    {activeTab === "agents" && (
                      <motion.div
                        key="tab-agents"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="border-b border-white/5 pb-2 text-xs font-mono text-[#8b9595]">
                          The Brigade: pinned models, named roles, bounded budgets
                        </div>
                        <div className="space-y-2">
                          {agents.map((agent) => (
                            <div
                              key={agent.id}
                              className="rounded-xl border border-white/10 bg-white/[0.02] p-3 font-mono text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white">{agent.role}</span>
                                <span className="rounded bg-[#3ddc84]/10 px-2 py-0.5 text-[10px] text-[#3ddc84]">
                                  {agent.status}
                                </span>
                              </div>
                              <div className="text-[11px] text-[#4fe3ea] mt-1">{agent.pinnedModel}</div>
                              <div className="text-[10px] text-[#8b9595] mt-1">{agent.description}</div>
                              <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-1.5 text-[10px] text-[#5b6464]">
                                <span>Budget: {agent.budget}</span>
                                <span>Consumed: {agent.consumed}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* MCP SERVERS TAB VIEW */}
                    {activeTab === "mcp" && (
                      <motion.div
                        key="tab-mcp"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="border-b border-white/5 pb-2 text-xs font-mono text-[#8b9595]">
                          Model Context Protocol Servers (typed, sandboxed, local)
                        </div>
                        <div className="space-y-2.5">
                          {mcpServers.map((server) => (
                            <div
                              key={server.id}
                              className="rounded-xl border border-white/10 bg-white/[0.02] p-3 font-mono text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-[#3ddc84]" />
                                  <span className="font-bold text-white">{server.name}</span>
                                  <span className="text-[10px] text-[#8b9595]">
                                    ({server.transport} · {server.latency})
                                  </span>
                                </div>
                                <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-[#4fe3ea]">
                                  {server.toolCount} tools
                                </span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {server.tools.map((t) => (
                                  <span
                                    key={t}
                                    className="rounded bg-black/50 px-2 py-0.5 text-[10px] text-[#8b9595] border border-white/5"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* SKILLS TAB VIEW */}
                    {activeTab === "skills" && (
                      <motion.div
                        key="tab-skills"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs font-mono text-[#8b9595]">
                          <span>Portable Skills.md Contract</span>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(skills[0].content);
                              setCopiedContract(true);
                              setTimeout(() => setCopiedContract(false), 2000);
                            }}
                            className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-[#4fe3ea] hover:bg-white/10"
                          >
                            {copiedContract ? "Copied!" : "Copy Contract"}
                          </button>
                        </div>
                        <div className="space-y-2">
                          {skills.map((skill) => (
                            <div
                              key={skill.id}
                              className="rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[#4fe3ea]">{skill.name}</span>
                                <span className="text-[10px] text-[#8b9595]">
                                  tools: [{skill.tools.join(", ")}]
                                </span>
                              </div>
                              <pre className="mt-2 overflow-x-auto rounded bg-black/80 p-2.5 text-[10px] text-[#e9eded] border border-white/5 leading-relaxed">
                                {skill.content}
                              </pre>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* AUDIT LOG TAB VIEW */}
                    {activeTab === "audit" && (
                      <motion.div
                        key="tab-audit"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="border-b border-white/5 pb-2 text-xs font-mono text-[#8b9595]">
                          Append-Only Ledger · Zero network egress · SHA-256 verifiable
                        </div>
                        <div className="space-y-1.5 font-mono text-xs">
                          {ledgerEvents.map((evt) => (
                            <div
                              key={evt.seq}
                              className="flex items-center justify-between rounded-lg border border-white/5 bg-black/40 px-3 py-2 text-[11px]"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[#f0a832]">#{evt.seq}</span>
                                <span className="text-white">{evt.detail}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] text-[#8b9595]">{evt.hash}</span>
                                <span className="rounded bg-[#3ddc84]/10 px-1.5 py-0.5 text-[9px] text-[#3ddc84]">
                                  sealed
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Right Side Panels (03 & 04) */}
        <div className="hidden flex-col gap-6 lg:col-span-3 lg:flex">
          {/* Panel 03: Tools and Skills Node DAG */}
          <div className="group relative rounded-2xl border border-white/10 bg-[#090b0e]/80 p-3.5 backdrop-blur-xl transition-all duration-500 hover:border-[#4fe3ea]/40 hover:shadow-[0_0_25px_rgba(79,227,234,0.12)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] tracking-widest text-[#8b9595] uppercase font-mono">
              <span>Tools and Skills</span>
              <span className="text-[#4fe3ea]">03</span>
            </div>
            <div className="mt-3 flex h-36 items-center justify-center rounded-xl border border-white/5 bg-[#050607] p-2">
              <svg className="h-full w-full" viewBox="0 0 200 160" preserveAspectRatio="xMidYMid meet">
                <g stroke="rgba(120,200,210,0.4)" strokeWidth="1">
                  <line x1="100" y1="20" x2="42" y2="70" />
                  <line x1="100" y1="20" x2="158" y2="70" />
                  <line x1="42" y1="70" x2="100" y2="120" />
                  <line x1="158" y1="70" x2="100" y2="120" />
                  <line x1="42" y1="70" x2="158" y2="70" opacity="0.4" />
                </g>
                <rect x="76" y="8" width="48" height="24" rx="5" fill="#12161c" stroke="rgba(79,227,234,0.65)" />
                <circle cx="42" cy="70" r="10" fill="#101318" stroke="rgba(79,227,234,0.55)" />
                <circle cx="158" cy="70" r="10" fill="#101318" stroke="rgba(240,168,50,0.7)" />
                <circle cx="100" cy="120" r="11" fill="#101318" stroke="rgba(79,227,234,0.8)" />
                <circle cx="100" cy="20" r="3" fill="#4fe3ea" />
                <circle cx="100" cy="120" r="3" fill="#4fe3ea" />
                <circle cx="158" cy="70" r="3" fill="#f0a832" />
              </svg>
            </div>
          </div>

          {/* Panel 04: Research Hub Constellation */}
          <div className="group relative rounded-2xl border border-white/10 bg-[#090b0e]/80 p-3.5 backdrop-blur-xl transition-all duration-500 hover:border-[#4fe3ea]/40 hover:shadow-[0_0_25px_rgba(79,227,234,0.12)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] tracking-widest text-[#8b9595] uppercase font-mono">
              <span>Research Hub</span>
              <span className="text-[#4fe3ea]">04</span>
            </div>
            <div className="mt-3 flex h-36 items-center justify-center rounded-xl border border-white/5 bg-[#050607] p-2">
              <svg className="h-full w-full" viewBox="0 0 200 160" preserveAspectRatio="xMidYMid meet">
                <g stroke="rgba(150,160,255,0.3)" strokeWidth="0.8">
                  <polyline points="34,30 66,58 92,36 128,66" fill="none" />
                  <polyline points="52,110 88,134 130,116 158,138" fill="none" />
                  <polyline points="140,26 162,50 150,80" fill="none" />
                </g>
                <g fill="rgba(255,255,255,0.75)">
                  <circle cx="34" cy="30" r="2" fill="#4fe3ea" />
                  <circle cx="66" cy="58" r="1.5" />
                  <circle cx="92" cy="36" r="1.8" />
                  <circle cx="128" cy="66" r="2.2" fill="#f0a832" />
                  <circle cx="52" cy="110" r="1.5" />
                  <circle cx="88" cy="134" r="2" />
                  <circle cx="130" cy="116" r="1.6" />
                  <circle cx="158" cy="138" r="2.2" fill="#3ddc84" />
                </g>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
