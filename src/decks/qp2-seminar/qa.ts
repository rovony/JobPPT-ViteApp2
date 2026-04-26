/**
 * QP2 Seminar — anticipated / rehearsed Q&A per slide.
 *
 * Counterpart to ./notes.js. Where notes.js is "what I say while
 * the slide is up", qa.js is "questions I expect from the audience
 * AND my prepared answers, ready to reuse if the same one comes up
 * later in the talk".
 *
 * Keys MUST match `slides[].id` in `./manifest.js`.
 * Values are markdown strings using the same syntax as notes:
 *   • **bold** · *italic* · ==highlight== (uses --case color)
 *   • # H1 · ## H2 · ### H3
 *   • - bullets · 1. ordered · > blockquote
 *
 * Suggested structure for each entry — the AnticipatedQAPane counts
 * `## Q:` occurrences to surface "Q&A · N items" in the section header,
 * so following this pattern lights up the count badge:
 *
 *   ## Q: <verbatim question>
 *   A: <prepared answer>
 *
 *   ## Q: <next question>
 *   A: <next answer>
 *
 * Live edits in presenter mode autosave through `useAnticipatedQA` and
 * override these per-session — but the canonical version-controlled
 * answers live here.
 *
 * Empty string = "no anticipated questions for this slide yet"; the
 * pane auto-collapses to a single "Q&A · empty" header until either
 * the file or a live edit adds content.
 */

const qa = {
  // Empty = AnticipatedQAPane auto-collapses for this slide.
  // Add entries as you rehearse, e.g.:
  //   title: `## Q: Why this case order?\n\nA: Each case maps to a different regulatory and analytical idiom — pediatric extrapolation, oncology asymmetry, rare-disease bridging. Order is chronological in my career too.`,
};

export default qa;
