/**
 * Capture slide 05 (case-divider) static + 05 → 06 cross-slide morph
 * mid-transition at two resolutions (1920×1080 + 1366×768).
 *
 * Snapshot cadence is fine-grained (50ms / 100ms / 150ms / 200ms / 300ms /
 * 500ms / 800ms / 1100ms / 1500ms / 1800ms) so we can pinpoint exactly
 * when the lung flicker shows up during the FLIP morph.
 *
 * Run AFTER `npm run dev` is up on :5173.
 *   PREFIX=PRE node audit/scripts/capture-05-issue-trio.mjs
 *   PREFIX=POST node audit/scripts/capture-05-issue-trio.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_ROOT = join(process.cwd(), 'audit', 'out', '05-case-divider');
const TRANS_DIR = join(OUT_ROOT, 'transition-debug');
mkdirSync(TRANS_DIR, { recursive: true });

const PREFIX = process.env.PREFIX || 'POST';

const VIEWPORTS = [
  { tag: '1920x1080', width: 1920, height: 1080 },
  { tag: '1366x768',  width: 1366, height: 768  },
];

const TRANSITION_TS = [50, 100, 150, 200, 300, 500, 800, 1100, 1500, 1800];

const browser = await chromium.launch();

for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  await page.goto('http://localhost:5173/decks/qp2-seminar/s/case-divider', {
    waitUntil: 'networkidle', timeout: 20000,
  });
  await page.waitForTimeout(3500);
  await page.screenshot({
    path: join(OUT_ROOT, `${PREFIX}-${v.tag}-01-static-slide05.png`),
    fullPage: false,
  });
  console.log(`${v.tag} static slide05 ok`);

  await page.keyboard.press('ArrowRight');
  let elapsed = 0;
  for (const t of TRANSITION_TS) {
    await page.waitForTimeout(t - elapsed);
    elapsed = t;
    await page.screenshot({
      path: join(TRANS_DIR, `${PREFIX}-${v.tag}-t${String(t).padStart(4, '0')}ms.png`),
      fullPage: false,
    });
    console.log(`${v.tag} transition t=${t}ms ok`);
  }

  await page.waitForTimeout(2000);
  await page.screenshot({
    path: join(OUT_ROOT, `${PREFIX}-${v.tag}-03-static-slide06.png`),
    fullPage: false,
  });
  console.log(`${v.tag} settled-slide06 ok`);

  await ctx.close();
}

await browser.close();
console.log(`done — ${OUT_ROOT}`);
