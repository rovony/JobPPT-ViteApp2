import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Clock, Target, AudioLines, MapPin, AlertTriangle, CheckCircle2, LifeBuoy } from 'lucide-react';

/**
 * StructuredNotesView — renders parsed notes (Spoken / Cues / Bridge)
 * with section-specific visual treatment per Notes-And-QA-Structure.md.
 *
 *   • Spoken: dominant reading column. Inherits the text-size control
 *     from PresenterNotesPane (caller controls font-size px).
 *   • Cues: compact glyph-coded list. Each cue gets a category color
 *     so the presenter can scan to ⚠ DO NOTs or ✅ MUSTs at a glance.
 *   • Bridge: italic, prominent at the bottom — the segue line.
 *
 * Pause markers in Spoken text:
 *   • ⏸ — hard pause (full breath). Rendered as a colored glyph with
 *         extra horizontal margin.
 *   • …  — soft beat. Rendered with extra letter-spacing so the eye
 *         catches the pause.
 *
 * Inline ==highlight== works the same as in raw notes.
 */
export default function StructuredNotesView({ spoken, cues, bridge, fontSizePx }) {
  return (
    <div className="flex flex-col gap-4">
      {/* SPOKEN — the script */}
      {spoken && (
        <section
          className="notes-prose notes-prose--reading notes-spoken"
          style={{ fontFamily: 'var(--font-body)', fontSize: `${fontSizePx}px`, lineHeight: 1.55 }}
        >
          <ReactMarkdown components={notesMarkdownComponents}>{spoken}</ReactMarkdown>
        </section>
      )}

      {/* CUES — stage directions */}
      {Array.isArray(cues) && cues.length > 0 && (
        <section className="notes-cues">
          <div
            className="deck-mono uppercase mb-1"
            style={{
              fontSize: '0.58rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            Cues
          </div>
          <ul className="flex flex-col gap-1.5">
            {cues.map((c, i) => <CueRow key={i} cue={c} />)}
          </ul>
        </section>
      )}

      {/* BRIDGE — segue */}
      {bridge && (
        <section
          className="notes-bridge border-t pt-3 mt-1"
          style={{ borderTopColor: 'var(--cream-hairline)' }}
        >
          <div
            className="deck-mono uppercase mb-1"
            style={{
              fontSize: '0.58rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            Bridge
          </div>
          <div
            className="notes-prose notes-bridge-prose"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: `${Math.max(14, fontSizePx - 2)}px`,
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: 'var(--cream-muted)',
            }}
          >
            <ReactMarkdown components={notesMarkdownComponents}>{bridge}</ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  );
}

const CUE_META = {
  time:     { icon: Clock,          color: 'var(--cream-muted)', label: 'Time' },
  focus:    { icon: Target,         color: 'var(--case, var(--amber))', label: 'Focus' },
  tone:     { icon: AudioLines,     color: 'var(--cream-muted)', label: 'Tone' },
  position: { icon: MapPin,         color: 'var(--cream-muted)', label: 'Position' },
  warn:     { icon: AlertTriangle,  color: 'var(--coral, #ef6868)', label: 'Avoid' },
  must:     { icon: CheckCircle2,   color: 'var(--sage, #6ec18a)', label: 'Must' },
  recovery: { icon: LifeBuoy,       color: 'var(--cyan, #5fb6c7)', label: 'Recovery' },
  note:     { icon: null,           color: 'var(--cream-muted)', label: '' },
};

function CueRow({ cue }) {
  const meta = CUE_META[cue.category] || CUE_META.note;
  const Icon = meta.icon;
  return (
    <li
      className="flex items-start gap-2 px-2 py-1.5 rounded"
      style={{
        background: 'color-mix(in srgb, var(--cream-ghost) 50%, transparent)',
        borderLeft: cue.category !== 'note' ? `2px solid ${meta.color}` : '2px solid transparent',
      }}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: meta.color }} />}
      {!Icon && cue.glyph && <span className="shrink-0 mt-0.5 leading-none">{cue.glyph}</span>}
      <span style={{ fontSize: '0.85rem', color: 'var(--cream)' }}>{cue.text}</span>
    </li>
  );
}

/* Markdown components — same vocabulary as PresenterNotesPane.
   Adds ⏸ and … pause-marker styling via the transform helper. */
const notesMarkdownComponents = {
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
};

/** Inline transform: ==highlight== → <mark>, ⏸ → pause glyph, sequence
 *  of three or more dots → soft-beat span with extra letter-spacing. */
function transform(children) {
  return React.Children.map(children, (child, i) => {
    if (typeof child !== 'string') return child;
    let parts = [child];
    // ==highlight==
    if (child.includes('==')) {
      parts = parts.flatMap((p) => {
        if (typeof p !== 'string') return [p];
        const segs = p.split(/==([^=]+)==/g);
        return segs.map((s, j) => j % 2 === 1 ? <mark key={`mark-${i}-${j}`} className="notes-mark">{s}</mark> : s);
      });
    }
    // ⏸ hard pause
    parts = parts.flatMap((p, j) => {
      if (typeof p !== 'string' || !p.includes('⏸')) return [p];
      const bits = p.split('⏸');
      const out = [];
      bits.forEach((b, k) => {
        out.push(b);
        if (k < bits.length - 1) out.push(<span key={`pause-${i}-${j}-${k}`} className="notes-pause-hard">⏸</span>);
      });
      return out;
    });
    return parts;
  });
}
