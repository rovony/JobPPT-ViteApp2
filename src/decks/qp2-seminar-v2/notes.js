/**
 * qp2-seminar-v2 — static speaker notes per slide.
 *
 * Mirrors the qp2-seminar/notes.js shape. Add a keyed markdown entry
 * each time a slide is added to ./manifest.js.
 *
 * Keys MUST match slides[].id. Empty string = "no static note yet";
 * presenter pane shows its placeholder and the live editor still works.
 * Live edits autosave through useSpeakerNotes and override these
 * per-session — ship-of-truth lives in this file.
 *
 * Supported markdown: **bold** · *italic* · ==highlight== (case color),
 * # H1 · ## H2 · ### H3, - bullets, 1. ordered, > blockquote.
 */

const notes = {
  'title-kinetic': ``,
};

export default notes;
