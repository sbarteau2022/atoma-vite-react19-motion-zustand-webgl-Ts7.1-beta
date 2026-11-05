import type {
  ApiErrorBody,
  ComplianceStatus,
  GovernorStatus,
  HarnessStatus,
  ModelsResponse,
  RagResponse,
  RunRow,
} from './types'

async function readError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as ApiErrorBody
    return body.error ?? body.why_receipt?.evidenced_cause ?? `${res.status} ${res.statusText}`
  } catch {
    return `${res.status} ${res.statusText}`
  }
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path, {
    headers: { accept: 'application/json' },
  })
  if (!res.ok) throw new Error(await readError(res))
  return (await res.json()) as T
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(await readError(res))
  return (await res.json()) as T
}

export const ares = {
  status: () => getJson<GovernorStatus>('/api/status'),
  harness: () => getJson<HarnessStatus>('/api/harness/status'),
  models: () => getJson<ModelsResponse>('/api/models'),
  runs: () => getJson<RunRow[] | unknown>('/api/runs'),
  compliance: () => getJson<ComplianceStatus>('/api/compliance/status'),
  controls: () => getJson<{ controls: RuleLike[] }>('/api/compliance/controls'),
  rag: (query: string, limit = 8) =>
    postJson<RagResponse>('/api/rag/query', { query, limit }),
  dryRun: (role = 1) => postJson<unknown>('/api/harness/dry-run', { role }),
  geometry: (role = 1) =>
    postJson<unknown>('/api/harness/mission/geometry', { role, budget_j: 100 }),
}

export type RuleLike = {
  id?: string
  rule_id?: string
  title?: string
  satisfied?: boolean
  [key: string]: unknown
}

export function asRuns(payload: unknown): RunRow[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRunRow)
  }
  if (payload && typeof payload === 'object' && 'result' in payload) {
    const result = (payload as { result: unknown }).result
    if (Array.isArray(result)) return result.filter(isRunRow)
  }
  return []
}

function isRunRow(value: unknown): value is RunRow {
  if (!value || typeof value !== 'object') return false
  const row = value as Record<string, unknown>
  return typeof row.id === 'string' && typeof row.status === 'string'
}
