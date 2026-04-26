// Verify hairline panel application across the 5 chart slides modified
// 2026-04-24 (zaj-slides v2.1 — adjacent peer data containers).
//
// Captures full-page screenshots at 1920x1080 and 1366x768 plus
// per-panel bounding-box measurements so we can confirm:
//   1. The hairline is visible (1px stroke @ ~14% opacity vs the bg).
//   2. No chart overflows its panel at the smaller viewport.
//   3. The two peer panels on slides 11/12 are sized symmetrically.

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = path.resolve('audit/screens-hairlines');
fs.mkdirSync(OUT, { recursive: true });

const SLIDES = [
  { id: 'case-fit-pcvpc',          tag: '10-pcvpc',         settle: 5000 },
  { id: 'case-exposure-match',     tag: '11e-exposure',     settle: 6000 },
  { id: 'case-exposure-response',  tag: '12-er',            settle: 5000 },
  { id: 'case3-fda-engagement',    tag: '26-fda',           settle: 5000 },
  { id: 'case3-fit',               tag: '27-rse',           settle: 5000 },
];

const VPS = [
  { w: 1920, h: 1080, label: '1920x1080' },
  { w: 1366, h: 768,  label: '1366x768' },
];

const browser = await chromium.launch();
const summary = {};

for (const vp of VPS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  for (const s of SLIDES) {
    const url = `${BASE}/decks/qp2-seminar/s/${s.id}`;
    console.log(`[${vp.label}] ${s.tag} → ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(s.settle);

    const file = path.join(OUT, `${s.tag}-${vp.label}.png`);
    await page.screenshot({ path: file, fullPage: false });

    // Measure all elements inside the Viz area that have a 1px hairline border.
    // We inspect computedStyle.border-color to confirm the cream-hairline token resolved.
    const measurements = await page.evaluate(() => {
      const viz = document.querySelector('section');
      if (!viz) return null;
      const all = viz.querySelectorAll('*');
      const panels = [];
      for (const el of all) {
        const cs = getComputedStyle(el);
        // Filter for elements whose border-top-width is 1px AND a non-transparent border-color.
        if (cs.borderTopWidth === '1px' && cs.borderTopStyle === 'solid') {
          const bc = cs.borderTopColor;
          // Look for cream-hairline-ish (rgba with low alpha)
          if (/rgba?\(.*0\.1\d|rgba?\(.*0\.2\d/.test(bc)) {
            const r = el.getBoundingClientRect();
            panels.push({
              tag: el.tagName.toLowerCase(),
              w: Math.round(r.width),
              h: Math.round(r.height),
              x: Math.round(r.x),
              y: Math.round(r.y),
              borderColor: bc,
              borderRadius: cs.borderRadius,
            });
          }
        }
      }
      return { count: panels.length, panels: panels.slice(0, 8) };
    });

    summary[`${s.tag}-${vp.label}`] = measurements;
    console.log(`  panels: ${measurements?.count ?? 'n/a'}`);
    if (measurements?.panels?.length) {
      for (const p of measurements.panels) {
        const flat = p.borderRadius === '0px' ? 'square' : `radius=${p.borderRadius}`;
        console.log(`    ${p.tag} ${p.w}×${p.h} @${p.x},${p.y} ${flat} ${p.borderColor}`);
      }
    }
  }
  await ctx.close();
}
await browser.close();

fs.writeFileSync(
  path.join(OUT, 'summary.json'),
  JSON.stringify(summary, null, 2),
);
console.log('done · summary written to', path.join(OUT, 'summary.json'));
