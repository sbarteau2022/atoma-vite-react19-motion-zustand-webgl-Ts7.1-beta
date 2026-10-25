---
title: "Account recovery, verification and personal Gmail sender"
document_type: "implementation"
version: "1.0.0"
date: "2026-10-25T00:10:47Z"
implementation_date: null # Not merged or deployed
author: "sbarteau2022 / Codex"
reviewers: ["sbarteau2022 (owner authorization; two-reviewer requirement explicitly waived)"]
status: "approved"
related_files:
  - path: "DESIGN.md"
    lines: "1-226"
    role: "supporting"
  - path: "README.md"
    lines: "1-311"
    role: "supporting"
  - path: "docs/ACCOUNT_EMAIL.md"
    lines: "1-213"
    role: "supporting"
  - path: "functions/api/[[path]].js"
    lines: "1-172"
    role: "supporting"
  - path: "migrations/profiles/0002_account_email.sql"
    lines: "1-11"
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
  - path: "package-lock.json"
    lines: "1-4360"
    role: "supporting"
  - path: "package.json"
    lines: "1-49"
    role: "supporting"
  - path: "server/accountMail.js"
    lines: "1-34"
    role: "supporting"
  - path: "src/App.tsx"
    lines: "1-139"
    role: "supporting"
  - path: "src/pages/AccountEmail.tsx"
    lines: "1-17"
    role: "supporting"
  - path: "src/pages/Auth.tsx"
    lines: "1-13"
    role: "supporting"
  - path: "src/pages/Contact.tsx"
    lines: "1-83"
    role: "supporting"
  - path: "src/utils/accountActions.ts"
    lines: "1-13"
    role: "supporting"
  - path: "tests/accountMail.test.mjs"
    lines: "1-9"
    role: "test"
  - path: "tests/api.test.mjs"
    lines: "1-34"
    role: "test"
  - path: "tests/browser/site.spec.ts"
    lines: "1-11"
    role: "test"
  - path: "wrangler.jsonc"
    lines: "1-31"
    role: "supporting"
related_issues: []
related_documents: ["../DESIGN.md", "../README.md", "LAUNCH_AUDIT.md"]
tags: ["accounts", "email", "cloudflare", "gmail"]
---
# Account email implementation

## Executive summary

People can request a password reset and confirm ownership of their inbox. The site uses the owner's personal Gmail address for direct contact and, once authorized, account messages. The Gmail secret is now saved in Cloudflare; real SMTP authentication and inbox delivery still require live qualification.

## Problem statement

Profiles had no recovery path or email ownership status. A contact address alone cannot authorize Gmail to send messages.

## Solution overview

Add explicit account forms, expiring links, hashed tokens and atomic database updates. Keep earlier resend links valid until one is consumed. Use the requested personal Gmail sender through a bounded TLS transport, with a Cloudflare mail adapter retained for a future business domain.

## Implementation details

### Files modified

| File | Lines | Change |
| --- | --- | --- |
| `DESIGN.md` | 1-226 | Account email implementation or verification evidence |
| `README.md` | 1-311 | Account email implementation or verification evidence |
| `docs/ACCOUNT_EMAIL.md` | 1-213 | Account email implementation or verification evidence |
| `functions/api/[[path]].js` | 1-172 | Account email implementation or verification evidence |
| `migrations/profiles/0002_account_email.sql` | 1-11 | Account email implementation or verification evidence |
| `output/audit-animated-desktop.png` | 0 (binary) | Account email implementation or verification evidence |
| `output/audit-desktop.png` | 0 (binary) | Account email implementation or verification evidence |
| `output/audit-mobile.png` | 0 (binary) | Account email implementation or verification evidence |
| `package-lock.json` | 1-4360 | Account email implementation or verification evidence |
| `package.json` | 1-49 | Account email implementation or verification evidence |
| `server/accountMail.js` | 1-34 | Account email implementation or verification evidence |
| `src/App.tsx` | 1-139 | Account email implementation or verification evidence |
| `src/pages/AccountEmail.tsx` | 1-17 | Account email implementation or verification evidence |
| `src/pages/Auth.tsx` | 1-13 | Account email implementation or verification evidence |
| `src/pages/Contact.tsx` | 1-83 | Account email implementation or verification evidence |
| `src/utils/accountActions.ts` | 1-13 | Account email implementation or verification evidence |
| `tests/accountMail.test.mjs` | 1-9 | Account email implementation or verification evidence |
| `tests/api.test.mjs` | 1-34 | Account email implementation or verification evidence |
| `tests/browser/site.spec.ts` | 1-11 | Account email implementation or verification evidence |
| `wrangler.jsonc` | 1-31 | Account email implementation or verification evidence |

### Languages chosen and why

| Language | Component | Rationale |
| --- | --- | --- |
| TypeScript/React | Account forms and fragment handling | Existing frontend stack and accessible form states |
| JavaScript | Pages API and SMTP adapter | Existing runtime; server-only Nodemailer ESM |
| SQL | Additive D1 migration and transactions | Atomic account changes with parameterized queries |

Next evolution: a verified business sender, durable delivery queue and bounded retries. No research scraper or external research API is introduced.

### Grounding

This implementation was not directly grounded in published literature. It applies established single-use bearer token and transactional account recovery patterns.

Primary engineering references: [Cloudflare TLS](https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/), [Nodemailer ESM](https://github.com/nodemailer/nodemailer/blob/master/README.md), [Google App Passwords](https://support.google.com/accounts/answer/185833), [Cloudflare email binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).

### Configuration changes

`wrangler.jsonc` enables `nodejs_compat`, fixes `AUTH_PUBLIC_ORIGIN` to the canonical production origin, selects Gmail, and sets sender/reply-to to `sbarteau2022@gmail.com`. `GMAIL_APP_PASSWORD` is a server secret, never a frontend variable. Nodemailer 10.2.1 is locked in package-lock.json. Migration 0002 adds email_verified_at and account_tokens without modifying existing password hashes.

## Testing evidence

### Test files and coverage

The manifest identifies exact test file ranges. `tests/api.test.mjs` exercises real in-memory SQL; `tests/accountMail.test.mjs` verifies transport contracts with a stub; `tests/browser/site.spec.ts` exercises account screens and existing public routes. Provider calls are mocked in automated tests.

### Results

28 Node API/transport tests pass. TypeScript, lint, production Vite build and npm audit pass (zero vulnerabilities). All 10 browser tests pass, including recovery navigation, token fragment removal, explicit verification, reset confirmation and unavailable-delivery states. The initial navigation test raced the lazy route transition; waiting for the destination heading corrected the test. Wrangler Functions compile succeeds. Actual workerd runtime starts with nodejs_compat, both local D1 migrations succeed, /api/health returns healthy and /api/auth-status reports emailAvailable:false; a local recovery request returns the expected unavailable response. These checks do not establish Gmail SMTP authentication or inbox delivery.

### Reproduce

```sh
# Repository root: complete build and automated checks
npm ci
npm run check
npm audit --audit-level=moderate
npx playwright install chromium
npm run test:e2e
# Actual Pages runtime, isolated local D1
npx wrangler d1 migrations apply PROFILES --local
npx wrangler d1 migrations apply RESEARCH --local
npx wrangler pages dev dist --port 8788
```

### Was it proven necessary?

Yes: the existing API offered no password recovery or email verification endpoints. Tests demonstrate reset revocation, stale-login protection and rejection of reused or expired tokens, properties absent from the previous implementation.

### Adversarial review

- Tokens have 256 random bits; only SHA-256 digests enter D1. Reset expiry is 30 minutes; verification is 24 hours. Wrong-purpose, forged, expired and consumed tokens fail.
- D1 batches change credentials, revoke sessions and consume all sibling tokens atomically. Concurrent consumption has one winner. Session insertion requires the password hash validated at login to remain current, closing the reset/login race.
- Fixed configured origins prevent hostile host headers from controlling links. URL fragments avoid HTTP/referrer token transmission and are removed after reading. GET never consumes a link; explicit confirmation prevents mail scanner consumption.
- Generic eligible/unknown/verified responses and background delivery avoid provider timing disclosure. Requests remain bounded per IP; actual sends are capped at three per address/purpose/hour and 200 globally/day. Signup retains its existing duplicate-account response; this is not a claim of complete account enumeration resistance.
- SMTP requires TLS 1.2+, certificate validation, bounded timeouts and no attachment file/URL loading. Credentials and provider failure details are excluded from application logs. Failed sends delete their newly created token.
- No durable delivery queue or automatic retry is implemented. Request acceptance does not establish delivery. Missing authorization returns an explicit unavailable state. Public recovery can still consume another user's send quota; later Turnstile protection should address this tradeoff.
- Email verification marks ownership; it does not gate profile access or research bookmarks. Authentication is still email/password, not OAuth or MFA. Contact form persistence does not notify Gmail.

## Deployment / rollout

| Aspect | Detail |
| --- | --- |
| Status | Owner authorized deployment and explicitly waived the two-reviewer requirement on October 24, 2026 (America/Chicago); release pending CI |
| Delivery prerequisite | Save GMAIL_APP_PASSWORD in production Pages secrets, redeploy, then verify inbox arrival and both link actions |
| Rollout | Approved merge uses existing CI: checks, additive D1 migrations, Pages deploy and health check |
| Rollback | Restore previous Pages deployment; leave additive columns/table in place. Do not delete users or reverse migrations blindly |
| Monitoring | auth-status for configuration only; Pages logs for generic delivery failures; Gmail account security and sending limits |
| Post-deploy checks | Profile login, verification, reset, prior-session rejection, health and mobile account forms |

The owner explicitly authorized deployment without the two-reviewer requirement. Cloudflare production secret listing confirms GMAIL_APP_PASSWORD exists and is encrypted. The value was not read or printed. Real SMTP authentication and inbox placement remain unqualified until the release is live.

## Next stage of implementation

| Next step | Dependency | Target |
| --- | --- | --- |
| Authorize Gmail and validate real inbox flow | Owner-provided secret and deployment | Before enabling delivery |
| Review site flow, upgrades and footer disclosures/data practices | User walkthrough | Next work session |
| Approved research sources and APIs | User allowlist and API availability | Later; no scraping |
| Business sender and durable retry queue | Business domain and provider | After initial launch |

This implementation sets up recovery and verification because the account state transitions and screens are implemented and tested. It does not complete live email qualification without Gmail authorization and delivery evidence.

## What we learned

| Category | Learning |
| --- | --- |
| Technical | A reset racing login needs a credential-conditioned session insert |
| Process | An email address is not sender authorization; expose the unavailable state |
| Tooling | Browser tests must wait for the destination heading after lazy route transitions before filling similarly named fields |
| Estimation | Provider authorization remains owner-controlled; implementation can proceed independently |
| Collaboration | Personal Gmail was explicitly selected; no business domain was invented |

## Changelog

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0.0 | 2026-10-25 | sbarteau2022 / Codex | Recovery, verification and temporary Gmail sender implementation |
