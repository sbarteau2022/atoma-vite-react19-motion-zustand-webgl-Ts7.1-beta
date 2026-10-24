import { Link } from "react-router-dom";

/* Shared building blocks for the Atoma Labs reference pass (2026-10-23).
   Strict fidelity to the enterprise obsidian reference. */

export function Chip({ to = "/apps", tag = "New", children }) {
  return (
    <Link className="chip" to={to}>
      <span className={`tag ${tag === "META" ? "meta-event-mark" : ""}`}>{tag === "META" ? <><svg viewBox="0 0 32 20" aria-hidden="true"><path d="M2 15.5C4.4 8.2 7.1 4.5 10.2 4.5c4.2 0 6.1 11 10.1 11 3.1 0 5.3-4.2 8.1-10.8"/><path d="M2 15.5C4.5 8.4 6.9 4.5 10.1 4.5c4.3 0 6.4 11 10.2 11 3.2 0 5.4-4.4 8.1-10.8"/></svg><span>Meta</span></> : tag}</span>
      <span>{children}</span>
    </Link>
  );
}

/* Numbered section head in the reference voice:
   e.g. "1.0  Brigade App v1" caption row, two-tone headline, side copy. */
export function SectionHead({ num, label, title, tone, children }) {
  return (
    <div className="num-head">
      <div className="micro">
        <span className="fig-num">{num}</span>
        <span>{label}</span>
      </div>
      <div className="split-head">
        <h2>{title}<span className="tone">{tone}</span></h2>
        {children && <p className="side-copy">{children}</p>}
      </div>
    </div>
  );
}

export function TelemetryRail() {
  return (
    <div className="tele-rail">
      <span className="micro">Telemetry</span>
      <div className="tbar-row">
        <div className="tbar-label"><span>Unified memory</span><b>5.8 / 8 GB</b></div>
        <div className="tbar"><i style={{ width: "72.5%" }} /></div>
      </div>
      <div className="tbar-row">
        <div className="tbar-label"><span>GPU (Metal)</span><b>61%</b></div>
        <div className="tbar"><i className="green" style={{ width: "61%" }} /></div>
      </div>
      <div className="tbar-row">
        <div className="tbar-label"><span>KV cache</span><b>1.2 GB</b></div>
        <div className="tbar"><i className="amber" style={{ width: "34%" }} /></div>
      </div>
      <div className="tele-lines">
        <div>› trace 0x3fa2 sealed</div>
        <div>› audit hash verified</div>
        <div>› 0 bytes egress</div>
      </div>
    </div>
  );
}

/* The hero collage (reference): high-density enterprise orchestrator console
   flanked by four numbered side panels:
   01 Brigade App v1 · 02 MCP Servers · 03 Tools and Skills · 04 Research Hub */
export function ConsoleMock() {
  return (
    <div className="hero-collage-wrap" aria-label="Atoma Labs Enterprise Orchestrator and Suite Console">
      <div className="hero-collage-container">
        <img
          src="/hero_collage.png"
          alt="Atoma Labs Orchestrator console showing live multi-agent DAG execution, system telemetry, and integrated tools"
          className="hero-collage-img"
          loading="eager"
        />

        {/* Interactive Hotspot Links */}
        <Link
          to="/apps"
          className="collage-hotspot hotspot-p01"
          title="01 Brigade App v1 — Local-first mobile & desktop orchestration"
          aria-label="01 Brigade App v1"
        >
          <span className="hotspot-pill">01 Brigade App v1</span>
        </Link>

        <Link
          to="/plugins"
          className="collage-hotspot hotspot-p02"
          title="02 MCP Servers — Typed, sandboxed Model Context Protocol servers"
          aria-label="02 MCP Servers"
        >
          <span className="hotspot-pill">02 MCP Servers</span>
        </Link>

        <Link
          to="/harness"
          className="collage-hotspot hotspot-center"
          title="Orbital Agent OS — Autonomous Agent Engineering IDE & Orchestrator"
          aria-label="Orbital Agent OS Console"
        />

        <Link
          to="/tooling"
          className="collage-hotspot hotspot-p03"
          title="03 Tools and Skills — Portable Skills.md contracts and toolchain"
          aria-label="03 Tools and Skills"
        >
          <span className="hotspot-pill">03 Tools and Skills</span>
        </Link>

        <Link
          to="/research-hub"
          className="collage-hotspot hotspot-p04"
          title="04 Research Hub — AI literature preprint vault and knowledge graph"
          aria-label="04 Research Hub"
        >
          <span className="hotspot-pill">04 Research Hub</span>
        </Link>
      </div>
    </div>
  );
}

/* Brigade workspace mock — section 1.0 on Home, reused on /apps. */
export function WorkspaceMock() {
  return (
    <div className="workspace" aria-hidden="true">
      <div className="ws-nav">
        <span className="micro">Workspace</span>
        <div className="cnav-item on"><span className="status-dot green" />Pipelines</div>
        <div className="cnav-item"><span className="status-dot cyan" />Agents</div>
        <div className="cnav-item"><span className="status-dot green" />MCP Servers</div>
        <div className="cnav-item"><span className="status-dot amber" />Skills</div>
        <div className="cnav-item">Audit Log</div>
      </div>
      <div className="ws-main">
        <div className="ws-head">
          <span className="micro">Active runs</span>
          <span className="ws-meta">4 agents • 12.4 tok/ms</span>
        </div>
        <div className="run-row">
          <span className="status-dot cyan" /><span className="rid">BRG-142</span>
          <span className="rtitle">Refactor tokio runtime scheduler</span>
          <span><span className="role">planner</span><span className="pbar"><i className="green" style={{ width: "82%" }} /></span></span>
        </div>
        <div className="run-row">
          <span className="status-dot green" /><span className="rid">BRG-141</span>
          <span className="rtitle">Index arXiv cs.AI — last 24h</span>
          <span><span className="role">research</span><span className="pbar"><i style={{ width: "64%" }} /></span></span>
        </div>
        <div className="run-row">
          <span className="rid" style={{ marginLeft: "14px" }}>BRG-139</span>
          <span className="rtitle">Quantize 7B to Q4_K_M for M2 8GB</span>
          <span><span className="role">labs</span><span className="pbar"><i className="amber" style={{ width: "41%" }} /></span></span>
        </div>
        <div className="run-row">
          <span className="rid" style={{ marginLeft: "14px" }}>BRG-137</span>
          <span className="rtitle">Generate Skills.md for repo tooling</span>
          <span><span className="role">queued</span><span className="pbar"><i className="grey" style={{ width: "12%" }} /></span></span>
        </div>
      </div>
      <TelemetryRail />
    </div>
  );
}

export function StackStrip() {
  const items = [
    ["⌘", "Rust"],
    ["C", "C++"],
    ["◉", "WebGPU"],
    ["◆", "Metal"],
    ["¶", "python"],
    ["⌥", "Linux"],
  ];
  return (
    <div className="stack-strip">
      <span className="stack-note">
        Engineered on a systems-grade stack.<br />
        Runs on the hardware you already own.
      </span>
      <div className="stack-items">
        {items.map(([g, name]) => (
          <span className="stack-item" key={name}>
            <span className="g">{g}</span>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
