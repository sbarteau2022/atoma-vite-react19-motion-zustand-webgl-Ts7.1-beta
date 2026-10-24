import { Link } from "react-router-dom";

/* Shared building blocks for the Atoma Labs reference pass (2026-10-23).
   Product visuals here are interface mocks — design material that shows
   the shape of the software. They carry no performance claims. */

export function Chip({ to, tag = "New", children }) {
  return (
    <Link className="chip" to={to}>
      <span className="tag">{tag}</span>
      <span>{children}</span>
      <span className="arrow">→</span>
    </Link>
  );
}

/* Numbered section head in the reference voice:
   "1.0  Brigade App v1" caption row, two-tone headline, side copy. */
export function SectionHead({ num, label, title, tone, children }) {
  return (
    <div className="num-head">
      <div className="micro">
        <span className="fig-num">{num}</span>
        <span>{label}</span>
      </div>
      <div className="split-head">
        <h2>{title}<span className="tone">{tone}</span></h2>
        <p className="side-copy">{children}</p>
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
        <div className="tbar"><i style={{ width: "72%" }} /></div>
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
        <div>· trace 0x3fa2 <span className="ok">sealed</span></div>
        <div>· audit hash <span className="ok">verified</span></div>
        <div>· 0 bytes egress</div>
      </div>
    </div>
  );
}

/* The hero collage (reference): a wide orchestrator console flanked
   by four tall labelled product panels that overlap its edges —
   01 Brigade App v1 · 02 MCP Servers · 03 Tools and Skills ·
   04 Research Hub. Pure DOM/CSS/SVG. */
export function ConsoleMock() {
  return (
    <div className="collage" aria-hidden="true">
      <figure className="side-panel sp-lt">
        <div className="art art-phone">
          <div className="phone-frame">
            <div className="phone-bar"><span /><span /><span /></div>
            <div className="phone-card">
              <b>BRG-142</b>
              <span>running · step 4 of 7</span>
              <div className="phone-prog"><i style={{ width: "58%" }} /></div>
            </div>
            <div className="phone-row" /><div className="phone-row short" />
            <div className="phone-row" /><div className="phone-row short" />
            <div className="phone-orbit">
              <div className="ring" style={{ width: 74, height: 74 }} />
              <div className="ring" style={{ width: 44, height: 44 }} />
              <span className="node-dot" style={{ left: "64%", top: "4%" }} />
              <span className="node-dot amber" style={{ left: "12%", top: "62%" }} />
            </div>
          </div>
        </div>
        <figcaption><span>Brigade App v1</span><span className="idx">01</span></figcaption>
      </figure>

      <figure className="side-panel sp-lb">
        <div className="art art-rack">
          <div className="rack-row"><span className="led g" /><span className="led c" /><span className="vents" /><span className="led a" /></div>
          <div className="rack-row"><span className="led c" /><span className="led g" /><span className="vents" /><span className="led" /></div>
          <div className="rack-row"><span className="led g" /><span className="led" /><span className="vents" /><span className="led c" /></div>
          <div className="rack-row"><span className="led a" /><span className="led g" /><span className="vents" /><span className="led" /></div>
          <svg className="rack-wave" viewBox="0 0 200 64" preserveAspectRatio="none">
            <polyline points="0,40 18,38 36,42 54,30 72,34 90,22 108,28 126,16 144,24 162,14 180,20 200,10" fill="none" stroke="#4fe3ea" strokeWidth="1.6" opacity="0.85" />
            <polyline points="0,50 20,47 40,52 60,44 80,48 100,38 120,43 140,34 160,40 180,32 200,36" fill="none" stroke="#3d7bff" strokeWidth="1.2" opacity="0.55" />
          </svg>
        </div>
        <figcaption><span>MCP Servers</span><span className="idx">02</span></figcaption>
      </figure>

      <div className="console-main collage-console">
        <div className="console-bar">
          <span className="dot" /><span className="dot" /><span className="dot" />
          <span className="path">brigade://pipeline/orchestrator</span>
          <span className="right"><span className="live-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />LIVE</span>
        </div>
        <div className="console-body">
          <div className="console-nav">
            <span className="micro">Workspace</span>
            <div className="cnav-item on"><span className="g">▦</span>Pipelines</div>
            <div className="cnav-item"><span className="g">◈</span>Agents</div>
            <div className="cnav-item"><span className="g">▤</span>MCP Servers</div>
            <div className="cnav-item"><span className="g">✦</span>Skills</div>
            <div className="cnav-item"><span className="g">☰</span>Audit Log</div>
          </div>
          <div className="console-stage">
            <span className="micro">Pipeline — refactor tokio runtime scheduler</span>
            <div className="flow-row">
              <div className="flow-node"><b>plan</b>steps as data</div>
              <span className="flow-arrow">→</span>
              <div className="flow-node"><b>judge</b>plan checked</div>
              <span className="flow-arrow">→</span>
              <div className="flow-node live"><b>build</b>executing</div>
            </div>
            <div className="flow-row">
              <div className="flow-node"><b>test</b>queued</div>
              <span className="flow-arrow">→</span>
              <div className="flow-node"><b>judge</b>receipt gate</div>
              <span className="flow-arrow">→</span>
              <div className="flow-node"><b>ship</b>queued</div>
            </div>
            <div className="flow-row">
              <div className="flow-node"><b>verify</b>receipts sealed</div>
              <span className="flow-arrow">→</span>
              <div className="flow-node"><b>judge</b>final gate</div>
              <span className="flow-arrow">→</span>
              <div className="flow-node"><b>archive</b>ledger closed</div>
            </div>
            <div className="console-charts">
              <div className="chart-box">
                <span className="cb-head">decode · tok/s</span>
                <svg viewBox="0 0 220 52" preserveAspectRatio="none">
                  <polyline points="0,42 22,39 44,41 66,33 88,35 110,25 132,28 154,17 176,21 198,11 220,13" fill="none" stroke="#4fe3ea" strokeWidth="1.6" />
                  <polyline points="0,47 24,45 48,46 72,41 96,43 120,37 144,39 168,33 192,35 220,29" fill="none" stroke="#f0a832" strokeWidth="1.2" opacity="0.7" />
                </svg>
              </div>
              <div className="gauge-box">
                <div className="gauge" style={{ background: "conic-gradient(var(--cyan) 0 61%, rgba(255,255,255,0.08) 61% 100%)" }}><i>61%</i></div>
                <span>gpu</span>
              </div>
              <div className="gauge-box">
                <div className="gauge" style={{ background: "conic-gradient(var(--green) 0 72%, rgba(255,255,255,0.08) 72% 100%)" }}><i>72%</i></div>
                <span>mem</span>
              </div>
            </div>
            <div className="console-code">
              <div className="codeblock"><span className="cb-head">packet · build</span><span className="tok-k">lane</span>   builder{"\n"}<span className="tok-k">model</span>  qwen · local{"\n"}<span className="tok-k">step</span>   4 of 7{"\n"}<span className="tok-k">judge</span>  cargo + clippy{"\n"}<span className="tok-k">status</span> <span className="tok-s">running</span></div>
              <div className="codeblock"><span className="cb-head">ledger · append-only</span><span className="tok-t">#1042</span> plan verified{"\n"}<span className="tok-t">#1043</span> packet issued{"\n"}<span className="tok-t">#1044</span> judge <span className="tok-a">pending</span>{"\n"}<span className="tok-t">#1045</span> receipt sealed{"\n"}<span className="tok-t">#1046</span> —</div>
            </div>
          </div>
          <TelemetryRail />
        </div>
      </div>

      <figure className="side-panel sp-rt">
        <div className="art art-graph">
          <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid meet">
            <g stroke="rgba(120,200,210,0.4)" strokeWidth="1">
              <line x1="100" y1="42" x2="42" y2="105" /><line x1="100" y1="42" x2="158" y2="105" />
              <line x1="42" y1="105" x2="100" y2="160" /><line x1="158" y1="105" x2="100" y2="160" />
              <line x1="100" y1="160" x2="55" y2="228" /><line x1="100" y1="160" x2="148" y2="228" />
              <line x1="42" y1="105" x2="158" y2="105" opacity="0.5" />
            </g>
            <rect x="76" y="24" width="48" height="34" rx="7" fill="#12161c" stroke="rgba(79,227,234,0.65)" />
            <circle cx="42" cy="105" r="11" fill="#101318" stroke="rgba(79,227,234,0.55)" />
            <circle cx="158" cy="105" r="11" fill="#101318" stroke="rgba(240,168,50,0.7)" />
            <circle cx="100" cy="160" r="13" fill="#101318" stroke="rgba(79,227,234,0.8)" />
            <circle cx="55" cy="228" r="10" fill="#101318" stroke="rgba(255,255,255,0.35)" />
            <circle cx="148" cy="228" r="10" fill="#101318" stroke="rgba(61,220,132,0.6)" />
            <circle cx="100" cy="42" r="3.5" fill="#4fe3ea" />
            <circle cx="100" cy="160" r="3.5" fill="#4fe3ea" />
            <circle cx="158" cy="105" r="3.5" fill="#f0a832" />
          </svg>
        </div>
        <figcaption><span>Tools and Skills</span><span className="idx">03</span></figcaption>
      </figure>

      <figure className="side-panel sp-rb">
        <div className="art art-stars">
          <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid meet">
            <g stroke="rgba(150,160,255,0.35)" strokeWidth="0.8">
              <polyline points="34,60 66,88 92,66 128,96" fill="none" />
              <polyline points="52,190 88,214 130,196 158,228" fill="none" />
              <polyline points="140,36 162,70 150,110" fill="none" />
            </g>
            <g fill="rgba(255,255,255,0.75)">
              <circle cx="24" cy="34" r="1.4" /><circle cx="58" cy="22" r="1" /><circle cx="96" cy="40" r="1.2" />
              <circle cx="128" cy="26" r="1" /><circle cx="176" cy="52" r="1.3" /><circle cx="44" cy="120" r="1" />
              <circle cx="76" cy="140" r="1.4" /><circle cx="112" cy="128" r="1" /><circle cx="168" cy="150" r="1.2" />
              <circle cx="30" cy="168" r="1.1" /><circle cx="66" cy="252" r="1.2" /><circle cx="104" cy="262" r="1" />
              <circle cx="146" cy="256" r="1.4" /><circle cx="182" cy="196" r="1" /><circle cx="18" cy="226" r="1" />
              <circle cx="120" cy="168" r="1" /><circle cx="84" cy="96" r="1" /><circle cx="156" cy="268" r="1.1" />
            </g>
            <circle cx="66" cy="88" r="3" fill="#4fe3ea" /><circle cx="128" cy="96" r="2.6" fill="#f0a832" />
            <circle cx="88" cy="214" r="3" fill="#9a7bff" /><circle cx="162" cy="70" r="2.4" fill="#4fe3ea" />
            <circle cx="34" cy="60" r="2.2" fill="#fff" /><circle cx="158" cy="228" r="2.4" fill="#3ddc84" />
          </svg>
        </div>
        <figcaption><span>Research Hub</span><span className="idx">04</span></figcaption>
      </figure>
    </div>
  );
}


/* Brigade workspace mock — section 1.0 on Home, reused on /apps. */
export function WorkspaceMock() {
  return (
    <div className="workspace" aria-hidden="true">
      <div className="ws-nav">
        <span className="micro">Workspace</span>
        <div className="cnav-item on"><span className="g">▦</span>Pipelines</div>
        <div className="cnav-item"><span className="g">◈</span>Agents</div>
        <div className="cnav-item"><span className="g">▤</span>MCP Servers</div>
        <div className="cnav-item"><span className="g">✦</span>Skills</div>
        <div className="cnav-item"><span className="g">☰</span>Audit Log</div>
      </div>
      <div className="ws-main">
        <div className="ws-head">
          <span className="micro">Active runs</span>
          <span className="ws-meta">4 agents · local</span>
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
          <span className="status-dot amber" /><span className="rid">BRG-139</span>
          <span className="rtitle">Quantize 7B to Q4_K_M for M2 8GB</span>
          <span><span className="role">labs</span><span className="pbar"><i className="amber" style={{ width: "41%" }} /></span></span>
        </div>
        <div className="run-row">
          <span className="status-dot" /><span className="rid">BRG-137</span>
          <span className="rtitle">Generate Skills.md for repo tooling</span>
          <span><span className="role">queued</span><span className="pbar"><i className="grey" style={{ width: "6%" }} /></span></span>
        </div>
      </div>
      <TelemetryRail />
    </div>
  );
}

export function StackStrip() {
  const items = [
    ["⌘", "Rust"], ["C", "C++"], ["◉", "WebGPU"],
    ["◆", "Metal"], ["¶", "Python"], ["⌥", "Linux"],
  ];
  return (
    <div className="stack-strip">
      <span className="stack-note">Engineered on a systems-grade stack.<br />Runs on the hardware you already own.</span>
      <div className="stack-items">
        {items.map(([g, name]) => (
          <span className="stack-item" key={name}><span className="g">{g}</span>{name}</span>
        ))}
      </div>
    </div>
  );
}
