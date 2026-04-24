# Phase C batch 1 (slides 01-07) — font-token migration

## Files modified
- `src/decks/qp2-seminar/slides/01-title.jsx`
- `src/decks/qp2-seminar/slides/03-career-arc/SatelliteDrawer.jsx`
- `src/decks/qp2-seminar/slides/07-case-challenge.jsx`

## Migrations by file

### 01-title.jsx
- Line 280 (was 276): `clamp(1.3rem, 1.9vw, 1.85rem)` (Presenter author-card name) → `var(--fs-card-title)`
  - Comment added: original cap (1.85rem) is slightly above the token's 1.3rem ceiling; accepted small shrink at large viewports for tokenization consistency.
- Line 292 (was 288): `clamp(0.95rem, 1.2vw, 1.2rem)` (Presenter card subtitle, "Director, Clinical Pharmacology…") → `var(--fs-card-body)` — clean fit (upper bounds within ~10% of token cap).

### 03-career-arc/SatelliteDrawer.jsx
- Line 47: `clamp(1.4rem, 2.2vw, 1.85rem)` (SheetTitle for satellite detail drawer) → `var(--fs-card-title)`. Comment notes the cap-mismatch (1.85 vs token cap 1.3) and that card-title is the closest semantic match.
- Line 95 (was 90): `clamp(1.4rem, 2vw, 1.8rem)` (metric value in metric tile) → `var(--fs-card-title)`. Intent is "numeral", but original 1.8rem cap is far below the card-numeral floor (2.4rem); using card-numeral would dramatically scale these stats up. Comment explains.
- Line 109 (was 102): `0.62rem` (mono uppercase metric caption) → `var(--fs-card-meta)`.
- Line 173 (was 167): `0.62rem` (`SectionLabel` mono uppercase section header) → `var(--fs-card-meta)`.

### 07-case-challenge.jsx
- Line 456: `clamp(0.74rem, 0.85vw, 0.92rem)` (`.cs1-card-body` body copy) → `var(--fs-card-body)` — clean fit.

## Skipped

### 01-title.jsx
- Line 102 `width: 'clamp(40px, 5vw, 72px)'` — width literal, not font-size.
- Line 132 `clamp(2.1rem, 5.8vw, 5.2rem)` (`<h1 id="s01-title">`) — functions as the slide's headline (chrome). Even though this title slide is hand-rolled and not using `<Headline>`/`var(--fs-slide-headline)`, the role IS slide chrome. Per instructions, leaving slide chrome alone in this sweep.
- Line 195 `clamp(1.05rem, 1.75vw, 1.7rem)` (subtitle paragraph "Strategies for Dose Selection…") — functions as the slide's subhead; same reasoning as above.
- Lines 511, 519 etc. SVG `<text>` `fontSize: 10` etc. inside the PK curve — SVG coordinate-space.

### 02-hook.jsx
- Line 163 `fontSize: '1.35em'` — em-relative scaling **inside** `<Headline>`; not a card/tile font literal and `1.35em` is intentional relative scaling within the chrome.
- All other typography is delegated to `<Eyebrow>/<Headline>/<Subhead>/<Footer>` from SlideParts (already on `--fs-slide-*`).

### hook/ConvergenceTimeline.jsx
- Every `fontSize="…"` is on an SVG `<text>` element inside a `viewBox`-coordinate space. Skipped per instructions.

### 03-career-arc.jsx
- All numeric `fontSize={…}` calls (`fontSize={17}`, `fontSize={36}`, `fontSize={15}`, etc.) are on SVG `<text>` elements inside the network-graph SVG viewBox. Skipped.

### 03-career-arc/SatelliteDrawer.jsx
- Lines that already resolve to slide-chrome tokens (`var(--fs-slide-kicker)`, `var(--fs-slide-tagline)`) on the eyebrow / description / list rows — not double-wrapping per instructions, even though the drawer is technically card-context. The kicker/tagline tokens are already in the same fluid family.

### 03-career-arc/SwayGroup.jsx
- No font-size literals (utility component for SVG transform).

### 04-framework-themes.jsx
- No inline font-size literals — header is delegated to SlideParts.
- `fontSize: '1.35em'`-style relative scaling inside Headline (from imports) is inside chrome.

### 04-framework-themes/DataflowEngine.jsx
- All `fontSize={…}` numeric values (72, 22, 14, 36, 11, 20, 13) are on SVG `<text>` elements in the 1920×1080 authoring viewBox. Skipped.

### 04-framework-themes/ThemeIcons.jsx
- No font-size or clamp matches.

### 05-case-divider.jsx
- File is a thin wrapper around `CaseHeroDivider`; no font literals at all.

### 06-case-background.jsx
- Already fully tokenized with `var(--fs-card-title)`, `var(--fs-card-label)`, `var(--fs-card-meta)` — nothing to migrate.

### 07-case-challenge.jsx
- Lines 121–122 `<style>` media-query overrides:
  - `font-size: clamp(0.9rem, 1.6vw, 1.15rem)` on `.cs1-card-title` at `max-width: 1024px`
  - `font-size: clamp(0.68rem, 1.15vw, 0.85rem)` on `.cs1-card-body` at `max-width: 1024px`
  - These are intentional **smaller-than-token** overrides for narrow viewports. Replacing them with `var(--fs-card-title)`/`var(--fs-card-body)` would reset them to the larger default (the token already has a clamp formula but with higher floor/cap), defeating the override. Left untouched and flagged below.
- The `font-size: var(--fs-card-meta)`, `var(--fs-card-label)`, `var(--fs-card-title)` calls already in place — not double-wrapping.

### cs1-background/AgencyApprovalTimeline.jsx, LungsDiagram.jsx, LungsShared.jsx, lungs.svg
- All `fontSize="11"`, `fontSize={compact ? 13 : 12}` etc. are on SVG `<text>` elements (string or numeric, no rem unit) — coordinate-space. Skipped.

### cs1-challenge/SurvivalMiniChart.jsx, LabelCoverageChart.jsx, SparsePKChart.jsx, BranchVisuals.jsx, DossierGlyph.jsx
- All font-size matches are SVG `<text>` `fontSize="10"`, `fontSize="8.5"`, `fontSize="9.5"` etc. inside chart viewBoxes. Skipped.

## Risks / questions

1. **01-title.jsx `<h1>` and subtitle**: This title slide doesn't use `SlideParts`. The `<h1>` plays the role of `<Headline>` and the italic paragraph plays the role of `<Subhead>`. They use raw `clamp(...)` — neither slide-chrome nor card tokens. Left alone in this sweep because the spec says "don't touch slide chrome." Worth a follow-up to either migrate the slide to `SlideParts` or to replace these literals with `var(--fs-slide-headline)` / `var(--fs-slide-subhead)`.

2. **SatelliteDrawer metric values (line ~95)**: Original `clamp(1.4rem, 2vw, 1.8rem)` sits in a gap between `--fs-card-title` (cap 1.3rem) and `--fs-card-numeral` (floor 2.4rem). I picked `--fs-card-title` to avoid scaling the small drawer's metric numerals up to numeral-class size, but a designer may prefer adding a new in-between token (e.g. `--fs-card-stat`) for sidebar/drawer stats that should read as numerals at smaller scale.

3. **SatelliteDrawer SheetTitle (line 47)**: Same gap problem — original cap 1.85rem, picked card-title (cap 1.3rem). Sheet titles will visibly shrink at very wide viewports compared to before.

4. **07-case-challenge.jsx narrow-viewport overrides**: The two media-query `font-size: clamp(...)` overrides on `.cs1-card-title` / `.cs1-card-body` are deliberately tuned smaller than the new tokens. They cannot be replaced with a token reference without losing the smaller-on-tablet behavior. Leaving them as-is. If the design intent is that responsive shrink is now handled by the token's own clamp formula, a follow-up could just delete these media-query rules entirely.

5. **No migrations in slides 02, 04, 05, 06**: Slides 02 and 04 are already fully delegated to SlideParts (chrome) + SVG (skipped). Slide 05 is just a wrapper around `CaseHeroDivider`. Slide 06 is already fully tokenized with the new `--fs-card-*` family. Confirmed by grep.
