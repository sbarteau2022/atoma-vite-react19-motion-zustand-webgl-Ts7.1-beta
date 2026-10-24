# Atoma Engineering — marketing site & funnel

## Brand UI kit and Brigade workspace

The visual foundation lives in `src/index.css` as shared Atoma tokens and
composable surface, status, and typography patterns. The `/brigade` route is a
high-fidelity workspace scaffold for the live run experience: task navigation,
dependency graph, code and receipt inspection, orchestrator chat, and local
telemetry. It uses the existing Zustand run store and is currently a front-end
demo; connect the run store to Worker/local-runtime SSE or WebSocket events to
replace demo telemetry and activity with live data. The dependency graph is a
presentation scaffold today and should be bound to backend DAG edges before it
is treated as authoritative run evidence.

Open `/brigade` in the dev server to review the workspace. The command palette
opens with `⌘K` / `Ctrl+K`; graph nodes are selectable and run selection changes
from the sidebar.

The marketing hero is framed for the Meta Global Hackathon 2026 10 Build Sprint,
Solo Developer Track. The marketing header follows MetaBuild, Mission, About, Products, Research Hub,
and Blog, with Sign Up and Log in actions. Its hero introduces Brigade run
tracking, relational research mapping, and the design workspace. The sponsor
marquee names Cerebral Valley, Baseten, Modal, Fireworks, Together AI, Hugging
Face, and Cloudflare as community/event ecosystem participants; verify official
MetaBuild sponsor status before presenting these names as formal sponsors.

Deck 03 presents the intended systems architecture: native Rust/C++ serving,
kernel fusion, resilient scheduling, dynamic memory and prefill paths, model
plugins, nested hyperbolic KV, and active-inference agent loops. Build-direction
labels distinguish the architecture story from verified shipped capability;
hyperbolic KV is explicitly marked roadmap.

The Research Hub page has an interactive source catalog, manuscript reader,
plain-language summaries, companion chat preview, and an API request example.
The catalog and assistant responses are demo content; API keys, ingestion,
source connectors, manuscript parsing, and grounded model responses require
backend/provider integration before launch. Preprints are labeled as such.

The `/brigade` workspace is an IDE-oriented frontend scaffold with a workspace
tree, selectable agent code streams, orchestration DAG, right-side meta
orchestrator chat, and replay/memory target panels. AtomicDB-PAMI, multimodal
retrieval, live agent execution, replay persistence, and least-privilege tool
enforcement are architecture targets; the frontend labels them as preview or
planned until connected to the runtime and security services.

The home hero carries Meta Global Hackathon 2026 / 10 Build Sprint / Solo
Developer Track branding and offers Brigade demo plus v1 request actions with
macOS, Linux, and Windows marks. The infrastructure card grid is now a single
Agentic Harness Theory feature: a conceptual control-plane flow, principles,
and composable MCP/Skills/harness/evidence layers.

The public door to Atoma: home/judging path, how-it-works (v1 Euclidean /
v2 hyperbolic, claims labeled), data disclosures, contact, login/signup
shells. Obsidian design per `../design-reference/DESIGN_REFERENCE.md`
(locked 2026-10-20). Stack: Vite + React 19 + react-router (R3F / React
Flow DAG layers join during the event build).

## Develop
    npm install
    npm run dev

## Build
    npm run build        # outputs dist/

## Deploy (Cloudflare Pages, free tier to start)
1. Install wrangler: `npm i -g wrangler` and `wrangler login`
   (needs Stewart's Cloudflare account).
2. `npx wrangler pages deploy dist --project-name atoma-engineering`
   — or connect the repo in the CF dashboard for push-to-deploy.
3. `public/_redirects` already carries the SPA fallback rule.

## Honesty rules for copy on this site (Stewart, 2026-10-22)
- Every claim is labeled: shipped / in build / roadmap — in the UI, not a footnote.
- Performance numbers publish with their waste figures or not at all.
- v2 (hyperbolic) is always presented as roadmap until it ships.
- Data practices page is versioned; material changes ship with a dated note.
