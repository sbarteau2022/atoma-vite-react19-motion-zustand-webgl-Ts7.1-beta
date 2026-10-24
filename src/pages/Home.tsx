import { Link } from "react-router-dom";
import { SectionHead } from "../components.jsx";
import { InteractiveHero } from "../components/InteractiveHero";
import { ArchitectureDeck } from "../components/ArchitectureDeck";
import { LongHorizonDemo } from "../components/LongHorizonDemo";
import { ResearchPreview } from "../components/ResearchPreview";
import { ScrollJourney } from "../components/ScrollJourney";

export default function Home() {
  return (
    <div className="home-root">
      <InteractiveHero />
      <ScrollJourney />

      {/* =========================================================================
          1.0 Brigade App v1
          ========================================================================= */}
      <section id="brigade" className="story-beat">
        <div className="story-content">
        <SectionHead
          num="1.0"
          label="Brigade App v1"
          title="Long-horizon work"
          tone="you can inspect."
        >
          Research-grade agentics for constrained hardware. Follow a mission across
          bounded branches, durable checkpoints, resource budgets, and independent
          verification. This is an interactive systems preview, not live runtime telemetry.
        </SectionHead>
        <LongHorizonDemo />
        </div>
      </section>

      <section id="infrastructure" className="harness-theory story-beat">
        <div className="story-content">
        <div className="section-index"><span>2.0</span><i>AGENTIC HARNESS THEORY · CONTROL PLANE · EVIDENCE</i></div>
        <div className="harness-head"><div className="split-head"><h2>Intelligence needs<br/><em>a harness.</em></h2><p className="side-copy">Models generate possibilities. A harness turns them into bounded work: typed tools, isolated agents, explicit handoffs, and receipts you can inspect.</p></div></div>
        <div className="harness-hero"><div className="harness-visual"><div className="harness-visual-top"><span><i/> MADMIND / ORCHESTRATION MODEL</span><b>CONCEPTUAL SYSTEM · V1 FOUNDATION</b><span>RUN BRG-142</span></div><div className="harness-flow"><svg className="harness-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M19 20 C30 20 30 20 40 20 S59 20 69 20 S79 24 80 35 L80 65 S70 78 60 78 S40 78 30 78 S20 72 20 60 L20 35 S30 35 40 35"/><path d="M19 20 C20 40 42 46 50 58 M40 20 C45 38 48 48 50 58 M69 20 C62 38 57 48 50 58 M20 60 C31 61 42 59 50 58 M80 65 C69 62 57 59 50 58 M50 58 C50 72 50 79 50 90"/></svg><div className="harness-stage stage-intent"><small>01 / INTENT</small><b>Define the outcome</b><span>scope · constraints · policy</span></div><div className="harness-stage stage-plan"><small>02 / PLAN</small><b>Decompose the work</b><span>typed packets · dependencies</span></div><div className="harness-stage stage-replay"><small>03 / RESEARCH</small><b>Ground decisions</b><span>sources · context graph</span></div><div className="harness-stage stage-swarm"><small>04 / EXECUTE</small><b>Delegate in isolation</b><span>least privilege · worktrees</span></div><div className="harness-stage stage-check"><small>05 / VERIFY</small><b>Judge every handoff</b><span>contracts · adversarial gates</span></div><div className="harness-orbit"><span>MADMIND<br/>CONTROL<br/>PLANE</span><i/><i/><i/><i/><i/></div><div className="harness-stage stage-seal"><small>06 / REMEMBER</small><b>Seal the replay</b><span>event trail · signed receipts</span></div></div><div className="harness-visual-foot"><span>MODEL-AGNOSTIC · REPLAYABLE · EXPLICIT AUTHORITY</span><span><i/> GRAPH IS THE SOURCE OF RUN PROGRESS</span></div></div>
          <aside className="harness-theory-aside"><span className="theory-label">THE HARNESS IS THE PRODUCT</span><h3>Give every agent a lane.<br/><em>Give every action a receipt.</em></h3><p>Atoma’s harness theory treats orchestration as an engineering system, with boundaries that are visible before execution and evidence that survives after it.</p><div className="theory-points"><div><b>01</b><span><strong>Constrain capability</strong><small>Tools and data are granted per task.</small></span></div><div><b>02</b><span><strong>Make flow observable</strong><small>Branches, status, and handoffs stay inspectable.</small></span></div><div><b>03</b><span><strong>Keep proof with work</strong><small>Replay links outcomes to inputs and decisions.</small></span></div></div><Link className="theory-link" to="/harness">Read the harness principles <span>↗</span></Link></aside></div>
        <div className="harness-integrations"><span className="integration-label">COMPOSABLE SURFACES</span><div><b>MCP SERVERS</b><i>connect</i><b>SKILLS</b><i>shape</i><b>HARNESS</b><i>orchestrates</i><b>AGENT SWARM</b><i>produces</i><b>EVIDENCE GRAPH</b><span>●</span><b>REPLAY</b></div></div>
        </div>
      </section>

      <ArchitectureDeck />

      {/* =========================================================================
          4.0 Research Hub
          ========================================================================= */}
      <section id="research-hub" className="story-beat">
        <div className="story-content">
        <SectionHead
          num="4.0"
          label="Research Hub"
          title="The state of AI,"
          tone="one API call away."
        >
          Research, manuscripts, code examples, and plain-language explanations in one desk.
          Search source-linked literature, inspect the paper, then work through an idea with an AI guide.
        </SectionHead>
        <div className="head-actions"><Link className="btn btn-white" to="/research-hub">Open Research Hub <span>↗</span></Link><span className="research-access-note">Curated library · source links attached</span></div>
        <ResearchPreview />
        </div>
      </section>

      {/* =========================================================================
          5.0 What we're working on (Changelog)
          ========================================================================= */}
      <section id="changelog">
        <SectionHead
          num="5.0"
          label="What we're working on"
          title="Shipped in the open,"
          tone="every week."
        >
          A concise build log tracks shipped work, active development, and
          roadmap items with clear status labels.
        </SectionHead>

        <div className="log-list">
          <div className="log-row">
            <div className="ldate">Oct 24</div>
            <div>
              <h3>Brigade — interactive workspace preview</h3>
              <p>Explore the guided run timeline, graph, code, and receipts. Runtime execution remains in development.</p>
            </div>
          </div>
          <div className="log-row">
            <div className="ldate">Oct 24</div>
            <div>
              <h3>Research Hub — curated source library</h3>
              <p>Read source-linked editorial notes and ask the AI companion. A small curated catalog, with ingestion still planned.</p>
            </div>
          </div>
          <div className="log-row">
            <div className="ldate">In build</div>
            <div>
              <h3>Composable tools and harness design</h3>
              <p>Typed tools, explicit authority, and inspectable evidence are the build direction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CTA Panel: Luminous panel on ellipse glow
          ========================================================================= */}
      <div className="cta-band">
        <div className="cta-brand-lockup"><img src="/atoma-atom.png" alt=""/><span><b>ATOMA</b><small>ENGINEERING LABS</small></span></div>
        <h2>Solo by choice.<br/><em>Built to go further.</em></h2>
        <p>Put a research-grade engineering harness behind your next ambitious build.</p>
        <div className="cta-actions">
          <Link className="btn btn-white" to="/brigade">Explore the Brigade <span>↗</span></Link>
          <Link className="btn btn-dark-cta" to="/contact">Build with Atoma</Link>
        </div>
      </div>
    </div>
  );
}
