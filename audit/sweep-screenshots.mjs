/**
 * Visual sweep: screenshot every slide at 1366x768 for triage.
 *
 * Usage: node audit/sweep-screenshots.mjs
 * Output: audit/sweep-2026-04-24/<NN>-<id>.png
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SLIDES = [
  'title',
  'hook',
  'career-arc',
  'framework-themes',
  'case-divider',
  'case-background',
  'case-challenge',
  'case-strategy',
  'case-build',
  'case-fit-pcvpc',
  'case-exposure-match',
  'case-exposure-response',
  'case-impact-numerals',
  'case-bridge',
  'case2-divider',
  'case2-background',
  'case2-challenge-turn',
  'case2-strategy',
  'case2-pillar6',
  'case2-pillars-1-5',
  'case2-response',
  'case2-impact-bridge',
  'case3-divider',
  'case3-challenge',
  'case3-strategy',
  'case3-fda-engagement',
  'case3-fit',
  'case3-impact',
  'case3-bridge',
  'closing-divider',
  'breadth-therapeutic-areas',
  'record-at-scale',
  'leadership-principles',
  'in-closing',
  'thank-you',
];

const OUT_DIR = join(process.cwd(), 'audit', 'sweep-2026-04-24');
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1366, height: 768 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

// Surface console errors per slide so we can correlate visual bugs with runtime warnings.
const consoleErrors = new Map();
page.on('pageerror', (err) => {
  const url = page.url();
  const list = consoleErrors.get(url) ?? [];
  list.push(`pageerror: ${err.message}`);
  consoleErrors.set(url, list);
});
page.on('console', (msg) => {
  if (msg.type() !== 'error' && msg.type() !== 'warning') return;
  const url = page.url();
  const list = consoleErrors.get(url) ?? [];
  list.push(`${msg.type()}: ${msg.text()}`);
  consoleErrors.set(url, list);
});

for (let i = 0; i < SLIDES.length; i++) {
  const id = SLIDES[i];
  const num = String(i + 1).padStart(2, '0');
  const url = `http://localhost:5173/decks/qp2-seminar/s/${id}`;
  process.stdout.write(`[${num}/${SLIDES.length}] ${id} ... `);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    // Give Framer Motion entrance animations + SVG draw animations time to settle.
    // Most slide entrance choreographies finish within ~3-4s. Stay generous for
    // the long timelines (slides 02, 21) and SVG path draw-ins (slides 15, 18-20).
    await page.waitForTimeout(4500);
    const out = join(OUT_DIR, `${num}-${id}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log('ok');
  } catch (err) {
    console.log(`FAIL: ${err.message}`);
  }
}

console.log('\n--- Console errors / warnings per URL ---');
for (const [url, list] of consoleErrors.entries()) {
  console.log(`\n${url}`);
  list.forEach((m) => console.log(`  ${m}`));
}

await browser.close();
console.log(`\nWrote ${SLIDES.length} screenshots to ${OUT_DIR}`);
