import React, { useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bold, Italic, Highlighter, List, ListOrdered, Heading1, Heading2, Quote } from 'lucide-react';

/**
 * MarkdownNotes — a lightweight formatted-notes editor/viewer for presenter mode.
 *
 * Editing mode  : textarea + toolbar. Toolbar wraps the current selection
 *                 with markdown syntax (bold **x**, italic *x*, highlight ==x==,
 *                 H1/H2, bullets, numbered list, blockquote).
 * View mode     : renders the markdown via react-markdown with our deck typography.
 *
 * Custom syntax: `==text==` renders as a highlighted <mark> using --case color.
 * Supported out of the box: **bold**, *italic*, # H1, ## H2, - bullet, 1. ordered, > quote.
 */
export default function MarkdownNotes({ value, onChange, editing, onFocus, placeholder }) {
  const ref = useRef(null);

  const wrap = useCallback((before, after = before, blockPrefix) => {
    const ta = ref.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value: v } = ta;
    const selected = v.slice(s, e);

    let nextValue;
    let caret;
    if (blockPrefix) {
      // Line-based prefix (headings, bullets, quotes).
      const lineStart = v.lastIndexOf('\n', s - 1) + 1;
      const block = v.slice(lineStart, e);
      const prefixed = block
        .split('\n')
        .map((line) => (line.startsWith(blockPrefix) ? line : blockPrefix + line))
        .join('\n');
      nextValue = v.slice(0, lineStart) + prefixed + v.slice(e);
      caret = lineStart + prefixed.length;
    } else {
      const inner = selected || 'text';
      nextValue = v.slice(0, s) + before + inner + after + v.slice(e);
      caret = s + before.length + inner.length;
    }
    onChange(nextValue);
    // Restore focus + selection on next tick (after React re-render).
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(caret, caret);
    });
  }, [onChange]);

  if (editing) {
    return (
      <div className="flex flex-col flex-1 min-h-0">
        <Toolbar
          onBold={() => wrap('**')}
          onItalic={() => wrap('*')}
          onHighlight={() => wrap('==')}
          onH1={() => wrap('', '', '# ')}
          onH2={() => wrap('', '', '## ')}
          onUL={() => wrap('', '', '- ')}
          onOL={() => wrap('', '', '1. ')}
          onQuote={() => wrap('', '', '> ')}
        />
        <textarea
          ref={ref}
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-h-[220px] w-full rounded-b-md p-4 resize-none outline-none border border-t-0"
          style={{
            background: 'var(--panel)',
            borderColor: 'var(--cream-hairline)',
            color: 'var(--cream)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.5,
          }}
        />
      </div>
    );
  }

  return (
    <button
      onClick={onFocus}
      className="flex-1 min-h-[220px] w-full text-left rounded-md p-5 border transition-colors overflow-y-auto"
      style={{
        background: 'var(--panel)',
        borderColor: 'var(--cream-hairline)',
        color: value ? 'var(--cream)' : 'var(--cream-faint)',
      }}
    >
      {value ? (
        <div className="notes-prose">
          <ReactMarkdown
            components={{
              h1: ({ node, children, ...p }) => <h1 className="notes-h1" {...p}>{transformChildren(children)}</h1>,
              h2: ({ node, children, ...p }) => <h2 className="notes-h2" {...p}>{transformChildren(children)}</h2>,
              h3: ({ node, children, ...p }) => <h3 className="notes-h3" {...p}>{transformChildren(children)}</h3>,
              p:  ({ node, children, ...p }) => <p  className="notes-p"  {...p}>{transformChildren(children)}</p>,
              ul: ({ node, ...p }) => <ul className="notes-ul" {...p} />,
              ol: ({ node, ...p }) => <ol className="notes-ol" {...p} />,
              li: ({ node, children, ...p }) => <li className="notes-li" {...p}>{transformChildren(children)}</li>,
              strong: ({ node, children, ...p }) => <strong className="notes-strong" {...p}>{transformChildren(children)}</strong>,
              em:     ({ node, children, ...p }) => <em className="notes-em" {...p}>{transformChildren(children)}</em>,
              blockquote: ({ node, ...p }) => <blockquote className="notes-quote" {...p} />,
              code: ({ node, ...p }) => <code className="notes-code" {...p} />,
            }}
          >
            {value}
          </ReactMarkdown>
        </div>
      ) : (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
          {placeholder}
        </span>
      )}
    </button>
  );
}

/* =========================================================
   Toolbar
   ========================================================= */
function Toolbar({ onBold, onItalic, onHighlight, onH1, onH2, onUL, onOL, onQuote }) {
  const btns = [
    { fn: onH1,        icon: Heading1,    label: 'Heading 1' },
    { fn: onH2,        icon: Heading2,    label: 'Heading 2' },
    { sep: true },
    { fn: onBold,      icon: Bold,        label: 'Bold' },
    { fn: onItalic,    icon: Italic,      label: 'Italic' },
    { fn: onHighlight, icon: Highlighter, label: 'Highlight' },
    { sep: true },
    { fn: onUL,        icon: List,        label: 'Bulleted list' },
    { fn: onOL,        icon: ListOrdered, label: 'Numbered list' },
    { fn: onQuote,     icon: Quote,       label: 'Quote' },
  ];
  return (
    <div
      className="flex items-center gap-0.5 px-2 py-1.5 rounded-t-md border border-b-0"
      style={{ borderColor: 'var(--cream-hairline)', background: 'var(--panel)' }}
    >
      {btns.map((b, i) => b.sep ? (
        <span key={i} className="mx-1 h-4 w-px" style={{ background: 'var(--cream-hairline)' }} />
      ) : (
        <button
          key={i}
          type="button"
          onMouseDown={(e) => { e.preventDefault(); b.fn(); }}
          aria-label={b.label}
          title={b.label}
          className="h-7 w-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
          style={{ color: 'var(--cream-muted)' }}
        >
          <b.icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}

/**
 * Walk react-markdown children and split any raw string text on the
 * `==...==` highlight token, wrapping matches in a <mark> element.
 * This avoids bringing in rehype-raw.
 */
function transformChildren(children) {
  return React.Children.map(children, (child, i) => {
    if (typeof child !== 'string') return child;
    if (!child.includes('==')) return child;
    const parts = child.split(/==([^=]+)==/g); // odd indexes = highlighted text
    return parts.map((p, j) =>
      j % 2 === 1
        ? <mark key={`${i}-${j}`} className="notes-mark">{p}</mark>
        : <React.Fragment key={`${i}-${j}`}>{p}</React.Fragment>
    );
  });
}