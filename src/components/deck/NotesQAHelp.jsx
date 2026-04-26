import React, { useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';

/**
 * NotesQAHelp — quick-reference modal that explains the structured
 * vocabulary used by Speaker Notes (## Spoken/Cues/Bridge + glyphs)
 * and Anticipated Q&A (## QN: with From/Difficulty/Topic + If pressed).
 *
 * Surfaced by the "?" icon in both the Speaker Notes header and the
 * Anticipated Q&A header. Same modal serves both so the presenter
 * gets one consistent reference.
 *
 * Content mirrors Notes-And-QA-Structure.md but is rendered as a
 * scannable reference card — tables for markers/glyphs, short
 * examples, no essay prose.
 *
 * Esc closes (capture-phase, doesn't bleed to deck-store handler).
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
          width: 'min(94vw, 720px)',
          maxHeight: 'min(92vh, 760px)',
          background: 'var(--panel)',
          color: 'var(--cream)',
          border: '1px solid var(--cream-hairline)',
        }}
      >
        {/* Header */}
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
                Notes & Q&A authoring
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5" style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>

          <Section title="Speaker Notes — three sections">
            <Code>{`## Spoken
The actual words you'll say, back-to-back. Use ==highlight== for the
words to land hard. ⏸ for full-breath pauses. … for soft beats.

## Cues
- ⏱ 90 sec — don't dwell
- 🎯 Eye contact: chair before pivot
- ⚠ NO Servier internal numbers
- ✅ Land "nineteen years"

## Bridge
One sentence — the segue you'll say as you advance.`}</Code>
          </Section>

          <Section title="Inline markers (Spoken section)">
            <Table
              rows={[
                ['==text==',     'Lock-in highlight (case color)',     'Marks the words to land hard'],
                ['**text**',     'Bold',                               'Important but not the cue'],
                ['*text*',       'Italic',                             'Cited / named / quoted'],
                ['⏸',            'Hard pause',                         'Full breath, then continue'],
                ['…',            'Soft beat',                          'One-beat pause inside a sentence'],
                ['→',            'Pivot',                              'Mid-paragraph "and then"'],
              ]}
              headers={['Syntax', 'Meaning', 'When']}
            />
          </Section>

          <Section title="Cue glyphs">
            <Table
              rows={[
                ['⏱', 'Time',     'Target seconds for this slide'],
                ['🎯', 'Focus',    'Eye contact / audience direction'],
                ['🎚', 'Tone',     'Pacing / delivery register'],
                ['📍', 'Position', 'Stage / body language'],
                ['⚠',  'Avoid',   'Hard "do not" — accuracy / confidentiality'],
                ['✅', 'Must',     'Hard "do" — must-mention beats'],
                ['🛟', 'Recovery', 'Backup line if you blank'],
              ]}
              headers={['Glyph', 'Category', 'Use for']}
            />
          </Section>

          <Section title="Anticipated Q&A — per question">
            <Code>{`## Q1: <verbatim audience question>
**From:** Demiana
**Difficulty:** ★★★ · **Topic:** stats

A: <prepared answer in delivery voice>

> **If pressed:** <one-line backup, citation, or escape hatch>`}</Code>
            <P>
              <strong style={{ color: 'var(--cream)' }}>## Q:</strong> heading prefix anchors the count badge
              ({" "}<em>Q&A · 3 anticipated</em> ) and the search index.
              Numbering (Q1, Q2…) is optional but recommended — makes
              questions referenceable across docs.
            </P>
          </Section>

          <Section title="Difficulty scale">
            <Table
              rows={[
                ['★',     'Softball',         'Anyone could ask, you nail it'],
                ['★★',    'Reasonable',       'Engaged listener follow-up'],
                ['★★★',   'Real probe',       'Testing your depth'],
                ['★★★★',  'Adversarial',      'Testing accuracy / confidence'],
                ['★★★★★', 'Career landmine',  'Wrong answer changes everything'],
              ]}
              headers={['Stars', 'Type', 'What it means']}
            />
          </Section>

          <Section title="Search & navigation in the Q&A pane">
            <Ul>
              <li>Search box filters across question, asker, topic, and answer body.</li>
              <li>Counter <em>n / total</em> shows how many match the current query.</li>
              <li>When the filter narrows to one match, that question auto-expands.</li>
              <li>Click any row's chevron to expand its answer; only one open at a time.</li>
              <li>Topic pills + difficulty stars surface in the row header — scan without clicking.</li>
            </Ul>
          </Section>

          <Section title="Light + dark mode">
            <P>
              Every marker maps to a CSS variable (<code>--case</code>, <code>--cream</code>,
              <code> --coral</code>, <code>--sage</code>, <code>--cyan</code>). Authors pick
              <em> semantic markers</em>, not colors — the theme handles contrast in both modes.
            </P>
          </Section>

          <Section title="Where this is documented">
            <P>
              Full spec at <code>4-Apps/merck-deck/Notes-And-QA-Structure.md</code> — the
              canonical contract for content authors. This modal is the
              live quick-reference; the doc is the source of truth.
            </P>
          </Section>
        </div>
      </div>
    </div>
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

function P({ children }) {
  return <p style={{ color: 'var(--cream-muted)', margin: 0 }}>{children}</p>;
}

function Ul({ children }) {
  return <ul style={{ paddingLeft: '1.4em', color: 'var(--cream-muted)', margin: 0 }} className="flex flex-col gap-1">{children}</ul>;
}
