const note = (spoken: string, cues: string, bridge: string, offSlide?: string) => {
  const off = offSlide
    ? `\n\n## Off-slide (if asked — not on screen)\n${offSlide}`
    : '';
  return `## Spoken
${spoken}

## Cues
${cues}

## Bridge
${bridge}${off}`;
};

/**
 * Continuous talk for story-flow 7+divider spine.
 * Arrival/departure lines chain slide-to-slide.
 */
const notes: Record<string, string> = {
  'cs1-divider': note(
    `First case: ambrisentan in pediatric pulmonary arterial hypertension.

The Phase IIb program stopped early, but an ==exposure bridge still supported EMA and PMDA pediatric approval in 2021==.

Twenty seconds — name the case and the verdict, not the methods.`,
    `- ⏱ 20 sec
- ⚠ Do NOT mention FDA yet
- ✅ Pediatric PAH · terminated trial · 2021 verdict`,
    `→ The decision that remained after efficacy stopped carrying the answer.`
  ),

  'cs1-decision': note(
    `So the efficacy path stopped. The decision was still a ==pediatric dose label without a carrying efficacy trial==.

Three actions: force another efficacy design, accept an exposure bridge, or abandon. We take the middle path.

If wrong: under-treat progressive rare disease — or expose children without a defendable bridge.`,
    `- ⏱ ~70 sec — decision first, then actions, then stakes
- 👆 Point "Chosen" on Accept the bridge
- ⚠ Do not say "the trial failed"
- ✅ Land on exposure matching as the live question`,
    `→ Why raw data could not answer efficacy — and the hypothesis that makes a bridge possible.`
  ),

  'cs1-reality': note(
    `That question sat on an asymmetric evidence base. ==Three hundred eighty adults== anchored exposure. ==Thirty-nine PK-evaluable children== — open-label, no placebo, sparse doses — could not power efficacy.

Say it once: ==untrialable efficacy — not missing diligence==.

Two readings of the same data. Working: exposure matching is decision-grade given disease similarity. Competing: pediatric response biology makes the bridge false comfort. The hinge is ==disease similarity==.`,
    `- ⏱ ~2 min — numerals first, then the two hypotheses
- 👆 380 vs 39 as visual weight
- ✅ Land on the hinge before methods`,
    `→ Given that hinge, here is the strategy we chose — and what we refused.`,
    `- Mechanism backup if asked what ambrisentan does`
  ),

  'cs1-strategy': note(
    `If the decision language is exposure matching, architecture follows that decision.

Four moves: weight-aware PopPK, adult AUCss as target, cautious E-R knowing dose-range limits, totality package for agencies — not a software demo.

Credibility also starts with paths we refused: rescue a classical efficacy trial; over-parameterize covariates on thirty-nine; claim a crisp pediatric E-R the dose range cannot support.`,
    `- ⏱ ~2.5 min — steps once, then "Refused" strip
- ⚠ Do not open a covariate hunting expedition
- ✅ Land on "named uncertainty, not theater efficacy"`,
    `→ Did exposures land where the decision needed them — and what would have killed confidence?`,
    `- Full covariate table: backup B17`
  ),

  'cs1-credibility': note(
    `Smallest set that changes trust. After weight accounting, pediatric AUCss sat ==minus three percent== at the low dose and about ==plus zero point three percent== at the high dose — both inside the adult band.

So what for the dose: the adult band remains usable. A null E-R does not refute the dose.

Then the kill tests. Systematic miss — no. Allometry flipping the band — key sensitivity; we kept fixed exponents. Safety at matched exposure — no kill signal. Disease similarity — still the ==named hinge==.`,
    `- ⏱ ~2.5–3 min — concordance first, kill grid second
- 👆 Point −3% on the band, then the hinge card
- ✅ Land on "survived the tests that could end the bridge"`,
    `→ Surviving those tests still leaves an A-versus-B boundary.`
  ),

  'cs1-boundary': note(
    `Make the boundary visible.

==Action A — proceed:== exposures in band with acceptable safety → recommend weight-based dosing for the agency package.

==Action B — redesign:== systematic miss or unmanageable safety → change dose, add data, or refuse the bridge.

The flipping assumption is disease similarity / exposure-target validity. We landed in Action A — and the package said so in exposure language.`,
    `- ⏱ ~2 min — A then B; name the flip once
- ✅ Land on "we landed in Action A"`,
    `→ Landing in A is not automatic influence — who moved, and what agencies did.`
  ),

  'cs1-landing': note(
    `The model did not just fit. It moved the decision frame.

Clinical stopped treating "no powered efficacy" as a dead end. Regulatory accepted exposure matching as primary dose language. Quantitative owned the kill criteria and the uncertainty we would not hide.

Exact outcome, stated plainly: ==EMA== and ==PMDA== accepted. ==FDA== remains an honest gap. Win where the package landed — do not rewrite the agency that did not.`,
    `- ⏱ ~2–2.5 min — partners, then three agencies
- 🎚 Calm on FDA — disclose and move on
- ✅ Land on "honest gap"`,
    `→ Portable lesson — and the seam into India.`,
    `- FDA non-filing if asked: commercial/split-rights framing, not scientific rejection`
  ),

  'cs1-lesson': note(
    `When the trial cannot answer, make the exposure target the decision language.

I would not claim pediatric PAH is a T-cell engager. The transferable principle is to define the ==evidence threshold for the next action== when a clean efficacy experiment is unavailable — step-up, schedule, expansion under sparse or ethically constrained learning.

Seam to India: this case was ==interpolation== inside a shared adult–pediatric frame. The next case removes the anchor — ==transport== across a missing local population. Harder claim. Different kill test.`,
    `- ⏱ ~80 sec — lesson, transfer, seam — do not open India methods
- ✅ Land on "interpolation → transport"`,
    `→ End of Case 01. Next (when merged): Ivosidenib / India.`,
    `- Do not preview CDSCO outcome`
  ),

  'cs1-mechanism': note(
    `Backup — pathway if asked. Ambrisentan blocks ETA with high selectivity. This case lives on the endothelin arm; adult AUC is what we match.`,
    `- Volunteer only if asked`,
    `→ Return to the live spine.`
  ),

  'cs1-B17-covariate-analysis': note(
    `Backup — covariate / allometry depth if challenged. Adult structure anchored; allometry fixed; stringent deletion. Weight-only was the defense.`,
    `- Optional backup`,
    `→ Return to the live spine.`
  ),
};

export default notes;
