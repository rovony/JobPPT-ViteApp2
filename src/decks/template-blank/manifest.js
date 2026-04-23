import Slide01 from './slides/01-title';
import Slide02 from './slides/02-section';
import Slide03 from './slides/03-closing';

const manifest = {
  id: 'template-blank',
  title: 'Blank template',
  subtitle: 'Starter deck — duplicate and customize',
  theme: 'light-editorial',
  themeMode: 'light',
  slides: [
    { id: 'title', title: 'Title', component: Slide01 },
    { id: 'section', title: 'Section', component: Slide02 },
    { id: 'closing', title: 'Closing', component: Slide03 },
  ],
};

export default manifest;