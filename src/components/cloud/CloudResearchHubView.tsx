import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ares } from '../../api'
import { useGovernor } from '../../governor'
import { preprintById, preprints } from '../../preprints'
import { CLOUD_MODELS, useAtomaStore, type ChatTurn, type UploadedDocItem } from '../../store/useAtomaStore'
import { AtomaLogoMark } from '../brand/AtomaBrandAssets'

export function CloudResearchHubView() {
  const { researchChatTurns, addResearchChatTurn, pushResearchTurn, addUploadedDoc, uploadedDocs, selectedCloudModel } =
    useAtomaStore()
  const modelName = CLOUD_MODELS.find((item) => item.id === selectedCloudModel)?.name ?? 'Catalog'
  const { link } = useGovernor()
  const live = link === 'live'
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const paper = preprintById(params.get('paper'))
  const [sectionId, setSectionId] = useState(paper.sections[0]?.id ?? '')
  const section = paper.sections.find((item) => item.id === sectionId) ?? paper.sections[0]
  const [prompt, setPrompt] = useState('')
  const [busy, setBusy] = useState(false)
  const asks = [
    { label: 'Falsify', hint: 'What would break the claim', text: `What would falsify “${section?.title ?? paper.title}”?` },
    { label: 'Plain language', hint: 'Say it without the jargon', text: `Say “${paper.title}” in plain language.` },
    { label: 'Still proposed', hint: 'Separate idea from result', text: `What in “${paper.title}” is still a proposal, not a measured result?` },
  ]

  function openPaper(id: string) {
    const next = preprintById(id)
    setSectionId(next.sections[0]?.id ?? '')
    navigate(`/app?tab=research&paper=${next.id}`)
  }

  function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files?.length) return
    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toUpperCase() || 'MD'
      const kind: UploadedDocItem['kind'] =
        ext === 'PDF' ? 'PDF' : ext === 'RS' || ext === 'TS' ? 'CODE' : ext === 'YAML' ? 'YAML' : 'MD'
      addUploadedDoc({
        id: `doc-${Date.now()}-${file.name}`,
        name: file.name,
        kind,
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        sections: 1,
        status: 'Indexed',
        summary: 'Added beside the preprints. Not part of a checked result.',
      })
    })
  }

  async function send(raw: string) {
    const text = raw.trim()
    if (!text || busy) return
    setPrompt('')
    addResearchChatTurn(text)
    setBusy(true)
    try {
      const rag = await ares.rag(text, 6)
      const bullets = rag.hits.slice(0, 3).map((hit) => hit.text.slice(0, 180))
      pushResearchTurn({
        id: `r-a-${Date.now()}`,
        sender: 'assistant',
        authorLabel: 'Assistant',
        timestamp: 'Now',
        modelUsed: live ? 'this computer' : 'local demo',
        text: bullets.length
          ? `Notes for “${paper.title}”. These are retrieved lines, not a new result.`
          : 'Nothing matched. The preprint was not changed.',
        bullets: bullets.length ? bullets : undefined,
      })
    } catch {
      const turn: ChatTurn = {
        id: `r-a-${Date.now()}`,
        sender: 'assistant',
        authorLabel: 'Assistant',
        timestamp: 'Now',
        modelUsed: 'local demo',
        text: 'The program is not answering. The preprint on the page is unchanged.',
      }
      pushResearchTurn(turn)
    } finally {
      setBusy(false)
    }
  }

  const spokes = paper.sections.map((item, index) => {
    const angle = (-Math.PI / 2) + (index * 2 * Math.PI) / paper.sections.length
    return {
      ...item,
      x: 120 + Math.cos(angle) * 78,
      y: 100 + Math.sin(angle) * 68,
    }
  })

  return (
    <div className="flex h-full min-h-0 bg-slate-page text-cream">
      <aside className="w-60 shrink-0 border-r border-white/10 bg-slate-panel flex flex-col min-h-0">
        <div className="px-3 py-2 text-xs border-b border-white/10">Preprints</div>
        <ul className="px-2 py-2 space-y-1 overflow-y-auto">
          {preprints.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => openPaper(item.id)}
                className={`w-full text-left px-2 py-1.5 rounded cursor-pointer ${
                  paper.id === item.id ? 'bg-amber-500 text-ink' : 'text-cream hover:bg-slate-editor'
                }`}
              >
                <span className="block font-mono text-[10px] tracking-[0.14em] opacity-70">{item.no}</span>
                <span className="block text-[12px] leading-snug">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="px-3 pt-2 text-[11px] uppercase tracking-[0.14em] text-slate-muted">
          Relational context
        </div>
        <svg viewBox="0 0 240 200" className="w-full h-40 shrink-0" role="img" aria-label="Context graph">
          {spokes.map((item) => (
            <line
              key={item.id}
              x1="120"
              y1="100"
              x2={item.x}
              y2={item.y}
              stroke={section?.id === item.id ? '#c67c14' : 'rgba(240,231,218,0.28)'}
              strokeWidth="1.25"
            />
          ))}
          <circle cx="120" cy="100" r="26" fill="#34343a" stroke="#c67c14" />
          <text
            x="120"
            y="103"
            textAnchor="middle"
            fill="#f0e7da"
            fontSize="8"
            fontFamily="IBM Plex Mono, ui-monospace, monospace"
          >
            {paper.no}
          </text>
          {spokes.map((item) => (
            <g key={item.id} onClick={() => setSectionId(item.id)} className="cursor-pointer">
              <circle
                cx={item.x}
                cy={item.y}
                r="15"
                fill={section?.id === item.id ? '#c67c14' : '#2e2e33'}
                stroke={section?.id === item.id ? '#c67c14' : 'rgba(240,231,218,0.45)'}
              />
              <text
                x={item.x}
                y={item.y + 3}
                textAnchor="middle"
                fill={section?.id === item.id ? '#1c1c1c' : '#f0e7da'}
                fontSize="7"
                fontFamily="IBM Plex Mono, ui-monospace, monospace"
              >
                {item.title.split(' ')[0]}
              </text>
            </g>
          ))}
        </svg>
        <p className="px-3 pb-2 text-[11px] text-slate-muted">{section?.title}</p>

        <div className="mt-auto border-t border-white/10 p-3 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-muted">
            Attachments ({uploadedDocs.length})
          </p>
          <label className="block text-xs text-cream cursor-pointer">
            Add a file
            <input type="file" className="sr-only" onChange={onUpload} />
          </label>
          <a className="block text-xs text-amber-400 underline-offset-2 hover:underline" href={paper.pdf}>
            Open this PDF
          </a>
          {uploadedDocs.slice(0, 2).map((item) => (
            <p key={item.id} className="font-mono text-[11px] text-slate-muted truncate">
              {item.name}
            </p>
          ))}
        </div>
      </aside>

      <article className="flex flex-col flex-1 min-w-0 min-h-0 bg-slate-editor">
        <header className="h-10 px-6 flex items-center gap-3 border-b border-white/10 shrink-0">
          <span className="text-xs truncate">{paper.title}</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-slate-muted">
            Preprint · {live ? 'Program up' : 'Demo'}
          </span>
        </header>
        <div className="flex-1 overflow-y-auto px-8 py-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400">
            Atoma Labs · {paper.date}
          </p>
          <h2 className="mt-3 text-3xl leading-tight text-cream max-w-4xl">{paper.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-cream/90">{paper.lead}</p>
          <div className="mt-8 space-y-6 max-w-3xl">
            {paper.sections.map((item) => (
              <section
                key={item.id}
                id={item.id}
                className={`border-l-2 pl-4 ${
                  section?.id === item.id ? 'border-amber-500' : 'border-white/15'
                }`}
              >
                <h3 className="text-lg text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/80">{item.body}</p>
              </section>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-3 shrink-0">
          <div className="flex gap-2 overflow-x-auto">
            {paper.sections.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSectionId(item.id)}
                className={`h-8 min-w-0 shrink-0 px-2 rounded-md border text-left cursor-pointer ${
                  section?.id === item.id
                    ? 'bg-amber-500 border-amber-500 text-ink'
                    : 'bg-slate-panel border-white/10 text-cream hover:border-amber-500/50'
                }`}
              >
                <span className="text-[11px] leading-none">{index + 1}. {item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </article>

      <aside className="w-72 shrink-0 p-2 bg-slate-page flex flex-col min-h-0">
        <div className="flex flex-col h-full min-h-0 rounded-xl border border-white/10 bg-slate-panel">
          <div className="h-9 px-2.5 flex items-center gap-2 border-b border-white/10 shrink-0">
            <AtomaLogoMark className="w-4 h-4" glow={false} />
            <span className="text-xs text-cream">Research assistant</span>
            <span className="ml-auto font-mono text-[10px] text-slate-muted truncate max-w-[9rem]">
              {modelName}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-2">
            {section && (
              <p className="text-[11px] text-slate-muted">
                {section.title}. Preprint wording, not a new measurement.
              </p>
            )}
            {researchChatTurns.map((turn) => (
              <article key={turn.id}>
                <p className="text-[10px] text-slate-muted mb-0.5">
                  {turn.authorLabel}
                  {turn.modelUsed ? ` · ${turn.modelUsed}` : ''}
                </p>
                <p className="text-xs leading-snug text-cream/90">{turn.text}</p>
              </article>
            ))}
          </div>
          <div className="px-2.5 pb-2 flex flex-wrap gap-1">
            {asks.map((ask) => (
              <button
                key={ask.label}
                type="button"
                disabled={busy}
                onClick={() => void send(ask.text)}
                className="h-6 px-2 rounded-full border border-white/10 text-[10px] text-cream hover:border-amber-500 cursor-pointer disabled:cursor-not-allowed"
              >
                {ask.label}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              void send(prompt)
            }}
            className="m-2 mt-0 h-8 flex items-center gap-1 rounded-full border border-white/10 bg-slate-editor px-2"
          >
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Ask about this preprint…"
              className="flex-1 bg-transparent text-xs text-cream placeholder:text-slate-muted"
            />
            <button
              type="submit"
              disabled={busy || !prompt.trim()}
              className="h-6 w-6 rounded-full bg-amber-500 text-ink text-xs cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send"
            >
              ↑
            </button>
          </form>
        </div>
      </aside>
    </div>
  )
}
