/**
 * Batch PDF export for one or more decks via the in-app export menu.
 *
 * Requires `vercel dev` (middleware + /api/auth/*). Example:
 *   npm run dev   # vite on :5173 (auth stubbed in deck-studio-api-dev-plugin)
 *   node audit/export-decks-pdf.mjs
 *
 * Env:
 *   APP_URL          default http://localhost:5173
 *   SITE_PASSWORD    from .env.local
 *   DECK_IDS         comma-separated, default qp2-seminar-v3-R2,v5-ultragenyx
 *   EXPORT_TIMEOUT_MS per-deck download timeout (default 25 min)
 */
import { config as dotenvConfig } from 'dotenv';
import { chromium } from 'playwright';
import { mkdirSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';

dotenvConfig({ path: '.env.local' });

const APP_URL = process.env.APP_URL || 'http://localhost:5173';
const PASSWORD = process.env.SITE_PASSWORD || 'localdev2026';
const SKIP_LOGIN = process.env.SKIP_LOGIN === '1' || APP_URL.includes('5173');
const DECK_IDS = (process.env.DECK_IDS || 'qp2-seminar-v3-R2,v5-ultragenyx')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const EXPORT_TIMEOUT_MS = Number(process.env.EXPORT_TIMEOUT_MS || 25 * 60 * 1000);

const OUT_DIR = join(process.cwd(), 'audit', 'out', 'pdf-exports');
mkdirSync(OUT_DIR, { recursive: true });

const log = (...a) => console.log('[export]', ...a);

async function login(page) {
  log('logging in…');
  await page.goto(`${APP_URL}/login`, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.getByTestId('password-input').fill(PASSWORD);
  await page.getByTestId('login-submit').click();
  await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 15_000 });
  log('logged in');
}

async function runPdfExport(page, deckId, firstSlide = 'title') {
  const target = `${APP_URL}/decks/${deckId}/s/${firstSlide}`;
  log(`opening ${target}`);
  await page.goto(target, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForSelector('.deck-root', { timeout: 20_000 });
  await page.waitForTimeout(1500);

  const trigger = page.locator('button[aria-label="Menu — share, export, theme, home"]');
  await trigger.waitFor({ state: 'visible', timeout: 15_000 });
  await trigger.click();
  await page.waitForSelector('div[role="menu"]', { state: 'visible', timeout: 5_000 });

  const item = page.getByRole('menuitem', { name: /one page per slide/i });
  await item.waitFor({ state: 'visible', timeout: 5_000 });

  const downloadPromise = page.waitForEvent('download', { timeout: EXPORT_TIMEOUT_MS });
  await item.click();
  log(`exporting ${deckId} (timeout ${Math.round(EXPORT_TIMEOUT_MS / 60000)} min)…`);

  let lastStatus = '';
  const statusPoll = setInterval(async () => {
    try {
      const span = page.locator('div[role="menu"] span.deck-mono.truncate').first();
      const text = (await span.textContent({ timeout: 250 }).catch(() => '')) || '';
      if (text && text !== lastStatus) {
        lastStatus = text;
        process.stdout.write(`  ${text}\n`);
      }
    } catch { /* menu collapsed */ }
  }, 1000);

  let download;
  try {
    download = await downloadPromise;
  } finally {
    clearInterval(statusPoll);
  }

  const suggested = download.suggestedFilename();
  const dest = join(OUT_DIR, suggested || `${deckId}.pdf`);
  await download.saveAs(dest);
  if (!existsSync(dest)) throw new Error(`download failed: ${dest}`);
  const sizeMB = (statSync(dest).size / 1024 / 1024).toFixed(2);
  log(`saved ${basename(dest)} (${sizeMB} MB)`);
  return { path: dest, sizeMB: Number(sizeMB), filename: basename(dest) };
}

async function main() {
  const summary = { appUrl: APP_URL, decks: {}, runAt: new Date().toISOString() };
  const t0 = Date.now();

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    acceptDownloads: true,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();

  if (!SKIP_LOGIN) {
    await login(page);
  } else {
    log('SKIP_LOGIN — using vite dev auth stub');
  }

  for (const deckId of DECK_IDS) {
    try {
      summary.decks[deckId] = await runPdfExport(page, deckId);
    } catch (err) {
      summary.decks[deckId] = { error: err.message };
      console.error(`[export] FAIL ${deckId}:`, err.message);
    }
  }

  await browser.close();
  summary.elapsedSec = +((Date.now() - t0) / 1000).toFixed(1);
  const summaryPath = join(OUT_DIR, 'summary.json');
  writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  log(`done in ${summary.elapsedSec}s — ${summaryPath}`);
}

main().catch((err) => {
  console.error('[export] fatal:', err);
  process.exit(1);
});
