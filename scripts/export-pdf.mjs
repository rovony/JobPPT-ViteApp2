/**
 * export-pdf.mjs — Playwright-based PDF export of the v3-R2 deck.
 *
 * Captures each slide at 1920×1080 after waiting for animations to
 * settle, then assembles a multi-page PDF via jsPDF.
 *
 * Usage:
 *   node scripts/export-pdf.mjs [--up-to <slideId>] [--base-url <url>]
 *
 * Defaults:
 *   --up-to closing-thanks   (excludes backup slides)
 *   --base-url http://localhost:5173
 */

import { chromium } from 'playwright';
import { jsPDF } from 'jspdf';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SLIDE_W = 1920;
const SLIDE_H = 1080;
const PDF_PT_W = 1440;
const PDF_PT_H = 810;

const DECK_ID = 'qp2-seminar-v3-R2';

const SLIDES = [
  { id: 'title', settleMs: 2200 },
  { id: 'hook-A-trial-not-answer', settleMs: 57000 },
  { id: 'career-arc', settleMs: 3200 },
  { id: 'roadmap', settleMs: 2600 },
  { id: 'cs1-divider', settleMs: 1700 },
  { id: 'cs1-question', settleMs: 1600 },
  { id: 'cs1-context', settleMs: 1800 },
  { id: 'cs1-mechanism', settleMs: 2000 },
  { id: 'cs1-history', settleMs: 2400 },
  { id: 'cs1-trial', settleMs: 2600 },
  { id: 'cs1-architecture', settleMs: 2200 },
  { id: 'cs1-poppk', settleMs: 1300 },
  { id: 'cs1-results', settleMs: 2600 },
  { id: 'cs1-outcome', settleMs: 2400 },
  { id: 'cs1-bracket', settleMs: 3000 },
  { id: 'cs1-verdict', settleMs: 2600 },
  { id: 'cs1-lesson', settleMs: 2200 },
  { id: 'cs1-bridge', settleMs: 5200 },
  { id: 'cs2-divider', settleMs: 1700 },
  { id: 'cs2-bg-disease', settleMs: 1300 },
  { id: 'cs2-disease', settleMs: 1300 },
  { id: 'cs2-bg-regulatory', settleMs: 1300 },
  { id: 'cs2-setup', settleMs: 1300 },
  { id: 'cs2-architecture', settleMs: 1300 },
  { id: 'cs2-architecture-v2', settleMs: 1300 },
  { id: 'cs2-pillars', settleMs: 1300 },
  { id: 'cs2-reversal', settleMs: 2800 },
  { id: 'cs2-velocity', settleMs: 1300 },
  { id: 'cs2-reckoning', settleMs: 1300 },
  { id: 'cs2-leadership', settleMs: 1300 },
  { id: 'cs2-competitors', settleMs: 1300 },
  { id: 'cs2-bridge-recap', settleMs: 5200 },
  { id: 'cs3-divider', settleMs: 1700 },
  { id: 'cs3-question', settleMs: 1300 },
  { id: 'cs3-problem', settleMs: 1300 },
  { id: 'cs3-architecture', settleMs: 1300 },
  { id: 'cs3-landscape', settleMs: 1300 },
  { id: 'cs3-decisive-move', settleMs: 1300 },
  { id: 'cs3-pilot', settleMs: 1300 },
  { id: 'cs3-bracket', settleMs: 1300 },
  { id: 'cs3-portable', settleMs: 1300 },
  { id: 'closing-thread', settleMs: 1300 },
  { id: 'closing-merck', settleMs: 1300 },
  { id: 'closing-thanks', settleMs: 1300 },
];

function parseArgs() {
  const args = process.argv.slice(2);
  let upTo = 'closing-thanks';
  let baseUrl = 'http://localhost:5173';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--up-to' && args[i + 1]) upTo = args[++i];
    if (args[i] === '--base-url' && args[i + 1]) baseUrl = args[++i];
  }
  return { upTo, baseUrl };
}

function slideUrl(baseUrl, slideId) {
  return `${baseUrl}/decks/${DECK_ID}/s/${encodeURIComponent(slideId)}?export=1`;
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function timestampSlug() {
  const d = new Date();
  return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}-${pad2(d.getHours())}${pad2(d.getMinutes())}`;
}

const CHROME_HIDE_CSS = `
  .deck-root [data-deck-chrome="bottom"],
  .deck-root [data-deck-chrome="progress"],
  .deck-root nav[aria-label="Deck navigation"],
  .z-deck-chrome,
  .deck-root .fixed.top-3.right-3,
  .deck-root .fixed.top-5.right-5 { display: none !important; }
  html, body, .deck-root {
    width: ${SLIDE_W}px !important;
    height: ${SLIDE_H}px !important;
    overflow: hidden !important;
  }
  * { user-select: none !important; }
`;

/**
 * Force all framer-motion animated elements to their final visual state.
 * Works by overriding inline opacity and SVG stroke properties that
 * framer-motion manages. Safe because we only screenshot after this —
 * no further interaction with the page.
 */
const FORCE_ANIMATIONS_COMPLETE = `
  (() => {
    document.querySelectorAll('*').forEach(el => {
      const s = el.style;
      if (s.opacity === '0') s.opacity = '1';
    });
    document.querySelectorAll('svg path, svg line, svg circle, svg rect, svg ellipse').forEach(el => {
      if (el.style.opacity === '0') el.style.opacity = '1';
      if (el.style.strokeDashoffset && el.style.strokeDashoffset !== '0') {
        el.style.strokeDashoffset = '0';
      }
    });
  })();
`;

async function main() {
  const { upTo, baseUrl } = parseArgs();

  const cutIdx = SLIDES.findIndex((s) => s.id === upTo);
  if (cutIdx === -1) {
    console.error(`Slide id "${upTo}" not found in slide list.`);
    process.exit(1);
  }
  const slides = SLIDES.slice(0, cutIdx + 1);

  // For slides with very long animation delays (speaker-paced reveals),
  // cap settle to 4s and use force-complete instead.
  const FORCE_COMPLETE_THRESHOLD = 6000;
  const effectiveSettles = slides.map(s =>
    s.settleMs > FORCE_COMPLETE_THRESHOLD ? 4000 : s.settleMs
  );
  const totalSettleSec = effectiveSettles.reduce((a, b) => a + b, 0) / 1000;
  const overhead = slides.length * 2; // ~2s per slide for navigation

  console.log(`\n📦 Exporting ${slides.length} slides (up to "${upTo}")`);
  console.log(`   Estimated total time: ~${Math.ceil(totalSettleSec + overhead)}s\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: SLIDE_W, height: SLIDE_H },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();

  // Suppress console noise from the app
  page.on('console', () => {});
  page.on('pageerror', () => {});

  const pngBuffers = [];
  const startTime = Date.now();

  // Load first slide to bootstrap the app
  const firstUrl = slideUrl(baseUrl, slides[0].id);
  console.log(`  Loading app...`);
  await page.goto(firstUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.addStyleTag({ content: CHROME_HIDE_CSS });

  // Wait for fonts
  try {
    await page.evaluate(() => document.fonts.ready);
  } catch { /* fonts might not be available */ }

  for (let i = 0; i < slides.length; i++) {
    const { id, settleMs } = slides[i];
    const effectiveSettle = effectiveSettles[i];
    const needsForceComplete = settleMs > FORCE_COMPLETE_THRESHOLD;
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
    const remaining = effectiveSettles.slice(i).reduce((a, b) => a + b, 0) / 1000;

    console.log(
      `  [${String(i + 1).padStart(2)}/${slides.length}] ${id.padEnd(30)} ` +
      `settle ${(effectiveSettle / 1000).toFixed(1)}s` +
      (needsForceComplete ? ' +force' : '') +
      ` — ~${Math.ceil(remaining)}s left — ${elapsed}s elapsed`
    );

    if (i > 0) {
      // SPA-navigate within the already-loaded app
      const url = slideUrl(baseUrl, id);
      await page.evaluate((navUrl) => {
        window.history.replaceState(null, '', navUrl);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, url);
    }

    // Wait for animations to settle
    await page.waitForTimeout(effectiveSettle);

    if (needsForceComplete) {
      // Force all delayed animations to their end state
      await page.evaluate(FORCE_ANIMATIONS_COMPLETE);
      await page.waitForTimeout(300);
    }

    const buf = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: SLIDE_W, height: SLIDE_H },
    });
    pngBuffers.push({ id, buf });
  }

  await browser.close();

  // Assemble PDF
  console.log(`\n📄 Assembling PDF from ${pngBuffers.length} captures...`);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: [PDF_PT_W, PDF_PT_H],
    compress: true,
  });

  pdf.setProperties({
    title: 'Quantitative Pharmacology in Action',
    subject: 'QP2 Seminar — v3-R2 — Spring 2026',
    creator: 'merck-deck export',
  });

  for (let i = 0; i < pngBuffers.length; i++) {
    const { id, buf } = pngBuffers[i];
    if (i > 0) pdf.addPage([PDF_PT_W, PDF_PT_H], 'landscape');

    const b64 = buf.toString('base64');
    const dataUrl = `data:image/png;base64,${b64}`;
    pdf.addImage(dataUrl, 'PNG', 0, 0, PDF_PT_W, PDF_PT_H, id, 'FAST');
  }

  const outDir = join(__dirname, '..', '..', '..', '3-Final_Folders', '1-Final_ClinPharm-Merck1');
  mkdirSync(outDir, { recursive: true });

  const filename = `qp2-seminar-v3-R2-${timestampSlug()}.pdf`;
  const outPath = join(outDir, filename);

  const pdfBuf = Buffer.from(pdf.output('arraybuffer'));
  writeFileSync(outPath, pdfBuf);

  const sizeMB = (pdfBuf.length / (1024 * 1024)).toFixed(1);
  const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(0);
  console.log(`\n✅ Saved: ${outPath}`);
  console.log(`   ${pngBuffers.length} slides · ${sizeMB} MB · ${totalElapsed}s total\n`);
}

main().catch((err) => {
  console.error('Export failed:', err);
  process.exit(1);
});
