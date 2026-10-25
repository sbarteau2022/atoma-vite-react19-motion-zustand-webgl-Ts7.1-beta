---
title: "Atoma website — Cloudflare launch"
document_type: "implementation"
version: "1.1.0"
date: "2026-10-24T21:20:00Z"
implementation_date: "2026-10-24T21:14:00Z"
author: "sbarteau2022 / Codex"
reviewers: []
status: "review"
related_files:
  - path: "tests/accountMail.test.mjs"
    lines: "1-9"
    role: "supporting"
  - path: "src/utils/accountActions.ts"
    lines: "1-13"
    role: "supporting"
  - path: "src/pages/AccountEmail.tsx"
    lines: "1-17"
    role: "supporting"
  - path: "server/accountMail.js"
    lines: "1-34"
    role: "supporting"
  - path: "migrations/profiles/0002_account_email.sql"
    lines: "1-11"
    role: "supporting"
  - path: "docs/ACCOUNT_EMAIL.md"
    lines: "1-213"
    role: "supporting"
  - path: ".github/workflows/deploy.yml"
    lines: "1-50"
    role: "config"
  - path: ".gitignore"
    lines: "1-33"
    role: "supporting"
  - path: "DESIGN.md"
    lines: "1-226"
    role: "supporting"
  - path: "README.md"
    lines: "1-311"
    role: "supporting"
  - path: "docs/LAUNCH_AUDIT.md"
    lines: "1-316"
    role: "supporting"
  - path: "functions/api/[[path]].js"
    lines: "1-172"
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
    lines: "1-4360"
    role: "config"
  - path: "package.json"
    lines: "1-49"
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
    lines: "1-139"
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
    lines: "1-13"
    role: "supporting"
  - path: "src/pages/BrandKit.tsx"
    lines: "1-33"
    role: "supporting"
  - path: "src/pages/Contact.tsx"
    lines: "1-83"
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
    lines: "1-34"
    role: "test"
  - path: "tests/browser/site.spec.ts"
    lines: "1-11"
    role: "test"
  - path: "wrangler.jsonc"
    lines: "1-31"
    role: "config"
related_documents: ["DESIGN.md", "docs/LAUNCH_AUDIT.md"]
related_issues: []
tags: ["website", "cloudflare", "launch"]
---
# Atoma Engineering Labs

The public front door for Atoma: an interactive Brigade preview, engineering
principles, source-linked research, and an AI guide. React 19, Vite, TypeScript,
Motion, GSAP, Zustand, Three.js and React Three Fiber drive the interface.
Cloudflare Pages Functions, Workers AI, and two D1 databases provide the backend.

Production: https://atoma-labs-site.pages.dev

## Executive summary

The site now integrates the metallic atom identity and an original orthogonal
ring animation behind the hero. Visitors can create profiles, save research,
send contact messages, and ask the Cloudflare-hosted AI guide questions.
Brigade execution and native runtime integration remain in development.

## Problem and solution

The previous GitHub deployment failed without Cloudflare credentials. Account,
contact, and research features were frontend scaffolds; some copy claimed
unsupported releases and benchmark results. The launch implementation adds
bounded APIs, real databases, explicit status labels, and release checks.
See DESIGN.md for visual and backend constraints; docs/LAUNCH_AUDIT.md records
files, tests, adversarial review, limitations, and next work.

## Develop and verify

Use Node 24+ and npm. TypeScript 7.1 beta remains experimental.

```sh
npm ci
npm run dev
npm run check
npm audit --audit-level=moderate
npx playwright install chromium
npm run test:e2e
```

Vite alone serves the frontend. To exercise Pages Functions with local D1:

```sh
npx wrangler d1 migrations apply PROFILES --local
npx wrangler d1 migrations apply RESEARCH --local
npm run build
npx wrangler pages dev dist
```

Workers AI calls require Cloudflare authentication and remote inference;
unit tests stub inference and run real SQL against isolated in-memory SQLite.
Browser tests mock AI to remain deterministic. Production AI was separately
smoke-tested. No provider credentials belong in frontend environment variables.

## Backend and data

| Binding | Resource | Data |
| --- | --- | --- |
| PROFILES | atoma-user-profiles | users, salted password hashes, session hashes, rate limits, contact submissions |
| RESEARCH | atoma-research-hub | curated papers, per-user bookmarks |
| AI | Workers AI | @cf/meta/llama-3.1-8b-instruct-fp8 |

`wrangler.jsonc` contains resource IDs, not credentials. Migrations are additive
and tracked separately per database. Research begins with two verified arXiv
source records. Reading notes are editorial summaries, not copied abstracts.
Automated ingestion and full-paper retrieval are not implemented.

| API | Method | Access |
| --- | --- | --- |
| /api/health | GET | public binding/database check |
| /api/papers | GET | public curated catalog |
| /api/signup, /api/login | POST | email/password, same-origin JSON |
| /api/profile | GET | session required |
| /api/auth-status | GET | account email configuration status |
| /api/forgot-password, /api/resend-verification | POST | generic response; bounded email requests |
| /api/reset-password, /api/verify-email | POST | single-use expiring bearer token |
| /api/logout | POST | session revocation |
| /api/bookmarks | GET, POST | session required, owner scoped |
| /api/contact | POST | saved to D1; no email notification |
| /api/chat | POST | bounded public inference; optional paperId |

Passwords use PBKDF2-SHA256 with random salts and 100,000 iterations. Session
cookies are Secure, HttpOnly, SameSite=Lax and expire after seven days; only
hashes are stored. Writes require matching Origin, valid JSON, and <=16 KB
bodies. SQL is parameterized. Public writes allow 30 requests/IP/endpoint/hour;
chat allows 20/IP/hour and 200 total/day. The global cap bounds inference
requests, not a monetary guarantee. All AI questions leave the browser for
Cloudflare; chat transcripts are not persisted by this application.

## Continuous release

`.github/workflows/deploy.yml` runs typecheck, lint, API tests, build, dependency
audit, and desktop/mobile browser checks. Pushes to main deploy only after those
gates pass. PRs run verification without production secrets or migrations.
Production deployments apply both D1 migration sets before uploading Functions
and assets. The final job checks `/api/health`.

Required repository Actions secrets:

- CLOUDFLARE_ACCOUNT_ID — configured by this implementation.
- CLOUDFLARE_API_TOKEN — durable account-scoped token with Pages Edit and D1 Edit;
  configured in GitHub encrypted secrets. Wrangler's local OAuth token is not copied to CI.

A direct authenticated Wrangler deployment is live. Both GitHub release secrets
are configured. [Automatic release 40133698260](https://github.com/sbarteau2022/atoma-vite-react19-motion-zustand-webgl-Ts7.1-beta/actions/runs/40133698260) passed both verification and deployment.

Manual release after verification:

```sh
npx wrangler d1 migrations apply PROFILES --remote
npx wrangler d1 migrations apply RESEARCH --remote
npm run build
npm run deploy -- --branch main
```

Rollback: redeploy the previous known-good Git commit or promote a prior Pages
deployment in Cloudflare. Do not reverse production data migrations blindly;
these initial migrations are additive. Monitor `/api/health`, Pages deployment
status, and Workers AI usage in the Cloudflare account.

## Boundaries and next stage

- Email verification and password recovery are implemented; sending is disabled
  until Gmail authorization is installed and delivery verified. Social OAuth and
  account deletion UI remain future work. Deletion requests go through Contact.
- The public AI is a guide, not a tool executor. Research answers use editorial
  notes and disclose that full manuscripts are unavailable.
- The Brigade, architecture maps, telemetry, and orchestration chat are demos.
  Tool isolation and permission enforcement are product design, not guarantees
  provided by this frontend.
- Sponsor/event names are ecosystem context, not proof of sponsorship.
- The native renderer is lazy-loaded and remains a substantial Three.js chunk.
  DPR is bounded; rendering pauses offscreen/hidden and falls back for reduced
  motion, context loss, or unavailable WebGL.
- Next: authorize and verify Gmail delivery, ingestion with licensing gates,
  broader accessibility review, and real runtime event integration.

This implementation establishes the website backend and public presentation;
it does not qualify the native runtime or establish hackathon eligibility.

## Account email and contact

The temporary public contact, account sender and reply-to are
`sbarteau2022@gmail.com`, as requested. The Contact page links directly to that
inbox. Contact form submissions still persist to D1 without email notifications.

Recovery and verification follow the account flow in DESIGN.md. See
[account email implementation](docs/ACCOUNT_EMAIL.md) for security review,
configuration, tests, release status and rollback. Recovery links expire after
30 minutes; verification links after 24 hours. Only token hashes are stored.
Password reset invalidates existing sessions. Email ownership does not establish
personal identity, and unverified profiles can still sign in.

To authorize Gmail sending, enable Google 2-Step Verification and create an
[App Password](https://myaccount.google.com/apppasswords). Save it as an encrypted
production Cloudflare Pages secret named `GMAIL_APP_PASSWORD` for
`atoma-labs-site`, then redeploy. Never commit it, place it in frontend variables,
or paste it into chat. The sender, reply-to and fixed public link origin are
configured in wrangler.jsonc. Missing authorization returns a clear 503; the UI
does not claim delivery. Gmail SMTP uses certificate-validated TLS on port 465.
Delivery has not been qualified against the real Gmail account yet.
