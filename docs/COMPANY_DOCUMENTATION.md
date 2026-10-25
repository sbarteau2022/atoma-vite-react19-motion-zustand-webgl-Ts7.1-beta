---
title: "Publish company and trust documentation"
document_type: "implementation"
version: "1.0.0"
date: "2026-10-25T01:03:50Z"
implementation_date: "2026-10-25T01:03:50Z"
author: "sbarteau2022 / Codex"
reviewers: ["sbarteau2022 (owner publication authorization; two-reviewer requirement waived)"]
status: "approved"
related_files:
  - path: "DESIGN.md"
    lines: "1-250"
    role: "supporting"
  - path: "README.md"
    lines: "1-374"
    role: "supporting"
  - path: "docs/COMPANY_DOCUMENTATION.md"
    lines: "1-214"
    role: "supporting"
  - path: "output/audit-animated-desktop.png"
    lines: "0"
    role: "supporting"
  - path: "output/audit-company-desktop.png"
    lines: "0"
    role: "supporting"
  - path: "output/audit-company-mobile.png"
    lines: "0"
    role: "supporting"
  - path: "output/audit-mobile.png"
    lines: "0"
    role: "supporting"
  - path: "package.json"
    lines: "1-50"
    role: "supporting"
  - path: "public/sitemap.xml"
    lines: "1-1"
    role: "supporting"
  - path: "scripts/generate-dependency-notices.mjs"
    lines: "1-10"
    role: "supporting"
  - path: "src/App.tsx"
    lines: "1-146"
    role: "supporting"
  - path: "src/content/companyDocuments.ts"
    lines: "1-86"
    role: "supporting"
  - path: "src/content/dependencyInventory.json"
    lines: "1-177"
    role: "supporting"
  - path: "src/index.css"
    lines: "1-1023"
    role: "supporting"
  - path: "src/pages/CompanyDocument.tsx"
    lines: "1-34"
    role: "supporting"
  - path: "src/pages/Contact.tsx"
    lines: "1-83"
    role: "supporting"
  - path: "src/pages/Mission.tsx"
    lines: "1-112"
    role: "supporting"
  - path: "tests/browser/company.spec.ts"
    lines: "1-49"
    role: "test"
  - path: "tests/dependencyNotices.test.mjs"
    lines: "1-14"
    role: "test"
related_issues: []
related_documents: ["../DESIGN.md", "../README.md", "ACCOUNT_EMAIL.md"]
tags: ["company", "privacy", "footer", "documentation"]
---
# Company and trust documentation

## Executive summary

Sixteen dedicated pages replace the footer's shared placeholders. They explain the studio, current work, live website features, privacy, data, usage, research and security in plain language. The owner authorized publication as drafts for later refinement.

## Problem statement

About and Careers linked to Contact, Status linked to Apps, and several distinct trust links led to the same short privacy paragraph. The old footer's unqualified “Chats are not stored” wording did not distinguish browser memory, application storage and provider processing. The public repository had no root license granting unrestricted reuse.

## Solution overview

Use an editorial page shell with section navigation, update dates, draft labels, contact details and related notices. Store content in one typed file for owner editing. Provide a deliberate manual status check and generate dependency notices from actual installed/locked metadata.

## Implementation details

### Files modified

| File | Lines | Description |
| --- | --- | --- |
| `DESIGN.md` | 1-250 | Company documentation implementation or validation evidence |
| `README.md` | 1-374 | Company documentation implementation or validation evidence |
| `docs/COMPANY_DOCUMENTATION.md` | 1-214 | Company documentation implementation or validation evidence |
| `output/audit-animated-desktop.png` | 0 (binary) | Company documentation implementation or validation evidence |
| `output/audit-company-desktop.png` | 0 (binary) | Company documentation implementation or validation evidence |
| `output/audit-company-mobile.png` | 0 (binary) | Company documentation implementation or validation evidence |
| `output/audit-mobile.png` | 0 (binary) | Company documentation implementation or validation evidence |
| `package.json` | 1-50 | Company documentation implementation or validation evidence |
| `public/sitemap.xml` | 1-1 | Company documentation implementation or validation evidence |
| `scripts/generate-dependency-notices.mjs` | 1-10 | Company documentation implementation or validation evidence |
| `src/App.tsx` | 1-146 | Company documentation implementation or validation evidence |
| `src/content/companyDocuments.ts` | 1-86 | Company documentation implementation or validation evidence |
| `src/content/dependencyInventory.json` | 1-177 | Company documentation implementation or validation evidence |
| `src/index.css` | 1-1023 | Company documentation implementation or validation evidence |
| `src/pages/CompanyDocument.tsx` | 1-34 | Company documentation implementation or validation evidence |
| `src/pages/Contact.tsx` | 1-83 | Company documentation implementation or validation evidence |
| `src/pages/Mission.tsx` | 1-112 | Company documentation implementation or validation evidence |
| `tests/browser/company.spec.ts` | 1-49 | Company documentation implementation or validation evidence |
| `tests/dependencyNotices.test.mjs` | 1-14 | Company documentation implementation or validation evidence |

### Language choices

| Language | Role | Reason |
| --- | --- | --- |
| TypeScript/React | Typed content, routes, status and layout | Existing frontend; no new runtime dependency |
| CSS | Scoped editorial/mobile layout | Existing design tokens, visible focus, contained table scrolling |
| JavaScript | Package inventory generation and verification | Reads lockfile and installed metadata without network access |
| XML/Markdown | Sitemap and operator documentation | Existing publishing and documentation formats |

### Literature and primary sources

This implementation was not directly grounded in published literature. It applies conventional editorial layout, truthful product labeling and implementation-backed privacy notice patterns. It does not establish legal compliance or provide a jurisdiction-specific legal assessment.

Provider descriptions were checked against [Cloudflare privacy](https://www.cloudflare.com/privacypolicy/), [Workers AI data usage](https://developers.cloudflare.com/workers-ai/platform/data-usage/), and [Google privacy](https://policies.google.com/privacy). The application's schemas, API, cookie flags, token cleanup, frontend state and package lockfile ground its own processing claims. Dependency license identifiers come from installed package metadata; upstream license texts remain authoritative.

### Routes and configuration

Company: /about, /careers, /roadmap, /updates. Resources: /docs, /api-reference, /status, /research-policy, /accessibility. Trust: /privacy, /data-practices, /cookies, /disclosures, /terms, /security, /sources. Existing Mission and Contact remain; their copy is adjusted to avoid claiming shipped native execution or a weekly publishing schedule.

All notices carry “Published draft” and an October 24, 2026 date (America/Chicago). Public copy is editable in src/content/companyDocuments.ts. The implementation document's approved status records owner authorization to publish, not independent legal review or an assertion that these drafts are final.

No database migration, provider setting, cookie, tracking integration, or new runtime dependency is introduced. npm run docs:dependencies regenerates the direct package inventory. The sitemap includes all new notice routes. Publishing source metadata adds approximately 33 KB uncompressed to the main frontend chunk; the shared page renderer remains lazy-loaded.

## Testing evidence

| Test file | Type | Coverage |
| --- | --- | --- |
| tests/dependencyNotices.test.mjs | Metadata integrity | All direct packages, exact locked versions, installed license expressions and upstream links |
| tests/browser/company.spec.ts | Browser | All 16 mobile pages, headings, section navigation, direct contact, viewport width, dedicated footer destinations, dependency table, status success/error/null and no automatic requests |
| tests/browser/site.spec.ts | Regression | Existing public routes, AI interaction, branding, research and account forms |
| tests/api.test.mjs and tests/accountMail.test.mjs | Regression | Existing account, data, inference and email behavior |

29 Node tests and 14 browser tests pass. TypeScript, lint, production build and moderate-severity dependency audit pass, with zero vulnerabilities. Four company browser tests were rerun after making screenshots wait for the destination heading; all passed. Desktop and mobile privacy screenshots were visually inspected. CI repeats the complete checks before deployment.

```sh
# Repository root: regenerate notices and verify the release
npm ci
npm run docs:dependencies
npm run check
npm audit --audit-level=moderate
npx playwright install chromium
npm run test:e2e
# Check company documents against production after release
TEST_URL=https://atoma-labs-site.pages.dev npx playwright test tests/browser/company.spec.ts
```

### Was the change necessary?

Yes. Dedicated footer destinations were missing, including substantive data retention and cookie notices. Browser checks verify that every notice renders actual content at mobile widths and distinct footer links reach their intended documents.

## Adversarial and editorial review

- Checked AI text against actual application storage and browser memory. Provider retention is separate; no promise of universal zero retention is made.
- Identified indefinite account/contact/bookmark retention and opportunistic cleanup honestly. Expiry is not represented as immediate physical erasure. Manual requests do not invent automatic export/deletion, a response deadline, or provider-backup deletion guarantees.
- Accounts, contacts and email are cloud-backed; local-first native product goals are not presented as website data locality guarantees.
- Removed broad open-source labeling where no root license exists. Direct dependency inventory is explicitly not a transitive license audit or a grant of branding rights.
- Status is opt-in; a configured binding does not imply AI inference, authenticated SMTP, inbox delivery, native-runtime availability or continuous monitoring. Partial outages and null JSON fail honestly.
- No incorporation, registered office, specific job, compensation, sponsorship, acceptance, certification, conformance level or SLA is invented. No mandatory arbitration or jurisdiction clause is added.
- Published drafts are visible and editable. Existing legal obligations are not claimed to be waived by these notices. No extra consent manager is installed for nonexistent marketing trackers.
- Internal route navigation uses React links; public JSON endpoints use ordinary anchors so the router does not swallow them. External links use noreferrer. Source content is rendered as text; no raw HTML injection is used.

## Deployment / rollout

| Aspect | Detail |
| --- | --- |
| Authorization | Owner requested drafting and publication; session two-reviewer waiver retained |
| Strategy | Main push; existing verify/deploy workflow gates Pages release |
| Migration | None |
| Validation | Production company browser suite, health, status scope and representative notice URLs |
| Rollback | Redeploy previous known-good Pages revision; no data rollback required |
| Release status | Deployed revision 1273396 through successful GitHub run 40149154101 |

## Next stage

| Step | Dependency | Timing |
| --- | --- | --- |
| Owner fine-tunes business and policy wording | Published drafts | User review |
| Site-flow walkthrough and product polish | Existing deployed frontend | Next session |
| Approved research API ingestion | Source allowlist, licenses and credentials | Await owner inputs |
| Full accessibility and license review | Specialist/manual review | Before broader product distribution |
| Retention automation and account export/deletion UI | Separate product design and implementation | Future work |

This implementation sets up the public front door because footer topics now have substantive, navigable documents grounded in current behavior. It does not certify compliance, qualify a native runtime, or complete future retention and research ingestion features.

## What we learned

| Category | Learning |
| --- | --- |
| Technical | Lazy route screenshots must wait for the destination heading to avoid documenting a loading state |
| Editorial | A database's lack of transcript storage is narrower than a zero-retention promise |
| Tooling | Package metadata can generate useful direct notices, but does not replace transitive license review |
| Process | Published draft labels allow owner refinement without placeholder footer links |
| Collaboration | Existing owner authorization covers publication; no invented corporate facts are needed |

## Changelog

| Version | Local date | Author | Change |
| --- | --- | --- | --- |
| 1.0.0 | 2026-10-24 | sbarteau2022 / Codex | Dedicated company and trust drafts, footer routing, source inventory and checks |

## Production validation

[Release 40149154101](https://github.com/sbarteau2022/atoma-vite-react19-motion-zustand-webgl-Ts7.1-beta/actions/runs/40149154101) passed both verification and Cloudflare deployment. All four company browser checks passed against https://atoma-labs-site.pages.dev, exercising all 16 published pages, footer destinations, narrow-width layout and the status UI. Status endpoint responses in browser tests are controlled fixtures; separate unmocked production GETs confirmed both D1 databases healthy, the AI binding present, and email configuration present. The live reads do not invoke AI or prove email inbox delivery. The desktop screenshot was refreshed from production. No database writes or account emails were needed for this release.
