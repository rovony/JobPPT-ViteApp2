// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 Asparlas · FDA — Type A 94→60 · −36%.
 * Decluttered: bordered numeral hero + two frameworks + what did not land.
 * Waterfall / dual quote chrome removed.
 */

export default function Cs2AspFda() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.15,
    headline: 0.25,
    subhead: 0.45,
    hero: 0.7,
    frameworks: 0.95,
    miss: 1.35,
    source: 1.65,
  };

  return (
    <SlideGrid dataCase="3" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--xc-case-3)" delay={D.eyebrow}>
        Case 03 · FDA engagement
      </Eyebrow>
      <Headline delay={D.headline} maxChars={54}>
        FDA Type A agreed sixty evaluable adults —{' '}
        <span style={{ color: 'var(--xc-case-3)', fontStyle: 'italic', fontWeight: 700 }}>
          a 36% reduction on the formal record
        </span>
        .
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        21 July 2023 · three of four pillars on the record. Two frameworks briefed in parallel —
        pharmacometrics precision and biostatistics AE-detection — converging on one N.
      </Subhead>

      <Viz>
        <div className="asp-viz-stack">
          <div className="asp-fda-grid">
            <motion.div
              className="asp-fda-hero"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: D.hero }}
            >
              <div className="asp-n-card__kick" style={{ color: 'var(--xc-case-3)' }}>
                Primary-endpoint-evaluable adults
              </div>
              <div className="asp-fda-hero__arrow">
                94 <span>→</span> 60
              </div>
              <div className="asp-n-card__body">
                <strong style={{ color: 'var(--xc-case-3)' }}>−36%</strong> enrollment · FDA Type A
                · 21 Jul 2023 · a citable methodology precedent, not a one-program favour.
              </div>
            </motion.div>

            <motion.div
              className="asp-framework-pair"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: D.frameworks }}
            >
              <div className="asp-framework-card">
                <div className="asp-framework-card__kick">Pharmacometrics</div>
                <p className="asp-framework-card__body">
                  Reached N = 60 via D-optimal design under an informative pediatric prior.
                </p>
              </div>
              <div className="asp-framework-join">↓ one N ↑</div>
              <div className="asp-framework-card">
                <div className="asp-framework-card__kick">Biostatistics</div>
                <p className="asp-framework-card__body">
                  Reached a compatible N via FDA&apos;s own AE-detection probability framework at
                  &gt;85%.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="asp-reject-card asp-reject-card--alt"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: D.miss }}
          >
            <div className="asp-reject-card__kick">What did not land — said before being asked</div>
            <p className="asp-reject-card__body">
              FDA did not accept the simulated primary as the{' '}
              <strong style={{ color: 'var(--cream)' }}>sole registrational endpoint</strong>. It
              was repositioned to dose confirmation in Cohorts 1 and 2, conditioned on additional
              adult PopPK.{' '}
              <strong style={{ color: 'var(--cream)' }}>The sample-size reduction held anyway.</strong>
            </p>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · FDA engagement"
        source="Source · FDA Type A meeting · 21 Jul 2023 · NCT04817761"
        delay={D.source}
      />
    </SlideGrid>
  );
}
