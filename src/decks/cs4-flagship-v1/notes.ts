/**
 * cs4-flagship-v1 — speaker notes per slide.
 *
 * Authoring vocabulary follows V5 contract (see Notes-And-QA-Structure.md):
 *   ## Spoken / ## Cues / ## Bridge sections
 *   ⏸ pause glyphs · ==highlight== markers · 🎚 / 🎯 / ⚠ / ✅ / 🛟 cue glyphs
 *
 * Keys MUST match `slides[].id` in `./manifest.ts`.
 * Empty string = "no static note authored yet" — placeholder shown in editor.
 */

const notes: Record<string, string> = {
  // ────────────────────────────────────────────────────────────────────
  // S01 — Divider · sage cascade starts here · AiBrain morph anchor
  // ────────────────────────────────────────────────────────────────────
  'cs4-divider': `## Spoken
==Case 04 — PharmAgent.== ⏸ Workflow infrastructure for model-informed decisions.

The first three cases asked: ==what does clinical pharmacology decide?== ⏸ This case asks a different question. ==What does clinical pharmacology decide WITH?==

The honest answer today is: ==spreadsheets, scripts, and the memory of a few senior analysts.== ⏸ That is not a foundation a regulator is going to trust for a decade of AI-augmented submissions.

So I built another one. ⏸ This is the architectural argument.

## Cues
- ⏱ 45 sec — slow, deliberate. The divider is a stage.
- 🎚 Lower register on "spreadsheets, scripts, and memory" — let the absurdity land.
- 🎯 Eye contact rotates to the most pharmacometrics-leaning panelist on "what does clinical pharmacology decide WITH"
- ⚠ Do NOT name agents, tool counts, or hashes here. The architecture lands on S05.
- ✅ Land cleanly on "this is the architectural argument."
- 🛟 If you blank: "Case 04 is the workflow infrastructure case."

## Bridge
→ S02 starts: "Every clin pharm group has the same three layers..." — the AiBrain illustration physically morphs into the center of the integration-layer Venn.`,

  // ────────────────────────────────────────────────────────────────────
  // S02 — Hook · Three-circle integration-layer Venn
  // ────────────────────────────────────────────────────────────────────
  'cs4-hook-integration': `## Spoken
Every clinical pharmacology group has the same three layers. ⏸

==Data sits over here.== Patient files, dose records, sample concentrations — locked behind privacy, locked behind systems, locked behind permissions. ⏸

==Decisions sit over there.== Dose recommendations, label updates, regulatory submissions — owned by senior pharmacometricians, signed off by clinical leadership. ⏸

And in between — ==the workflow layer that connects the two== — is where every group has been building, abandoning, and rebuilding the same scripts for twenty years. ⏸

That layer is what AI gets to be — ==if we build it correctly==. ⏸ If we don't, AI becomes a fourth circle that never quite touches either of the other two — which is what most published agentic systems are right now.

## Cues
- ⏱ 75 sec — three named beats with ⏸ pauses; the punchline is "AI gets to be the workflow layer if we build it correctly."
- 🎚 Slow on "twenty years" — every regulator and every senior pharmacometrician in the room has lived this.
- 🎯 Step forward on "AI gets to be" — this is the thesis.
- ⚠ Do NOT defend "AI" abstractly. The slide does that work; you just name the layers.
- ✅ Land cleanly on "if we build it correctly" — that's the cue for S03 (which is HOW you build it correctly = ICH M15).
- 🛟 Recovery line: "Three layers. The workflow layer is the one that's been broken for twenty years."

## Bridge
→ S03 opens with the M15 dial — the case-color hairline morphs into the dial's outer arc, signalling the regulatory anchor for "build it correctly."`,

  // ────────────────────────────────────────────────────────────────────
  // S03 — Why now · ICH M15 6-pillar dial
  // ────────────────────────────────────────────────────────────────────
  'cs4-why-now-m15': `## Spoken
The reason this conversation can happen at all in 2026 is ==ICH M15==. ⏸

Step 4 reached on ==29 January 2026==. ⏸ ==CHMP adopted in March==. ⏸ FDA, PMDA, NMPA implementation guidance is in flight as we speak.

M15 is the first time global regulators have written down what ==good practice for model-informed drug development== — including AI/ML — actually looks like. ⏸

There are six pillars. ==Context of use==. ==Data quality==. ==Model qualification==. ==AI / ML==. ==Governance and audit==. ==Lifecycle update==. ⏸

And the punchline is — every single architectural choice in PharmAgent maps to one of those six pillars. ⏸ ==This is not a coincidence.== I built it backwards from M15 on purpose, so that when a regulator opens the dossier, the audit trail explains itself.

## Cues
- ⏱ 60 sec — the dial reveals one pillar at a time on the spoken cue. Six beats.
- 🎚 Land "AI / ML" with extra weight — that's the morph-anchor for S05.
- 🎯 On "I built it backwards from M15 on purpose" — eye contact with the most regulatory-leaning panelist.
- ⚠ Do NOT explain what "Step 4" means in regulatory grammar. The audience knows. Naming it is enough.
- ✅ Punchline: "the audit trail explains itself" — Q&A pivot.
- 🛟 If you blank on a pillar: skip; the dial does the work.

## Bridge
→ S04 zooms into "what is an agent" — the AI/ML pillar tile pulls forward and becomes the next slide's frame.`,

  // ────────────────────────────────────────────────────────────────────
  // S04–S10 — placeholders. Authored in Group B/C/D.
  // ────────────────────────────────────────────────────────────────────
  'cs4-what-is-agent':     '',
  'cs4-architecture':      '',
  'cs4-novelty':           '',
  'cs4-privacy-boundary':  '',
  'cs4-audit-chain':       '',
  'cs4-workflow-trace':    '',
  'cs4-bracket-bridge':    '',
};

export default notes;
