# JobPPT-App2 — Conventions

> Project-specific conventions. The big rulebook is `CLAUDE.md` (slide design, responsiveness, animation). This file is the SHORT pointer: "if you're new here, what do you need to know to not break things?"

## File naming

- Slide files: `NN-slug.tsx` (e.g., `01-title.tsx`, `02-hook-A-trial-not-answer.tsx`)
- Deck folders: `<deck-id>/` under `src/decks/` — id is kebab-case
- Component files: PascalCase (`UltragenyxLogo.tsx`)
- Utility / hook files: camelCase (`deck-store.tsx`, `useFullscreen.ts`)
- All NEW source files: `.tsx` (components) or `.ts` (utilities). NO new `.jsx` / `.js` under `src/`.

## Branch naming

- `feat/<scope>` — new features
- `fix/<scope>` — bug fixes
- `chore/<scope>` — tooling, deps, config
- `dev` — long-lived preview deploy branch
- `main` — production

## Commit style

Imperative mood, scoped prefix. See `git log --oneline` for examples.

```
feat(auth): shared-password site gate via Vercel Edge Middleware
fix(audience): v5-pharazi is presentation (98 slides), not section
chore(vercel): enable deploys from production branch
```

## When adding a new deck

1. Clone an existing deck via `cp -Rc src/decks/<source> src/decks/<new-id>` (APFS clonefile = ~free)
2. Update `src/decks/registry.ts` to register
3. Update `src/decks/deck-audience.json` with delivered/section/template metadata
4. If reusing slides from another deck, set up an ID map in `notes.ts` (see `pharosIdMap` in `v5-ultragenyx/notes.ts` for the pattern)
5. Audit notes coverage: every non-`_backup/` slide in the manifest needs notes from one of {qp2/cs3/override/mapped-source}

## When backing up slides

- Move existing file to `src/decks/<deck-id>/slides/_backup/{filename}.pre-{reason}.tsx` via `git mv` so history traces cleanly
- Never delete a backup without explicit user approval

## Auth gate (added 2026-05-06)

- Site is perimeter-gated by Vercel Edge Middleware via `middleware.ts` at repo root
- Public routes (whitelisted in middleware matcher): `/login`, `/api/auth/site-*`, `/v/*` (share-link viewer), `/assets/*`, `/_vercel`, `/favicon`, `/robots.txt`, `/sitemap.xml`
- All other routes require a valid `site-session` cookie (HMAC-signed, 30-day Max-Age)
- Local dev: copy `.env.local.example` → `.env.local`, fill `SITE_PASSWORD` + `SITE_SECRET`
- Production: env vars on Vercel project (Production + Preview scopes)
- See `AUTH-SETUP.md` at repo root for the full runbook

## Testing

- Unit / component tests: NONE currently. Don't add Vitest without asking — the project ships fine without it.
- E2E: Playwright. Run `npm run test:e2e` (auto-spins `vercel dev`). UI mode: `npm run test:e2e:ui`.
- Test files in `tests/e2e/*.spec.ts`

## Things NOT to do

- ❌ Don't reconnect base44 SDK — it's intentionally stubbed locally (`src/api/base44Client.js`)
- ❌ Don't import from `src/utils/` — that's base44-scaffold leftover. New utilities go in `src/lib/`
- ❌ Don't push to `main` directly — go through `dev` for preview, then merge
- ❌ Don't commit `.env.local` (already gitignored)
- ❌ Don't rewrite slide files unilaterally — see "Slide File Stewardship" in `CLAUDE.md`
- ❌ Don't use fixed-pt `--fs-*` tokens in v3+ slide content — use `--fs-slide-*` fluid family
- ❌ Don't add buttons/routes that aren't wired (see `~/.claude/rules/quality.md`)

## Things TO do

- ✅ Read `CLAUDE.md` end-to-end before touching slides (non-negotiable per the file's read-first checklist)
- ✅ Run pre-commit greps from CLAUDE.md before declaring slide work done
- ✅ Test slides at 375×812 / 768×1024 / 1280×720 before committing
- ✅ Use `<SlideGrid>` + `<SlideParts>` for body slides; `<CaseHeroDivider>` for case openers
- ✅ Use `--fs-slide-*` fluid tokens for ALL visible slide text
- ✅ When backing up a slide, `git mv` to `_backup/` first

## Constitution overrides

`.zaj/constitution-overrides.md` — none currently. The `_CONSTITUTION.md` from zaj-vibecode applies as-is.
