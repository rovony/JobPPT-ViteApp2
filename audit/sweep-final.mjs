/**
 * Final 35-slide sweep: screenshot every slide at 1366x768 for sign-off.
 * Output: audit/sweep-2026-04-24-final/<NN>-<id>.png
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

const OUT_DIR = join(process.cwd(), 'audit', 'sweep-2026-04-24-final');
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1366, height: 768 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (err) => errors.push(`pageerror @ ${page.url()}: ${err.message}`));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console.error @ ${page.url()}: ${msg.text()}`);
});

for (let i = 0; i < SLIDES.length; i++) {
  const id = SLIDES[i];
  const num = String(i + 1).padStart(2, '0');
  const url = `http://localhost:5173/decks/qp2-seminar/s/${id}`;
  process.stdout.write(`[${num}/${SLIDES.length}] ${id} ... `);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(4500);
    const out = join(OUT_DIR, `${num}-${id}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log('ok');
  } catch (err) {
    console.log(`FAIL: ${err.message}`);
  }
}

if (errors.length) {
  console.log('\n--- runtime errors ---');
  errors.forEach((e) => console.log(`  ${e}`));
}

await browser.close();
console.log(`\nWrote ${SLIDES.length} screenshots to ${OUT_DIR}`);
