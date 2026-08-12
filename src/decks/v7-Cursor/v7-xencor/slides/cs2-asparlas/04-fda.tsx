// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import ConclusionBar from '../../components/cs1/ConclusionBar';
import SampleSizeWaterfall from './cs3-engagement/SampleSizeWaterfall';

/**
 * Slide · CS2 FDA Engagement — N = 60 agreed · 3/4 pillars · gap stated.
 *
 * Honesty: simulated primary was not accepted as sole registrational endpoint;
 * repositioned to dose confirmation in Cohorts 1 & 2. Sample-size cut held.
 * Public-safe paraphrase only — no internal minutes / line numbers.
 */

const PILLARS = [
  { n: '01', label: 'Optimal design', status: 'agreed' },
  { n: '02', label: 'AE-detection ≥85%', status: 'agreed' },
  { n: '03', label: 'Simulated primary', status: 'gap' },
  { n: '04', label: 'Pediatric prior N=124', status: 'agreed' },
];

const POSITIONS = [
  {
    text: 'Sixty patients delivered the >85% AE-detection probability the agency was looking for — the same threshold the safety framework was sized against.',
    cite: 'FDA Type A · 21 Jul 2023',
  },
  {
    text: 'What did not land: the simulated primary was not accepted as the sole registrational endpoint. It was repositioned to dose confirmation in Cohorts 1 & 2, conditioned on additional adult PopPK. The sample-size reduction held anyway.',
    cite: 'FDA Type A · 21 Jul 2023 · the gap',
  },
];

const EASE = [0.2, 0.7, 0.3, 1];
const D = {
  eyebrow: 0.08,
  headline: 0.14,
  subhead: 0.22,
  waterfall: 0.26,
  pillars: 0.30,
  positions: 0.32,
  takeaway: 0.35,
  source: 0.35,
};

export default function Cs2AspFda() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="teal" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--teal)" delay={D.eyebrow}>CS2 · FDA engagement</Eyebrow>
      <SolidHeadline delay={D.headline} maxChars={50}>
        FDA agreed to{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          N = 60
        </span>{' '}
        — a 36% reduction in adult enrollment.
      </SolidHeadline>
      <Subhead delay={D.subhead} maxChars={120}>
        FDA Type A · 21 July 2023 · pharmacometrics-anchored briefing —{' '}
        <span style={{ color: 'var(--teal)', fontWeight: 600 }}>
          three of four pillars on the formal record
        </span>
        . Name the gap before you are asked.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1.1fr) auto minmax(0, 0.95fr) auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateRows: 'auto minmax(0, 1fr)',
              rowGap: 'var(--space-3)',
              minHeight: 0,
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--teal)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              background: 'var(--panel)',
            }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono)',
                color: 'var(--cream-muted)',
              }}
            >
              Sample size · adult Ph-neg ALL · 94 → 60
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                minHeight: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SampleSizeWaterfall delay={D.waterfall} />
            </div>
          </div>

          {/* Four-pillar status — 3 agreed, 1 gap */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 'var(--space-3)',
            }}
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE, delay: reduced ? 0 : Math.min(D.pillars + i * 0.03, 0.35) }}
                style={{
                  padding: 'var(--space-3)',
                  border: '1px solid var(--cream-hairline)',
                  borderTop: `3px solid ${p.status === 'gap' ? 'var(--amber)' : 'var(--teal)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--panel)',
                  minWidth: 0,
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-card-label)',
                    letterSpacing: 'var(--ls-mono)',
                    color: p.status === 'gap' ? 'var(--amber)' : 'var(--teal)',
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {p.n} · {p.status === 'gap' ? 'Repositioned' : 'Agreed'}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-card-body)',
                    color: 'var(--cream)',
                    lineHeight: 1.35,
                  }}
                >
                  {p.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1px 1fr',
              columnGap: 'var(--space-5)',
              alignItems: 'start',
              minHeight: 0,
              borderTop: '1px solid var(--cream-hairline)',
              paddingTop: 'var(--space-4)',
            }}
          >
            <PositionLine pos={POSITIONS[0]} delay={D.positions} reduced={reduced} />
            <div aria-hidden style={{ width: 1, alignSelf: 'stretch', background: 'var(--cream-hairline)' }} />
            <PositionLine pos={POSITIONS[1]} delay={Math.min(D.positions + 0.04, 0.35)} reduced={reduced} />
          </div>

          <ConclusionBar accent="var(--teal)">
            Two frameworks prepared · one sample size agreed —{' '}
            <span style={{ color: 'var(--teal)', fontWeight: 700 }}>
              the methodology now travels independent of trial outcome.
            </span>
          </ConclusionBar>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · FDA engagement"
        source="Source · FDA Type A meeting · 21 Jul 2023 · NCT04817761 · public paraphrase"
        delay={D.source}
      />
    </SlideGrid>
  );
}

function PositionLine({ pos, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: EASE, delay: reduced ? 0 : delay }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        minWidth: 0,
      }}
    >
      <div
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)',
          lineHeight: 1.4,
          fontWeight: 400,
        }}
      >
        {pos.text}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--teal)',
          fontWeight: 700,
        }}
      >
        — {pos.cite}
      </div>
    </motion.div>
  );
}
