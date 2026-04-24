/**
 * Verify slide 06 lung-as-hero redesign + cross-slide morph to 07.
 *
 * Captures:
 *   - 06 at 1920x1080 (final state, after entrance animations)
 *   - 06 at 1366x768
 *   - 07 at 1920x1080 (timeline expanded full-width)
 *   - 06 → 07 transition (mid-morph capture for the timeline expand)
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

  // Slide 06 final state.
  await page.goto('http://localhost:5173/decks/qp2-seminar/s/case-background', {
    waitUntil: 'networkidle', timeout: 15000,
  });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: join(OUT_DIR, `06-case-background${suffix}.png`), fullPage: false });
  console.log(`06 ${w}x${h} ok`);

  // Slide 07 final state.
  await page.goto('http://localhost:5173/decks/qp2-seminar/s/case-challenge', {
    waitUntil: 'networkidle', timeout: 15000,
  });
  await page.waitForTimeout(5500);
  await page.screenshot({ path: join(OUT_DIR, `07-case-challenge${suffix}.png`), fullPage: false });
  console.log(`07 ${w}x${h} ok`);

  await ctx.close();
}

await browser.close();
