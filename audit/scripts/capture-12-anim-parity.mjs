// Capture timed entrance frames of slide 12 (case-exposure-response) at
// two viewports to verify the V2 (2026-04-24) serialized choreography.
//
// Usage: node audit/scripts/capture-12-anim-parity.mjs

import { chromium } from 'playwright';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const URL = 'http://localhost:5173/decks/qp2-seminar/s/case-exposure-response';
const OUT = path.resolve('audit/out/12-anim-parity');

// Frames to capture (ms after navigation starts loading slide).
// Aligned with the new D timeline:
//   0.6s — chrome + headline arriving (no chart yet)
//   1.4s — Panel A medians actively drawing (Box 0 done at ~1.65)
//   2.4s — Panel A MedianGuide connector arriving; Panel B medians starting (~1.95)
//   3.4s — Panel B medians done, MedianGuide connector arriving
//   5.5s — fully settled (closing caption + pills landed at 4.20/4.45)
const FRAMES = [
  { label: '00-mount',     ms: 100  },
  { label: '01-t0p6',      ms: 600  },
  { label: '02-t1p4',      ms: 1400 },
  { label: '03-t2p4',      ms: 2400 },
  { label: '04-t3p4',      ms: 3400 },
  { label: '05-settled',   ms: 5500 },
];

const VIEWPORTS = [
  { w: 1920, h: 1080, tag: '1920' },
  { w: 1366, h: 768,  tag: '1366' },
];

async function captureViewport(browser, vp) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
    // Headless Chromium otherwise reports prefers-reduced-motion: reduce,
    // which makes framer-motion skip the per-element delays we are testing.
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();

  // Pre-warm on slide 09 (case-build) — the prior content slide and not
  // part of the AnalysisPlot family — so navigating into slide 12 forces
  // a clean remount of the chart and replays the entrance choreography.
  await page.goto('http://localhost:5173/decks/qp2-seminar/s/case-build', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const t0 = Date.now();
  await page.goto(URL, { waitUntil: 'commit' });

  for (const f of FRAMES) {
    const elapsed = Date.now() - t0;
    const wait = Math.max(0, f.ms - elapsed);
    if (wait > 0) await page.waitForTimeout(wait);
    const file = path.join(OUT, `${vp.tag}-${f.label}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`  ${vp.tag}  ${f.label.padEnd(12)} → ${file}`);
  }

  await ctx.close();
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  console.log(`Capturing into ${OUT}`);
  for (const vp of VIEWPORTS) {
    console.log(`\n[${vp.w}×${vp.h}]`);
    await captureViewport(browser, vp);
  }
  await browser.close();
  console.log('\nDone.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
