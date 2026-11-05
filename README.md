# Atoma Labs — Vite + React + TypeScript

Site: **One mind. Every engineering job.**

Independent research lab. Design system is the cloned dark Framer grid (cream type, orange ribbon). Palette lock: slate `#26262b` / `#2e2e33` / `#34343a`, white, amber `#f59e0b`.

The marketing IA is the cloned Framer flow. Get started still goes to `/waitlist`. The Play demo slot on Home runs a live harness dry-run against the Ares governor at `127.0.0.1:4810` (Vite `/api` proxy). `/app` is the research and product lab — same console, labelled demo when the governor is down.

```sh
npm install
npm run dev          # http://127.0.0.1:5173
npm run build
npm run pages:deploy # Cloudflare Pages (wrangler)
```
