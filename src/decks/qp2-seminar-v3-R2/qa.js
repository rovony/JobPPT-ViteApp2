/**
 * qp2-seminar-v3-R2 — anticipated / rehearsed Q&A per slide.
 *
 * See 4-Apps/merck-deck/Notes-And-QA-Structure.md §2 for the authoring
 * vocabulary (## QN: heading-anchored questions with **From:**,
 * **Difficulty:**, **Topic:** metadata). Counterpart to notes.js.
 */

const qa = {
  // Slide 00 — Placeholder (cover). Three rehearsed Q&A entries that
  // are likely to come up before any case study lands. Replace with
  // real cover-slide Q&A when the title slide is finalized.
  placeholder: `## Q1: Why these three case studies, in this order?
**From:** chair (likely opener)
**Difficulty:** ★★ · **Topic:** structure

A: Each case maps to a different ==regulatory and analytical idiom== —
pediatric extrapolation, oncology asymmetry under data scarcity, and
adult bridging from a pediatric-only label. The order is also
chronological in my career, so the structure mirrors how my judgment
on ==model-informed decisions== actually evolved.

> **If pressed:** I deliberately picked one that landed at EMA + PMDA,
> one that broke a regional access bottleneck, and one that's still
> open — so the talk is honest about wins, near-wins, and active
> uncertainty.

## Q2: Why quantitative pharmacology rather than just clinical pharmacology?
**From:** anyone (framing probe)
**Difficulty:** ★★★ · **Topic:** scope

A: Because the decisions I'm walking you through aren't pharmacology
decisions — they're ==regulatory and access decisions== that happen to
hinge on pharmacology models. Calling it "quantitative" is the honest
label: the work is exposure-response, MBMA, mediation analysis, and
trial simulation — used to change what the label says, not just to
explain what the molecule does.

> **If pressed:** the M-CERSI definition is the canonical one — model-
> informed drug development across discovery → label → post-approval.

## Q3: How will you keep this to forty-five minutes?
**From:** chair (logistics)
**Difficulty:** ★ · **Topic:** logistics

A: Tight time budgets per case — eight minutes each, plus a five-minute
opener and a ten-minute close. ==Q&A is reserved for the end== so I can
hold timing on the cases themselves; if a question comes up mid-case
that I can't answer in one sentence, I'll note it on the side board and
come back to it.

> **If pressed:** I've timed the talk three times against a stopwatch
> with the spoken-word counts in the speaker notes — drift is under
> two minutes either direction.`,
};

export default qa;
