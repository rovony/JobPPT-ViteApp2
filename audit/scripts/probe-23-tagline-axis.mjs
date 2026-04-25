/**
 * Probe slide 23 (CS3 violet · lymphocyte) at both viewports and measure
 * where the LEFT-COLUMN tagline ends versus where the new ledger axis
 * hairline begins. The tagline is the italic descriptor under the
 * subtitle ("A pharmacometrics-anchored design...").
 *
 * If `tagline.bottom > axis.top`, the axis cuts through the descriptor.
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
    const tagline = Array.from(document.querySelectorAll('p'))
      .find(p => p.textContent && p.textContent.includes('pharmacometrics-anchored design'));

    const allDivs = Array.from(document.querySelectorAll('div'));
    const axis = allDivs.find(d => {
      const cs = getComputedStyle(d);
      const r = d.getBoundingClientRect();
      return cs.height === '1px' && r.width > 800 && r.top > 300;
    });

    const subtitle = Array.from(document.querySelectorAll('div'))
      .find(d => d.textContent && d.textContent.includes('A smaller, smarter trial'));

    return {
      subtitle: subtitle ? subtitle.getBoundingClientRect().toJSON() : null,
      tagline: tagline ? tagline.getBoundingClientRect().toJSON() : null,
      axis: axis ? axis.getBoundingClientRect().toJSON() : null,
    };
  });

  console.log(`\n${v.tag}`);
  console.log(`  subtitle bottom:    ${data.subtitle?.bottom?.toFixed(0)}`);
  console.log(`  tagline top/bot:    ${data.tagline?.top?.toFixed(0)} / ${data.tagline?.bottom?.toFixed(0)}`);
  console.log(`  axis top:           ${data.axis?.top?.toFixed(0)}`);
  if (data.tagline && data.axis) {
    const gap = data.axis.top - data.tagline.bottom;
    console.log(`  >>> tagline→axis gap: ${gap.toFixed(0)}px ${gap < 8 ? '!!! TAGLINE OVER AXIS' : 'ok'}`);
  }

  await ctx.close();
}

await browser.close();
