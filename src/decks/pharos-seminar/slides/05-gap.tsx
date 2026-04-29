import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE, SPRING } from '../motion';
import CentralHairline from '../components/backgrounds/CentralHairline';

/**
 * Slide 05 — "The MIDD foundation is unbuilt" · A4 Sparse Closing Stack.
 *
 * Three lines, each Newspaper-Reveal, culminating in a large italic line
 * that lands with a cushiony spring. Sub-line follows. No chrome — sparse
 * means sparse. B5 Source line shows in tiny mono at the bottom.
 *
 * Amendment 5 vocabulary: "substrate" → "foundation" in the punchline.
 * Background: A1 §5 CentralHairline draws across slide at 0.4s for visual
 * tension. The whole slide lands as a Decisive Move per A4.
 */
const LINES = [
  'Discovery has multi-agent.',
  'QCP has Apollo-AI.',
];

export default function GapSlide() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <motion.section
      ref={ref}
      data-slide="05"
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
      {/* Ambient depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 50%, color-mix(in srgb, var(--case) 10%, transparent), transparent 60%)',
        }}
      />

      {/* A1 §5 — Central hairline draws across slide for visual tension */}
      <CentralHairline delay={0.4} y={0.62} opacity={0.32} />

      {/* Oversized "?" ornament behind, very faint */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
      >
        <motion.span
          className="deck-display leading-none"
          style={{
            fontSize: '70vw',
            color: 'var(--case)',
            opacity: 0.025,
            display: 'block',
            fontWeight: 700,
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={go ? { opacity: 0.025, scale: 1 } : { opacity: 0.025, scale: 1 }}
          transition={{ duration: 3, ease: EASE.expoOut }}
        >
          ?
        </motion.span>
      </div>

      <div className="relative z-[1] flex flex-col items-center text-center max-w-[1300px] gap-10">
        {/* Pre-lines */}
        <div className="flex flex-col gap-5 items-center">
          {LINES.map((line, i) => (
            <RevealLine key={line} delay={0.2 + i * 0.6} go={go}>
              {line}
            </RevealLine>
          ))}
        </div>

        {/* Punchline */}
        <div className="overflow-hidden pb-4 -mb-4">
          <motion.h1
            className="deck-display"
            style={{
              margin: 0,
              fontSize: 'clamp(3.5rem, 6.8vw, 7rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
              fontWeight: 600,
            }}
            initial={{ opacity: 0, y: '40%' }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ delay: 1.5, ...SPRING.cushiony }}
          >
            The MIDD foundation is{' '}
            <span className="italic" style={{ color: 'var(--case)' }}>
              unbuilt.
            </span>
          </motion.h1>
        </div>

        {/* Sub-line — criteria */}
        <motion.p
          className="deck-mono uppercase"
          style={{
            margin: 0,
            fontSize: 'clamp(0.75rem, 1.05vw, 1rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-muted)',
            lineHeight: 1.7,
            maxWidth: '60ch',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.3, ease: EASE.expoOut }}
        >
          End-to-end · structurally private · cryptographically audited · M15-aligned
        </motion.p>
      </div>

      {/* Bottom-left source line — sparse but rigorous */}
      <motion.span
        className="deck-mono"
        style={{
          position: 'absolute',
          bottom: 'var(--deck-pad-bottom)',
          left: 'var(--deck-gutter)',
          fontSize: '0.62rem',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 0.7 } : { opacity: 0.7 }}
        transition={{ duration: 0.6, delay: 2.7 }}
      >
        Source · authors' literature search · Apr 2026
      </motion.span>
    </motion.section>
  );
}

function RevealLine({
  children,
  delay,
  go,
}: {
  children: React.ReactNode;
  delay: number;
  go: boolean;
}) {
  return (
    <div className="overflow-hidden pb-2 -mb-2">
      <motion.p
        className="deck-display"
        style={{
          margin: 0,
          fontSize: 'clamp(2rem, 3.6vw, 3.5rem)',
          color: 'var(--cream-muted)',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
        }}
        initial={{ y: '110%', opacity: 0 }}
        animate={go ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: EASE.expoOut }}
      >
        {children}
      </motion.p>
    </div>
  );
}
