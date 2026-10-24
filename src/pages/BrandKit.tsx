import { useState } from "react";
import { Check, Copy, MoveUpRight } from "lucide-react";

const marks = [
  { id: "core", name: "Core / Orbital lattice", src: "/atoma-mark.svg", note: "Systems thinking, connected evidence, controlled motion." },
  { id: "orbit", name: "Orbit / Multi-model mind", src: "/atoma-mark-orbit.svg", note: "A living system of models around one harness." },
  { id: "matrix", name: "Matrix / Evidence graph", src: "/atoma-mark-matrix.svg", note: "Structured engineering, measurable state, durable records." },
  { id: "sigil", name: "Sigil / Engineering A", src: "/atoma-mark-sigil.svg", note: "A direct monogram built for the Atoma Engineering Labs name." },
];
const taglines = ["Build intelligence you can inspect.", "Research-grade systems. First-principles engineering.", "Make every agent action accountable."];
const palette = [
  ["Obsidian", "#090c0f"], ["Graphite glass", "#171c20"], ["Titanium", "#aab5bd"], ["Paper", "#e8e6df"], ["Matte blue", "#788fa6"],
];

export default function BrandKit() {
  const [active, setActive] = useState("core");
  const [tagline, setTagline] = useState(taglines[0]);
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard?.writeText(tagline); setCopied(true); window.setTimeout(() => setCopied(false), 1300); };
  return <div className="brand-kit-page">
    <div className="brand-kit-eyebrow">ATOMA ENGINEERING LABS <i>·</i> IDENTITY STUDY 01</div>
    <h1>Principled systems.<br/><em>Visible intelligence.</em></h1>
    <p className="brand-kit-lede">A mark and voice for research-grade agentic engineering: precise, calm, and made to hold up under scrutiny.</p>
    <section className="brand-mark-grid" aria-label="Atoma logo concepts">
      {marks.map((mark, index) => <button key={mark.id} className={`brand-mark-option ${active===mark.id?"selected":""}`} onClick={() => setActive(mark.id)}>
        <span className="brand-option-index">0{index+1} / MARK STUDY</span><img src={mark.src} alt=""/><b>{mark.name}</b><small>{mark.note}</small>{active===mark.id&&<span className="brand-selected"><Check size={12}/> CURRENT DIRECTION</span>}
      </button>)}
    </section>
    <section className="brand-kit-lower"><div className="brand-tagline-panel"><span>VOICE / SELECT A LINE</span><div>{taglines.map((line,index)=><button key={line} className={tagline===line?"selected":""} onClick={()=>setTagline(line)}><i>0{index+1}</i>{line}</button>)}</div><p>{tagline}<button onClick={copy} aria-label="Copy selected tagline">{copied?<Check size={13}/>:<Copy size={13}/>}</button></p></div>
      <div className="brand-palette"><span>COLOR / MATERIAL</span><div>{palette.map(([name,color])=><div key={name}><i style={{backgroundColor:color}}/><b>{name}</b><small>{color}</small></div>)}</div></div></section>
    <a className="brand-kit-back" href="/"><MoveUpRight size={14}/> Return to the site</a>
  </div>;
}
