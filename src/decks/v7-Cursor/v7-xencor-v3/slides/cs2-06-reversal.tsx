// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';

/**
 * CS3 · Outcome + decision boundary.
 * Conclusion H1; IF/OR/THEN boundary; CDSCO 14 May 2025.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const D = {
  india: 0.35,
  hero: 0.5,
  boundary: 0.7,
  callout: 0.95,
};

export default function CS2Reversal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;
  const delay = (d) => (reduced || !go ? 0 : d);

  return (
    <SlideGrid dataCase="2" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.08}>Case 02 · Outcome</Eyebrow>

      <Headline delay={0.18} maxChars={68}>
        CDSCO authorized on{' '}
        <span style={{ color: 'var(--xc-case-accent)', fontStyle: 'italic', fontWeight: 500 }}>
          14 May 2025
        </span>{' '}
        without a pre-approval local trial
      </Headline>

      <Subhead delay={0.28} size="lead" maxChars={100}>
        Thirty-six-page justification on the six pillars · Phase 4 PK commitment in place.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
            minHeight: 0,
          }}
        >
          <div
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              display: 'flex',
              gap: 'clamp(var(--space-4), 2.5vw, var(--space-6))',
            }}
          >
            <motion.div
              style={{
                flex: '0 0 clamp(14rem, 22vw, 20rem)',
                minWidth: 0,
                border: '1.5px solid var(--cream-hairline)',
                background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
              }}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: delay(D.india) }}
            >
              <div
                className="deck-mono uppercase xc-slide-eyebrow xc-cyan"
                style={{ letterSpacing: '0.14em', textAlign: 'center', marginBottom: 'var(--space-3)' }}
              >
                India authorization
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IndiaMap layoutId="india-cdsco" variant="filled" delay={delay(D.india)} />
              </div>
            </motion.div>

            <motion.div
              style={{
                flex: '1 1 auto',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 'var(--space-3)',
              }}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: delay(D.hero) }}
            >
              <div className="deck-mono uppercase xc-slide-eyebrow xc-cyan" style={{ letterSpacing: '0.14em' }}>
                CDSCO marketing authorization
              </div>
              <div
                className="deck-display xc-hero-num xc-cyan"
                style={{
                  fontWeight: 500,
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                14 May 2025
              </div>
              <p
                className="deck-body xc-slide-subhead xc-muted"
                style={{ margin: 0, lineHeight: 1.45, maxWidth: '42ch' }}
              >
                Granted on convergent evidence — not on Rule 101 alone. Inference rested on the
                253-patient PopPK model and the package around it; the dossier named what remained uncertain.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="cs3-boundary"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: delay(D.boundary) }}
          >
            <div className="cs3-boundary__card cs3-boundary__card--file">
              <div className="cs3-boundary__kick">IF — pillars hold</div>
              <p>
                PK similarity, flat E-R, somatic mechanism, <strong>and</strong> residual gap bounded
                by Phase 4.
              </p>
              <p>
                <strong>THEN</strong> — file the waiver justification on convergent evidence.
              </p>
            </div>
            <div className="cs3-boundary__or" aria-hidden>
              OR
            </div>
            <div className="cs3-boundary__card cs3-boundary__card--study">
              <div className="cs3-boundary__kick">IF — any pillar breaks</div>
              <p>
                Race covariate significant, steep E-R, or unbounded residual gap.
              </p>
              <p>
                <strong>THEN</strong> — run the local study; the delay is the correct answer.
              </p>
            </div>
          </motion.div>

          <motion.aside
            className="xc-callout cs1-callout-full"
            initial={reduced ? false : { opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.45, ease: EASE, delay: delay(D.callout) }}
          >
            Naming the gap and committing to close it bought more credibility than a
            stronger-sounding claim would have.
          </motion.aside>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Outcome"
        source="FDA Tibsovo labels/reviews · EMA EPAR · DCGI Rule 101 · CDSCO public record"
        delay={delay(1.2)}
      />
    </SlideGrid>
  );
}
