/**
 * Targeted re-verify at 1920×1080 production canvas (the design target).
 * Output: audit/sweep-2026-04-24-1080/<NN>-<id>.png
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SLIDES = [
  ['07', 'case-challenge'],
  ['14', 'case-bridge'],
  ['21', 'case2-response'],
  ['29', 'case3-bridge'],
];

const OUT_DIR = join(process.cwd(), 'audit', 'sweep-2026-04-24-1080');
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

for (const [num, id] of SLIDES) {
  const url = `http://localhost:5173/decks/qp2-seminar/s/${id}`;
  process.stdout.write(`[${num}] ${id} ... `);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(5500);
    const out = join(OUT_DIR, `${num}-${id}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log('ok');
  } catch (err) {
    console.log(`FAIL: ${err.message}`);
  }
}

await browser.close();
console.log(`\nWrote ${SLIDES.length} screenshots to ${OUT_DIR}`);
