/**
 * Closing cluster sweep — slides 30–35 at 1920x1080 and 1366x768.
 *
 * Output layout: audit/out/closing-cluster/<slide-id>/<viewport>-<frame>.png
 *
 * For most slides we capture a single "settled" frame at t=2.0s
 * (entrance complete, animations resolved). For slide 35 (the
 * finale) we capture five timed frames + a reduced-motion fallback,
 * matching the existing sweep-35-finale.mjs schedule:
 *   t=400ms · 1200ms · 2000ms · 3000ms (echo) · 4000ms (settled)
 *   plus a reduced-motion frame at 1920x1080.
 *
 * Page errors and console errors are surfaced at end-of-run so any
 * runtime regression in the redesign shows up loudly.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'http://localhost:5173/decks/qp2-seminar/s';
const OUT_ROOT = join(process.cwd(), 'audit', 'out', 'closing-cluster');

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768',  width: 1366, height: 768  },
];

// All six closing-arc slides. For 30–34 we just capture one settled
// frame; for 35 we capture the finale animation arc.
const SLIDES = [
  { id: 'closing-divider',          settledMs: 2600 },
  { id: 'breadth-therapeutic-areas', settledMs: 3200 },
  { id: 'record-at-scale',          settledMs: 4200 },
  { id: 'leadership-principles',    settledMs: 4000 },
  { id: 'in-closing',               settledMs: 5500 },
];

const FINALE_ID = 'thank-you';
const FINALE_FRAMES = [
  { tag: 't0400', wait: 400 },
  { tag: 't1200', wait: 1200 },
  { tag: 't2000', wait: 2000 },
  { tag: 't3000-echo', wait: 3000 },
  { tag: 't4000-settled', wait: 4000 },
];

const errors = [];

const browser = await chromium.launch();

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

  for (const slide of SLIDES) {
    const dir = join(OUT_ROOT, slide.id);
    mkdirSync(dir, { recursive: true });
    const url = `${BASE}/${slide.id}`;
    process.stdout.write(`[${vp.name}] ${slide.id} settled (wait ${slide.settledMs}ms) ... `);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
      await page.waitForTimeout(slide.settledMs);
      const out = join(dir, `${vp.name}-settled.png`);
      await page.screenshot({ path: out, fullPage: false });
      console.log('ok →', out);
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      errors.push(`[${vp.name}] ${slide.id}: ${err.message}`);
    }
  }

  // Finale frames
  const finaleDir = join(OUT_ROOT, FINALE_ID);
  mkdirSync(finaleDir, { recursive: true });
  const finaleURL = `${BASE}/${FINALE_ID}`;
  for (const frame of FINALE_FRAMES) {
    process.stdout.write(`[${vp.name}] ${FINALE_ID} ${frame.tag} (wait ${frame.wait}ms) ... `);
    try {
      await page.goto(finaleURL, { waitUntil: 'networkidle', timeout: 25000 });
      await page.waitForTimeout(frame.wait);
      const out = join(finaleDir, `${vp.name}-${frame.tag}.png`);
      await page.screenshot({ path: out, fullPage: false });
      console.log('ok →', out);
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      errors.push(`[${vp.name}] ${FINALE_ID} ${frame.tag}: ${err.message}`);
    }
  }

  // Reduced-motion settled frame, only at 1920x1080
  if (vp.name === '1920x1080') {
    process.stdout.write(`[${vp.name}] ${FINALE_ID} reduced-motion ... `);
    try {
      const rmCtx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
      });
      const rmPage = await rmCtx.newPage();
      rmPage.on('pageerror', (err) => errors.push(`[${vp.name}/reduce] pageerror: ${err.message}`));
      rmPage.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(`[${vp.name}/reduce] console.error: ${msg.text()}`);
      });
      await rmPage.goto(finaleURL, { waitUntil: 'networkidle', timeout: 25000 });
      await rmPage.waitForTimeout(1500);
      const out = join(finaleDir, `${vp.name}-reduced-motion.png`);
      await rmPage.screenshot({ path: out, fullPage: false });
      console.log('ok →', out);
      await rmCtx.close();
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      errors.push(`[${vp.name}] ${FINALE_ID} reduced-motion: ${err.message}`);
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
console.log(`\nAll frames written under ${OUT_ROOT}`);
