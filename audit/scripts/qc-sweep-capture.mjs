// QC sweep capture — flexible per-slide screenshot helper.
//
// Usage:
//   node audit/scripts/qc-sweep-capture.mjs <slot> <slide-id> <round> [settleMs]
//   node audit/scripts/qc-sweep-capture.mjs 01 title 1
//   node audit/scripts/qc-sweep-capture.mjs 04 framework-themes 1 8000
//
// Captures BOTH 1920×1080 and 1366×768 settled-state screenshots
// for the given slide id into:
//   audit/out/qc-sweep/<slot>-<slide-id>/round-<N>-<vp>.png

import { chromium } from 'playwright';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const VIEWPORTS = [
  { w: 1920, h: 1080, tag: '1920' },
  { w: 1366, h: 768,  tag: '1366' },
];

// Pre-warm targets (a sibling slide that doesn't share components).
const PREWARM = {
  'title':                 'hook',
  'hook':                  'title',
  'career-arc':            'title',
  'framework-themes':      'title',
  'case-divider':          'framework-themes',
  'case-background':       'case-divider',
  'case-challenge':        'case-divider',
  'case-strategy':         'case-divider',
  'case-build':            'case-divider',
  'case-fit-pcvpc':        'case-divider',
  'case-exposure-match':   'case-divider',
  'case-exposure-response':'case-divider',
};

// Per-slide settle override. Most slides settle by 5000ms; longer
// orchestrated entrances need more time to land.
const DEFAULT_SETTLE_MS = 5000;
const SLIDE_SETTLE_MS = {
  'framework-themes':      8000,
  'case-build':            7000,
  'case-fit-pcvpc':        6500,
  'case-exposure-match':   6500,
  'case-exposure-response':7000,
};

async function captureOne(browser, vp, slideId, outFile, settleMs) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();
  const prewarmId = PREWARM[slideId] || 'title';
  const prewarmUrl = `http://localhost:5173/decks/qp2-seminar/s/${prewarmId}`;
  const targetUrl = `http://localhost:5173/decks/qp2-seminar/s/${slideId}`;

  await page.goto(prewarmUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  await page.goto(targetUrl, { waitUntil: 'commit' });
  await page.waitForTimeout(settleMs);
  await page.screenshot({ path: outFile, fullPage: false });
  await ctx.close();
  console.log(`  ${vp.tag}  → ${outFile}`);
}

async function main() {
  const [slot, slideId, round, settleArg] = process.argv.slice(2);
  if (!slot || !slideId || !round) {
    console.error('Usage: node qc-sweep-capture.mjs <slot> <slide-id> <round> [settleMs]');
    process.exit(1);
  }

  const settleMs = settleArg
    ? Number(settleArg)
    : (SLIDE_SETTLE_MS[slideId] ?? DEFAULT_SETTLE_MS);

  const dirName = `${slot}-${slideId}`;
  const outDir = path.resolve('audit/out/qc-sweep', dirName);
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch();
  console.log(`[QC] slot ${slot} · ${slideId} · round ${round} · settle ${settleMs}ms`);

  for (const vp of VIEWPORTS) {
    const outFile = path.join(outDir, `round-${round}-${vp.tag}.png`);
    await captureOne(browser, vp, slideId, outFile, settleMs);
  }

  await browser.close();
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
