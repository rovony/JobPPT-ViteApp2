# Phase C batch 5 (slides 29-35) — font-token migration

Mechanical migration of card / tile / chart / numeral / caption font-size
literals to the new `--fs-card-*` token family. Slide chrome (Eyebrow /
Headline / Subhead / Footer / divider hero typography), SVG `<text>` and
non-card editorial blocks were left alone.

## Files modified

- `src/decks/qp2-seminar/slides/29-case3-bridge.jsx`
- `src/decks/qp2-seminar/slides/31-breadth-therapeutic-areas.jsx`
- `src/decks/qp2-seminar/slides/32-record-at-scale.jsx`
- `src/decks/qp2-seminar/slides/33-leadership-principles.jsx`
- `src/decks/qp2-seminar/slides/34-in-closing.jsx`

## Migrations by file

### 29-case3-bridge.jsx

| Loc | Element | Before | After |
| --- | --- | --- | --- |
| L102 | "The template — generalizes wherever…" mono label above bullet grid | `'0.72rem'` | `var(--fs-card-label)` |
| L200 | ICH M15 coda mono label (violet eyebrow inside coda card) | `'0.68rem'` | `var(--fs-card-label)` |
| L210 | ICH M15 coda body prose inside the panel-tinted card | `clamp(0.82rem, 0.95vw, 0.95rem)` | `var(--fs-card-body)` |
| L232 | "Framework themes in this case study · 3 of 5" ribbon mono label | `'0.72rem'` | `var(--fs-card-label)` |
| L312 | `TemplateBullet` body text (one bullet per checkmark) | `clamp(0.82rem, 0.92vw, 0.98rem)` | `var(--fs-card-body)` |
| L355 | `ThemeTile` title mono | `'0.72rem'` | `var(--fs-card-label)` |
| L368 | `ThemeTile` italic detail body | `clamp(0.74rem, 0.84vw, 0.9rem)` | `var(--fs-card-body)` |

### 31-breadth-therapeutic-areas.jsx

| Loc | Element | Before | After |
| --- | --- | --- | --- |
| L272 | `DomainCard` flagship/active badge ribbon mono | `'0.62rem'` | `var(--fs-card-meta)` |
| L287 | `DomainCard` domain label mono uppercase | `'0.68rem'` | `var(--fs-card-label)` |
| L300 | `DomainCard` program name (1.10rem upper → title) | `clamp(0.92rem, 1.05vw, 1.10rem)` | `var(--fs-card-title)` |
| L313 | `DomainCard` italic detail body | `clamp(0.78rem, 0.88vw, 0.92rem)` | `var(--fs-card-body)` |
| L325 | `DomainCard` cite chip mono | `'0.64rem'` | `var(--fs-card-meta)` |
| L357 | `StatTile` big numeral (2.5rem upper → numeral) | `clamp(1.6rem, 2.2vw, 2.5rem)` | `var(--fs-card-numeral)` |
| L369 | `StatTile` mono label | `'0.66rem'` | `var(--fs-card-label)` |

### 32-record-at-scale.jsx

| Loc | Element | Before | After |
| --- | --- | --- | --- |
| L179 | Bottom payoff ribbon italic prose (1.20rem upper → title; "in doubt prefer larger") | `clamp(0.95rem, 1.15vw, 1.20rem)` | `var(--fs-card-title)` |
| L262 | `RecordTile` static patent ID (mono, 1.4rem upper → title) | `clamp(1.05rem, 1.4vw, 1.4rem)` | `var(--fs-card-title)` |
| L275 | `RecordTile` count-up big numeral (4rem upper) | `clamp(2.2rem, 3.6vw, 4rem)` | `var(--fs-card-numeral)` |
| L282 | `RecordTile` numeral suffix (`+`) (2.6rem upper, paired with the numeral) | `clamp(1.4rem, 2.4vw, 2.6rem)` | `var(--fs-card-numeral)` |
| L299 | `RecordTile` label mono | `'0.68rem'` | `var(--fs-card-label)` |
| L310 | `RecordTile` italic detail body | `clamp(0.74rem, 0.84vw, 0.88rem)` | `var(--fs-card-body)` |

### 33-leadership-principles.jsx

| Loc | Element | Before | After |
| --- | --- | --- | --- |
| L143 | "Where principle meets practice…" section divider label mono | `'0.70rem'` | `var(--fs-card-label)` |
| L198 | ICH M15 ribbon eyebrow mono | `'0.70rem'` | `var(--fs-card-label)` |
| L211 | ICH M15 ribbon body prose | `clamp(0.84rem, 0.96vw, 0.98rem)` | `var(--fs-card-body)` |
| L279 | `PrincipleCard` numbered chip (`01` / `02` / `03`, 0.85rem mono) | `'0.85rem'` | `var(--fs-card-body)` |
| L293 | `PrincipleCard` title (1.40rem upper → title) | `clamp(1.05rem, 1.35vw, 1.40rem)` | `var(--fs-card-title)` |
| L306 | `PrincipleCard` italic detail body | `clamp(0.78rem, 0.90vw, 0.94rem)` | `var(--fs-card-body)` |
| L363 | `ResearchCard` badge mono ("Multi-agent" / "Neural ODE" / etc.) | `'0.62rem'` | `var(--fs-card-meta)` |
| L382 | `ResearchCard` title (1.2rem upper → title) | `clamp(1.0rem, 1.2vw, 1.2rem)` | `var(--fs-card-title)` |
| L392 | `ResearchCard` spec mono | `'0.72rem'` | `var(--fs-card-label)` |
| L403 | `ResearchCard` italic detail body | `clamp(0.74rem, 0.85vw, 0.88rem)` | `var(--fs-card-body)` |

### 34-in-closing.jsx

Only the `TakeawayCard` stack was migrated. The pull-quote figure,
floating opening glyph, signature line, and figcaption attribution sit
at slide-level (not card content) and were left alone — also to avoid
conflicting with the Phase D headline rewrite.

| Loc | Element | Before | After |
| --- | --- | --- | --- |
| L266 | `TakeawayCard` numbered chip (`01` / `02` / `03`) | `'0.72rem'` | `var(--fs-card-label)` |
| L276 | `TakeawayCard` eyebrow mono ("Regulatory impact" etc.) | `'0.68rem'` | `var(--fs-card-label)` |
| L290 | `TakeawayCard` big inline metric (2.5rem upper → numeral) | `clamp(1.6rem, 2.2vw, 2.5rem)` | `var(--fs-card-numeral)` |
| L304 | `TakeawayCard` italic body prose | `clamp(0.84rem, 0.96vw, 1.0rem)` | `var(--fs-card-body)` |
| L316 | `TakeawayCard` metric label mono caption | `'0.62rem'` | `var(--fs-card-meta)` |

## Skipped

### `30-closing-divider.jsx` — pure divider chrome, no card/tile content

All font-sizes on this slide are act-marker chrome that mirrors
`CaseHeroDivider`'s typographic ratios (kicker → giant title → hairline →
subtitle → tagline → meta footer → page-number rail). Per the brief,
slide chrome is out-of-scope for `--fs-card-*` migration.

- L55 corner Act-marker mono `'0.7rem'`
- L80 amber kicker `clamp(0.8rem, 1vw, 1.1rem)`
- L97 giant title `clamp(3.2rem, 7.5vw, 9rem)`
- L133 subtitle `clamp(1.3rem, 2.4vw, 2.8rem)`
- L152 tagline italic `clamp(0.95rem, 1.3vw, 1.4rem)`
- L201 meta footer mono `clamp(0.6rem, 0.78vw, 0.85rem)`
- L247 source-line italic `clamp(0.7rem, 0.85vw, 0.9rem)`
- L257 page-number mono `'0.65rem'`

### `35-thank-you.jsx` — closing card chrome only

Per the batch brief: "minimal font usage, just the closing prose. Most
goes through `--fs-slide-*` chrome already; this batch may yield few
migrations." The slide is bespoke (not on `SlideGrid`) and every
font-size belongs to centered editorial chrome:

- L77 top-left amber eyebrow `'0.72rem'`
- L96 top-right page-end marker mono `'0.66rem'`
- L116 centered "Thank you." giant `clamp(4rem, 11vw, 12rem)`
- L149 centered "Questions welcome." subtitle italic `clamp(1.05rem, 1.5vw, 1.6rem)`
- L177 author display name `clamp(1.1rem, 1.4vw, 1.4rem)`
- L188 role mono `'0.72rem'`
- L233 `ContactRow` mono `'0.78rem'`

### Other targeted skips

- **29 L172** — violet payoff line `clamp(1.1rem, 1.5vw, 1.65rem)` is a
  centered slide-level editorial hero line ("The win wasn't a smaller
  trial…"), not card content. Skipped to preserve its chrome-like
  emphasis.
- **29 L343** — `ThemeTile` decorative glyph at `'1.6rem'`. This is a
  Unicode symbol icon (⇌, ◎, ⊕, ◇, ◈), not a numeric stat. 1.6rem
  sits between `--fs-card-title` (≤1.3rem) and `--fs-card-numeral`
  (≥2.4rem), so any token swap would visibly shift it. Left literal.
- **34 L142, L155, L174, L199, L209** — pull-quote opening glyph,
  blockquote prose, figcaption, author signature, and contact-URL mono.
  These are slide-level closing typography, not the `TakeawayCard`
  stack, and the brief explicitly scoped this slide to "card stack tile
  font-sizes only."
- **`closing-divider/ThemesConstellation.jsx`** — the only sub-component
  in this batch's folders. All `<text>` font-sizes are SVG-internal
  (viewBox-relative `fontSize={15}` etc.), out-of-scope per brief.

## Risks / questions

1. **Slide 29 theme-tile glyph (1.6rem)**: left as a bare rem literal.
   It's a decorative symbol, not a numeral, and neither token tier is a
   clean substitute. If a future "card glyph / icon" tier is added,
   route it through that.
2. **Slide 32 / 33 ribbon prose** (`L179` / `L211`): the bottom payoff
   ribbon and ICH M15 ribbon are tile-shaped (border, padding,
   background, rounded radius) but hold prose, not tabular data. I
   migrated them ( `--fs-card-title` / `--fs-card-body` respectively)
   per the "in doubt, prefer larger" rule and the fact that ribbons are
   structurally tiles. If the design intent is for these payoffs to
   read as slide-level editorial copy, they should be reverted to bare
   clamps and routed through a future `--fs-slide-payoff` tier.
3. **Slide 31 `DomainCard` program (1.10rem upper) → `--fs-card-title`
   (caps at 1.3rem)**: token's upper bound is 0.20rem larger than the
   original literal. On wide stages the program name will read slightly
   larger relative to its detail line — expected per the new tier
   contract, but worth a visual sanity-check on the breadth grid.
4. **Slide 32 numeral `+` suffix**: I mapped both the count-up digit
   (4rem upper) and the `+` suffix (2.6rem upper) to
   `--fs-card-numeral`. Originally the suffix was visibly smaller than
   the digit (~65% size). Now they share one token, so the suffix will
   render at the same size as the numeral — the `20+` tile will read
   "20+" with both glyphs equal-height. If a stepped suffix is desired,
   either restore the bare clamp on the suffix or introduce a
   dedicated `--fs-card-numeral-suffix` tier.
5. **Slide 33 `PrincipleCard` numbered chip (0.85rem) → `--fs-card-body`
   (caps at 1.0rem)**: the round chip ("01" / "02" / "03") will trend
   slightly larger inside its 38×38 circle. Visually fine at the chip
   size but worth a glance.
6. Phase D `NumeralBlock` count-up animation on slide 32 was preserved —
   only the `style.fontSize` argument passed to `CountUpDigit` was
   swapped; the motion-value transform pipeline and animation timings
   are untouched.
7. No layout, color, behavior, or animation-duration changes.
8. Slide 33's deferred case-color contract issue (P5) was not touched —
   font-only migration as instructed.
