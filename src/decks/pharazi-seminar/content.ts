export interface PlainEnglishData {
  whatThisIs: string;
  whyItMatters: string;
  whatCouldGoWrong: string;
}

export const plainEnglishContent: Record<string, PlainEnglishData> = {
  '03': {
    whatThisIs: 'Three regulatory documents that now require AI tools used in pharma to be governed, audit-trailed, and explainable.',
    whyItMatters: 'Future submissions citing AI work will be checked against these standards. Compliant tools enter the workflow. Others don\'t.',
    whatCouldGoWrong: 'Building tools without these in mind means rework when regulators audit them — or rejection of the analysis.'
  },
  '04': {
    whatThisIs: 'A scan of the twelve published or deployed AI systems that touch one or two pieces of the drug-development workflow.',
    whyItMatters: 'Most existing tools solve a slice — a single calculation, a single agent, a single stage. None cover the full path.',
    whatCouldGoWrong: 'Without a foundation that spans all stages, programs stitch together brittle pipelines that fail audit.'
  },
  '05': {
    whatThisIs: 'The single sentence the talk is built around — the end-to-end foundation that pharmaceutical sciences will need has not yet been built.',
    whyItMatters: 'Whoever builds it first sets the standard. The compounding advantage goes to the early canonical foundation.',
    whatCouldGoWrong: 'The first foundation could be built poorly — without privacy by design or audit trails — and become a liability, not an asset.'
  },
  '07': {
    whatThisIs: 'A 4-level command structure where one orchestrator routes work down through managers to specialist agents.',
    whyItMatters: 'Independent agents amplify errors as they scale; this structure contains errors to a manageable level — proven in 2024 multi-agent research.',
    whatCouldGoWrong: 'The orchestrator becomes a bottleneck if it does work itself instead of routing. The fix: orchestrator has zero execution tools.'
  },
  '08': {
    whatThisIs: 'Patient data lives in a sandboxed environment. The AI never has a code path to read it.',
    whyItMatters: 'Privacy becomes a property of the architecture, not a policy that depends on every agent behaving correctly.',
    whatCouldGoWrong: 'A single bug or misconfigured tool could expose data. The fix: no tool returns raw patient records — only schema and aggregates.'
  },
  '09': {
    whatThisIs: 'Every action the system takes is recorded with a hash that links to the previous one — like git commits, but for analytical decisions.',
    whyItMatters: 'A regulator in 2034 can verify integrity of an analysis from 2026 in two function calls. Tampering is detectable.',
    whatCouldGoWrong: 'If the chain breaks, the integrity claim breaks. The fix: every state mutation hashes its predecessor; one bad entry shows immediately.'
  },
  '10': {
    whatThisIs: 'Workflows are stored as versioned execution plans (SOPs), and coordination cost is bounded by three rules: tool cap, typed state, two-tier QC.',
    whyItMatters: 'Reproducing an analysis means rerunning the same SOP version. Coordination cost stays predictable as the system grows.',
    whatCouldGoWrong: 'SOPs drift if not versioned. Coordination cost grows quadratically without the three rules. The fix is the rules themselves.'
  },
  '11': {
    whatThisIs: 'New analytical capabilities (signal detection, biomarker, trial design) plug into the existing infrastructure without rebuilding it.',
    whyItMatters: 'Adding a new domain takes days, not months. The infrastructure was built once, correctly, and every future capability inherits it.',
    whatCouldGoWrong: 'If the shared infrastructure has a flaw, it propagates to every new domain. The fix: gate every shared utility through the same QC and audit standards.'
  },
  '14': {
    whatThisIs: 'The system that brings datasets in, sanitizes them, and makes only safe schema and aggregates visible to the AI.',
    whyItMatters: 'Patient privacy is structural — the AI cannot see what it cannot reach. No policy enforcement needed.',
    whatCouldGoWrong: 'A new data source could include patient identifiers the schema extractor doesn\'t recognize. The fix: SchemaExtractor is conservative — strip first, then approve.'
  },
  '15': {
    whatThisIs: 'Non-compartmental analysis — the standard PK summary (AUC, Cmax, half-life) computed and validated against the gold-standard PKNCA package.',
    whyItMatters: 'Routine PK runs in under a second of human time, with audit trail confirmation that every calculation matches gold standard.',
    whatCouldGoWrong: 'Gold-standard drift — if PKNCA updates, our validation may diverge. The fix: validation gate is part of every run, not a one-time check.'
  },
  '16': {
    whatThisIs: 'Population pharmacokinetics — building a model of drug behavior across many patients, validated against NONMEM, with two-tier quality control.',
    whyItMatters: 'Cross-department QC challenges every fit before it lands. Errors caught at the model boundary, not after the regulatory submission.',
    whatCouldGoWrong: 'Models can be over-fit to the development cohort. The fix: prediction-corrected VPC against held-out data, plus the QC challenge.'
  },
  '17': {
    whatThisIs: 'Linking drug exposure to response — does more drug mean more benefit, or more harm? PK posterior in, dose recommendation out.',
    whyItMatters: 'Typed shared state preserves the posterior across domains. Zero re-extraction. Information loss eliminated by design.',
    whatCouldGoWrong: 'The posterior could be wrong if the upstream PopPK had bias. The fix: every input to E-R carries its hash chain back to the source.'
  },
  '18': {
    whatThisIs: 'Generating regulatory documents (Module 2.7.2) directly from the audit chain, with every clause traceable to a hashed source analysis.',
    whyItMatters: 'A regulator can replay every decision in 2034. Document integrity is mechanical, not editorial.',
    whatCouldGoWrong: 'Auto-generated text could be over-confident. The fix: first-class HITL gate before final submission — human approval is logged and required.'
  },
  '19': {
    whatThisIs: 'A single hash chain spanning all six domains. One verification call confirms integrity from raw data to final document.',
    whyItMatters: 'ICH M15 reproducibility is structural, not aspirational. A regulator\'s replay request takes seconds.',
    whatCouldGoWrong: 'Cross-domain dependencies could be broken if a domain bypasses the chain. The fix: every domain writes through the same audit utility — bypass is structurally impossible.'
  },
  '19-5a': {
    whatThisIs: 'A single Phase 2 PopPK build, shown across every layer of the foundation — from human request to regulator-grade output.',
    whyItMatters: 'Every domain you\'ve seen separately, working together. This is what end-to-end actually looks like.',
    whatCouldGoWrong: 'This is a representative trace, not a live run during the seminar. The live run is at pharazi.ai.'
  },
  '19-5b': {
    whatThisIs: 'Three different drug-development programs from three companies, running on the same Pharazi foundation at the same time, without ever seeing each other\'s data.',
    whyItMatters: 'This is how the foundation scales commercially — one deployment serves many programs, with provable separation.',
    whatCouldGoWrong: 'Multi-tenancy can leak if isolation is policy-based. The fix: every query carries org_id, enforced at the database level, audited per-tenant.'
  },
  '20': {
    whatThisIs: 'The full ecosystem of Pharazi — every place you can engage, from the manuscript to the deployed app to the community.',
    whyItMatters: 'The work isn\'t done. It\'s open. Anyone in this room can contribute today.',
    whatCouldGoWrong: 'Open-source momentum depends on community. The fix: first contributors are already engaged; pharazi.ai is real and reachable.'
  }
};

export const riskValueContent: Record<string, { value: string; risk: string }> = {
  '03': { value: 'regulatory clarity', risk: 'deadline pressure' },
  '04': { value: 'positions Pharazi', risk: 'visible competition' },
  '07': { value: '4× error containment', risk: 'orchestrator bottleneck' },
  '08': { value: 'privacy by code', risk: 'schema gaps' },
  '09': { value: 'regulator-replayable', risk: 'chain dependency' },
  '10': { value: 'bounded coordination', risk: 'SOP versioning rigor' },
  '11': { value: 'days, not months', risk: 'shared-layer flaws scale' },
  '14': { value: 'structural privacy', risk: 'novel-source schema' },
  '15': { value: '0.1% gold-std match', risk: 'validation drift' },
  '16': { value: 'NONMEM-bridged QC', risk: 'cohort over-fit' },
  '17': { value: 'zero re-extraction', risk: 'upstream bias' },
  '18': { value: 'clause-level audit', risk: 'HITL bottleneck' },
  '19': { value: 'M15 reproducibility', risk: 'cross-domain coupling' },
  '19-5a': { value: 'end-to-end in one frame', risk: 'representative, not live' },
  '19-5b': { value: 'provable isolation', risk: 'schema migration cost' },
  '20': { value: 'open-source · contributable', risk: 'community velocity' }
};

export const glossaryTerms: Record<string, string> = {
  'ICH M15': 'International Council for Harmonisation guideline on General Principles for Model-Informed Drug Development. EU effective 23 July 2026.',
  'MIDD': 'Model-Informed Drug Development. The use of mathematical models to support decisions across the drug development lifecycle.',
  'PopPK': 'Population Pharmacokinetics. A model of drug concentration over time across a study population, accounting for between-patient variability.',
  'NCA': 'Non-Compartmental Analysis. Standard PK summary using numerical integration — produces AUC, Cmax, t½ without a structural model.',
  'NONMEM': 'The reference software for population PK/PD modeling, used in regulatory submissions for over 30 years.',
  'PKNCA': 'The R package considered the gold standard for non-compartmental PK analysis. Pharazi validates against it.',
  'ΔOFV': 'Change in Objective Function Value — the standard NONMEM metric for comparing nested models. >3.84 = significant.',
  'RSE': 'Relative Standard Error. Precision metric for PopPK parameter estimates. <30% is generally acceptable.',
  'AUCss': 'Area Under the plasma concentration-time Curve at steady state. The standard PK exposure measure.',
  'VPC': 'Visual Predictive Check (or prediction-corrected VPC) — graphical model evaluation comparing simulated vs observed data.',
  'pcVPC': 'Visual Predictive Check (or prediction-corrected VPC) — graphical model evaluation comparing simulated vs observed data.',
  'E-R': 'Exposure-Response. The relationship between drug exposure (concentration, AUC) and clinical outcome (efficacy or safety).',
  'HITL': 'Human-In-The-Loop. A workflow gate where a human must review and approve before the system proceeds.',
  'SOP': 'Standard Operating Procedure. In Pharazi, a versioned execution plan stored as code with a hash anchor.',
  'SHA-256': 'Cryptographic hash function used to chain audit entries. Tampering with one entry breaks the chain immediately.',
  'PharmState': 'Pharazi\'s typed shared state bus. Type-checked at every boundary. Append-only — analyses never overwrite.',
  'CFR Part 11': '21 CFR Part 11 — FDA regulation on electronic records and electronic signatures. Pharazi\'s audit chain aligns to it.',
  'CPT:PSP': 'Clinical Pharmacology & Therapeutics: Pharmacometrics & Systems Pharmacology — peer-reviewed journal publishing the manuscript.'
};

export const rehearsalQAs: Record<string, { q: string; a: string }[]> = {
  '03': [
    { q: 'How does this scale beyond clin pharm?', a: 'B11 · roadmap' },
    { q: 'Validation against NONMEM 7.5 vs 7.6?', a: 'B6 · validation gates' },
    { q: 'Privacy claim defense?', a: 'B12 · architectural privacy' }
  ]
};
