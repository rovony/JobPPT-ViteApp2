// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * SchemaExtractor — used by S9 (cs4-09-privacy).
 *
 * Two columns separated by a single 1px amber hairline labelled
 * "SCHEMAEXTRACTOR" in mono.
 *
 *   LEFT  — WHAT FLOWS LOCALLY (cream-faint, faint blurred-spreadsheet
 *           rows; subject-level concentration values, identifiers, raw
 *           covariate rows, free-text narrative). Items SLIDE IN from
 *           the left edge attempting to cross the boundary; they get
 *           MASKED at the hairline.
 *
 *   RIGHT — WHAT REACHES THE LLM (amber outlined metadata cards;
 *           column names + types, subject count + dose levels, aggregate
 *           statistics, categorical level enumerations).
 *
 * Cinematic moment 3: one smooth ~1.5s motion. No glow, no flash; the
 * wall holds. The bottom italic band ("Non-compliance is not disallowed.
 * It is structurally impossible.") lives in the slide file, not here.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const LEFT_ITEMS = [
  'Subject-level concentration values',
  'Individual patient identifiers',
  'Raw covariate rows',
  'Free-text narrative fields',
];

const RIGHT_ITEMS = [
  'Column names + data types',
  'Subject count · dose levels',
  'Aggregate statistics (mean, IQR, range)',
  'Categorical level enumerations',
];

export default function SchemaExtractor({ go = true, delay = 0.6 }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr',
        alignItems: 'stretch',
        gap: 'clamp(var(--space-4), 3vw, var(--space-7))',
        position: 'relative',
        minHeight: 0,
      }}
    >
      {/* LEFT — what flows LOCALLY (never crosses) */}
      <div
        style={{
          gridColumn: '1 / 2',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-2), 1.4vh, var(--space-4))',
          paddingRight: 'clamp(var(--space-2), 1.5vw, var(--space-4))',
          minWidth: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.62rem, min(0.78vw, 1.25vh), 0.78rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
            fontWeight: 800,
          }}
        >
          What flows locally
        </div>
        {LEFT_ITEMS.map((it, i) => (
          <SpreadsheetRow key={it} text={it} index={i} go={go} delay={delay + 0.2 + i * 0.18} />
        ))}
        {/* Caption */}
        <div
          className="deck-body italic"
          style={{
            marginTop: 'auto',
            fontSize: 'clamp(0.7rem, min(0.88vw, 1.4vh), 0.92rem)',
            color: 'var(--cream-faint)',
            lineHeight: 1.4,
          }}
        >
          Computed in-process. Never serialized into a prompt.
        </div>
      </div>

      {/* MIDDLE — vertical 1px amber wall + label */}
      <div
        style={{
          gridColumn: '2 / 3',
          position: 'relative',
          alignSelf: 'stretch',
          justifySelf: 'center',
          width: 1,
        }}
      >
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          animate={go ? { scaleY: 1 } : { scaleY: 1 }}
          transition={{ duration: 0.7, delay: delay, ease: EASE }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--amber)',
            transformOrigin: 'top center',
            opacity: 0.85,
          }}
        />
        {/* Label badge */}
        <span
          className="deck-mono uppercase"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            transformOrigin: 'center',
            background: 'var(--bg)',
            padding: '4px 10px',
            color: 'var(--amber)',
            fontSize: 'clamp(0.6rem, min(0.76vw, 1.25vh), 0.78rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            fontWeight: 800,
            border: '1px solid color-mix(in srgb, var(--amber) 60%, transparent)',
            whiteSpace: 'nowrap',
          }}
        >
          SchemaExtractor
        </span>
      </div>

      {/* RIGHT — what reaches the LLM (allowed surface) */}
      <div
        style={{
          gridColumn: '3 / 4',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-2), 1.4vh, var(--space-4))',
          paddingLeft: 'clamp(var(--space-2), 1.5vw, var(--space-4))',
          minWidth: 0,
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.62rem, min(0.78vw, 1.25vh), 0.78rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--amber)',
            fontWeight: 800,
          }}
        >
          What reaches the LLM
        </div>
        {RIGHT_ITEMS.map((it, i) => (
          <MetadataCard key={it} text={it} index={i} go={go} delay={delay + 0.5 + i * 0.18} />
        ))}
        <div
          className="deck-body italic"
          style={{
            marginTop: 'auto',
            fontSize: 'clamp(0.7rem, min(0.88vw, 1.4vh), 0.92rem)',
            color: 'var(--cream-muted)',
            lineHeight: 1.4,
          }}
        >
          Allow-listed surface. Schema-bounded. Auditable.
        </div>
      </div>
    </div>
  );
}

/* ── LEFT ROWS — faint blurred-spreadsheet feel; slides toward
   the wall and is masked there. */
function SpreadsheetRow({ text, index, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={go ? { opacity: [0, 1, 1], x: [-40, 6, 0] } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay, ease: EASE, times: [0, 0.7, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '24px 1fr auto',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-3)',
        background: 'color-mix(in srgb, var(--cream-faint) 8%, transparent)',
        border: '1px dashed color-mix(in srgb, var(--cream-faint) 40%, transparent)',
        borderRadius: 'var(--radius-sm)',
        filter: 'blur(0.4px)',
        opacity: 0.85,
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.78rem)',
          color: 'var(--cream-faint)',
          letterSpacing: 'var(--ls-mono)',
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 700,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span
        className="deck-body"
        style={{
          fontSize: 'clamp(0.78rem, min(1vw, 1.6vh), 1.05rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.32,
        }}
      >
        {text}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.5rem, min(0.65vw, 1.05vh), 0.65rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 700,
          opacity: 0.7,
        }}
      >
        local
      </span>
    </motion.div>
  );
}

/* ── RIGHT METADATA CARDS — amber outlined, the LLM's allowed surface. */
function MetadataCard({ text, index, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: '24px 1fr auto',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-3)',
        background: 'color-mix(in srgb, var(--amber) 7%, transparent)',
        border: '1px solid color-mix(in srgb, var(--amber) 55%, transparent)',
        borderLeft: '3px solid var(--amber)',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.78rem)',
          color: 'var(--amber)',
          letterSpacing: 'var(--ls-mono)',
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 800,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span
        className="deck-body"
        style={{
          fontSize: 'clamp(0.78rem, min(1vw, 1.6vh), 1.05rem)',
          color: 'var(--cream)',
          lineHeight: 1.32,
        }}
      >
        {text}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.5rem, min(0.65vw, 1.05vh), 0.65rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber)',
          fontWeight: 700,
        }}
      >
        allowed
      </span>
    </motion.div>
  );
}
