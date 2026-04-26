# qp2-seminar slide review — Batch 1 (slides 1–7)
**Reviewer:** Claude (slide-review subagent · batch 1)
**Date:** 2026-04-24
**Scope:** narrative opening (title · hook · career-arc · framework) + CS1 setup (divider · background · challenge)
**Method:** read source + scaffolding + zaj-slides rubric. No browser, no screenshots. Static review.

---

## Batch summary

- **HIGH-severity findings across batch:** 11
- **Slides with title/subtitle overlap or pinch issues:** 02 (calibration), 04 (subhead arrives 1.5s after headline + collides with viz timeline), 11 (cs1-challenge — long subhead-style "headline+span" reads as two lines that crowd the eyebrow)
- **Slides bypassing SlideGrid/SlideParts:** 01 (rolls own flex column · no `<SlideGrid>` at all), 05 / `10-case-divider` (uses absolute-positioned `CaseHeroDivider` pattern — no grid, all `vh`/`%` placement)
- **Cross-batch patterns I noticed (3+ slides share the issue):**
  - Hardcoded `rem`/`px` font sizes inside SVGs and card chrome bypass the `--fs-slide-*` and `--fs-*` token scales (slides 01, 02, 03, 04 viz, 06b, 11). Tokens §10 demands ≤ 3 sizes per slide; slide 06b alone uses `0.66 / 0.68 / 0.72 / 0.74 / 0.85 / 0.95` rem inline.
  - Decorative shadow / blur / glow on cards & paths violates Slide-Design-Brief §10 hard rule "no drop shadows on cards" and §14 AI-tell #5 (gradient/glow defaults). Slide 01 (`backdropFilter: blur(6px)` + `boxShadow: var(--shadow-md)` on author card, lines 252-254), slide 03 (`<filter id="s3-glow">` Gaussian blur on spine + hub, lines 188-194), slide 06b (`boxShadow` on chart panels), slide 11 (`boxShadow: '0 2px 8px color-mix(...)'` on chart panel line 505).
  - **Late footer / meta delays.** Slide 01 author card delay = 4.2 s, meta = 4.5 s; slide 04 footer delay = 6.6 s. With a ~30 s presenter dwell that's tolerable, but the deck's own SlideParts default is 2.6 s — these slides break that contract. Audience hears the spoken takeaway before the kicker is on screen.
  - **Subhead arrives after the viz starts moving.** Slide 02 subhead at 0.60 s + the silence-line begins drawing at 1.30 s — fine. Slide 04 subhead at **2.10 s** while the dataflow engine GSAP timeline starts at ~0.80 s — the subhead lands while tracer dots are mid-flight. Reads as a missed beat.
  - **Long, prose-shaped Footer taglines.** Slide 06b: `"Source · EMA SmPC · FDA Letairis label · Galiè 2013 · Ivy 2024"` (14 words / 73 chars). Slide 11: `"Source · AMB112529 · NCT01332331 · ambrisentan pediatric PAH"` (8 words but very dense). Both will hit `truncate` in the Footer rail at 1366×768 viewports because `<Footer>` applies `min-w-0 truncate` (SlideParts.jsx:165). The deck convention is `kicker = "NN · short label"`, `tagline = italic payoff sentence` — these slides are using the tagline slot for a citation cluster.

---

## Per-slide reviews

### Slide 1 · `title` — Title

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/01-title.jsx`
**Slide job (in 1 sentence):** Set the seminar frame — speaker, three-case scope, and a single PK curve as the deck's narrative spine.

**A. Title / subtitle relationship**
- ✅ Hero slide (per Slide-Design-Brief §1) — assertion title not required.
- ⚠ Subtitle width controlled by `maxWidth: '60ch'` (line 197) — fine on desktop.
- Eyebrow → Headline → Subtitle vertical rhythm uses `rowGap: var(--space-6)` on the outer flex column (line 87). Acceptable, but the headline's italic "Action." has an absolute-positioned underline (lines 170-186) with `bottom: '-0.08em'` which can overlap the **subtitle's first line** if the headline wraps to two lines on narrow viewports — needs visual verification at 1366×768. **[MED]**
- The italic word "Action." does a 90° `rotateX` flip in (line 163-164) which — combined with the underline drawing 0.25 s later — creates two competing motion beats on the headline. One should defer to the other. **[LOW]**

**B. Footer**
- ❌ **No `<Footer>` from SlideParts.** Slide rolls its own "Meta chip" block (lines 298-318) with `SEMINAR · APRIL 2026 / QP2-CMD`, `3 CASES · 5 THEMES · 45 MIN`, and a hand-built `01 / 35` page number. Inconsistent with slides 02 / 03 / 04 / 06b / 11 which all use `<Footer kicker… tagline…>`. **[HIGH]**
- No kicker / tagline pattern at all — the page number style (line 313-317) duplicates logic that `<Footer>` already pulls from `useDeck()` (SlideParts.jsx:143-185).

**C. Spacing, density, alignment**
- Outer container caps at `maxWidth: '1600px'` (line 87) with `mx-auto` — narrower than the deck's standard 12-col gutters. Visually the slide will float in the middle of a 1920 canvas with extra whitespace at left/right that no other slide has. **[MED]**
- Author card has `maxWidth: '56ch'` (line 255), `padding: var(--space-6) var(--space-8)` and a `linear-gradient` background (line 250-251). Combined with `backdropFilter: blur(6px)` (line 252) and `boxShadow: var(--shadow-md)` (line 254) it reads as a glassmorphism card — exactly the 2021-era aesthetic flagged in Lessons-Claude-Perspective §Tell #5. **[HIGH]**
- Two flex spacers (line 210, 235) with `flex: '0 1 var(--space-6)'` are doing the work that `STANDARD_AREAS` rows would do for free. Slide is reinventing the grid.

**D. Token compliance**
- 6+ hardcoded `clamp(min, vw, max)` font sizes that bypass the `--fs-slide-*` scale: lines 132 (headline), 195 (subtitle), 276 (presenter name), 288 (presenter title), 374, 195 — and line 102 hardcodes a `clamp(40px, 5vw, 72px)` accent rule width.
- Hardcoded `transition.delay` values everywhere (e.g., 1.7, 2.0, 4.2, 4.5) — none reference the `--delay-*` token family declared in `index.css` lines 177-187.
- ✅ Colors all token-driven (`var(--amber)`, `var(--coral)`, `var(--cream-muted)`).
- **Unique font-sizes on this slide:** ≈ 7 (eyebrow, headline, subtitle, card-eyebrow, card-title, card-note, presenter-name, presenter-title, meta) — over the §4 target of ≤ 3. **[HIGH]**
- **Accent colors:** amber (brand) + coral, cyan, violet (case markers in cards) = 4 accents on the title alone. Slide-Design-Brief §6 caps at 3 with assigned meaning. The three case colors are technically "one role = case marker" so it's defensible, but at first glance a viewer sees 4 accents. **[MED]**

**E. Visual elements (PKCurve + CaseCard + author card)**
- The `PKCurve` SVG (lines 407-513) is well-factored: viewBox 900×240, ±1 SD companions, animated dashed drop-lines, baseline labels. Clean.
- ✅ Has `aria-label` (line 414).
- The PK curve coordinates (Cmax at x=170, AUC at x=495, T½ at x=625) are spaced **non-proportionally** to actual pharmacology — fine because the curve is metaphor, not data. But Lessons-Claude-Perspective §Tell #8 (timeline with equal-spaced nodes implying equal time) applies in spirit: a panelist may read this as a real PK and ask "why is T½ at 68% of the x-axis?" **[LOW — defensible]**
- ❌ Modernization opportunity: the three case markers are static dots that fade in. The slide's promise is "spine of the deck" — the dots should be **shared `layoutId` elements** that `framer-motion` morphs into the case-divider slides (slide 5 `Ambrisentan` coral hub, slide 14 cyan hub, slide 23 violet hub). That single change earns the "one continuous spine" claim.

**F. Motion / cinematic transitions**
- ✅ Uses `useReducedMotion()` (line 66) and gates every `animate` behind `go = isInView && !prefersReducedMotion` (line 67). Reduced-motion fallback is correct.
- The motion budget is **massive**: PK curve draw at 2.1 s (line 425), case markers at 3.4-4.2 s (line 467), author card at 4.2 s, meta at 4.5 s. Total entrance choreography is ~5 s. For a slide that the audience sees for 60+ s while the speaker introduces themselves it's tolerable, but for any rehearsal cycle (rapid ←/→) it feels slow.
- **Proposed enhancement:** add a `layoutId="case-marker-coral"` (and cyan/violet) to the three landmark dots on the PK curve so they morph into the hero hubs on slides 05 / 14 / 23. Today the dots cut. With `layoutId` they become a tactile through-line of the deck — the single best motion upgrade in the batch.

**G. Pattern conformity**
- ❌ **Does not use `SlideGrid` or `SlideParts`.** This is the only slide in the batch that doesn't, and it's the title — which is the worst case because it sets register for the whole deck. Future slide authors will copy this pattern.
- The deviation **is partially justified** (a hero / title slide has different chrome needs than a content slide), but the slide should still consume `<Eyebrow>` + `<Headline>` + a custom viz body, not roll its own typography wrapper.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Add `layoutId="case-marker-{coral\|cyan\|violet}"` to the three landmark `<motion.circle>` elements (lines 471-481) so they morph into the hero hub on slide 5 (`<CaseHeroDivider>` line 186 illustration slot needs a matching `layoutId` wrapper). Single biggest motion win in the batch. | M | HIGH |
| 2 | Strip glassmorphism from the author card: remove `backdropFilter` + `boxShadow` + `linear-gradient` background (lines 250-254). Replace with flat `background: 'var(--panel-elevated)'` and keep the `borderLeft: '3px solid var(--amber)'` accent. Aligns with §10 "no drop shadows on cards" + §14 Tell #5. | S | HIGH |
| 3 | Replace the hand-rolled meta chip (lines 298-318) with `<Footer kicker="01 · The seminar" tagline="Three cases · five themes · forty-five minutes" />`. Keep the author card. The page number then comes from deck context for free. | S | HIGH |

---

### Slide 2 · `hook` — The asymmetry · Four agencies

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/02-hook.jsx` (+ `slides/hook/ConvergenceTimeline.jsx`)
**Slide job (in 1 sentence):** Frame the 19-year pediatric-PAH silence and the 2021 EMA+PMDA convergence as the deck's emotional hook.

**A. Title / subtitle relationship**
- ✅ Assertion title (`19 years, unchanged.`).
- ❌ **Subhead pinch (calibration finding from user):** `<span style={{ fontSize: '1.55em', lineHeight: 1.35, ... paddingTop: '0.5em' }}>` at line 181 forces the subhead to 1.55× the already-fluid `--fs-slide-subhead` token, while `maxChars={64}` (line 180) caps the column at ~64ch. With Fraunces italic at that size the text wraps to **3-4 narrow lines** that crowd the headline's italic descenders. **[HIGH]**
- The headline itself overrides via inline `<span style={{ fontSize: '1.35em' }}>` (line 163) — the slide is fighting the SlideParts token system in two places.

**B. Footer**
- ✅ Uses `<Footer>` from SlideParts.
- Kicker `"02 · The convergence"` follows the convention.
- Tagline is a JSX fragment with an italic coral `<em>` mid-line (lines 196-204): "One PopPK model. *Two of the world's most rigorous regulators.* 27 EU countries + Japan under one pediatric label." That's ~20 words — over the ≤16 rule of thumb. The mid-string `<em>` will be **truncated by `truncate` in the Footer rail** (SlideParts.jsx:165) on viewports under ~1366px. **[MED]**

**C. Spacing, density, alignment**
- Custom `rowSizes="minmax(var(--space-10), auto) auto auto auto minmax(0, 1fr) auto"` (line 156) overrides `STANDARD_ROW_SIZES`. The `minmax(var(--space-10), auto)` chrome row pushes content lower — necessary because there's no chrome content at top; defensible.
- `<Subhead>` uses inline `paddingTop: '0.5em'` (line 181) to add breathing room between headline and subhead. That's the user's flagged title↔subtitle pinch point — `0.5em` is not enough at the 1.55em font-size override; the headline italic "unchanged." descenders kiss the subhead's first line.
- The viz `ConvergenceTimeline` SVG has a fixed viewBox 1728×360 (lines 22-23) which is wider than the viz cell at desktop, so `xMidYMid meet` letterboxes vertically — fine.

**D. Token compliance**
- ❌ **Hardcoded font sizes inside `ConvergenceTimeline.jsx`:** `fontSize="24"` (line 87 silence caption), `"17"` (lines 105, 142, 153, 191, 250, 277), `"19"` (lines 144, 181), `"16"` (line 324). Total of ~5 unique pixel sizes inside one SVG. None reference the `--fs-*` token scale. **[HIGH]**
- ❌ **Hardcoded `letterSpacing`** values (`"0.26em"`, `"0.18em"`, `"0.16em"`, `"0.22em"`) repeated through the SVG instead of consuming `--ls-mono`, `--ls-mono-wide`, `--ls-mono-tight` tokens (index.css:145-147).
- ✅ Colors all token-driven via `useTokens()` (line 54).
- **Unique font-sizes on this slide:** 7 (eyebrow + headline base + headline 1.35× + subhead base + subhead 1.55× + 5 SVG sizes inside the viz). Way over §4 ≤ 3.
- **Accent colors:** amber (resolved) + coral (silence/caption emphasis). 2 accents with assigned meaning — ✅ within budget.

**E. Visual elements (`ConvergenceTimeline`)**
- Component is well-decomposed: pre-2021 dashed silence line, 2021 event column with stacked EMA/PMDA pills, post-2021 solid amber resolved line + arrow, axis ticks, 19-year bracket below.
- ✅ Clean SVG, has `aria-label` (line 63), uses `vectorEffect="non-scaling-stroke"`.
- ❌ **PEDIATRIC USE ESTABLISHED label overlap (calibration finding):** The label sits at center between `X_COL_RIGHT (1380)` and `X_RIGHT (1648)` = x ≈ 1514, with a 340px-wide knockout `<rect>` (line 239: `x = (X_COL_RIGHT + X_RIGHT)/2 - 170 = 1344`, width 340 → spans 1344-1684). The 2026 tick (`x=1500`, line 50) is **inside that knockout box** — the tick's label text is hidden under the resolved-caption knockout. Worse, the tick line itself (lines 265-271) draws below the axis at `y=Y_AXIS+6 → +14` while the caption knockout is `y=Y_AXIS-13` to `Y_AXIS+13` — the tick and the label fight for the same vertical neighborhood at the same x. **[HIGH — user-flagged]**
- ❌ Chart-junk check: the resolved-caption uses a `<rect fill={tk('--bg')}>` knockout (line 243) to punch through the underlying line. That's a clean technique, but the knockout is **too wide** (340px) for a label that fits in ~270px of text. Trimming the knockout width to ~280px and moving label center to `X_COL_RIGHT + 100` instead of dead-center between the column and the right edge fixes the 2026-tick overlap.
- Inline silence caption at line 81-94 uses straight quotes around `"Safety and effectiveness have not been established."` — should be typographic curly quotes (or `&ldquo;`/`&rdquo;`) for editorial polish.
- ✅ Accessible: timeline `<svg>` has `aria-label` (line 63).

**F. Motion / cinematic transitions**
- ✅ Uses `gsap.matchMedia` with `(prefers-reduced-motion: reduce)` fallback (lines 139-141) — snaps everything to final state. Correct.
- 5-act GSAP timeline is well-narrated in code comments and the cadence reads cinematically (silence draw is the rhythm).
- ❌ **Idle wiggle (lines 115-124)** — `repeat: -1, yoyo: true` on the EMA/PMDA pills. This is a tonal mistake on a hook slide that's announcing 19 years of clinical inaction; the wiggle reads as decoration not data. Either kill it or attach the loop to a meaningful pulse (e.g., approval-anniversary heartbeat at `--dur-pulse: 2.4s` token).
- **Proposed enhancement:** add `layoutId="agency-pill-ema"` and `"agency-pill-pmda"` to the two `<g data-el="row-ema">` / `row-pmda` groups (lines 126, 164) so when the deck transitions into slide 13 (`case-impact-numerals`) the pills morph into the impact stats instead of cutting. The pills are the visual currency of the hook → the impact slide should reuse them.

**G. Pattern conformity**
- ✅ Uses `SlideGrid` + all four `SlideParts`.
- Sub-component `ConvergenceTimeline.jsx` is cleanly factored — single hero viz, no one-off cruft.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Fix the calibration triad: (a) remove the `fontSize: '1.55em'` override on Subhead (line 181) — let the `--fs-slide-subhead` token govern; (b) raise `maxChars={64}` → `maxChars={88}` (line 180) so the subhead reads in 2 lines not 4; (c) bump `paddingTop: '0.5em'` → `paddingTop: 'var(--space-4)'` to clear the headline italic descenders. | S | HIGH |
| 2 | In `ConvergenceTimeline.jsx`: shrink the resolved-caption knockout `<rect>` width 340 → 260 (line 242) and shift center 30px right (move text x from `(X_COL_RIGHT + X_RIGHT)/2` → `+30`, lines 246, 313). This frees x ≈ 1500 so the `2026` tick label becomes visible. | S | HIGH |
| 3 | Replace the 5 hardcoded SVG font sizes (`17`/`19`/`24`/`16`) in `ConvergenceTimeline.jsx` with three tokenized helpers: `var(--fs-meta)` (≈13pt → 17px), `var(--fs-body-sm)` (14pt → 19px), `var(--fs-body-lg)` (19pt → 24px). Cuts unique font count from 5 → 3, satisfies §4. | M | MED |

---

### Slide 3 · `career-arc` — Career arc · Jordan → Servier

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/03-career-arc.jsx` (+ `slides/03-career-arc/`)
**Slide job (in 1 sentence):** Show the speaker's career as a single ascending spine through five institutional hubs, each surrounded by satellite work-items.

**A. Title / subtitle relationship**
- ✅ Eyebrow `"Framework · Career arc"` (line 165), assertion-shaped headline `"A network that compounds — five stops, one discipline."` with coral italic emphasis (line 169-172). Clean.
- Subhead uses `size="lead"` (line 175) — taps the `--fs-lead`-sized clamp from SlideParts.jsx:101-103. Two-line lead. Good vertical rhythm.
- No overlap or pinch.

**B. Footer**
- ✅ Uses `<Footer>`.
- ⚠ **Kicker is verbose:** `"Four countries · three sponsors · one discipline"` (line 380) — the kicker slot in `<Footer>` is `deck-mono uppercase` (SlideParts.jsx:155) and `letterSpacing: var(--ls-mono-wide)`. At ~46 uppercase tracked-out characters this will dominate the footer rail and visually compete with the tagline. The convention from slides 02 / 04 is `kicker = "NN · short label"` (e.g. `"02 · The convergence"`). **[MED]**
- Tagline `"Model-informed decisions, end-to-end."` is correctly italic and short.

**C. Spacing, density, alignment**
- 5 hubs × (3-6 satellites each) = **24 satellite labels** + 5 hub names + 5 hub tags + spine = ~35 labeled visual elements in the viz. Slide-Design-Brief §4 caps at ≤ 6 distinct visual elements per slide. The slide is a **density outlier** — defensible because it's a network diagram (one primitive, just rich), but it absolutely fails the 5-second test (§3). **[MED]**
- `overflow: 'visible'` on the SVG (line 184) lets satellite labels drift outside the viewBox — necessary for the angle-based label placement, but it means satellites can leak into the chrome rail or footer on narrow viewports. Needs visual verification.
- Minnesota hub (cx=560, cy=380) has 5 satellites at angles 165°/205°/255°/115°/60° — the bottom satellites at 60° and 115° land near the next hub down (Merck at cx=960, cy=300). Comments at lines 56-66 explicitly acknowledge the crowding.

**D. Token compliance**
- ❌ Hardcoded SVG font sizes: `17` (line 301), `15` (line 364), `25 / 30 / 36` (line 353). Mixed `fontWeight` values 400/500/600/700 (lines 303, 354, 365). Not token-driven.
- ❌ Hardcoded geometry constants in `HUBS` array (`cx: 220, cy: 480, r: 30` etc.) — fine for an SVG diagram, but the `r: 30` / `36` / `24` / `40` / `52` hub-radius progression embeds visual hierarchy in magic numbers.
- ✅ Colors token-driven via `useTokens()` (line 150).
- **Unique font-sizes on this slide:** ≈ 6 (eyebrow + headline + subhead + 4 SVG sizes). Over budget.
- **Accent colors:** amber (default hub), coral (Servier hero), cream-muted (Merck side-stop) — 2 accents + a neutral. ✅ within §6 ≤ 3.

**E. Visual elements (the SVG network)**
- Beautifully composed network. Uses a Bézier spine via `buildSpinePath()` (lines 112-121), `SwayGroup` for sat sway, `SatelliteDrawer` for click-through detail.
- ❌ **`<filter id="s3-glow">` (lines 188-194)** Gaussian blur glow on the spine and Servier hub. Slide-Design-Brief §10 hard rule "no chartjunk, no drop shadows on cards" applies — the glow is decorative. Lessons-Claude-Perspective §Tell #5 explicitly flags this. **[HIGH]**
- ❌ **`reduced` is computed once at module render via direct `window.matchMedia` (lines 132-134)** — not React-reactive. If the user toggles reduced-motion mid-session the slide won't adapt. Should use `useReducedMotion()` from framer-motion (consistent with every other slide in the batch). **[MED]**
- ✅ Each satellite has a `role="button"`, `tabIndex={0}`, `aria-label`, and `Enter`/`Space` keyboard handler (lines 254-263). Genuine accessibility care.
- ✅ Hit-target circle (line 278-282) at r=22 is generous for click/tap.
- Modernization: the satellite sway via `SwayGroup` driving SVG `transform` directly via rAF (per the comment at line 233-242) is sophisticated. Good.

**F. Motion / cinematic transitions**
- Spine draws at 0.75s, hubs cascade 1.55-2.15s, satellites 1.80s+. Reasonable.
- Sway loop runs forever — same critique as slide 02 wiggle: tonal? On a *career arc* slide, gentle continuous sway reads as "living network", which is on-brand.
- ❌ Sway delay computation (line 242) `swayDelay = perSat + 0.8 + ((si % 4) * 0.45)` — this stacks delays so some satellites don't begin swaying until ~5 s after slide entry, which is past the audience's first scan.
- **Proposed enhancement:** add `layoutId="hub-servier"` to the Servier hero circle (line 318-328) so when the deck reaches slide 30 (`closing-divider`) or slide 32 (`record-at-scale`) the hero hub morphs into the closing emblem. Reinforces the "one discipline, twelve years" arc through visual continuity.

**G. Pattern conformity**
- ✅ Uses `SlideGrid` + all four `SlideParts`.
- Sub-components in `slides/03-career-arc/` (`SwayGroup.jsx`, `SatelliteDrawer.jsx`, `satelliteDetails.js`) are cleanly named and scoped.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Remove `<filter id="s3-glow">` (lines 188-194) and the two `filter="url(#s3-glow)"` references (lines 206, 337). Replace with a 2nd `<path>` underneath the spine using `strokeWidth={10}, opacity={0.08}` (already exists at lines 211-218 — just delete the glow-filtered version on the live spine). Removes chartjunk, satisfies §10. | S | HIGH |
| 2 | Replace `window.matchMedia('(prefers-reduced-motion: reduce)').matches` (lines 132-134) with `const reduced = useReducedMotion()` from framer-motion. Reactive + matches every other slide in the batch. | S | MED |
| 3 | Shorten footer kicker (line 380) from `"Four countries · three sponsors · one discipline"` to `"03 · Career arc"`. Move the longer phrase into the tagline if needed (currently `"Model-informed decisions, end-to-end."`) or into the speaker notes. Restores deck convention. | S | LOW |

---

### Slide 4 · `framework-themes` — Framework · Five recurring themes

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/04-framework-themes.jsx` (+ `slides/04-framework-themes/`)
**Slide job (in 1 sentence):** Establish the deck's analytical scaffold — five inputs (themes) flow into one decision hub which flows to three case outcomes.

**A. Title / subtitle relationship**
- ✅ Strong assertion title: `"The model is the instrument; the decision is the product."` (lines 56-63) with cyan italic on "decision".
- ⚠ Headline contains a hardcoded `<br />` (line 57) — forces line break regardless of viewport. On a wider viewport the second line could fit on one; on a narrow one it could break inelegantly. **[LOW]**
- ❌ Subhead delay = **2.10 s** (line 39) while `useDataflowMotion` starts the SVG choreography at ~0.80 s. The subhead lands while tracer dots are mid-flight from themes → hub. Reads as out-of-rhythm: the audience sees the engine moving before they read the line that explains it. **[MED]**

**B. Footer**
- ✅ Uses `<Footer>`.
- ⚠ **Footer delay = 6.6 s** (line 81) — the longest in the batch. The dataflow engine timeline must run ~6 s before the kicker appears. If a presenter is at this slide for less than 8-10 s the footer never shows. **[MED]**
- Kicker `"Five themes · one judgment · three outcomes"` is again **verbose** (≈ 42 chars) — same anti-convention as slide 03. Tagline `"The model is the instrument."` is correctly italic and short, but it's also literally a quote from the headline — redundant. **[LOW]**

**C. Spacing, density, alignment**
- Uses `STANDARD_AREAS` (line 50) — clean grid usage.
- The dataflow engine SVG has a 1920×1080 authoring viewBox (per the comment at line 70-73). At a 1fr viz row that scales correctly via `xMidYMid meet`. Good.
- 5 themes + 1 hub + 3 outcomes + 8 connecting paths + 8 tracer dots = ~25 visual elements. Same density caveat as slide 03 — but here the elements are organized into 3 clear columns so the 5-second test still resolves to "engine with five inputs".

**D. Token compliance**
- I cannot fully audit this without reading `04-framework-themes/data.js`, `DataflowEngine.jsx`, and `useDataflowMotion.js`. The slide shell is clean. **Needs deeper read on the four sub-files** to confirm the SVG's font sizes and motion timings are token-driven. (Based on the pattern seen in slide 02 `ConvergenceTimeline`, I'd estimate the same hardcoded-px-fontsize problem exists.)
- Hub-breath CSS animation in inline `<style>` (lines 88-97) uses `4s ease-in-out infinite alternate` — should be `var(--dur-pulse)` (token = 2.4s) and `var(--ease-out)`. **[LOW]**

**E. Visual elements (`DataflowEngine`)**
- Architecture comment at lines 102-132 is excellent — explains the 3 s phase-shift between converging and diverging tracer dots, and why it makes the diagram read as "process not taxonomy." This is the design-thinking the rest of the batch should aspire to.
- `useReducedMotion()` plumbed correctly (line 44) and passed into the motion hook.
- Needs visual verification at 1366×768 to confirm the 8-Bézier path geometry doesn't cause overlap with the (delayed) subhead.

**F. Motion / cinematic transitions**
- ✅ `useReducedMotion()` + GSAP early-return for the engine + CSS `@media (prefers-reduced-motion: reduce)` for the hub breath ring. Triple-redundant motion-safety. Best in the batch.
- The 3 s phase shift between converging and diverging tracers is the right call.
- **Proposed enhancement:** the three case outcomes on the right edge of the engine should each carry a `layoutId` matching the case-divider hubs (slides 05 / 14 / 23). On forward navigation, the relevant outcome could "detach" and morph into the case divider's hero color block. Earns a transition that today is a hard cut.

**G. Pattern conformity**
- ✅ Uses `SlideGrid` + `SlideParts`. Sub-components in `slides/04-framework-themes/` are well-named.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Move subhead `T.subhead` from `2.10` → `0.85` (line 39) so it lands ≈ 0.55 s after headline (matching the SlideParts default cadence). Push `T.headline` from `0.55` → `0.40` to keep total cold-open under 1 s. The dataflow engine still gets its first tracer at ~1.5 s. | S | MED |
| 2 | Move `Footer delay = 6.6` (line 81) → `2.6` (the SlideParts default). The footer is structural chrome, not a punchline — it shouldn't wait for the engine to finish. | S | MED |
| 3 | Add shared `layoutId="case-outcome-{coral\|cyan\|violet}"` to the three outcome blocks inside `DataflowEngine.jsx` and matching wrappers on slides 05 / 14 / 23 hero illustration slot. Single line of change per side, transforms 4 hard cuts into 4 morphs across the deck. | M | LOW |

---

### Slide 5 · `case-divider` — Case · Ambrisentan

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/10-case-divider.jsx`
**Slide job (in 1 sentence):** Open Case 01 with a hero divider that anchors the case in a single anatomical image (lung) and a giant compound name.

**A. Title / subtitle relationship**
- Slide is a **section divider** (Slide-Design-Brief §1 type), so assertion title is not strictly required.
- The composed slide (via `<CaseHeroDivider>`) shows: corner chrome, kicker `"CASE STUDY 01"`, title `"Ambrisentan"`, hairline rule, subtitle `"Pediatric Pulmonary Arterial Hypertension"`, tagline `"Rare Disease · Pediatric Extrapolation · Model-based..."`, lung illustration on right, meta + verdict + source row.
- ❌ **In `CaseHeroDivider.jsx`:** the kicker has `marginBottom: '3vh'` (line 93), title `marginBottom: '2.5vh'` (line 110), hairline `marginBottom: '2vh'` (line 124), subtitle `marginBottom: '4vh'` (line 141). Five `vh`-derived gaps on a single column — on a tall viewport (e.g. 1080p) those add up to ~120 px of vertical padding; on a short viewport (768p) they collapse to ~80 px and the column reads cramped. **[MED]**

**B. Footer**
- ❌ **Does not use `<Footer>` from SlideParts.** `CaseHeroDivider` rolls its own meta line + verdict + source + page number (lines 189-262). Inconsistent with the rest of the deck. **[HIGH]**
- Page number rendered via `caseNumber / totalCases` (line 260) — `"01 / 03"`. The deck-wide footer convention is `index+1 / total` (35-slide deck) — so this divider says `01 / 03` but the chrome page indicator elsewhere says `05 / 35`. Two competing numbering systems. **[HIGH]**

**C. Spacing, density, alignment**
- All positioning is absolute with `vh`-based offsets (`top: '18vh'` line 79, `bottom: '8vh'` line 194, `bottom: '3vh'` line 236). Not on the 12-col grid. Slide-Design-Brief §8 hard rule: "12-column grid, everything aligned, 60px margin minimum." This slide bypasses that. **[HIGH]**
- The meta+verdict line (`bottom: 8vh`, line 194) and the source line (`bottom: 3vh`, line 236) are both at the bottom — at 768p viewport they could overlap because `8vh = 61px` and `3vh = 23px` plus content height. Needs visual verification.
- Lung illustration column at `width: clamp(320px, 34%, 620px)` and the type column at `width: clamp(620px, 58%, 1100px)` — total = 92% of viewport width plus two `var(--deck-gutter)` padding values. Could overlap on intermediate viewports (~1280-1440px) where both clamps hit their max. **[MED]**

**D. Token compliance**
- ✅ Colors all via `var(--case)`, `var(--cream)`, `var(--cream-muted)`, `var(--cream-faint)`.
- ❌ Six clamp() font-sizes hardcoded inline in `CaseHeroDivider.jsx`: `clamp(0.8rem, 1vw, 1.1rem)` (line 89), `clamp(3.2rem, 7.5vw, 9rem)` (line 105), `clamp(1.3rem, 2.4vw, 2.8rem)` (line 136), `clamp(0.95rem, 1.3vw, 1.4rem)` (line 156), `clamp(0.6rem, 0.78vw, 0.85rem)` (line 199), `clamp(0.7rem, 0.85vw, 0.9rem)` (line 251). None reference `--fs-slide-*`. Critically: the giant compound title at 9 rem (~144 px) is **larger than the `--fs-display: 96pt` token** (≈ 128 px). Inconsistent register vs the rest of the deck. **[HIGH]**
- Hardcoded `letterSpacing: '0.22em'` (lines 200, 224) instead of `var(--ls-mono-wide)`.
- **Unique font-sizes on slide:** ≈ 6.
- **Accent colors:** coral (case) only. ✅ within budget.

**E. Visual elements (the lung)**
- `<LungsShared layoutId="lung-lynch" variant="hero" />` (line 32). The `layoutId` is **the model citizen** — it morphs into the same lung in slide 06b (`<LungsShared layoutId="lung-lynch" variant="context" />`). This is exactly what slides 01-04 should be doing for their case markers / hubs.
- I haven't read the lung SVG itself. Needs separate audit.

**F. Motion / cinematic transitions**
- ✅ Has `prefers-reduced-motion` semantically (the framer-motion `motion.section` with `initial={{opacity:0}}` honors `useReducedMotion` automatically when the deck root sets it via context — but `CaseHeroDivider` itself does **not** call `useReducedMotion()`. The framer-motion v10+ default is to honor the global `MotionConfig`. Needs visual verification that the deck wraps in `<MotionConfig reducedMotion="user">`.) **[MED — needs verification]**
- `D.tagline = 2.30s`, `D.meta = 2.50s`, `D.source = 2.80s` — much more reasonable cadence than slide 04's 6.6 s.
- `layoutId="lung-lynch"` is the cleanest morph in the batch.

**G. Pattern conformity**
- ❌ **Bypasses `SlideGrid` + `SlideParts` entirely.** `CaseHeroDivider` is a parallel pattern with its own absolute layout. The `<Sep>` component (line 267) is a one-off cruft.
- The pattern is **partially justified** — divider slides do have different chrome needs than content slides — but bypassing the grid means the slide will drift on viewports the rest of the deck handles.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Refactor `CaseHeroDivider` (`4-Apps/merck-deck/src/components/deck/patterns/CaseHeroDivider.jsx`) to use `SlideGrid` with a custom `areas` prop (e.g., `'kicker .' / 'title illustration' / 'rule illustration' / 'subtitle illustration' / 'tagline illustration' / 'meta meta' / 'source pageno'`). Eliminates all `vh`-positioned absolutes + restores the 12-col contract. | L | HIGH |
| 2 | Replace the 6 hardcoded `clamp()` font-sizes inside `CaseHeroDivider.jsx` with the `--fs-display`, `--fs-h1-lg`, `--fs-h3`, `--fs-lead`, `--fs-meta`, `--fs-micro` tokens. Cap title at `var(--fs-display)` so it doesn't exceed the deck-wide hero scale. | M | HIGH |
| 3 | Replace the hand-rolled meta/source/page footer (`CaseHeroDivider.jsx` lines 189-262) with the standard `<Footer>` component. Page number then reads from `useDeck()` and matches the deck's overall numbering (no more `01 / 03` vs `05 / 35` confusion). | M | HIGH |

---

### Slide 6 · `case-background` — Background · the disease and the drug

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/06b-case-background.jsx` (+ `slides/cs1-background/`)
**Slide job (in 1 sentence):** Calmly orient the panel on PAH (the disease) and ambrisentan (the drug) — earn the right to introduce the 19-year pediatric gap on the next slide.

**A. Title / subtitle relationship**
- ✅ Uses `<SlideFrame>` so all chrome flows through SlideParts.
- Headline `"Pulmonary arterial hypertension, and the drug that treats it."` (lines 40-46) with coral italic emphasis on the second clause. Defensibly an assertion (the slide proves both claims).
- `headlineMaxChars={32}` (line 47) — narrow. Forces wrap. The full headline is ~58 chars so it wraps to 2 lines. With the colon-comma break at "...hypertension," the wrap is clean. ✅
- No subhead (omitted from `<SlideFrame>` props). Acceptable — the two cards below ARE the subhead in narrative function. **[LOW — defensible]**

**B. Footer**
- ✅ Uses `<Footer>` via `<SlideFrame>`.
- ❌ **Tagline misuse:** `footerTagline="Source · EMA SmPC · FDA Letairis label · Galiè 2013 · Ivy 2024"` (line 50) — that's a citation cluster, not a payoff line. The Footer's tagline is rendered `italic`, `flex-1`, with `truncate` (SlideParts.jsx:165). On viewports < 1366px this string will be cut mid-word. The convention demands `tagline = italic payoff sentence`; sources should be inline (in card footers like the existing `<CommercialSplit>` pattern) or in a separate source rail. **[HIGH]**
- `footerKicker="Case 01 · Background"` (line 49) — verbose vs convention; should be `"06 · Background"`. **[LOW]**

**C. Spacing, density, alignment**
- Inner viz-cell layout uses **its own grid** (lines 67-81) with `gridTemplateRows: '2.2fr 1fr auto'`. Comments at lines 73-78 document a previous fix where Card 02 was being clipped — the grid fraction was bumped to compensate. Still fragile.
- `cs1-bg-cards` grid uses `gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 0.8fr)'` with `columnGap: 'clamp(340px, 36vw, 640px)'` (lines 124-129). At 1920px viewport the gap eats 36% (≈ 690 px) and each card gets ~440 px. **The gap is wider than each card** — that's by design (the lung lives in the gap), but it's a brittle layout: if the lung SVG aspect changes or the cards' content grows, the proportions collapse.
- ❌ **Lung overlay (lines 187-201)** is `position: absolute; inset: 0; pointer-events: none; z-index: 0;` between two `z-index: 2` cards. With `overflow: hidden` to clip the lung vertically. Comment acknowledges previous flicker issues. The whole arrangement is the kind of thing that breaks under font-loading reflow or Safari subpixel rounding. **[MED]**
- Three `@media` query overrides inline-styled in `<style>` (lines 87-112) re-engineer the layout at 1024 / 900 / 640 — that's a lot of conditional logic for a slide. Suggests the base layout isn't truly fluid.

**D. Token compliance**
- ❌ **Wildly inconsistent font sizes.** Inline:
  - line 244 `'0.72rem'` (timeline label)
  - line 268 `'0.68rem'` (PathwayChips label)
  - line 277 `'0.68rem'` (PathwayChips chip)
  - line 322 `'0.68rem'` (CommercialSplit)
  - line 376 `clamp(0.95rem, 1.2vw, 1.35rem)` (TransitionLine)
  - Inside `CaseBodyCard` and `CardHighlight` — not read in this audit (separate file).
  None of these reference `--fs-slide-*` or `--fs-meta` / `--fs-micro` tokens. **[HIGH]**
- ❌ Hardcoded `letterSpacing: '0.22em'` repeated 6+ times (lines 244, 270, 279, 324, 332). Should be `var(--ls-mono-wide)`.
- ❌ Hardcoded `padding: '4px 10px'` (line 279), `borderRadius: 12` (line 280), `width: 48` `height: 2` (lines 367-368). Should consume `--space-*` tokens.
- ✅ Colors all via tokens.
- **Unique font-sizes on slide:** ≈ 5+ (eyebrow + headline + 3 inline rem sizes + clamp). Over §4 ≤ 3.
- **Accent colors:** coral (case) + cream (ink). 1 accent. ✅ within budget.

**E. Visual elements (lungs + timeline)**
- `<LungsShared layoutId="lung-lynch" variant="context">` (line 200) — the morph target from slide 05. ✅ Excellent continuity.
- `<AgencyApprovalTimeline delay={2.5} compact />` (line 250) — full-width adult-approval timeline below the cards. Not read in this audit; needs separate review for chartjunk.
- `<PathwayChips>` (lines 263-310) — three chips, one active (coral wash) two muted. Clean. ✅
- `<CommercialSplit>` (lines 315-343) — meta strip "Letairis · US — Volibris · ex-US". Clean.
- `<TransitionLine>` (lines 350-388) — bottom strip with coral bar + italic line "Approved for adults across four reference agencies. Pediatric dosing — the unfinished question." This is the **real** assertion of the slide and it's relegated to a sub-component. Should be promoted into the slide's actual subhead or a dedicated bottom rail.

**F. Motion / cinematic transitions**
- ✅ Uses `useReducedMotion()` from framer-motion (line 31). Plumbs `reduce` into both `<TimelineRow>` and `<TransitionLine>` for proper fallback.
- Cadence is calm (1.7 → 3.3 s) — appropriate for a "calm orientation" slide.
- The `layoutId="lung-lynch"` morph from slide 05 is the cinematic moment — earned, single, restrained. ✅
- **Proposed enhancement:** the `<TransitionLine>` at lines 350-388 should `layoutId="ped-question-line"` so the next slide (07 / `hook` actually — wait, in this batch ordering slide 07 IS this slide's neighbor → slide 11 `case-challenge`) can morph the same coral bar into the spine of the challenge stack. The line literally says "the unfinished question" — its visual rhyme should propagate forward.

**G. Pattern conformity**
- ✅ Uses `<SlideFrame>` → `<SlideGrid>` + `<SlideParts>`.
- ⚠ Sub-components in `slides/cs1-background/`: `LungsShared.jsx` (used twice with morph — clean), `AgencyApprovalTimeline.jsx` (separate audit needed), `LungsDiagram.jsx` (appears unused — `06b` only imports `LungsShared`; verify and delete if dead). **[LOW]**
- Inline component definitions (`PathwayChips`, `CommercialSplit`, `TransitionLine` — lines 263, 315, 350) live in the slide file. Acceptable for one-offs, but `TransitionLine` looks reusable across CS1 slides and should probably be promoted to `slides/cs1-background/TransitionLine.jsx`. **[LOW]**

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Move the citation cluster out of `footerTagline` (line 50). Replace with `footerKicker="06 · Background"` and `footerTagline="Pediatric dosing — the unfinished question."` (the actual takeaway). Move the citation list into a small source rail above the footer (or into the existing `<TransitionLine>` as a `<small>` source caption). Eliminates the `truncate` clipping risk + restores the convention. | S | HIGH |
| 2 | Replace the 5+ inline `'0.68rem'`/`'0.72rem'`/`'0.66rem'` font-sizes (lines 244, 268, 277, 322, etc.) with three tokenized helpers consumed via a shared `tokens.css` chip + meta + caption class. Cuts the slide's unique-font-size count from ~5 to ~3 (eyebrow / headline / chip). | M | HIGH |
| 3 | Promote `<TransitionLine>` (lines 350-388) to `slides/cs1-background/TransitionLine.jsx`, add `layoutId="ped-question-bar"` to the `<span aria-hidden>` coral bar (lines 364-372), and have slide 07 (`case-challenge`) match the layoutId on its `SpineLine` (line 250-269 of `11-case-challenge.jsx`). Coral bar morphs from horizontal → vertical across the slide transition: the deck's first cinematic bridge into CS1 body. | L | LOW |

---

### Slide 7 · `case-challenge` — The challenge

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/11-case-challenge.jsx` (+ `slides/cs1-challenge/`)
**Slide job (in 1 sentence):** Show the three constraints (disease severity, label gap, sparse PK) that converge on a single focal question — the Case 01 thesis.

**A. Title / subtitle relationship**
- ✅ Strong assertion: `"Pediatric PAH demanded a dose — with no viable trial path."` (lines 60-67).
- `headlineMaxChars={28}` (line 68) is **tight** for a 56-character headline — forces a wrap on "with no viable trial path." which is the italic emphasis. May visually disconnect the emphasis from the assertion. **[MED]**
- No subhead. The three numbered cards are the subhead in narrative function. ✅

**B. Footer**
- ✅ Uses `<Footer>` via `<SlideFrame>`.
- ❌ **Same tagline misuse as slide 06b:** `footerTagline="Source · AMB112529 · NCT01332331 · ambrisentan pediatric PAH"` (line 70). Citation cluster, not payoff. Will `truncate`. **[HIGH]**
- `footerKicker="Case 01 · The challenge"` (line 69) — verbose vs convention. **[LOW]**

**C. Spacing, density, alignment**
- ✅ **Best-architected layout in the batch.** Single unified 2-col × 5-row grid (line 99-107) where the spine-column dots and content-column cards share row heights — so dots automatically sit at card midpoints regardless of row growth. Comment at lines 84-93 explains the design well.
- 3 `@media` overrides at 1024 / 900 / 640 (lines 118-141) progressively shed chrome: charts hide on tablet, spine column hides on mobile.
- `cardDelay = 1.8 / 2.05 / 2.3` and chart delays staggered — clean cadence.
- ❌ Cards have `widthPct={62}/78/94` (lines 165, 186, 205) — the **progressive-width staircase** is intentional ("progressive reveal down the stack" comment at line 363) but it means the chart panels at the right edge sit at three different x-positions. Visually unstable. The progressive width carries no information; it's decorative variation. **[MED]**

**D. Token compliance**
- ❌ **The worst font-size sprawl in the batch.** Inline:
  - line 292 `'0.55rem'` (spine dot number)
  - line 293 `'0.08em'` (spine dot letter-spacing)
  - line 427 `'0.66rem'` (eyebrow inside card)
  - line 442 `clamp(0.98rem, 1.15vw, 1.28rem)` (card title)
  - line 456 `clamp(0.74rem, 0.85vw, 0.92rem)` (card body)
  - line 526 `'0.54rem'` (chart caption)
  - line 568 `clamp(1.1rem, 1.4vw, 1.65rem)` (focal question)
  Seven distinct font sizes inline, none tokenized. **[HIGH]**
- ❌ Hardcoded `marginTop: 11` (line 263) — magic number explained as "start at top of dot 01 (22px dot / 2)". Should be `marginTop: 'calc(var(--space-3) - 1px)'` or similar tokenized expression.
- ❌ Hardcoded `width: 1.5` for spine (line 259) — sub-pixel. Hardcoded `boxShadow: '0 2px 8px color-mix(...)'` on chart panel (line 505). Hardcoded `width: 220` on chart frame (line 489).
- ✅ Colors all via tokens, including the elegant `var(--case, var(--coral))` fallback pattern throughout.
- **Unique font-sizes on slide:** ≈ 7.
- **Accent colors:** coral (case) + amber (focal question highlight). 2 accents with assigned meaning. ✅ within budget.

**E. Visual elements (3 charts + spine + focal)**
- 3 mini-charts (`SurvivalMiniChart`, `LabelCoverageChart`, `SparsePKChart`) each in 220×180 panels. Not read in this audit.
- Charts hidden on viewports < 900px (line 130) — the slide explicitly accepts that text + timeline carries the message on mobile. Honest design choice.
- ❌ **Chart caption font size `'0.54rem'`** (line 526) ≈ 8.6px — **violates Slide-Design-Brief §5 hard rule "body text ≥ 24pt for projection, ≥ 20pt for screen-share"** and §10 "body text ≥ 24pt". A 0.54rem caption inside a chart card is sub-projection-readable on a 1080p deck preview, illegible at the back of a room. **[HIGH]**
- `<ApprovalTimeline variant="silence" delay={3.0} />` (line 224) — 4th panel spanning both columns. Modernization opportunity: the `silence` variant should share a `layoutId` with slide 02's `silent-line` (lines 67-78 of `ConvergenceTimeline.jsx`). Same dashed line, same coral, same semantics. Today they're independent components.
- `<FocalQuestion>` (lines 546-592) is genuinely the heart of the slide — amber wash background, italic display type, "regulatory-grade evidence" animates from cream → amber at 3.9s. The animation **is** the assertion. Excellent.
- Chart panel `boxShadow: '0 2px 8px color-mix(in srgb, var(--coral) 8%, transparent)'` (line 505) — soft coral shadow. Decorative. Violates §10. **[MED]**

**F. Motion / cinematic transitions**
- ✅ `useReducedMotion()` everywhere (lines 243, 273, 312, 356, 547). Every motion gated.
- Cadence is dense but coherent: spine 1.6 → dots 1.8 / 2.05 / 2.3 → cards same → diamond 3.0 → focal 3.1 → focal-color-shift 3.9 = ~2.3 s motion arc, paced.
- Diamond animation (lines 311-348) — rotated wrapper + scale-only inner child to avoid framer-motion clobbering rotate. Sophisticated workaround.
- **Proposed enhancement:** the `<FocalQuestion>` amber wash card (lines 551-563) should share `layoutId="cs1-focal-amber"` with slide 11b (`case-strategy`) so when the deck answers the focal question on the next slide, the same amber card morphs into position rather than cuts. The slide is literally posing a question — its visual answer should travel with it.

**G. Pattern conformity**
- ✅ Uses `<SlideFrame>` → `<SlideGrid>`.
- Sub-components in `slides/cs1-challenge/` are well-named.
- Inline `Highlight` (line 597) and `Strong` (line 615) helpers — fine for slide-local typography utilities.

**H. Top 3 actionable enhancements**

| # | Enhancement | Effort | Severity |
|---|---|---|---|
| 1 | Bump chart-caption fontSize from `'0.54rem'` (line 526) to `var(--fs-meta)` / `'0.78rem'` minimum. Drop the chart `boxShadow` (line 505). Two changes, fixes the §5 readability violation + the §10 chartjunk violation. | S | HIGH |
| 2 | Replace `footerTagline="Source · AMB112529 · NCT01332331 · ambrisentan pediatric PAH"` (line 70) with the actual payoff: `footerTagline="A pediatric dose was needed — but never translated."` Move the citation list into a small source caption beneath the timeline strip (line 224 area). Same fix pattern as slide 06b. | S | HIGH |
| 3 | Add `layoutId="cs1-focal-amber"` to the `<FocalQuestion>` `<motion.div>` (line 551-563) and a matching wrapper on the next slide (11b `case-strategy`). The amber question card morphs into the answer panel instead of cutting — the deck's first true within-case cinematic. | M | MED |

---

## Cross-cutting recommendations from this batch

1. **Token migration sweep on inline font sizes.** Slides 01, 02 (viz), 03 (viz), 06b, 11 collectively contain 25+ inline `fontSize` declarations using raw `rem`/`em`/`px`/`clamp()` values. Consolidate into ≤ 6 tokenized scales: `--fs-slide-headline`, `--fs-slide-subhead`, `--fs-slide-kicker`, `--fs-meta`, `--fs-micro`, plus a new `--fs-slide-card-body` if needed. This single sweep would bring 5/7 slides into §4 compliance (≤ 3 sizes per slide).

2. **Footer tagline contract enforcement.** Slides 06b and 11 use the tagline slot for citation clusters that get truncated by the rail's `truncate` class. Either (a) introduce a `<SourceRail>` SlidePart that lives in a new grid area above the footer, or (b) enforce the convention in `<Footer>` by surfacing a `source` prop separate from `tagline`. Keeps citations visible without crowding the payoff line.

3. **Decorative shadow / glow / blur audit.** Slides 01, 03, 06b, 11 all have `boxShadow`, `backdropFilter: blur`, or `<filter>` glow elements that violate §10 "no drop shadows on cards" and §14 Tell #5 "gradient/glow defaults". Single grep pass for `boxShadow` / `backdropFilter` / `feGaussianBlur` would find them all. Default to flat; reserve glow for one earned hero moment per case (currently nothing in the deck earns it).

4. **`layoutId` morph plan, deck-wide.** Slides 01 / 02 / 03 / 04 set up visual elements (PK landmark dots, agency pills, hero hubs, dataflow outcomes) that recur on later slides as **hard cuts**. Slide 05 already demonstrates the pattern correctly with `layoutId="lung-lynch"`. Audit suggests 6 specific `layoutId` morphs to add (PK case markers → case dividers, hub-servier → closing emblem, agency pills → impact stats, outcome blocks → case dividers, focal-amber → strategy). That's 6 small additions for 6 cinematic moments the deck currently misses.

5. **Footer kicker convention sweep.** Slides 03, 04, 06b, 11 use prose-shaped footer kickers (`"Four countries · three sponsors · one discipline"`) instead of the `"NN · short label"` pattern established by slides 02 (`"02 · The convergence"`) and not yet broken by 05. Consistency across the rail is what makes "small inconsistencies are the loudest tell" (§17) bite.

6. **Reduced-motion plumbing standardization.** Slides 01, 02, 04, 06b, 11 use `useReducedMotion()` from framer-motion — correct. Slide 03 uses bare `window.matchMedia` (one-shot, non-reactive) — wrong. Slide 05 (`CaseHeroDivider`) doesn't gate motion at all and relies on global `MotionConfig` (unverified). Fix slide 03 + verify deck root sets `<MotionConfig reducedMotion="user">` so divider slides inherit the contract.

