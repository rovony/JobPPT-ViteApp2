---
zaj_skill: zaj-vibecode
zaj_skill_version: 1.1
produced_at: 2026-05-07T10:18:00-04:00
project_archetype: saas-app
artifact_kind: handoff
---

# JobPPT-App2 — Session Handoff

> **For the next session:** read this first, then `.zaj/state.json`, then `CLAUDE.md`. You should be productive in <5 min.

## Where things stand right now (2026-05-07 morning)

### Auth gate — SHIPPED ✅

- **Production:** `https://jobppt-viteapp2.vercel.app` is now perimeter-gated. Anonymous `/decks/*` → 307 → `/login`; correct password sets HTTPOnly site-session cookie; share-link `/v/:token` is whitelisted.
- **Merged:** PR #1 → main as commit `c27bfec` (2026-05-07 14:15 UTC).
- **All 6 Playwright e2e specs green** on the last preview before merge.
- **Smoke-tested in production** post-deploy: 307 redirect, 200 on /login, 401 on wrong password, 200 on correct password.

### `.zaj/` + `.ai/` durable docs — DONE ✅

- `state.json`, `CHANGELOG.md`, `conventions.md`, `constitution-overrides.md`, `vibecode/handoff/HANDOFF.md`, `.ai/ARCHITECTURE.md`, `.ai/KNOWN_ISSUES.md`
- Future sessions: read `state.json` + this file, then start working.

### Pattern Guide for friend's SaaS — DONE ✅

- 10 files (2071 lines) at `~/MyWork/MyHQs/0-Inbox/Pattern-Guide-Deck-Builder/`
- 5 combined temp files at `~/MyWork/MyHQs/0-Inbox/Pattern-Guide-Deck-Builder/_temp-combined/`
- Inbox-grade. Re-read before sharing externally.

## Pending / queued work

| Priority | Task | Why deferred |
|---|---|---|
| P2 | `cs2-principle4` font bumps | Polish — needs specific direction (which fonts, by how much) |
| P2 | `cs2-component-{nca,dataflow,audit}` animation slowdown | Polish — needs target durations |
| P3 | Phase 6: apply Ultragenyx-tailored slide updates from `_Admin/1-Inbox/ULTRAGENIX/Ultragenix.html` (902 lines of Kimi research output) | Larger lift; needs scoping |
| P4 | Phase 3: PharmAgent visual flow slides from qp2 family | "Later" per original plan |
| P4 | Phase 4: Backup pool merge across V5 trio | "Later" |
| P4 | Phase 5: rename `v5-pharazi` → `v5-gilead`, `qp2-seminar-v4-2` → `v5-merck` | "Later" |

## Decision log (recent + load-bearing)

- **Auth: shared password, not multi-user.** Interview prep, low blast radius. Existing email/password + JWT + Drizzle infra (`api/auth/login.ts`, etc.) left in place but unused. Don't delete.
- **Soft-wall over hard-wall.** `/assets/*` whitelisted so login page can boot. Motivated scrapers can grep `/assets/index-*.js` for slide text. Accepted tradeoff for the interview-prep window.
- **Vercel SSO disabled on previews of jobppt-viteapp2 (this project only).** Production custom domain unchanged. Other projects in `rovonyhq` team unchanged.
- **`SITE_PASSWORD` synced `.env.local` → Vercel** via stdin-pipe (value never entered transcript). Both Production and Preview (branch-specific for `feat/site-auth-gate`) use the local password.
- **AuthContext bug found by Playwright:** `setIsLoadingAuth(true)` during login submit caused App.tsx to render LoadingScreen, unmounting `<Login />` and wiping its error state. Fixed by removing the toggle.
- **`.env.preview` is useless** for tests because Vercel Sensitive vars come back empty. Playwright config simplified to always load `.env.local`.
- **Slide 2 hook is generic, not specific.** "When the clinical trial / can't answer" — NOT "When n=27, the trial can't answer." User-corrected. Specific facts (UX111 N=27) belong in case slides + Q&A.
- **CS2 = pharos-seminar source, not pharazi.** Mapped via `pharosIdMap` in `v5-ultragenyx/notes.ts`. CS2/CS3 swapped from v5-pharazi: AI/ML now CS2, Ivosidenib now CS3.
- **TypeScript: incremental migration.** `strict: false`, `allowJs: true`. New files always `.tsx`/`.ts`. Don't bulk-remove `// @ts-nocheck` directives — file-by-file as you add types.

## Open questions for next session

- Should the auth gate also protect `/v/:token` share links? Currently NO (whitelisted). Confirm with user when share-link audience is known.
- After auth merges, do we want analytics on login attempts? PostHog MCP is available; could log via `mcp__claude_ai_PostHog__*` tools. Not done yet.
- Is `.env.local` SITE_PASSWORD the long-term password, or will it rotate? If rotating, document the rotation procedure in `AUTH-SETUP.md`.

## How to resume

```bash
cd /Users/malekokour/MyWork/MyProjects/MyCareer/JobHunt/2026/JobPPT-App2
git checkout main && git pull            # confirm c27bfec is HEAD
cat .env.local 2>/dev/null               # ensure SITE_PASSWORD/SITE_SECRET present
PLAYWRIGHT_BASE_URL=https://jobppt-viteapp2.vercel.app npm run test:e2e
```

For new feature work:
```bash
git checkout -b feat/<scope>
# ... implement ...
PLAYWRIGHT_BASE_URL=<preview-url> npm run test:e2e
git push -u origin feat/<scope>
gh pr create
```

## Anti-patterns spotted this session (don't repeat)

- ❌ Setting `devCommand: "npm run dev"` in `vercel.json` — bypasses middleware + serverless functions during `vercel dev`. Removed.
- ❌ Toggling shared `isLoadingAuth` state during login submit — caused unmount/remount of `<Login />`, wiping local state. Use component-local loading state for form submits.
- ❌ Loading `.env.preview` when Sensitive vars come back empty — empty values block dotenv from reading `.env.local`'s real values. Just use `.env.local`.
- ❌ `vercel env add NAME preview --yes` without `--value` or explicit branch — refuses interactive in agent mode. Use explicit branch positional arg AND stdin pipe.

## Vercel project state (for the record)

- SSO: **disabled** on previews (this project only). Production custom domain still public.
- Env vars: `SITE_PASSWORD`, `SITE_SECRET` set on Production + Preview (Sensitive). Local `.env.local` matches.
- Deploy URLs:
  - Production custom: `https://jobppt-viteapp2.vercel.app`
  - Latest production deploy: `https://jobppt-viteapp2-cdrbiyqbn-rovonyhq.vercel.app` (commit `c27bfec`)

---

*Refresh this file at the END of every session before signing off (per zaj-vibecode ENH-006). Bump the `produced_at` timestamp and update the "Where things stand right now" section to reflect actual current state, not stale state.*
