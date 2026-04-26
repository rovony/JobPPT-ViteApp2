// QC batch capture — captures all CS2 close + CS3 + closing slides
// (slots 22-35) at BOTH 1920×1080 and 1366×768 in a single browser run.
// Plus: slot 35 timed motion frames + reduced-motion captures, plus the
// CS2 → CS3 (slide 22 → 23) transition mid-frames to verify the
// CaseHeroDivider morph doesn't flicker.
//
// Usage:
//   node audit/scripts/qc-batch-capture.mjs <round>
// Captures into:
//   audit/out/qc-sweep/<slot>-<id>/round-<N>-<vp>.png
//   audit/out/qc-sweep/35-thank-you/round-<N>-1920-t<MS>.png
//   audit/out/qc-sweep/35-thank-you/round-<N>-1920-reduced.png
//   audit/out/qc-sweep/_transition-22-to-23/round-<N>-<vp>-t<MS>.png

import { chromium } from 'playwright';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const SETTLE_MS = 5000;
const PREWARM_ID = 'title';
const BASE = 'http://localhost:5173/decks/qp2-seminar/s';

const SLIDES = [
  { slot: '22', id: 'case2-impact-bridge'      },
  { slot: '23', id: 'case3-divider'            },
  { slot: '24', id: 'case3-challenge'          },
  { slot: '25', id: 'case3-strategy'           },
  { slot: '26', id: 'case3-fda-engagement'     },
  { slot: '27', id: 'case3-fit'                },
  { slot: '28', id: 'case3-impact'             },
  { slot: '29', id: 'case3-bridge'             },
  { slot: '30', id: 'closing-divider'          },
  { slot: '31', id: 'breadth-therapeutic-areas'},
  { slot: '32', id: 'record-at-scale'          },
  { slot: '33', id: 'leadership-principles'    },
  { slot: '34', id: 'in-closing'               },
  { slot: '35', id: 'thank-you'                },
];

const VIEWPORTS = [
  { w: 1920, h: 1080, tag: '1920' },
  { w: 1366, h: 768,  tag: '1366' },
];

async function captureStill(browser, vp, slideId, outFile, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
    reducedMotion: opts.reducedMotion ? 'reduce' : 'no-preference',
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/${PREWARM_ID}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.goto(`${BASE}/${slideId}`, { waitUntil: 'commit' });
  await page.waitForTimeout(opts.waitMs ?? SETTLE_MS);
  await page.screenshot({ path: outFile, fullPage: false });
  await ctx.close();
}

async function captureFinaleMotion(browser, vp, round, dir) {
  // Capture timed frames during the constellation re-bloom finale.
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/${PREWARM_ID}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  const t0 = Date.now();
  await page.goto(`${BASE}/thank-you`, { waitUntil: 'commit' });

  const FRAMES = [400, 1200, 2000, 3000, 4000];
  for (const ms of FRAMES) {
    const elapsed = Date.now() - t0;
    const wait = Math.max(0, ms - elapsed);
    if (wait > 0) await page.waitForTimeout(wait);
    const file = path.join(dir, `round-${round}-${vp.tag}-t${String(ms).padStart(4, '0')}ms.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`    finale ${vp.tag} t=${ms}ms → ${path.basename(file)}`);
  }
  await ctx.close();
}

async function captureFinaleReduced(browser, vp, round, dir) {
  const file = path.join(dir, `round-${round}-${vp.tag}-reduced.png`);
  await captureStill(browser, vp, 'thank-you', file, { reducedMotion: true, waitMs: 2000 });
  console.log(`    finale ${vp.tag} reduced-motion → ${path.basename(file)}`);
}

async function captureTransition(browser, vp, round, dir) {
  // Capture mid-flight frames during the slide 22 → 23 morph
  // (CaseHeroDivider violet outline emergence). Verify no flicker
  // and the lung-style opacity dip from the earlier audit doesn't
  // recur on this case-color handoff.
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/case2-impact-bridge`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  const t0 = Date.now();
  await page.goto(`${BASE}/case3-divider`, { waitUntil: 'commit' });

  const FRAMES = [200, 500, 1100, 1800, 3500];
  for (const ms of FRAMES) {
    const elapsed = Date.now() - t0;
    const wait = Math.max(0, ms - elapsed);
    if (wait > 0) await page.waitForTimeout(wait);
    const file = path.join(dir, `round-${round}-${vp.tag}-t${String(ms).padStart(4, '0')}ms.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`    transition 22→23 ${vp.tag} t=${ms}ms → ${path.basename(file)}`);
  }
  await ctx.close();
}

async function main() {
  const round = process.argv[2] || '1';
  const onlyArg = process.argv[3] || null;          // optional: comma-separated slot list
  const onlySet = onlyArg ? new Set(onlyArg.split(',')) : null;

  const browser = await chromium.launch();
  console.log(`[QC BATCH] round ${round}${onlySet ? ` (filter: ${[...onlySet].join(',')})` : ''}\n`);

  const slides = onlySet ? SLIDES.filter((s) => onlySet.has(s.slot)) : SLIDES;

  for (const slide of slides) {
    const dirName = `${slide.slot}-${slide.id}`;
    const outDir = path.resolve('audit/out/qc-sweep', dirName);
    await mkdir(outDir, { recursive: true });
    console.log(`[slot ${slide.slot}] ${slide.id}`);
    for (const vp of VIEWPORTS) {
      const outFile = path.join(outDir, `round-${round}-${vp.tag}.png`);
      try {
        await captureStill(browser, vp, slide.id, outFile);
        console.log(`    ${vp.tag} → ${path.basename(outFile)}`);
      } catch (e) {
        console.error(`    ! ${vp.tag} FAILED: ${e.message}`);
      }
    }
  }

  // Special captures — only run when the relevant slot is in scope.
  if (!onlySet || onlySet.has('35')) {
    const dir = path.resolve('audit/out/qc-sweep/35-thank-you');
    await mkdir(dir, { recursive: true });
    console.log(`\n[special] slot 35 finale motion arc`);
    for (const vp of VIEWPORTS) {
      try { await captureFinaleMotion(browser, vp, round, dir); }
      catch (e) { console.error(`    ! finale motion ${vp.tag} FAILED: ${e.message}`); }
      try { await captureFinaleReduced(browser, vp, round, dir); }
      catch (e) { console.error(`    ! finale reduced ${vp.tag} FAILED: ${e.message}`); }
    }
  }

  if (!onlySet || (onlySet.has('22') && onlySet.has('23'))) {
    const dir = path.resolve('audit/out/qc-sweep/_transition-22-to-23');
    await mkdir(dir, { recursive: true });
    console.log(`\n[special] CS2 → CS3 transition (slot 22 → 23)`);
    for (const vp of VIEWPORTS) {
      try { await captureTransition(browser, vp, round, dir); }
      catch (e) { console.error(`    ! transition ${vp.tag} FAILED: ${e.message}`); }
    }
  }

  await browser.close();
  console.log('\nDone.');
}

main().catch((e) => { console.error(e); process.exit(1); });
