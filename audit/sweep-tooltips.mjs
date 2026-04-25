// Verify per-box hover tooltips on slides 11e (Cmax) and 12 (BoxPanels).
// zaj-slides override (2026-04-24): tooltips are presenter-controlled
// detail-on-demand. This script hovers each box and captures the tooltip
// rendering at 1920x1080 to confirm:
//   - tooltip renders inside the panel chrome
//   - foreignObject scales correctly with viewBox
//   - hairline border, mono numerals, tabular-nums all read cleanly
//
// Usage: node audit/sweep-tooltips.mjs

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = path.resolve('audit/screens-tooltips');
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();

async function captureHover(slidePath, tag, settle, hoverPoints) {
  const url = `${BASE}/decks/qp2-seminar/s/${slidePath}`;
  console.log(`\n=== ${tag} → ${url} ===`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(settle);

  // Baseline (no hover)
  await page.mouse.move(10, 10);
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(OUT, `${tag}-00-baseline.png`) });

  for (let i = 0; i < hoverPoints.length; i++) {
    const { x, y, label } = hoverPoints[i];
    console.log(`  hover ${label} at (${x},${y})`);
    await page.mouse.move(x, y);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT, `${tag}-${String(i + 1).padStart(2, '0')}-${label}.png`) });
  }

  // Move cursor away to clear tooltip
  await page.mouse.move(10, 10);
  await page.waitForTimeout(200);
}

// Slide 11e — Cmax panel is the right ~40% of the viz region.
// Approximate box centroids (will be visually verified from screenshots).
// At 1920x1080, the right panel sits roughly at x=1100..1860, y=420..820.
// Cmax SVG uses xPct = [0.18, 0.38, 0.64, 0.84] within plot inner-width.
// Empirically (to be tuned after first capture):
// Coordinates probed via audit/probe-box-bounds.mjs at 1920x1080.
await captureHover('case-exposure-match', '11e-cmax', 6000, [
  { x: 1329, y: 627, label: 'low-adult' },
  { x: 1447, y: 604, label: 'low-peds' },
  { x: 1600, y: 485, label: 'high-adult' },
  { x: 1717, y: 428, label: 'high-peds' },
]);

await captureHover('case-exposure-response', '12-er', 5000, [
  { x: 383, y: 558, label: 'auc-noae' },
  { x: 673, y: 517, label: 'auc-relae' },
  { x: 1291, y: 527, label: 'cmax-noae' },
  { x: 1581, y: 552, label: 'cmax-relae' },
]);

await ctx.close();
await browser.close();
console.log('\ndone · screens at', OUT);
