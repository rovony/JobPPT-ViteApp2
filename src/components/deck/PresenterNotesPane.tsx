// @ts-nocheck
import React, { useRef, useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bold, Italic, Highlighter, List, ListOrdered, Heading1, Heading2, Quote, Type, Minus, Plus, RotateCcw,
  SlidersHorizontal, Eye, EyeOff, BookOpen, Pencil, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useDeck } from '@/lib/deck-store';
import { parseStructuredNotes } from '@/lib/parseStructuredContent';
import { transformNotesInlineChildren } from '@/lib/notesInlineTransform';
import {
  useNotesSectionVisibility,
  NOTES_SECTION_FIELDS,
  NOTES_VIEW_PRESETS,
  NOTES_PRESET_LABEL,
} from '@/lib/useNotesSectionVisibility';
import StructuredNotesView from './StructuredNotesView';

/**
 * PresenterNotesPane — reading-optimized speaker notes for dual-screen use.
 *
 * Design goals (vs. the old compact editor):
 *   • Centered reading column (max ~76ch, min(100%, …)) — readable line
 *     length without huge side gutters on wide presenter columns.
 *   • Large, adjustable type (A− / A+, persisted in localStorage).
 *   • Generous line-height & paragraph spacing — eyes-up delivery.
 *   • ==highlight== chunks use --case and render as the most prominent
 *     visual beat so the presenter can find their cue at a glance.
 *   • Auto-scrolls back to top whenever the active slide changes.
 *   • Top bar (right): View (structured notes), book icon → full reference
 *     modal (markers, Spoken / Cues / Bridge), Pencil → Edit.
 *
 * Editing preserves all existing features: markdown toolbar, autosave.
 */
const SIZE_STEPS = [14, 16, 18, 20, 22, 24, 28];
const DEFAULT_SIZE_IDX = 3; // 20px

export default function PresenterNotesPane({
  value, onChange, editing, setEditing, placeholder, slideKey,
  hasOverride = false, onResetToFile,
  onShowHelp,
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

  const parsed = useMemo(() => parseStructuredNotes(value || ''), [value]);
  const { visibility: sectionVisibility, toggle: toggleNoteSection, setPreset: setNotesViewPreset, matchedPreset: notesViewPreset } =
    useNotesSectionVisibility();

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

      {/* Controls — text size (left); View / source / help / edit (right) */}
      <div
        className="flex items-center justify-between gap-2 px-2 sm:px-3 py-2 border-b flex-wrap"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <div className="flex items-center gap-1 shrink-0">
          <Type className="w-3.5 h-3.5" style={{ color: 'var(--cream-faint)' }} />
          <IconBtn
            onClick={() => setSizeIdx(Math.max(0, sizeIdx - 1))}
            disabled={sizeIdx === 0}
            label="Smaller text"
          ><Minus className="w-3.5 h-3.5" /></IconBtn>
          <span
            className="deck-mono tabular-nums"
            style={{ color: 'var(--cream-muted)', fontSize: '0.7rem', minWidth: 28, textAlign: 'center' }}
          >
            {px}
          </span>
          <IconBtn
            onClick={() => setSizeIdx(Math.min(SIZE_STEPS.length - 1, sizeIdx + 1))}
            disabled={sizeIdx === SIZE_STEPS.length - 1}
            label="Larger text"
          ><Plus className="w-3.5 h-3.5" /></IconBtn>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 ml-auto min-w-0 flex-wrap justify-end">
          {editing && onShowHelp && (
            <IconBtn
              onClick={onShowHelp}
              label="Open reference — ==highlight==, Spoken, Cues, Bridge, and Q&A structure"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </IconBtn>
          )}
          {editing && <EditorToolbar wrap={wrap} onDone={() => setEditing(false)} />}

          {!editing && (
            <>
              {parsed.structured && (
                <NotesViewMenu
                  sectionVisibility={sectionVisibility}
                  toggle={toggleNoteSection}
                  setPreset={setNotesViewPreset}
                  matchedPreset={notesViewPreset}
                />
              )}
              <SourceBadge hasOverride={hasOverride} />
              {hasOverride && onResetToFile && (
                <button
                  type="button"
                  onClick={onResetToFile}
                  title="Discard local edit and restore the canonical note from notes.js"
                  className="flex items-center gap-1 rounded px-1.5 py-1 transition-colors hover:bg-[var(--cream-ghost)] shrink-0"
                  style={{ color: 'var(--cream-muted)' }}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="deck-mono uppercase hidden sm:inline" style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)' }}>
                    Reset
                  </span>
                </button>
              )}
              {onShowHelp && (
                <IconBtn
                  onClick={onShowHelp}
                  label="Open reference — highlights, Spoken / Cues / Bridge, pauses, and Q&A format"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </IconBtn>
              )}
              <button
                type="button"
                onClick={() => setEditing(true)}
                title="Edit speaker notes"
                className="h-7 flex items-center gap-1 rounded border px-1.5 transition-colors hover:bg-[var(--cream-ghost)]"
                style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)' }}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span className="deck-mono uppercase hidden sm:inline" style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)' }}>
                  Edit
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      {editing ? (
        <textarea
          ref={taRef}
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-h-[220px] w-full p-3 sm:p-4 resize-none outline-none"
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
          className="flex-1 min-h-[220px] w-full overflow-y-auto px-2 sm:px-3 py-4 sm:py-5"
          style={{ color: value ? 'var(--cream)' : 'var(--cream-faint)' }}
        >
          <div
            className="mx-auto w-full notes-prose notes-prose--reading"
            style={{
              maxWidth: 'min(100%, 76ch)',
              fontSize: `${px}px`,
              lineHeight: 1.65,
            }}
          >
            {value ? (
              <NotesRenderer
                value={value}
                fontSizePx={px}
                parsed={parsed}
                sectionVisibility={sectionVisibility}
              />
            ) : (
              <div
                onClick={() => setEditing(true)}
                className="cursor-text"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {placeholder}
              </div>
            )}

            <InlineNav />
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================
   InlineNav — secondary Prev / Next at the bottom of the
   notes scroll area so the presenter can advance without
   scrolling back up to the main nav bar.
   ======================================================== */
function InlineNav() {
  const { prev, next, index, total } = useDeck();
  return (
    <div
      className="flex items-center justify-between gap-3 mt-6 pt-4 border-t"
      style={{ borderColor: 'var(--cream-hairline)' }}
    >
      <button
        type="button"
        onClick={prev}
        disabled={index === 0}
        className="flex items-center gap-1.5 h-8 px-3 rounded-full border transition-colors disabled:opacity-25 hover:bg-[var(--cream-ghost)]"
        style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)' }}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="deck-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono-wide)' }}>Prev</span>
      </button>
      <span
        className="deck-mono tabular-nums"
        style={{ fontSize: '0.6rem', color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono)' }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <button
        type="button"
        onClick={next}
        disabled={index === total - 1}
        className="flex items-center gap-1.5 h-8 px-3 rounded-full border transition-colors disabled:opacity-25 hover:bg-[var(--cream-ghost)]"
        style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)' }}
      >
        <span className="deck-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono-wide)' }}>Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ========================================================
   NotesRenderer — chooses between structured (Spoken/Cues/
   Bridge) and raw-markdown render paths based on whether
   the content matches the spec from Notes-And-QA-Structure.md.
   Legacy notes that pre-date the spec keep working untouched.
   ======================================================== */
function NotesRenderer({ value, fontSizePx, parsed, sectionVisibility }) {
  if (parsed.structured) {
    return (
      <StructuredNotesView
        spoken={parsed.spoken}
        cues={parsed.cues}
        bridge={parsed.bridge}
        fontSizePx={fontSizePx}
        sectionVisibility={sectionVisibility}
      />
    );
  }
  return <ReactMarkdown components={markdownComponents}>{value}</ReactMarkdown>;
}

/* ========================================================
   Markdown components — shared with compact editor, but
   with more generous spacing via .notes-prose--reading.
   ======================================================== */
const markdownComponents = {
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
  code: ({ node, ...p }) => <code className="notes-code" {...p} />,
};

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
/**
 * NotesViewMenu — which structured blocks (Spoken / Cues / Bridge) render.
 * Persists with useNotesSectionVisibility (same device as Q&A density).
 * Dropdown aligns right under the control cluster.
 */
function NotesViewMenu({ sectionVisibility, toggle, setPreset, matchedPreset }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

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
  }, [open]);

  return (
    <div ref={wrapRef} className="relative flex items-center gap-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Show or hide Spoken, Cues, and Bridge"
        aria-label="Speaker notes view options"
        aria-expanded={open}
        className="h-7 px-1.5 rounded border flex items-center gap-1 transition-colors hover:bg-[var(--cream-ghost)]"
        style={{
          borderColor: open ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
          color: open ? 'var(--case, var(--amber))' : 'var(--cream-muted)',
        }}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span className="deck-mono uppercase hidden sm:inline" style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)' }}>
          View
        </span>
        {matchedPreset && matchedPreset !== 'custom' && (
          <span
            className="deck-mono tabular-nums hidden md:inline"
            style={{ fontSize: '0.5rem', opacity: 0.85, letterSpacing: 'var(--ls-mono)' }}
          >
            · {NOTES_PRESET_LABEL[matchedPreset] || matchedPreset}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 rounded-lg border shadow-xl"
          style={{
            background: 'var(--panel)',
            borderColor: 'var(--cream-hairline)',
            minWidth: 268,
            padding: '0.5rem 0.65rem 0.65rem',
          }}
        >
          <div
            className="deck-mono uppercase px-1 pb-1.5"
            style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
          >
            Presets
          </div>
          <div className="flex flex-wrap gap-1 px-0.5 mb-2">
            {NOTES_VIEW_PRESETS.map((id) => {
              const active = matchedPreset === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPreset(id)}
                  className="deck-mono uppercase px-2 py-0.5 rounded transition-colors"
                  style={{
                    background: active ? 'color-mix(in srgb, var(--case, var(--amber)) 20%, transparent)' : 'transparent',
                    color: active ? 'var(--case, var(--amber))' : 'var(--cream-muted)',
                    border: `1px solid ${active ? 'var(--case, var(--amber))' : 'var(--cream-hairline)'}`,
                    fontSize: '0.55rem',
                    letterSpacing: 'var(--ls-mono)',
                  }}
                >
                  {NOTES_PRESET_LABEL[id] || id}
                </button>
              );
            })}
          </div>
          <div
            className="deck-mono uppercase px-1 pt-0.5 pb-1"
            style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
          >
            Sections
          </div>
          <ul className="flex flex-col gap-0.5 p-0 m-0 list-none">
            {NOTES_SECTION_FIELDS.map(({ key, label, hint }) => {
              const on = sectionVisibility[key];
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className="w-full flex items-center gap-2 rounded px-1.5 py-1.5 text-left transition-colors hover:bg-[var(--cream-ghost)]"
                    title={hint}
                  >
                    {on ? (
                      <Eye className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--case, var(--amber))' }} />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--cream-faint)' }} />
                    )}
                    <span style={{ fontSize: '0.78rem', color: 'var(--cream)', fontWeight: 500 }}>{label}</span>
                    <span className="ml-auto deck-mono" style={{ fontSize: '0.55rem', color: 'var(--cream-faint)' }}>
                      {on ? 'on' : 'off'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 px-1" style={{ fontSize: '0.62rem', lineHeight: 1.4, color: 'var(--cream-faint)' }}>
            Bridge = segue to the <em>next</em> slide, not the talk’s “regulatory bridge” slides. Cues stay collapsible
            when on.
          </p>
        </div>
      )}
    </div>
  );
}

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
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="h-7 w-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)] disabled:opacity-30 shrink-0"
      style={{ color: 'var(--cream-muted)' }}
    >
      {children}
    </button>
  );
}
