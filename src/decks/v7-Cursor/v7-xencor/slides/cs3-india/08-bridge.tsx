// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS3 Close — "The science was the bridge."
 * Sparse typographic stack — three portable principles.
 * Solid type (no word-reveal opacity gates). Light-editorial paper.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const PRINCIPLES = [
  { n: '01', em: 'Mechanism', rest: 'is the foundation.' },
  { n: '02', em: 'Convergence', rest: 'is the case.' },
  { n: '03', em: 'Transparency', rest: 'earns trust.' },
];

const D = {
  divider: 0.08,
  p: [0.12, 0.18, 0.24],
  amber: 0.30,
};

export default function CS2BridgeRecap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView || !!reduced;
  const motionOn = go && !reduced;

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
      footerKicker="Case 03 · End"
      footerSource=""
      delays={{ footer: reduced ? 0 : 0.32 }}
    >
      <div
        ref={ref}
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          minHeight: 0,
          gap: 'var(--space-4)',
        }}
      >
        <motion.div
          style={{
            height: 1, background: 'var(--cream-hairline)',
            transformOrigin: 'left',
            flexShrink: 0,
          }}
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? D.divider : 0, ease: EASE }}
        />

        <div style={{
          flex: 1, minHeight: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column',
            gap: 'clamp(var(--space-5), 5vh, 3rem)',
            maxWidth: '55rem',
            width: '100%',
          }}>
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.n}
                style={{
                  display: 'flex', alignItems: 'baseline',
                  gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
                }}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? D.p[i] : 0, ease: EASE }}
              >
                <span
                  className="deck-mono"
                  style={{
                    fontSize: 'var(--fs-slide-eyebrow)',
                    letterSpacing: 'var(--ls-mono)',
                    color: 'var(--cyan)',
                    fontWeight: 600,
                    width: '1.75rem',
                    flexShrink: 0,
                  }}
                >
                  {p.n}
                </span>

                <div
                  style={{
                    width: 'clamp(40px, 6vw, 64px)',
                    height: 1,
                    flexShrink: 0,
                    alignSelf: 'center',
                    background: 'color-mix(in srgb, var(--cyan) 35%, var(--cream-hairline))',
                  }}
                />

                <span
                  className="deck-display"
                  style={{
                    fontSize: 'var(--fs-slide-headline)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    color: 'var(--cream)',
                    flex: 1, minWidth: 0,
                  }}
                >
                  <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>{p.em}</span>
                  {' '}{p.rest}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full-width takeaway — no CONCLUSION label; no redundant subhead */}
        <motion.aside
          style={{
            width: '100%',
            flexShrink: 0,
            padding: 'clamp(0.85rem, 1.6vh, 1.15rem) clamp(1.1rem, 2vw, 1.5rem)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--cream-hairline)',
            borderLeft: '4px solid var(--amber)',
            background: 'var(--panel)',
          }}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? D.amber : 0, ease: EASE }}
        >
          <div className="deck-body" style={{
            fontSize: 'var(--fs-slide-subhead)',
            lineHeight: 1.45,
            color: 'var(--cream)',
            fontWeight: 500,
          }}>
            Wherever local trials aren&rsquo;t feasible — the{' '}
            <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
              Clin Pharm dossier
            </span>
            {' '}becomes the bridge.
          </div>
        </motion.aside>
      </div>
    </SlideFrame>
  );
}
