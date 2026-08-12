// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS3 · Bridge out → Asparlas (design), not Pharazi.
 * Principles + seam copy: interpolation → transport → design.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const PRINCIPLES = [
  { n: '01', em: 'Mechanism', rest: 'is the foundation.' },
  { n: '02', em: 'Convergence', rest: 'is the case.' },
  { n: '03', em: 'Transparency', rest: 'earns trust.' },
];

const D = {
  divider: 0.35,
  p: [0.5, 0.7, 0.9],
  amber: 1.15,
  footer: 1.35,
};

export default function CS2BridgeRecap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;
  const delay = (d) => (reduced || !go ? 0 : d);

  return (
    <SlideFrame
      dataCase="2"
      eyebrow="Case 02 · Close → Asparlas"
      headline={
        <>
          The science{' '}
          <span style={{ color: 'var(--xc-case-accent)', fontStyle: 'italic', fontWeight: 500 }}>
            was the bridge
          </span>
          .
        </>
      }
      subhead="Convergent evidence plus a named residual gap unlocks what no single analysis can."
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
          transition={{ duration: 0.4, delay: delay(D.divider), ease: EASE }}
        />

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(var(--space-5), 5vh, 3rem)',
              maxWidth: '55rem',
              width: '100%',
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.n}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
                }}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: delay(D.p[i]), ease: EASE }}
              >
                <span
                  className="deck-mono xc-slide-eyebrow xc-cyan"
                  style={{
                    letterSpacing: '0.18em',
                    fontWeight: 500,
                    width: '1.75rem',
                    flexShrink: 0,
                  }}
                >
                  {p.n}
                </span>
                <div
                  style={{
                    width: 'clamp(48px, 8vw, 80px)',
                    height: 1,
                    flexShrink: 0,
                    alignSelf: 'center',
                    background: 'color-mix(in srgb, var(--xc-case-accent) 28%, transparent)',
                  }}
                />
                <span
                  className="deck-display xc-h1 xc-ink"
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: '-0.012em',
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <span style={{ color: 'var(--xc-case-accent)', fontWeight: 500 }}>{p.em}</span>{' '}
                  {p.rest}
                </span>
              </motion.div>
            ))}
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
          }}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay(D.amber), ease: EASE }}
        >
          <span className="deck-display xc-tagline" style={{ lineHeight: 1.45 }}>
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                transform: 'rotate(45deg)',
                width: 12,
                height: 12,
                background: 'var(--amber)',
                marginRight: 'var(--space-2)',
                verticalAlign: 'middle',
              }}
            />
            The first two cases argued from evidence that already existed — one{' '}
            <span style={{ color: 'var(--amber)', fontWeight: 500 }}>interpolating</span>, one{' '}
            <span style={{ color: 'var(--amber)', fontWeight: 500 }}>transporting</span>. Next:{' '}
            <span style={{ color: 'var(--amber)', fontWeight: 500, fontStyle: 'italic' }}>
              Asparlas · design
            </span>
            {' '}— the study on paper was correct, and still could not be delivered.
          </span>
        </motion.div>

        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-3)',
            marginTop: 'var(--space-2)',
          }}
        >
          <motion.span
            className="deck-mono uppercase xc-pageno xc-faint"
            style={{ letterSpacing: '0.14em' }}
            initial={reduced ? false : { opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: delay(D.footer) }}
          >
            Case 02 · End → Case 03 Asparlas
          </motion.span>
        </div>
      </div>
    </SlideFrame>
  );
}
