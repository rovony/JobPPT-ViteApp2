/**
 * v6-vir live spine QC — desktop (1920×1080) + laptop (1366×768) per slide.
 *
 * Prereq: npm run dev (http://localhost:5173)
 * Usage:  node audit/v6-vir-qc-sweep.mjs
 *         node audit/v6-vir-qc-sweep.mjs cs1-pkpd cs2-asp-fda   # subset
 * Output: audit/v6-vir-qc/<id>/desktop.png · laptop.png
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const LIVE_SPINE = [
  'title',
  'hook-A-trial-not-answer',
  'career-arc',
  'roadmap',
  'cs1-divider',
  'cs1-question',
  'cs1-context',
  'cs1-mechanism',
  'cs1-trial',
  'cs1-architecture',
  'cs1-covariate-strategy',
  'cs1-poppk',
  'cs1-pkpd',
  'cs1-outcome',
  'cs1-bracket',
  'cs1-lesson',
  'cs1-bridge',
  'cs2-asp-divider',
  'cs2-asp-challenge',
  'cs2-asp-strategy',
  'cs2-asp-fda',
  'cs2-asp-fit',
  'cs2-asp-impact',
  'cs2-asp-bridge',
  'cs3-ivosidenib-divider',
  'cs3-setup',
  'cs3-bg-regulatory',
  'cs3-pillars',
  'cs3-reversal',
  'cs3-reckoning',
  'cs3-leadership',
  'cs3-bridge-recap',
  'cs2-pharazi-divider',
  'cs2-regulatory-floor',
  'cs2-gap',
  'cs2-working-overview',
  'cs2-poppk-dashboard',
  'cs2-publication-close',
  'portfolio-01',
  'company-bridge-divider',
  'company-bridge-oncology-problem',
  'company-bridge-oncology-approach',
  'company-bridge-case-mapping',
  'company-bridge-hbv-hdv',
  'company-bridge-fit',
  'closing-thread',
  'closing-fit',
  'closing-thanks',
];

const BASE = 'http://localhost:5173/decks/v6-vir/s';
const OUT_ROOT = join(process.cwd(), 'audit', 'v6-vir-qc');

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1366, height: 768 },
];

const args = process.argv.slice(2);
const slides = args.length ? args.filter((id) => LIVE_SPINE.includes(id)) : LIVE_SPINE;

if (args.length && slides.length === 0) {
  console.error('No matching live-spine ids. Examples:', LIVE_SPINE.slice(0, 5).join(', '));
  process.exit(1);
}

mkdirSync(OUT_ROOT, { recursive: true });

const browser = await chromium.launch();
const failures = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (let i = 0; i < slides.length; i++) {
    const id = slides[i];
    const dir = join(OUT_ROOT, id);
    mkdirSync(dir, { recursive: true });
    const url = `${BASE}/${id}`;
    const label = `[${vp.name}] ${String(i + 1).padStart(2, '0')}/${slides.length} ${id}`;
    process.stdout.write(`${label} ... `);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
      await page.waitForTimeout(1200);
      await page.screenshot({
        path: join(dir, `${vp.name}.png`),
        fullPage: false,
      });
      console.log('ok');
    } catch (err) {
      console.log('FAIL');
      failures.push({ id, viewport: vp.name, error: err.message });
    }
  }

  await ctx.close();
}

await browser.close();

if (failures.length) {
  console.error('\nFailures:');
  for (const f of failures) {
    console.error(`  ${f.viewport} · ${f.id}: ${f.error}`);
  }
  process.exit(1);
}

console.log(`\nDone — ${slides.length} slides × ${VIEWPORTS.length} viewports → ${OUT_ROOT}`);
