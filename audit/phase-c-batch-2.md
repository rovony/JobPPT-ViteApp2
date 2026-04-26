# Phase C batch 2 (slides 08-14) — font-token migration

Mechanical migration of inline `clamp(...)` and bare-rem font-size literals
on card / tile / chart / numeral / caption elements to the new
`--fs-card-*` token scale defined in `src/index.css`.

Slide chrome (Eyebrow / Headline / Subhead / Footer), SVG `<text>` in
viewBox space, decorative glyphs, and `em`-relative sub-spans were left
untouched per the rules.

---

## Files modified

- `src/decks/qp2-seminar/slides/09-case-build.jsx`
- `src/decks/qp2-seminar/slides/10-case-fit-pcvpc.jsx`
- `src/decks/qp2-seminar/slides/11-case-exposure-match.jsx`
- `src/decks/qp2-seminar/slides/12-case-exposure-response.jsx`
- `src/decks/qp2-seminar/slides/13-case-impact.jsx`
- `src/decks/qp2-seminar/slides/14-case-bridge.jsx`
- `src/decks/qp2-seminar/slides/cs1-build/DecisionGate.jsx`
- `src/decks/qp2-seminar/slides/cs1-build/WorkflowStepsList.jsx`
- `src/decks/qp2-seminar/slides/cs1-bridge/PipelineBridgeCard.jsx`

---

## Migrations by file

### `09-case-build.jsx`
| Line | Element | Before | After | Why |
|---|---|---|---|---|
| 218 | `DatasetCell` value (big stat) | `clamp(2rem, min(3vw, 5vh), 2.6rem)` | `var(--fs-card-numeral)` | Upper 2.6rem squarely inside numeral band (2.4-3.8rem). |

### `10-case-fit-pcvpc.jsx`
| Line | Element | Before | After | Why |
|---|---|---|---|---|
| 216 | Covariate-screen ribbon body | `clamp(0.72rem, 0.82vw, 0.88rem)` | `var(--fs-card-body)` | Upper 0.88rem in body band (0.85-1.05rem). |
| 290 | Source line (footer chrome built ad-hoc) | `clamp(0.7rem, 0.85vw, 0.9rem)` | `var(--fs-card-body)` | Upper 0.9rem in body band; matches the page-no sibling that already uses `--fs-card-meta`. |
| 652 | `Td` parameter-table cell | `clamp(0.78rem, 0.92vw, 0.98rem)` | `var(--fs-card-body)` | Upper 0.98rem in body band; pairs with the `Th` already on `--fs-card-meta`. |

### `11-case-exposure-match.jsx`
| Line | Element | Before | After | Why |
|---|---|---|---|---|
| 138 | Closing payoff line (right column) | `clamp(0.9rem, 1.2vw, 1.3rem)` | `var(--fs-card-title)` | Upper 1.3rem matches title band exactly. |
| 566 | `SubgroupFlag` body | `clamp(0.8rem, 0.9vw, 0.92rem)` | `var(--fs-card-body)` | Upper 0.92rem in body band. |

### `12-case-exposure-response.jsx`
| Line | Element | Before | After | Why |
|---|---|---|---|---|
| 443 | `ThemePill` glyph (the icon char inside the pill) | `'0.9rem'` | `var(--fs-card-body)` | Pill text is already `--fs-card-meta`; glyph is the slightly larger ornament — lands in body band. |

### `13-case-impact.jsx`
| Line | Element | Before | After | Why |
|---|---|---|---|---|
| 323 | `Caption` lead | `clamp(0.9rem, 1.1vw, 1.2rem)` | `var(--fs-card-title)` | Upper 1.2rem inside title band; "if in doubt, prefer larger". |
| 341 | `Caption` meta | `clamp(0.7rem, 0.82vw, 0.88rem)` | `var(--fs-card-body)` | Upper 0.88rem in body band. |

### `14-case-bridge.jsx`
| Line | Element | Before | After | Why |
|---|---|---|---|---|
| 201 | ICH E11A coda body | `clamp(0.82rem, 0.95vw, 0.95rem)` | `var(--fs-card-body)` | Upper 0.95rem in body band. |
| 301 | `TemplateBullet` text | `clamp(0.82rem, 0.92vw, 0.98rem)` | `var(--fs-card-body)` | Upper 0.98rem in body band. |
| 360 | `ThemeTile` detail (italic) | `clamp(0.74rem, 0.84vw, 0.9rem)` | `var(--fs-card-body)` | Upper 0.9rem in body band. |

### `cs1-build/DecisionGate.jsx`
| Line | Element | Before | After | Why |
|---|---|---|---|---|
| 338 | `FlowNode` line 1 (mono uppercase verb) | `12` (px) | `var(--fs-card-label)` | 12px ≈ 0.75rem; mono uppercase tile label. |
| 345 | `FlowNode` line 2 (object / detail) | `10` (px) | `var(--fs-card-meta)` | 10px ≈ 0.625rem; tiny mono caption. |
| 367 | `SideDesc` (off-node mono description) | `10` (px) | `var(--fs-card-meta)` | Same role as flowchart caption. |
| 391 | `BelowDesc` (off-node mono description) | `10` (px) | `var(--fs-card-meta)` | Same role as flowchart caption. |

### `cs1-build/WorkflowStepsList.jsx`
| Line | Element | Before | After | Why |
|---|---|---|---|---|
| 79 | Step number badge inside 40 × 40 circle | `'0.85rem'` | `var(--fs-card-body)` | Numeric badge, single-character; lands at low end of body band. |

### `cs1-bridge/PipelineBridgeCard.jsx`
| Line | Element | Before | After | Why |
|---|---|---|---|---|
| 61 | Eyebrow label (mono uppercase) | `'0.68rem'` | `var(--fs-card-label)` | In label band (0.66-0.78rem). |
| 75 | Body prose | `clamp(0.88rem, 1.05vw, 1.1rem)` | `var(--fs-card-title)` | Upper 1.1rem just above body band → larger token per tie-breaker. |
| 89 | Footer tag (italic uppercase) | `'0.72rem'` | `var(--fs-card-label)` | In label band; mono-uppercase wide-tracking caption. |

---

## Skipped

### Slide chrome (already on `--fs-slide-*`)
- `08-case-strategy.jsx` lines 180, 235, 272 — eyebrow / kicker (already tokenized).
- `09-case-build.jsx` lines 83, 124, 140, 164, 181, 208, 229 — chrome / kicker / pageno tokens.
- `10-case-fit-pcvpc.jsx` line 87 — slide headline (`motion.h1`, `clamp(1.8rem, 3vw, 3.2rem)`); custom-built chrome, but explicitly slide-level.
- `12-case-exposure-response.jsx` line 119 — eyebrow tagline.
- `13-case-impact.jsx` line 249 — page-no chrome.

### SVG `<text>` in viewBox space (not screen-space)
- `10-case-fit-pcvpc.jsx` lines 475-512 (`PcVpcChart` axis labels).
- `11-case-exposure-match.jsx` lines 304, 336, 371-389, 460, 470, 475, 502, 517, 522 (AUC / Cmax panel labels).
- `12-case-exposure-response.jsx` lines 209-288 (`BoxPanel` labels) and 411 (`MedianGuide`).
- `cs1-strategy/DecisionVisuals.jsx` — entire file is SVG `<text>`.
- `cs1-build/CompartmentSchematic.jsx` — entire file is SVG `<text>`.

### `em`-relative sub-spans (intentional local scaling)
- `10-case-fit-pcvpc.jsx` line 582 — `'0.85em'` unit suffix inside `Td` (scales with parent).
- `10-case-fit-pcvpc.jsx` line 591 — `'0.62em'` "fixed" badge inside `Td`.

### Editorial / out-of-band
- `08-case-strategy.jsx` line 254 — `DecisionColumn` action title `clamp(1.4rem, min(2.2vw, 3.6vh), 2.4rem)`. Falls in the gap between `--fs-card-title` (max 1.3rem) and `--fs-card-numeral` (min 2.4rem); the in-source comment already flags "no token match — consider adding one". Kept as-is to avoid distorting the column-headline visual weight. See risks.
- `13-case-impact.jsx` lines 93, 108, 141, 154, 163, 204 — three big hero numerals (e.g. `clamp(9rem, 18vw, 20rem)`, `clamp(5.5rem, 12vw, 13rem)`). These are oversized editorial display, not card numerals; they sit far above `--fs-card-numeral` (max 3.8rem). Migrating would shrink them ~5× and effectively "fix" the focal-point issue, which the task brief explicitly defers to Phase D-tail. **Skipped on purpose.**
- `14-case-bridge.jsx` line 333 — `ThemeTile` decorative glyph `'1.6rem'`. Sits between title (max 1.3rem) and numeral (min 2.4rem); used as a visual ornament inside the tile, not as a card numeral. Skipped to preserve intent.

---

## Risks / questions

1. **DecisionGate flowchart has fixed-pixel container nodes (240 × 44 px) but
   text inside is now responsive (`var(--fs-card-label)` / `--fs-card-meta`).**
   The token's max (~12.5px for label, ~11.2px for meta) is at or just above
   the previous fixed 12px / 10px values, so the two-line layout should still
   fit at every viewport — but at very wide screens the new responsive sizes
   may push verb-text closer to the 240px border. Worth eyeballing on a 4K
   monitor before sign-off.

2. **`13-case-impact` hero numerals not migrated.** Per brief — flagged here
   so Phase D-tail knows the intent: these *should* be on a token, just one
   that doesn't exist yet (`--fs-hero-numeral`?). Today's `--fs-card-numeral`
   maxes at 3.8rem, which is ~5× too small for the current visual.

3. **`08-case-strategy` decision-action title** also has no clean home. A
   `--fs-card-headline` or `--fs-card-display` token in the ~1.3-2.4rem
   gap would absorb both this and a few other deferred items in batch 1.
   Recommend adding in Phase D.

4. **`PipelineBridgeCard` body** mapped to `--fs-card-title` (1.0-1.3rem) but
   the original was 0.88-1.1rem. The token is slightly narrower at the bottom
   and wider at the top — body prose with highlight spans may render a notch
   larger at large viewports. Visually acceptable, but worth a pass.

5. **`WorkflowStepsList` is documented as "preserved / extracted"** (no
   longer rendered by `09-case-build`). Migrated for consistency, but if it
   is truly dead it could equally be deleted.
