/**
 * Capture every slide in qp2-seminar-v2 (V4) as PNG.
 * Run while `npm run dev` is up (localhost:5173).
 * Output: audit/out/v4-deck-1920/<NN>-<id>.png
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
  'case-precedents',
  'case-strategy',
  'case-trial-design',
  'case-build',
  'case-fit-bridge',
  'case-exposure-response',
  'case-geography',
  'case-impact-numerals',
  'case-bridge',
  'case-recap',
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
  'case4-divider',
  'case4-setup',
  'case4-problem',
  'case4-architecture',
  'case4-privacy-audit',
  'case4-workflow',
  'case4-bridge',
  'closing-divider',
  'breadth-therapeutic-areas',
  'record-at-scale',
  'leadership-principles',
  'in-closing',
  'thank-you',
];

const SETTLE_OVERRIDES = {
  'hook': 4800, 'career-arc': 4000, 'framework-themes': 3000,
  'case-divider': 1500, 'case-challenge': 3500, 'case-precedents': 3000,
  'case-trial-design': 3200, 'case-fit-bridge': 4400, 'case-bridge': 5200,
  'case-recap': 2800, 'case-geography': 3000, 'case2-divider': 1500,
  'case2-response': 3600, 'case2-impact-bridge': 5200, 'case3-divider': 1500,
  'case3-strategy': 3200, 'case3-bridge': 5200, 'case4-divider': 1500,
  'closing-divider': 1600, 'record-at-scale': 4000, 'in-closing': 4000,
  'thank-you': 5800,
};
const DEFAULT_SETTLE_MS = 2400;
const VIEWPORT = { width: 1920, height: 1080 };
const DECK_ID = 'qp2-seminar-v2';

const OUT_DIR = new URL('../out/v4-deck-1920/', import.meta.url).pathname;
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));

const t0 = Date.now();
for (let i = 0; i < SLIDES.length; i++) {
  const id = SLIDES[i];
  const num = String(i + 1).padStart(2, '0');
  const settleMs = SETTLE_OVERRIDES[id] ?? DEFAULT_SETTLE_MS;
  const url = `http://localhost:5173/decks/${DECK_ID}/s/${id}`;
  process.stdout.write(`[${num}/${SLIDES.length}] ${id} (${settleMs}ms) ... `);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(settleMs);
    await page.screenshot({ path: join(OUT_DIR, `${num}-${id}.png`), fullPage: false });
    console.log('ok');
  } catch (err) {
    console.log(`FAIL: ${err.message}`);
  }
}

await browser.close();
const dt = ((Date.now() - t0) / 1000).toFixed(1);
if (errors.length) errors.forEach(e => console.log(e));
console.log(`\nDone: ${SLIDES.length} slides in ${dt}s → ${OUT_DIR}`);
