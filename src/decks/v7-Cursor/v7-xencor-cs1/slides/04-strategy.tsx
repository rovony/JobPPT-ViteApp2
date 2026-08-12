// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { fadeIn, INK, TYPE } from '../_shared/cs1-ui';

const STEPS = [
  { n: '01', title: 'PopPK', body: '2-cmt oral · WT on CL/V' },
  { n: '02', title: 'Target', body: 'AUCss vs adult band' },
  { n: '03', title: 'Cautious E-R', body: 'Explore within dose limits' },
  { n: '04', title: 'Totality', body: 'Agency package, not demo' },
];

export default function Cs1Strategy() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.12}>Case 01 · Quantitative strategy</Eyebrow>
      <Headline delay={0.22} maxChars={68}>
        Weight-aware PopPK was chosen because the decision was{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>exposure matching, not endpoint power.</span>
      </Headline>
      <Subhead delay={0.3}>Architecture follows the decision.</Subhead>
      <Viz>
        <motion.div
          {...fadeIn(reduced, 0.4, 8)}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%', justifyContent: 'center' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 'var(--space-3)', position: 'relative' }}>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: '1.2rem',
                left: '12%',
                right: '12%',
                height: 1,
                background: INK.hairline,
                zIndex: 0,
              }}
            />
            {STEPS.map((s) => (
              <div
                key={s.n}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 'var(--space-2)',
                  padding: '0 var(--space-2)',
                }}
              >
                <div
                  className="deck-mono"
                  style={{
                    width: '2.4rem',
                    height: '2.4rem',
                    borderRadius: '50%',
                    border: `1.5px solid ${INK.accent}`,
                    background: 'var(--bg)',
                    display: 'grid',
                    placeItems: 'center',
                    color: INK.accent,
                    fontWeight: 700,
                    fontSize: TYPE.label,
                  }}
                >
                  {s.n}
                </div>
                <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 600 }}>
                  {s.title}
                </div>
                <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.45, maxWidth: '15ch' }}>
                  {s.body}
                </div>
              </div>
            ))}
          </div>

          <div
            className="deck-mono"
            style={{
              fontSize: TYPE.body,
              color: INK.secondary,
              textAlign: 'center',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.01em',
              paddingTop: 'var(--space-2)',
              borderTop: `1px solid ${INK.hairline}`,
            }}
          >
            CL ∝ WT<sup>0.75</sup>
            <span style={{ margin: '0 0.6rem', color: INK.meta }}>·</span>
            V ∝ WT<sup>1.0</sup>
            <span style={{ margin: '0 0.6rem', color: INK.meta }}>·</span>
            <span style={{ color: INK.accent, fontWeight: 700 }}>Adult AUCss = target language</span>
          </div>
        </motion.div>
      </Viz>
      <Footer kicker="Strategy" tagline="Decision language first — model structure second" source="Okour et al. JCP 2023" />
    </SlideGrid>
  );
}
