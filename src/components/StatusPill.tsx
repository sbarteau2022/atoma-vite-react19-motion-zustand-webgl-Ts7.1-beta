import { useGovernor } from '../governor'

export function StatusPill() {
  const { link, status, error } = useGovernor()
  const live = link === 'live'
  const loading = link === 'loading'
  const label = loading
    ? 'Checking governor'
    : live
      ? status?.governance.ok
        ? 'Governor live'
        : 'Governor up · governance incomplete'
      : 'Governor down · demo chrome'

  return (
    <span
      className={`status-pill ${live ? 'is-live' : loading ? 'is-loading' : 'is-down'}`}
      title={live ? `127.0.0.1:${status?.backend.port ?? 4810}` : (error ?? 'unreachable')}
    >
      <span className="status-dot" aria-hidden />
      {label}
    </span>
  )
}
