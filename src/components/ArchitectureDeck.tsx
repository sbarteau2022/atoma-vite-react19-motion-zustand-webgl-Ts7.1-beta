import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowRight, Cpu, Layers3, MemoryStick, Orbit } from "lucide-react";

const systems = [
  { key: "serve", icon: Cpu, label: "Native serving", title: "A runtime close to the metal.", body: "Rust and C++ serving paths are designed around local hardware, with kernel fusion as a measured optimization target.", status: "FOUNDATION / IN BUILD" },
  { key: "schedule", icon: Layers3, label: "Supervised scheduling", title: "Recoverable work, by design.", body: "An Erlang/OTP-inspired scheduler supervises isolated jobs, makes retries explicit, and keeps failure boundaries visible.", status: "DESIGN TARGET" },
  { key: "memory", icon: MemoryStick, label: "Dynamic memory", title: "Move context where it can work.", body: "Paging, attention disaggregation, and prefill offload are planned as dynamic paths for constrained local memory.", status: "RESEARCH / ROADMAP" },
  { key: "mind", icon: Orbit, label: "Multi-model mind", title: "Models plug into one harness.", body: "Model plugins, nested hyperbolic KV, and active-inference loops explore adaptive iteration under explicit control.", status: "ROADMAP" },
];

export function ArchitectureDeck() {
  const [active, setActive] = useState("serve");
  const current = systems.find((item) => item.key === active) ?? systems[0];
  return <section className="architecture-deck story-beat" id="architecture">
    <div className="story-content">
    <div className="section-index"><span>3.0</span><i>RUNTIME ARCHITECTURE · LOCAL SYSTEMS · ADAPTIVE INFERENCE</i></div>
    <div className="architecture-head"><div><h2>Built for the machine<br/><em>you actually have.</em></h2><p>Native compute, supervised execution, and deliberate memory movement — a systems stack designed to make powerful agent loops practical on local hardware.</p></div><span className="roadmap-label">BUILD DIRECTION · CLAIMS LABELED</span></div>
    <div className="architecture-workbench">
      <div className="architecture-map"><div className="architecture-map-head"><span><i/> ATOMA CORE / SYSTEM MAP</span><span>LOCAL-FIRST · MODULAR</span></div><div className="runtime-flow">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M12 48H88M30 48V19H47M52 48V19M70 48V19H53M30 51V81H48M52 51V81M70 51V81H53"/><path d="M47 19H53M48 81H53" className="flow-accent"/></svg>
        <div className="runtime-node node-client"><small>INTERFACE</small><b>Agentic<br/>workloads</b></div>
        <button className={`runtime-node runtime-serving ${active==="serve"?"active":""}`} onClick={()=>setActive("serve")}><small>01 · COMPUTE</small><b>Rust / C++<br/>server</b><span>Metal · WebGPU</span></button>
        <button className={`runtime-node runtime-scheduler ${active==="schedule"?"active":""}`} onClick={()=>setActive("schedule")}><small>02 · CONTROL</small><b>OTP-style<br/>scheduler</b><span>supervision tree</span></button>
        <button className={`runtime-node runtime-memory ${active==="memory"?"active":""}`} onClick={()=>setActive("memory")}><small>03 · MEMORY</small><b>Dynamic paging<br/>&amp; prefill</b><span>disaggregation target</span></button>
        <button className={`runtime-node runtime-mind ${active==="mind"?"active":""}`} onClick={()=>setActive("mind")}><small>04 · ADAPTATION</small><b>Multi-model<br/>mind</b><span>active inference loops</span></button>
        <div className="runtime-node node-evidence"><small>ALWAYS ATTACHED</small><b>Telemetry +<br/>replay evidence</b></div>
        <div className="runtime-orbit"><Orbit size={21}/><span>ATOMA<br/>HARNESS</span></div>
      </div><div className="architecture-map-foot"><span>ITERATE ONLY WHEN THE EVIDENCE SAYS SO</span><span>HYPERBOLIC KV: ROADMAP</span></div></div>
      <aside className="architecture-inspector"><span className="architecture-label">SYSTEM LAYER / 0{systems.findIndex((item)=>item.key===active)+1}</span><AnimatePresence mode="wait"><motion.div key={current.key} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.18}}><div className="architecture-icon"><current.icon size={18}/></div><h3>{current.title}</h3><p>{current.body}</p><span className="architecture-status">{current.status}</span></motion.div></AnimatePresence><div className="architecture-selector">{systems.map((item)=>{const Icon=item.icon;return <button key={item.key} className={active===item.key?"active":""} onClick={()=>setActive(item.key)}><Icon size={13}/>{item.label}<ArrowRight size={12}/></button>;})}</div><a href="/harness">Explore harness theory <ArrowDownRight size={13}/></a></aside>
    </div>
    </div>
  </section>;
}
