# JobPPT-App2 — Architecture

> Read-once durable doc. Updated only when architecture shifts. For day-to-day state, see `.zaj/state.json` and `.zaj/vibecode/handoff/HANDOFF.md`.

## What this app is

Single-page React app that hosts **multiple presentation decks** as code. Each deck is a tree of React components compiled into the bundle at build time. Used for clinical-pharmacology interview-prep talks (Merck, Gilead, Ultragenyx).

Production: https://jobppt-viteapp2.vercel.app

## Why React-as-deck (vs PowerPoint, vs Reveal.js)

- **React** because slides have animation grammar (framer-motion `layoutId` shared-element morphs across slides, useInView staggered entrances) that's painful to express in PowerPoint and limited in Reveal.
- **Compiled into the bundle** (vs lazy-loaded from CMS) because the audience is one person at a time on a known network — bundle size is fine, latency matters.
- **Vite** for dev-loop speed (HMR on slide edits during prep).

## Top-level layout

```
JobPPT-App2/
├── middleware.ts                     # Vercel Edge — perimeter auth gate
├── api/
│   ├── _lib/site-token.ts            # shared HMAC sign/verify
│   └── auth/
│       ├── site-{login,logout,me}.ts # shared-password auth (live)
│       └── {login,register,me}.ts    # legacy email+password+JWT (orphaned, unused)
├── src/
│   ├── decks/
│   │   ├── registry.ts               # deck registry — register new decks here
│   │   ├── deck-audience.json        # delivered/section/template metadata
│   │   ├── qp2-seminar-v4-2/         # Merck deck (delivered)
│   │   ├── v5-pharazi/               # Gilead deck (delivered)
│   │   ├── pharos-seminar/           # Gilead section
│   │   ├── v5-ultragenyx/            # Ultragenyx (in-flight)
│   │   ├── template-blank/, launch-keynote/
│   │   └── <deck>/{manifest.ts, notes.ts, slides/, _shared/, components/}
│   ├── components/
│   │   ├── deck/                     # DeckRunner, PresenterView, SlideGrid, etc.
│   │   └── devkit/                   # /dev catalog (tokens, patterns, primitives)
│   ├── pages/
│   │   ├── Home.tsx, Reading.tsx, AudienceQA.tsx
│   │   └── auth/{Login,Register}.tsx
│   ├── lib/                          # active home for runtime utilities
│   ├── utils/                        # base44-scaffold leftover (effectively read-only)
│   └── api/base44Client.js           # OFFLINE STUB — do not reconnect
├── tests/e2e/                        # Playwright specs
├── playwright.config.ts
├── CLAUDE.md                         # slide-design rulebook (large, read-first)
├── .zaj/                             # project state + handoff (this layer)
└── .ai/                              # architecture + known-issues (this layer)
```

## Auth architecture (added 2026-05-06)

```
                          ┌───────────────────────────────────────┐
                          │  Vercel Edge Middleware (middleware.ts)│
                          │  Runs on EVERY request matching matcher│
                          └────────────────┬──────────────────────┘
                                           │
            ┌──────────────────────────────┼──────────────────────────────┐
            │                              │                              │
            ▼                              ▼                              ▼
    Whitelisted (pass)            Has valid cookie?                  No cookie
    /login                        verifySiteToken(...)               or invalid
    /api/auth/site-*                       │                              │
    /v/* (share links)                     │                              ▼
    /assets/* (soft-wall)         ┌────────┴────────┐         307 → /login?next=<path>
    /_vercel, /favicon, robots    │                 │
                                  ▼                 ▼
                                 yes               no
                              let through      → /login redirect
```

Two runtimes share one HMAC implementation:
- **Edge** (`middleware.ts`): inlined `verifySiteToken` (edge bundles can't import from `src/` or `api/`)
- **Node** (`api/auth/*`): imports from `api/_lib/site-token.ts`

Both use Web Crypto API (works in both runtimes). HMAC-SHA256 over the constant string `"authed"`, signed with `SITE_SECRET`. Output is base64url. Cookie is HTTPOnly + SameSite=Lax + 30-day Max-Age.

**Why HMAC over JWT:** no library needed (Web Crypto is built-in to both edge and node runtimes), no `jsonwebtoken` bundle weight on edge. Single shared secret, easy to rotate.

**Why Edge Middleware over per-route guards:** the deck content compiles INTO the JS bundle. Without an edge gate, anyone can `curl /assets/index-*.js` and grep raw slide text. Edge enforcement blocks the bundle download itself.

**Soft-wall tradeoff:** `/assets/*` IS whitelisted (so login page can boot). Motivated scrapers can still grep the bundle. Accepted because hard-wall would require lazy-loading slide content via authenticated API at runtime — too-much-refactor for the interview-prep window. Documented in `KNOWN_ISSUES.md`.

## Deck architecture

Each deck folder follows this shape:

```
<deck-id>/
├── manifest.ts          # array of {id, slug, component, layout, ...}
├── notes.ts             # speaker notes keyed by slide.id
├── qa.ts                # anticipated Q&A keyed by slide.id (optional)
├── reading/             # markdown reading material (optional)
├── slides/
│   ├── 01-title.tsx
│   ├── 02-hook-A.tsx
│   ├── ...
│   └── _backup/         # archived prior versions
├── _shared/             # cases.ts, framework.ts, deck-specific shared state
└── components/          # deck-specific components (e.g., UltragenyxLogo)
```

Slides are React components rendered inside `<DeckRunner>` (`src/components/deck/DeckRunner.tsx`), which provides:
- `<LayoutGroup id>` for shared-element FLIP morphs
- `<AnimatePresence>` for slide transitions
- Path-segment routing (`/decks/:deckId/s/:slideIndex/[speaker|audience]`)

## Standard layout system (v3+ opt-in)

Decks set `standardLayout.enabled = true` in their manifest. Slides then receive auto-rendered eyebrow / footer / page-number chrome via `<DeckLayout>`. v1 and v2 decks deliberately don't opt in.

Slot resolution rule (in `src/components/deck/layouts/DeckLayout.tsx`):
- `slideValue === undefined` → inherit deck-level slot
- `slideValue === null` → hide this slot for this slide
- `slideValue === <value>` → override deck-level

## Speaker notes / Q&A / Reading material

Each surface is keyed by `slide.id`:
- **`notes.ts`** — markdown with `## Spoken / ## Cues / ## Bridge` sections, parsed by `parseStructuredContent.ts`
- **`qa.ts`** — markdown with `## Q1: ... ## Q2: ...` sections
- **`reading/index.ts` + `reading/*.md`** — full-text reading material with TOC, attached to deck or specific slide(s)

Surfaced via:
- Modal in PresenterView (`ReadingMaterialPane`)
- Full-page route `/decks/:deckId/reading[/:slug]`

## State management

- **`deck-store.tsx`** (zustand) — current slide, mode (Normal/SlideShow/Presenter/DualScreen), keyboard nav, fullscreen state
- **`AuthContext.tsx`** — auth state, polls `/api/auth/site-me` on boot
- **`usePresenterLayout`** — column visibility/order in PresenterView (localStorage)
- **`useSpeakerNotes` / `useAnticipatedQA`** — localStorage edits + RAG re-index hooks
- **`useDeckOverrides`** — drag-drop reorder (drives presentation order, NOT just Overview)

## AI assistant (PresenterAssistant)

Live co-pilot for on-stage. Three retrieval paths (base44 → local-RAG via Qdrant → inline-context fallback). Two modes (LIVE = stage-deliverable answers; REHEARSE = fuller prep answers). See `CLAUDE.md` "AI Assistant" section for full spec — DO NOT reconnect base44 unless asked.

## Hosting / deploy

- **Vercel** — auto-deploys on push
- `main` → production (`jobppt-viteapp2.vercel.app`)
- `dev` → preview branch deploys
- Env vars set on Vercel project: `SITE_PASSWORD`, `SITE_SECRET` (Production + Preview)
- Local dev: `npm run dev` (Vite, port 5173) OR `vercel dev` (port 3000) when testing edge middleware + serverless functions

## Test strategy

- **Unit:** none (deliberate — slide content is the product, not units)
- **E2E:** Playwright (`@playwright/test`), specs in `tests/e2e/*.spec.ts`
- **Visual / screenshot regression:** none yet — `audit/` tree is for manual capture scratch, see `.gitignore`

## Things to read next

- `CLAUDE.md` — slide-design rulebook (large, opinionated, MANDATORY before touching slides)
- `.ai/KNOWN_ISSUES.md` — open issues + tradeoffs
- `.zaj/CHANGELOG.md` — recent decision history
- `.zaj/vibecode/handoff/HANDOFF.md` — current session state
- `AUTH-SETUP.md` (repo root) — auth runbook
