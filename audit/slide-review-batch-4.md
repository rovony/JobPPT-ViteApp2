# qp2-seminar slide review — Batch 4 (slides 23–29 · CS3 arc)
**Reviewer:** Claude (slide-review subagent · batch 4)
**Date:** 2026-04-24
**Scope:** CS3 / Asparlas / SPARK-ALL arc — divider, challenge, strategy, FDA engagement, fit, impact, bridge
**Method:** static source review against zaj-slides rubric (Slide-Design-Brief.md §10/§12). No browser verification.

## Batch summary

- **HIGH-severity findings across batch:** 6
- **Slides with title/subtitle overlap or pinch issues:** none confirmed statically — but slide 24 subhead (`maxChars=120` + 3 inline `<span>` color spans) and slide 27 subhead (`maxChars=130`) carry the highest visual-verification risk for 3+ line wrapping. Slide 23 delegates to `CaseHeroDivider` (not in this batch's source) — needs visual verification.
- **Slides bypassing SlideGrid/SlideParts:** none — all six content slides (24–29) use `SlideGrid + STANDARD_AREAS` and `Eyebrow/Headline/(Subhead)/Viz/Footer`. Slide 23 uses the `CaseHeroDivider` pattern (correct — that's the divider's job).
- **Sub-component dirs with only 1 file (over-engineering candidates):** `cs3-divider/` (1 file), `cs3-engagement/` (1 file), `cs3-fit/` (1 file). All three CS3 sub-component dirs are 1-file. See cross-cutting recommendation #4.
- **Cross-batch patterns (3+ slides share an issue):**
  1. **Inline hardcoded font-sizes proliferating** (`'0.7rem'`, `'0.66rem'`, `'0.62rem'`, `'0.58rem'`, etc.) outside the `--fs-slide-*` token scale appear on slides 24, 25, 26, 27, 28, 29 — every content slide. The deck has tokens for this.
  2. **Dead `tk()` helpers declared but only used once (slide 28's SVG arc).** Slides 24, 25, 26, 27 all declare `const T = useTokens([...])` and a `tk` arrow, but only consume CSS `var()` strings inline. Lint smell + bundle weight.
  3. **Card-with-coloured-left-border + dashed-rule + numbered-circle-chip motif** appears on slides 24 (anchor tiles), 25 (move cards), 26 (pillar rows + quote cards), 27 (evidence blocks), 28 (numeral blocks), 29 (theme tiles, bridge card). It IS the visual identity of CS3 — but on slides 26 and 27 it stacks 4–5 violet-bordered cards in one viewport, which violates the "≤6 distinct visual elements" hard rule (Brief §4) when title+subhead+footer are added.
  4. **Long animation tails (delay > 3.0s) in five of seven slides** — 23 (ends ~3.6s), 24 (D.source = 3.80s), 26 (D.source = 4.40s), 27 (D.source = 3.65s), 28 (D.source = 3.85s), 29 (D.source = 3.40s). For a 5-slide *fast* arc (per audit calibration), the speaker reaches the slide's punchline before the animation does on slide 26 in particular. See cross-cutting #2.
- **Continuity opportunities (layoutId across CS3 slides):**
  - ✅ Already implemented: `InformativePriorViz` morphs slide 23 → slide 27 via `layoutId="cs3-prior-anchor"` (`27-case3-fit.jsx:106`, `cs3-divider/InformativePriorViz.jsx:45`). This is the strongest continuity move in the deck.
  - ❌ Missed opportunity: the **"94 → 60" reduction** appears as text on slides 23 (verdict pill `"N=60 AGREED"` and meta `"94 → 60 · −36%"`), as headline numeral on 26, as the entire `SampleSizeWaterfall` chart on 26, and as `−36%` big-numeral on 28. None share a `layoutId`. The "94" rectangle on 26's waterfall could share a `layoutId` with the "−36%" callout on 28 (or with a pre-render of `60` on 23) — see slide-26 rec #1 and slide-28 rec #1.

## Per-slide reviews

---

### Slide 23 · `case3-divider` — `Case 03 · Asparlas · SPARK-ALL`

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/23-case3-divider.jsx` (+ `cs3-divider/InformativePriorViz.jsx`)
**Slide job:** Open the third case · plant the violet "novel methods" theme · introduce the Bayesian prior visual that the rest of CS3 will reference.

**A. Title / subtitle relationship.** Title "Calaspargase pegol" is a topic-label — it's a divider so that's intentional (Brief §1 & §2 allow it). The `tagline` *is* an assertion ("…and an FDA-agreed 36% enrollment reduction…"). Vertical rhythm not verifiable here because divider layout lives in the unread `CaseHeroDivider` pattern; matches CS1/CS2 dividers visually if those were also-unread shared. **Severity:** LOW (needs visual verification).

**B. Footer.** Divider pattern; uses `source` prop ("FDA Type A meeting · 21 Jul 2023 · NCT04817761 (SPARK-ALL)"). Whether this maps to a `<Footer>` with `kicker`/`tagline` matching slides 24–29 depends on `CaseHeroDivider`. **Severity:** LOW (needs visual verification — but if dividers don't render the standard footer rail, the deck flow loses page-number continuity from 22→24).

**C. Spacing, density, alignment.** Cannot assess fully without the pattern source. Slide file itself is a 40-line declarative call — clean.

**D. Token compliance.** This file: 100% compliant (no inline px/colors). The `InformativePriorViz` sub-component however has many hardcoded SVG font-sizes (`13`, `12`, `28`, `11.5`, `11`) at `cs3-divider/InformativePriorViz.jsx:189, 205, 219, 235, 251`. SVG text doesn't easily consume `--fs-slide-*` tokens, so this is mostly defensible — but four distinct text sizes on one illustration violates "≤3 sizes" (Brief §4 density table) within the visual element. **Severity:** MED.

**E. Visual elements (`InformativePriorViz`).** Strong concept — outer ring (pediatric prior, N=124) + inner disc (adult anchor, N=60) is exactly the Bayesian intuition. Animation sequence (halo → outer ring → labels → inner disc + "ADULT ANCHOR · N=60" → connecting tick) is well-staggered (`InformativePriorViz.jsx:99-273`). Two SVG `<radialGradient>` defs and one `<filter id="prior-glow">` — moderate chart-junk per Brief §7, but the gradients carry meaning ("the prior is faint at the edges"). a11y: `role="img"` + `aria-label` on hero variant only — correct (`:74-75`). **Severity:** LOW.

**F. Motion / cinematic transitions.** No `prefers-reduced-motion` guard anywhere in the viz — `motion.circle` will animate even on reduced-motion users. The `.deck-motion-safe` utility class exists (`index.css:528`) but isn't applied. The cinematic *gold* of CS3 — the `layoutId="cs3-prior-anchor"` morph from slide 23 hero into slide 27 backdrop (1.8s `cubic-bezier(0.4, 0, 0.2, 1)`) — is genuinely good and a model for the rest of the deck. **Continuity proposal for the CS3 arc:** add a second shared element — a small `94` numeral that lives bottom-right of the divider's `meta` row, gets a `layoutId="cs3-n-94"`, and morphs into slide 26's `SampleSizeWaterfall` left bar's `94` text on transition. The pediatric prior + sample-size shrink would be the two recurring motifs that thread the 7 slides. **Severity:** MED.

**G. Pattern conformity.** Uses `CaseHeroDivider` pattern — matches CS1/CS2 dividers (assumed). Sub-component dir `cs3-divider/` has 1 file; the file deserves a dir because `InformativePriorViz` is *imported by slide 27 too* (`27-case3-fit.jsx:7`), so this is correctly factored as a shared element. **Not over-engineered.**

**H. Top 3 actionable enhancements.**
| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Add `layoutId="cs3-n-94"` to a divider-meta `94` numeral and to `SampleSizeWaterfall.jsx:81` `94` text — earns the "94 → 60" beat across slides 23→24→26 with zero extra ink. | M | MED (continuity) |
| 2 | Wrap all 8 `motion.*` calls in `InformativePriorViz` with a `useReducedMotion()` check from framer-motion → fall back to the static `<circle>` branch already defined for `variant="context"`. | S | MED (a11y) |
| 3 | Reduce SVG text sizes from 4 distinct values (11/11.5/12/13) to 2 (11/13) at `InformativePriorViz.jsx:189-235`. | S | LOW (Brief §4) |

---

### Slide 24 · `case3-challenge` — `CS3 challenge · 94 adults isn't feasible`

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/24-case3-challenge.jsx`
**Slide job:** Frame the CS3 problem — pediatric drug, FDA-validated science, but 94-adult endpoint-powered trial is operationally undeliverable in a rare adult oncology population.

**A. Title / subtitle relationship.** Assertion title — good. Subhead is `maxChars=120` (`:81`), with three inline `<span>`-wrapped color words — wraps to ~3 lines on the 1920-canvas. Vertical rhythm is OK because subhead sits on its own row in `STANDARD_AREAS`. **No pinch.** **Severity:** LOW.

**B. Footer.** Present (`<Footer>` at `:296-300`). Kicker `"Case 03 · Challenge"` ✓. Tagline `"Source · FDA label 761102 (Dec 2018) · NCT04817761"` — slightly long but within rail. Page N/total comes from deck context. **Severity:** LOW.

**C. Spacing, density, alignment.** The Viz is a 4-row internal grid (`gridTemplateRows: 'auto auto auto 1fr'` `:94`) with: 3 anchor tiles + constraint callout + question card + 3 meta tags = **5 distinct grouped regions inside the Viz**, plus eyebrow/headline/subhead/footer = **9 elements**. Brief §4 caps at 6. Density is the main concern. Hardcoded px in inline styles: `:107` (`marginBottom: 12`), `:138-141` (`paddingLeft: 16`, `paddingTop: 4`, `paddingBottom: 4`), `:150` (`marginBottom: 8`), `:178` (`marginBottom: 4`), `:217` (`marginBottom: 10`), `:275` (`marginBottom: 3`), `:313` (`padding: '20px 22px 22px 22px'`), `:345` (`marginBottom: 10`), `:358` (`marginBottom: 6`). Should use `var(--space-*)` tokens. **Severity:** MED.

**D. Token compliance.** Hardcoded font-sizes outside the token scale: `'0.7rem'` (:104), `'0.66rem'` (:146), `'0.6rem'` (:175), `'0.58rem'` (:271). Mixed with `clamp(...)` literals at `:186`, `:213`, `:229`, `:283`. **Distinct font-sizes on the slide: ~8** (eyebrow, headline, subhead, anchor numeral, anchor label, anchor sub, constraint label, constraint value, question, body, meta key, meta value). Brief §4 caps at 3. Accent colors: only `--violet` + `--cream` family — ≤3 ✓. The `tk` helper at `:70` is declared but never read (only consumed via inline `var(--violet)`) — dead code. **Severity:** HIGH.

**E. Visual elements.** No charts; pure typographic-card layout. The "94" anchor tile uses the same numeral treatment as the bar in slide 26 — good local rhythm. The `linear-gradient` top-rule on `AnchorTile` (`:333`) is a single decorative pixel — fine. No chartjunk. a11y: `aria-hidden` on the rule (`:326`) ✓. **Severity:** LOW.

**F. Motion / cinematic transitions.** Animation chain runs `0.20s → 3.80s` across 11 staggered groups (`D` constants `:55-67`). No `prefers-reduced-motion` guard. The "94" anchor tile is the focal point per Brief §3 (5-second test) but it competes with "2018" and "~2028" given equal styling — demote those two to subdued. **Cinematic enhancement:** make the "94" anchor tile *bigger* (1.5×) and animate the constraint callout's left-border to grow *up* from the "94" tile's bottom edge — the visual chain "94 → why undeliverable → smaller smarter study?" reads in 2 seconds instead of 5. **Severity:** MED.

**G. Pattern conformity.** ✓ `SlideGrid + STANDARD_AREAS + SlideParts`. No sub-component dir — all helpers (`AnchorTile`) co-located in the slide file (under 400 lines, justified).

**H. Top 3 actionable enhancements.**
| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Collapse "constraint callout" + "bottom meta tags" into a single 3-column row at the slide bottom; remove the "question card" entirely (the headline already asks it). Drops slide from 9 → 6 elements. | M | HIGH (density · Brief §4) |
| 2 | Replace inline rem font-sizes at `:104, :146, :175, :271` with `var(--fs-slide-eyebrow)` / `var(--fs-slide-kicker)` and inline `padding`/`margin` literals at `:107, :138-141, :313, :345, :358` with `var(--space-*)` tokens. | M | HIGH (token compliance) |
| 3 | Visually elevate the "94" anchor tile (scale 1.4× or full-width-spanning) so it wins the 5-second test against "2018" and "~2028". | S | MED (focal point · Brief §3) |

---

### Slide 25 · `case3-strategy` — `CS3 strategy · two innovations stacked`

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/25-case3-strategy.jsx`
**Slide job:** Two FDA-precedented methods, combined for the first time in adult oncology — the "stack" claim of CS3.

**A. Title / subtitle relationship.** Assertion title — good. Subhead `maxChars=110` (`:77`), 2 inline color spans. Will wrap to 2–3 lines depending on Fraunces width. **Severity:** LOW.

**B. Footer.** Present (`:166-170`). Kicker `"Case 03 · Strategy"`. Tagline `"Source · PopED workflow (Tessier / Riglet, Paris) · Mentré et al."` — at the long end. **Severity:** LOW.

**C. Spacing, density, alignment.** Cleanest of the CS3 content slides — only 3 internal regions in Viz (label · 2-card grid · ribbon). The two `MoveCard`s are symmetric and aligned via grid (`:108-114`). The dashed-border ribbon at the bottom (`:121-162`) is a third visual emphasis layer — but it's narrative payoff, not data. Hardcoded px: `:184` (`'24px 26px 22px 26px'`), `:189` (`gridTemplateRows`), `:191` (`rowGap: 12`), `:199` (`gap: 12`), `:202-217` (38px-circle chip metrics), `:268` (`rowGap: 8`), `:277` (`'110px 1fr'` — the magic-number left column), `:312` (`paddingTop: 8`). The `'110px 1fr'` evidence-row column at `:277` will break if a label like "Augmentation" expands — currently every label fits, but it's brittle. **Severity:** MED.

**D. Token compliance.** Hardcoded font-sizes: `'0.7rem'` (:97), `'0.84rem'` (:211), `'0.68rem'` (:222), `'0.6rem'` (:137), `'0.74rem'` (:250, :273), `'0.66rem'` (:283), `'0.58rem'` (:285, :322). Plus `clamp(...)` literals at `:149, :213, :236, :296, :333`. **Distinct font-sizes: ~9.** Accents: only `--violet` + cream family ✓. `tk` helper unused (`:65`). **Severity:** HIGH (same root cause as slide 24).

**E. Visual elements.** No charts; the two `MoveCard`s are the visual. Each card has 5 stacked rows (numbered chip + headline + method + 4-row evidence list + FDA precedent footer) — that's a lot, but it's the slide's *job* to show two parallel structures. Card-vs-card symmetry is the visual move — **good**. No chartjunk. The dashed border on the ribbon at `:126` and the dashed border-bottom on the method line at `:254` are TWO places the dashed treatment carries meaning — risk of "dashed = decorative" if it spreads further. **Severity:** LOW.

**F. Motion / cinematic transitions.** Cleanest motion budget in the batch — only 8 staggered beats, last fires at 2.85s. No reduced-motion guard. **Cinematic enhancement:** when the bottom ribbon enters at `D.ribbon = 2.45s`, animate a thin violet line *between* the two `MoveCard`s growing left-from-card-1 and right-from-card-2 to meet at the `+` glyph (`:155`) — physically draws the "stack" claim. Use `pathLength` on a single `<motion.path>`. **Severity:** MED.

**G. Pattern conformity.** ✓ `SlideGrid + STANDARD_AREAS + SlideParts`. No sub-component dir — `MoveCard` co-located.

**H. Top 3 actionable enhancements.**
| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Replace inline rem font-sizes at `:97, :137, :211, :222, :250, :273, :283, :285, :322` with `--fs-slide-*` tokens (or extract `--fs-card-label`, `--fs-card-meta` once and reuse across CS3 cards). | M | HIGH (token compliance) |
| 2 | Replace the `gridTemplateColumns: '110px 1fr'` magic-number at `:277` with `'minmax(96px, max-content) 1fr'` so labels never clip if copy changes. | S | MED (resilience) |
| 3 | Add the violet "stack" line that draws between cards into the bottom ribbon (motion enhancement). Use a single `<motion.line>` + `pathLength`. | S | MED (cinema) |

---

### Slide 26 · `case3-fda-engagement` — `CS3 FDA · agreed N=60 (−36%)`

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/26-case3-fda-engagement.jsx` (+ `cs3-engagement/SampleSizeWaterfall.jsx`)
**Slide job:** Show the regulatory exchange that approved a 36% sample-size reduction — pharmacometrics as architecture, not service.

**A. Title / subtitle relationship.** Strong assertion ("FDA agreed to N=60 — a 36% reduction"). Subhead `maxChars=120`, 1 inline color span. Should wrap to 2 lines — readable. **Severity:** LOW.

**B. Footer.** Present (`:237-241`). Kicker `"Case 03 · FDA engagement"`, tagline `"Source · FDA Type A meeting · 21 Jul 2023 · NCT04817761"`. ✓. **Severity:** LOW.

**C. Spacing, density, alignment.** **THIS IS THE DENSEST SLIDE IN THE BATCH.** Viz internals: a top row split waterfall+3-pillar-stack, a middle row of 2 quote cards, and a bottom payoff card — **6 sub-regions in the Viz** + chrome rows = **10 visual elements**. Brief §4 caps at 6. The waterfall is height-capped at `38vh` (`:135`) — on a 1080-tall canvas that's ~410px, but on a 720-tall laptop that's ~273px which won't fit the 360-unit viewBox cleanly. **Risk: waterfall callout `−36%` at viewBox y=20 may collide with the eyebrow/headline rail.** Hardcoded px: `:135, :139, :255, :258, :310-359` throughout `PillarStatus` and `QuoteCard`. **Severity:** HIGH.

**D. Token compliance.** Hardcoded font-sizes: `'0.7rem'` (:125, :153), `'0.66rem'` (:184), `'0.62rem'` (:290), `'0.6rem'` (:364), `'0.74rem'`, `'0.58rem'`. SVG text in `SampleSizeWaterfall` uses raw integer sizes (`44, 56, 26, 11, 10, 9`) at `cs3-engagement/SampleSizeWaterfall.jsx:75, 134, 207, 218`. **Distinct font-sizes: ~10.** `tk` helper unused (`:71`). **Severity:** HIGH.

**E. Visual elements (`SampleSizeWaterfall` + `PillarStatus` + `QuoteCard`).** The waterfall is the strongest viz in the batch — two bars + curved arrow + `−36%` callout in 360 units, animation builds bar-1 → numeral-1 → bar-2 → numeral-2 → arrow → callout (cs3-engagement/SampleSizeWaterfall.jsx:50-189). **Chart-junk check:** the rounded `rx={3}` on bars, dashed stroke on left bar, and the `−36%` rounded-rect callout are all defensible (each carries meaning). **Honest axis check:** there's no y-axis — bars are visually proportional (140/220 ≈ 64%, matches 60/94 = 64%) ✓. The right column's three `PillarStatus` rows compete with the waterfall for the eye — Brief §3 fails because there are TWO equal focal points on the slide top half. The two `QuoteCard`s on the bottom row introduce a third visual register. The closing payoff card is a fourth. **Severity:** HIGH.

**F. Motion / cinematic transitions.** Longest animation tail in the batch — `D.source = 4.40s` (`:67`). Speaker arrives at "−36%" before the chart does. The waterfall numerals fire at `delay+0.7` and `delay+1.5` (so absolute 1.75s and 2.55s) — this is the slide's punchline and lands almost halfway through the slide's lifetime. **Cinematic enhancement:** add `layoutId="cs3-pct-36"` to the `−36%` `<text>` at `cs3-engagement/SampleSizeWaterfall.jsx:209` and to slide 28's `−36%` numeral at `28-case3-impact.jsx:79` — the percentage *literally flies from chart to hero* across the slide-26→28 transition. This is the single highest-impact continuity move available in the deck. No reduced-motion guard. **Severity:** HIGH.

**G. Pattern conformity.** ✓ `SlideGrid + STANDARD_AREAS + SlideParts`. Sub-component dir `cs3-engagement/` has 1 file (`SampleSizeWaterfall.jsx`) — see cross-cutting #4.

**H. Top 3 actionable enhancements.**
| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Add `layoutId="cs3-pct-36"` to `cs3-engagement/SampleSizeWaterfall.jsx:209` (the `−36%` text) and to `28-case3-impact.jsx:223` (the `−36%` numeral). Single-line continuity that ties two slides into one cinematic beat. | S | HIGH (cinema · 5-second test) |
| 2 | Cut the bottom payoff card (`:208-233`) — the headline + the waterfall already say it. Reduces slide from 10 → 9 elements; gives the two quote cards more vertical room. | S | HIGH (density · Brief §4) |
| 3 | Compress animation timeline: cap `D.source` at `2.8s` (currently 4.40s); drop `D.payoff` (cut per #2); merge `D.quotesLabel`/`D.quotes` into a single fade. Speaker should reach the slide's "agreed N=60" punchline within the first 2 seconds, not 2.55s. | M | HIGH (pacing · CS3 should feel TIGHT) |

---

### Slide 27 · `case3-fit` — `CS3 fit · sixty adults are enough`

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/27-case3-fit.jsx` (+ `cs3-fit/RseStabilityCurve.jsx`)
**Slide job:** Argue numerically that 60 adults is *as precise as* 94 because the information lives in the pediatric prior.

**A. Title / subtitle relationship.** Assertion title with strong italic emphasis ("sixty adults anchor a model that *already knows* most of the answer"). Subhead `maxChars=130` (`:64`) — the longest in the batch — with 2 inline color spans. **High wrap risk** (4+ lines on tablet). **Severity:** MED.

**B. Footer.** Present (`:230-234`). Kicker `"Case 03 · Fit"`. Tagline `"Source · Pediatric PopPK (AALL07P4 + DFCI 11-001) · Asparlas label · sensitivity illustrative"` — **longest tagline in the batch**, may truncate (the `<Footer>` applies `min-w-0 truncate` — `SlideParts.jsx:165`). **Severity:** MED.

**C. Spacing, density, alignment.** Two-column body (`1.05fr 1fr` `:117`) is good rhythm. Left column stacks 2 evidence blocks; right column has 1 chart. **Cleanest dense slide in the batch.** The morphed-in `InformativePriorViz` backdrop at `:92-107` is positioned `top: 38%, right: -6%` with `opacity: 0.32` and `mixBlendMode: screen` — it sits *behind* the right-column chart. The `@media (max-width: 1100px)` guard at `:108-112` correctly hides it on tablets. Hardcoded px: `:99` (transform), `:247-258` (`EvidenceBlock` padding/border-radius), `:264-278` (numbered chip 30px), `:319` (`'14px 1fr'` bullet column). **Severity:** LOW.

**D. Token compliance.** Hardcoded font-sizes: `'0.7rem'` (:133, :173), `'0.66rem'` (:283), `'0.74rem'` (:273), inline raw SVG sizes in `RseStabilityCurve`: `10, 9, 11, 10` at `cs3-fit/RseStabilityCurve.jsx:84, 96, 230, 243`. **Distinct font-sizes: ~9.** `tk` helper unused (`:52`). **Severity:** HIGH.

**E. Visual elements (`RseStabilityCurve`).** The chart is illustrative (caption at `cs3-fit/RseStabilityCurve.jsx:251` "illustrative · not a specific parameter"). **Chart honesty:** the y-axis has no numeric ticks — only "high" / "low" labels and a "PARAMETER %RSE" rotated title. This is honest because the curve IS illustrative — but Brief §16 (scientific decks) says "every chart has N and a confidence interval or error bar if applicable." The N is implicit (x-axis) and there's no CI band. The plateau-zone shading (`:147-155`) is a good "look here" anchor, and the `N = 60 · plateau` callout at `:225-236` directs attention well. **Modernization:** the path is computed by hand-rolled cubic-spline interpolation (`:50-58`) — fine, but the `pathLength` animation at `:165` already exists; could add a synchronized `motion.rect` plateau-zone reveal that *grows from the N=60 marker outward*. **Chart-junk:** rounded marker stroke, glow filter unused — clean. a11y: `role="img"` + descriptive `aria-label` ✓. **Severity:** LOW (honest illustrative chart).

**F. Motion / cinematic transitions.** **`InformativePriorViz` morph from slide 23 is the cinematic centerpiece** of CS3 — `LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] }` (`cs3-divider/InformativePriorViz.jsx:37`) — a slow, deliberate "camera pullback" as the prior relocates from divider hero to fit backdrop. Strongly executed. **Animation tail:** D.source = 3.65s, OK. No reduced-motion guard. **Cinematic enhancement (continuity):** synchronize the `RseStabilityCurve` curve animation (`delay = D.curve = 1.30s`, `duration: 1.4s`) so it finishes *exactly when* the morphing prior settles (1.8s morph that started at slide-transition t=0). Currently the prior morph runs in parallel with the unrelated chart entrance, missing the "the prior arrives → the curve plateaus" beat. **Severity:** MED.

**G. Pattern conformity.** ✓ `SlideGrid + STANDARD_AREAS + SlideParts`. Sub-component dir `cs3-fit/` has 1 file (`RseStabilityCurve.jsx`). The `InformativePriorViz` is *also* imported here — so the slide has 2 sub-components but only 1 lives in `cs3-fit/`. See cross-cutting #4.

**H. Top 3 actionable enhancements.**
| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Tighten subhead at `:64-71` to ≤95 chars (drop "for the parameters that drive dose decisions" — re-add to speaker notes). Eliminates the 4-line wrap risk. | S | MED (title/subhead pinch) |
| 2 | Synchronize `RseStabilityCurve` curve animation to start when the `InformativePriorViz` morph completes (delay ≈ 1.8s) — earns the "prior arrives → curve plateaus" cinematic beat. Edit `D.curve` (`:46`) → 1.85. | S | MED (cinema) |
| 3 | Shorten the footer tagline at `:232` ("Source · Pediatric PopPK · Asparlas label · sensitivity illustrative") to avoid `truncate` clipping. | S | MED (footer rail) |

---

### Slide 28 · `case3-impact` — `CS3 impact · 36% · precedent · template`

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/28-case3-impact.jsx`
**Slide job:** The CS3 value-extraction beat — three big numerals (−36% · 3× · 2) → durable contribution callout.

**A. Title / subtitle relationship.** **No subhead** — assertion title only ("A 36% enrollment reduction. A documented precedent. A methodology that travels."). The headline IS three short sentences. Vertical rhythm: headline + viz + footer rows. Cleaner than slides 24/27. **Severity:** LOW.

**B. Footer.** Present (`:191-195`). Kicker `"Case 03 · Impact"`, tagline `"Source · FDA Type A 21 Jul 2023 · NCT04817761 (status 9 Feb 2026)"`. ✓. **Severity:** LOW.

**C. Spacing, density, alignment.** Three numeral blocks across (`gridTemplateColumns: 'repeat(3, 1fr)'` `:128`) + sweeping arc behind + durable-contribution callout below = **5 elements**. Within budget. The arc behind (`:101-121`) uses `viewBox="0 0 1920 720"` with `preserveAspectRatio="xMidYMid slice"` — assumes a specific slide aspect; on a portrait or short viewport will crop badly. Hardcoded px: `:207` (`rowGap: 10`), `:269, :277` (`'14px 1fr'`), `:267, :268`. **Severity:** MED.

**D. Token compliance.** Hardcoded font-sizes: `'0.72rem'` (:230), `'0.62rem'` (:163). Mixed `clamp(...)` at `:212, :230, :246, :281`. **Distinct font-sizes: ~6** (eyebrow, headline, big-numeral, title, sub, row). Accents: `--violet` + cream — ≤3 ✓. The `tk` helper IS used here (the `<motion.path>` at `:107` uses `tk('--violet')` for stroke) — first non-dead `tk` declaration in the batch. **Severity:** MED.

**E. Visual elements.** Three big numerals with three rows each — the slide's job is to be a **big-number primitive ×3** (Brief §15). The first numeral `−36%` is in violet+italic (focal point); the other two are cream — correct hierarchy. The decorative SVG arc at `:101-121` runs at 0.10 stroke-opacity → barely visible on a dark background; might as well delete or strengthen to 0.18-0.22. Currently it's almost-invisible chartjunk (Brief §10 hard rule: no chartjunk). **Severity:** MED.

**F. Motion / cinematic transitions.** Tabular treatment via `font-variant-numeric: tabular-nums` is **NOT applied** to the big numerals at `:212-223` — when the −36% animates with `scale: 0.8 → 1` and `y: 30 → 0`, the `−` and `%` glyphs in proportional Fraunces will jitter. Add `fontVariantNumeric: 'tabular-nums'` (Brief §5). The arc draws via `pathLength` (good). **Cinematic enhancement (continuity):** as noted in slide 26 rec #1 — the `−36%` numeral here at `:223` should have `layoutId="cs3-pct-36"` matched to the `−36%` text in `SampleSizeWaterfall.jsx:209`. The chart-callout *literally becomes* the impact hero. No reduced-motion guard. **Severity:** HIGH (continuity miss + tabular-nums miss on a heavy-numerals slide).

**G. Pattern conformity.** ✓ `SlideGrid + STANDARD_AREAS + SlideParts`. No sub-component dir — co-located `NumeralBlock` helper.

**H. Top 3 actionable enhancements.**
| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Add `layoutId="cs3-pct-36"` to the `−36%` numeral at `:223` (paired with edit in `SampleSizeWaterfall.jsx:209`) — the chart's punchline morphs into the impact hero across the 26→28 transition. | S | HIGH (cinema · audit calibration) |
| 2 | Add `fontVariantNumeric: 'tabular-nums'` to all three numeral styles at `:212-223` and to the row text at `:281`. Brief §5. | S | HIGH (tabular numerals · heavy-numerals slide) |
| 3 | Either strengthen the decorative arc opacity (`:113`) from 0.10 → 0.20 OR delete the SVG entirely. Currently it's ghost-chartjunk. | S | MED (chart-junk · Brief §10) |

---

### Slide 29 · `case3-bridge` — `CS3 bridge · themes recap · → closing`

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/29-case3-bridge.jsx`
**Slide job:** Close CS3 with a 4-element coda (template · pipeline-bridge · payoff · themes ribbon) that mirrors slides 14 (CS1) and 22 (CS2) bridges.

**A. Title / subtitle relationship.** Assertion title — good. **No subhead.** Headline `maxChars=42` (`:69`) is the tightest in the batch. **Severity:** LOW.

**B. Footer.** Present (`:268-272`). Kicker `"Case 03 · Bridge"`. Tagline at the long end. ✓. Eyebrow uses `cream-muted` color at `:68` (not the `--violet` case color) — *intentionally muted* to signal "we're closing this case." Consistent with CS1/CS2 bridges presumably. **Severity:** LOW.

**C. Spacing, density, alignment.** **DENSEST SLIDE IN THE BATCH (and in CS3 arc).** Viz internals: top split (template-checklist + PipelineBridgeCard) + payoff line + ICH M15 coda card + 3-tile themes ribbon = **6 distinct regions in Viz**. Plus eyebrow + headline + footer = **9 elements total**. Brief §4 caps at 6. The grid template at `:83` is `'auto auto 1fr'` (3 rows) but the children render 4 rows (top split, payoff, coda, themes ribbon) — the last row will overflow the viz area into the footer. **Likely overflow on short viewports.** Hardcoded px: many — `:105, :120-122, :297-307, :331-336, :347, :359` etc. **Severity:** HIGH.

**D. Token compliance.** Hardcoded font-sizes: `'0.72rem'` (:103, :230, :355), `'0.68rem'` (:200), `'1.6rem'` (:343 — the theme glyph). Mixed clamps `:172, :210, :312, :368`. **Distinct font-sizes: ~10.** Accents: theme tiles use the **5-color theme palette** (`--coral, --amber, --cyan, --sage, --violet`) — but only 3 are active per `ACTIVE_NUMS = ['01', '04', '05']` (`:27`). Even so, the 3 active-theme glyphs each get their own color → on this slide there are 3 *meaningful* accent colors + the violet bridge color = **4 active accent colors**, which is just over Brief §4's "≤3 accent colors" cap. The theme-recap mechanism is intentional and load-bearing across the deck, but it's worth noting. **Severity:** MED.

**E. Visual elements.** No charts; uses the imported `PipelineBridgeCard` from `cs1-bridge/`. The `Check` icon from `lucide-react` is the only non-deck-system icon used — single icon family ✓. Three `ThemeTile`s at the bottom + the coda card + payoff line + checklist + bridge card = 6+ regions. **The slide is doing too much** for the "fast 5-slide CS3 arc" the audit calibration warned about. **Severity:** HIGH.

**F. Motion / cinematic transitions.** Animation tail to 3.40s (D.source). Multiple parallel staggered groups. No reduced-motion guard. **Continuity proposal:** the three `ThemeTile`s at the bottom (theme 01, 04, 05) could share `layoutId`s with the next slide's (slide 30 closing-divider) theme display IF the closing divider re-uses the same theme palette. Without seeing slide 30, this is speculative. A safer continuity move: the violet payoff line at `:163-181` ("The win wasn't a smaller trial — it was a precedent the next program can cite.") could share a `layoutId` with a closing-act tagline. **Severity:** MED.

**G. Pattern conformity.** ✓ `SlideGrid + STANDARD_AREAS + SlideParts`. Imports `PipelineBridgeCard` from `cs1-bridge/` (cross-case shared component — good). Mirrors CS1 (slide 14) and CS2 (slide 22) bridge structure (per the comment at `:13`).

**H. Top 3 actionable enhancements.**
| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Cut either the payoff line (`:163-181`) OR the ICH M15 coda card (`:184-224`) — both fight for the "post-template, pre-themes" emotional beat. The payoff is more powerful; cut the coda or move it to speaker notes. Drops slide from 6 → 5 viz regions. | S | HIGH (density · CS3 should feel tight) |
| 2 | Fix the row-template mismatch at `:83` (`gridTemplateRows: 'auto auto 1fr'` declares 3 rows but children render 4). Add a fourth `auto` row OR consolidate per #1. Likely overflow. | S | HIGH (overflow risk · Brief §10) |
| 3 | Replace inline rem font-sizes at `:103, :200, :230, :343, :355` with `--fs-slide-*` tokens (or extract a small ribbon-token set). | M | MED (token compliance) |

---

## Cross-cutting recommendations from this batch

1. **Token-debt is the single largest finding across CS3.** Every content slide (24, 25, 26, 27, 28, 29) declares 6–10 distinct hardcoded `'0.X rem'` font-sizes inline that should consume `--fs-slide-*` tokens. Brief §4 caps the slide at 3 distinct sizes; the deck currently runs ~8–10 per slide. **Recommendation:** add 3 new tokens to `index.css` — `--fs-slide-card-label` (~0.68rem), `--fs-slide-card-meta` (~0.62rem), `--fs-slide-bignum-md` (~clamp(2.4rem, 3.4vw, 3.8rem)) — and replace the inline literals across the batch in one sweep. Estimated effort: M for the whole batch.

2. **Animation tails are too long for a "fast 5-slide CS3 arc."** Five of seven slides end after 3.4s; slide 26 ends at 4.40s. The audit calibration explicitly warned CS3 should feel TIGHTER and faster. **Recommendation:** cap `D.source` at ≤2.8s on every CS3 content slide; consolidate parallel labels into single fades; remove redundant payoff cards (slide 26 #2, slide 29 #1).

3. **No `prefers-reduced-motion` honored on any CS3 slide.** Six animated SVG components (`InformativePriorViz`, `SampleSizeWaterfall`, `RseStabilityCurve`, the slide-28 arc, the slide-29 themes stagger, every `motion.div` entrance) ignore the user preference. The `.deck-motion-safe` utility exists in `index.css:528` but is unused. **Recommendation:** add `useReducedMotion()` from framer-motion at the slide level → conditionally swap `motion.*` for plain elements OR set `transition.duration: 0` for all motion in the slide. Single-day fix for the whole CS3 arc.

4. **Sub-component dirs `cs3-divider/`, `cs3-engagement/`, `cs3-fit/` each contain exactly 1 file — but the pattern is JUSTIFIED, not over-engineered.** `InformativePriorViz` lives in `cs3-divider/` and is imported by slide 27 → it's a *shared element* and the directory namespacing matches its CS3-arc-wide role. `SampleSizeWaterfall` and `RseStabilityCurve` are slide-specific but each is a 200+ line SVG component — extracting them keeps the slide files under 400 lines and matches the CS1 (`cs1-background/`, `cs1-build/`, etc.) and CS2 (`cs2-shared/`) precedent. **Recommendation:** keep the dirs. If a second visual moves into `cs3-engagement/` (e.g. a `PillarStatusGrid.jsx` extracted from the inline component in `26-case3-fda-engagement.jsx`), the dir-per-component pattern proves itself.

5. **The "94 → 60 → −36%" thread is the strongest under-used continuity opportunity in CS3.** The number appears verbatim on slides 23, 24, 26, 28 in different visual treatments, but no `layoutId` ties them. **Recommendation:** add two `layoutId`s — `cs3-n-94` (slide 23 meta → slide 26 waterfall left bar) and `cs3-pct-36` (slide 26 callout → slide 28 hero numeral). Two single-line edits. Pairs with the existing `cs3-prior-anchor` morph and turns CS3 from "7 slides about a case" into "one continuous story told in 7 frames."

6. **Dead `tk` helpers in slides 24, 25, 26, 27.** Each declares `const T = useTokens([...])` and `const tk = (n, fb) => ...` but never uses `tk` (only inline `var(--violet)`). Slide 28 IS using it correctly (for the SVG arc). **Recommendation:** remove the dead declarations OR commit to the `tk` pattern uniformly (preferred: remove the dead code; SVG `var()` consumption works fine in modern browsers).
