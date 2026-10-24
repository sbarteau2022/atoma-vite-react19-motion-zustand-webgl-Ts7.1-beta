---
title: "Atoma public website — launch implementation and adversarial audit"
document_type: "implementation"
version: "1.0.0"
date: "2026-10-24T21:20:00Z"
implementation_date: "2026-10-24T21:14:00Z"
author: "sbarteau2022 / Codex"
reviewers: []
status: "review"
related_issues: []
related_files:
  - path: ".github/workflows/deploy.yml"
    lines: "1-50"
    role: "config"
  - path: ".gitignore"
    lines: "1-33"
    role: "supporting"
  - path: "DESIGN.md"
    lines: "1-201"
    role: "supporting"
  - path: "README.md"
    lines: "1-267"
    role: "supporting"
  - path: "docs/LAUNCH_AUDIT.md"
    lines: "1-316"
    role: "supporting"
  - path: "functions/api/[[path]].js"
    lines: "1-108"
    role: "supporting"
  - path: "index.html"
    lines: "1-21"
    role: "supporting"
  - path: "migrations/profiles/0001_initial.sql"
    lines: "1-5"
    role: "supporting"
  - path: "migrations/research/0001_initial.sql"
    lines: "1-4"
    role: "supporting"
  - path: "output/audit-animated-desktop.png"
    lines: "0"
    role: "supporting"
  - path: "output/audit-desktop.png"
    lines: "0"
    role: "supporting"
  - path: "output/audit-mobile.png"
    lines: "0"
    role: "supporting"
  - path: "output/branding/atoma-orthogonal-atom-v1.png"
    lines: "0"
    role: "supporting"
  - path: "package-lock.json"
    lines: "1-4350"
    role: "config"
  - path: "package.json"
    lines: "1-48"
    role: "config"
  - path: "playwright.config.ts"
    lines: "1-2"
    role: "supporting"
  - path: "public/_headers"
    lines: "1-8"
    role: "supporting"
  - path: "public/atoma-atom.png"
    lines: "0"
    role: "supporting"
  - path: "public/robots.txt"
    lines: "1-3"
    role: "supporting"
  - path: "public/sitemap.xml"
    lines: "1-1"
    role: "supporting"
  - path: "src/App.tsx"
    lines: "1-135"
    role: "supporting"
  - path: "src/components/AiWidget.tsx"
    lines: "1-12"
    role: "supporting"
  - path: "src/components/Header.tsx"
    lines: "1-170"
    role: "supporting"
  - path: "src/components/InteractiveApiSandbox.tsx"
    lines: "1-177"
    role: "supporting"
  - path: "src/components/InteractiveConsole.tsx"
    lines: "1-645"
    role: "supporting"
  - path: "src/components/InteractiveHero.tsx"
    lines: "1-97"
    role: "supporting"
  - path: "src/components/OrbitalScene.tsx"
    lines: "1-28"
    role: "supporting"
  - path: "src/index.css"
    lines: "1-987"
    role: "supporting"
  - path: "src/pages/Apps.tsx"
    lines: "1-105"
    role: "supporting"
  - path: "src/pages/Auth.tsx"
    lines: "1-11"
    role: "supporting"
  - path: "src/pages/BrandKit.tsx"
    lines: "1-33"
    role: "supporting"
  - path: "src/pages/Contact.tsx"
    lines: "1-81"
    role: "supporting"
  - path: "src/pages/Harness.tsx"
    lines: "1-119"
    role: "supporting"
  - path: "src/pages/Home.tsx"
    lines: "1-118"
    role: "supporting"
  - path: "src/pages/Plugins.tsx"
    lines: "1-72"
    role: "supporting"
  - path: "src/pages/ResearchHub.tsx"
    lines: "1-22"
    role: "supporting"
  - path: "src/pages/Tooling.tsx"
    lines: "1-74"
    role: "supporting"
  - path: "tests/api.test.mjs"
    lines: "1-19"
    role: "test"
  - path: "tests/browser/site.spec.ts"
    lines: "1-7"
    role: "test"
  - path: "wrangler.jsonc"
    lines: "1-22"
    role: "config"
related_documents: ["../README.md", "../DESIGN.md"]
tags: ["release", "cloudflare", "security", "branding"]
---
# Launch audit

## Executive summary

The public website now has a real Cloudflare backend, a custom animated atom
identity, and persistent profiles and research bookmarks. The release pipeline
checks code and browser behavior before deploying. Product demos remain labeled
as previews; no native runtime capability was qualified by this website work.

## Problem statement

GitHub commit ee446c1 existed remotely, but its deployment failed without a
Cloudflare API token. No Atoma Pages project existed. Account, contact, and
research features were local scaffolds; release copy included unsupported
performance and catalog-size claims. The website needed a coherent public
identity and functional first interactions before the October 26 build.

## Solution overview

Created a Pages project, separate profile and research D1 databases, migrations,
and same-origin Functions. Added Workers AI for the public guide and editorial
research companion, real email/password profiles, cookie sessions, bookmarks,
and persisted contact messages. Integrated the generated transparent logo and
built an original metallic three-ring R3F scene. Corrected unsupported copy and
added data disclosure, metadata, security headers, navigation repairs and a 404.

## Implementation details

### Languages and rationale

TypeScript/React shares the existing frontend design system. JavaScript Pages
Functions use Web Crypto and bound services without a separate server. SQL
provides parameterized relational storage. Three.js/R3F provides native scene
geometry rather than animating a flat bitmap. Next: licensed research ingestion,
account recovery/verification, and runtime event integration.

### Literature and sources

This implementation is not directly grounded in published literature. It applies
established web engineering patterns. The curated catalog links to Vaswani et al.,
Attention Is All You Need (2017), https://arxiv.org/abs/1706.03762 and DeepSeek-AI,
DeepSeek-R1 (2025), https://arxiv.org/abs/2501.12948. These records were checked
against original arXiv pages; stored prose is short editorial commentary.
Platform configuration follows https://developers.cloudflare.com/pages/functions/wrangler-configuration/
and https://developers.cloudflare.com/pages/functions/bindings/.

### Configuration

`wrangler.jsonc` binds AI, PROFILES and RESEARCH. Database IDs are public resource
identifiers, not credentials. Both GitHub encrypted Actions secrets are configured.
The account API token was verified against account token, Pages project and D1
endpoints; no token was written into tracked files. Undici is overridden to a
patched 7.30.1+ release to address development-tool dependency advisories.

## Testing evidence

- Ten API tests pass against real isolated SQLite databases: signup/login,
  cookie attributes, session revocation and expiry, owner isolation, SQL injection
  input, invalid/malformed/oversized bodies, Origin rejection, provider failure,
  per-IP rate limiting, global daily budget, and contact persistence.
- Six Chromium tests pass: 14 public/unknown routes without script exceptions,
  mobile width at 390px, keyboard AI operation and focus return, source links,
  no-results search, reduced-motion fallback, WebGL render and context loss.
- TypeScript checking, lint, production build, and git whitespace checks pass.
- npm audit reports zero vulnerabilities, including development dependencies.
- Live production smoke: health confirms both databases and AI binding; catalog
  returns both records; Workers AI returns a real response. Account creation,
  profile, bookmark write, logout, and revoked-session rejection passed. Temporary
  audit account/bookmark records were removed afterward.
- Five browser checks also passed against the first production deployment.
  All six browser checks then passed against the final GitHub-deployed production site (19.1 seconds). Browser AI responses are mocked; real AI was verified separately via its API.
- Desktop/mobile screenshots live under output/. The animated renderer is
  lazy-loaded (about 915 KB raw / 243 KB gzip); this remains a performance cost,
  not a claim of universal smoothness or low-end-device qualification.

Reproduce:

```sh
npm ci
npm run check
npm audit --audit-level=moderate
npx playwright install chromium
npm run test:e2e
TEST_URL=https://atoma-labs-site.pages.dev npm run test:e2e
```

These changes were necessary: the failed GitHub run and unconnected forms were
observed directly. Testing establishes the exercised behaviors, not exhaustive
security, device, accessibility or load qualification.

## Adversarial review

| Concern | Resolution / remaining boundary |
| --- | --- |
| Anonymous profile reads or another user's bookmarks | Server-side sessions and user-scoped queries; isolation tests |
| Forged/expired cookies | Random tokens, hash-only storage, expiry and revocation tests |
| CSRF / unbounded request bodies | Exact Origin matching, JSON requirement, streamed 16 KB cap |
| Injection / secret leakage | Bound SQL, React text rendering, generic infrastructure errors, no client provider keys |
| Public inference abuse | 20 requests/IP/hour, 200 total/day, 2,000-character prompts and 450 output tokens |
| Claims overstate the implementation | Removed fabricated release figures; added in-development boundaries to product pages |
| Research seems more grounded than it is | Real source URLs; notes explicitly editorial; no full-paper retrieval claim |
| Mobile or disabled WebGL breaks entry | Responsive checks and static fallback; context-loss browser test |
| Misleading contact confirmation | Success only after D1 write; UI states notification delivery is not enabled |
| Registration mistaken for verified identity | Explicitly disclosed lack of email verification and password recovery |
| CI changes production on pull requests | Verification only for PRs; deploy requires main/non-PR event and secrets |

Remaining risks: password recovery, email verification, deletion UI, broader
accessibility audit, sustained load testing and distributed bot protection are
not implemented. Contact messages require operator review in D1. Public AI
answers are fallible and cannot execute tools. Native model inference, agent
execution, security isolation and product telemetry remain outside this release.

## Deployment / rollout

Initial production deployment: https://f114d1af.atoma-labs-site.pages.dev
Canonical: https://atoma-labs-site.pages.dev
GitHub release succeeded for code commit `1943efe`: https://github.com/sbarteau2022/atoma-vite-react19-motion-zustand-webgl-Ts7.1-beta/actions/runs/40133698260 . Verification completed in 58 seconds; deployment and remote migration checks completed in 32 seconds. Canonical production health returned all bindings healthy afterward. Rollback by
promoting a previous Pages deployment or rebuilding a previous commit. Initial
migrations are additive; avoid destructive schema rollback. Monitor `/api/health`,
Pages release results, and Workers AI usage. No custom domain was requested.

## Next stage

Account verification/recovery, explicit retention controls, source ingestion
and licensing gates, broader device/accessibility coverage, and actual runtime
event integration. This implementation sets up the public website and backend;
it does not establish hackathon eligibility or native product readiness.

## What we learned

A remote GitHub commit does not prove a successful release. Cloudflare account
tokens verify at the account endpoint, not the user token endpoint. Visual
screenshots must wait for Motion's entrance animation, or a valid opaque IDE
looks translucent. The R3F scene needs a hero-level stacking context so the full
atom remains visible while the product UI stays opaque.

## File manifest

Generated below with exact file line counts. Binary assets use line 0.

| File | Lines |
| --- | --- |
| `.github/workflows/deploy.yml` | 1–50 |
| `.gitignore` | 1–33 |
| `DESIGN.md` | 1–201 |
| `README.md` | 1–267 |
| `docs/LAUNCH_AUDIT.md` | 1–316 |
| `functions/api/[[path]].js` | 1–108 |
| `index.html` | 1–21 |
| `migrations/profiles/0001_initial.sql` | 1–5 |
| `migrations/research/0001_initial.sql` | 1–4 |
| `output/audit-animated-desktop.png` | 0 (binary) |
| `output/audit-desktop.png` | 0 (binary) |
| `output/audit-mobile.png` | 0 (binary) |
| `output/branding/atoma-orthogonal-atom-v1.png` | 0 (binary) |
| `package-lock.json` | 1–4350 |
| `package.json` | 1–48 |
| `playwright.config.ts` | 1–2 |
| `public/_headers` | 1–8 |
| `public/atoma-atom.png` | 0 (binary) |
| `public/robots.txt` | 1–3 |
| `public/sitemap.xml` | 1–1 |
| `src/App.tsx` | 1–135 |
| `src/components/AiWidget.tsx` | 1–12 |
| `src/components/Header.tsx` | 1–170 |
| `src/components/InteractiveApiSandbox.tsx` | 1–177 |
| `src/components/InteractiveConsole.tsx` | 1–645 |
| `src/components/InteractiveHero.tsx` | 1–97 |
| `src/components/OrbitalScene.tsx` | 1–28 |
| `src/index.css` | 1–987 |
| `src/pages/Apps.tsx` | 1–105 |
| `src/pages/Auth.tsx` | 1–11 |
| `src/pages/BrandKit.tsx` | 1–33 |
| `src/pages/Contact.tsx` | 1–81 |
| `src/pages/Harness.tsx` | 1–119 |
| `src/pages/Home.tsx` | 1–118 |
| `src/pages/Plugins.tsx` | 1–72 |
| `src/pages/ResearchHub.tsx` | 1–22 |
| `src/pages/Tooling.tsx` | 1–74 |
| `tests/api.test.mjs` | 1–19 |
| `tests/browser/site.spec.ts` | 1–7 |
| `wrangler.jsonc` | 1–22 |
