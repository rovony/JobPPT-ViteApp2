import React, { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock } from 'lucide-react';

/**
 * ReadingViewer — shared TOC + markdown body for reading material.
 * Used by:
 *   · ReadingMaterialPane (modal overlay inside presenter view)
 *   · pages/Reading       (full-page route /decks/:deckId/reading)
 *
 * Stateless — `activeSlug` and its setter are passed in by the parent so
 * each surface can choose its own state-source (local state for the modal,
 * URL params for the page). Layout is two-column flex: TOC left (fixed
 * width on desktop, top strip on narrow), markdown right (scrolls).
 *
 * The component map and `==highlight==` transform live here so both
 * surfaces stay in lockstep — never copy-paste the markdown vocabulary
 * between modal and page; change once, applies everywhere.
 *
 * Props:
 *   readingItems  — Array<{ slug, title, attachedTo, minutes, content }>
 *   activeSlug    — string | null
 *   onSelectSlug  — (slug: string) => void
 *   tocWidth      — string  CSS width for the left rail; default '280px'
 *   maxProseWidth — string  CSS max-width for the markdown column;
 *                          default '68ch' (modal) — pages override to '76ch'
 */
export default function ReadingViewer({
  readingItems = [],
  activeSlug,
  onSelectSlug,
  tocWidth = '280px',
  maxProseWidth = '68ch',
}) {
  // Default to the first item if the requested slug doesn't exist.
  useEffect(() => {
    if (!readingItems.length) return;
    const valid = readingItems.find((r) => r.slug === activeSlug);
    if (!valid) onSelectSlug?.(readingItems[0].slug);
  }, [readingItems, activeSlug, onSelectSlug]);

  const active = useMemo(
    () => readingItems.find((r) => r.slug === activeSlug) || readingItems[0] || null,
    [readingItems, activeSlug],
  );

  return (
    <div className="flex flex-1 min-h-0 w-full">
      {/* Left: TOC */}
      <aside
        className="shrink-0 overflow-y-auto border-r"
        style={{ width: tocWidth, borderRightColor: 'var(--cream-hairline)' }}
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
                    onClick={() => onSelectSlug?.(item.slug)}
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
                          <span>
                            {Array.isArray(item.attachedTo)
                              ? `${item.attachedTo.length} slides`
                              : item.attachedTo}
                          </span>
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
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {active ? (
          <div
            className="reading-prose mx-auto"
            style={{
              maxWidth: maxProseWidth,
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
  );
}

/* Markdown component map — same vocabulary as PresenterNotesPane and
   AnticipatedQAPane. Tables/strikethrough/task-lists handled by remarkGfm;
   `==highlight==` transformed via the shared helper. */
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
