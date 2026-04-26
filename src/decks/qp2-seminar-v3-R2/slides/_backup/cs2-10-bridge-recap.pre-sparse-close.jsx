import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 Act 7 · Bridge forward + recap — portable Clin Pharm lessons.
 *
 * MIN-DESIGN PASS. Three "what this case proves" bullets in
 * RecapCard pattern, plus closing ribbon pointing to CS3.
 */

const LESSONS = [
  {
    n: '01',
    text: 'Rule-based regulatory waivers shift the burden to the Clin Pharm package — design that package to stand alone.',
  },
  {
    n: '02',
    text: 'PBPK-supported DDI labels are now a regulatory expectation, not a nice-to-have, in CYP3A4-perpetrator drugs.',
  },
  {
    n: '03',
    text: 'Race/ethnicity covariate invariance from PopPK is the modern substitute for a dedicated bridging study — but only if the analysis is transparent.',
  },
];

export default function CS2BridgeRecap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Bridge forward</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        What this case proves about{' '}
        <span style={{ color: 'var(--cyan)' }}>regulatory bridging.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        When local efficacy trials are waived, the Clin Pharm dossier IS the bridge —
        and PBPK is no longer optional.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(var(--space-3), 2vh, var(--space-6))',
            paddingTop: 'clamp(var(--space-4), 3vh, var(--space-8))',
          }}
        >
          {/* Lesson cards */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            gap: 'clamp(var(--space-3), 1.5vh, var(--space-5))',
          }}>
            {LESSONS.map((l, i) => (
              <motion.div
                key={l.n}
                style={{
                  position: 'relative', minWidth: 0, overflow: 'hidden',
                  border: '1px solid var(--cream-hairline)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                  padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                  display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.15, ease: [0.2, 0.7, 0.3, 1] }}
              >
                {/* Left accent rail */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: 4, background: 'var(--cyan)',
                }} />

                <span className="deck-mono" style={{
                  fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cyan)',
                  fontWeight: 700, letterSpacing: '0.1em', flexShrink: 0,
                }}>{l.n}</span>

                <span className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                  lineHeight: 1.45,
                }}>{l.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Closing ribbon → CS3 */}
          <motion.div
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
              padding: 'var(--space-2) var(--space-4)',
              background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
              borderRadius: 'var(--radius-md)',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.85, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <motion.div
              aria-hidden
              style={{ transform: 'rotate(45deg)', width: 14, height: 14, background: 'var(--amber)', flexShrink: 0 }}
            />
            <span className="deck-display italic" style={{
              fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream-muted)',
            }}>
              Two cases where modeling carried the regulatory argument.{' '}
              <motion.span
                animate={go ? { color: 'var(--amber)' } : {}}
                transition={{ delay: 2.65, duration: 0.6 }}
                style={{ color: 'var(--cream-muted)' }}
              >
                Next: where the tools themselves become the contribution.
              </motion.span>
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.0}
        kicker="Act 7 · Bridge"
        tagline="Portable lessons — the waiver pathway will expand globally."
      />
    </SlideGrid>
  );
}
