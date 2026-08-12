/**
 * Anticipated Q&A — CS1 Ambrisentan case deck (v7-Claude).
 *
 * Format per Notes-And-QA-Structure.md: `## QN:` headings are what the
 * "Q&A · N anticipated" badge counts. Difficulty is ★–★★★★★.
 *
 * Weighted toward the four people most likely to push on this case:
 * Morcos (structure, identifiability), Burington (data vs inference),
 * Greene/Glatt (regulatory use, dose rationale), Kanodia (scope).
 */

const qa: Record<string, string> = {
  'cs1-strategy': `## Q1: Why not a Bayesian model borrowing strength from the adult data directly?
**From:** Peter Morcos · **Difficulty:** ★★★★ · **Topic:** Model structure

A: It was on the table. The problem is defensibility rather than statistics — a borrowing framework needs a pre-specified prior weight, and with thirty-nine children any borrowing fraction strong enough to help is also strong enough to be argued as driving the answer. An explicit exposure-matching argument puts the assumption in plain sight: here is the adult range, here is where children land, here is the weight model that connects them. A reviewer can attack any of those three directly.

> **If pressed:** I would use a Bayesian framing today for the *sensitivity* analysis — quantifying how much the conclusion moves across borrowing fractions — rather than as the primary.

## Q2: Compartmental structure — how did you land on it, and what was not identifiable?
**From:** Peter Morcos · **Difficulty:** ★★★ · **Topic:** Identifiability

A: The structure came from the adult model, which was already mature; the pediatric data augment it rather than re-estimate it from scratch. What was not identifiable was any exposure–response slope — the achieved dose range was too narrow. We reported that as a limitation instead of fitting something fragile.

> **If pressed:** Parameter table and diagnostics are in backup.`,

  'cs1-concordance': `## Q1: Are those density curves the actual published distributions?
**From:** Bart Burington · **Difficulty:** ★★★ · **Topic:** Data provenance

A: No, and I flag that on the slide. The numerals are from the published analysis. The curves are illustrative Gaussians showing the qualitative overlap — they are not digitised from the paper. If you want the real distributional detail, it is in the publication and I can walk it in backup.

> **If pressed:** Okour M et al. J Clin Pharmacol 2023;63(5):593–603.

## Q2: Exposure overlap is not efficacy. What does this actually establish?
**From:** Bart Burington · **Difficulty:** ★★★★★ · **Topic:** Data vs inference

A: Agreed, and that distinction is the case. What the data establish is that children on weight-based dosing achieve exposures inside the adult therapeutic range. What the *model* infers is nothing beyond that. The efficacy claim is carried by the adult evidence base plus the assumption of disease similarity — which is an assumption I state rather than derive. If disease similarity fails, exposure concordance does not rescue it.

> **If pressed:** That is exactly why the decision boundary was agreed in advance and why the assumption is named on its own slide.`,

  'cs1-boundary': `## Q1: Was the boundary genuinely pre-agreed, or reconstructed afterwards?
**From:** Jitendra Kanodia · **Difficulty:** ★★★★ · **Topic:** Governance

A: The exposure target and the comparison were agreed as the basis of the package before the pediatric analysis was final — that is what made it a submission strategy rather than a post-hoc interpretation. What I would do better today is get the falsification criteria into a written analysis plan with biometrics, not just into the strategy discussion.

> **If pressed:** That gap is the "what I'd do differently" on the closing slide — I would rather own it than smooth it.

## Q2: What would you have done if exposures had landed outside the band?
**From:** Dylan Glatt · **Difficulty:** ★★★ · **Topic:** Dose strategy

A: Redesigned the weight bands first — the dosing scheme had room. If banding could not bring exposures into range, the honest answer was to say the bridge does not support a label at this dose and go back for data. Declining to claim a bridge is a legitimate output of a bridging analysis.`,

  'cs1-outcome': `## Q1: Why no FDA pediatric indication?
**From:** Doug Greene · **Difficulty:** ★★★ · **Topic:** Regulatory

A: FDA never received the package. It was a split-rights commercial outcome, not a regulatory rejection of the science. The US label still says safety and effectiveness in pediatric patients have not been established, and there is no formal FDA pediatric indication as of today. I raise it before anyone asks, because the alternative is that it looks like something I was hiding.

> **If pressed:** The submission-gap detail is in backup.

## Q2: How does any of this transfer to a T-cell engager?
**From:** Jitendra Kanodia · **Difficulty:** ★★★★ · **Topic:** Relevance

A: I would not claim it does at the modality level, and I have not been the primary pharmacometrics lead on a TCE. What transfers is the decision pattern: defining the evidence threshold for the next action when the clean experiment is unavailable or unethical. That is the shape of a step-up decision, a schedule decision, or an expansion-cohort decision — and it is where I would expect to be useful while learning the modality-specific biology from the people who own it here.`,
};

export default qa;
