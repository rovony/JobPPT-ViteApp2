# JobPPT-App2 — Known Issues & Accepted Tradeoffs

> Things that are intentionally not-yet-fixed, and the reasons. Read before "fixing" something that looks broken — it might be load-bearing-broken.

## Accepted tradeoffs (don't "fix" without conversation)

### Auth: soft-wall, not hard-wall

**Symptom:** anyone can `curl https://jobppt-viteapp2.vercel.app/assets/index-*.js` and grep raw slide text without logging in.

**Why accepted:**
- Slides compile INTO the bundle at build time
- Hard-walling `/assets/*` would block the Login page from booting (its React bundle lives there)
- Closing this gap requires lazy-loading slide content via authenticated API at runtime — bigger refactor than the interview-prep window justifies
- The threat model is "stop casual visitors and search engines from finding the site," not "defeat motivated scrapers"

**When to revisit:** if a deck contains genuinely confidential content (proprietary clinical data — which it shouldn't, per the no-internal-data rule). Until then, soft-wall is fine.

### Base44 backend stub

**Symptom:** `src/api/base44Client.js` returns `[]` and `{stub: true}` for every call.

**Why accepted:**
- Project was scaffolded from base44; backend was never actually deployed
- Local-only dev pattern works for interview prep (one user, one machine)
- AI assistant has 3 retrieval paths — base44 stub falls through to local-RAG via Qdrant or inline-context

**When to revisit:** never, unless multi-user mode is needed. The orphaned `api/auth/{login,register,me}.ts` (email+pwd+JWT+Drizzle) would be the foundation if someone ever wants real backend.

### Email+password auth code orphaned

**Symptom:** `api/auth/login.ts`, `register.ts`, `me.ts` exist but aren't called by the live shared-password flow.

**Why accepted:**
- Already-built; deleting it loses the multi-user foundation
- Doesn't conflict with `api/auth/site-*` (different filenames)
- Drizzle/Neon infra also still wired (see `package.json` deps `drizzle-orm`, `@neondatabase/serverless`, `postgres`)

**When to revisit:** if multi-user mode requested. Until then, leave it.

### Vite `--fs-*` fixed-pt tokens still defined in `index.css`

**Symptom:** `--fs-h1`, `--fs-h2`, etc. exist in CSS even though they're banned in v3+ slide content.

**Why accepted:**
- v1 and v2 decks (`qp2-seminar`, `qp2-seminar-v2`) still use them; deleting the tokens would break those decks
- The ban is on USING them in v3+ slide content, not on their existence
- New `--fs-slide-*` fluid family is added alongside

**When to revisit:** if v1 and v2 decks are deprecated. Run the pre-commit grep from `CLAUDE.md` to catch new violations.

## Open bugs (pending fix)

### Slide 5→6 lung flicker on arrival (qp2-seminar-v3-R2)

**Symptom:** brief opacity flicker on the lung illustration during the slide-5 → slide-6 transition.

**As of 2026-04-23:** still unresolved. Tried inline-SVG, `layout` prop on motion.div, absolute overlay, sync vs popLayout. Residual flicker remains.

**Next avenues to try:**
- Confirm `CaseHeroDivider`'s illustration wrapper isn't mismeasuring on slide-5 EXIT
- `<MotionConfig reducedMotion="always">` or explicit `animate={{ layout: false }}` fallback
- framer-motion 12 vs current 11 (12 reworked layoutId timing)
- Fallback: drop layoutId, use CSS keyframe pullback

**Workaround:** none currently — the flicker is brief and the slide is in qp2-seminar-v3-R2 (delivered), so impact is bounded.

### DeckSource (uploaded PDFs/DOCX) not RAG-indexed

**Symptom:** uploading reference docs to the deck doesn't make them queryable from PresenterAssistant.

**Why:** upload flow goes through the offline-stub base44 client; returns empty file URLs.

**Fix path:** either reconnect a real backend OR add a direct client-side file-text extractor. Latter is lower-friction.

## Stale infrastructure

### `src/utils/index.ts` — base44-scaffold leftover

**Symptom:** small utility file from base44 scaffold.

**Convention:** treat as read-only. Add new utilities to `src/lib/`, never to `src/utils/`. Touch only when reconciling a base44 update (which won't happen because base44 is stubbed).

### `_Admin/` directory (gitignored)

**Symptom:** 792MB+ of binary/PDF/zip files in `JobPPT-App2/_Admin/`.

**Why:** working tree of source materials (sources, inbox, slide drafts, archived versions). Origin in `../JobPPT-App1/`.

**Convention:** never committed (in `.gitignore`). Don't run scripts that traverse it without filtering.

## Config gotchas

### macOS `timeout` doesn't exist

Use `&` + `kill $!` pattern, OR install `coreutils` (`brew install coreutils`) to get `gtimeout`.

### Edit tool fails on `.json` Unicode escapes

Symptom: editing JSON with `'` apostrophe escape sometimes fails.
Workaround: small Python script using `json.dump` for any non-trivial JSON mutation involving punctuation.

### `vite-plugin-svgr` requires `*.svg?react` import suffix

Already declared in `src/vite-env.d.ts`. New `.svg` imports without `?react` will be string URLs, not React components.
