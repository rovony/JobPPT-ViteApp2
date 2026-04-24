/**
 * Verify slide 04 framework-themes subhead size.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = join(process.cwd(), 'audit', 'sweep-2026-04-24-1080');
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();

for (const [w, h, suffix] of [[1920, 1080, ''], [1366, 768, '-1366']]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/decks/qp2-seminar/s/framework-themes', {
    waitUntil: 'networkidle', timeout: 15000,
  });
  await page.waitForTimeout(7500);
  await page.screenshot({ path: join(OUT_DIR, `04-framework-themes${suffix}.png`), fullPage: false });
  console.log(`04 framework-themes ${w}x${h} ok`);
  await ctx.close();
}

await browser.close();
