/**
 * Capture the 06 → 07 cross-slide morph mid-transition.
 *
 * Loads slide 06, waits for entrance, then triggers forward navigation
 * via the keyboard ('ArrowRight' or 'PageDown' depending on the deck's
 * key bindings) and snapshots at 0.4s and 1.0s into the morph to prove
 * the timeline bbox is in flight.
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

await page.goto('http://localhost:5173/decks/qp2-seminar/s/case-background', {
  waitUntil: 'networkidle', timeout: 15000,
});
await page.waitForTimeout(5000); // wait for entrance to finish

// Trigger forward nav. Try common key bindings.
await page.keyboard.press('ArrowRight');

// Snapshot at 200ms / 600ms / 1000ms / 1600ms into the transition
for (const t of [200, 600, 1000, 1600]) {
  await page.waitForTimeout(t === 200 ? 200 : 400);
  await page.screenshot({ path: join(OUT_DIR, `06-to-07-morph-t${t}.png`), fullPage: false });
  console.log(`morph t=${t}ms ok`);
}

await browser.close();
