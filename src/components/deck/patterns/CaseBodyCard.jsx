import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * CaseBodyCard — the reusable case-body card used across CS1 slides
 * (background · challenge · strategy · build · fit · etc).
 *
 * Internal layout:
 *   ┌─┬─────────────────────────────────────┬───────────────────┐
 *   │A│  NUMBER · EYEBROW                   │                   │
 *   │ │  Title (Fraunces fallback → body)   │     visual        │
 *   │C│  body prose                          │     (right 40%)  │
 *   │ │                                      │                   │
 *   └─┴─────────────────────────────────────┴───────────────────┘
 *   A = 3px vertical accent bar (full height)
 *
 *  · No hard border, no drop shadow.
 *  · Background: panel at ~55% mixed with transparent for subtle
 *    elevation against --bg.
 *  · Padding: var(--space-5) on all sides; accent bar + space-5.
 *  · Radius: var(--radius-md) (8px).
 *  · All tokens read from CSS variables — no hex, no hardcoded sizes.
 *
 * Props:
 *   number        — "01" "02" ...            (string)
 *   eyebrow       — "THE DISEASE"            (string, uppercased)
 *   title         — card H2 line             (string | React node)
 *   body          — prose + highlights       (React node)
 *   visual        — chart / diagram node     (React node)
 *   accentColor   — CSS color (default var(--case, var(--coral)))
 *   orientation   — 'horizontal' (default) two-col text|visual
 *                   'vertical' text-only stacked (no visual col)
 *   delay         — entrance delay in seconds (number)
 */
export default function CaseBodyCard({
  number,
  eyebrow,
  title,
  body,
  visual,
  accentColor = 'var(--case, var(--coral))',
  orientation = 'horizontal',
  delay = 0,
  titleId,
}) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const generatedId = React.useId();
  const labelledBy = titleId || `case-card-${generatedId}`;

  const hasVisual = orientation === 'horizontal' && Boolean(visual);

  return (
    <motion.article
      role="article"
      aria-labelledby={labelledBy}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: hasVisual ? 'minmax(0, 1fr) minmax(0, 0.85fr)' : 'minmax(0, 1fr)',
        columnGap: 'var(--space-5)',
        padding: 'var(--space-5)',
        paddingLeft: 'calc(var(--space-5) + 8px)',
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        borderRadius: 'var(--radius-md)',
        minWidth: 0,
        minHeight: 0,
        height: '100%',
        overflow: 'hidden',
      }}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay }}
    >
      {/* Accent bar — full card height */}
      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: accentColor,
          transformOrigin: 'top center',
        }}
        initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: reduce ? 0 : 0.4, ease, delay: reduce ? 0 : delay }}
      />

      {/* ─── LEFT · text column ─── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          minWidth: 0,
          justifyContent: 'flex-start',
        }}
      >
        {/* NUMBER · EYEBROW line */}
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.6rem, 0.72vw, 0.75rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            fontWeight: 500,
            color: 'var(--cream-faint)',
          }}
        >
          <span style={{ color: accentColor }}>{number}</span>
          <span style={{ color: 'var(--cream-dim)', margin: '0 0.55em' }}>·</span>
          <span style={{ color: accentColor }}>{eyebrow}</span>
        </div>

        {/* TITLE */}
        <h2
          id={labelledBy}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.15rem, 1.55vw, 1.75rem)',
            fontWeight: 600,
            color: 'var(--cream)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          {title}
        </h2>

        {/* BODY */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.82rem, 1vw, 1.02rem)',
            lineHeight: 1.55,
            color: 'var(--cream-muted)',
          }}
        >
          {body}
        </div>
      </div>

      {/* ─── RIGHT · visual column ─── */}
      {hasVisual && (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 0,
            minHeight: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {visual}
          </div>
        </div>
      )}
    </motion.article>
  );
}

/**
 * Highlight — inline emphasis chip for use inside card body text.
 * Subtle case-color wash behind text, preserved across line breaks.
 */
export function CardHighlight({ children, color = 'var(--case, var(--coral))' }) {
  return (
    <span
      style={{
        background: `color-mix(in srgb, ${color} 22%, transparent)`,
        color: 'var(--cream)',
        padding: '2px 8px',
        borderRadius: 4,
        fontWeight: 500,
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
      }}
    >
      {children}
    </span>
  );
}