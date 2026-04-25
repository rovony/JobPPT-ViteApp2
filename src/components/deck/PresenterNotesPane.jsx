import React, { useRef, useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bold, Italic, Highlighter, List, ListOrdered, Heading1, Heading2, Quote, Type, Minus, Plus, RotateCcw } from 'lucide-react';
import { parseStructuredNotes } from '@/lib/parseStructuredContent';
import StructuredNotesView from './StructuredNotesView';

/**
 * PresenterNotesPane — reading-optimized speaker notes for dual-screen use.
 *
 * Design goals (vs. the old compact editor):
 *   • Centered reading column (max-width 62ch) — no long lines.
 *   • Large, adjustable type (A− / A+, persisted in localStorage).
 *   • Generous line-height & paragraph spacing — eyes-up delivery.
 *   • ==highlight== chunks use --case and render as the most prominent
 *     visual beat so the presenter can find their cue at a glance.
 *   • Auto-scrolls back to top whenever the active slide changes.
 *
 * Editing preserves all existing features: markdown toolbar, autosave.
 */
const SIZE_STEPS = [14, 16, 18, 20, 22, 24, 28];
const DEFAULT_SIZE_IDX = 3; // 20px

export default function PresenterNotesPane({
  value, onChange, editing, setEditing, placeholder, slideKey,
  hasOverride = false, onResetToFile,
}) {
  const taRef = useRef(null);
  const scrollerRef = useRef(null);

  // Persisted type size
  const [sizeIdx, setSizeIdx] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_SIZE_IDX;
    const v = parseInt(localStorage.getItem('presenter:notes-size') || '', 10);
    return Number.isFinite(v) && v >= 0 && v < SIZE_STEPS.length ? v : DEFAULT_SIZE_IDX;
  });
  useEffect(() => { localStorage.setItem('presenter:notes-size', String(sizeIdx)); }, [sizeIdx]);

  const px = SIZE_STEPS[sizeIdx];

  // Auto-scroll to top when slide changes (so the presenter always starts reading from the top)
  useEffect(() => { if (scrollerRef.current) scrollerRef.current.scrollTop = 0; }, [slideKey]);

  /* ----- Markdown wrap helpers (shared with old editor) ----- */
  const wrap = (before, after = before, blockPrefix) => {
    const ta = taRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value: v } = ta;
    let nextValue, caret;
    if (blockPrefix) {
      const lineStart = v.lastIndexOf('\n', s - 1) + 1;
      const block = v.slice(lineStart, e);
      const prefixed = block
        .split('\n')
        .map((line) => (line.startsWith(blockPrefix) ? line : blockPrefix + line))
        .join('\n');
      nextValue = v.slice(0, lineStart) + prefixed + v.slice(e);
      caret = lineStart + prefixed.length;
    } else {
      const inner = v.slice(s, e) || 'text';
      nextValue = v.slice(0, s) + before + inner + after + v.slice(e);
      caret = s + before.length + inner.length;
    }
    onChange(nextValue);
    requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(caret, caret); });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 rounded-md border"
         style={{ borderColor: 'var(--cream-hairline)', background: 'var(--panel)' }}>

      {/* Controls bar — size + edit toggle (always visible) */}
      <div className="flex items-center justify-between px-3 py-2 border-b"
           style={{ borderColor: 'var(--cream-hairline)' }}>
        <div className="flex items-center gap-1">
          <Type className="w-3.5 h-3.5" style={{ color: 'var(--cream-faint)' }} />
          <IconBtn
            onClick={() => setSizeIdx(Math.max(0, sizeIdx - 1))}
            disabled={sizeIdx === 0}
            label="Smaller text"
          ><Minus className="w-3.5 h-3.5" /></IconBtn>
          <span className="deck-mono tabular-nums" style={{ color: 'var(--cream-muted)', fontSize: '0.7rem', minWidth: 28, textAlign: 'center' }}>
            {px}
          </span>
          <IconBtn
            onClick={() => setSizeIdx(Math.min(SIZE_STEPS.length - 1, sizeIdx + 1))}
            disabled={sizeIdx === SIZE_STEPS.length - 1}
            label="Larger text"
          ><Plus className="w-3.5 h-3.5" /></IconBtn>
        </div>

        {editing ? (
          <EditorToolbar wrap={wrap} onDone={() => setEditing(false)} />
        ) : (
          <div className="flex items-center gap-1.5">
            <SourceBadge hasOverride={hasOverride} />
            {hasOverride && onResetToFile && (
              <button
                onClick={onResetToFile}
                title="Discard local edit and restore the canonical note from notes.js"
                className="deck-mono uppercase text-xs px-2 py-1 rounded flex items-center gap-1.5 transition-colors hover:bg-[var(--cream-ghost)]"
                style={{ color: 'var(--cream-muted)', letterSpacing: 'var(--ls-mono)', fontSize: '0.65rem' }}
              >
                <RotateCcw className="w-3 h-3" /> Reset to file
              </button>
            )}
            <button
              onClick={() => setEditing(true)}
              className="deck-mono uppercase text-xs px-2 py-1 rounded transition-colors hover:bg-[var(--cream-ghost)]"
              style={{ color: 'var(--cream-muted)', letterSpacing: 'var(--ls-mono)', fontSize: '0.65rem' }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      {editing ? (
        <textarea
          ref={taRef}
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-h-[220px] w-full p-6 resize-none outline-none"
          style={{
            background: 'transparent',
            color: 'var(--cream)',
            fontFamily: 'var(--font-mono)',
            fontSize: `${Math.max(14, px - 4)}px`,
            lineHeight: 1.6,
          }}
        />
      ) : (
        <div
          ref={scrollerRef}
          className="flex-1 min-h-[220px] w-full overflow-y-auto px-6 py-8"
          style={{ color: value ? 'var(--cream)' : 'var(--cream-faint)' }}
        >
          <div
            className="mx-auto notes-prose notes-prose--reading"
            style={{
              maxWidth: '62ch',
              fontSize: `${px}px`,
              lineHeight: 1.65,
            }}
          >
            {value ? (
              <NotesRenderer value={value} fontSizePx={px} />
            ) : (
              <div
                onClick={() => setEditing(true)}
                className="cursor-text"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {placeholder}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================
   NotesRenderer — chooses between structured (Spoken/Cues/
   Bridge) and raw-markdown render paths based on whether
   the content matches the spec from Notes-And-QA-Structure.md.
   Legacy notes that pre-date the spec keep working untouched.
   ======================================================== */
function NotesRenderer({ value, fontSizePx }) {
  const parsed = useMemo(() => parseStructuredNotes(value), [value]);
  if (parsed.structured) {
    return <StructuredNotesView spoken={parsed.spoken} cues={parsed.cues} bridge={parsed.bridge} fontSizePx={fontSizePx} />;
  }
  return <ReactMarkdown components={markdownComponents}>{value}</ReactMarkdown>;
}

/* ========================================================
   Markdown components — shared with compact editor, but
   with more generous spacing via .notes-prose--reading.
   ======================================================== */
const markdownComponents = {
  h1: ({ node, children, ...p }) => <h1 className="notes-h1" {...p}>{transform(children)}</h1>,
  h2: ({ node, children, ...p }) => <h2 className="notes-h2" {...p}>{transform(children)}</h2>,
  h3: ({ node, children, ...p }) => <h3 className="notes-h3" {...p}>{transform(children)}</h3>,
  p:  ({ node, children, ...p }) => <p  className="notes-p"  {...p}>{transform(children)}</p>,
  ul: ({ node, ...p }) => <ul className="notes-ul" {...p} />,
  ol: ({ node, ...p }) => <ol className="notes-ol" {...p} />,
  li: ({ node, children, ...p }) => <li className="notes-li" {...p}>{transform(children)}</li>,
  strong: ({ node, children, ...p }) => <strong className="notes-strong" {...p}>{transform(children)}</strong>,
  em:     ({ node, children, ...p }) => <em className="notes-em" {...p}>{transform(children)}</em>,
  blockquote: ({ node, ...p }) => <blockquote className="notes-quote" {...p} />,
  code: ({ node, ...p }) => <code className="notes-code" {...p} />,
};

/** ==highlight== → <mark> wrapping (no rehype-raw). */
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

/* ========================================================
   Inline editor toolbar
   ======================================================== */
function EditorToolbar({ wrap, onDone }) {
  const btns = [
    { fn: () => wrap('', '', '# '),  icon: Heading1,    label: 'Heading 1' },
    { fn: () => wrap('', '', '## '), icon: Heading2,    label: 'Heading 2' },
    { sep: true },
    { fn: () => wrap('**'),          icon: Bold,        label: 'Bold' },
    { fn: () => wrap('*'),           icon: Italic,      label: 'Italic' },
    { fn: () => wrap('=='),          icon: Highlighter, label: 'Highlight' },
    { sep: true },
    { fn: () => wrap('', '', '- '),  icon: List,        label: 'Bulleted list' },
    { fn: () => wrap('', '', '1. '), icon: ListOrdered, label: 'Numbered list' },
    { fn: () => wrap('', '', '> '),  icon: Quote,       label: 'Quote' },
  ];
  return (
    <div className="flex items-center gap-0.5">
      {btns.map((b, i) => b.sep ? (
        <span key={i} className="mx-1 h-4 w-px" style={{ background: 'var(--cream-hairline)' }} />
      ) : (
        <button
          key={i}
          type="button"
          onMouseDown={(e) => { e.preventDefault(); b.fn(); }}
          title={b.label}
          aria-label={b.label}
          className="h-7 w-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
          style={{ color: 'var(--cream-muted)' }}
        >
          <b.icon className="w-3.5 h-3.5" />
        </button>
      ))}
      <span className="mx-1 h-4 w-px" style={{ background: 'var(--cream-hairline)' }} />
      <button
        onClick={onDone}
        className="deck-mono uppercase text-xs px-2 py-1 rounded"
        style={{ color: 'var(--case, var(--amber))', letterSpacing: 'var(--ls-mono)', fontSize: '0.65rem' }}
      >
        Done
      </button>
    </div>
  );
}

/**
 * SourceBadge — tiny indicator showing whether the visible note is the
 * canonical static markdown from notes.js or a per-device live override
 * stored in localStorage. Helps the presenter know what they're reading
 * before they edit.
 */
function SourceBadge({ hasOverride }) {
  const label = hasOverride ? 'Live edit' : 'From file';
  const color = hasOverride ? 'var(--case, var(--amber))' : 'var(--cream-faint)';
  return (
    <span
      className="deck-mono uppercase tabular-nums px-1.5 py-0.5 rounded border"
      style={{
        fontSize: '0.55rem',
        letterSpacing: 'var(--ls-mono-wide)',
        color,
        borderColor: hasOverride ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
        opacity: hasOverride ? 1 : 0.7,
      }}
      title={
        hasOverride
          ? 'You have a local edit for this slide. It overrides the canonical note in notes.js and persists across reloads on this device.'
          : 'Showing the canonical speaker note from src/decks/<deck>/notes.js.'
      }
    >
      {label}
    </span>
  );
}

function IconBtn({ children, onClick, disabled, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="h-6 w-6 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)] disabled:opacity-30"
      style={{ color: 'var(--cream-muted)' }}
    >
      {children}
    </button>
  );
}