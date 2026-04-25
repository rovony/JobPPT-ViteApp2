# template-blank

Minimal starter deck — 3 slides, `light-editorial` theme. Duplicate the
folder, rename, and start composing.

## Quick start

1. `cp -R src/decks/template-blank src/decks/<your-deck-id>`
2. Edit `manifest.js`: change `id`, `title`, `subtitle`, pick a `theme`
   (`clinical` | `keynote-noir` | `light-editorial`). Theme must match
   a `[data-deck-theme="..."]` block in `src/index.css`.
3. Register in `src/decks/registry.js`:
   ```js
   import yourDeck from './<your-deck-id>/manifest';
   export const DECKS = [..., yourDeck];
   ```
4. Rename / add / remove slides in `slides/` and update the
   `slides: []` array in the manifest.
5. Visit `/decks/<your-deck-id>` — Home card, deep links, presenter
   mode, analytics, and export auto-wire from the registry.

## What's in the box

| File | Purpose | Required? |
|---|---|---|
| `manifest.js` | Deck metadata + slides array | yes |
| `notes.js` | Keyed speaker notes per slide id | optional |
| `slides/01-title.jsx` | `TitleCard` pattern — hero title | template |
| `slides/02-section.jsx` | Plain `<Slide>` + `<Reveal>` — simplest | template |
| `slides/03-closing.jsx` | `ClosingCard` pattern — final beat | template |

## Optional manifest fields (DeckRunner reads if present)

- `defaultTransition: 'card' | 'cube' | 'flip' | 'depth' | 'pan'` —
  deck-wide slide-to-slide motion.
- `themeMode: 'light' | 'dark'` — force default; user can still
  toggle via the theme button (persists per-deck in localStorage).
- `notes` — imported from `notes.js`; keys must match slide ids.
- Per-slide `steps: N` — enables step-through; component reads
  `step` prop.
- Per-slide `transition: '<preset>'` — overrides `defaultTransition`
  for that slide only.

## Patterns to compose

`src/components/deck/patterns/` — `TitleCard`, `ClosingCard`,
`QuoteCard`, `StatGrid`, `TwoColumn`, `BulletList`, `CaseBodyCard`,
`CaseHeroDivider`, `ThemeStrip`, `ImpactNumerals`, `MetaLine`,
`HighlightWord`, `ApprovalTimeline`, `FloatingAnnotation`.

Or drop to primitives: `<Slide eyebrow title>` + `<Reveal>` for
composition-first slides.

## When this template is wrong

For richer starting shapes:

- `launch-keynote/` — 7-slide product-launch example, `keynote-noir`
  theme, multi-slide arc.
- `qp2-seminar/` — 35-slide case-study seminar, `clinical` theme,
  full feature set (notes, themes, assets, defaultTransition,
  per-slide steps). Study for patterns; don't fork for new decks.
- `qp2-seminar-v2/` — qp2 shape with empty slides, for slide-by-slide
  reorg of the canonical deck.
