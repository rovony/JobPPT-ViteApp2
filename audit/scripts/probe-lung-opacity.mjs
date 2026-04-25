/**
 * Sample the actual computed opacity (and the framer-motion projection
 * `style.opacity`) of every `[data-framer-component-type="div"]` node
 * carrying `data-framer-layout-id="lung-lynch"` during the 5 -> 6 morph,
 * so we can pinpoint which layer is dropping opacity.
 */
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();

await page.goto('http://localhost:5173/decks/qp2-seminar/s/case-divider', {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(3500);

await page.evaluate(() => {
  window.__lungLog = [];
  const sample = (label) => {
    const lungs = document.querySelectorAll('.lung-shared');
    const rec = { label, t: performance.now(), nodes: [] };
    lungs.forEach((el, i) => {
      const cs = getComputedStyle(el);
      const parent = el.parentElement;
      const parentCs = parent ? getComputedStyle(parent) : null;
      const grandparent = parent?.parentElement;
      const gpCs = grandparent ? getComputedStyle(grandparent) : null;
      // Walk up to find the SlideTransition wrapper (style position: absolute,
      // inset: 0, framer motion presence wrapper). It's typically a few levels
      // above the lung.
      let walker = el.parentElement;
      let slideTrans = null;
      while (walker && !slideTrans) {
        if (walker.style?.position === 'absolute' && walker.style?.inset === '0px') {
          slideTrans = walker;
        }
        walker = walker.parentElement;
      }
      const stCs = slideTrans ? getComputedStyle(slideTrans) : null;
      rec.nodes.push({
        i,
        cls: el.className,
        styleOpacity: el.style.opacity,
        computedOpacity: cs.opacity,
        transform: el.style.transform || cs.transform,
        rectW: el.getBoundingClientRect().width,
        rectX: el.getBoundingClientRect().x,
        parentCls: parent?.className?.toString?.() || '',
        parentStyleOpacity: parent?.style?.opacity || '',
        parentComputedOpacity: parentCs?.opacity || '',
        gpStyleOpacity: grandparent?.style?.opacity || '',
        gpComputedOpacity: gpCs?.opacity || '',
        gpCls: grandparent?.className?.toString?.() || '',
        slideTransStyleOpacity: slideTrans?.style?.opacity || '',
        slideTransComputedOpacity: stCs?.opacity || '',
      });
    });
    window.__lungLog.push(rec);
  };
  window.__sampleLung = sample;
  window.__sampleLung('start');
  for (let t of [16, 50, 100, 150, 200, 300, 500, 800, 1100, 1500, 1800, 2200]) {
    setTimeout(() => window.__sampleLung(`t${t}`), t);
  }
});

await page.keyboard.press('ArrowRight');
await page.waitForTimeout(2400);

const log = await page.evaluate(() => window.__lungLog);
for (const rec of log) {
  console.log(`\n[${rec.label}] (perf=${rec.t.toFixed(0)}ms) nodes=${rec.nodes.length}`);
  for (const n of rec.nodes) {
    console.log(
      `  #${n.i} ${n.cls} | rectW=${n.rectW.toFixed(0)} x=${n.rectX.toFixed(0)} | LUNG.opacity=style:${n.styleOpacity || '-'} comp:${n.computedOpacity} | SLIDETRANS.opacity=style:${n.slideTransStyleOpacity || '-'},comp:${n.slideTransComputedOpacity || '-'}`,
    );
  }
}

await ctx.close();
await browser.close();
