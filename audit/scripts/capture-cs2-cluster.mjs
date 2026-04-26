// Capture CS2 cluster (slides 14-22) at 1920×1080 and 1366×768 for the
// Apr-26 audit pass. For each slide we wait for animations to settle
// (~3000ms after navigation) and screenshot a single still. Slides 15
// → 16 also get transition mid-frames at 200/500/1100/1800 ms to verify
// the India outline morph still works after the IndiaMap restructure.
//
// Usage: node audit/scripts/capture-cs2-cluster.mjs

import { chromium } from 'playwright';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const BASE = 'http://localhost:5173/decks/qp2-seminar/s';
const OUT  = path.resolve('audit/out/cs2-cluster');

const SLIDES = [
  { id: 'case-bridge',           dir: '14-case-bridge'           },
  { id: 'case2-divider',         dir: '15-case2-divider'         },
  { id: 'case2-background',      dir: '16-case2-background'      },
  { id: 'case2-challenge-turn',  dir: '17-case2-challenge-turn'  },
  { id: 'case2-strategy',        dir: '18-case2-strategy'        },
  { id: 'case2-pillar6',         dir: '19-case2-pillar6'         },
  { id: 'case2-pillars-1-5',     dir: '20-case2-pillars-1-5'     },
  { id: 'case2-response',        dir: '21-case2-response'        },
  { id: 'case2-impact-bridge',   dir: '22-case2-impact-bridge'   },
];

const VIEWPORTS = [
  { w: 1920, h: 1080, tag: '1920x1080' },
  { w: 1366, h: 768,  tag: '1366x768'  },
];

const SETTLE_MS = 3200;

async function captureSlideStill(browser, slide, vp) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();
  // Pre-warm by going to a non-CS2 slide first so animations replay on entry.
  await page.goto(`${BASE}/title`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.goto(`${BASE}/${slide.id}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(SETTLE_MS);
  const dir = path.join(OUT, slide.dir);
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, `${vp.tag}-settled.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  ${vp.tag}  ${slide.id.padEnd(28)} → ${file}`);
  await ctx.close();
  return file;
}

// Cinematic mid-frames: navigate from slide 15 → 16 and capture
// transition timestamps to verify India outline layoutId morph.
async function captureMorph(browser, vp) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/case2-divider`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // let slide 15 settle (India seed visible)

  const dir = path.join(OUT, 'morph-15-to-16');
  await mkdir(dir, { recursive: true });

  const t0 = Date.now();
  // Navigate to slide 16 in-app via URL so framer-motion sees a layout
  // morph (LayoutGroup spans both slides via DeckRunner).
  await page.goto(`${BASE}/case2-background`, { waitUntil: 'commit' });

  const FRAMES = [
    { label: 't0200ms', ms: 200  },
    { label: 't0500ms', ms: 500  },
    { label: 't1100ms', ms: 1100 },
    { label: 't1800ms', ms: 1800 },
    { label: 't3500ms', ms: 3500 },
  ];

  const saved = [];
  for (const f of FRAMES) {
    const elapsed = Date.now() - t0;
    const wait = Math.max(0, f.ms - elapsed);
    if (wait > 0) await page.waitForTimeout(wait);
    const file = path.join(dir, `${vp.tag}-${f.label}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`  ${vp.tag}  morph 15→16 ${f.label.padEnd(8)} → ${file}`);
    saved.push(file);
  }
  await ctx.close();
  return saved;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  console.log(`Capturing into ${OUT}\n`);

  const captured = [];
  for (const vp of VIEWPORTS) {
    console.log(`[${vp.w}×${vp.h}]`);
    for (const slide of SLIDES) {
      try {
        captured.push(await captureSlideStill(browser, slide, vp));
      } catch (e) {
        console.error(`  ! FAILED ${slide.id} @ ${vp.tag}: ${e.message}`);
      }
    }
    captured.push(...await captureMorph(browser, vp));
    console.log('');
  }

  await browser.close();
  console.log(`\nCaptured ${captured.length} screenshots.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
