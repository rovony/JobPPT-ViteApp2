/**
 * Capture every slide in qp2-seminar at end-of-animation as a high-res PNG.
 * Output: audit/out/deck-pdf-1920/<NN>-<id>.png
 *
 * Wait per slide is generous (6000ms) so even slow finale slides settle
 * (thank-you needs ~4000ms; case-bridge / morph slides need ~3500ms).
 *
 * Run while `npm run dev` is up (defaults to http://localhost:5173).
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

const VIEWPORT = { width: 1920, height: 1080 };
const SETTLE_MS = 6000;

const OUT_DIR = join(process.cwd(), 'audit', 'out', 'deck-pdf-1920');
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 1,
  reducedMotion: 'no-preference',
});
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
});

const t0 = Date.now();
for (let i = 0; i < SLIDES.length; i++) {
  const id = SLIDES[i];
  const num = String(i + 1).padStart(2, '0');
  const url = `http://localhost:5173/decks/qp2-seminar/s/${id}`;
  process.stdout.write(`[${num}/${SLIDES.length}] ${id} ... `);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(SETTLE_MS);
    const out = join(OUT_DIR, `${num}-${id}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log('ok');
  } catch (err) {
    console.log(`FAIL: ${err.message}`);
  }
}
const dt = ((Date.now() - t0) / 1000).toFixed(1);

if (errors.length) {
  console.log('\n--- runtime errors ---');
  errors.forEach((e) => console.log(`  ${e}`));
}

await browser.close();
console.log(`\nWrote ${SLIDES.length} screenshots to ${OUT_DIR} in ${dt}s`);
