import React from 'react';
import { createRoot } from 'react-dom/client';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import pptxgen from 'pptxgenjs';
import { DeckProvider } from '@/lib/deck-store';

/**
 * deck-export — rasterize every slide of a deck at authoring size
 * (1920×1080) and package into a PDF or PPTX.
 *
 * Strategy:
 *   1. Mount a hidden <div> at 1920×1080, absolutely positioned off-screen.
 *   2. For each slide, render the slide component inside a DeckProvider
 *      so hooks like useDeck() work. Await a short settle delay for
 *      framer-motion / GSAP entrances to land.
 *   3. Rasterize the frame with html2canvas → PNG data URL.
 *   4. Hand each PNG to jsPDF (landscape A-ish) or pptxgenjs (16:9 layout).
 *
 * We intentionally NOT try to preserve vectors/animations — a rasterized
 * snapshot is the pragmatic, reliable approach for export parity with
 * what's on screen. Each slide's entrance animation plays once before
 * capture so the final state matches the on-screen "rest" state.
 */

const SLIDE_W = 1920;
const SLIDE_H = 1080;
const SETTLE_MS = 1400; // give entrances + data-el animations time to finish

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Create an off-screen host that inherits the current deck theme from
 * the DOM (data-deck-theme / data-theme-mode) so exported slides match
 * the presenter's current theme.
 */
function makeHost(deck, themeMode) {
  const host = document.createElement('div');
  host.setAttribute('data-deck-theme', deck.theme || 'clinical');
  if (themeMode) host.setAttribute('data-theme-mode', themeMode);
  host.className = 'deck-root';
  Object.assign(host.style, {
    position: 'fixed',
    left: '-100000px',
    top: '0',
    width: `${SLIDE_W}px`,
    height: `${SLIDE_H}px`,
    overflow: 'hidden',
    background: 'var(--bg)',
    pointerEvents: 'none',
    zIndex: '-1',
  });
  document.body.appendChild(host);
  return host;
}

async function captureSlide(deck, slideIdx, host, onProgress) {
  const SlideComp = deck.slides[slideIdx]?.component;
  if (!SlideComp) return null;

  // Clear + mount slide into a fresh root
  host.innerHTML = '';
  const frame = document.createElement('div');
  Object.assign(frame.style, {
    width: `${SLIDE_W}px`,
    height: `${SLIDE_H}px`,
    position: 'relative',
  });
  host.appendChild(frame);
  const root = createRoot(frame);

  root.render(
    React.createElement(
      DeckProvider,
      { total: deck.slides.length, initialIndex: slideIdx },
      React.createElement(SlideComp, { step: 0, deck })
    )
  );

  // Wait for layout + entrance animations to land
  await sleep(SETTLE_MS);
  onProgress?.(`Rendering slide ${slideIdx + 1}/${deck.slides.length}`);

  // Rasterize with html-to-image — uses SVG foreignObject so the browser
  // renders modern CSS (color-mix, oklch, color(display-p3)) natively.
  // html2canvas replaced 2026-04-23 because it cannot parse color() functions.
  const dataUrl = await toPng(frame, {
    width: SLIDE_W,
    height: SLIDE_H,
    pixelRatio: 1,
    backgroundColor: undefined,
    cacheBust: true,
  });

  // Clean up this slide's root before the next one
  root.unmount();
  frame.remove();

  return dataUrl;
}

/**
 * Capture every slide sequentially → array of PNG data URLs.
 */
async function captureAll(deck, { themeMode, onProgress } = {}) {
  const host = makeHost(deck, themeMode);
  const images = [];
  try {
    for (let i = 0; i < deck.slides.length; i++) {
      const url = await captureSlide(deck, i, host, onProgress);
      if (url) images.push({ slide: deck.slides[i], index: i, png: url });
    }
  } finally {
    host.remove();
  }
  return images;
}

function safeFilename(s) {
  return (s || 'deck').replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

/* =====================================================
   PDF export — one page per slide at 16:9 landscape.
   jsPDF uses pt units by default; PowerPoint widescreen
   matches 13.333in × 7.5in → 960 × 540 pt.
   ===================================================== */
export async function exportDeckToPDF(deck, { themeMode, onProgress } = {}) {
  const images = await captureAll(deck, { themeMode, onProgress });
  onProgress?.('Assembling PDF…');

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: [960, 540], // 16:9
  });

  images.forEach((img, i) => {
    if (i > 0) pdf.addPage([960, 540], 'landscape');
    pdf.addImage(img.png, 'PNG', 0, 0, 960, 540, undefined, 'FAST');
  });

  pdf.save(`${safeFilename(deck.title)}.pdf`);
}

/* =====================================================
   PPTX export — 16:9 layout, each slide is a full-bleed
   image. Slide titles are set as the slide's PowerPoint
   title for outline/accessibility use.
   ===================================================== */
export async function exportDeckToPPTX(deck, { themeMode, onProgress } = {}) {
  const images = await captureAll(deck, { themeMode, onProgress });
  onProgress?.('Assembling PowerPoint…');

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE'; // 13.333 × 7.5 inches, 16:9
  pptx.title = deck.title || 'Deck';
  if (deck.subtitle) pptx.subject = deck.subtitle;

  images.forEach((img) => {
    const slide = pptx.addSlide();
    slide.addImage({
      data: img.png,
      x: 0, y: 0,
      w: 13.333, h: 7.5,
    });
    // Set a hidden title for the outline view / accessibility
    if (img.slide.title) {
      slide.addText(img.slide.title, {
        x: 0, y: 0, w: 0.01, h: 0.01,
        fontSize: 1, color: 'FFFFFF', transparency: 100,
      });
    }
  });

  await pptx.writeFile({ fileName: `${safeFilename(deck.title)}.pptx` });
}