import { Link } from "react-router-dom";
import { WorkspaceMock } from "../components.jsx";

const ANATOMY = [
  ["Pipelines", "Work as a living graph. A pipeline is a plan you can watch: nodes are steps, edges are handoffs, and the frontier — what is running right now — is always visible."],
  ["Agents", "The brigade itself: planner, builder, researcher, judge. Each agent has a named role, a pinned model and a budget it cannot quietly exceed."],
  ["MCP Servers", "The tools the brigade may touch, attached as protocol servers — typed, sandboxed, and listed in the open. See the Plug-ins page for the servers themselves."],
  ["Skills", "Portable Skills.md files the brigade loads for a job. A skill is a contract: what it does, which tools it may use, when it applies."],
  ["Audit Log", "The append-only ledger of every run: plans, packets, judge verdicts, receipts. Yesterday's run can be audited next week, node by node."],
];

export default function Apps() {
  return (
    <>
      <div className="page-head">
        <div className="micro">Apps</div>
        <h1>The Brigade App: a crew that shows its work.</h1>
        <p className="lede">
          One local-first workspace where a brigade of agents plans, builds
          and checks software in the open — every step traced, every decision
          auditable, nothing leaving your machine.
        </p>
        <p style={{ marginTop: "1.2rem" }}>
          <span className="pill pill-roadmap">v1 · In build</span>{" "}
          <span className="pill pill-verified">v1 is free</span>
        </p>
      </div>

      <section className="prose-section">
        <WorkspaceMock />
        <span className="fig" style={{ marginTop: "0.7rem" }}>Fig A.1 — Brigade workspace · interface mock</span>
        <h2 style={{ marginTop: "2.2rem" }}>Anatomy of the workspace</h2>
        <div className="grid2" style={{ marginTop: "1.2rem" }}>
          {ANATOMY.map(([name, body]) => (
            <div className="panel feat" key={name}>
              <h3>{name}</h3>
              <p>{body}</p>
            </div>
          ))}
          <div className="panel feat">
            <h3>Telemetry, always on</h3>
            <p>Unified memory, GPU load and KV cache sit in the rail next to
            the work — the machine's state is part of the run's record, not a
            surprise you find in a log later. Traces seal, audit hashes
            verify, and egress is zero bytes unless you open a lane.</p>
          </div>
        </div>
      </section>

      <section className="prose-section">
        <h2>Two ways in</h2>
        <div className="grid2">
          <div className="panel">
            <h3>Native build <span className="pill pill-roadmap">Ships with v1</span></h3>
            <p>Download for Mac, Linux or Windows and run the whole brigade
            locally against your own models. Your missions, files and run
            records stay on your machine. This is the daily driver.</p>
          </div>
          <div className="panel">
            <h3>Cloud lane <span className="pill pill-roadmap">Ships with v1</span></h3>
            <p>Open the site, sign up, run a mission in your browser. The
            fastest way to see what a brigade does differently — no hardware
            requirement, nothing to uninstall if it is not for you.</p>
          </div>
        </div>
      </section>

      <section className="prose-section" id="downloads">
        <h2>Downloads</h2>
        <p>
          Native builds ship with v1. Until they land, the honest button is
          the launch list — one email when the builds are ready, and nothing
          before.
        </p>
        <div className="grid3" style={{ marginTop: "1.2rem" }}>
          {["macOS", "Linux", "Windows"].map((os) => (
            <div className="panel feat" key={os}>
              <h3>{os}</h3>
              <p>Brigade App v1, native. Local models, local ledger.</p>
              <p><span className="pill pill-roadmap">In build</span></p>
              <Link className="btn" to="/signup">Notify me at launch</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="prose-section">
        <h2>The harness inside: MadMind</h2>
        <div className="panel">
          <p>
            The Brigade App's build work runs on <b>MadMind</b>, our dual
            agentic harness: a builder lane takes the first pass, a
            contributor lane reviews, and deterministic judges decide when a
            step is done — with the receipt to prove it. MadMind v0.1.0 is
            live on our bench today, behind a single front door: <i>"What are
            we designing today?"</i>
          </p>
          <p style={{ marginTop: "1rem" }}>
            <Link className="btn btn-primary" to="/harness">Inside MadMind</Link>
            <Link className="btn" to="/tooling">Tools &amp; Skills</Link>
          </p>
        </div>
      </section>
    </>
  );
}
