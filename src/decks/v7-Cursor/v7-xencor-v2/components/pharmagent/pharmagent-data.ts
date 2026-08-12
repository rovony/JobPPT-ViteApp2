/* PharmAgent · use case definitions, agent topology, PharmState schema.
   All static data lives here so the app file stays focused on rendering. */

export const AGENTS_L1 = [
  { id: 'data',   name: 'Data Manager',     tools: 14, role: 'profiling · CDISC · format conversion', icon: 'Database',
    sample: ['SchemaExtractor.extract', 'cdisc.harmonize', 'profile.distributions', 'blq.flag'] },
  { id: 'nca',    name: 'NCA Agent',        tools: 12, role: 'AUC · Cmax · t½ · BE · dose-prop', icon: 'Activity',
    sample: ['compute_lambda_z', 'compute_auc_linear_log', 'compute_be_90ci', 'dose_proportionality'] },
  { id: 'mod',    name: 'Modeler Manager',  tools: 5,  role: 'routes L2 modeling specialists', icon: 'Layers',
    sample: ['route_to_poppk', 'route_to_pkpd', 'route_to_er', 'merge_results'] },
  { id: 'pbpk',   name: 'PBPK Agent',       tools: 15, role: 'whole-body · DDI · pediatric', icon: 'Beaker',
    sample: ['simcyp.run_ddi', 'pbpk.whole_body', 'pediatric.scale_age_band', 'tissue.partition'] },
  { id: 'stats',  name: 'Statistical Agent',tools: 16, role: 'XGBoost · SHAP · Cox PH', icon: 'TrendingUp',
    sample: ['xgboost.fit', 'shap.explain', 'cox.fit_ph', 'forest.plot_be'] },
  { id: 'qc',     name: 'QC Agent',         tools: 12, role: '15-point diagnostic suite', icon: 'ShieldCheck',
    sample: ['gof.dv_pred', 'vpc.median_5_95', 'bootstrap.1000', 'condition_number'] },
  { id: 'rep',    name: 'Report Agent',     tools: 10, role: 'FDA/EMA DOCX · 2.7.2', icon: 'FileText',
    sample: ['ctd.272_methods', 'docx.export_fda', 'docx.export_ema', 'm15.compliance_check'] },
];

export const AGENTS_L2 = [
  { id: 'poppk', name: 'PopPK Expert', tools: 18, role: '1/2/3-CMT · covariate · allometric', icon: 'Beaker',
    sample: ['fit_structural_model', 'fit_covariate_full', 'allometric_scale', 'eta_shrinkage'] },
  { id: 'pkpd',  name: 'PKPD Expert',  tools: 14, role: 'Emax · indirect · TGI · Friberg', icon: 'LineChart',
    sample: ['fit_emax', 'fit_indirect_response', 'tgi.simeoni', 'friberg.myelosuppression'] },
  { id: 'er',    name: 'E-R Expert',   tools: 12, role: 'logistic · survival · dose justification', icon: 'Target',
    sample: ['fit_logistic_er', 'fit_survival_er', 'dose_justify', 'sim_exposure_response'] },
];

/* Bucket schema -- each field is initially null. */
export const BUCKETS = [
  { id: 'context',  label: 'CONTEXT',  icon: 'Hash',     sub: 'drug · TA · regulator',
    fields: ['drug', 'therapeutic_area', 'population', 'regulator'] },
  { id: 'dataset',  label: 'DATASET',  icon: 'Box',      sub: 'metadata · BLQ · doses',
    fields: ['n_subjects', 'n_obs', 'blq_pct', 'doses_mg', 'wt_mean_sd', 'crcl_iqr'] },
  { id: 'nca',      label: 'NCA',      icon: 'BarChart3',sub: 'AUC · Cmax · t½ · λz',
    fields: ['auc_inf_geo', 'cmax_geo', 't_half', 'lambda_z_r2', 'auc_extrap_pct', 'dose_proportionality', 'be_90ci'] },
  { id: 'modeling', label: 'MODELING', icon: 'Cpu',      sub: 'OFV · params · RSE',
    fields: ['structural_model', 'final_ofv', 'cl_pop_rse', 'v1_pop_rse', 'cov_screen', 'eta_shrinkage_cl', 'ddi_auc_ratio', 'pediatric_ribbon'] },
  { id: 'qc',       label: 'QC',       icon: 'Sparkles', sub: 'GOF · VPC · bootstrap',
    fields: ['gof_verdict', 'vpc_passed', 'bootstrap_n', 'condition_number', 'final_verdict'] },
  { id: 'audit',    label: 'AUDIT',    icon: 'Lock',     sub: 'SHA-256 hash chain',
    fields: ['chain_head', 'n_entries', 'm15_aligned', 'docx_exported'] },
];

/* Realistic field values that get progressively populated. */
export const FIELD_VALUES = {
  drug: 'cmpd-X (small molecule)',
  therapeutic_area: 'Oncology · Phase 2',
  population: 'adult · n=247',
  regulator: 'FDA / EMA · CTD 2.7.2',
  n_subjects: '247',
  n_obs: '4,812',
  blq_pct: '8.3 %',
  doses_mg: '[100 / 200 / 400]',
  wt_mean_sd: '72.4 (SD 15.2) kg',
  crcl_iqr: '89 [72–104] mL/min',
  auc_inf_geo: '12,847 ng·h/mL',
  cmax_geo: '1,487 ng/mL (CV 32%)',
  t_half: '8.3 h',
  lambda_z_r2: '0.94',
  auc_extrap_pct: '4.2 %',
  dose_proportionality: '1.04 [0.96–1.12]',
  be_90ci: '[88.4 – 112.1] within 80–125',
  structural_model: '2-CMT FOA',
  final_ofv: '4,672',
  cl_pop_rse: '12.4 L/h (RSE 8%)',
  v1_pop_rse: '48.2 L (RSE 6%)',
  cov_screen: 'WT, CRCL',
  eta_shrinkage_cl: '18 %',
  ddi_auc_ratio: 'midaz 1.42 (weak inh.)',
  pediatric_ribbon: 'neonate→adolescent · 4 bands',
  gof_verdict: 'PASS',
  vpc_passed: 'TRUE',
  bootstrap_n: '1000 (success 97.2%)',
  condition_number: '87 (acceptable)',
  final_verdict: 'CONDITIONAL_PASS',
  chain_head: '0xa7f3…c891',
  n_entries: '47',
  m15_aligned: 'TRUE',
  docx_exported: '2.7.2_Methods.docx',
};

/* Active agents per step drive the bright arrow set + active agent glow. */
function S(t, label, active=[], populate=[], artifact=null, toolCall=null, audit=null, mood='User') {
  return { t, label, active, populate, artifact, toolCall, audit, mood };
}

export const USE_CASES = {
  nca: {
    label: 'NCA Only',
    sub: 'single-dose · 11 PK params',
    icon: 'Activity',
    duration: 30,
    steps: [
      S('T+0:00', 'Analyst submits dataset · "Run NCA, single-dose, 247 subjects."', ['analyst'], ['context.drug','context.therapeutic_area','context.population','context.regulator'], null, null, null, 'Frown'),
      S('T+0:08', 'SchemaExtractor strips PHI · metadata only to LLM',                ['analyst','privacy','data'], ['dataset.n_subjects','dataset.n_obs','dataset.blq_pct','dataset.doses_mg','dataset.wt_mean_sd','dataset.crcl_iqr'], null, {at:'T+0:08', text:'data_mgr.SchemaExtractor.extract(ds_001) → ok · 2.1s'}, {tool:'SchemaExtractor', hash:'0x7a3f…b21e'}, 'Coffee'),
      S('T+0:14', 'L0 classifies intent → routes to NCA Agent',                       ['privacy','l0','nca'], [], null, {at:'T+0:14', text:'l0.route(intent="nca_only") → nca · 0.4s'}, null, 'Coffee'),
      S('T+0:19', 'NCA · linear-up/log-down trapezoidal · λz R² = 0.94 (pass)',         ['nca'], ['nca.lambda_z_r2','nca.auc_extrap_pct'], null, {at:'T+0:19', text:'nca.compute_lambda_z(subjects=247) → ok · 4.7s'}, {tool:'compute_lambda_z', hash:'0x9c41…ee03'}, 'Coffee'),
      S('T+0:24', 'NCA computes 11 PK params per dose group',                          ['nca'], ['nca.auc_inf_geo','nca.cmax_geo','nca.t_half','nca.dose_proportionality'], 'nca-table', {at:'T+0:24', text:'nca.compute_auc_linear_log(subjects=247) → ok · 5.2s'}, {tool:'compute_auc_linear_log', hash:'0x1f88…ac72'}, 'Coffee'),
      S('T+0:28', 'QC · linearity check across 100 / 200 / 400 mg (pass)',             ['qc','nca'], ['qc.gof_verdict','qc.final_verdict'], null, {at:'T+0:28', text:'qc.dose_proportionality_check() → pass · 1.8s'}, {tool:'dose_proportionality', hash:'0x4d20…71af'}, 'User'),
      S('T+0:31', 'Report · 2.7.2 Methods auto-generated from audit chain',            ['rep','nca'], ['audit.chain_head','audit.n_entries','audit.m15_aligned','audit.docx_exported'], 'report', {at:'T+0:31', text:'rep.ctd_272_methods.draft() → ok · 3.6s'}, {tool:'ctd_272_methods', hash:'0xa7f3…c891'}, 'Smile'),
      S('T+0:34', 'Delivered: NCA report · M15-aligned · DOCX',                        ['analyst','rep'], [], 'audit-summary', null, null, 'Smile'),
    ]
  },

  be: {
    label: 'Bioequivalence',
    sub: 'TOST · 90% CI · 80–125 %',
    icon: 'Scale',
    duration: 35,
    steps: [
      S('T+0:00', 'Analyst submits crossover dataset · "Test vs Reference BE."',     ['analyst'], ['context.drug','context.therapeutic_area','context.population','context.regulator'], null, null, null, 'Frown'),
      S('T+0:07', 'SchemaExtractor strips PHI · 2-period crossover metadata only',    ['analyst','privacy','data'], ['dataset.n_subjects','dataset.n_obs','dataset.doses_mg'], null, {at:'T+0:07', text:'data_mgr.SchemaExtractor.extract(crossover) → ok · 1.8s'}, {tool:'SchemaExtractor', hash:'0x7a3f…b21e'}, 'Coffee'),
      S('T+0:13', 'L0 routes to NCA Agent for BE template',                            ['privacy','l0','nca'], [], null, {at:'T+0:13', text:'l0.route(intent="bioequivalence") → nca · 0.4s'}, null, 'Coffee'),
      S('T+0:18', 'NCA · per-period AUC₀₋∞ and Cmax computed',                         ['nca'], ['nca.auc_inf_geo','nca.cmax_geo'], null, {at:'T+0:18', text:'nca.compute_auc_per_period(n=64) → ok · 3.9s'}, {tool:'compute_auc_per_period', hash:'0xb8e1…02d4'}, 'Coffee'),
      S('T+0:23', 'Statistical Agent · TOST mixed-effects · 90% CI computed',          ['stats','nca'], ['nca.be_90ci'], 'forest', {at:'T+0:23', text:'stats.tost_mixed_effects(α=0.05) → ok · 6.1s'}, {tool:'tost_mixed_effects', hash:'0x3a9c…dd17'}, 'User'),
      S('T+0:29', 'Bioequivalence · 90% CI [88.4 – 112.1] within 80–125% bounds',     ['stats'], ['qc.gof_verdict','qc.final_verdict'], null, {at:'T+0:29', text:'stats.be_verdict() → equivalent · 0.7s'}, {tool:'be_verdict', hash:'0xe44b…109a'}, 'Smile'),
      S('T+0:33', 'Report · BE summary · 2.7.2 + forest plot embed',                   ['rep','stats'], ['audit.chain_head','audit.n_entries','audit.docx_exported'], 'report', {at:'T+0:33', text:'rep.docx_export_be() → ok · 4.2s'}, {tool:'docx_export_be', hash:'0x6d77…ff31'}, 'Smile'),
    ]
  },

  poppk: {
    label: 'PopPK Base Model',
    sub: '1-CMT vs 2-CMT · ΔOFV',
    icon: 'Layers',
    duration: 50,
    steps: [
      S('T+0:00', 'Analyst submits Phase 2 dataset · "Build base PopPK."',            ['analyst'], ['context.drug','context.therapeutic_area','context.population','context.regulator'], null, null, null, 'Frown'),
      S('T+0:08', 'SchemaExtractor strips PHI · metadata only to LLM',               ['analyst','privacy','data'], ['dataset.n_subjects','dataset.n_obs','dataset.blq_pct','dataset.doses_mg','dataset.wt_mean_sd','dataset.crcl_iqr'], null, {at:'T+0:08', text:'data_mgr.SchemaExtractor.extract(ds_002) → ok · 2.1s'}, {tool:'SchemaExtractor', hash:'0x7a3f…b21e'}, 'Coffee'),
      S('T+0:14', 'L0 routes to Modeler Manager · L1 → L2 hand-off',                  ['privacy','l0','mod'], [], null, {at:'T+0:14', text:'l0.route(intent="poppk_base") → mod · 0.4s'}, null, 'Coffee'),
      S('T+0:19', 'Modeler Manager dispatches PopPK Expert',                           ['mod','poppk'], [], null, {at:'T+0:19', text:'mod.route_to_poppk() → ok · 0.3s'}, null, 'Coffee'),
      S('T+0:25', 'PopPK · 1-CMT vs 2-CMT in parallel · ΔOFV = 149',                  ['poppk'], ['modeling.structural_model','modeling.final_ofv'], 'poppk-ofv', {at:'T+0:25', text:'poppk.fit_structural_model("2-CMT") → ok · 12.3s'}, {tool:'fit_structural_model', hash:'0x5b0a…4877'}, 'Coffee'),
      S('T+0:31', 'PopPK · covariate full model · WT on CL, V1',                       ['poppk','stats'], ['modeling.cl_pop_rse','modeling.v1_pop_rse'], null, {at:'T+0:31', text:'poppk.fit_covariate_full(["WT","CRCL"]) → ok · 18.7s'}, {tool:'fit_covariate_full', hash:'0xc0fa…3331'}, 'Coffee'),
      S('T+0:36', 'SHAP covariate screen · WT, CRCL flagged',                          ['stats','poppk'], ['modeling.cov_screen'], null, {at:'T+0:36', text:'stats.shap.explain(model=poppk_full) → ok · 4.4s'}, {tool:'shap_explain', hash:'0x8e72…b9c5'}, 'User'),
      S('T+0:40', 'QC · 15-point diagnostic · η-shrinkage 18% (pass)',                 ['qc','poppk'], ['modeling.eta_shrinkage_cl','qc.gof_verdict','qc.vpc_passed','qc.bootstrap_n','qc.condition_number'], 'gof', {at:'T+0:40', text:'qc.run_diagnostic_15pt() → conditional_pass · 8.9s'}, {tool:'run_diagnostic_15pt', hash:'0x2240…71fa'}, 'User'),
      S('T+0:44', '⚠ Review gate — Analyst approves base-model selection',             ['qc','analyst','l0'], [], 'review-gate', {at:'T+0:44', text:'l0.review_gate.request("approve_2cmt") → pending'}, null, 'User'),
      S('T+0:47', 'Analyst approves 2-CMT FOA · audit entry signed',                   ['analyst','l0'], ['qc.final_verdict'], null, {at:'T+0:47', text:'audit.sign(decision="approve_2cmt") → ok · 0.2s'}, {tool:'audit_sign', hash:'0x9930…4ecd'}, 'Smile'),
      S('T+0:50', '2.7.2 Methods auto-generated from audit chain',                     ['rep','poppk','qc'], ['audit.chain_head','audit.n_entries','audit.m15_aligned','audit.docx_exported'], 'report', {at:'T+0:50', text:'rep.ctd_272_methods.draft() → ok · 3.6s'}, {tool:'ctd_272_methods', hash:'0xa7f3…c891'}, 'Smile'),
      S('T+0:53', 'Delivered: base PopPK report + audit chain (47 entries)',           ['analyst','rep'], [], 'audit-summary', null, null, 'Smile'),
    ]
  },

  ddi: {
    label: 'DDI Prediction (PBPK)',
    sub: '8 perpetrators · whole-body',
    icon: 'Beaker',
    duration: 40,
    steps: [
      S('T+0:00', 'Analyst submits compound + perpetrator panel',                     ['analyst'], ['context.drug','context.therapeutic_area','context.population','context.regulator'], null, null, null, 'Frown'),
      S('T+0:07', 'SchemaExtractor strips PHI · metadata only to LLM',               ['analyst','privacy','data'], ['dataset.n_subjects','dataset.n_obs','dataset.doses_mg'], null, {at:'T+0:07', text:'data_mgr.SchemaExtractor.extract(ds_003) → ok · 1.9s'}, {tool:'SchemaExtractor', hash:'0x7a3f…b21e'}, 'Coffee'),
      S('T+0:13', 'L0 routes to PBPK Agent',                                           ['privacy','l0','pbpk'], [], null, {at:'T+0:13', text:'l0.route(intent="ddi_pbpk") → pbpk · 0.4s'}, null, 'Coffee'),
      S('T+0:18', 'PBPK · whole-body model built from physchem + in-vitro',           ['pbpk'], ['modeling.structural_model'], null, {at:'T+0:18', text:'pbpk.whole_body.build(physchem) → ok · 9.4s'}, {tool:'pbpk_whole_body', hash:'0x4710…0b2a'}, 'Coffee'),
      S('T+0:25', 'PBPK · simulate 8 perpetrators × 3 mechanisms (CYP3A4 / 2D6 / Pgp)',['pbpk'], ['modeling.ddi_auc_ratio'], 'ddi-heatmap', {at:'T+0:25', text:'pbpk.simcyp.run_ddi(n=24 sims) → ok · 14.1s'}, {tool:'simcyp_run_ddi', hash:'0x33ff…91dc'}, 'User'),
      S('T+0:31', 'DDI · midazolam AUC ratio 1.42 (weak inhibitor)',                   ['pbpk'], ['qc.gof_verdict','qc.final_verdict'], null, {at:'T+0:31', text:'pbpk.classify_ddi(midaz) → weak · 0.5s'}, {tool:'classify_ddi', hash:'0x8821…00ee'}, 'Smile'),
      S('T+0:36', 'Report · DDI section auto-generated · M15-aligned',                 ['rep','pbpk'], ['audit.chain_head','audit.n_entries','audit.docx_exported'], 'report', {at:'T+0:36', text:'rep.ddi_section() → ok · 3.0s'}, {tool:'ddi_section', hash:'0x6ab1…44c2'}, 'Smile'),
    ]
  },

  ped: {
    label: 'Pediatric Extrapolation',
    sub: 'ICH E11A · age bands',
    icon: 'Baby',
    duration: 40,
    steps: [
      S('T+0:00', 'Analyst submits adult PopPK + pediatric request',                  ['analyst'], ['context.drug','context.therapeutic_area','context.population','context.regulator'], null, null, null, 'Frown'),
      S('T+0:07', 'SchemaExtractor strips PHI · adult model summary only',            ['analyst','privacy','data'], ['dataset.n_subjects','dataset.n_obs','dataset.wt_mean_sd'], null, {at:'T+0:07', text:'data_mgr.SchemaExtractor.extract(adult_post) → ok · 1.7s'}, {tool:'SchemaExtractor', hash:'0x7a3f…b21e'}, 'Coffee'),
      S('T+0:13', 'L0 routes to Modeler Manager · pediatric scaling',                  ['privacy','l0','mod'], [], null, {at:'T+0:13', text:'l0.route(intent="pediatric_scale") → mod · 0.4s'}, null, 'Coffee'),
      S('T+0:18', 'Modeler Manager dispatches PBPK Agent for age-band scaling',        ['mod','pbpk'], [], null, {at:'T+0:18', text:'mod.route_to_pbpk() → ok · 0.3s'}, null, 'Coffee'),
      S('T+0:24', 'PBPK · allometric + maturation across 4 age bands',                 ['pbpk'], ['modeling.structural_model','modeling.pediatric_ribbon'], 'ped-ribbon', {at:'T+0:24', text:'pbpk.pediatric.scale_age_band(["neo","inf","child","adol"]) → ok · 11.4s'}, {tool:'scale_age_band', hash:'0x1c45…7080'}, 'User'),
      S('T+0:31', 'Pediatric extrapolation · neonate exposure ribbon vs adult ref',    ['pbpk','stats'], ['qc.gof_verdict','qc.final_verdict'], null, {at:'T+0:31', text:'stats.exposure_ribbon(adult_ref) → ok · 3.8s'}, {tool:'exposure_ribbon', hash:'0xaa10…d2bb'}, 'Smile'),
      S('T+0:36', 'Report · ICH E11A pediatric extrapolation memo',                    ['rep','pbpk'], ['audit.chain_head','audit.n_entries','audit.docx_exported'], 'report', {at:'T+0:36', text:'rep.e11a_memo() → ok · 3.4s'}, {tool:'e11a_memo', hash:'0x4499…6611'}, 'Smile'),
    ]
  },
};


