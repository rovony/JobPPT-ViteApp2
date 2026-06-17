/**
 * Capture each slide as PNG (Playwright) then merge to PDF (Python/Pillow).
 *
 * Run while `npm run dev` is up on :5173.
 *
 *   DECK_ID=qp2-seminar-v3-R2 node audit/capture-and-build-pdf.mjs
 *   DECK_IDS=qp2-seminar-v3-R2,v5-ultragenyx node audit/capture-and-build-pdf.mjs
 *   DECK_ID=qp2-seminar SLIDE_IDS=case3-divider,case3-challenge,... OUTPUT_NAME=asparlas-section node audit/capture-and-build-pdf.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const APP_URL = process.env.APP_URL || 'http://localhost:5173';
const DECK_IDS = (process.env.DECK_IDS || process.env.DECK_ID || 'qp2-seminar-v3-R2,v5-ultragenyx')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const SLIDE_IDS = process.env.SLIDE_IDS
  ? process.env.SLIDE_IDS.split(',').map((s) => s.trim()).filter(Boolean)
  : null;
const SLIDE_PREFIX = process.env.SLIDE_PREFIX || null;
const OUTPUT_NAME = process.env.OUTPUT_NAME || null;
const SETTLE_MS = Number(process.env.SETTLE_MS || 3500);
const VIEWPORT = { width: 1920, height: 1080 };

function slideIdsFromManifest(deckId) {
  const path = join(process.cwd(), 'src', 'decks', deckId, 'manifest.ts');
  const src = readFileSync(path, 'utf8');
  const slidesStart = src.indexOf('slides: [');
  if (slidesStart < 0) throw new Error(`slides: [ not found in ${path}`);
  const slidesBlock = src.slice(slidesStart);
  const ids = [];
  const re = /\{\s*id:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(slidesBlock))) ids.push(m[1]);
  if (!ids.length) throw new Error(`No slide ids parsed from ${path}`);
  return ids;
}

function resolveSlides(deckId) {
  const all = slideIdsFromManifest(deckId);
  if (SLIDE_IDS?.length) {
    const missing = SLIDE_IDS.filter((id) => !all.includes(id));
    if (missing.length) throw new Error(`Unknown slide ids for ${deckId}: ${missing.join(', ')}`);
    return SLIDE_IDS;
  }
  if (SLIDE_PREFIX) return all.filter((id) => id.startsWith(SLIDE_PREFIX));
  return all;
}

async function captureDeck(browser, deckId) {
  const slides = resolveSlides(deckId);
  const captureKey = OUTPUT_NAME || ((SLIDE_IDS || SLIDE_PREFIX) ? `${deckId}-section` : deckId);
  const outDir = join(process.cwd(), 'audit', 'out', 'slide-captures', captureKey);
  mkdirSync(outDir, { recursive: true });

  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();
  page.on('pageerror', (err) => console.warn(`  [pageerror] ${deckId}: ${err.message}`));

  console.log(`[capture] ${deckId} — ${slides.length} slides → ${outDir}`);
  const t0 = Date.now();

  for (let i = 0; i < slides.length; i++) {
    const id = slides[i];
    const num = String(i + 1).padStart(2, '0');
    const url = `${APP_URL}/decks/${deckId}/s/${id}`;
    process.stdout.write(`  [${num}/${slides.length}] ${id} … `);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      await page.waitForSelector('.deck-root', { timeout: 20_000 });
      await page.waitForTimeout(SETTLE_MS);
      await page.screenshot({ path: join(outDir, `${num}-${id}.png`), fullPage: false });
      console.log('ok');
    } catch (err) {
      console.log(`FAIL (${err.message})`);
    }
  }

  await ctx.close();
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[capture] ${deckId} done in ${dt}s`);
  return { outDir, slideCount: slides.length, captureKey };
}

function buildPdf(captureKey, pngDir) {
  const outPdf = join(process.cwd(), 'audit', 'out', 'pdf-exports', `${captureKey}.pdf`);
  mkdirSync(join(process.cwd(), 'audit', 'out', 'pdf-exports'), { recursive: true });
  execFileSync('python3', [
    join(process.cwd(), 'audit', 'build-deck-pdf-from-dir.py'),
    pngDir,
    outPdf,
  ], { stdio: 'inherit' });
  const sizeMB = (statSync(outPdf).size / 1024 / 1024).toFixed(2);
  console.log(`[pdf] ${outPdf} (${sizeMB} MB)`);
  return outPdf;
}

async function main() {
  const browser = await chromium.launch({
    args: ['--disable-dev-shm-usage', '--no-sandbox'],
  });

  for (const deckId of DECK_IDS) {
    const { outDir, captureKey } = await captureDeck(browser, deckId);
    buildPdf(captureKey, outDir);
  }

  await browser.close();
  console.log('\nAll PDFs → audit/out/pdf-exports/');
}

main().catch((err) => {
  console.error('[capture] fatal:', err);
  process.exit(1);
});
