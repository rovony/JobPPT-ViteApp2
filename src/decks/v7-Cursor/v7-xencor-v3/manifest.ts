import { createElement } from 'react';
/** Single design-system SoT for this deck — edit styles/xencor-deck.css */
import './styles/xencor-deck.css';
import TitleSlide from './slides/01-title';
import HookATrialNotAnswer from './slides/02-hook-A-trial-not-answer';
import WhatYouWillSee from './slides/03-what-you-will-see';
import CareerArc from './slides/03-career-arc';
import Roadmap from './slides/04-roadmap';

// CS1
import Cs1Divider from './slides/05-cs1-divider';
import Cs1Question from './slides/06-cs1-question';
import Cs1Context from './slides/07-cs1-context';
import Cs1Mechanism from './slides/07b-cs1-mechanism';
import Cs1Trial from './slides/08-cs1-trial';
import Cs1Architecture from './slides/09-cs1-architecture';
import Cs1Poppk from './slides/09b-cs1-poppk';
import Cs1Pkpd from './slides/09c-cs1-pkpd';
import Cs1Outcome from './slides/11-cs1-outcome';
import Cs1Bracket from './slides/12-cs1-bracket';
import Cs1Lesson from './slides/14-cs1-lesson';
import Cs1Bridge from './slides/15-cs1-bridge';
import Cs1BackupB17CovariateAnalysis from './slides/cs1-B17-covariate-analysis';

// CS2 — Asparlas efficient design
import Cs2AspDivider from './slides/cs2-asp-divider';
import Cs2AspChallenge from './slides/cs2-asp-challenge';
import Cs2AspStrategy from './slides/cs2-asp-strategy';
import Cs2AspFda from './slides/cs2-asp-fda';
import Cs2AspFit from './slides/cs2-asp-fit';
import Cs2AspImpact from './slides/cs2-asp-impact';
import Cs2AspBridge from './slides/cs2-asp-bridge';

// CS2 — Pharos (formerly Pharazi). 2026-05-06: full CS2 swap from
// pharazi-seminar → pharos-seminar source slides per user direction.
// 12 pharazi-only slots dropped; 12 pharos-only slots added with new
// cs2-* IDs. Notes flow through pharos-seminar/notes.ts via the
// pharosIdMap in v5-ultragenyx/notes.ts.
import CS2PharaziDivider from './slides/cs2-01-pharazi-divider';
import PharosRegulatoryFloorSlide from '../../pharos-seminar/slides/03-regulatory-floor';
import PharosMarketMovingSlide from '../../pharos-seminar/slides/04-market-moving';
import PharosGapSlide from '../../pharos-seminar/slides/05-gap';
import PharosTransitionSlide from '../../pharos-seminar/slides/06-transition';
import PharosPrinciple1Slide from '../../pharos-seminar/slides/07-principle1';
import PharosPrinciple2Slide from '../../pharos-seminar/slides/08-principle2';
import PharosPrinciple3Slide from '../../pharos-seminar/slides/09-principle3';
import PharosPrinciple4Slide from '../../pharos-seminar/slides/10-principle4';
import PharosPrinciple5Slide from '../../pharos-seminar/slides/11-principle5';
import PharosM3BeginsSlide from '../../pharos-seminar/slides/12-5-m3-begins';
import PharosWorkingOverviewSlide from '../../pharos-seminar/slides/12a-working-overview';
import PharosWorkingAuditSlide from '../../pharos-seminar/slides/12b-working-audit';
import PharosNCAComponent from '../../pharos-seminar/slides/13-component-nca';
import PharosDataFlowComponent from '../../pharos-seminar/slides/14-component-dataflow';
import PharosAuditChainComponent from '../../pharos-seminar/slides/15-component-audit';
import PharosPopPKDashboard from '../../pharos-seminar/slides/16-poppk-dashboard';
import PharosMarketplaceSOPComponent from '../../pharos-seminar/slides/17-component-sop';
import PharosRegulatoryDashboard from '../../pharos-seminar/slides/18-regulatory-dashboard';
import PharosE2EAuditDashboard from '../../pharos-seminar/slides/19-e2e-audit-dashboard';
import PharosSynthesisDossier from '../../pharos-seminar/slides/20-synthesis-dossier';
import PharosSynthesisTrace from '../../pharos-seminar/slides/21-synthesis-trace';
import PharosPublicationClose from '../../pharos-seminar/slides/22-publication-close';
// CS2 closer — interactive dossier (sourced from qp2-seminar-v4-2; PharmAgent showcase)
import CS2InteractiveDossier from '../../qp2-seminar-v4-2/slides/cs3-06b-interactive-dossier';
import Cs3AiRegulatoryFloor from './slides/cs3-ai-regulatory-floor';
import Cs3AiGap from './slides/cs3-ai-gap';
import Cs3AiWorkingOverview from './slides/cs3-ai-working-overview';
import Cs3AiPoppkDashboard from './slides/cs3-ai-poppk-dashboard';
import Cs3AiPublicationClose from './slides/cs3-ai-publication-close';
import Cs4CloseDivider from './slides/cs4-close-divider';

// Portfolio + company adapter
import Portfolio01 from './slides/portfolio-01';
import CompanyBridgeDivider from './slides/company-bridge/00-divider';
import CompanyBridgeOncologyProblem from './slides/company-bridge/01-oncology-problem';
import CompanyBridgeOncologyApproach from './slides/company-bridge/02-oncology-approach';
import CompanyBridgeCaseMapping from './slides/company-bridge/03-case-mapping';
import CompanyBridgeHbvHdv from './slides/company-bridge/04-hbv-hdv';
import CompanyBridgeFit from './slides/company-bridge/05-fit';

// Prior-work backup — India reliance (Ivosidenib)
import CS3IvosidenibDivider from './slides/cs3-01-ivosidenib-divider';
import CS2BackgroundDisease from './slides/cs2-02-background-disease';
import CS2DiseaseBackground from './slides/cs2-disease-background';
import CS2Competitors from './slides/cs2-competitors';
import CS2BackgroundRegulatory from './slides/cs2-03-background-regulatory';
import CS2Setup from './slides/cs2-04-setup';
import CS2ArchitectureV2 from './slides/cs2-05-architecture-v2';
import CS2Pillars from './slides/cs2-05b-pillars';
import CS2Reversal from './slides/cs2-06-reversal';
import CS2Reckoning from './slides/cs2-07b-reckoning';
import CS2Leadership from './slides/cs2-09-leadership';
import CS2BridgeRecap from './slides/cs2-10-bridge-recap';

// Close
import ClosingThread from './slides/closing-01-thread';
import ClosingFit from './slides/closing-02-fit';
import ClosingThanks from './slides/closing-03-thanks';

// Backups
import Cs1BackupTimelineContext from './slides/cs1-backup-01-timeline-context';
import Cs1BackupTimelineAmbOnly from './slides/cs1-backup-02-timeline-amb-only';
import Cs1BackupTimelineProgramDetail from './slides/cs1-backup-03-timeline-program-detail';
import Cs1BackupStartsDetail from './slides/cs1-B1-starts-detail';
import Cs1BackupRatFinding from './slides/cs1-B2-rat-finding';
import Cs1BackupDosingScheme from './slides/cs1-B3-dosing-scheme';
import Cs1BackupFdaGap from './slides/cs1-B4-fda-gap';
import Cs1BackupAllometry from './slides/cs1-B5-allometry';
import Cs1BackupB6_6mwd from './slides/cs1-B6-6mwd';
import Cs1BackupB7Lte from './slides/cs1-B7-lte';
import Cs1BackupB8Ddi from './slides/cs1-B8-ddi';
import Cs1BackupB9E11a from './slides/cs1-B9-e11a';
import Cs1BackupB10EndpointHistory from './slides/cs1-B10-endpoint-history';
import Cs1BackupB11GarnettFlorian from './slides/cs1-B11-garnett-florian';
import Cs1BackupB12Hemodynamic from './slides/cs1-B12-hemodynamic';
import Cs1BackupB13PipArchitecture from './slides/cs1-B13-pip-architecture';
import Cs1BackupB14Bayesian from './slides/cs1-B14-bayesian';
import Cs1BackupMasterDivider from './slides/cs1-backup-master-divider';
import Cs1BackupTypeHistorical from './slides/cs1-backup-type-1-historical';
import Cs1BackupTypeMethodology from './slides/cs1-backup-type-2-methodology';
import Cs1BackupTypeDataCuts from './slides/cs1-backup-type-3-data-cuts';
import Cs1BackupTypeRiskMitigation from './slides/cs1-backup-type-4-risk-mitigation';
import Cs1BackupTypeRegulatoryPrecedent from './slides/cs1-backup-type-5-regulatory-precedent';
import Cs1BackupB15PopPkParameters from './slides/cs1-B15-poppk-parameters';
import Cs1BackupB16ModelDiagnostics from './slides/cs1-B16-model-diagnostics';
import Cs1BackupB18ExposureMatching from './slides/cs1-B18-exposure-matching';
import Cs1BackupB19EmaAddendum2026 from './slides/cs1-B19-ema-addendum-2026';
import Cs1BackupB20FullStory from './slides/cs1-B20-full-story';

import Cs2BackupMasterDivider from './slides/cs2-backup-master-divider';
import Cs2BackupTypeHistorical from './slides/cs2-backup-type-1-historical';
import Cs2BackupTypeMethodology from './slides/cs2-backup-type-2-methodology';
import Cs2BackupTypeDataCuts from './slides/cs2-backup-type-3-data-cuts';
import Cs2BackupB1CdscoTimeline from './slides/cs2-B1-cdsco-timeline';
import Cs2BackupB2SixPillarPackage from './slides/cs2-B2-six-pillar-package';
import Cs2BackupB3Phase1DoseRationale from './slides/cs2-B3-phase1-dose-rationale';
import Cs2BackupB4PopulationEvidence from './slides/cs2-B4-population-evidence';
import { AiBackupDivider } from './slides/backup-group-divider';

import notes from './notes';
import qa from './qa';
import reading from './reading/index';

const Cs1CovariateStrategy = () =>
  createElement(Cs1BackupB17CovariateAnalysis, { live: true });

const manifest = {
  id: 'v7-xencor-v3',
  title: 'Xencor · Pharmacometrics & Clinical Pharmacology',
  subtitle: 'v3 · forked from v2 (de-busied 06 + type scale) · iterate freely',
  theme: 'light-editorial',
  themeMode: 'light',
  notes,
  qa,
  reading,
  defaultTransition: 'card',
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'Xencor seminar · August 12 2026',
      showSlideNumber: true,
      showTime: false,
    },
  },
  export: {
    defaultSettleMs: 1300,
    slideSettleMs: {},
  },
  slides: [
    // Intro
    { id: 'title', title: 'Quantitative decisions when the clean experiment is unavailable', component: TitleSlide, isTitle: true, time: 45 },
    { id: 'hook-A-trial-not-answer', title: 'Hook · sequence of decisions', component: HookATrialNotAnswer, isTitle: true, transition: 'fade', time: 75 },
    { id: 'what-you-will-see', title: 'What you will see · four cases', component: WhatYouWillSee, isTitle: true, time: 90 },
    { id: 'career-arc', title: 'Career arc', component: CareerArc, isTitle: false, time: 90 },
    { id: 'roadmap', title: 'Roadmap · four cases, one discipline', component: Roadmap, isTitle: false, time: 75 },

    // CS 1
    { id: 'cs1-divider', title: 'Case 01 · Ambrisentan', component: Cs1Divider, isTitle: true, transition: 'fade', time: 20 },
    { id: 'cs1-question', title: 'CS1 · setup + the question', component: Cs1Question, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs1-context', title: 'CS1 · why the question is hard', component: Cs1Context, isTitle: false, transition: 'fade', time: 45 },
    { id: 'cs1-mechanism', title: 'CS1 · pathway + drug', component: Cs1Mechanism, isTitle: false, transition: 'fade', time: 35 },
    { id: 'cs1-trial', title: 'CS1 · AMB112529 + LTE', component: Cs1Trial, isTitle: false, transition: 'fade', time: 50 },
    { id: 'cs1-architecture', title: 'CS1 · drug + 5 constraints', component: Cs1Architecture, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs1-covariate-strategy', title: 'CS1 · full covariate model', component: Cs1CovariateStrategy, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs1-poppk', title: 'CS1 · PopPK · build + fit', component: Cs1Poppk, isTitle: false, transition: 'fade', time: 65 },
    { id: 'cs1-pkpd', title: 'CS1 · PopPK · build + fit PART 2', component: Cs1Pkpd, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs1-outcome', title: 'CS1 · three disruptions', component: Cs1Outcome, isTitle: false, transition: 'fade', time: 45 },
    { id: 'cs1-bracket', title: 'CS1 · ownership', component: Cs1Bracket, isTitle: false, transition: 'fade', time: 45 },
    { id: 'cs1-lesson', title: 'CS1 · what this case proves', component: Cs1Lesson, isTitle: false, transition: 'fade', time: 50 },
    { id: 'cs1-bridge', title: 'CS1 → CS2 bridge', component: Cs1Bridge, isTitle: false, transition: 'fade', time: 30 },

    // CS 2 — Asparlas efficient design
    { id: 'cs2-asp-divider', title: 'Case 02 · Calaspargase pegol', component: Cs2AspDivider, isTitle: true, transition: 'fade', time: 35 },
    { id: 'cs2-asp-challenge', title: 'CS2 · setup + 94 adults not feasible', component: Cs2AspChallenge, isTitle: false, transition: 'fade', time: 75 },
    { id: 'cs2-asp-strategy', title: 'CS2 · two innovations stacked', component: Cs2AspStrategy, isTitle: false, transition: 'fade', time: 75 },
    { id: 'cs2-asp-fda', title: 'CS2 · FDA Type A agreed N=60', component: Cs2AspFda, isTitle: false, transition: 'fade', time: 75 },
    { id: 'cs2-asp-fit', title: 'CS2 · sixty adults anchor the model', component: Cs2AspFit, isTitle: false, transition: 'fade', time: 75 },
    { id: 'cs2-asp-impact', title: 'CS2 · 36% reduction · precedent travels', component: Cs2AspImpact, isTitle: false, transition: 'fade', time: 65 },
    { id: 'cs2-asp-bridge', title: 'CS2 → CS3 bridge · efficient design to access', component: Cs2AspBridge, isTitle: false, transition: 'fade', time: 45 },

    // CS 3 — Ivosidenib / India reliance
    { id: 'cs3-ivosidenib-divider', title: "Case 03 · Ivosidenib in India", component: CS3IvosidenibDivider, isTitle: true, transition: 'fade', time: 25 },
    { id: 'cs3-setup', title: 'CS3 · setup + SEC local PK/PD ask', component: CS2Setup, isTitle: false, transition: 'fade', time: 60 },
    { id: 'cs3-bg-regulatory', title: 'CS3 · Rule 101 · the wall and the opening', component: CS2BackgroundRegulatory, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs3-pillars', title: 'CS3 · six convergent evidence pillars', component: CS2Pillars, isTitle: false, transition: 'fade', time: 70 },
    { id: 'cs3-reversal', title: 'CS3 · CDSCO approved without a local trial', component: CS2Reversal, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs3-reckoning', title: 'CS3 · what we shipped and what we did not', component: CS2Reckoning, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs3-leadership', title: 'CS3 · leading cross-functionally under pressure', component: CS2Leadership, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs3-bridge-recap', title: 'CS3 → CS4 bridge · the science was the bridge', component: CS2BridgeRecap, isTitle: false, transition: 'fade', time: 40 },

    // CS 4 — AI / Pharazi hard cut
    { id: 'cs2-pharazi-divider', title: 'Case 04 · AI / Pharazi', component: CS2PharaziDivider, isTitle: true, transition: 'fade', time: 25 },
    { id: 'cs2-regulatory-floor', title: 'CS4 · setup + regulatory floor', component: Cs3AiRegulatoryFloor, isTitle: false, time: 40 },
    { id: 'cs2-gap', title: 'CS4 · Traceability gap', component: Cs3AiGap, isTitle: false, time: 35 },
    { id: 'cs2-working-overview', title: 'CS4 · Working system overview', component: Cs3AiWorkingOverview, isTitle: false, time: 50 },
    { id: 'cs2-poppk-dashboard', title: 'CS4 · PopPK review dashboard', component: Cs3AiPoppkDashboard, isTitle: false, time: 50 },
    { id: 'cs2-publication-close', title: 'CS4 · Traceable acceleration', component: Cs3AiPublicationClose, isTitle: false, time: 45 },
    { id: 'cs4-close-divider', title: 'Cases 01–04 · Core complete', component: Cs4CloseDivider, isTitle: true, transition: 'fade', time: 25 },

    // Portfolio + company bridge
    { id: 'portfolio-01', title: 'Portfolio · breadth across modality, area, and agency', component: Portfolio01, isTitle: false, transition: 'fade', time: 120 },
    { id: 'company-bridge-divider', title: 'Company bridge · two pillars, one discipline', component: CompanyBridgeDivider, isTitle: true, transition: 'fade', time: 45 },
    { id: 'company-bridge-oncology-problem', title: 'Company bridge · oncology problem', component: CompanyBridgeOncologyProblem, isTitle: false, transition: 'fade', time: 80 },
    { id: 'company-bridge-oncology-approach', title: 'Company bridge · assay to model to dose', component: CompanyBridgeOncologyApproach, isTitle: false, transition: 'fade', time: 95 },
    { id: 'company-bridge-case-mapping', title: 'Company bridge · discipline transfer', component: CompanyBridgeCaseMapping, isTitle: false, transition: 'fade', time: 65 },
    { id: 'company-bridge-hbv-hdv', title: 'Company bridge · HBV/HDV dose questions', component: CompanyBridgeHbvHdv, isTitle: false, transition: 'fade', time: 65 },
    { id: 'company-bridge-fit', title: 'Company bridge · how I would start', component: CompanyBridgeFit, isTitle: false, transition: 'fade', time: 90 },

    // Close
    { id: 'closing-thread',  title: 'Closing · The common thread', component: ClosingThread, isTitle: false, transition: 'fade', time: 60 },
    { id: 'closing-fit',     title: 'Closing · Why Xencor',         component: ClosingFit,    isTitle: false, transition: 'fade', time: 75 },
    { id: 'closing-thanks',  title: 'Thank you · Q&A',           component: ClosingThanks, isTitle: true,  transition: 'fade', time: 30 },

    // Backups
    { id: 'cs1-backup-master',                   title: 'BACKUP · Case Study 01 · Ambrisentan',                       component: Cs1BackupMasterDivider,             isTitle: true,  transition: 'fade' },
    { id: 'cs1-backup-type-1-historical',        title: 'BACKUP TYPE 1 · Historical Context',                         component: Cs1BackupTypeHistorical,            isTitle: true,  transition: 'fade' },
    { id: 'cs1-backup-timeline-context',         title: 'Backup · CS1 timeline · 1995–2026',                          component: Cs1BackupTimelineContext,           isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-timeline-amb-only',        title: 'Backup · CS1 timeline · ambrisentan-only 2004–2024',         component: Cs1BackupTimelineAmbOnly,           isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-timeline-program-detail',  title: 'Backup · CS1 timeline · program detail (adult + AMB112529)', component: Cs1BackupTimelineProgramDetail,     isTitle: false, transition: 'fade' },
    { id: 'cs1-B10-endpoints',                   title: 'Backup B10 · Endpoint evolution timeline',                   component: Cs1BackupB10EndpointHistory,        isTitle: false, transition: 'fade' },
    { id: 'cs1-B20-full-story',                  title: 'Backup B20 · Full CS1 story',                                component: Cs1BackupB20FullStory,              isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-type-2-methodology',       title: 'BACKUP TYPE 2 · Methodology',                                component: Cs1BackupTypeMethodology,           isTitle: true,  transition: 'fade' },
    { id: 'cs1-B3-dosing',                       title: 'Backup B3 · Dosing scheme (3×2 matrix)',                     component: Cs1BackupDosingScheme,              isTitle: false, transition: 'fade' },
    { id: 'cs1-B5-allometry',                    title: 'Backup B5 · Allometric scaling defense',                     component: Cs1BackupAllometry,                 isTitle: false, transition: 'fade' },
    { id: 'cs1-B6-6mwd',                         title: 'Backup B6 · 6MWD endpoint validity',                         component: Cs1BackupB6_6mwd,                   isTitle: false, transition: 'fade' },
    { id: 'cs1-B14-bayesian',                    title: 'Backup B14 · Bayesian borrowing framework',                  component: Cs1BackupB14Bayesian,               isTitle: false, transition: 'fade' },
    { id: 'cs1-B15-poppk-parameters',            title: 'Backup B15 · PopPK parameter table',                         component: Cs1BackupB15PopPkParameters,        isTitle: false, transition: 'fade' },
    { id: 'cs1-B16-model-diagnostics',           title: 'Backup B16 · Model diagnostics + robustness',                component: Cs1BackupB16ModelDiagnostics,       isTitle: false, transition: 'fade' },
    { id: 'cs1-B18-exposure-matching',           title: 'Backup B18 · Weight-band exposure matching',                 component: Cs1BackupB18ExposureMatching,       isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-type-3-data-cuts',         title: 'BACKUP TYPE 3 · Data Cuts',                                  component: Cs1BackupTypeDataCuts,              isTitle: true,  transition: 'fade' },
    { id: 'cs1-B7-lte',                          title: 'Backup B7 · Long-term extension',                            component: Cs1BackupB7Lte,                     isTitle: false, transition: 'fade' },
    { id: 'cs1-B8-ddi',                          title: 'Backup B8 · DDI + PDE-5i',                                   component: Cs1BackupB8Ddi,                     isTitle: false, transition: 'fade' },
    { id: 'cs1-B12-hemodynamic',                 title: 'Backup B12 · Hemodynamic substudy',                          component: Cs1BackupB12Hemodynamic,            isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-type-4-risk-mitigation',   title: 'BACKUP TYPE 4 · Risk Mitigation',                            component: Cs1BackupTypeRiskMitigation,        isTitle: true,  transition: 'fade' },
    { id: 'cs1-B1-starts',                       title: 'Backup B1 · STARTS-1/STARTS-2 detail',                       component: Cs1BackupStartsDetail,              isTitle: false, transition: 'fade' },
    { id: 'cs1-B2-rat-finding',                  title: 'Backup B2 · Juvenile rat finding',                           component: Cs1BackupRatFinding,                isTitle: false, transition: 'fade' },
    { id: 'cs1-B4-fda-gap',                      title: 'Backup B4 · FDA submission gap',                             component: Cs1BackupFdaGap,                    isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-type-5-regulatory',        title: 'BACKUP TYPE 5 · Regulatory Precedent',                       component: Cs1BackupTypeRegulatoryPrecedent,   isTitle: true,  transition: 'fade' },
    { id: 'cs1-B9-e11a',                         title: 'Backup B9 · ICH E11A extrapolation',                         component: Cs1BackupB9E11a,                    isTitle: false, transition: 'fade' },
    { id: 'cs1-B11-garnett-florian',             title: 'Backup B11 · Garnett-Florian framework',                     component: Cs1BackupB11GarnettFlorian,         isTitle: false, transition: 'fade' },
    { id: 'cs1-B13-pip',                         title: 'Backup B13 · PIP architecture & age coverage',               component: Cs1BackupB13PipArchitecture,        isTitle: false, transition: 'fade' },
    { id: 'cs1-B19-ema-addendum-2026',           title: 'Backup B19 · EMA Pediatric PAH Addendum (March 2026)',       component: Cs1BackupB19EmaAddendum2026,        isTitle: false, transition: 'fade' },

    { id: 'ai-backup-master',                    title: 'BACKUP · AI / Pharazi extended material',                    component: AiBackupDivider,                    isTitle: true,  transition: 'fade' },
    { id: 'cs2-market-moving',                   title: 'Backup · AI · Comparator landscape',                          component: PharosMarketMovingSlide,            isTitle: false, transition: 'fade' },
    { id: 'cs2-transition',                      title: 'Backup · AI · Movement II marker',                            component: PharosTransitionSlide,              isTitle: true,  transition: 'fade' },
    { id: 'cs2-principle1',                      title: 'Backup · AI · P1 · Centralized hierarchy',                    component: PharosPrinciple1Slide,              isTitle: false, transition: 'fade' },
    { id: 'cs2-principle2',                      title: 'Backup · AI · P2 · Structural privacy',                       component: PharosPrinciple2Slide,              isTitle: false, transition: 'fade' },
    { id: 'cs2-principle3',                      title: 'Backup · AI · P3 · Cryptographic audit',                      component: PharosPrinciple3Slide,              isTitle: false, transition: 'fade' },
    { id: 'cs2-principle4',                      title: 'Backup · AI · P4 · SOPs as versioned plans',                  component: PharosPrinciple4Slide,              isTitle: false, transition: 'fade' },
    { id: 'cs2-principle5',                      title: 'Backup · AI · P5 · Orthogonal layering',                      component: PharosPrinciple5Slide,              isTitle: false, transition: 'fade' },
    { id: 'cs2-m3-begins',                       title: 'Backup · AI · Movement III marker',                           component: PharosM3BeginsSlide,                isTitle: true,  transition: 'fade' },
    { id: 'cs2-working-audit',                   title: 'Backup · AI · Working system QC + audit',                     component: PharosWorkingAuditSlide,            isTitle: false, transition: 'fade' },
    { id: 'cs2-component-nca',                   title: 'Backup · AI · Component · NCA',                               component: PharosNCAComponent,                 isTitle: false, transition: 'fade' },
    { id: 'cs2-component-dataflow',              title: 'Backup · AI · Component · Data flow',                         component: PharosDataFlowComponent,            isTitle: false, transition: 'fade' },
    { id: 'cs2-component-audit',                 title: 'Backup · AI · Component · Audit chain',                       component: PharosAuditChainComponent,          isTitle: false, transition: 'fade' },
    { id: 'cs2-component-sop',                   title: 'Backup · AI · Component · Marketplace SOP',                   component: PharosMarketplaceSOPComponent,      isTitle: false, transition: 'fade' },
    { id: 'cs2-regulatory-dashboard',            title: 'Backup · AI · Regulatory readiness dashboard',                component: PharosRegulatoryDashboard,          isTitle: false, transition: 'fade' },
    { id: 'cs2-e2e-audit',                       title: 'Backup · AI · End-to-end audit dashboard',                    component: PharosE2EAuditDashboard,            isTitle: false, transition: 'fade' },
    { id: 'cs2-synthesis-dossier',               title: 'Backup · AI · Synthesis interactive dossier',                 component: PharosSynthesisDossier,             isTitle: false, transition: 'fade' },
    { id: 'cs2-synthesis-trace',                 title: 'Backup · AI · Cinematic workflow trace',                      component: PharosSynthesisTrace,               isTitle: false, transition: 'fade' },
    { id: 'cs2-interactive-dossier',             title: 'Backup · AI · PharmAgent interactive dossier',                component: CS2InteractiveDossier,              isTitle: false, transition: 'fade' },
    
    { id: 'cs3-bg-disease',                      title: 'Backup · Ivosidenib · 42 countries',                         component: CS2BackgroundDisease,               isTitle: false, transition: 'fade' },
    { id: 'cs3-disease',                         title: 'Backup · Ivosidenib · Disease',                              component: CS2DiseaseBackground,               isTitle: false, transition: 'fade' },
    { id: 'cs3-competitors',                     title: 'Backup · Ivosidenib · Landscape',                            component: CS2Competitors,                     isTitle: false, transition: 'fade' },
    { id: 'cs3-architecture-v2',                 title: 'Backup · Ivosidenib · MOA',                                  component: CS2ArchitectureV2,                  isTitle: false, transition: 'fade' },
    { id: 'cs3-backup-type-1-historical',        title: 'BACKUP TYPE 1 · Historical Context',                         component: Cs2BackupTypeHistorical,            isTitle: true,  transition: 'fade' },
    { id: 'cs3-B1-cdsco-timeline',               title: 'Backup B1 · CDSCO engagement timeline',                      component: Cs2BackupB1CdscoTimeline,           isTitle: false, transition: 'fade' },
    { id: 'cs3-backup-type-2-methodology',       title: 'BACKUP TYPE 2 · Methodology',                                component: Cs2BackupTypeMethodology,           isTitle: true,  transition: 'fade' },
    { id: 'cs3-B2-six-pillar-package',           title: 'Backup B2 · Six-Pillar Package',                             component: Cs2BackupB2SixPillarPackage,        isTitle: false, transition: 'fade' },
    { id: 'cs3-B3-phase1-dose-rationale',        title: 'Backup B3 · Phase 1 dose rationale (500 mg QD)',             component: Cs2BackupB3Phase1DoseRationale,     isTitle: false, transition: 'fade' },
    { id: 'cs3-backup-type-3-data-cuts',         title: 'BACKUP TYPE 3 · Data Cuts',                                  component: Cs2BackupTypeDataCuts,              isTitle: true,  transition: 'fade' },
    { id: 'cs3-B4-population-evidence',          title: 'Backup B4 · Population evidence (IDH1 + DME polymorphisms)', component: Cs2BackupB4PopulationEvidence,      isTitle: false, transition: 'fade' },
  ],
};

export default manifest;
