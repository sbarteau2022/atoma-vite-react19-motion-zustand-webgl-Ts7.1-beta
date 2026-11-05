import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ares, asRuns, type RuleLike } from '../api'
import { useGovernor } from '../governor'
import { readSeat } from '../seat'
import type {
  ComplianceStatus,
  HarnessStatus,
  ModelsResponse,
  RagHit,
  RunRow,
} from '../types'

type Tab = 'status' | 'seats' | 'compliance' | 'runs' | 'retrieval'

function shortHex(value: string, n = 12): string {
  return value.length <= n * 2 ? value : `${value.slice(0, n)}…${value.slice(-6)}`
}

export function Console() {
  const { link, status, error, refresh } = useGovernor()
  const live = link === 'live'
  const seat = readSeat()
  const [tab, setTab] = useState<Tab>('status')
  const [harness, setHarness] = useState<HarnessStatus | null>(null)
  const [models, setModels] = useState<ModelsResponse | null>(null)
  const [compliance, setCompliance] = useState<ComplianceStatus | null>(null)
  const [controls, setControls] = useState<RuleLike[]>([])
  const [runs, setRuns] = useState<RunRow[]>([])
  const [panelError, setPanelError] = useState<string | null>(null)
  const [query, setQuery] = useState('judged atom merkle audit')
  const [hits, setHits] = useState<RagHit[]>([])
  const [queryMode, setQueryMode] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [actionLog, setActionLog] = useState<string | null>(null)

  useEffect(() => {
    if (!live) {
      setHarness(null)
      setModels(null)
      setCompliance(null)
      setControls([])
      setRuns([])
      return
    }
    let cancelled = false
    Promise.all([
      ares.harness(),
      ares.models(),
      ares.compliance(),
      ares.controls(),
      ares.runs(),
    ])
      .then(([h, m, c, ctrl, r]) => {
        if (cancelled) return
        setHarness(h)
        setModels(m)
        setCompliance(c)
        setControls(ctrl.controls ?? [])
        setRuns(asRuns(r))
        setPanelError(null)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setPanelError(err instanceof Error ? err.message : 'panel fetch failed')
      })
    return () => {
      cancelled = true
    }
  }, [live])

  const verdicts = useMemo(() => {
    const fromReport = compliance?.report?.rule_verdicts ?? []
    return fromReport.length ? fromReport : controls
  }, [compliance, controls])

  async function runRag() {
    if (!live) return
    setBusy('rag')
    setActionLog(null)
    try {
      const res = await ares.rag(query.trim(), 6)
      setHits(res.hits)
      setQueryMode(res.query_mode)
    } catch (err: unknown) {
      setHits([])
      setQueryMode(null)
      setActionLog(err instanceof Error ? err.message : 'rag failed')
    } finally {
      setBusy(null)
    }
  }

  async function runDry() {
    if (!live) return
    setBusy('dry')
    try {
      const res = await ares.dryRun(1)
      setActionLog(JSON.stringify(res, null, 2))
    } catch (err: unknown) {
      setActionLog(err instanceof Error ? err.message : 'dry-run failed')
    } finally {
      setBusy(null)
    }
  }

  async function runGeometry() {
    if (!live) return
    setBusy('geo')
    try {
      const res = await ares.geometry(1)
      setActionLog(JSON.stringify(res, null, 2))
    } catch (err: unknown) {
      setActionLog(err instanceof Error ? err.message : 'geometry mission failed')
    } finally {
      setBusy(null)
    }
  }

  return (
    <main className="page console">
      <header className="page-hero">
        <p className="kicker">Ares Spec Ops · research lab</p>
        <h1>Governor console.</h1>
        <p className="lede">
          {seat
            ? `Lab seat ${seat.first} ${seat.last} · ${seat.hardware}. `
            : ''}
          Live surface on 127.0.0.1:4810. If the governor is down, this page
          stays labelled demo and does not invent greens.
          {!seat && (
            <>
              {' '}
              <Link to="/waitlist">Join the waitlist</Link> to save a local
              seat.
            </>
          )}
        </p>
        <div className="hero-actions">
          <button className="btn btn-ghost" type="button" onClick={refresh}>
            Refresh status
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            disabled={!live || busy !== null}
            onClick={runDry}
          >
            {busy === 'dry' ? 'Dry-run…' : 'Harness dry-run'}
          </button>
          <button
            className="btn btn-primary"
            type="button"
            disabled={!live || busy !== null}
            onClick={runGeometry}
          >
            {busy === 'geo' ? 'Dispatching…' : 'Geometry mission'}
          </button>
        </div>
        {link === 'loading' && (
          <p className="banner-demo" role="status">
            Checking 127.0.0.1:4810…
          </p>
        )}
        {link === 'down' && (
          <p className="banner-demo" role="status">
            DEMO VIEW — governor unreachable
            {error ? ` (${error})` : ''}. oMLX remains a dead path even when
            this page is live.
          </p>
        )}
        {panelError && live && (
          <p className="banner-demo" role="status">
            Panel error: {panelError}
          </p>
        )}
      </header>

      <div className="tab-row" role="tablist" aria-label="Console panels">
        {(
          [
            ['status', 'Status'],
            ['seats', 'Seats'],
            ['compliance', 'Compliance'],
            ['runs', 'Runs'],
            ['retrieval', 'Retrieval'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={tab === id ? 'is-active' : undefined}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'status' && (
        <section className="bezel">
          <header>
            <p className="kicker">Dependencies</p>
            <h2>Real up / down. No fake ok.</h2>
          </header>
          <ul className="dep-grid">
            <li className={status?.backend.up ? 'up' : 'down'}>
              <span>ares-backend</span>
              <strong>{status?.backend.up ? 'up' : 'down'}</strong>
              <em>port {status?.backend.port ?? 4810}</em>
            </li>
            {(status?.dependencies ?? []).map((dep) => (
              <li key={dep.name} className={dep.up ? 'up' : 'down'}>
                <span>{dep.name}</span>
                <strong>{dep.up ? 'up' : 'down'}</strong>
                <em>{dep.detail}</em>
              </li>
            ))}
            {!status && (
              <li className="down">
                <span>governor</span>
                <strong>down</strong>
                <em>no payload — demo</em>
              </li>
            )}
          </ul>
          <dl className="kv">
            <div>
              <dt>Governance</dt>
              <dd>{status?.governance.ok ? 'ok' : 'not ok'}</dd>
            </div>
            <div>
              <dt>Chain</dt>
              <dd>{status?.governance.chain_verified ? 'verified' : 'unverified'}</dd>
            </div>
            <div>
              <dt>Merkle head</dt>
              <dd>{status ? shortHex(status.governance.merkle_head) : '—'}</dd>
            </div>
            <div>
              <dt>Missing evidence</dt>
              <dd>{status?.governance.controls_with_missing_evidence ?? '—'}</dd>
            </div>
            <div>
              <dt>Runtime</dt>
              <dd>{harness?.runtime ?? '—'}</dd>
            </div>
            <div>
              <dt>Policy kernel</dt>
              <dd>{harness?.policy_kernel ?? '—'}</dd>
            </div>
          </dl>
        </section>
      )}

      {tab === 'seats' && (
        <section className="bezel">
          <header>
            <p className="kicker">Model seats</p>
            <h2>Native is default. oMLX is dead.</h2>
          </header>
          <ul className="seat-list">
            {(models?.seats ?? []).map((seat) => (
              <li key={seat.id} className={seat.up ? 'up' : 'down'}>
                <p className="card-no">
                  {seat.id}
                  {seat.is_default ? ' · default' : ''}
                </p>
                <h3>
                  {seat.kind} · {seat.up ? 'up' : 'down'}
                </h3>
                <p>{seat.endpoint}</p>
                {seat.model_identity && <p>identity {shortHex(seat.model_identity, 10)}</p>}
                {seat.id === 'local-omlx' && (
                  <p className="warn">Dead path. Not a live inference seat.</p>
                )}
              </li>
            ))}
            {!models && <li className="down">No seats loaded — demo.</li>}
          </ul>
        </section>
      )}

      {tab === 'compliance' && (
        <section className="bezel">
          <header>
            <p className="kicker">Statutory registry</p>
            <h2>
              {compliance
                ? `${compliance.audit_entries} audit entries · head ${shortHex(compliance.head_digest)}`
                : 'No chain while the governor is down.'}
            </h2>
          </header>
          <ul className="control-list">
            {verdicts.map((rule, index) => {
              const id = String(rule.id ?? rule.rule_id ?? `rule-${index}`)
              const ok = Boolean(rule.satisfied)
              return (
                <li key={id} className={ok ? 'up' : 'down'}>
                  <strong>{id}</strong>
                  <span>{ok ? 'satisfied' : 'unsatisfied'}</span>
                  {typeof rule.title === 'string' && <em>{rule.title}</em>}
                </li>
              )
            })}
            {!verdicts.length && <li className="down">No verdicts — demo.</li>}
          </ul>
        </section>
      )}

      {tab === 'runs' && (
        <section className="bezel">
          <header>
            <p className="kicker">Recent runs</p>
            <h2>Surreal `run` rows, newest first.</h2>
          </header>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Thread</th>
                  <th>Seat</th>
                  <th>When</th>
                  <th>Id</th>
                </tr>
              </thead>
              <tbody>
                {runs.length === 0 && (
                  <tr>
                    <td colSpan={5}>{live ? 'No runs returned.' : 'Demo — governor down.'}</td>
                  </tr>
                )}
                {runs.slice(0, 20).map((run) => (
                  <tr key={run.id}>
                    <td className={run.status === 'passed' ? 'up' : 'down'}>{run.status}</td>
                    <td>{run.thread}</td>
                    <td>{shortHex(run.model_seat, 8)}</td>
                    <td>{run.created_at?.replace('T', ' ').replace('Z', '')}</td>
                    <td>{run.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === 'retrieval' && (
        <section className="bezel">
          <header>
            <p className="kicker">Research library</p>
            <h2>BM25 text query. Not a Qwen encoder pass.</h2>
          </header>
          <form
            className="retrieve"
            onSubmit={(event) => {
              event.preventDefault()
              void runRag()
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Research query"
              maxLength={1024}
              disabled={!live}
            />
            <button className="btn btn-primary" type="submit" disabled={!live || busy === 'rag'}>
              {busy === 'rag' ? 'Querying…' : 'Query'}
            </button>
          </form>
          {queryMode && <p className="numbers-qual">Mode: {queryMode}</p>}
          <ul className="hit-list">
            {hits.map((hit) => (
              <li key={hit.id}>
                <p className="card-no">
                  {hit.score.toFixed(3)} · {hit.silo ?? 'unsiloed'}
                </p>
                <p>{hit.text.slice(0, 420)}</p>
                {hit.source_path && <p className="numbers-qual">{hit.source_path}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {actionLog && (
        <pre className="receipt" tabIndex={0}>
          {actionLog}
        </pre>
      )}
    </main>
  )
}
