/**
 * Speaker notes — CS1 Ambrisentan case deck (v7-Claude).
 *
 * Contract from .cursor/skills/deck-slide-iterate/references/spoken-flow.md:
 *   every `spoken` block OPENS by resolving what was just said (arrival line)
 *   and CLOSES on the phrase the next slide picks up (departure line).
 *   Read end to end, the twelve blocks are one continuous talk.
 *
 * `==highlight==` marks the phrase to land. Cue glyphs:
 *   ⏱ time · 🎚 tone · 👆 point · ⚠ warn · ✅ must land
 */

const note = (spoken: string, cues: string, bridge: string, offSlide?: string) => {
  const off = offSlide ? `\n\n## Off-slide (if asked — not on screen)\n${offSlide}` : '';
  return `## Spoken
${spoken}

## Cues
${cues}

## Bridge
${bridge}${off}`;
};

const notes: Record<string, string> = {
  'cs1-divider': note(
    `Let me start with the case that best shows how I work when the evidence cannot be produced the normal way.

Ambrisentan, in **==pediatric pulmonary arterial hypertension==**. Thirty-nine children. A Phase IIb that stopped. Two agency approvals at the end of it.

I am going to spend about sixteen minutes here, because this is the case where the technical judgment and the consequence are tightest together.`,
    `- ⏱ 20 sec — this is a reset beat, not a slide to explain
- 🎚 Calm and declarative; do not rush into the science
- ✅ Land on "two agency approvals" and pause`,
    `→ First the decision itself — what had to be decided, and what being wrong would have cost.`
  ),

  'cs1-decision': note(
    `So — what actually had to be decided.

The team had to determine **==at what dose, if any, ambrisentan could be labeled in children==** — ages eight to under eighteen — after the Phase IIb efficacy path stopped carrying the answer.

There were three options and only one of them was deliverable. Force another efficacy design, which ethics and feasibility had already closed off. Accept a modeling and simulation bridge. Or abandon the pediatric path and leave the population without a labeled option.

And the cost of getting it wrong runs both directions. Too little exposure and you are under-treating a progressive disease in children. Too much, without a defence, and you have exposed them for nothing.

The question was never whether the model was elegant. It was whether ==an exposure argument could carry a label that an efficacy trial no longer could==.`,
    `- ⏱ 70 sec — three panels, left to right, one sentence each
- 👆 Point at each panel as you name it; do not read them
- 🎚 Land "under-treating a progressive disease in children" plainly, no drama
- ✅ Close on "carry a label that an efficacy trial no longer could"`,
    `→ Next: why the data we had could not answer that directly.`,
    `- If asked why Phase IIb stopped: enrollment disruption in a rare population — public framing only, no internal detail`
  ),

  'cs1-data-reality': note(
    `To see why that was hard, look at the shape of the evidence.

On one side, **==three hundred and eighty adults==** across six studies — mature pharmacokinetics, a known safety profile, and an established therapeutic exposure range.

On the other, **==thirty-nine PK-evaluable children==**. Open-label. No placebo comparator. And a narrow range of achieved doses.

Three things followed from that. The efficacy path was terminated mid-study, so endpoint-powered pediatric efficacy was never going to exist. There were too few dose levels to identify an exposure–response relationship. And re-randomising children onto a comparator in a progressive disease was not an ethical option.

I want to be precise about what that means. This is ==untrialable efficacy, not missing diligence== — and it is the reason the exposure question became the decision question.`,
    `- ⏱ 90 sec — the two stats first (left, then right), then the three constraints
- 👆 380 on the left is what we bridge FROM; 39 on the right is what we bridge TO
- ⚠ Say the constraint sentence once. Do not relitigate it later in the case
- ✅ Land on "untrialable efficacy, not missing diligence"`,
    `→ Which raises the question I actually had to answer: is exposure matching even a legitimate move here?`
  ),

  'cs1-hypotheses': note(
    `Because exposure matching is only legitimate if the biology cooperates. And that was a genuine question, not a formality.

The working hypothesis was that pediatric and adult PAH share enough disease and exposure–effect structure that **==matching the adult therapeutic range, with weight accounted for, answers the dose==**.

The competing hypothesis — and I took it seriously — is that pediatric disease course or receptor-level response differs enough that identical exposure does not buy identical benefit. In which case the bridge fails quietly, and you do not find out from the model.

What would separate them: predictive performance against the adult model, whether weight alone explains the pediatric exposures, whether the safety profile stays consistent across the achieved range, and — candidly — whether the agencies would accept disease similarity as a premise rather than as a conclusion.

I want to be explicit about this. ==Disease similarity was an assumption, not a finding.== It is the single assumption that, if wrong, invalidates the recommendation.`,
    `- ⏱ 80 sec — working hypothesis left, competing right, separator below
- 🎚 Say "I took it seriously" like you mean it — this is the credibility beat
- ⚠ Do NOT defend the assumption here; naming it is the move
- ✅ Land on "an assumption, not a finding"`,
    `→ With the hypothesis stated, the model architecture stops being a preference and starts being a consequence.`
  ),

  'cs1-strategy': note(
    `So the architecture follows from the decision, not from taste.

The decision the model has to serve is narrow: **==do pediatric exposures at a weight-based dose land inside the adult therapeutic range?==** That is a question about steady-state exposure. It is not a question about an endpoint.

Once you state it that way, three things follow. Weight goes into the structural model, because weight is what the dose is actually delivered on. The output is steady-state exposure against the adult reference range, weight band by weight band — because that is the comparison the agencies will run. And exposure–response gets explored but not overclaimed, because with a narrow achieved dose range, a slope was never going to be identifiable.

That last one matters more than it looks. Reporting a crisp exposure–response would have been the weakest part of the package. ==No clear exposure–response is not the same as no dose rationale== — and conflating the two is how a bridge loses a reviewer.`,
    `- ⏱ 100 sec — decision panel on the LEFT first, then the three numbered choices
- 👆 Read the decision aloud, then say "and that forced three things"
- ⚠ Resist naming software. Nobody asked what we ran it in
- ✅ Land on "no clear E-R is not the same as no dose rationale"`,
    `→ Before the result, what we chose not to do — because the alternatives are where the judgment lives.`,
    `- If pressed on structure: compartmental with absorption features, allometric weight scaling — full parameter table in backup
- If asked why not Bayesian borrowing: harder to pre-specify and defend than an explicit exposure-matching argument`
  ),

  'cs1-alternatives': note(
    `There was more than one way to bridge to a pediatric label, and the two agencies took different routes.

The path this program pursued was **==exposure matching==** — pharmacokinetic bridging to the adult therapeutic range, which is the architecture EMA and PMDA accepted.

The alternative on screen is quantitative bridging through a hemodynamic-to-functional relationship — the Garnett-Florian style framework, built across many trials and patients, that FDA has used elsewhere. It is a legitimate route. It was not available to us: the hemodynamic substudy here was far too small to anchor that kind of model.

Naming that matters. ==We did not choose exposure matching because it was the only idea. We chose it because it was the only one this dataset could support== — and I would rather say that out loud than have someone find it.`,
    `- ⏱ 70 sec — left column is our path, right is the alternative
- 🎚 Confident, not defensive. This slide buys credibility
- ⚠ Do not overclaim familiarity with the FDA framework — describe it accurately and move
- ✅ Land on "the only one this dataset could support"`,
    `→ So: did the exposure matching actually hold?`,
    `- Garnett-Florian detail (NDA 209279, slope, BREATHE-3 application) is in backup — only open it if genuinely asked`
  ),

  'cs1-concordance': note(
    `It did.

Once weight was accounted for, **==pediatric steady-state exposures landed inside the adult therapeutic band==** — the two distributions overlap almost completely, and the numerals on screen are how close.

I want to be careful about what this figure is and is not. The numerals are from the published analysis. The density curves are illustrative — they show the qualitative overlap, they are not digitised from the paper.

And the overlap *is* the argument. Not the fit statistics, not the diagnostics. The claim the package makes is simply this: children on weight-based dosing sit where adults sit, and adults at that exposure have a known benefit-risk profile.`,
    `- ⏱ 100 sec — hero numerals first, then the density overlay
- ⚠ State the illustrative-curve caveat ONCE, unprompted. Bart Burington will respect it
- 🎚 Slow down here — this is the payoff of eight minutes of setup
- ✅ Land on "children sit where adults sit"`,
    `→ Which is the moment to ask what would have made me reject this.`,
    `- Cmax, the 35–<50 kg subgroup, and the hemodynamic substudy are all in backup
- Source: Okour M et al. J Clin Pharmacol 2023;63(5):593–603`
  ),

  'cs1-falsification': note(
    `Because a result that could not have come out differently is not evidence.

So here are the four checks, and for each one, what failure would have looked like.

Predictive check against observed exposures — failure would be systematic bias in a weight band, the model predicting one thing and children doing another. We did not see structural misfit.

The weight and allometry assumption — failure would be exposures drifting with size even after scaling, meaning weight was not the operative covariate. Weight-based dosing held.

Concordance with the adult range — failure would be pediatric exposure sitting materially above or below the band. You have just seen the overlap.

And safety across the achieved exposures — failure would be a dose-related signal the adult experience did not predict. Nothing contradicted the adult profile.

None of these were guaranteed in advance. ==If the concordance had failed, the honest answer was to redesign the dose== — not to soften the claim until the package survived.`,
    `- ⏱ 80 sec — read across each row: check → failure → what we saw
- 👆 Point at the amber column header once; it is the column that matters
- 🎚 This is the slide Peter Morcos is listening to. Be precise, not fast
- ✅ Land on "redesign the dose, not soften the claim"`,
    `→ All of which is only useful if the team agreed in advance what would count.`
  ),

  'cs1-boundary': note(
    `And we did. This is the part I would want you to take from the case.

The boundary was set before the result was in. **==If pediatric exposures land within the adult therapeutic range, with a safety narrative that holds — we recommend weight-based dosing in the agency package.==** If they sit systematically outside it, or a safety signal appears that adult experience does not explain — we redesign the dose, add data, or decline to claim the bridge.

Two branches. Agreed in advance. Which is what made the eventual recommendation a decision rather than an interpretation of a result we already had.

And underneath both branches sits one assumption: disease similarity. Every other input could move within its uncertainty without changing the action. If that one is wrong, the left-hand branch is wrong no matter how well the model fits.

The part that transfers is not the dose. It is this: ==decide what result would change the action, before you have the result.==`,
    `- ⏱ 90 sec — branch A left, branch B right, then the assumption below
- 🎚 Slow, deliberate. This is the Senior Director beat of the case
- ⚠ Do not skip branch B. A boundary with only one branch is not a boundary
- ✅ Land on "decide what result would change the action, before you have the result"`,
    `→ Getting a team to agree that in advance is its own piece of work.`
  ),

  'cs1-influence': note(
    `Because the analysis did not align anyone by itself.

The hardest conversation in this program was not technical. It was that a terminated efficacy trial reads, to a lot of people, as a weak package — and the position I had to hold was that the pharmacokinetic bridge was not the fallback, it was **==the ethically correct path==**, and the one the regulators could actually evaluate.

My own role was the quantitative strategy, the model, and the interpretation that went into the agency narrative. Clinical owned disease context, regulatory owned the submission pathway, biometrics kept me honest on what the data established versus what the model inferred.

And I said it differently to different rooms. To modelers: diagnostics, weight scaling, what was not identifiable. To executives and to the agencies: one exposure target, one comparison, one recommendation. ==Same evidence, two registers== — and being fluent in both is most of the job.`,
    `- ⏱ 100 sec — your role, then the tension, then the dual register
- 🎚 First person. "I" not "we" when describing what you owned
- ⚠ Do not name individuals or internal forums
- ✅ Land on "same evidence, two registers"`,
    `→ What that alignment produced.`
  ),

  'cs1-outcome': note(
    `Concretely, this.

A **==pediatric indication from EMA==**, ages eight to under eighteen, with weight-based dosing supported by the clinical pharmacology package. A **==PMDA path==** supported by the same population PK and exposure comparison materials. And a peer-reviewed publication, so the methodology is public and citable rather than internal.

I want to be proactive about FDA, because someone will ask. FDA never received this package. That was a **==split-rights commercial outcome, not a regulatory rejection of the science==**. The US label still states that safety and effectiveness in pediatric patients have not been established, and as of today there is no formal FDA pediatric indication.

I would rather tell you that than have you find it.`,
    `- ⏱ 80 sec — EMA, then PMDA, then the FDA caveat
- 🎚 State the FDA gap calmly and move on. Do NOT sound defensive
- ⚠ No invented percentages or improvement metrics. Ever
- ✅ Land on "no formal FDA pediatric indication" and stop`,
    `→ So what travels beyond ambrisentan?`
  ),

  'cs1-lesson-bridge': note(
    `Three things.

What worked was making the exposure target the shared language. Clinical, regulatory and biometrics could argue about **==one number==** instead of about three different mental models of the same problem.

What I would do differently is pre-specify what would falsify the bridge earlier, and in writing, with biometrics — so the disease-similarity assumption is on the record before the data arrive rather than after.

And what transfers is the move itself: define the evidence threshold for the next action when a clean experiment is unavailable. That is the shape of a step-up decision, a schedule decision, an expansion-cohort decision.

Now — this case bridged **==within==** a shared evidence base. Same drug, adjacent population, and the anchor was visible to the regulator. That is interpolation, and it is the easier version of the problem.

==The next case removes the anchor.== A drug approved in forty-two countries, with no data at all in the population the regulator was asking about. The question stops being *can we interpolate* and becomes *can we justify transporting the whole package* — and whether a clinical pharmacology dossier can do the job a local trial normally does.`,
    `- ⏱ 70 sec — three lessons left to right, then the bridge ribbon
- 🎚 Shift register on "Now —"; the case is over, the seam has started
- ⚠ Do NOT preview the CDSCO outcome. Set the harder problem, then stop
- ✅ Land on "the job a local trial normally does"`,
    `→ Case 02 divider — Ivosidenib in India.`,
    `- Seam wording is identical to Xencor/story-flows/01-CS1-Ambrisentan-Story-Flow.md § Transition out — keep them in sync if either changes`
  ),
};

export default notes;
