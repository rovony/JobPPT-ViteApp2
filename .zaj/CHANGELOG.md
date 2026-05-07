# JobPPT-App2 — Project Changelog

> Append-only log of meaningful changes. Date-stamped, newest first.
> For commit-level history, use `git log`. This file captures **decisions** and **arcs** that won't show up in commit messages alone.

---

## 2026-05-07 — Auth gate SHIPPED to production

- PR #1 merged → main as commit `c27bfec` (2026-05-07 14:15 UTC)
- All 6 Playwright e2e specs green on preview pre-merge
- Production smoke-tested post-deploy: 307 redirect, 401 wrong, 200 correct, share-link `/v/:token` whitelisted
- **Two real bugs found by the Playwright suite + fixed:**
  - `AuthContext.login` toggled `isLoadingAuth` → App.tsx unmounted `<Login />` mid-submit → wiped error state. Removed the toggle.
  - `.env.preview` (from `vercel env pull`) had empty values for Sensitive vars → blocked dotenv from loading real values. Simplified config to always use `.env.local`.
- Vercel SSO disabled on `jobppt-viteapp2` previews (project-scoped, user-approved)
- `SITE_PASSWORD` synced `.env.local` → Vercel via stdin pipe (Production direct; Preview branch-specific). Value never entered transcript.

## 2026-05-06 — Pattern Guide for friend's SaaS deck-builder

- 10 files (2071 lines) at `~/MyWork/MyHQs/0-Inbox/Pattern-Guide-Deck-Builder/`
- Generalized beyond pharma; organized by tech stack, layout system, cross-slide cinema, card vocabularies, animation grammar, layout discipline, illustrations, AI co-pilot, and adapt-vs-copy migration plan
- README explicitly cross-references existing docs (`JobPPT-App2/CLAUDE.md`, `~/.claude/skills/zaj-design/`, `~/.claude/skills/zaj-slides/`, `~/.claude/rules/frontend.md`) so the friend doesn't redo work that already exists
- Inbox-grade — refine before sharing externally
- Not committed to git (MyHQs root is umbrella, not a repo)

## 2026-05-06 — `.zaj/` + `.ai/` durable docs bootstrapped

- Created `.zaj/state.json`, `.zaj/conventions.md`, `.zaj/CHANGELOG.md` (this file), `.zaj/vibecode/handoff/HANDOFF.md`
- Created `.ai/ARCHITECTURE.md`, `.ai/KNOWN_ISSUES.md`
- Routed via `/zaj-vibecode` → `zaj-onboard-existing` flow (V4 brownfield-onboard)
- Reason: stop re-investigating the same context across sessions; future sessions can read `.zaj/state.json` + `HANDOFF.md` and resume in <5 min

## 2026-05-06 — Site auth gate (`feat/site-auth-gate`, commit `37dfe66`)

- **Threat model:** decks compile slide content INTO the JS bundle at build time, so without a perimeter gate anyone can `curl` the bundle and grep raw text. Public discoverability also bad for interview prep (don't want hiring teams to find old/draft decks).
- **Architecture chosen:** Vercel Edge Middleware (perimeter gate) + serverless functions (login/logout/me) + HTTPOnly Lax cookie signed with HMAC-SHA256 via Web Crypto. Dependency-free, dual-runtime (edge + node).
- **Tradeoff accepted:** soft-wall — `/assets/*` is whitelisted so the Login page can boot. Motivated scrapers can still grep slide text from `/assets/index-*.js`. Hard-wall would require lazy-loading slide content via authenticated API; deferred as too-much-refactor for the interview-prep window.
- **Files added:** `middleware.ts`, `api/_lib/site-token.ts`, `api/auth/site-{login,logout,me}.ts`, `src/pages/auth/Login.tsx` (rewritten), `playwright.config.ts`, `tests/e2e/auth.spec.ts`, `.env.local.example`, `AUTH-SETUP.md`
- **Files removed:** dev-bypass user from `src/lib/AuthContext.tsx` (was hardcoded `{ id: 'local-user', email: 'admin@merck.com', role: 'admin' }`)
- **Existing infra LEFT IN PLACE but unused for shared-pwd flow:** `api/auth/login.ts`, `api/auth/register.ts`, `api/auth/me.ts` (email/password + JWT + Drizzle/Neon). May be revived later for multi-user mode; orphaned for now.
- **Env vars set:** `SITE_PASSWORD` + `SITE_SECRET` on Vercel (Production + Preview), 2026-05-06
- **Validation status:** code-complete, awaiting Playwright run; merge to main blocked until all 6 specs pass

## 2026-05-06 — `v5-ultragenyx` deck shipped (commit `5903e2a`)

- Cloned `v5-pharazi` → `v5-ultragenyx` via APFS clonefile (`cp -Rc`)
- Title: "When the trial can't answer / Three cases where clinical pharmacology closed the gap"
- Cross-slide morph: Ultragenyx logo top-right with shared `layoutId` between slides 1 → 2
- CS2 fully replaced with `pharos-seminar` source (22 slides via `pharosIdMap` in `notes.ts`)
- Added `cs2-interactive-dossier` from `qp2-seminar-v4-2`
- Speaker notes audit: enumerated all manifest slot IDs, cross-checked against 4 notes sources, filled the one gap (`cs2-interactive-dossier`)
- Slide 2 hook reverted from "When n = 27, the trial can't answer" → "When the clinical trial / can't answer" (premise is generic, specific N=27 belongs in case slides + Q&A)
- Deployed to production at `jobppt-viteapp2.vercel.app`

## 2026-05-04 (earlier) — Audience-mode home reorganization

- See git log: commits `4ce37f7`, `aa2e1e2`, `2c7ca0e`, `5ce7115`, `9a3e638`, `b5c1bad`
- "Final Delivered" folder pattern + Sections folder + Templates folder

## 2026-04-26 — Repo rename: `merck-deck` → `JobPPT-ViteApp` → `JobPPT-ViteApp2`

- This repo is the **App2** fork; the original `JobPPT-ViteApp` (qp2-seminar-v3-R2) is at a different deploy

## 2026-04-26 — TypeScript migration

- All `src/**/*.{js,jsx}` renamed to `.{ts,tsx}`
- `tsconfig.json`: `strict: false`, `allowJs: true` for incremental adoption
- 266 files have `// @ts-nocheck`; ~190 files pass `tsc` clean
- New files MUST be `.tsx` / `.ts`; do not create new `.jsx` / `.js` under `src/`

## Earlier — see git history

For changes before 2026-04-26, run:
```
git log --oneline --since=2026-04-01 --until=2026-04-26
```
