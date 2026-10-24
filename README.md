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

The home hero foregrounds an interactive Brigade IDE and orchestrator chat with
selectable workspace sections, graph/code/log/replay views, task nodes, and a
demo command input. A Zustand-backed five-phase BRG-142 walkthrough drives the
DAG node states, agent lanes, selected packet/code/evidence, event trail,
telemetry progress, and chat responses from one replay timeline. Use Play/Pause,
phase stepping, or Replay to inspect the same run from each view. The timeline,
chat, receipts, and telemetry are transient demo data; they do not dispatch work
or persist to a backend. R3F renders low-contrast orbital geometry behind the
IDE; GSAP ScrollTrigger moves the side previews back as the user scrolls. The
MetaBuild ribbon lists event ecosystem names without asserting formal sponsor
status.
The former infrastructure card grid is a single Agentic Harness Theory feature:
a conceptual control-plane flow, principles, and composable MCP/Skills/harness/
evidence layers.

The next deck makes the runtime build direction explicit: native Rust/C++
serving, OTP-style supervision, dynamic paging and prefill offload, and a
multi-model mind. Interactive inspector labels separate in-build foundations
from research and roadmap items.

The public door to Atoma: home/judging path, how-it-works (v1 Euclidean /
v2 hyperbolic, claims labeled), data disclosures, contact, login/signup
shells. Obsidian design per `../design-reference/DESIGN_REFERENCE.md`
(locked 2026-10-20). Stack: Vite, React 19, R3F, Motion, GSAP ScrollTrigger,
Zustand, and react-router. Hero and architecture interactions use demo state;
the orbital scene and route modules are code-split; the brigade runtime and
React Flow event stream remain backend integration work.

## Develop
    npm install
    npm run dev

## Build
    npm run build        # outputs dist/
    npx tsc --noEmit     # strict source type-check

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

## Current frontend preview and integration boundary

The home page now presents the Brigade IDE edge-to-edge, with subdued side
previews behind it. Its graph, code, logs, replay, and single orchestrator chat
share a local guided timeline. The following decks use desktop GSAP ScrollTrigger
pinning and scrubbed entrances; mobile and reduced-motion modes scroll normally.
The long-horizon DAG is selectable and includes a horizon control, resource
budget, event inspector, and replay scrubber. All run values are illustrative
until connected to runtime events.

The Research Hub homepage preview is a three-pane paper worktree, manuscript
reader, and demo research companion. Search, source selection, summary/code
switching, and sample prompts work locally. Its ticker names repositories, labs,
and universities as a discovery taxonomy; it does not assert that every named
organization publishes directly to an API. The sample catalog is not a live
index, and companion answers are not model-grounded. The full Research Hub needs
configured ingestion, API-key handling, source attribution, and model service.

`/brand-kit` contains four Atoma identity directions and tagline controls. The
homepage uses an obsidian/titanium palette; sponsor/source identifiers retain
restrained brand colors. The sponsor strip describes MetaBuild ecosystem names;
verify formal sponsor status before calling any organization an event sponsor.

`/login` and `/signup` include Apple, Google, GitHub, and Cloudflare Access UI.
Set `VITE_OAUTH_APPLE_URL`, `VITE_OAUTH_GOOGLE_URL`,
`VITE_OAUTH_GITHUB_URL`, and `VITE_OAUTH_CLOUDFLARE_ACCESS_URL` to actual
authorization entrypoints. Provider registration, secrets, callback validation,
session issuance, and account policy are server-side work and are not included.
Cloudflare Access IdP policy is configured in the Zero Trust dashboard. Never
place OAuth client secrets in `VITE_*` variables.

This checkout pins the experimental TypeScript compiler at `typescript@beta`
(currently 7.1.0-beta). This beta is published by Microsoft TypeScript, not
Cloudflare. Cloudflare documents TypeScript support for Workers; confirm the
beta against the selected Pages/Workers build configuration before deployment.

The Research Hub now centers the selected manuscript in a three-pane reader:
left-side source worktree and navigable conceptual topic map, central manuscript,
and a first-class research companion. Graph lines are demo topic relationships,
not verified citations. The standalone API code mock has been removed; API access
is shown as planned until a real endpoint and credentials are available.

The Apps overview run snapshot uses fixed, bounded columns for task IDs, titles,
and lane progress to prevent long task names from colliding with run metadata.
The home closing CTA now carries the Atoma Engineering Labs identity and the
line “Solo by choice. Built to go further.”
