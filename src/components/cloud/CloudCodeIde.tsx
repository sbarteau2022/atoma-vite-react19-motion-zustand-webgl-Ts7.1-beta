import { useState } from 'react'
import { ares } from '../../api'
import { useGovernor } from '../../governor'
import { useAtomaStore, type ChatTurn } from '../../store/useAtomaStore'

const files = [
  { name: 'design.md', mark: '' },
  { name: 'architecture.md', mark: '' },
  { name: 'runbook.rs', mark: 'M' },
  { name: 'validator.rs', mark: 'M' },
  { name: 'receipt.rs', mark: 'M' },
  { name: 'acceptance.rs', mark: 'M' },
]

const sources = [
  { file: 'design.md', note: 'Design contract' },
  { file: 'acceptance.rs', note: 'Acceptance tests' },
  { file: 'runbook.rs', note: 'Human review gate' },
]

const flow = [
  { id: 'scope', label: 'Scope', state: 'done' },
  { id: 'plan', label: 'Plan', state: 'done' },
  { id: 'implement', label: 'Implement', state: 'now' },
  { id: 'test', label: 'Test design', state: 'done' },
  { id: 'verify', label: 'Verify', state: 'wait' },
  { id: 'review', label: 'Human review', state: 'wait' },
  { id: 'receipt', label: 'Receipt', state: 'wait' },
] as const

const code: Record<string, string> = {
  'runbook.rs': `12   use crate::validation::{ValidationError, Result};
13   use crate::contract::DesignContract;
14   use crate::review::HumanReviewGate;
15
16   pub fn validate_runbook(runbook: &Runbook, contract: &DesignContract) -> Result<Vec<ValidationError>> {
17       let mut errors = Vec::new();
18 +     if runbook.steps.is_empty() {
19 +         errors.push(ValidationError::new("runbook must define at least one step"));
20 +     }
21       for (idx, step) in runbook.steps.iter().enumerate() {
22           if let Err(e) = validate_step(step, contract) {
23               errors.push(e.with_context(format!("step {}", idx + 1)));
24           }
25       }
26 +     if !runbook.requires_human_review() {
27 +         errors.push(ValidationError::new("runbook must include a human review gate"));
28 +     }
29       if errors.is_empty() { Ok(vec![]) } else { Err(errors) }
30   }`,
  'acceptance.rs': `04   #[test]
05   fn enforces_human_review_gate_on_consequential_changes() {
06       let contract = DesignContract::default_strict();
07       let runbook = Runbook::fixture_with_dedup_events();
08       assert!(validate_runbook(&runbook, &contract).is_ok());
09   }`,
  'receipt.rs': `03   pub struct N3Receipt {
04       pub run_id: String,
05       pub sha256_hash: String,
06       pub human_reviewed: bool,
07   }`,
}

type Pane = 'workspace' | 'flow' | 'changes' | 'receipts'
type Dock = 'terminal' | 'checks' | 'telemetry'

export function CloudCodeIdeView() {
  const { ideChatTurns, addIdeChatTurn, pushIdeTurn } = useAtomaStore()
  const { link, status } = useGovernor()
  const live = link === 'live'
  const [pane, setPane] = useState<Pane>('workspace')
  const [dock, setDock] = useState<Dock>('terminal')
  const [file, setFile] = useState('runbook.rs')
  const [step, setStep] = useState<(typeof flow)[number]['id']>('implement')
  const [prompt, setPrompt] = useState('')
  const [busy, setBusy] = useState(false)
  const [openTabs, setOpenTabs] = useState<string[]>(['runbook.rs', 'acceptance.rs'])

  function openFile(name: string) {
    setFile(name)
    setPane('workspace')
    setOpenTabs((tabs) => (tabs.includes(name) ? tabs : [...tabs, name]))
  }

  async function send(event: React.FormEvent) {
    event.preventDefault()
    const text = prompt.trim()
    if (!text || busy) return
    setPrompt('')
    addIdeChatTurn(text)
    setBusy(true)
    try {
      const rag = await ares.rag(text, 6)
      const bullets = rag.hits.slice(0, 4).map(
        (hit) => `${hit.source_path ?? hit.document_id ?? hit.id}: ${hit.text.slice(0, 180)}`,
      )
      const turn: ChatTurn = {
        id: `ide-a-${Date.now()}`,
        sender: 'assistant',
        authorLabel: 'Research assistant',
        timestamp: 'Now',
        modelUsed: live ? 'this computer' : 'local demo',
        text: bullets.length
          ? `Found ${bullets.length} notes on this computer.`
          : 'Nothing matched. No job was opened.',
        bullets: bullets.length ? bullets : undefined,
      }
      pushIdeTurn(turn)
    } catch {
      pushIdeTurn({
        id: `ide-a-${Date.now()}`,
        sender: 'assistant',
        authorLabel: 'Research assistant',
        timestamp: 'Now',
        modelUsed: 'local demo',
        text: 'The program is not answering. This reply is a demo, and the human review still has to happen.',
      })
    } finally {
      setBusy(false)
    }
  }

  const body = code[file] ?? code['runbook.rs']
  const active = flow.find((item) => item.id === step) ?? flow[2]

  return (
    <div className="flex flex-1 min-h-0 bg-slate-page text-cream">
      <section className="flex flex-col flex-1 min-w-0 min-h-0 border-r border-white/10">
        <div className="flex items-center gap-1 px-3 h-10 border-b border-white/10 bg-slate-panel" role="tablist">
          {(
            [
              ['workspace', 'Workspace'],
              ['flow', 'Project flow'],
              ['changes', 'Changes'],
              ['receipts', 'Receipts'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={pane === id}
              onClick={() => setPane(id)}
              className={`px-3 h-7 rounded-md text-xs cursor-pointer ${
                pane === id ? 'bg-slate-editor text-cream' : 'text-slate-muted hover:text-cream'
              }`}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-slate-muted">
            {live ? 'Program up · study layout' : 'Demo · study layout'}
          </span>
        </div>

        <div className="flex flex-1 min-h-0">
          <aside className="w-56 shrink-0 border-r border-white/10 bg-slate-panel flex flex-col min-h-0">
            <div className="px-3 py-2 text-xs text-cream border-b border-white/10">Runbook study</div>
            <div className="px-3 py-2 font-mono text-[11px] text-amber-500">runbook-review</div>
            <ul className="px-2 space-y-0.5 overflow-y-auto">
              {files.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => openFile(item.name)}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-left font-mono text-[11px] cursor-pointer ${
                      file === item.name ? 'bg-amber-500/15 text-cream' : 'text-cream/80 hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{item.name}</span>
                    {item.mark && <span className="text-amber-500">{item.mark}</span>}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-white/10 p-3 space-y-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-muted">Context</p>
              {sources.map((item) => (
                <button
                  key={item.file}
                  type="button"
                  onClick={() => openFile(item.file)}
                  className="w-full text-left cursor-pointer"
                >
                  <span className="block text-xs text-cream">{item.file}</span>
                  <span className="block text-[11px] text-slate-muted">{item.note}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="flex flex-col flex-1 min-w-0 min-h-0">
            {pane === 'workspace' && (
              <>
                <div className="flex items-center h-9 border-b border-white/10 bg-slate-page overflow-x-auto">
                  {openTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setFile(tab)}
                      className={`px-3 h-full text-[11px] font-mono cursor-pointer border-r border-white/10 ${
                        file === tab ? 'text-cream bg-slate-editor' : 'text-slate-muted hover:text-cream'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <pre className="flex-1 overflow-auto m-0 p-4 text-[12px] leading-5 font-mono bg-slate-editor text-cream/90">
                  {body.split('\n').map((line) => (
                    <div
                      key={line}
                      className={line.includes(' + ') || line.trimStart().startsWith('+') ? 'bg-amber-500/15' : undefined}
                    >
                      {line}
                    </div>
                  ))}
                </pre>
              </>
            )}
            {pane === 'changes' && (
              <div className="flex-1 overflow-auto p-4 font-mono text-[12px] leading-6">
                <p className="text-slate-muted mb-3">runbook.rs · lines that would be kept</p>
                {body
                  .split('\n')
                  .filter((line) => line.includes('+'))
                  .map((line) => (
                    <div key={line} className="bg-amber-500/15">
                      {line}
                    </div>
                  ))}
              </div>
            )}
            {pane === 'receipts' && (
              <div className="flex-1 overflow-auto p-4 text-sm text-slate-muted">
                <p className="text-cream mb-2">No receipt has been written from this page.</p>
                <p>
                  {live
                    ? `The program is up${status?.governance.ok ? ' and the record checks out' : ', and the record is not finished'}. Opening a file here does not start a job.`
                    : 'Demo. The program is not running on this computer.'}
                </p>
              </div>
            )}

            {(pane === 'workspace' || pane === 'flow') && (
              <div className={`border-t border-white/10 bg-slate-panel px-3 py-3 ${pane === 'flow' ? 'flex-1' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-cream">Project flow</p>
                  <p className="text-[11px] text-slate-muted">{active.label}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {flow.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStep(item.id)}
                      className={`px-3 py-2 rounded-lg border text-left cursor-pointer ${
                        step === item.id
                          ? 'border-amber-500 bg-amber-500 text-ink'
                          : 'border-white/10 bg-slate-editor text-cream hover:border-amber-500/50'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-[0.12em] opacity-70">
                        {item.state === 'now' ? 'In progress' : item.state === 'done' ? 'In the study' : 'Waiting'}
                      </span>
                      <span className="block text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-white/10 bg-slate-page">
              <div className="flex items-center h-8 px-2 gap-1" role="tablist">
                {(
                  [
                    ['terminal', 'Terminal'],
                    ['checks', 'Checks'],
                    ['telemetry', 'Telemetry'],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={dock === id}
                    onClick={() => setDock(id)}
                    className={`px-2 h-6 rounded text-[11px] cursor-pointer ${
                      dock === id ? 'text-cream' : 'text-slate-muted hover:text-cream'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="px-3 pb-2 min-h-14 font-mono text-[11px] text-slate-muted">
                {dock === 'terminal' && <p>No command has been run from this page.</p>}
                {dock === 'checks' && <p>Human review is still waiting. Nothing here has been signed off.</p>}
                {dock === 'telemetry' && (
                  <p>
                    {live
                      ? `Program responding${status?.backend.port ? ` on port ${status.backend.port}` : ''}.`
                      : 'No live telemetry. This dock stays labelled demo.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="w-[340px] shrink-0 flex flex-col min-h-0 bg-slate-panel">
        <div className="h-10 px-3 flex items-center border-b border-white/10 text-xs text-cream">
          Research assistant
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {ideChatTurns.map((turn) => (
            <article key={turn.id} className="text-sm">
              <p className="text-[11px] text-slate-muted mb-1">
                {turn.authorLabel ?? (turn.sender === 'user' ? 'You' : 'Assistant')}
                {turn.modelUsed ? ` · ${turn.modelUsed}` : ''}
              </p>
              <p className={`leading-relaxed ${turn.sender === 'user' ? 'text-cream' : 'text-cream/85'}`}>{turn.text}</p>
              {turn.bullets && (
                <ul className="mt-2 space-y-1 text-[11px] text-slate-muted">
                  {turn.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
        <form onSubmit={(event) => void send(event)} className="p-3 border-t border-white/10 flex gap-2">
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask about this worktree…"
            className="flex-1 bg-slate-editor border border-white/10 rounded-md px-3 py-2 text-xs text-cream placeholder:text-slate-muted"
          />
          <button
            type="submit"
            disabled={busy || !prompt.trim()}
            className="px-3 rounded-md bg-amber-500 text-ink text-xs font-semibold cursor-pointer disabled:cursor-not-allowed"
          >
            {busy ? '…' : 'Send'}
          </button>
        </form>
      </aside>
    </div>
  )
}
