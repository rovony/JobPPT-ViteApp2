import React from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Presentation } from 'lucide-react';
import { getDeck } from '@/decks/registry';
import ReadingViewer from '@/components/deck/ReadingViewer';

/**
 * Reading — full-page reading material route.
 *
 * Routes:
 *   /decks/:deckId/reading           → opens first reading item
 *   /decks/:deckId/reading/:slug     → opens specific item (deep link)
 *
 * `activeSlug` lives in the URL path, not local state, so:
 *   · browser back/forward navigates between items
 *   · the URL is shareable (link to a specific reading section)
 *   · the modal pane's "Open as page" link can preserve the active item
 *
 * Page chrome — header bar with back-to-deck and back-to-presenter links,
 * because someone reading prep material almost always wants a one-click
 * route back into the talk. The actual TOC + markdown body is delegated
 * to ReadingViewer (shared with the modal pane).
 */
export default function Reading() {
  const { deckId, slug } = useParams();
  const navigate = useNavigate();
  const deck = getDeck(deckId);

  if (!deck) {
    return <Navigate to="/" replace />;
  }

  const readingItems = deck.reading || [];
  const activeSlug = slug || readingItems[0]?.slug || null;

  const onSelectSlug = (nextSlug) => {
    navigate(`/decks/${encodeURIComponent(deckId)}/reading/${encodeURIComponent(nextSlug)}`, {
      replace: false,
    });
  };

  return (
    <div
      data-deck-theme={deck.theme || 'clinical'}
      className="reading-page-root flex flex-col h-[100dvh] overflow-hidden"
      style={{ background: 'var(--bg, var(--panel))', color: 'var(--cream)' }}
    >
      {/* ── Page header ─────────────────────────────────── */}
      <header
        className="flex items-center justify-between px-4 md:px-6 py-2.5 border-b shrink-0"
        style={{ borderBottomColor: 'var(--cream-hairline)', background: 'var(--panel)' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to={`/decks/${encodeURIComponent(deckId)}`}
            title="Back to deck"
            aria-label="Back to deck"
            className="h-9 w-9 rounded-full border flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)] shrink-0"
            style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream)' }}
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
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
              title={deck.title}
            >
              {deck.title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/decks/${encodeURIComponent(deckId)}`}
            className="hidden md:inline-flex items-center gap-1.5 h-9 px-3 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
            style={{
              borderColor: 'var(--cream-hairline)',
              color: 'var(--cream-muted)',
              fontSize: '0.7rem',
              letterSpacing: 'var(--ls-mono)',
            }}
            title="Back to deck"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="deck-mono uppercase">Back to deck</span>
          </Link>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────── */}
      {readingItems.length === 0 ? (
        <div
          className="flex-1 flex items-center justify-center text-center px-6"
          style={{ color: 'var(--cream-faint)' }}
        >
          <div className="max-w-md">
            <p className="text-base mb-2" style={{ color: 'var(--cream-muted)' }}>
              No reading material for this deck yet.
            </p>
            <p className="text-sm">
              Add markdown files to{' '}
              <code style={{ color: 'var(--cream-muted)' }}>
                src/decks/{deckId}/reading/
              </code>{' '}
              and re-export from <code style={{ color: 'var(--cream-muted)' }}>index.js</code>.
            </p>
          </div>
        </div>
      ) : (
        <ReadingViewer
          readingItems={readingItems}
          activeSlug={activeSlug}
          onSelectSlug={onSelectSlug}
          tocWidth="320px"
          maxProseWidth="76ch"
        />
      )}
    </div>
  );
}
