import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../motion';

/**
 * Slide 01 — Title.
 *
 * A2 Title-Card variant + B1 Editorial Header Stack + B2 Italic accent +
 * C4 Newspaper Reveal on the framework name + oversized "P" ornament at
 * 0.04 opacity (B7-adjacent ambient depth).
 */
export default function TitleSlide() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <motion.section
      ref={ref}
      data-slide="01"
      data-case="amber"
      className="relative w-full h-[100dvh] overflow-hidden flex flex-col"
      style={{
        background: 'var(--bg)',
        color: 'var(--cream)',
        padding: 'var(--deck-pad-top) var(--deck-gutter) var(--deck-pad-bottom)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Ambient depth — radial wash + vignette top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% -10%, color-mix(in srgb, var(--case) 14%, transparent), transparent 55%), linear-gradient(180deg, color-mix(in srgb, var(--panel) 30%, transparent) 0%, transparent 40%)',
        }}
      />

      {/* Oversized "P" ornament — opacity 0.04, slow reveal */}
      <div
        aria-hidden
        className="absolute -right-[8%] top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden z-0"
      >
        <motion.span
          className="deck-display leading-none"
          style={{
            fontSize: '85vw',
            color: 'var(--case)',
            opacity: 0.04,
            display: 'block',
            fontWeight: 700,
            letterSpacing: '-0.05em',
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={go ? { opacity: 0.04, scale: 1 } : { opacity: 0.04, scale: 1 }}
          transition={{ duration: 3, ease: EASE.expoOut }}
        >
          P
        </motion.span>
      </div>

      <div
        className="relative z-[1] w-full mx-auto flex flex-col flex-1"
        style={{ maxWidth: '1600px' }}
      >
        <div style={{ flex: '1 1 auto' }} aria-hidden />

        <div className="flex flex-col gap-[var(--space-6)] max-w-[1100px]">
          {/* B1 Eyebrow — hairline + uppercase mono */}
          <motion.div
            className="flex items-center gap-[var(--space-4)]"
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.span
              aria-hidden
              style={{
                display: 'inline-block',
                height: 2,
                width: 'clamp(32px, 4vw, 64px)',
                background: 'var(--case)',
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0 }}
              animate={go ? { scaleX: 1 } : { scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE.expoOut }}
            />
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
                fontWeight: 500,
              }}
            >
              REFERENCE ARCHITECTURE · 2026
            </span>
          </motion.div>

          {/* C4 Newspaper Reveal headline */}
          <div className="overflow-hidden pb-4 -mb-4">
            <motion.h1
              className="deck-display"
              style={{
                margin: 0,
                fontSize: 'var(--fs-slide-display)',
                lineHeight: 1.02,
                letterSpacing: 'var(--ls-display)',
                color: 'var(--cream)',
                fontWeight: 600,
              }}
              initial={{ opacity: 0, y: '32%' }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE.expoOut }}
            >
              Pharazi.
            </motion.h1>
          </div>

          {/* B2 italic-accented subhead */}
          <motion.p
            className="deck-display italic"
            style={{
              margin: 0,
              fontSize: 'var(--fs-slide-lead)',
              color: 'var(--cream-muted)',
              fontWeight: 400,
              lineHeight: 1.3,
              maxWidth: '38ch',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE.expoOut }}
          >
            An end-to-end AI multi-agent foundation for{' '}
            <span style={{ color: 'var(--cream)' }}>pharmaceutical sciences.</span>
          </motion.p>
        </div>

        <div style={{ flex: '1.4 1 auto' }} aria-hidden />

        {/* Author block + date stamp */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[var(--space-6)] relative z-[2]">
          <motion.div
            className="relative"
            style={{
              padding: 'var(--space-5) var(--space-6)',
              borderLeft: '3px solid var(--case)',
              borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
              background:
                'linear-gradient(90deg, color-mix(in srgb, var(--case) 9%, transparent) 0%, transparent 100%)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE.expoOut }}
          >
            <p
              className="deck-display"
              style={{
                margin: 0,
                fontSize: 'var(--fs-card-title)',
                color: 'var(--cream)',
                fontWeight: 600,
                letterSpacing: 'var(--ls-headline)',
              }}
            >
              Malek Okour, PharmD, PhD
            </p>
            <p
              style={{
                margin: 'var(--space-2) 0 0 0',
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.4,
              }}
            >
              Senior Director Candidate · Clinical Pharmacology &amp; Pharmacometrics AI
            </p>
          </motion.div>

          <motion.div
            className="deck-mono uppercase"
            style={{
              padding: 'var(--space-4) var(--space-5)',
              border: '1px solid color-mix(in srgb, var(--cream) 12%, transparent)',
              borderRadius: 'var(--radius-lg)',
              background:
                'linear-gradient(145deg, color-mix(in srgb, var(--panel) 40%, transparent) 0%, transparent 100%)',
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-faint)',
              alignSelf: 'flex-end',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 0.95 } : { opacity: 0.95 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            April 2026
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
