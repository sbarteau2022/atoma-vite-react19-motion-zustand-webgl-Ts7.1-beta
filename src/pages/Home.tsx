import { Link } from "react-router-dom";
import { Chip, SectionHead, ConsoleMock, WorkspaceMock, StackStrip } from "../components.jsx";

export default function Home() {
  return (
    <div className="home-root">
      {/* ---- Hero: chip, luminous panel, one tagline, CTAs, collage ---- */}
      <section className="hero">
        <h1 className="sr-only">Atoma Labs — agentic tooling for solo developers</h1>
        <Chip to="/harness" tag="New">MadMind v0.1.0 — the dual-lane harness is live on the bench</Chip>
        <div className="hero-luminous" aria-hidden="true" />
        <p className="lede">
          Atoma Labs builds agentic tooling for solo developers — MCP servers,
          Skills.md, harnesses and research-grade labs engineered for
          constrained hardware.
        </p>
        <div className="hero-ctas">
          <Link className="btn btn-white" to="/apps">Launch Brigade demo</Link>
          <Link className="btn" to="/apps#downloads">
            Download app
            <span className="os-glyphs" aria-hidden="true">
              <i className="os-c" />
              <i className="os-s" />
              <i className="os-t" />
            </span>
          </Link>
        </div>
        <ConsoleMock />
        <StackStrip />
      </section>

      {/* ---- 1.0 Brigade App ---- */}
      <section>
        <SectionHead
          num="1.0" label="Brigade App v1"
          title="An agent brigade" tone="that answers to you."
        >
          Deterministic token generation and continuous graph orchestration
          in one local-first workspace. Every step is traced, every decision
          auditable, <b>nothing leaves your machine</b>. The brigade plans in
          the open, works under judges, and answers to the person who owns
          the hardware — you.
        </SectionHead>
        <WorkspaceMock />
      </section>

      {/* ---- 2.0 Infrastructure ---- */}
      <section>
        <SectionHead
          num="2.0" label="MCP · Tools · Skills · Labs"
          title="Infrastructure, not wrappers." tone="Built to be composed."
        >
          Most agent tooling is a prompt in a trench coat. Ours is the layer
          underneath: protocol servers, portable skills and harnesses you can
          inspect, pin and reuse — <b>composed, not rented</b>.
        </SectionHead>

        <div className="infra-grid">
          <div className="panel infra-card">
            <span className="card-tag">▤ MCP Servers</span>
            <h3>Production-grade Model Context Protocol servers.</h3>
            <p>
              Drop-in servers for filesystem, git, research and local
              inference — typed, sandboxed, and observable.
            </p>
            <div className="server-list">
              <div className="server-row">
                <span className="sname">atoma-fs</span>
                <span className="strans">stdio · 14 tools</span>
                <span className="health ok"><span className="status-dot green" />healthy</span>
              </div>
              <div className="server-row">
                <span className="sname">atoma-research</span>
                <span className="strans">http · 9 tools</span>
                <span className="health ok"><span className="status-dot green" />healthy</span>
              </div>
              <div className="server-row">
                <span className="sname">atoma-infer-metal</span>
                <span className="strans">stdio · 6 tools</span>
                <span className="health warn"><span className="status-dot amber" />warning</span>
              </div>
            </div>
            <p><Link to="/plugins">How the servers are built →</Link></p>
          </div>

          <div className="panel infra-card">
            <span className="card-tag">✎ Skills.md</span>
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

          <div className="panel infra-card">
            <span className="card-tag">▦ Agentic Harnesses</span>
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
                <span>judge pass rate, by run · latest</span>
              </div>
            </div>
            <p><Link to="/harness">Inside the harness →</Link></p>
          </div>

          <div className="panel infra-card">
            <span className="card-tag">⚗ Research-Grade Labs</span>
            <h3>Frontier techniques on the hardware you own.</h3>
            <p>
              Quantization, speculative decoding and KV-cache work —
              running against your own hardware without paying cloud tolls.
            </p>
            <div className="stat3">
              <div className="s">
                <span className="n">25.2 <em>tok/s</em></span>
                <span className="c">decode rate</span>
              </div>
              <div className="s">
                <span className="n">8.8 / 16 <em>GB</em></span>
                <span className="c">unified RAM</span>
              </div>
              <div className="s">
                <span className="n">230 / 256</span>
                <span className="c">ctx window</span>
              </div>
            </div>
            <p><Link to="/research-hub">The research preprints →</Link></p>
          </div>
        </div>
      </section>

      {/* ---- 3.0 Research Hub ---- */}
      <section>
        <SectionHead
          num="3.0" label="Research Hub"
          title="The state of AI," tone="one API call away."
        >
          An open hub indexing the newest preprints and literature across
          artificial intelligence — built API-first, so your agents can pull,
          search and stream the literature the way they pull any other tool.
        </SectionHead>
        <div className="head-actions">
          <Link className="btn btn-white" to="/research-hub">Open Research Hub</Link>
          <Link className="btn" to="/research-hub#architecture">API reference — planned</Link>
        </div>

        <div className="research-grid">
          <div className="panel paper-panel">
            <div className="paper-search">
              <span>Search preprints, authors, techniques…</span>
              <span className="kbd">⌘K</span>
            </div>
            <div className="paper-filters">
              <span className="pfilter on">All</span>
              <span className="pfilter">cs.AI</span>
              <span className="pfilter">cs.CL</span>
              <span className="pfilter">cs.LG</span>
              <span className="pfilter">quantization</span>
            </div>
            <div className="paper-row">
              <div className="pt">BitNet a4.8: 4-bit Activations for 1-bit LLMs</div>
              <div className="pm">
                <span>arXiv:2411.04965 · 12 Nov 2024</span>
                <span className="pill pill-verified">Indexed</span>
              </div>
            </div>
            <div className="paper-row">
              <div className="pt">DeepSeek-R1: Incentivizing Reasoning in LLMs via Reinforcement Learning</div>
              <div className="pm">
                <span>arXiv:2501.12948 · 22 Jan 2025</span>
                <span className="pill pill-verified">Indexed</span>
              </div>
            </div>
            <div className="paper-row">
              <div className="pt">The Geometry of Truth: Emergent Linear Representations</div>
              <div className="pm">
                <span>arXiv:2310.06824 · 10 Oct 2023</span>
                <span className="pill pill-verified">Indexed</span>
              </div>
            </div>
          </div>

          <div className="panel api-panel">
            <div className="codeblock">
              <span className="tok-a"># Pull a paper with provenance</span>{"\n"}
              curl https://api.atomalabs.com/v1/papers/2411.04965 \{"\n"}
              {"  "}-H <span className="tok-t">"Authorization: Bearer $ATOMA_KEY"</span> \{"\n"}
              {"  "}-H <span className="tok-t">"Accept: application/json"</span>{"\n\n"}
              <span className="tok-a"># Response: metadata, abstract, citations</span>{"\n"}
              {"{"}{"\n"}
              {"  "}<span className="tok-k">"id"</span>: <span className="tok-t">"2411.04965"</span>,{"\n"}
              {"  "}<span className="tok-k">"title"</span>: <span className="tok-t">"BitNet a4.8: 4-bit Activations..."</span>,{"\n"}
              {"  "}<span className="tok-k">"pdf_url"</span>: <span className="tok-t">"https://arxiv.org/pdf/2411.04965"</span>,{"\n"}
              {"  "}<span className="tok-k">"status"</span>: <span className="tok-s">"indexed"</span>{"\n"}
              {"}"}
            </div>
          </div>
        </div>
      </section>

      {/* ---- 4.0 Changelog ---- */}
      <section id="changelog">
        <SectionHead
          num="4.0" label="Changelog"
          title="Shipped in the open," tone="every week."
        >
          We build in public with weekly cadence. When a run fails, the failure
          is named; when a commit lands, the diff is linked.
        </SectionHead>

        <div className="log-list">
          <div className="log-row">
            <div className="ldate">2026-10-20</div>
            <div>
              <h3>MadMind Initial Bench</h3>
              <p>
                Dual agentic harness open for testing: a builder lane takes the
                first pass, a contributor lane reviews, and deterministic
                judges decide when a step is done.
              </p>
            </div>
          </div>
          <div className="log-row">
            <div className="ldate">2026-10-14</div>
            <div>
              <h3>Pure rust-refactor MCP server</h3>
              <p>
                Dropped in 14 tools covering workspace filesystem, AST parsing,
                and cargo check/clippy verification passes.
              </p>
            </div>
          </div>
          <div className="log-row">
            <div className="ldate">2026-10-07</div>
            <div>
              <h3>Quantization sweep for M2 Apple Silicon</h3>
              <p>
                Benchmarked Q4_K_M vs Q5_K_M perplexity drift under llama.cpp
                metal runtime. Validated 25.2 tok/s decode performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA band: luminous panel on ellipse glow ---- */}
      <div className="cta-band">
        <div className="cta-luminous" aria-hidden="true" />
        <div className="cta-actions">
          <Link className="btn btn-white" to="/signup">Sign up for v1</Link>
          <Link className="btn" to="/apps">Explore the apps</Link>
        </div>
        <p className="cta-note">
          One email when the native builds and API keys ship, and nothing
          before. Data practices: tools run locally by default and do not
          transmit prompts, code or telemetry without explicit opt-in.
        </p>
      </div>
    </div>
  );
}
