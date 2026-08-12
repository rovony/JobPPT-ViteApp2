import qp2QA from '../qp2-seminar-v4/qa';
import pharaziQA from '../pharazi-seminar/qa';

const pharaziIdMap: Record<string, string> = {
  '03-regulatory-floor': 'cs2-regulatory-floor',
  '04-market-moving': 'cs2-market-moving',
  '05-gap': 'cs2-gap',
  '06-transition': 'cs2-transition',
  '06-5-m2-begins': 'cs2-m2-begins',
  '06-6-foundation-overview': 'cs2-foundation-overview',
  '07-principle1': 'cs2-principle1',
  '08-principle2': 'cs2-principle2',
  '09-principle3': 'cs2-principle3',
  '10-principle4': 'cs2-principle4',
  '11-principle5': 'cs2-principle5',
  '11-5-foundation-audit': 'cs2-foundation-audit',
  '12-5-m3-begins': 'cs2-m3-begins',
  '13-transition-components': 'cs2-transition-components',
  '14-domain-data': 'cs2-domain1',
  '15-domain-nca': 'cs2-domain2',
  '16-domain-poppk': 'cs2-domain3',
  '17-domain-er': 'cs2-domain4',
  '18-domain-reg': 'cs2-domain5',
  '19-domain-audit': 'cs2-domain6',
  '19-5a-end-to-end': 'cs2-end-to-end',
  '19-5b-concurrent-use': 'cs2-concurrent-use',
};

// Map Pharazi QA to their new CS2 IDs
const mappedPharaziQA = Object.entries(pharaziQA).reduce((acc, [key, value]) => {
  if (pharaziIdMap[key]) {
    acc[pharaziIdMap[key]] = value;
  }
  return acc;
}, {} as Record<string, any>);

// Map Ivosidenib QA from qp2-seminar-v4 (where it was CS2) to CS3
const mappedIvosidenibQA = Object.entries(qp2QA).reduce((acc, [key, value]) => {
  if (key.startsWith('cs2-')) {
    acc[key.replace('cs2-', 'cs3-')] = value;
  }
  return acc;
}, {} as Record<string, any>);

const virQA: Record<string, string> = {
  title: `## Q1: Why rebuild this around four cases instead of a broader career tour?
**From:** panel chair
**Difficulty:** ★★ · **Topic:** framing

A: Four cases let the panel test the same senior signal under different constraints: pediatric extrapolation, efficient design, regional reliance, and AI-enabled workflow discipline. The portfolio slide gives breadth; the cases give proof.

> **Move-forward:** The structure is designed to make my judgment inspectable, not to list everything I have done.

## Q2: Why remove the ADC case?
**From:** clinical pharmacology leader
**Difficulty:** ★★★ · **Topic:** honesty

A: ADC work remains in the portfolio because it is real breadth, but it is not the cleanest core case for this candidate seminar. The final core cases have clearer public decision points and cleaner evidence-to-impact arcs. If asked about ADCs, I would frame my role accurately: I led and directed strategy; I am not presenting it as the main case in this talk.

> **Anchor:** breadth credential, not showcase case.

## Q3: The title cards look abbreviated — what is the full case framing?
**From:** detail-oriented panelist
**Difficulty:** ★ · **Topic:** off-slide memory

A: The cards are intentionally compact on screen. The full lines are: Case 01 — exposure-matched pediatric PAH dose when the efficacy trial cannot carry the answer, EMA and PMDA approved. Case 02 — defensible Asparlas adult design when the endpoint-powered trial is not feasible, FDA Type A at N equals 60. Case 03 — India ivosidenib waiver through convergent global evidence. Case 04 — audit-ready clin pharm workflows via Pharazi as personal research.

> **Anchor:** short on slide, full lines in notes and Reading cheat sheet.`,

  'hook-A-trial-not-answer': `## Q1: You list four constraints — are these exhaustive?
**From:** framing panelist
**Difficulty:** ★★ · **Topic:** taxonomy

A: They are the four I chose to make the seminar story inspectable, not a taxonomy of every clin pharm problem. Untrialable, sample-limited, local-evidence, and unbuilt infrastructure cover the cases I will show. Other constraints exist — assay ambiguity, masked exposure, combination durability — and I address some of those in the company bridge.

> **Move-forward:** four cases, four constraints, one discipline.

## Q2: Does "unbuilt" mean you think the field should buy your AI platform?
**From:** skeptical panelist
**Difficulty:** ★★★★ · **Topic:** Pharazi honesty

A: No. Unbuilt means the review infrastructure has not caught up to generation speed. Pharazi is personal research demonstrating how I think about traceability — not a procurement pitch to the role.

> **Anchor:** architecture judgment, not product transfer.`,

  'cs1-lesson': `## Q1: FDA never received the package — is that a failure?
**From:** regulatory panelist
**Difficulty:** ★★★★ · **Topic:** FDA caveat

A: It is a commercial and rights outcome, not a scientific rejection of the extrapolation framework. EMA and PMDA accepted the M&S package as pivotal evidence in 2021. The US Letairis label still states pediatric safety and effectiveness have not been established. I disclose that proactively because split rights and regional strategy matter for an honest seminar.

> **Anchor:** disclose FDA gap; do not sound defensive.

## Q2: How does ICH E11A change your 2021 story?
**From:** pediatric expert
**Difficulty:** ★★★ · **Topic:** extrapolation

A: E11A in 2024 codified what we operationalized earlier: where similarity is high, exposure matching can carry more of the inference. Ambrisentan is an early worked example of that architecture — adult efficacy anchor, pediatric PK bridge, totality for submission.

> **Move-forward:** precedent before codification.`,

  'cs2-asp-challenge': `## Q1: Why was N equals 94 "undeliverable" — show your math.
**From:** biostatistics panelist
**Difficulty:** ★★★★ · **Topic:** feasibility

A: The design was endpoint-powered against a 90% NSAA achievement target under the agreed surrogate. That is mathematically clean. Operationally, Ph-negative adult ALL is rare and cooperative-group screen-fail rates made completion horizon unacceptable. The pivot was not doubt about asparaginase biology — it was feasibility of the powered endpoint design.

> **Anchor:** math clean, operations not.

## Q2: Is NSAA a validated surrogate for adults?
**From:** clinical panelist
**Difficulty:** ★★★★ · **Topic:** surrogate endpoint

A: For this program the pediatric label already established the FDA-agreed NSAA threshold at 0.1 U per mL. The adult question was whether a smaller package could still confirm dose and model under that same framework — that is what the Type A engagement tested.

> **Move-forward:** pediatric precedent carried the endpoint definition.`,

  'cs2-asp-strategy': `## Q1: Optimal design plus simulated primary — which one actually convinced FDA?
**From:** quantitative panelist
**Difficulty:** ★★★★ · **Topic:** efficient design

A: Neither alone — the contribution is composition. Optimal design anchored precision under the pediatric informative prior. The simulated primary reframed how the clinical question could be answered with model-drawn virtual patients. FDA engagement had to inspect both assumptions prospectively.

> **Anchor:** stacked precedents, first combined here.

## Q2: Is a simulated primary registrationally acceptable?
**From:** regulatory skeptic
**Difficulty:** ★★★★★ · **Topic:** simulated endpoint

A: Not as a blanket rule. In this context it was repositioned to dose confirmation in early cohorts while the enrollment reduction rested on precision and AE-detection arguments. I would not generalize beyond the Type A record and the asparaginase precedent chain.

> **Move-forward:** context-specific, not a universal template.`,

  'cs2-asp-fit': `## Q1: Your curve is illustrative — what is the hard evidence for N equals 60?
**From:** methodology panelist
**Difficulty:** ★★★★ · **Topic:** model precision

A: Three lines of evidence: N equals 124 pediatric PopPK prior already FDA-reviewed; adult Part 1 external VPC showed no structural failure versus pediatric predictions; sensitivity on cohort ratios, percent RSE, and bootstrap pcVPC plateaued around fifty to sixty adults. The chart teaches the shape; those are the receipts.

> **Anchor:** prior carries information; adults augment.

## Q2: Could you have gone lower than sixty?
**From:** operations panelist
**Difficulty:** ★★★ · **Topic:** sample size

A: The Type A agreement landed on sixty evaluable adults as the prospectively agreed compromise. Sensitivity analyses suggested stability above roughly fifty, but the defensible public claim is the agreed N, not the lowest number the model might tolerate in simulation.

> **Move-forward:** agreed N, not simulated minimum.`,

  'cs2-asp-impact': `## Q1: SPARK-ALL closed at N equals 42 — does that invalidate the design?
**From:** skeptical panelist
**Difficulty:** ★★★★ · **Topic:** trial outcome

A: No. Closure was a sponsor portfolio decision independent of design quality. The durable asset is the Type A precedent and the transparent methodology — optimal design plus AE-detection framing plus model-anchored evidence — not the final enrolled N of one program.

> **Anchor:** methodology durable, trial N is program-specific.

## Q2: What transfers to the role oncology trials?
**From:** hiring manager
**Difficulty:** ★★★ · **Topic:** generalizability

A: The transferable move is sizing for model precision and briefing the agency on the risk tradeoff before execution — especially when endpoint-powered enrollment is infeasible or sampling is sparse. That is directly relevant to masked engagers and step-up designs where dense early PK/PD may matter more than a powered efficacy count.

> **Move-forward:** precision-first design under constraint.`,

  'cs2-asp-bridge': `## Q1: How is Asparlas different from the India case?
**From:** narrative panelist
**Difficulty:** ★★ · **Topic:** case contrast

A: Asparlas is sample-limited efficient design in adults with a prospective FDA agreement. India is local-evidence substitution with a retrospective convergence dossier under waiver rules. Same discipline — make uncertainty honest — different regulatory instrument.

> **Anchor:** design agreement vs reliance dossier.`,

  'cs3-setup': `## Q1: Why emphasize August 2024 before December 2024?
**From:** India regulatory expert
**Difficulty:** ★★★ · **Topic:** chronology

A: Because Rule 101 opened the waiver pathway before the SEC meeting that requested local PK/PD. The strategy was not reactive improvisation in December — the pharmacology package and waiver framing were already being built when the SEC request arrived.

> **Move-forward:** chronology proves preparedness.

## Q2: N equals 253 with zero Indian patients — isn't that the weakness?
**From:** skeptical panelist
**Difficulty:** ★★★★★ · **Topic:** bridging

A: It is a named residual uncertainty, not a hidden one. The argument is somatic tumor biology plus global PopPK with race not significant plus flat exposure-response plus global safety experience plus Phase 4 commitment. Convergence with transparency — not pretending the gap vanished.

> **Anchor:** convergence plus named residual uncertainty.`,

  'cs3-pillars': `## Q1: Which pillar actually carried the waiver?
**From:** regulatory panelist
**Difficulty:** ★★★★ · **Topic:** reliance

A: None alone — that is the point. Mechanism narrowed ethnic sensitivity; PopPK addressed PK similarity; exposure-response anchored dose; intrinsic and extrinsic factors were characterized; global regulatory experience showed consistency; Phase 4 addressed the PK gap post-approval. CDSCO saw convergence, not a single killer analysis.

> **Move-forward:** six pillars, one case.

## Q2: What was in the thirty-six-page justification?
**From:** detail panelist
**Difficulty:** ★★★ · **Topic:** dossier

A: Mechanism-first framing of the six pillars with explicit residual uncertainties — not a statistics-only ethnic bridging memo. Backup slide cs3-B2-six-pillar-package has the structure if you want document-level depth in Q&A.

> **Anchor:** mechanism-first dossier.`,

  'cs3-reckoning': `## Q1: You admit no pre-approval Indian PK — was the case dishonest?
**From:** hostile panelist
**Difficulty:** ★★★★★ · **Topic:** honesty

A: The opposite. The dossier stated what was and was not available pre-approval and committed to Phase 4 PK/PD. Avoiding an unnecessary twelve-to-eighteen-month delay was the patient-access goal; pretending we had local PK would have been dishonest.

> **Anchor:** explicit gaps plus Phase 4.

## Q2: What would you do differently?
**From:** hiring manager
**Difficulty:** ★★★★ · **Topic:** reflection

A: I would still lead with mechanism and convergence, but I would invest even earlier in affiliate and medical alignment so the SEC interaction is a coordinated dossier delivery, not a scramble. The science held; the lesson is operating cadence under deadline.

> **Move-forward:** science plus operating model.`,

  'cs3-reversal': `## Q1: May 14, 2025 — what happened between SEC opinion and approval?
**From:** regulatory panelist
**Difficulty:** ★★★ · **Topic:** timeline

A: The public arc is Rule 101 opening in August 2024, SEC PK/PD request in December 2024, favorable SEC trajectory in spring 2025, and CDSCO marketing authorization May 14, 2025 without a pre-approval local trial. Exact meeting minutes are not my on-slide claim — the outcome and the pharmacology package are.

> **Anchor:** outcome on public record.`,

  'cs3-bridge-recap': `## Q1: What is the one lesson you want from India for this role?
**From:** panel chair
**Difficulty:** ★★ · **Topic:** transfer

A: When local measurement is infeasible or unnecessary, a rigorous clinical pharmacology dossier can be the bridge — if mechanism, PK, exposure-response, and transparency converge. That is the same dose-defense instinct company needs in oncology and infectious disease, even when the disease changes.

> **Move-forward:** dossier as bridge, not default local trial.`,

  'cs4-close-divider': `## Q1: Why pause here instead of going straight to portfolio?
**From:** panel chair
**Difficulty:** ★ · **Topic:** pacing

A: The four cases are the proof core. This beat lets the panel absorb that the evidentiary work is complete before we widen to portfolio breadth and the company bridge. It prevents the talk from feeling like a continuous catalog.

> **Anchor:** core proof complete, then aperture widens.

## Q2: Can you recap all four cases in one minute?
**From:** time-pressed panelist
**Difficulty:** ★★ · **Topic:** synthesis

A: Case one — pediatric ambrisentan exposure bridge, EMA and PMDA approved, FDA never received the package. Case two — Asparlas Type A at N equals 60, pediatric prior plus optimal design. Case three — ivosidenib India waiver May 2025, six pillars plus Phase 4. Case four — Pharazi traceable AI workflows as personal research. One discipline throughout: defensible dose when measurement falls short.

> **Move-forward:** ledger recap without re-teaching.`,

  'cs1-mechanism': `## Q1: The slide says three pathways — are you going to teach all of PAH pharmacology?
**From:** clinical panelist
**Difficulty:** ★★ · **Topic:** scope

A: No. The headline orients the room; this case is only the endothelin arm. Prostacyclin and NO/cGMP pathways are context — backup slide \`cs1-history\` if they want the full timeline. Here I only need ETA selectivity as the pharmacologic premise for matching adult exposure in pediatrics.

> **Anchor:** three pathways on screen · one pathway in the case.

## Q2: Why does ETA selectivity matter — why not block both ETA and ETB?
**From:** clinical pharmacologist
**Difficulty:** ★★★ · **Topic:** mechanism

A: Dual blockade (bosentan-style) adds hepatotoxicity and fluid-retention monitoring burden. Ambrisentan's ETA bias preserves ETB-mediated NO signaling and ET-1 clearance. For this case, the registration logic is simpler: same selective drug, same target — match adult exposure in pediatrics.

> **Move-forward:** same pathway in children → AUC matching is the bridge.`,

  'cs1-question': `## Q1: Why jump to 380 adults before explaining the disease?
**From:** clinical panelist
**Difficulty:** ★★ · **Topic:** case setup

A: The slide is ordered for clinical pharmacologists: drug, terminated pediatric program, then the PK-bridge question, then the adult–pediatric asymmetry. PAH 101 is the next slide. I would not lead with 380 adults in the room — I orient first, then name the asymmetry.

> **Anchor:** setup row → question → numbers → disease on next slide.

## Q2: What does "terminated trial" mean here?
**From:** regulatory panelist
**Difficulty:** ★★★ · **Topic:** program status

A: The Phase IIb pediatric efficacy program stopped early. What remained was an open-label PK-anchored cohort of 39 patients — enough for exposure matching, not for a standalone efficacy re-proof in children.

> **Move-forward:** dose-defense, not repeat-efficacy trial.`,

  'cs2-asp-divider': `## Q1: Why did Asparlas move from Case 03 to Case 02?
**From:** narrative-fit panelist
**Difficulty:** ★★ · **Topic:** story architecture

A: Concession: in the source seminar it was Case 03, and I kept the case components rather than rebuilding them. Reframe: in this current version, Asparlas belongs immediately after ambrisentan because it is the second form of "measurement falls short": not pediatric extrapolation, but a sample-limited adult design. Move-forward: it sets up India by showing that model-informed evidence can earn agreement before the next case shows it earning access.

> **Anchor:** same case, new position, cleaner logic.`,

  'cs2-asp-fda': `## Q1: Was FDA agreement on N=60 a methods win or a regulatory negotiation win?
**From:** quantitative panelist
**Difficulty:** ★★★ · **Topic:** efficient design

A: Both, but I would not separate them. The method created a defensible precision argument; the regulatory engagement made it reviewable before execution. The senior lesson is that model-informed design only matters if the agency can inspect the assumptions and agree with the risk tradeoff prospectively.

> **Move-forward:** method plus alignment, not method alone.`,

  'cs3-ivosidenib-divider': `## Q1: How defensible is an India approval without pre-approval Indian PK/PD data?
**From:** regulatory skeptic
**Difficulty:** ★★★★★ · **Topic:** reliance

A: Concession: it is not the same as having local pre-approval PK/PD, and I would not pretend it is. Reframe: the question is whether the total evidence can answer the local-data question with transparent residual uncertainty. In this case, the argument relied on somatic mechanism, global PopPK, exposure-response, intrinsic and extrinsic factors, global safety experience, and a Phase 4 commitment. Move-forward: the strength is convergence plus transparency, not claiming the gap disappeared.

> **Anchor:** convergence plus named residual uncertainty.`,

  'cs3-leadership': `## Q1: What was the leadership signal in the India case?
**From:** hiring manager
**Difficulty:** ★★★ · **Topic:** leadership

A: The leadership signal was translating a scientific reliance argument into a cross-functional operating model. Quantitative pharmacology could answer whether global evidence extrapolated; regulatory, medical, PV, writing, and the local affiliate had to make the pathway and execution hold. Both had to be true.

> **Move-forward:** senior value is aligning functions around the decision.`,

  'cs2-pharazi-divider': `## Q1: Is Pharazi something you would transfer into a sponsor setting?
**From:** IP / compliance panelist
**Difficulty:** ★★★★★ · **Topic:** AI honesty

A: No, not as a product transfer claim. Pharazi is personal research that demonstrates how I think about auditable clinical pharmacology workflows: deterministic tools, privacy boundaries, human review, and traceability. The transferable asset is the architecture judgment and operating discipline, not a promise to bring an external product into the role.

> **Anchor:** personal research, transferable judgment.`,

  'cs2-publication-close': `## Q1: How do you avoid AI making the evidence less trustworthy?
**From:** senior reviewer
**Difficulty:** ★★★★ · **Topic:** AI governance

A: Concession: badly designed AI can absolutely weaken trust. Reframe: the architecture has to make the expert more accountable, not less. That means deterministic computation where possible, immutable provenance, explicit review checkpoints, and outputs that a clinical pharmacologist can defend without pointing to a black box.

> **Move-forward:** speed is useful only when traceability survives.`,

  'portfolio-01': `## Q1: Are you overclaiming breadth by including ADCs if ADC is no longer a case?
**From:** skeptical panelist
**Difficulty:** ★★★ · **Topic:** portfolio honesty

A: Fair question. I include ADC in the portfolio as breadth because that strategy work is real, but I am not using it as a core case. The core cases are the places where the public evidence and impact are cleanest for this talk. If you want to discuss ADCs, I would keep the language precise: led and directed clinical pharmacology strategy, not claiming every assay or model execution component.

> **Anchor:** accurate scope beats inflated scope.

## Q2: What is the HBV patent scope you are claiming?
**From:** infectious disease panelist
**Difficulty:** ★★★★ · **Topic:** HBV

A: The claim is narrow: co-inventor scope on an HBV combination-therapy patent family, plus viral mAb and antiviral clinical pharmacology experience. I am not claiming direct HDV development experience. The transferable contribution is combination-dose thinking, biomarker timing, interaction risk, and a clear evidence plan for functional-cure decisions.

> **Move-forward:** HBV adjacency with HDV humility.

## Q3: Where did the experience stats go — twelve years, five approvals?
**From:** detail panelist
**Difficulty:** ★ · **Topic:** off-slide memory

A: I removed the stats strip to reduce busyness on screen. The numbers are still true and in my notes: twelve plus years in clinical pharmacology, five plus approvals, six plus agencies, twenty plus publications, spanning oncology, biologics, and antiviral work. The table on screen carries the substantive breadth; the strip was a headline summary.

> **Anchor:** table is substance; strip was summary.`,

  'company-bridge-oncology-problem': `## Q1: Are you claiming to know confidential priority oncology programs or masked engager details?
**From:** program lead
**Difficulty:** ★★★★★ · **Topic:** humility

A: No. My bridge is deliberately based on public information and general clinical pharmacology logic for masked T-cell engagers. The useful question is not "I know your internal model." It is: what does the assay measure, where is active drug generated, which exposure metric links to safety, and which metric links to efficacy?

> **Anchor:** public-info hypothesis, not internal-access claim.`,

  'company-bridge-oncology-approach': `## Q1: Why emphasize OBD rather than MTD?
**From:** oncology clinician
**Difficulty:** ★★★★ · **Topic:** Project Optimus

A: Concession: tolerability still matters. Reframe: for immune-engagers and masked constructs, more dose is not automatically better if efficacy can plateau or become bell-shaped and safety can be driven by early peaks. Move-forward: a defensible OBD requires separate safety and efficacy exposure metrics, step-up logic where appropriate, and a sampling design precise enough to compare doses.

> **Anchor:** separate safety Cmax from efficacy exposure.`,

  'company-bridge-hbv-hdv': `## Q1: What would you contribute in HBV / HDV if you have not led an HDV program?
**From:** infectious disease leader
**Difficulty:** ★★★★ · **Topic:** scope

A: I would start with humility. My direct claim is HBV-adjacent combination thinking and viral mAb / antiviral clinical pharmacology experience, not direct HDV ownership. The contribution is a disciplined way to structure the dose question: combination rationale, biomarker timing, durability, resistance risk, and what evidence must be generated before a functional-cure claim is credible.

> **Move-forward:** learn the biology fast, bring the dose-defense discipline.`,

  'company-bridge-fit': `## Q1: What would you do in the first 90 days?
**From:** hiring manager
**Difficulty:** ★★★ · **Topic:** role fit

A: Listen first, then tighten the operating model. I would map the active dose decisions, assay gaps, model gaps, and regulatory decision points; identify where clinical pharmacology can reduce uncertainty fastest; and build a cross-functional rhythm where assumptions and open questions are visible before they become filing risk.

> **Anchor:** partner first, player-coach second.`,

  'closing-thread': `## Q1: What is the one sentence you want us to remember?
**From:** panel chair
**Difficulty:** ★ · **Topic:** close

A: When measurement falls short, I build the evidence bridge that makes the dose and the decision defensible.

> **Move-forward:** That is the common thread across the four cases and the company bridge.`,

  'closing-thanks': `## Q1: We skipped detail on slide X — can you go deeper now?
**From:** any panelist
**Difficulty:** ★★ · **Topic:** off-slide recovery

A: Yes — the deck was intentionally trimmed for live pacing. I keep off-slide facts in speaker notes and the Reading cheat sheet. Point me to the case or slide and I will answer from the published record, Type A minutes, or backup slides without inventing numbers.

> **Anchor:** notes plus backups, not slide clutter.

## Q2: What are you not claiming in this talk?
**From:** compliance-minded panelist
**Difficulty:** ★★★ · **Topic:** honesty guardrails

A: No Servier-confidential data. No internal priority oncology programs access. ADC as breadth only. Pharazi as personal research, not a product transfer. HBV patent as narrow co-inventor scope, not HDV program ownership. FDA pediatric gap on ambrisentan disclosed proactively.

> **Move-forward:** inspectable judgment over inflated scope.

## Q3: If we only have five minutes of Q&A, what should we prioritize?
**From:** panel chair
**Difficulty:** ★ · **Topic:** pacing

A: Whichever case best tests the role you care about — pediatric extrapolation, efficient design, India reliance, AI governance, or company bridge fit. I can go deep on any of them using backups; the four-case spine is the map.

> **Anchor:** panel picks the stress test.`,
};

// Merge all QA
const qa = {
  ...qp2QA, // Retains Intro, CS1, Closing, and all CS1 backups
  ...mappedIvosidenibQA, // Adds CS3 (Ivosidenib)
  ...mappedPharaziQA, // Adds AI / Pharazi backup material on inherited cs2-* IDs
  ...virQA,
};

export default qa;
