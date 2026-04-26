// Probe DOM for actual box hit-rect positions on slides 11e + 12.
import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();

async function probe(slidePath, settle) {
  await page.goto(`${BASE}/decks/qp2-seminar/s/${slidePath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(settle);

  const rects = await page.evaluate(() => {
    // Find all rects with cursor: crosshair (our hit-rects)
    const all = document.querySelectorAll('rect');
    const hits = [];
    for (const el of all) {
      const cs = getComputedStyle(el);
      if (cs.cursor === 'crosshair') {
        const r = el.getBoundingClientRect();
        hits.push({
          cx: Math.round(r.x + r.width / 2),
          cy: Math.round(r.y + r.height / 2),
          w: Math.round(r.width),
          h: Math.round(r.height),
        });
      }
    }
    return hits;
  });
  console.log(`\n${slidePath} — ${rects.length} hit-rects:`);
  for (const r of rects) {
    console.log(`  center=(${r.cx},${r.cy})  size=${r.w}x${r.h}`);
  }
}

await probe('case-exposure-match', 6000);
await probe('case-exposure-response', 5000);

await ctx.close();
await browser.close();
