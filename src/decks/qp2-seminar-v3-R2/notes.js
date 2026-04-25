/**
 * qp2-seminar-v3-R2 — speaker notes per slide.
 *
 * See 4-Apps/merck-deck/Notes-And-QA-Structure.md for the authoring
 * vocabulary (## Spoken / ## Cues / ## Bridge sections, ⏸ pauses, glyph
 * cues, ==highlight== markers). Keys MUST match `slides[].id` in
 * `./manifest.js`. Empty string = "no static note authored yet"; the
 * presenter pane shows its placeholder and the live editor still works.
 */

const notes = {
  // Slide 00 — Placeholder (cover). Demonstrates the structured-notes
  // vocabulary for the R2 deck. Replace with the real cover note when
  // the title slide is written.
  placeholder: `## Spoken
Hi everyone — and thank you for making the time. ⏸ Over the next
forty-five minutes I want to walk you through ==quantitative pharmacology
doing what it does best== — turning complexity into confident decisions
that change **what gets approved, and for whom**.

We'll move through three case studies, in chronological order across my
career: ⏸ pediatric pulmonary arterial hypertension, adult oncology in
India, and an adult rare-disease bridge for a pediatric-only label.

## Cues
- ⏱ 25 sec — warm open, do not dwell
- 🎚 Warm, brief — slide 02 is where the stakes land
- 🎯 Lock eyes with the chair before "what gets approved"
- ⚠ Do NOT preview slide 02's hook
- ✅ Land cleanly on "across my career" for the bridge
- 📍 If you blank — skip to "Three cases. One thread."

## Bridge
That last sentence — *what gets approved, and for whom* — is where this
story starts.`,
};

export default notes;
