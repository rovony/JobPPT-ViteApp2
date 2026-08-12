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

export const overrideNotes: Record<string, string> = {
  title: note(
    `Good morning, everyone — thank you for the time, and for the range of backgrounds in the room.

I am Malek Okour. I have built my career around quantitative decisions — dose, design, and regulatory strategy.

Especially ==when the clean experiment is unavailable==.

Today: four decisions. Four different reasons the obvious study could not be run. One discipline that makes the answer defensible.

**==Quantitative decisions when the clean experiment is unavailable.==**`,
    `- ⏱ ~45–60 sec — calm greeting; land the thesis; do not catalog drugs here
- 🎚 Preview narrative jobs, not constraints or methods
- ⚠ what-you-will-see names the four cases; this slide only owns the open
- ✅ Land on the thesis sentence before advancing`,
    `→ The hook: decisions, not models — Define · Challenge · Test · Act.`,
    `- Cover is minimal by design (no case cards). If asked for the four cases early:
  - **1 Ambrisentan:** exposure-matched pediatric dose when efficacy cannot carry the label
  - **2 Ivosidenib India:** convergent evidence across a missing local package
  - **3 Asparlas:** precision design when endpoint power is undeliverable
  - **4 Pharazi:** audit-ready AI workflows — personal research, not a product pitch
- Meta: Xencor · August 12, 2026 · ~45 min spoken + Q&A`
  ),

  'hook-A-trial-not-answer': note(
    `**==My work has been a sequence of decisions, not a sequence of models.==**

The method changed every time. The order did not.

==Define== — name the decision and the cost of being wrong.

==Challenge== — state the competing explanation and the failure condition.

==Test== — choose the evidence architecture the data can support.

==Act== — take the pre-agreed branch, and retain the limitation.

**==Same order. Different methods. Every case.==**`,
    `- ⏱ 75 sec — pause after the thesis; one beat per step
- 🧷 Verbal-lock: Define · Challenge · Test · Act
- ⚠ Do NOT name drugs here — drugs come next
- ✅ Land on "the order did not"`,
    `→ Operating lens — how that order actually runs.`
  ),

  'operating-lens': note(
    `That four-step order is the verbal lock. Here is how it runs when the stakes are real.

**==The method follows the decision and the risk — never the reverse.==**

Start with the decision and the cost of being wrong.

That cost sets the evidence threshold — written down before anyone sees an answer.

Then choose the least complex model that can clear that threshold. Try to break it.

Align the team on the action, not on the model. Leave a standard so the next decision costs less.

Three principles I will keep returning to: complexity is a cost, not a credential; the threshold goes first; uncertainty is not the enemy — bound the uncertainty that moves the decision.`,
    `- ⏱ ~90 sec — walk the flow left→right / top→bottom; do not recite every box
- 🧷 Differentiator vs hook: threshold-before-result · falsify · leave a standard · feedback loop
- ⚠ Do NOT say Senior Director; do not invent numbers
- ✅ Land on "the standard changes what the next decision costs"`,
    `→ What you will see — four cases, four constraints.`
  ),

  'what-you-will-see': note(
    `**==Four cases, four different reasons the obvious study could not answer.==**

Case one — Ambrisentan, fifteen to seventeen minutes — untrialable pediatric PAH; bridging within a shared base.

Case two — Ivosidenib in India, eleven minutes — local-evidence gap; bridging across a missing package.

Case three — Asparlas, seven minutes — sample-limited adult design; change the study before it runs.

Case four — Pharazi, three minutes — unbuilt audit trail; build the system, not just the analysis.

The cases are evidence. The argument is that **==the same discipline carried all four.==**`,
    `- ⏱ 90 sec — one sentence per HUD card; land times once
- 🧷 Order lock: Ambrisentan → India → Asparlas → Pharazi
- ⚠ Do not open methods — constraints and principles only
- ✅ Land on "the same discipline carried all four"`,
    `→ Quick career arc, then Case 01.`
  ),

  'career-arc': note(
    `Quick background before the cases.

I trained as a dentist in Jordan, then completed a PhD at Minnesota with Dr. Brundage in clinical pharmacology and pharmacometrics.

A 2014 internship at QP2 — simulation under uncertainty — is part of why we are here today.

At GSK I led pediatric ambrisentan, which is the first case you will see.

At Servier I worked on oncology, India reliance, and the portfolio breadth that follows the four cases.

The operating question across all of it is simple: **==how do we turn incomplete evidence into a defensible clinical pharmacology decision?==**`,
    `- ⏱ ~75 sec — one sentence per stop on the timeline
- 🎚 Do not linger on awards unless asked; innovation tools are backup/Q&A
- ✅ Land on the operating question`,
    `→ Case 01 divider — ambrisentan.`
  ),

  roadmap: note(
    `Optional backup agenda (not on the live talk path). **==Four cases, unequal depth, one discipline.==**

Ambrisentan fifteen to seventeen minutes. Ivosidenib India eleven. Asparlas seven. Pharazi three.

Then portfolio and the Xencor bridge.

**==Same discipline. Unequal depth by design.==**`,
    `- Hidden from main deck — deep-link or backup nav only
- 🧷 Same order lock as what-you-will-see
- ✅ Do not volunteer live; cases already previewed on what-you-will-see`,
    `→ Return to Case 01 divider — ambrisentan.`,
    `- Each case opens with a **divider beat** then a **setup slide** before numbers or quotes`
  ),

  'cs1-divider': note(
    `First case: ambrisentan in pediatric pulmonary arterial hypertension.

The Phase IIb program stopped early.

But an ==exposure bridge still supported EMA and PMDA pediatric approval in 2021==.

This is a twenty-second reset. I will name the case and the verdict — not the methods yet.`,
    `- ⏱ 20 sec — quick case opener
- 🎚 Plain and factual; do not sound dramatic
- ⚠ Do NOT mention FDA yet — save the caveat for cs1-outcome
- ✅ Land on pediatric PAH, terminated trial, 2021 verdict`,
    `→ The next slide orients the room: the decision, the stakes, and 380 vs 39.`,
    `- Divider meta on screen: ETA antagonist · ages 8–17 · EMA + PMDA — expanded on cs1-question before 380/39`
  ),

  'cs1-question': note(
    `The efficacy path failed — and the team still had to defend a pediatric dose.

The decision: whether, and at what dose, ambrisentan can be labeled for ages ==eight to under eighteen==.

Wrong exposure under-treats progressive disease — or exposes children without a defendable bridge.

The asymmetry is the stake: ==three hundred eighty adults== with mature PK and safety versus ==thirty-nine pediatric patients== — open-label PK, no placebo arm.

Competing actions were force another efficacy design, accept an M&S exposure bridge, or abandon the pediatric path.

**==This is a dose-defense story — not a repeat-efficacy trial.==**`,
    `- ⏱ ~75 sec — decision and cost first, then 380 vs 39, then callout
- 👆 Point Adult Anchor → Pediatric Data → Decision / Cost panels → full-width callout
- ⚠ Do NOT say "the trial failed" as the opener word — efficacy path failed / terminated
- ✅ Land on dose-defense`,
    `→ Evidence gap next — why thirty-nine children could test an adult model, not rebuild one.`,
    `- Disease depth (backup \`cs1-context\`) only if asked`
  ),

  'cs1-evidence-gap': note(
    `This was not diligence failure. It was ==structural impossibility==.

Three hundred eighty adults build the structural model. Thirty-nine children test transportability.

Efficacy is closed — the trial terminated mid-study.

Five constraints close the loop: enrolment, ethics, endpoint, STARTS-1 precedent, and program termination.

**==Thirty-nine children could test an adult model — not rebuild one.==**`,
    `- ⏱ ~90 sec — flow left to right, then constraint cards
- ⚠ Do not teach full PAH 101 here
- ✅ Land on structural impossibility`,
    `→ Competing hypotheses — written before anyone sees the answer.`
  ),

  'cs1-hypotheses': note(
    `The bridge is allowed only if shared exposure implies shared benefit.

Working hypothesis: disease and exposure–effect are similar enough that matching adult therapeutic exposure is decision-grade for pediatric dose.

Competing hypothesis: pediatric PAH biology differs enough that the same AUCss is false comfort.

**==Disease similarity is written down before the answer — not discovered after.==**`,
    `- ⏱ ~60 sec — working card, competing card, assumption strip
- ✅ Land on the fragile assumption`,
    `→ Strategy — how three hundred eighty adults build and thirty-nine children confirm.`
  ),

  'cs1-context': note(
    `You just saw the adult–pediatric asymmetry. Here is quick PAH 101 so the bridge lands.

Pulmonary arterial hypertension is small-vessel lung disease that kills through ==right-heart failure==.

The lumen narrows, pulmonary vascular resistance rises, and the right ventricle fails against a higher-resistance circuit.

For hemodynamic definition: mean pulmonary arterial pressure at least twenty, pulmonary vascular resistance at least two Wood units, and pulmonary artery wedge pressure at most fifteen — that is WHO Group 1 pre-capillary disease.

For this case, ==endothelin== drives vasoconstriction and proliferation. Ambrisentan blocks ETA on that pathway.`,
    `- ⏱ 45 sec — disease setup, not a lecture
- 🎚 Bridge verbally: "You saw the asymmetry — here is the disease"
- ⚠ Dana Point mPAP ≥25 only if asked
- ✅ Land on right-heart failure and the endothelin link`,
    `→ Mechanism next — why ETA selectivity matters for this dose bridge.`,
    `- Slide eyebrow says "Disease foundation" — cs1-mechanism follows without repeating PAH 101`
  ),

  'cs1-mechanism': note(
    `You have seen the disease context. This slide answers one question only: why is ambrisentan the right pharmacologic tool for an endothelin-pathway dose bridge?

This is not a lecture on all PAH pathways.

The headline mentions three pathways because PAH is multimodal. I am not going to teach prostacyclin or the nitric-oxide pathway here.

**==This case lives entirely on the endothelin arm.==**

Ambrisentan blocks ETA with ==greater than four-thousand-to-one selectivity over ETB==.

That matters because we block the constrictor arm without shutting off the dilator and clearance arm that ETB supports through nitric oxide.

I will land here: **==The other PAH pathways are context. This case is the endothelin-pathway dose bridge.==**`,
    `- ⏱ 35 sec — selectivity payoff only; do not narrate the animation beat-by-beat
- 🎚 Slow on ETA vs ETB; say ">4000:1" once, then move on
- 👆 Point left vessel → center "+ ambrisentan" → right open lumen → bottom card
- ⚠ Do not teach dual-ERA class pharmacology; backup \`cs1-history\` owns three-pathway timeline
- ✅ Recovery: "Same pathway, same drug — adult exposure defines the pediatric dose target"`,
    `→ Next I will place the program in time — AMB112529 and the long pediatric arc before we build the PopPK bridge.`,
    `- **ETB / NO** (if probed): ETB mediates vasodilation and ET-1 clearance; non-selective ERAs block both
- **Comparator ratios:** Macitentan ≈50:1, Bosentan ≈20:1 — landscape only, not registration argument
- **Three-pathway depth:** backup \`cs1-backup-timeline-context\` or \`cs1-history\` if they want field history`
  ),

  'cs1-trial': note(
    `Pediatric PAH moved more slowly than adult PAH.

By the mid-2010s the adult field had multiple pathway approvals, but pediatric PAH had fewer precedents and much smaller trials.

The key pediatric precedent was bosentan in 2009 with FUTURE-1: adult efficacy as the anchor, pediatric pharmacokinetics as the bridge.

Ambrisentan took ==eight years== from adult approval to a pediatric label.

Enrollment was held in 2013. The study was terminated in 2019 at forty-one of sixty-six enrolled.

EMA and PMDA still approved the pediatric label in ==2021==.

The dashed arc on the timeline is the story: **==held, terminated, then approved==**.`,
    `- ⏱ 50 sec — walk the timeline left to right; calm on "eight years"
- ⚠ Do NOT say "the trial failed" — say terminated / held / approved
- ✅ Land on held → terminated → 2021 approval`,
    `→ The next slide names why a pediatric efficacy trial was not realistic — five constraints that closed that path.`,
    `- **FUTURE-1 detail** (if asked): N=36 children, ages 3–17; exposure ~54% of adult target yet EMA accepted formulation — architecture precedent
- **Pronunciation** (only if you use these names): macitentan; sotatercept`
  ),

  'cs1-architecture': note(
    `Optional backup — live beat is \`cs1-evidence-gap\`. Adult evidence existed, but the pediatric efficacy-trial path did not.

Five constraints closed that path: enrollment, pooling, control-arm ethics, endpoint, and STARTS-1 precedent.

The question was not "Can we repeat ARIES in children?"

The question was: **==how do we defend a pediatric dose under these constraints?==**`,
    `- ⏱ 55 sec if used in Q&A — five constraint beats; say each plainly
- 🎚 Senior judgment tone, not drama
- ✅ Land on the dose-defense question`,
    `→ Before I show the PopPK build, I will name three methodological guardrails — how we handled covariates and allometry.`,
    `- **STARTS-1** (if probed): sildenafil pediatric program — endpoint miss despite large N reinforces feasibility constraint
- **ARIES** = adult ambrisentan efficacy anchor for this argument`
  ),

  'cs1-covariate-strategy': note(
    `Before showing the model fit, I want to name the three design decisions that made the model defensible to regulators.

First, we anchored on adults. The adult evidence base carried the structural model; the thirty-nine pediatric patients tested whether that structure still held.

Second, we constrained the biology. Allometric scaling was fixed — clearance exponent 0.75, volume exponent 1.0 — rather than estimated from thirty-nine children.

Third, we stayed parsimonious. Covariates entered in a full model, and the deletion gate was ==p less than 0.001==, not 0.05.

The final weight-only model was not an omission. It was the defense: **==anchor on adults, constrain the biology, stay parsimonious==**.`,
    `- ⏱ 55 sec — methodological guardrail, not a stats lecture
- 👆 Gesture the three columns: anchor → constrain → parsimonious
- ⚠ Do not read the full covariate table live; backup \`cs1-B17-covariate-analysis\` has detail
- ✅ Land on "anchor, constrain, stay parsimonious"`,
    `→ Now the PopPK build itself — structure, fit, and whether the adult model predicted pediatric data.`,
    `- **12 covariates screened** (if asked): full model first, stringent deletion; only weight retained on CL/V
- **Why p<0.001:** avoid retaining fragile covariates driven by small pediatric N`
  ),

  'cs1-poppk': note(
    `Three hundred eighty adults build the structure. Thirty-nine children confirm transportability.

Anchor: two-compartment PopPK with first-order absorption and lag.

Constraint: fixed biological allometry — clearance exponent 0.75, volume 1.0 — ==deliberately not estimated from thirty-nine children==.

Filter: twelve covariates enter; deletion gate p less than 0.001; ==only weight survives==.

The workflow auto-walks: build → pcVPC → fit → compare → package.

**==Adults build. Children confirm.==**`,
    `- ⏱ ~150 sec — walk the funnel top to bottom, then the five-step strip
- ⚠ Do NOT imply the model was built on 39 patients
- ✅ Land on least-complex credible model`,
    `→ Why exposure matching — and why the hemodynamic bridge was rejected.`,
    `- **pcVPC** and covariate table: backup \`cs1-covariate-strategy\` / \`cs1-B17\` if probed`
  ),

  'cs1-rejected-alt': note(
    `We chose exposure matching in the FUTURE-1 architecture because the alternative bridge had ==N equals five== paired hemodynamics.

Chosen route: adults build structure; children confirm transportability against adult steady-state exposure bands.

Rejected here: Garnett–Florian-style PVR-to-function bridging — our substudy could not carry it.

**==The method was not preferred — it was the only route this dataset could support.==**`,
    `- ⏱ ~60 sec — chosen card then rejected card
- ✅ Land on N=5 as the reject reason`,
    `→ Decision boundary — four results that would have stopped the bridge.`
  ),

  'cs1-boundary': note(
    `Four results would have stopped the bridge — agreed ==before== analysis.

Systematic bias in predictive checks.

Exposures that still drift with body size after allometry.

Pediatric exposure outside the adult band.

An unpredicted dose-related safety signal.

Any of those → redesign, or decline.

**==Declining to claim a bridge is a legitimate scientific output.==**`,
    `- ⏱ ~75 sec — root, then four rows
- ✅ Land on redesign or decline`,
    `→ Result — did pediatric AUC land inside the adult band?`
  ),

  'cs1-pkpd': note(
    `Pediatric AUC landed inside the adult therapeutic band: ==minus three percent== at the low dose and ==plus zero point three percent== at the high dose versus the adult AUCss target.

Cmax is the safety check — it held.

Exposure-response for efficacy is not identifiable at N equals thirty-nine; say that once and move on.

**==AUC carried the dose. Cmax checked safety.==**`,
    `- ⏱ ~90 sec — band first, markers, then honesty line
- 🎚 Cautious verbs; no "flat E-R"
- ✅ Recovery: "AUC carried the dose. Cmax checked safety."`,
    `→ Outcome — what we claimed, what we did not, and who accepted the package.`,
    `- E-R / 6MWD depth: backup \`cs1-B6-6mwd\``
  ),

  'cs1-outcome': note(
    `EMA and PMDA accepted the labeling bridge in 2021. FDA never received the package.

Supported: pediatric ==dose labeling== via exposure matching.

Not claimed: demonstrated pediatric ==efficacy== — the trial that would have carried that claim was structurally closed.

I owned the exposure-matching argument end-to-end — architecture, falsifiers, and claim boundary.`,
    `- ⏱ ~90 sec — supported vs not claimed, then agency triptych
- ⚠ FDA non-filing is geography/commercial — not a scientific rejection
- ✅ Land on dose labeling, not re-proven efficacy`,
    `→ Close — what transfers to the next case.`,
    `- Lesson pins / ICH E11A depth: backup \`cs1-lesson\` / \`cs1-B9-e11a\``
  ),

  'cs1-bracket': note(
    `Here is the chain from adult anchor to pediatric dose in five steps.

Anchor: three hundred eighty adult patients across six pooled studies.

Model: a two-compartment population PK structure with prespecified allometry.

Simulate: AUC by weight band against the adult steady-state AUC target.

Confirm: thirty-nine evaluable pediatric patients, ages eight to under eighteen.

Match: pediatric steady-state AUC was ==minus three percent at the low dose and plus zero point three percent at the high dose== versus the adult target.

The pediatric data did not create the framework. **==They confirmed it.==**`,
    `- ⏱ 45 sec — one breath per step on the bracket graphic
- ⚠ Do NOT say the model was built on 39 patients
- ✅ Land on "pediatric data confirmed the exposure bridge"`,
    `→ Outcome and codification next — what EMA and PMDA did, what ICH E11A later formalized, and the honest FDA caveat.`,
    `- **Match numbers** (if challenged): low dose −3% vs adult AUCss target; high dose +0.3% — backup \`cs1-B18-exposure-matching\``
  ),

  'cs1-lesson': note(
    `EMA and PMDA approved pediatric ambrisentan in 2021. ICH E11A later codified the extrapolation framework in 2024.

EMA approved Volibris for ages eight to seventeen with three weight bands and two dose levels. PMDA followed the same exposure-matching framework.

ICH E11A states that where disease similarity is high, **==exposure matching==** can carry more of the inference.

I want to be proactive about FDA. FDA never received the package — that was a ==split-rights commercial outcome, not a regulatory rejection of the science==.

As of 2026, there is **==no formal FDA pediatric indication==**.

The portable architecture is: **==adult efficacy as anchor, pediatric PK as bridge==**, and totality of evidence for submission.`,
    `- ⏱ 50 sec — pins then FDA caveat once, calmly
- 🎚 Do not sound defensive on FDA — disclose and move on
- ✅ Land on "no formal FDA pediatric indication"`,
    `→ Backup only — live path goes India after CS1 bridge.`,
    `- **EMA/PMDA pins on slide** — point as you name each; do not re-read full label text
- **E11A 2024** = post-hoc codification, not the driver of the 2021 decision`
  ),

  'cs1-bridge': note(
    `**==Pre-agree the threshold for the next action.==**

What transfers is the architecture — not the fitted ambrisentan model.

Adults build; children confirm — only when disease similarity is written down before the answer.

Case one bridged **within** a shared evidence base — same drug, adjacent population, adult data anchoring a pediatric dose.

That is ==interpolation==, and the regulator could see the anchor.

The next case removes the anchor.

Ivosidenib was approved in forty-two countries and had ==no data at all== in the population the regulator was asking about.

The question stops being *can we interpolate* and becomes *can we justify transporting the whole package* — and whether a clinical pharmacology dossier can do the job a local trial normally does.`,
    `- ⏱ ~60 sec — three transfer lines, then interpolation → transport seam
- ⚠ Do NOT preview the CDSCO outcome here
- ✅ Land on "justify transporting the whole package"`,
    `→ Case 02 divider — Ivosidenib · India reliance.`
  ),

  'cs3-ivosidenib-divider': note(
    `Case two is ivosidenib — approved in ==forty-two countries==, but **==not in India==**.

The drug worked globally. The constraint was ==local evidence==.

**==Could a clinical pharmacology dossier do the job a local trial normally does?==**

This is a thirty-second reset. I will not teach IDH biology here — the setup slide carries the decision and the missing local anchor.`,
    `- ⏱ ~30 sec — crisp Case 02 opener
- 🎚 Forty-two approvals vs India gap
- ✅ Land on the dossier question`,
    `→ Setup — SEC request, no local anchor, justified transport.`,
    `- India map hero on divider — morph continues on cs3-reversal; keep pause beat clean`
  ),

  'cs3-setup': note(
    `In December 2024 the SEC asked for a ==PK/PD study in India== before approval.

Under the default framing that request is reasonable.

Against the evidence we already held, it meant ==twelve to eighteen months of delay== that patients with IDH1-mutant AML did not need.

Ivosidenib — Tibsovo — was already approved in more than ==forty-two countries==.

Competing actions were run the local study, abandon the filing, or ==justify why the global package is sufficient==.

Here is what separates this from Case one.

In Case one the regulator could see what we were bridging *to* — adult exposure anchoring a pediatric dose.

**==Here there was no local anchor of any kind==** — no Indian PK/PD dataset, no Indian pivotal site, no India-specific PK publication.

The job was not interpolation. It was ==justifying that the whole package transports==.`,
    `- ⏱ ~85 sec — decision + stakes first, then no-local-anchor distinction
- 👆 Point SEC quote, then the empty local side
- ⚠ Chronology trap: Rule 101 (Aug) before Dec SEC — next slide owns that turn
- ✅ Land on "no local anchor of any kind"`,
    `→ Rule 101 — the door opened; it did not answer the science.`,
    `- Disease biology backups: \`cs3-bg-disease\`, \`cs3-disease\` — do not volunteer unless asked`
  ),

  'cs3-bg-regulatory': note(
    `Chronology first, because it is a trap under questioning.

On ==August 7, 2024== — before the December SEC request — DCGI's **==Rule 101==** order named six reference agencies and waiver categories, including orphan drugs and significant therapeutic advancement.

Ivosidenib fit both.

India's default had been local Phase III expectation. Rule 101 changed the default question from "run a local trial" to "justify why the global package is enough."

**==Rule 101 does not guarantee approval. It opens the door.==**

The scientific answer still had to come from the clinical pharmacology dossier.

Working hypothesis underneath: ethnic sensitivity here is a ==tumor-biology== question — IDH1 is a ==somatic== mutation — not a germline-pharmacogenetic one.

Competing hypothesis: Indian patients differ enough in DME polymorphism, body size, or care setting that local exposure cannot be assumed.`,
    `- ⏱ ~80 sec — August before December; door ≠ answer; somatic once
- ⚠ Emphasize Rule 101 is opportunity, not automatic approval
- ✅ Land on "the scientific answer still had to come from the dossier"`,
    `→ Six convergent pillars — no single pillar wins alone.`,
    `- **Six reference agencies** (if asked): backup \`cs3-B1-cdsco-timeline\``
  ),

  'cs3-pillars': note(
    `The waiver case rested on ==six converging lines of evidence== — not one lucky analysis, and not Rule 101 alone.

One — mechanism: **==somatic IDH1, not an inherited germline variant==**.

Two — pharmacokinetic similarity: pooled PopPK on ==two hundred fifty-three patients==, race not a significant covariate.

Three — exposure-response: ==flat across the observed range== at five hundred milligrams once daily.

Four — intrinsic and extrinsic factors fully characterized, with PBPK-supported DDI labeling.

Five — global regulatory experience across more than thirty jurisdictions.

Six — a ==Phase 4 PK commitment named upfront== to close the residual gap.

**==No single pillar wins alone. Convergence is the case.==**`,
    `- ⏱ ~90 sec — name six pillars distinctly; reject "Rule 101 alone" verbally
- ✅ Land on "Convergence is the case"`,
    `→ Credibility — every pillar was a test we could have failed.`,
    `- **Pillar detail** (if asked): backup \`cs3-B2-six-pillar-package\` · 36-page justification`
  ),

  'cs3-B4-population-evidence': note(
    `The panel question underneath this slide is: how do you know you were not just rationalizing a commercial preference?

So I lead with what would have killed the argument.

IF race had been a significant covariate on clearance — THEN the argument collapses. We tested it — ==not significant==.

IF exposure-response at five hundred milligrams once daily had been steep — THEN modest ethnic differences would have mattered. It was ==flat across the observed range==.

IF DME-polymorphism frequency differences were large enough to shift exposure materially — THEN local PK would have been required. Impact was bounded.

IF the driver had been germline rather than somatic — THEN ethnicity would have been the operative axis. Mechanism confirmed ==somatic==.

**==Every one of these was a test we could have failed.==**

And say the residual gap here: nothing in this package substitutes for observed Indian PK. That is why a Phase 4 commitment is a pillar, not an afterthought.`,
    `- ⏱ ~85 sec — walk IF→THEN rows left to right; somatic viz on the right
- 🎚 Equal weight to "held" and "could have failed"
- ✅ Land on Phase 4 as the gap bound`,
    `→ Outcome — CDSCO authorization without a pre-approval local trial.`
  ),

  'cs3-reversal': note(
    `Decision boundary in one breath: if the pillars converge and the residual gap is bounded by Phase 4, file the waiver.

If any pillar breaks — race covariate significant, steep E-R, unbounded gap — run the local study; the delay is the correct answer.

Here is the public outcome.

**==May 14, 2025: CDSCO marketing authorization in India without a pre-approval local trial.==**

The authorization followed accumulated global evidence and a pharmacology package that made extrapolation ==scientifically defensible — not a political shortcut==.

State the date as fact, not as a boast.`,
    `- ⏱ ~80 sec — boundary first, then May 14 outcome
- 🎚 Calm, not triumphant
- ✅ Land on scientifically defensible extrapolation`,
    `→ Honest accounting — what we shipped and what we did not.`,
    `- **Map morph** may animate from divider — let it land, then speak outcome`
  ),

  'cs3-reckoning': note(
    `**==Clinical pharmacology requires an honest accounting==**, especially when access is urgent.

We shipped a mechanism-first defense, a thirty-six-page justification on six pillars, CDSCO authorization, and a Phase 4 commitment to close the PK gap.

We did not have pre-approval Indian PK/PD data, Indian pivotal trial sites, or an India-specific peer-reviewed PK paper.

Inference rested on the two-hundred-fifty-three-patient PopPK model and the convergent package around it.

**==The dossier was explicit about what remained uncertain==**, and the Phase 4 commitment addressed that uncertainty directly.

Naming the gap bought more credibility than a stronger-sounding claim would have.`,
    `- ⏱ ~80 sec — equal weight to shipped vs gaps
- 🎚 Candor builds credibility with the panel
- ✅ Land on explicit uncertainty plus Phase 4`,
    `→ Leadership — science and pathway as two independent conditions.`
  ),

  'cs3-leadership': note(
    `Both conditions had to hold: the science and the pathway.

On the quantitative pharmacology side, **==I owned the extrapolation argument and scoped the Phase 4 PK/PD commitment==** — translating ICH E5 into PopPK, exposure-response, and PBPK evidence the waiver rested on.

That is the defendable personal claim.

Partner functions owned the second condition.

Regulatory affairs owned the Rule 101 pathway and agency responses. Medical affairs and pharmacovigilance owned post-marketing follow-up. The India affiliate owned in-country execution with SEC and CDSCO.

Quantitative pharmacology answered whether global evidence could extrapolate. Partners answered whether the regulatory pathway could hold.

**==Both had to be true==** for CDSCO to grant the waiver.

I will not invent a private negotiation story beyond that function-level operating model.`,
    `- ⏱ ~90 sec — two bordered columns; function-level language
- ⚠ Do NOT invent personal ownership details beyond QP + Phase 4 scope (TODO(human) still open in story-flow)
- ✅ Land on "Both had to be true"`,
    `→ Close — three principles, then the seam to Asparlas design.`,
    `- **Phase 4 owner:** quantitative pharmacology scoped the PK/PD commitment`
  ),

  'cs3-bridge-recap': note(
    `**==The science was the bridge.==**

Three lessons travel. Mechanism: somatic IDH1 narrowed ethnic sensitivity to tumor biology.

Convergence: no single pillar carried the waiver alone.

Transparency: we named the PK gap and committed to Phase 4 instead of pretending it did not exist.

**==When a local trial is not feasible, a rigorous clinical pharmacology dossier can become the bridge to patient access.==**

The first two cases were both arguments to a regulator about evidence that already existed — one ==interpolating== inside a shared base, one ==transporting== across a missing one.

Neither got to change the study.

The third case is the opposite problem. The study had not been run yet. The design on paper was correct. And it was the design itself that could not be delivered.

So the question moves upstream: not *what can we conclude from the data we have*, but *how much data do we actually need before a regulator will agree.*`,
    `- ⏱ ~55 sec — three principles, then interpolation → transport → design seam
- ✅ Land on design, not dossier`,
    `→ Case 03 divider — Calaspargase pegol · Asparlas.`,
    `- Do not re-teach six pillars — synthesis + seam only`
  ),

  'cs2-asp-divider': note(
    `Case three: calaspargase pegol — Asparlas — adult Philadelphia chromosome-negative ALL.

This is a **==design case, not a dose case==**.

The pediatric label existed since 2018.

The adult question was not scientific doubt — it was ==operational feasibility==.

Could a smaller, precision-anchored design still be defensible to FDA?`,
    `- ⏱ ~30 sec — Case 03 opener; design not dose
- 🎚 Plain and factual
- ✅ Land on "operational feasibility"`,
    `→ Challenge — ninety-four clean, undeliverable.`,
    `- Lymphocyte visual = cell of origin in ALL; methodology comes on fit`
  ),

  'cs2-asp-challenge': note(
    `Inbound seam first: the first two cases argued from evidence that already existed — ==interpolation==, then ==transport==.

This one changes the study before it runs — ==design==.

The team had to decide whether to run an adult study the statistics said needed ==ninety-four== evaluable patients — or find a design a regulator would still accept.

At the observed enrollment rate, the endpoint-powered version pushed the answer out to roughly ==2028==.

Asparlas is pegylated asparaginase in adult Ph-negative ALL. Pediatric label ==2018==; NSAA surrogate already settled at 0.1 U/mL.

**==Ninety-four was mathematically clean and operationally undeliverable.==**

This was not scientific doubt. It was operational feasibility. Most of the information already existed — in children.`,
    `- ⏱ ~75 sec — inbound seam → 94 vs deliverable path → ~2028
- 👆 Point bordered 94 card, then the redesign question
- ✅ Land on "operationally undeliverable"`,
    `→ Strategy — two precedented moves, stacked.`
  ),

  'cs2-asp-strategy': note(
    `I stacked two FDA-precedented moves. The contribution was how we combined them.

Move one — optimal design: **==anchor sample size on PK parameter precision, not endpoint power==**.

The pediatric PopPK prior of one hundred twenty-four patients already carried most of the model. Adults augment; they do not rebuild.

Move two — PopPK-simulated primary: simulate NPAA across virtual patients at the ==same FDA-agreed threshold as the pediatric label==.

The trial validates the model; the model answers the clinical question.

Rejected alternative I own: run ninety-four as designed — correct arithmetic, wrong decision if the trial cannot enrol.

Neither move was novel alone. **==The novelty was composition==** — two accepted precedents first combined in this adult oncology context.`,
    `- ⏱ ~85 sec — MOVE1 / MOVE2 slabs; reject run-94 once
- ⚠ Neither move novel alone; novelty is the stack
- ✅ Land on "composition"`,
    `→ Fit — precision lives in the prior before the agency outcome.`
  ),

  'cs2-asp-fit': note(
    `Credibility before the agency story — or the room hears "FDA said yes" as authority.

At sixty adults the model is as precise as at ninety-four **==for the parameters that drive the dose decision==**.

Because the information lives in the pediatric prior, not the adult sample alone.

Pooled pediatric PopPK: ==one hundred twenty-four patients==, FDA-reviewed and label-supporting.

Adult Part 1 external validation against pediatric-model predictions: ==no structural failure==.

Percent relative standard error, bootstrap prediction-corrected VPC, and cohort-ratio sensitivity were stable above roughly fifty to sixty adults.

**==The smaller sample clarifies where the evidence actually lives.==**`,
    `- ⏱ ~70 sec — prior → Part 1 → plateau → boundary
- ⚠ No waterfall language; bordered plateau / prior craft
- ✅ Land on "where the evidence actually lives"`,
    `→ FDA Type A — 94→60 on the formal record.`,
    `- **Backup depth if Morcos/Burington probe:** design mathematics is a slide away — keep main flow on the decision`
  ),

  'cs2-asp-fda': note(
    `At the FDA Type A meeting on ==July 21, 2023==, the design landed on the formal record.

Enrollment was cut from ==ninety-four to sixty== primary-endpoint-evaluable adults — a ==thirty-six percent reduction==.

Two frameworks had converged on one N and were ==briefed in parallel, not bolted together afterward==.

Pharmacometrics reached sixty via D-optimal design under an informative prior.

Biostatistics reached a compatible N via FDA's own adverse-event detection probability framework at greater than eighty-five percent.

What did not land — say before you are asked: the simulated primary was not accepted as the sole registrational endpoint.

It was repositioned to ==dose confirmation in Cohorts 1 and 2==, conditioned on additional adult PopPK. The sample-size reduction held anyway.

**==I owned the design argument and the agency-facing methodology narrative.==**`,
    `- ⏱ ~75 sec — Type A date → 94→60 → parallel frameworks → honest reposition
- ⚠ Do not imply FDA accepted simulated primary as sole registrational endpoint
- ✅ Land on "36% reduction on the formal record"`,
    `→ Impact — precedent travels; SPARK coda; seam to Pharazi.`
  ),

  'cs2-asp-impact': note(
    `**==The precedent travels further than the program did.==**

Minus thirty-six percent — ninety-four to sixty — thirty-four patients not enrolled under the agreed design.

Regulatory: a citable Type A methodology. Operational: more information per patient. Scientific: two frameworks, one N.

Honest coda: SPARK-ALL later closed at forty-two patients on a ==sponsor portfolio decision, independent of design quality==.

The Type A methodology remains durable.

Transfer line: size the cohort on the precision the next decision needs — not on endpoint power you cannot afford.

Capability seam: all three drug cases end the same way — someone had to reconstruct how a number was produced before they would act on it.

**==The last case asks whether that reconstruction survives when the analysis gets faster than the review.==**`,
    `- ⏱ ~75 sec — −36% → ledger → SPARK coda → Pharazi seam
- ⚠ Portfolio closure ≠ design failure
- ✅ Land on reconstruction / review speed`,
    `→ Case 04 divider — Pharazi · the system, not a drug.`
  ),

  'cs2-asp-bridge': note(
    `Backup only — not on the live talk path. Live seam to Pharazi is spoken on \`cs2-asp-impact\`.

Asparlas shows how a smaller study can still be decision-grade when the design is transparent and the regulator is briefed on the methodology, not just the sample size.`,
    `- Hidden from live path — do not volunteer
- ✅ If deep-linked, return to impact → Pharazi`,
    `→ Case 04 divider — Pharazi.`
  ),

  'cs2-pharazi-divider': note(
    `Case four is the only case that is not about a single drug. It is about **==the system that does the work==**.

Pharazi is ==personal research== into audit-ready clinical pharmacology workflows — not a product pitch, not a sponsor deployment claim.

Say that in the first twenty seconds.

The decision is a capability decision: what do we build, what do we buy, and what do we refuse to automate.`,
    `- ⏱ ~20 sec — "personal research" clearly; no demo tone
- ✅ Land on "system that does the work"`,
    `→ Regulatory floor — four conditions before AI informs a dose.`,
    `- Verdict chip blank by design — architectural case, not an approval story`
  ),

  'cs2-regulatory-floor': note(
    `Cases one through three each depended on a reviewer being able to reconstruct how a number was produced.

Clinical pharmacology can now generate analyses faster than it can explain them.

Standing disclosure: **==personal research, not a sponsor deployment==**.

The decision is not whether to use these tools — it is what has to be true before an accelerated result is allowed to inform a dose.

Four floor conditions: ==traceable inputs==, ==deterministic computation==, ==explicit assumptions==, and a ==named human owner== of the final decision.

Competing hypothesis worth rejecting: model-level explainability is enough. Explaining a prediction is not the same as reconstructing an analysis.

**==Auditability before autonomy.==** Set the floor before adoption pressure arrives.`,
    `- ⏱ ~35 sec — honesty banner → four bordered conditions
- 🎚 Calm systems tone; not a product demo
- ✅ Land on auditability before autonomy`,
    `→ The gap — trusted review is the bottleneck.`
  ),

  'cs2-gap': note(
    `Agents accelerate assembly — plans, tables, comparisons.

What they do not produce by default is ==lineage==: which input, which version, which tool, which assumption produced each result.

The final claim must stay inspectable.

**==The bottleneck is trusted review, not generation.==**`,
    `- ⏱ ~25 sec — speed vs lineage; cut path slide if clock pressure
- ✅ Land on trusted review bottleneck`,
    `→ Working pattern — plan, run, check, record.`
  ),

  'cs2-working-overview': note(
    `Working pattern: ==plan → run → check → record==.

Write the analysis intent first.

Route execution to ==deterministic, replayable tools== — the agent orchestrates; it does not compute.

Compare outputs before synthesis. Leave an audit trail a reviewer can follow without asking what happened off-screen.

Rejected alternative I own: an end-to-end LLM that produces the analysis directly.

Faster to build, impossible to review, and it fails the first three floor conditions.

**==Separation of orchestration from computation is the whole design.==**`,
    `- ⏱ ~40 sec — four steps + rejected end-to-end LLM
- ✅ Land on agents orchestrate, tools compute`,
    `→ PopPK dashboard — the review contract, including failure modes.`
  ),

  'cs2-poppk-dashboard': note(
    `Context of use: assisted review and assembly of clinical pharmacology analyses — **==not autonomous dose recommendation==**.

Comparator: the current manual workflow on the same inputs — deterministic tools produce the identical numbers; what changes is assembly and review time.

Validation: replayability — prototype-level, ==not a validated GxP deployment==.

Failure modes at equal weight: silent input-version drift · confident synthesis over a failed step · reviewer automation bias · assumptions that never enter the record.

When would I not use it? Anywhere a computation is not deterministic, or where no human is willing to own the output.

The reviewer should see assumptions, diagnostics, covariate logic, simulation scenarios, and unresolved questions in one surface.

**==The interface is the review contract.==**`,
    `- ⏱ ~40 sec — context / comparator / validation / failure modes unprompted
- ⚠ Never say production-ready
- ✅ Land on review contract`,
    `→ Close — auditability before autonomy; honesty reprise.`
  ),

  'cs2-publication-close': note(
    `Outcome, bounded: regulatory floor defined · traceable workflow built · working system live at pharazi.ai.

Community at clinpharm.ai; manuscript in preparation.

Same discipline as Case one — **==no black boxes at the decision point==**.

Transfer: I would define the review standard for AI-assisted analysis before the function scales its use, not after.

Again — **==personal research. No sponsor deployment. No validated-system claim.==**`,
    `- ⏱ ~30 sec — status → transfer → honesty reprise; do not oversell
- ✅ Land on "no black boxes"`,
    `→ Cases complete divider — breathe; four-case core done.`
  ),

  'cs4-close-divider': note(
    `That closes the four-case core.

Across four settings the methods changed completely — a pediatric bridge, a regulatory dossier, a trial design, and a workflow architecture.

**==The leadership pattern did not.==** One discipline carried each decision.

I will not re-walk every case. Next we widen to portfolio breadth and the Xencor bridge.`,
    `- ⏱ ~20 sec — pause beat; presentation order once
- ✅ Land on "core proof complete"`,
    `→ Portfolio — breadth across modality, area, and agency.`,
    `- **Ledger one-liners if panel jumps back:**
  - CS01 Ambrisentan: EMA/PMDA pediatric · exposure bridge · FDA never received package
  - CS02 India: CDSCO May 14 2025 · six pillars · Phase 4 PK commitment
  - CS03 Asparlas: Type A N=60 (−36%) · pediatric prior + optimal design stack
  - CS04 Pharazi: auditability before autonomy · personal research`
  ),

  'portfolio-01': note(
    `The four cases are the deep proof points.

This slide widens the aperture to breadth across oncology, biologics, antiviral and infectious disease, respiratory and PAH, and dose-prediction or AI work.

==Without turning the talk into a fifth case study==.

If asked about antibody-drug conjugates, I led and directed strategy in that space.

But **==ADC is breadth only in this Xencor talk==** — not a core case study I will teach today.`,
    `- ⏱ 120 sec — do not walk every cell
- 🎚 Highlight oncology, biologics, antiviral/ID, AI as bridge-relevant
- ✅ Keep ADC as breadth-only honesty guardrail`,
    `→ Company bridge — translate the discipline to Xencor.`,
    `- **Stats strip removed** (say if asked): ==12+ years== clin pharm · ==5+ approvals== · ==6+ agencies== · ==20+ publications== · oncology + biologic + antiviral breadth
- **ADC honesty:** led/directed multi-analyte + FIH dose-projection strategy (BCLxL @ Servier; BCMA contribution @ GSK) — not hands-on every analyte
- **HBV:** co-inventor AU2023213173A1 — combination therapy patent; not direct HDV program ownership
- **Row highlights:** Tibsovo/Onivyde/Asparlas oncology; Sotrovimab biologics; Dectova antiviral; DosePredict/DeepPK/Pharazi AI tools`
  ),

  'company-bridge-divider': note(
    `Now I translate the four-case core to Xencor — using **==public pipeline information only, not confidential program access==**.

Two pillars share one discipline: oncology masked T-cell engagers, and infectious disease HBV and HDV functional cure.

In both, the clinical pharmacology question is **==which exposure metric makes the dose defensible when plasma is not the whole story==**.`,
    `- ⏱ 45 sec — humble, specific; say "public information" if pressed
- ⚠ No claim of VIR-5500 internal access
- ✅ Name both pillars and the shared dose question`,
    `→ Oncology — start with the measurement problem.`
  ),

  'company-bridge-oncology-problem': note(
    `For a masked PRO-XTEN engager, **==plasma concentration is not the same as tumor exposure==**.

Assays may return masked drug, total drug, or active drug depending on the platform.

The decision needs an exposure metric that is ==decision-bearing for safety and for efficacy== — and those may differ.

I would start with three questions. What does the assay actually measure? Where is active drug generated? Which metric should anchor dose selection?

This is ==hypothesis from public information, to be tested with your teams==.`,
    `- ⏱ 80 sec — sound like a translational partner, not an insider
- ⚠ Public information only
- ✅ Land on "decision-bearing exposure metric"`,
    `→ Assay to model to dose — and OBD versus MTD.`
  ),

  'company-bridge-oncology-approach': note(
    `One working chain: **==assay, model, dose, and optimal biological dose==**.

Separate safety and efficacy metrics explicitly.

Cytokine release syndrome risk may follow early peak on active species. Efficacy may need sustained exposure in the tumor compartment.

For T-cell engagers, step-up dosing and bell-shaped pharmacodynamics can make **==optimal biological dose more relevant than maximum tolerated dose==**.

When sampling is limited, the design goal is **==model precision and identifiability — not statistical power alone==**.`,
    `- ⏱ 95 sec — concrete chain; conditional language ("may", "if")
- ✅ Land on precision under sparse sampling`,
    `→ Map the four-case discipline to Xencor decision types.`
  ),

  'company-bridge-case-mapping': note(
    `The diseases are not the same across Xencor's portfolio. **==The decision discipline transfers.==**

When the trial cannot carry the answer — Ambrisentan — you defend target exposure.

When a regulator asks for ==local evidence== — India — you build convergent reliance.

When the powered trial is not feasible — Asparlas — you use model-anchored efficient design.

When review must scale — Pharazi — you preserve traceability.

I am not recapping my CV here. I am naming the **==operating model the four cases already demonstrated==**.`,
    `- ⏱ ~65 sec — presentation order: Ambrisentan → India → Asparlas → Pharazi
- ✅ Land on "operating model, not CV recap"`,
    `→ Infectious disease — dose questions first, credentials second.`
  ),

  'company-bridge-hbv-hdv': note(
    `For HBV and HDV functional cure, I would start with the dose and evidence questions — **==not with my resume==**.

Combination cure turns on interaction risk, biomarker timing, durability, and what evidence must exist before the claim is credible.

That is the clinical pharmacology frame.

I have HBV-adjacent touchpoints — combination patent co-inventor scope, viral monoclonal antibody population and route work, neonatal antiviral simulation experience.

Those inform special-population and route questions. **==They do not constitute direct HDV program leadership==**, and I would not pretend otherwise.

HDV biology belongs with virology and translational. My contribution is structuring the dose question and **==partnering early — learning posture on HDV specifics==**.`,
    `- ⏱ 65 sec — problem first; credentials only as supporting context
- ⚠ Explicit humility: no HDV ownership claim
- ✅ Land on "partner first, not portfolio expert on day one"`,
    `→ How I would start in role — listen, then tighten.`
  ),

  'company-bridge-fit': note(
    `**==I would not arrive with a pre-written org chart.==**

First I would listen: where are assay, model, and dose decisions blocked or ambiguous?

For oncology engagers I would work backward from the filing decision using ==public information only==, and name the exposure metric that must be defensible.

Then I would help build a cross-functional rhythm where assumptions and open questions are visible before they become regulatory risk.

Player-coach where the team needs it — the goal is **==a group that can defend the dose, not a single model owner in a silo==**.`,
    `- ⏱ 90 sec — listen-first posture; no hero narrative
- ✅ Land on "team can defend the dose"`,
    `→ Final synthesis — the common thread.`
  ),

  'closing-thread': note(
    `The common thread is not a method. It is the standard for decision-making **==when measurement falls short==**.

Case one — Ambrisentan — was ==untrialable==.

Case two — Ivosidenib India — was ==locally constrained==.

Case three — Asparlas — was ==sample-limited==.

Case four — Pharazi — was ==workflow-unbuilt==.

In each case, the model or evidence system **==made the dose or decision defensible==**.`,
    `- ⏱ ~60 sec — presentation order: Ambrisentan → India → Asparlas → Pharazi
- ✅ Four constraints, one discipline`,
    `→ Why Xencor — operating model in practice.`
  ),

  'closing-fit': note(
    `For Xencor, the operating model is practical: start from the decision, make the dose defensible, and **==keep expert judgment visible across functions==**.

That is what the four cases demonstrated — and what I would bring to your pipeline if we work together.

**==I am not claiming I already know your internal answers==**.`,
    `- ⏱ 75 sec — Xencor-facing, conditional, not self-congratulatory
- ✅ Land on "visible judgment across functions"`,
    `→ Thank you and Q&A.`
  ),

  'closing-thanks': note(
    `Thank you for the time and the conversation.

I am happy to go deeper on pediatric PopPK, India reliance, Asparlas efficient design, or AI infrastructure — wherever the panel wants to spend the remaining time.`,
    `- ⏱ 30 sec — stop after the invitation
- ✅ Let the four chips guide depth if needed
- 🧠 Open **Reading → Off-slide memory** or slide Q&A if a detail was trimmed from screen`,
    `→ Q&A.`,
    `- **Global honesty guardrails:** no Servier-confidential numbers · no VIR-5500 internal access claim · ADC breadth-only · Pharazi personal research not product transfer · HBV patent narrow scope
- **Depth routing:** CS1 backups \`cs1-backup-*\` · India \`cs3-backup-*\` / B1–B3 · Asparlas design math on demand · CS4 \`ai-backup-master\`
- **One-sentence close:** When measurement falls short, I build the evidence bridge that makes the dose and the decision defensible.`
  ),

  'ai-backup-master': note(
    `This is the backup gateway for extended Pharazi material — architecture diagrams, component workflows, and audit dashboards.

Use it only if the panel asks for technical depth beyond the main Case four spine, then return to the thesis rather than turning the Q&A into a product demo.`,
    `- ⏱ Optional — do not volunteer
- ✅ Return to main thesis if the thread drifts`,
    `→ Return to live discussion or Q&A.`
  ),

  'cs3-backup-master': note(
    `This is the backup gateway for ivosidenib India reliance — CDSCO strategy, Rule 101 detail, and pillar-by-pillar depth.

Use it only if the panel asks for global-to-local regulatory detail beyond the main Case 02 spine, and tie every answer back to convergence of evidence.`,
    `- ⏱ Optional — do not volunteer
- ✅ Tie answers back to convergence of evidence`,
    `→ Return to live discussion or Q&A.`
  ),
};
