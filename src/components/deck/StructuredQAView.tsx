// @ts-nocheck
import React, { useMemo, useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Search, ChevronDown, ChevronRight, X, SlidersHorizontal, Eye, EyeOff } from 'lucide-react';
import { useQADensity, QA_DENSITY_FIELDS, QA_DENSITY_PRESETS } from '@/lib/useQADensity';
import { transformNotesInlineChildren } from '@/lib/notesInlineTransform';

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
  const [openId, setOpenId] = useState(null);
  const [densityOpen, setDensityOpen] = useState(false);
  const { density, toggle, setPreset, matchedPreset } = useQADensity();

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
      {/* Search + density */}
      <div className="flex items-center gap-1.5">
        <div
          className="flex flex-1 items-center gap-2 px-2 py-1.5 rounded border"
          style={{ borderColor: 'var(--cream-hairline)', background: 'var(--cream-ghost)' }}
        >
          <Search className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--cream-faint)' }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, askers, topics, answers…"
            className="flex-1 bg-transparent outline-none min-w-0"
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
        <DensityButton
          open={densityOpen}
          setOpen={setDensityOpen}
          density={density}
          toggle={toggle}
          setPreset={setPreset}
          matchedPreset={matchedPreset}
        />
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
              density={density}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function QARow({ q, open, onToggle, density }) {
  // Sane defaults for legacy callers — fall back to "show everything"
  // so an undefined density doesn't accidentally hide fields.
  const d = density || {
    showNumber: true, showStars: true, showTopic: true,
    showAsker: true, showAnswerPreview: true,
  };
  // Always show the number when collapsed even if the user's chosen
  // ALL fields off — without it, rows are unidentifiable and the
  // search-result count (filtered/total) loses its anchor. Number is
  // genuinely the load-bearing field.
  const showNumberEffective = d.showNumber || (!d.showStars && !d.showTopic && !d.showAsker);

  // Strip a one-line preview from the answer body when collapsed —
  // first sentence (or first ~120 chars), no markdown formatting.
  const answerPreview = (() => {
    if (!d.showAnswerPreview || open) return '';
    const raw = (q.answer || '').replace(/[*_`>#\-]/g, '').replace(/\s+/g, ' ').trim();
    if (!raw) return '';
    const firstSentence = raw.split(/(?<=[.!?])\s/)[0];
    return firstSentence.length > 130 ? firstSentence.slice(0, 127) + '…' : firstSentence;
  })();

  // Hide the metadata strip entirely if NOTHING in it is enabled —
  // saves a row of vertical whitespace.
  const showMetaStrip =
    showNumberEffective ||
    (d.showStars && q.difficulty > 0) ||
    (d.showTopic && q.topic);

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
          {showMetaStrip && (
            <div className="flex items-baseline gap-2 flex-wrap">
              {showNumberEffective && (
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
              )}
              {d.showStars && q.difficulty > 0 && <DifficultyStars n={q.difficulty} />}
              {d.showTopic && q.topic && <TopicPill topic={q.topic} />}
            </div>
          )}
          <div
            className="mt-0.5"
            style={{ fontSize: '0.92rem', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.35 }}
          >
            {q.question}
          </div>
          {d.showAsker && q.from && (
            <div
              className="mt-0.5"
              style={{ fontSize: '0.72rem', color: 'var(--cream-faint)' }}
            >
              from {q.from}
            </div>
          )}
          {answerPreview && (
            <div
              className="mt-1 truncate"
              style={{
                fontSize: '0.78rem',
                color: 'var(--cream-muted)',
                lineHeight: 1.4,
                fontStyle: 'italic',
              }}
              title={q.answer}
            >
              {answerPreview}
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
  h1: ({ node, children, ...p }) => <h3 className="notes-h3" {...p}>{transformNotesInlineChildren(children)}</h3>,
  h2: ({ node, children, ...p }) => <h3 className="notes-h3" {...p}>{transformNotesInlineChildren(children)}</h3>,
  h3: ({ node, children, ...p }) => <h3 className="notes-h3" {...p}>{transformNotesInlineChildren(children)}</h3>,
  p:  ({ node, children, ...p }) => <p  className="notes-p"  {...p}>{transformNotesInlineChildren(children)}</p>,
  ul: ({ node, ...p }) => <ul className="notes-ul" {...p} />,
  ol: ({ node, ...p }) => <ol className="notes-ol" {...p} />,
  li: ({ node, children, ...p }) => <li className="notes-li" {...p}>{transformNotesInlineChildren(children)}</li>,
  strong: ({ node, children, ...p }) => <strong className="notes-strong" {...p}>{transformNotesInlineChildren(children)}</strong>,
  em:     ({ node, children, ...p }) => <em className="notes-em" {...p}>{transformNotesInlineChildren(children)}</em>,
  blockquote: ({ node, ...p }) => <blockquote className="notes-quote" {...p} />,
  table:  ({ node, ...p }) => <div className="reading-table-wrap"><table className="reading-table" {...p} /></div>,
  th:     ({ node, ...p }) => <th className="reading-th" {...p} />,
  td:     ({ node, ...p }) => <td className="reading-td" {...p} />,
};

/* ============================================================
 * DensityButton — popover with row-density toggles + presets
 * ============================================================ */
function DensityButton({ open, setOpen, density, toggle, setPreset, matchedPreset }) {
  const wrapRef = useRef(null);

  // Click-outside / Esc to close.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey, true);
    };
  }, [open, setOpen]);

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        title="Customize what shows in collapsed rows"
        aria-label="Q&A row density settings"
        aria-expanded={open}
        className="h-[34px] w-[34px] rounded border flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
        style={{
          borderColor: open ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
          color: open ? 'var(--case, var(--amber))' : 'var(--cream-muted)',
        }}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 rounded-lg border shadow-xl"
          style={{
            background: 'var(--panel)',
            borderColor: 'var(--cream-hairline)',
            minWidth: 260,
            padding: 'var(--space-2)',
            zIndex: 50,
          }}
        >
          {/* Preset row */}
          <div
            className="deck-mono uppercase px-2 pt-1 pb-1.5"
            style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
          >
            Preset
          </div>
          <div className="flex items-center gap-1 px-1 mb-2">
            {QA_DENSITY_PRESETS.map((name) => {
              const active = matchedPreset === name;
              return (
                <button
                  key={name}
                  onClick={() => setPreset(name)}
                  className="deck-mono uppercase flex-1 px-2 py-1 rounded transition-colors"
                  style={{
                    background: active ? 'var(--case, var(--amber))' : 'transparent',
                    color: active ? 'var(--bg)' : 'var(--cream-muted)',
                    border: `1px solid ${active ? 'var(--case, var(--amber))' : 'var(--cream-hairline)'}`,
                    fontSize: '0.58rem',
                    letterSpacing: 'var(--ls-mono)',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <div
            className="deck-mono uppercase px-2 pt-1 pb-1.5"
            style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
          >
            Show in collapsed rows
          </div>
          <ul className="flex flex-col gap-0.5">
            {QA_DENSITY_FIELDS.map(({ key, label, hint }) => {
              const on = density[key];
              return (
                <li key={key}>
                  <button
                    onClick={() => toggle(key)}
                    role="menuitemcheckbox"
                    aria-checked={on}
                    className="w-full flex items-start gap-2 px-2 py-1.5 rounded text-left transition-colors hover:bg-[var(--cream-ghost)]"
                  >
                    {on
                      ? <Eye className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--case, var(--amber))' }} />
                      : <EyeOff className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--cream-faint)' }} />}
                    <div className="flex-1 min-w-0">
                      <div style={{
                        color: on ? 'var(--cream)' : 'var(--cream-muted)',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                      }}>
                        {label}
                      </div>
                      <div
                        className="deck-mono"
                        style={{
                          fontSize: '0.55rem',
                          letterSpacing: 'var(--ls-mono)',
                          color: 'var(--cream-faint)',
                          marginTop: 1,
                        }}
                      >
                        {hint}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            className="px-2 pt-2 pb-1 deck-mono"
            style={{
              fontSize: '0.55rem',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-faint)',
              lineHeight: 1.5,
            }}
          >
            The expanded answer always shows everything. These toggles
            only change how compact each row is when collapsed.
          </div>
        </div>
      )}
    </div>
  );
}
