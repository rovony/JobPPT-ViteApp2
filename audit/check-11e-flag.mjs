/**
 * Verify SubgroupFlag layout fix on slide 11e.
 * Captures baseline at 1920×1080 + 1366×768, plus measures the
 * closing band's geometry (flag bounds + divider position).
 */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const URL = 'http://localhost:5173/decks/qp2-seminar/s/case-exposure-match';
const OUT = path.resolve('audit/screens-flag-fix');
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { w: 1920, h: 1080, tag: '1920' },
  { w: 1366, h: 768, tag: '1366' },
];

const browser = await chromium.launch();

for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000); // let entrance + closing land

  await page.screenshot({ path: path.join(OUT, `11e-${v.tag}.png`), fullPage: false });

  // Probe the closing band: flag, dashed divider, deltas
  const probe = await page.evaluate(() => {
    const fmt = (el) => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };
    const flag = document.querySelector('[style*="border-left: 2px solid"]');
    const closingBand = flag?.parentElement;
    const inner = closingBand?.children[1];
    const charts = document.querySelector('[style*="grid-template-columns: 3fr 2fr"]');
    return {
      flag: flag ? fmt(flag) : null,
      band: closingBand ? fmt(closingBand) : null,
      innerStrip: inner ? fmt(inner) : null,
      charts: charts ? fmt(charts) : null,
    };
  });
  console.log(`[${v.tag}]`, JSON.stringify(probe, null, 2));
  await ctx.close();
}

await browser.close();
console.log('done · screens at', OUT);
