import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bold, Italic, Highlighter, List, ListOrdered, Heading1, Heading2, Quote, Type, Minus, Plus, RotateCcw,
  SlidersHorizontal, Eye, EyeOff, BookOpen, Pencil, ChevronLeft, ChevronRight, Maximize2,
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
 * Design goals:
 *   • Centered reading column (max ~76ch) — readable line length.
 *   • Large, adjustable type (A− / A+, persisted in localStorage).
 *   • Generous line-height & paragraph spacing — eyes-up delivery.
 *   • ==highlight== chunks render as the most prominent visual beat.
 *   • Auto-scrolls back to top whenever the active slide changes.
 *   • Floating prev/next arrows on sides for quick navigation.
 *   • Unified Settings menu: Edit, View sections, Help, Reset.
 */
const SIZE_STEPS = [14, 16, 18, 20, 22, 24, 28];
const DEFAULT_SIZE_IDX = 3; // 20px
const AUTO_FIT_MIN = 10;
const AUTO_FIT_MAX = 42;

export default function PresenterNotesPane({
  value, onChange, editing, setEditing, placeholder, slideKey,
  hasOverride = false, onResetToFile,
  onShowHelp,
}) {
  const taRef = useRef(null);
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);

  const [autoFit, setAutoFit] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('presenter:notes-autofit') === '1';
  });
  const [autoFitPx, setAutoFitPx] = useState(20);

  const [sizeIdx, setSizeIdx] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_SIZE_IDX;
    const v = parseInt(localStorage.getItem('presenter:notes-size') || '', 10);
    return Number.isFinite(v) && v >= 0 && v < SIZE_STEPS.length ? v : DEFAULT_SIZE_IDX;
  });
  useEffect(() => { localStorage.setItem('presenter:notes-size', String(sizeIdx)); }, [sizeIdx]);
  useEffect(() => { localStorage.setItem('presenter:notes-autofit', autoFit ? '1' : '0'); }, [autoFit]);

  const px = autoFit ? autoFitPx : SIZE_STEPS[sizeIdx];

  const parsed = useMemo(() => parseStructuredNotes(value || ''), [value]);
  const { visibility: sectionVisibility, toggle: toggleNoteSection, setPreset: setNotesViewPreset, matchedPreset: notesViewPreset } =
    useNotesSectionVisibility();

  useEffect(() => { if (scrollerRef.current) scrollerRef.current.scrollTop = 0; }, [slideKey]);

  // Auto-fit: binary search for the largest font size that fits without scrolling.
  // Uses a CSS custom property (--notes-fs) so all children — including
  // StructuredNotesView sections — pick up the trial size during measurement.
  const runAutoFit = useCallback(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller || !content || !autoFit || editing) return;

    const containerH = scroller.clientHeight;
    const padY = 40;
    const available = containerH - padY;
    if (available < 50) return;

    let lo = AUTO_FIT_MIN, hi = AUTO_FIT_MAX, best = lo;
    while (lo <= hi) {
      const mid = Math.round((lo + hi) / 2);
      content.style.setProperty('--notes-fs', `${mid}px`);
      content.style.fontSize = `${mid}px`;
      const contentH = content.scrollHeight;
      if (contentH <= available) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    content.style.setProperty('--notes-fs', `${best}px`);
    content.style.fontSize = `${best}px`;
    setAutoFitPx(best);
  }, [autoFit, editing]);

  useEffect(() => { runAutoFit(); }, [runAutoFit, value, slideKey, sectionVisibility]);

  // Re-run on container resize
  useEffect(() => {
    if (!autoFit || editing) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const ro = new ResizeObserver(() => runAutoFit());
    ro.observe(scroller);
    return () => ro.disconnect();
  }, [autoFit, editing, runAutoFit]);

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

      {/* Top bar: text size (left), unified settings (right) */}
      <div
        className="flex items-center justify-between gap-2 px-2 sm:px-3 py-2 border-b flex-wrap"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <div className="flex items-center gap-1 shrink-0">
          <Type className="w-3.5 h-3.5" style={{ color: 'var(--cream-faint)' }} />
          <IconBtn
            onClick={() => { setAutoFit(false); setSizeIdx(Math.max(0, sizeIdx - 1)); }}
            disabled={sizeIdx === 0 && !autoFit}
            label="Smaller text"
          ><Minus className="w-3.5 h-3.5" /></IconBtn>
          <span
            className="deck-mono tabular-nums"
            style={{ color: autoFit ? 'var(--case, var(--amber))' : 'var(--cream-muted)', fontSize: '0.7rem', minWidth: 28, textAlign: 'center' }}
            title={autoFit ? `Auto-fit: ${px}px` : `${px}px`}
          >
            {autoFit ? 'fit' : px}
          </span>
          <IconBtn
            onClick={() => { setAutoFit(false); setSizeIdx(Math.min(SIZE_STEPS.length - 1, sizeIdx + 1)); }}
            disabled={sizeIdx === SIZE_STEPS.length - 1 && !autoFit}
            label="Larger text"
          ><Plus className="w-3.5 h-3.5" /></IconBtn>
          <button
            type="button"
            onClick={() => setAutoFit((v) => !v)}
            title={autoFit ? 'Auto-fit is on — text scales to fill the pane. Click to switch to manual sizing.' : 'Auto-fit text to fill available space'}
            aria-label="Toggle auto-fit"
            aria-pressed={autoFit}
            className="h-7 w-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)] shrink-0"
            style={{ color: autoFit ? 'var(--case, var(--amber))' : 'var(--cream-faint)' }}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 ml-auto min-w-0 flex-wrap justify-end">
          {editing && onShowHelp && (
            <IconBtn onClick={onShowHelp} label="Open reference">
              <BookOpen className="w-3.5 h-3.5" />
            </IconBtn>
          )}
          {editing && <EditorToolbar wrap={wrap} onDone={() => setEditing(false)} />}

          {!editing && (
            <>
              <SourceBadge hasOverride={hasOverride} />
              <NotesSettingsMenu
                setEditing={setEditing}
                hasStructured={parsed.structured}
                sectionVisibility={sectionVisibility}
                toggleSection={toggleNoteSection}
                setPreset={setNotesViewPreset}
                matchedPreset={notesViewPreset}
                hasOverride={hasOverride}
                onResetToFile={onResetToFile}
                onShowHelp={onShowHelp}
                autoFit={autoFit}
                setAutoFit={setAutoFit}
              />
            </>
          )}
        </div>
      </div>

      {/* Body — relative wrapper for floating nav arrows */}
      <div className="relative flex-1 min-h-0 flex">
        {!editing && <FloatingNav />}

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
            className="flex-1 min-h-[220px] w-full overflow-y-auto px-8 sm:px-10 py-4 sm:py-5"
            style={{ color: value ? 'var(--cream)' : 'var(--cream-faint)' }}
          >
            <div
              ref={contentRef}
              className="mx-auto w-full notes-prose notes-prose--reading"
              style={{
                '--notes-fs': `${px}px`,
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
    </div>
  );
}

/* ================================================================
   FloatingNav — prev / next arrows pinned to the left and right
   edges, vertically centered. pointer-events only on the buttons
   so text underneath stays selectable.
   ================================================================ */
function FloatingNav() {
  const { prev, next, index, total } = useDeck();
  const btnBase =
    'h-8 w-8 rounded-full border flex items-center justify-center transition-all disabled:opacity-0 hover:bg-[var(--cream-ghost)] hover:scale-110';
  const btnStyle = {
    borderColor: 'var(--cream-hairline)',
    color: 'var(--cream-muted)',
    background: 'color-mix(in srgb, var(--panel) 85%, transparent)',
    backdropFilter: 'blur(4px)',
  };
  return (
    <>
      <div className="absolute left-1 top-0 bottom-0 flex items-center z-10 pointer-events-none">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className={`${btnBase} pointer-events-auto`}
          style={btnStyle}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute right-1 top-0 bottom-0 flex items-center z-10 pointer-events-none">
        <div className="flex flex-col items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={next}
            disabled={index === total - 1}
            className={btnBase}
            style={btnStyle}
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span
            className="deck-mono tabular-nums"
            style={{ fontSize: '0.5rem', color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono)' }}
          >
            {index + 1}/{total}
          </span>
        </div>
      </div>
    </>
  );
}

/* ================================================================
   InlineNav — prev / next at the bottom of the notes scroll area
   so the presenter can advance after reading to the end.
   ================================================================ */
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

/* ================================================================
   NotesSettingsMenu — unified dropdown: Edit, Help, Reset,
   and section visibility (presets + toggles).
   ================================================================ */
function NotesSettingsMenu({
  setEditing, hasStructured,
  sectionVisibility, toggleSection, setPreset, matchedPreset,
  hasOverride, onResetToFile, onShowHelp,
  autoFit, setAutoFit,
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (wrapRef.current?.contains(e.target)) return; setOpen(false); };
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); setOpen(false); }
    };
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey, true);
    return () => { document.removeEventListener('mousedown', onDown); window.removeEventListener('keydown', onKey, true); };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative flex items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Notes settings — edit, view sections, and help"
        aria-label="Notes settings"
        aria-expanded={open}
        className="h-7 flex items-center gap-1 rounded border px-1.5 transition-colors hover:bg-[var(--cream-ghost)]"
        style={{
          borderColor: open ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
          color: open ? 'var(--case, var(--amber))' : 'var(--cream-muted)',
        }}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span className="deck-mono uppercase hidden sm:inline" style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)' }}>
          Settings
        </span>
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
          <MenuItem
            icon={Pencil}
            iconColor="var(--case, var(--amber))"
            label="Edit speaker notes"
            onClick={() => { setEditing(true); setOpen(false); }}
          />

          <button
            type="button"
            onClick={() => setAutoFit((v) => !v)}
            className="w-full flex items-center gap-2 rounded px-1.5 py-2 text-left transition-colors hover:bg-[var(--cream-ghost)] mb-0.5"
          >
            <Maximize2 className="w-3.5 h-3.5 shrink-0" style={{ color: autoFit ? 'var(--case, var(--amber))' : 'var(--cream-muted)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--cream)', fontWeight: 500 }}>Auto-fit text to pane</span>
            <span className="ml-auto deck-mono" style={{ fontSize: '0.55rem', color: 'var(--cream-faint)' }}>
              {autoFit ? 'on' : 'off'}
            </span>
          </button>

          {onShowHelp && (
            <MenuItem
              icon={BookOpen}
              label="Reference guide"
              onClick={() => { onShowHelp(); setOpen(false); }}
            />
          )}

          {hasOverride && onResetToFile && (
            <MenuItem
              icon={RotateCcw}
              label="Reset to file"
              onClick={() => { onResetToFile(); setOpen(false); }}
            />
          )}

          {hasStructured && (
            <>
              <div className="border-t my-2" style={{ borderColor: 'var(--cream-hairline)' }} />
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
                        onClick={() => toggleSection(key)}
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
                Bridge = segue to the <em>next</em> slide. Cues stay collapsible when on.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, iconColor, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 rounded px-1.5 py-2 text-left transition-colors hover:bg-[var(--cream-ghost)] mb-0.5"
    >
      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: iconColor || 'var(--cream-muted)' }} />
      <span style={{ fontSize: '0.78rem', color: 'var(--cream)', fontWeight: 500 }}>{label}</span>
    </button>
  );
}

/* ================================================================
   NotesRenderer — structured (Spoken/Cues/Bridge) vs raw markdown.
   ================================================================ */
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

/* ================================================================
   EditorToolbar — markdown formatting buttons shown in edit mode.
   ================================================================ */
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
