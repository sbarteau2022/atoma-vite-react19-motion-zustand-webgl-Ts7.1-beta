# Atoma Labs Design System

## Design Tokens

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | `#1a1a2e` | Primary background / deep navy |
| `color-on-primary` | `#f5f5f7` | Text on primary |
| `color-secondary` | `#2d2d44` | Section backgrounds |
| `color-on-secondary` | `#1a1a2e` | Text on secondary |
| `color-accent` | `#4a90e2` | Accent / interactive elements |
| `color-on-accent` | `#ffffff` | Text on accent |
| `color-muted` | `#6b6b80` | Muted text / secondary text |
| `color-on-muted` | `#1a1a2e` | Text on muted |
| `color-inverse` | `#f5f5f7` | Inverse text / light backgrounds |
| `color-inverse-on` | `#1a1a2e` | Inverse text color |

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
- Hero with micro-label, headline, lede, and primary CTA
- Grid-based feature sections with consistent spacing
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
/ — Home
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

## Status Indicators

- `pill pill-roadmap` — Roadmap / in development
- `pill pill-verified` — Verified / live
- `pill pill-1` through `pill pill-6` — Principle numbering
