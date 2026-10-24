import { create } from "zustand";

export interface PipelineStep {
  id: string;
  name: string;
  lane: string;
  model: string;
  judge: string;
  status: "verified" | "running" | "blocked" | "queued";
  summary: string;
  detail: string;
  codeSnippet?: string;
  receipt?: {
    hash: string;
    verdict: "PASS" | "FAIL" | "PENDING";
    judgeName: string;
    checkedAt: string;
    invariants: string[];
  };
}

export interface ActiveRun {
  id: string;
  name: string;
  role: string;
  category: string;
  status: "running" | "queued" | "completed";
  progress: number;
  steps: PipelineStep[];
}

export interface AgentWorker {
  id: string;
  role: string;
  pinnedModel: string;
  status: "active" | "idle" | "gated";
  budget: string;
  consumed: string;
  description: string;
}

export interface MCPServerInfo {
  id: string;
  name: string;
  transport: "stdio" | "http";
  toolCount: number;
  status: "healthy" | "warning";
  latency: string;
  tools: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  tools: string[];
  trigger: string;
  content: string;
}

export interface LedgerEvent {
  seq: number;
  timestamp: string;
  runId: string;
  type: "plan" | "packet" | "judge" | "receipt" | "seal";
  detail: string;
  hash: string;
  status: "ok" | "pending" | "warn";
}

interface BrigadeState {
  activeTab: "pipelines" | "agents" | "mcp" | "skills" | "audit";
  setActiveTab: (tab: "pipelines" | "agents" | "mcp" | "skills" | "audit") => void;

  selectedRunId: string;
  setSelectedRunId: (id: string) => void;

  selectedStepId: string;
  setSelectedStepId: (id: string) => void;

  isPlaying: boolean;
  togglePlaying: () => void;

  runs: ActiveRun[];
  agents: AgentWorker[];
  mcpServers: MCPServerInfo[];
  skills: SkillItem[];
  ledgerEvents: LedgerEvent[];

  telemetry: {
    gpuUsage: number;
    memoryUsage: number;
    kvCache: number;
    decodeSpeed: number;
    egressBytes: number;
    auditStatus: "verified" | "sealing";
  };
  toksSeries: number[];

  tickTelemetry: () => void;
}

export const useBrigadeStore = create<BrigadeState>((set, get) => ({
  activeTab: "pipelines",
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectedRunId: "BRG-142",
  setSelectedRunId: (id) => {
    const run = get().runs.find((r) => r.id === id);
    set({
      selectedRunId: id,
      selectedStepId: run?.steps[0]?.id || "build",
    });
  },

  selectedStepId: "build",
  setSelectedStepId: (id) => set({ selectedStepId: id }),

  isPlaying: true,
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),

  runs: [
    {
      id: "BRG-142",
      name: "Refactor tokio runtime scheduler",
      role: "PLANNER",
      category: "core-runtime",
      status: "running",
      progress: 58,
      steps: [
        {
          id: "plan",
          name: "Plan",
          lane: "planner",
          model: "qwen-72b-instruct · local",
          judge: "runbook-ast-checker",
          status: "verified",
          summary: "Steps as data: runbook DAG generated with 7 distinct packets.",
          detail: "Plan validated by deterministic schema. Dependencies verified without cyclic locks.",
          receipt: {
            hash: "0x7bf812a0d9e4",
            verdict: "PASS",
            judgeName: "dag-invariance-judge",
            checkedAt: "01:21:04 UTC",
            invariants: ["No cyclic dependencies", "Every packet has pinned judge", "Budget capped at 12k tokens"],
          },
        },
        {
          id: "judge-plan",
          name: "Judge",
          lane: "contributor-gate",
          model: "muse-spark-1.3 · gated",
          judge: "formal-contract-gate",
          status: "verified",
          summary: "Plan signed and verified under strict invariants.",
          detail: "Receipt #1042 sealed. All packet boundaries are auditable.",
          receipt: {
            hash: "0x3fe19b8812c4",
            verdict: "PASS",
            judgeName: "runbook-contract-judge",
            checkedAt: "01:21:18 UTC",
            invariants: ["Memory budget < 8GB verified", "Local sandbox active"],
          },
        },
        {
          id: "build",
          name: "Build",
          lane: "builder",
          model: "qwen-32b-coder · local",
          judge: "cargo-clippy-judge",
          status: "running",
          summary: "Executing packet 4 of 7 — atomic task-stealing queue optimization.",
          detail: "Applying cache-line aligned atomic pointers to reduce lock contention across M2 cores.",
          codeSnippet: `pub struct StealQueue<T> {
    buffer: CachePadded<Buffer<T>>,
    head: AtomicUsize,
    tail: AtomicUsize,
}`,
        },
        {
          id: "test",
          name: "Test",
          lane: "builder",
          model: "cargo test --release",
          judge: "miri-concurrency-verifier",
          status: "queued",
          summary: "Concurrency fuzzing & race-condition sanitization.",
          detail: "Will execute 10,000 parallel steal attempts under Loom harness.",
        },
        {
          id: "judge-receipt",
          name: "Judge",
          lane: "judge-lane",
          model: "deterministic-judge-suite",
          judge: "receipt-signature-validator",
          status: "queued",
          summary: "Receipt gate verification against declared test contract.",
          detail: "No code completes without an immutable receipt sealed to disk.",
        },
        {
          id: "ship",
          name: "Ship",
          lane: "orchestrator",
          model: "git-commit-signer",
          judge: "git-clean-tree",
          status: "queued",
          summary: "Append to immutable runbook ledger and prepare patch.",
          detail: "Zero egress: patch stays inside local workspace.",
        },
      ],
    },
    {
      id: "BRG-141",
      name: "Index arxiv cs.AI — last 24h",
      role: "RESEARCHER",
      category: "knowledge-base",
      status: "running",
      progress: 74,
      steps: [
        {
          id: "plan",
          name: "Plan",
          lane: "researcher",
          model: "qwen-72b · local",
          judge: "arxiv-schema-judge",
          status: "verified",
          summary: "Ingested 148 preprints from arXiv API.",
          detail: "Extracted abstracts, taxonomy tags, and citation matrices.",
        },
        {
          id: "build",
          name: "Embed",
          lane: "builder",
          model: "bge-m3-local · metal",
          judge: "vector-dimension-judge",
          status: "running",
          summary: "Generating 1024-dim dense embeddings.",
          detail: "Processing batch 110 of 148 on unified memory.",
        },
      ],
    },
    {
      id: "BRG-139",
      name: "Quantize 7B to Q4_K_M for M2 8GB",
      role: "LABS",
      category: "model-ops",
      status: "running",
      progress: 92,
      steps: [
        {
          id: "plan",
          name: "Calibrate",
          lane: "labs",
          model: "llama.cpp-metal",
          judge: "perplexity-judge",
          status: "verified",
          summary: "Perplexity drift check: delta < 0.04.",
          detail: "Optimal quantization parameters selected for attention layers.",
        },
        {
          id: "build",
          name: "Quantize",
          lane: "labs",
          model: "metal-compute-kernel",
          judge: "tensor-hash-judge",
          status: "running",
          summary: "Writing 4.1 GB GGUF weight artifact.",
          detail: "8.8 / 16 GB unified RAM active.",
        },
      ],
    },
    {
      id: "BRG-137",
      name: "Generate Skills.md for repo tooling",
      role: "QUEUED",
      category: "contract-gen",
      status: "queued",
      progress: 10,
      steps: [
        {
          id: "plan",
          name: "Inspect",
          lane: "planner",
          model: "qwen-72b",
          judge: "ast-judge",
          status: "queued",
          summary: "Scanning repository endpoints and CLI commands.",
          detail: "Contract generation will begin once BRG-142 completes.",
        },
      ],
    },
  ],

  agents: [
    {
      id: "agt-planner",
      role: "Lead Planner",
      pinnedModel: "Qwen 2.5 72B Instruct (Q4_K_M)",
      status: "active",
      budget: "16,000 tokens / run",
      consumed: "6,412 tokens",
      description: "Decomposes missions into rigorous packet DAGs. Does not write code without explicit judge schema.",
    },
    {
      id: "agt-builder",
      role: "Code Builder",
      pinnedModel: "Qwen 2.5 Coder 32B (Q5_K_M)",
      status: "active",
      budget: "24,000 tokens / run",
      consumed: "11,840 tokens",
      description: "Fast, local, zero-leak implementation engine. Runs directly on Apple Silicon Metal or CUDA.",
    },
    {
      id: "agt-researcher",
      role: "Literature Researcher",
      pinnedModel: "DeepSeek R1 Distill 14B (Q6_K)",
      status: "active",
      budget: "12,000 tokens / run",
      consumed: "4,190 tokens",
      description: "Scans arXiv preprints, docs, and codebases via local MCP servers. Synthesizes evidence.",
    },
    {
      id: "agt-judge",
      role: "Deterministic Judge",
      pinnedModel: "Rule Engine & AST Validator (No LLM)",
      status: "active",
      budget: "Deterministic (0 tokens)",
      consumed: "0 tokens",
      description: "Non-fluent, mathematically verifiable checks. Cargo check, clippy, unit tests, and invariant matrices.",
    },
  ],

  mcpServers: [
    {
      id: "mcp-fs",
      name: "atoma-fs",
      transport: "stdio",
      toolCount: 14,
      status: "healthy",
      latency: "0.4ms",
      tools: ["read_file", "write_file", "edit_file", "list_dir", "file_checksum", "watch_tree", "diff_patch"],
    },
    {
      id: "mcp-research",
      name: "atoma-research",
      transport: "http",
      toolCount: 9,
      status: "healthy",
      latency: "1.2ms",
      tools: ["arxiv_search", "doi_fetch", "pdf_extract", "crossref_citations", "abstract_cluster", "cite_bibtex"],
    },
    {
      id: "mcp-infer",
      name: "atoma-infer-metal",
      transport: "stdio",
      toolCount: 6,
      status: "healthy",
      latency: "0.2ms",
      tools: ["eval_prompt", "stream_tokens", "kv_cache_rewind", "perplexity_test", "speculative_step"],
    },
  ],

  skills: [
    {
      id: "sk-rust-refactor",
      name: "rust-refactor.md",
      tools: ["atoma-fs", "cargo", "clippy"],
      trigger: "When crate fails clippy -D warnings or compiler borrow checker",
      content: `---
name: rust-refactor
tools: [atoma-fs, cargo]
model_tier: coder-local
---
# Contract: Rust Refactor
Only mutate files inside the specified crate workspace.
Never silence warnings with #[allow(...)] unless an RFC note is pinned.`,
    },
    {
      id: "sk-ledger-audit",
      name: "ledger-audit.md",
      tools: ["atoma-fs", "sha256"],
      trigger: "Executed post-run to verify SHA-256 chain continuity",
      content: `---
name: ledger-audit
tools: [sha256, fs]
---
# Contract: Ledger Audit
Verify every packet receipt matches root hash. Block pipeline if any tampered byte is found.`,
    },
  ],

  ledgerEvents: [
    {
      seq: 1042,
      timestamp: "01:21:04",
      runId: "BRG-142",
      type: "plan",
      detail: "Runbook DAG compiled with 7 steps and 0 cycles",
      hash: "0x7bf8...d9e4",
      status: "ok",
    },
    {
      seq: 1043,
      timestamp: "01:21:18",
      runId: "BRG-142",
      type: "packet",
      detail: "Packet #04 issued to Builder lane (qwen-32b)",
      hash: "0x3fe1...12c4",
      status: "ok",
    },
    {
      seq: 1044,
      timestamp: "01:22:02",
      runId: "BRG-142",
      type: "judge",
      detail: "Deterministic AST check passed; borrow checker verified",
      hash: "0x9c42...ff01",
      status: "ok",
    },
    {
      seq: 1045,
      timestamp: "01:22:45",
      runId: "BRG-142",
      type: "receipt",
      detail: "Receipt sealed with zero network egress",
      hash: "0x4a12...8e22",
      status: "ok",
    },
  ],

  telemetry: {
    gpuUsage: 61,
    memoryUsage: 5.8,
    kvCache: 1.2,
    decodeSpeed: 25.4,
    egressBytes: 0,
    auditStatus: "verified",
  },
  toksSeries: [22, 23.5, 24.1, 26.2, 25.0, 24.8, 25.9, 27.1, 25.4],

  tickTelemetry: () => {
    if (!get().isPlaying) return;
    set((state) => {
      const delta = (Math.random() - 0.5) * 1.6;
      const newSpeed = Math.max(21, Math.min(29, Number((state.telemetry.decodeSpeed + delta).toFixed(1))));
      const newGpu = Math.max(54, Math.min(68, Math.round(state.telemetry.gpuUsage + (Math.random() - 0.5) * 3)));
      const newMem = Math.max(5.6, Math.min(6.2, Number((state.telemetry.memoryUsage + (Math.random() - 0.5) * 0.1).toFixed(2))));
      const newKv = Math.max(1.1, Math.min(1.4, Number((state.telemetry.kvCache + (Math.random() - 0.5) * 0.05).toFixed(2))));
      const nextSeries = [...state.toksSeries.slice(1), newSpeed];

      return {
        telemetry: {
          ...state.telemetry,
          decodeSpeed: newSpeed,
          gpuUsage: newGpu,
          memoryUsage: newMem,
          kvCache: newKv,
        },
        toksSeries: nextSeries,
      };
    });
  },
}));
