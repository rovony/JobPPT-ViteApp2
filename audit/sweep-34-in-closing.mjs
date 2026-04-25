/**
 * Capture Slide 34 (in-closing) at 1920x1080 and 1366x768.
 * Output: audit/out/34-in-closing/<resolution>-<label>.png
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const URL = 'http://localhost:5173/decks/qp2-seminar/s/in-closing';
const OUT_DIR = join(process.cwd(), 'audit', 'out', '34-in-closing');
mkdirSync(OUT_DIR, { recursive: true });

const LABEL = process.argv[2] || 'redesign';

const VIEWPORTS = [
  { w: 1920, h: 1080, tag: '1920x1080' },
  { w: 1366, h: 768,  tag: '1366x768' },
];

const browser = await chromium.launch();
for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  process.stdout.write(`[${v.tag}] -> `);
  try {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(6500);
    const out = join(OUT_DIR, `${v.tag}-${LABEL}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log(out);
  } catch (err) {
    console.log(`FAIL: ${err.message}`);
  }
  await ctx.close();
}
await browser.close();
console.log(`\nDone — screenshots in ${OUT_DIR}`);
