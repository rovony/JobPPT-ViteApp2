import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE, SPRING } from '../motion';

/**
 * Slide 18 — Close · two-part slide.
 *
 *   PART A: A4 Sparse Closing Stack — "Regulatory framework? Exists.
 *           Architectural foundation? Built. Working substrate? Deployed."
 *           then a big italic line: "The substrate exists. The next
 *           chapter scales it."
 *
 *   PART B: 8-cell ecosystem grid — each cell its own --case color.
 *
 * Auto-advance after 8s OR keyboard 'Space' / 'ArrowRight' triggers Part B.
 * Part B uses the FULL 5-color rotation simultaneously — symbolic close.
 *
 * Per Amendment 2: voice rewritten from "I built the substrate. I want
 * to build the company that runs on it." to "The substrate exists. The
 * next chapter scales it." — strict-zero first-person, work-as-subject.
 * Slide moved from position 16 to 18 after Movement-3 component-tour
 * insertion (slides 13–17 are now component cards).
 */

const ECOSYSTEM = [
  { label: 'Manuscript · CPT:PSP', state: 'in prep', tone: 'amber' },
  { label: 'github.com/pharazi', state: 'live', tone: 'cyan' },
  { label: 'pharazi.ai', state: 'framework home', tone: 'violet' },
  { label: 'clinpharm.ai', state: 'community', tone: 'coral' },
  { label: 'R package · CRAN', state: 'roadmap', tone: 'sage' },
  { label: 'Python pkg · PyPI', state: 'roadmap', tone: 'amber' },
  { label: 'Newsletter', state: 'monthly', tone: 'cyan' },
  { label: 'Conference talks', state: '1 / quarter', tone: 'violet' },
];

const PRE_LINES = [
  { label: 'Regulatory framework?', accent: 'Exists.' },
  { label: 'Architectural foundation?', accent: 'Built.' },
  { label: 'Working substrate?', accent: 'Deployed.' },
];

export default function CloseSlide() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  const [showEcosystem, setShowEcosystem] = useState(false);

  // Auto-advance to ecosystem at ~8s
  useEffect(() => {
    if (!go || showEcosystem) return;
    const t = window.setTimeout(() => setShowEcosystem(true), 8000);
    return () => window.clearTimeout(t);
  }, [go, showEcosystem]);

  // Keyboard manual trigger
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowRight') {
        e.preventDefault();
        setShowEcosystem(true);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setShowEcosystem(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <motion.section
      ref={ref}
      data-slide="18"
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
            'radial-gradient(ellipse 90% 60% at 50% 50%, color-mix(in srgb, var(--case) 8%, transparent), transparent 60%)',
        }}
      />

      <AnimatePresence mode="wait">
        {!showEcosystem ? (
          <motion.div
            key="part-a"
            className="relative z-[1] flex flex-col items-center text-center max-w-[1500px] gap-12"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-5 items-center">
              {PRE_LINES.map((line, i) => (
                <RevealLine
                  key={line.accent}
                  delay={0.4 + i * 0.7}
                  go={go}
                  label={line.label}
                  accent={line.accent}
                />
              ))}
            </div>

            <div className="overflow-hidden pb-4 -mb-4">
              <motion.h1
                className="deck-display"
                style={{
                  margin: 0,
                  fontSize: 'clamp(2.5rem, 4.6vw, 4.8rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: 'var(--cream)',
                  fontWeight: 600,
                  maxWidth: '28ch',
                }}
                initial={{ opacity: 0, y: '40%' }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 2.7, ...SPRING.cushiony }}
              >
                The substrate{' '}
                <span className="italic" style={{ color: 'var(--case)' }}>exists.</span>{' '}
                The next chapter{' '}
                <span className="italic" style={{ color: 'var(--case)' }}>scales it.</span>
              </motion.h1>
            </div>

            <motion.p
              className="deck-mono uppercase"
              style={{
                margin: 0,
                fontSize: 'clamp(0.75rem, 1vw, 0.95rem)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 0.8 } : { opacity: 0.8 }}
              transition={{ duration: 0.6, delay: 4.0 }}
            >
              Press → / SPACE for the ecosystem
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="part-b"
            className="relative z-[1] flex flex-col items-center gap-8 max-w-[1600px] w-full"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE.expoOut }}
          >
            <motion.span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.72rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              PHARAZI · ECOSYSTEM
            </motion.span>
            <motion.h2
              className="deck-display"
              style={{
                margin: 0,
                fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--cream)',
                fontWeight: 600,
                textAlign: 'center',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE.expoOut }}
            >
              <span className="italic" style={{ color: 'var(--case)' }}>Open.</span>{' '}
              Reproducible. Co-authored.
            </motion.h2>
            <div className="grid grid-cols-4 gap-4 w-full px-12">
              {ECOSYSTEM.map((e, i) => (
                <EcoCell key={e.label} cell={e} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Source line tucked at bottom */}
      <span
        className="deck-mono"
        style={{
          position: 'absolute',
          bottom: 'var(--deck-pad-bottom)',
          left: 'var(--deck-gutter)',
          fontSize: '0.6rem',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
      >
        Source · Pharazi ecosystem · roadmap as of Apr 2026
      </span>
    </motion.section>
  );
}

function RevealLine({
  delay,
  go,
  label,
  accent,
}: {
  delay: number;
  go: boolean;
  label: string;
  accent: string;
}) {
  return (
    <div className="overflow-hidden pb-2 -mb-2">
      <motion.p
        className="deck-display"
        style={{
          margin: 0,
          fontSize: 'clamp(2rem, 3.4vw, 3.5rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          color: 'var(--cream-muted)',
          fontWeight: 500,
        }}
        initial={{ y: '110%', opacity: 0 }}
        animate={go ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: EASE.expoOut }}
      >
        {label}{' '}
        <span className="italic" style={{ color: 'var(--case)' }}>
          {accent}
        </span>
      </motion.p>
    </div>
  );
}

function EcoCell({
  cell,
  index,
}: {
  cell: { label: string; state: string; tone: string };
  index: number;
}) {
  return (
    <motion.div
      data-case={cell.tone}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.08, ease: EASE.expoOut }}
      className="flex flex-col gap-2 px-5 py-5"
      style={{
        background: 'color-mix(in srgb, var(--case) 9%, transparent)',
        border: '1px solid color-mix(in srgb, var(--case) 30%, transparent)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 0 28px color-mix(in srgb, var(--case) 18%, transparent)',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.6rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case)',
        }}
      >
        {cell.state}
      </span>
      <span
        className="deck-display"
        style={{
          fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
          color: 'var(--cream)',
          fontWeight: 600,
          letterSpacing: '-0.005em',
          lineHeight: 1.25,
        }}
      >
        {cell.label}
      </span>
    </motion.div>
  );
}
