export const companyBridge = {
  company: 'Vir',
  divider: {
    eyebrow: "How I'd contribute across Vir",
    title: 'Two pillars, one discipline',
    sub: 'Oncology · dual-masked T-cell engagers  |  Infectious disease · HBV/HDV functional cure',
    payoff: 'Making the dose defensible when the measured plasma concentration is not the clinical answer.',
  },
  oncologyProblem: {
    eyebrow: 'Company bridge · oncology problem',
    header: "Oncology: plasma does not equal tumor - you can't measure the drug that matters",
    bullets: [
      'VIR-5500 (PSMA) and the PRO-XTEN engagers are masked: most circulating drug is inactive; the active species acts at the tumor.',
      'The assay returns masked/total drug - which tracks neither efficacy nor the key toxicity.',
      'So treat the tumor as a latent compartment - anchor it with PD biomarkers (PSA, ctDNA, PSMA-PET) and preclinical cleavage priors.',
    ],
    source: "IncludeINPPT · Da Silva's central challenge",
  },
  oncologyApproach: {
    eyebrow: 'Company bridge · oncology approach',
    header: 'The chain - assay -> model -> dose -> OBD',
    bullets: [
      'Separate the exposure metrics: CRS is peak-driven (active-species Cmax); efficacy is sustained (AUC / time-above-threshold). Masked Cmax tracks neither.',
      'That split is the rationale for step-up / priming dosing - blunt the Cmax that drives CRS, then reach efficacy exposure.',
      'T-cell PD is bell-shaped, so the optimal dose is intermediate: an OBD, not an MTD (Project Optimus).',
      'Size studies for model precision, not statistical power (optimal design / PopED-PFIM): dense early PD across step-up cohorts, paired biopsies, randomized dose levels.',
    ],
    source: 'IncludeINPPT · assay-to-model-to-dose themes',
  },
  caseMapping: {
    eyebrow: 'Company bridge · my cases to this',
    header: 'Why my cases transfer directly',
    bullets: [
      'Ambrisentan - matched a target exposure when the trial could not deliver it; here, match a target active-species exposure.',
      'Asparlas - model-anchored, efficient design (-36% enrollment); here, optimal design / identifiability under sparse sampling.',
      'AI / DeepPK - the engine to scale model-informed dosing across the platform (VIR-5500 / 5818 / 5525).',
    ],
    source: 'Vir Deck Content Pack · case-to-pipeline mapping',
  },
  hbv: {
    eyebrow: 'Company bridge · infectious disease',
    header: 'And I map to your infectious-disease pillar',
    bullets: [
      'Co-inventor on a Hepatitis B combination-therapy patent (AU2023213173A1) - I have worked the HBV combination problem directly.',
      'Sotrovimab - characterized anti-viral mAb PK across Japanese & Caucasian populations and IV/IM routes (biologic PK, special populations).',
      'Dectova (zanamivir) - antiviral PK incl. preterm-neonate simulations for the EMA Paediatric Investigation Plan.',
      'A credible partner for the HBV/HDV scope - I would lean on translational for cleavage/virology translation (no overclaim).',
    ],
    source: 'CV · patent AU2023213173A1 · Sotrovimab Clin Pharmacokinet 2024 · Dectova',
  },
  fit: {
    eyebrow: 'Company bridge · fit',
    header: "What I'd own - and how I work",
    bullets: [
      'The cross-functional dose-defense function across both pillars: clin pharm + DMPK/bioanalytical + translational + clinical + regulatory.',
      'First 90 days: stand up the assay->model->dose plan for the VIR-5500 Phase-3 dose - built backward from the filing (a defensible OBD package).',
      'How I work: judgment under uncertainty - name the open questions (durability, ADA, tumor-vs-plasma) and how clin pharm de-risks them.',
      'A humble, high-value partner to translational/bioanalytical; a player-coach who grows people.',
    ],
    source: 'IncludeINPPT · Hammond assay chain · Huynh submission-backward framing',
  },
};
