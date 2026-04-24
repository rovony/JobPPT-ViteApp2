/**
 * Verify slide 02 hook fix.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = join(process.cwd(), 'audit', 'sweep-2026-04-24-1080');
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

const url = `http://localhost:5173/decks/qp2-seminar/s/hook`;
await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(6500);
await page.screenshot({ path: join(OUT_DIR, '02-hook.png'), fullPage: false });
console.log('02 hook ok');

const ctx2 = await browser.newContext({
  viewport: { width: 1366, height: 768 },
  deviceScaleFactor: 1,
});
const page2 = await ctx2.newPage();
await page2.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
await page2.waitForTimeout(6500);
await page2.screenshot({ path: join(OUT_DIR, '02-hook-1366.png'), fullPage: false });
console.log('02 hook 1366 ok');

await browser.close();
