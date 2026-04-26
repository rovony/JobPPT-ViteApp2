# Full-deck visual QC loop (merck-deck / qp2-seminar)

This is the process to execute **one slide at a time** until a slide passes, then move on. It complements automated sweeps (`audit/sweep-*.mjs`).

## Preconditions

- Dev server: `npm run dev` in `4-Apps/merck-deck` (default `http://localhost:5173`).
- Base URL: `http://localhost:5173/decks/qp2-seminar/s/{slideId}` (see `src/decks/qp2-seminar/manifest.js` for each `id`).

## Per-slide loop (repeat for each manifest entry, 1 → 35)

1. **Navigate** to `.../decks/qp2-seminar/s/{id}` and wait for motion settle (use manifest `export.slideSettleMs[id]` when > `defaultSettleMs`, else ~2.4s).
2. **Capture** a full-viewport screenshot at **1920×1080** and **1366×768** (device scale 1) into e.g. `audit/qc/NN-{id}/before-1920.png`.
3. **Check** (human or scripted):
   - No overflow, clipping, or unreadable body copy (zaj-slides: **14pt effective minimum** for narrative).
   - No `rounded-lg` on bordered “data” panels; hairlines use `--cream-hairline`; square corners unless the deck explicitly allows otherwise.
   - **Accessibility:** `useReducedMotion()` paths still legible; no “empty” affordances.
   - **Content:** public-domain / label-safe / non-leaky (especially regulatory timelines, SEC quotes, and agency-specific phrasing on CS2).
4. If issues exist, **fix code**, then **re-capture** `after-*.png` for the same slide and resolutions.
5. **Stop** on that slide only when before/after review is clean; then increment `NN` and the manifest index.

## Batch automation (optional)

- `audit/sweep-screenshots-v2.mjs` (or the project’s latest sweep) can preflight all 35; use this doc for **targeted re-screens** after a fix to avoid regressions.

## Parallel work grouping (independent enough for separate agents / sessions)

| Track | Focus | Primary paths |
|-------|--------|----------------|
| A | CS1 case divider + lung morph | `slides/05-case-divider.jsx`, `cs1-background/LungsShared.jsx`, `06-case-background.jsx` |
| B | CS1 results pair polish | `11-case-exposure-match.jsx`, `12-case-exposure-response.jsx` |
| C | CS1 impact / bridge | `13-case-impact.jsx`, `14-case-bridge.jsx` |
| D | CS2 India / pillars / response / bridge | `15`–`22`, `PillarArchitecture`, `ResponseLayout`, `ImpactBridgeLayout` |
| E | CS3 | `23`–`29` |
| F | Act IV + closing + thank-you | `30`–`35` |

Tracks touch different files; within a track, do slides **in order** if they share `layoutId` or shared components.

## Notes

- Hard-refresh the browser (or Vite HMR) after large JSX changes so the preview matches the editor.
- If an earlier Task/subagent was interrupted, re-run the same **track** from the table above; do not assume partial work landed.
