// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * PharmStateMonitor — editorial scrolling JSON-style state stream.
 *
 * Renders 5 typed PharmState write entries that reveal in sync with
 * the cs4-11 swimlane lane reveals. Each entry has:
 *   • a tabular-nums monospaced timestamp [MM:SS:MS]
 *   • an amber + sigil and the dotted-path of the write
 *   • a JSON-style payload that types out character-by-character
 *
 * Aesthetic: dark backdrop, mono everywhere, amber left-border per
 * entry, hairline divider between entries. The character-stagger reveal
 * (delay: ci * 0.008) is the cinematic move.
 *
 * Used on cs4-11 alongside the swimlane.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const ENTRIES = [
  {
    ts: '00:00:12',
    path: 'dataset.metadata',
    payload: '{ subjects: 312 · doses: 7 · covariates: 4 }',
    delay: 0.5,
  },
  {
    ts: '00:01:03',
    path: 'nca.lambda_z',
    payload: '{ r2: 0.987 · half_life: 14.2h · n_points: 4 }',
    delay: 1.4,
  },
  {
    ts: '00:02:18',
    path: 'nca.results',
    payload: '{ auc_inf: 2410 · cmax: 185 · tmax: 4.1 }',
    delay: 2.4,
  },
  {
    ts: '00:03:44',
    path: 'qc.verdict',
    payload: '{ passed: true · score: 14/15 · gates: ["units","span","r2"] }',
    delay: 3.4,
  },
  {
    ts: '00:04:32',
    path: 'report.section_12_3.docx',
    payload: '{ paragraphs: 4 · tables: 1 · figures: 0 · sealed: true }',
    delay: 4.3,
  },
];

export default function PharmStateMonitor({ go = true, delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        padding: 'clamp(var(--space-2), 1.4vh, var(--space-3))',
        background: 'color-mix(in srgb, var(--bg) 92%, var(--amber) 8%)',
        border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
        borderLeft: '2px solid var(--amber)',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-2)',
          paddingBottom: 'var(--space-2)',
          borderBottom: '1px solid var(--cream-hairline)',
        }}
      >
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--amber)',
            fontWeight: 800,
          }}
        >
          PharmState · live
        </span>
        <motion.span
          aria-hidden
          animate={
            reduce
              ? { opacity: 0.8 }
              : { opacity: [1, 0.25, 1] }
          }
          transition={
            reduce ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--amber)',
            boxShadow: '0 0 6px color-mix(in srgb, var(--amber) 60%, transparent)',
          }}
        />
      </div>

      {/* Entries */}
      <div
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-1), 0.7vh, var(--space-2))',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {ENTRIES.map((e, i) => (
          <Entry key={e.path} entry={e} go={go} delay={delay + e.delay} />
        ))}
      </div>

      {/* Footer caption */}
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.5rem, min(0.62vw, 1vh), 0.62rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          marginTop: 'auto',
          paddingTop: 'var(--space-1)',
          borderTop: '1px solid var(--cream-hairline)',
        }}
      >
        TYPED · APPEND-ONLY · REGULATOR-REPLAYABLE
      </span>
    </div>
  );
}

function Entry({ entry, go, delay }) {
  const reduce = useReducedMotion();
  const chars = entry.payload.split('');

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -12 }}
      animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: '4px 8px',
        background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        borderLeft: '2px solid color-mix(in srgb, var(--amber) 65%, transparent)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: 'clamp(0.55rem, min(0.7vw, 1.15vh), 0.72rem)',
            color: 'var(--cream-faint)',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '0.05em',
          }}
        >
          [{entry.ts}]
        </span>
        <span
          style={{
            fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.8rem)',
            color: 'var(--amber)',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          + {entry.path}
        </span>
      </div>
      <div
        style={{
          fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.78rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {chars.map((ch, ci) => (
          <motion.span
            key={ci}
            initial={reduce ? false : { opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.04, delay: delay + 0.25 + ci * 0.008 }}
            style={{ display: 'inline-block' }}
          >
            {ch === ' ' ? '\u00a0' : ch}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
