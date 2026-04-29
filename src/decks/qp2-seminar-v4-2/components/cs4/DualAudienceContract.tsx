// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  FileBadge2,
  Shield,
  UserCheck,
  Layers,
  BookOpen,
  Code2,
  GitBranch,
} from 'lucide-react';

/**
 * DualAudienceContract — load-bearing visual for CS4 · S2 · Objective.
 *
 * Two columns separated by a single 1px amber hairline. Each column has a
 * mono uppercase amber header naming the audience and four contract lines
 * pulled VERBATIM from the canonical CS4 spec. A bottom italic Success band
 * lives inside the same Viz container so the contract reads as one editorial
 * table.
 *
 * Per enhancement pass each row carries a small inline icon (lucide) that
 * keys the row to its audience domain — stethoscope/badge/shield/user for
 * the clinical pharmacologist column; layers/book/code/branch for the
 * pharmacometrician column.
 *
 * Motion contract:
 *   - LEFT column reveals first
 *   - RIGHT column reveals 200ms after
 *   - Success band fades in last after 1.5s
 *
 * The lines are the canonical contract — do not edit content without
 * touching the spec.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const COLUMNS = [
  {
    audience: 'For the clinical pharmacologist',
    lines: [
      { Icon: Stethoscope, text: 'Regulatory defensibility · audit chain on every analysis' },
      { Icon: FileBadge2,  text: 'ICH M15 alignment built in, not retrofitted' },
      { Icon: Shield,      text: "Privacy as architecture · patient data can't reach the LLM" },
      { Icon: UserCheck,   text: 'Human-named authority on every regulatory decision' },
    ],
  },
  {
    audience: 'For the pharmacometrician',
    lines: [
      { Icon: Layers,      text: 'Workflow substrate · scaffolding handled, science gets the time' },
      { Icon: BookOpen,    text: 'Topology grounded in Kim et al. 2025 scaling laws' },
      { Icon: Code2,       text: 'Typed state · deterministic tools · no agent-to-agent messaging' },
      { Icon: GitBranch,   text: 'End-to-end — data ingestion through 2.7.2 drafting' },
    ],
  },
];

const SUCCESS_BAND =
  "Success: a senior pharmacometrician sees architecture they'd defend to a regulator. A senior clinical pharmacologist sees regulatory primitives they'd defend to FDA. A junior in either discipline sees a clear path from where they are now to building like this.";

export default function DualAudienceContract({ go = true, delay = 0.8 }) {
  // Per spec motion: left first, then right (+200ms), then success band (+1.5s).
  const leftDelay  = delay;
  const rightDelay = delay + 0.2;
  const successDelay = delay + 1.5;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(var(--space-4), 2.5vh, var(--space-6))',
        minHeight: 0,
      }}
    >
      {/* Two columns separated by amber hairline */}
      <div
        style={{
          flex: '1 1 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr',
          alignItems: 'stretch',
          gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          minHeight: 0,
        }}
      >
        {COLUMNS.map((col, ci) => (
          <React.Fragment key={col.audience}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ci === 0 ? leftDelay : rightDelay, ease: EASE }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(var(--space-3), 1.8vh, var(--space-5))',
                gridColumn: ci === 0 ? '1 / 2' : '3 / 4',
                paddingRight: ci === 0 ? 'clamp(var(--space-2), 1.2vw, var(--space-4))' : 0,
                paddingLeft:  ci === 1 ? 'clamp(var(--space-2), 1.2vw, var(--space-4))' : 0,
              }}
            >
              {/* Audience kicker (uppercase mono amber) */}
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'clamp(0.7rem, min(0.95vw, 1.5vh), 0.95rem)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--amber)',
                  fontWeight: 800,
                }}
              >
                {col.audience}
              </span>

              {/* Hairline under the column header */}
              <span
                aria-hidden
                style={{
                  height: 1,
                  background: 'color-mix(in srgb, var(--amber) 40%, transparent)',
                  width: '100%',
                }}
              />

              {/* Four contract lines */}
              <ol
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(var(--space-2), 1.4vh, var(--space-4))',
                }}
              >
                {col.lines.map((line, li) => (
                  <motion.li
                    key={line.text}
                    initial={{ opacity: 0, x: -8 }}
                    animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (ci === 0 ? leftDelay : rightDelay) + 0.2 + li * 0.1,
                      ease: EASE,
                    }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '20px auto 1fr',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'color-mix(in srgb, var(--amber) 75%, transparent)',
                      }}
                    >
                      <line.Icon size={14} strokeWidth={1.6} />
                    </span>
                    <span
                      className="deck-mono"
                      style={{
                        color: 'var(--amber)',
                        fontSize: 'clamp(0.65rem, min(0.85vw, 1.4vh), 0.85rem)',
                        letterSpacing: 'var(--ls-mono)',
                        fontVariantNumeric: 'tabular-nums',
                        fontWeight: 700,
                      }}
                    >
                      {String(li + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="deck-display"
                      style={{
                        color: 'var(--cream)',
                        fontSize: 'clamp(0.95rem, min(1.25vw, 2vh), 1.4rem)',
                        lineHeight: 1.32,
                        fontWeight: 500,
                      }}
                    >
                      {line.text}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            {/* Vertical 1px amber hairline between the two columns */}
            {ci === 0 && (
              <motion.div
                aria-hidden
                initial={{ scaleY: 0 }}
                animate={go ? { scaleY: 1 } : { scaleY: 1 }}
                transition={{ duration: 0.7, delay: leftDelay + 0.3, ease: EASE }}
                style={{
                  background: 'var(--amber)',
                  width: 1,
                  transformOrigin: 'top center',
                  opacity: 0.7,
                  gridColumn: '2 / 3',
                  alignSelf: 'stretch',
                  justifySelf: 'center',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Success band — italic, full-width, lives WITH the table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: successDelay, ease: EASE }}
        style={{
          padding:
            'clamp(var(--space-3), 1.6vh, var(--space-5)) clamp(var(--space-4), 2vw, var(--space-6))',
          borderTop: '1px solid color-mix(in srgb, var(--amber) 40%, transparent)',
          borderBottom: '1px solid color-mix(in srgb, var(--amber) 40%, transparent)',
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--amber) 6%, transparent), color-mix(in srgb, var(--panel) 60%, transparent))',
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.62rem, min(0.78vw, 1.25vh), 0.78rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--amber)',
            fontWeight: 800,
            marginBottom: 'var(--space-2)',
          }}
        >
          Success
        </div>
        <p
          className="deck-display italic"
          style={{
            margin: 0,
            color: 'var(--cream)',
            fontSize: 'clamp(0.95rem, min(1.2vw, 1.95vh), 1.35rem)',
            lineHeight: 1.42,
            fontWeight: 500,
          }}
        >
          {SUCCESS_BAND}
        </p>
      </motion.div>
    </div>
  );
}
