// Capture timed entrance frames for the CS1 conclusion arc:
//   • Slide 12 (case-exposure-response) — verify V3 strict-serial pacing and
//     the new 4-cell closing strip.
//   • Slide 13 (case-impact-numerals)   — verify the V3 convergence-diagram
//     redesign settled state.
//
// Usage: node audit/scripts/capture-12-13-cs1-conclusion.mjs

import { chromium } from 'playwright';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const URL_S12 = 'http://localhost:5173/decks/qp2-seminar/s/case-exposure-response';
const URL_S13 = 'http://localhost:5173/decks/qp2-seminar/s/case-impact-numerals';
const OUT = path.resolve('audit/out/12-13-cs1-conclusion');

// Slide 12 frames — aligned with V3 D timeline:
//   0.6s — chrome + headline arriving (no chart yet)
//   1.4s — Panel A medians actively drawing (Box 0 done at ~1.65)
//   2.4s — Panel A MedianGuide connector arriving (1.85 → 2.65), Δ pill imminent
//   3.4s — Panel A Δ pill landed (3.05); Panel B medians starting their delayed draw
//   4.6s — Panel B Δ pill landed (4.30); closing strip arriving (4.35)
//   6.0s — fully settled (footer at 4.65)
const FRAMES_S12 = [
  { label: '00-mount',     ms: 100  },
  { label: '01-t0p6',      ms: 600  },
  { label: '02-t1p4',      ms: 1400 },
  { label: '03-t2p4',      ms: 2400 },
  { label: '04-t3p4',      ms: 3400 },
  { label: '05-t4p6',      ms: 4600 },
  { label: '06-settled',   ms: 6000 },
];

// Slide 13 frames — aligned with new convergence-diagram timeline:
//   0.6s — chrome + headline arriving
//   1.5s — cards visible; horizontal axis drawing
//   2.6s — converging arms drawn; hub appearing
//   3.5s — methodology ledger arriving
//   5.0s — fully settled (verdict at 3.70, footer at 4.05)
const FRAMES_S13 = [
  { label: '00-mount',     ms: 100  },
  { label: '01-t0p6',      ms: 600  },
  { label: '02-t1p5',      ms: 1500 },
  { label: '03-t2p6',      ms: 2600 },
  { label: '04-t3p5',      ms: 3500 },
  { label: '05-settled',   ms: 5000 },
];

const VIEWPORTS = [
  { w: 1920, h: 1080, tag: '1920' },
  { w: 1366, h: 768,  tag: '1366' },
];

async function captureSlide(browser, vp, label, url, frames, prewarmUrl) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
    // Headless Chromium otherwise reports prefers-reduced-motion: reduce,
    // which makes framer-motion skip the per-element delays we are testing.
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();

  // Pre-warm on a sibling slide so navigating into the target forces a
  // clean remount and replays the entrance choreography.
  await page.goto(prewarmUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  const t0 = Date.now();
  await page.goto(url, { waitUntil: 'commit' });

  for (const f of frames) {
    const elapsed = Date.now() - t0;
    const wait = Math.max(0, f.ms - elapsed);
    if (wait > 0) await page.waitForTimeout(wait);
    const file = path.join(OUT, `${label}-${vp.tag}-${f.label}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`  ${label}  ${vp.tag}  ${f.label.padEnd(12)} → ${file}`);
  }

  await ctx.close();
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  console.log(`Capturing into ${OUT}\n`);

  for (const vp of VIEWPORTS) {
    console.log(`[${vp.w}×${vp.h}]`);
    // Slide 12 — pre-warm on slide 11 (sibling chart in same family)
    await captureSlide(
      browser, vp, 's12', URL_S12, FRAMES_S12,
      'http://localhost:5173/decks/qp2-seminar/s/case-build'
    );
    // Slide 13 — pre-warm on slide 11 so AnalysisPlot doesn't carry over
    await captureSlide(
      browser, vp, 's13', URL_S13, FRAMES_S13,
      'http://localhost:5173/decks/qp2-seminar/s/case-build'
    );
    console.log('');
  }

  await browser.close();
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
