const note = (spoken: string, cues: string, bridge: string) => `## Spoken
${spoken}

## Cues
${cues}

## Bridge
${bridge}`;

export const overrideNotes: Record<string, string> = {
  title: note(
    `Open with the Vir audience first. This is a Senior Director clinical pharmacology seminar for Vir Biotechnology, and the thesis is the throughline for the whole talk: when measurement falls short, the model makes the dose defensible.

Name the four cases quickly. Case one is pediatric PAH, where the trial could not carry the answer. Case two is Asparlas, where the adult endpoint-powered trial was not feasible. Case three is India/ivosidenib, where a local trial request had to be answered with a defensible reliance package. Case four is AI / Pharazi, where the workflow has to preserve traceability as the evidence system scales.`,
    `Time: 45 sec. Keep this calm and declarative. Do not over-explain the cases yet.`,
    `Next: the thesis hook.`
  ),

  'hook-A-trial-not-answer': note(
    `This is the premise of the talk. Clinical pharmacology is most valuable when the clean measurement is unavailable, incomplete, or too complex to interpret directly.

The four marks are the promise of the talk: untrialable pediatric evidence, sample-limited adult design, local-evidence reliance, and unbuilt evidence infrastructure. The shared standard is not "more modeling." It is defensible dosing and defensible decision-making.`,
    `Time: 60-75 sec. Say "defensible dose" plainly. Avoid sounding like every problem has the same solution.`,
    `Next: why my background fits this operating problem.`
  ),

  'career-arc': note(
    `Use the career arc as the credibility bridge, not a biography dump. The point is that my career moved from patient-level clinical judgment into quantitative decision-making, then into cross-functional clinical pharmacology leadership.

Land on the operating question: how do we turn incomplete evidence into a defensible clinical pharmacology decision?`,
    `Time: 75-90 sec. One sentence per stop. Do not linger on awards unless asked.`,
    `Next: roadmap.`
  ),

  roadmap: note(
    `The roadmap is four cases and one discipline. Case one shows regulatory-tested pediatric extrapolation. Case two shows efficient design for Asparlas. Case three shows India reliance and cross-functional leadership under pressure. Case four shows audit-ready AI / ML infrastructure for clinical pharmacology workflows.

Be explicit that the portfolio and bridge come after the cases. The story is not a methods catalog; it is a sequence of decision constraints.`,
    `Time: 75 sec. Set expectations for a concise main story with backups available.`,
    `Next: Case 01.`
  ),

  'cs1-divider': note(
    `Open Case 01 as the regulatory-tested anchor. Pediatric PAH is a setting where a conventional efficacy trial could not reasonably carry the full answer, so exposure matching became the bridge.`,
    `Time: 20 sec. Let the case divider breathe.`,
    `Next: the core question.`
  ),
  'cs1-question': note(
    `Frame the question around dose defensibility. The pediatric program needed a dose that could be supported without pretending the pediatric trial had adult-level evidentiary power.`,
    `Time: 45 sec. Keep the clinical problem clear before modeling details.`,
    `Next: why the question is hard.`
  ),
  'cs1-context': note(
    `Explain why pediatric PAH makes direct evidence hard: small population, ethical constraints, endpoint limitations, and reliance on adult anchor knowledge.`,
    `Time: 45 sec. This is the human and regulatory constraint, not a methods slide.`,
    `Next: mechanism and drug.`
  ),
  'cs1-mechanism': note(
    `Connect the drug mechanism to why exposure matching is reasonable. The audience should hear that the model is anchored in pharmacology, not just statistics.`,
    `Time: 35 sec. Keep endothelin pathway language tight.`,
    `Next: the trial evidence.`
  ),
  'cs1-trial': note(
    `Use the trial slide to show what the program had and what it did not have. The terminated pediatric study still generated interpretable PK evidence when placed inside the adult knowledge base.`,
    `Time: 50 sec. Do not over-apologize for the trial; turn to the bridge.`,
    `Next: model architecture.`
  ),
  'cs1-architecture': note(
    `Describe the architecture as the evidence bridge: adult model, pediatric data, covariates, and regulatory constraints all arranged around one decision.`,
    `Time: 55 sec. Make architecture feel like judgment, not plumbing.`,
    `Next: covariate strategy.`
  ),
  'cs1-covariate-strategy': note(
    `Use this as the detail slide that proves rigor. The model tested the variables that could plausibly matter for exposure and dosing; it did not turn covariates into a fishing expedition.`,
    `Time: 55 sec. Emphasize decision-bearing covariates.`,
    `Next: PopPK build and fit.`
  ),
  'cs1-poppk': note(
    `Explain the PopPK result at the level of model fitness for decision use. The goal was not novelty; it was reliable exposure prediction in pediatric weight bands.`,
    `Time: 65 sec. Use one or two diagnostics only; do not recite the table.`,
    `Next: PK/PD and exposure matching.`
  ),
  'cs1-pkpd': note(
    `Move from PK fit to clinical interpretability. Exposure matching only matters because it supports the pediatric dose relative to the adult evidence anchor.`,
    `Time: 55 sec. Connect back to dose, not model elegance.`,
    `Next: the numbers.`
  ),
  'cs1-outcome': note(
    `Land the result: exposure matching supported the dose strategy and regulators accepted the pediatric logic. This is the first proof point for the talk thesis.`,
    `Time: 45 sec. Keep the regulatory outcome crisp.`,
    `Next: ownership and leadership.`
  ),
  'cs1-bracket': note(
    `Use this slide to show leadership posture. The work is not just technical execution; it is knowing which evidence belongs in which bracket and how to make the argument usable by the team.`,
    `Time: 45 sec. This is a leadership slide.`,
    `Next: lesson.`
  ),
  'cs1-lesson': note(
    `The lesson is portable: when similarity is high and direct evidence is limited, a disciplined quantitative bridge can make a pediatric dose defensible.`,
    `Time: 50 sec. Say "portable" and then stop.`,
    `Next: bridge to Asparlas.`
  ),
  'cs1-bridge': note(
    `Close Case 01 with the thesis, then pivot. In ambrisentan the evidence problem was pediatric extrapolation. In Asparlas, the adult evidence problem is feasibility: an endpoint-powered trial is too large for the question.

The shared move is interpretability. The model has to make the dose defensible even when direct measurement or direct trial evidence cannot carry the decision alone.`,
    `Time: 30 sec. Make the pivot feel natural: pediatric constraint to efficient adult design.`,
    `Next: Case 02, Asparlas.`
  ),

  'cs2-asp-divider': note(
    `Open Case 02 as the efficient-design case. This is not a new therapeutic-area detour; it is the same decision standard under a different constraint. The adult endpoint-powered Asparlas study was not feasible, so the question became how to make a smaller adult evidence package defensible.`,
    `Time: 35 sec. Say "Case 02" clearly; this was imported from a prior Case 03 source.`,
    `Next: why the adult design was hard.`
  ),
  'cs2-asp-challenge': note(
    `The challenge is feasibility without relaxing the decision standard. Pediatric approval and the NSAA surrogate gave a strong reference frame, but the adult Ph-negative ALL study could not simply be powered like a conventional endpoint trial.`,
    `Time: 70 sec. Keep this as problem framing, not methods yet.`,
    `Next: the stacked strategy.`
  ),
  'cs2-asp-strategy': note(
    `The approach stacked two precedented ideas: a model-based simulated primary and optimal design. The important leadership point is that neither was treated as magic; the team asked whether the combination was transparent enough for FDA to review prospectively.`,
    `Time: 75 sec. Use "stacked, but reviewable" as the anchor phrase.`,
    `Next: FDA engagement.`
  ),
  'cs2-asp-fda': note(
    `This is the regulatory decision beat. FDA Type A engagement aligned the adult study at N=60, with the confidence interval relaxed from 90% to 85%. The point is that the model-informed strategy was discussed before execution, not rationalized afterward.`,
    `Time: 75 sec. Be precise: Type A, July 21 2023, N=60.`,
    `Next: why sixty adults could still anchor the model.`
  ),
  'cs2-asp-fit': note(
    `Use this as the quantitative proof. The adult sample was smaller, but it was not arbitrary. The design was chosen around parameter precision and the adult data anchored a model that already had strong pediatric and label-supporting context.`,
    `Time: 75 sec. Make precision the word the panel remembers.`,
    `Next: impact.`
  ),
  'cs2-asp-impact': note(
    `Land the impact: the adult trial burden dropped by 36%, and the method became a documented precedent for how to defend an adult program when endpoint power is not practical.`,
    `Time: 65 sec. Do not overstate beyond the public precedent; keep the claim about the design logic.`,
    `Next: bridge to India.`
  ),
  'cs2-asp-bridge': note(
    `Close Case 02 by making the transfer explicit. Asparlas shows how a smaller study can still be decision-grade when the design is transparent. India shows the same principle when the constraint is not sample size but local evidence: the dossier has to carry the uncertainty honestly.`,
    `Time: 45 sec. Transition from efficient design to access under pressure.`,
    `Next: Case 03, Ivosidenib in India.`
  ),

  'cs2-pharazi-divider': note(
    `Case four is the only case that is not about a single drug. It is about the system that does the work.

Pharazi is personal research into audit-ready clinical pharmacology workflows: deterministic tools, privacy boundaries, human accountability, and traceable outputs. This is not a product pitch and not a sponsor deployment claim.`,
    `Time: 25 sec. Say "personal research" clearly.`,
    `Next: regulatory floor.`
  ),
  'cs2-regulatory-floor': note(
    `Anchor AI in the regulatory floor. The point is not to chase novelty; it is to build workflows that can meet documentation, traceability, and review standards.`,
    `Time: 35 sec. Keep ICH M15 as the operating constraint, not a buzzword.`,
    `Next: gap.`
  ),
  'cs2-gap': note(
    `The gap is that many computational workflows can produce outputs faster than they can explain them. Clinical pharmacology cannot accept that at the decision point.`,
    `Time: 35 sec. Use this as the problem statement for AI.`,
    `Next: working overview.`
  ),
  'cs2-working-overview': note(
    `Show the architecture at a high level: inputs, deterministic tools, agent orchestration, review, and output. The point is that the expert remains accountable and the workflow remains inspectable.`,
    `Time: 35 sec. Do not get lost in tool count unless asked.`,
    `Next: PopPK dashboard.`
  ),
  'cs2-poppk-dashboard': note(
    `Use the dashboard as the practical proof. The system is valuable only if it improves the way a clinical pharmacology team reviews assumptions, diagnostics, simulations, and decisions.`,
    `Time: 35 sec. Make it concrete.`,
    `Next: publication close.`
  ),
  'cs2-publication-close': note(
    `Close the AI case with discipline: faster workflows are useful only when they preserve traceability, privacy boundaries, deterministic computation, and human review.

This case should sound like architecture judgment, not startup pitching.`,
    `Time: 30 sec. Land on accountability.`,
    `Next: portfolio breadth.`
  ),

  'portfolio-01': note(
    `Use the portfolio slide to widen the aperture without creating a fifth case. The four cases are the deep proof points; the portfolio shows breadth across oncology, biologics, antiviral and infectious disease, respiratory and PAH, and dose-prediction or AI work.

Keep the ADC row as breadth only. If asked, say the precise honesty guardrail: I led and directed strategy, but ADC is not the core case in this final talk.`,
    `Time: 120 sec. Do not walk every cell. Highlight oncology, biologics, antiviral/ID, and AI as bridge-relevant breadth.`,
    `Next: company bridge divider.`
  ),
  'company-bridge-divider': note(
    `Now translate the core into Vir. Do not claim direct access to confidential Vir data. The bridge is built from public pipeline information and the evaluator signal: two pillars, one discipline, making the dose defensible.

Name the two pillars: oncology masked T-cell engagers, and infectious disease with HBV / HDV functional cure ambitions.`,
    `Time: 45 sec. Tone: humble, specific, senior.`,
    `Next: oncology problem.`
  ),
  'company-bridge-oncology-problem': note(
    `Frame the oncology problem through measurement. For a PRO-XTEN masked T-cell engager, plasma exposure is not the same as tumor exposure. Assays may return masked or total drug, but the decision needs active tumor-compartment exposure tied to PD.

This is the point to sound like a translational partner: I would ask what the assay sees, what the tumor biology changes, and what exposure metric is decision-bearing.`,
    `Time: 80 sec. Do not overclaim knowledge of VIR-5500 internals. Say "based on public information" if needed.`,
    `Next: oncology approach.`
  ),
  'company-bridge-oncology-approach': note(
    `Walk the assay to model to dose chain. Separate safety and efficacy metrics: CRS risk may follow early Cmax, while efficacy may require AUC or time above active threshold. For T-cell engagers, step-up or priming logic and bell-shaped PD can make optimal biological dose more relevant than maximum tolerated dose.

Land on the evaluator signal: model precision is not power. Use optimal-design tools when the program needs a more precise answer from limited sampling.`,
    `Time: 95 sec. Keep it concrete: assay, model, dose, OBD.`,
    `Next: why the four cases transfer.`
  ),
  'company-bridge-case-mapping': note(
    `Map the cases explicitly. Ambrisentan shows target exposure thinking. Asparlas shows efficient design under feasibility constraints. India shows a reliance dossier under pressure. AI shows how to scale review without losing traceability.

The point is not that the diseases are the same. The point is that the decision discipline transfers.`,
    `Time: 65 sec. This is the bridge from biography to contribution.`,
    `Next: HBV and HDV.`
  ),
  'company-bridge-hbv-hdv': note(
    `Use the infectious-disease slide carefully. Say that HBV is familiar territory because of the HBV combination patent co-inventor scope and viral mAb experience with Sotrovimab and Dectova. Do not overclaim HDV direct experience.

The transferable contribution is disciplined combination thinking: target-product profile, interaction risk, resistance and durability, timing of biomarkers, and dose evidence that can support functional-cure decisions.`,
    `Time: 65 sec. Keep the humility line explicit: HBV adjacency, HDV learning posture.`,
    `Next: what I would own.`
  ),
  'company-bridge-fit': note(
    `Close the bridge with the role you would play: cross-functional dose-defense function, not a lone modeler. In the first 90 days, listen first, map the evidence gaps, and then help tighten assay to model to dose decisions for priority programs.

For VIR-5500, speak conditionally from public information: build backward from the filing decision, identify the exposure metric, and make the open questions explicit.`,
    `Time: 90 sec. Say "partner and player-coach" if it feels natural.`,
    `Next: final synthesis.`
  ),

  'closing-thread': note(
    `Bring the thesis home. The common thread is not a method; it is the standard for decision-making when measurement falls short.

Case one: trial untrialable. Case two: sample-limited. Case three: local-evidence constrained. Case four: workflow unbuilt. In each, the model or evidence system makes the dose or decision defensible.`,
    `Time: 60 sec. Say the headline nearly verbatim.`,
    `Next: why Vir.`
  ),
  'closing-fit': note(
    `Translate the four cases into an operating model for Vir: start from the decision, make the dose defensible, and keep judgment visible across functions.

The point is that I can lead under uncertainty without losing interpretability.`,
    `Time: 75 sec. Keep it Vir-facing and practical.`,
    `Next: thank you and Q&A.`
  ),
  'closing-thanks': note(
    `Close with gratitude and invite questions. The four discussion chips let the panel choose depth: pediatric PopPK, Asparlas efficient design, India reliance, or AI / ML infrastructure.`,
    `Time: 30 sec. Stop after the invitation.`,
    `End: Q&A.`
  ),

  'ai-backup-master': note(
    `This is the backup gateway for extended AI / Pharazi material. Use only if the panel wants deeper technical detail on architecture, component workflows, or audit dashboards.`,
    `Time: optional backup only.`,
    `Backup navigation.`
  ),
  'cs3-backup-master': note(
    `This is the backup gateway for prior India reliance work on ivosidenib. Use only if the panel asks about global-to-local regulatory strategy or CDSCO reliance.`,
    `Time: optional backup only.`,
    `Backup navigation.`
  ),
};
