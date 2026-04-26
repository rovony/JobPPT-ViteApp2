// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChevronDown, ChevronRight, Edit3, RotateCcw, HelpCircle } from 'lucide-react';
import { parseAnticipatedQA } from '@/lib/parseStructuredContent';
import { transformNotesInlineChildren } from '@/lib/notesInlineTransform';
import StructuredQAView from './StructuredQAView';

/**
 * AnticipatedQAPane — collapsible per-slide Q&A prep panel.
 *
 * Sits BELOW the speaker-notes textarea inside the Center column of the
 * Presenter view. Distinct from QAModerationPane (live audience-submitted
 * Q&A); this is private rehearsal content for the presenter.
 *
 * Behavior:
 *   • Header: "Q&A · N anticipated" or "Q&A · empty"
 *   • Auto-collapsed when the slide has no content (`countItems === 0` and
 *     not currently editing).
 *   • Auto-expanded when the slide has content. Per-slide manual collapse
 *     state is held only for the current slide (resets on slide change so
 *     the user always sees a fresh "what's prepped here?" view).
 *   • Renders the same markdown vocabulary as PresenterNotesPane:
 *     headings, bullets, blockquotes, **bold**, *italic*, ==highlight==.
 *
 * Props:
 *   value          — current markdown (override > static > '')
 *   onChange       — (text) → void; called per keystroke (debounced upstream)
 *   editing        — bool
 *   setEditing     — (bool) → void
 *   slideKey       — to reset per-slide collapse state on slide change
 *   itemCount      — number of `## Q:` occurrences (for header badge)
 *   hasOverride    — bool; flips the source badge
 *   onResetToFile  — () → void; revert override
 */
export default function AnticipatedQAPane({
  value,
  onChange,
  editing,
  setEditing,
  slideKey,
  itemCount = 0,
  hasOverride = false,
  onResetToFile,
  onShowHelp,
}) {
  const taRef = useRef(null);

  // Per-slide manual-collapse override. Resets when slide changes.
  // null = follow auto-rule; true/false = user override.
  const [manual, setManual] = useState(null);
  useEffect(() => { setManual(null); }, [slideKey]);

  const auto = itemCount > 0 || (typeof value === 'string' && value.trim().length > 0);
  const expanded = manual ?? auto;

  const toggle = () => setManual(!expanded);

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (editing && taRef.current) {
      taRef.current.focus();
      // Put caret at end so the user can keep adding without clearing
      const v = taRef.current.value;
      taRef.current.setSelectionRange(v.length, v.length);
    }
  }, [editing]);

  const headerLabel = itemCount > 0
    ? `Q&A · ${itemCount} anticipated`
    : (value && value.trim().length ? 'Q&A · draft' : 'Q&A · empty');

  return (
    <div
      className="flex h-full min-h-0 flex-col"
      style={{ borderTop: '1px solid var(--cream-hairline)', paddingTop: '0.5rem' }}
    >
      {/* ── Header bar ───────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between px-1 gap-2">
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-1.5 min-w-0 text-left transition-colors hover:opacity-80"
          aria-expanded={expanded}
          title={expanded ? 'Collapse anticipated Q&A' : 'Expand anticipated Q&A'}
        >
          {expanded
            ? <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--cream-muted)' }} />
            : <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--cream-muted)' }} />}
          <span
            className="deck-mono uppercase truncate"
            style={{
              fontSize: '0.62rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case, var(--amber))',
            }}
          >
            {headerLabel}
          </span>
        </button>
        <div className="flex items-center gap-1 shrink-0">
          {onShowHelp && (
            <button
              type="button"
              onClick={onShowHelp}
              title="Notes & Q&A authoring reference"
              aria-label="Open Notes & Q&A reference"
              className="h-6 w-6 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
              style={{ color: 'var(--cream-faint)' }}
            >
              <HelpCircle className="w-3 h-3" />
            </button>
          )}
          {hasOverride && onResetToFile && (
            <button
              type="button"
              onClick={onResetToFile}
              title="Revert to canonical Q&A from qa.js"
              aria-label="Revert to file"
              className="h-6 w-6 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
              style={{ color: 'var(--cream-muted)' }}
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
          {expanded && !editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              title="Edit anticipated Q&A"
              aria-label="Edit Q&A"
              className="h-6 w-6 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
              style={{ color: 'var(--cream-muted)' }}
            >
              <Edit3 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ── Body (markdown render OR editor) — fills column; scrolls inside */}
      {expanded && (
        <div className="mt-1.5 min-h-0 flex-1 overflow-y-auto px-1">
          {editing ? (
            <div className="flex flex-col gap-1">
              <textarea
                ref={taRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => setEditing(false)}
                placeholder={QA_PLACEHOLDER}
                className="w-full resize-y outline-none rounded p-2 border"
                style={{
                  minHeight: '12rem',
                  background: 'var(--panel)',
                  color: 'var(--cream)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  borderColor: 'var(--cream-hairline)',
                }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="deck-mono"
                  style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
                >
                  Use <code>## Q: …</code> per question; the count shows above.
                </span>
                <button
                  onClick={() => setEditing(false)}
                  className="deck-mono uppercase text-xs px-2 py-1 rounded"
                  style={{
                    color: 'var(--case, var(--amber))',
                    letterSpacing: 'var(--ls-mono)',
                    fontSize: '0.6rem',
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : value && value.trim().length ? (
            <QARenderer value={value} />
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-left w-full px-2 py-3 rounded border border-dashed transition-colors hover:bg-[var(--cream-ghost)]"
              style={{
                borderColor: 'var(--cream-hairline)',
                color: 'var(--cream-faint)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
              }}
            >
              No anticipated Q&A for this slide. Click to add — use <code>## Q:</code> per question.
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const QA_PLACEHOLDER = `## Q: <verbatim audience question>
**From:** <likely asker>
**Difficulty:** ★★★ · **Topic:** <one-word>

A: <prepared answer — keep tight; you'll read it under pressure>

> **If pressed:** <one-line backup or citation>

## Q: <next question>
A: <next answer>`;

/* QARenderer — choose between structured accordion+search view and raw-
   markdown fallback. The accordion lights up automatically when content
   uses the `## Q:` heading pattern; otherwise the raw markdown render
   path keeps working for legacy / freeform Q&A drafts. */
function QARenderer({ value }) {
  const parsed = useMemo(() => parseAnticipatedQA(value), [value]);
  if (parsed.structured) {
    return <StructuredQAView questions={parsed.questions} />;
  }
  return (
    <div
      className="notes-prose"
      style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.55 }}
    >
      <ReactMarkdown components={qaMarkdownComponents}>{value}</ReactMarkdown>
    </div>
  );
}

/* Markdown component map — same vocabulary as PresenterNotesPane.
   Reuses .notes-* classes from src/index.css so spacing, headings,
   blockquote, and ==highlight== look identical to speaker notes. */
const qaMarkdownComponents = {
  h1: ({ node, children, ...p }) => <h1 className="notes-h1" {...p}>{transformNotesInlineChildren(children)}</h1>,
  h2: ({ node, children, ...p }) => <h2 className="notes-h2" {...p}>{transformNotesInlineChildren(children)}</h2>,
  h3: ({ node, children, ...p }) => <h3 className="notes-h3" {...p}>{transformNotesInlineChildren(children)}</h3>,
  p:  ({ node, children, ...p }) => <p  className="notes-p"  {...p}>{transformNotesInlineChildren(children)}</p>,
  ul: ({ node, ...p }) => <ul className="notes-ul" {...p} />,
  ol: ({ node, ...p }) => <ol className="notes-ol" {...p} />,
  li: ({ node, children, ...p }) => <li className="notes-li" {...p}>{transformNotesInlineChildren(children)}</li>,
  strong: ({ node, children, ...p }) => <strong className="notes-strong" {...p}>{transformNotesInlineChildren(children)}</strong>,
  em:     ({ node, children, ...p }) => <em className="notes-em" {...p}>{transformNotesInlineChildren(children)}</em>,
  blockquote: ({ node, ...p }) => <blockquote className="notes-quote" {...p} />,
};
