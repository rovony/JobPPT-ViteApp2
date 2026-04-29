// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '../motion';

/**
 * PhaseChip — small "NOW · {label}" pill that hovers in the top-right
 * corner of a component-card SVG. Adapted from the cs3-06 StepBanner.
 *
 * Use to surface the current named beat from `useStory()` so the speaker
 * (and the audience) can see what the animation is doing right now.
 *
 *   <PhaseChip label={LABELS[story.phase]} />
 *
 * Renders nothing if `label` is falsy.
 */

type Props = {
  label?: string | null;
  align?: 'right' | 'left';
};

export default function PhaseChip({ label, align = 'right' }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        [align]: 0,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence mode="wait">
        {label ? (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: EASE.expoOut }}
            className="deck-mono uppercase"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 999,
              background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
              border: '1px solid color-mix(in srgb, var(--case) 40%, transparent)',
              color: 'var(--case)',
              fontSize: 10,
              letterSpacing: '0.20em',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              boxShadow: '0 4px 20px color-mix(in srgb, var(--case) 12%, transparent)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: 'var(--case)',
                boxShadow: '0 0 10px var(--case)',
              }}
            />
            NOW · {label}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
