/**
 * Probe slide 23 (CS3 violet · lymphocyte) at 1920×1080 + 1366×768 to
 * measure the vertical distance between the bottom of the lymphocyte
 * caption block and the top of the new ledger axis hairline.
 *
 * If the gap is negative or under ~12px on either viewport, the axis
 * is colliding with the caption and we need to either lower the
 * ledger or shrink the illustration footprint.
 */
import { chromium } from 'playwright';

const VIEWPORTS = [
  { tag: '1920x1080', width: 1920, height: 1080 },
  { tag: '1366x768',  width: 1366, height: 768  },
];

const browser = await chromium.launch();

for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/decks/qp2-seminar/s/case3-divider', {
    waitUntil: 'networkidle', timeout: 20000,
  });
  await page.waitForTimeout(3500);

  const data = await page.evaluate(() => {
    // The lymphocyte caption is the only flex column in the illustration
    // slot containing both a "deck-mono" label AND a sibling cream-muted
    // descriptor. Easier: target by aria-label + walk to find caption.
    const lymph = document.querySelector('[aria-label*="lymphocyte" i]');
    const captionLabel = Array.from(document.querySelectorAll('span'))
      .find(el => el.textContent && el.textContent.trim().toUpperCase() === 'LYMPHOCYTE · CELL OF ORIGIN');
    const captionDescriptor = Array.from(document.querySelectorAll('span'))
      .find(el => el.textContent && el.textContent.trim() === 'The lymphoblast clone in adult Ph-negative ALL');

    // Axis line — first child div of the CaseLedger wrapper. Target by
    // looking for any element whose direct parent is at bottom of slide
    // (`.absolute` with bottom:calc) and matches our 1px hairline.
    const allDivs = Array.from(document.querySelectorAll('div'));
    const axis = allDivs.find(d => {
      const cs = getComputedStyle(d);
      const r = d.getBoundingClientRect();
      return cs.height === '1px' && r.width > 800 && r.top > 300;
    });

    // Source line — italic deck-display in bottom row.
    const source = Array.from(document.querySelectorAll('span'))
      .find(el => el.textContent && el.textContent.includes('FDA Type A meeting'));

    return {
      lymph: lymph ? lymph.getBoundingClientRect().toJSON() : null,
      captionLabel: captionLabel ? captionLabel.getBoundingClientRect().toJSON() : null,
      captionDescriptor: captionDescriptor ? captionDescriptor.getBoundingClientRect().toJSON() : null,
      axis: axis ? axis.getBoundingClientRect().toJSON() : null,
      source: source ? source.getBoundingClientRect().toJSON() : null,
    };
  });

  console.log(`\n${v.tag}`);
  console.log(`  lymph SVG bottom:           ${data.lymph?.bottom?.toFixed(0)}`);
  console.log(`  caption label bottom:       ${data.captionLabel?.bottom?.toFixed(0)}`);
  console.log(`  caption descriptor bottom:  ${data.captionDescriptor?.bottom?.toFixed(0)}`);
  console.log(`  axis hairline top:          ${data.axis?.top?.toFixed(0)}`);
  console.log(`  source italic top:          ${data.source?.top?.toFixed(0)}`);
  if (data.captionDescriptor && data.axis) {
    const gap = data.axis.top - data.captionDescriptor.bottom;
    console.log(`  >>> caption→axis gap:       ${gap.toFixed(0)}px ${gap < 12 ? '!!! COLLISION/TIGHT' : 'ok'}`);
  }

  await ctx.close();
}

await browser.close();
