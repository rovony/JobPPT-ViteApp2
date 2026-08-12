// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { fadeIn, INK, TYPE } from '../_shared/cs1-ui';

const TESTS = [
  { title: 'Systematic under/over-exposure', result: 'Did not appear after weight scaling', status: 'survived' },
  { title: 'Allometry flips the band', result: 'Key sensitivity — fixed exponents preferred', status: 'survived' },
  { title: 'Safety breaks at matched exposure', result: 'No exposure-driven kill signal', status: 'survived' },
  { title: 'Disease similarity collapses', result: 'Still the fragile hinge — named, not hidden', status: 'open' },
];

export default function Cs1Falsification() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.12}>Case 01 · Credibility · falsification</Eyebrow>
      <Headline delay={0.22} maxChars={64}>
        What would have killed our confidence —{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>and why it did not.</span>
      </Headline>
      <Subhead delay={0.3}>Kill criteria first. Diagnostics gallery only if asked.</Subhead>
      <Viz>
        <motion.div {...fadeIn(reduced, 0.4, 8)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', height: '100%' }}>
          {TESTS.map((t) => {
            const open = t.status === 'open';
            return (
              <div
                key={t.title}
                style={{
                  display: 'grid',
                  gridTemplateRows: 'auto auto 1fr',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-4)',
                  border: `1px solid ${open ? 'color-mix(in srgb, var(--amber) 40%, transparent)' : INK.hairline}`,
                  borderTop: `2px solid ${open ? 'var(--amber)' : 'var(--sage)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: INK.panel,
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: TYPE.label,
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: open ? 'var(--amber)' : 'var(--sage)',
                    fontWeight: 700,
                  }}
                >
                  {open ? 'Named hinge' : 'Survived'}
                </div>
                <div className="deck-display" style={{ fontSize: TYPE.body, color: INK.primary, fontWeight: 600, lineHeight: 1.35 }}>
                  {t.title}
                </div>
                <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5, alignSelf: 'end' }}>
                  {t.result}
                </div>
              </div>
            );
          })}
        </motion.div>
      </Viz>
      <Footer kicker="Falsifiers" tagline="Confidence is earned by surviving the tests that could end the bridge" source="Sensitivity · predictive checks · safety" />
    </SlideGrid>
  );
}
