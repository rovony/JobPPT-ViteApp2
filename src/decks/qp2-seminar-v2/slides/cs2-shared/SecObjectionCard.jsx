import React from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

/**
 * SecObjectionCard — the verbatim Dec 10, 2024 CDSCO Subject Expert
 * Committee recommendation that defined the case's TURN.
 *
 * v2 (Apr-26 readability pass — resolved variant):
 *   The previous resolved variant struck the entire quote through with
 *   a 2px coral line, which made the most important verbatim text on
 *   the slide unreadable. The fix is a two-state cinematic:
 *     1. mount: quote appears full opacity in cream — the audience
 *        re-reads the original objection at slide-body scale.
 *     2. +1.2 s: a coral RESOLVED stamp lands at the right edge AND
 *        a single coral hairline crosses the quote (1px, not 2px),
 *        and the quote text fades to --cream-muted (≈ 65% lightness)
 *        so it stays fully readable behind the line. This is a
 *        canonical "stamped resolved" pattern, not a redacted blob.
 *   Reduced-motion: skip the second state's animation but keep the
 *   final visual (muted text + thin hairline + RESOLVED stamp).
 *
 * Variants
 *   • hero      — slide 17 (the turn). Large, amber-bordered, mono.
 *   • resolved  — slide 22 (the close). Compact, two-state cinematic.
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
        // HERO uses a structural 4px amber left rule only (no perimeter
        // border, no rounded corners, no tinted fill) so the verbatim
        // quote reads as an editorial pull-quote anchored by the rule —
        // not as a tinted callout box. Resolved keeps its slim chrome
        // because the small footprint + RESOLVED stamp need a defined
        // edge to dock against.
        ...(isHero
          ? {
              borderLeft: `4px solid ${accentColor}`,
              background: 'transparent',
            }
          : {
              border: `1.5px solid ${borderColor}`,
              borderLeft: `4px solid ${accentColor}`,
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--cream) 4%, transparent)',
            }),
        padding: isHero
          ? 'var(--space-4) var(--space-7) var(--space-4) var(--space-6)'
          : 'var(--space-3) calc(var(--space-4) + 120px) var(--space-3) var(--space-4)',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: accentColor,
          fontWeight: 700,
          marginBottom: isHero ? 'var(--space-3)' : 4,
          opacity: isResolved ? 0.75 : 1,
        }}
      >
        CDSCO · Oncology SEC · 10 December 2024
      </div>

      {isHero ? (
        <HeroQuote quote={QUOTE} accentColor={accentColor} />
      ) : (
        <ResolvedQuote shortQuote={SHORT_QUOTE} />
      )}

      {isHero && (
        <div
          style={{
            marginTop: 'var(--space-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-card-label)',
            color: 'var(--cream-faint)',
            letterSpacing: 'var(--ls-mono)',
          }}
        >
          Source · CDSCO Oncology SEC recommendation · December 2024
        </div>
      )}

      {isResolved && <ResolvedStamp />}
    </motion.div>
  );
}

/* ─── Hero variant: the verbatim quote ─────────────────────────── */
function HeroQuote({ quote, accentColor }) {
  return (
    <blockquote
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-card-quote)',
        color: 'var(--cream)',
        lineHeight: 1.45,
        margin: 0,
        fontStyle: 'normal',
        paddingLeft: 'var(--space-4)',
        borderLeft: `2px solid ${accentColor}`,
      }}
    >
      {`"${quote}"`}
    </blockquote>
  );
}

/* ─── Resolved variant: two-state animated readable callback ─── */
function ResolvedQuote({ shortQuote }) {
  const reduced = useReducedMotion();

  return (
    <div style={{ position: 'relative', paddingLeft: 'var(--space-2)' }}>
      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, color: 'var(--cream-muted)' }}
        transition={{
          opacity: { duration: 0.4, ease: [0.2, 0.7, 0.3, 1], delay: 0.4 },
          color:   { duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: reduced ? 0 : 1.4 },
        }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.45,
          margin: 0,
          fontStyle: 'normal',
          paddingLeft: 'var(--space-2)',
          borderLeft: '2px solid var(--cream-hairline)',
        }}
      >
        {`"${shortQuote}"`}
      </motion.blockquote>

      {/* Coral hairline that crosses the quote — 1px, NOT a strikethrough.
          The text underneath stays fully readable in cream-muted. */}
      <AnimatePresence>
        {!reduced && (
          <motion.div
            key="resolved-line"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              opacity: { duration: 0.3, delay: 1.2 },
              scaleX:  { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 1.2 },
            }}
            style={{
              position: 'absolute',
              left: 'var(--space-3)',
              right: 0,
              top: '50%',
              height: 1,
              background: 'var(--coral)',
              transformOrigin: 'left',
              pointerEvents: 'none',
              opacity: 0.85,
            }}
            aria-hidden
          />
        )}
        {reduced && (
          <div
            style={{
              position: 'absolute',
              left: 'var(--space-3)',
              right: 0,
              top: '50%',
              height: 1,
              background: 'var(--coral)',
              opacity: 0.85,
              pointerEvents: 'none',
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── RESOLVED stamp — coral, slight rotation, lands at +1.6s ─── */
function ResolvedStamp() {
  const reduced = useReducedMotion();
  const initial = reduced
    ? { opacity: 1, rotate: -8, scale: 1 }
    : { opacity: 0, rotate: -8, scale: 0.7 };
  const animate = { opacity: 1, rotate: -8, scale: 1 };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: reduced ? 0 : 1.6 }}
      style={{
        position: 'absolute',
        top: '50%',
        right: 14,
        transform: 'translateY(-50%) rotate(-8deg)',
        transformOrigin: 'center',
        whiteSpace: 'nowrap',
        border: '2px solid var(--coral)',
        color: 'var(--coral)',
        padding: '4px 12px',
        borderRadius: 4,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-card-label)',
        fontWeight: 800,
        letterSpacing: '0.20em',
        background: 'color-mix(in srgb, var(--coral) 12%, transparent)',
        pointerEvents: 'none',
      }}
    >
      RESOLVED
    </motion.div>
  );
}
