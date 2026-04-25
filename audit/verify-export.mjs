/**
 * verify-export.mjs — drive the in-app PDF + PPTX export end-to-end.
 *
 * Boots Playwright against the live dev server, opens the qp2-seminar
 * deck, hovers the top-right menu, clicks "Export PDF", waits for the
 * download to land, then repeats for "Export PowerPoint". Counts pages /
 * slides on each artifact and rasterises the first + last PDF pages so
 * they can be eyeballed against `audit/out/deck-pdf-1920/` reference
 * frames.
 *
 * Run while `npm run dev` is up:
 *   node audit/verify-export.mjs
 *
 * Outputs:
 *   audit/out/export-verify/<deck-id>-<ts>.pdf
 *   audit/out/export-verify/<deck-id>-<ts>.pptx
 *   audit/out/export-verify/pdf-page-01.png
 *   audit/out/export-verify/pdf-page-35.png
 *   audit/out/export-verify/summary.json
 */
import { chromium } from 'playwright';
import { mkdirSync, copyFileSync, existsSync, statSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { join, basename } from 'node:path';
import { execFileSync } from 'node:child_process';

const APP_URL = process.env.APP_URL || 'http://localhost:5173';
const DECK_ID = process.env.DECK_ID || 'qp2-seminar';
const FIRST_SLIDE = process.env.FIRST_SLIDE || 'title';
// Per-export wall-clock budget: ~5.5s settle × 35 slides + assembly + iframe boot ≈ 4 min.
// 8 minutes gives comfortable headroom for a slow machine without making CI hang
// indefinitely on a real failure.
const EXPORT_TIMEOUT_MS = Number(process.env.EXPORT_TIMEOUT_MS || 8 * 60 * 1000);

const OUT_DIR = join(process.cwd(), 'audit', 'out', 'export-verify');
mkdirSync(OUT_DIR, { recursive: true });
// Wipe stale artifacts so a stale run can't masquerade as success.
for (const f of readdirSync(OUT_DIR)) {
  if (/\.(pdf|pptx|png|json|log)$/.test(f)) rmSync(join(OUT_DIR, f), { force: true });
}

const log = (...a) => console.log('[verify]', ...a);
const fail = (msg) => { console.error('[verify] FAIL:', msg); process.exitCode = 1; };

/* ───────────────────────── helpers ───────────────────────── */

function which(bin) {
  try { return execFileSync('which', [bin], { encoding: 'utf8' }).trim(); }
  catch { return null; }
}

function pdfPageCount(pdfPath) {
  const pdfinfo = which('pdfinfo');
  if (!pdfinfo) throw new Error('pdfinfo not on PATH (brew install poppler)');
  const out = execFileSync(pdfinfo, [pdfPath], { encoding: 'utf8' });
  const m = out.match(/^Pages:\s+(\d+)/m);
  if (!m) throw new Error(`pdfinfo: no "Pages:" line in output:\n${out}`);
  return Number(m[1]);
}

function rasterisePdfPage(pdfPath, pageNumber, outputPng, dpi = 96) {
  const pdftoppm = which('pdftoppm');
  if (!pdftoppm) throw new Error('pdftoppm not on PATH (brew install poppler)');
  const stem = outputPng.replace(/\.png$/, '');
  execFileSync(pdftoppm, ['-png', '-r', String(dpi), '-f', String(pageNumber), '-l', String(pageNumber), pdfPath, stem]);
  // pdftoppm appends `-NN.png` (zero-padded to digit-count of total pages).
  // Find the produced file and rename to the requested name.
  const dir = stem.includes('/') ? stem.slice(0, stem.lastIndexOf('/')) : '.';
  const stemBase = stem.includes('/') ? stem.slice(stem.lastIndexOf('/') + 1) : stem;
  const candidates = readdirSync(dir).filter((f) => f.startsWith(`${stemBase}-`) && f.endsWith('.png'));
  if (!candidates.length) throw new Error(`pdftoppm produced no output for page ${pageNumber}`);
  // The candidate matching this page should be the only one (single -f/-l).
  const produced = join(dir, candidates[0]);
  if (produced !== outputPng) {
    copyFileSync(produced, outputPng);
    rmSync(produced, { force: true });
  }
}

async function pptxSlideCount(pptxPath) {
  const { default: JSZip } = await import('jszip');
  const { readFileSync } = await import('node:fs');
  const buf = readFileSync(pptxPath);
  const zip = await JSZip.loadAsync(buf);
  const slideEntries = Object.keys(zip.files).filter((p) => /^ppt\/slides\/slide\d+\.xml$/.test(p));
  return slideEntries.length;
}

async function pptxNotesCount(pptxPath) {
  const { default: JSZip } = await import('jszip');
  const { readFileSync } = await import('node:fs');
  const buf = readFileSync(pptxPath);
  const zip = await JSZip.loadAsync(buf);
  const noteEntries = Object.keys(zip.files).filter((p) => /^ppt\/notesSlides\/notesSlide\d+\.xml$/.test(p));
  return noteEntries.length;
}

/* ───────────────────────── browser run ───────────────────────── */

async function runExport(page, kind /* 'pdf' | 'pptx' */) {
  log(`opening top-right menu, clicking ${kind.toUpperCase()}…`);

  // Open the menu by clicking the trigger. (Hover+click toggles
  // closed: hover opens, click then flips back. Click alone is enough.)
  const trigger = page.locator('button[aria-label="Settings and actions"]');
  await trigger.waitFor({ state: 'visible', timeout: 10_000 });
  await trigger.click();

  // Wait for the menu to fully render before locating items.
  await page.waitForSelector('div[role="menu"]', { state: 'visible', timeout: 5_000 });

  // Subtitle text is unique (avoids matching "Export PDF and PowerPoint").
  const item = kind === 'pdf'
    ? page.getByRole('menuitem', { name: /one page per slide/i })
    : page.getByRole('menuitem', { name: /editable \.pptx/i });
  await item.waitFor({ state: 'visible', timeout: 5_000 });

  // Subscribe to the download BEFORE the click — the dialog is created
  // synchronously inside the click handler.
  const downloadPromise = page.waitForEvent('download', { timeout: EXPORT_TIMEOUT_MS });
  await item.click();

  log(`waiting for ${kind.toUpperCase()} download (≤ ${(EXPORT_TIMEOUT_MS / 1000).toFixed(0)}s)…`);

  // Tail the in-page status line so the operator sees real progress.
  let lastStatus = '';
  const statusPoll = setInterval(async () => {
    try {
      // The progress span lives inside the menu — keep it open by hovering.
      const span = page.locator('div[role="menu"] span.deck-mono.truncate').first();
      const text = (await span.textContent({ timeout: 250 }).catch(() => '')) || '';
      if (text && text !== lastStatus) {
        lastStatus = text;
        process.stdout.write(`  ${text}\n`);
      }
    } catch { /* menu collapsed; that's fine */ }
  }, 800);

  let download;
  try {
    download = await downloadPromise;
  } finally {
    clearInterval(statusPoll);
  }

  const suggested = download.suggestedFilename();
  const dest = join(OUT_DIR, suggested || `${DECK_ID}-${kind}.${kind}`);
  await download.saveAs(dest);
  if (!existsSync(dest)) throw new Error(`download failed to save: ${dest}`);
  const size = statSync(dest).size;
  log(`${kind.toUpperCase()} saved → ${basename(dest)} (${(size / 1024 / 1024).toFixed(2)} MB)`);
  return { path: dest, sizeBytes: size };
}

/* ───────────────────────── main ───────────────────────── */

async function main() {
  const t0 = Date.now();
  const summary = {
    appUrl: APP_URL,
    deckId: DECK_ID,
    runAt: new Date().toISOString(),
  };

  log('launching chromium…');
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    acceptDownloads: true,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`console.error: ${msg.text()}`);
  });

  const target = `${APP_URL}/decks/${DECK_ID}/s/${FIRST_SLIDE}`;
  log(`navigating to ${target}`);
  await page.goto(target, { waitUntil: 'networkidle', timeout: 30_000 });
  // Let initial mount + entrance settle so the trigger is firmly in the DOM.
  await page.waitForSelector('.deck-root', { timeout: 10_000 });
  await page.waitForTimeout(1500);

  // ---------- PDF ----------
  let pdfInfo;
  try {
    pdfInfo = await runExport(page, 'pdf');
    summary.pdf = { ...pdfInfo, sizeMB: +(pdfInfo.sizeBytes / 1024 / 1024).toFixed(2) };

    const pages = pdfPageCount(pdfInfo.path);
    summary.pdf.pageCount = pages;
    log(`PDF page count: ${pages}`);
    if (pages !== 35) fail(`expected 35 PDF pages, got ${pages}`);

    rasterisePdfPage(pdfInfo.path, 1, join(OUT_DIR, 'pdf-page-01.png'));
    rasterisePdfPage(pdfInfo.path, pages, join(OUT_DIR, `pdf-page-${String(pages).padStart(2, '0')}.png`));
    log(`rasterised page 1 + ${pages} → audit/out/export-verify/`);
  } catch (err) {
    fail(`PDF export failed: ${err.message}`);
    summary.pdf = { error: err.message };
  }

  // Page may have moved on after the export — return to slide 1 for the next run.
  log('reloading deck for PPTX run…');
  await page.goto(target, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.waitForSelector('.deck-root', { timeout: 10_000 });
  await page.waitForTimeout(1500);

  // ---------- PPTX ----------
  try {
    const pptxInfo = await runExport(page, 'pptx');
    summary.pptx = { ...pptxInfo, sizeMB: +(pptxInfo.sizeBytes / 1024 / 1024).toFixed(2) };

    const slideCount = await pptxSlideCount(pptxInfo.path);
    const noteCount = await pptxNotesCount(pptxInfo.path);
    summary.pptx.slideCount = slideCount;
    summary.pptx.notesCount = noteCount;
    log(`PPTX slide count: ${slideCount}, notes pages: ${noteCount}`);
    if (slideCount !== 35) fail(`expected 35 PPTX slides, got ${slideCount}`);
    if (pptxInfo.sizeBytes > 30 * 1024 * 1024) fail(`PPTX too large: ${(pptxInfo.sizeBytes / 1024 / 1024).toFixed(1)} MB > 30 MB`);
  } catch (err) {
    fail(`PPTX export failed: ${err.message}`);
    summary.pptx = { error: err.message };
  }

  await browser.close();

  summary.consoleErrors = consoleErrors;
  summary.elapsedSec = +((Date.now() - t0) / 1000).toFixed(1);
  writeFileSync(join(OUT_DIR, 'summary.json'), JSON.stringify(summary, null, 2));

  log(`done in ${summary.elapsedSec}s — summary: audit/out/export-verify/summary.json`);
  if (consoleErrors.length) {
    console.warn(`\n[verify] ${consoleErrors.length} console error(s) during run:`);
    consoleErrors.slice(0, 20).forEach((e) => console.warn(`  ${e}`));
  }

  if (process.exitCode === 1) {
    console.error('\n[verify] one or more checks failed — see summary.json');
  } else {
    console.log('\n[verify] OK');
  }
}

main().catch((err) => {
  console.error('[verify] fatal:', err);
  process.exit(1);
});
