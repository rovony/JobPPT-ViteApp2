import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, BookOpen, Clock } from 'lucide-react';

/**
 * ReadingMaterialPane — presenter-only pre-talk reading viewer.
 *
 * Decisions:
 *   • Modal overlay, not a side panel — the reading content is dense and
 *     deserves the full screen when the presenter actually reads it. Stays
 *     out of the live presenter view's already-tight 3-col layout.
 *   • Two-column inside the modal: TOC (left, ~280px) + content (right, fluid).
 *   • Markdown renderer is react-markdown + remark-gfm so tables, task
 *     lists, and strikethrough render correctly. Same `==highlight==`
 *     transform as PresenterNotesPane / AnticipatedQAPane via the shared
 *     transform helper duplicated below.
 *   • Esc closes. Click outside the modal closes. The X button closes.
 *   • The component is mounted unconditionally in PresenterView; visibility
 *     is gated by the `open` prop.
 *
 * Phase 4 will add full-text search across reading items + a "reading for
 * this slide" filter using the `attachedTo` metadata. Phase 3 ships the
 * stable viewer; nothing here will need rewriting when those land.
 *
 * Props:
 *   open          — bool
 *   onClose       — () => void
 *   readingItems  — Array<{ slug, title, attachedTo, minutes, content }>
 *                   (from src/decks/<deck>/reading/index.js)
 *   deckTitle     — string, shown in modal header
 */
export default function ReadingMaterialPane({ open, onClose, readingItems = [], deckTitle = 'Deck' }) {
  const [activeSlug, setActiveSlug] = useState(readingItems[0]?.slug ?? null);

  // Default to the first item whenever the modal opens or the deck switches.
  useEffect(() => {
    if (open && readingItems.length && !readingItems.find((r) => r.slug === activeSlug)) {
      setActiveSlug(readingItems[0].slug);
    }
  }, [open, readingItems, activeSlug]);

  // Esc to close. Capture-phase + stopImmediatePropagation so the deck-store
  // keyboard handler (which also listens for Escape and would close the
  // entire presenter view) doesn't also fire. The modal must close in
  // isolation, leaving presenter view intact.
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

  const active = useMemo(
    () => readingItems.find((r) => r.slug === activeSlug) || readingItems[0] || null,
    [readingItems, activeSlug],
  );

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
                style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}
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

        {/* ── Body: TOC + content ───────────────────────── */}
        <div className="flex flex-1 min-h-0">
          {/* Left: TOC */}
          <aside
            className="w-[280px] shrink-0 overflow-y-auto border-r"
            style={{ borderRightColor: 'var(--cream-hairline)' }}
          >
            {readingItems.length === 0 ? (
              <div className="p-4 text-sm" style={{ color: 'var(--cream-faint)' }}>
                No reading material for this deck yet. Add markdown files to{' '}
                <code>src/decks/&lt;deckId&gt;/reading/</code>.
              </div>
            ) : (
              <ul className="py-2">
                {readingItems.map((item) => {
                  const isActive = item.slug === active?.slug;
                  return (
                    <li key={item.slug}>
                      <button
                        onClick={() => setActiveSlug(item.slug)}
                        className="w-full text-left px-4 py-2.5 transition-colors flex flex-col gap-1"
                        style={{
                          background: isActive ? 'var(--cream-ghost)' : 'transparent',
                          borderLeft: isActive ? '2px solid var(--case, var(--amber))' : '2px solid transparent',
                          color: isActive ? 'var(--cream)' : 'var(--cream-muted)',
                        }}
                      >
                        <span className="text-sm font-medium leading-snug">{item.title}</span>
                        <span
                          className="deck-mono uppercase flex items-center gap-1.5"
                          style={{
                            fontSize: '0.55rem',
                            letterSpacing: 'var(--ls-mono-wide)',
                            color: 'var(--cream-faint)',
                          }}
                        >
                          <Clock className="w-2.5 h-2.5" />
                          {item.minutes ?? '—'} min
                          {item.attachedTo && (
                            <>
                              <span className="opacity-50">·</span>
                              <span>{Array.isArray(item.attachedTo) ? `${item.attachedTo.length} slides` : item.attachedTo}</span>
                            </>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </aside>

          {/* Right: rendered markdown */}
          <main className="flex-1 overflow-y-auto p-6">
            {active ? (
              <div
                className="reading-prose mx-auto"
                style={{
                  maxWidth: '68ch',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'var(--cream)',
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={readingMarkdownComponents}>
                  {active.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center mt-20" style={{ color: 'var(--cream-faint)' }}>
                Select an item from the left to start reading.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* Markdown component map — same vocabulary as PresenterNotesPane and
   AnticipatedQAPane. Tables/strikethrough/task-lists are handled by
   remarkGfm; we add the `==highlight==` transform via the shared helper. */
const readingMarkdownComponents = {
  h1: ({ node, children, ...p }) => <h1 className="reading-h1" {...p}>{transform(children)}</h1>,
  h2: ({ node, children, ...p }) => <h2 className="reading-h2" {...p}>{transform(children)}</h2>,
  h3: ({ node, children, ...p }) => <h3 className="reading-h3" {...p}>{transform(children)}</h3>,
  p:  ({ node, children, ...p }) => <p  className="reading-p"  {...p}>{transform(children)}</p>,
  ul: ({ node, ...p }) => <ul className="reading-ul" {...p} />,
  ol: ({ node, ...p }) => <ol className="reading-ol" {...p} />,
  li: ({ node, children, ...p }) => <li className="reading-li" {...p}>{transform(children)}</li>,
  strong: ({ node, children, ...p }) => <strong className="reading-strong" {...p}>{transform(children)}</strong>,
  em:     ({ node, children, ...p }) => <em className="reading-em" {...p}>{transform(children)}</em>,
  blockquote: ({ node, ...p }) => <blockquote className="reading-quote" {...p} />,
  code:   ({ node, inline, ...p }) => inline ? <code className="reading-code-inline" {...p} /> : <code {...p} />,
  pre:    ({ node, ...p }) => <pre className="reading-pre" {...p} />,
  table:  ({ node, ...p }) => <div className="reading-table-wrap"><table className="reading-table" {...p} /></div>,
  th:     ({ node, ...p }) => <th className="reading-th" {...p} />,
  td:     ({ node, ...p }) => <td className="reading-td" {...p} />,
  hr:     ({ node, ...p }) => <hr className="reading-hr" {...p} />,
  a:      ({ node, ...p }) => <a className="reading-a" target="_blank" rel="noopener noreferrer" {...p} />,
};

function transform(children) {
  return React.Children.map(children, (child, i) => {
    if (typeof child !== 'string') return child;
    if (!child.includes('==')) return child;
    const parts = child.split(/==([^=]+)==/g);
    return parts.map((p, j) =>
      j % 2 === 1
        ? <mark key={`${i}-${j}`} className="reading-mark">{p}</mark>
        : <React.Fragment key={`${i}-${j}`}>{p}</React.Fragment>
    );
  });
}
