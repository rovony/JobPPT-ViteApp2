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

I am Malek Okour. I have built my career around quantitative decisions — dose, design, and regulatory strategy — ==especially when the clean experiment is unavailable==.

Today: four decisions, four different reasons the obvious study could not be run, and one discipline that makes the answer defensible.

**==Quantitative decisions when the clean experiment is unavailable.==**`,
    `- ⏱ ~45–60 sec — calm greeting; land the thesis; do not catalog drugs here
- 🎚 Preview narrative jobs, not constraints or methods
- ⚠ Roadmap names the four cases; this slide only owns the open
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

==Define== — name the decision and the cost of being wrong. ==Challenge== — state the competing explanation and the failure condition. ==Test== — choose the evidence architecture the data can support. ==Act== — take the pre-agreed branch, and retain the limitation.

**==Same order. Different methods. Every case.==**`,
    `- ⏱ 75 sec — pause after the thesis; one beat per step
- 🧷 Verbal-lock: Define · Challenge · Test · Act
- ⚠ Do NOT name drugs here — drugs come next
- ✅ Land on "the order did not"`,
    `→ What you will see — four cases, four constraints.`
  ),

  'what-you-will-see': note(
    `**==Four cases, four different reasons the obvious study could not answer.==**

Case one — Ambrisentan, fifteen to seventeen minutes — untrialable pediatric PAH; bridging within a shared base. Case two — Ivosidenib in India, eleven minutes — local-evidence gap; bridging across a missing package. Case three — Asparlas, seven minutes — sample-limited adult design; change the study before it runs. Case four — Pharazi, three minutes — unbuilt audit trail; build the system, not just the analysis.

The cases are evidence. The argument is that **==the same discipline carried all four.==**`,
    `- ⏱ 90 sec — one sentence per HUD card; land times once
- 🧷 Order lock: Ambrisentan → India → Asparlas → Pharazi
- ⚠ Do not open methods — constraints and principles only
- ✅ Land on "the same discipline carried all four"`,
    `→ Quick career arc, then the compact agenda.`
  ),

  'career-arc': note(
    `Quick background before the cases.

I trained as a dentist in Jordan, then completed a PhD at Minnesota with Dr. Brundage in clinical pharmacology and pharmacometrics. A 2014 internship at QP2 — simulation under uncertainty — is part of why we are here today.

At GSK I led pediatric ambrisentan, which is the first case you will see. At Servier I worked on oncology, India reliance, and the portfolio breadth that follows the four cases.

The operating question across all of it is simple: **==how do we turn incomplete evidence into a defensible clinical pharmacology decision?==**`,
    `- ⏱ 75-90 sec — one sentence per stop on the timeline
- 🎚 Do not linger on awards unless asked; innovation tools are backup/Q&A
- ✅ Land on the operating question`,
    `→ Case agenda next — four cards, one discipline.`
  ),

  roadmap: note(
    `Compact agenda before Case 01: **==four cases, unequal depth, one discipline==**.

Ambrisentan fifteen to seventeen minutes. Ivosidenib India eleven. Asparlas seven. Pharazi three. Then portfolio and the Xencor bridge.

**==Same discipline. Unequal depth by design.==**`,
    `- ⏱ 60–75 sec — quick pass; do not re-argue the principles from slide 03
- 🧷 Same order lock as what-you-will-see
- ✅ Advance into Case 01`,
    `→ Case 01 divider — ambrisentan.`,
    `- Each case opens with a **divider beat** then a **setup slide** before numbers or quotes`
  ),

  'cs1-divider': note(
    `First case: ambrisentan in pediatric pulmonary arterial hypertension.

The Phase IIb program stopped early, but an ==exposure bridge still supported EMA and PMDA pediatric approval in 2021==.

This is a twenty-second reset. I will name the case and the verdict, not the methods yet.`,
    `- ⏱ 20 sec — quick case opener
- 🎚 Plain and factual; do not sound dramatic
- ⚠ Do NOT mention FDA yet — save the caveat for cs1-lesson
- ✅ Land on pediatric PAH, terminated trial, 2021 verdict`,
    `→ The next slide orients the room: the drug, the program status, and the clinical pharmacology question before any numbers.`,
    `- Divider meta on screen: ETA antagonist · ages 8–17 · EMA + PMDA — expanded on cs1-question before 380/39`
  ),

  'cs1-question': note(
    `Before the numbers, I will orient the room.

This is ambrisentan in pediatric PAH. The Phase IIb program was terminated mid-study. What remained was an open-label, PK-anchored pediatric cohort of ==thirty-nine patients==.

The clinical pharmacology question is direct: when the pediatric efficacy trial stops, **==can the pharmacokinetic bridge still support a pediatric dose label?==**

Now the asymmetry. The adult anchor was strong: ==three hundred eighty adults across six studies==. The pediatric dataset was small: ==thirty-nine patients== with no placebo comparator.

At the same time, enrollment was disrupted and dose selection was under scrutiny. So this is a ==dose-defense story==: could ==exposure matching== carry the pediatric label?`,
    `- ⏱ 50–55 sec — setup row first, then question, then 380 vs 39
- 👆 Point at the three orientation chips as you name drug, program status, and ask
- ⚠ Do NOT say "the trial failed"
- 🧠 Do NOT open with "the adult anchor was strong" — orient first`,
    `→ Next is PAH 101 so the panel has disease context before mechanism and PopPK.`,
    `- Disease depth lives on cs1-context — do not teach full PAH physiology on this slide`
  ),

  'cs1-context': note(
    `You just saw the adult–pediatric asymmetry. Here is quick PAH 101 so the bridge lands.

Pulmonary arterial hypertension is small-vessel lung disease that kills through ==right-heart failure==. The lumen narrows, pulmonary vascular resistance rises, and the right ventricle fails against a higher-resistance circuit.

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
    `You have seen the disease context. This slide answers one question only: why is ambrisentan the right pharmacologic tool for an endothelin-pathway dose bridge? This is not a lecture on all PAH pathways.

The headline mentions three pathways because PAH is multimodal, but I am not going to teach prostacyclin or the nitric-oxide pathway here. Those pathways are background. **==This case lives entirely on the endothelin arm.==**

Ambrisentan works on endothelin-1 biology. Endothelin-1 drives vasoconstriction and proliferation mainly through the ETA receptor. Ambrisentan blocks ETA with ==greater than four-thousand-to-one selectivity over ETB==. That matters because we block the constrictor arm without shutting off the dilator and clearance arm that ETB supports through nitric oxide.

On the left side of the graphic, you see a narrow lumen with endothelin docked on ETA and constriction turned on. In the center we add ambrisentan. On the right, ETA is blocked and the lumen opens. That is the pharmacology we are bridging from adults to children.

The card at the bottom compares ambrisentan to macitentan and bosentan for class context only. I will stay on ambrisentan.

For this case, pediatric extrapolation assumes the same target and the same pathway in children. Adult AUC on this ETA-selective drug is what we match, so selectivity is not decorative mechanism-of-action detail. It is the pharmacologic premise for the PK bridge.

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
    `Pediatric PAH moved more slowly than adult PAH. By the mid-2010s the adult field had multiple pathway approvals, but pediatric PAH had fewer precedents and much smaller trials.

The key pediatric precedent was bosentan in 2009 with FUTURE-1: adult efficacy as the anchor, pediatric pharmacokinetics as the bridge. Ambrisentan took ==eight years== from adult approval to a pediatric label.

Enrollment was held in 2013. The study was terminated in 2019 at forty-one of sixty-six enrolled. EMA and PMDA still approved the pediatric label in ==2021==. The dashed arc on the timeline is the story: **==held, terminated, then approved==**.

ICH E11A later gave that logic a formal name, but the clinical pharmacology move was already visible in this program.`,
    `- ⏱ 50 sec — walk the timeline left to right; calm on "eight years"
- ⚠ Do NOT say "the trial failed" — say terminated / held / approved
- ✅ Land on held → terminated → 2021 approval`,
    `→ The next slide names why a pediatric efficacy trial was not realistic — five constraints that closed that path.`,
    `- **FUTURE-1 detail** (if asked): N=36 children, ages 3–17; exposure ~54% of adult target yet EMA accepted formulation — architecture precedent
- **Pronunciation** (only if you use these names): macitentan; sotatercept`
  ),

  'cs1-architecture': note(
    `This is the pivot. Adult evidence existed, but the pediatric efficacy-trial path did not.

ARIES established adult PAH efficacy for ambrisentan. ETA blockade was mechanistically plausible in children, so the clinical task became dose selection — not repeating the adult efficacy trial in pediatrics.

That repeat trial was not realistic for five reasons. Enrollment: rare disease, roughly two to sixteen per million children. Pooling: mixed etiologies in one program. Control arm: ethics were difficult because most patients were already on background PAH therapy. Endpoint: six-minute walk does not transfer cleanly to younger children. Precedent: STARTS-1 enrolled two hundred thirty-five children and still narrowly missed its primary endpoint.

So the question was not "Can we repeat ARIES in children?" The question was: **==how do we defend a pediatric dose under these constraints?==**`,
    `- ⏱ 55 sec — five constraint beats; say each plainly
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
    `The population PK model was two-compartment with first-order absorption and a lag time.

Allometric scaling was fixed a priori: body weight on clearance with exponent 0.75, and on volume with exponent 1.0. We did not estimate those exponents from thirty-nine pediatric patients.

The basic architecture was simple: **==three hundred eighty adult patients build the model, and thirty-nine pediatric patients confirm it==**.

The workflow was adult foundation first, then pediatric confirmation. The prediction-corrected VPC asked whether the adult model predicted the pediatric observations. It did.

The parameter table on screen is the receipt, not the story. The story is parsimony: the **==structure held, weight scaling did the work, and the pediatric data confirmed the bridge==**.`,
    `- ⏱ 65 sec — say "380 build, 39 confirm" with a pause
- ⚠ Do NOT imply the model was built on 39 patients
- ✅ Land on "structure held; pediatric data confirmed"`,
    `→ The next slide asks whether the exposure match sat in a clinically safe and interpretable range — AUC as bridge, Cmax as safety check.`,
    `- **12 prespecified covariates** (if asked): only weight scaled exposure — see prior slide
- **pcVPC** = prediction-corrected visual predictive check against pediatric sparse PK`
  ),

  'cs1-pkpd': note(
    `The model predicted the pediatric data. Now the question is whether the exposure range looked clinically coherent.

On the left, pediatric AUC sits inside the adult target envelope at both dose levels. **==AUC is the bridge==** — that is what we matched for dose labeling.

On the right, Cmax runs higher in children but stays interpretable against adult safety experience. **==Cmax is the safety check==**, not the primary bridge.

I would not overclaim six-minute walk or a strong exposure-response gradient on this slide. The defensible statement is simpler: the observed pharmacokinetics ==did not contradict the exposure bridge==. Exposure-response detail lives in backup if the panel wants it.`,
    `- ⏱ 55 sec — point left panel, then right; do not narrate four charts
- 🎚 Cautious verbs: "no clear gradient," "did not contradict"
- ✅ Recovery: "AUC carried the dose. Cmax checked safety."`,
    `→ The program absorbed three disruptions at once — trial, regulatory, and filing geography — and still had one defensible path.`,
    `- **Removed panels** (backup \`cs1-B6-6mwd\`, E-R scatter): AUC vs 6MWD supportive only — noisy in pediatrics
- **Cmax detail:** ~11–18% higher Cmax,ss vs adult depending on dose band
- **Verbatim guardrail:** "No clear exposure-driven gradient in the observed range" — never say "flat E-R" or "no risk"`
  ),

  'cs1-outcome': note(
    `AMB112529 had three disruptions happening at the same time.

On the trial side, enrollment stopped before a clean efficacy answer, so the pediatric dataset became confirmatory rather than standalone.

On the regulatory side, pediatric PAH dose selection was under scrutiny, so empirical dose escalation alone was not enough.

On the filing side, EMA and PMDA proceeded with the package, but FDA never received it.

Trial interruption, regulatory caution, and filing geography all pointed toward one defensible path: **==exposure matching==**.`,
    `- ⏱ 45 sec — three cards only; one sentence each
- ⚠ Do NOT volunteer HR 3.95, exposure margins, deaths, or rights split unless asked
- ✅ Land on exposure matching as the through-line`,
    `→ Here is the workflow in five steps — from adult anchor to pediatric dose confirmation.`,
    `- **FDA non-filing** (if asked): commercial/split-rights outcome, not a scientific rejection of the bridge
- **Commercial card** on slide = geography of submission, not trial failure`
  ),

  'cs1-bracket': note(
    `Here is the chain from adult anchor to pediatric dose in five steps.

Anchor: three hundred eighty adult patients across six pooled studies, with three thousand one hundred twenty-six pharmacokinetic observations.

Model: a two-compartment population PK structure with prespecified allometry.

Simulate: AUC by weight band against the adult steady-state AUC target.

Confirm: thirty-nine evaluable pediatric patients, two hundred eleven sparse PK observations, ages eight to under eighteen.

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

EMA approved Volibris for ages eight to seventeen with three weight bands and two dose levels. PMDA followed the same exposure-matching framework; GSK Japan announced approval in March 2021.

ICH E11A states that where disease similarity is high, **==exposure matching==** can carry more of the inference. That is the formal name for what this program did.

I want to be proactive about FDA. FDA never received the package — that was a ==split-rights commercial outcome, not a regulatory rejection of the science==. The Letairis label still states that safety and effectiveness in pediatric patients have not been established. As of 2026, there is **==no formal FDA pediatric indication==**.

The portable architecture is: **==adult efficacy as anchor, pediatric PK as bridge==**, and totality of evidence for submission.`,
    `- ⏱ 50 sec — pins then FDA caveat once, calmly
- 🎚 Do not sound defensive on FDA — disclose and move on
- ✅ Land on "no formal FDA pediatric indication"`,
    `→ Case two is a different constraint — Asparlas and efficient design when the endpoint-powered trial is not feasible.`,
    `- **EMA/PMDA pins on slide** — point as you name each; do not re-read full label text
- **E11A 2024** = post-hoc codification, not the driver of the 2021 decision`
  ),

  'cs3-ivosidenib-divider': note(
    `Case three is ivosidenib — approved in more than ==forty countries==, but **==not in India==**.

The drug worked globally. The constraint was ==local evidence==: **==could a clinical pharmacology dossier do the job a local trial normally does?==**

This is a twenty-second reset. I will not teach IDH biology here — the setup slide carries the drug and global status.`,
    `- ⏱ 25 sec — crisp reset; regulatory strategy case
- 🎚 Forty-plus approvals vs India gap
- ✅ Land on the dossier question`,
    `→ The setup slide orients ivosidenib and forty-two-plus countries before the SEC quote.`,
    `- India map hero on divider — morph continues on cs3-reversal; keep pause beat clean`
  ),

  'cs3-setup': note(
    `Before the SEC quote lands, I will orient the room on drug, geography, and chronology.

Ivosidenib — Tibsovo — treats IDH1-mutant AML and cholangiocarcinoma. It was approved in more than ==forty-two countries==. It was not approved in India.

Chronology matters. In ==August 2024==, **==Rule 101==** opened a waiver path before the December SEC meeting you see on this slide.

In December 2024, the SEC asked for a ==PK/PD study in India== before approval. Under the old framing, that request sounds reasonable. Under the evidence we already had, it meant a twelve-to-eighteen-month delay that patients did not need.

We already had population PK on ==two hundred fifty-three patients== with race not significant, PBPK-supported drug-interaction labeling, and a flat exposure-response relationship across the observed range.

The strategy was to prove that **==the existing global clinical pharmacology package answers the local-data question==**.`,
    `- ⏱ 55 sec — orientation chips → August before December → SEC quote
- 👆 Point at setup row before reading the December quote
- ✅ Land on "existing global package"`,
    `→ Next I will show Rule 101 — the regulatory opening that made a waiver pathway possible.`,
    `- Disease biology backups: \`cs3-bg-disease\`, \`cs3-disease\` — do not volunteer unless asked`
  ),

  'cs3-bg-regulatory': note(
    `India's 2019 rules generally expected local Phase III data. For rare IDH1-mutant AML, that could mean years of delay before patients could access the drug.

On ==August 7, 2024==, DCGI's **==Rule 101==** order named six reference agencies and waiver categories, including orphan drugs and significant therapeutic advancement. Ivosidenib fit both.

**==Rule 101 does not guarantee approval. It opens the door.==** The scientific answer still has to come from the ==clinical pharmacology dossier== we built on global evidence.

That is the shift: from "run a local trial by default" to "**==justify why the global package is enough==**."`,
    `- ⏱ 55 sec — regulatory pivot; speak Rule 101 date precisely
- ⚠ Emphasize Rule 101 is opportunity, not automatic approval
- ✅ Land on clinical pharmacology dossier as the answer`,
    `→ The dossier rested on six convergent evidence pillars — no single pillar wins alone.`,
    `- **Six reference agencies** (if asked): backup \`cs3-B1-cdsco-timeline\` for detail`
  ),

  'cs3-pillars': note(
    `The waiver case rested on ==six converging lines of evidence==, not one lucky analysis.

Mechanism: **==somatic IDH1 mutation, not an inherited germline variant==** — so ethnicity is a biology question, not only a statistics question.

Pharmacokinetic similarity: two hundred fifty-three patients in the pooled PopPK model, with ==race not a significant covariate==.

Exposure-response: ==flat across the observed range== at five hundred milligrams once daily.

Intrinsic and extrinsic factors were fully characterized. Global regulatory experience spanned more than thirty jurisdictions. And we named a Phase 4 PK commitment upfront to close the residual gap.

**==No single pillar wins alone. Convergence is the case.==**`,
    `- ⏱ 70 sec — name six pillars distinctly; do not rush the convergence line
- ✅ Land on "Convergence is the case"`,
    `→ Did the strategy work? Here is the public timeline and the outcome.`,
    `- **Pillar detail** (if asked): backup \`cs3-B2-six-pillar-package\` · 36-page justification`
  ),

  'cs3-reversal': note(
    `Here is the public arc. FDA approved ivosidenib from 2018 through 2021. EMA followed in 2023. In August 2024, Rule 101 opened the waiver pathway in India.

The outcome was **==May 14, 2025: CDSCO marketing authorization in India without a pre-approval local trial==**.

The authorization followed accumulated global evidence and a pharmacology package that made extrapolation ==scientifically defensible — not a political shortcut==.`,
    `- ⏱ 55 sec — walk timeline left to right
- 🎚 State May 14, 2025 as fact, not boast
- ✅ Land on scientifically defensible extrapolation`,
    `→ Next is an honest accounting of what we shipped and what we did not ship before approval.`,
    `- **Map morph** on slide may animate from divider — let it land, then speak outcome`
  ),

  'cs3-reckoning': note(
    `**==Clinical pharmacology requires an honest accounting==**, especially when access is urgent.

We shipped a mechanism-first defense, a thirty-six-page justification on six pillars, CDSCO approval, and a Phase 4 commitment to close the PK gap.

We did not have pre-approval Indian PK/PD data, Indian pivotal trial sites, or an India-specific peer-reviewed PK paper. Inference rested on the two-hundred-fifty-three-patient PopPK model and the convergent package around it.

**==The dossier was explicit about what remained uncertain==**, and the Phase 4 commitment addressed that uncertainty directly.`,
    `- ⏱ 55 sec — equal weight to shipped vs gaps
- 🎚 Candor builds credibility with the panel
- ✅ Land on explicit uncertainty plus Phase 4`,
    `→ How the team organized cross-functionally to execute under that pressure.`,
    `- Deliver candor verbally even if amber "honest accounting" band is trimmed on slide`
  ),

  'cs3-leadership': note(
    `The operating model had four clear owners, and both science and pathway had to hold.

Quantitative pharmacology translated ICH E5 concepts into PopPK, exposure-response, and PBPK evidence — and defined the Phase 4 PK/PD commitment.

Regulatory affairs owned the Rule 101 pathway and agency responses. Medical affairs and pharmacovigilance owned post-marketing follow-up. The India affiliate owned in-country execution with SEC and CDSCO.

Quantitative pharmacology answered whether global evidence could extrapolate. Partner functions answered whether the regulatory pathway could hold. **==Both had to be true for CDSCO to grant the waiver.==**`,
    `- ⏱ 55 sec — function-level language; cross-functional tone
- ✅ Land on "Both had to be true"`,
    `→ Three portable lessons, then we bridge to Case four and the evidence system itself.`,
    `- **Phase 4 owner:** quantitative pharmacology scoped the PK/PD commitment`
  ),

  'cs3-bridge-recap': note(
    `**==The science was the bridge.==**

Three lessons travel from this case. Mechanism matters: somatic IDH1 narrowed the ethnic-sensitivity question to tumor biology. Convergence matters: no single pillar carried the waiver alone. Transparency matters: we named the PK gap and committed to Phase 4 instead of pretending it did not exist.

**==When a local trial is not feasible, a rigorous clinical pharmacology dossier can become the bridge to patient access.==**

Case four shifts the medium again — from drug dossiers to the evidence system that has to scale without losing traceability.`,
    `- ⏱ 40 sec — count three lessons cleanly
- ✅ Land on bridge to patient access`,
    `→ Case four divider — Pharazi and audit-ready clinical pharmacology workflows.`,
    `- Do not re-teach six pillars — this is synthesis only`
  ),

  'cs1-bridge': note(
    `What travels beyond ambrisentan is straightforward.

Where disease similarity is high, pharmacokinetic matching can support the dose. **==Adult data build the model; pediatric data confirm whether the bridge is adequate.==**

The regulatory outcome we pursued was ==dose labeling — not re-proving efficacy in a terminated trial==.

Case two is a different constraint. The biology is the same drug in adults, but an endpoint-powered trial of ==ninety-four patients== was not feasible. The question became how to make a smaller adult evidence package defensible to FDA.`,
    `- ⏱ 30 sec — three principles then pivot
- 🎚 Conversational close; land regulatory outcome before Case 02
- ✅ Land on "smaller adult evidence package"`,
    `→ Case 02 divider — Calaspargase pegol · Asparlas.`
  ),

  'cs2-asp-divider': note(
    `Second case: calaspargase pegol — Asparlas — in adult Philadelphia chromosome-negative ALL.

This is a story about a smaller, smarter trial design and an FDA-agreed ==thirty-six percent enrollment reduction==.

It is the same drug and the same biology. The pediatric label existed since 2018. The adult question was not scientific doubt — it was ==operational feasibility==.`,
    `- ⏱ 35 sec — quick case opener
- 🎚 Plain and factual
- ✅ Land on "operational feasibility"`,
    `→ Setup slide next — drug, pediatric precedent, then the 94-adult problem.`,
    `- Lymphocyte visual = cell of origin in ALL; methodology comes later on cs2-asp-fit`
  ),

  'cs2-asp-challenge': note(
    `Before the three numbers on screen, I will orient the room.

Asparlas is pegylated asparaginase in adult Ph-negative ALL. FDA approved the pediatric label in ==2018== with the NSAA surrogate already agreed.

The original adult protocol needed ==ninety-four patients== — endpoint-powered, ==mathematically clean, and operationally undeliverable==.

The three numbers frame the gap: pediatric approval in 2018, ninety-four as the original adult N, and roughly 2028 as the horizon if nothing changed.

The pivot question is whether a **==smaller, smarter study could still be defensible to FDA==**.`,
    `- ⏱ 70 sec — setup row → three anchor tiles → pivot question
- 🎚 Say "mathematically clean, operationally undeliverable" plainly
- ✅ Point at orientation chips before "2018 / 94 / ~2028"`,
    `→ Two innovations stacked — each precedented on its own.`,
    `- Enrollment curve removed from slide — speak feasibility if asked; do not narrate screen-fail funnel unless probed`
  ),

  'cs2-asp-strategy': note(
    `The approach stacked two FDA-precedented moves, and the contribution was how we combined them.

Move one was optimal design: **==anchor sample size on PK parameter precision, not endpoint power==**. The pediatric PopPK prior of one hundred twenty-four patients already carried most of the model. Adults augment the model; they do not rebuild it.

Move two was a PopPK-simulated primary endpoint: simulate NPAA across virtual patients drawn from the pooled model at the same FDA threshold as the pediatric label. **==The trial validates the model, and the model answers the clinical question.==**

Neither move was novel alone. **==The novelty was composition==** — two precedents first combined in this adult oncology context.`,
    `- ⏱ 75 sec — use "stacked, but reviewable"
- ⚠ Neither move is novel alone; novelty is the stack
- ✅ Land on "composition"`,
    `→ FDA Type A — what the agency agreed.`
  ),

  'cs2-asp-fda': note(
    `At the FDA Type A meeting on ==July 21, 2023==, three of four pillars landed on the formal record.

Enrollment was cut from ==ninety-four to sixty== primary-endpoint evaluable adults — a ==thirty-six percent reduction==.

That reduction was anchored on FDA's own adverse-event detection probability framework at ==greater than eighty-five percent==, briefed in parallel with the optimal design rather than bolted on afterward.

The simulated primary was repositioned to dose confirmation in Cohorts 1 and 2. It was not rejected outright, but it was conditioned on additional adult PopPK. The sample-size reduction held anyway.`,
    `- ⏱ 75 sec — be precise: Type A, July 21 2023, N=60
- 🎚 Convert a meeting into evidence
- ✅ Land on "36% reduction"`,
    `→ Why sixty adults could still anchor the model.`,
    `- **Four pillars on slide (waterfall only):** (1) optimal design / precision anchor · (2) AE-detection ≥85% · (3) simulated primary repositioned to dose confirmation · (4) pediatric prior N=124 unchanged
- **If "what didn't land":** simulated primary as sole registrational endpoint — agency wanted adult PopPK confirmation in early cohorts
- **NSAA threshold:** same FDA-agreed 0.1 U/mL nadir asparaginase activity as pediatric label`
  ),

  'cs2-asp-fit': note(
    `At sixty adults, the model is as precise as at ninety-four for the parameters that drive dose decisions — because the information lives in the pediatric prior, not the adult sample alone.

The pooled pediatric PopPK included ==one hundred twenty-four patients== — FDA-reviewed and label-supporting. Adult Part 1 external validation against pediatric-model predictions showed no structural failure.

Sensitivity analyses on cohort ratios, percent relative standard error, and bootstrap prediction-corrected VPC were stable above roughly fifty to sixty adults.

The smaller sample does not weaken the science. It clarifies **==where the evidence actually lives==**.`,
    `- ⏱ 75 sec — make "precision" the word they remember
- ⚠ Curves on slide may be illustrative; anchor on the argument shape
- ✅ Land on "where the evidence actually lives"`,
    `→ Impact — what travels beyond SPARK-ALL.`,
    `- **Glyphs removed** — say aloud if probed: prior = N124 outer ring / N60 inner augmentation; sensitivity = three plateau tests on %RSE
- **D-optimal framing:** sample size anchored on PK parameter precision (PopED-PFIM), not endpoint power against 90% NSAA target
- **PopPK-simulated primary:** virtual patients from pooled model; trial validates model, model answers clinical question
- **Backup depth:** \`cs3-B1-optimal-design\`, \`cs3-B2-simulated-endpoint\` (inherited backup IDs)`
  ),

  'cs2-asp-impact': note(
    `The impact was a ==thirty-six percent enrollment reduction==, a documented FDA Type A precedent, and a methodology that travels beyond one program.

Three contributions matter. Regulatory precedent that any sponsor can cite. Operational efficiency — more information per patient enrolled. Scientific generalizability — a template when endpoint-powered enrollment is not feasible.

Two frameworks converged on one N: pharmacometrics through D-optimal design under an informative prior, and biostatistics through adverse-event detection probability. That convergence is what enabled agreement.

SPARK-ALL later closed at forty-two patients on a sponsor portfolio decision, independent of design quality. **==The Type A methodology remains durable beyond any single program.==**`,
    `- ⏱ 65 sec — do not overstate beyond public precedent
- ⚠ If probed on trial closure: portfolio decision, not design failure
- ✅ Land on "methodology is durable"`,
    `→ Bridge to Case 03 — access under pressure.`
  ),

  'cs2-asp-bridge': note(
    `Asparlas shows how a smaller study can still be decision-grade when the design is transparent and the regulator is briefed on the methodology, not just the sample size.

Case three shifts the constraint again. It is not sample size — it is ==local evidence==. India asked for a trial that the global dossier had to replace.

The shared move across both cases is to **==make the uncertainty honest and defensible==**.`,
    `- ⏱ 45 sec — efficient design to access
- ✅ Land on "honest and defensible"`,
    `→ Case 03 divider — Ivosidenib in India.`
  ),

  'cs2-pharazi-divider': note(
    `Case four is the only case that is not about a single drug. It is about **==the system that does the work==**.

Pharazi is ==personal research== into audit-ready clinical pharmacology workflows — deterministic tools, privacy boundaries, human accountability, and traceable outputs.

This is **==not a product pitch and not a sponsor deployment claim==**.`,
    `- ⏱ 25 sec — say "personal research" clearly
- ✅ Land on "system that does the work"`,
    `→ Setup slide reframes: after three drug dossiers, the constraint is workflow infrastructure.`,
    `- Verdict chip intentionally blank on divider — case is architectural, not an approval story`
  ),

  'cs2-regulatory-floor': note(
    `After three drug decisions, the medium changes.

The constraint is no longer a single molecule — it is **==whether the evidence system can scale without losing traceability==**. Pharazi is personal research demonstrating that discipline.

AI is useful in clinical pharmacology only when **==the workflow can be reviewed==**.

The floor has four parts: traceable inputs, deterministic computations, explicit assumptions, and a human owner for the final decision. I will walk the three cards on screen — documentation, accountability, and privacy — and land on one principle: **==auditability before autonomy==**.`,
    `- ⏱ 40 sec — name the case shift before the three cards
- 🎚 Calm systems tone; not a product demo
- ✅ Land on auditability before autonomy`,
    `→ The gap — speed without traceability.`,
    `- Subhead on screen carries "after three drug dossiers" — say it once so audience knows why CS4 exists`
  ),

  'cs2-gap': note(
    `Clinical pharmacology can now generate analyses faster than it can explain them.

Agents can accelerate assembly — running plans, tables, and comparisons. But every step needs lineage: which input, which version, which tool, and which assumption produced each result.

The final claim must stay inspectable. **==The bottleneck is trusted review, not generation.==**`,
    `- ⏱ 35 sec — contrast speed vs trace
- ✅ Land on trusted review bottleneck`,
    `→ Working pattern — plan, run, check, record.`
  ),

  'cs2-working-overview': note(
    `The working pattern is simple: ==plan, run, check, record==.

Pharazi is architecture proof — **==deterministic tools under agent orchestration==**, with explicit review gates and a durable decision record.

Write the analysis intent first. Route execution to replayable tools. Compare outputs before synthesis. Leave an audit trail a reviewer can follow without asking what happened off-screen.`,
    `- ⏱ 50 sec — four beats; point at the live architecture diagram
- ✅ Land on agents plus deterministic tools`,
    `→ PopPK dashboard — the review contract in one surface.`
  ),

  'cs2-poppk-dashboard': note(
    `A dashboard is valuable only if it makes model review faster and safer for the clinical pharmacologist who owns the decision.

The reviewer should see assumptions, diagnostics, covariate logic, simulation scenarios, and unresolved questions in one surface.

Highlight what changed between versions. Name what still needs expert review — do not hide uncertainty behind confident language.

**==The interface is the review contract.==**`,
    `- ⏱ 50 sec — speak to the clinical pharmacology reviewer; walk one diagnostic row
- ✅ Land on review contract`,
    `→ Close — traceable acceleration, live at pharazi.ai.`
  ),

  'cs2-publication-close': note(
    `Three status lines on screen summarize the arc: regulatory floor defined, traceable workflow built, working system live.

The capstone is the same discipline from Case one — **==no black boxes at the decision point==**. Speed is useful only when the evidence chain stays intact.

pharazi.ai is the framework home. A manuscript is in preparation, and the community lives at clinpharm.ai. Again, this is **==personal research, not a sponsor deployment claim==**.`,
    `- ⏱ 45 sec — status stack → capstone → QR/iframe; do not oversell product
- ✅ Land on "no black boxes" + intact trail`,
    `→ Cases complete divider — breathe; the four-case core is done.`
  ),

  'cs4-close-divider': note(
    `That closes the four-case core — Cases one through four: pediatric dose, smarter trial, India dossier, and traceable AI.

**==One discipline carried each decision==**. The ledger on screen is a recap; I will not re-walk every case in detail.

The core proof is complete. Next we widen the aperture to portfolio breadth and the Xencor bridge.`,
    `- ⏱ 25 sec — pause beat; name the four cases once, not ten minutes again
- ✅ Land on "core proof complete"`,
    `→ Portfolio — breadth across modality, area, and agency.`,
    `- **Ledger one-liners if panel jumps back:**
  - CS01: EMA/PMDA pediatric ambrisentan · exposure bridge · FDA never received package
  - CS02: Asparlas Type A N=60 (−36%) · pediatric prior + optimal design stack
  - CS03: Ivosidenib CDSCO May 14 2025 · six pillars · Phase 4 PK commitment
  - CS04: Pharazi · auditability before autonomy · personal research`
  ),

  'portfolio-01': note(
    `The four cases are the deep proof points. This slide widens the aperture to breadth across oncology, biologics, antiviral and infectious disease, respiratory and PAH, and dose-prediction or AI work — ==without turning the talk into a fifth case study==.

If asked about antibody-drug conjugates, I led and directed strategy in that space, but **==ADC is breadth only in this Xencor talk==** — not a core case study I will teach today.`,
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

Two pillars share one discipline: oncology masked T-cell engagers, and infectious disease HBV and HDV functional cure. In both, the clinical pharmacology question is **==which exposure metric makes the dose defensible when plasma is not the whole story==**.`,
    `- ⏱ 45 sec — humble, specific; say "public information" if pressed
- ⚠ No claim of VIR-5500 internal access
- ✅ Name both pillars and the shared dose question`,
    `→ Oncology — start with the measurement problem.`
  ),

  'company-bridge-oncology-problem': note(
    `For a masked PRO-XTEN engager, **==plasma concentration is not the same as tumor exposure==**.

Assays may return masked drug, total drug, or active drug depending on the platform. The decision needs an exposure metric that is ==decision-bearing for safety and for efficacy== — and those may differ.

I would start with three questions. What does the assay actually measure? Where is active drug generated? Which metric should anchor dose selection? This is ==hypothesis from public information, to be tested with your teams==.`,
    `- ⏱ 80 sec — sound like a translational partner, not an insider
- ⚠ Public information only
- ✅ Land on "decision-bearing exposure metric"`,
    `→ Assay to model to dose — and OBD versus MTD.`
  ),

  'company-bridge-oncology-approach': note(
    `One working chain: **==assay, model, dose, and optimal biological dose==**.

Separate safety and efficacy metrics explicitly. Cytokine release syndrome risk may follow early peak on active species. Efficacy may need sustained exposure in the tumor compartment.

For T-cell engagers, step-up dosing and bell-shaped pharmacodynamics can make **==optimal biological dose more relevant than maximum tolerated dose==**.

When sampling is limited, the design goal is **==model precision and identifiability — not statistical power alone==**.`,
    `- ⏱ 95 sec — concrete chain; conditional language ("may", "if")
- ✅ Land on precision under sparse sampling`,
    `→ Map the four-case discipline to Xencor decision types.`
  ),

  'company-bridge-case-mapping': note(
    `The diseases are not the same across Xencor's portfolio. **==The decision discipline transfers.==**

When the trial cannot carry the answer, you defend target exposure. When the powered trial is not feasible, you use model-anchored efficient design. When a regulator asks for ==local evidence==, you build convergent reliance. When review must scale, you preserve traceability.

I am not recapping my CV here. I am naming the **==operating model the four cases already demonstrated==**.`,
    `- ⏱ 65 sec — discipline transfer, not biography
- ✅ Land on "operating model, not CV recap"`,
    `→ Infectious disease — dose questions first, credentials second.`
  ),

  'company-bridge-hbv-hdv': note(
    `For HBV and HDV functional cure, I would start with the dose and evidence questions — **==not with my resume==**.

Combination cure turns on interaction risk, biomarker timing, durability, and what evidence must exist before the claim is credible. That is the clinical pharmacology frame.

I have HBV-adjacent touchpoints — combination patent co-inventor scope, viral monoclonal antibody population and route work, neonatal antiviral simulation experience. Those inform special-population and route questions. **==They do not constitute direct HDV program leadership==**, and I would not pretend otherwise.

HDV biology belongs with virology and translational. My contribution is structuring the dose question and **==partnering early — learning posture on HDV specifics==**.`,
    `- ⏱ 65 sec — problem first; credentials only as supporting context
- ⚠ Explicit humility: no HDV ownership claim
- ✅ Land on "partner first, not portfolio expert on day one"`,
    `→ How I would start in role — listen, then tighten.`
  ),

  'company-bridge-fit': note(
    `**==I would not arrive with a pre-written org chart.==**

First I would listen: where are assay, model, and dose decisions blocked or ambiguous? For oncology engagers I would work backward from the filing decision using ==public information only==, and name the exposure metric that must be defensible.

Then I would help build a cross-functional rhythm where assumptions and open questions are visible before they become regulatory risk.

Player-coach where the team needs it — the goal is **==a group that can defend the dose, not a single model owner in a silo==**.`,
    `- ⏱ 90 sec — listen-first posture; no hero narrative
- ✅ Land on "team can defend the dose"`,
    `→ Final synthesis — the common thread.`
  ),

  'closing-thread': note(
    `The common thread is not a method. It is the standard for decision-making **==when measurement falls short==**.

Case one was ==untrialable==. Case two was ==sample-limited==. Case three was ==locally constrained==. Case four was ==workflow-unbuilt==.

In each case, the model or evidence system **==made the dose or decision defensible==**.`,
    `- ⏱ 60 sec — say the headline nearly verbatim
- ✅ Four constraints, one discipline`,
    `→ Why Xencor — operating model in practice.`
  ),

  'closing-fit': note(
    `For Xencor, the operating model is practical: start from the decision, make the dose defensible, and **==keep expert judgment visible across functions==**.

That is what the four cases demonstrated — and what I would bring to your pipeline if we work together. **==I am not claiming I already know your internal answers==**.`,
    `- ⏱ 75 sec — Xencor-facing, conditional, not self-congratulatory
- ✅ Land on "visible judgment across functions"`,
    `→ Thank you and Q&A.`
  ),

  'closing-thanks': note(
    `Thank you for the time and the conversation.

I am happy to go deeper on pediatric PopPK, Asparlas efficient design, India reliance, or AI infrastructure — wherever the panel wants to spend the remaining time.`,
    `- ⏱ 30 sec — stop after the invitation
- ✅ Let the four chips guide depth if needed
- 🧠 Open **Reading → Off-slide memory** or slide Q&A if a detail was trimmed from screen`,
    `→ Q&A.`,
    `- **Global honesty guardrails:** no Servier-confidential numbers · no VIR-5500 internal access claim · ADC breadth-only · Pharazi personal research not product transfer · HBV patent narrow scope
- **Depth routing:** CS1 backups \`cs1-backup-*\` · CS2 asparlas \`cs3-backup-*\` (legacy IDs) · CS3 India \`cs3-backup-*\` · CS4 \`ai-backup-master\`
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

Use it only if the panel asks for global-to-local regulatory detail beyond the main Case three spine, and tie every answer back to convergence of evidence.`,
    `- ⏱ Optional — do not volunteer
- ✅ Tie answers back to convergence of evidence`,
    `→ Return to live discussion or Q&A.`
  ),
};
