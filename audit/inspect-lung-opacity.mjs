import { chromium } from 'playwright';

const URL = 'http://localhost:5173/decks/qp2-seminar/s/case-divider';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();

await page.goto(URL);
await page.waitForLoadState('networkidle');
await page.waitForTimeout(3500);

const before = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll('.lung-shared'));
  return els.map((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      cls: el.className,
      opacity: cs.opacity,
      transform: cs.transform.slice(0, 80),
      bbox: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    };
  });
});
console.log('BEFORE:', JSON.stringify(before, null, 2));

await page.keyboard.press('ArrowRight');

const samples = [50, 100, 200, 300, 400, 600, 900, 1200, 1500, 1800];
let elapsed = 0;
for (const t of samples) {
  await page.waitForTimeout(t - elapsed);
  elapsed = t;
  const snap = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('.lung-shared'));
    const slides = Array.from(document.querySelectorAll('[data-slide-id]'));
    return {
      slideCount: slides.length,
      slides: slides.map((el) => ({
        id: el.getAttribute('data-slide-id'),
        opacity: getComputedStyle(el).opacity,
      })),
      lungs: els.map((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        // Walk up to find the SlideTransition wrapper (motion.div with absolute inset:0).
        let p = el.parentElement;
        const ancestors = [];
        while (p && p !== document.body) {
          const pcs = getComputedStyle(p);
          if (pcs.opacity !== '1' || (pcs.position === 'absolute' && pcs.inset === '0px')) {
            ancestors.push({ tag: p.tagName, opacity: pcs.opacity, position: pcs.position });
          }
          p = p.parentElement;
        }
        return {
          cls: el.className,
          opacity: cs.opacity,
          transform: cs.transform.slice(0, 60),
          ancestors: ancestors.slice(0, 4),
          bbox: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        };
      }),
    };
  });
  console.log(`t=${t}ms`, JSON.stringify(snap));
}

await browser.close();
