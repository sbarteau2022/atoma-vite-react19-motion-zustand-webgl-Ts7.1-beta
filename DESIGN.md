# Atoma Labs Design System

## Design Tokens

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | `#090b0e` | Obsidian page background |
| `color-on-primary` | `#e9eded` | Primary text |
| `color-secondary` | `#11161a` | Dark glass panels |
| `color-on-secondary` | `#c4cccf` | Text on panels |
| `color-accent` | `#9aafc2` | Titanium blue focus and action accent |
| `color-on-accent` | `#0b1014` | Text on accent controls |
| `color-muted` | `#a1a8aa` | Supporting text |
| `color-on-muted` | `#050607` | Text against muted fills |
| `color-inverse` | `#e9eded` | High contrast action surface |
| `color-inverse-on` | `#0a0c0d` | Text on inverse surface |
| `color-verified` | `#9aa9a2` | Muted verified run states |
| `color-roadmap` | `#b8b1a5` | Roadmap and research direction |

The primary palette is neutral obsidian glass with titanium borders and a matte
blue accent. Green, amber, and partner colors are limited to status and source
identity marks. Sponsor and research-source glyphs in this scaffold are custom
text marks, not official logo artwork or proof of sponsorship.

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `font-display` | "SF Pro Display", "Helvetica Neue", Arial, sans-serif | Headlines, large text |
| `font-body` | "SF Pro Text", "Helvetica Neue", Arial, sans-serif | Body copy, paragraphs |
| `font-size-base` | `1rem` | Base font size (16px) |
| `font-size-sm` | `0.875rem` | Small text |
| `font-size-lg` | `1.125rem` | Large text |
| `font-weight-light` | `300` | Light weight |
| `font-weight-regular` | `400` | Regular weight |
| `font-weight-medium` | `500` | Medium weight |
| `font-weight-bold` | `700` | Bold weight |

### Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | `0.25rem` | Tight spacing |
| `space-2` | `0.5rem` | Default spacing |
| `space-3` | `0.75rem` | Section spacing |
| `space-4` | `1rem` | Large spacing |
| `space-5` | `1.5rem` | Section divider |
| `grid-gap` | `1.5rem` | Grid gap between items |
| `max-width-container` | `1200px` | Max width for container |

### Elevation / Surface

| Token | Value | Usage |
|-------|-------|-------|
| `elevation-base` | `0` | Base surface |
| `elevation-raised` | `0 2 4 rgba(0,0,0,0.1)` | Raised surfaces |
| `elevation-overlay` | `0 4 12 rgba(0,0,0,0.2)` | Overlay / modal surfaces |

### Component Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | `4px` | Small radius |
| `radius-md` | `8px` | Medium radius |
| `radius-lg` | `12px` | Large radius |
| `radius-full` | `9999px` | Fully rounded |

## Design Principles

1. **Local-first by default** — Everything runs on the user's machine first
2. **Deterministic over fluent** — Judges, plans, and receipts are auditible, not assumed
3. **Transparency everywhere** — Claims carry labels; nothing is quietly retried
4. **Geometry as organization** — The version line is the geometry line (v1 standard, v2 roadmap)
5. **Built in the open** — Weekly cadence, public changelog, community access

## Page-Level Design Guidelines

### Home Page
- MetaBuild event ribbon, event ecosystem wordmarks, and solo-developer sprint label
- First-principles headline followed by a foreground IDE, DAG, telemetry, and a
  single Meta Orchestrator chat; secondary app/research previews recede behind it
- IDE preview interactions: workspace sections, Graph/Code/Logs/Replay tabs,
  selectable DAG nodes, and a local demo-only chat composer
- GSAP ScrollTrigger shifts decorative side previews during scroll; respect
  reduced-motion preferences. R3F geometry stays behind the product UI.
- At desktop widths, ScrollTrigger pins the Brigade, harness, architecture, and
  research decks in sequence and scrubs their entrance as the user scrolls.
  Mobile and reduced-motion modes use ordinary scrolling.
- The Research Hub preview uses a three-pane paper worktree, manuscript reader,
  and demo companion. Its source ticker is a discovery taxonomy, not a claim
  that every lab or university exposes a direct preprint API.
- Single Agentic Harness Theory deck followed by a labeled runtime architecture
  map and Research Hub story; avoid generic four-card feature grids
- Principle cards in grid2 layout
- Version line comparison table with pill status indicators
- Primary and secondary CTA buttons

### Mission Page
- Page-head with micro, headline, lede structure
- Prose sections with h2 headings
- Principle list as two-column grid with P—01 through P—06 numbering
- Version line table with v1/v2 comparison and roadmap pills
- Team/credits section with link to changelog

### Contact Page
- Page-head with micro, headline, lede
- Grid2 form layout with input fields
- GitHub panel and "What to expect" panel
- Form state management (sent/received)

### Harness Page
- Page-head with micro, headline, lede
- Two-column grid for "two lanes" explanation
- Flow steps as panel step-cards with snum numbering
- Failure doctrine as ordered list
- Receipts/ledger/telemetry taps in grid3

### Plugins Page
- Page-head with micro, headline, lede
- Server table with typed/sandboxed/observable rules
- Design rules as panel feat components
- Codeblock wiring examples

## Asset References

- Logo: `public/atoma-mark.svg`
- Favicon: `public/favicon.svg`
- Hero image: `src/assets/hero.png`
- Icons: `src/icons.svg`

## Navigation Structure

```
/ — Home (MetaBuild / Mission / About / Products / Research Hub / Blog)
/mission — Mission
/apps — Apps
/harness — Harness · MadMind
/tooling — Tools & Skills
/plugins — Plug-ins · MCP Servers
/research-hub — Research Hub
/contact — Contact
/login — Login
/signup — Sign Up
/how-it-works — Navigate to /harness
/data — Navigate to /research-hub
```

## Version Line

- **v1** — Standard, exact world: standard models, plan tree, deterministic controller
- **v2** — Multi-model mind with hyperbolic geometry: nested maps, custom brigades, roadmap

## Identity and account entry

- `/brand-kit` presents four original Atoma mark concepts and editable tagline
  options. The default public mark is `public/atoma-mark.svg`.
- `/login` and `/signup` provide Apple, Google, GitHub, and Cloudflare Access
  entry points. Configure `VITE_OAUTH_APPLE_URL`, `VITE_OAUTH_GOOGLE_URL`,
  `VITE_OAUTH_GITHUB_URL`, and `VITE_OAUTH_CLOUDFLARE_ACCESS_URL` with real
  authorization endpoints and implement server-side callbacks before enabling
  account access. Buttons without an endpoint explain that setup is pending.
- TypeScript 7.1.0-beta is an experimental Microsoft TypeScript compiler used
  by this project; Cloudflare did not release it. Cloudflare Workers/Pages
  supports TypeScript, but production compatibility remains gated on its build
  and deployment pipeline.

## Status Indicators

- `pill pill-roadmap` — Roadmap / in development
- `pill pill-verified` — Verified / live
- `pill pill-1` through `pill pill-6` — Principle numbering

### Research Hub and closing brand moment
- Research console uses a three-pane hierarchy: source worktree and conceptual
  topic graph on the left, manuscript reader in the center, AI companion on the
  right. Topic edges are labeled as exploratory, never as citation proof.
- Remove the standalone API code mock from the reader flow. Keep API access
  status explicit until a live endpoint and key service exist.
- The closing CTA carries the Atoma Engineering Labs mark and a concise solo
  developer line; do not use empty gradient slabs as content placeholders.
- Brigade run rows use separately bounded status, ID, title, and progress
  columns. Long titles may truncate but must not overlap metadata.

## Launch backend and orbital identity — October 24, 2026

The public identity is `public/atoma-atom.png`. The hero uses three circular
rings in mutually orthogonal planes as one slowly rotating R3F sculpture, a
physical nucleus, cool edge lighting and a warm rim. Pointer tilt is bounded.
Rendering pauses outside the viewport and hidden tabs; reduced motion and
WebGL failure use a static logo. DPR is capped at 1.5. Keep the IDE opaque and
foreground text readable. This is brand animation, not runtime telemetry.

Pages Functions own `/api/*`, Workers AI owns inference, and two separate D1
databases own profiles/session hashes/contact submissions and research/bookmarks.
All writes require same-origin JSON, parameterized SQL, bounded bodies, and
request limits. AI has per-IP hourly and global daily budgets. Account sessions
use Secure HttpOnly SameSite cookies. Editorial research notes are identified
as notes, with original source links. Auth does not imply email verification.
GitHub CI gates deployment on types, lint, API tests, browser tests and build.
