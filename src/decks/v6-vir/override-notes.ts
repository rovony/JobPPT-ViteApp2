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
    `Good morning — and thank you for the time. I'm ==Malek Okour==. ⏸ Over the next ==forty-five minutes== I want to walk you through ==four clinical pharmacology decisions== where the clean measurement was never going to be enough.

Case one is pediatric PAH — the trial could not carry the answer. Case two is Asparlas — the endpoint-powered adult trial was not feasible. Case three is ivosidenib in India — a local trial request had to be answered with a defensible reliance package. Case four is AI and Pharazi — the workflow has to preserve traceability as the evidence system scales.

One discipline at the center: ==when measurement falls short, clinical pharmacology makes the dose defensible==.`,
    `- ⏱ 45 sec — calm, declarative open
- 🎚 Name four cases quickly; do not over-explain yet
- ⚠ Do not preview slide details — save depth for each case
- ✅ Land on the thesis sentence`,
    `→ The hook states the premise every clinical pharmacologist eventually faces.`,
    `- Cards are **compact** on screen — full one-liners if asked:
  - **CS01:** Exposure-matched dose when the pediatric efficacy trial cannot carry the answer · EMA + PMDA approval
  - **CS02:** Defensible adult design when the endpoint-powered trial is not feasible · FDA Type A agreement
  - **CS03:** Local-trial waiver via convergent global evidence · cross-functional approval under pressure
  - **CS04:** Audit-ready clin pharm workflows when evidence must scale · personal research (Pharazi)
- Meta line: Vir Biotechnology candidate seminar · ==June 17, 2026== · ~45 min including Q&A`
  ),

  'hook-A-trial-not-answer': note(
    `==When measurement falls short.==

That is the premise behind every case in this talk.

The constraint shows up four ways — and you will see each on the roadmap.

==Untrialable== — you cannot run the efficacy trial ethics and disease biology forbid.

==Sample-limited== — the endpoint-powered design is clean on paper and undeliverable in practice.

==Local evidence== — a regulator asks for data the global program never enrolled.

==Unbuilt== — the next decade needs audit-ready infrastructure no vendor ships off the shelf.

Four cases. Four constraints. Four ==clinical pharmacology answers==.`,
    `- ⏱ 75 sec — pause after "falls short"; one beat per mark
- 🧷 Verbal-lock: untrialable · sample-limited · local evidence · unbuilt
- ⚠ Do NOT name drugs here — drugs come in the cases
- ✅ Land on "four clinical pharmacology answers"`,
    `→ Quick career arc, then the roadmap names the four cases.`
  ),

  'career-arc': note(
    `Quick background before the cases.

Dentist in Jordan. ⏸ PhD at Minnesota with Dr. Brundage — clinical pharmacology and pharmacometrics. ⏸

Summer 2014 in QP2 — simulation under uncertainty. That internship is part of why we are here today. ⏸

GSK: pediatric ambrisentan — the case you will see first. Servier: oncology, India reliance, and the portfolio work that followed.

The operating question across all of it: ==how do we turn incomplete evidence into a defensible clinical pharmacology decision?==`,
    `- ⏱ 75-90 sec — one sentence per stop on the timeline
- 🎚 Do not linger on awards unless asked; innovation tools are backup/Q&A
- ✅ Land on the operating question`,
    `→ Roadmap next — four cases and one discipline.`
  ),

  roadmap: note(
    `The roadmap is four cases and one discipline.

Case one: regulatory-tested pediatric extrapolation — ambrisentan. Case two: efficient design — Asparlas. Case three: India reliance under pressure — ivosidenib. Case four: audit-ready AI workflows — Pharazi.

After the cases: portfolio breadth, then a Vir-specific bridge. This is not a methods catalog — it is a sequence of decision constraints.`,
    `- ⏱ 75 sec — point to each case card as you name it
- ⚠ Portfolio and Vir bridge come after the four cases
- ✅ Say "four cases and one discipline" plainly`,
    `→ Case 01 divider — ambrisentan.`
  ),

  'cs1-pkpd': note(
    `Two panels only — keep the story tight.

Left: pediatric AUC sits inside the adult target envelope at both dose levels. ==AUC is the bridge.==

Right: Cmax runs higher in children but stays interpretable against adult safety experience. ==Cmax is the safety check.==

I would not overclaim six-minute walk or exposure-response on this slide. The defensible line is: ==the observed PK did not contradict the exposure bridge==. E-R detail is in backup if they want it.`,
    `- ⏱ 55 sec — point left panel then right; do not narrate four charts
- 🎚 Cautious verbs: "no clear gradient," "did not contradict"
- ✅ Recovery line: "AUC carried the dose. Cmax checked safety."`,
    `→ Three disruptions the program absorbed at once.`,
    `- **Removed panels** (backup \`cs1-B6-6mwd\`, E-R scatter): AUC vs 6MWD supportive only — noisy in pediatrics, not load-bearing for registration
- **Cmax detail:** ~11–18% higher Cmax,ss vs adult depending on dose band; no clear exposure-driven AE gradient in observed range
- **Verbatim guardrail:** "No clear exposure-driven gradient in the observed range" — never say "flat E-R" or "no risk"
- **If pressed on source:** Okour 2023 / published figures; chart is teaching visual, numbers are the receipt`
  ),

  'cs1-lesson': note(
    `EMA and PMDA approved pediatric ambrisentan in 2021. ICH E11A codified the extrapolation framework in 2024.

**EMA, 2021** — Volibris, ages 8–17, three weight bands, two dose levels.

**PMDA, 2021** — same exposure-matching framework; GSK Japan announced March 23.

**ICH E11A, 2024** — where similarity is high, exposure matching can carry more of the inference.

Proactive FDA caveat on the slide: FDA ==never received the package== — split-rights commercial outcome, not a regulatory rejection. The Letairis label states verbatim that ==safety and effectiveness in pediatric patients have not been established==. As of 2026, no formal FDA pediatric indication.

The portable architecture: adult efficacy as anchor, pediatric PK as bridge, totality of evidence for submission.`,
    `- ⏱ 50 sec — pins then FDA caveat once, calmly
- 🎚 Do not sound defensive on FDA — disclose and move on
- ✅ Land on "no formal FDA pediatric indication"`,
    `→ Bridge to Case 02 — Asparlas.`
  ),

  'cs3-setup': note(
    `Chronology first — this matters.

==August 2024== — Rule 101 opened the waiver path before the December SEC meeting on this slide.

==December 2024== — SEC asked for a PK/PD study in India before approval. Reasonable under the old framing; under our evidence, a twelve-to-eighteen-month delay patients did not need.

We already had PopPK on ==253 patients== with race not significant, PBPK-supported DDI labeling, and flat exposure-response.

The strategy: prove the ==existing global clinical pharmacology package== answers the local-data question.`,
    `- ⏱ 55 sec — say August before December; steady conviction
- 🎚 Contrast SEC request vs existing PopPK evidence
- ✅ Land on "existing global package"`,
    `→ Rule 101 and the regulatory opening.`
  ),

  'cs1-bridge': note(
    `What travels beyond ambrisentan is simple.

Where similarity is high, ==PK matching can support the dose==.

And the architecture matters: adult data build the model; pediatric data confirm whether the bridge is adequate.

The regulatory outcome we pursued was ==dose labeling== — not re-proving efficacy in a terminated trial.

Case two is a different constraint: same drug biology in adults, but an endpoint-powered trial of ninety-four patients was not feasible. The question became how to make a ==smaller adult evidence package== defensible to FDA.`,
    `- ⏱ 30 sec — three principles then pivot
- 🎚 Conversational close; land regulatory outcome before Case 02
- ✅ Land on "smaller adult evidence package"`,
    `→ Case 02 divider — Calaspargase pegol · Asparlas.`
  ),

  'cs2-asp-divider': note(
    `Second case: ==Calaspargase pegol== — Asparlas — in adult Ph-negative ALL.

A smaller, smarter trial design — and an FDA-agreed ==36% enrollment reduction==.

Same drug. Same biology. Pediatric label since 2018. The adult question was not scientific doubt — it was ==operational feasibility==.`,
    `- ⏱ 35 sec — quick case opener
- 🎚 Plain and factual
- ✅ Land on "operational feasibility"`,
    `→ Why ninety-four adults was not feasible.`
  ),

  'cs2-asp-challenge': note(
    `Asparlas was approved in pediatrics in 2018. The NSAA surrogate — nadir serum asparaginase activity at least 0.1 U per mL — was already FDA-agreed.

The original adult protocol needed ==94 patients== — endpoint-powered against a 90% NSAA achievement target. Mathematically clean. Operationally undeliverable.

Ph-negative adult ALL is rare. Cooperative-group screen-fail rates are brutal. Under the original design, enrollment completion was years away.

So the pivot question: could a ==smaller, smarter== study still be defensible to FDA?`,
    `- ⏱ 70 sec — problem framing, not methods yet
- 🎚 Say "mathematically clean, operationally undeliverable" plainly
- ✅ Land on the pivot question`,
    `→ Two innovations stacked — each precedented on its own.`
  ),

  'cs2-asp-strategy': note(
    `The approach stacked two FDA-precedented moves.

Move one: ==optimal design== — anchor sample size on PK parameter precision, not endpoint power. The pediatric PopPK prior — N equals 124 — already carried most of the model. Adults augment; they do not rebuild.

Move two: ==PopPK-simulated primary== — simulate NPAA across virtual patients drawn from the pooled model. Same FDA threshold as the pediatric label. The trial validates the model; the model answers the clinical question.

The contribution is ==composition== — two precedents, first combined in this adult oncology context.`,
    `- ⏱ 75 sec — use "stacked, but reviewable"
- ⚠ Neither move is novel alone; novelty is the stack
- ✅ Land on "composition"`,
    `→ FDA Type A — what the agency agreed.`
  ),

  'cs2-asp-fda': note(
    `FDA Type A meeting — ==July 21, 2023==.

Three of four pillars landed on the Type A record. Enrollment cut from 94 to ==60 primary-endpoint evaluable adults== — a 36% reduction.

The reduction was anchored on FDA's own ==AE-detection probability framework== — greater than 85% — briefed in parallel with the optimal design, not bolted on after.

The simulated primary was repositioned to dose confirmation in Cohorts 1 and 2 — not rejected, but conditioned on additional adult PopPK. The reduction held anyway.`,
    `- ⏱ 75 sec — be precise: Type A, July 21 2023, N=60
- 🎚 Convert a meeting into evidence
- ✅ Land on "36% reduction"`,
    `→ Why sixty adults could still anchor the model.`,
    `- **Four pillars on slide (waterfall only):** (1) optimal design / precision anchor · (2) AE-detection ≥85% · (3) simulated primary repositioned to dose confirmation · (4) pediatric prior N=124 unchanged
- **If "what didn't land":** simulated primary as sole registrational endpoint — agency wanted adult PopPK confirmation in early cohorts
- **NSAA threshold:** same FDA-agreed 0.1 U/mL nadir asparaginase activity as pediatric label`
  ),

  'cs2-asp-fit': note(
    `At N equals 60, the model is as precise as at N equals 94 for the parameters that drive dose decisions — because the information lives in the ==pediatric prior==, not the adult sample alone.

N equals 124 pooled pediatric PopPK — FDA-reviewed, label-supporting. Adult Part 1 external VPC against pediatric-model predictions — no structural failure.

Sensitivity analyses: cohort ratios, percent RSE, bootstrap pcVPC — all stable above roughly fifty to sixty adults.

The smaller sample does not weaken the science. It ==clarifies where the evidence actually lives==.`,
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
    `A ==36% enrollment reduction==. A documented FDA Type A precedent. A methodology that travels.

Three contributions: regulatory precedent any sponsor can cite; operational efficiency — more information per patient; scientific generalizability — a template when endpoint-powered enrollment is not feasible.

Two frameworks converged on one N: pharmacometrics via D-optimal design under an informative prior, and biostatistics via AE-detection probability. That convergence is what enabled agreement.

SPARK-ALL later closed at N equals 42 on a sponsor portfolio decision — independent of design quality. The ==Type A methodology is durable== beyond any single program.`,
    `- ⏱ 65 sec — do not overstate beyond public precedent
- ⚠ If probed on trial closure: portfolio decision, not design failure
- ✅ Land on "methodology is durable"`,
    `→ Bridge to Case 03 — access under pressure.`
  ),

  'cs2-asp-bridge': note(
    `Asparlas shows how a smaller study can still be decision-grade when the design is transparent and the regulator is briefed on the methodology, not just the number.

Case three shifts the constraint: not sample size, but ==local evidence==. India asked for a trial the global dossier had to replace.

The shared move: make the uncertainty ==honest and defensible==.`,
    `- ⏱ 45 sec — efficient design to access
- ✅ Land on "honest and defensible"`,
    `→ Case 03 divider — Ivosidenib in India.`
  ),

  'cs2-pharazi-divider': note(
    `Case four is the only case that is not about a single drug. It is about the ==system that does the work==.

Pharazi is personal research into audit-ready clinical pharmacology workflows — deterministic tools, privacy boundaries, human accountability, traceable outputs.

This is not a product pitch and not a sponsor deployment claim.`,
    `- ⏱ 25 sec — say "personal research" clearly
- ✅ Land on "system that does the work"`,
    `→ Regulatory floor — the non-negotiables before autonomy.`
  ),

  'cs2-regulatory-floor': note(
    `AI is useful in clinical pharmacology only when the workflow can be ==reviewed==.

The floor is not model novelty. It is traceable inputs, deterministic computations, explicit assumptions, and a human owner for the final decision.

Documentation shows where data came from and what method ran. Accountability keeps the expert responsible. Privacy sets boundaries on sensitive inputs.

==Auditability before autonomy.==`,
    `- ⏱ 35 sec — calm systems tone; three cards map to three beats
- ✅ Land on auditability before autonomy`,
    `→ The gap — speed without traceability.`
  ),

  'cs2-gap': note(
    `Clinical pharmacology can generate analyses faster than it can ==explain them==.

Agents can accelerate assembly — run plans, tables, comparisons. But every step needs lineage: which input, version, tool, and assumption produced each result.

The final claim must stay inspectable. ==The bottleneck is trusted review, not generation.==`,
    `- ⏱ 35 sec — contrast speed vs trace
- ✅ Land on trusted review bottleneck`,
    `→ Working pattern — plan, run, check, record.`
  ),

  'cs2-working-overview': note(
    `The working pattern is simple: ==plan, run, check, record==.

Pharazi is architecture proof — deterministic tools under agent orchestration, with explicit review gates and a durable decision record.

Write the analysis intent first. Route to executable, replayable tools. Compare outputs before synthesis. Leave an audit trail the reviewer can follow.`,
    `- ⏱ 50 sec — four beats; point at the live architecture diagram
- ✅ Land on agents plus deterministic tools`,
    `→ PopPK dashboard — the review contract in one surface.`
  ),

  'cs2-poppk-dashboard': note(
    `A dashboard is valuable only if it makes model review ==faster and safer==.

The user should see assumptions, diagnostics, covariate logic, simulation scenarios, and unresolved questions in one review surface.

Highlight what changed between versions. Name what still needs expert review — do not hide it behind confidence language.

==The interface is the review contract.==`,
    `- ⏱ 50 sec — speak to the clinical pharmacology reviewer; walk one diagnostic row
- ✅ Land on review contract`,
    `→ Close — traceable acceleration, live at pharazi.ai.`
  ),

  'cs2-publication-close': note(
    `Three status lines on screen: regulatory floor defined, traceable workflow built, working system live.

The capstone is the same discipline from Case 01: ==no black boxes== at the decision point. Fast is useful only when the evidence chain stays intact.

pharazi.ai is the framework home — manuscript in prep, community at clinpharm.ai. This is personal research, not a sponsor deployment claim.`,
    `- ⏱ 45 sec — status stack → capstone → QR/iframe; do not oversell product
- ✅ Land on "no black boxes" + intact trail`,
    `→ Cases complete divider — breathe; the four-case core is done.`
  ),

  'cs4-close-divider': note(
    `That closes the four-case core. ==Cases 01 through 04== — pediatric dose, smarter trial, India dossier, traceable AI.

One discipline carried each decision. The ledger on screen is the recap; do not re-walk every case.

==Core proof complete.== Next we widen the aperture.`,
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
    `The four cases are the deep proof points. This slide widens the aperture.

Breadth across oncology, biologics, antiviral and infectious disease, respiratory and PAH, and dose-prediction or AI work — without turning the talk into a fifth case.

If asked about ADC: I led and directed strategy, but ADC is ==breadth only== in this final Vir talk — not a core case study.`,
    `- ⏱ 120 sec — do not walk every cell
- 🎚 Highlight oncology, biologics, antiviral/ID, AI as bridge-relevant
- ✅ Keep ADC as breadth-only honesty guardrail`,
    `→ Company bridge — translate the discipline to Vir.`,
    `- **Stats strip removed** (say if asked): ==12+ years== clin pharm · ==5+ approvals== · ==6+ agencies== · ==20+ publications== · oncology + biologic + antiviral breadth
- **ADC honesty:** led/directed multi-analyte + FIH dose-projection strategy (BCLxL @ Servier; BCMA contribution @ GSK) — not hands-on every analyte
- **HBV:** co-inventor AU2023213173A1 — combination therapy patent; not direct HDV program ownership
- **Row highlights:** Tibsovo/Onivyde/Asparlas oncology; Sotrovimab biologics; Dectova antiviral; DosePredict/DeepPK/Pharazi AI tools`
  ),

  'company-bridge-divider': note(
    `Now translate the core into Vir.

I do not claim access to confidential Vir data. This bridge is built from ==public pipeline information== and the evaluator signal: two pillars, one discipline — making the dose defensible.

Oncology: masked T-cell engagers. Infectious disease: HBV and HDV functional-cure ambitions.`,
    `- ⏱ 45 sec — humble, specific, senior tone
- ⚠ Say "public information" if pressed on VIR-5500 internals
- ✅ Name both pillars`,
    `→ Oncology — the measurement problem.`
  ),

  'company-bridge-oncology-problem': note(
    `For a PRO-XTEN masked T-cell engager, ==plasma exposure is not tumor exposure==.

Assays may return masked or total drug. The decision needs active tumor-compartment exposure tied to PD.

I would start with three questions: what does the assay actually see? What does tumor biology change? What exposure metric is ==decision-bearing==?`,
    `- ⏱ 80 sec — sound like a translational partner
- ⚠ Based on public information only
- ✅ Land on "decision-bearing exposure metric"`,
    `→ Assay to model to dose — and OBD versus MTD.`
  ),

  'company-bridge-oncology-approach': note(
    `Walk the chain: assay → model → dose.

Separate safety and efficacy metrics. CRS risk may follow early Cmax. Efficacy may need AUC or time above an active threshold.

For T-cell engagers, step-up dosing and bell-shaped PD can make ==optimal biological dose== more relevant than maximum tolerated dose.

Model precision is not power. When sampling is limited, optimal-design tools can deliver a more precise answer from fewer patients.`,
    `- ⏱ 95 sec — concrete: assay, model, dose, OBD
- ✅ Land on "model precision is not power"`,
    `→ Map the four cases to Vir's problems.`
  ),

  'company-bridge-case-mapping': note(
    `Ambrisentan shows ==target exposure thinking==. Asparlas shows efficient design under feasibility constraints. India shows a reliance dossier under pressure. AI shows how to scale review without losing traceability.

The diseases are not the same. The ==decision discipline transfers==.`,
    `- ⏱ 65 sec — bridge from biography to contribution
- ✅ Land on "decision discipline transfers"`,
    `→ HBV and HDV — familiar territory, honest limits.`
  ),

  'company-bridge-hbv-hdv': note(
    `HBV is familiar territory — HBV combination patent co-inventor scope, and viral mAb experience with Sotrovimab and Dectova.

I do not overclaim direct HDV experience. The transferable contribution is ==disciplined combination thinking==: target-product profile, interaction risk, resistance and durability, biomarker timing, and dose evidence that can support functional-cure decisions.`,
    `- ⏱ 65 sec — humility line explicit: HBV adjacency, HDV learning posture
- ✅ Land on "disciplined combination thinking"`,
    `→ What I would own in the first ninety days.`
  ),

  'company-bridge-fit': note(
    `I would play a cross-functional ==dose-defense function== — not a lone modeler.

First ninety days: listen first, map evidence gaps, tighten assay-to-model-to-dose decisions for priority programs.

For VIR-5500, speak conditionally from public information: build backward from the filing decision, identify the exposure metric, and make the open questions explicit.`,
    `- ⏱ 90 sec — partner and player-coach posture
- ✅ Land on "open questions explicit"`,
    `→ Final synthesis — the common thread.`
  ),

  'closing-thread': note(
    `The common thread is not a method. It is the standard for decision-making when measurement falls short.

Case one: trial untrialable. Case two: sample-limited. Case three: locally constrained. Case four: workflow unbuilt.

In each, the model or evidence system makes the ==dose or decision defensible==.`,
    `- ⏱ 60 sec — say the headline nearly verbatim
- ✅ Four constraints, one discipline`,
    `→ Why Vir — operating model in practice.`
  ),

  'closing-fit': note(
    `Translate the four cases into an operating model for Vir: start from the decision, make the dose defensible, keep judgment visible across functions.

I can lead under uncertainty without losing ==interpretability==.`,
    `- ⏱ 75 sec — Vir-facing and practical
- ✅ Land on "interpretability"`,
    `→ Thank you and Q&A.`
  ),

  'closing-thanks': note(
    `Thank you for the time and the conversation.

Happy to go deeper on pediatric PopPK, Asparlas efficient design, India reliance, or AI infrastructure — wherever the panel wants to spend the time.`,
    `- ⏱ 30 sec — stop after the invitation
- ✅ Let the four chips guide depth if needed
- 🧠 Open **Reading → Off-slide memory** or slide Q&A if a detail was trimmed from screen`,
    `→ Q&A.`,
    `- **Global honesty guardrails:** no Servier-confidential numbers · no VIR-5500 internal access claim · ADC breadth-only · Pharazi personal research not product transfer · HBV patent narrow scope
- **Depth routing:** CS1 backups \`cs1-backup-*\` · CS2 asparlas \`cs3-backup-*\` (legacy IDs) · CS3 India \`cs3-backup-*\` · CS4 \`ai-backup-master\`
- **One-sentence close:** When measurement falls short, I build the evidence bridge that makes the dose and the decision defensible.`
  ),

  'ai-backup-master': note(
    `Backup gateway for extended Pharazi material — architecture, component workflows, audit dashboards.

Use only if the panel asks for technical depth beyond the main CS4 spine.`,
    `- ⏱ Optional — do not volunteer
- ✅ Return to main thesis if the thread drifts`,
    `→ Return to live discussion or Q&A.`
  ),

  'cs3-backup-master': note(
    `Backup gateway for ivosidenib India reliance — CDSCO strategy, Rule 101, pillar detail.

Use only if the panel asks for global-to-local regulatory depth beyond the main CS3 spine.`,
    `- ⏱ Optional — do not volunteer
- ✅ Tie answers back to convergence of evidence`,
    `→ Return to live discussion or Q&A.`
  ),
};
