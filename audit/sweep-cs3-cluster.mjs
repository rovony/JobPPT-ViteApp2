// Playwright sweep for the CS3 cluster (slides 23–29 · case3-*).
//
// Captures one settled screenshot per slide at both 1920×1080 and 1366×768
// after the entrance choreography has resolved. Files land under
// audit/out/cs3-cluster/<slide-id>/<viewport>-<label>.png.
//
// Usage:
//   node audit/sweep-cs3-cluster.mjs                  # all CS3 slides
//   node audit/sweep-cs3-cluster.mjs case3-divider    # one slide id
//   SLIDES=case3-divider,case3-fit node audit/sweep-cs3-cluster.mjs
//
// The dev server is expected at http://localhost:5173.

import { chromium } from 'playwright';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const BASE = 'http://localhost:5173/decks/qp2-seminar/s/';
const OUT_ROOT = path.resolve('audit/out/cs3-cluster');

const ALL_SLIDES = [
  'case3-divider',
  'case3-challenge',
  'case3-strategy',
  'case3-fda-engagement',
  'case3-fit',
  'case3-impact',
  'case3-bridge',
];

const VIEWPORTS = [
  { w: 1920, h: 1080, tag: '1920x1080' },
  { w: 1366, h: 768,  tag: '1366x768'  },
];

const arg = process.argv.slice(2).filter(Boolean);
const fromEnv = (process.env.SLIDES || '').split(',').map((s) => s.trim()).filter(Boolean);
const targets = (arg.length ? arg : fromEnv.length ? fromEnv : ALL_SLIDES).filter((s) => ALL_SLIDES.includes(s));
if (!targets.length) {
  console.error(`No matching slide ids. Choose from: ${ALL_SLIDES.join(', ')}`);
  process.exit(2);
}

async function captureSlide(browser, slideId) {
  const slideDir = path.join(OUT_ROOT, slideId);
  await mkdir(slideDir, { recursive: true });

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference',
    });
    const page = await ctx.newPage();
    page.on('pageerror', (err) => console.warn(`  [pageerror ${slideId} ${vp.tag}]`, err.message));

    // Pre-warm on the title slide so navigating into the target forces a
    // clean remount and lets the entrance choreography play.
    await page.goto(`${BASE}title`, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(400);

    await page.goto(`${BASE}${slideId}`, { waitUntil: 'networkidle' });
    // Allow staggered entrances + framer-layout morphs to settle.
    // Some slides (e.g. case3-fda-engagement) have payoffs at delay ≥4s.
    await page.waitForTimeout(5500);

    const file = path.join(slideDir, `${vp.tag}-settled.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`  ${slideId.padEnd(22)} ${vp.tag}  →  ${file}`);

    await ctx.close();
  }
}

(async () => {
  const browser = await chromium.launch();
  for (const slide of targets) {
    await captureSlide(browser, slide);
  }
  await browser.close();
  console.log('\nDone.');
})();
