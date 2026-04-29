import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../motion';

/**
 * Slide 19 — Q&A.
 *
 * A2 Title-Card Variant + oversized "?" ornament at 0.06 opacity +
 * Newspaper Reveal on the centered "Questions." word.
 *
 * Per Amendment 2: slide moved from position 17 to 19 after Movement-3
 * component-tour insertion (slides 13–17 are now component cards).
 * Content unchanged.
 */
export default function QASlide() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <motion.section
      ref={ref}
      data-slide="19"
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, color-mix(in srgb, var(--case) 10%, transparent), transparent 60%)',
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
      >
        <motion.span
          className="deck-display leading-none"
          style={{
            fontSize: '78vw',
            color: 'var(--case)',
            opacity: 0.06,
            display: 'block',
            fontWeight: 700,
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={go ? { opacity: 0.06, scale: 1 } : { opacity: 0.06, scale: 1 }}
          transition={{ duration: 2.5, ease: EASE.expoOut }}
        >
          ?
        </motion.span>
      </div>

      <div className="relative z-[1] flex flex-col items-center text-center gap-8 max-w-[1500px]">
        <div className="overflow-hidden pb-4 -mb-4">
          <motion.h1
            className="deck-display"
            style={{
              margin: 0,
              fontSize: 'clamp(5rem, 11vw, 13rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: 'var(--cream)',
              fontWeight: 600,
            }}
            initial={{ y: '50%', opacity: 0 }}
            animate={go ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: EASE.expoOut }}
          >
            Questions.
          </motion.h1>
        </div>

        <motion.p
          className="deck-mono uppercase"
          style={{
            margin: 0,
            fontSize: 'clamp(0.78rem, 1vw, 1rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-muted)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: EASE.expoOut }}
        >
          Backup slides ready · audit chain accessible · demo on standby
        </motion.p>
      </div>
    </motion.section>
  );
}
