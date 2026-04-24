import React from 'react';
import { motion } from 'framer-motion';

/**
 * SecObjectionCard — the verbatim Dec 10, 2024 CDSCO Subject Expert
 * Committee recommendation that defined the case's TURN.
 *
 * Shared across slides 17 → 22 via layoutId="cs2-sec-objection". On
 * slide 17 it dominates the top two-thirds — large, amber-bordered,
 * mono typeface. On slide 22 it returns muted with a strikethrough and
 * a coral RESOLVED stamp, sitting next to the approval-date hero tile.
 *
 * The exact verbatim language from the December minutes:
 *   "Firm should conduct a PK/PD study in Indian population and
 *    accordingly, submit the PK/PD study protocol to CDSCO for
 *    further review by the committee."
 */

const QUOTE = 'Firm should conduct a PK/PD study in Indian population and accordingly, submit the PK/PD study protocol to CDSCO for further review by the committee.';

const SHORT_QUOTE = 'Firm should conduct a PK/PD study in Indian population…';

export default function SecObjectionCard({
  layoutId = 'cs2-sec-objection',
  variant = 'hero',
  className = '',
}) {
  const isHero = variant === 'hero';
  const isResolved = variant === 'resolved';

  const borderColor = isResolved ? 'var(--cream-hairline)' : 'var(--amber, #d8a634)';
  const accentColor = isResolved ? 'var(--cream-muted)' : 'var(--amber, #d8a634)';

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: { duration: 1.4, ease: [0.4, 0, 0.2, 1] } }}
      className={className}
      style={{
        border: `1.5px solid ${borderColor}`,
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: 'var(--radius-md)',
        background: isResolved
          ? 'color-mix(in srgb, var(--cream) 4%, transparent)'
          : 'linear-gradient(135deg, color-mix(in srgb, var(--amber, #d8a634) 8%, transparent), color-mix(in srgb, var(--panel) 70%, transparent) 70%)',
        padding: isHero ? 'var(--space-6) var(--space-7)' : 'var(--space-3) var(--space-4)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Date stamp */}
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: accentColor,
          fontWeight: 700,
          marginBottom: isHero ? 'var(--space-3)' : 4,
          opacity: isResolved ? 0.7 : 1,
        }}
      >
        CDSCO · Oncology SEC · 10 December 2024
      </div>

      {/* Quote */}
      <blockquote
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: isHero ? 'clamp(1.1rem, 1.6vw, 1.8rem)' : 'var(--fs-slide-body)',
          color: isResolved ? 'var(--cream-muted)' : 'var(--cream)',
          lineHeight: 1.45,
          margin: 0,
          fontStyle: 'normal',
          textDecoration: isResolved ? 'line-through' : 'none',
          textDecorationColor: isResolved ? 'var(--coral)' : 'transparent',
          textDecorationThickness: isResolved ? 2 : 0,
          paddingLeft: isHero ? 'var(--space-4)' : 'var(--space-2)',
          borderLeft: `2px solid ${accentColor}`,
          opacity: isResolved ? 0.7 : 1,
        }}
      >
        {isHero ? `"${QUOTE}"` : `"${SHORT_QUOTE}"`}
      </blockquote>

      {/* Source attribution */}
      {isHero && (
        <div
          style={{
            marginTop: 'var(--space-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-slide-pageno)',
            color: 'var(--cream-faint)',
            letterSpacing: 'var(--ls-mono)',
          }}
        >
          Source · CDSCO Oncology SEC minutes · December 2024
        </div>
      )}

      {/* RESOLVED stamp */}
      {isResolved && (
        <motion.div
          initial={{ opacity: 0, rotate: -8, scale: 0.7 }}
          animate={{ opacity: 1, rotate: -8, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 1.6 }}
          style={{
            position: 'absolute',
            top: '50%',
            right: 18,
            transform: 'translateY(-50%) rotate(-8deg)',
            transformOrigin: 'center',
            border: '2px solid var(--coral)',
            color: 'var(--coral)',
            padding: '4px 10px',
            borderRadius: 4,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.18em',
            background: 'color-mix(in srgb, var(--coral) 8%, transparent)',
            pointerEvents: 'none',
          }}
        >
          RESOLVED
        </motion.div>
      )}
    </motion.div>
  );
}
