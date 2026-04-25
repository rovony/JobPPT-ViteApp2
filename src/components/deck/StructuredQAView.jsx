import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Search, ChevronDown, ChevronRight, X } from 'lucide-react';

/**
 * StructuredQAView — accordion-style list of anticipated questions with
 * a search/filter input at the top.
 *
 * Per spec (Notes-And-QA-Structure.md §2):
 *   • Each question is a `## QN: <question>` block with optional
 *     **From:** / **Difficulty:** ★…★★★★★ / **Topic:** metadata
 *   • Answer is the body text after the metadata
 *   • `> **If pressed:**` blockquote is the second-line defense
 *
 * UX choices:
 *   • Accordion — only one expanded at a time so the eye doesn't have
 *     to scroll past previous answers when looking for a hot question
 *   • Search filters by question text, asker (From), topic, and answer
 *     body (case-insensitive substring match)
 *   • Difficulty rendered as ★ glyphs in case color
 *   • Topic rendered as a small mono pill
 *   • Auto-expand the first match when the search filter narrows to 1
 */
export default function StructuredQAView({ questions = [] }) {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(questions[0]?.id ?? null);

  const filtered = useMemo(() => {
    if (!query.trim()) return questions;
    const q = query.trim().toLowerCase();
    return questions.filter((item) => {
      const blob = [item.question, item.from, item.topic, item.answer, item.ifPressed]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
  }, [questions, query]);

  // Auto-expand single match
  React.useEffect(() => {
    if (query && filtered.length === 1) setOpenId(filtered[0].id);
  }, [query, filtered]);

  return (
    <div className="flex flex-col gap-2">
      {/* Search */}
      <div
        className="flex items-center gap-2 px-2 py-1.5 rounded border"
        style={{ borderColor: 'var(--cream-hairline)', background: 'var(--cream-ghost)' }}
      >
        <Search className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--cream-faint)' }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions, askers, topics, answers…"
          className="flex-1 bg-transparent outline-none"
          style={{
            fontSize: '0.85rem',
            color: 'var(--cream)',
            fontFamily: 'var(--font-body)',
          }}
          aria-label="Search anticipated Q&A"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="h-5 w-5 rounded flex items-center justify-center hover:bg-[var(--panel)]"
            style={{ color: 'var(--cream-faint)' }}
          >
            <X className="w-3 h-3" />
          </button>
        )}
        <span
          className="deck-mono uppercase shrink-0 tabular-nums"
          style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
        >
          {filtered.length}/{questions.length}
        </span>
      </div>

      {/* Question list */}
      {filtered.length === 0 ? (
        <div
          className="px-2 py-3 text-center"
          style={{ fontSize: '0.85rem', color: 'var(--cream-faint)' }}
        >
          No questions match <code>{query}</code>.
        </div>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {filtered.map((q) => (
            <QARow
              key={q.id}
              q={q}
              open={openId === q.id}
              onToggle={() => setOpenId(openId === q.id ? null : q.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function QARow({ q, open, onToggle }) {
  return (
    <li
      className="rounded border"
      style={{ borderColor: open ? 'var(--case, var(--amber))' : 'var(--cream-hairline)' }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-start gap-2 px-2.5 py-2 text-left transition-colors hover:bg-[var(--cream-ghost)]"
      >
        {open
          ? <ChevronDown className="w-3.5 h-3.5 shrink-0 mt-1" style={{ color: 'var(--case, var(--amber))' }} />
          : <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-1" style={{ color: 'var(--cream-muted)' }} />}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span
              className="deck-mono shrink-0 tabular-nums"
              style={{
                fontSize: '0.6rem',
                letterSpacing: 'var(--ls-mono)',
                color: 'var(--cream-faint)',
              }}
            >
              Q{String(q.num).padStart(2, '0')}
            </span>
            {q.difficulty > 0 && <DifficultyStars n={q.difficulty} />}
            {q.topic && <TopicPill topic={q.topic} />}
          </div>
          <div
            className="mt-0.5"
            style={{ fontSize: '0.92rem', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.35 }}
          >
            {q.question}
          </div>
          {q.from && (
            <div
              className="mt-0.5"
              style={{ fontSize: '0.72rem', color: 'var(--cream-faint)' }}
            >
              from {q.from}
            </div>
          )}
        </div>
      </button>

      {open && (
        <div
          className="px-3 pb-3 pt-0 border-t"
          style={{ borderTopColor: 'var(--cream-hairline)' }}
        >
          {q.answer && (
            <div
              className="qa-answer mt-2"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.55,
                color: 'var(--cream)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={qaMarkdownComponents}>
                {q.answer}
              </ReactMarkdown>
            </div>
          )}
          {q.ifPressed && (
            <div
              className="mt-2 px-2.5 py-2 rounded"
              style={{
                background: 'color-mix(in srgb, var(--case, var(--amber)) 12%, transparent)',
                borderLeft: '2px solid var(--case, var(--amber))',
              }}
            >
              <div
                className="deck-mono uppercase mb-0.5"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--case, var(--amber))',
                }}
              >
                If pressed
              </div>
              <div
                className="qa-if-pressed"
                style={{
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: 'var(--cream-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={qaMarkdownComponents}>
                  {q.ifPressed}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

function DifficultyStars({ n }) {
  const filled = Math.min(5, Math.max(0, n));
  return (
    <span
      title={`Difficulty ${filled}/5`}
      aria-label={`Difficulty ${filled} of 5`}
      style={{
        fontSize: '0.7rem',
        letterSpacing: '0.06em',
        color: 'var(--case, var(--amber))',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {'★'.repeat(filled)}
      <span style={{ opacity: 0.25 }}>{'★'.repeat(5 - filled)}</span>
    </span>
  );
}

function TopicPill({ topic }) {
  return (
    <span
      className="deck-mono uppercase shrink-0 px-1.5 py-0.5 rounded border"
      style={{
        fontSize: '0.55rem',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--cream-muted)',
        borderColor: 'var(--cream-hairline)',
      }}
    >
      {topic}
    </span>
  );
}

const qaMarkdownComponents = {
  h1: ({ node, children, ...p }) => <h3 className="notes-h3" {...p}>{transform(children)}</h3>,
  h2: ({ node, children, ...p }) => <h3 className="notes-h3" {...p}>{transform(children)}</h3>,
  h3: ({ node, children, ...p }) => <h3 className="notes-h3" {...p}>{transform(children)}</h3>,
  p:  ({ node, children, ...p }) => <p  className="notes-p"  {...p}>{transform(children)}</p>,
  ul: ({ node, ...p }) => <ul className="notes-ul" {...p} />,
  ol: ({ node, ...p }) => <ol className="notes-ol" {...p} />,
  li: ({ node, children, ...p }) => <li className="notes-li" {...p}>{transform(children)}</li>,
  strong: ({ node, children, ...p }) => <strong className="notes-strong" {...p}>{transform(children)}</strong>,
  em:     ({ node, children, ...p }) => <em className="notes-em" {...p}>{transform(children)}</em>,
  blockquote: ({ node, ...p }) => <blockquote className="notes-quote" {...p} />,
  table:  ({ node, ...p }) => <div className="reading-table-wrap"><table className="reading-table" {...p} /></div>,
  th:     ({ node, ...p }) => <th className="reading-th" {...p} />,
  td:     ({ node, ...p }) => <td className="reading-td" {...p} />,
};

function transform(children) {
  return React.Children.map(children, (child, i) => {
    if (typeof child !== 'string') return child;
    if (!child.includes('==')) return child;
    const parts = child.split(/==([^=]+)==/g);
    return parts.map((p, j) =>
      j % 2 === 1
        ? <mark key={`${i}-${j}`} className="notes-mark">{p}</mark>
        : <React.Fragment key={`${i}-${j}`}>{p}</React.Fragment>
    );
  });
}
