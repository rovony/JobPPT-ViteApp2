import React from 'react';
import { useDeck } from '@/lib/deck-store';

/**
 * DeckLayout — the base layout primitive for v3+ decks.
 *
 * Every slot below is INDEPENDENTLY overridable. Resolution order
 * (deck default → slide override → final):
 *
 *   • Deck supplies defaults via manifest.standardLayout
 *   • Slide passes per-slot props that override the deck's defaults
 *   • Pass `null` to a slot prop to HIDE that slot for this slide
 *     (overriding deck default would have shown it)
 *   • Pass `undefined` (or omit) to FALL BACK to the deck default
 *
 * Slots:
 *   eyebrow       — small uppercase label above headline (null hides)
 *   headline      — slide title / claim (null hides)
 *   footerText    — left-side footer text (null hides)
 *   footerLine    — boolean; the hairline above the footer
 *   pageNumber    — boolean; the dynamic NN / TT badge
 *   pageFormat    — (index, total, slide) => string. Override the
 *                   numbering format (slide-name, fraction, dotted, etc.)
 *
 * Numbering is reorder-safe: the value is computed live from the deck
 * manifest's slides[] order. Drag-and-drop reordering of the manifest
 * (Phase 11) updates every visible badge in the deck without touching
 * any slide file.
 *
 * The `enabled` gate: if `deck.standardLayout?.enabled !== true`, the
 * component renders children unchanged. Safe to import from a deck
 * that hasn't opted in.
 */
export default function DeckLayout({
  deck,
  eyebrow,
  headline,
  footerText,
  footerLine,
  pageNumber,
  pageFormat,
  className = '',
  style = {},
  children,
}) {
  const { index, total } = useDeck();
  const enabled = deck?.standardLayout?.enabled === true;
  if (!enabled) return <>{children}</>;

  const cfg = deck.standardLayout || {};
  const fcfg = cfg.footer || {};

  // Resolve slot — slide prop has priority. `null` from caller = hide.
  // `undefined` = fall through to deck default. Booleans pass through.
  const resolveSlot = (slideValue, deckValue) =>
    slideValue === undefined ? deckValue : slideValue;

  const eyebrowFinal     = resolveSlot(eyebrow, cfg.eyebrow);
  const headlineFinal    = resolveSlot(headline, cfg.headline);
  const footerTextFinal  = resolveSlot(footerText, fcfg.text);
  const footerLineFinal  = resolveSlot(footerLine, fcfg.line);
  const pageNumberOn     = resolveSlot(pageNumber, fcfg.showSlideNumber);
  const formatFn         = pageFormat || cfg.formatPageNumber || defaultPageFormat;

  const showHeader = eyebrowFinal != null || headlineFinal != null;
  const showFooter = footerTextFinal != null || pageNumberOn || footerLineFinal;

  return (
    <div
      className={`deck-layout absolute inset-0 flex flex-col ${className}`}
      style={{
        padding: 'var(--deck-pad, clamp(24px, 3.5vh, 48px))',
        background: 'var(--bg, transparent)',
        ...style,
      }}
    >
      {showHeader && (
        <header className="shrink-0 mb-4">
          {eyebrowFinal != null && (
            <div
              className="deck-mono uppercase mb-1"
              style={{
                fontSize: '0.7rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case, var(--amber))',
              }}
            >
              {eyebrowFinal}
            </div>
          )}
          {headlineFinal != null && (
            <h2
              className="deck-display"
              style={{
                fontSize: 'clamp(20px, 2.4vw, 32px)',
                lineHeight: 1.2,
                fontWeight: 500,
                color: 'var(--cream)',
                maxWidth: '64ch',
              }}
            >
              {headlineFinal}
            </h2>
          )}
        </header>
      )}

      <div className="flex-1 min-h-0">{children}</div>

      {showFooter && (
        <footer
          className="shrink-0 mt-4 pt-2 flex items-center justify-between gap-4"
          style={{
            borderTop: footerLineFinal ? '1px solid var(--cream-hairline)' : 'none',
          }}
        >
          <span
            className="deck-mono uppercase truncate"
            style={{
              fontSize: '0.6rem',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-faint)',
              maxWidth: '70ch',
            }}
          >
            {footerTextFinal || ''}
          </span>
          {pageNumberOn && (
            <span
              className="deck-mono tabular-nums shrink-0"
              style={{
                fontSize: '0.7rem',
                letterSpacing: 'var(--ls-mono)',
                color: 'var(--cream-muted)',
              }}
              aria-label={`Slide ${index + 1} of ${total}`}
            >
              {formatFn(index, total, deck.slides[index])}
            </span>
          )}
        </footer>
      )}
    </div>
  );
}

/** Default page-number format. Override via deck.standardLayout.formatPageNumber
 *  to switch to slide-name, fraction, dotted, etc.
 *
 *  Examples (drop in manifest.standardLayout.formatPageNumber):
 *    (i, n) => `${i+1} / ${n}`              // default · "12 / 35"
 *    (i, n) => `${i+1} of ${n}`             // verbose · "12 of 35"
 *    (i, n, s) => s?.id ?? `${i+1}/${n}`    // by slide id · "case-fit"
 *    (i, n) => `${String(i+1).padStart(2,'0')}`  // just the number · "12"
 *    (i, n) => Math.round(((i+1)/n)*100)+'%' // progress · "34%"
 */
export function defaultPageFormat(index, total) {
  return `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}
