// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS2 Bridge — sparse close matching override Spoken script.
 * Efficient design → local-evidence constraint (India).
 */

const EASE = [0.2, 0.7, 0.3, 1];

const PRINCIPLES = [
  { n: '01', em: 'Transparent design', rest: 'briefs methodology, not just the number.' },
  { n: '02', em: 'Durable template', rest: 'when the pediatric prior carries the weight.' },
];

const D = {
  divider: 0.6,
  p: [
    { num: 1.1, rule: 1.3, words: 1.6 },
    { num: 2.4, rule: 2.6, words: 2.9 },
  ],
  endMark: 3.9,
  amber: 4.3,
  footer: 4.8,
};

function WordReveal({ em, rest, baseDelay, go, accent }) {
  const allWords = [em, ...rest.split(' ').filter(Boolean)];
  return (
    <>
      {allWords.map((word, i) => (
        <motion.span
          key={i}
          style={i === 0 ? { color: accent, fontWeight: 500 } : undefined}
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

export default function Cs2AspBridge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;
  const accent = 'var(--teal)';

  return (
    <SlideFrame
      dataCase="teal"
      eyebrow="Case 02 · Close"
      headline={
        <>
          The methodology{' '}
          <span style={{ color: accent, fontStyle: 'italic', fontWeight: 500 }}>
            scales
          </span>
          {' '}— and the value is the template.
        </>
      }
      subhead="What Asparlas teaches — beyond one adult ALL trial."
    >
      <div
        ref={ref}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <motion.div
          style={{
            height: 1,
            background: 'var(--cream-hairline)',
            transformOrigin: 'left',
            marginBottom: 'var(--space-4)',
            flexShrink: 0,
          }}
          initial={{ scaleX: 0 }}
          animate={go ? { scaleX: 1 } : { scaleX: 1 }}
          transition={{ duration: 0.4, delay: D.divider, ease: EASE }}
        />

        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-6), 6vh, 3.75rem)',
            maxWidth: '55rem',
            width: '100%',
          }}>
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.n}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
                }}
              >
                <motion.span
                  className="deck-mono"
                  style={{
                    fontSize: 'var(--fs-slide-eyebrow)',
                    letterSpacing: '0.18em',
                    color: accent,
                    fontWeight: 500,
                    width: '1.75rem',
                    flexShrink: 0,
                  }}
                  initial={{ opacity: 0 }}
                  animate={go ? { opacity: 1 } : { opacity: 1 }}
                  transition={{ duration: 0.2, delay: D.p[i].num }}
                >
                  {p.n}
                </motion.span>

                <motion.div
                  style={{
                    width: 'clamp(48px, 8vw, 80px)',
                    height: 1,
                    flexShrink: 0,
                    alignSelf: 'center',
                    marginTop: -2,
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0, background: `color-mix(in srgb, ${accent} 28%, transparent)` }}
                  animate={go ? { scaleX: 1, background: `color-mix(in srgb, ${accent} 28%, transparent)` } : { scaleX: 1 }}
                  transition={{ duration: 0.3, delay: D.p[i].rule, ease: EASE }}
                />

                <span
                  className="deck-display"
                  style={{
                    fontSize: 'var(--fs-slide-headline)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: '-0.012em',
                    color: 'var(--cream)',
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <WordReveal
                    em={p.em}
                    rest={p.rest}
                    baseDelay={D.p[i].words}
                    go={go}
                    accent={accent}
                  />
                </span>
              </div>
            ))}

            <motion.div
              style={{
                height: 1,
                width: 'clamp(48px, 6vw, 60px)',
                marginLeft: 'calc(1.75rem + clamp(var(--space-3), 2vw, var(--space-5)) + clamp(48px, 8vw, 80px) + clamp(var(--space-3), 2vw, var(--space-5)))',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0, background: `color-mix(in srgb, ${accent} 28%, transparent)` }}
              animate={go ? { scaleX: 1 } : { scaleX: 1 }}
              transition={{ duration: 0.3, delay: D.endMark, ease: EASE }}
            />
          </div>
        </div>

        <motion.div
          style={{
            flexShrink: 0,
            background: 'color-mix(in srgb, var(--amber) 12%, transparent)',
            borderTop: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
            borderBottom: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
            padding: 'var(--space-3) var(--space-5)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: D.amber, ease: EASE }}
        >
          <motion.div
            aria-hidden
            style={{
              flexShrink: 0,
              transform: 'rotate(45deg)',
              width: 12,
              height: 12,
              background: 'var(--amber)',
            }}
          />
          <div className="deck-display" style={{ fontSize: 'var(--fs-slide-tagline)', lineHeight: 1.4 }}>
            Case three shifts the constraint: not sample size, but{' '}
            <span style={{ color: 'var(--cyan)', fontWeight: 500, fontStyle: 'italic' }}>
              local evidence
            </span>
            {' '}— India asked for a trial the global dossier had to replace.
          </div>
        </motion.div>

        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingTop: 'var(--space-3)',
          marginTop: 'var(--space-2)',
        }}>
          <motion.span
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: '0.14em',
              color: 'var(--cream-faint)',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: D.footer }}
          >
            Case 02 · End
          </motion.span>
        </div>
      </div>
    </SlideFrame>
  );
}
