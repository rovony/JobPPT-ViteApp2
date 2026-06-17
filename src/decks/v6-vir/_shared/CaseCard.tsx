// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * CaseCard — shared component used on slide 01 (title) and slide 02
 * (hook-A) so the 3 cards render IDENTICALLY across the slide
 * transition. layoutId="hook-mark-csN" makes framer-motion morph the
 * cards in place — they appear to never leave when the speaker
 * advances slide 1 → slide 2.
 *
 * Props:
 *   c           — case object from _shared/cases.ts
 *   index       — 0/1/2, used for entrance stagger
 *   go          — animation gate (true after isInView)
 *   idleAtRest  — when true, run the spotlight glow cycle (used on
 *                  slide 01 where the card is meant to "live").
 *                  On slide 02 we typically pass false so the card
 *                  sits quietly while the badges below do the work.
 */
export default function CaseCard({ c, index, go, idleAtRest, persistent = false, compact = false }) {
  // Stagger after the title slide's headline lands. On slide 02 the
  // cards are morphed in via layoutId so this entrance only fires
  // once on slide 01.
  const base = 1.6 + index * 0.18;
  const startOpacity = persistent ? 1 : 0;
  const startY = persistent ? 0 : 8;

  const cardIdle = go && idleAtRest;
  const baseInset = 'inset 0 1px 0 color-mix(in srgb, var(--cream) 6%, transparent)';
  const cardGlowOff = `${baseInset}, 0 0 0 0 transparent`;
  const cardGlowPeak = `${baseInset}, 0 0 24px 2px color-mix(in srgb, ${c.color} 75%, transparent)`;
  const cardGlowFade = `${baseInset}, 0 0 12px 1px color-mix(in srgb, ${c.color} 35%, transparent)`;

  return (
    <motion.div
      layoutId={`hook-mark-cs${c.id}`}
      layout
      className="relative h-full"
      style={{
        padding: compact
          ? 'var(--space-3) var(--space-3) var(--space-3) var(--space-4)'
          : 'var(--space-4) var(--space-4) var(--space-4) var(--space-5)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid color-mix(in srgb, var(--cream) 10%, transparent)',
        background: 'color-mix(in srgb, var(--panel) 38%, transparent)',
        overflow: 'hidden',
      }}
      initial={{ opacity: startOpacity, boxShadow: cardGlowOff }}
      animate={
        cardIdle
          ? {
              opacity: 1,
              boxShadow: [
                cardGlowOff,
                cardGlowOff,
                cardGlowPeak,
                cardGlowFade,
                cardGlowOff,
                cardGlowOff,
                cardGlowOff,
              ],
            }
          : go
            ? { opacity: 1, boxShadow: cardGlowOff }
            : { opacity: 1, boxShadow: cardGlowOff }
      }
      transition={
        cardIdle
          ? {
              opacity: { duration: 0 },
              boxShadow: {
                duration: 18,
                times: [0, 1 / 18, 3 / 18, 5 / 18, 6 / 18, 17 / 18, 1],
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 6,
              },
            }
          : { duration: 0.01, delay: base }
      }
    >
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 'var(--space-4)',
          bottom: 'var(--space-4)',
          width: 2,
          borderRadius: '1px',
          backgroundColor: c.color,
          transformOrigin: 'top center',
        }}
        initial={{ scaleY: persistent ? 1 : 0 }}
        animate={go ? { scaleY: 1 } : { scaleY: 1 }}
        transition={{ duration: 0.3, delay: base }}
      />
      <motion.p
        className="deck-mono uppercase"
        style={{
          margin: 0,
          fontSize: compact ? 'var(--fs-slide-eyebrow)' : 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono)',
          fontWeight: 600,
          color: c.color,
          marginBottom: compact ? 'var(--space-2)' : 'var(--space-1)',
        }}
        initial={{ opacity: startOpacity, y: startY }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: base + 0.08 }}
      >
        {compact ? (c.shortLabel ?? c.label) : c.label}
      </motion.p>
      {compact ? (
        <motion.p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-slide-subhead)',
            fontWeight: 500,
            lineHeight: 1.25,
            color: 'var(--cream-muted)',
          }}
          initial={{ opacity: startOpacity, y: startY }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: base + 0.16 }}
        >
          {c.shortTitle ?? c.title}
        </motion.p>
      ) : (
        <>
          <motion.h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-card-title)',
              fontWeight: 600,
              lineHeight: 1.2,
              color: 'var(--cream)',
              marginBottom: 'var(--space-1)',
            }}
            initial={{ opacity: startOpacity, y: startY }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: base + 0.16 }}
          >
            {c.title}
          </motion.h3>
          <motion.p
            style={{
              margin: 0,
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream-muted)',
              lineHeight: 1.45,
            }}
            initial={{ opacity: startOpacity, y: startY }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: base + 0.24 }}
          >
            {c.note}
          </motion.p>
        </>
      )}
    </motion.div>
  );
}
