/**
 * template-blank — static speaker notes per slide.
 *
 * Keys MUST match slides[].id in ./manifest.js. Values are markdown
 * strings; PresenterNotesPane supports:
 *   - **bold** · *italic* · ==highlight== (uses --case color)
 *   - # H1 · ## H2 · ### H3
 *   - - bullets · 1. ordered · > blockquote
 *
 * Empty string = "no static note authored yet"; presenter pane shows
 * its placeholder and the live editor still works.
 *
 * Live edits in presenter mode autosave through useSpeakerNotes and
 * override these values per-session — but ship-of-truth lives here.
 */

const notes = {
  title: `## Opening · warm-open

Welcome the audience, name the talk, and land the one-sentence argument.

> *"Over the next X minutes I want to show you ..."*

### What to land

- **Who** — one-line self-introduction
- **Why now** — the hook that earns the next 30 seconds
- **What they leave with** — a single takeaway sentence
`,
  section: ``,
  closing: ``,
};

export default notes;
