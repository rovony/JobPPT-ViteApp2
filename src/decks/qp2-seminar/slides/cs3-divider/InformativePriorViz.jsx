import React from 'react';
import { motion } from 'framer-motion';

/**
 * InformativePriorViz — concentric-circle visualization of Bayesian
 * prior strength, refactored as a SHARED ELEMENT so it morphs across
 * CS3 slides (divider 23 → fit 27) the same way LungsShared morphs
 * between CS1 slides 5 → 6.
 *
 * Two variants driven by the `variant` prop:
 *
 *   variant="hero" (slide 23, divider, right-column):
 *     - Full size, full label set ("PEDIATRIC PRIOR · N = 124", "ADULT
 *       ANCHOR · N = 60"), original staggered animations on first
 *       mount.
 *     - This is the FROM-bbox for the morph.
 *
 *   variant="context" (slide 27, fit, faint backdrop):
 *     - Larger explicit width — the TO-bbox.
 *     - Skips text labels and connecting tick (those would clash with
 *       the slide's own headline / curve content).
 *     - Lower opacity rings; static (no entrance animations) so the
 *       layoutId match IS the arrival animation when navigating from
 *       the divider.
 *
 * The OUTER ring is the pediatric pooled PopPK (N = 124 from AALL07P4
 * + DFCI 11-001) — large, faint, the "weight of prior evidence."
 * The INNER disc is the adult sample (N = 60, FDA-agreed) — small but
 * fully filled, the "anchor that confirms PK similarity, not re-derives
 * the model."
 *
 * Same layoutId is used in both variants so framer's LayoutGroup in
 * DeckRunner matches them across the slide transition. 1.8s cubic
 * "camera pullback" matches LungsShared exactly.
 */

const LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] };

const DIMENSIONS = {
  hero:    { width: 'clamp(220px, 26vw, 360px)' },
  context: { width: 'clamp(360px, 38vw, 560px)' },
};

export default function InformativePriorViz({
  layoutId = 'cs3-prior-anchor',
  variant = 'hero',
  stroke = 'var(--case, var(--violet))',
  delay = 0.4,
  className = '',
}) {
  const dims = DIMENSIONS[variant] || DIMENSIONS.hero;
  const isHero = variant === 'hero';
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: LAYOUT_TRANSITION }}
      className={className}
      style={{
        width: dims.width,
        aspectRatio: '1 / 1',
        color: stroke,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      aria-hidden={!isHero}
    >
      <svg
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
        aria-label={isHero ? 'Informative pediatric prior with adult anchor sample' : undefined}
        role={isHero ? 'img' : undefined}
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id={`prior-glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={isHero ? 3.6 : 2.4} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`prior-fill-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={stroke} stopOpacity={isHero ? 0.32 : 0.10} />
            <stop offset="60%"  stopColor={stroke} stopOpacity={isHero ? 0.18 : 0.05} />
            <stop offset="100%" stopColor={stroke} stopOpacity={isHero ? 0.04 : 0.02} />
          </radialGradient>
          <radialGradient id={`anchor-fill-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={stroke} stopOpacity={isHero ? 0.95 : 0.32} />
            <stop offset="100%" stopColor={stroke} stopOpacity={isHero ? 0.55 : 0.18} />
          </radialGradient>
        </defs>

        {/* Faint outer halo */}
        {isHero ? (
          <motion.circle
            cx={300}
            cy={300}
            r={278}
            fill="none"
            stroke={stroke}
            strokeWidth={0.7}
            strokeDasharray="2 6"
            opacity={0.35}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 1.0, ease, delay: delay + 0.1 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ) : (
          <circle
            cx={300}
            cy={300}
            r={278}
            fill="none"
            stroke={stroke}
            strokeWidth={0.7}
            strokeDasharray="2 6"
            opacity={0.18}
          />
        )}

        <g filter={`url(#prior-glow-${variant})`}>
          {/* OUTER RING — pediatric prior · N = 124 */}
          {isHero ? (
            <motion.circle
              cx={300}
              cy={300}
              r={232}
              fill={`url(#prior-fill-${variant})`}
              stroke={stroke}
              strokeWidth={2.4}
              strokeDasharray="6 4"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease, delay }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ) : (
            <circle
              cx={300}
              cy={300}
              r={232}
              fill={`url(#prior-fill-${variant})`}
              stroke={stroke}
              strokeWidth={1.6}
              strokeOpacity={0.42}
              strokeDasharray="6 4"
            />
          )}

          {/* INNER DISC — adult anchor · N = 60 */}
          {isHero ? (
            <motion.circle
              cx={300}
              cy={300}
              r={94}
              fill={`url(#anchor-fill-${variant})`}
              stroke={stroke}
              strokeWidth={2.6}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: overshoot, delay: delay + 1.4 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ) : (
            <circle
              cx={300}
              cy={300}
              r={94}
              fill={`url(#anchor-fill-${variant})`}
              stroke={stroke}
              strokeWidth={1.6}
              strokeOpacity={0.42}
            />
          )}

          {/* Hero-only labels — labels would clash with cs3-fit content
              if rendered on the context backdrop, so they're hero-only. */}
          {isHero && (
            <>
              <motion.text
                x={300}
                y={56}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={13}
                letterSpacing="0.22em"
                fontWeight={700}
                fill={stroke}
                opacity={0.92}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.92 }}
                transition={{ duration: 0.6, ease, delay: delay + 0.7 }}
              >
                PEDIATRIC PRIOR
              </motion.text>
              <motion.text
                x={300}
                y={78}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontSize={12}
                fill="var(--cream-muted)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease, delay: delay + 0.9 }}
              >
                AALL07P4 + DFCI 11-001
              </motion.text>
              <motion.text
                x={300}
                y={544}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={28}
                letterSpacing="0.06em"
                fontWeight={700}
                fill={stroke}
                opacity={0.85}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ duration: 0.55, ease, delay: delay + 0.85 }}
              >
                N = 124
              </motion.text>
              <motion.text
                x={300}
                y={293}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={11.5}
                letterSpacing="0.22em"
                fontWeight={700}
                fill="var(--bg)"
                opacity={0.98}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.98 }}
                transition={{ duration: 0.5, ease, delay: delay + 1.85 }}
              >
                ADULT ANCHOR
              </motion.text>
              <motion.text
                x={300}
                y={324}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={28}
                letterSpacing="0.04em"
                fontWeight={800}
                fill="var(--bg)"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: delay + 2.0 }}
              >
                N = 60
              </motion.text>
              <motion.line
                x1={300}
                y1={206}
                x2={300}
                y2={138}
                stroke={stroke}
                strokeWidth={1.2}
                strokeDasharray="3 4"
                opacity={0.6}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 0.6, ease, delay: delay + 2.3 }}
              />
            </>
          )}
        </g>
      </svg>
    </motion.div>
  );
}
