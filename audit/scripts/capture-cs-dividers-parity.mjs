/**
 * Capture all three case-divider slides (5 / 14 / 23) at 1920×1080 +
 * 1366×768 to verify the CaseHeroDivider redesign holds for every
 * consumer of the shared component:
 *   slot 5  · Ambrisentan · coral  · LungsShared    · 3 meta + verdict (4 cells)
 *   slot 14 · Ivosidenib  · cyan   · IndiaSeed      · 3 meta + verdict (4 cells)
 *   slot 23 · Calaspargase · violet · LymphocyteHero · 4 meta + verdict (5 cells)
 *
 * Run AFTER `npm run dev` is up on :5173.
 *   PREFIX=POST-redesign node audit/scripts/capture-cs-dividers-parity.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_ROOT = join(process.cwd(), 'audit', 'out', '05-case-divider', 'parity');
mkdirSync(OUT_ROOT, { recursive: true });

const PREFIX = process.env.PREFIX || 'POST-redesign';

const VIEWPORTS = [
  { tag: '1920x1080', width: 1920, height: 1080 },
  { tag: '1366x768',  width: 1366, height: 768  },
];

const SLIDES = [
  { tag: 'cs1-coral-slide05',  url: 'http://localhost:5173/decks/qp2-seminar/s/case-divider'  },
  { tag: 'cs2-cyan-slide14',   url: 'http://localhost:5173/decks/qp2-seminar/s/case2-divider' },
  { tag: 'cs3-violet-slide23', url: 'http://localhost:5173/decks/qp2-seminar/s/case3-divider' },
];

const browser = await chromium.launch();

for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const s of SLIDES) {
    await page.goto(s.url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(3500);
    const out = join(OUT_ROOT, `${PREFIX}-${v.tag}-${s.tag}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`${v.tag} · ${s.tag} ok`);
  }

  await ctx.close();
}

await browser.close();
console.log(`done — ${OUT_ROOT}`);
