# QC Sweep Report — Slides 22–35 (Manifest Order)
**Agent:** QC sweep (sequential, per-slide screenshot → fix → re-screenshot)
**Date:** 2026-04-24
**Scope:** 14 slides (manifest slots 22–35), CS2 close → CS3 (full case) → Closing act → Finale
**Captures:** 28 stills (1920×1080 + 1366×768) + 10 finale motion frames + 4 reduced-motion captures + 10 transition mid-frames
**Total rounds executed:** 2 (only slot 35 needed a re-capture round)

---

## Summary

The CS3 case study (slots 23–29) and closing act (slots 30–34) are in shippable shape after Agents D and E's redesign work. The motion arc on the finale (slot 35) lands as specified, and the 22→23 case-color handoff has no flicker. **One regression was found and fixed:** the slot 35 reduced-motion path failed to render the author + contact blocks because those two components were not wired to `prefersReduced`. Fixed in round 2.

**Slides clean (no edits needed):** 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34
**Slides edited:** 35 (one fix, round 2 verified)

---

## Numbering reconciliation

User instructions referred to "slots 23–35" but per `src/decks/qp2-seminar/manifest.js` the canonical slot indices for the targeted content range from **22 (`case2-impact-bridge`) through 35 (`thank-you`)**. The QC sweep was run against manifest slots 22–35 to cover the full intended content (CS2 close + entire CS3 case + closing act + finale). The capture script `audit/scripts/qc-batch-capture.mjs` uses the manifest IDs directly.

---

## Per-slide findings

### Slot 22 — `case2-impact-bridge` (CS2 close)
- **Title** "Adult ALL stays adult — and a methodology now travels."
- `SecObjectionCard` resolved variant: 1px coral line through cream-muted body text. Reads as "objection retired" without obscuring legibility (intentional, not a strikethrough rendering bug).
- `IndiaMap` morph receives the cinematic handoff via `layoutId="cs2-india-map"` from prior slide.
- Two-row scaffold (themes + bridge) reads cleanly at both viewports.
- **Verdict:** Clean. No edits.

### Slot 23 — `case3-divider` (CS3 hero divider)
- `LymphocyteCruk` SVG renders crisp at both viewports — radial violet halo behind, hairline coronet treatment.
- Attribution `Lymphocyte diagram © Cancer Research UK / Wikimedia · CC BY-SA 4.0` appears on the foot meta line. Chain valid.
- Case color `--violet` applied consistently (number 03, eyebrow, halo).
- **Verdict:** Clean. No edits.

### Slot 24 — `case3-challenge`
- Three anchor tiles (94 / 36 / N=60 with `numeralLayoutId="cs3-n-94"` for the cinematic handoff to slide 26).
- Constraints column reads clearly; meta tags row sits on `alignSelf: 'end'` so the bottom whitespace is intentional, not a layout drift.
- Body line "First in adult, with one chance to land it." in italic Fraunces — anchors the assertion.
- **Verdict:** Clean. No edits.

### Slot 25 — `case3-strategy` (StackTower)
- `StackTower` SVG composition: BASELINE → MOVE #1 → MOVE #2 → N=60 reads as a literal stack going UP (foundation at bottom, outcome at top).
- Right column mirrors the stack vertically (RESULT top, MOVE #2, MOVE #1, BASELINE) — the apparent "reverse numerical order" (02 above 01) is intentional and matches the visual stacking metaphor.
- FDA precedent legends on each move ("Mentré · Bornkamp · Pinheiro" and "Rylaze adult 2021 · Asparlas pediatric 2018") render at correct mono scale.
- **Verdict:** Clean. No edits.

### Slot 26 — `case3-fda-engagement`
- Hero band: `SampleSizeWaterfall` 94→60 with `−36%` callout in violet wash.
- `PillarStatus` rows (3/4 PILLARS AGREED · >85% AE-DETECTION · REPOSITIONED SIMULATED PRIMARY) all sit at 14pt+ in their containers; hairline-only chrome holds.
- `PositionLine` editorial italic in the bottom band reads at body weight without crowding.
- Closer line "the methodology now travels independent of trial outcome" carries the takeaway.
- **Verdict:** Clean. No edits. (User pain point on font sizes — addressed; nothing falls under 14pt.)

### Slot 27 — `case3-fit` (RSE + evidence glyphs)
- **CRITICAL VERIFICATION:** `RseStability` curve correctly DECREASES with N (high at N=20, plateau at N=50–60, low at N=100). Agent D's inversion fix is held. ✓
- `PriorAnchorGlyph` (concentric rings showing 60 nested in 124-patient prior) and `SensitivityGlyph` (3-bar plateau) both render at appropriate scale and reflect their captions.
- The previously-orphaned circle watermark is gone.
- "N = 60 · plateau" callout sits inside the chart and aligns to the violet point on the curve.
- **Verdict:** Clean. No edits.

### Slot 28 — `case3-impact` (−36% hero + 94-patient grid)
- **Patient-grid math:** Visually verified 60 violet figures + 34 dim figures = 94 total. ✓ Layout balanced (4 full violet rows + transition row + 2 dim rows).
- The "strikethrough" concern from CS2 does NOT recur — the dim figures are rendered in `--cream-muted` color rather than struck through. More legible than a strikethrough would be.
- Oversized italic Fraunces `−36%` numeral dominates correctly as the headline figure.
- 4-beat ledger row (REGULATORY · OPERATIONAL · SCIENTIFIC · DURABLE) reads cleanly across the bottom.
- "DURABLE CONTRIBUTION    SPARK-ALL ended at N = 42 on a sponsor portfolio decision (Feb 2026), independent of design quality" — closer carries the durability argument.
- **Verdict:** Clean. No edits.

### Slot 29 — `case3-bridge` (themes ribbon)
- Five-bullet "THE TEMPLATE" left column + violet-washed "WHERE IT GOES NEXT — MERCK CMD PIPELINE" right block.
- ICH M15 callout: `ICH M15 · FEB 2026   First global guideline on model-informed drug development — FDA documented this case in 2023 · M15 codifies the playbook in 2026.` **Date flagged for fact-check** (see Suspect Content section).
- Themes ribbon at bottom shows "FRAMEWORK THEMES IN THIS CASE STUDY · 3 OF 5" — themes 01 / 04 / 05 with their canonical glyphs and token colors. Consistent with closing slides 30–34. ✓
- **Verdict:** Clean. No edits.

### Slot 30 — `closing-divider` (ThemesConstellation preview)
- Title "Beyond the / three cases." with "three cases" in amber italic Fraunces — closing color holds. ✓
- Pentagon-star ThemesConstellation with all 5 nodes (amber 01, cyan 02, sage 03, violet 04, coral 05) rendered in canonical token colors per `themes.js`. ✓
- Themes ribbon below shows all 5 themes with their glyphs in the correct colors.
- "ACT · IV OF IV · FROM · DEPTH → SCOPE · THEMES ACTIVE · 5 OF 5" — meta strip reads as a transition card.
- **Verdict:** Clean. No edits.

### Slot 31 — `breadth-therapeutic-areas` (TA glyph directory + stat strip)
- 6 TA cards in a 2×3 grid, each ~56×56 glyph reflecting its domain:
  - RARE DISEASE: stick-figure (cream)
  - ONCOLOGY: branching/molecule (violet — links to CS3)
  - CARDIOMETABOLIC: heart pulse (cream)
  - ANTIVIRAL: virus capsid (cream)
  - GLOBAL REGULATORY: scales (cyan — links to CS2)
  - AI/ML: neural net (amber/sage)
- Cards use case-color tags ("FLAGSHIP" coral pill, "FLAGSHIP" cyan pill, "ACTIVE" amber pill) to mark current vs historical work.
- Stat strip: 15+ PROGRAMS · 8 SUBMISSIONS · 4 APPROVED LABELS · 6 AGENCIES · 6 DOMAINS — all numerals at correct scale.
- **Verdict:** Clean. No edits.

### Slot 32 — `record-at-scale` (12-year timeline)
- Title "Twelve years. The record at scale." with "The record at scale." in amber italic Fraunces.
- Timeline ticks: 2014, 2016, 2018, 2020, 2022, 2024, 2026 — evenly spaced at both viewports, **no overlap at 1366×768**. ✓
- 7 events labeled with diamond markers, year-coded by theme color (cream/sage/amber/coral/coral/cyan/amber). Labels stagger above/below the timeline to avoid horizontal collision.
- Stat strip below timeline: 12 YEARS · 6 DOMAINS · 8 SUBMISSIONS · 6 AGENCIES · 4 APPROVED LABELS · 20+ PUBLICATIONS · 3 TOOLS BUILT · AU2023213173A1 PATENT — numerals count up cleanly with theme-color differentiation.
- Subtle amber growth wedge underneath the timeline implies acceleration over time.
- **Verdict:** Clean. No edits.

### Slot 33 — `leadership-principles` (manifesto stack)
- 4-column manifesto rows (numeral | hairline | theme glyph + theme name | bold principle title + italic elaboration):
  - 01 amber → "01 QP REPLACES STUDY" → **QP as strategic architecture**
  - 02 sage → "04 NOVEL METHODS" → **Scaffolds over templates**
  - 03 amber → "05 JUDGMENT" → **Teams over deliverables**
- Reads as a leader's voice; theme glyphs reference the canonical themes.js vocabulary. ✓
- 3 tool boxes at bottom (PharmAgent / DeepPK / DosePredict) — adjacent peers with hairline borders, OK per craft-bans v2.1 ("borders only when adjacent peers").
- Pipeline bridge box (violet wash) carries the ICH M15 closer date — **flagged for fact-check** (see below).
- **Verdict:** Clean. No edits.

### Slot 34 — `in-closing` (three takeaways)
- 3-column layout, each with theme color + glyph + numeral + body + meta:
  - REGULATORY IMPACT (cyan): **8 · 4 · 6** — submissions / labels / agencies
  - STRATEGIC BREADTH (amber): **6** — therapeutic areas
  - LEADERSHIP CLARITY (coral): **QP** — strategic engine, not service desk
- Bottom italic quote with amber accent: "That's the organization I know how to build — because I've spent my career building the evidence that moves science into patients' lives."
- Closer meta: "MERCK QP2-CMD · CANDIDATE SEMINAR · APRIL 2026"
- Bottom ~30% of canvas at 1920×1080 is whitespace — by design (acceptable per "whitespace as first-class"); at 1366×768 the slide fills the canvas.
- **Verdict:** Clean. No edits.

### Slot 35 — `thank-you` (FINALE: ThemesConstellation re-bloom)
- **REGRESSION FOUND AND FIXED (round 1 → round 2):**
  - **Issue:** In `prefers-reduced-motion: reduce` mode, `AuthorBlock` ("Malek Okour, Ph.D." + role) and `ContactBlock` (malekokour.com + LinkedIn) did not render in the captured 2000ms reduced window. Root cause: those two components did not pass through `prefersReduced`, so they kept their entrance-delayed motion (`delay: T.author = 2.80s`, `delay: T.contact = 2.95s`) and were still mid-fade-in when the reduced-motion screenshot fired.
  - **Fix:** Added `prefersReduced` prop to both `AuthorBlock` and `ContactBlock`. When true, `initial={false}` (no entrance) and `delay: 0`. Backed up to `_archive/2026-04-24-qc-thank-you-round-1.jsx`.
  - **Verification (round 2):** Both blocks now render at full opacity in both viewports under reduced-motion. Settled-state and motion arc unaffected.
- See FINALE MOTION ARC section below for timed-frame analysis.

---

## FINALE (slot 35) MOTION ARC

Captured at t = 400, 1200, 2000, 3000, 4000 ms after navigation. The slide's master timeline (in seconds, per slide source) is:
`chrome 0.10 · nodes 0.20 · edges 0.55 · centerPulse 1.30 · thank 1.45 · you 1.85 · glyphs 2.10 · rule 2.20 · sub 2.50 · author 2.80 · contact 2.95 · themeLabels 3.20`

### Frame analysis (1920×1080)

| t (ms) | What's on screen | Read |
|--------|-----------------|------|
| 400 | One amber node settling top + first edge tracing in (very faint) | Constellation just beginning to assemble. Composed scarcity, not chaos. ✓ |
| 1200 | All 5 nodes settled (amber/coral/cyan/violet/sage in pentagon), edges drawn in amber, no glyphs yet, no title | Full K5 graph assembled. Center anchor not yet pulsing. ✓ |
| 2000 | "Thank" word lands cream serif, "you." sweeping in mid-blur from right (italic amber), constellation behind | Title resolving on central convergence. Amber italic "you." readable mid-flight. ✓ |
| 3000 | "Thank you." fully resolved with calligraphic underline drawn, "Questions welcome." italic visible, AuthorBlock just appearing bottom-left, theme glyphs blooming on nodes | Mid-arc — typography settled, perimeter labels still arriving. ✓ |
| 4000 | Settled: title, underline, sub, author, contact, all 5 theme labels (01 QP REPLACES STUDY · 02 DOSE PRECISION · 03 GLOBAL STRATEGY · 04 NOVEL METHODS · 05 JUDGMENT) radiating outward | Full bloom. Ambient breath continues. ✓ |

### Verification checklist (per spec)

- ✓ Constellation assembles with intent (5 nodes settle in 60ms stagger, then K5 edges trace L→R)
- ✓ "Thank you." lands on central convergence with `you` in amber italic Fraunces
- ✓ Calligraphic underline (SVG bezier path with shadow trail) draws L→R via pathLength
- ✓ "Questions welcome." italic subhead fades up
- ✓ Radial theme labels appear (5 labels in mono caps at canonical token colors)
- ✓ Reduced-motion variant feels finished (after round-2 fix)
- ✓ Contact links present (malekokour.com, linkedin/in/malek-okour-73020520)
- ✓ Page meta `END · 35 / 35` visible top-right
- ✓ Ambient amber-pulse perimeter wave repeats at ~6.5s intervals to keep slide alive during Q&A

### Reduced-motion variant (round 2)

After the AuthorBlock + ContactBlock fix, the reduced variant renders all of: chrome, constellation (no edge-flash, no center pulse, no breath), theme glyphs, theme labels, "Thank you." (no entrance blur/sweep), solid calligraphic underline (no draw), "Questions welcome.", author block (instant), contact block (instant). Composition reads as deliberate without the build sequence.

---

## CS2 → CS3 transition (slots 22 → 23)

Captured at t = 200, 500, 1100, 1800, 3500 ms (1920×1080 and 1366×768).

| t (ms) | State | Notes |
|--------|-------|-------|
| 200 | Blank canvas + chrome only | Slot 23 just mounted. |
| 500 | "CASE STUDY 03" eyebrow + page meta | Chrome resolving. |
| 1100 | Title "Calaspargase / pegol" + lymphocyte SVG fully drawn | **No opacity dip on the SVG.** No "lung-style flicker." ✓ |
| 1800 | Subtitle + caption "LYMPHOCYTE · CELL OF ORIGIN" appears | Smooth additive entrance. |
| 3500 | Settled: title, subtitle, body italic, COMPOUND/POPULATION/AGENCY/OUTCOME/VERDICT meta strip, attribution footer | Full bloom; verdict pill `N = 60 · AGREED` visible. |

**No flicker.** The lymphocyte SVG appears at its final opacity in a single ease-in — no dip-and-rise pattern like the earlier lung audit found. The case-color handoff from cyan (CS2) to violet (CS3) reads cleanly: the prior slot's amber ladder fades, slot 23's violet halo is the first chromatic note of the new case.

---

## Suspect content flags (for human verification)

These items were not within QC scope to fix but are flagged for fact-check before final delivery:

1. **Slot 23 — Lymphocyte attribution chain.** Footer reads `Lymphocyte diagram © Cancer Research UK / Wikimedia · CC BY-SA 4.0`. The on-slide attribution chain works visually, but **verify** the Wikimedia file's actual licensing matches CC BY-SA 4.0 (some Cancer Research UK images on Wikimedia carry CC BY-SA 4.0; some carry CC BY-SA 3.0 — pick the actual license of the source file).

2. **Slot 27 — RSE curve direction.** Verified visually: `%RSE` decreases as `N` increases, plateau at N=50–60. Matches Agent D's bug-fix. ✓

3. **Slot 28 — Patient grid count math.** Visually verified 60 violet + 34 dim = 94 total. ✓

4. **Slots 29 & 33 — ICH M15 dates.** Both slides cite `ICH M15 · Step 4 · Feb 2026` (and slot 33 adds `EU effective Jul 2026`). The ICH M15 (Model-Informed Drug Development) guideline is real, but **verify** the Step 4 sign-off date and EU effective date are accurate to the public ICH timeline as of April 2026. If the actual Step 4 hasn't landed yet, the language should soften to "anticipated Step 4" or similar.

---

## Files modified

| File | Change | Backup |
|------|--------|--------|
| `src/decks/qp2-seminar/slides/35-thank-you.jsx` | Added `prefersReduced` prop to `AuthorBlock` and `ContactBlock`; gated `initial` and `delay` on it so reduced-motion mode renders both blocks instantly | `_archive/2026-04-24-qc-thank-you-round-1.jsx` |

## Files created

| File | Purpose |
|------|---------|
| `audit/scripts/qc-batch-capture.mjs` | Single-pass batch capture: 14 slides × 2 viewports + slot 35 motion arc (5 frames × 2 viewports) + slot 35 reduced-motion (2 viewports) + 22→23 transition (5 frames × 2 viewports). Run with `node audit/scripts/qc-batch-capture.mjs <round> [filter-slots]`. |

## Captures produced

- **Round 1:** 28 standard stills + 10 finale motion frames + 4 reduced + 10 transition frames = 52 PNGs in `audit/out/qc-sweep/`
- **Round 2:** 2 standard + 10 motion + 4 reduced for slot 35 only = 16 PNGs

---

## Hard constraints honored

- ✓ Did not undo any Agent D or Agent E redesign work
- ✓ Did not touch slides outside slots 22–35
- ✓ Did not modify shared `CaseHeroDivider.jsx`
- ✓ Did not modify `themes.js`
- ✓ Did not modify any other shared deck primitives
- ✓ No narrating comments added; the new `prefersReduced` prop wiring is self-evident
- ✓ `useReducedMotion()` honored — fix actually strengthens its handling on slot 35
- ✓ All edits use existing design tokens; no new tokens introduced

## Recommendation

The deck is presentation-ready for slots 22–35. Address the three suspect-content flags (lymphocyte license, ICH M15 dates × 2 slides) before live delivery. The finale's motion arc is on-spec — at 4s the audience has read the constellation, the "Thank you." gesture, and the contact rails; ambient breathing keeps the slide alive through Q&A without distraction.
