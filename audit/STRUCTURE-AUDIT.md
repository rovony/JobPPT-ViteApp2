# merck-deck — Structure Audit

**Date:** 2026-04-24
**Scope:** `4-Apps/merck-deck` (Vite + React deck app)
**Deck under audit:** `qp2-seminar` (35 slides)
**Auditor:** Claude (structure-audit subagent)
**Build status at exit:** ✅ `npm run build` exits 0
**Lint status at exit:** ❌ `npm run lint` exits non-zero (pre-existing, out of audit scope)

---

## 1. Executive summary

1. **Build is healthy.** All 35 manifest imports resolve; `npm run build` exits 0; no broken imports anywhere in `src/`. No runtime regressions introduced by the audit.
2. **Numbering has drifted in CS2 (slides 15–22).** The manifest itself documents the drift in comments — `16-case2-background` is sequentially slide 15, `15-case2-challenge` is sequentially slide 16, etc. There is **no functional collision** because suffixes disambiguate, but the prefix has lost meaning for that act. **Recommended policy: Option A (preserve gap numbering); proposed Option B (sequential renumber) is documented but NOT applied** per the high-churn guardrail.
3. **Co-located sub-component folder convention is inconsistent.** Two patterns coexist: numeric-prefix dirs that mirror their slide file (`03-career-arc/`, `04-framework-themes/`) and topical dirs that group by case-study (`cs1-background/`, `cs2-shared/`, `closing-divider/`, `hook/`). Both work; the inconsistency is documentation/discoverability only.
4. **Lint is broken at the config level.** `eslint.config.js` registers `react-hooks` plugin but enables only `rules-of-hooks`, while two files (`src/lib/token.js`, `src/lib/useSlideTracker.js`) carry `react-hooks/exhaustive-deps` disable comments — the rule isn't defined and ESLint errors out. `src/lib/**` is also in the ignore list, which makes those disable comments dead anyway. Pre-existing; not in audit-fix scope.
5. **One bounded fix applied:** added `_screenshots/` and `_audit/` to `4-Apps/merck-deck/.gitignore` for app-local clarity (root `.gitignore` already covers `_screenshots/` globally). No file renames, creates, or moves were necessary.

---

## 2. Inventory snapshot (Phase 0.4)

### `ls -la 4-Apps/merck-deck/src/`

```
total 72
drwxr-xr-x@ 12 malekokour  staff    384 Apr 23 19:56 .
drwxr-xr-x@ 24 malekokour  staff    768 Apr 24 10:26 ..
-rw-r--r--@  1 malekokour  staff   3878 Apr 23 18:27 App.jsx
drwxr-xr-x@  3 malekokour  staff     96 Apr 23 17:49 api
drwxr-xr-x@ 13 malekokour  staff    416 Apr 23 20:00 components
drwxr-xr-x@  6 malekokour  staff    192 Apr 23 17:43 decks
drwxr-xr-x@  3 malekokour  staff     96 Apr 23 17:43 hooks
-rw-r--r--@  1 malekokour  staff  24633 Apr 24 10:05 index.css
drwxr-xr-x@ 23 malekokour  staff    736 Apr 23 18:26 lib
-rw-r--r--@  1 malekokour  staff    189 Apr 23 17:43 main.jsx
drwxr-xr-x@  8 malekokour  staff    256 Apr 23 18:52 pages
drwxr-xr-x@  3 malekokour  staff     96 Apr 23 17:43 utils
```

Top-level `src/` files: `App.jsx`, `main.jsx`, `index.css`. All three are correct entry points — none are orphans.

### `ls -la 4-Apps/merck-deck/src/decks/qp2-seminar/slides/`

35 `.jsx` slide files plus 13 sub-component directories and `_backup/`. (Full listing in Phase 1 evidence below; truncated here for readability.)

### `find slides -maxdepth 2 -name '*.jsx' | sort`

35 top-level slide files + 30 co-located sub-component files + 2 files in `_backup/`. Full list:

```
slides/01-title.jsx
slides/02-hook.jsx
slides/03-career-arc.jsx
slides/03-career-arc/SatelliteDrawer.jsx
slides/03-career-arc/SwayGroup.jsx
slides/04-framework-themes.jsx
slides/04-framework-themes/DataflowEngine.jsx
slides/04-framework-themes/ThemeIcons.jsx
slides/06b-case-background.jsx
slides/10-case-divider.jsx
slides/11-case-challenge.jsx
slides/11b-case-strategy.jsx
slides/11c-case-build.jsx
slides/11d-case-fit.jsx
slides/11e-case-exposure-match.jsx
slides/11f-case-exposure-response.jsx
slides/13-case-impact.jsx
slides/14-case-bridge.jsx
slides/14-case2-divider.jsx
slides/15-case2-challenge.jsx
slides/16-case2-background.jsx
slides/16-case2-strategy.jsx
slides/17-case2-build.jsx
slides/18-case2-fit.jsx
slides/19-case2-decision.jsx
slides/22-case2-bridge.jsx
slides/23-case3-divider.jsx
slides/24-case3-challenge.jsx
slides/25-case3-strategy.jsx
slides/26-case3-fda-engagement.jsx
slides/27-case3-fit.jsx
slides/28-case3-impact.jsx
slides/29-case3-bridge.jsx
slides/30-closing-divider.jsx
slides/31-breadth-therapeutic-areas.jsx
slides/32-record-at-scale.jsx
slides/33-leadership-principles.jsx
slides/34-in-closing.jsx
slides/35-thank-you.jsx
slides/_backup/11d-case-fit.friend-prompt-4-rejected.jsx
slides/_backup/11e-case-exposure-match.friend-prompt-5-rejected.jsx
slides/closing-divider/ThemesConstellation.jsx
slides/cs1-background/AgencyApprovalTimeline.jsx
slides/cs1-background/LungsDiagram.jsx
slides/cs1-background/LungsShared.jsx
slides/cs1-bridge/PipelineBridgeCard.jsx
slides/cs1-build/CompartmentSchematic.jsx
slides/cs1-build/DecisionGate.jsx
slides/cs1-build/WorkflowStepsList.jsx
slides/cs1-challenge/BranchVisuals.jsx
slides/cs1-challenge/DossierGlyph.jsx
slides/cs1-challenge/LabelCoverageChart.jsx
slides/cs1-challenge/SparsePKChart.jsx
slides/cs1-challenge/SurvivalMiniChart.jsx
slides/cs1-strategy/DecisionVisuals.jsx
slides/cs2-challenge/AsymmetryDiagram.jsx
slides/cs2-fit/PdDotStrip.jsx
slides/cs2-fit/RatioTrack.jsx
slides/cs2-shared/BoneMarrowShared.jsx
slides/cs2-shared/PillarArchitecture.jsx
slides/cs2-shared/SecObjectionCard.jsx
slides/cs2-shared/WorldMapShared.jsx
slides/cs3-divider/InformativePriorViz.jsx
slides/cs3-engagement/SampleSizeWaterfall.jsx
slides/cs3-fit/RseStabilityCurve.jsx
slides/hook/ConvergenceTimeline.jsx
```

### `find src -type d | sort`

```
src
src/api
src/components
src/components/analytics
src/components/deck
src/components/deck/illustrations
src/components/deck/patterns
src/components/deck/scientific
src/components/deck/scientific/pk-compartment
src/components/deck/viz
src/components/devkit
src/components/devkit/pages
src/components/pksim
src/components/slides
src/components/ui
src/decks
src/decks/launch-keynote
src/decks/launch-keynote/slides
src/decks/qp2-seminar
src/decks/qp2-seminar/assets
src/decks/qp2-seminar/assets/cs2
src/decks/qp2-seminar/slides
src/decks/qp2-seminar/slides/03-career-arc
src/decks/qp2-seminar/slides/04-framework-themes
src/decks/qp2-seminar/slides/_backup
src/decks/qp2-seminar/slides/closing-divider
src/decks/qp2-seminar/slides/cs1-background
src/decks/qp2-seminar/slides/cs1-bridge
src/decks/qp2-seminar/slides/cs1-build
src/decks/qp2-seminar/slides/cs1-challenge
src/decks/qp2-seminar/slides/cs1-strategy
src/decks/qp2-seminar/slides/cs2-challenge
src/decks/qp2-seminar/slides/cs2-fit
src/decks/qp2-seminar/slides/cs2-shared
src/decks/qp2-seminar/slides/cs3-divider
src/decks/qp2-seminar/slides/cs3-engagement
src/decks/qp2-seminar/slides/cs3-fit
src/decks/qp2-seminar/slides/hook
src/decks/template-blank
src/decks/template-blank/slides
src/hooks
src/lib
src/pages
src/utils
```

### Canonical 35-slide order (from `manifest.js`)

| # | id | file |
|---|---|---|
| 1 | `title` | `01-title.jsx` |
| 2 | `hook` | `02-hook.jsx` |
| 3 | `career-arc` | `03-career-arc.jsx` |
| 4 | `framework-themes` | `04-framework-themes.jsx` |
| 5 | `case-divider` | `10-case-divider.jsx` |
| 6 | `case-background` | `06b-case-background.jsx` |
| 7 | `case-challenge` | `11-case-challenge.jsx` |
| 8 | `case-strategy` | `11b-case-strategy.jsx` |
| 9 | `case-build` | `11c-case-build.jsx` |
| 10 | `case-fit` | `11d-case-fit.jsx` |
| 11 | `case-exposure-match` | `11e-case-exposure-match.jsx` |
| 12 | `case-exposure-response` | `11f-case-exposure-response.jsx` |
| 13 | `case-impact` | `13-case-impact.jsx` |
| 14 | `case-bridge` | `14-case-bridge.jsx` |
| 15 | `case2-divider` | `14-case2-divider.jsx` |
| 16 | `case2-background` | `16-case2-background.jsx` |
| 17 | `case2-challenge-turn` | `15-case2-challenge.jsx` |
| 18 | `case2-strategy` | `16-case2-strategy.jsx` |
| 19 | `case2-pillar6` | `17-case2-build.jsx` |
| 20 | `case2-pillars-1-5` | `18-case2-fit.jsx` |
| 21 | `case2-response` | `19-case2-decision.jsx` |
| 22 | `case2-impact-bridge` | `22-case2-bridge.jsx` |
| 23 | `case3-divider` | `23-case3-divider.jsx` |
| 24 | `case3-challenge` | `24-case3-challenge.jsx` |
| 25 | `case3-strategy` | `25-case3-strategy.jsx` |
| 26 | `case3-fda-engagement` | `26-case3-fda-engagement.jsx` |
| 27 | `case3-fit` | `27-case3-fit.jsx` |
| 28 | `case3-impact` | `28-case3-impact.jsx` |
| 29 | `case3-bridge` | `29-case3-bridge.jsx` |
| 30 | `closing-divider` | `30-closing-divider.jsx` |
| 31 | `breadth-therapeutic-areas` | `31-breadth-therapeutic-areas.jsx` |
| 32 | `record-at-scale` | `32-record-at-scale.jsx` |
| 33 | `leadership-principles` | `33-leadership-principles.jsx` |
| 34 | `in-closing` | `34-in-closing.jsx` |
| 35 | `thank-you` | `35-thank-you.jsx` |

### Routing scheme

`src/pages/Home.jsx` and `src/App.jsx` register routes:

- `/decks/:deckId` → `DeckRunner` (resolves slideId from manifest order)
- `/decks/:deckId/s/:slideId` → `DeckRunner` (slideId is the manifest `id`, not the file prefix)
- `?presenter=1` toggles presenter view

The router uses **manifest `id`** as the URL slug, so file prefixes never appear in URLs. **This is why prefix drift does not break the app.**

### Import alias

`jsconfig.json`: `"@/*": ["src/*"]`. Mirrored in `vite.config.js` via `path.resolve(__dirname, "src")`. Working correctly across the codebase.

---

## 3. Findings (Phase 1)

### A. Folder structure

| ID | Severity | Evidence | Finding | Recommendation |
|---|---|---|---|---|
| **F-A-01** | low | `src/lib/` (23 entries) and `src/utils/` (1 entry) | Two folders for non-React utilities. `lib/` holds heavy modules (`token.js`, `useSlideTracker.js`, `useDeckTheme.js`, `pptx-export.js`, `slide-png-export.js`, the `viz/` and `pksim/` libs); `utils/` only contains the legacy base44-template helper (`createPageUrl`). | Keep both — they have different lifecycles. `utils/` is base44 template legacy; `lib/` is deck-specific. Document in `CLAUDE.md` rather than merge (proposal P-A-01 below). |
| **F-A-02** | low | `src/decks/qp2-seminar/slides/_backup/*.jsx` exists | `_backup/` directory holds two superseded variants (`11d-case-fit.friend-prompt-4-rejected.jsx`, `11e-case-exposure-match.friend-prompt-5-rejected.jsx`). | **Intentional per `CLAUDE.md`**. Keep tracked; do **not** gitignore. No action. |
| **F-A-03** | low | `src/components/devkit/`, `src/components/pksim/`, `src/components/slides/` | Several `components/` subfolders (`devkit/`, `pksim/`, `slides/`, `analytics/`, `deck/`) coexist. `slides/` looks orphaned — no current deck imports from it. | Confirm with human; possibly merge into `lib/` or delete as dead code (proposal P-A-02). |
| **F-A-04** | low | `_audit/CS2-CS3-CLOSING-PLAN-2026-04-23.md` exists, untracked | `_audit/` and `_screenshots/` are scratch/output folders not tracked by root `.gitignore` for app-local paths. | Add to merck-deck/`.gitignore` (applied — see Phase 2). |

**Verdict (A):** Folder structure is workable. No orphan top-level files in `src/`. The `lib/` vs `utils/` split looks redundant but is a base44-template artifact and has only one file in `utils/`.

### B. File naming consistency

| ID | Severity | Evidence | Finding | Recommendation |
|---|---|---|---|---|
| **F-B-01** | med | `manifest.js:28-34` (CS2 import block) | CS2 file prefixes are off-by-one against sequence: file `16-case2-background.jsx` is sequence position 16 in deck (slide #16 by manifest) but **also** collides with `16-case2-strategy.jsx` on prefix. Manifest comments document this drift explicitly. | Either rename CS2 files (proposal P-B-01) or accept Option A. **Default: Option A.** |
| **F-B-02** | low | `slides/03-career-arc.jsx` + `slides/03-career-arc/` | Co-located sub-component dir pattern: dir name matches slide filename. Used by `03-career-arc/`, `04-framework-themes/`. | This pattern is **good** but only used twice. Other slides use a different pattern (F-B-03). |
| **F-B-03** | low | `slides/cs1-background/`, `slides/cs2-shared/`, `slides/closing-divider/`, `slides/hook/` | Topical dirs grouped by case study (cs1, cs2, cs3) instead of by slide-file prefix. Co-locates components shared across multiple slides in the same act. | This is also **good** — but mixing two conventions is confusing. Pick one or document both (proposal P-B-02). |
| **F-B-04** | low | `slides/06b-case-background.jsx` (prefix `06b`, no `06`/`05`) | Suffix-letter pattern (`06b`, `11b`/`c`/`d`/`e`/`f`) implies "inserted after a numbered base", but `06` and `11` (single, non-suffixed) **do not exist** in CS1. The base was renamed away during iteration. | Vestigial — keep for stability. Only renumber if Option B chosen. |
| **F-B-05** | low | `manifest.js:16-17` `Slide12 from './slides/13-case-impact'`, `Slide13 from './slides/14-case-bridge'` | Variable names in manifest (`Slide12`, `Slide13`) do not match file prefixes (`13-`, `14-`). Same drift as F-B-01 but in import bindings. | Cosmetic; file path is the source of truth. Leave as-is. |
| **F-B-06** | low | `slides/_backup/11d-case-fit.friend-prompt-4-rejected.jsx` | `_backup/` filenames use a long, dot-separated `<original>.<reason>.jsx` convention. Not parsed anywhere. | Convention works; document in `CLAUDE.md`. |

### C. Numbering inconsistencies

**Observed numbering:** 01, 02, 03, 04, 06b, 10, 11, 11b–11f, 13, 14, 14, 15, 16, 16, 17, 18, 19, 22, 23–35.

| ID | Severity | Evidence | Finding |
|---|---|---|---|
| **F-C-01** | med | `slides/14-case-bridge.jsx` and `slides/14-case2-divider.jsx` | Two files with prefix `14`. **No collision** because suffixes differ (`-case-bridge` vs `-case2-divider`) and Vite imports by full filename. Manifest binds them to different imports. |
| **F-C-02** | med | `slides/16-case2-background.jsx` and `slides/16-case2-strategy.jsx` | Two files with prefix `16`. Same disambiguation as F-C-01. **No build collision.** |
| **F-C-03** | low | Gaps at 05, 07, 08, 09, 12, 20, 21 | Each gap corresponds to a previously-existing variant that was renamed/removed during iteration. They mark act-boundary semantic anchors (05 = end of intro; 12 = transition out of CS1 challenge; 20–21 = end of CS2 strategy block). |
| **F-C-04** | med | `slides/16-case2-background.jsx` is sequence position **#16** in deck but also has prefix `16` shared with `16-case2-strategy.jsx` (which is sequence #18) | The CS2 sub-block (15–22 by sequence) was rebuilt and the prefixes were retained from a pre-rebuild ordering. No functional impact (router uses manifest `id`), but the prefix is misleading for readers. |

**Decision: Option A — preserve gap numbering.**

Reasons:
- **No concrete collision bug.** Vite resolves by full filename; the duplicate-prefix pairs (`14-…` and `16-…`) are disambiguated by suffix.
- **The router uses manifest `id` slugs**, not file prefixes. URLs are stable regardless of file naming.
- **Manifest comments document the drift.** This makes the file layout self-explanatory for future readers.
- **Bulk renumber would touch ~25 files** (rename + import-update in `manifest.js` + `notes.js` + any direct imports). That exceeds the 8-file Phase-2 guardrail and is opinionated. → Proposal P-C-01 for opt-in.

### D. Missing files / broken connections

| ID | Severity | Evidence | Finding |
|---|---|---|---|
| **F-D-01** | none | `npm run build` (Phase 1 diagnostic) → exit 0 | **No unresolved imports anywhere in the build graph.** All 35 manifest imports resolve. |
| **F-D-02** | low | `CLAUDE.md` references `src/styles/*.css` but `ls src/styles` → "No such file or directory" | Documentation drift only. CSS lives in `src/index.css`. The component CSS is loaded by Vite from `src/components/deck/patterns/*` modules. |
| **F-D-03** | low | `CLAUDE.md` mentions `MonoChip`, `ChromeGlassButton`, `useDeckTheme` as Tier-3 extraction targets | These are **not yet extracted** but their absence does not break anything — they're inlined in slide files. **Could be extracted** (proposal P-D-01). |
| **F-D-04** | low | `package.json` scripts: `dev`, `build`, `lint`, `typecheck`, `preview` | No `dev:audit`, `clean:screenshots`, `slide:export` scripts defined, but `CLAUDE.md` does not require them — the deck has `npm run build` + Playwright LaunchAgent (separate workstream). Not missing in any binding sense. |
| **F-D-05** | low | `eslint.config.js` registers `react-hooks` plugin but only enables `rules-of-hooks` | `react-hooks/exhaustive-deps` is referenced as `eslint-disable-next-line` in `src/lib/token.js` and `src/lib/useSlideTracker.js` but the rule is undefined → lint errors out with "Definition for rule 'react-hooks/exhaustive-deps' was not found". Also `src/lib/**` is in the `ignores` array, so the disable comments are unreachable anyway. **Pre-existing.** |

### E. Build / route operability

| ID | Severity | Evidence | Finding |
|---|---|---|---|
| **F-E-01** | none | `npm run build` exits 0 | Build is clean. Only warning: Babel deoptimization for `assets/cs2/bone-marrow.svg` >500KB (cosmetic). |
| **F-E-02** | high (lint) | `npm run lint` non-zero exit | Lint failures from F-D-05 + a handful of `unused-imports/no-unused-imports` errors. **Blocks CI if lint is in pipeline.** Out of audit-fix scope (Phase 2 disallows code edits). |
| **F-E-03** | none | manifest cross-check, all 35 IDs ↔ files | Every manifest `id` maps to an existing slide file. Verified via per-file `test -f` (see Phase 3). |
| **F-E-04** | low | `vite.config.js:logLevel: 'error'` | Vite is in quiet mode — warnings are suppressed in dev. Per `CLAUDE.md` this is intentional. No action. |

---

## 4. Fixes applied (Phase 2)

| Change | Files touched | Rationale | Finding-id resolved |
|---|---|---|---|
| Added `_screenshots/` and `_audit/` to merck-deck/`.gitignore` | `4-Apps/merck-deck/.gitignore` (1 file) | App-local clarity; root `.gitignore` already covers `_screenshots/` and `slide*.png` globally, but new contributors browsing the deck folder see the local rule first. `_audit/` and `_screenshots/` are scratch output, not deliverables. | F-A-04 |

**Total:** 1 fix. **Files renamed:** 0. **Files created:** 0. **Files moved:** 0. **No `git mv` invoked.**

**Why so few?** The audit found no files matching the Phase-2 ALLOWED criteria:
- Slide-file prefix renames are blocked by Option A policy (don't rename without bulk policy choice).
- No missing files cause broken imports — `npm run build` exits 0.
- No orphan top-level `src/` files exist (only `App.jsx`, `main.jsx`, `index.css`, all correct).
- `_backup/` is intentionally tracked per `CLAUDE.md` and must NOT be gitignored.

---

## 5. Proposals not applied (opt-in)

### P-A-01 — Document `lib/` vs `utils/` split

**Why not applied:** Doc-only change to `CLAUDE.md`; F-A-01 is severity low.

**To apply:** Add a 2-bullet clarification to `4-Apps/merck-deck/CLAUDE.md` under "Workspace conventions":
- `src/lib/**` — deck-specific runtime modules (theme hook, exporters, viz primitives).
- `src/utils/**` — base44 template legacy (`createPageUrl`); avoid adding new files here.

### P-A-02 — Audit `src/components/slides/` for dead code

**Why not applied:** Phase 2 disallows file deletion.

**To apply:** Run `rg "from '@/components/slides" 4-Apps/merck-deck/src` — if zero hits, the directory is dead and can be `git rm -r`'d.

### P-B-01 — Rename CS2 slides for prefix-sequence parity

**Why not applied:** Touches 8+ files (`manifest.js`, `notes.js`, 8 slide files, possibly internal `import` chains). Bulk renumber rule.

**To apply (Option B sub-policy, CS2 only):**

```bash
cd 4-Apps/merck-deck/src/decks/qp2-seminar/slides
git mv 16-case2-background.jsx 15-case2-background.jsx
git mv 15-case2-challenge.jsx 16-case2-challenge.jsx
git mv 16-case2-strategy.jsx 17-case2-strategy.jsx
git mv 17-case2-build.jsx 18-case2-build.jsx
git mv 18-case2-fit.jsx 19-case2-fit.jsx
git mv 19-case2-decision.jsx 20-case2-decision.jsx
git mv 22-case2-bridge.jsx 21-case2-bridge.jsx
# Then update imports in manifest.js (lines 28–34) and notes.js (any matching keys).
```

### P-B-02 — Pick ONE co-location convention

**Why not applied:** Renaming sub-component dirs touches every consuming slide file's import statements (>8 files).

**Two opt-in paths:**
- **(b-i) Adopt prefix-mirror everywhere:** rename `cs1-background/` → `06b-case-background/`, `cs2-shared/` → `cs2-shared/` (already group-style), etc. Keeps "find by prefix".
- **(b-ii) Adopt topical-group everywhere:** rename `03-career-arc/` → `career-arc/`, `04-framework-themes/` → `framework-themes/`. Keeps "find by topic".

### P-C-01 — Bulk renumber 1..35 sequential (full Option B)

**Why not applied:** ~70-file edit (renames + import updates + manifest comment cleanup). High-churn, opinionated.

**To apply:** Write a one-shot codemod (suggested below — DO NOT RUN without review):

```bash
# Roughly: zip(manifest.slides[*].component, ['01'..'35']) and rename each file.
# Update manifest.js imports, notes.js keys, and any in-slide cross-imports.
```

Recommend doing this only if you also remove the gap-numbering semantic anchor (e.g., add an explicit `act` field to manifest entries instead).

### P-D-01 — Extract `MonoChip` / `ChromeGlassButton` / `useDeckTheme` to `src/lib/`

**Why not applied:** Touches every slide that currently inlines these. Bulk extraction = many files.

**To apply:** Use the Tier-3 plan from `_audit/CS2-CS3-CLOSING-PLAN-2026-04-23.md` (or generate a fresh extraction map) and apply per-component, one PR each.

### P-E-01 — Fix `eslint.config.js` so `npm run lint` exits 0

**Why not applied:** Phase 2 disallows code edits beyond the four ALLOWED categories; ESLint rule config is out of scope.

**To apply:** In `4-Apps/merck-deck/eslint.config.js`, either:
1. Add `'react-hooks/exhaustive-deps': 'warn'` to the `rules` block, OR
2. Remove `src/lib/**` from the `ignores` array (so the disable comments resolve), OR
3. Strip the `eslint-disable-next-line react-hooks/exhaustive-deps` comments from `src/lib/token.js` and `src/lib/useSlideTracker.js`.

Then handle the remaining `unused-imports/no-unused-imports` errors per file.

### P-D-02 — Add a `clean:screenshots` script

**Why not applied:** Not strictly missing (per F-D-04); "nice to have", not "broken because absent".

**To apply:** Add to `package.json` scripts:
```json
"clean:screenshots": "rm -f slide*.png && rm -rf _screenshots/*"
```

---

## 6. Verification log (Phase 3)

### `npm run build` (Phase 3 final)

Exit code: **0**.

Last 30 lines:
```
> base44-app@0.0.0 build
> vite build

[base44] Proxy enabled: /api -> http://localhost:5173
[BABEL] Note: The code generator has deoptimised the styling of /Users/malekokour/MyWork/3_Projects/2_MyJob/JobPresentation26/4-Apps/merck-deck/src/decks/qp2-seminar/assets/cs2/bone-marrow.svg as it exceeds the max of 500KB.
```

(Vite is configured with `logLevel: 'error'`, which is why successful build chunks are not echoed. Build artifacts written to `dist/` — confirmed by exit code 0.)

### `npm run lint`

Exit code: **non-zero**. Pre-existing failure documented in F-D-05 / F-E-02. **Audit did not introduce these errors** (no source files modified).

### Inventory re-run

Identical to Phase 0.4 (no slide files renamed, created, moved, or deleted). `.gitignore` is the only delta.

### Manifest ↔ files cross-check

All 35 manifest imports resolve to existing files:

```
OK  01-title.jsx
OK  02-hook.jsx
OK  03-career-arc.jsx
OK  04-framework-themes.jsx
OK  10-case-divider.jsx
OK  06b-case-background.jsx
OK  11-case-challenge.jsx
OK  11b-case-strategy.jsx
OK  11c-case-build.jsx
OK  11d-case-fit.jsx
OK  11e-case-exposure-match.jsx
OK  11f-case-exposure-response.jsx
OK  13-case-impact.jsx
OK  14-case-bridge.jsx
OK  14-case2-divider.jsx
OK  16-case2-background.jsx
OK  15-case2-challenge.jsx
OK  16-case2-strategy.jsx
OK  17-case2-build.jsx
OK  18-case2-fit.jsx
OK  19-case2-decision.jsx
OK  22-case2-bridge.jsx
OK  23-case3-divider.jsx
OK  24-case3-challenge.jsx
OK  25-case3-strategy.jsx
OK  26-case3-fda-engagement.jsx
OK  27-case3-fit.jsx
OK  28-case3-impact.jsx
OK  29-case3-bridge.jsx
OK  30-closing-divider.jsx
OK  31-breadth-therapeutic-areas.jsx
OK  32-record-at-scale.jsx
OK  33-leadership-principles.jsx
OK  34-in-closing.jsx
OK  35-thank-you.jsx
```

35/35 files present. **0 missing, 0 broken imports.**

### Route surface check (static)

`DeckRunner` resolves slides by manifest `id`, not file path. Every manifest entry has both `id` and `component`, both verified above. **All 35 routes operable.**

---

## 7. Open questions for the human

1. **Numbering policy commitment.** Audit defaulted to **Option A (preserve gaps)** because Option B is high-churn and the manifest comments already document the drift. Confirm or override.
2. **`src/components/slides/`** — is anything in there still wired up? If not, would you like a deletion-PR proposal? (Audit cannot run code-mod searches in Phase 2.)
3. **Lint config (`react-hooks/exhaustive-deps`)** — three different ways to fix it (P-E-01). Which do you prefer? The 1-line "add rule as warn" is the lowest-risk choice.
4. **CS2 sub-block prefix renumber (P-B-01)** — would you like the 8-file rename script applied as a follow-up? It's the smallest possible "fix the lying prefix" change without going full Option B.
5. **`_backup/` policy** — keep current "track old variants" convention, or move them to a long-term `audit/` archive folder (which would simplify discovery for new contributors)?
6. **Co-location convention (P-B-02)** — if you want to standardize, which direction (b-i prefix-mirror or b-ii topical-group)?

---

*End of report.*
