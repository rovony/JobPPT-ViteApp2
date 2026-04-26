/**
 * Sanity check: does a stylesheet rule with !important override a
 * framer-motion-set inline style.opacity? (CSS spec says yes, but
 * confirming for this engine.)
 */
import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 800, height: 600 } });
const page = await ctx.newPage();
await page.setContent(`
  <style>
    .pinned { opacity: 1 !important; }
  </style>
  <div id="el" class="pinned" style="opacity: 0.1; width:100px; height:100px; background:red;"></div>
`);
const [opacity, computedOpacity] = await page.evaluate(() => {
  const el = document.getElementById('el');
  return [el.style.opacity, getComputedStyle(el).opacity];
});
console.log(`inline.style.opacity=${opacity} computed=${computedOpacity}`);
await ctx.close();
await browser.close();
