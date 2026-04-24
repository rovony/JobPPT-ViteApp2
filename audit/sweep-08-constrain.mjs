// Verify the redesigned ConstrainViz on Slide 08 at production 1920x1080.
// Captures static frame (after fan animation completes) and a mid-fan
// frame so we can confirm the X panel reads as a wobbling slope fan.

import { chromium } from 'playwright';
import path from 'node:path';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:5173';
const OUT = path.resolve('audit/sweep-08-constrain');
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '1920x1080', w: 1920, h: 1080 },
  { name: '1366x768',  w: 1366, h: 768  },
];

const SHOTS = [
  { ms: 200,  tag: 'fan-start' },   // mid-fan-draw
  { ms: 1800, tag: 'fan-done' },    // all 7 lines drawn, ✗ panel set
  { ms: 5000, tag: 'final' },       // bottom panel sprites done
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
      // Reload between shots so we always capture from t=0 + ms.
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
