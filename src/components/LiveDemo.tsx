import { useEffect, useState } from 'react'
import { ares } from '../api'
import { useGovernor } from '../governor'

const steps = [
  { id: 'job', label: 'Job', line: 'The request comes in' },
  { id: 'copy', label: 'Copy', line: 'A mind just for this run' },
  { id: 'check', label: 'Check', line: 'Does this step hold?' },
  { id: 'note', label: 'Note', line: 'Write why it passed' },
  { id: 'keep', label: 'Keep', line: 'Fold it into the real mind' },
] as const

const xs = [72, 196, 320, 444, 568]
const y = 86

export function LiveDemo() {
  const { link } = useGovernor()
  const live = link === 'live'
  const [cursor, setCursor] = useState(-1)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  useEffect(() => {
    if (cursor < 0) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const last = steps.length * 2 - 1
    if (cursor >= last) return
    const wait = reduce ? 0 : 720
    const timer = window.setTimeout(() => setCursor((n) => n + 1), wait)
    return () => window.clearTimeout(timer)
  }, [cursor])

  async function play() {
    setNote(null)
    setCursor(0)
    setBusy(true)
    if (!live) {
      setNote('Demo. The program is not running on this computer, so this is the shape of the loop, not a live job.')
      setBusy(false)
      return
    }
    try {
      const res = await ares.dryRun(1)
      const issued = Boolean(res && typeof res === 'object' && 'issued' in res && (res as { issued?: boolean }).issued)
      setNote(
        issued
          ? 'A practice run checked out on this computer.'
          : 'Practice run finished on this computer. No job was opened.',
      )
    } catch (err: unknown) {
      setNote(err instanceof Error ? err.message : 'The practice run did not finish.')
    } finally {
      setBusy(false)
    }
  }

  const running = cursor >= 0 && cursor < steps.length * 2 - 1
  const active = cursor < 0 ? -1 : cursor % steps.length

  return (
    <section className="video-panel loop-panel" aria-label="Agent loop">
      <div className="loop-head">
        <p className="kicker">{live ? 'On this computer' : link === 'loading' ? 'Checking…' : 'Demo loop'}</p>
        <p>
          {active < 0
            ? 'Five steps. The copy never touches the real mind.'
            : steps[active].line}
        </p>
      </div>

      <svg className="loop-dag" viewBox="0 0 640 210" role="img" aria-label="Job, copy, check, note, keep">
        <path
          d="M568 112 H196"
          transform="translate(0 58)"
          fill="none"
          stroke="rgba(240,231,218,0.28)"
          strokeWidth="1.25"
        />
        <polygon points="196,164 188,170 196,176" fill="rgba(240,231,218,0.45)" />
        <text x="360" y="158" textAnchor="middle" fill="#8a8172" fontSize="10" fontFamily="IBM Plex Mono, ui-monospace, monospace">
          next step
        </text>
        {xs.slice(0, -1).map((x, i) => (
          <line
            key={x}
            x1={x + 28}
            y1={y}
            x2={xs[i + 1] - 28}
            y2={y}
            stroke={active > i ? '#c67c14' : 'rgba(240,231,218,0.28)'}
            strokeWidth="1.5"
          />
        ))}
        {steps.map((step, i) => {
          const on = i === active
          const done = active > i
          return (
            <g key={step.id} transform={`translate(${xs[i]} ${y})`}>
              <circle
                r={on ? 26 : 22}
                fill={on ? '#c67c14' : '#262626'}
                stroke={on || done ? '#c67c14' : 'rgba(240,231,218,0.4)'}
                strokeWidth="1.5"
              />
              <text
                textAnchor="middle"
                dy="4"
                fill={on ? '#1c1c1c' : '#f0e7da'}
                fontSize="11"
                fontFamily="IBM Plex Mono, ui-monospace, monospace"
              >
                {String(i + 1).padStart(2, '0')}
              </text>
              <text
                y="42"
                textAnchor="middle"
                fill="#f0e7da"
                fontSize="13"
                fontFamily="Geist, ui-sans-serif, sans-serif"
              >
                {step.label}
              </text>
            </g>
          )
        })}
      </svg>

      <ol className="loop-track">
        {steps.map((step, i) => {
          const state = active < 0 ? 'waiting' : i === active ? 'now' : i < active ? 'passed' : 'waiting'
          return (
            <li key={step.id} data-state={state}>
              <span>{state === 'now' ? 'Now' : state === 'passed' ? 'Passed' : 'Waiting'}</span>
              {step.label}
            </li>
          )
        })}
      </ol>

      {note && (
        <p className="banner-demo" role="status">
          {note}
        </p>
      )}

      <button className="btn btn-cream" type="button" disabled={busy || running} onClick={() => void play()}>
        {running ? 'Running' : cursor < 0 ? 'Run the loop' : 'Run again'}
      </button>
    </section>
  )
}
