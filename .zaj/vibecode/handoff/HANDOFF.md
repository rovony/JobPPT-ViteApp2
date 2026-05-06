---
zaj_skill: zaj-vibecode
zaj_skill_version: 1.1
produced_at: 2026-05-06T19:05:00-04:00
project_archetype: saas-app
artifact_kind: handoff
---

# JobPPT-App2 — Session Handoff

> **For the next session:** read this first, then `.zaj/state.json`, then `CLAUDE.md`. You should be productive in <5 min.

## Where things stand right now (2026-05-06 evening)

Two work streams in flight:

### 1. Auth gate validation — IN PROGRESS, code-complete, awaiting Playwright run

- **Branch:** `feat/site-auth-gate` (NOT pushed)
- **HEAD:** `37dfe66` ("feat(auth): shared-password site gate via Vercel Edge Middleware")
- **Status:** code-complete, Vercel env vars set (Production + Preview), awaiting `npm run test:e2e`
- **What's been done:**
  - Edge middleware at `middleware.ts` (project root) — gates all routes except whitelist
  - Serverless functions: `api/auth/site-{login,logout,me}.ts`
  - Shared HMAC sign/verify in `api/_lib/site-token.ts` (Web Crypto, dual-runtime)
  - `src/pages/auth/Login.tsx` — single password field with `data-testid` for Playwright
  - `src/lib/AuthContext.tsx` — un-bypassed, polls `/api/auth/site-me`
  - 6 Playwright specs in `tests/e2e/auth.spec.ts`
  - `.env.local.example`, `AUTH-SETUP.md`, `playwright.config.ts`
  - SITE_SECRET generated: `b2e5a75a06c0a5c683f246c788c1927ec89a4a1208b6aa0946d469efd64b7b64` (already in Vercel)
- **Next concrete action:** `cd JobPPT-App2 && npm run test:e2e`
  - This auto-spins `vercel dev` on port 5176 with test env vars (see `playwright.config.ts`)
  - All 6 specs must pass before merging to `main` and deploying
- **If tests fail:** check `.env.local` exists with `SITE_PASSWORD` + `SITE_SECRET` matching what Playwright uses (see `playwright.config.ts` webServer.env)
- **Merge plan:** once green, `git push -u origin feat/site-auth-gate` → PR → merge to main → Vercel auto-deploys

### 2. `.zaj/` + `.ai/` durable docs — JUST COMPLETED

- Files written:
  - `.zaj/state.json` — project state machine
  - `.zaj/CHANGELOG.md` — append-only decision log
  - `.zaj/conventions.md` — short pointer doc
  - `.zaj/vibecode/handoff/HANDOFF.md` (this file)
  - `.ai/ARCHITECTURE.md` — high-level architecture
  - `.ai/KNOWN_ISSUES.md` — open issues + tradeoffs
- Reason: user wanted durable docs so future sessions don't re-investigate context

## Pending / queued work

| Priority | Task | Why deferred |
|---|---|---|
| P1 | Pattern guide for friend's SaaS deck builder | User asked; depends on 53 non-backup slides being inspected and grouped by pattern. Generalize beyond pharma. |
| P2 | `cs2-principle4` font bumps | Polish |
| P2 | `cs2-component-{nca,dataflow,audit}` animation slowdown | Polish |
| P3 | Phase 6: apply Ultragenyx-tailored slide updates from `_Admin/1-Inbox/ULTRAGENIX/Ultragenix.html` (902 lines of Kimi research output) | Larger lift |
| P4 | Phase 3: PharmAgent visual flow slides from qp2 family | |
| P4 | Phase 4: Backup pool merge across V5 trio | |
| P4 | Phase 5: rename `v5-pharazi` → `v5-gilead`, `qp2-seminar-v4-2` → `v5-merck` | |

## Decision log (recent + load-bearing)

- **Auth: shared password, not multi-user.** User explicitly chose "One password for the whole site" — interview prep, low blast radius, easy to rotate. Existing email/password + JWT + Drizzle infra (`api/auth/login.ts`, etc.) left in place but unused for the shared-pwd flow. Don't delete them.
- **Soft-wall over hard-wall.** `/assets/*` is whitelisted in middleware so login page can boot. Motivated scrapers can still grep `/assets/index-*.js` for slide text. Accepted tradeoff for the interview-prep window.
- **Slide 2 hook is generic, not specific.** "When the clinical trial / can't answer" — NOT "When n=27, the trial can't answer." User-corrected. Specific facts (UX111 N=27) belong in case slides + Q&A.
- **CS2 = pharos-seminar source, not pharazi.** Mapped via `pharosIdMap` in `v5-ultragenyx/notes.ts`. CS2/CS3 swapped from v5-pharazi: AI/ML now CS2, Ivosidenib now CS3.
- **TypeScript: incremental migration.** `strict: false`, `allowJs: true`. New files always `.tsx`/`.ts`. Don't bulk-remove `// @ts-nocheck` directives — file-by-file as you add types.

## Open questions for next session

- Should the auth gate also protect `/v/:token` share links? Currently NO (whitelisted) — share links are intentionally public so they can be sent without password. Confirm with user.
- After auth merges, do we want analytics on login attempts? PostHog MCP is available; could log via `mcp__claude_ai_PostHog__*` tools. Not done yet.

## How to resume

```bash
cd /Users/malekokour/MyWork/MyProjects/MyCareer/JobHunt/2026/JobPPT-App2
git status                       # confirm on feat/site-auth-gate, clean tree
cat .env.local 2>/dev/null || echo "(create .env.local from .env.local.example)"
npm run test:e2e                 # 6 Playwright specs; must all pass
# if green:
git push -u origin feat/site-auth-gate
gh pr create --title "feat(auth): shared-password site gate" --base main
```

## Anti-patterns spotted in this session (don't repeat)

- Earlier I almost wrote a header that read "When n = 27" on slide 2 — user corrected. Hooks must be generic; specific facts in case slides.
- Edit tool failed on `.json` apostrophe escape (`'`) — fall back to a small Python script for `.json` mutations involving punctuation.
- `timeout` command doesn't exist on macOS — use `&` + `kill` instead, OR `gtimeout` from `coreutils`.

---

*Refresh this file at the END of every session before signing off (per zaj-vibecode ENH-006). Bump the `produced_at` timestamp and update the "Where things stand right now" + "How to resume" sections to reflect actual current state, not stale state.*
