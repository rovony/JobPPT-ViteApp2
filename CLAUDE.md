# Merck Deck App — Claude Code Instructions

React/Vite fork of a base44 scaffold. QP2-seminar presentation deck for
the Merck Senior-Director interview. Deployed on Vercel from GitHub
(`rovony/merck-deck`): `main` → production, `dev` → preview.

## Stack

- **React 18 + Vite 6** + Tailwind (postcss) + shadcn/ui (Radix primitives)
- **framer-motion** for slide transitions + shared-element layoutId morphs
- **react-router-dom v6** (v7 future flags enabled)
- **base44 SDK** — inherited from scaffold, used for admin/export paths
- **html-to-image** (NOT html2canvas — bug with `color-mix()` CSS)
- **pptxgenjs** + **jspdf** — deck export

## Layout / Design Tokens

- All CSS custom properties live in `src/styles/*.css` — NEVER hardcode hex.
- Core tokens: `--cream`, `--cream-muted`, `--cream-faint`, `--panel`,
  `--coral`, `--amber`, `--cyan`, `--sage`, `--violet`, `--case` (case
  study color, defaults to `--coral`)
- Fonts: IBM Plex Sans (`--font-display`, `--font-body`), IBM Plex Mono
  (`--font-mono`)
- Spacing scale: `var(--space-1..8)` — don't invent pixel values
- Card/tile font sizes: use the `--fs-card-{numeral|title|body|label|meta|hero-num|quote}`
  family — do NOT inline raw `clamp()` literals in slide JSX

### Case-color discipline (P5 contract)

Coral, Cyan, Violet ALWAYS mean CS1, CS2, CS3 across this deck:
- `--coral` ⇄ Case Study 1 (pediatric PAH / ambrisentan)
- `--cyan`  ⇄ Case Study 2 (oncology / Lynparza-style asymmetry)
- `--violet`⇄ Case Study 3 (rare disease / CMD pipeline)

`--amber` and `--sage` are deck-default ink accents (approval markers,
secondary highlights) and may NOT encode case meaning. Each slide carries
≤3 accent colors with assigned meanings (Brief §6). When a closing /
breadth slide assigns colors to non-case categories (e.g. therapeutic
areas, leadership principles), avoid coral/cyan/violet unless the
category genuinely refers back to the corresponding case.

## Deck Architecture

```
src/
├── decks/
│   ├── registry.js             # deck registry (add new decks here)
│   └── qp2-seminar/            # the active deck
│       ├── index.js            # slide array
│       ├── themes.js           # 5 QP2 themes (amber/cyan/sage/violet/coral)
│       └── slides/
│           ├── 01-…            # individual slide JSX
│           └── cs1-background/ # case-study shared components
├── components/
│   └── deck/
│       ├── DeckRunner.jsx      # AnimatePresence + LayoutGroup root
│       ├── SlideFrame.jsx      # eyebrow/headline/footer chrome
│       ├── SlideTransition.jsx # per-slide fade/3D wrapper
│       └── patterns/           # reusable slide patterns
│           ├── CaseBodyCard.jsx
│           ├── CaseHeroDivider.jsx
│           └── …
└── lib/
    ├── deck-export.js          # PDF/PNG export via html-to-image
    ├── motion.js               # reduced-motion hook
    └── slide-transitions.js    # 3D transition presets
```

## Critical Patterns

### Shared-element transitions (layoutId)

- `<LayoutGroup id="qp2-deck-layout">` wraps AnimatePresence in DeckRunner
- Both source AND destination slides render a motion.div with the same
  `layoutId` + `layout` prop to opt into FLIP morph
- Each SlideTransition wrapper has `layout` prop so nested layoutIds
  get ancestor tracking
- **Must NOT put shared element inside a grid cell** whose width depends
  on siblings — layout thrash produces transient bbox → flicker. Use
  absolute overlay with `absolute inset-0 flex` (see slide 06b lung).

### Slide transition defaults

- Incoming slide: `initial: { opacity: 1 }` (no enter-fade). Only the
  EXIT fades. Prevents shared elements from inheriting low opacity
  during the layoutId morph.
- 3D presets (cube/flip/depth/pan) DON'T participate in layoutId — they
  get their own perspective container.

### CaseBodyCard

- Left 3px coral accent bar (scaleY animates on mount)
- Meta eyebrow: `NN · EYEBROW` in IBM Plex Mono, 0.22em letter-spacing,
  coral on right side of the separator
- `visual` prop = right-column illustration (slide 07+). On slide 06 the
  lung is a separate absolute overlay, so Card 02's inline timeline
  lives INSIDE the body (after CommercialSplit) with a hairline
  separator and mono label.
- `CardHighlight` span uses `#F4B382` color on `--coral-wash` background,
  `white-space: nowrap` to keep tinted phrase unbroken across line breaks

## URL State

- `/decks/:deckId/s/:slideId` — canonical route
- `?presenter=1` — presenter mode query flag
- Legacy `/Deck?id=X` redirects to `/decks/X` via `<Navigate replace />`

## Git / Deploy

- Remote: `rovony/merck-deck`
- Branches: `main` (prod) + `dev` (preview)
- User email must be `zaj.commerce@gmail.com` (the rovony-verified email;
  `zajalyapps@gmail.com` is rejected by GitHub email privacy)
- Vercel auto-deploys on push; `main` → production URL, `dev` → preview URL

## Slide backups — `_backup/` convention

When a friend's-prompt or major rewrite replaces an existing slide's content, **first** move the existing file to `src/decks/qp2-seminar/slides/_backup/{filename}.pre-{reason}.jsx` using `git mv` so history traces cleanly. Then write the new content at the original path.

The `_backup/` folder is the escape hatch for "this new version is worse, rewind me":
- `_backup/11d-case-fit.pre-friend-prompt-4.jsx` — the real-data custom-SVG pcVPC before the Recharts placeholder swap
- Restore via `git mv _backup/11d-case-fit.pre-friend-prompt-4.jsx 11d-case-fit.jsx`

Never delete a backup without explicit user approval. These are cheap to keep and invaluable the one time you need them.

## Request queueing — don't abandon in-progress work

When the user sends a new ask while you're mid-task:

1. **Finish the current in-progress task first** — don't jump to the new ask and leave the old one half-done. Half-finished work accumulates faster than you can clean it up.
2. **Queue the new ask at the END of your TodoWrite list** — even if it feels urgent, it goes to the end so the in-progress batch gets committed as an atomic unit.
3. **If the new ask invalidates the in-progress work** (user says "never mind, do X instead"), THEN stop, discard in-flight changes explicitly, and start the new ask.
4. **When in doubt, acknowledge both**: "Queued [new ask] — finishing [in-progress] first, then will handle it." Don't silently switch priorities.

This matters because partial edits across 2–3 files without a commit leave the app in a broken build state — which bites the next time the user reloads.

## Workspace Conventions (from JobHunt2026 CLAUDE.md)

- **Response footer mandatory** on every non-trivial response:
  `### TL;DR` + `### Actions` + (`### Questions` if any)
- **Plan FIRST, code SECOND** for multi-file changes
- **Small diffs** — one file → verify → next. Atomic commits.
- **Never commit proprietary data** — Servier/GSK numbers blocked by `.gitignore`
- **Filename / folder hygiene** — Title-Case-With-Hyphens, numbered prefixes
  for ordered folders
- **Layout-with-coordinates rule**: for any SVG / absolute-positioned
  layout, maintain a bounding-box audit comment at the top of the file,
  update it on every coordinate change, verify by actual render (not code
  review), re-audit after moving any single element. See
  `~/.claude/rules/frontend.md § Chart, SVG & Absolute-Layout Discipline`.

## Known Tech Debt

- **Slide 5→6 lung flicker on arrival** (as of 2026-04-23). Tried:
  inline-SVG (kills decode flicker), `layout` prop on motion.div for
  pre-paint FLIP tracking, absolute overlay on slide 6 (matches v0 +
  HTML structurally), sync vs popLayout AnimatePresence mode. Residual
  flicker remains. Next avenue when resumed:
  - Confirm CaseHeroDivider's illustration wrapper isn't mismeasuring
    on slide-5 EXIT (it has its own opacity animation — if exit state
    animates the wrapper's opacity/position, the FROM-bbox of the
    layoutId match reads the animating transform, not the static bbox)
  - Consider using `<MotionConfig reducedMotion="always">` or explicit
    `animate={{ layout: false }}` fallback path for direct 5→6 nav vs
    fresh slide-6 mount
  - Investigate running framer-motion 12 vs current 11 (12 reworked
    layoutId timing)
  - Fallback: drop layoutId entirely and do CSS keyframe pullback like
    HTML version (lung at fixed px coords on both slides + CSS
    `@keyframes` for the 540×700 → 400×560 morph)
- Port branded lung SVG to slide 5 (currently only inlined; slide 5
  entrance animation works but could be tuned)

## Commands

```sh
npm run dev        # vite dev server (localhost:5173)
npm run build      # vite build → dist/
npm run lint       # eslint --quiet
npm run typecheck  # tsc -p jsconfig.json
npm run preview    # vite preview (serve built dist/)
```
