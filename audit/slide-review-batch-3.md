# qp2-seminar slide review — Batch 3 (slides 15–22 · CS2 arc)
**Reviewer:** Claude (slide-review subagent · batch 3)
**Date:** 2026-04-24
**Scope:** CS2 / Tibsovo / India arc — divider, background, the SEC turn, strategy, pillars (×2), response, impact + bridge
**Method:** static source review against zaj-slides rubric (`Slide-Design-Brief.md` §10–§12) and `Deck-Design-Lessons-Claude-Perspective.md` failure patterns. Cross-referenced against `cs2-design.md` story-arc spec. No browser, no runtime visual verification.

---

## Batch summary

- **HIGH-severity findings across batch:** 12
- **Slides with title/subtitle overlap or pinch issues:** Slide 16 (background — bottom-bar collides with `<Footer>`), Slide 19 (Pillar 6 — checklist border + `<Subhead>` competing for the same vertical band when `<Footer>` collapses on tall viewports), Slide 22 (impact — three-row body vs. `<Footer>` rail squeezed when `SecObjectionCard` grows on wider screens).
- **Slides bypassing SlideGrid/SlideParts:** Slide 15 only (`CaseHeroDivider` — uses absolute-positioned vh chrome, not the named-area grid). All seven others use `SlideFrame` correctly.
- **`cs2-shared/` components — used by N slides each:**

| Shared component | Slides using it | Notes |
|---|---|---|
| `WorldMapShared.jsx` | 1 (slide 16 only) | "Shared" in name, single-use in fact. Not morphed. |
| `BoneMarrowShared.jsx` | 2 (slides 15, 16) | True T5 morph via `layoutId="bone-marrow-cs2"`. |
| `PillarArchitecture.jsx` | 4 (slides 17, 18, 19, 20) | The deck's deepest cinematic asset — true T6 sprite. |
| `SecObjectionCard.jsx` | 2 (slides 17, 22) | True T7 morph via `layoutId="cs2-sec-objection"`. |
| `IndiaMap.jsx` *(in `components/deck/illustrations/`, not `cs2-shared/`)* | 2 (slides 15, 22) | True T8 morph via `layoutId="india-cdsco"` — but lives outside `cs2-shared/`, breaking colocation rule. |
| `cs2-challenge/AsymmetryDiagram.jsx` | **0** — DEAD CODE | Built for a prior version of slide 17 that no longer renders it. Imported nowhere in current `15-case2-challenge.jsx`. |
| `cs2-fit/PdDotStrip.jsx` | **0** — DEAD CODE | Not referenced by `18-case2-fit.jsx` (the redesigned "convergence" slide replaced the old PD-dot/ratio viz with the 84.6% ≈ 84.4% typographic centerpiece). |
| `cs2-fit/RatioTrack.jsx` | **0** — DEAD CODE | Same as PdDotStrip — redesigned out of the slide. |

- **Cross-batch patterns (3+ slides share an issue):**
  1. **Hardcoded `var(--amber, #d8a634)` fallback hex appears 6 times** across slides 17 and `SecObjectionCard.jsx`. The `:root` actually defines `--amber: #FFE14D` (a brighter yellow). The local `#d8a634` fallback is a different, darker amber — when the chain `var(--amber, #d8a634)` resolves, the fallback never fires (the var always exists), so the fallback is *misleading documentation*. The intent appears to be "burnt-gold for legibility on dark," but `:root --amber` is `#FFE14D` and would render quite different from the fallback. This is an unresolved color-token inconsistency.
  2. **`backdrop-filter: blur(...)` on cards** appears on slides 16 (DrugCard, DiseaseCard, bottom assertion bar). Backdrop-filter is a known performance landmine on long-lived presentation tabs and a chartjunk-adjacent decoration per `Slide-Design-Brief` §6 ("modern technical decks use flat backgrounds, single accent colors, hairline dividers"). Not part of the design tokens.
  3. **`linear-gradient(...)` on hero cards** appears on slides 17 (ReframeCard), 19 (ChecklistCard), 21 (leadership-beat callout), 22 (HeroTile). Per Lessons-Claude doc Tell #5: "Every AI-generated slide has some gradient somewhere... default to flat. Add one gradient per case study maximum." CS2 has **5+ gradient surfaces**.
  4. **`maxChars={36}` on every CS2 `<Headline>`** (slides 16, 17, 18, 19, 20, 21, 22). The `Headline` default is 34. Because CS2 headlines wrap a coral italic span on the second line, the 36ch ceiling produces a consistent two-line headline rhythm — *good*, this is intentional and consistent. ✓
  5. **Hardcoded font-sizes in `clamp(...)` literals** on slides 19 (`'clamp(2rem, 3.4vw, 3rem)'`, line 120 of `19-case2-decision.jsx`; `'clamp(2.4rem, 4.8vw, 4.5rem)'` line 117 of `18-case2-fit.jsx`; `'clamp(3rem, 6vw, 5.5rem)'` line 156 of `18-case2-fit.jsx`; `'clamp(2.4rem, 4.4vw, 3.6rem)'` line 148 of `22-case2-bridge.jsx`; `'clamp(2rem, 3.4vw, 3rem)'` line 120 of `19-case2-decision.jsx`). The deck's fluid type tokens (`--fs-slide-headline` etc.) follow a `clamp(min, min(vw, vh), max)` formula that responds to BOTH narrow and short viewports. These local `clamp(min, vw, max)` literals only respond to width — they will look "huge title, tiny viz" on a phone in landscape (the exact bug `index.css` lines 239–248 exist to prevent).
  6. **Hardcoded `width: 200`, `height: 200`, `width: 120`, `width: 140`, `width: 116`, etc.** in `PillarArchitecture.jsx` and slides 19/20 grid columns. These are px ints, not tokens — they will not scale on tall mobile portraits.

- **Continuity opportunities (layoutId, shared elements across CS2):**
  - `BoneMarrowShared` dies at slide 16 — a single shared morph between two adjacent slides. Could carry to slides 17–18 as a marginal anatomy seal (faded "this is what we're talking about" stamp).
  - `WorldMapShared` is used only on slide 16 — which is a waste of its `layoutId="cs2-world-map"`. The world-map could appear faintly on slide 22 (with India now coral-filled inside the world context) — that single addition would close the geographic loop the way the design brief promises.
  - Pillar architecture transitions through 4 stages (`seed → full → hero6 → hero15`) but does **not** appear on slide 22 (impact). The closing slide should show the architecture *complete* (e.g. as a 6-dot signature in the corner) — currently the pillars vanish at slide 20 with no visual closure.
  - `IndiaMap` morph from slide 15 (cyan empty hero) → 16 (background outline, currently rendered by `WorldMapShared`'s `.IND` SVG selector — *not* by `IndiaMap`!) → 22 (coral filled) is **broken in the middle**: slide 16 uses the world-map's India class, not the standalone `IndiaMap` component. The shared `layoutId="india-cdsco"` therefore morphs from slide 15's `IndiaMap` → directly to slide 22's `IndiaMap`, *skipping* slide 16. The audience sees the India outline on slide 16 (inside the world map) but it's a different DOM element than the morphing one — so the cinematic continuity the design brief promises is half-broken.

---

## Per-slide reviews

### Slide 15 · `case2-divider` — "Case 02 · Tibsovo · India"

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/14-case2-divider.jsx`
**Slide job (1 sentence):** Open the case — register the cyan accent, plant the bone-marrow + India seeds that will morph into slide 16's background.

**A. Title / subtitle relationship.** Renders via `CaseHeroDivider` (a custom pattern, not `SlideFrame`). Title `"Ivosidenib"` uses `clamp(3.2rem, 7.5vw, 9rem)` (CaseHeroDivider line 105) — the giant divider scale is intentional and works for a chapter break. Subtitle `"India's Waiver Pathway"` uses `clamp(1.3rem, 2.4vw, 2.8rem)` with `maxWidth: '22ch'` (line 142) — narrow but appropriate for divider. Tagline below at `clamp(0.95rem, 1.3vw, 1.4rem)`, `maxWidth: '54ch'`. Vertical rhythm hard-coded as `marginBottom: '3vh' / '2.5vh' / '2vh' / '4vh'` (lines 93, 110, 124, 141) — vh-based pinch risk on short viewports. **Severity: LOW** (divider tolerates more visual freedom than content slides).

**B. Footer.** No `<Footer>` component. Instead a custom meta-row at `bottom: '8vh'` (line 194) and a source + page-no row at `bottom: '3vh'` (line 236). Page number sourced from `caseNumber` prop (`02 / 03`), **not** from `useDeck()` context — so if a slide is added before this one in the manifest, the divider's "02 / 03" will lie. **Severity: MED** — cross-batch the other dividers likely have the same bug.

**C. Spacing, density, alignment.** `top: '18vh'` for type column, `top: '12vh'` for illustration column, `bottom: '8vh'` for meta. Lots of vh-anchored absolute positioning — when viewport gets short (Zoom split-screen, projector aspect mismatch) the columns collapse onto each other. Two columns layered via `position: absolute` with hardcoded `width: 'clamp(620px, 58%, 1100px)'` left and `width: 'clamp(320px, 34%, 620px)'` right — at narrow desktop widths (~1280px) these overlap (620px + 320px + gutter ≈ 1040px, but text column max is 1100px = collision). **Severity: MED**, lines 79–83, 173–177.

**D. Token compliance.** Hardcoded sizes everywhere via `clamp()` literals (lines 89, 105, 136, 156, 199). Color tokens used correctly (`var(--case)`, `var(--cream)`, `var(--cream-muted)`, `var(--cream-hairline)`). Letter-spacing uses tokens. Font sizes on slide: kicker (≈1rem), title (≈9rem), subtitle (≈2.8rem), tagline (≈1.4rem), meta (≈0.85rem), source (≈0.9rem) — **6 unique font sizes**, exceeds the §4 rubric's ≤3 target. Accent colors used: `--case` (cyan), `--cream`, `--cream-muted`, `--cream-faint` — within budget, with semantic meaning.

**E. Visual elements.** `DualSeed` stacks `BoneMarrowShared` (variant="hero") above `IndiaMap` (variant="hero"). Both carry `layoutId`s (`bone-marrow-cs2`, `india-cdsco`) — true T5 / T8 origins. The bone marrow uses an SVG duotone filter (lines 75–107 of `BoneMarrowShared.jsx`) — clever, anatomically faithful per CS2 design brief. India is hand-coded SVG paths (`mainland`, `neStates`, `sriLanka` in `IndiaMap.jsx` lines 69–107) — adequate but stylized. **A11y:** both illustrations are `aria-hidden`, which is correct given the title carries the meaning. **Modernization:** `BoneMarrowShared` and `IndiaMap` should both live under `cs2-shared/` for colocation.

**F. Motion / cinematic transitions.** Heavy entrance choreography via `motion.section` opacity, then cascading delays `D.chrome=0.10 → D.kicker=0.25 → D.title=0.55 → D.rule=1.10 → D.subtitle=1.30 → D.tagline=2.30 → D.meta=2.50 → D.source=2.80`. Total reveal ≈ 3.4s — within the §9 audit's "≤ 10% of slide time" if the divider holds for ≥34s (which it should as a chapter break). **No `prefers-reduced-motion` fallback** — every motion component will animate regardless of the user's OS setting. Lines 56–63, 69–73, 86–98, 102–116, 119–129, 133–148, 152–166, 171–187 — all motion props with no reduced-motion guard.

**Cinematic proposal:** the two seeds (bone marrow + India) should each have a tiny *count badge* — `1` next to India, `42+` next to bone marrow's "patients global" — that morphs into slide 16's hero numbers (15,867 and 42 dots). Currently the seeds are pure shape; adding numeric badges that morph would carry a quantitative spine through T5.

**G. Pattern conformity.** Bypasses `SlideGrid` entirely (only divider in batch to do so). Justifiable for hero/divider per `Slide-Design-Brief` §15 ("Hero · Opening statement, no chrome") — but means this slide cannot benefit from the named-area overlap protection that the rest of CS2 gets. Recommend adding a `STANDARD_AREAS`-compatible "divider" preset to `SlideGrid` so dividers can opt into the safety net.

**H. Top 3 actionable enhancements:**

| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Move `BoneMarrowShared`, `IndiaMap`, `WorldMapShared` into `cs2-shared/` (currently `BoneMarrowShared` and `WorldMapShared` are there, `IndiaMap` is in `components/deck/illustrations/`) — colocate and rename for the actually-shared subset. Update import in `14-case2-divider.jsx` line 3. | S | MED (architectural drift) |
| 2 | Replace vh-anchored `top: '18vh' / 'top: '12vh' / 'bottom: '8vh' / '3vh'` (lines 79, 173, 194, 236) with a `SlideGrid` divider preset that uses named areas. Eliminates the column-collision risk at <1280px desktop widths. | M | MED (overflow on narrow desktop) |
| 3 | Add `prefers-reduced-motion` guard to `CaseHeroDivider`'s 8 cascading motion calls — wrap delays in a hook that returns `0` when reduced-motion is set. | S | HIGH (a11y / WCAG 2.3.3 compliance) |

---

### Slide 16 · `case2-background` — "CS2 background · 42 countries · India empty"

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/16-case2-background.jsx`
**Slide job (1 sentence):** Show the geographic asymmetry — 42 coral dots on a real Robinson world map, India as the one empty outline, bone marrow + drug + disease cards as the molecular-to-organ context.

**A. Title / subtitle relationship.** Headline: `"42 countries. One outline still empty."` with coral italic emphasis on the second clause — assertion-style, ≤32ch enforced. Subhead: `"Ivosidenib · 500 mg QD · IDH1-mutant AML & CCA · 15,867 patients of global recorded exposure."` at `--fs-slide-subhead` with 100ch — long but single-line on most viewports. **Risk:** the subhead and the bottom assertion line (`"42 countries. 15,867 patients. India still required local data."` at line 167) carry overlapping content — both quantify "42 countries" and "15,867 patients." Two competing assertions for the same point. **Severity: MED** (focal-point ambiguity per §3 5-second test).

**B. Footer.** Uses `<Footer>` via `SlideFrame` props (`footerKicker`, `footerTagline`). Kicker: `"Case 02 · The global picture"`. Tagline: 4-source citation (76 chars) — long for a tagline; will `truncate` (line 165 of `SlideParts.jsx`) on viewports <800px. **Severity: LOW–MED.**

**C. Spacing, density, alignment.** The bottom assertion bar (lines 138–171) is `position: absolute; bottom: 0` inside the viz region, which means it **overlaps the standard `<Footer>` slot** — but the `<Footer>` is in the `footer` grid area below the viz, so they don't *technically* collide in the named-grid layout. However, the absolute bar has `borderTop: '2px solid var(--cyan)'` and `backdrop-filter: blur(4px)` — visually it reads as a footer too, creating two stacked footers. **HIGH severity — footer competition is the Slide-02-flagged bug pattern.** Fix by moving the assertion content into the `<Subhead>` slot or removing the bottom-bar entirely (the assertion is already in the headline).

`columnGap: 'var(--space-7)'` on line 91 — `--space-7` is **not defined** in `index.css` (the scale jumps `--space-6: 24px → --space-8: 32px`). Will resolve to `0` (CSS default for unknown var with no fallback), collapsing the bone-marrow column directly against the cards column. **HIGH severity bug.**

**D. Token compliance.**
- Hardcoded color: `'rgba(60, 145, 165, 0.18)'` (WorldMapShared.jsx line 58 default) — unmapped landmass color. Should be `color-mix(in srgb, var(--cyan) 18%, transparent)`.
- Hardcoded color: `'rgba(255, 255, 255, 0.06)'` (line 59) — should be `var(--cream-ghost)`.
- Hardcoded color: `'rgba(255, 255, 255, 0.18)'` (line 87) — no token equivalent; introduce one.
- Backdrop-filter (lines 150, 189, 250) — chartjunk per §11.
- Multiple `linear-gradient` and `color-mix` washes on cards (lines 188, 250) — gradient density.
- Unique font sizes on this slide: eyebrow, headline, subhead, kicker (cards), card subhead, card body, mono pageno, tagline = **8 sizes**, well over the §4 ≤3 target.
- Accent colors: cyan (drug card), coral (disease card, India outline, headline span), amber would be expected but absent here. Within budget.

**E. Visual elements.**
- `WorldMapShared` (cs2-shared) — uses real Wikipedia Robinson world-map SVG with ISO-3166-A3 country classes. Sophisticated implementation. **A11y:** `aria-hidden` (line 118), correct.
- `BoneMarrowShared` variant="context" — duotone-filtered CRUK SVG with hotspot annotation. Excellent.
- DrugCard / DiseaseCard — local components, `border + borderLeft` accent pattern is inconsistent vs. the `--case` accent system (cards manually pick their own coral/cyan).
- The `42` map dots use **`.IND` selector to render India with stroke** (lines 90–100 of WorldMapShared) — but slide 15's `IndiaMap` carries `layoutId="india-cdsco"`, and slide 22's `IndiaMap` resumes that layoutId. **Slide 16 uses a different DOM node entirely** — a path inside the WorldMapShared SVG with no `layoutId`. The T5/T8 morph thus skips slide 16. *Needs visual verification* but the code path is clear.

**F. Motion.** WorldMapShared fade-in (delay 0.2), bone marrow scale-in (delay 0.4), DrugCard slide-in (delay 1.2), DiseaseCard slide-in (delay 1.5), bottom assertion bar (delay 3.6). Total reveal ≈ 4.2s. **No reduced-motion guards.**

**Cinematic proposal:** the 42 country dots should pulse in **sequentially** (one per ~30ms) while a counter at the headline ticks `0 → 42` — the audience *sees the count happen* instead of arriving at "42." This is the moment to spend 1.5s on quantitative theater. The empty India outline should hold visible for 800ms after dot 42 lands — the silence after the count is what makes "one outline still empty" land.

**G. Pattern conformity.** Uses `SlideFrame` correctly. The absolute-positioned bottom assertion bar (lines 138–171) violates the named-area contract — it floats inside `<Viz>` instead of being a separate area.

**H. Top 3 actionable enhancements:**

| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Fix `--space-7` (line 91) — does not exist in tokens. Replace with `var(--space-8)` (32px) or add `--space-7: 28px` to `index.css`. | S | HIGH (collapsed column) |
| 2 | Remove the absolute bottom assertion bar (lines 138–171) — its claim is duplicate of the headline. Promote `15,867 patients` to a small mono badge inside the bone-marrow column instead. | M | HIGH (dual-footer competition) |
| 3 | Render the India outline using the `<IndiaMap>` component (with `layoutId="india-cdsco"`, `variant="empty"` already exists) overlaid on top of the world map at India's screen position. Hide the WorldMap's `.IND` selector. Restores the broken T5/T8 morph chain through slide 16. | M | HIGH (broken cinematic continuity) |

---

### Slide 17 · `case2-challenge-turn` — "CS2 the turn · 10 Dec 2024 SEC objection"

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/15-case2-challenge.jsx`
**Slide job (1 sentence):** The TURN — dramatize the strategic inflection where "defend with more PK" was rejected in favor of "reframe via mechanism + ICH E5."

**A. Title / subtitle relationship.** Headline `"The SEC asked for a study — we changed what they were looking at."` (assertion-perfect, exactly the §2 standard). Coral-amber emphasis split. `maxChars={36}`. Subhead: 120-char dual-clause Q&A frame — long, but parseable. **Severity: LOW.**

**B. Footer.** `footerKicker="Case 02 · The hinge"`, `footerTagline="Source · CDSCO Oncology SEC minutes · 10 Dec 2024"`. Clean, source-bearing. Consistent w/ other CS2 slides. ✓

**C. Spacing, density, alignment.** `gridTemplateRows: 'auto auto 1fr'` (line 66) gives SEC card → split → pillar seed bottom flex. The middle "split" row has `'1fr auto 1fr'` for two cards + 1px divider — good, geometry is rigid. **However, the pillar seed (line 115) inherits the `1fr` row, so on tall viewports the seed stretches to fill — six tiny boxes at 60×36 each become absurdly spaced.** Lines 96–117 should constrain the seed's height. **Severity: MED.**

`gap: 'var(--space-5)'` rowGap (line 67) — uses tokens. ✓

**D. Token compliance.** Hardcoded `var(--amber, #d8a634)` 4 times in this file (lines 40, 45, 161, 224 — the eyebrow, headline span, defend-strikethrough, reframe arrow). The `--amber` token resolves to `#FFE14D` (bright yellow), not the fallback `#d8a634` (burnt gold). **The fallback is dead code, but the design intent (burnt gold for legibility) suggests `--amber` should perhaps be retuned for dark mode.** *Needs visual verification.* **Severity: MED — semantic ambiguity.**

`linear-gradient(135deg, color-mix...)` on ReframeCard (line 193) — gradient violation per Lessons-Claude Tell #5.

DefendCard `opacity: 0.55` + `text-decoration: line-through` (lines 134, 157–159) — **double-encoded rejection** (color + opacity + strikethrough), which is *good* per §6 accessibility ("never encode meaning in color alone"). ✓

Unique font sizes: eyebrow, headline, subhead, kicker (Option A/B), display (rejected/reframe titles), body (descriptions), seed pillar number, footer kicker, footer tagline = **9 sizes**.

**E. Visual elements.**
- `SecObjectionCard` variant="hero" — clean, mono-faced, amber-bordered. The verbatim quote (`QUOTE` constant in `SecObjectionCard.jsx` line 19) is exactly per design brief. Uses `clamp(1.1rem, 1.6vw, 1.8rem)` — width-only clamp; height-short bug applies. **Severity: MED.**
- `PillarArchitecture` stage="seed" — 6 unlabeled tiny tiles. Per design brief beat 3, this is correct.
- `DefendCard` (lines 122–180) and `ReframeCard` (lines 182–242) — local components. Could be a single `<StrategicChoiceCard rejected/accepted>` pattern (DRY).
- `<Divider>` (lines 244–256) — a 1px hairline. Does not need to be a component (8 lines for a 1px line is over-componentized).

**F. Motion.** SEC card fade+rise (delay 0.6), DefendCard rise (delay 1.4), ReframeCard rise (delay 1.6), pillar seed pillar-by-pillar via `LayoutGroup`. Total reveal ≈ 2.5s. **No reduced-motion guard.**

**Cinematic proposal:** the SEC quote on the TURN slide should appear via a **typewriter mono-character reveal** — 1.6s, cubic-bezier ease-out. This is the "make the audience feel the question being typed by a CDSCO regulator" moment. Currently it just fades. The typewriter would also justify the `font-mono` choice (otherwise mono is decorative).

**G. Pattern conformity.** Uses `SlideFrame` ✓. `cs2-shared/SecObjectionCard` and `cs2-shared/PillarArchitecture` both reused here AND elsewhere ✓.

**H. Top 3 actionable enhancements:**

| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Constrain the pillar seed row (`PillarArchitecture stage="seed"`) to a fixed height (`height: 60px` or `gridTemplateRows: 'auto auto 80px'`) — currently the `1fr` lets it expand and 6 tiny boxes spread to fill, breaking the design-brief intent ("tiny, labeled, arranged in a 2×3 grid"). Lines 66, 96–117. | S | MED (visual hierarchy collapse on tall viewports) |
| 2 | Resolve the `var(--amber, #d8a634)` ambiguity — either retune `:root --amber` to `#d8a634` for the deck-wide darker amber, or remove the fallback (it never fires). Lines 40, 45, 161, 224 + `SecObjectionCard` lines 31, 32. | S | MED (semantic color drift) |
| 3 | Replace `DefendCard` + `ReframeCard` + `Divider` with a single `<StrategicChoice rejected={…} accepted={…}>` shared component in `cs2-shared/`. The pattern will repeat in CS3 (Asparlas N=94 → N=60 reframe) — earn it now. | M | LOW (DRY / future cohesion) |

---

### Slide 18 · `case2-strategy` — "CS2 strategy · mechanism-first · six pillars"

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/16-case2-strategy.jsx`
**Slide job (1 sentence):** Lock in the architecture — mechanism-first banner + the 6 pillars revealed at full equal weight, no hero yet.

**A. Title / subtitle relationship.** Headline `"IDH1 R132 is somatic, not germline."` — assertion ✓. Subhead 120-char single line. Vertical rhythm OK via `SlideFrame`'s named areas.

**B. Footer.** Standard `<Footer>` via `SlideFrame`. Tagline 4-citation chain (88 chars) — `truncate` will clip on screens <900px. **Severity: LOW–MED.**

**C. Spacing, density, alignment.** Three rows: section header (`auto`) → pillar grid (`1fr`) → bottom assertion (`auto`). Clean. The pillar grid centers via `alignContent: 'center'` (PillarArchitecture FullGrid line 109). No overflow risk in the standard case.

The "section header" left-border rule (`borderLeft: '3px solid var(--cyan)'`, line 78) is a *third* eyebrow stripe in the slide — there's already an `<Eyebrow>` in the chrome row, plus a `borderTop: '1px solid var(--cream-hairline)'` on the bottom assertion. Three separator rules competing — soft visual noise per §11.

**D. Token compliance.** Best of the batch — `var(--space-*)`, `var(--cyan)`, `var(--cream)`, `var(--cream-hairline)` used throughout. No raw hex. Unique font sizes: eyebrow, headline, subhead, kicker ("The reframe ·"), body (header line), pillar number (18px hardcoded in `PillarArchitecture FULL_DIMS`), pillar name (14px hardcoded), pillar tag (11px hardcoded), tagline = **9 sizes**. The pillar-internal sizes are px ints in `PillarArchitecture` — no fluid scaling.

**E. Visual elements.** `PillarArchitecture stage="full"` — 6 cards in 2×3, each with number/name/tag. **Strong.** The `LayoutGroup` (PillarArchitecture line 57) correctly enables the morph from slide 17's seed to slide 18's full state via shared `layoutId="cs2-pillar-${id}"` (line 231).

**Sprite vs. hardcoded panels:** `PillarArchitecture` is a *true sprite* — 6 pillars defined in a `PILLARS` const (lines 36–43), four `dims` presets (`SEED_DIMS`/`FULL_DIMS`/`MARGIN_DIMS`/`CHAIN_DIMS`), and one `<PillarCard>` component that morphs between variants. Per the audit calibration question: **this is the rare CS2 component that does it right.** ✓

**F. Motion.** Section header fade (delay 0.4), pillar grid morphs from seed via `LayoutGroup` 1.2s ease, bottom assertion (delay 2.4). Total ≈ 3s. **No reduced-motion guard on the layout transition** — `LayoutGroup`'s 1.2s morph will run regardless.

**Cinematic proposal:** the bottom assertion `"Six pillars. One mechanism. One ICH E5 classification."` should pulse a *sweep highlight* across the 6 pillar cards in sync with the three nouns — pillar-1-through-3 light up on "Six pillars," all six light up on "One mechanism," pillar 6 alone glows on "One ICH E5 classification" (foreshadowing slide 19 hero).

**G. Pattern conformity.** Uses `SlideFrame` ✓. `cs2-shared/PillarArchitecture` reused ✓.

**H. Top 3 actionable enhancements:**

| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Convert `PillarArchitecture` internal sizes (`SEED_DIMS.fontTag: 0`, `FULL_DIMS.fontName: 14`, etc., lines 45–48) from raw px to fluid tokens — e.g. `fontName: 'var(--fs-slide-body)'`, `fontNum: 'clamp(0.9rem, 1.2vw, 1.2rem)'`. Unblocks tall-mobile rendering. | M | MED (responsive type bug) |
| 2 | Add the "sweep highlight" entrance for the bottom assertion — coordinates pillar opacity with the three-noun read. ~30 lines of variant logic in `PillarCard`. | M | LOW (cinematic upgrade) |
| 3 | Drop the `borderLeft: '3px solid var(--cyan)'` accent stripe on the section header (line 78) — the `<Eyebrow>` chrome already establishes the cyan accent. Removes the third competing rule. | S | LOW (visual restraint) |

---

### Slide 19 · `case2-pillar6` — "CS2 pillar 6 · ICH E5(R1) Appendix D · 9 of 9"

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/17-case2-build.jsx`
**Slide job (1 sentence):** Hero pillar 6 (ICH E5(R1) Appendix D, 9-criterion checklist) at center; demote pillars 1–5 to the right-margin strip.

**A. Title / subtitle relationship.** Headline `"The classification key. Nine of nine criteria met."` — assertion ✓. Subhead 120ch — long, single-line.

**B. Footer.** Standard. Tagline cites ICH E5(R1) and Servier internal package.

**C. Spacing, density, alignment.** `gridTemplateColumns: 'auto 1fr'` (line 52) with the left margin (Pillars 1–5) hardcoded to `width: 200` (line 59). At narrow widths, 200px is too wide; at large widths, too narrow for 5 stacked pillar cards (each `MARGIN_DIMS.h: 60` × 5 + gap × 4 = 340px height — fits, but the `200` width crops `pillar.short` text). **Severity: MED.**

The checklist itself is a 2-column grid (line 131) of 9 items — odd number, so column 2 has 4 items and column 1 has 5 (confirmed by `i % 2`). Asymmetric on purpose.

`gridTemplateRows: 'auto 1fr auto'` on `ChecklistCard` — the middle 1fr is the criteria grid, with `alignContent: 'start'` (line 134) — at tall viewports this leaves a void at the bottom of the middle row. **Severity: LOW.**

`maxWidth` ambiguity: `subhead "...Each one passed."` ends with the same word the verdict footer says — duplicate "passed" / "9 / 9 criteria met." Two redundant claims for the same thing.

**D. Token compliance.**
- Hardcoded font-size: `'var(--fs-slide-headline-sm, 1.55rem)'` line 116 — `--fs-slide-headline-sm` is **not defined** in `index.css`. Falls back to 1.55rem. Same misleading-fallback pattern as the amber issue. **Severity: MED.**
- `linear-gradient(180deg, color-mix(...))` on ChecklistCard (line 92) — gradient.
- `border: '1.5px solid var(--cyan)' + borderLeft: '5px solid var(--cyan)'` — accent stripe doubled.
- `width: 22, height: 22, borderRadius: 6` for criterion checkbox (line 200) — px ints.
- `padding: '6px 0'` (line 194) — px int instead of `var(--space-1)` etc.
- `border-bottom: '1px dashed color-mix(in srgb, var(--cream-hairline) 80%, transparent)'` (line 195) — color-mix on a hairline that's already a tint, double-tinting.

**E. Visual elements.**
- `PillarArchitecture stage="hero6"` — pillar 6 expands to fill, others demote to right margin. **However, on this slide pillars 1–5 are in the LEFT margin** (per slide code line 59) and the design brief *says right margin*. Reversal between code and brief — *needs visual verification but cs2-design.md beat 5 says "right margin"*. **Severity: LOW** (design-brief drift).
- `ChecklistCard` — well-structured, 9 criteria with `<CriterionRow>` sub-component using `<Check />` from lucide-react. ✓
- The 9-criterion data lives in a `CRITERIA` const (lines 69–79) — clean. ✓
- BUT: the children of `PillarArchitecture stage="hero6"` should be the checklist (per the component's docstring lines 32–33), and the slide could *pass* the checklist as a child. Currently the checklist is rendered OUTSIDE the pillar (separate column), and the pillar 6 itself only shows the pillar metadata in the right-margin sequence. **Architectural mismatch:** the design brief says pillar 6 *contains* the checklist and grows; the implementation shows pillar 6 in the margin alongside the checklist. **Severity: HIGH** (design-brief deviation that breaks the T6 hero promise).

**F. Motion.** Pillar 6 morph via `LayoutGroup` (1.2s), checklist scale-in (delay 0.4), criterion stagger (delay 0.7 + i × 0.06), verdict fade (delay 1.6). Total ≈ 2.4s. **No reduced-motion guard.**

**Cinematic proposal:** as each criterion check appears, the corresponding evidence-snippet should **highlight-flash** in coral for 200ms then settle to cream — micro-acknowledgment that each line is an answered question, not a passive bullet.

**G. Pattern conformity.** Uses `SlideFrame` ✓. `cs2-shared/PillarArchitecture` reused — but with semantically wrong layout (margin column should host the *non-hero* pillars, not the hero).

**H. Top 3 actionable enhancements:**

| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Move the `ChecklistCard` to be a CHILD of `<PillarArchitecture stage="hero6">{checklist}</PillarArchitecture>`, swap the column order so pillars 1–5 are on the right margin (per `cs2-design.md` beat 5), and let pillar 6 *contain* the checklist. Lines 47–66 + PillarArchitecture lines 137–144 (already supports `children`). | L | HIGH (design-brief deviation; T6 hero promise broken) |
| 2 | Define `--fs-slide-headline-sm` in `index.css` or replace with a real token (`var(--fs-slide-subhead)` × 1.4). Line 116. | S | MED (broken fallback chain) |
| 3 | Strip the duplicate verdict claim — either remove `"Each one passed."` from the subhead or remove the `"9 / 9 criteria met → ICH E5(R1)-classified ethnically insensitive."` footer. The headline already says "Nine of nine." | S | LOW (assertion duplication / 5-second test) |

---

### Slide 20 · `case2-pillars-1-5` — "CS2 pillars 1-5 · convergence · 84.6% ≈ 84.4%"

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/18-case2-fit.jsx`
**Slide job (1 sentence):** Role-reverse — pillars 1–5 hero in a horizontal chain at top; pillar 6 demotes to left margin; the 84.6% ≈ 84.4% typographic centerpiece dominates the lower half.

**A. Title / subtitle relationship.** Headline `"The clinical gap disappears on weight."` — assertion ✓ (assert that body weight, not ethnicity, was the dominant covariate). Subhead is one of the strongest in the batch — 119ch single-line carrying real evidence.

**B. Footer.** Standard. Tagline 4-citation (87 chars).

**C. Spacing, density, alignment.** `gridTemplateRows: 'auto 1fr'` (line 52) splits pillar chain (top, hardcoded `height: 200`) from the percent-hero + bridging panel (bottom). The hardcoded `height: 200` (line 59) is the third px-int height in the batch (slides 17, 19, 20). At tall viewports the chain is squat; at short viewports the chain forces the percent block down. **Severity: MED.**

The `ConcordanceHero` block uses `flex-wrap: wrap` (line 111) — at narrow widths the two PercentBlocks stack vertically and the `≈` symbol becomes orphaned. *Needs visual verification* but the wrap behavior is uncontrolled. **Severity: MED.**

`maxWidth: 240` on `PercentBlock` (line 152) — px int, not token.

**D. Token compliance.**
- Hardcoded `clamp` on line 117 (`'clamp(2.4rem, 4.8vw, 4.5rem)'`) for the `≈` symbol; line 156 (`'clamp(3rem, 6vw, 5.5rem)'`) for the percent values. Width-only clamps — same height-short bug.
- `tabular-nums` on PercentBlock (line 161) — **correct** ✓ (per §5 typography rule, this is the rare slide that gets tabular numerals right).
- `linear-gradient(180deg, ...)` not present on this slide — *good*.
- Pillar 4 in the chain says `"P4 · 5× AML/CCA gap → Δ 0.2pp"` (line 188) but the slide hero shows P4 = 84.6% AUC₀–24h. **Inconsistency:** `BridgingPanel`'s P4 row claims "5× AML/CCA gap → Δ 0.2pp," and the design brief assigns P4 to "No ethnic modifier on food or DDI" — **this is a content/labelling drift** vs. the design brief's beat-6 listing. *Needs verification against authoritative reading.* **Severity: MED.**
- `width: 24` on the pillar id badge (line 240), `padding: '4px 0'` (line 230), `padding: 'var(--space-4) var(--space-5)'` and `padding: 'var(--space-5) var(--space-4)'` — token use is mixed.

Unique font-sizes on slide: eyebrow, headline, subhead, kicker (Pillar 4 label), pillar id (mono), percent value (~5.5rem clamp), percent sub (mono pageno), `≈` (~4.5rem clamp), bridging caption (kicker), bridging row label (kicker), bridging row src (mono pageno), italic conclusion (kicker), tagline = **13 sizes**.

**E. Visual elements.**
- `PillarArchitecture stage="hero15"` — pillar 6 demoted to LEFT margin (line 187 `120px minmax(0, 1fr)`), pillars 1–5 in a horizontal chain with a connecting line (lines 205–217). The connector uses `linear-gradient(90deg, transparent, ${accent} 14%, ${accent} 86%, transparent)` — clean.
- `ConcordanceHero` — typographic centerpiece. The `84.6% ≈ 84.4%` framing per design brief is **the single most memorable data point in CS2** (per Lessons-Claude Part 2). The implementation: two `<PercentBlock>` flanking a 4.5rem `≈`. **Strong.** ✓
- `BridgingPanel` — 5 rows, each `[id, label, source]`. Looks good but introduces a **duplicate of the chain**: top has 5 pillar cards, bottom-right has 5 pillar rows. Two simultaneous representations of the same 5 pillars compete for attention. **Severity: HIGH.**

**F. Motion.** Chain pillars morph from slide 19 hero6 → hero15 (1.2s `LayoutGroup`). ConcordanceHero scale-in (delay 1.2). BridgingPanel slide-in (delay 1.6). PILLAR_ROWS stagger (delay 1.8 + i × 0.08). Italic conclusion (delay 2.6). Total ≈ 3.4s. **No reduced-motion guard.**

**Cinematic proposal:** the `≈` symbol should *crossfade* between three states as the audience reads — `=` (claim of identity) → `≈` (claim of approximate identity) → `≡` (claim of definitional equivalence). 800ms total, anchored to the "Δ ≈ 0.2 percentage points" line revealing. Currently the symbol is static.

**G. Pattern conformity.** Uses `SlideFrame` ✓. `cs2-shared/PillarArchitecture` reused. The local `BridgingPanel` (P1–P5 rows) duplicates information already in the chain — opportunity to consolidate.

**H. Top 3 actionable enhancements:**

| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Remove `BridgingPanel` (lines 192–293) entirely, OR convert it into per-pillar tooltips that appear when each chain card is hovered/focused. The 5 rows duplicate the 5 chain cards — pure redundancy. Lets the 84.6% ≈ 84.4% centerpiece breathe. Saves ~100 lines. | M | HIGH (focal-point dilution) |
| 2 | Verify Pillar 4 label consistency (line 188 `"5× AML/CCA gap → Δ 0.2pp"` vs. design-brief beat 6 `"No ethnic modifier on food or DDI"`). Either update the design brief or fix the bridging panel — *needs visual verification + content audit*. | S | MED (content drift) |
| 3 | Replace hardcoded `height: 200` (line 59) on the chain row with `minHeight: 'clamp(140px, 18vh, 220px)'` so the chain scales on tall vs. short viewports. | S | MED (responsive bug) |

---

### Slide 21 · `case2-response` — "CS2 response · regulatory timeline · 27 Mar SEC"

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/19-case2-decision.jsx`
**Slide job (1 sentence):** Show the 9-step regulatory timeline (MAA → Mar 27 SEC in-person → approval) with the climactic 27 Mar 2025 leadership beat as the hero callout.

**A. Title / subtitle relationship.** Headline `"A single in-person SEC presentation — 27 March 2025."` — assertion ✓. Subhead `"Twelve months of regulatory choreography. Three subject expert committee passes. One favorable recommendation."` — three-clause rhythm, parses well.

**B. Footer.** Standard. Tagline cites the 91-KB submission. ✓

**C. Spacing, density, alignment.** **HIGH-severity timeline overlap risk per the user's calibration note (Slide 02 timeline-caption-overlap pattern).** The timeline uses `gridTemplateColumns: repeat(9, 1fr)` (9 nodes!). Each node has an `<NodeCard>` positioned absolute with `width: '92%'` (line 207) at `top` or `bottom` of the dot at `calc(50% + 16px)`. With 9 columns, each column is ≈11.1% of the slide width. At 1920px the columns are ~213px wide — `width: '92%'` of column ≈ 196px — adequate. **At ≤1280px (typical Zoom share)** the columns are ~142px wide and the cards become ~131px wide for a 3-line label (date + label + detail). The detail line `"Single live presentation · 6 pillars · 9/9 ICH E5 criteria"` is ≈55 chars at `var(--fs-slide-pageno)` × 0.92 — at narrow widths, this overflows or wraps to 5+ lines, **colliding with the adjacent node's card** (above/below alternation only buys you 4 vertical slots, not 9). **Severity: HIGH — exact Slide-02 overlap pattern.**

The alternation `i % 2 === 0` (line 96) puts even-indexed nodes above and odd-indexed below — but **9 nodes** means the "leadership beat" at index 6 (above) and the adjacent climax at index 7 (below) and approval at index 8 (above) all carry the heaviest content (`flag: 'climax'` etc.) on the same horizontal band. Cards lengthen for the flagged steps. **HIGH overlap risk for the climax node specifically.**

The bottom leadership-beat callout (lines 100–153) duplicates the 27 Mar climax info from the timeline. Two callouts for the same data point — **focal point split.**

**D. Token compliance.**
- Hardcoded `clamp(2rem, 3.4vw, 3rem)` for the `27 / 03` display (line 120) — width-only clamp.
- Hardcoded `width: step.flag ? 18 : 12, height: step.flag ? 18 : 12` (lines 181–182) — px ints for dot dimensions.
- Hardcoded `var(--amber, #d8a634)` (line 161) — same misleading-fallback pattern.
- `linear-gradient(135deg, color-mix(...))` on leadership-beat card (line 110) — gradient.
- `linear-gradient(90deg, var(--cyan), var(--coral))` on the spine (line 90) — gradient on a structural element. The cyan-to-coral gradient maps the timeline's emotional arc (procedural → crisis), which is *actually meaningful* — gradient earns its keep here. ✓
- `border: '2px solid var(--cream)'` for climax dot border (line 186) — fine.
- `boxShadow: 0 0 0 4px color-mix(in srgb, ${tone} 28%, transparent)` for flagged dots (line 185) — shadow gloss; could be argued as decorative.

Unique font-sizes: eyebrow, headline, subhead, kicker, leadership date (3rem clamp), leadership label kicker, leadership body, node date (mono pageno), node label (kicker), node detail (mono pageno × 0.92), tagline = **11 sizes**.

**E. Visual elements.**
- 9-step timeline data in `STEPS` const (lines 44–54) — clean separation of data and view. ✓
- `<TimelineNode>` + `<NodeCard>` — well-componentized, alternates above/below.
- The leadership beat callout — `27 / 03` display + 3-clause body. **Information-dense (≈220 chars in the body).** Per §4 density table this slide alone has ~50+ words across timeline cards + 220 in the callout = ~70+ words. Over the §4 ≤30 ideal but close to the ≤30 hard ceiling. **Severity: MED.**
- **Equal-spaced timeline nodes** per Lessons-Claude Tell #8: "MAA was March 2024 and approval was May 2025 with five nodes in between, the nodes aren't equally spaced in real time." Look at the dates: `27 Mar 2024 → 23 May 2024 → 23 Aug 2024 → 10 Dec 2024 → Dec–Jan → 14 Jan 2025 → 27 Mar 2025 → 4 Apr 2025 → 14 May 2025` — the last 4 nodes span ~5 months while the first 5 span ~9 months, BUT they're rendered with **equal column widths**. The audience reads as if "Dec → Jan → 14 Jan → 27 Mar → 4 Apr → 14 May" took as long as "MAA → 1st SEC → EO → 2nd SEC." **HIGH — Tell #8 violation, falsifies temporal proportion.**

**F. Motion.** Spine scale-x (delay 0.4, 1.2s). Each TimelineNode dot scale-in (delay 0.6 + i × 0.12). NodeCard fade+rise (delay 0.6 + i × 0.12 + 0.2). Leadership beat fade+rise (delay 1.6 + 9 × 0.08 = 2.32). Total reveal ≈ 2.9s. **No reduced-motion guard.**

**Cinematic proposal:** the timeline spine should **draw left-to-right at the same pace as the dot stagger** — currently the spine fills in 1.2s independent of the 9 × 0.12s = 1.08s dot stagger. Sync them so the spine "carries the eye" past each dot as it appears. Then for the climax node (index 6, `27 Mar 2025`), pause for 400ms before the next dot appears — let the audience register the leadership beat *in time* before the line moves on.

**G. Pattern conformity.** Uses `SlideFrame` ✓. No `cs2-shared/` components — this is a stationary slide with no morphs (per the design brief's note "no shared cinematic anchors enter or exit here"). However, the `TimelineNode` pattern would be reusable across CS3 (FDA engagement timeline) — opportunity to extract.

**H. Top 3 actionable enhancements:**

| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Replace `gridTemplateColumns: repeat(9, 1fr)` (line 73) with **proportional spacing**: compute `flex` weights from `dayDelta(step.date, prevStep.date)` so the timeline is temporally honest. Cluster the Dec–Jan → Jan 14 → Mar 27 nodes appropriately. Lines 73, 95–97. (Per Lessons-Claude Tell #8.) | L | HIGH (temporal misrepresentation) |
| 2 | Truncate `step.detail` to ≤30 chars per node card AND show the full detail only for the climax/turn flagged nodes — fixes the narrow-width card overlap. Lines 50–53 of `STEPS` data. | M | HIGH (Slide-02 overlap pattern) |
| 3 | Remove the duplicate leadership-beat callout body (lines 100–153) OR remove the climax detail from the timeline node — one or the other, not both. The headline already says "27 March 2025." | M | MED (focal-point dilution) |

---

### Slide 22 · `case2-impact-bridge` — "CS2 impact + bridge · approval · launch · → CS3"

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/22-case2-bridge.jsx`
**Slide job (1 sentence):** Close the case — SEC objection returns RESOLVED, India fills coral, three hero tiles, bridge to CS3.

**A. Title / subtitle relationship.** Headline `"The objection resolved. India filled in."` — assertion ✓. Two-clause structure mirrors the slide-15 opening ("Tibsovo · India's Waiver Pathway"), bookending the case (per Lessons-Claude part 5: "opening slide and closing slide bookend the same thing — empty → filled"). ✓

**B. Footer.** Standard. Tagline cites CDSCO MAA + Servier launch + PSUR.

**C. Spacing, density, alignment.** Three rows: SEC card (`auto`) → middle (3 hero tiles + India, `1fr`) → bridge (`auto`). The middle row uses `gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)'` (line 63) — left column gets 3 stat tiles, right column gets `IndiaMap`.

**Each HeroTile** (lines 78–80) gets ~33% of the 1.4fr column. With three tiles and `--space-4` (16px) gaps, at 1920px each tile is ≈360px; at 1280px each is ≈215px. Tile body text "1,281 trial subjects · 15,867 patients global · zero new signal" is ≈55 chars at `var(--fs-slide-pageno)` — at 215px wide, 4-line wrap. Adequate but tight. **Severity: LOW–MED.**

The `BridgeScaffold` (lines 186–238) is a 3-column row: kicker | strong-text body | "Next · Asparlas" arrow. The middle column carries 4 strong-emphasis phrases joined by " · " — at narrow viewports this will wrap, possibly stranding the violet "Next · Asparlas" arrow on its own line. **Severity: MED.**

The `SecObjectionCard variant="resolved"` at the top — currently `variant="resolved"` renders the SHORT_QUOTE (line 84 of `SecObjectionCard.jsx`) AND a rotated coral RESOLVED stamp at `right: 18px`, with `transform: rotate(-8deg)`. The stamp is positioned absolutely **outside the card's safe area** at narrow widths — could clip the right edge or collide with the adjacent stat tiles. **Severity: MED.**

**D. Token compliance.**
- `var(--violet, #c8a8ff)` (lines 230, 235) — same misleading-fallback pattern. `:root --violet: #A78BFA` resolves first; `#c8a8ff` is dead.
- `linear-gradient(180deg, color-mix(...))` on HeroTile (line 140) — gradient.
- `clamp(2.4rem, 4.4vw, 3.6rem)` (line 148) for tile date — width-only clamp.
- `border: '1.5px solid ${color}', borderLeft: '4px solid ${color}'` (lines 135–136) — accent stripe doubled.
- `tabular-nums` on tile date (line 153) ✓.
- `padding: 'var(--space-4)'`, `padding: 'var(--space-3) var(--space-5)'` — tokens used.

The stat `"0"` on tile 3 (line 80) — `tone="cream"`, `muted` — but it's the most surprising number on the slide ("zero new safety signals across 8 yr / 15,867 patients") and gets the *least* visual weight. **Severity: LOW** — content/design priority mismatch.

Unique font-sizes: eyebrow, headline, subhead, kicker, RESOLVED stamp (11px hardcoded in `SecObjectionCard.jsx` line 119), date stamp on objection card, blockquote (variant resolved → `--fs-slide-body`), tile date (3.6rem clamp), tile sub (mono pageno), tile body (mono pageno), India approved label (mono pageno), bridge kicker, bridge body (kicker), bridge "Next" tagline (tagline) = **14 sizes**.

**E. Visual elements.**
- `SecObjectionCard variant="resolved"` — T7 destination ✓. Strikethrough + RESOLVED stamp double-encodes the resolution. ✓
- `IndiaMap variant="filled"` with `fillIntensity={1}` — T8 destination ✓. Coral fills mainland over 1.6s (line 170 of IndiaMap.jsx).
- `HeroTile` × 3 — clean stat-card pattern. The tile-3 muted treatment for "0" (line 80) feels backwards (see token-compliance note).
- `BridgeScaffold` — kicker + 4 themes joined by " · " + violet arrow to CS3.
- **No PillarArchitecture on slide 22** — the architecture vanishes. Per design intent ("Case 02's cinematic signature is the pillar architecture assembling and repositioning across five slides"), the closing slide should re-acknowledge it. A 6-dot signature in the bridge row would close the loop. **Severity: MED — narrative continuity gap.**
- **No WorldMapShared on slide 22** — the world map's `layoutId="cs2-world-map"` could morph from slide 16's full-context backdrop to a tiny corner badge here, with India *now coral* in the global context. Currently the world-map layoutId dies at slide 16. **MED — wasted layoutId.**

**F. Motion.** SecObjectionCard morphs from slide 17 hero (1.4s `LayoutGroup`). RESOLVED stamp scale-in with overshoot (delay 1.6). HeroTile staggered (delay 0.5, 0.8, 1.1). IndiaMap fade (delay 0.3) + India label (delay 1.4). BridgeScaffold (delay 1.8). Total ≈ 3s. **No reduced-motion guard.**

**Cinematic proposal — the batch-wide CS2 continuity move:** the **`SecObjectionCard` should shrink from full-canvas hero (slide 17) → into a corner badge here on slide 22**, the way the user's prompt describes. Currently the card on slide 22 is full-width (renders large), not a corner badge. The visual signature of "the objection that loomed over half the case is now a small resolved stamp in the corner" would be the deck's most powerful single moment. **HIGH-impact cinematic upgrade.**

**G. Pattern conformity.** Uses `SlideFrame` ✓. `cs2-shared/SecObjectionCard` reused ✓. `IndiaMap` reused ✓ (though it lives outside `cs2-shared/`).

**H. Top 3 actionable enhancements:**

| # | Enhancement | Effort | Severity addressed |
|---|---|---|---|
| 1 | Add `variant="badge"` to `SecObjectionCard` and use it on slide 22 — top-right corner placement, ≈200×80px, the QUOTE collapsed to just `"PK/PD study in Indian patients."` Carries the `layoutId="cs2-sec-objection"` morph from slide 17's hero → here as a *small resolved stamp*. The morph distance becomes the visual statement. Lines 21–131 of `SecObjectionCard.jsx` + lines 56–57 of `22-case2-bridge.jsx`. | M | HIGH (highest-impact cinematic + closes T7) |
| 2 | Add a `<PillarArchitecture stage="signature" />` row in `BridgeScaffold` — 6 cyan dots in a row (no labels, no tags) just to *acknowledge* the architecture. Carries the T6 layoutId one final beat. New stage in `PillarArchitecture.jsx` + insert in line 199. | M | MED (continuity — close T6) |
| 3 | Promote tile 3 ("0 new safety signals") to NOT-muted treatment — coral or cyan border, full opacity. The "zero new safety signals across 8 years / 15,867 patients" is the most defensible single number on the slide and currently gets the weakest visual weight. Line 80. | S | MED (focal weight inverted) |

---

## Cross-cutting recommendations from this batch

1. **Resolve the `var(--TOKEN, #fallbackHex)` pattern across the batch.** Three tokens use this misleading-fallback shape: `var(--amber, #d8a634)`, `var(--violet, #c8a8ff)`, `var(--fs-slide-headline-sm, 1.55rem)`. The fallback never fires in two cases (the var exists in `:root`) and the third var doesn't exist (so the fallback always fires). Pick one: either retune the `:root` token to match the fallback intent (e.g., `--amber: #d8a634` for darker burnt-gold), OR remove the fallbacks (they're false documentation), OR define the missing token. Estimated ≥10 occurrences across the batch.

2. **The `cs2-shared/` folder is half-honest.** True shared components: `BoneMarrowShared` (×2 slides), `PillarArchitecture` (×4 slides), `SecObjectionCard` (×2 slides). Single-use: `WorldMapShared` (×1). Dead: `cs2-challenge/AsymmetryDiagram`, `cs2-fit/PdDotStrip`, `cs2-fit/RatioTrack` — three legacy files imported nowhere. **Action:** delete the three dead files, move `IndiaMap` from `components/deck/illustrations/` into `cs2-shared/` (it's used only by CS2 slides), and treat `WorldMapShared` as either *actually shared* (introduce it on slide 22) or relocated as a CS2 background-only helper.

3. **Add `prefers-reduced-motion` guards across all 8 slides.** No slide in the batch has a reduced-motion fallback. Per `Slide-Design-Brief` §9 hard rule and §12 motion-audit checklist. The CSS only ships a `.deck-motion-safe` class (`index.css` lines 527–529) but no slide opts in. Wrap each `transition` and `animate` prop with a hook that returns `{ duration: 0 }` when `prefers-reduced-motion: reduce`. This is the single highest-leverage a11y / WCAG-compliance fix.

4. **Eliminate gradient density.** Five surfaces in the batch use `linear-gradient(...)`: slide 17 ReframeCard, slide 19 ChecklistCard, slide 21 leadership beat, slide 22 HeroTile, slide 21 timeline spine. Per Lessons-Claude Tell #5, "Add one gradient per case study maximum." Keep the slide-21 spine gradient (it's semantic — emotional arc). Drop the four card-fill gradients (replace with flat `color-mix` washes that don't suggest light).

5. **Use the fluid type tokens, not local `clamp(...)` literals.** ≥8 occurrences of `'clamp(min, vw, max)'` literals across the batch — every one only responds to viewport width. The deck's `--fs-slide-*` tokens use `clamp(min, min(vw, vh), max)` for short-viewport safety. Local literals re-introduce the "title huge, viz tiny" mobile-landscape bug that `index.css` lines 239–248 explicitly exist to prevent. Add 3 more tokens for the missing scales (`--fs-stat-hero` for the percent/date displays, `--fs-stat-headline` for the smaller hero numbers, `--fs-display-mono` for the `27 / 03`-style mono displays) and replace the literals.

6. **Three CS2-arc continuity moves to consider as a coherent cinematic upgrade:**
   - **T9 (NEW) — the SEC card shrinks** from slide 17 hero → slide 22 corner badge. (See slide-22 enhancement #1.)
   - **T6 closure** — pillar architecture re-appears on slide 22 as a 6-dot signature. (See slide-22 enhancement #2.)
   - **T5 spine** — restore the broken India morph through slide 16 by replacing the WorldMap's `.IND` selector with an overlaid `<IndiaMap variant="empty">` carrying the shared `layoutId`. (See slide-16 enhancement #3.)

   Together, these three changes turn the CS2 arc from "8 slides with shared assets" into "8 slides with a continuous cinematic spine." The investment is ~6 hours of editing across `SecObjectionCard.jsx`, `PillarArchitecture.jsx`, `16-case2-background.jsx`, `22-case2-bridge.jsx` — and would deliver on the design brief's promise that "Case 02's cinematic signature is the pillar architecture assembling and repositioning across five slides."

7. **Slide 21 timeline is the highest-risk single element in the batch.** The 9-node equal-spacing pattern violates Lessons-Claude Tell #8 (temporal honesty), risks the Slide-02 overlap pattern at narrow widths, AND duplicates the climax content in two callouts. This slide deserves a dedicated rebuild before anything else in the CS2 arc.
