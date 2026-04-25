import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import pptxgen from 'pptxgenjs';

/**
 * deck-export — capture every slide of a deck at 1920×1080 and package
 * the frames into a PDF or PPTX that matches the on-screen reference
 * exactly (same providers, same fonts, same theme, same animation
 * resting state).
 *
 * STRATEGY (iframe SPA-navigation)
 * --------------------------------
 * The first attempt at this used `createRoot` + a raw <DeckProvider>
 * mounted off-screen at `left: -100000px`. It looked clever and was
 * completely broken:
 *
 *   • Slides gate entrance animations behind framer-motion's
 *     `useInView({ once, amount: 0.3 })`. An off-screen host never
 *     intersects the viewport → animations never run → blank slides.
 *   • Slides use `h-[100dvh]` (and SlideGrid uses `h-[100dvh]` too).
 *     Inside the parent document, dvh resolves to the user's browser
 *     window — so a 800px-tall window produced 800px-tall slides.
 *   • The mount lacked Router, ThemeProvider, AuthProvider, and
 *     QueryClientProvider — the same wrappers the live DeckRunner
 *     boots inside. Any slide pulling on those would crash.
 *   • Fonts weren't awaited; first slides rasterised in fallback faces.
 *
 * Iframe-based capture sidesteps all of those at once: the iframe is
 * its own document with its own viewport (forced to 1920×1080), it
 * loads the real `/decks/:id/s/:slideId` route, so React Router,
 * AuthProvider, ThemeProvider, QueryClientProvider, DeckProvider, and
 * the LayoutGroup/MotionConfig wrappers from DeckRunner are all in
 * place automatically. Same-origin localStorage means the user's
 * theme override is inherited transparently.
 *
 * SPA navigation between slides is done via `history.pushState` +
 * dispatched `popstate` so we don't pay a full reload (and a fresh
 * AuthProvider boot) for every slide. React Router's BrowserRouter
 * subscribes to popstate and re-routes; the deck remounts the new
 * slide; entrance animations play; we wait for them to settle; we
 * rasterise.
 *
 * FAILURE CONTAINMENT
 * -------------------
 * Each slide is captured inside its own try/catch. A failure logs the
 * error and inserts a placeholder page so the export never half-dies
 * because of one bad slide. The overall result reports
 * `{ saved, failed[] }` to the caller for surfacing in the menu.
 */

const SLIDE_W = 1920;
const SLIDE_H = 1080;

// When a deck does not set `manifest.export.defaultSettleMs`, this is the
// per-slide rest delay after navigation (entrances, GSAP, framer, etc.).
// Tuned to be the fast default: heavy slides must opt up via
// `export.slideSettleMs`, `slide.exportSettleMs`, or `Component.exportSettleMs`.
const FALLBACK_DEFAULT_SETTLE_MS = 2400;

// JPEG embedded in PPTX: quality vs size; 0.90–0.92 is a good print/PPT range.
const PPTX_JPEG_QUALITY = 0.9;

// How long to give the iframe to finish its first load + boot the
// AuthProvider/ThemeProvider stack and mount DeckRunner. In dev this
// is ~600-1500ms cold; allow comfortable headroom.
const IFRAME_LOAD_TIMEOUT_MS = 30_000;
const DECK_MOUNT_TIMEOUT_MS = 15_000;

// PowerPoint widescreen layout = 13.333" × 7.5" (LAYOUT_WIDE).
const PPT_W_IN = 13.333;
const PPT_H_IN = 7.5;

// PDF page size in PostScript points = pixels × (72/96). 1920×1080
// pixel image at 1:1 device pixel ratio fills exactly 1440×810pt.
// Embedding the PNG at the page's full dimensions avoids any scaling
// blur. (jsPDF's compression flag below is just an alpha-channel
// setting; the PNG bytes are passed through.)
const PDF_PT_W = 1440;
const PDF_PT_H = 810;

/* ─────────────────────────  helpers  ───────────────────────── */

function pad2(n) {
  return String(n).padStart(2, '0');
}

function timestampSlug(date = new Date()) {
  const y = date.getFullYear();
  const mo = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  const h = pad2(date.getHours());
  const mi = pad2(date.getMinutes());
  return `${y}${mo}${d}-${h}${mi}`;
}

function safeFilename(s) {
  return (s || 'deck').replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

function bytesToHumanReadable(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i += 1; }
  return `${n.toFixed(n >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Export cancelled', 'AbortError'));
      return;
    }
    const t = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(t);
      reject(new DOMException('Export cancelled', 'AbortError'));
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

function nextFrame() {
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
}

/**
 * Per-slide wait after route commit + before rasterize.
 *
 * Historical bug: `Math.max(..., DEFAULT)` forced a floor of 5500ms on every
 * slide and made lower overrides (fast dividers) impossible. Override wins
 * when any explicit value is set; only missing values use the deck default
 * (manifest `export.defaultSettleMs`) or the global fallback.
 */
function settleMsForSlide(deck, slideMeta) {
  const id = slideMeta?.id;
  const deckExport = deck?.export;
  const fromMap = deckExport?.slideSettleMs && id != null
    ? Number(deckExport.slideSettleMs[id])
    : NaN;
  const fromComp = Number(slideMeta?.component?.exportSettleMs);
  const fromMeta = Number(slideMeta?.exportSettleMs);
  const deckDefault = Number(deckExport?.defaultSettleMs);
  const base = Number.isFinite(deckDefault) && deckDefault > 0
    ? deckDefault
    : FALLBACK_DEFAULT_SETTLE_MS;

  const explicit = [fromMap, fromComp, fromMeta].filter(
    (n) => Number.isFinite(n) && n > 0,
  );
  if (explicit.length > 0) {
    return Math.max(...explicit);
  }
  return base;
}

function buildSlideUrl(deckId, slideId) {
  return `/decks/${encodeURIComponent(deckId)}/s/${encodeURIComponent(slideId)}?export=1`;
}

/* ─────────────────────────  iframe sandbox  ───────────────────────── */

/**
 * Build an off-camera (but viewport-pinned) iframe sized at 1920×1080.
 * It sits at fixed top-left under an opaque overlay so the user only
 * sees the progress UI; the iframe itself is never visible.
 *
 * The iframe is hidden via `visibility: hidden` so it doesn't paint
 * to the screen, but the browser still lays it out and runs scripts /
 * IntersectionObserver inside. (display:none would skip layout, which
 * would break framer-motion's `useInView` gate.)
 */
function createSandbox() {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.setAttribute('tabindex', '-1');
  iframe.title = 'deck export sandbox';
  iframe.dataset.deckExportSandbox = '1';
  Object.assign(iframe.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: `${SLIDE_W}px`,
    height: `${SLIDE_H}px`,
    border: '0',
    margin: '0',
    padding: '0',
    background: 'transparent',
    pointerEvents: 'none',
    visibility: 'hidden',
    zIndex: '-1',
  });
  document.body.appendChild(iframe);
  return iframe;
}

function disposeSandbox(iframe) {
  if (!iframe) return;
  try { iframe.src = 'about:blank'; } catch { /* noop */ }
  iframe.remove();
}

function awaitIframeLoad(iframe, signal, timeout = IFRAME_LOAD_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    let done = false;
    const finish = (err) => {
      if (done) return;
      done = true;
      iframe.removeEventListener('load', onLoad);
      signal?.removeEventListener('abort', onAbort);
      clearTimeout(timer);
      err ? reject(err) : resolve();
    };
    const onLoad = () => finish();
    const onAbort = () => finish(new DOMException('Export cancelled', 'AbortError'));
    const timer = setTimeout(() => finish(new Error(`iframe did not load within ${timeout}ms`)), timeout);
    iframe.addEventListener('load', onLoad, { once: true });
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

async function awaitDeckMounted(iframe, signal, timeout = DECK_MOUNT_TIMEOUT_MS) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (signal?.aborted) throw new DOMException('Export cancelled', 'AbortError');
    const root = iframe.contentDocument?.querySelector('.deck-root');
    if (root) return root;
    await sleep(80, signal);
  }
  throw new Error(`DeckRunner did not mount in iframe within ${timeout}ms`);
}

/**
 * Hide the on-deck chrome (NavControls / TopRightMenu / ProgressBar)
 * inside the iframe so screenshots show only the slide art. We use a
 * scoped <style> tag rather than removing nodes so the chrome can be
 * restored without remounting the deck.
 */
function injectChromeMask(iframe) {
  const doc = iframe.contentDocument;
  if (!doc || doc.getElementById('deck-export-chrome-mask')) return;
  const style = doc.createElement('style');
  style.id = 'deck-export-chrome-mask';
  style.textContent = `
    /* Hide deck navigation, progress bar, and corner UI for export */
    .deck-root [data-deck-chrome="bottom"],
    .deck-root [data-deck-chrome="progress"],
    .deck-root nav[aria-label="Deck navigation"],
    .z-deck-chrome,
    .deck-root .fixed.top-3.right-3,
    .deck-root .fixed.top-5.right-5 { display: none !important; }
    /* Force the export viewport — defends against any device-pixel
       rounding the host browser might do. */
    html, body, .deck-root { width: ${SLIDE_W}px !important; height: ${SLIDE_H}px !important; overflow: hidden !important; }
    /* Disable text selection caret + drag handles in case the user
       was hovering anything before the export started. */
    * { user-select: none !important; -webkit-user-drag: none !important; }
  `;
  doc.head.appendChild(style);
}

/**
 * SPA-navigate the iframe to the next slide without paying a full
 * reload. React Router (BrowserRouter) subscribes to `popstate`, so
 * we mutate history then dispatch the event manually.
 */
function navigateIframeToSlide(iframe, deckId, slideId) {
  const w = iframe.contentWindow;
  if (!w) throw new Error('iframe contentWindow is gone');
  const url = buildSlideUrl(deckId, slideId);
  // Use replaceState so we don't pollute the iframe's back history with
  // 35 entries the user can never reach.
  w.history.replaceState(null, '', url);
  w.dispatchEvent(new w.PopStateEvent('popstate'));
}

/**
 * Wait until the deck inside the iframe has actually navigated to the
 * requested slide. We look for an element whose id matches the slide
 * meta's id (Slide.jsx renders `id={slide.id}`) OR for a data-slide
 * attribute carrying it. Falls back to the URL pathname check.
 */
async function awaitSlideRendered(iframe, slideId, signal, timeout = 5000) {
  const start = Date.now();
  const decoded = decodeURIComponent(slideId);
  while (Date.now() - start < timeout) {
    if (signal?.aborted) throw new DOMException('Export cancelled', 'AbortError');
    const doc = iframe.contentDocument;
    if (doc) {
      const path = iframe.contentWindow?.location?.pathname || '';
      if (path.endsWith(`/${slideId}`) || path.endsWith(`/${decoded}`)) return true;
    }
    await sleep(50, signal);
  }
  // Don't throw — just warn. The settle delay below will paper over a
  // late commit, and a stale slide will surface as a duplicate frame
  // rather than a hard crash.
  console.warn(`[deck-export] slide ${slideId} URL not committed within ${timeout}ms`);
  return false;
}

/* ─────────────────────────  capture  ───────────────────────── */

async function captureSlideAsPng(iframe) {
  const doc = iframe.contentDocument;
  const target = doc?.querySelector('.deck-root') || doc?.body;
  if (!target) throw new Error('no .deck-root inside iframe to capture');

  const opts = {
    width: SLIDE_W,
    height: SLIDE_H,
    canvasWidth: SLIDE_W,
    canvasHeight: SLIDE_H,
    pixelRatio: 1,
    cacheBust: false,
    skipAutoScale: true,
    // Don't tell html-to-image to add a background; the deck-root has
    // its own --bg. Forcing white here would white-flash dark themes.
    backgroundColor: undefined,
    style: {
      width: `${SLIDE_W}px`,
      height: `${SLIDE_H}px`,
    },
  };

  return toPng(target, opts);
}

/**
 * Decode a PNG data URL and re-encode as JPEG for PPTX. One iframe capture
 * per slide (PNG) — so PDF and PPTX can share the same capture pass without
 * re-rendering 35× in the sandbox.
 */
function pngDataUrlToJpegDataUrl(pngDataUrl, quality = PPTX_JPEG_QUALITY) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = SLIDE_W;
      canvas.height = SLIDE_H;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('2d context'));
        return;
      }
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, SLIDE_W, SLIDE_H);
      ctx.drawImage(img, 0, 0);
      try {
        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => reject(new Error('PNG decode failed'));
    img.src = pngDataUrl;
  });
}

/**
 * Inline placeholder used in the assembled file when a single slide's
 * capture throws. Renders as a 1920×1080 black frame with a centered
 * mono caption so the slot is preserved and the failure is obvious in
 * the deliverable.
 */
function placeholderPngDataUrl(label) {
  const canvas = document.createElement('canvas');
  canvas.width = SLIDE_W;
  canvas.height = SLIDE_H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, SLIDE_W, SLIDE_H);
  ctx.fillStyle = '#bfbab1';
  ctx.font = '28px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('export error · slide skipped', SLIDE_W / 2, SLIDE_H / 2 - 20);
  ctx.fillStyle = '#7a756c';
  ctx.font = '20px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(label, SLIDE_W / 2, SLIDE_H / 2 + 20);
  return canvas.toDataURL('image/png');
}

/**
 * Walk every slide once, returning `[{ slide, index, imagePng, failed?, error? }, ...]`.
 * Always captures PNG in the sandbox (one html-to-image pass per slide).
 * PPTX re-encodes to JPEG in main thread — cheap vs a second 1920×1080 raster.
 * `onProgress` receives a structured payload after each phase so the
 * caller can render a real status line.
 */
async function captureAll(deck, { themeMode, signal, onProgress } = {}) {
  const iframe = createSandbox();
  const results = [];
  const totalSlides = deck.slides.length;
  const settleList = deck.slides.map((s) => settleMsForSlide(deck, s));
  const totalSettleMs = settleList.reduce((a, b) => a + b, 0);
  try {
    onProgress?.({
      phase: 'loading',
      current: 0,
      total: totalSlides,
      message: 'Loading deck sandbox',
      estimatedTotalSettleMs: totalSettleMs,
    });

    // Boot the iframe at the first slide's URL. Same-origin → identical
    // provider stack to live use.
    const origin = window.location.origin;
    const firstUrl = origin + buildSlideUrl(deck.id, deck.slides[0].id);
    iframe.src = firstUrl;

    await awaitIframeLoad(iframe, signal);
    if (signal?.aborted) throw new DOMException('Export cancelled', 'AbortError');

    // Same-origin invariant: contentDocument must be reachable.
    if (!iframe.contentDocument) {
      throw new Error('cannot access iframe contentDocument — origin mismatch?');
    }

    // Theme mode: ThemeProvider in the iframe reads the same
    // localStorage as the parent, so the user's theme transfers
    // automatically. We still set it explicitly when the caller
    // provides one — covers the per-deck override case (deck-theme-
    // override:<id>) which DeckStage applies after mount.
    if (themeMode === 'light' || themeMode === 'dark') {
      const html = iframe.contentDocument.documentElement;
      if (themeMode === 'light') html.setAttribute('data-theme-mode', 'light');
      else html.removeAttribute('data-theme-mode');
    }

    await awaitDeckMounted(iframe, signal);
    injectChromeMask(iframe);

    // Re-apply theme on .deck-root (DeckStage owns the per-deck
    // override; on first mount it might not have run yet).
    if (themeMode === 'light' || themeMode === 'dark') {
      const root = iframe.contentDocument.querySelector('.deck-root');
      if (root) root.setAttribute('data-theme-mode', themeMode);
    }

    // Wait for fonts inside the iframe before the first capture so the
    // first slide doesn't rasterise with fallback faces. The iframe
    // bundles its own copies — both fontsource Inter and JetBrains Mono
    // are loaded via @fontsource imports.
    try {
      await iframe.contentDocument.fonts.ready;
    } catch (err) {
      console.warn('[deck-export] fonts.ready failed inside iframe:', err);
    }

    onProgress?.({
      phase: 'loading',
      current: 0,
      total: totalSlides,
      message: 'Sandbox ready',
      estimatedTotalSettleMs: totalSettleMs,
    });

    for (let i = 0; i < totalSlides; i += 1) {
      if (signal?.aborted) throw new DOMException('Export cancelled', 'AbortError');
      const slide = deck.slides[i];
      const label = slide.id || String(i + 1);
      const settle = settleList[i];
      const remainingSettle = settleList.slice(i).reduce((a, b) => a + b, 0);

      onProgress?.({
        phase: 'capturing',
        current: i + 1,
        total: totalSlides,
        slideId: label,
        settleMs: settle,
        estimatedRemainingSettleMs: remainingSettle,
        message: `Slide ${i + 1}/${totalSlides} · ${label} · ~${(remainingSettle / 1000).toFixed(0)}s remaining`,
      });

      // Slide 0 is already on screen from the iframe's initial load —
      // skip the SPA navigation for it so we keep the original
      // entrance animations (a synthetic popstate to the same URL
      // would sometimes re-mount and double-trigger the entrance).
      if (i > 0) {
        try {
          navigateIframeToSlide(iframe, deck.id, slide.id);
          await awaitSlideRendered(iframe, slide.id, signal);
        } catch (navErr) {
          console.error(`[deck-export] navigation to ${label} failed:`, navErr);
        }
      }

      // Let the new slide subtree mount + entrance animations land.
      await sleep(settle, signal);
      // Two RAF flushes after settle gives framer-motion a chance to
      // resolve any final layout pass before the rasterisation reads
      // computed styles.
      await nextFrame();

      try {
        const imagePng = await captureSlideAsPng(iframe);
        results.push({ slide, index: i, imagePng, failed: false });
      } catch (capErr) {
        console.error(`[deck-export] capture failed for ${label}:`, capErr);
        const imagePng = placeholderPngDataUrl(label);
        results.push({ slide, index: i, imagePng, failed: true, error: capErr });
      }
    }

    return results;
  } finally {
    disposeSandbox(iframe);
  }
}

/* ─────────────────────────  PDF  ───────────────────────── */

/**
 * Build a 1920×1080-equivalent PDF (one page per slide).
 *
 * Returns the assembled file metadata so the caller can surface a
 * "Saved · 35 slides · 4.2 MB" line.
 */
function assemblePdfBlob(deck, captures) {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: [PDF_PT_W, PDF_PT_H],
    compress: true,
  });

  pdf.setProperties({
    title: deck.title || deck.id,
    subject: deck.subtitle || '',
    creator: 'merck-deck',
  });

  for (let i = 0; i < captures.length; i += 1) {
    const { imagePng, slide } = captures[i];
    if (i > 0) pdf.addPage([PDF_PT_W, PDF_PT_H], 'landscape');
    pdf.addImage(imagePng, 'PNG', 0, 0, PDF_PT_W, PDF_PT_H, slide.id || `slide-${i + 1}`, 'FAST');
  }

  return pdf.output('blob');
}

/**
 * One iframe capture pass, then two files (no second 35-slide sandbox run).
 * Best when you need both deliverables; roughly half the wall time of
 * exporting PDF and PPTX back-to-back.
 */
export async function exportDeckToPDFAndPPTX(deck, { themeMode, signal, onProgress } = {}) {
  const captures = await captureAll(deck, { themeMode, signal, onProgress });
  if (signal?.aborted) throw new DOMException('Export cancelled', 'AbortError');

  onProgress?.({ phase: 'assembling', message: 'Assembling PDF + PowerPoint' });

  const slug = timestampSlug();
  const base = safeFilename(deck.id || deck.title);
  const pdfName = `${base}-${slug}.pdf`;
  const pptxName = `${base}-${slug}.pptx`;

  const pdfBlob = assemblePdfBlob(deck, captures);
  triggerDownload(pdfBlob, pdfName);

  const { blob: pptxBlob, summary: pptxSummary } = await assemblePptxBlob(deck, captures, signal);
  triggerDownload(pptxBlob, pptxName);

  const failed = captures.filter((c) => c.failed);
  const combined = {
    kind: 'pdf+pptx',
    filenames: { pdf: pdfName, pptx: pptxName },
    slidesTotal: captures.length,
    slidesSaved: captures.length - failed.length,
    failures: failed.map((f) => ({ index: f.index, slideId: f.slide.id, error: String(f.error?.message || f.error) })),
    sizesBytes: { pdf: pdfBlob.size, pptx: pptxBlob.size },
    sizeHuman: `${bytesToHumanReadable(pdfBlob.size)} + ${bytesToHumanReadable(pptxBlob.size)}`,
  };
  onProgress?.({
    phase: 'done',
    summary: combined,
    message: failed.length
      ? `Saved · PDF + PPT · ${combined.slidesSaved}/${combined.slidesTotal} slides · ${failed.length} failed`
      : `Saved · PDF + PPT · ${combined.slidesTotal} slides · ${combined.sizeHuman}`,
  });
  return { pdf: { filename: pdfName, sizeBytes: pdfBlob.size }, pptx: pptxSummary, combined };
}

export async function exportDeckToPDF(deck, { themeMode, signal, onProgress } = {}) {
  const captures = await captureAll(deck, { themeMode, signal, onProgress });
  if (signal?.aborted) throw new DOMException('Export cancelled', 'AbortError');

  onProgress?.({ phase: 'assembling', message: 'Assembling PDF' });

  const filename = `${safeFilename(deck.id || deck.title)}-${timestampSlug()}.pdf`;
  const blob = assemblePdfBlob(deck, captures);
  triggerDownload(blob, filename);

  const failed = captures.filter((c) => c.failed);
  const summary = {
    kind: 'pdf',
    filename,
    slidesTotal: captures.length,
    slidesSaved: captures.length - failed.length,
    failures: failed.map((f) => ({ index: f.index, slideId: f.slide.id, error: String(f.error?.message || f.error) })),
    sizeBytes: blob.size,
    sizeHuman: bytesToHumanReadable(blob.size),
  };
  onProgress?.({ phase: 'done', summary, message: summaryLine(summary) });
  return summary;
}

/* ─────────────────────────  PPTX  ───────────────────────── */

/**
 * Build a 16:9 widescreen .pptx where every slide is a full-bleed
 * JPEG (re-encoded in the main thread from the PNG capture so we never
 * run the heavy iframe pass twice for PDF + PPT).
 * Title / notes same as before.
 */
async function assemblePptxBlob(deck, captures, signal) {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.title = deck.title || deck.id || 'Deck';
  if (deck.subtitle) pptx.subject = deck.subtitle;
  pptx.author = 'merck-deck';

  for (let i = 0; i < captures.length; i += 1) {
    if (signal?.aborted) throw new DOMException('Export cancelled', 'AbortError');
    const { imagePng, slide } = captures[i];
    let data = imagePng;
    try {
      data = await pngDataUrlToJpegDataUrl(imagePng, PPTX_JPEG_QUALITY);
    } catch (e) {
      console.warn('[deck-export] JPEG re-encode failed; embedding PNG (larger .pptx):', e);
    }
    const pSlide = pptx.addSlide();
    pSlide.addImage({ data, x: 0, y: 0, w: PPT_W_IN, h: PPT_H_IN });

    if (slide.title) {
      pSlide.addText(slide.title, {
        x: 0, y: 0, w: 0.01, h: 0.01,
        fontSize: 1, color: 'FFFFFF', transparency: 100,
      });
    }
    const note = deck.notes?.[slide.id];
    if (typeof note === 'string' && note.trim()) {
      try { pSlide.addNotes(note); } catch { /* noop */ }
    }
  }

  const blob = await pptx.write({ outputType: 'blob' });
  const failed = captures.filter((c) => c.failed);
  return {
    blob,
    summary: {
      slidesTotal: captures.length,
      slidesSaved: captures.length - failed.length,
      failures: failed.map((f) => ({ index: f.index, slideId: f.slide.id, error: String(f.error?.message || f.error) })),
      sizeBytes: blob.size,
      sizeHuman: bytesToHumanReadable(blob.size),
    },
  };
}

export async function exportDeckToPPTX(deck, { themeMode, signal, onProgress } = {}) {
  const captures = await captureAll(deck, { themeMode, signal, onProgress });
  if (signal?.aborted) throw new DOMException('Export cancelled', 'AbortError');

  onProgress?.({ phase: 'assembling', message: 'Assembling PowerPoint' });

  const { blob, summary: base } = await assemblePptxBlob(deck, captures, signal);
  const filename = `${safeFilename(deck.id || deck.title)}-${timestampSlug()}.pptx`;
  triggerDownload(blob, filename);

  const summary = {
    kind: 'pptx',
    filename,
    ...base,
  };
  onProgress?.({ phase: 'done', summary, message: summaryLine(summary) });
  return summary;
}

/* ─────────────────────────  shared helpers  ───────────────────────── */

export function summaryLine(summary) {
  if (!summary) return '';
  if (summary.kind === 'pdf+pptx' && summary.sizeHuman) {
    const { slidesSaved, slidesTotal, failures = [], sizeHuman } = summary;
    if (failures.length === 0) {
      return `Saved · PDF + PPT · ${slidesTotal} slides · ${sizeHuman}`;
    }
    return `Saved · PDF + PPT · ${slidesSaved}/${slidesTotal} slides · ${failures.length} failed · ${sizeHuman}`;
  }
  const { slidesSaved, slidesTotal, sizeHuman, failures = [] } = summary;
  if (failures.length === 0) {
    return `Saved · ${slidesSaved} slides · ${sizeHuman}`;
  }
  return `Saved · ${slidesSaved}/${slidesTotal} slides · ${failures.length} failed (see console) · ${sizeHuman}`;
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 250);
}
