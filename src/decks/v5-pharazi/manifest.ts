import { createElement } from 'react';
import TitleSlide from './slides/01-title';
import HookATrialNotAnswer from './slides/02-hook-A-trial-not-answer';
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

// CS2 - Pharazi
import CS2PharaziDivider from './slides/cs2-01-pharazi-divider';
import PharaziRegulatoryFloorSlide from '../pharazi-seminar/slides/03-regulatory-floor';
import PharaziMarketMovingSlide from '../pharazi-seminar/slides/04-market-moving';
import PharaziGapSlide from '../pharazi-seminar/slides/05-gap';
import PharaziTransitionArchitectureSlide from '../pharazi-seminar/slides/06-transition';
import PharaziMovement2BeginsSlide from '../pharazi-seminar/slides/06-5-m2-begins';
import PharaziFoundationOverviewSlide from '../pharazi-seminar/slides/06-6-foundation-overview';
import PharaziPrinciple1Slide from '../pharazi-seminar/slides/07-principle1';
import PharaziPrinciple2Slide from '../pharazi-seminar/slides/08-principle2';
import PharaziPrinciple3Slide from '../pharazi-seminar/slides/09-principle3';
import PharaziPrinciple4Slide from '../pharazi-seminar/slides/10-principle4';
import PharaziPrinciple5Slide from '../pharazi-seminar/slides/11-principle5';
import PharaziFoundationAuditSlide from '../pharazi-seminar/slides/11-5-foundation-audit';
import PharaziMovement3BeginsSlide from '../pharazi-seminar/slides/12-5-m3-begins';
import PharaziTransitionComponentsSlide from '../pharazi-seminar/slides/13-transition-components';
import PharaziDomain1Slide from '../pharazi-seminar/slides/14-domain-data';
import PharaziDomain2Slide from '../pharazi-seminar/slides/15-domain-nca';
import PharaziDomain3Slide from '../pharazi-seminar/slides/16-domain-poppk';
import PharaziDomain4Slide from '../pharazi-seminar/slides/17-domain-er';
import PharaziDomain5Slide from '../pharazi-seminar/slides/18-domain-reg';
import PharaziDomain6Slide from '../pharazi-seminar/slides/19-domain-audit';
import PharaziEndToEndSlide from '../pharazi-seminar/slides/19-5a-end-to-end';
import PharaziConcurrentUseSlide from '../pharazi-seminar/slides/19-5b-concurrent-use';

// CS3 - India
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
import ClosingMerck from './slides/closing-02-merck';
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

import notes from './notes';
import qa from './qa';
import reading from './reading/index';

const Cs1CovariateStrategy = () =>
  createElement(Cs1BackupB17CovariateAnalysis, { live: true });

const manifest = {
  id: 'v5-pharazi',
  title: 'Quantitative Pharmacology in Action',
  subtitle: 'Strategies for Dose Selection and Regulatory Impact Across Therapeutic Areas',
  theme: 'clinical',
  notes,
  qa,
  reading,
  defaultTransition: 'card',
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'Quantitative Pharmacology in Action · Spring 2026',
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
    { id: 'title', title: 'Quantitative Pharmacology in Action', component: TitleSlide, isTitle: true, time: 45 },
    { id: 'hook-A-trial-not-answer', title: 'Hook A', component: HookATrialNotAnswer, isTitle: true, transition: 'fade', time: 75 },
    { id: 'career-arc', title: 'Career arc', component: CareerArc, isTitle: false, time: 90 },
    { id: 'roadmap', title: 'Roadmap', component: Roadmap, isTitle: false, time: 75 },

    // CS 1
    { id: 'cs1-divider', title: 'Case 01 · Ambrisentan', component: Cs1Divider, isTitle: true, transition: 'fade', time: 20 },
    { id: 'cs1-question', title: 'CS1 · the question', component: Cs1Question, isTitle: false, transition: 'fade', time: 45 },
    { id: 'cs1-context', title: 'CS1 · why the question is hard', component: Cs1Context, isTitle: false, transition: 'fade', time: 45 },
    { id: 'cs1-mechanism', title: 'CS1 · pathway + drug', component: Cs1Mechanism, isTitle: false, transition: 'fade', time: 35 },
    { id: 'cs1-trial', title: 'CS1 · AMB112529 + LTE', component: Cs1Trial, isTitle: false, transition: 'fade', time: 50 },
    { id: 'cs1-architecture', title: 'CS1 · drug + 5 constraints', component: Cs1Architecture, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs1-covariate-strategy', title: 'CS1 · full covariate model', component: Cs1CovariateStrategy, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs1-poppk', title: 'CS1 · PopPK · build + fit', component: Cs1Poppk, isTitle: false, transition: 'fade', time: 65 },
    { id: 'cs1-pkpd', title: 'CS1 · PopPK · build + fit PART 2', component: Cs1Pkpd, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs1-outcome', title: 'CS1 · the numbers', component: Cs1Outcome, isTitle: false, transition: 'fade', time: 45 },
    { id: 'cs1-bracket', title: 'CS1 · ownership', component: Cs1Bracket, isTitle: false, transition: 'fade', time: 45 },
    { id: 'cs1-lesson', title: 'CS1 · what this case proves', component: Cs1Lesson, isTitle: false, transition: 'fade', time: 50 },
    { id: 'cs1-bridge', title: 'CS1 → CS2 bridge', component: Cs1Bridge, isTitle: false, transition: 'fade', time: 30 },

    // CS 2 - Pharazi
    { id: 'cs2-pharazi-divider', title: 'Case 02 · AI the Pharazi', component: CS2PharaziDivider, isTitle: true, transition: 'fade', time: 30 },
    { id: 'cs2-regulatory-floor', title: 'CS2 · Regulatory floor', component: PharaziRegulatoryFloorSlide, isTitle: false, time: 40 },
    { id: 'cs2-market-moving', title: 'CS2 · Market is moving', component: PharaziMarketMovingSlide, isTitle: false, time: 40 },
    { id: 'cs2-gap', title: 'CS2 · Gap', component: PharaziGapSlide, isTitle: false, time: 40 },
    { id: 'cs2-transition', title: 'CS2 · Transition architecture', component: PharaziTransitionArchitectureSlide, isTitle: true, time: 30 },
    { id: 'cs2-m2-begins', title: 'CS2 · M2 begins', component: PharaziMovement2BeginsSlide, isTitle: true, time: 20 },
    { id: 'cs2-foundation-overview', title: 'CS2 · Foundation overview', component: PharaziFoundationOverviewSlide, isTitle: false, time: 50 },
    { id: 'cs2-principle1', title: 'CS2 · Principle 1', component: PharaziPrinciple1Slide, isTitle: false, time: 45 },
    { id: 'cs2-principle2', title: 'CS2 · Principle 2', component: PharaziPrinciple2Slide, isTitle: false, time: 45 },
    { id: 'cs2-principle3', title: 'CS2 · Principle 3', component: PharaziPrinciple3Slide, isTitle: false, time: 45 },
    { id: 'cs2-principle4', title: 'CS2 · Principle 4', component: PharaziPrinciple4Slide, isTitle: false, time: 45 },
    { id: 'cs2-principle5', title: 'CS2 · Principle 5', component: PharaziPrinciple5Slide, isTitle: false, time: 45 },
    { id: 'cs2-foundation-audit', title: 'CS2 · Foundation audit', component: PharaziFoundationAuditSlide, isTitle: false, time: 40 },
    { id: 'cs2-m3-begins', title: 'CS2 · M3 begins', component: PharaziMovement3BeginsSlide, isTitle: true, time: 20 },
    { id: 'cs2-transition-components', title: 'CS2 · Transition components', component: PharaziTransitionComponentsSlide, isTitle: true, time: 30 },
    { id: 'cs2-domain1', title: 'CS2 · Domain Data', component: PharaziDomain1Slide, isTitle: false, time: 35 },
    { id: 'cs2-domain2', title: 'CS2 · Domain NCA', component: PharaziDomain2Slide, isTitle: false, time: 35 },
    { id: 'cs2-domain3', title: 'CS2 · Domain PopPK', component: PharaziDomain3Slide, isTitle: false, time: 35 },
    { id: 'cs2-domain4', title: 'CS2 · Domain ER', component: PharaziDomain4Slide, isTitle: false, time: 35 },
    { id: 'cs2-domain5', title: 'CS2 · Domain Reg', component: PharaziDomain5Slide, isTitle: false, time: 35 },
    { id: 'cs2-domain6', title: 'CS2 · Domain Audit', component: PharaziDomain6Slide, isTitle: false, time: 35 },
    { id: 'cs2-end-to-end', title: 'CS2 · End to end', component: PharaziEndToEndSlide, isTitle: false, time: 70 },
    { id: 'cs2-concurrent-use', title: 'CS2 · Concurrent use', component: PharaziConcurrentUseSlide, isTitle: false, time: 55 },

    // CS 3 - India (Ivosidenib)
    { id: 'cs3-ivosidenib-divider', title: 'Case 03 · Ivosidenib', component: CS3IvosidenibDivider, isTitle: true },
    { id: 'cs3-bg-disease', title: 'CS3 · 42 countries', component: CS2BackgroundDisease, isTitle: false },
    { id: 'cs3-disease', title: 'CS3 · Disease', component: CS2DiseaseBackground, isTitle: false },
    { id: 'cs3-competitors', title: 'CS3 · Landscape', component: CS2Competitors, isTitle: false },
    { id: 'cs3-bg-regulatory', title: 'CS3 · Rule 101', component: CS2BackgroundRegulatory, isTitle: false },
    { id: 'cs3-setup', title: 'CS3 · Can dossier replace local trial?', component: CS2Setup, isTitle: false },
    { id: 'cs3-architecture-v2', title: 'CS3 · MOA', component: CS2ArchitectureV2, isTitle: false },
    { id: 'cs3-pillars', title: 'CS3 · Six pillars', component: CS2Pillars, isTitle: false },
    { id: 'cs3-reversal', title: 'CS3 · CDSCO approved', component: CS2Reversal, isTitle: false },
    { id: 'cs3-reckoning', title: 'CS3 · What we shipped', component: CS2Reckoning, isTitle: false },
    { id: 'cs3-leadership', title: 'CS3 · Bracket Method ownership', component: CS2Leadership, isTitle: false },
    { id: 'cs3-bridge-recap', title: 'CS3 · The science was the bridge', component: CS2BridgeRecap, isTitle: false },

    // Close
    { id: 'closing-thread',  title: 'Closing · The common thread', component: ClosingThread, isTitle: false, transition: 'fade', time: 60 },
    { id: 'closing-merck',   title: 'Closing · The fit',         component: ClosingMerck,  isTitle: false, transition: 'fade', time: 75 },
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
    
    { id: 'cs3-backup-master',                   title: 'BACKUP · Case Study 03 · Ivosidenib',                        component: Cs2BackupMasterDivider,             isTitle: true,  transition: 'fade' },
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
