// Verifies the V6.9.5 closing-band layout on Slide 11e:
// SubgroupFlag should sit in the same row as the deltas + payoff,
// NOT in its own row above a dashed divider.

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const URL = 'http://localhost:5173/decks/qp2-seminar/s/case-exposure-match';
const OUT = 'audit/out/11e-flag';
mkdirSync(OUT, { recursive: true });

const VIEWS = [
  { w: 1920, h: 1080, tag: '1920' },
  { w: 1366, h: 768, tag: '1366' },
];

const browser = await chromium.launch();
for (const v of VIEWS) {
  const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4500); // let entrance complete

  await page.screenshot({ path: `${OUT}/${v.tag}-full.png`, fullPage: false });

  const probe = await page.evaluate(() => {
    // Find the SubgroupFlag by its unique inline border-left style fragment
    const flag = Array.from(document.querySelectorAll('div')).find((el) => {
      const s = el.getAttribute('style') || '';
      return s.includes('border-left') && s.includes('var(--coral)') && s.includes('padding-left');
    });
    const closing = flag?.parentElement;
    const cells = closing ? Array.from(closing.children) : [];
    return {
      flag: flag ? flag.getBoundingClientRect() : null,
      closing: closing ? {
        rect: closing.getBoundingClientRect(),
        display: getComputedStyle(closing).display,
        gridTemplateColumns: getComputedStyle(closing).gridTemplateColumns,
        childCount: cells.length,
      } : null,
      cells: cells.map((c) => ({
        rect: c.getBoundingClientRect(),
        text: c.textContent?.slice(0, 60),
      })),
    };
  });
  console.log(`\n[${v.tag}]`);
  console.log(JSON.stringify(probe, null, 2));
  await ctx.close();
}
await browser.close();
console.log('\nDone.');
