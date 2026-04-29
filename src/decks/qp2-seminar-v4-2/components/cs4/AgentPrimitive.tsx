// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import ReasoningLoop from './ReasoningLoop';

/**
 * AgentPrimitive — used by S6 (cs4-06-agent-primitive). Junior on-ramp.
 *
 * Three-card horizontal strip with mono numerals 01 / 02 / 03 and amber
 * 1px hairlines BETWEEN them (not borders on each card). Each card names
 * one of the three agent primitives:
 *   01 · TOOLS  — deterministic functions
 *   02 · STATE  — typed shared bus
 *   03 · LOOP   — plan / call / observe / re-plan
 *
 * Bottom italic band sits below the three cards, one notch larger than
 * card body, cream-muted: "The LLM is not the worker. scipy is the worker.
 * The agent is what decides when to call it."
 */

const EASE = [0.2, 0.7, 0.3, 1];

const PRIMITIVES = [
  {
    num: '01',
    name: 'Tools',
    summary: 'Deterministic functions the agent calls',
    examples: ['compute_auc()', 'fit_popPK()', 'run_vpc()'],
    runtime: 'scipy · numpy · NONMEM · plotly',
  },
  {
    num: '02',
    name: 'State',
    summary: 'Typed shared bus the agent reads/writes',
    examples: ['Schema-validated, not chat history'],
    runtime: 'Bounded · queryable · auditable',
  },
  {
    num: '03',
    name: 'Loop',
    summary: 'Plan → call → observe → re-plan',
    examples: ['The LLM decides; tools execute'],
    runtime: 'Non-deterministic reasoning, deterministic compute',
  },
];

const BOTTOM_BAND =
  'The LLM is not the worker. scipy is the worker. The agent is what decides when to call it.';

export default function AgentPrimitive({ go = true, delay = 0.7 }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(var(--space-4), 2.4vh, var(--space-6))',
        minHeight: 0,
      }}
    >
      {/* Three-card horizontal strip */}
      <div
        style={{
          flex: '1 1 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
          alignItems: 'stretch',
          minHeight: 0,
        }}
      >
        {PRIMITIVES.map((p, i) => (
          <React.Fragment key={p.num}>
            <PrimitiveCard p={p} index={i} go={go} delay={delay + i * 0.25} />
            {i < PRIMITIVES.length - 1 && (
              <motion.span
                aria-hidden
                initial={{ scaleY: 0 }}
                animate={go ? { scaleY: 1 } : { scaleY: 1 }}
                transition={{ duration: 0.7, delay: delay + 0.3 + i * 0.15, ease: EASE }}
                style={{
                  background: 'var(--amber)',
                  width: 1,
                  transformOrigin: 'top center',
                  opacity: 0.55,
                  alignSelf: 'stretch',
                  justifySelf: 'center',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Reasoning Loop — circular plan→call→observe→re-plan */}
      <ReasoningLoop go={go} delay={delay + 1.0} size={200} />

      {/* Bottom italic band */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay + 1.7, ease: EASE }}
        style={{
          padding:
            'clamp(var(--space-3), 1.6vh, var(--space-5)) clamp(var(--space-4), 2vw, var(--space-6))',
          borderTop: '1px solid color-mix(in srgb, var(--amber) 40%, transparent)',
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--amber) 5%, transparent), transparent)',
        }}
      >
        <p
          className="deck-display italic"
          style={{
            margin: 0,
            color: 'var(--cream-muted)',
            fontSize: 'clamp(1.05rem, min(1.4vw, 2.25vh), 1.55rem)',
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          {BOTTOM_BAND}
        </p>
      </motion.div>
    </div>
  );
}

function PrimitiveCard({ p, index, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding:
          'clamp(var(--space-4), 2vh, var(--space-6)) clamp(var(--space-3), 1.6vw, var(--space-5))',
        background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
        backdropFilter: 'blur(8px)',
        borderRadius: 'var(--radius-md)',
        position: 'relative',
        minHeight: 0,
      }}
    >
      <div
        className="deck-mono"
        style={{
          fontSize: 'clamp(0.7rem, min(0.95vw, 1.5vh), 0.95rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber)',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {p.num} · {p.name.toUpperCase()}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.05rem, min(1.4vw, 2.25vh), 1.55rem)',
          fontWeight: 600,
          color: 'var(--cream)',
          lineHeight: 1.25,
        }}
      >
        {p.summary}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {p.examples.map((ex) => (
          <li
            key={ex}
            className="deck-mono"
            style={{
              fontSize: 'clamp(0.72rem, min(0.92vw, 1.5vh), 0.95rem)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream)',
              opacity: 0.85,
              lineHeight: 1.45,
              wordBreak: 'break-word',
            }}
          >
            {ex}
          </li>
        ))}
      </ul>
      <div
        className="deck-mono uppercase"
        style={{
          marginTop: 'auto',
          fontSize: 'clamp(0.55rem, min(0.72vw, 1.15vh), 0.72rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 700,
        }}
      >
        {p.runtime}
      </div>
    </motion.div>
  );
}
