// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS1 backup · Why the trial path closed.
 * Live beat: `cs1-evidence-gap` (Build → Test → closed + constraints).
 * One job here: five constraints that closed the efficacy-trial path.
 */

const CONSTRAINTS = [
  { n: '01', label: 'Enrollment', value: 'Pediatric PAH · 2–16 / million.' },
  { n: '02', label: 'Pooling', value: 'IPAH, CHD, CTD, familial — one small cohort.' },
  { n: '03', label: 'Control arm', value: '80% entered on baseline PAH therapy.' },
  { n: '04', label: 'Endpoint', value: '6MWD unreliable in young children; growth confounds.' },
  { n: '05', label: 'Precedent', value: 'STARTS-1 · N=235 · CPET primary p=0.056.' },
];

export default function Cs1Architecture() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <div className="cs1-lung-watermark cs1-lung-watermark--soft" aria-hidden>
        <Lungs layoutId="cs1-lung" variant="ambient" widthOverride="100%" />
      </div>

      <Eyebrow delay={0.1}>Case 01 · Backup · Trial path closed</Eyebrow>

      <Headline delay={0.2} maxChars={58}>
        Adult evidence existed.{' '}
        <span className="xc-em-case">The efficacy-trial path did not.</span>
      </Headline>

      <Subhead delay={0.35} maxChars={72} size="lead">
        Five constraints closed the pediatric efficacy-trial path.
      </Subhead>

      <Viz>
        <div className="cs1-arch-viz">
          <div className="cs1-constraint-grid">
            {CONSTRAINTS.map((it, i) => (
              <motion.div
                key={it.n}
                className="cs1-constraint-card"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.45 + i * 0.06, ease: EASE }}
              >
                <div className="cs1-constraint-card__t xc-mono">
                  {it.n} · {it.label}
                </div>
                <div className="cs1-constraint-card__d">{it.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 0.95}
        kicker="Backup · CS1 · Trial path"
        tagline="Defend the pediatric dose under these constraints — not repeat ARIES."
        source="Source · FDA Letairis label · Ivy DD et al. J Pediatr X 2020 Table IV · ESC/ERS 2022 PAH guideline"
      />
    </SlideGrid>
  );
}
