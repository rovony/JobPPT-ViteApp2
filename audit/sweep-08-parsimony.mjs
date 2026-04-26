// Verify the redesigned ParsimonyViz on Slide 08 at production 1920x1080.
// Captures (a) curve mid-draw, (b) curve done + chips mid-stamp, (c) final.

import { chromium } from 'playwright';
import path from 'node:path';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:5173';
const OUT = path.resolve('audit/sweep-08-parsimony');
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '1920x1080', w: 1920, h: 1080 },
  { name: '1366x768',  w: 1366, h: 768  },
];

const SHOTS = [
  { ms: 600,  tag: 'curve-mid' },     // FWER curve mid-draw
  { ms: 2000, tag: 'curve-done' },    // curve done, chips mid-stamp
  { ms: 5000, tag: 'final' },         // all chips X'd
];

(async () => {
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await ctx.newPage();
    page.on('pageerror', err => console.error(`[${vp.name}] pageerror:`, err.message));
    await page.goto(`${BASE}/decks/qp2-seminar/s/case-strategy`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.deck-root', { timeout: 5000 });

    for (const shot of SHOTS) {
      await page.waitForTimeout(shot.ms);
      const out = path.join(OUT, `${vp.name}-${shot.tag}.png`);
      await page.screenshot({ path: out, fullPage: false });
      console.log(`  → ${out}`);
      if (shot !== SHOTS[SHOTS.length - 1]) {
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForSelector('.deck-root', { timeout: 5000 });
      }
    }
    await ctx.close();
  }
  await browser.close();
  console.log('done');
})();
