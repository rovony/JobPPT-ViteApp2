import Slide01 from './slides/01-title';
import Slide02 from './slides/02-problem';
import Slide03 from './slides/03-stats';
import Slide04 from './slides/04-pillars';
import Slide05 from './slides/05-demo';
import Slide06 from './slides/06-roadmap';
import Slide07 from './slides/07-closing';

const manifest = {
  id: 'launch-keynote',
  title: 'Quietly, the product got smarter',
  subtitle: 'Product Launch Keynote · 2026',
  theme: 'keynote-noir',
  slides: [
    { id: 'title', title: 'Opening', component: Slide01 },
    { id: 'problem', title: 'The before picture', component: Slide02 },
    { id: 'stats', title: 'What we heard', component: Slide03 },
    { id: 'pillars', title: 'Three rewrites', component: Slide04 },
    { id: 'demo', title: 'Live moment', component: Slide05 },
    { id: 'roadmap', title: 'Next four quarters', component: Slide06 },
    { id: 'closing', title: 'Close', component: Slide07 },
  ],
};

export default manifest;