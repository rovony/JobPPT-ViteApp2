// @ts-nocheck
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
 * Continuous talk notes — arrival/departure lines chain across the full deck.
 * Presentation order: Intro → CS1 → India → Asparlas → Pharazi → Outro.
 */
const notes: Record<string, string> = {
  title: note(
    `Thank you for the time. Thesis up front: ==I integrate biology, data, quantitative methods, and cross-functional judgment to reduce uncertainty at the decisions that matter== — and I build the standards that make that work repeatable.

Today is four proofs under four constraints — not a CV tour.`,
    `- ⏱ ~45 sec
- ✅ Land the central claim once`,
    `→ Four constraints that make ordinary trial logic fail.`
  ),

  hook: note(
    `Four constraints. ==Untrialable== efficacy. ==Local-evidence== gaps. ==Sample-limited== adult programs. ==Unbuilt== evidence systems for AI.

Same operating question each time: what must be true before the next action is defensible?`,
    `- ⏱ ~75 sec — name each badge once
- ✅ Do not open methods yet`,
    `→ A short arc of how that judgment was built — then the roadmap.`
  ),

  'career-arc': note(
    `Short arc only. PAH and oncology dose defense, reliance dossiers, efficient design, and now workflow standards for AI-assisted clin pharm.

The point is not titles. It is ==repeatable decision discipline== under different evidence limits.`,
    `- ⏱ ~60 sec — keep it short
- ⚠ Not a resume walk`,
    `→ Four proofs in the order you will hear them.`
  ),

  roadmap: note(
    `Order today: ==Ambrisentan== first — the deep anchor. Then ==Ivosidenib in India== — the adjacent extrapolation with a harder gap. Then ==Asparlas== — design and precision. Then ==Pharazi== — future capability, short.

Watch for one seam: interpolation inside a shared evidence base, then transport across a missing one.`,
    `- ⏱ ~70 sec
- 👆 Point presentation order, not file numbers`,
    `→ Case 01.`
  ),

  'cs1-divider': note(
    `First case: ambrisentan in pediatric pulmonary arterial hypertension.

The Phase IIb program stopped early, but an ==exposure bridge still supported EMA and PMDA pediatric approval in 2021==.`,
    `- ⏱ 20 sec
- ⚠ Do NOT mention FDA yet`,
    `→ The decision that remained after efficacy stopped carrying the answer.`
  ),

  'cs1-pivot': note(
    `The move that made the program solvable: ==stop asking the efficacy question==.

Core premise: where disease similarity is high, matching the adult exposure range answers the dose. Caveat first: disease similarity is an ==assumption, not a finding==.`,
    `- ⏱ ~50–55 sec
- 👆 Point EFFICACY struck → EXPOSURE
- ⚠ Caveat on slide — not in Q&A only`,
    `→ The options that remained once the pivot was taken.`
  ),

  'cs1-decision': note(
    `The decision was still a ==pediatric dose label without a carrying efficacy trial==.

→ click: three paths. → click: we take the bridge. → click: stakes if wrong.

If wrong: under-treat progressive rare disease — or expose children without a defendable bridge.`,
    `- ⏱ ~70 sec · 3 in-slide clicks before advance
- 👆 Fork — center path CHOSEN`,
    `→ Why no endpoint trial could have worked.`
  ),

  'cs1-reality': note(
    `Not missing diligence — ==structural impossibility==. Timeline 2013→2019. Result: 39 evaluable · 211 sparse PK.

Five constraints: enrolment, pooling, control arm, endpoint, STARTS-1 precedent. Constraint was ==arithmetic and ethics==.`,
    `- ⏱ ~1.5–2 min
- 👆 2–16 / million · STARTS-1 235`,
    `→ Architecture: 380 build, 39 confirm.`
  ),

  'cs1-strategy': note(
    `==Three hundred eighty adults build the model. Thirty-nine children confirm it. Never the reverse.==

Fixed allometry a priori. Strict parsimony — only weight survives. Refused Garnett–Florian (N=5 hemo). Bosentan FUTURE-1 validates architecture shape.`,
    `- ⏱ ~2–2.5 min — funnel first, then refused / precedent
- ✅ Land: only route this dataset could support`,
    `→ Did exposures land where the decision needed them?`,
    `- Full covariate table: backup B17`
  ),

  'cs1-credibility': note(
    `Both bands inside adult AUC. Low dose ==minus three percent== · high ==plus zero point three==.

→ click: Cmax 11–18% higher — separate from AUC. Null E-R in range is unidentifiable slope — not flat, not no-risk. Disease similarity remains the hinge.`,
    `- ⏱ ~2–2.5 min
- 👆 −3% / +0.3%`,
    `→ Kill conditions agreed before analysis.`
  ),

  'cs1-boundary': note(
    `Four pre-agreed kill conditions: systematic miss in predictive checks · exposures drift after allometry · pediatric exposure outside adult band · unpredicted dose-related safety.

Any one → redesign or decline the bridge. ==Declining is a legitimate scientific output.== Boundaries before answers.`,
    `- ⏱ ~1.5–2 min`,
    `→ Who moved, and what agencies did.`
  ),

  'cs1-landing': note(
    `EMA 2021 approved 8–<18. PMDA supported on the same materials. ==FDA never received the package== — split-rights commercial path, not science declined. Say it before the room assumes otherwise.

→ click: objection + answer + communication win (one shared exposure number).`,
    `- ⏱ ~2–2.5 min
- 🎚 Calm and precise on FDA`,
    `→ Portable lesson — ICH — seam into India.`,
    `- FDA non-filing if asked: commercial/split-rights framing, not scientific rejection`
  ),

  'cs1-lesson': note(
    `Public codification (Okour 2023) → ICH E11A. What worked / do differently / what transfers.

Transferable principle: evidence threshold when a clean experiment is unavailable. Not “PAH = engagers.” Next: India — transport across a void.`,
    `- ⏱ ~90 sec
- ✅ Land on architecture transfers + India seam`,
    `→ Ivosidenib / India.`
  ),

  'cs3-ivosidenib-divider': note(
    `Adjacent case. Ivosidenib — approved in forty-two-plus countries, not yet in India at the moment of the ask.

Same discipline as Case 01. Different evidence geometry: ==no local anchor to point at==.`,
    `- ⏱ ~25 sec
- ✅ Speak the seam once: interpolation → transport`,
    `→ The regulator asked for local data.`
  ),

  'cs3-setup': note(
    `December 2024: SEC asked for PK/PD in India before approval. Default framing: reasonable. Against the evidence we held: ==twelve to eighteen months of delay== patients with IDH1-mutant AML did not need.

Competing actions: run the local study · abandon · ==justify why the global package is sufficient==.`,
    `- ⏱ ~80 sec`,
    `→ Rule 101 opened a door. It did not answer the science.`
  ),

  'cs3-bg-regulatory': note(
    `August 2024: ==Rule 101== opened a reliance pathway. The door opened. The science still had to walk through it.

Reliance is not automatic waiver. We still owed a defendable Clin Pharm argument — and a named residual gap.`,
    `- ⏱ ~80 sec
- ⚠ Do not say "Rule 101 makes waivers automatic"`,
    `→ Six converging lines of evidence.`
  ),

  'cs3-pillars': note(
    `Six pillars. No single pillar wins alone. PopPK, flat E-R at 500 mg QD, PBPK-supported DDI, population genetics evidence, global labels, and the commitment structure.

The package is convergent — that is the claim.`,
    `- ⏱ ~100 sec
- 👆 One visual pass across pillars`,
    `→ Every pillar was also a kill test.`
  ),

  'cs3-B4-population-evidence': note(
    `Credibility: what would have broken the argument. Race covariate tested rather than assumed. Population evidence had to survive scrutiny. If the transport story failed a kill test, we would have run the local study.`,
    `- ⏱ ~70 sec`,
    `→ What CDSCO did.`
  ),

  'cs3-reversal': note(
    `==CDSCO marketing authorization, 14 May 2025== — without a pre-approval local trial.

The outcome is access unlocked by a dossier argument, not by waiting out a local PK study.`,
    `- ⏱ ~80 sec`,
    `→ What we shipped — and what we named as still open.`
  ),

  'cs3-reckoning': note(
    `Honesty: the gap was named, then committed to. Phase 4 bounded what we would not pretend to know pre-approval.

That is the Senior Director move — uncertainty made actionable, not hidden.`,
    `- ⏱ ~80 sec`,
    `→ Both conditions had to hold.`
  ),

  'cs3-leadership': note(
    `Four functions. Two independent conditions — the science and the pathway — ==both== had to hold. One without the other fails.

That is influence under pressure, not a solo model win.`,
    `- ⏱ ~100 sec
- ✅ Never cut this beat in rehearsal`,
    `→ Portable close for India.`
  ),

  'cs3-bridge-recap': note(
    `The science was the bridge. Convergent evidence plus a named residual gap can unlock a decision a single analysis cannot.

Next constraint flips again: not a missing population — a ==sample-limited== adult program where endpoint power is the fiction.`,
    `- ⏱ ~45 sec`,
    `→ Asparlas.`
  ),

  'cs2-asp-divider': note(
    `Asparlas — calaspargase pegol in adult Ph-negative ALL. Constraint: ==sample-limited==. Job: design and precision replace impossible endpoint power.`,
    `- ⏱ ~20 sec`,
    `→ The challenge that made the powered trial untenable.`
  ),

  'cs2-asp-challenge': note(
    `The adult endpoint-powered trial was not a serious option. The decision was whether we could deliver a ==defensible design== — or lose the adult program.`,
    `- ⏱ ~70 sec`,
    `→ The two-move strategy.`
  ),

  'cs2-asp-strategy': note(
    `Strategy in two moves: informative pediatric prior, and an adult augmentation sized for precision — not for classical power on an endpoint we could not reach.`,
    `- ⏱ ~80 sec`,
    `→ Does the precision story hold?`
  ),

  'cs2-asp-fit': note(
    `Fit: %RSE and pcVPC plateau — more adults stop buying precision. That is the kill curve for over-sizing.`,
    `- ⏱ ~80 sec
- 👆 RSE stability curve`,
    `→ What FDA agreed on the record.`
  ),

  'cs2-asp-fda': note(
    `FDA Type A: ==N equals sixty== agreed. Waterfall from the classical ask down to the precision-based design. Precedent, not permission theater.`,
    `- ⏱ ~70 sec`,
    `→ Impact — and the bridge line into capability.`
  ),

  'cs2-asp-impact': note(
    `Impact: a citable design precedent when sample size is the constraint. Spoken bridge: regulatory argument and trial design are two faces of the same discipline — next, the evidence ==system== itself.`,
    `- ⏱ ~60 sec`,
    `→ Pharazi — short epilogue.`
  ),

  'cs2-pharazi-divider': note(
    `Epilogue. ==Personal research== into audit-ready clin pharm workflows — not a sponsor deployment claim. Constraint: the system is ==unbuilt== for reviewable AI.`,
    `- ⏱ ~20 sec
- ⚠ Honesty: personal research`,
    `→ What must be true before AI output informs a dose.`
  ),

  'cs2-regulatory-floor': note(
    `Floor first: documentation path, human accountability, privacy boundaries. Auditability before autonomy.`,
    `- ⏱ ~40 sec`,
    `→ The gap that makes naive LLM analysis unsafe.`
  ),

  'cs2-gap': note(
    `Gap: end-to-end LLM analysis is unreviewable for dose decisions. Agents may orchestrate; deterministic tools must compute; humans own.`,
    `- ⏱ ~35 sec
- Cut first if over time`,
    `→ Working system overview.`
  ),

  'cs2-working-overview': note(
    `Working overview of the architecture — orchestration around tools that leave an audit trail.`,
    `- ⏱ ~35 sec
- Cut second if over time`,
    `→ PopPK dashboard — do not drop.`
  ),

  'cs2-poppk-dashboard': note(
    `This is the proof surface: comparator, validation view, failure modes visible. If AI is going to touch PopPK review, it has to look like ==this kind of inspectable work== — not a chat transcript.`,
    `- ⏱ ~50 sec
- ✅ Never drop this slide`,
    `→ Close the epilogue.`
  ),

  'cs2-publication-close': note(
    `Public methods posture. Personal research. Happy to go deeper in Q&A — then we synthesize the pattern across all four cases.`,
    `- ⏱ ~30 sec`,
    `→ Cases closed.`
  ),

  'cs4-close-divider': note(
    `Four cases closed. One discipline.`,
    `- ⏱ ~15 sec`,
    `→ Senior Director pattern table.`
  ),

  synthesis: note(
    `Read the table as leadership patterns, not methods. Define the decision. Integrate biology and data. Challenge the model. Make uncertainty actionable. Align the team. Leave a capability.

Closing line: ==The method changed with the scientific question. The pattern did not.==`,
    `- ⏱ ~90 sec
- 👆 One row as example, then the closing line`,
    `→ Why Xencor — public patterns only.`
  ),

  'xencor-bridge': note(
    `Public pipeline only. Masked engagers make plasma a measurement problem. Same discipline: name the decision-bearing exposure metric, align assumptions before they become regulatory risk, keep humans accountable when AI assists.

No claim of TCE ownership. Transferable patterns.`,
    `- ⏱ ~60 sec
- ⚠ No overclaim`,
    `→ Close.`
  ),

  'closing-thanks': note(
    `Thank you. Happy to go wherever the questions are — Case 01 depth, India kill tests, Asparlas design depth, or the AI floor.`,
    `- ⏱ ~30 sec`,
    `→ Q&A.`
  ),

  'cs1-mechanism': note(
    `Backup — pathway if asked. Ambrisentan blocks ETA with high selectivity.`,
    `- Volunteer only if asked`,
    `→ Return to the live spine.`
  ),

  'cs1-B17-covariate-analysis': note(
    `Backup — covariate / allometry depth if challenged.`,
    `- Optional backup`,
    `→ Return to the live spine.`
  ),
};

export default notes;
