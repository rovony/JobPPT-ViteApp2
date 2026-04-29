import TitleSlide from './slides/01-title';
import HookSlide from './slides/02-hook';
import AgendaSlide from './slides/02-5-agenda';
import RegulatoryFloorSlide from './slides/03-regulatory-floor';
import MarketMovingSlide from './slides/04-market-moving';
import GapSlide from './slides/05-gap';
import TransitionArchitectureSlide from './slides/06-transition';
import Principle1Slide from './slides/07-principle1';
import Principle2Slide from './slides/08-principle2';
import Principle3Slide from './slides/09-principle3';
import Principle4Slide from './slides/10-principle4';
import Principle5KillerSlide from './slides/11-principle5';
import M3BeginsSlide from './slides/12-5-m3-begins';
import WorkingOverviewSlide from './slides/12a-working-overview';
import WorkingAuditSlide from './slides/12b-working-audit';
// Movement 3 — component tour (slides 13–17)
import NCAComponent from './slides/13-component-nca';
import DataFlowComponent from './slides/14-component-dataflow';
import AuditChainComponent from './slides/15-component-audit';
import PopPKDashboard from './slides/16-poppk-dashboard';
import MarketplaceSOPComponent from './slides/17-component-sop';
// A4 Composed Dashboards (slides 18–19)
import RegulatoryDashboard from './slides/18-regulatory-dashboard';
import E2EAuditDashboard from './slides/19-e2e-audit-dashboard';
// Synthesis pair (slides 20–21)
import SynthesisDossier from './slides/20-synthesis-dossier';
import SynthesisTrace from './slides/21-synthesis-trace';
// Close cluster (22 publication, 22.5 recap, 23 Q&A)
import CloseSlide from './slides/22-publication-close';
import ClosingRecapSlide from './slides/22-5-closing-recap';
import QASlide from './slides/23-qa';

const manifest = {
  id: 'pharos-seminar',
  title: 'Pharos · Seminar',
  subtitle: 'Pharazi — an end-to-end AI multi-agent foundation for pharmaceutical sciences',
  theme: 'editorial',
  defaultTransition: 'card',
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'PHAROS · SEMINAR · 2026',
      showSlideNumber: true,
      showTime: false,
    },
  },
  export: {
    defaultSettleMs: 1400,
    slideSettleMs: {
      '02-5-agenda':           4500,   // strip + 3 cards cascade
      '11-principle5':         7500,   // killer slide — auto-stepper
      '12-5-m3-begins':        3000,   // marker — Roman III + strip
      '12a-working-overview':  4800,
      '12b-working-audit':     5400,
      '13-component-nca':      4200,
      '14-component-dataflow': 4400,
      '15-component-audit':    6000,
      '16-poppk-dashboard':    5200,   // 4-quadrant cascade + waterfall + GoF
      '17-component-sop':      3800,
      '18-regulatory-dashboard': 5600, // M15 cards + timeline + CTD stack
      '19-e2e-audit-dashboard':  6000, // provenance + LiveAuditChain verify sweep
      '20-synthesis-dossier':  9000,   // auto-advances 5 components @ ~1.5s each
      '21-synthesis-trace':   126000,  // cinematic SEQ trace ~120s + 6s settle
      '22-publication-close':  6000,   // status lines + iframe load + QR
      '22-5-closing-recap':    5000,
    },
  },
  slides: [
    { id: '01-title',                title: 'SLIDE 01 · Title',                                component: TitleSlide,                isTitle: true },
    { id: '02-hook',                 title: 'SLIDE 02 · 12 yrs → one foundation',              component: HookSlide },
    { id: '02-5-agenda',             title: 'SLIDE 02.5 · Agenda · 3 movements',               component: AgendaSlide,               isTitle: true },
    { id: '03-regulatory-floor',     title: 'SLIDE 03 · The regulatory floor is set',          component: RegulatoryFloorSlide },
    { id: '04-market-moving',        title: 'SLIDE 04 · Comparator landscape',                 component: MarketMovingSlide },
    { id: '05-gap',                  title: 'SLIDE 05 · The MIDD foundation is unbuilt',       component: GapSlide },
    { id: '06-transition',           title: 'SLIDE 06 · Movement II marker',                   component: TransitionArchitectureSlide, isTitle: true },
    { id: '07-principle1',           title: 'SLIDE 07 · P1 · Centralized hierarchy',           component: Principle1Slide },
    { id: '08-principle2',           title: 'SLIDE 08 · P2 · Structural privacy',              component: Principle2Slide },
    { id: '09-principle3',           title: 'SLIDE 09 · P3 · Cryptographic audit',             component: Principle3Slide },
    { id: '10-principle4',           title: 'SLIDE 10 · P4 · SOPs as versioned plans',         component: Principle4Slide },
    { id: '11-principle5',           title: 'SLIDE 11 · P5 · Orthogonal layering · KILLER',    component: Principle5KillerSlide },
    { id: '12-5-m3-begins',          title: 'SLIDE 11.5 · Movement III marker',                component: M3BeginsSlide,             isTitle: true },
    { id: '12a-working-overview',    title: 'SLIDE 12a · Working system · overview',           component: WorkingOverviewSlide },
    { id: '12b-working-audit',       title: 'SLIDE 12b · Working system · QC + audit',         component: WorkingAuditSlide },
    { id: '13-component-nca',        title: 'SLIDE 13 · Component 1 · NCA',                    component: NCAComponent },
    { id: '14-component-dataflow',   title: 'SLIDE 14 · Component 2 · Data Flow',              component: DataFlowComponent },
    { id: '15-component-audit',      title: 'SLIDE 15 · Component 3 · Audit Chain',            component: AuditChainComponent },
    { id: '16-poppk-dashboard',      title: 'SLIDE 16 · PopPK domain dashboard',               component: PopPKDashboard },
    { id: '17-component-sop',        title: 'SLIDE 17 · Component · Marketplace SOP',          component: MarketplaceSOPComponent },
    { id: '18-regulatory-dashboard', title: 'SLIDE 18 · Regulatory readiness dashboard',       component: RegulatoryDashboard },
    { id: '19-e2e-audit-dashboard',  title: 'SLIDE 19 · End-to-end audit dashboard',           component: E2EAuditDashboard },
    { id: '20-synthesis-dossier',    title: 'SLIDE 20 · Synthesis · interactive dossier',      component: SynthesisDossier },
    { id: '21-synthesis-trace',      title: 'SLIDE 21 · Synthesis · cinematic workflow trace', component: SynthesisTrace },
    { id: '22-publication-close',    title: 'SLIDE 22 · Publication close · pharazi.ai',       component: CloseSlide },
    { id: '22-5-closing-recap',      title: 'SLIDE 22.5 · Closing recap · 5 takeaways',        component: ClosingRecapSlide },
    { id: '23-qa',                   title: 'SLIDE 23 · Q&A',                                  component: QASlide,                   isTitle: true },
  ],
};

export default manifest;
