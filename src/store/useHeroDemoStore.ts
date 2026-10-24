import { create } from "zustand";

export type DemoStatus = "queued" | "running" | "verified";
export type DemoWorkspace = "Pipelines" | "Agents" | "MCP Servers" | "Skills" | "Audit Log";
export type DemoView = "Graph" | "Code" | "Logs" | "Replay";

export const demoPhases = [
  { label: "Intent", event: "Mission intent scoped · BRG-142", detail: "Mission parsed into a bounded scheduler refactor with explicit acceptance checks." },
  { label: "Research", event: "Research packet verified · 12 sources mapped", detail: "Research patterns and runtime constraints are attached to the plan." },
  { label: "Delegate", event: "Three isolated packets dispatched", detail: "Builder, documentation, and security lanes receive scoped work packets." },
  { label: "Verify", event: "Contract and access checks passed", detail: "Independent judges verify implementation, documentation, and least-privilege boundaries." },
  { label: "Replay", event: "Replay receipt sealed · DEMO-7A9C", detail: "The walkthrough is complete. Every transition is represented in the replay trail." },
] as const;

export const demoNodes = [
  { id: "intent", title: "Mission intent", tag: "META ORCHESTRATOR", lane: "Control plane", x: 5, y: 10, codeFile: ".atoma/runs/BRG-142/runbook.yaml", code: ["run: BRG-142", "mission: refactor tokio runtime scheduler", "policy: least_privilege", "replay: enabled", "agents:", "  - builder-runtime", "  - builder-docs", "  - security-review"], evidence: "Run contract · scope: 3 lanes · egress: disabled" },
  { id: "research", title: "Research patterns", tag: "RESEARCH AGENT", lane: "Research lane", x: 28, y: 10, codeFile: "research/runtime/supervision.md", code: ["# Runtime supervision patterns", "", "- Bound each worker capability", "- Preserve task ancestry", "- Retry only idempotent packets", "- Attach source references to decisions"], evidence: "12 source notes · 4 implementation patterns · 0 unresolved citations" },
  { id: "design", title: "Define interfaces", tag: "ARCHITECT", lane: "Design lane", x: 53, y: 10, codeFile: "design/runtime/packet-contract.md", code: ["packet: RuntimeTask", "inputs: [contract, scoped_files]", "outputs: [patch, verification_receipt]", "permissions: [read, write:src/runtime]", "judge: deterministic-contract", "retry: idempotent_only"], evidence: "Packet contract · dependency edges: acyclic · capabilities: pinned" },
  { id: "build", title: "Build scheduler", tag: "BUILDER A", lane: "Runtime builder", x: 17, y: 55, codeFile: "src/runtime/scheduler.rs", code: ["pub async fn dispatch(packet: Packet) -> Result<Receipt> {", "  let scope = packet.capabilities();", "  let worker = pool.acquire_scoped(scope).await?;", "  let output = worker.execute(packet.payload).await?;", "  let verdict = judge::verify(&packet.contract, &output)?;", "  ledger.append(Receipt::seal(packet.id, verdict)).await", "}"], evidence: "4 files in scope · builder patch staged · contract judge pending" },
  { id: "docs", title: "Update docs", tag: "BUILDER B", lane: "Documentation builder", x: 44, y: 55, codeFile: "docs/runtime/scheduler.md", code: ["# Supervised task scheduling", "", "## Packet lifecycle", "Intent → plan → isolated execution", "Every handoff carries a typed receipt.", "Retries follow the packet policy."], evidence: "Documentation diff · links checked · reviewer receipt pending" },
  { id: "audit", title: "Access review", tag: "SECURITY AGENT", lane: "Security lane", x: 72, y: 55, codeFile: ".atoma/policy/BRG-142.json", code: ["{", "  \"filesystem\": [\"src/runtime/**\", \"docs/runtime/**\"],", "  \"network\": \"denied\",", "  \"secrets\": \"denied\",", "  \"receipt_required\": true", "}"], evidence: "Tool scope · filesystem allowlist · network denied by policy" },
  { id: "verify", title: "Verify + replay", tag: "DETERMINISTIC JUDGE", lane: "Verification", x: 43, y: 78, codeFile: ".atoma/replays/BRG-142.events", code: ["01 intent.accepted      PASS", "02 research.attached    PASS", "03 packet.dispatched    PASS", "04 contract.verified   PASS", "05 receipt.sealed       PASS", "", "replay_id: DEMO-7A9C"], evidence: "Replay receipt · hash: demo:7a9c · persisted: preview only" },
] as const;

export const demoEdges: [number, number][] = [[0,1],[1,2],[0,3],[2,3],[2,4],[2,5],[3,6],[4,6],[5,6]];

export interface DemoMessage { id: string; role: "agent" | "user"; text: string; }
interface HeroDemoState {
  phase: number;
  isPlaying: boolean;
  selectedNodeId: string;
  workspace: DemoWorkspace;
  view: DemoView;
  messages: DemoMessage[];
  setWorkspace: (workspace: DemoWorkspace) => void;
  setView: (view: DemoView) => void;
  selectNode: (id: string) => void;
  setPhase: (phase: number) => void;
  advance: () => void;
  previous: () => void;
  togglePlayback: () => void;
  replay: () => void;
  sendCommand: (value: string) => void;
}

const phaseMessages = [
  "I scoped BRG-142 to the Tokio scheduler. Network access is off; each lane has a named contract.",
  "Research is attached to the plan. I found 12 source notes and mapped the supervision patterns to the runtime constraints.",
  "The work is split across three isolated lanes: runtime implementation, documentation, and access review.",
  "All three lanes passed their declared checks. The replay now captures the contract and security receipts.",
  "BRG-142 demo replay is sealed. Select any node to inspect its packet, code, and evidence.",
];

function phaseStatus(phase: number, index: number): DemoStatus {
  if (phase === 0) return index === 0 ? "verified" : "queued";
  if (phase === 1) return index < 2 ? "verified" : index === 2 ? "running" : "queued";
  if (phase === 2) return index < 3 ? "verified" : index < 6 ? "running" : "queued";
  if (phase === 3) return index < 6 ? "verified" : "running";
  return "verified";
}

function seededMessages(phase: number): DemoMessage[] {
  return phaseMessages.slice(0, phase + 1).map((text, index) => ({ id: `phase-${index}`, role: "agent", text }));
}

export const useHeroDemoStore = create<HeroDemoState>((set, get) => ({
  phase: 2,
  isPlaying: false,
  selectedNodeId: "build",
  workspace: "Pipelines",
  view: "Graph",
  messages: seededMessages(2),
  setWorkspace: (workspace) => set({ workspace, view: workspace === "Audit Log" ? "Logs" : get().view }),
  setView: (view) => set({ view }),
  selectNode: (selectedNodeId) => set({ selectedNodeId }),
  setPhase: (phase) => {
    const next = Math.max(0, Math.min(demoPhases.length - 1, phase));
    const conversation = get().messages.filter((message) => !message.id.startsWith("phase-"));
    set({ phase: next, isPlaying: false, messages: [...seededMessages(next), ...conversation] });
  },
  advance: () => {
    const next = get().phase + 1;
    if (next >= demoPhases.length) return set({ isPlaying: false });
    const conversation = get().messages.filter((message) => !message.id.startsWith("phase-"));
    set({ phase: next, messages: [...seededMessages(next), ...conversation] });
  },
  previous: () => get().setPhase(get().phase - 1),
  togglePlayback: () => {
    if (get().phase === demoPhases.length - 1) return set({ phase: 0, isPlaying: true, messages: seededMessages(0) });
    set({ isPlaying: !get().isPlaying });
  },
  replay: () => set({ phase: 0, isPlaying: true, messages: seededMessages(0), view: "Graph", workspace: "Pipelines", selectedNodeId: "intent" }),
  sendCommand: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const id = `command-${Date.now()}`;
    const normalized = trimmed.toLowerCase();
    const answer = normalized.includes("risk")
      ? get().phase >= 3 ? "No open blockers in this demo replay. The builder, docs, and security lanes each have a passing receipt." : "The active frontier is the implementation packet. Docs and security remain in progress; the verification gate has not run yet."
      : normalized.includes("receipt") ? get().phase >= 4 ? "Demo receipt DEMO-7A9C is sealed in this preview. Persistent replay storage is not connected." : "The final replay receipt is pending until the verification phase completes."
      : "Command captured in the demo conversation. A connected orchestrator would validate authority and scope before dispatch.";
    set((state) => ({ messages: [...state.messages, { id, role: "user", text: trimmed }, { id: `${id}-reply`, role: "agent", text: answer }] }));
  },
}));

export function getDemoNodeState(phase: number, id: string): DemoStatus {
  const index = demoNodes.findIndex((node) => node.id === id);
  return phaseStatus(phase, index);
}
