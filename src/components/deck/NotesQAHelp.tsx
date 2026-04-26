// @ts-nocheck
import React, { useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';

/**
 * NotesQAHelp — quick-reference modal: Spoken / Cues / Bridge, inline
 * markers (type vs rendered), cue glyphs, Q&A template. Esc closes.
 */
export default function NotesQAHelp({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      onClose?.();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Notes & Q&A authoring reference"
      className="fixed inset-0 z-deck-presenter flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-lg shadow-xl flex flex-col overflow-hidden"
        style={{
          width: 'min(96vw, 820px)',
          maxHeight: 'min(92vh, 800px)',
          background: 'var(--panel)',
          color: 'var(--cream)',
          border: '1px solid var(--cream-hairline)',
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-2 border-b shrink-0"
          style={{ borderBottomColor: 'var(--cream-hairline)' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="w-4 h-4 shrink-0" style={{ color: 'var(--case, var(--amber))' }} />
            <div className="flex flex-col min-w-0">
              <span
                className="deck-mono uppercase truncate"
                style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}
              >
                Reference
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--cream)' }}>
                Notes & Q&A
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
            aria-label="Close"
            title="Close · Esc"
            style={{ color: 'var(--cream-muted)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5" style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>

          <Section title="Three blocks — what each is for">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <MemoryCard
                k="Spoken"
                d="## Spoken"
                one="The script: read it out loud, in order. Breaks in the text = beats."
              />
              <MemoryCard
                k="Cues"
                d="## Cues"
                one="Not read aloud. Bullets: time, focus, must-say, landmines. Optional; hide in View."
              />
              <MemoryCard
                k="Bridge"
                d="## Bridge"
                one="One line: what you say (or which beat) as you press Next. Not a “regulatory bridge” slide on the deck."
              />
            </div>
            <P>
              <strong style={{ color: 'var(--cream)' }}>Bridge ≠ bridge slide</strong> — in notes, Bridge only
              means your <em>next-slide</em> cue. Cues = stage bullet list; Spoken = paragraph script.
            </P>
          </Section>

          <Section title="Spoken — type this → see this">
            <P subtle>
              Same markers work in <strong>Spoken</strong> and in raw notes / Q&amp;A markdown:{' '}
              <code>==</code> / <code>⏸</code> / ellipsis are transformed; <code>**</code> and <code>*</code> come
              from normal markdown.
            </P>
            <InlineMarkerTable />
          </Section>

          <Section title="Cue list — leading glyph">
            <Table
              rows={[
                ['⏱', 'Time', 'Seconds / pacing'],
                ['🎯', 'Focus', 'Where to look, who to address'],
                ['🎚', 'Tone', 'Delivery (slow, crisp, etc.)'],
                ['📍', 'Position', 'Where you stand / gesture'],
                ['⚠',  'Avoid', 'Never say this'],
                ['✅',  'Must', "Don't skip these words"],
                ['🛟', 'Recovery', 'If you blank'],
              ]}
              headers={['', 'Kind', 'Remember']}
            />
          </Section>

          <Section title="Anticipated Q&A — one block per question">
            <Code>{`## Q: (or Q1:, Q2: …)
**From:** Name
**Difficulty:** ★★ · **Topic:** short label

Your answer in voice.

> **If pressed:** one-line backup`}</Code>
            <P>
              The <code>## Q…</code> line drives the <em>Q&amp;A · N</em> badge and search. Numbering
              the heading is optional but helps you point to “question 2” in prep.
            </P>
          </Section>

          <Section title="Difficulty stars">
            <Table
              rows={[
                ['★',     'Gentle',    'Easy to own'],
                ['★★',    'Normal',    'Worth a solid answer'],
                ['★★★',   'Sharp',     'They are testing you'],
                ['★★★★',  'Hard',      'Precision matters'],
                ['★★★★★', 'Nuclear',   'A wrong line hurts cred'],
              ]}
              headers={['', 'Label', 'Meaning']}
            />
          </Section>

          <Section title="Q&A pane — search">
            <P subtle>
              Search matches question, asker, topic, and answer. With one match, that card opens. Theme tokens
              (<code>--case</code>, <code>--cream</code>, …) keep light/dark legible; you choose markers, not hex
              colors.
            </P>
            <P subtle>
              Full spec: <code>Notes-And-QA-Structure.md</code> in the repo — this dialog is the cheat sheet.
            </P>
          </Section>
        </div>
      </div>
    </div>
  );
}

function MemoryCard({ k, d, one }) {
  return (
    <div
      className="rounded p-3"
      style={{
        background: 'color-mix(in srgb, var(--cream-ghost) 50%, transparent)',
        border: '1px solid var(--cream-hairline)',
      }}
    >
      <div className="deck-mono" style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}>
        {k}
      </div>
      <code style={{ display: 'block', fontSize: '0.72rem', marginTop: '0.25rem', color: 'var(--cream)' }}>{d}</code>
      <p style={{ color: 'var(--cream-muted)', margin: '0.45rem 0 0', fontSize: '0.82rem', lineHeight: 1.45 }}>{one}</p>
    </div>
  );
}

function InlineMarkerTable() {
  const thBase = {
    padding: '0.5em 0.6em',
    fontSize: '0.6rem',
    letterSpacing: 'var(--ls-mono-wide)',
    color: 'var(--cream-muted)',
    borderBottom: '1px solid var(--cream-hairline)',
    fontWeight: 600,
  };
  const td = { padding: '0.4em 0.6em', verticalAlign: 'top', color: 'var(--cream)' };
  return (
    <div className="overflow-x-auto rounded" style={{ border: '1px solid var(--cream-hairline)' }}>
      <table className="w-full" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'color-mix(in srgb, var(--cream-ghost) 70%, transparent)' }}>
            <th className="text-left" style={thBase}>Role</th>
            <th className="text-left" style={thBase}>Type</th>
            <th className="text-left" style={thBase}>Renders as</th>
            <th className="text-left hidden sm:table-cell" style={thBase}>When</th>
          </tr>
        </thead>
        <tbody>
          <InlineRow
            role="Lock-in (say it loud)"
            type="==dose=="
            when="Exact wording you must not soften"
            preview={
              <>
                The <mark className="notes-mark">dose</mark> is fixed.
              </>
            }
          />
          <InlineRow
            role="Strong stress"
            type="**important**"
            when="Emphasis, not the lock-in"
            preview={
              <strong className="notes-strong">important</strong>
            }
          />
          <InlineRow
            role="Cite / name"
            type="*et al.*"
            when="Study names, book titles, quotes"
            preview={<em className="notes-em">et al.</em>}
          />
          <InlineRow
            role="Full breath"
            type="⏸"
            when="Real pause, then go on"
            preview={
              <>
                Stop here <span className="notes-pause-hard">⏸</span> then continue.
              </>
            }
          />
          <InlineRow
            role="Soft beat"
            type="… or ..."
            when="Twitch pause inside a sentence (same styling for both)"
            preview={
              <>
                One point<span className="notes-pause-soft">…</span> the next.
              </>
            }
          />
          <InlineRow
            role="Pivot / then"
            type="→"
            when="Plain character — shows as typed"
            preview={<>A → B</>}
          />
          <InlineRow
            role="Quotation marks"
            type={'"nineteen years"'}
            when="Not syntax — just punctuation in your sentence"
            preview={<>Land &quot;nineteen years&quot; cleanly.</>}
          />
        </tbody>
      </table>
    </div>
  );
}

function InlineRow({ role, type, when, preview }) {
  return (
    <tr style={{ borderBottom: '1px solid var(--cream-hairline)' }}>
      <td style={{ ...td, fontSize: '0.82rem', color: 'var(--cream-muted)', maxWidth: '8.5rem' }}>{role}</td>
      <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>{type}</td>
      <td style={td}>
        <div
          className="notes-prose notes-prose--reading"
          style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'var(--cream)' }}
        >
          {preview}
        </div>
      </td>
      <td className="hidden sm:table-cell" style={{ ...td, fontSize: '0.8rem', color: 'var(--cream-muted)' }}>{when}</td>
    </tr>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h3
        className="deck-mono uppercase mb-2"
        style={{
          fontSize: '0.62rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case, var(--amber))',
        }}
      >
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function Code({ children }) {
  return (
    <pre
      className="rounded p-3 overflow-x-auto"
      style={{
        background: 'rgba(127,127,127,0.1)',
        border: '1px solid var(--cream-hairline)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        lineHeight: 1.5,
        color: 'var(--cream)',
        margin: 0,
      }}
    >
      {children}
    </pre>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded" style={{ border: '1px solid var(--cream-hairline)' }}>
      <table className="w-full" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'color-mix(in srgb, var(--cream-ghost) 70%, transparent)' }}>
            {headers.map((h) => (
              <th
                key={h}
                className="deck-mono uppercase text-left"
                style={{
                  padding: '0.5em 0.7em',
                  fontSize: '0.6rem',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--cream-muted)',
                  borderBottom: '1px solid var(--cream-hairline)',
                  fontWeight: 600,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--cream-hairline)' : 'none' }}>
              {r.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: '0.45em 0.7em',
                    verticalAlign: 'top',
                    fontFamily: j === 0 ? 'var(--font-mono)' : 'var(--font-body)',
                    fontSize: j === 0 ? '0.92rem' : '0.85rem',
                    color: 'var(--cream)',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function P({ children, subtle }) {
  return (
    <p
      style={{
        color: subtle ? 'var(--cream-faint)' : 'var(--cream-muted)',
        margin: 0,
        fontSize: subtle ? '0.82rem' : undefined,
      }}
    >
      {children}
    </p>
  );
}
