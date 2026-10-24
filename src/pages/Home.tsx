import { Link } from "react-router-dom";
import { Chip, SectionHead, WorkspaceMock, ConsoleMock, StackStrip } from "../components.jsx";

export default function Home() {
  return (
    <div className="home-root">
      {/* =========================================================================
          HERO SECTION (Strictly matching reference):
          1. Version Chip
          2. Wide Luminous Panel
          3. One Tagline Paragraph
          4. Two CTAs (Launch Brigade demo / Download app with OS icons)
          5. Large Console Collage (with 4 numbered overlapping side panels)
          6. Stack Strip (Engineered on a systems-grade stack...)
          ========================================================================= */}
      <section className="hero">
        <h1 className="sr-only">Atoma Labs — Agentic Tooling for Solo Developers</h1>

        {/* 1. Version Chip */}
        <Chip to="/apps" tag="New">
          Atoma Core v0.9.4 — Local Metal/WebGPU acceleration →
        </Chip>

        {/* 2. Wide Luminous Panel */}
        <div className="hero-luminous" aria-hidden="true" />

        {/* 3. One Tagline Paragraph */}
        <p className="lede">
          Atoma Labs builds agentic tooling for solo developers — MCP servers,
          Skills.md, harnesses and research-grade labs engineered for
          constrained hardware.
        </p>

        {/* 4. Two CTAs */}
        <div className="hero-ctas">
          <Link className="btn btn-white" to="/apps">
            Launch Brigade demo
          </Link>
          <Link className="btn btn-dark-cta" to="/apps#downloads">
            <span>Download app</span>
            <span className="os-icons" aria-hidden="true">
              {/* Apple icon */}
              <svg className="os-svg" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.01 1.097-1.42 2.39-1.226 3.424 1.155.087 2.373-.615 3.255-1.62C11.758 1.98 12.067.893 11.182.008zM14.62 11.233c-.328.752-.72 1.442-1.176 2.068-.62.853-1.332 1.622-2.27 1.622-.962 0-1.267-.57-2.378-.57-1.127 0-1.472.553-2.394.57-.96.017-1.72-.82-2.34-1.674-1.272-1.748-2.244-4.945-2.244-7.808 0-3.08 1.83-4.717 3.59-4.717 1.01 0 1.826.657 2.45.657.607 0 1.54-.69 2.705-.69.458 0 2.09.05 3.167 1.57-.087.054-1.89 1.074-1.89 3.23 0 2.58 2.296 3.504 2.36 3.53-.03.11-.36 1.25-1.194 2.262z" />
              </svg>
              {/* Linux Tux icon */}
              <svg className="os-svg" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5c0 .64.18 1.24.49 1.76C3.12 7.04 2 8.87 2 11c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4 0-2.13-1.12-3.96-2.99-4.74.31-.52.49-1.12.49-1.76A3.5 3.5 0 0 0 8 1zm0 2c.83 0 1.5.67 1.5 1.5S8.83 6 8 6s-1.5-.67-1.5-1.5S7.17 3 8 3z" />
              </svg>
              {/* Windows icon */}
              <svg className="os-svg" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 2.25L6.5 1.34v6.23H0V2.25zm7.36-.12L16 0v7.57H7.36V2.13zM0 8.43h6.5v6.23L0 13.75V8.43zm7.36 0H16V16l-8.64-1.22V8.43z" />
              </svg>
            </span>
          </Link>
        </div>

        {/* 5. Large Console Collage */}
        <ConsoleMock />

        {/* 6. Stack Strip */}
        <StackStrip />
      </section>

      {/* =========================================================================
          1.0 Brigade App v1
          ========================================================================= */}
      <section id="brigade">
        <SectionHead
          num="1.0"
          label="Brigade App v1"
          title="An agent brigade"
          tone="that answers to you."
        >
          Deterministic token generation and continuous graph orchestration
          in one local-first workspace. Every step is traced, every decision
          auditable, <b>nothing leaves your machine</b>.
        </SectionHead>
        <WorkspaceMock />
      </section>

      {/* =========================================================================
          2.0 MCP • Tools • Skills • Labs
          ========================================================================= */}
      <section id="infrastructure">
        <SectionHead
          num="2.0"
          label="MCP • Tools • Skills • Labs"
          title="Infrastructure, not wrappers."
          tone="Built to be composed."
        >
          Most agent tooling is a prompt in a trench coat. Ours is the layer
          underneath: protocol servers, portable skills and harnesses you can
          inspect, pin and reuse — <b>composed, not rented</b>.
        </SectionHead>

        <div className="infra-grid">
          {/* Card 1: MCP Servers */}
          <div className="panel infra-card">
            <span className="card-tag">● MCP Servers</span>
            <h3>Production-grade Model Context Protocol servers.</h3>
            <p>
              Drop-in servers for filesystems, git, research and local inference —
              typed, sandboxed, and observable.
            </p>
            <div className="server-list">
              <div className="server-row">
                <span className="sname">atoma-fs</span>
                <span className="strans">stdio • 14 tools</span>
                <span className="health ok"><span className="status-dot green" />healthy</span>
              </div>
              <div className="server-row">
                <span className="sname">atoma-research</span>
                <span className="strans">http • 9 tools</span>
                <span className="health ok"><span className="status-dot green" />healthy</span>
              </div>
              <div className="server-row">
                <span className="sname">atoma-infer-metal</span>
                <span className="strans">stdio • 6 tools</span>
                <span className="health warn"><span className="status-dot amber" />warning</span>
              </div>
            </div>
            <p><Link to="/plugins">How the servers are built →</Link></p>
          </div>

          {/* Card 2: Skills.md */}
          <div className="panel infra-card">
            <span className="card-tag">● Skills.md</span>
            <h3>Portable agent skills.</h3>
            <p>
              A skill is a markdown file with a contract: what it does, which
              tools it may touch, when it applies. It travels between harnesses
              because it was never locked inside one.
            </p>
            <div className="codeblock skill-snippet">
              <span className="tok-k">name:</span> <span className="tok-t">rust-refactor</span>{"\n"}
              <span className="tok-k">tools:</span> [fs, cargo]{"\n"}
              <span className="tok-a"># When to use</span>{"\n"}
              Apply when a crate{"\n"}
              fails clippy -D warnings.
            </div>
            <p><Link to="/tooling">The Skills.md format →</Link></p>
          </div>

          {/* Card 3: Agentic Harnesses */}
          <div className="panel infra-card">
            <span className="card-tag">Agentic Harnesses</span>
            <h3>Evaluate tool-calling like you test code.</h3>
            <p>
              MadMind runs two lanes — a builder and a contributor — under
              deterministic judges. A run completes only when its receipts
              pass, and the ledger keeps the score where you can read it.
            </p>
            <div>
              <div className="barchart" aria-hidden="true">
                <div className="bar" style={{ height: "34%" }} />
                <div className="bar" style={{ height: "46%" }} />
                <div className="bar" style={{ height: "42%" }} />
                <div className="bar" style={{ height: "58%" }} />
                <div className="bar" style={{ height: "64%" }} />
                <div className="bar" style={{ height: "71%" }} />
                <div className="bar" style={{ height: "79%" }} />
                <div className="bar hot" style={{ height: "96%" }} />
              </div>
              <div className="barchart-meta">
                <span>run 01</span>
                <span>pass@1 94.1%</span>
              </div>
            </div>
            <p><Link to="/harness">Inside the harness →</Link></p>
          </div>

          {/* Card 4: Research-Grade Labs */}
          <div className="panel infra-card">
            <span className="card-tag">Research-Grade Labs</span>
            <h3>Frontier techniques on 8 GB of memory.</h3>
            <p>
              Quantization, speculative decoding and KV tricks —
              benchmarked on laptops, not clusters.
            </p>
            <div className="stat3">
              <div className="s">
                <span className="n">8 GB</span>
                <span className="c">min. memory</span>
              </div>
              <div className="s">
                <span className="n">3.1×</span>
                <span className="c">spec. decode</span>
              </div>
              <div className="s">
                <span className="n">0 B</span>
                <span className="c">egress</span>
              </div>
            </div>
            <p><Link to="/research-hub">The research preprints →</Link></p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3.0 Research Hub
          ========================================================================= */}
      <section id="research-hub">
        <SectionHead
          num="3.0"
          label="Research Hub"
          title="The state of AI,"
          tone="one API call away."
        >
          An open hub indexing the newest preprints and literature across
          artificial intelligence. Pull, search and stream it into your
          agents — free for anyone.
        </SectionHead>
        <div className="head-actions">
          <Link className="btn btn-white" to="/research-hub">Get API key</Link>
          <Link className="btn" to="/research-hub#docs">Read the docs →</Link>
        </div>

        <div className="research-grid">
          {/* Left panel: Paper Search */}
          <div className="panel paper-panel">
            <div className="paper-search">
              <span>🔍 agentic tool use on edge devices</span>
            </div>
            <div className="paper-filters">
              <span className="pfilter on">Last 24h</span>
              <span className="pfilter">cs.AI</span>
              <span className="pfilter">cs.LG</span>
              <span className="pfilter">cs.CL</span>
            </div>
            <div className="paper-row">
              <div className="pt">Small Models, Long Horizons: Planning with 3B Agents on Consumer GPUs</div>
              <div className="pm">
                <span>arXiv: 2506.04412 · 14 citations</span>
                <span className="pill pill-verified">2h ago</span>
              </div>
            </div>
            <div className="paper-row">
              <div className="pt">MCP-Bench: Evaluating Context Protocol Servers Under Adversarial Load</div>
              <div className="pm">
                <span>arXiv: 2506.04187 · cs.LG · 3 citations</span>
                <span className="pill pill-verified">5h ago</span>
              </div>
            </div>
            <div className="paper-row">
              <div className="pt">Deterministic Decoding for Auditable Agent Trajectories</div>
              <div className="pm">
                <span>arXiv: 2506.03950 · cs.CL · new</span>
                <span className="pill pill-verified">9h ago</span>
              </div>
            </div>
          </div>

          {/* Right panel: API Terminal */}
          <div className="panel api-panel">
            <div className="api-head">
              <span className="api-route">GET /v1/papers/search</span>
              <span className="api-status">200 OK</span>
            </div>
            <div className="codeblock">
              <span className="tok-k">curl</span> https://api.atomalabs.dev/v1/papers/search \{"\n"}
              {"  "}-H <span className="tok-t">"Authorization: Bearer $ATOMA_KEY"</span> \{"\n"}
              {"  "}-d <span className="tok-t">q="agentic tool use"</span> \{"\n"}
              {"  "}-d <span className="tok-t">since=24h</span>{"\n\n"}
              <span className="tok-a"># Response</span>{"\n"}
              {"{"}{"\n"}
              {"  "}<span className="tok-k">"count"</span>: <span className="tok-n">128</span>,{"\n"}
              {"  "}<span className="tok-k">"results"</span>: [{"\n"}
              {"    "}{"{"}{"\n"}
              {"      "}<span className="tok-k">"id"</span>: <span className="tok-t">"2506.04412"</span>,{"\n"}
              {"      "}<span className="tok-k">"title"</span>: <span className="tok-t">"Small Models..."</span>,{"\n"}
              {"      "}<span className="tok-k">"pdf"</span>: <span className="tok-t">".../2506.04412.pdf"</span>{"\n"}
              {"    "}{"}"}{"\n"}
              {"  "}]{"\n"}
              {"}"}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4.0 What we're working on (Changelog)
          ========================================================================= */}
      <section id="changelog">
        <SectionHead
          num="4.0"
          label="What we're working on"
          title="Shipped in the open,"
          tone="every week."
        />

        <div className="log-list">
          <div className="log-row">
            <div className="ldate">Jun 12</div>
            <div>
              <h3>Atoma Core v0.9.4 — Metal &amp; WebGPU acceleration</h3>
              <p>Up to 2.4x faster local inference on Apple Silicon.</p>
            </div>
          </div>
          <div className="log-row">
            <div className="ldate">Jun 05</div>
            <div>
              <h3>Research Hub API — public beta</h3>
              <p>Search, stream and cite 400k+ AI preprints.</p>
            </div>
          </div>
          <div className="log-row">
            <div className="ldate">May 28</div>
            <div>
              <h3>Skills.md spec 1.0</h3>
              <p>A portable, versioned format for agent capabilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CTA Panel: Luminous panel on ellipse glow
          ========================================================================= */}
      <div className="cta-band">
        <div className="cta-luminous" aria-hidden="true" />
        <div className="cta-actions">
          <Link className="btn btn-white" to="/signup">Sign up free</Link>
          <Link className="btn btn-dark-cta" to="/contact">Talk to the team</Link>
        </div>
      </div>
    </div>
  );
}
