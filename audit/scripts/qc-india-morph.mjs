#!/usr/bin/env node
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO  = path.join(__dirname, '..', '..');
const OUT   = path.join(REPO, 'audit', 'out', 'qc-sweep', 'morph-15-16');
const BASE  = 'http://localhost:5173';

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768',  width: 1366, height: 768  },
];

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    // First land on slot 15 to seed the layoutId="india-cdsco" element
    await page.goto(`${BASE}/decks/qp2-seminar/s/case2-divider`);
    await page.waitForTimeout(4000);
    // Then nav to slot 16 and capture timed frames as the India morphs
    await page.goto(`${BASE}/decks/qp2-seminar/s/case2-background`);
    for (const t of [200, 600, 1300, 1700, 2400, 3500]) {
      await page.waitForTimeout(t === 200 ? 200 : t - prevT(t));
      await page.screenshot({ path: path.join(OUT, vp.name, `morph-t${String(t).padStart(4, '0')}ms.png`) });
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}

function prevT(t) {
  const ts = [200, 600, 1300, 1700, 2400, 3500];
  const idx = ts.indexOf(t);
  return idx === 0 ? 0 : ts[idx - 1];
}
