import { useState } from "react";
import { Terminal, Copy, Check, Play, Zap } from "lucide-react";

export function InteractiveApiSandbox() {
  const [activeTab, setActiveTab] = useState<"curl" | "python" | "typescript">("curl");
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [responseOutput, setResponseOutput] = useState<any>({
    status: 200,
    model: "qwen-2.5-coder-32b-instruct",
    harness: "madmind-v0.1.0",
    judge: "cargo-clippy-pass",
    receipt: "0x7bf812a0d9e4",
    tokens: { prompt: 412, completion: 86, total: 498 },
    latency_ms: 38.4,
  });

  const handleCopy = () => {
    let text = "";
    if (activeTab === "curl") {
      text = `curl -X POST http://localhost:8001/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"model": "qwen-local", "judge": "strict", "prompt": "Implement lock-free queue"}'`;
    } else if (activeTab === "python") {
      text = `from atoma import BrigadeClient

client = BrigadeClient(base_url="http://localhost:8001")
run = client.harness.execute(
    mission="Implement lock-free queue",
    model="qwen-32b",
    judge="cargo-clippy-pass"
)
print(run.receipt.hash)`;
    } else {
      text = `import { AtomaClient } from "@atoma/sdk";

const client = new AtomaClient({ endpoint: "http://localhost:8001" });
const run = await client.execute({
  mission: "Implement lock-free queue",
  judge: "strict-ast"
});
console.log(run.receipt);`;
    }
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResponseOutput({
        status: 200,
        model: "qwen-2.5-coder-32b-instruct",
        harness: "madmind-v0.1.0",
        judge: "cargo-clippy-pass",
        receipt: `0x${Math.random().toString(16).substring(2, 14)}`,
        tokens: {
          prompt: Math.floor(380 + Math.random() * 80),
          completion: Math.floor(70 + Math.random() * 40),
          total: 512,
        },
        latency_ms: Number((32 + Math.random() * 15).toFixed(1)),
      });
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-1.5 backdrop-blur-xl">
      <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-white/5 bg-[#07090c] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#4fe3ea]" />
            <span className="font-mono text-xs font-semibold text-white">Local API Surface</span>
            <span className="rounded bg-[#3ddc84]/10 px-2 py-0.5 font-mono text-[10px] text-[#3ddc84]">
              http://localhost:8001/v1
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Tabs */}
            <div className="flex items-center rounded-full border border-white/10 bg-black/40 p-1 font-mono text-xs">
              {(["curl", "python", "typescript"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-3 py-1 uppercase text-[10px] transition-all ${
                    activeTab === tab
                      ? "bg-white/15 text-white font-semibold"
                      : "text-[#8b9595] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-[#8b9595] hover:bg-white/10 hover:text-white active:scale-95"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#3ddc84]" /> : <Copy className="h-3.5 w-3.5" />}
              <span className="text-[10px]">{copied ? "Copied" : "Copy"}</span>
            </button>

            {/* Run Button */}
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 rounded-full border border-[#4fe3ea]/40 bg-[#4fe3ea]/15 px-3.5 py-1 font-mono text-xs font-semibold text-[#4fe3ea] hover:bg-[#4fe3ea]/25 active:scale-95"
            >
              {isRunning ? (
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#4fe3ea] border-t-transparent" />
              ) : (
                <Play className="h-3 w-3 fill-current" />
              )}
              <span className="text-[10px]">{isRunning ? "Running..." : "Test Call"}</span>
            </button>
          </div>
        </div>

        {/* Code & Response Grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Request Payload */}
          <div className="rounded-xl border border-white/5 bg-black/50 p-3.5 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#5b6464]">Request Body</span>
            <pre className="mt-2 text-[11px] leading-relaxed text-[#e9eded] overflow-x-auto">
              {activeTab === "curl" && `curl -X POST http://localhost:8001/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "qwen-local",
    "judge": "cargo-clippy-pass",
    "prompt": "Optimize tokio scheduler atomic queues"
  }'`}
              {activeTab === "python" && `from atoma import BrigadeClient

client = BrigadeClient("http://localhost:8001")
run = client.harness.execute(
    mission="Optimize tokio scheduler atomic queues",
    model="qwen-32b",
    judge="cargo-clippy-pass"
)
print(f"Receipt: {run.receipt.hash}")`}
              {activeTab === "typescript" && `import { AtomaClient } from "@atoma/sdk";

const client = new AtomaClient({ endpoint: "http://localhost:8001" });
const run = await client.execute({
  mission: "Optimize tokio scheduler atomic queues",
  judge: "cargo-clippy-pass"
});
console.log(run.receipt.hash);`}
            </pre>
          </div>

          {/* Response Payload */}
          <div className="rounded-xl border border-white/5 bg-black/50 p-3.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#5b6464]">Receipt Response</span>
              <span className="flex items-center gap-1.5 text-[10px] text-[#3ddc84]">
                <Zap className="h-3 w-3" />
                {responseOutput.latency_ms}ms · 200 OK
              </span>
            </div>
            <pre className="mt-2 text-[11px] leading-relaxed text-[#4fe3ea] overflow-x-auto">
              {JSON.stringify(responseOutput, null, 2)}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
