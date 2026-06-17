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

A: ADC work remains in the portfolio because it is real breadth, but it is not the cleanest core case for this Vir seminar. The final core cases have clearer public decision points and cleaner evidence-to-impact arcs. If asked about ADCs, I would frame my role accurately: I led and directed strategy; I am not presenting it as the main case in this talk.

> **Anchor:** breadth credential, not showcase case.`,

  'cs2-asp-divider': `## Q1: Why did Asparlas move from Case 03 to Case 02?
**From:** narrative-fit panelist
**Difficulty:** ★★ · **Topic:** story architecture

A: Concession: in the source seminar it was Case 03, and I kept the case components rather than rebuilding them. Reframe: in this Vir version, Asparlas belongs immediately after ambrisentan because it is the second form of "measurement falls short": not pediatric extrapolation, but a sample-limited adult design. Move-forward: it sets up India by showing that model-informed evidence can earn agreement before the next case shows it earning access.

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

  'cs2-pharazi-divider': `## Q1: Is Pharazi something you would transfer to Vir?
**From:** IP / compliance panelist
**Difficulty:** ★★★★★ · **Topic:** AI honesty

A: No, not as a product transfer claim. Pharazi is personal research that demonstrates how I think about auditable clinical pharmacology workflows: deterministic tools, privacy boundaries, human review, and traceability. The transferable asset is the architecture judgment and operating discipline, not a promise to bring an external product into Vir.

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

> **Move-forward:** HBV adjacency with HDV humility.`,

  'company-bridge-oncology-problem': `## Q1: Are you claiming to know confidential VIR-5500 or PRO-XTEN details?
**From:** Vir program lead
**Difficulty:** ★★★★★ · **Topic:** Vir humility

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

> **Move-forward:** That is the common thread across the four cases and the Vir bridge.`,
};

// Merge all QA
const qa = {
  ...qp2QA, // Retains Intro, CS1, Closing, and all CS1 backups
  ...mappedIvosidenibQA, // Adds CS3 (Ivosidenib)
  ...mappedPharaziQA, // Adds AI / Pharazi backup material on inherited cs2-* IDs
  ...virQA,
};

export default qa;
