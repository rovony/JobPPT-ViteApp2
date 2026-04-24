/**
 * Verification sweep: only the slides touched in the most recent fix pass.
 * Output: audit/sweep-2026-04-24-verify/<NN>-<id>.png
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SLIDES_TO_RECHECK = [
  { num: '06', id: 'case-background' },
  { num: '09', id: 'case-build' },
  { num: '13', id: 'case-impact-numerals' },
  { num: '15', id: 'case2-divider' },
  { num: '16', id: 'case2-background' },
  { num: '19', id: 'case2-pillar6' },
  { num: '21', id: 'case2-response' },
  { num: '22', id: 'case2-impact-bridge' },
  { num: '26', id: 'case3-fda-engagement' },
  { num: '32', id: 'record-at-scale' },
];

const OUT_DIR = join(process.cwd(), 'audit', 'sweep-2026-04-24-verify');
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

for (const { num, id } of SLIDES_TO_RECHECK) {
  const url = `http://localhost:5173/decks/qp2-seminar/s/${id}`;
  process.stdout.write(`[${num}] ${id} ... `);
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
console.log(`\nWrote ${SLIDES_TO_RECHECK.length} screenshots to ${OUT_DIR}`);
