export type DepStatus = {
  name: string
  up: boolean
  detail: string
}

export type GovernorStatus = {
  backend: { name: string; port: number; up: boolean }
  governance: {
    chain_verified: boolean
    merkle_head: string
    controls_with_missing_evidence: number
    ok: boolean
  }
  dependencies: DepStatus[]
}

export type HarnessStatus = {
  runtime: string
  run_concurrency_limit: number
  capability_nodes: number
  policy_kernel: string
  telemetry: Record<string, unknown>
  memory: Record<string, unknown>
}

export type ModelSeat = {
  id: string
  kind: string
  endpoint: string
  up: boolean
  is_default: boolean
  model_identity?: string
  profile?: string
  models?: unknown
}

export type ModelsResponse = {
  last_seat_served: string | null
  seats: ModelSeat[]
}

export type RunRow = {
  id: string
  created_at: string
  model_seat: string
  status: string
  thread: string
}

export type RuleVerdict = {
  id?: string
  rule_id?: string
  title?: string
  satisfied?: boolean
  evidence?: string
  [key: string]: unknown
}

export type ComplianceStatus = {
  chain_verified: boolean
  head_digest: string
  audit_entries: number
  report?: {
    rule_verdicts?: RuleVerdict[]
  }
}

export type RagHit = {
  id: string
  score: number
  text: string
  source_path?: string
  document_id?: string
  silo?: string
}

export type RagResponse = {
  collection: string
  query_mode: string
  query?: string | null
  hits: RagHit[]
}

export type WhyReceipt = {
  evidenced_cause?: string
  [key: string]: unknown
}

export type ApiErrorBody = {
  error?: string
  why_receipt?: WhyReceipt
}

export type GovernorLink = 'live' | 'down' | 'loading'
