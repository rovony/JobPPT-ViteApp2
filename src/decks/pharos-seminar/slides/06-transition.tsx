import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../motion';
import RomanOrnament from '../components/backgrounds/RomanOrnament';
import MovementProgressStrip from '../components/MovementProgressStrip';

/**
 * Slide 06 — Movement II marker · "The foundation exists."
 *
 * A2 Title-Card Variant + RomanOrnament "II" background + Newspaper
 * Reveal on headline + tri-beat sub-line + MovementProgressStrip at
 * the bottom showing M2 active.
 *
 * Per Amendment 2: voice rewritten from "I designed and built that
 * substrate" to "The foundation exists" — work-as-subject, strict-zero
 * first-person.
 *
 * Per Amendment 5: vocabulary updated — "substrate" → "foundation"
 * (most-spoken register).
 */
export default function TransitionArchitectureSlide() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <motion.section
      ref={ref}
      data-slide="06"
      data-case="amber"
      className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center"
      style={{
        background: 'var(--bg)',
        color: 'var(--cream)',
        padding: 'var(--deck-pad-top) var(--deck-gutter) var(--deck-pad-bottom)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Ambient + II ornament */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, color-mix(in srgb, var(--case) 8%, transparent), transparent 60%)',
        }}
      />

      <RomanOrnament numeral="II" opacity={0.05} scale={0.85} />

      <div className="relative z-[1] flex flex-col items-center text-center gap-8 max-w-[1500px]">
        {/* Pre-eyebrow chip */}
        <motion.div
          className="inline-flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={go ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              height: 1,
              width: '48px',
              background: 'var(--case)',
            }}
          />
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.72rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case)',
            }}
          >
            MOVEMENT II · ARCHITECTURE
          </span>
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              height: 1,
              width: '48px',
              background: 'var(--case)',
            }}
          />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden pb-4 -mb-4">
          <motion.h1
            className="deck-display"
            style={{
              margin: 0,
              fontSize: 'clamp(3.5rem, 6.5vw, 7rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
              fontWeight: 600,
            }}
            initial={{ y: '50%', opacity: 0 }}
            animate={go ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE.expoOut }}
          >
            The foundation{' '}
            <span className="italic" style={{ color: 'var(--case)' }}>
              exists.
            </span>
          </motion.h1>
        </div>

        {/* Tri-beat sub-line */}
        <motion.p
          className="deck-mono uppercase"
          style={{
            margin: 0,
            fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-muted)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: EASE.expoOut }}
        >
          Design principles · working system · scalability
        </motion.p>
      </div>

      {/* Movement progress strip — anchored bottom, M2 active */}
      <div
        className="absolute left-0 right-0 z-[1]"
        style={{ bottom: 'calc(var(--deck-pad-bottom) + 16px)' }}
      >
        <div className="mx-auto max-w-[1100px] px-6">
          <MovementProgressStrip
            mode="marker"
            activeMovement={2}
            delayBase={1.4}
            caption="MOVEMENT II BEGINS"
          />
        </div>
      </div>
    </motion.section>
  );
}
