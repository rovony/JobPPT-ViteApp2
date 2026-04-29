import { createElement } from 'react';
import TitleSlide from './slides/01-title';
import HookSlide from './slides/02-hook'; // OPTIONAL per Amendment 5
import AgendaSlide from './slides/02-5-agenda';
import WholeStorySlide from './slides/02-7-whole-story';
import RegulatoryFloorSlide from './slides/03-regulatory-floor';
import MarketMovingSlide from './slides/04-market-moving';
import GapSlide from './slides/05-gap';
import TransitionArchitectureSlide from './slides/06-transition';
import Movement2BeginsSlide from './slides/06-5-m2-begins';
import FoundationOverviewSlide from './slides/06-6-foundation-overview';
import Principle1Slide from './slides/07-principle1';
import Principle2Slide from './slides/08-principle2';
import Principle3Slide from './slides/09-principle3';
import Principle4Slide from './slides/10-principle4';
import Principle5Slide from './slides/11-principle5';
import FoundationAuditSlide from './slides/11-5-foundation-audit';
import Movement3BeginsSlide from './slides/12-5-m3-begins';
import TransitionComponentsSlide from './slides/13-transition-components';
import Domain1Slide from './slides/14-domain-data';
import Domain2Slide from './slides/15-domain-nca';
import Domain3Slide from './slides/16-domain-poppk';
import Domain4Slide from './slides/17-domain-er';
import Domain5Slide from './slides/18-domain-reg';
import Domain6Slide from './slides/19-domain-audit';
// import EndToEndSlide from './slides/19-5a-end-to-end';
// import ConcurrentUseSlide from './slides/19-5b-concurrent-use';
import CloseSlide from './slides/20-close-ecosystem';
import QASlide from './slides/21-qa';

const manifest = {
  id: 'pharazi-seminar',
  title: 'Pharazi Seminar Deck',
  subtitle: 'An end-to-end AI multi-agent foundation for pharmaceutical sciences',
  theme: 'clinical',
  defaultTransition: 'card',
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'Pharazi Seminar · 2026',
      showSlideNumber: true,
      showTime: false,
    },
  },
  export: {
    defaultSettleMs: 1300,
    slideSettleMs: {},
  },
  slides: [
    { id: '01-title', title: 'SLIDE 01 · Title', component: TitleSlide, isTitle: true },
    // { id: '02-hook', title: 'SLIDE 02 · The Hook', component: HookSlide }, // Dropped per Amendment 5 (Option A)
    { id: '02-5-agenda', title: 'SLIDE 02.5 · Agenda', component: AgendaSlide },
    { id: '02-7-whole-story', title: 'SLIDE 02.7 · The Whole Story', component: WholeStorySlide },
    { id: '03-regulatory-floor', title: 'SLIDE 03 · The regulatory floor is set', component: RegulatoryFloorSlide },
    { id: '04-market-moving', title: 'SLIDE 04 · The market is moving above it', component: MarketMovingSlide },
    { id: '05-gap', title: 'SLIDE 05 · The MIDD foundation is unbuilt', component: GapSlide },
    { id: '06-transition', title: 'SLIDE 06 · Transition into architecture', component: TransitionArchitectureSlide, isTitle: true },
    { id: '06-5-m2-begins', title: 'SLIDE 06.5 · Movement 2 begins', component: Movement2BeginsSlide, isTitle: true },
    { id: '06-6-foundation-overview', title: 'SLIDE 06.6 · Foundation overview', component: FoundationOverviewSlide },
    { id: '07-principle1', title: 'SLIDE 07 · Principle 1', component: Principle1Slide },
    { id: '08-principle2', title: 'SLIDE 08 · Principle 2', component: Principle2Slide },
    { id: '09-principle3', title: 'SLIDE 09 · Principle 3', component: Principle3Slide },
    { id: '10-principle4', title: 'SLIDE 10 · Principle 4', component: Principle4Slide },
    { id: '11-principle5', title: 'SLIDE 11 · Principle 5', component: Principle5Slide },
    { id: '11-5-foundation-audit', title: 'SLIDE 11.5 · Foundation audit visible', component: FoundationAuditSlide },
    { id: '12-5-m3-begins', title: 'SLIDE 12.5 · Movement 3 begins', component: Movement3BeginsSlide, isTitle: true },
    { id: '13-transition-components', title: 'SLIDE 13 · The Domains', component: TransitionComponentsSlide, isTitle: true },
    { id: '14-domain-data', title: 'SLIDE 14 · Domain 1: Data', component: Domain1Slide },
    { id: '15-domain-nca', title: 'SLIDE 15 · Domain 2: NCA', component: Domain2Slide },
    { id: '16-domain-poppk', title: 'SLIDE 16 · Domain 3: PopPK', component: Domain3Slide },
    { id: '17-domain-er', title: 'SLIDE 17 · Domain 4: Exposure-Response', component: Domain4Slide },
    { id: '18-domain-reg', title: 'SLIDE 18 · Domain 5: Regulatory Authoring', component: Domain5Slide },
    { id: '19-domain-audit', title: 'SLIDE 19 · Domain 6: End-to-End Audit', component: Domain6Slide },
    // { id: '19-5a-end-to-end', title: 'SLIDE 19.5a · End-to-end in one frame', component: EndToEndSlide },
    // { id: '19-5b-concurrent-use', title: 'SLIDE 19.5b · Foundation in concurrent use', component: ConcurrentUseSlide },
    { id: '20-close-ecosystem', title: 'SLIDE 20 · Ecosystem Publication', component: CloseSlide },
    { id: '21-qa', title: 'SLIDE 21 · Q&A', component: QASlide, isTitle: true },
  ],
};

export default manifest;
