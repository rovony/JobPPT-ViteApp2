import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import ReadingViewer from './ReadingViewer';

/**
 * ReadingMaterialPane — presenter-only pre-talk reading viewer (modal).
 *
 * Modal chrome only — the inner TOC + content rendering is delegated to
 * `ReadingViewer` so the same vocabulary/styling is used by the full-page
 * route (pages/Reading) without copy-paste drift.
 *
 * Decisions:
 *   • Modal overlay, not a side panel — reading content is dense and
 *     deserves the full screen during a quick glance.
 *   • Esc closes (capture-phase + stopImmediatePropagation so deck-store's
 *     handler doesn't also close presenter view). Click outside closes.
 *   • Header includes a deep-link button "Open as page" → /decks/<id>/reading
 *     so the user can pop out into the full-page route when they want a
 *     dedicated browser tab/window for reading.
 *
 * Props:
 *   open          — bool
 *   onClose       — () => void
 *   readingItems  — Array<{ slug, title, attachedTo, minutes, content }>
 *   deckTitle     — string
 *   deckId        — string  (used for the "Open as page" deep link)
 */
export default function ReadingMaterialPane({
  open,
  onClose,
  readingItems = [],
  deckTitle = 'Deck',
  deckId,
}) {
  const [activeSlug, setActiveSlug] = useState(readingItems[0]?.slug ?? null);

  // Esc to close (capture-phase, see file header).
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      onClose?.();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pre-talk reading material"
      className="fixed inset-0 z-deck-presenter flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-lg shadow-xl flex flex-col overflow-hidden"
        style={{
          width: 'min(96vw, 1100px)',
          height: 'min(92vh, 760px)',
          background: 'var(--panel)',
          color: 'var(--cream)',
          border: '1px solid var(--cream-hairline)',
        }}
      >
        {/* ── Header ────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b shrink-0"
          style={{ borderBottomColor: 'var(--cream-hairline)' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="w-4 h-4 shrink-0" style={{ color: 'var(--case, var(--amber))' }} />
            <div className="flex flex-col min-w-0">
              <span
                className="deck-mono uppercase truncate"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--case, var(--amber))',
                }}
              >
                Reading material
              </span>
              <span
                className="text-sm font-medium truncate"
                style={{ color: 'var(--cream)' }}
                title={deckTitle}
              >
                {deckTitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {deckId && (
              <Link
                to={
                  activeSlug
                    ? `/decks/${encodeURIComponent(deckId)}/reading/${encodeURIComponent(activeSlug)}`
                    : `/decks/${encodeURIComponent(deckId)}/reading`
                }
                target="_blank"
                rel="noopener noreferrer"
                title="Open reading material as a full page"
                aria-label="Open as page"
                className="h-8 px-2 rounded flex items-center gap-1.5 transition-colors hover:bg-[var(--cream-ghost)]"
                style={{
                  color: 'var(--cream-muted)',
                  fontSize: '0.7rem',
                  letterSpacing: 'var(--ls-mono)',
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="deck-mono uppercase hidden sm:inline">Open as page</span>
              </Link>
            )}
            <button
              onClick={onClose}
              className="h-8 w-8 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
              aria-label="Close reading"
              title="Close · Esc"
              style={{ color: 'var(--cream-muted)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Body: shared viewer ───────────────────────── */}
        <ReadingViewer
          readingItems={readingItems}
          activeSlug={activeSlug}
          onSelectSlug={setActiveSlug}
        />
      </div>
    </div>
  );
}
