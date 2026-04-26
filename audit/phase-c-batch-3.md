# Phase C batch 3 (slides 15-21) — font-token migration

Mechanical migration of raw `clamp(...)` and bare px/rem font-size literals on
card / tile / chart / numeral / caption elements to the new `--fs-card-*` token
family defined in `src/index.css`.

Already-tokenized references (`var(--fs-slide-*)`) inside cards were left
intact — out of scope for Phase C, which only converts raw literals.

## Files modified

- `src/decks/qp2-seminar/slides/20-case2-pillars-1-5.jsx`
- `src/decks/qp2-seminar/slides/21-case2-response.jsx`
- `src/decks/qp2-seminar/slides/cs2-shared/SecObjectionCard.jsx`
- `src/decks/qp2-seminar/slides/cs2-shared/BoneMarrowShared.jsx`
- `src/decks/qp2-seminar/slides/cs2-shared/PillarArchitecture.jsx`

## Migrations by file

### `slides/20-case2-pillars-1-5.jsx`
| Loc | Element | Before | After |
| --- | --- | --- | --- |
| line 117 | ConcordanceHero `≈` glyph (numeral) | `clamp(2.4rem, 4.8vw, 4.5rem)` | `var(--fs-card-numeral)` |
| line 156 | PercentBlock value (84.6 % / 84.4 % numerals) | `clamp(3rem, 6vw, 5.5rem)` | `var(--fs-card-numeral)` |

### `slides/21-case2-response.jsx`
| Loc | Element | Before | After |
| --- | --- | --- | --- |
| line 120 | "27 / 03" leadership-beat numeral | `clamp(2rem, 3.4vw, 3rem)` | `var(--fs-card-numeral)` |

### `slides/cs2-shared/SecObjectionCard.jsx`
| Loc | Element | Before | After |
| --- | --- | --- | --- |
| line 71 | Hero blockquote (verbatim SEC quote) | `clamp(1.1rem, 1.6vw, 1.8rem)` (hero branch only) | `var(--fs-card-title)` |
| line 119 | "RESOLVED" stamp (mono uppercase pill) | `11` (raw px) | `var(--fs-card-label)` |

The `: 'var(--fs-slide-body)'` non-hero branch on line 71 already carried a
token reference — left untouched.

### `slides/cs2-shared/BoneMarrowShared.jsx`
| Loc | Element | Before | After |
| --- | --- | --- | --- |
| line 206 | "IDH1 R132" mutation label (mono uppercase, leader-line caption) | `clamp(10px, 0.85vw, 12px)` | `var(--fs-card-label)` |

The `clamp(...)` literals on lines 37–38 (`DIMENSIONS.hero.width`,
`DIMENSIONS.context.width`) are SVG widths, not font-sizes — left alone.

### `slides/cs2-shared/PillarArchitecture.jsx` (slide-18 special-note target)
The four `*_DIMS` constants and the inline `hero6` dims object passed raw px
integers as `dims.fontTag` / `dims.fontName` / `dims.fontNum`, which were then
spread into `fontSize: dims.fontX`. Migrated all values that map cleanly into
the `--fs-card-*` family; left `SEED_DIMS.fontNum = 8` raw because it falls
below the smallest card token's floor (≈ 9.6 px).

| Constant / dim | Field | Before (px) | After |
| --- | --- | --- | --- |
| `SEED_DIMS` | fontNum | `8` | **unchanged** (below `--fs-card-meta` floor) |
| `FULL_DIMS` | fontTag | `11` | `var(--fs-card-meta)` |
| `FULL_DIMS` | fontName | `14` | `var(--fs-card-body)` |
| `FULL_DIMS` | fontNum | `18` | `var(--fs-card-title)` |
| `MARGIN_DIMS` | fontName | `11` | `var(--fs-card-meta)` |
| `MARGIN_DIMS` | fontNum | `13` | `var(--fs-card-label)` |
| `CHAIN_DIMS` | fontTag | `11` | `var(--fs-card-meta)` |
| `CHAIN_DIMS` | fontName | `13` | `var(--fs-card-label)` |
| `CHAIN_DIMS` | fontNum | `16` | `var(--fs-card-body)` |
| `Hero6Layout` inline `dims` | fontName | `22` | `var(--fs-card-title)` |
| `Hero6Layout` inline `dims` | fontNum | `38` | `var(--fs-card-numeral)` |

Two non-font follow-ups required by the type change (px integers → CSS strings):
- Line 297 (now 314): `dims.fontName > 0` → `dims.fontName`. Strings compare
  as `false` against `0`; the truthy check preserves the "hide when 0" intent
  while accepting token strings.
- Line 316 (now 333): `dims.fontTag > 0` → `dims.fontTag`. Same reason.

The `dims.fontNum || 12` fallback on line 288 (now 305) still works — token
strings are truthy, the only remaining `0` path is conceptual (none of the
current dims set `fontNum: 0`).

## Skipped

- **Slide 15 (`15-case2-divider.jsx`)** — only renders `CaseHeroDivider`,
  `IndiaMap`, `BoneMarrowShared`. No own font-size literals.
- **Slide 16 (`16-case2-background.jsx`)** — every card / caption already uses
  `var(--fs-slide-*)` tokens. Per Phase C policy ("Already-token references"),
  these are out of scope; a future sweep can decide whether
  `--fs-slide-kicker` on a tile body should swap to `--fs-card-body`.
- **Slide 17 (`17-case2-challenge-turn.jsx`)** — same as 16; all card text
  already on `--fs-slide-*` tokens.
- **Slide 18 (`18-case2-strategy.jsx` itself)** — slide chrome is on slide
  tokens; the px font-sizes flagged in the audit live inside
  `cs2-shared/PillarArchitecture.jsx` and were migrated there.
- **Slide 19 (`19-case2-pillar6.jsx`)** —
  - Line 116 hero blockquote uses `var(--fs-slide-headline-sm, 1.55rem)`. The
    `1.55rem` is a CSS-var fallback, not a bare literal; the primary value is
    a token reference, so left alone (no change in observable behavior unless
    `--fs-slide-headline-sm` is undefined, which is the existing condition).
  - All other `fontSize:` values are already `var(--fs-slide-*)` tokens.
- **Slide 21 (`21-case2-response.jsx`)** — the `calc(var(--fs-slide-pageno) *
  0.92)` on line 237 is derived from a token, not a raw literal. Left alone.
- **`cs2-shared/WorldMapShared.jsx`** — no font-size literals (rendered map
  has no overlaid text).
- **All slide chrome** (`Eyebrow`, `Headline`, `Subhead`, `Footer` props on
  `SlideFrame`) — explicit Phase C exclusion.
- **All SVG `<text>` elements** — none in this batch's scope.

## Risks / questions

1. **Slide 20 hero percentages shrink at wide viewports.** The 84.6 % / 84.4 %
   PercentBlocks previously had a `clamp(3rem, 6vw, 5.5rem)` ceiling of
   5.5 rem; `--fs-card-numeral` caps at 3.8 rem. On a 1920×1080 stage these
   numerals will render visibly smaller than before. This is the typographic
   centerpiece of the slide — designer should sanity-check at presentation
   resolution and decide whether a per-instance bump (custom larger token, or
   `font-size: max(var(--fs-card-numeral), <floor>)`) is wanted. Same caveat
   applies to the `≈` glyph between them (was 4.5 rem ceiling).

2. **Slide 21 "27 / 03" numeral shrinks slightly.** Previous ceiling 3 rem;
   new ceiling 3.8 rem. Net effect is a slight *increase* at wide viewports
   and a slight increase at the floor (2 rem → 2.4 rem). Likely fine, but
   worth a glance against the leadership-beat callout's surrounding body
   copy.

3. **SecObjectionCard hero quote — meaningful shrink.** Quote previously
   capped at 1.8 rem (≈ 28.8 px); `--fs-card-title` caps at 1.3 rem
   (≈ 20.8 px). This is the dramatic verbatim SEC quote on slide 17 and the
   resolved-stamp callback on slide 22. Migration follows the spec mapping
   ("~1.1–1.4 rem upper-bound → `--fs-card-title`") but the quote sits
   awkwardly between the title and numeral buckets. If the reduction reads
   weakly in presentation, recommend either: (a) introducing a new
   `--fs-card-quote` token (~1.6–1.8 rem ceiling) and using it here, or
   (b) reverting just this one site to a raw `clamp()` with a comment.

4. **PillarArchitecture seed numerals are still raw 8 px.** `SEED_DIMS.fontNum
   = 8` could not be migrated cleanly: 8 px is below the
   `--fs-card-meta` floor (0.6 rem ≈ 9.6 px), so promoting it to the token
   would visibly enlarge the seed pillars and change the slide-17 cinematic
   intent ("just enough geometry that they're recognizable when they grow on
   18"). Left raw and called out in a code comment above the `SEED_DIMS`
   definition. Future fix: either accept the slight enlargement and migrate,
   or add an explicit `--fs-card-pico` token for sub-meta marginalia.

5. **Slide 19's `--fs-slide-headline-sm` is undefined.** Found while reading
   line 116. The `var(--fs-slide-headline-sm, 1.55rem)` will currently always
   resolve to the 1.55 rem fallback because no `--fs-slide-headline-sm` token
   is declared in `src/index.css`. Out of Phase C's scope (no raw literal to
   migrate), but worth raising to whoever owns the slide-chrome token family.

6. **PillarArchitecture conditional logic now relies on truthiness.** I
   widened two `> 0` guards to bare truthy checks so token strings pass. This
   is semantically equivalent for every value the file currently produces
   (0 → falsy, integer > 0 → truthy, non-empty string → truthy), but if a
   future contributor sets a dim's font field to e.g. `"0"` (string) it will
   now render. Low risk; called out for completeness.
