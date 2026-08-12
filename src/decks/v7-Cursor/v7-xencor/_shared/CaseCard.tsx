// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * CaseCard — shared component used on slide 01 (title) and slide 02
 * (hook-A) so the cards render IDENTICALLY across the slide
 * transition. layoutId="hook-mark-csN" makes framer-motion morph the
 * cards in place — they appear to never leave when the speaker
 * advances slide 1 → slide 2.
 *
 * Paper rule: never mount at opacity 0. SlideTransition already owns
 * enter visibility; fading the card itself left content stuck invisible
 * when layoutId + LayoutGroup thrashed the motion clock.
 */
export default function CaseCard({
  c,
  index,
  go = true,
  idleAtRest = false,
  persistent = false,
  compact = false,
}) {
  void idleAtRest;
  void persistent;
  const base = Math.min(0.12 + index * 0.05, 0.28);

  return (
    <motion.div
      layoutId={`hook-mark-cs${c.id}`}
      layout="position"
      className="relative h-full"
      style={{
        padding: compact
          ? 'var(--space-3) var(--space-3) var(--space-3) var(--space-4)'
          : 'var(--space-4) var(--space-4) var(--space-4) var(--space-5)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        borderTop: `3px solid ${c.color}`,
        background: 'var(--panel)',
        overflow: 'hidden',
      }}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: go ? 0.28 : 0, delay: go ? base : 0, ease: [0.2, 0.7, 0.3, 1] }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 'var(--space-4)',
          bottom: 'var(--space-4)',
          width: 2,
          borderRadius: '1px',
          backgroundColor: c.color,
        }}
      />
      <p
        className="deck-mono uppercase"
        style={{
          margin: 0,
          fontSize: compact ? 'var(--fs-slide-eyebrow)' : 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono)',
          fontWeight: 600,
          color: c.color,
          marginBottom: compact ? 'var(--space-2)' : 'var(--space-1)',
        }}
      >
        {compact ? (c.shortLabel ?? c.label) : c.label}
      </p>
      {compact ? (
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-slide-subhead)',
            fontWeight: 500,
            lineHeight: 1.25,
            color: 'var(--cream-muted)',
          }}
        >
          {c.shortTitle ?? c.title}
        </p>
      ) : (
        <>
          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-card-title)',
              fontWeight: 600,
              lineHeight: 1.2,
              color: 'var(--cream)',
              marginBottom: 'var(--space-1)',
            }}
          >
            {c.title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream-muted)',
              lineHeight: 1.45,
            }}
          >
            {c.note}
          </p>
        </>
      )}
    </motion.div>
  );
}
