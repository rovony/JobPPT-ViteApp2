// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS3 Slide 10 v2 · Closing — "The science was the bridge."
 *
 * Sparse typographic stack — three portable principles, no cards, no
 * panels, no first-person, no Rule 101 / PBPK / PopPK jargon.
 * Slowest reveal in the deck (~6.6s). Last-slide energy.
 *
 * Principles synthesize the narrative arc:
 *   01 Mechanism  ← slide 6 IDH1 R132 beat
 *   02 Convergence ← slide 7 six-pillar beat
 *   03 Transparency ← slide 9 "0 Indian patients" beat
 */

const EASE = [0.2, 0.7, 0.3, 1];

const PRINCIPLES = [
  { n: '01', em: 'Mechanism', rest: 'is the foundation.' },
  { n: '02', em: 'Convergence', rest: 'is the case.' },
  { n: '03', em: 'Transparency', rest: 'earns trust.' },
];

const D = {
  divider: 0.6,
  p: [
    { num: 1.1, rule: 1.3, words: 1.6 },
    { num: 2.4, rule: 2.6, words: 2.9 },
    { num: 3.7, rule: 3.9, words: 4.2 },
  ],
  endMark: 5.1,
  amber: 5.5,
  footer: 6.0,
};

function WordReveal({ em, rest, baseDelay, go }) {
  const allWords = [em, ...rest.split(' ').filter(Boolean)];
  return (
    <>
      {allWords.map((word, i) => (
        <motion.span
          key={i}
          style={i === 0 ? {
            color: 'var(--cyan)', fontWeight: 500,
          } : undefined}
          initial={{ opacity: 0 }}
          animate={go ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.06, delay: baseDelay + i * 0.08 }}
        >
          {word}{i < allWords.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </>
  );
}

export default function CS2BridgeRecap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideFrame
      dataCase="cyan"
      eyebrow="Case 03 · Close"
      headline={
        <>
          The science{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
            was the bridge
          </span>
          .
        </>
      }
      subhead="What this case teaches — beyond ivosidenib, beyond India."
    >
      <div
        ref={ref}
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          minHeight: 0,
        }}
      >
        {/* Header divider — draws left-to-right */}
        <motion.div
          style={{
            height: 1, background: 'var(--cream-hairline)',
            transformOrigin: 'left',
            marginBottom: 'var(--space-4)',
            flexShrink: 0,
          }}
          initial={{ scaleX: 0 }}
          animate={go ? { scaleX: 1 } : { scaleX: 1 }}
          transition={{ duration: 0.4, delay: D.divider, ease: EASE }}
        />

        {/* ── PRINCIPLES — centered, sparse vertical stack ── */}
        <div style={{
          flex: 1, minHeight: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column',
            gap: 'clamp(var(--space-6), 6vh, 3.75rem)',
            maxWidth: '55rem',
            width: '100%',
          }}>
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.n}
                style={{
                  display: 'flex', alignItems: 'baseline',
                  gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
                }}
              >
                {/* Number */}
                <motion.span
                  className="deck-mono xc-slide-eyebrow xc-cyan" style={{
                    letterSpacing: '0.18em',
                    fontWeight: 500,
                    width: '1.75rem',
                    flexShrink: 0 }}
                  initial={{ opacity: 0 }}
                  animate={go ? { opacity: 1 } : { opacity: 1 }}
                  transition={{ duration: 0.2, delay: D.p[i].num }}
                >
                  {p.n}
                </motion.span>

                {/* Hairline rule */}
                <motion.div
                  style={{
                    width: 'clamp(48px, 8vw, 80px)',
                    height: 1,
                    flexShrink: 0,
                    alignSelf: 'center',
                    marginTop: -2,
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0, background: 'color-mix(in srgb, var(--cyan) 28%, transparent)' }}
                  animate={go
                    ? {
                        scaleX: 1,
                        background: 'color-mix(in srgb, var(--cyan) 28%, transparent)',
                      }
                    : {
                        scaleX: 1,
                        background: 'color-mix(in srgb, var(--cyan) 28%, transparent)',
                      }}
                  transition={{ duration: 0.3, delay: D.p[i].rule, ease: EASE }}
                />

                {/* Principle text — word-by-word */}
                <span
                  className="deck-display xc-h1 xc-ink" style={{
                    fontStyle: 'italic',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: '-0.012em',
                    flex: 1, minWidth: 0 }}
                >
                  <WordReveal
                    em={p.em}
                    rest={p.rest}
                    baseDelay={D.p[i].words}
                    go={go}
                  />
                </span>
              </div>
            ))}

            {/* End-mark hairline */}
            <motion.div
              style={{
                height: 1,
                width: 'clamp(48px, 6vw, 60px)',
                marginLeft: 'calc(1.75rem + clamp(var(--space-3), 2vw, var(--space-5)) + clamp(48px, 8vw, 80px) + clamp(var(--space-3), 2vw, var(--space-5)))',
                transformOrigin: 'left',
              }}
              initial={{
                scaleX: 0,
                background: 'color-mix(in srgb, var(--cyan) 28%, transparent)',
              }}
              animate={go
                ? {
                    scaleX: 1,
                    background: 'color-mix(in srgb, var(--cyan) 28%, transparent)',
                  }
                : {
                    scaleX: 1,
                    background: 'color-mix(in srgb, var(--cyan) 28%, transparent)',
                  }}
              transition={{ duration: 0.3, delay: D.endMark, ease: EASE }}
            />
          </div>
        </div>

        {/* ── AMBER MESSAGE BAND ── */}
        <motion.div
          style={{
            flexShrink: 0,
            background: 'color-mix(in srgb, var(--amber) 12%, transparent)',
            borderTop: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
            borderBottom: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
            padding: 'var(--space-3) var(--space-5)',
            borderRadius: 'var(--radius-sm)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: D.amber, ease: EASE }}
        >
          <span className="deck-display xc-tagline" style={{
            lineHeight: 1.4 }}>
            <span aria-hidden style={{
              display: 'inline-block',
              transform: 'rotate(45deg)',
              width: 12, height: 12,
              background: 'var(--amber)',
              marginRight: 'var(--space-2)',
              verticalAlign: 'middle',
            }} />
            Wherever local trials aren't feasible — the{' '}
            <span style={{ color: 'var(--amber)', fontWeight: 500, fontStyle: 'italic' }}>
              Clin Pharm dossier
            </span>
            {' '}becomes the bridge.
          </span>
        </motion.div>

        {/* ── CUSTOM FOOTER — "CASE 02 · END" + dots ── */}
        <div style={{
          flexShrink: 0,
          display: 'flex', alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingTop: 'var(--space-3)',
          marginTop: 'var(--space-2)',
        }}>
          <motion.span
            className="deck-mono uppercase xc-pageno xc-faint" style={{
              letterSpacing: '0.14em'}}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: D.footer }}
          >
            Case 03 · End
          </motion.span>

          <span style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {['·', '·', '·'].map((dot, i) => (
              <motion.span
                key={i}
                className="deck-mono xc-pageno xc-faint"
                initial={{ opacity: 0 }}
                animate={go ? { opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.2, delay: D.footer + 0.2 + i * 0.2 }}
              >
                {dot}
              </motion.span>
            ))}
          </span>
        </div>
      </div>
    </SlideFrame>
  );
}
