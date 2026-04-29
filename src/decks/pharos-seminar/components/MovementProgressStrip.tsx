// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../motion';

/**
 * MovementProgressStrip — three horizontal Gantt bars proportional to
 * each movement's time budget (M1 4min · M2 18min · M3 8min). Used by:
 *
 *   - 02.5 Agenda      → mode='full' (color all 3, no pulse)
 *   - 06.5 M2 marker   → mode='marker' activeMovement={2}
 *   - 12.5 M3 marker   → mode='marker' activeMovement={3}
 *
 * In 'marker' mode, completed movements dim to ~30%; the active one
 * pulses with case-color glow; future ones stay faint.
 *
 * Reduced-motion: pulse becomes static, bars cascade-in becomes instant.
 */

type Props = {
  mode?: 'full' | 'marker';
  activeMovement?: 1 | 2 | 3;
  delayBase?: number;
  /** Optional override for the bottom caption. */
  caption?: string;
};

const MOVEMENTS = [
  { id: 1, label: 'M1 · The Vision',     mins: 4,  case: 'amber'  as const },
  { id: 2, label: 'M2 · The Architecture', mins: 18, case: 'cyan'   as const },
  { id: 3, label: 'M3 · The Future',     mins: 8,  case: 'violet' as const },
];

const TOTAL_MINS = MOVEMENTS.reduce((s, m) => s + m.mins, 0); // 30

export default function MovementProgressStrip({
  mode = 'full',
  activeMovement = 2,
  delayBase = 0.2,
  caption,
}: Props) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontSize: 11,
        letterSpacing: '0.16em',
        color: 'var(--cream-faint)',
      }}
      aria-label={`Seminar agenda · 30 minutes · 3 movements${
        mode === 'marker' ? ` · now in movement ${activeMovement}` : ''
      }`}
    >
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, height: 22 }}>
        {MOVEMENTS.map((m, i) => {
          const isActive = mode === 'marker' && m.id === activeMovement;
          const isPast = mode === 'marker' && m.id < activeMovement;
          const isFuture = mode === 'marker' && m.id > activeMovement;
          const widthPct = (m.mins / TOTAL_MINS) * 100;

          let opacity = 1;
          if (mode === 'marker') {
            if (isPast) opacity = 0.28;
            else if (isFuture) opacity = 0.16;
            else opacity = 1;
          }

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity, scaleX: 1 }}
              transition={{
                delay: delayBase + i * 0.18,
                duration: 0.7,
                ease: EASE.expoOut,
              }}
              style={{
                flexBasis: `${widthPct}%`,
                flexGrow: 0,
                flexShrink: 0,
                background: `var(--case-${m.case}, var(--case))`,
                marginRight: i < MOVEMENTS.length - 1 ? 4 : 0,
                transformOrigin: 'left',
                position: 'relative',
                boxShadow: isActive
                  ? `0 0 18px var(--case-${m.case}, var(--case))`
                  : 'none',
              }}
            >
              {isActive && (
                <motion.div
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `var(--case-${m.case}, var(--case))`,
                    boxShadow: `0 0 22px var(--case-${m.case}, var(--case))`,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{caption ?? '0:00 → 30:00 · then Q&A'}</span>
        <span style={{ display: 'flex', gap: 24 }}>
          {MOVEMENTS.map((m) => {
            const isActive = mode === 'marker' && m.id === activeMovement;
            return (
              <span
                key={m.id}
                style={{
                  color: isActive
                    ? `var(--case-${m.case}, var(--case))`
                    : 'var(--cream-faint)',
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {m.label} · {m.mins}m
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
}
