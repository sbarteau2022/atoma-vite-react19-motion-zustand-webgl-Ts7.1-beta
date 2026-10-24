import { lazy, Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, ArrowUpRight, Check, Code2, GitBranch, History, Pause, Play, RotateCcw, Send, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { demoEdges, demoNodes, demoPhases, getDemoNodeState, useHeroDemoStore, type DemoWorkspace } from "../store/useHeroDemoStore";

gsap.registerPlugin(ScrollTrigger);
const workspaces: DemoWorkspace[] = ["Pipelines", "Agents", "MCP Servers", "Skills", "Audit Log"];
const laneNodes = [
  { id: "intent", name: "META", title: "Orchestrator" },
  { id: "research", name: "R&D", title: "Research agent" },
  { id: "build", name: "BUILD A", title: "Runtime builder" },
  { id: "docs", name: "BUILD B", title: "Docs builder" },
  { id: "audit", name: "SEC", title: "Security review" },
] as const;
const phaseProgress = [14, 31, 58, 86, 100];
function Mark() { return <img src="/atoma-mark.svg" alt=""/>; }
function MetaMark() { return <svg viewBox="0 0 24 16" aria-hidden="true"><path d="M2 11.8C3.4 5.3 6.6 2 9 2c2 0 3.8 3.1 6 7.2C17.1 13 18.4 14 20 13c1.5-1 2-3.2 1.5-5.2C21 5 19 3 17 3c-2.2 0-4.2 2.6-6.6 6.7C8.2 13.4 6.5 14.5 5 13.8 3 13 2.4 11.7 2 11.8Z"/></svg>; }
const OrbitalScene = lazy(() => import("./OrbitalScene"));

export function InteractiveHero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState("");
  const workspace = useHeroDemoStore((s) => s.workspace);
  const setWorkspace = useHeroDemoStore((s) => s.setWorkspace);
  const view = useHeroDemoStore((s) => s.view);
  const setView = useHeroDemoStore((s) => s.setView);
  const phase = useHeroDemoStore((s) => s.phase);
  const isPlaying = useHeroDemoStore((s) => s.isPlaying);
  const togglePlayback = useHeroDemoStore((s) => s.togglePlayback);
  const advance = useHeroDemoStore((s) => s.advance);
  const previous = useHeroDemoStore((s) => s.previous);
  const setPhase = useHeroDemoStore((s) => s.setPhase);
  const replay = useHeroDemoStore((s) => s.replay);
  const selectedNodeId = useHeroDemoStore((s) => s.selectedNodeId);
  const selectNode = useHeroDemoStore((s) => s.selectNode);
  const messages = useHeroDemoStore((s) => s.messages);
  const sendCommand = useHeroDemoStore((s) => s.sendCommand);
  const nodes = demoNodes.map((node) => ({ ...node, state: getDemoNodeState(phase, node.id) }));
  const active = nodes.find((node) => node.id === selectedNodeId) ?? nodes[3];
  const verified = nodes.filter((node) => node.state === "verified").length;
  const progress = phaseProgress[phase];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => useHeroDemoStore.getState().advance(), 2600);
    return () => window.clearInterval(timer);
  }, [isPlaying]);
  useEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-side-card.left", { x: -24, y: 22, rotate: -5, opacity: .35, scale: .92, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: .8 } });
      gsap.to(".hero-side-card.right", { x: 24, y: 22, rotate: 5, opacity: .35, scale: .92, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: .8 } });
      gsap.fromTo(".hero-product-window", { y: 22, scale: .98 }, { y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 60%", end: "top 12%", scrub: .7 } });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  function send(e: FormEvent) { e.preventDefault(); sendCommand(draft); setDraft(""); }
  const phaseState = phase === 4 ? "REPLAY SEALED" : isPlaying ? "RUNNING WALKTHROUGH" : "PAUSED DEMO";
  const statusText = (state: string) => state === "verified" ? "✓ VERIFIED" : state === "running" ? "● IN PROGRESS" : "○ QUEUED";

  return <section className="atoma-hero" ref={root} aria-labelledby="hero-title">
    <div className="hero-copy"><div className="meta-event-band" id="metabuild"><span className="meta-event-copy"><i/> BUILT FOR THE METABUILD COMMUNITY <span className="event-slash">/</span> META GLOBAL HACKATHON 2026</span><div className="meta-sponsors" aria-label="MetaBuild event and ecosystem names"><b className="meta-wordmark"><MetaMark/> Meta</b><span className="event-brand cerebral"><i>CV</i>Cerebral Valley</span><span className="event-brand baseten"><i>✣</i>Baseten</span><span className="event-brand modal"><i>m</i>Modal</span><span className="event-brand fireworks"><i>✳</i>Fireworks</span></div></div>
      <div className="hero-kicker"><span className="live-dot"/> META GLOBAL HACKATHON <i>·</i> 10 BUILD SPRINT <i>·</i> SOLO DEVELOPER TRACK</div>
      <h1 id="hero-title">Great engineering<br/><em>starts with first principles.</em></h1><p className="hero-description">One command center for the agentic swarm.<br className="desktop-break"/> Direct the work. Watch every branch. Keep the evidence.</p>
      <div className="hero-ctas"><Link className="btn btn-white" to="/brigade">Demo the Brigade <ArrowUpRight size={16}/></Link><Link className="btn request-v1" to="/contact"><span>Request v1 MadMind Brigade</span><span className="hero-os">macOS <i>·</i> Linux <i>·</i> Windows</span></Link></div>
    </div>
    <div className="hero-showcase" aria-label="Interactive Brigade command center preview"><div className="hero-scene-glow" aria-hidden="true"><Suspense fallback={null}><OrbitalScene/></Suspense></div>
      <div className="hero-side-card left" aria-hidden="true"><small>BRIGADE MOBILE</small><b>Every run,<br/>in motion.</b><span><Activity size={15}/> 4 agents active</span><div className="side-mini-graph">{[0,1,2,3,4,5].map(i=><i key={i}/>)}</div></div>
      <div className="hero-side-card right" aria-hidden="true"><small>RELATIONAL RESEARCH</small><b>Ideas connected<br/>to evidence.</b><div className="side-graph">{[0,1,2,3,4,5,6].map(i=><i key={i}/>)}</div><span>12 sources · 3 branches</span></div>
      <motion.div className="hero-product-window" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7,ease:"easeOut"}}>
        <header className="ide-chrome"><div className="chrome-brand"><Mark/><span>ATOMA <i>//</i> BRIGADE</span><small>WORKSPACE PREVIEW</small></div><div className="chrome-path">brigade://pipeline/orchestrator</div><div className="chrome-live"><i/> GUIDED DEMO</div></header>
        <div className="ide-toolbar"><div><span className="workspace-name">tokio-runtime</span><span className="run-state"><i/> {phaseState}</span></div><div className="ide-tabs">{(["Graph","Code","Logs","Replay"] as const).map(t=><button key={t} className={view===t?"selected":""} onClick={()=>setView(t)}>{t==="Graph"?<GitBranch size={13}/>:t==="Code"?<Code2 size={13}/>:t==="Logs"?<Terminal size={13}/>:<History size={13}/>} {t}</button>)}</div><button className="run-button" onClick={togglePlayback}>{isPlaying?<Pause size={12} fill="currentColor"/>:<Play size={12} fill="currentColor"/>} {isPlaying?"Pause":"Play"}</button></div>
        <div className="run-timeline" aria-label="Guided replay controls"><span>BRG-142 <b>{String(phase+1).padStart(2,"0")}/05</b></span><div className="phase-track">{demoPhases.map((item,index)=><button key={item.label} className={index===phase?"current":index<phase?"complete":""} onClick={()=>setPhase(index)} aria-label={`Show ${item.label} phase`} title={`${item.label}: ${item.event}`}><i/></button>)}</div><button onClick={previous} aria-label="Previous phase">‹</button><button onClick={advance} aria-label="Next phase">›</button><button className="replay-control" onClick={replay}><RotateCcw size={10}/> Replay</button></div>
        <div className="ide-layout"><aside className="ide-sidebar"><div className="ide-side-label">WORKSPACE</div>{workspaces.map((name,i)=><button key={name} className={workspace===name?"on":""} onClick={()=>setWorkspace(name)}><span>{["▦","◆","▤","✳","≡"][i]}</span>{name}<span className="side-chevron">›</span></button>)}<div className="side-divider"/><div className="ide-side-label">AGENT LANES <span>05</span></div>{laneNodes.map((lane)=><button key={lane.id} className="run-row" onClick={()=>{setWorkspace("Pipelines");selectNode(lane.id);}}><i className={`lane-${getDemoNodeState(phase,lane.id)}`}/><span><b>{lane.name}</b><small>{lane.title}</small></span></button>)}<div className="sidebar-telemetry"><span>DEMO POLICY</span><b><i/> Scoped workspace</b><small>Receipt per transition</small></div></aside>
          <main className="ide-main"><div className="ide-panel-heading"><span>{workspace==="Pipelines"?"ACTIVE RUN DAG":workspace.toUpperCase()}</span><span className="demo-label">DEMO DATA <i/></span></div>
            <AnimatePresence mode="wait"><motion.div key={view+workspace} className={`hero-main-view ${view==="Graph"?"graph-view":"detail-view"}`} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.2}}>
              {view==="Graph"&&workspace==="Pipelines"?<div className="dag-preview"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{demoEdges.map(([from,to],i)=>{const a=nodes[from],b=nodes[to];const state=a.state==="verified"&&b.state==="verified"?"complete":a.state!=="queued"&&b.state!=="queued"?"live":"queued";return <path key={i} d={`M ${a.x+10} ${a.y+12} C ${a.x+14} ${(a.y+b.y)/2}, ${b.x+4} ${(a.y+b.y)/2}, ${b.x+10} ${b.y+12}`} className={`edge-${state}`}/>;})}</svg>{nodes.map(n=><button key={n.id} className={`dag-node node-${n.state} ${selectedNodeId===n.id?"active":""}`} style={{left:`${n.x}%`,top:`${n.y}%`}} onClick={()=>selectNode(n.id)}><span className="node-top"><i/>{n.tag}</span><b>{n.title}</b><small>{statusText(n.state)}</small></button>)}</div>
              :view==="Code"?<div className="code-preview"><div><span>●</span> {active.codeFile} <small>INSPECT</small></div><pre>{active.code.join("\n")}</pre></div>
              :view==="Logs"||workspace==="Audit Log"?<div className="log-preview"><div className="log-head">DEMO EVENT TRAIL <span>· EPHEMERAL</span></div>{demoPhases.slice(0,phase+1).map((item,index)=><p key={item.label} className={index===phase?"log-current":""}><i/>{`T+00:${String(index*3).padStart(2,"0")}  ${item.event}`}</p>)}</div>
              :view==="Replay"?<div className="replay-preview"><History size={22}/><b>BRG-142 replay</b><span>{phase+1} of 5 transitions · preview receipt {phase===4?"sealed":"in progress"}</span><p>{demoPhases[phase].detail}</p><button onClick={replay}><RotateCcw size={12}/> Replay guided run</button></div>
              :<div className="workspace-overview"><span>{workspace.toUpperCase()} / LIVE DEMO INVENTORY</span>{laneNodes.slice(0,4).map(lane=><div key={lane.id} onClick={()=>selectNode(lane.id)}><i className={`lane-${getDemoNodeState(phase,lane.id)}`}/><b>{lane.name} · {lane.title}</b><small>{getDemoNodeState(phase,lane.id)}</small></div>)}<p>Walk the same run across each workspace surface.</p></div>}
            </motion.div></AnimatePresence>
            <div className="ide-detail-row"><div className="selected-task"><div className="detail-top"><span><Sparkles size={12}/> SELECTED WORK PACKET</span><span>0{nodes.indexOf(active)+1} / 07</span></div><b>{active.title}</b><small>{active.tag} <i>·</i> {active.evidence}</small><div className="detail-progress"><i style={{width:active.state==="verified"?"100%":active.state==="running"?`${progress}%`:"0%"}}/></div></div><div className="telemetry-mini"><span><Activity size={12}/> DEMO TELEMETRY</span><div><b>{verified}/7</b><small>verified</small><b>{String(phase+1).padStart(2,"0")}/05</b><small>phase</small></div><div className="spark-bars">{[24,42,29,63,40,72,55,84,48,67,38,76,58,90,48,71,60,82].map((h,i)=><i key={i} style={{height:`${Math.max(8,h*(.25+progress/100))}%`}}/>)}</div></div></div>
          </main>
          <aside className="ide-chat"><div className="chat-head"><div><span><Mark/> META ORCHESTRATOR</span><small>Single command channel · demo</small></div><span className="chat-secure"><ShieldCheck size={13}/> SCOPED</span></div><div className="chat-context"><span>RUN CONTEXT <i>BRG-142 · {phase+1}/05</i></span><b>Refactor tokio runtime scheduler</b><small>{demoPhases[phase].label} · {nodes.filter(n=>n.state==="running").length} lanes active</small></div><div className="chat-messages" aria-live="polite">{messages.map((message)=><motion.div key={message.id} className={`chat-msg ${message.role==="user"?"user-msg":"agent-msg"}`} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}}><span>{message.role==="user"?"YOU":"ATOMA"}</span><p>{message.text}</p></motion.div>)}</div><div className="chat-suggestion"><button onClick={()=>setDraft("Show me the active run risks")}>Review risks <ArrowUpRight size={11}/></button><button onClick={()=>setDraft("Summarize the last verified receipt")}>Summarize receipt <ArrowUpRight size={11}/></button></div><form className="chat-input" onSubmit={send}><input aria-label="Command the Meta Orchestrator" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Command the Meta Orchestrator…"/><button aria-label="Send command" type="submit"><Send size={15}/></button><small>LOCAL DEMO · NO BACKEND CONNECTION</small></form></aside>
        </div><footer className="ide-footer"><span><i/> Demo replay · transient local state</span><span><Check size={12}/> {phase+1} event{phase===0?"":"s"} in trail</span><span>MACOS · LINUX · WINDOWS</span><button onClick={replay}>Restart walkthrough <RotateCcw size={10}/></button><Link to="/brigade">Open full workspace <ArrowUpRight size={12}/></Link></footer>
      </motion.div>
    </div>
    <div className="hero-capability-strip"><span><GitBranch/> Brigade workflows <small>Progress in real time</small></span><span><Activity/> Relational graph <small>Research mapped to evidence</small></span><span><Code2/> Design workspace <small>One place to direct the swarm</small></span></div><div className="hero-scroll-cue"><button onClick={()=>document.querySelector("#brigade")?.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"})}>SCROLL TO FOLLOW THE WORKFLOW</button><i/></div>
  </section>;
}
