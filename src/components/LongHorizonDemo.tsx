import { useState } from "react";
import { Activity, ChevronRight, Clock3, Cpu, Database, GitBranch, ShieldCheck } from "lucide-react";

const stages = [
  { id:"intent", title:"Mission contract", lane:"META / PLANNER", time:"00:00", state:"verified", detail:"Objective, constraints, resource ceiling and stop conditions are pinned before delegation." },
  { id:"retrieve", title:"Research retrieval", lane:"RESEARCH / RAG", time:"00:18", state:"verified", detail:"Paper sections and local code are ranked against the mission and linked to source receipts." },
  { id:"plan", title:"Dependency plan", lane:"META / PLANNER", time:"00:31", state:"verified", detail:"A 36-hour task horizon is split into resumable packets with explicit dependencies." },
  { id:"worker-a", title:"Kernel memory path", lane:"RUNTIME / WORKER A", time:"01:42", state:"running", detail:"Worker A is measuring a memory-bounded attention path inside an isolated worktree." },
  { id:"worker-b", title:"Scheduler supervision", lane:"RUNTIME / WORKER B", time:"01:49", state:"running", detail:"Worker B is checking crash recovery and idempotent retry behavior against the task contract." },
  { id:"checkpoint", title:"Durable checkpoint", lane:"MEMORY / CHECKPOINT", time:"02:03", state:"running", detail:"An intermediate state snapshot preserves task ancestry, selected context and resource counters." },
  { id:"critique", title:"Adversarial review", lane:"REVIEW / CRITIC", time:"—", state:"queued", detail:"Independent review tests the patch against failure cases and declared invariants." },
  { id:"verify", title:"Replay + receipts", lane:"VERIFY / JUDGE", time:"—", state:"queued", detail:"The replay links inputs, tool calls, branch results and checks into one inspectable record." },
];
const wires: [number,number][] = [[0,1],[1,2],[2,3],[2,4],[3,5],[4,5],[5,6],[6,7]];
const left = [8,31,54,31,54,43,31,54];
const top = [10,10,10,43,43,74,74,74];

export function LongHorizonDemo() {
  const [selected,setSelected]=useState(3);
  const [window,setWindow]=useState(36);
  const current=stages[selected];
  const completed=stages.filter(s=>s.state==="verified").length;
  return <div className="long-horizon-shell">
    <div className="long-horizon-bar"><span><span className="brand-monogram-mini">A</span> MADMIND / LONG-HORIZON RUN</span><span><i/> DEMO REPLAY · LOCAL ONLY</span></div>
    <div className="long-horizon-toolbar"><div><b>BRG-271</b><span>Adaptive inference on 8 GB unified memory</span></div><label><Clock3 size={12}/> HORIZON <select value={window} onChange={e=>setWindow(Number(e.target.value))}><option value={12}>12 hours</option><option value={36}>36 hours</option><option value={72}>72 hours</option></select></label></div>
    <div className="long-horizon-layout">
      <aside className="horizon-rail"><span className="horizon-label">MISSION TREE</span><button className="tree-active"><GitBranch size={13}/> BRG-271 / ROOT</button><button className="tree-child">↳ retrieval/semantic-map</button><button className="tree-child">↳ runtime/attention-path</button><button className="tree-child">↳ scheduler/supervision</button><button className="tree-child">↳ verification/adversarial</button><div className="horizon-resource"><span><Cpu size={12}/> COMPUTE BUDGET</span><b>6.2 <small>/ 8 GB</small></b><div><i style={{width:"77.5%"}}/></div><span><Database size={12}/> CHECKPOINTS <b>04</b></span><span><ShieldCheck size={12}/> TOOL SCOPE <b>PINNED</b></span></div></aside>
      <section className="horizon-canvas"><div className="horizon-canvas-head"><span>DEPENDENCY DAG <small>· {window}H MISSION WINDOW</small></span><span>{completed}/8 COMPLETE <i/> 02 RUNNING <i/></span></div><div className="horizon-graph"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{wires.map(([from,to],i)=><path key={i} d={`M ${left[from]+14} ${top[from]+9} C ${(left[from]+left[to])/2+14} ${top[from]+9}, ${(left[from]+left[to])/2+14} ${top[to]+9}, ${left[to]+14} ${top[to]+9}`} className={stages[from].state==="verified"?"wire-done":stages[from].state==="running"?"wire-active":""}/>)}</svg>{stages.map((stage,index)=><button key={stage.id} className={`horizon-node ${stage.state} ${selected===index?"selected":""}`} style={{left:`${left[index]}%`,top:`${top[index]}%`}} onClick={()=>setSelected(index)}><span><i/>{stage.lane}</span><b>{stage.title}</b><small>{stage.time} · {stage.state.toUpperCase()}</small></button>)}</div><div className="horizon-scrub"><span>MISSION WINDOW</span><input type="range" min="0" max="7" value={selected} onChange={e=>setSelected(Number(e.target.value))} aria-label="Scrub through long-horizon run"/><span>{selected+1} / 08</span></div></section>
      <aside className="horizon-inspector"><span className="horizon-label">SELECTED EVENT / {String(selected+1).padStart(2,"0")}</span><span className={`horizon-state ${current.state}`}>{current.state.toUpperCase()}</span><h3>{current.title}</h3><p>{current.detail}</p><div className="horizon-inspector-stats"><span>EVENT TIME<b>{current.time}</b></span><span>ATTEMPT<b>01 / 03</b></span><span>CHECKPOINT<b>{selected>=5?"4":"—"}</b></span></div><div className="horizon-event"><Activity size={13}/><span>Event receipt attached<small>Prompt, context, tool scope, output and verdict stay linked.</small></span><ChevronRight size={12}/></div></aside>
    </div>
    <div className="long-horizon-footer"><span>LONG HORIZON ≠ LONG PROMPT</span><span>Durable state · bounded context · resumable branches</span><span>DEMO METRICS · NOT A LIVE RUNTIME</span></div>
  </div>;
}
