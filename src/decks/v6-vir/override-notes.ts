const note = (spoken: string, cues: string, bridge: string) => `## Spoken
${spoken}

## Cues
${cues}

## Bridge
${bridge}`;

export const overrideNotes: Record<string, string> = {
  title: note(
    `Open with the Vir audience first. This is a Senior Director clinical pharmacology seminar for Vir Biotechnology, and the thesis is the throughline for the whole talk: when measurement falls short, the model makes the dose defensible.

Name the three cases quickly. Case one is pediatric PAH, where the trial could not carry the answer. Case two is ADC multi-analyte PK, where the measurement architecture itself changes the dose decision. Case three is AI / Pharazi, where the workflow has to preserve traceability as the evidence system scales.`,
    `Time: 45 sec. Keep this calm and declarative. Do not over-explain the cases yet.`,
    `Next: the thesis hook.`
  ),

  'hook-A-trial-not-answer': note(
    `This is the premise of the talk. Clinical pharmacology is most valuable when the clean measurement is unavailable, incomplete, or too complex to interpret directly.

The three cards are the promise of the next 35 minutes: untrialable pediatric evidence, multi-analyte ADC evidence, and unbuilt evidence infrastructure. The shared standard is not "more modeling." It is defensible dosing.`,
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
    `The roadmap is three cases and one discipline. Case one shows regulatory-tested pediatric extrapolation. Case two shows modality complexity in ADC multi-analyte PK. Case three shows audit-ready AI / ML infrastructure for clinical pharmacology workflows.

Be explicit that the ADC case is a transferable leadership credential. Do not imply that most of my career is ADCs or that I personally executed every assay and model.`,
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
    `Next: bridge to ADC.`
  ),
  'cs1-bridge': note(
    `Close Case 01 with the thesis, then pivot. In ambrisentan the evidence problem was pediatric extrapolation. In the ADC case, the evidence problem is different: several analytes can each tell a different story about the same dose.

The shared move is interpretability. The model has to make the dose defensible even when the measurement system is incomplete or complex.`,
    `Time: 30 sec. Make the pivot feel natural: pediatric constraint to modality constraint.`,
    `Next: Case 02, ADC multi-analyte PK.`
  ),

  'cs2-adc-divider': note(
    `Open the ADC case honestly. This is a transferable clinical pharmacology leadership case, not a claim that ADCs are the majority of my career.

The point is that ADC programs force modelers and clinical teams to agree on what each analyte means before dose decisions can be defended.`,
    `Time: 25 sec. Use "transferable" once, then move into the science.`,
    `Next: the ADC decision question.`
  ),
  'cs2-adc-question': note(
    `The first question is not "what is the PK?" It is which exposure makes the dose interpretable. Conjugate, total antibody, payload, and derived metrics can each support a different decision.

That is why the clinical pharmacology strategy starts upstream of modeling.`,
    `Time: 45 sec. Avoid confidential specifics. Keep to public methods and general ADC logic.`,
    `Next: why ADCs are hard.`
  ),
  'cs2-adc-why-hard': note(
    `ADC pharmacology makes assay selection a modeling decision. The measured species is not metadata; it defines the biological claim the model can make.

The practical risk is a model that is precise for the wrong analyte or the wrong exposure window.`,
    `Time: 45 sec. Use the four cards as a tour: conjugate, total antibody, payload, derived metric.`,
    `Next: disposition map.`
  ),
  'cs2-adc-disposition': note(
    `Before model fitting, the team needs a disposition map. This is where binding, internalization, catabolism, deconjugation, and payload release become one shared picture.

The map prevents a model from hiding a biological assumption inside a parameter.`,
    `Time: 45 sec. Keep this as the visual systems-thinking beat.`,
    `Next: population PK architecture.`
  ),
  'cs2-adc-model': note(
    `The base model separates platform biology from study noise. A useful ADC PopPK model is not simply a clearance estimate; it is a scaffold for interpreting species, variability, and dose scenarios.`,
    `Time: 45 sec. Mention covariates only as decision-bearing variables.`,
    `Next: nonlinearity and TMDD.`
  ),
  'cs2-adc-tmdd': note(
    `Nonlinearity should be treated as a decision point. If target-mediated behavior changes dose choice, show it. If it does not, document robustness and avoid unnecessary complexity.

This is where leadership matters: keep mechanistic ambition connected to clinical consequence.`,
    `Time: 40 sec. Do not overclaim TMDD; say "TMDD-like" if discussing general behavior.`,
    `Next: exposure-response.`
  ),
  'cs2-adc-er': note(
    `Exposure-response only helps if the metric matches the biology. For ADCs, efficacy and safety may point to different analytes or different windows.

The E-R plan should make the metric choice explicit before the result is interpreted.`,
    `Time: 40 sec. Tie efficacy, safety, timing, and action together.`,
    `Next: dose strategy.`
  ),
  'cs2-adc-dose': note(
    `This is where the case becomes clinical. Dose strategy is the point where PK, safety, translational biology, and regulatory narrative have to agree.

The model has to help the team say why this dose, for this population, now.`,
    `Time: 45 sec. This is the strongest cross-functional leadership beat in the ADC case.`,
    `Next: leadership role.`
  ),
  'cs2-adc-leadership': note(
    `Be explicit and credible about role. I led and directed the clinical pharmacology strategy, aligned disciplines, and protected interpretability. I am not claiming to have personally executed every component.

That distinction matters because Senior Director value is strategy, judgment, and team alignment.`,
    `Time: 45 sec. This is the honesty guardrail slide. Say it cleanly.`,
    `Next: ADC lesson.`
  ),
  'cs2-adc-lesson': note(
    `The ADC lesson is that quantitative pharmacology starts with the analyte map. Once the map is clear, modeling can identify which uncertainties matter and which dose rationale is defensible.`,
    `Time: 35 sec. Keep it portable and concise.`,
    `Next: bridge to AI / Pharazi.`
  ),
  'cs2-adc-bridge': note(
    `Bridge biological complexity to computational complexity. In the ADC case, traceability means preserving the chain from analyte to dose. In the AI case, traceability means preserving the chain from data input to model output to decision record.`,
    `Time: 30 sec. The key word is traceability.`,
    `Next: Case 03, AI / Pharazi.`
  ),

  'cs2-pharazi-divider': note(
    `Case three is the only case that is not about a single drug. It is about the system that does the work.

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
    `Next: Vir landing.`
  ),

  'vir-landing-01': note(
    `Now translate the cases to Vir. Do not claim direct Vir program experience. Say that Vir's work sits where viral biology, immune pharmacology, timing, and dose decisions interact, and that these cases show how I operate under evidence constraints.`,
    `Time: 45 sec. This is fit, not flattery.`,
    `Next: what I would bring.`
  ),
  'vir-landing-02': note(
    `State the value proposition: model discipline under evidence constraints. I start from the decision, translate across functions, and modernize workflows without black boxes.`,
    `Time: 45 sec. Keep the tone senior and practical.`,
    `Next: first 90 days.`
  ),
  'vir-landing-03': note(
    `Describe the first 90 days as learn first, then tighten the operating model. Portfolio evidence map, cross-functional decision rhythm, and reusable evidence standards.`,
    `Time: 45 sec. This is a leadership close; avoid over-prescribing before joining.`,
    `Next: final synthesis.`
  ),

  'closing-thread': note(
    `Bring the thesis home. The common thread is not a method; it is the standard for decision-making when measurement falls short.

Case one: trial untrialable. Case two: measurement complex. Case three: workflow unbuilt. In each, the model or evidence system makes the dose or decision defensible.`,
    `Time: 60 sec. Say the headline nearly verbatim.`,
    `Next: why Vir.`
  ),
  'closing-merck': note(
    `This is the "Why Vir" slide despite the inherited file name. Translate the three cases into an operating model for Vir: pediatric extrapolation, modality complexity, and audit-ready infrastructure.

The point is that I can lead under uncertainty without losing interpretability.`,
    `Time: 75 sec. Do not mention Merck.`,
    `Next: thank you and Q&A.`
  ),
  'closing-thanks': note(
    `Close with gratitude and invite questions. The three discussion chips let the panel choose depth: pediatric PopPK, ADC multi-analyte strategy, or AI / ML infrastructure.`,
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
