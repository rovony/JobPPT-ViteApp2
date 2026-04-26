// @ts-nocheck
import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { transformNotesInlineChildren } from '@/lib/notesInlineTransform';
import { Clock, Target, AudioLines, MapPin, AlertTriangle, CheckCircle2, LifeBuoy, ChevronDown, ChevronRight } from 'lucide-react';

/**
 * StructuredNotesView — renders parsed notes (Spoken / Cues / Bridge)
 * with section-specific visual treatment per Notes-And-QA-Structure.md.
 *
 *   • Spoken: dominant reading column, broken into NUMBERED BEATS.
 *     Each beat is its own visual block with a left-side number badge,
 *     so a presenter who lost their place can scan back to their beat
 *     in one glance ("I was on beat 3"). Beats are derived from
 *     paragraph breaks (\n\n) and, within long paragraphs, from
 *     sentence boundaries — the markdown source stays simple.
 *   • Cues: collapsed by default — stage directions. Visibility of the
 *     whole Cues block is controlled in PresenterNotesPane (View menu).
 *   • Bridge: segue / advance reminder for the *next* slide — not
 *     on-deck "regulatory bridge" copy (see Notes-And-QA-Structure.md).
 *
 * Pause markers in Spoken text:
 *   • ⏸ — hard pause (full breath). Rendered as a colored glyph with
 *         extra horizontal margin.
 *   • …  — soft beat. Rendered with extra letter-spacing so the eye
 *         catches the pause.
 *
 * Inline ==highlight== works the same as in raw notes.
 */
const DEFAULT_VIS = { showSpoken: true, showCues: true, showBridge: true };

export default function StructuredNotesView({ spoken, cues, bridge, fontSizePx, sectionVisibility = DEFAULT_VIS }) {
  const vis = { ...DEFAULT_VIS, ...sectionVisibility };
  const beats = useMemo(() => splitIntoBeats(vis.showSpoken ? spoken || '' : ''), [spoken, vis.showSpoken]);
  // Cues default collapsed — they're scaffolding, not the read.
  const [cuesOpen, setCuesOpen] = useState(false);

  const hasAnyBlock =
    (vis.showSpoken && beats.length > 0) ||
    (vis.showCues && Array.isArray(cues) && cues.length > 0) ||
    (vis.showBridge && bridge && String(bridge).trim());

  if (!hasAnyBlock) {
    return (
      <div
        className="rounded-md border border-dashed px-3 py-4 text-center"
        style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream-faint)', fontSize: '0.85rem' }}
      >
        All structured note sections are hidden. Open <strong style={{ color: 'var(--cream-muted)' }}>View</strong>{' '}
        in the bar above to show Spoken, Cues, and/or Bridge.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* SPOKEN — numbered beats */}
      {vis.showSpoken && beats.length > 0 && (
        <section
          className="notes-prose notes-prose--reading notes-spoken"
          style={{ fontFamily: 'var(--font-body)', fontSize: `var(--notes-fs, ${fontSizePx}px)`, lineHeight: 1.55 }}
        >
          <ol className="notes-beats flex flex-col gap-3 list-none p-0 m-0">
            {beats.map((beat, i) => (
              <li
                key={i}
                className="notes-beat flex gap-3"
                style={{
                  padding: '0.5rem 0.4rem 0.5rem 0.35rem',
                  borderLeft: '2px solid var(--cream-hairline)',
                  borderRadius: '4px',
                  background: 'color-mix(in srgb, var(--cream-ghost) 30%, transparent)',
                }}
              >
                <span
                  className="deck-mono shrink-0 leading-none"
                  style={{
                    minWidth: '1.5rem',
                    paddingTop: '0.15em',
                    fontSize: '0.7rem',
                    letterSpacing: 'var(--ls-mono)',
                    color: 'var(--cream-faint)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <ReactMarkdown components={notesMarkdownComponents}>{beat}</ReactMarkdown>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* CUES — collapsed by default */}
      {vis.showCues && Array.isArray(cues) && cues.length > 0 && (
        <section className="notes-cues">
          <button
            onClick={() => setCuesOpen((v) => !v)}
            className="deck-mono uppercase flex items-center gap-1.5 mb-1 transition-colors hover:text-[var(--cream)]"
            style={{
              fontSize: '0.58rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
            aria-expanded={cuesOpen}
            aria-controls="notes-cues-list"
            title={cuesOpen ? 'Hide stage directions' : 'Show stage directions'}
          >
            {cuesOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            Cues · {cues.length}
          </button>
          {cuesOpen && (
            <ul id="notes-cues-list" className="flex flex-col gap-1.5">
              {cues.map((c, i) => <CueRow key={i} cue={c} />)}
            </ul>
          )}
        </section>
      )}

      {/* BRIDGE — segue to next slide (authoring label; not "regulatory bridge" on slides) */}
      {vis.showBridge && bridge && String(bridge).trim() && (
        <section
          className="notes-bridge border-t pt-3 mt-1"
          style={{ borderTopColor: 'var(--cream-hairline)' }}
        >
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.58rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            Bridge
          </div>
          <div
            className="mb-1.5"
            style={{ fontSize: '0.58rem', lineHeight: 1.35, color: 'var(--cream-faint)' }}
            title="In notes, “Bridge” means your segue / advance line for the next slide — not the CS slide topic called “bridge.”"
          >
            What to say or remember as you press Next — or which beat in Spoken is the click point.
          </div>
          <div
            className="notes-prose notes-prose--reading notes-bridge-speak"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: `var(--notes-fs, ${fontSizePx}px)`,
              lineHeight: 1.55,
            }}
            title="Say this (or this is your Next click) — same type size as Spoken; tint = Bridge block."
          >
            <ReactMarkdown components={notesMarkdownComponents}>{bridge}</ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  );
}

/**
 * splitIntoBeats — break the spoken text into numbered re-anchorable
 * units. Strategy:
 *   1. Split on blank lines (\n\n+) — the author's intentional beat
 *      boundary in markdown.
 *   2. For paragraphs longer than ~280 chars, sub-split on sentence
 *      boundaries while keeping consecutive short sentences together
 *      (so a beat is always a meaningful sized chunk, not one comma).
 *
 * The goal: 4–10 beats per slide. If the user lost their place, they
 * can spot "I'm at beat 4" in one glance.
 */
function splitIntoBeats(spoken) {
  const trimmed = (spoken || '').trim();
  if (!trimmed) return [];
  const paragraphs = trimmed.split(/\n{2,}/g).map((p) => p.trim()).filter(Boolean);
  const out = [];
  for (const para of paragraphs) {
    if (para.length <= 280) {
      out.push(para);
      continue;
    }
    // Sentence-split on .!? followed by whitespace, but keep the
    // punctuation. Then greedily merge consecutive sentences into
    // beats of ~200–320 chars so beats stay readable.
    const sentences = para.split(/(?<=[.!?])\s+/g).filter(Boolean);
    let buf = '';
    for (const s of sentences) {
      const candidate = buf ? `${buf} ${s}` : s;
      if (candidate.length > 280 && buf) {
        out.push(buf);
        buf = s;
      } else {
        buf = candidate;
      }
    }
    if (buf) out.push(buf);
  }
  return out;
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
   ==mark==, ⏸, … / ... via transformNotesInlineChildren. */
const notesMarkdownComponents = {
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
