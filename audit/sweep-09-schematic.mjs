// Verify Slide 09 (case-build) compartment schematic redesign
// Captures at 1920x1080 (production) and 1366x768 (laptop)

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = path.resolve('audit/screens-09-schematic');
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
  // Allow particle animations to enter steady state and chip to fade in.
  await page.waitForTimeout(2500);
  const file = path.join(OUT, `09-case-build-${vp.label}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`[${vp.label}] → ${file}`);

  // Measure the schematic panel and its inner SVG for layout sanity.
  const dims = await page.evaluate(() => {
    const svg = document.querySelector('section svg[aria-hidden]');
    const panel = svg?.closest('[style*="border-radius"]') || svg?.parentElement;
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
    };
    return { panel: r(panel), svg: r(svg) };
  });
  console.log(`[${vp.label}] dims:`, JSON.stringify(dims));
  await ctx.close();
}
await browser.close();
console.log('done');
