// Verify Slide 11 (case-exposure-match) entrance choreography after V6.9.3.
//
// V6.9.3 sequences the entrance like slide 10 (pcVPC):
//   1. AUC panel settles fully (median line + Δ labels) by ~2.7s
//   2. Cmax brackets draw L→R after AUC settles (~3.2s)
//   3. Closing strip lands AFTER both panels (~3.4s)
//
// This script lands on slide 11 from slide 10 (so the AnalysisPlot morph
// fires) and captures four frames of the entrance:
//   t=0.6s  — chrome only (AUC panel not started)
//   t=1.4s  — AUC mid-draw, dots cascading, Cmax should be QUIET
//   t=2.6s  — AUC nearly settled, Cmax title fading in, brackets pre-draw
//   t=3.8s  — fully settled
//
// Plus the same at 1366x768 to verify it scales clean.

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = path.resolve('audit/screens-11e-entrance');
fs.mkdirSync(OUT, { recursive: true });

const VPS = [
  { w: 1920, h: 1080, label: '1920x1080' },
  { w: 1366, h: 768, label: '1366x768' },
];

const FRAMES = [
  { ms: 600, label: 't0_6s_chrome' },
  { ms: 1400, label: 't1_4s_auc_mid' },
  { ms: 2600, label: 't2_6s_auc_settled' },
  { ms: 3800, label: 't3_8s_fully_settled' },
];

const browser = await chromium.launch();
for (const vp of VPS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  console.log(`\n[${vp.label}] landing on slide 10 first to trigger AnalysisPlot morph…`);
  await page.goto(`${BASE}/decks/qp2-seminar/s/case-fit-pcvpc`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000); // let slide 10 settle

  console.log(`[${vp.label}] navigating to slide 11 (exposure-match)…`);
  // Use the in-app navigation by pressing right-arrow so the morph fires
  // exactly the way the user sees it.
  const navStart = Date.now();
  await page.keyboard.press('ArrowRight');

  for (const frame of FRAMES) {
    const elapsed = Date.now() - navStart;
    const wait = Math.max(0, frame.ms - elapsed);
    if (wait > 0) await page.waitForTimeout(wait);
    const file = path.join(OUT, `11e-${vp.label}-${frame.label}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`[${vp.label}] @ ${frame.ms}ms → ${file}`);
  }

  await ctx.close();
}
await browser.close();
console.log('\ndone.');
