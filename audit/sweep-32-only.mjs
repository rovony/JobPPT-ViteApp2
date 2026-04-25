import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const URL = 'http://localhost:5173/decks/qp2-seminar/s/record-at-scale';
const OUT_DIR = join(process.cwd(), 'audit', 'out', 'closing-cluster', 'record-at-scale');
mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768',  width: 1366, height: 768  },
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 25000 });
  await page.waitForTimeout(4200);
  const out = join(OUT_DIR, `${vp.name}-settled.png`);
  await page.screenshot({ path: out, fullPage: false });
  console.log('ok →', out);
  await ctx.close();
}
await browser.close();
