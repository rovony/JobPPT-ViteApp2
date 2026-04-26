# Phase C batch 4 (slides 22-28) — font-token migration

Mechanical font-token sweep: inline `clamp(...)` and bare-rem font-size literals
on card / tile / chart / numeral / caption elements migrated to the new
`--fs-card-*` family in `src/index.css`.

## Files modified

- `src/decks/qp2-seminar/slides/22-case2-impact-bridge.jsx`
- `src/decks/qp2-seminar/slides/24-case3-challenge.jsx`
- `src/decks/qp2-seminar/slides/25-case3-strategy.jsx`
- `src/decks/qp2-seminar/slides/26-case3-fda-engagement.jsx`
- `src/decks/qp2-seminar/slides/27-case3-fit.jsx`
- `src/decks/qp2-seminar/slides/28-case3-impact.jsx`

Files in batch with no migrations needed:

- `23-case3-divider.jsx` — pure prop-passing wrapper around `CaseHeroDivider`;
  no inline font literals.
- `cs3-divider/InformativePriorViz.jsx` — all font sizes are SVG `<text>`
  numeric, viewBox-relative; per spec, skipped.
- `cs3-engagement/SampleSizeWaterfall.jsx` — pure SVG; all font sizes on
  `<text>`; skipped.
- `cs3-fit/RseStabilityCurve.jsx` — pure SVG; all font sizes on `<text>`;
  skipped.

`cs2-shared/` (SecObjectionCard, etc.) was within the CS2 batch (slides 15-21);
not re-walked here. See Risks for one notable inline clamp left in
`SecObjectionCard.jsx` (hero variant).

## Migrations by file

### `22-case2-impact-bridge.jsx`
- L148 — HeroTile big numeric date `clamp(2.4rem, 4.4vw, 3.6rem)` →
  `var(--fs-card-numeral)`. Other `fontSize:` references on this slide already
  point at slide-chrome tokens (`--fs-slide-pageno`, `--fs-slide-kicker`,
  `--fs-slide-tagline`); left untouched per "already-token references" rule.

### `24-case3-challenge.jsx`
- L104 — anchors-section mono label `'0.7rem'` → `var(--fs-card-label)`
- L146 — constraint-callout violet mono label `'0.66rem'` → `var(--fs-card-label)`
- L175 — constraint sub-label `'0.6rem'` → `var(--fs-card-meta)`
- L186 — constraint body `clamp(0.84rem, 0.95vw, 0.98rem)` → `var(--fs-card-body)`
- L229 — closing-question body prose `clamp(0.82rem, 0.95vw, 0.95rem)` →
  `var(--fs-card-body)`
- L271 — meta-tag mono key `'0.58rem'` → `var(--fs-card-meta)`
- L283 — meta-tag value `clamp(0.74rem, 0.85vw, 0.86rem)` → `var(--fs-card-body)`
- L340 — AnchorTile big-numeral year `clamp(2.4rem, 3.4vw, 3.8rem)` →
  `var(--fs-card-numeral)` (exact range match)
- L354 — AnchorTile mono label `'0.64rem'` → `var(--fs-card-meta)` (just below
  label floor 0.66)
- L367 — AnchorTile sub `clamp(0.78rem, 0.9vw, 0.92rem)` → `var(--fs-card-body)`

### `25-case3-strategy.jsx`
- L97 — viz-top mono label `'0.7rem'` → `var(--fs-card-label)`
- L137 — bottom-ribbon mono label `'0.6rem'` → `var(--fs-card-meta)`
- L149 — bottom-ribbon display body `clamp(0.95rem, 1.15vw, 1.2rem)` →
  `var(--fs-card-title)`
- L211 — MoveCard numbered chip `'0.84rem'` (mono "01"/"02") → `var(--fs-card-body)`
- L222 — MoveCard mono header label `'0.68rem'` → `var(--fs-card-label)`
- L236 — MoveCard headline italic display `clamp(0.98rem, 1.2vw, 1.25rem)` →
  `var(--fs-card-title)`
- L250 — MoveCard method line mono `'0.74rem'` → `var(--fs-card-label)`
- L285 — Row k mono `'0.58rem'` → `var(--fs-card-meta)`
- L296 — Row v body `clamp(0.78rem, 0.88vw, 0.92rem)` → `var(--fs-card-body)`
- L322 — FDA-precedent mono label `'0.58rem'` → `var(--fs-card-meta)`
- L333 — FDA-precedent body `clamp(0.74rem, 0.85vw, 0.86rem)` →
  `var(--fs-card-body)`

### `26-case3-fda-engagement.jsx`
- L125 — waterfall section mono label `'0.7rem'` → `var(--fs-card-label)`
- L152 — pillar-section mono label `'0.7rem'` → `var(--fs-card-label)`
- L183 — quote-section mono label `'0.66rem'` → `var(--fs-card-label)`
- L222 — closing-payoff display italic `clamp(0.9rem, 1.05vw, 1.1rem)` →
  `var(--fs-card-title)`
- L274 — PillarStatus big numeral
  `pillar.pill ? 'clamp(0.95rem, 1.2vw, 1.3rem)' : 'clamp(1.6rem, 2.1vw, 2.4rem)'` →
  `pillar.pill ? 'var(--fs-card-title)' : 'var(--fs-card-numeral)'` (preserves
  the pill-vs-numeral visual distinction)
- L290 — PillarStatus mono title `'0.62rem'` → `var(--fs-card-meta)` (below
  label floor 0.66)
- L302 — PillarStatus body sub `clamp(0.74rem, 0.85vw, 0.86rem)` →
  `var(--fs-card-body)`
- L351 — QuoteCard verbatim text `clamp(0.84rem, 0.98vw, 1rem)` →
  `var(--fs-card-body)`
- L364 — QuoteCard cite mono `'0.6rem'` → `var(--fs-card-meta)`

### `27-case3-fit.jsx`
- L133 — left-column mono label `'0.7rem'` → `var(--fs-card-label)`
- L173 — right-column mono label `'0.7rem'` → `var(--fs-card-label)`
- L214 — bottom-ribbon display italic `clamp(0.95rem, 1.15vw, 1.2rem)` →
  `var(--fs-card-title)`
- L273 — EvidenceBlock numbered chip mono `'0.74rem'` → `var(--fs-card-label)`
- L283 — EvidenceBlock mono header label `'0.66rem'` → `var(--fs-card-label)`
- L295 — EvidenceBlock tag display italic
  `small ? 'clamp(0.85rem, 0.98vw, 1rem)' : 'clamp(0.9rem, 1.05vw, 1.1rem)'` →
  `small ? 'var(--fs-card-body)' : 'var(--fs-card-title)'` (preserves the
  small/default size relationship)
- L323 — EvidenceBlock bullet body
  `small ? 'clamp(0.72rem, 0.82vw, 0.84rem)' : 'clamp(0.74rem, 0.85vw, 0.88rem)'` →
  `'var(--fs-card-body)'` (collapsed small/default — both upper bounds sat at
  the body-token floor; the visual difference was sub-pixel anyway)

### `28-case3-impact.jsx`
- L162 — durable-callout mono label `'0.62rem'` → `var(--fs-card-meta)`
- L174 — durable-callout body `clamp(0.86rem, 1vw, 1rem)` → `var(--fs-card-body)`
- L218 — **NOT MIGRATED** (cs3-pct-36 cinematic numeral; see Risks)
- L236 — NumeralBlock mono title `'0.72rem'` → `var(--fs-card-label)`
- L252 — NumeralBlock italic sub `clamp(0.78rem, 0.92vw, 0.92rem)` →
  `var(--fs-card-body)`
- L287 — NumeralBlock row text `clamp(0.74rem, 0.85vw, 0.86rem)` →
  `var(--fs-card-body)`

## Skipped

### Per spec (cinematic / decorative / SVG)

- **`28-case3-impact.jsx` L218** — `clamp(3.6rem, 6vw, 7.5rem)` on the `−36%`
  numeral (`layoutId="cs3-pct-36"`). Explicitly carved out by Phase C spec —
  tuned larger than `--fs-card-numeral` (3.8rem upper) for cinematic emphasis
  and to match the source-side bbox in `SampleSizeWaterfall`. **Left as-is.**
- **`23-case3-divider.jsx`** — wrapper-only file; no inline literals to touch.
- **`cs3-divider/InformativePriorViz.jsx`** — all font sizes on SVG `<text>`,
  viewBox-relative.
- **`cs3-engagement/SampleSizeWaterfall.jsx`** — pure SVG.
- **`cs3-fit/RseStabilityCurve.jsx`** — pure SVG.

### Per judgment (don't fit cleanly into the card scale)

- **`24-case3-challenge.jsx` L213** — closing-question display italic
  `clamp(1.05rem, 1.4vw, 1.55rem)`. Upper 1.55rem sits in the gap between
  `--fs-card-title` (1.3rem upper) and `--fs-card-numeral` (2.4rem floor).
  Bumping to numeral would balloon it ~2.5×; squashing to title would shrink
  the question to ordinary tile-title size. This is a feature callout that
  bridges card-text and slide-feature scale. Left untouched and flagged.
- **`26-case3-fda-engagement.jsx` L339** — decorative `“` quote glyph at
  `'2.2rem'`. It's a typographic ornament, not a card numeral; upper sits below
  the numeral floor (2.4rem). Left untouched.

### Already-token references (per spec)

- **`22-case2-impact-bridge.jsx`** L106, L162, L174, L204, L215, L228 — already
  use `--fs-slide-pageno`, `--fs-slide-kicker`, `--fs-slide-tagline`. Per spec
  rule "already-token references" → not migrated. Note that several of these
  are semantically tile/label tier and could reasonably be mapped to
  `--fs-card-*` in a future pass, but that crosses out of "migrate font-size
  literals" into "rewrite token assignments" — not in scope.

## Risks / questions

1. **Cinematic numeral preserved.** The `−36%` `layoutId="cs3-pct-36"` numeral
   on slide 28 stays at `clamp(3.6rem, 6vw, 7.5rem)` per spec. The framer-motion
   `layoutId` morph from `SampleSizeWaterfall`'s `<text fontSize={26}>` source
   bbox into this oversized destination is intentional. If a future pass
   introduces a `--fs-card-hero-numeral` token (or similar), this becomes a
   one-line swap; for now it's the only inline literal left on slide 28 by
   design.

2. **Slide 24 closing-question gap.** The `clamp(1.05rem, 1.4vw, 1.55rem)`
   "Could a smaller, smarter study still be defensible to FDA?" callout sits
   in a real typographic gap between `--fs-card-title` and `--fs-card-numeral`.
   Worth a design-side decision: either widen `--fs-card-title` to ~1.5rem
   upper, or introduce a `--fs-card-feature` mid-tier token, or accept that
   feature questions don't belong in the card scale at all.

3. **Slide 22 `cs2-shared` not re-walked.** `SecObjectionCard.jsx` (imported by
   slide 22) contains an inline `clamp(1.1rem, 1.6vw, 1.8rem)` for its `isHero`
   variant (line 71). Slide 22 only consumes `variant="resolved"` so no live
   regression risk here, but the hero variant (slide 17, CS2 batch) shares the
   same risk as the slide 24 callout above: 1.8rem upper falls in the title↔
   numeral gap. Flagging for the CS2 batch owner.

4. **Slide 27 EvidenceBlock bullet collapsed `small`/default.** L323 had
   parallel small (`clamp(0.72-0.84rem)`) and default (`clamp(0.74-0.88rem)`)
   ternary clamps that both fall inside the `--fs-card-body` range. Collapsed
   both branches to `var(--fs-card-body)` — the original delta was at-most 4px
   at the upper bound and effectively invisible. If the design intent was a
   genuine size step between blocks, a future pass should introduce a
   `--fs-card-body-sm` token; otherwise this simplification stands.

5. **Boundary calls at 0.62-0.66rem mono labels.** Cells with `'0.62rem'`
   sit just below the label-token floor (0.66rem) and were mapped to
   `--fs-card-meta`. Cells with `'0.66rem'` and above were mapped to
   `--fs-card-label`. This puts the Pillar mono titles on slide 26 (`'0.62rem'`,
   L290) and the durable-callout label on slide 28 (`'0.62rem'`, L162) at meta
   tier. Both could arguably be label tier per "in doubt prefer larger" — flag
   for a quick visual review of those two specific elements.

6. **No animation, color, or non-font-size property was touched.** All swaps
   are `fontSize:` only.
