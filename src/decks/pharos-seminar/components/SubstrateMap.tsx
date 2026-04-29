import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../motion';

/**
 * SubstrateMap — right-rail mini diagram for the Movement-3 component
 * tour. Shows the substrate's five named components stacked vertically;
 * the active one glows with --case, others sit muted. Re-uses the
 * editorial visual language of slides 7 / 11 (hairline cells, mono
 * labels, deck-display micro-text) at miniature scale.
 *
 * Purpose:
 *   1. Spatial recall — the audience saw the hierarchy + orthogonal-
 *      layering diagrams twice in Movement 2; this is the third look,
 *      threading components into that mental model.
 *   2. Tour progress — across cards 1→5, the highlighted cell walks
 *      down the stack so the audience subliminally tracks "we are now
 *      visiting component N of 5."
 */

export type ComponentId =
  | 'nca'
  | 'dataflow'
  | 'audit'
  | 'privacy'
  | 'sop';

const STACK: { id: ComponentId; label: string; sub: string }[] = [
  { id: 'nca',      label: 'NCA',              sub: 'CLINICAL · PRIMITIVE' },
  { id: 'dataflow', label: 'Data Flow',        sub: 'ORCHESTRATION · TOPOLOGY' },
  { id: 'audit',    label: 'Audit Chain',      sub: 'INTEGRITY · INFRASTRUCTURE' },
  { id: 'privacy',  label: 'Privacy Wall',     sub: 'PRIVACY · INFRASTRUCTURE' },
  { id: 'sop',      label: 'Marketplace SOP',  sub: 'OPERATIONS · LIFECYCLE' },
];

export default function SubstrateMap({
  activeId,
  delayBase = 0.6,
}: {
  activeId: ComponentId;
  delayBase?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative w-full h-full flex flex-col"
      style={{ minHeight: 0 }}
      aria-label={`Substrate map · highlighting ${activeId}`}
    >
      {/* Mini eyebrow — orients the rail */}
      <motion.div
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: reduced ? 0 : delayBase, ease: EASE.expoOut }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            height: 1,
            width: 22,
            background: 'var(--case)',
          }}
        />
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.62rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case)',
          }}
        >
          SUBSTRATE · 5 COMPONENTS
        </span>
      </motion.div>

      {/* The 5-cell stack */}
      <div className="flex flex-col gap-2 flex-1" style={{ minHeight: 0 }}>
        {STACK.map((cell, i) => {
          const isActive = cell.id === activeId;
          const delay = (reduced ? 0 : delayBase + 0.10) + i * 0.06;
          return (
            <motion.div
              key={cell.id}
              className="relative flex flex-col justify-center"
              style={{
                padding: '14px 16px',
                borderRadius: 8,
                border: isActive
                  ? '1px solid var(--case)'
                  : '1px solid color-mix(in srgb, var(--cream) 10%, transparent)',
                background: isActive
                  ? 'linear-gradient(135deg, color-mix(in srgb, var(--case) 14%, transparent) 0%, color-mix(in srgb, var(--case) 4%, transparent) 100%)'
                  : 'color-mix(in srgb, var(--panel) 22%, transparent)',
                boxShadow: isActive
                  ? '0 0 24px -8px color-mix(in srgb, var(--case) 60%, transparent)'
                  : 'none',
                flex: '1 1 0',
                minHeight: 0,
              }}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay, ease: EASE.expoOut }}
            >
              {/* Active marker dot */}
              {isActive && (
                <motion.span
                  aria-hidden
                  className="absolute"
                  style={{
                    left: -5,
                    top: '50%',
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: 'var(--case)',
                    transform: 'translateY(-50%)',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: delay + 0.2, ease: EASE.expoOut }}
                />
              )}

              <div className="flex items-baseline justify-between gap-3">
                <span
                  className="deck-display"
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.1,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--cream)' : 'var(--cream-muted)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {cell.label}
                </span>
                <span
                  className="deck-mono"
                  style={{
                    fontSize: '0.58rem',
                    letterSpacing: 'var(--ls-mono)',
                    color: isActive ? 'var(--case)' : 'var(--cream-faint)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} / 05
                </span>
              </div>
              <div
                className="deck-mono uppercase mt-1"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: isActive ? 'var(--cream-muted)' : 'var(--cream-faint)',
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {cell.sub}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer caption — same across all cards */}
      <motion.div
        className="deck-mono uppercase mt-4 pt-3"
        style={{
          fontSize: '0.55rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          borderTop: '1px solid color-mix(in srgb, var(--cream) 8%, transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: reduced ? 0 : delayBase + 0.6 }}
      >
        same hierarchy · same privacy · same audit
      </motion.div>
    </div>
  );
}
