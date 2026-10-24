# Atoma Engineering — marketing site & funnel

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
