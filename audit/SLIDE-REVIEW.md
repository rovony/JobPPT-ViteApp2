# qp2-seminar slide review — Master synthesis

**Date:** 2026-04-24
**Scope:** 35 slides reviewed by 5 parallel agents against the zaj-slides rubric (`Slide-Design-Brief.md` §10 hard rules + §12 pre-delivery audit + Lessons-Claude failure patterns).
**Method:** static source review — no browser, no screenshots. Five batches, ~12 min each.
**Source reports:** `slide-review-batch-{1..5}.md` in this directory.

---

## Execution status (Apr 24 sweep)

| Phase | Commit | Status | Scope |
|---|---|---|---|
| Baseline | `cb1d3b2` | ✅ done | Pre-Phase-A snapshot of slides 16, 22-35 + audit reports |
| **A — mechanical fixes** | `78d9e38` | ✅ done | `--space-7`, `--fs-card-*` tokens, `&amp;` bug, calibration triad (slide 02), `ThemesConstellation` chain (slide 35), `cs3-pct-36` layoutId pair (slides 26↔28), 3 dead files, cyan→sage on slide 31 |
| **B — global motion + footer + budget** | `1b96621` | ✅ done | `MotionConfig reducedMotion="user"` global guard, `Footer` `source` prop, `D.source`/`D.footer` capped to 2.80s on 11 slides |
| **B+ — citation migration & layoutIds** | `8744170` | ✅ done | 18 slides migrated tagline → `source` prop, `case-marker-{coral|cyan|violet}` layoutIds added (slides 01 dots ↔ slides 5/15/23 hero hairlines) |
| **D — editorial defaults** | `cd1b0c8` | ✅ done | Slide 34 headline rewrite + 6/7 reconciliation, slide 32 "12 YEARS" lead numeral, slide 03/11/11b decorative shadow sweep, DEFERRED-WORK.md |
| **C — `--fs-card-*` migration sweep** | `f1f347f` | ✅ done | 31 slide files migrated inline `clamp()`/rem literals → `--fs-card-*` tokens; 2 new tokens (`--fs-card-hero-num`, `--fs-card-quote`) added to `src/index.css`. Per-batch ledgers in `audit/phase-c-batch-{1..5}.md`. |
| **D-tail — final morphs** | `ae771fe` + `<this commit>` | ✅ done | `cs1-focal-amber` layoutId pair (slide 11 ↔ 11b) + slide 22 SEC card wrapped in right-aligned `max-width:min(56%,640px)` strip so the `cs2-sec-objection` morph reads as hero→corner-badge collapse. |
| **D-defer — slide 21 rebuild + cs3-n-94 + P5 contract** | _pending_ | 📋 deferred | Speaker-input-required items. See `DEFERRED-WORK.md` §1, §3, §4. |

**5 commits landed today; build green throughout (vite build exits 0).** Each commit is independently revertable. See `DEFERRED-WORK.md` for the 5 remaining items with rationale, effort estimates, and unblock criteria.

---

## 1. Executive summary

- **49 HIGH-severity findings** across 35 slides — none of them blockers, none of them cosmetic. Distribution: B1 (slides 1-7) = 11, B2 (8-14) = 11, B3 (15-22) = 12, B4 (23-29) = 6, B5 (30-35) = 9. CS3 has the cleanest authoring; opening + CS1 + closing carry most of the debt.
- **The user's calibration was correct.** Slide 02 has all three flagged bugs: subhead pinch (1.55em + maxChars=64 + paddingTop=0.5em), `PEDIATRIC USE ESTABLISHED` knockout overlapping the 2026 tick, and missing breathing room between headline italic descenders and subhead. Fix specs in §3.A below.
- **The deck has ONE root cause for ~40% of the findings: the `--fs-slide-*` token family stops at the SlideParts level and doesn't extend into card / tile / chart bodies.** Authors fall back to inline `clamp()` literals — every content slide has 5-10 distinct hardcoded font-sizes vs the §4 cap of ≤3. Adding a `--fs-card-*` token sub-family would close 40+ findings in a single sweep.
- **Cinematic continuity is the highest-leverage upgrade available.** The deck has the bones for cross-slide morphs (`layoutId` is correctly used on `lung-lynch`, `india-cdsco`, `cs2-sec-objection`, `cs2-pillar-*`, `themes-constellation`) but **8 missed `layoutId` opportunities** would convert the deck from "35 cinematic-feeling slides" into "one continuous 35-frame story." Specific list in §5.
- **No slide bypasses build/route operability** (verified by previous structure audit). All findings are visual / consistency / cinematic. Build is green; the deck WORKS — this audit is about how it FEELS.

---

## 2. Per-slide quick-status matrix

| # | id | sev | top issue (1 line) | fix effort |
|---|---|---|---|---|
| 1 | title | HIGH×3 | Glass-morphism on author card · 7 unique font-sizes · rolls own footer | M |
| 2 | hook | HIGH×3 | Subhead pinch (calibration) · PEDIATRIC USE knockout overlaps 2026 tick · 5 SVG font-sizes | S |
| 3 | career-arc | HIGH×1 | `<filter id="s3-glow">` Gaussian blur on spine (chartjunk) | S |
| 4 | framework-themes | MED×3 | Subhead lands at 2.10s (after viz starts) · footer at 6.6s · `<br>` in headline | S |
| 5 | case-divider (10-…) | HIGH×3 | Bypasses SlideGrid · rolls own `01/03` numbering · vh-anchored absolutes | L |
| 6 | case-background | HIGH×2 | Footer tagline misused as citation cluster · 5+ inline rem font-sizes | S |
| 7 | case-challenge | HIGH×2 | Chart caption font-size 0.54rem (sub-projection-readable) · footer tagline misuse | S |
| 8 | case-strategy | HIGH×1 | `&amp;` literal HTML entity renders as `&amp;` in footer tagline | **S** |
| 9 | case-build | HIGH×1 | Hardcoded `height: 200` on CompartmentSchematic clips on short viewports | S |
| 10 | case-fit-pcvpc | HIGH×3 | Bypasses SlideFrame · vh absolutes · hardcoded `08 / 20` page number | L |
| 11 | case-exposure-match | HIGH×2 | 8 textual blocks below headline (§4 ≤6) · charts have no x-axis line | M |
| 12 | case-exposure-response | HIGH×1 | subheadMaxChars=82 wraps to 3 lines on screen-share | S |
| 13 | case-impact | HIGH×3 | Amber=2 meanings (approved + precision) · 5 colors visible · `bottom: 60` magic px · 3 numerals fight | M |
| 14 | case-bridge | HIGH×1 | 12 visual blocks in viz (§4 ≤6) · ICH coda duplicates slide 11e | M |
| 15 | case2-divider | HIGH×1 | No `prefers-reduced-motion` on 8 cascading delays | S |
| 16 | case2-background | HIGH×3 | `--space-7` undefined → column collapse · two stacked footers · India morph broken through this slide | M |
| 17 | case2-challenge-turn | HIGH×0 (MED×3) | `var(--amber, #d8a634)` misleading fallback · pillar seed unconstrained | S |
| 18 | case2-strategy | HIGH×0 (MED×2) | Pillar internal sizes are raw px (no fluid scaling) | S |
| 19 | case2-pillar6 | **HIGH×1** | ChecklistCard should be CHILD of pillar 6, currently rendered alongside (T6 hero promise broken) | M |
| 20 | case2-pillars-1-5 | HIGH×1 | BridgingPanel duplicates the chain (focal-point dilution) | M |
| 21 | case2-response | HIGH×2 | 9 equal-spaced timeline nodes violates temporal honesty (Tell #8) · narrow-width card overlap (Slide-02 pattern) | L |
| 22 | case2-impact-bridge | HIGH×1 | SEC card stays full-width — should shrink hero→badge for the cinematic close | M |
| 23 | case3-divider | MED×3 | InformativePriorViz lacks reduced-motion guards · 4 SVG text sizes | S |
| 24 | case3-challenge | HIGH×2 | 9 viz elements (§4 ≤6) · 8 distinct font-sizes inline | M |
| 25 | case3-strategy | HIGH×1 | 9 distinct font-sizes inline | M |
| 26 | case3-fda-engagement | **HIGH×3** | Densest CS3 slide (10 elements) · animation tail 4.40s · misses `cs3-pct-36` layoutId | M |
| 27 | case3-fit | MED×3 | subheadMaxChars=130 wraps 4 lines · footer tagline truncation risk | S |
| 28 | case3-impact | **HIGH×2** | Missing `cs3-pct-36` layoutId pair · `tabular-nums` not applied to big numerals | S |
| 29 | case3-bridge | HIGH×2 | gridTemplateRows declares 3 rows but children render 4 (overflow) · 6 viz regions vs §4 ≤6 | S |
| 30 | closing-divider | HIGH×3 | Type column overlaps constellation by ~200px at <1280px · duplicate "IV / IV" markers · 7 unique font-sizes | M |
| 31 | breadth-therapeutic-areas | **HIGH×2** | Cardiometabolic assigned `cyan` (CS2's color) — semantic conflict · 7 unique font-sizes | S |
| 32 | record-at-scale | **HIGH×3** | Title "Twelve years" but no `12` on slide · "6 vs 7 domains" cross-slide drift · CountUpDigit ignores reduced-motion | M |
| 33 | leadership-principles | HIGH×2 | Pipeline ribbon has 8 named entities in 3 sentences (audience can't parse in 90s) · 10 unique font-sizes | M |
| 34 | in-closing | **HIGH×2** | Headline `In closing.` is a TOPIC LABEL not assertion (§2 hard rule violation on the deck's most-remembered slide) · 10 unique font-sizes | S |
| 35 | thank-you | **HIGH×1** | Re-implements `ThemesConstellation` inline (45 dup lines) — breaks layoutId chain at deck close | M |

**HIGH-severity total:** 49.
**Slides without HIGH findings:** 17, 18, 23, 27 (4 slides — all in CS2 strategy block + CS3 fit, the deck's strongest authoring).

---

## 3. The 10 highest-impact fixes (start here)

Ranked by `severity_weight × audience_visibility × inverse_effort`. Each is self-contained; none requires a decision beyond "yes, do it."

| Rank | Fix | Slide | Effort | Why |
|---|---|---|---|---|
| 1 | Replace `&amp;` literal with `&` in footer tagline (`Anderson &amp; Holford 2008`) | 8 | S | Currently renders `Anderson &amp; Holford 2008` literally on screen. 1-character bug, deck-visible. |
| 2 | Fix Slide 02 calibration triad — drop 1.55em override, raise maxChars=88, swap paddingTop to `var(--space-4)` | 2 | S | The user's reported bug. Three lines of edit, restores the slide. |
| 3 | Define `--space-7` in `index.css` (or replace with `--space-8`) — currently CSS resolves to 0 and collapses slide 16's columns | 16 | S | Ghost bug — `var(--space-7)` is referenced but undefined. Visible column collapse. |
| 4 | Rewrite Slide 34 headline `In closing.` as an assertion (e.g., `Three things to take from this candidate`) | 34 | S | Brief §2 hard-rule violation on the deck's MOST-REMEMBERED slide. |
| 5 | Reassign cardiometabolic away from `cyan` on Slide 31 — cyan is CS2's case color | 31 | S | Semantic color conflict — same color, two meanings. 1-line fix. |
| 6 | Resolve "6 Domains" (slide 31, 32) vs "Seven therapeutic areas" (slide 34) — pick one count, propagate | 31, 32, 34 | S | Inconsistent count of the speaker's own work — direct credibility risk per Playbook §5.1. |
| 7 | Add the literal `12 YEARS` numeral to Slide 32 — currently the title's claim has no visual anchor | 32 | M | The "twelve years" is the credibility number; the audience scans for it and doesn't find it. §3 5-second test fails. |
| 8 | Shrink the `PEDIATRIC USE ESTABLISHED` knockout from 340px → 260px and shift center 30px right (Slide 02 ConvergenceTimeline) | 2 | S | The user's reported bug #2 — reveals the `2026` tick. |
| 9 | Replace `ThemesConstellation` re-implementation on Slide 35 with imported component + `layoutId` | 35 | M | 45 duplicated lines + breaks the closing cinematic chain. Single most visible cinematic improvement available. |
| 10 | Add `cs3-pct-36` `layoutId` between Slide 26 waterfall callout and Slide 28 `−36%` numeral | 26, 28 | S | Two single-line additions turn two slides into one cinematic beat. |

These 10 are S/M effort. Estimated total: half a day's work; eliminates 14 of the 49 HIGH findings; addresses every issue the user flagged in the calibration prompt; and lands the deck's most visible cinematic upgrade (#9).

---

## 4. Cross-cutting patterns (deck-wide, single-action fixes)

Patterns that appear in 3+ batches and benefit from one root-cause fix instead of 35 per-slide patches.

### P1 — Add a `--fs-card-*` token family

**Symptom:** every content slide carries 5-10 inline `clamp()` font-sizes that bypass the design system. `--fs-slide-*` covers the chrome (eyebrow / headline / subhead / footer) but stops at the slide body. Authors then reach for raw `clamp(0.7rem, 0.9vw, 1.1rem)` literals for cards / tiles / chart text.

**Action:** add to `src/index.css`:

```css
--fs-card-numeral:    clamp(2.4rem, min(3.4vw, 4.6vh), 3.8rem);  /* big stat */
--fs-card-title:      clamp(1.0rem, min(1.2vw, 1.6vh), 1.3rem);   /* card head */
--fs-card-body:       clamp(0.84rem, min(0.96vw, 1.3vh), 1.0rem); /* card body */
--fs-card-label:      clamp(0.66rem, min(0.78vw, 1.05vh), 0.78rem); /* uppercase mono label */
--fs-card-meta:       clamp(0.6rem, min(0.7vw, 0.9vh), 0.7rem);   /* tiny mono caption */
```

Then a single grep+replace migration: `'0.7rem'` → `var(--fs-card-label)`, `clamp(2rem, 3.6vw, 3.6rem)` → `var(--fs-card-numeral)`, etc.

**Eliminates:** ~40 of the 49 HIGH findings related to font-size sprawl across batches 1, 2, 4, 5.

### P2 — Global `prefers-reduced-motion` honoring

**Symptom:** slides 03 (one-shot `window.matchMedia`), 10, 13, 15, 16-22 (CS2), 23-29 (CS3), 30-35 (closing) — the majority of the deck — do not gate animations on `prefers-reduced-motion`. The `.deck-motion-safe` utility class exists in `index.css:528` but is unused.

**Action:** Two-step:
1. Wrap the deck root in `<MotionConfig reducedMotion="user">` (framer-motion native opt-in — auto-disables animations for users who set the OS flag).
2. For GSAP-driven slides (02, 03), confirm `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` gates the timelines (slide 02 already does; slide 03 uses bare `window.matchMedia` and needs the React-reactive `useReducedMotion()` hook from framer-motion).

**Eliminates:** WCAG 2.3.3 compliance gap across ~25 slides with one central code change.

### P3 — Footer tagline contract

**Symptom:** Slides 06b, 11 use `footerTagline` for citation clusters (`"Source · EMA SmPC · FDA Letairis label · Galiè 2013 · Ivy 2024"`) that get clipped by the rail's `truncate` class on viewports <1366px. Slides 8, 14, 27 push tagline length past the rail limit too.

**Action:** Add a new prop to `<Footer>` — `source={...}` — that renders below the tagline in a small mono caption. Migrate the citation clusters into `source`. Convention becomes:
- `kicker = "NN · short label"` (≤25 chars, mono, uppercase)
- `tagline = italic payoff sentence` (≤16 words)
- `source = citation chain` (mono, 0.62rem, can wrap)

**Eliminates:** all citation-truncation risks across the deck.

### P4 — Decorative shadow / glow / gradient sweep

**Symptom:** Slide 01 (author card `backdropFilter + boxShadow + gradient`), Slide 03 (`<filter id="s3-glow">`), Slide 06b (chart panel shadow), Slide 11 (chart panel shadow), Slide 11b (amber diamond `boxShadow: '0 0 12px ...'`), Slides 17, 19, 21, 22 (linear-gradient on hero cards). All violate Brief §10 ("no drop shadows on cards") and Lessons-Claude Tell #5.

**Action:** Single grep pass for `boxShadow`, `backdropFilter`, `feGaussianBlur`, `linear-gradient(` across `src/decks/qp2-seminar/`. Default to flat. Permit ONE earned gradient per case (currently the slide-21 timeline spine cyan→coral gradient earns it because it carries the emotional-arc semantic).

**Eliminates:** 9 HIGH findings across 4 batches with one disciplined sweep.

### P5 — Case-color discipline contract

**Symptom:** Coral (CS1), Cyan (CS2), Violet (CS3) are designed as case markers. Across the deck:
- Slide 13 (CS1 impact) introduces amber as a **second** semantic on numerals (already used in headline as "approved")
- Slide 14 (CS1 bridge) uses 4 theme colors simultaneously
- Slide 31 (closing breadth) assigns cyan to cardiometabolic — collides with CS2's cyan
- Slide 33 (closing principles) maps principle-1 to amber, breaking the implied case-callback (would need violet)
- Slide 34 (closing takeaways) assigns colors arbitrarily — none match CS1/CS2/CS3 ordering

**Action:** Add a one-line color contract to `CLAUDE.md`:
> "Coral, Cyan, Violet ALWAYS mean CS1, CS2, CS3 across this deck. Amber and Sage are deck-default ink accents and may not encode case meaning. Each slide carries ≤3 accent colors with assigned meanings (Brief §6)."

Then audit slides 13, 14, 31, 33, 34 against it.

**Eliminates:** 6 HIGH findings + restores the deck's color-as-narrative argument.

### P6 — Animation budget cap

**Symptom:** Long animation tails: slide 01 author card at 4.2s + meta at 4.5s, slide 04 footer at 6.6s, slide 26 source at 4.40s, slide 29 source at 3.40s. CS3 was supposed to feel TIGHT and FAST per the audit calibration.

**Action:** Cap `D.source` (or equivalent footer delay) at 2.8s on every content slide. Footer is structural chrome, not punchline — it shouldn't wait for the viz to finish. Move the long-tail animations (idle wiggles, infinite particles) to a single explicit "ambient motion budget" rule: ≤2 cycles then stop, OR sync to `var(--dur-pulse)` for true ambient signal.

**Eliminates:** pacing issues across 5 slides; restores presenter-rapid-rehearsal feel.

### P7 — Component duplication / dead code in `cs2-shared/` and `cs3-*`

**Symptom:** Three files in `cs2-shared/` are imported nowhere (`cs2-challenge/AsymmetryDiagram.jsx`, `cs2-fit/PdDotStrip.jsx`, `cs2-fit/RatioTrack.jsx`). One file is "shared" in name only (`WorldMapShared.jsx` used by 1 slide). `IndiaMap` lives outside `cs2-shared/` despite being used only by CS2 slides. Slide 35 re-implements `ThemesConstellation` inline.

**Action:**
1. Delete the 3 dead files (after `rg "from.*AsymmetryDiagram"` etc. confirms zero imports).
2. Move `IndiaMap` into `cs2-shared/` (it's CS2-only).
3. Either USE `WorldMapShared` on slide 22 (carry through the CS2 close) or rename it to `cs2-background/WorldMap.jsx` to drop the "Shared" misnomer.
4. Replace slide 35's inline constellation with `<ThemesConstellation variant="watermark" layoutId="themes-constellation" />`.

**Eliminates:** 4 architectural drifts; restores 2 broken `layoutId` chains.

---

## 5. Cinematic continuity plan — the 8 missed `layoutId` morphs

The deck has 5 `layoutId`s wired correctly today:
- ✅ `lung-lynch` (slide 5 hero → slide 06b context) — **batch 1 model citizen**
- ✅ `bone-marrow-cs2` (slide 15 → slide 16)
- ✅ `india-cdsco` (slide 15 → slide 22, **but skips slide 16** — see batch 3 finding)
- ✅ `cs2-pillar-{1..6}` (slides 17 → 18 → 19 → 20)
- ✅ `cs2-sec-objection` (slide 17 hero → slide 22 — **but currently doesn't shrink to badge** — see batch 3)
- ✅ `themes-constellation` (slide 30 → 31 — **but breaks at slide 35** — see batch 5)
- ✅ `cs3-prior-anchor` (slide 23 → slide 27) — **batch 4 model citizen**

The 8 missed opportunities (each a single-line addition):

| # | layoutId | from | to | Effort | Impact |
|---|---|---|---|---|---|
| 1 | `case-marker-coral` | slide 1 PK landmark dot | slide 5 hero hub | S | Carries the deck's central "spine of the case" claim |
| 2 | `case-marker-cyan` | slide 1 PK landmark dot | slide 15 hero hub | S | Same |
| 3 | `case-marker-violet` | slide 1 PK landmark dot | slide 23 hero hub | S | Same |
| 4 | `cs1-focal-amber` | slide 11 FocalQuestion card | slide 11b strategy answer panel | M | The deck's first within-case morph — question literally becomes answer |
| 5 | `cs3-n-94` | slide 23 divider meta `94` | slide 26 SampleSizeWaterfall left bar | S | Carries the "94" number through 3 slides |
| 6 | `cs3-pct-36` | slide 26 callout `−36%` | slide 28 hero numeral `−36%` | S | Chart punchline literally becomes impact hero — **single highest-impact morph in deck** |
| 7 | `cs2-sec-objection` (existing — change destination) | slide 17 full-canvas hero | slide 22 **corner badge** (not full-width) | M | The "objection that loomed over half the case is now a small resolved stamp in the corner" — most powerful single moment in CS2 |
| 8 | `themes-constellation` (restore broken chain) | slide 30 → 31 → **35** | (currently dies at 31) | M | The closing cinematic full-stop |

Implementing all 8: ~6 hours. Result: the deck stops being "35 slides with cinematic moments" and becomes "one continuous 35-frame story."

---

## 6. The one slide that needs a rebuild, not a tweak

**Slide 21 (case2-response · regulatory timeline).** Three concurrent failures:
1. **Tell #8 violation:** 9 timeline nodes are equal-spaced, but the dates compress 5 events into 5 months (Dec→Jan→Jan 14→Mar 27→Apr 4→May 14). The audience reads the spacing as proportional time and is wrong.
2. **Slide-02 overlap pattern at scale:** at 1280px viewport each NodeCard becomes ~131px wide for a 3-line label — adjacent cards collide.
3. **Focal-point split:** the climax content (27 Mar 2025) appears both as a timeline node AND as a duplicate leadership-beat callout below.

Fixing this slide requires (a) proportional spacing computed from `dayDelta(date, prevDate)`, (b) NodeCard label truncation to ≤30 chars except for flagged climax/turn nodes, (c) removing one of the two climax representations. ~L effort. Highest priority single-slide rebuild in the deck.

---

## 7. Suggested implementation order (4 phases)

If you want to ship improvements iteratively rather than as one big PR, here's the dependency-aware order:

### Phase A — quick wins (half a day, no decisions)
The 10 fixes from §3 — `&amp;` bug, slide 02 calibration triad, `--space-7` definition, slide 34 headline rewrite, cyan→sage on cardiometabolic, "6/7 domains" reconciliation, `12 YEARS` numeral, PEDIATRIC USE knockout shrink, slide 35 ThemesConstellation import, `cs3-pct-36` layoutId. **Eliminates 14 HIGH findings.**

### Phase B — token system migration (1 day)
P1 (`--fs-card-*` family) + P2 (global reduced-motion) + P3 (footer source prop) + P4 (decorative shadow sweep). **Eliminates ~30 HIGH/MED findings across the deck with 4 root-cause fixes.**

### Phase C — cinematic continuity (1 day)
The 8 `layoutId` morphs from §5. Highest-perceived-quality improvement per hour invested.

### Phase D — slide-21 rebuild + density cleanups (1 day)
The one true rebuild + the density-violation slides (11, 13, 14, 24, 26, 29) — each gets one element removed or compressed. Each individually is a M-effort change; doing them as a batch lets you maintain consistent "cut not add" discipline.

**Total: 3.5 days to take the deck from "very good with rough edges" to "shippable as a candidate-defining artifact."**

---

## 8. Open questions for the human

1. **Token system additions** — adding `--fs-card-*` (P1), `--ls-mono-label`, `--space-7` (S1, currently undefined and breaks slide 16). All low-risk, but they touch `index.css` which is the deck's spine. Add them?
2. **Color contract commitment** — write the case-color rule into `CLAUDE.md` and audit slides 13, 14, 31, 33, 34 against it? (P5)
3. **Decorative shadow sweep** — apply uniformly, or grandfather slides 01 + 17 + 19 + 22 cards because they're hero treatments?
4. **Slide 21 rebuild** — proportional-time timeline is a real refactor (~half day). Is the design intent preserved if the spacing changes from "9 equal columns" to "5 dense + 4 spread"?
5. **Slide 26/29 element cuts** — would you like the audit to recommend a concrete "cut list" (which payoff cards / coda lines to drop), or do you want to make those editorial calls yourself?
6. **`prefers-reduced-motion` strategy** — global `<MotionConfig reducedMotion="user">` at deck root (the right fix), OR per-slide `useReducedMotion()` (more verbose but already partially in place)?

---

## 9. Calibration confirmation

The user's flagged Slide 02 issues, mapped to findings:

| User-reported bug | Audit finding | Fix |
|---|---|---|
| "Subtitle wraps to 4 narrow lines / extend horizontally" | B1 §F-2A — Subhead `fontSize: '1.55em'` override at line 181 + `maxChars={64}` at line 180 | Drop the 1.55em override, raise maxChars to 88 — Subhead becomes 2 lines |
| "PEDIATRIC USE ESTABLISHED overlaps timeline marker" | B1 §F-2E — `ConvergenceTimeline.jsx` knockout `<rect>` 340px wide centered at x=1514, swallows 2026 tick at x=1500 | Shrink rect width 340→260, shift center 30px right (lines 242, 246, 313) |
| "Subtitle pinches title" | B1 §F-2A — `paddingTop: '0.5em'` at line 181 insufficient against italic descenders of "unchanged." | Bump to `paddingTop: 'var(--space-4)'` |

All three caught with file:line precision. The audit calibration is sound.

---

*End of master synthesis. 49 HIGH findings · 5 batch reports · ready for triage.*
