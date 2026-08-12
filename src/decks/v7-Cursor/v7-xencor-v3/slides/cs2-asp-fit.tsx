// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import RseStabilityCurve from './cs3-fit/RseStabilityCurve';

/**
 * CS2 Asparlas · Fit — precision plateau / prior carries the information.
 * Ordered credibility checks + %RSE plateau band (illustrative shape).
 */

const CHECKS = [
  {
    n: '01',
    t: 'Adult Part 1 external validation',
    d: 'Against pediatric-model predictions — no structural misfit. First, because failing it ends the design.',
  },
  {
    n: '02',
    t: '%RSE on dose-driving parameters',
    d: 'Stable above roughly 50–60 adults.',
  },
  {
    n: '03',
    t: 'Bootstrap prediction-corrected VPC',
    d: 'Same plateau — precision stops improving materially for the parameters that drive dose.',
  },
  {
    n: '04',
    t: 'Sensitivity to cohort ratio',
    d: 'The plateau is not an artifact of one assumed split.',
  },
];

export default function Cs2AspFit() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.15,
    headline: 0.25,
    subhead: 0.45,
    checks: 0.75,
    curve: 0.9,
    boundary: 1.45,
    source: 1.7,
  };

  return (
    <SlideGrid dataCase="3" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--xc-case-3)" delay={D.eyebrow}>
        Case 03 · Fit
      </Eyebrow>
      <Headline delay={D.headline} maxChars={56}>
        At sixty adults the model is as precise where it matters —{' '}
        <span style={{ color: 'var(--xc-case-3)', fontStyle: 'italic', fontWeight: 700 }}>
          the information lives in the prior
        </span>
        .
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        At N = 60 the model is as precise as at N = 94 for the parameters that drive the dose
        decision — because the information lives in the pediatric prior, not the adult sample alone.
      </Subhead>

      <Viz>
        <div className="asp-viz-stack">
          <div className="asp-fit-grid">
            <div className="asp-check-list">
              <motion.div
                className="xc-card-label xc-ink-muted"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease, delay: D.checks }}
              >
                Four checks, in the order they were run
              </motion.div>
              {CHECKS.map((c, i) => (
                <motion.div
                  key={c.n}
                  className="asp-check-row"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease, delay: D.checks + 0.1 + i * 0.12 }}
                >
                  <span className="asp-check-row__n">{c.n}</span>
                  <div>
                    <div className="asp-check-row__t">{c.t}</div>
                    <div className="asp-check-row__d">{c.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="asp-plateau-panel"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: D.curve }}
            >
              <div className="xc-card-label" style={{ color: 'var(--xc-case-3)' }}>
                %RSE vs adult N · plateau band ≈ 50–60 onward
              </div>
              <div
                style={{
                  width: '100%',
                  minHeight: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RseStabilityCurve stroke="var(--xc-case-3)" delay={D.curve + 0.15} />
              </div>
            </motion.div>
          </div>

          <motion.p
            className="asp-boundary"
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: D.boundary }}
          >
            <strong>Assumption that flips it — prior transportability.</strong> If the plateau does
            not hold, or Part 1 shows structural misfit, N stays endpoint-powered or the program is
            re-scoped.
          </motion.p>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Fit"
        source="Source · Pediatric PopPK (AALL07P4 + DFCI 11-001) · curve schematic / illustrative shape"
        delay={D.source}
      />
    </SlideGrid>
  );
}
