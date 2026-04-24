# qp2-seminar slide review — Batch 5 (slides 30–35 · closing arc)

**Reviewer:** Claude (slide-review subagent · batch 5)
**Date:** 2026-04-24
**Scope:** Closing arc — divider, breadth, record at scale, leadership principles, in-closing, thank-you
**Method:** static source review against zaj-slides rubric (Slide-Design-Brief §10/§12, Deck-Design-Lessons-Claude-Perspective Tells #1–#10, High-Stakes-Presentation-Playbook §2/§5). No browser, no rendering — flagged items needing pixel-level verification are tagged `[needs visual verification]`.

---

## Batch summary

- **HIGH-severity findings across batch:** 9
- **Slides with title/subtitle overlap or pinch issues:** 30 (left type column ↔ constellation), 34 (author bloc ↔ Footer), 35 (eyebrow ↔ centered title at low viewport heights)
- **Slides bypassing SlideGrid/SlideParts:** 30 (justified — divider), 35 (justified — closer); both bypass `<Footer>` and re-implement chrome.
- **Footer convention drift in closing arc:** 30 (custom meta + custom source line, no `<Footer>`), 35 (no `<Footer>`, uses bespoke "End · 35 / 35" top-right marker). Slides 31–34 use `<Footer>` consistently.
- **Cross-batch patterns (3+ slides share an issue):**
  1. **`>3 unique font sizes per slide`** — 30, 31, 32, 33, 34, 35 all use 5–8 distinct hardcoded `clamp()` font-sizes inside Viz children. Violates Brief §4.
  2. **All five accent tokens (amber/cyan/sage/violet/coral) live on the same slide** — 30 (constellation), 31 (6 cards + bg), 32 (7 tiles), 33 (6 cards). Justified for the divider only; on content slides this breaches the ≤3-with-meaning rule (Brief §6) and erodes the case-color discipline established in slides 10/14/23.
  3. **Tile/card "stat-card-on-everything" treatment** — 31 (6 domain cards + 5 stat tiles), 32 (7 numeric tiles + ribbon), 33 (3 principles + 3 research), 34 (3 takeaway cards). Tell #4 from Deck-Design-Lessons (stat-card formatting on non-stat content). Cards-as-default has saturated the closing arc.
  4. **Icon-per-tile** — 31 (Star/Beaker badges), 33 (Compass/Layers/Users + Bot/Activity/Wrench, six icons), 35 (Globe/Linkedin). Tell #3 (icon-per-item disease).
- **Callback opportunities — closing slides that should reference earlier motifs:**
  - **30 → 04 (framework themes).** The `ThemesConstellation` is the third shared element in the deck. It should `layoutId` from the slide-04 framework chip set (if those chips exist) into the constellation, not just from 30 → 31. [needs visual verification — check `04-framework-themes.jsx`]
  - **34 ← three case-color chips.** The three takeaway cards on slide 34 use cyan/amber/coral but the original case markers are coral (CS1) / cyan (CS2) / violet (CS3). The takeaway color assignments could `layoutId`-morph from the closing case-bridge chips (29) into the three takeaway numerals. Currently they don't.
  - **35 ← `ThemesConstellation`.** Slide 35 *re-implements* the pentagon inline (lines 56–101) instead of importing `ThemesConstellation` with a "watermark" variant. The visual through-line works but the layoutId chain breaks at slide 34→35. **HIGH** — code duplication + missed cinematic continuity.

---

## Per-slide reviews

---

### Slide 30 · `closing-divider` — Act IV · Beyond the three cases

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/30-closing-divider.jsx` (+ `slides/closing-divider/ThemesConstellation.jsx`)
**Slide job (1 sentence):** Chapter break — close the case-study triplet, light all five themes simultaneously, signal "depth → scope".

**A. Title / subtitle relationship.** Assertion-shaped (`Beyond the three cases.`) — qualifies as an intentional divider phrase, not a topic label. Subtitle (`From depth → scope.`) is also strong. Vertical rhythm uses `vh`-based offsets (`top: 18vh` on type column, `marginBottom: 3vh / 2.5vh / 2vh / 4vh`) which compounds at short viewports — on a 720-tall window the gaps collapse and `tagline` (line 149) can pinch into the meta footer (`bottom: 8vh`, line 196). [needs visual verification at 1280×720] **[MED]**

**B. Footer.** **No `<Footer>` component.** Two custom rails: a meta strip (lines 192–225) and a source line (lines 227–264). The convention is justified for a divider but the slide is showing TWO end markers — top-right `Act IV · IV of IV · From depth → scope` (lines 52–64) and bottom-right `IV / IV` (lines 254–263) — same fact rendered twice within the same frame. Tell #10 (the helpful footer) compounded with redundancy. **[HIGH]**

**C. Spacing, density, alignment.** Type column is positioned absolutely at `width: clamp(620px, 58%, 1100px)` (line 72) and constellation panel at `width: clamp(320px, 34%, 620px)` with `right: clamp(2rem, 5vw, 7rem)` (lines 173–175). At narrow viewports (~1280px) the type column right edge (`24+1100px` cap → effectively 58% ≈ 740px) and constellation left edge (`1280 − 7rem − 620 = ~548px`) **overlap by ~200px**. The 60px safe margin from Brief §8 is not respected on the right side of the type column. **[HIGH]** (lines 67–75 & 169–190)

**D. Token compliance.** Hardcoded values in this single file:
- `fontSize: '0.7rem'` (line 55), `'0.65rem'` (line 257) — not from `--fs-slide-*`
- `fontSize: 'clamp(0.8rem, 1vw, 1.1rem)'` (line 80) — kicker
- `fontSize: 'clamp(3.2rem, 7.5vw, 9rem)'` (line 97) — title
- `fontSize: 'clamp(1.3rem, 2.4vw, 2.8rem)'` (line 133) — subtitle
- `fontSize: 'clamp(0.95rem, 1.3vw, 1.4rem)'` (line 152) — tagline
- `fontSize: 'clamp(0.6rem, 0.78vw, 0.85rem)'` (line 201) — meta
- `fontSize: 'clamp(0.7rem, 0.85vw, 0.9rem)'` (line 247) — source
- `letterSpacing: '0.22em'` (line 202) — should be `var(--ls-mono-wide)` (which is `0.26em`); this is a one-off
- `height: 3` raw (line 118), `paddingTop: '14px'` (line 199), `margin: '0 14px'` (line 270)
- Title color is `var(--amber)` (line 110, 119) directly rather than `var(--case)`, even though `data-case="amber"` is set (line 43). Inconsistent with the case-token pattern used in slides 10/14/23.

**Unique font-size count: 7.** Brief §4 limit: ≤3. **[HIGH]**

**E. Visual elements.** `ThemesConstellation` (hero variant) is a five-node K5 graph with halos, glyphs, and node labels. Quality is high — overshoot easings, staged reveal, real geometry (regular pentagon, not eyeballed). Two issues:
1. The outer label positioning (`ThemesConstellation.jsx` lines 224–245) computes `Math.sign(v.x − CENTER) * 36` for label offset. This works at four of five vertices, but the apex node (top, `Math.abs(v.x − CENTER) < 8` is true) gets `y` offset `−34` only — its label pushes UP 34px. With node `r=42` halo + 22pt glyph + 15pt label, the apex label sits in the top of the SVG viewBox. With `overflow: visible` on the SVG (line 103), the label can render *above* the constellation container's top edge → potential collision with the Act-IV chrome at `top: 6vh`. [needs visual verification]
2. `mixBlendMode` is **not** used here on the hero — good. The shared-layoutId morph to slide 31 will animate halo/disc/label sizes via `layout` on the outer `motion.div` (line 86–88), but the inner SVG circles are NOT inside `motion.div` and won't morph individually — so the morph is a uniform scale, not an element-by-element re-layout. Acceptable.

**F. Motion / cinematic transitions.** Eight discrete delays cascade from `D.chrome=0.10` to `D.meta=2.10` (lines 30–39) — 2 seconds of staggered entrance. Constellation interior animates further to ~3.4s (`nodeDelay = delay + 0.6 + 4*0.14 + 0.25 = ~1.55s` on top of `D.constellation=0.40` = ~1.95s). No `prefers-reduced-motion` guard anywhere in this file. **[MED]**

Proposed enhancement: the constellation's five colored discs should `layoutId`-morph from the five framework-theme chips on **slide 04** (if they're present as discrete elements). This earns the constellation's "all five themes are now lit" frame as a literal callback, not just a thematic one.

**G. Pattern conformity.** Bypasses `SlideGrid` entirely (justified — divider, mirrors `CaseHeroDivider` pattern per slide-30 doc-block lines 14–19). Bypass is justified but introduces the footer drift (B) and the absolute-positioning collision risk (C).

**H. Top 3 actionable enhancements.**

| # | Enhancement | Effort (S/M/L) | Severity addressed |
|---|---|---|---|
| 1 | **Remove duplicate "IV / IV" rail.** Delete lines 192–225 (meta footer) OR lines 227–264 (source line). One end-marker, not two. The meta strip's "5 of 5" theme count is the more interesting fact; keep it, drop the source line's `IV / IV` (line 262). Saves 30 lines + cleans Tell #10. | S | HIGH (B) + Tell #10 |
| 2 | **Constrain type column at ≥1280px to prevent right-edge collision with constellation.** Replace `width: clamp(620px, 58%, 1100px)` (line 72) with `width: clamp(620px, 50%, 900px)` and pull the constellation's `right` smaller. Better: refactor to a `SlideGrid` with two named areas (`type` left 7-col, `viz` right 5-col) and let the grid prevent overlap structurally — that's exactly the bug the SlideGrid primitive exists to prevent. | M | HIGH (C) |
| 3 | **Wire the constellation's layoutId backwards to slide 04's theme chips, not just forward to slide 31.** This makes the divider land as the literal payoff of the framework promise from minute 1 — currently the layoutId only carries forward. Add five small `motion.div` source elements on slide 04 with matching `layoutId="theme-chip-{token}"`, and consume them as the disc fills in `ThemesConstellation`. | M | F (motion enhancement) + cinematic continuity |

---

### Slide 31 · `breadth-therapeutic-areas` — Pharmacometric leadership across six clinical domains

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/31-breadth-therapeutic-areas.jsx`
**Slide job:** Defuse the implicit "is this the only thing he can do?" question with a 6-card domain grid + 5-tile receipt.

**A. Title / subtitle relationship.** Assertion-shaped (`Pharmacometric leadership across six clinical domains.`). Subhead (line 122–125) reads as a topic enumeration ("rare disease, oncology, cardiometabolic, antiviral, regulatory, and AI/ML") — that's six items the eye then has to find again in the grid below. **Density of repetition: the same six labels are stated three times — eyebrow, subhead, and grid.** Cut the subhead's enumeration; let the grid speak. **[MED]**

**B. Footer.** Present, uses `<Footer>` ✓ (line 212–216). Kicker `Closing · 31 of 35` — drops the deck's earlier kicker pattern (`30 · CLOSING DIVIDER` on case slides). **Footer convention drift from `NN · LABEL` to `Section · NN of TOTAL`** — verify against slides 1–29 to confirm the closing arc's preferred pattern.

**C. Spacing, density, alignment.** Six cards (3×2) + five-tile stat strip + watermark constellation = three competing visual zones inside `Viz`. The `gridTemplateRows: '1fr auto'` (line 134) plus `var(--space-5)` row gap is fine in theory, but the cards have internal `gridTemplateRows: 'auto auto 1fr auto'` (line 240) with four content rows each, then a stat strip with five tiles. **At 1080-tall the cards compress to ~280px each — borderline for 4 stacked rows.** The badge ribbons (`position: absolute; top: 10; right: 10`, lines 250–273) collide with the domain label at `marginRight: isFlagship || isActive ? 100 : 0` (line 284) — a hardcoded 100px gutter to make room for the badge. Brittle. **[MED]**

The constellation backdrop (`position: 'absolute', top: '46%', right: '-8%'`, lines 145–156) sits behind the grid with `mixBlendMode: 'screen'` and `opacity: 0.30`. `right: -8%` deliberately bleeds off-canvas. Combined with the cards' `background: 'color-mix(in srgb, var(--panel) 65%, transparent)'`, the constellation will show through the right column of cards at varying intensities depending on which token the constellation node sits behind. **[needs visual verification]** At 1100px the watermark hides via the embedded media-query (lines 162–166) — good defensive coding.

**D. Token compliance.** Many hardcoded font-sizes:
- Card `fontSize: 'clamp(0.92rem, 1.05vw, 1.10rem)'` (line 293)
- Card detail `clamp(0.78rem, 0.88vw, 0.92rem)` (line 306)
- Badge `0.62rem` (line 265)
- Domain label `0.68rem` (line 280)
- Cite chip `0.64rem` (line 318)
- Stat numeral `clamp(1.6rem, 2.2vw, 2.5rem)` (line 350)
- Stat label `0.66rem` (line 362)

**Unique font-size count: 7.** Brief §4 limit: ≤3. **[HIGH]**

Hardcoded radii: `borderRadius: 4` (line 259) — should be `var(--radius-sm)`.

**Token color usage — semantic conflict.** `cyan` is assigned to BOTH `cardiometabolic` (line 34) AND `global-regulatory` (line 70). Cyan is the deck-wide token for **CS2 / Tibsovo / Theme 02 dose precision** — assigning it to cardiometabolic-DGAT1 dilutes the case-color discipline established in slides 14–22. Reassign cardiometabolic to `sage` or invent a sixth domain token. **[HIGH]**

Five accent tokens active on a content slide (amber, coral, cyan, sage, violet — all five). Brief §6 limit: ≤3 with assigned meaning.

**E. Visual elements.** `DomainCard` x6 + `StatTile` x5 + constellation watermark + footer. Eleven primary elements + chrome. Tell #2 (decorative consistency) — every card has the same border + cite chip + dashed top divider. The two `flagship` cards and one `active` card should structurally diverge more than just an icon-badge. **[MED]**

The `Star` and `Beaker` icons (line 271) are the only icons on the slide — Tell #3 (icon-per-item) in miniature. Replace with a typographic distinction (e.g., title bolded for flagship, italicized for active) and remove Lucide entirely from this slide. **[LOW–MED]**

**F. Motion.** Eight cards × 0.10s stagger (line 184) + five tiles × 0.07s stagger after `D.stats=2.20` → last tile fires at ~2.48s. Total motion budget approaching 3 seconds. No `prefers-reduced-motion` guard. **[MED]**

Proposed enhancement: morph the **6-card grid → 7 numeric tiles on slide 32** via `layoutId="domain-{token}"` so each card on 31 has a counterpart numeral on 32. The breadth → record beat becomes a literal "translate the cards into a count." This is the single highest-impact enhancement available in the closing arc. **(F)**

**G. Pattern conformity.** Uses `SlideGrid` + `STANDARD_AREAS` ✓; uses `Eyebrow`/`Headline`/`Subhead`/`Viz`/`Footer` ✓.

**H. Top 3 actionable enhancements.**

| # | Enhancement | Effort (S/M/L) | Severity addressed |
|---|---|---|---|
| 1 | **Reassign Cardiometabolic away from `cyan`.** Change `token: 'cyan'` (line 34) to `token: 'sage'` and reassign Antiviral to a non-conflicting token (or accept that sage now means two things, which is also a violation — better: decouple breadth tokens from case tokens entirely with a neutral palette like `--cream-faint` borders for non-flagship cards, and only keep the three case-color borders). | S | HIGH (D) — semantic color conflict |
| 2 | **Cut the subhead enumeration; trust the grid.** Replace lines 122–125 with a real assertion subhead like "Each domain anchored to a published artifact or a named program." Removes the triple-naming of the six categories and reclaims the headline-subhead vertical real estate for a real claim. | S | A (subhead density) |
| 3 | **Add `layoutId` chips on each card that morph into slide 32's numeral tiles.** Wrap each card body in a `motion.div layoutId="closing-card-{key}"` and consume with matching id on `RecordTile`. Constellation backdrop stays on layoutId="themes-constellation" (already present). The 31→32 jump becomes "the cards convert to receipts," which is the slide-pair's semantic job. | M | F (motion) + cross-slide narrative |

---

### Slide 32 · `record-at-scale` — Twelve years · the record at scale

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/32-record-at-scale.jsx`
**Slide job:** Convert the breadth slide's "depth + scope" into a single quantitative receipt — the credibility number.

**A. Title / subtitle relationship.** Title is `Twelve years. The record at scale.` (lines 106–111). **The number "12" appears in the title and NOWHERE in the seven-tile grid.** Tile values are 6, 8, 6, 4, 20+, 3, AU2023213173A1 (lines 27–84). The slide's headline number is unanchored — the audience hears "twelve years" and the eye searches for it on the slide and doesn't find it. The brief calls this out as the worst possible slide failure mode (§3 — 5-second test fails because the focal point doesn't exist). **[HIGH]**

The user's calibration note for this batch named this slide explicitly: *"the 'twelve years' credibility number — single focal point essential."* The current design has seven competing focal points and the headline number is rhetorical-only.

**B. Footer.** Present via `<Footer>` ✓ (line 200). Same kicker drift as slide 31 (`Closing · 32 of 35`).

**C. Spacing, density, alignment.** Seven `RecordTile`s in a 4-3 grid (line 132 `repeat(4, 1fr)` + special-case `:nth-child(7) { grid-column: 2 / span 2 }` at line 184–187). The 7th tile spans cols 2–3 to feel centered — but it spans **two columns** and stretches its content, while the other six tiles are single-col. The 7th tile is also the patent ID (`AU2023213173A1`) which uses `font-mono` at `clamp(1.05rem, 1.4vw, 1.4rem)` (line 249) — visually MUCH SMALLER than the other big numerals at `clamp(2.2rem, 3.6vw, 4rem)` (line 262). Half the size of the other tiles, span twice as wide → reads as "the patent is less important," opposite of the intended hierarchy. **[HIGH]**

Bottom payoff ribbon (lines 151–178) sits below the grid with `borderTop` + `borderBottom` hairlines + `var(--panel) 35%` background. Hardcoded `padding: 'var(--space-4) var(--space-5)'` ✓ tokenized. Ribbon copy `Breadth that maps to every part of the mission — and a methodology record that extends beyond it.` echoes the slide-31 stat-strip headline. Redundant. **[MED]**

**D. Token compliance.** Many hardcoded font-sizes:
- Numeral `clamp(2.2rem, 3.6vw, 4rem)` (line 262)
- Suffix `clamp(1.4rem, 2.4vw, 2.6rem)` (line 269)
- Patent static `clamp(1.05rem, 1.4vw, 1.4rem)` (line 249)
- Label `0.68rem` (line 286)
- Detail `clamp(0.74rem, 0.84vw, 0.88rem)` (line 297)
- Ribbon body `clamp(0.95rem, 1.15vw, 1.20rem)` (line 166)

**Unique font-size count: 6.**

Token colors: `tile.token` ranges across amber (×2), cyan, sage, coral, violet, **cream**. Token "cream" is the primary ink — using it as a colored-border accent for a single tile (the patent) is unusual and reads as "no accent assigned." **[MED]**

`cross-batch issue:` Slide 31 stat strip says **"6 Domains"**, slide 32 first tile says **"6 Domains of impact"**, slide 34 takeaway 2 says **"Seven therapeutic areas"**. Three different counts in three slides. **[HIGH — factual inconsistency]** Pick one: 6 domains or 7 TAs.

**E. Visual elements.** Seven tiles + ribbon + footer = nine elements. Far above the 5-second test threshold. The numerals are heterogeneous in unit (count vs +-suffix vs patent ID) — the doc-block (lines 14–25) explicitly defends this as "editorial typography, not a dashboard." Defensible choice for an editorial register, but at the closing-arc moment where the speaker says "twelve years," a single hero numeral would land harder. Consider replacing the 4-3 grid with **one giant "12" numeral on the left** and the seven supporting tiles as a vertical strip on the right at smaller scale.

**F. Motion / cinematic transitions.** `CountUpDigit` per tile (lines 315–333) — animated number rollup from 0. Lifted from slide 13 ✓ (deliberate cadence echo per doc-block). Total stagger: 7 tiles × 0.10s + count-up 0.9s + ribbon at `D.ribbon=3.10` → ~4 seconds before the slide is fully resolved. No `prefers-reduced-motion` guard around the `useEffect` calling `animate(...)` (line 320). **[HIGH]** A user with reduced-motion preference will see the numbers rolling regardless.

Proposed enhancement: The slide should re-introduce the **"12 years"** as a literal hero numeral. Add a fat left rail with a count-up to 12 + the unit "years," then the 4-3 grid becomes the supporting receipts at half scale. The cinematic call: have the "12" `layoutId`-morph from the slide-30 amber hairline into a vertical scale.

**G. Pattern conformity.** Uses `SlideGrid` + `STANDARD_AREAS` ✓. The `<style>` injection inside `Viz` (lines 183–196) for `:nth-child(7)` is non-standard but contained.

**H. Top 3 actionable enhancements.**

| # | Enhancement | Effort (S/M/L) | Severity addressed |
|---|---|---|---|
| 1 | **Add a literal "12 years" numeral so the title's claim is anchored.** Replace the 4-col grid with a 2-col layout: left = giant `12` + `YEARS` label (single hero), right = a 7-row stack of the existing tiles at ~60% scale. Earns the headline. | M | HIGH (A + slide job) |
| 2 | **Resolve the 6-domains-vs-7-TAs inconsistency across slides 31, 32, 34.** Pick one number, propagate. Update `STAT_TILES` (line 92) and slide 34 takeaway 02 (line 38). Decide on 6 (matches the 6 cards on slide 31) or 7 (collapse oncology+regulatory into separate buckets). | S | HIGH (factual cross-slide drift) |
| 3 | **Add `prefers-reduced-motion` guard in `CountUpDigit`.** Wrap `animate(count, target, ...)` (line 320) to skip animation and set `count.set(target)` if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. Brief §10 hard-rule. | S | F (HIGH — accessibility) |

---

### Slide 33 · `leadership-principles` — Three principles for leading quantitative pharmacology

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/33-leadership-principles.jsx`
**Slide job:** Translate the three case studies into a forward-looking operating posture; bridge to Merck pipeline assets via the ICH M15 + WINREVAIR/Enlicitide ribbon.

**A. Title / subtitle relationship.** Headline `Three principles for leading quantitative pharmacology in the next five years.` is assertion-shaped — high-quality. **No subhead** rendered (only `Eyebrow`, `Headline`, `Viz`, `Footer` are pulled from `SlideParts` per line 6). Uses the SlideGrid `subhead` row implicitly empty — it'll collapse to `auto` ✓.

**B. Footer.** Present via `<Footer>` ✓ (line 232). Same `Closing · 33 of 35` kicker pattern.

**C. Spacing, density, alignment.** Viz contains four stacked rows: 3 principles (top), label divider, 3 research cards, ICH M15 ribbon. Six cards + ribbon + label = 8 zones. Heavy. The ribbon's `gridTemplateColumns: 'auto 1fr'` with a `<br>`-broken left label (lines 195–208) is fragile — the date string will line-break differently on different viewports.

The pipeline-bridge ribbon body (lines 209–227) packs: ICH M15 dates, WINREVAIR pediatric (MOONBEAM 2028), CS1 template, Enlicitide CORALreef, CS3 modeling template, HRS-5346, MK-2060, "first global MIDD guideline." **Eight named entities in three sentences.** This is the highest-density text block in the entire closing arc and lives at the bottom of an already-busy slide. Audience cannot parse this in 90 seconds. **[HIGH]**

**D. Token compliance.** Multiple hardcoded font-sizes:
- Principle title `clamp(1.05rem, 1.35vw, 1.40rem)` (line 293)
- Principle detail `clamp(0.78rem, 0.90vw, 0.94rem)` (line 306)
- Research card title `clamp(1.0rem, 1.2vw, 1.2rem)` (line 382)
- Research card spec `0.72rem` (line 392)
- Research card detail `clamp(0.74rem, 0.85vw, 0.88rem)` (line 403)
- Section label `0.70rem` (line 143)
- Ribbon label `0.70rem` (line 198)
- Ribbon body `clamp(0.84rem, 0.96vw, 0.98rem)` (line 211)
- Numbered chip `0.85rem` (line 279)
- Badge `0.62rem` (line 363)

**Unique font-size count: 10.** Brief §4 limit: ≤3. **[HIGH]**

**Accent colors:** amber, cyan, coral (principles 01/02/03) + violet, sage, amber (research cards) + amber (ribbon) = **5 distinct tokens**. The principles use the case-color trio (amber/cyan/coral) — does this echo the case studies? CS1=coral, CS2=cyan, CS3=violet. So principle 03=coral matches CS1, principle 02=cyan matches CS2, principle 01=amber doesn't match (CS3=violet). **The mapping is partial and misleading.** Either complete it (01→violet for CS3) or remove the case-token color choice and use neutral typographic emphasis. **[MED]**

**E. Visual elements.** Six icons (Compass, Layers, Users, Bot, Activity, Wrench) on six cards. Tell #3 (icon-per-item disease) in textbook form. Each icon is generic to its concept — Compass = strategy (decorative), Layers = scaffolds (literal), Users = teams (literal), Bot = LLM (literal), Activity = neural net (decorative), Wrench = tool (decorative). **Three of six icons are decorative (Compass, Activity, Wrench).** Drop them; keep only icons that label distinctly machine-readable artifacts. **[MED]**

**F. Motion.** 6 cards staggered (3×0.14 + 3×0.12) + label + ribbon = 7 sequential entrances. Final delay `D.ribbon=3.10s`. Total motion ~3.7s. No `prefers-reduced-motion` guard. **[MED]**

Proposed enhancement: The three principles cards should `layoutId`-morph from the case-color chips on the case-bridge slides (14, 22, 29) so the audience sees the principles emerging from the cases visually. `layoutId="case-color-chip-{coral|cyan|violet}"` → `layoutId="principle-{01|02|03}"`.

**G. Pattern conformity.** Uses `SlideGrid` + `STANDARD_AREAS` ✓.

**H. Top 3 actionable enhancements.**

| # | Enhancement | Effort (S/M/L) | Severity addressed |
|---|---|---|---|
| 1 | **Compress the pipeline-bridge ribbon to ≤30 words.** Strip the asset names list (HRS-5346, MK-2060, CORALreef, MOONBEAM 2028) into speaker notes. Keep the ribbon's claim: "Operating under the first global MIDD guideline — these principles bridge directly to Merck's pipeline." Move the asset-mapping to slide 34 as a takeaway sub-line. | M | HIGH (C — text density) |
| 2 | **Drop decorative icons (Compass, Activity, Wrench).** Keep Layers (scaffolds — literal), Users (teams — literal), Bot (LLM — literal). Three icons across six cards, used only where they encode meaning. Removes Tell #3. | S | E |
| 3 | **Reconcile principle colors with case colors OR remove case-token colors entirely.** If the intent is "principle 03 echoes CS1," then principle 01 must echo CS3 (violet, not amber). If the intent is decorative, switch all three to a neutral hairline + typographic numbering. Pick one. | S | D — semantic color conflict |

---

### Slide 34 · `in-closing` — In closing · three takeaways

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/34-in-closing.jsx`
**Slide job:** Compress the entire seminar into three editorial takeaways the panel remembers on the elevator ride home. Per High-Stakes-Playbook §2.2 Act 5, "three big numbers, max."

**A. Title / subtitle relationship.** **Headline is `In closing.` — that is a TOPIC LABEL, not an assertion.** Brief §2 hard rule: every slide's title is the sentence you'd say to someone who only sees the title. "In closing" is a transition phrase, not a claim. The Subhead `Three things to take away.` is also non-assertive. The actual assertions live inside the three cards. **HIGH** — this is the single most important slide in the entire deck (the elevator memory) and its title is a structural placeholder. **[HIGH]**

Suggested rewrite: `Three things this candidate would bring to QP2-CMD.` or `Eight submissions, four labels, six agencies — and a posture to extend it.` Pick the headline that compresses the three cards into one sentence the panel will repeat to colleagues.

**B. Footer.** Present via `<Footer>` ✓ (line 210). **But also a custom author tag inside `Viz` (lines 174–206)** — name + URL + presumably contact-style elements. The author tag duplicates the personal identification that already lives in slide 35. On slide 34 it should either (a) be removed (slide 35 owns the contact info), or (b) replace the `<Footer>` entirely. Currently both are present and the author bloc + Footer create a stacked rail at the bottom. **[MED]**

**C. Spacing, density, alignment.** `gridTemplateRows: '1fr auto auto'` (line 90) → cards / pull-quote / author. Pull-quote uses `borderTop + borderBottom + var(--panel) 35%` background (lines 113–116) with floating opening `&ldquo;` glyph (lines 124–139). The opening quote glyph at `position: absolute; top: 6; left: var(--space-5)` and `fontSize: clamp(2.6rem, 4vw, 4.6rem)` may collide with the blockquote's first line on narrow viewports. [needs visual verification]

The three takeaway cards are `gridTemplateRows: 'auto auto 1fr auto'` (line 234) — same pattern as slides 31/32/33 cards. Card-as-default has saturated the closing arc (Tell #4). **[MED]**

**D. Token compliance.** Many hardcoded font-sizes:
- Card metric `clamp(1.6rem, 2.2vw, 2.5rem)` (line 280)
- Card body `clamp(0.84rem, 0.96vw, 1.0rem)` (line 294)
- Card eyebrow `0.68rem` (line 266)
- Number chip `0.72rem` (line 256)
- Metric label `0.62rem` (line 306)
- Quote glyph `clamp(2.6rem, 4vw, 4.6rem)` (line 132)
- Blockquote `clamp(1.05rem, 1.45vw, 1.55rem)` (line 145)
- Figcaption `0.66rem` (line 163)
- Author name `clamp(0.95rem, 1.1vw, 1.15rem)` (line 189)
- Author URL `0.72rem` (line 199)

**Unique font-size count: 10.** Brief §4 limit: ≤3. **[HIGH]**

Token colors on the three takeaway cards: cyan (regulatory) + amber (breadth) + coral (leadership). **None of these match the original case-study colors at the conceptual level.** CS1 was coral but covered regulatory impact; CS2 was cyan but covered breadth; CS3 was violet but covered leadership. The takeaway color assignments are arbitrary. Fix: either use the literal case colors in CS1/CS2/CS3 order (coral/cyan/violet) so the audience reads the takeaways as "one per case," or commit to a neutral palette. **[MED]**

**E. Visual elements.** Three takeaway cards + pull-quote + author bloc + footer = five primary zones. The pull-quote (`That's the organization I know how to build...`) is excellent rhetorically but **attributes itself to "Merck QP2-CMD · Candidate Seminar · April 2026"** (line 169) — the seminar attributing a quote to itself is meta in a way that may read as cute rather than substantive. Either drop the figcaption and let the quote be unattributed (it's the speaker's own line, attribution is implicit), or attribute it to the speaker by name. **[MED]**

The metric `QP` for takeaway 03 (line 47) breaks the numeric parallelism (`8·4·6`, `7`, `QP`). "QP" as a metric is a wordplay rather than a count — the visual treatment makes it look like a numeral and it isn't. Either replace with a real count (e.g., `5+` for "five+ years building teams") or replace the entire metric panel with a typographic emphasis (no big number for principle 03). **[MED]**

**F. Motion.** 3 cards × 0.16s stagger + quote at 2.15s + sig at 2.65s + footer at 3.10s. Motion budget ~3.5s. No `prefers-reduced-motion`. **[MED]**

Proposed enhancement (the user's hint): The three takeaway numerals should `layoutId`-morph from the **three case-study color chips** in the framework slide 04 OR from the closing chips on slides 14 (CS1 bridge), 22 (CS2 bridge), 29 (CS3 bridge). Each chip carries forward as the matching takeaway number. This is the single most powerful cinematic moment available in the closing arc.

**G. Pattern conformity.** Uses `SlideGrid` + `STANDARD_AREAS` ✓.

**H. Top 3 actionable enhancements.**

| # | Enhancement | Effort (S/M/L) | Severity addressed |
|---|---|---|---|
| 1 | **Rewrite the headline as an assertion.** Replace `In closing.` (line 75–78) with the candidate-defining one-line claim — for example: `Eight submissions, four labels, six agencies — and a posture to extend it.` Or: `Three things to remember about this candidate.` The current title is the deck's only non-assertion. | S | HIGH (A — Brief §2 hard rule) |
| 2 | **Reconcile takeaway colors with case colors and drop the "QP" pseudo-metric.** Set tokens to coral / cyan / violet matching CS1/CS2/CS3, then either find a real number for principle 03 (e.g., the team-mentorship count) or remove the big-numeral row entirely from card 03 and let it be a different shape (asymmetry — Tell #2 fix). | M | D + E |
| 3 | **Add `layoutId="case-marker-{coral|cyan|violet}"` between the slide 14/22/29 case-bridge chips and these three takeaway cards.** Cards arrive on screen by morphing in from their corresponding case bridges. The cinematic moment that makes the audience feel the closing as a callback rather than a summary. | M–L | F (motion) — highest-leverage cinematic in deck |

---

### Slide 35 · `thank-you` — Thank you · questions welcome

**File:** `4-Apps/merck-deck/src/decks/qp2-seminar/slides/35-thank-you.jsx`
**Slide job:** Q&A handoff. Brief §15 ("Closer / thank you") + §17 ("'Any questions?' as a slide. Waste of a slide. Put something useful up — contact info, key recap, a QR to the doc."). Should land as a typographic full stop and an invitation, not a generic "Questions?" card.

**A. Title / subtitle relationship.** Headline `Thank you.` — pure ritual closer, allowed by Brief §15. **`Questions welcome.`** appears TWICE — once as top-left eyebrow (line 121) and once as the centered subtitle (line 191). **Redundancy. [MED]** Drop one.

The headline at `clamp(4rem, 11vw, 12rem)` (line 149) is appropriately huge. Centered, with a 3px amber rule below (lines 165–176) — clean.

**B. Footer.** **No `<Footer>` component.** Custom top-right `End · 35 / 35` (lines 124–138) plus author bloc bottom-left + contact bloc bottom-right. The author + contact placement is well-judged for a closing slide (the room can read the URL while Q&A runs), but bypassing `<Footer>` means the deck's `useDeck()` page-counter is not the source of truth for the page number — `35 / 35` is hardcoded. If the deck adds an appendix slide, this number drifts. **[MED]**

The user's calibration hint: *"the thank-you slide should reference the talk's central image/motif, not be a generic 'Questions?' slide."* The slide does carry the constellation watermark (lines 56–101) — partial credit. But it does NOT carry the "12 years" number, the three case-color chips, the framework themes by name, or any other recapped artifact the audience can use during Q&A.

**C. Spacing, density, alignment.** Three vertical zones: chrome (top), centered title bloc (middle), author + contact (bottom). Author bloc `bottom: 8vh` + contact `bottom: 8vh` — same vertical anchor. Watermark constellation at `width: min(80vh, 70vw)` may visually overlap the centered title, depending on aspect ratio. At `mixBlendMode: 'screen'` + `opacity: 0.18` the overlap is faint — likely fine, but verify on dark theme + portrait orientation. **[needs visual verification]**

**D. Token compliance.** Hardcoded font-sizes:
- Headline `clamp(4rem, 11vw, 12rem)` (line 149)
- Subtitle `clamp(1.05rem, 1.5vw, 1.6rem)` (line 182)
- Eyebrow `0.72rem` (line 110)
- Page-end `0.66rem` (line 130)
- Author name `clamp(1.1rem, 1.4vw, 1.4rem)` (line 210)
- Author role `0.72rem` (line 221)
- Contact label `0.78rem` (line 266)

**Unique font-size count: 7.** Brief §4 limit: ≤3.

`fontSize: '0.05em'` letterSpacing on contact (line 267) — should be `var(--ls-mono-tight)` (which is `0.12em`) or keep but document why.

**E. Visual elements.** Major issue — the watermark constellation **is re-implemented inline** (lines 56–101) instead of importing `ThemesConstellation` with a "watermark" or "context" variant. The duplicated geometry is 45 lines of essentially copy-pasted vertex math with diverged opacities (no halos, smaller discs, no animation). **[HIGH]**

This duplication breaks two things:
1. The shared `layoutId="themes-constellation"` morph chain — slide 30 → 31 carries the layoutId, but slide 34 → 35 cuts it. The closing arc's signature visual through-line stops one slide short of where it should land.
2. Single source of truth — if the constellation geometry, color tokens, or palette is updated in `ThemesConstellation.jsx`, slide 35 will silently diverge.

**Fix:** import `ThemesConstellation` and use `variant="context"` (or add a third `variant="watermark"` to `ThemesConstellation.jsx` if the current "context" is too bright). Wrap it in a `motion.div` with the same `layoutId` so the closing constellation can morph one final time onto the Q&A surface.

**F. Motion.** Five staged delays (chrome → title → rule → sub → name → role → contact + watermark). No `prefers-reduced-motion`. **[MED]**

Proposed enhancement: pull the constellation forward via `layoutId="themes-constellation"` from slide 31's faint backdrop into the slide 35 watermark. The visual closes the loop: the five themes constellation IS the deck's signature. Bonus: have the five colored discs `layoutId`-morph individually so the closing visual is the literal sum of the five framework themes the deck argued for.

**G. Pattern conformity.** Bypasses `SlideGrid` (justified — closer). Bypasses `<Footer>` (less justified — could still consume the kicker/tagline rail under the title). Bypasses `ThemesConstellation` (NOT justified — code duplication).

**H. Top 3 actionable enhancements.**

| # | Enhancement | Effort (S/M/L) | Severity addressed |
|---|---|---|---|
| 1 | **Replace inline constellation with imported `ThemesConstellation` + `layoutId`.** Delete lines 56–101. Replace with `<ThemesConstellation layoutId="themes-constellation" variant="context" />` (or add `variant="watermark"`). Add a wrapping `motion.div` with reduced opacity + screen blend. Restores the layoutId chain and removes 45 lines of duplicate geometry. | M | HIGH (E + cinematic continuity) |
| 2 | **Drop redundant "Questions welcome" — keep only one.** Choose: top-left eyebrow OR centered subtitle. Recommend keeping it as the subtitle (the audience already reads the eyebrow as chrome) and replacing the top-left with the deck's title shorthand "QP IN ACTION · 35 OF 35" or the date. | S | A (redundancy) |
| 3 | **Add a "what to recap during Q&A" element — a recap chip strip.** Replace the static watermark with three case-color chips labeled `CS1 · Ambrisentan` / `CS2 · Tibsovo · India` / `CS3 · Asparlas` plus the five framework themes. Brief §17 — "put something useful up" during Q&A. The audience uses this to ground their questions. | M | Slide-job (Q&A invitation, not termination) |

---

## Cross-cutting recommendations from this batch

1. **Font-size hardcoding is now a deck-wide pattern, not a per-slide bug.** Every slide in the closing arc uses 6–10 distinct hardcoded `clamp()` font-sizes inside Viz children. The fluid-type tokens (`--fs-slide-*`) are used by `SlideParts` but not extended into card/tile bodies. Recommendation: add a `--fs-card-*` family of fluid tokens (`--fs-card-numeral`, `--fs-card-title`, `--fs-card-body`, `--fs-card-label`, `--fs-card-meta`) and migrate slides 31–34 to consume them. This is the single highest-leverage cleanup available — it would normalize the closing arc and lay the groundwork for a deck-wide audit of card typography.

2. **The closing arc has saturated on cards-as-default.** Slides 31, 32, 33, 34 all rely on bordered card grids with hairline + colored left-border + cite chip. Tell #4 (stat-card formatting on non-stat content) compounded across four consecutive slides. Recommendation: vary the visual rhythm — slide 32 should be a single hero numeral (not a 7-tile grid), slide 34 should be three sentences (not three cards). Cards earn their place only on slide 31 (where a grid genuinely communicates "six domains").

3. **Case-color discipline (coral/cyan/violet for CS1/CS2/CS3) is being eroded across the closing arc.** Cyan is overloaded on slide 31 (cardiometabolic + global regulatory). The principle colors on slide 33 partially echo case colors but don't complete the mapping. The takeaway colors on slide 34 are arbitrary. Recommendation: write a one-line color contract — "cyan, coral, violet ALWAYS mean CS2/CS1/CS3 across this deck; amber/sage are deck-default ink accents only" — and audit slides 31–34 against it.

4. **Three numeric inconsistencies worth resolving before delivery.** (a) Slide 31 stat-strip "6 Domains" vs slide 34 takeaway 02 "Seven therapeutic areas" — pick one. (b) Slide 32 title "Twelve years" vs no `12` numeral on the slide. (c) Slide 33 ribbon names eight pipeline assets in 35 words — too dense for the 90-second beat. All three are content/data audit failures (Brief §12 + Playbook §5.1) — surface them in the speaker-notes can-of-worms catalog if not fixed on slides.

5. **The cinematic through-line should land, not just open.** The `ThemesConstellation` `layoutId="themes-constellation"` carries the visual from slide 30 → slide 31, then disappears for slides 32, 33, 34, then *should* reappear on slide 35 — but slide 35 re-implements the constellation inline and breaks the chain. Restoring the chain is the single most visible cinematic improvement available. Pair this with three `layoutId` pulls (case-color chips → slide 34 takeaway numerals; case-color chips → slide 33 principles; framework theme chips → slide 30 constellation discs) to give the closing arc real cinematic spine.

6. **`prefers-reduced-motion` is missing across every slide in this batch.** None of slides 30–35 wrap their `motion.*` entrances in a reduced-motion guard, and slide 32's `CountUpDigit` is the most egregious (active animation in `useEffect`). Brief §10 hard rule. Consider a deck-wide motion utility (e.g., `useReducedMotion()` from framer-motion) consumed by every slide root.

---

*End of batch 5 review. Total findings: 9 HIGH, 14 MED, 2 LOW. No source edits performed.*
