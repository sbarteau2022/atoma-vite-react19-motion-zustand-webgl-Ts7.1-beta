/**
 * Same-origin chat for the study IDE and the research reader.
 * The Baseten key lives only on this worker. The model slug is fixed.
 */

const MODEL = 'meta-models/muse-spark-open-1026'
const UPSTREAM = 'https://inference.baseten.co/v1/chat/completions'

interface Env {
  ASSETS: { fetch(input: Request): Promise<Response> }
  BASETEN_API_KEY?: string
}

type Incoming = { role?: unknown; content?: unknown }

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/edge/chat') return chat(request, env)
    return env.ASSETS.fetch(request)
  },
}

async function chat(request: Request, env: Env): Promise<Response> {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 })
  if (request.method !== 'POST') {
    return Response.json({ error: 'POST only.' }, { status: 405 })
  }
  if (!allowedOrigin(request)) {
    return Response.json({ error: 'This chat only answers this site.' }, { status: 403 })
  }
  if (!env.BASETEN_API_KEY) {
    return Response.json({ error: 'Baseten key is not on this worker.' }, { status: 503 })
  }

  let body: { messages?: Incoming[] }
  try {
    body = (await request.json()) as { messages?: Incoming[] }
  } catch {
    return Response.json({ error: 'The message was not JSON.' }, { status: 400 })
  }

  const messages = sanitize(body.messages)
  if (!messages) {
    return Response.json({ error: 'Send a short list of messages.' }, { status: 400 })
  }

  let upstream: Response
  try {
    upstream = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.BASETEN_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 1200,
      }),
      signal: AbortSignal.timeout(55_000),
    })
  } catch {
    return Response.json({ error: 'Baseten did not answer.' }, { status: 502 })
  }

  let payload: unknown
  try {
    payload = await upstream.json()
  } catch {
    return Response.json({ error: `Baseten returned ${upstream.status} with no JSON.` }, { status: 502 })
  }

  if (!upstream.ok) {
    const message = readError(payload) || `Baseten returned ${upstream.status}.`
    return Response.json({ error: message }, { status: upstream.status })
  }

  const text = readContent(payload)
  if (!text) {
    return Response.json({ error: 'Baseten returned no text.' }, { status: 502 })
  }
  return Response.json({ text, model: MODEL })
}

function allowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return true
  if (origin === new URL(request.url).origin) return true
  return origin === 'http://127.0.0.1:5173' || origin === 'http://localhost:5173'
}

function sanitize(input: Incoming[] | undefined): { role: string; content: string }[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 12) return null
  const messages: { role: string; content: string }[] = []
  for (const item of input) {
    const role = item?.role
    const content = typeof item?.content === 'string' ? item.content.trim() : ''
    if (role !== 'system' && role !== 'user' && role !== 'assistant') return null
    if (!content || content.length > 8000) return null
    messages.push({ role, content })
  }
  const last = messages[messages.length - 1]
  if (!last || last.role !== 'user') return null
  return messages
}

function readContent(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return ''
  const choices = (payload as { choices?: unknown }).choices
  if (!Array.isArray(choices) || !choices[0] || typeof choices[0] !== 'object') return ''
  const message = (choices[0] as { message?: { content?: unknown; refusal?: unknown } }).message
  if (!message) return ''
  if (typeof message.refusal === 'string' && message.refusal.trim()) return message.refusal.trim()
  return textOf(message.content).trim()
}

function textOf(content: unknown): string {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content
    .map((part) => {
      if (typeof part === 'string') return part
      if (part && typeof part === 'object' && 'text' in part && typeof part.text === 'string') return part.text
      return ''
    })
    .join('')
}

function readError(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return ''
  const error = (payload as { error?: { message?: unknown } | string }).error
  if (typeof error === 'string') return error.slice(0, 300)
  if (error && typeof error.message === 'string') return error.message.slice(0, 300)
  return ''
}
