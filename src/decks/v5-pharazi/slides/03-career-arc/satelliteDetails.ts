/**
 * Satellite details — project/achievement deep-dives for the career-arc
 * slide. Keyed by `${hubKey}:${label}` so the drawer can look up content
 * by the exact satellite that was clicked.
 *
 * Each entry:
 *   summary     — one-line framing of the role/work
 *   achievements — 2–4 key technical accomplishments
 *   metrics     — 2–4 quantitative outcomes (value + caption)
 *   period      — display-only timeframe
 */

export const SATELLITE_DETAILS = {
  // ─── Jordan ──────────────────────────────────
  'jordan:Dental surgery': {
    period: '2004 – 2010',
    summary: 'Clinical foundation — patient-side pharmacology in a high-volume dental surgery practice.',
    achievements: [
      'Completed 5-year BDS with clinical rotations across oral surgery, prosthodontics, and pediatric dentistry.',
      'Ran outpatient procedures with direct responsibility for local anesthesia dosing and post-op analgesic regimens.',
      'Built the habit of thinking about drug exposure as a patient-level decision — the seed of a quantitative career.',
    ],
    metrics: [
      { value: '5 yrs', caption: 'BDS clinical training' },
      { value: '100s', caption: 'Patients treated' },
    ],
  },
  'jordan:Clinical license': {
    period: '2010',
    summary: 'Licensed to practice — Jordan Medical Council registration.',
    achievements: [
      'Passed national licensing exam covering pharmacology, pathology, and clinical decision-making.',
      'Practiced independently before pivoting to graduate research in pharmaceutical sciences.',
    ],
    metrics: [
      { value: 'JMC', caption: 'Licensing body' },
    ],
  },
  'jordan:Bedside dosing decisions': {
    period: '2004 – 2010',
    summary: 'Foreshadowing — dosing as a bedside decision, not a statistical object.',
    achievements: [
      'Made daily dose decisions in the chair: anesthetic volume, analgesic regimen, antibiotic course.',
      'Every call weighed patient-level factors — weight, comorbidity, risk — against a textbook range.',
      'This framing later anchored every PopPK decision: does the model help someone in the chair?',
    ],
    metrics: [],
  },

  // ─── Minnesota ───────────────────────────────
  'minnesota:NLME': {
    period: '2012 – 2015',
    summary: 'Non-linear mixed-effects modeling — the core technical skill of the career.',
    achievements: [
      'Built full PopPK workflows in NONMEM from dataset assembly through covariate selection and VPC qualification.',
      'Authored simulation scripts in R to support dose-finding under sparse and unbalanced sampling.',
      'Translated clinical protocols into estimation datasets that survived regulatory audit.',
    ],
    metrics: [
      { value: 'NONMEM', caption: 'Primary estimation tool' },
      { value: 'R', caption: 'Simulation + dataset QC' },
    ],
  },
  'minnesota:EHC dissertation': {
    period: '2013 – 2015',
    summary: 'PhD dissertation — mechanistic PK of compounds with enterohepatic recirculation.',
    achievements: [
      'Developed a semi-mechanistic model capturing secondary absorption peaks from biliary recycling.',
      'Quantified how gallbladder emptying timing changes AUC and Cmax in a clinically meaningful way.',
      'Defended PhD thesis built on 3 first-author manuscripts.',
    ],
    metrics: [
      { value: '3', caption: 'First-author publications' },
      { value: 'PhD', caption: 'Pharmaceutics · 2015' },
    ],
  },
  'minnesota:3 research awards': {
    period: '2012 – 2015',
    summary: 'Three competitive research awards during the PhD period.',
    achievements: [
      'Recognized across multiple forums for translational pharmacometrics work during graduate training.',
      'Awards spanned both departmental and national-society selections.',
    ],
    metrics: [
      { value: '3', caption: 'Research awards · PhD years' },
    ],
  },
  'minnesota:ECP Fellowship': {
    period: '2013 – 2015',
    summary: 'Emerging Clinical Pharmacologist Fellowship — ACCP competitive award.',
    achievements: [
      'Selected nationally for demonstrated excellence in translational pharmacometrics.',
      'Presented fellowship research at ACCP Annual Meeting.',
    ],
    metrics: [
      { value: 'ACCP', caption: 'Awarding society' },
    ],
  },
  'minnesota:Brundage lab': {
    period: '2012 – 2015',
    summary: 'Richard Brundage lab — lineage of rigorous, regulatory-grade pharmacometrics.',
    achievements: [
      'Trained under one of the field\'s most cited educators in clinical pharmacokinetics.',
      'Lab culture: every parameter estimate earns its keep with a VPC and a bootstrap.',
    ],
    metrics: [],
  },

  // ─── Merck · QP2 ─────────────────────────────
  'merck:NLME simulation · trial-design inputs': {
    period: 'Summer 2014',
    summary: 'QP2 intern — NLME simulation under uncertainty, feeding trial-design inputs (sample size, dose range, endpoints).',
    achievements: [
      'Simulated trial designs to size a Phase 2 dose-ranging study, including sample size, dose range, and endpoint selection.',
      'Quantified and communicated parameter uncertainty via bootstrap and SIR-based CIs on reportable parameters.',
      'Framed recommendations as "here is the range the decision should survive" — not a single point estimate.',
      'Delivered a written analysis + presentation reviewed by senior Merck modelers.',
    ],
    metrics: [
      { value: 'QP2', caption: 'Merck internship program' },
    ],
  },

  // ─── GSK ─────────────────────────────────────
  'gsk:5 TAs': {
    period: '2015 – 2022',
    summary: 'Cross-therapeutic-area modeling practice — respiratory, rare disease, immunology, HIV, oncology.',
    achievements: [
      'Led PopPK/PD on programs across 5 therapeutic areas, adapting methodology to each disease biology.',
      'Became the go-to modeler for sponsor-led pediatric extrapolation questions.',
    ],
    metrics: [
      { value: '5', caption: 'Therapeutic areas' },
      { value: '7 yrs', caption: 'Tenure at GSK' },
    ],
  },
  'gsk:4 approvals · during tenure': {
    period: '2015 – 2022',
    summary: 'Four programs that achieved approval during GSK tenure with direct clin-pharm contribution.',
    achievements: [
      'Contributed PopPK and E-R analyses to 4 successful marketing applications during GSK tenure (e.g. Trelegy, Anoro, Dectova, Ambrisentan-peds).',
      'Led responses to agency questions that unblocked labels on their first review cycle.',
      'Scope note: counts programs approved while at GSK — distinct from career-wide authorship credit.',
    ],
    metrics: [
      { value: '4', caption: 'Approvals during GSK tenure' },
    ],
  },
  'gsk:5 agencies · ambrisentan peds': {
    period: '2021',
    summary: 'Five health authorities accepted the same ambrisentan pediatric PopPK model.',
    achievements: [
      'Single PopPK model carried pediatric PAH labels across five regulators — including EMA and PMDA in 2021.',
      'Other agencies in the five: FDA, Health Canada, and an additional ROW authority engaged during the program.',
      'Demonstrated that a well-qualified model is portable across jurisdictions without re-running the pivotal trial.',
    ],
    metrics: [
      { value: '5', caption: 'Agencies · ambrisentan peds' },
    ],
  },
  'gsk:Ambrisentan peds': {
    period: '2015 – 2022 (approvals 2021)',
    summary: 'Pediatric PAH label — EMA + PMDA on a single PopPK model (Okour et al. JCP 2023). GSK program; approvals preceded the Servier move.',
    achievements: [
      'Model qualified via pcVPC on 39 patients / 83 observations with no systematic bias.',
      'Exposure match within 3 % of adult envelope across 20–77 kg body weight.',
      'Flat safety exposure-response — no dose-AE gradient.',
      'Resolved 19 years of pediatric label silence; same model accepted by 5 regulators.',
    ],
    metrics: [
      { value: '19 yrs', caption: 'Prior label silence resolved' },
      { value: '2', caption: 'Agencies · EMA + PMDA (2021)' },
    ],
  },
  'gsk:Top 10% Award 2019': {
    period: '2019',
    summary: 'GSK Top 10 % performance award — company-wide recognition.',
    achievements: [
      'Recognized for leadership on a high-profile pediatric extrapolation program.',
      'Award places recipient in the top decile of all GSK R&D staff that year.',
    ],
    metrics: [
      { value: 'Top 10%', caption: 'Company-wide' },
    ],
  },
  'gsk:Clin Pharm M&S': {
    period: '2015 – 2022',
    summary: 'Manager, Clinical Pharmacology Modeling & Simulation.',
    achievements: [
      'Line-managed junior modelers; built internal training on NONMEM, R, and dataset QC.',
      'Owned methodology choices across the portfolio — not just execution.',
    ],
    metrics: [],
  },

  // ─── Servier ─────────────────────────────────
  'servier:Oncology · solid': {
    period: 'Since 2022',
    summary: 'Clin-pharm leadership across solid-tumor oncology portfolio.',
    achievements: [
      'Lead CP representative on multiple solid-tumor programs from Phase 1 through submission.',
      'Shaped dose-optimization strategy aligned with FDA Project Optimus expectations.',
    ],
    metrics: [
      { value: 'Multi', caption: 'Active programs' },
    ],
  },
  'servier:Oncology · heme': {
    period: 'Since 2022',
    summary: 'Hematologic malignancy programs — AML, ALL, and adjacent indications.',
    achievements: [
      'Led PopPK/E-R for heme programs feeding global submissions.',
      'Owned the CP story for Tibsovo lifecycle expansion work.',
    ],
    metrics: [],
  },
  'servier:3 approvals': {
    period: '2022 – 2025',
    summary: 'Three regulatory approvals during Servier tenure: Onivyde, Oncaspar, Tibsovo (global LCM).',
    achievements: [
      'Onivyde — lifecycle expansion contributions.',
      'Oncaspar — clin-pharm support through approval.',
      'Tibsovo global LCM — including CDSCO India local-data waiver secured on modeling alone.',
    ],
    metrics: [
      { value: '3', caption: 'Approvals as Director' },
    ],
  },
  'servier:Asparlas adult design': {
    period: 'Since 2022',
    summary: 'Adult-ALL dose-selection strategy — two FDA-precedented methods stacked.',
    achievements: [
      'Led the quantitative rationale for dose selection in adult ALL.',
      'Stacked precedented methods so the design did not depend on any single novel argument.',
      'N=60 agreed with the agency; novel primary endpoint deferred in favor of the precedented path.',
    ],
    metrics: [
      { value: 'N=60', caption: 'Agreed study size' },
    ],
  },
  'servier:Ivosidenib · India': {
    period: '2024 – 2025',
    summary: 'CDSCO India waiver — global dossier accepted without new local clinical study.',
    achievements: [
      'Built the six-pillar defense: PopPK, E-R, intrinsic factors, extrinsic factors, safety, mechanism.',
      'Zero new patients dosed; approval granted in 2025.',
    ],
    metrics: [
      { value: '0', caption: 'New patients enrolled' },
      { value: '2025', caption: 'CDSCO approval' },
    ],
  },
};

export function getSatelliteDetail(hubKey, label) {
  return SATELLITE_DETAILS[`${hubKey}:${label}`] || null;
}