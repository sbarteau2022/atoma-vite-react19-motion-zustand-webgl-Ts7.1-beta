// ChatMiddle — chat in the middle, scaffolded workspace on one side.
// No new deps. Route: /chat-middle. Uses the existing /api rag call when live,
// demo replies when the governor is down — same rule as the old IDE.
import { useState } from "react";
import { ares } from "../api";
import { useGovernor } from "../governor";

type Msg = { who: string; text: string };
const FLOW = [
  { label: "Scope", state: "In the study" },
  { label: "Plan", state: "In the study" },
  { label: "Implement", state: "In progress" },
  { label: "Test design", state: "In the study", hot: true },
];
const FILES = ["design.md", "acceptance.rs", "runbook.rs"];

export function ChatMiddle() {
  const { link } = useGovernor();
  const live = link === "live";
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { who: "You", text: "Refine the runbook validator without weakening the review gate. Ensure stable event IDs and add deduplication before memory ingestion." },
    { who: "Builder-01 · local demo", text: "I'll update the validator, add stable event IDs and deduplication, and keep the human-review gate intact. I'll run tests and share a patch for review." },
    { who: "Builder-01 · local demo", text: "Tests are passing. Event IDs are now stable and deduped before ingestion. The human-review gate remains required." },
  ]);
  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || busy) return;
    const q = prompt; setPrompt(""); setBusy(true);
    setMsgs((m) => [...m, { who: "You", text: q }]);
    try {
      if (live) {
        const res = await ares.rag(q, 6) as { hits?: { text: string }[] };
        setMsgs((m) => [...m, { who: "Builder-01 · this computer", text: res?.hits?.[0]?.text?.slice(0, 400) ?? "No live hit returned. The human-review gate remains required." }]);
      } else {
        setMsgs((m) => [...m, { who: "Builder-01 · local demo", text: "Demo reply — the program is not running on this computer, so this is the shape of the answer, not a live run. The human-review gate remains required." }]);
      }
    } catch (err) { setMsgs((m) => [...m, { who: "Builder-01", text: err instanceof Error ? err.message : "The run did not finish." }]); }
    finally { setBusy(false); }
  }
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 60px)", background: "#17171a", color: "#EFEADF", fontFamily: "system-ui, sans-serif" }}>
      {/* ONE SIDE — scaffolded workspace */}
      <aside style={{ width: 300, flexShrink: 0, borderRight: "1px solid #45454d", padding: 16, background: "#2e2e33" }}>
        <p style={{ fontSize: 11, letterSpacing: ".15em", color: "#a1a1aa" }}>WORKSPACE · SCAFFOLD</p>
        <h3 style={{ margin: "8px 0" }}>Runbook study</h3>
        <p style={{ color: "#f59e0b", fontFamily: "monospace", fontSize: 13 }}>runbook-review</p>
        <p style={{ fontSize: 11, letterSpacing: ".15em", color: "#a1a1aa", marginTop: 20 }}>CONTEXT FILES</p>
        <ul style={{ listStyle: "none", padding: 0 }}>{FILES.map((f) => (<li key={f} style={{ padding: "8px 0", borderBottom: "1px solid #45454d", fontFamily: "monospace", fontSize: 13 }}>{f}</li>))}</ul>
        <p style={{ fontSize: 11, letterSpacing: ".15em", color: "#a1a1aa", marginTop: 20 }}>PROJECT FLOW</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FLOW.map((f) => (<div key={f.label} style={{ padding: 12, borderRadius: 10, background: f.hot ? "#f59e0b" : "#34343a", color: f.hot ? "#17171a" : "#EFEADF" }}><div style={{ fontSize: 10, letterSpacing: ".12em", opacity: 0.7 }}>{f.state.toUpperCase()}</div><b>{f.label}</b></div>))}
        </div>
        <p style={{ color: "#a1a1aa", fontSize: 13, marginTop: 20 }}>Design contract · Acceptance tests<br />{live ? "Governor live :4810" : "Governor down · demo"}</p>
      </aside>

      {/* MIDDLE — chat, the main thing */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", maxWidth: 820, margin: "0 auto", padding: "20px 24px" }}>
        <p style={{ fontSize: 11, letterSpacing: ".15em", color: "#a1a1aa" }}>RESEARCH ASSISTANT · CHAT</p>
        <h2 style={{ margin: "8px 0 16px" }}>Ask about this worktree</h2>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, overflowY: "auto" }}>
          {msgs.map((m, i) => (<article key={i} style={{ background: m.who === "You" ? "#2e2e33" : "transparent", border: m.who === "You" ? "1px solid #45454d" : "none", borderRadius: 12, padding: m.who === "You" ? 16 : 0 }}>
            <p style={{ fontSize: 11, color: "#a1a1aa", margin: "0 0 6px" }}>{m.who}</p>
            <p style={{ lineHeight: 1.6, margin: 0, fontSize: 16 }}>{m.text}</p>
          </article>))}
        </div>
        <form onSubmit={send} style={{ display: "flex", gap: 8, marginTop: 20, position: "sticky", bottom: 0, background: "#17171a", padding: "12px 0" }}>
          <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask about this worktree…" style={{ flex: 1, background: "#34343a", border: "1px solid #45454d", borderRadius: 8, padding: "14px 16px", color: "#EFEADF", fontSize: 15 }} />
          <button type="submit" disabled={busy || !prompt.trim()} style={{ padding: "14px 22px", background: "#f59e0b", color: "#17171a", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>{busy ? "…" : "Send"}</button>
        </form>
      </main>

      {/* RIGHT, thin — receipts only, so chat stays central */}
      <aside style={{ width: 240, flexShrink: 0, borderLeft: "1px solid #45454d", padding: 16, background: "#2e2e33" }}>
        <p style={{ fontSize: 11, letterSpacing: ".15em", color: "#a1a1aa" }}>RECEIPTS</p>
        <p style={{ color: "#a1a1aa", fontSize: 14, lineHeight: 1.6 }}>No receipt has been written from this page yet.<br /><br />Human review is still waiting. Nothing here has been signed off.</p>
      </aside>
    </div>
  );
}
