/**
 * Capture slide 05 (case-divider) static + 05 → 06 cross-slide morph
 * mid-transition at two resolutions (1920×1080 + 1366×768).
 *
 * Run AFTER `npm run dev` is up on :5173.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = join(process.cwd(), 'audit', 'out', '05-case-divider');
mkdirSync(OUT_DIR, { recursive: true });

const PREFIX = process.env.SWEEP_PREFIX || 'POST';

const VIEWPORTS = [
  { tag: '1920x1080', width: 1920, height: 1080 },
  { tag: '1366x768',  width: 1366, height: 768  },
];

const browser = await chromium.launch();

for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  await page.goto('http://localhost:5173/decks/qp2-seminar/s/case-divider', {
    waitUntil: 'networkidle', timeout: 15000,
  });
  // Static frame: wait for entrance + lung breathe to settle.
  await page.waitForTimeout(3500);
  await page.screenshot({
    path: join(OUT_DIR, `${PREFIX}-${v.tag}-01-static-slide05.png`),
    fullPage: false,
  });
  console.log(`${v.tag} static ok`);

  // Trigger forward nav into slide 06.
  await page.keyboard.press('ArrowRight');

  // Snapshot mid-transition: ~200ms, ~500ms, ~1100ms, ~1800ms into the
  // 1.8s lung layout morph + 0.4s slide fade.
  const ts = [200, 500, 1100, 1800];
  let elapsed = 0;
  for (const t of ts) {
    await page.waitForTimeout(t - elapsed);
    elapsed = t;
    await page.screenshot({
      path: join(OUT_DIR, `${PREFIX}-${v.tag}-02-transition-t${String(t).padStart(4, '0')}ms.png`),
      fullPage: false,
    });
    console.log(`${v.tag} transition t=${t}ms ok`);
  }

  // Final settled state on slide 06.
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: join(OUT_DIR, `${PREFIX}-${v.tag}-03-static-slide06.png`),
    fullPage: false,
  });
  console.log(`${v.tag} settled-slide06 ok`);

  await ctx.close();
}

await browser.close();
console.log(`done — ${OUT_DIR}`);
