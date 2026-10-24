import { Link } from "react-router-dom";

const FLOW = [
  ["Step 01 — Describe", "One front door, one sentence of work. MadMind opens with a question — \"What are we designing today?\" — and nothing else competing for your attention."],
  ["Step 02 — Plan, as data", "The plan lane thinks at full depth and writes the runbook: a graph of packets with dependencies and the judge each packet must pass. The plan exists before any execution token is spent."],
  ["Step 03 — The judge gate", "Deterministic judges check the plan and, later, every packet's output. A packet completes only on a judge pass — and every completion is a receipt."],
  ["Step 04 — Execute, on the record", "The code lane executes packet by packet while the realtime ledger streams what happened. Watch it live, or audit it next week; it is the same record."],
];

export default function Harness() {
  return (
    <>
      <div className="page-head">
        <div className="micro">Harness · MadMind</div>
        <h1>Two lanes. One judge. No black box.</h1>
        <p className="lede">
          MadMind is the dual agentic harness the Brigade App builds with: a
          builder lane and a contributor lane, working under deterministic
          judges, with a realtime ledger underneath. It is the discipline of
          the lab, made into a product surface.
        </p>
        <p style={{ marginTop: "1.2rem" }}>
          <span className="pill pill-verified">MadMind v0.1.0 · Live on the bench</span>
        </p>
      </div>

      <section className="prose-section">
        <h2>The two lanes</h2>
        <div className="grid2" style={{ gap: "1.5rem" }}>
          <div className="panel">
            <span className="fig">Lane 01 — Builder</span>
            <h3>Qwen, local</h3>
            <p>The builder lane takes the first pass: it plans, writes and
            executes on a local model running on your own hardware. Fast,
            private, and always the first set of hands on the work.</p>
          </div>
          <div className="panel">
            <span className="fig">Lane 02 — Contributor</span>
            <h3>Muse Spark 1.3, gated</h3>
            <p>The contributor lane is the second pair of eyes: review,
            counter-argument and polish from a frontier model — behind an
            explicit gate, so nothing leaves the machine unless that lane is
            opened on purpose.</p>
          </div>
        </div>
        <p style={{ marginTop: "1rem" }}>
          Neither lane grades its own homework. Completion belongs to the
          judges, and the ledger belongs to you.
        </p>
      </section>

      <section className="prose-section">
        <h2>How a run moves</h2>
        <div className="flow-steps" style={{ marginTop: "1.2rem" }}>
          {FLOW.map(([title, desc]) => (
            <div className="panel step-card" key={title}>
              <span className="snum">{title}</span>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="prose-section">
        <h2>Failure has a doctrine</h2>
        <p>Judges fail packets. What happens next is written down, not improvised:</p>
        <ul style={{ marginTop: "1rem", lineHeight: 1.8 }}>
          <li><b>First failure:</b> the packet is re-approached with a material change. Retrying the identical approach is a violation, not a strategy.</li>
          <li><b>Second failure:</b> the packet escalates — packet, receipts and judge outputs go to the orchestrator, and the new approach is pre-registered, with its success criteria, before anyone touches it again.</li>
          <li><b>No fallback declared:</b> a packet with no declared fallback escalates after the first strike. Silence is never a passing grade.</li>
        </ul>
      </section>

      <section className="prose-section">
        <h2>Receipts, ledger, taps</h2>
        <div className="grid3" style={{ marginTop: "1.2rem" }}>
          <div className="panel feat">
            <h3>Receipts</h3>
            <p>Every packet completion is a receipt: what ran, which judge passed it, what it produced. A run is a chain of receipts, not a chat transcript you have to take on faith.</p>
          </div>
          <div className="panel feat">
            <h3>Realtime ledger</h3>
            <p>The console's ledger strip is fed by the backend's event spine as runs happen — plan, packet, judge and escalation events in order, append-only. The audit view and the live view are the same data.</p>
          </div>
          <div className="panel feat">
            <h3>Telemetry taps</h3>
            <p>18 catalogued taps across 7 categories — plan, packet, action, judge, model, escalation, run — each one gateable per category, with dropped events counted rather than lost silently.</p>
          </div>
        </div>
      </section>

      <section className="prose-section">
        <h2>The ten-second test</h2>
        <p>Ask any agent product three questions. MadMind is built so all three have answers:</p>
        <div className="grid3" style={{ marginTop: "1.2rem" }}>
          <div className="panel feat">
            <span className="fig">Before</span>
            <h3>"Show me the plan first"</h3>
            <p>The plan is data — steps, dependencies, judges — written before execution begins. You approve the shape, not a promise.</p>
          </div>
          <div className="panel feat">
            <span className="fig">During</span>
            <h3>"Can a step fail loudly?"</h3>
            <p>A step that fails its judge is blocked, with the reason on the record — never quietly retried into a confident-sounding answer.</p>
          </div>
          <div className="panel feat">
            <span className="fig">After</span>
            <h3>"Can I audit yesterday's run?"</h3>
            <p>The append-only ledger holds what ran, what passed, what it cost. The run you audit next week is the run that actually happened.</p>
          </div>
        </div>
        <p style={{ marginTop: "1.6rem" }}>
          <Link className="btn btn-primary" to="/apps">MadMind inside the Brigade App</Link>
          <Link className="btn" to="/plugins">The MCP servers it drives</Link>
        </p>
      </section>
    </>
  );
}
