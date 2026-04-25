/**
 * Slide 35 finale sweep — capture timed frames at 1920x1080 and 1366x768.
 * Output: audit/out/35-thank-you/<viewport>-<frame>.png
 *
 * Frames captured:
 *   t=0.4s  → halos blooming, edges starting to draw
 *   t=1.2s  → graph mostly drawn, center pulse igniting
 *   t=2.0s  → "Thank you." landed, amber rule drawing
 *   t=4.0s  → fully settled finale (final frame)
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const URL = 'http://localhost:5173/decks/qp2-seminar/s/thank-you';
const OUT_DIR = join(process.cwd(), 'audit', 'out', '35-thank-you');
mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768',  width: 1366, height: 768  },
];

const FRAMES_MS = [
  { tag: 't0400', wait: 400 },
  { tag: 't1200', wait: 1200 },
  { tag: 't2000', wait: 2000 },
  { tag: 't3000-echo', wait: 3000 },
  { tag: 't4000-settled', wait: 4000 },
];

const browser = await chromium.launch();

const errors = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();
  page.on('pageerror', (err) => errors.push(`[${vp.name}] pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${vp.name}] console.error: ${msg.text()}`);
  });

  for (const frame of FRAMES_MS) {
    process.stdout.write(`[${vp.name}] frame ${frame.tag} (wait ${frame.wait}ms) ... `);
    try {
      // Fresh navigation per frame so the entrance timeline starts at 0.
      await page.goto(URL, { waitUntil: 'networkidle', timeout: 20000 });
      // networkidle resolves before motion begins; mount fonts + raf settle
      await page.waitForTimeout(frame.wait);
      const out = join(OUT_DIR, `${vp.name}-${frame.tag}.png`);
      await page.screenshot({ path: out, fullPage: false });
      console.log('ok →', out);
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      errors.push(`[${vp.name}] ${frame.tag}: ${err.message}`);
    }
  }

  // Bonus: reduced-motion settled frame, only at 1920x1080
  if (vp.name === '1920x1080') {
    process.stdout.write(`[${vp.name}] reduced-motion settled ... `);
    try {
      const rmCtx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
      });
      const rmPage = await rmCtx.newPage();
      await rmPage.goto(URL, { waitUntil: 'networkidle', timeout: 20000 });
      await rmPage.waitForTimeout(1500);
      const out = join(OUT_DIR, `${vp.name}-reduced-motion.png`);
      await rmPage.screenshot({ path: out, fullPage: false });
      console.log('ok →', out);
      await rmCtx.close();
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      errors.push(`[${vp.name}] reduced-motion: ${err.message}`);
    }
  }

  await ctx.close();
}

await browser.close();

if (errors.length) {
  console.log('\n--- runtime errors ---');
  errors.forEach((e) => console.log(`  ${e}`));
  process.exit(1);
}
console.log(`\nAll frames written to ${OUT_DIR}`);
