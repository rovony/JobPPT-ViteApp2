# qp2-seminar slide review — Batch 2 (slides 8–14)

**Reviewer:** Claude (slide-review subagent · batch 2)
**Date:** 2026-04-24
**Scope:** CS1 main arc — strategy, build, fit charts, impact numerals, bridge
**Method:** static source review against zaj-slides rubric. No browser.

## Batch summary

- **HIGH-severity findings across batch:** 11
- **Slides with title/subtitle overlap or pinch issues:** 10 (11d), 13 (case-impact)
- **Slides bypassing SlideGrid/SlideParts:** 10 (11d-case-fit) — fully rolls own absolute layout, hardcodes page number `08 / 20`, ignores deck context
- **Chart-bearing slides with chart-junk issues:** 10 (11d), 11 (11e), 12 (11f) — all dense, multi-element legends, repeated unit text
- **Cross-batch patterns (3+ slides share an issue):**
  - "no token match" hardcoded `clamp(...)` font sizes in DecisionColumn, DatasetCell, HeroDelta, PipelineBridgeCard, ThemeTile (8, 9, 11, 14)
  - `HighlightWord delay={1.2}` / `delay={1.4}` literal across 8, 9, 10, 11, 12 — no token, no shared idiom
  - Coral case-color contaminated by amber accent (8 ribbon, 13 numerals, 14 payoff/coda) — three slides break the "one case · one color" semantic
  - 3-row inner viz grid `1fr auto auto` / `auto auto 1fr` repeated verbatim on 11, 12, 14 — primitive candidate

## Per-slide reviews

### Slide 8 · `case-strategy` — Strategy · three decisions

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/11b-case-strategy.jsx`
**Slide job (1 sentence):** Frame the three architectural decisions (Anchor / Constrain / Stay parsimonious) as regulatory defenses, each with a small viz under it.

**A. Title / subtitle relationship** — Assertion title ✓ ("Three design decisions. Each one a regulatory defense."). Headline `maxChars={30}` (line 75) is tight against the second clause "Each one a regulatory defense." which on narrow widths will wrap awkwardly mid-clause; raising to 34 matches the deck default. Subhead `maxChars={65}` (line 83) is OK but the inline `<HighlightWord>` is mid-sentence and adds 3 nested spans — no pinch issue at default sizes but **MED**: line-height between Headline (`var(--lh-tight)` 0.94) and Subhead (`var(--lh-snug)` 1.10) is fine via SlideFrame; no `paddingTop: '0.5em'` antipattern here.

**B. Footer** — Present, uses `<Footer>` via SlideFrame (line 84-85). Kicker "Case 01 · Strategy" matches pattern. Tagline contains `&amp;` entity literal `Anderson &amp; Holford 2008` (line 85) — will render as literal `&amp;` because JSX strings don't decode HTML entities. **HIGH** bug: should be `Anderson & Holford 2008` plain.

**C. Spacing, density, alignment** — `paddingBottom: 'var(--space-3)'` on viz container (line 98) lifts the closing ribbon above the SlideFrame's footer, good. The defense-bracket SVG uses `viewBox="0 0 300 100"` with `preserveAspectRatio="none"` (line 115) — **MED**: brackets stretch vertically to the column height; on tall viewports this distorts the corner radii and stroke widths visibly. Bracket math `[0, 100, 200].map((x, i) => ...)` (line 119) hardcodes 3-column layout into the SVG; if the column count ever changes, the bracket layer silently misaligns.

**D. Token compliance** — Hardcoded values that **break the token system**:
  - `fontSize: 'clamp(1.4rem, min(2.2vw, 3.6vh), 2.4rem)'` (line 253) — author flagged "// no token match — consider adding one"
  - `lineHeight: 1.35` (line 182), `letterSpacing: '-0.005em'` (line 186) — "no token match"
  - `width: 14, height: 14` raw px (lines 167-168) for amber diamond — not on `--space-*` scale
  - `boxShadow: '0 0 12px ...'` (line 169) — drop-shadow on the amber diamond breaks §10 "no drop shadows on cards"
  - Unique font-sizes count: 4 (eyebrow var, headline var, kicker var, hardcoded action `2.4rem`, ribbon `tagline` var) → 5 distinct sizes, **above target of ≤3**
  - Accent colors: coral (case) + amber (closing ribbon) + cream tints — **2 active accents + amber introduces a NEW meaning ("synthesis") on a coral-themed slide**. Borderline.

**E. Visual elements** — `IntegrateViz`, `ConstrainViz`, `ParsimonyViz` from `cs1-strategy/DecisionVisuals.jsx`. Quality is high (deterministic SVG, no chart-junk, bbox audits in comments, prefers-reduced-motion respected). One concern: `IntegrateViz` runs **infinite-loop sprite particles** (`repeat: Infinity` line 235, 253 in DecisionVisuals.jsx) — the user-noted "limit ambient animations" guidance was applied to `ParsimonyViz` (line 657: "no looping") but NOT to `IntegrateViz`'s adult→center / pediatric→center streams. **MED**: visual noise budget exceeded on a strategy slide that should sit still after entrance. `ConstrainViz` arrow sprites correctly use `repeat: 1`.

**F. Motion / cinematic transitions** — `useReducedMotion` gates the sprites in DecisionVisuals ✓. The amber diamond has an overshoot ease `[0.34, 1.56, 0.64, 1]` (line 173) — token `--ease-overshoot` exists in index.css line 168; replace literal. **Cinematic enhancement**: the 3 columns share the same Decision-NN · Label kicker pattern but enter independently. Wrap each column in a shared `layoutId` keyed to the decision number — when navigating slide 7→8 the FocalQuestion's "answer" pill could morph into the first decision's kicker, completing the question→answer beat described in lines 140-143 comments.

**G. Pattern conformity** — Uses SlideFrame ✓. Sub-components factored cleanly (DecisionVisuals.jsx separate). Internal `<DecisionColumn>` is local; could move to `cs1-strategy/` for reuse.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort (S/M/L) | Severity |
|---|---|---|---|
| 1 | Replace `&amp;` HTML entity with `&` in `footerTagline` (line 85) — currently renders as literal `&amp;` | S | **HIGH** |
| 2 | Stop `IntegrateViz` adult/pedi sprites after 2 cycles (`repeat: 2`) at `cs1-strategy/DecisionVisuals.jsx:235, 253` to match the project's "limit ambient animations" rule already applied in `ParsimonyViz` | S | MED |
| 3 | Add `--fs-section-title` token (e.g. `clamp(1.4rem, min(2.2vw, 3.6vh), 2.4rem)`) and replace the 3 "no token match" sites at `11b:182,186,253`; remove the amber diamond's `boxShadow` (line 169) per §10 | M | MED |

---

### Slide 9 · `case-build` — Build · sequential workflow

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/11c-case-build.jsx`
**Slide job:** Show the 6-step sequential PopPK build (dataset + schematic on left, flowchart on right) and signal that pcVPC passed.

**A. Title / subtitle relationship** — Assertion ✓ ("Adult foundation first. Then pediatric inference."). `headlineMaxChars={30}` and `subheadMaxChars={60}` (lines 44, 52). Subhead has 3 nested colored spans + a HighlightWord — **MED**: at 60ch the line "Six sequential steps — each one set up the next. No one-shot analysis." will wrap to 2 lines on most viewports, then the centered phrase splits oddly between lines.

**B. Footer** — Present, uses `<Footer>` via SlideFrame. Kicker "Case 01 · The build" matches pattern. Tagline cites a parenthetical NCT number which wraps awkwardly inside the footer's `truncate` class on `var(--fs-slide-tagline)`.

**C. Spacing, density, alignment** — Two-column 2fr/3fr split (line 62). Left column stacks "dataset card" over "schematic card" with `gap: 'var(--space-4)'`. The schematic card uses `flex: 1, minHeight: 0` (lines 112-113) and lets `<CompartmentSchematic>` fill — but `CompartmentSchematic.jsx:50` sets `style={{ height: 200 }}` (hardcoded px). **HIGH**: the 200px floor will visibly clip on short viewports while the surrounding card still grows; the schematic card label `marginBottom: 'var(--space-2)'` plus 200px schematic plus footer caption may overflow the card on a phone-landscape.

**D. Token compliance** — Hardcoded:
  - `fontSize: 'clamp(2rem, min(3vw, 5vh), 2.6rem)'` (line 218) on `DatasetCell` value — same "no token" problem as 11b
  - `marginTop: 'var(--space-1)'` on a font-size 2rem element with `lineHeight: 1` (line 219) — risks descender clipping
  - DatasetCell label uses `var(--fs-slide-pageno)` (line 208) which the index.css token sets to `clamp(0.55rem, ..., 0.7rem)` — that's the smallest token in the system, used here for a *primary* label. Should be `--fs-slide-eyebrow` or `--fs-slide-kicker`
  - Unique font-sizes count: 5+ (header kicker, dataset label `--fs-slide-pageno`, big number 2.6rem, meta `--fs-slide-kicker`, NONMEM caption `--fs-slide-pageno`, schematic label) — **above ≤3 target**

**E. Visual elements** — `CompartmentSchematic` (left, infinite particle flows on Ka/Q+/Q−/CL paths via `repeat: Infinity`-style schedule per file header), `DecisionGate` (right, 6-node flowchart). Both are well-factored and documented. Chart-junk check ✓ (no 3D, no shadows on the cards). **MED**: combined ambient motion budget — schematic particles loop forever, DecisionGate "particles travel MAIN YES path... 3 staggered coral dots, 6s per cycle, 2 passes then STOP" (DecisionGate.jsx header) — the schematic's INFINITE loop dominates after 12s and contradicts the DecisionGate's stop-after-2-passes choice.

**F. Motion / cinematic transitions** — Cards use `initial={{ opacity: 0, y: 12 }}`. `useReducedMotion` not gated at this slide level (only inside child components). **Cinematic enhancement**: morph the dataset card's "380 + 39" totals into the impact slide's `39` numeral via shared `layoutId="cs1-n-pediatric"`. That carries the "39 patients" thread visually across slides 9 → 13.

**G. Pattern conformity** — Uses SlideFrame ✓. Sub-components in `cs1-build/`. Layout justified.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Remove hardcoded `height: 200` from `cs1-build/CompartmentSchematic.jsx:50`; use `width: '100%', height: '100%'` so the SVG fills the parent card. Card already provides `flex: 1, minHeight: 0` at `11c:112-114` | S | **HIGH** |
| 2 | Switch DatasetCell label (line 208) from `--fs-slide-pageno` to `--fs-slide-eyebrow` (or new `--fs-card-label`); reduce DatasetCell value from hardcoded `clamp(2rem, ..., 2.6rem)` to a deck token — same fix as 11b | M | MED |
| 3 | Throttle `CompartmentSchematic` particles (`Infinity`) to `repeat: 3` to match the DecisionGate's "2 passes then stop" idiom — comment at `DecisionGate.jsx:60` shows the team already chose this pattern | S | MED |

---

### Slide 10 · `case-fit-pcvpc` — Model fit · pcVPC

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/11d-case-fit.jsx`
**Slide job:** Show pcVPC pass + parameter table + covariate-screen receipt + "no systematic bias" payoff.

**A. Title / subtitle relationship** — Assertion ✓. Headline at `top: '11vh'` (line 84), subhead at `top: '24vh'` (line 107) — **HIGH** vertical pinch identical to user's slide 02 calibration callout. Headline is `clamp(1.8rem, 3vw, 3.2rem)` italic, subhead is `clamp(0.85rem, 1vw, 1.05rem)` italic — at typical 1080p the subhead starts ~13vh below the headline baseline; on a 720p projector that drops to ~9vh and the italic descender of "without systematic bias." kisses "pcVPC ·" beneath. Not pinched at desktop; **HIGH on short viewports**.

**B. Footer** — **HIGH** bug: hardcoded `08 / 20` page number (line 298) — bypasses `<Footer>` entirely, so when slide order changes the number lies. The other 6 slides in this batch use `useDeck()` via Footer. Source citation duplicates as `<motion.div>` with absolute `bottom: '3vh'` (lines 271-300) instead of `<Footer kicker tagline>`. Tagline-as-italic + page-no-as-mono pair is correct visually but **bypasses deck context**.

**C. Spacing, density, alignment** — **HIGH**: bypasses SlideGrid/SlideFrame entirely. Five separate absolute-positioned blocks pegged to viewport vh (`top: 6vh, 11vh, 24vh, 32vh, bottom: 16vh, 9vh, 3vh`). Risk-cascade:
  - `top: '32vh'` chart + `bottom: '16vh'` cov-ribbon + `bottom: '9vh'` payoff + `bottom: '3vh'` footer = 4 absolute blocks competing for the 100dvh height
  - On a 720p screen with `--deck-pad-top: 4rem` chrome, `top: 32vh` chart starts ~230px in; `maxHeight: '42vh'` (line 401) caps chart height — meaning the chart bottom hits ~74vh; with `bottom: 16vh` cov-ribbon starting at 84vh of the body, **chart can collide with covariate ribbon on viewports under ~900px tall**
  - Right-side parameter table `left: '60%'`, `right: 'var(--deck-gutter)'` — 40% width column for a 5-column data table → narrow on phone-landscape, columns will wrap
  - Legend SVG at `transform={`translate(${iw - 460}, 6)`}` (line 498) hardcodes a 460px-wide legend offset — on the 1080-wide chart viewbox that consumes 43% of inner width; on real render at smaller scales the legend pieces still fit but **HIGH** if W changes the layout silently breaks

**D. Token compliance** — Hardcoded colors via `tk('--coral')` etc. (good — resolved hex for SVG attrs). But:
  - `fontSize: '0.7rem'`, `'0.65rem'`, `'0.68rem'`, `'0.6rem'`, `'0.62em'`, `'0.58rem'` (lines 72, 132, 160, 169, 234, 296, 322 etc.) — at least 8 distinct font-sizes, **far above ≤3 limit**
  - Hardcoded `paddingTop: '10px'` on the source bar (line 277) instead of `var(--space-3)`
  - `import * as d3 from 'd3'` (line 4) — heavy, used only for `d3.scaleLinear`, `d3.scaleLog`, `d3.area`, `d3.line` — could be tree-shaken or replaced with locally-scoped scale builders matching the slide-09 idiom
  - `letterSpacing: '0.18em'`, `'0.22em'`, `'0.16em'`, `'0.14em'`, `'0.06em'`, `'0.08em'` — five distinct mono spacings vs the 3 tokens (`--ls-mono-tight/--ls-mono/--ls-mono-wide`)
  - Accent colors: coral + cyan (only in legend! line 503 references coral fillOpacity) + cream → 2 accents but legend introduces a 3rd visual chip. OK.

**E. Visual elements** — `PcVpcChart` + `ParamTable`. Chart audit:
  - **Chart-junk check ✓** (no 3D, no shadows, flat ribbons, hairline grid)
  - **Assertion title** lives in the slide headline — chart itself has no embedded title beyond "pcVPC — prediction-corrected visual predictive check" eyebrow (line 137). Good.
  - **Highlighted point** missing — pcVPC has no callout arrow or annotation pointing to the "observed median tracks predicted median" claim. Reader scans 5 ribbons + 3 lines + ~80 dots + 5 big medians and has to *decide* what wins the 5-second test. **MED**: add a coral arrow from "no systematic bias" payoff to the t=12h or t=18h band where observed-median crosses simulated-median CI center
  - **Honest axes ✓** (log y-axis labeled `AMBRISENTAN CONCENTRATION (NG/ML)`, x-axis labeled `TIME AFTER DOSE (H)`)
  - **Legend** has 4 items in one row (SIM CI · MEDIAN, SIM CI · 5/95, OBS · INDIVIDUAL, OBS · MEDIAN) with hardcoded `x={115}, x={237}, x={323}` offsets — **MED**: brittle and reads as a stat-software output rather than slide chart
  - The covariate ribbon (lines 183-243) is a **mini second slide** stuffed below the chart — 3 levels of typography (kicker, body, mono caption), 4 categorical groupings. §1 violation: this slide tries to be **Data + Process + Receipt** simultaneously
  - a11y: chart `aria-label` present ✓ (line 402)

**F. Motion / cinematic transitions** — `useReducedMotion` NOT used in PcVpcChart (other slides in batch all import it). Ribbons fade via opacity 0→0.14/0.32; observed-median path has `strokeDashoffset` draw; ~80 dots stagger via `delay: D.dots + (d.i % 10) * 0.02 + Math.floor(d.i / 10) * 0.05`. **MED**: with reduced-motion the dots still pop in (no guard). **Cinematic enhancement**: shared `layoutId="cs1-pcvpc-chart"` morphing the ribbon into the slide-11e AUC envelope — both are coral-shaded confidence bands; a layout morph from "model fit" to "exposure match" would be the visual centerpiece of the case.

**G. Pattern conformity** — **HIGH** deviation: doesn't use SlideGrid, SlideParts, or SlideFrame. Rolls own absolute layout. Justified historically but is now the only batch-2 slide that breaks the structural contract documented in SlideGrid.jsx:1-19.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Migrate to `<SlideFrame>` + `<Viz>`-with-internal-grid pattern (mirroring 11e/11f). Replace the 6 absolute-vh blocks with named-area placement; remove hardcoded `08 / 20` (line 298) so deck context drives the page number | L | **HIGH** |
| 2 | Add a coral callout arrow + label inside `PcVpcChart` (line 396+) pointing at one bin where observed-median crosses simulated-median center — gives the chart its missing "highlighted point" per §7 | M | **HIGH** |
| 3 | Wrap dot scatter (`PcVpcChart` line 444) and ribbon paths (line 416-435) with a `useReducedMotion` guard so the slide degrades cleanly; mirrors the pattern already in `11e:226, 11f:305` | S | MED |

---

### Slide 11 · `case-exposure-match` — Exposure match · AUC + Cmax

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/11e-case-exposure-match.jsx`
**Slide job:** Demonstrate pediatric AUC matched adult envelope within 3% + Cmax brackets quantify any drift; close with two hero deltas + ICH E11A coda.

**A. Title / subtitle relationship** — Assertion ✓. `headlineMaxChars={34}` (line 78), `subheadMaxChars={72}` (line 84) — generous, fine. Subhead embeds `<sub>ss</sub>` and `<HighlightWord>` — **LOW** risk: at narrow widths `lands inside the adult envelope` highlight may break across 2 lines and the underline (if HighlightWord uses one) splits.

**B. Footer** — Uses `<Footer>` ✓ (line 161). Kicker "Case 01 · Exposure match" pattern-correct. Tagline cites Okour Table S5 + ICH E11A — concise.

**C. Spacing, density, alignment** — **HIGH** density: viz `gridTemplateRows: '1fr auto auto'` holds (1) two-chart row, (2) SubgroupFlag row, (3) closing-strip row with HeroDelta + HeroDelta + payoff + ICH-coda — that's **5 distinct visual elements in the closing strip alone** (`gridTemplateColumns: 'auto auto 1fr'` line 125) violating §4 "≤6 distinct visual elements per slide" when combined with charts above. Specifically:
  - HeroDelta "−3 %" (line 133)
  - HeroDelta "+11 / +18 %" (line 134)
  - "Every pediatric value inside the adult distribution — exposure bridged." italic line (lines 144-148)
  - ICH E11A mono caption (lines 149-154)
  - SubgroupFlag bordered note above (line 117)
  - Two chart titles
  - Footer kicker + tagline
  - = **8 textual blocks below the headline** before counting charts — far over budget
- `maxWidth: '62%'` on SubgroupFlag (line 549) — magic number, no token

**D. Token compliance** — Hardcoded:
  - `fontSize: '0.68rem'`, `'0.6rem'`, `'0.58rem'` (PanelTitle, HeroDelta, etc.) ×6+ instances
  - `fontSize: 'clamp(2rem, 3.6vw, 3.6rem)'` (HeroDelta line 203) — no token
  - `letterSpacing: '0.14em'`, `'0.22em'`, `'0.18em'`, `'0.06em'` repeated
  - `padding: '7px 14px 7px 10px'` on ThemePill (this slide doesn't use ThemePill — only 11f does, but it's the same pattern)
  - Unique font-sizes count: 7+
  - Accent colors: coral (case) + cyan (only used inside CmaxPanel as visual fill on `--cyan` ref line 308 — wait, this slide's CmaxPanel uses cream + coral only, not cyan; OK 2 accents)

**E. Visual elements** — Hero is `AUCPanel` (large, ~58%) + `CmaxPanel` (~38%) inside `<AnalysisPlot>` for cross-slide morph. Quality:
  - Adult envelope = horizontal dashed strip with `ADULT 5–95% · {label}` mono caption (lines 302-308) — **good**, two-encoded (color + dashes + label)
  - 39 pediatric dots staggered with deterministic seed (line 238) — reproducible ✓
  - Δ brackets above box-tops with `pathLength` draw — clear callout
  - **HIGH**: `AUCPanel` has no x-axis line drawn (only y-axis grid lines, line 287); the chart looks unanchored. `CmaxPanel` similarly only has horizontal grid. Slide-09 `ConstrainViz` draws axis lines (line 392-395 of DecisionVisuals.jsx); inconsistent within the deck.
  - Chart-junk check ✓ (flat fills, hairline grid)

**F. Motion / cinematic transitions** — `useReducedMotion` ✓ on AUCPanel (line 226), CmaxPanel (line 401). Median lines draw L→R via `pathLength`. Δ brackets and labels stagger. **Cinematic enhancement**: `<AnalysisPlot variant="exposure-match">` already exists for cross-slide morph — verify it actually morphs the chart frame between 11d → 11e → 11f (the pattern is in place but `AnalysisPlot` needs `layoutId` props or a `MotionConfig` to engage). Currently the slide-11d chart bypasses `AnalysisPlot` entirely (uses `<svg>` directly), so the morph chain is broken at the start.

**G. Pattern conformity** — Uses SlideGrid + SlideParts directly (NOT SlideFrame). Justified — viz needs the explicit 3-row internal grid. Could still wrap with SlideFrame to centralize the eyebrow/headline/subhead/footer plumbing.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Demote the closing-strip from 4 textual blocks to 2: keep the two `<HeroDelta>` cards + the italic "exposure bridged" line; move the ICH E11A coda (lines 149-154) into the `Footer tagline` or onto slide 14 where it already appears as a coda. Reduces slide-11e from 8 textual blocks to 5 | M | **HIGH** |
| 2 | Add x-axis line in `AUCPanel` (insert `<line>` after grid block at line 289) and `CmaxPanel` (line 427) for visual anchoring — match the pattern in `cs1-strategy/DecisionVisuals.jsx:392-395` | S | **HIGH** |
| 3 | Migrate slide 11d to use `<AnalysisPlot variant="pcvpc">` *and* set a shared `layoutId` on the panel so the cross-slide chart morph 10→11→12 actually fires — `AnalysisPlot` already wraps slides 11/12 (lines 92, 81 here and in 11f) | M | MED |

---

### Slide 12 · `case-exposure-response` — Exposure–Response · null signal

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/11f-case-exposure-response.jsx`
**Slide job:** Show overlapping AUC + Cmax box plots between NO-AE and RELATED-AE → flat safety E-R → "no signal IS the signal."

**A. Title / subtitle relationship** — Excellent assertion title ("Exposure did not predict adverse events. That is the signal."). `headlineMaxChars={34}`, `subheadMaxChars={82}` (line 70) — subhead is **HIGH-MED**: 82ch is the longest in this batch and contains a `<HighlightWord>` mid-sentence ("overlap between patients with and without related AEs"). At default desktop the subhead lands on 2 lines; on screen-share at 1280×720 it likely wraps to 3, kicking the chart down and triggering the same vertical-pinch class user flagged on slide 02. Recommend `maxChars={70}`.

**B. Footer** — Uses `<Footer>` ✓. Kicker "Case 01 · Safety E–R" matches pattern. Tagline concise.

**C. Spacing, density, alignment** — viz uses `gridTemplateRows: '1fr auto auto'` for chart-row + caption + theme pills (line 77). **MED**: bottom theme-pill row holds 5 ThemePill chips + label (line 162), each ~140px wide; on narrow viewports they wrap to 2 rows and consume 2× vertical space, eating the 1fr chart row. The `flex-wrap` at line 162 saves it functionally but visually the slide loses its 50/50 bottom rail rhythm. Caption (line 117) interleaves a 2nd citation `· N = 33 in the exposure–AE analysis ...` (line 134) — **MED**: caption is the slide's hero one-liner, padding it with citation chrome dilutes the focal point.

**D. Token compliance** — Hardcoded:
  - `fontSize: '0.65rem'`, `'0.6rem'`, `'0.58rem'`, `'0.7rem'` ×8 instances
  - SVG `fontSize="22"`, `"20"`, `"13"`, `"11"`, `"10.5"`, `"10"`, `"9"` — 7 distinct in-SVG sizes
  - `padding: '7px 14px 7px 10px'` (ThemePill line 430)
  - `borderRadius: 999` (ThemePill line 432) — token `--radius-pill: 999px` exists at index.css:266
  - Accent colors: coral (RELATED AE) + cyan (NO AE) + cream — **clean two-encoded color scheme** (color + label "RELATED AE/NO AE"), the best in this batch ✓

**E. Visual elements** — `BoxPanel` × 2, each with `BoxGlyph` + `MedianGuide`. Quality:
  - Two boxes per panel, shared y-axis ✓
  - Dashed median-overlap connector with center-floating `Δ median ≈ −12 %` / `Δ median ≈ +1 %` pill (line 100-110, 405) — **strong** in-chart callout
  - Median halo pulse (line 348-358) — one-shot, not looping, respects reduced-motion ✓
  - **MED**: panel letter "(a)" / "(b)" rendered with `fontSize="22"` (line 209) inside the SVG header sits at `x={0}, y={22}` — on the 820×460 viewBox it's about 22/460 = 5% — probably visible but small; the `letter` text "AUCss" at `x={36}, y={22}` is 20px (~4%) — borderline at projection
  - Chart-junk check ✓
  - **HIGH**: the median value labels at line 360 are commented "removed 2026-04-24" — current chart lacks numerical medians; reader sees boxes + a Δ% pill but not the actual values 7.8/6.9/710/720. Acceptable per the audit comment, but worth a callout in this report so reviewers don't try to add them back

**F. Motion / cinematic transitions** — `useReducedMotion` ✓ on BoxGlyph and MedianGuide. Halo pulse uses `times: [0, 0.4, 1]`. **Cinematic enhancement**: the dashed median-connector's near-horizontal angle IS the slide's hero claim. Currently it draws via `pathLength`. Add a 1-frame pause between drawing the line and revealing the Δ pill where the line sits *visibly horizontal* — currently both fire in sequence and the eye doesn't get the "look how flat this is" beat.

**G. Pattern conformity** — Uses SlideGrid + SlideParts directly (matches 11e). Justified.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Reduce `subheadMaxChars` from 82 to ~68 (line 70) to prevent the 3-line wrap on screen-share viewports that pinches the chart row | S | **HIGH** |
| 2 | Move the `· N = 33 ...` citation suffix from the caption (lines 134-136) into the `Footer tagline` to recover the caption's focal-point status | S | MED |
| 3 | In `MedianGuide` (line 373), add a 250ms hold between the dashed line completing and the Δ pill fading in — let the audience read the flatness before the pill arrives | S | MED |

---

### Slide 13 · `case-impact-numerals` — Impact · two regulators approved

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/13-case-impact.jsx`
**Slide job:** Editorial hero numerals — ×2 (regulators) · ~3% (exposure match) · 39 (peds patients) — closing on the approval timeline + theme-meta.

**A. Title / subtitle relationship** — Assertion across two lines via `<br />` (line 47). Three colors in the headline alone: cream + coral italic + amber bold (`approved`). **HIGH**: §10 says ≤3 accent colors with assigned meanings — this slide's headline already commits 2 (coral + amber); each numeral below adds another (×2 coral, ~3 amber, 39 cream) — the **amber appearing in headline + on the second numeral creates two amber meanings**: in the headline amber = "approved" (outcome), on the numeral amber = "exposure match precision". Same color, two meanings — direct §6 "Accent carries meaning" violation. No subhead — appropriate for hero/big-number primitive.

**B. Footer** — Uses `<Footer>` ✓. Kicker "Case 01 · Impact" pattern-correct. Tagline cites EMA + PMDA labels.

**C. Spacing, density, alignment** — **HIGH** collision risk:
  - ×2 numeral at `top: '28%', left: 0, maxWidth: '540px'` (line 84) + caption beneath
  - ~3% numeral at `top: 0, right: '4%', maxWidth: '440px', rotate: -4°` (lines 127-131) — these overlap horizontally in the same 0–28% top band; on 1080p the ×2 doesn't reach into 540px from left until row 28%, and ~3% sits at top:0–~28% from right edge — they coexist at the **same vertical band with a ~50px horizontal gap on a 1920 viewport**, but on a 1280 width the gap closes
  - 39 numeral at `bottom: '8%', right: '8%', maxWidth: '420px'` (line 188-192) — lower-right, doesn't collide horizontally with ~3% (right:'4%') but vertically the ~3% caption + 39 numeral both sit on the right edge with ~30vh of breathing room → fragile
  - `ApprovalTimeline` at `bottom: 60` (line 230, hardcoded px not token!) sits between the 39 numeral block and the inline theme meta at `bottom: 0` — **HIGH**: timeline padding `var(--space-3) var(--space-4)` plus borders takes ~60-80px; theme meta is at `bottom: 0` with no padding above it — they will touch or overlap on viewports under ~900px tall
  - Three numerals each have a `<Caption>` block with marginTop `20pt` (line 322) — `pt` units alongside `var(--space-*)` (px) breaks the 4/8/12 rhythm
  - The `~` glyph in `~3%` is `cream-muted`, the `3` is amber, the `%` is **coral** (line 165) — single number = 3 colors. Too clever; reads as decorative rainbow per §14 failure mode

**D. Token compliance** — Hardcoded:
  - `bottom: 60` (line 230) — magic px
  - `transform: 'translateY(-0.08em)'` (line 97) on the `×` glyph
  - `marginRight: '0.1em'`, `'0.05em'`, `'0.04em'` × multiple (lines 96, 144, 166)
  - `marginTop: '20pt'`, `'6pt'` (lines 322, 337) — pt units
  - Font sizes: `clamp(5rem, 10vw, 11rem)`, `clamp(9rem, 18vw, 20rem)`, `clamp(3.5rem, 7vw, 7.5rem)`, `clamp(5.5rem, 12vw, 13rem)`, `clamp(2.8rem, 5.5vw, 6rem)`, `clamp(0.9rem, 1.1vw, 1.2rem)`, `clamp(0.7rem, 0.82vw, 0.88rem)` = **7 distinct font-sizes for 3 numerals + captions**, **far above ≤3 limit**
  - Accent colors: coral + amber + cream + cream-muted (decorative on `×` and `~`) — **5 colors visible at once**
  - `rotate(-4°)` on a numeral (line 134) — visual noise, no semantic meaning; §14 lists "fake 3D / decorative tilts" as AI-tell

**E. Visual elements** — `CountUpDigit` (good — uses framer's `useMotionValue`/`animate`/`useTransform`), faint coral arc SVG, `ApprovalTimeline`, theme meta. **HIGH**: this slide is a **mixed-type slide** (§1) — it tries to be (a) Big Number × 3, (b) Process (timeline), (c) Quote-pull (caption prose), (d) Reference chrome (theme meta) all at once. §1: "Mixed-type slides (hero + data + process in one) are always wrong."

**F. Motion / cinematic transitions** — Arc draws via `strokeDashoffset` (line 75). Three numerals stagger-pop. Count-ups sync to pop. NO `useReducedMotion` guards anywhere on this slide — the `CountUpDigit` `useEffect` always fires the count-up animation; on reduced-motion the digit jumps from 0 directly without easing → still fine but technically not respected. **Cinematic enhancement**: the editorial hero deserves a single shared `layoutId="cs1-39-pediatric"` morphing the slide-9 dataset card's "39" into this slide's `39` numeral. That would *earn* the ×2 / ~3% / 39 hero. Also: `ApprovalTimeline variant="closed"` already implies a `variant="open"` exists on slide 11 — verify the cross-slide morph is wired.

**G. Pattern conformity** — Uses SlideGrid + Eyebrow + Headline + Footer ✓. Bypasses Subhead intentionally (hero numeral primitive). Inside `<Viz>` it's pure absolute positioning of 3 numerals + arc + timeline + theme meta — justified for editorial hero but pushes the layout discipline.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Resolve the amber double-meaning conflict in the headline + 2nd numeral. Pick ONE: either (a) keep amber on `approved` in headline AND drop ~3% to coral (single accent meaning shift) or (b) remove `approved` italic-amber treatment in headline (line 51) and let amber stay as "exposure precision" on the numeral | M | **HIGH** |
| 2 | Replace `bottom: 60` (line 230) with `bottom: var(--space-16)`; verify ApprovalTimeline + theme meta don't collide by giving the timeline `marginBottom: var(--space-6)` and pinning theme meta with explicit `paddingBottom: var(--space-2)` — currently both compete at the bottom edge | S | **HIGH** |
| 3 | Demote one numeral. Either remove `~3%` (its claim is repeated on slide 11 HeroDelta `−3%`) OR remove `39` (repeated on slide 9 dataset card). Three competing numerals violates §3 "ONE thing wins the 5-second test". Once down to 2, the slide reads as "×2 regulators · 39 patients" — a clean two-stat hero | M | **HIGH** |

---

### Slide 14 · `case-bridge` — Bridge · themes exercised · CS1 → CS2

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/14-case-bridge.jsx`
**Slide job:** Generalize CS1 into a reusable template, point at next compound (Sotatercept), surface the four themes the case exercised (01/02/03/05).

**A. Title / subtitle relationship** — Single-line headline ("The methodology travels.") in amber italic — **strong**. `headlineMaxChars={28}` (line 69). No subhead — appropriate, and the eyebrow ("CS1 · Bridge forward + Framework recap") in `cream-muted` (line 68) takes the secondary text role. **MED**: eyebrow color uses `var(--cream-muted)` instead of `var(--coral)` — every other CS1 slide in this batch (8, 9, 10, 11, 12, 13) uses coral on the eyebrow; this breaks visual continuity for the bridge slide.

**B. Footer** — Uses `<Footer>` ✓. Kicker "Case 01 · Bridge" matches pattern. Tagline cites "Framework themes recap".

**C. Spacing, density, alignment** — viz `gridTemplateRows: 'auto auto 1fr'` holds (1) two-col split (template+pipeline), (2) amber payoff + ICH coda, (3) framework-themes ribbon. **HIGH** density: counting visible blocks below the headline — 5 template bullets + 1 pipeline card + 1 amber payoff line + 1 ICH coda block + 4 theme tiles + footer = **12 distinct visual blocks**, far over §4's "≤6 distinct visual elements" limit. Specific risks:
  - Theme tiles row uses `gridTemplateColumns: 'repeat(4, 1fr)'` (line 237) with `gap: '16px'` (hardcoded) — on 1280-wide screens the 4 columns become ~280px each minus padding; theme `glyph` + `title` + `detail` paragraphs get cramped
  - ICH coda has `maxWidth: '78ch'` + `margin: 'var(--space-2) auto 0'` — sits centered, but the row above (payoff) is also center-aligned — two center-aligned elements stack with no axial differentiation
  - Pipeline card body has 2 `<br /><br />` (lines 136-137) inside a card already short on vertical room — risks card growing taller than the template column (`alignItems: 'start'` line 83 saves it but the visual rhythm goes off)
  - `padding: '18px 20px 20px 20px'` (line 320) on ThemeTile — non-uniform px values, asymmetric

**D. Token compliance** — Hardcoded:
  - `marginBottom: '18px'`, `'14px'`, `'8px'`, `'12px'`, `'4px'` (lines 94, 222, 350, 65 of PipelineBridgeCard, etc.) — should use `var(--space-*)`
  - `gap: '16px'`, `'24px'`, `rowGap: '14px'`, `paddingTop: '18px'` — px instead of tokens
  - `borderRadius: 4` (line 322), `borderRadius: 6` (PipelineBridgeCard line 35), `borderRadius: 2` (line 51), `borderRadius: '4px'` (line 182) — **four different radius values** vs the `--radius-*` token family
  - Font sizes: `'0.72rem'`, `'0.68rem'`, `clamp(0.82rem, 0.92vw, 0.98rem)`, `clamp(0.74rem, 0.84vw, 0.9rem)`, `clamp(1.1rem, 1.5vw, 1.65rem)`, `clamp(0.88rem, 1.05vw, 1.1rem)`, `clamp(0.82rem, 0.95vw, 0.95rem)` — 7+ distinct sizes
  - Accent colors: amber (this slide's voice — bridge + future) + coral (CS1 case) + 4 theme colors used inside ThemeTile glyphs (cyan/sage/violet/coral via `tk(--${theme.token})` line 318) → **6 colors visible**, far above ≤3
  - The 4-theme tiles import `--cyan, --sage, --violet, --coral` simultaneously (lines 60) — appropriate for a recap row but blows the slide's color budget

**E. Visual elements** — `TemplateBullet` (5 rows in 2-col grid, last spans both), `PipelineBridgeCard` (separate file, well-factored ✓), `ThemeTile` (4 instances), ICH coda block. **MED**: PipelineBridgeCard uses `boxShadow`-like effect via `background: color-mix(...8%...)` + `borderLeft: '3px solid amber'` (line 51 of PipelineBridgeCard) — clean, not chartjunk. ThemeTile glyph uses `fontSize: '1.6rem'` — emoji-style glyph at this size on dark background reads OK but is the only place in the deck where glyphs are this large.

**F. Motion / cinematic transitions** — Each block has its own `initial/animate/transition`. NO `useReducedMotion` guard. **Cinematic enhancement**: the 4 theme tiles in this slide should share `layoutId="theme-${num}"` with the theme pills on slide 11f — when navigating 12→13→14, the small pills morph upward into full tiles. The pieces exist (both files iterate `QP2_THEMES`); just needs the layoutId binding.

**G. Pattern conformity** — Uses SlideGrid + Eyebrow + Headline + Footer ✓. Sub-component `PipelineBridgeCard` extracted ✓. Internal `<TemplateBullet>` and `<ThemeTile>` should also move to `cs1-bridge/` for parity.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Demote OR remove the ICH E11A coda block (lines 175-211). Same coda effectively appears on slide 11e (lines 149-154) — pick one home. Removing here drops density from 12 blocks to ~10 and recovers vertical room for the theme tiles | M | **HIGH** |
| 2 | Switch eyebrow color (line 68) from `cream-muted` to `coral` to maintain visual continuity with the other 6 CS1 slides; the amber stays in headline + payoff as the bridge-future signal | S | MED |
| 3 | Standardize the four hardcoded radii (`'4px'`, `4`, `6`, `2`) to the `--radius-*` family. Cardborders → `var(--radius-md)`, accent rule → `var(--radius-xs)`. Consolidates the visual vocabulary across this slide and matches PipelineBridgeCard's eventual move to a token | S | MED |

---

## Cross-cutting recommendations from this batch

- **Add a `--fs-section-title` token** (e.g. `clamp(1.4rem, min(2.2vw, 3.6vh), 2.4rem)`) and a `--fs-bignum-hero` token. The "no token match" comments at `11b:253`, `11c:218`, `11e:203`, `13:108`, `13:154`, `13:204` all reach for the same intermediate display sizes that the current `--fs-slide-*` family doesn't cover. One token addition closes 8+ violations.
- **Migrate slide 11d (case-fit) onto `<SlideFrame>`**. It is the only slide in the batch (and likely the deck) bypassing the structural contract — has a hardcoded `08 / 20` page number, vh-anchored absolute layout, and no `useDeck()` integration. This is the single highest-impact refactor in the batch.
- **Establish a deck-wide rule on ambient motion budget.** `cs1-build/CompartmentSchematic.jsx` runs `repeat: Infinity` particle flows; `cs1-strategy/DecisionVisuals.jsx` runs `repeat: Infinity` adult/pedi sprites in `IntegrateViz`; `ParsimonyViz` and `DecisionGate` already chose "play 1-2 times then stop". Pick one rule deck-wide and apply it.
- **Resolve the coral-vs-amber semantic on CS1 slides.** Coral is CS1's case color; amber is reserved for "QP replaces study" (theme 01) per `index.css:84`. Slides 8, 13, and 14 introduce amber for "synthesis", "approved", "future bridge", and "framework theme glyph" — four meanings. Pick one amber meaning per slide.
- **Wire `<AnalysisPlot>` shared `layoutId` morphs**. `AnalysisPlot variant=` is set on 11e ("exposure-match") and 11f ("exposure-response") but slide 11d (`pcvpc`) bypasses it. The cross-slide chart morph 10→11→12 was clearly designed; it's broken at the start. Fixing 11d also fixes the morph chain.
- **Add `useReducedMotion` guards to slides 10, 13.** Slide 11f and 11e both gate properly via `useReducedMotion()` from framer-motion; slides 10 (PcVpcChart) and 13 (CountUpDigit, arc, three numeral pop-ins) animate unconditionally. Two-line additions fix this.
