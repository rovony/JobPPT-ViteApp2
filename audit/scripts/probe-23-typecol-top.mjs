/**
 * Read the actual computed top of slide 23's type column to verify the
 * clamp() override took effect. Also report kicker top so we can see
 * the column shifted up by the right number of pixels.
 */
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1366, height: 768 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto('http://localhost:5173/decks/qp2-seminar/s/case3-divider', {
  waitUntil: 'networkidle', timeout: 20000,
});
await page.waitForTimeout(3500);

const data = await page.evaluate(() => {
  const kicker = Array.from(document.querySelectorAll('div'))
    .find(d => d.textContent && d.textContent.trim() === 'CASE STUDY 03');
  const titleH1 = document.querySelector('h1');

  // Find the type column wrapper — direct parent of the kicker that has
  // position:absolute and zIndex 2.
  let typeCol = kicker;
  while (typeCol && typeCol.parentElement) {
    const cs = getComputedStyle(typeCol);
    if (cs.position === 'absolute' && parseInt(cs.zIndex) === 2) break;
    typeCol = typeCol.parentElement;
  }

  return {
    kickerTop: kicker?.getBoundingClientRect().top,
    titleTop: titleH1?.getBoundingClientRect().top,
    titleBot: titleH1?.getBoundingClientRect().bottom,
    typeColTop: typeCol?.getBoundingClientRect().top,
    typeColCSS: typeCol ? getComputedStyle(typeCol).top : null,
  };
});

console.log('1366x768 type column probe');
console.log(`  kicker top:        ${data.kickerTop?.toFixed(0)}`);
console.log(`  title top/bot:     ${data.titleTop?.toFixed(0)} / ${data.titleBot?.toFixed(0)}`);
console.log(`  typeCol top (DOM): ${data.typeColTop?.toFixed(0)}`);
console.log(`  typeCol top (CSS): ${data.typeColCSS}`);

await browser.close();
