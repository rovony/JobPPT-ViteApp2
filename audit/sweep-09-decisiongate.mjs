// Verify Slide 09 (case-build) DecisionGate card wrapper + arrow alignment.
// Captures at 1920x1080 (production) and 1366x768 (laptop fallback).

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = path.resolve('audit/screens-09-decisiongate');
fs.mkdirSync(OUT, { recursive: true });

const VPS = [
  { w: 1920, h: 1080, label: '1920x1080' },
  { w: 1366, h: 768, label: '1366x768' },
];

const browser = await chromium.launch();
for (const vp of VPS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  console.log(`[${vp.label}] navigating…`);
  await page.goto(`${BASE}/decks/qp2-seminar/s/case-build`, { waitUntil: 'networkidle' });
  // Wait for the decision gate entrance + 2 particle passes (~14s) to settle.
  await page.waitForTimeout(15000);
  const file = path.join(OUT, `09-case-build-${vp.label}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`[${vp.label}] → ${file}`);

  // Measure the workflow card + DecisionGate + Viz cell so we can
  // confirm (a) the card matches the schematic panel visually and
  // (b) the gate is actually inside the card with no overflow.
  const dims = await page.evaluate(() => {
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
    };
    // The DecisionGate is a div whose inline style starts with width: 100% and contains an aria-label svg.
    const gateSvg = document.querySelector('svg[aria-label*="workflow flowchart"]');
    const gate = gateSvg?.parentElement || null;
    // Workflow card is the closest ancestor with a border-radius style.
    const card = gate?.closest('[style*="border-radius"]') || null;
    // Viz cell — look for the SlideGrid viz area
    const slideRoot = document.querySelector('section');
    return {
      gate: r(gate),
      card: r(card),
      svg: r(gateSvg),
      window: { w: window.innerWidth, h: window.innerHeight },
    };
  });
  console.log(`[${vp.label}] dims:`, JSON.stringify(dims, null, 2));
  await ctx.close();
}
await browser.close();
console.log('done');
