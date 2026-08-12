// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { fadeIn, INK, TYPE, SPACE, STAGE } from '../_shared/cs1-ui';

const STEPS = [
  { n: '01', title: 'PopPK', body: '2-cmt · lag · WT on CL/V' },
  { n: '02', title: 'Target', body: 'AUCss vs adult band' },
  { n: '03', title: 'Cautious E-R', body: 'Explore within dose limits' },
  { n: '04', title: 'Totality', body: 'Agency package, not demo' },
];

const REJECTED = [
  { title: 'Rescue efficacy trial', why: 'Ethics / feasibility already failed' },
  { title: 'Overfit covariates', why: 'False precision on N≈39' },
  { title: 'Claim crisp E-R', why: 'Dose range too narrow' },
];

/** Beat 4 — strategy + rejected alternatives (story-flow spine #3) */
export default function Cs1Strategy() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Strategy</Eyebrow>
      <Headline delay={STAGE.headline} maxChars={66}>
        Weight-aware PopPK because the decision was{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>exposure matching, not endpoint power.</span>
      </Headline>
      <Subhead delay={STAGE.subhead}>Architecture follows the decision. Credibility starts with paths we refused.</Subhead>
      <Viz>
        <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 'clamp(1rem, 2.5vh, 1.75rem)', height: '100%', alignContent: 'center' }}>
          <motion.div
            {...fadeIn(reduced, STAGE.viz, 6)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 8.5rem), 1fr))',
              gap: SPACE.gap,
              position: 'relative',
            }}
          >
            {STEPS.map((s) => (
              <div
                key={s.n}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 'var(--space-2)',
                  minWidth: 0,
                  padding: '0 0.25rem',
                }}
              >
                <div
                  className="deck-mono"
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    border: `1.5px solid ${INK.accent}`,
                    background: 'var(--bg)',
                    display: 'grid',
                    placeItems: 'center',
                    color: INK.accent,
                    fontWeight: 700,
                    fontSize: TYPE.label,
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </div>
                <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 600 }}>
                  {s.title}
                </div>
                <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.45, maxWidth: '16ch' }}>
                  {s.body}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fadeIn(reduced, STAGE.vizLate, 4)}
            style={{
              borderTop: `1px solid ${INK.hairline}`,
              paddingTop: SPACE.pad,
              display: 'grid',
              gridTemplateColumns: 'auto repeat(auto-fit, minmax(min(100%, 10rem), 1fr))',
              gap: SPACE.gap,
              alignItems: 'start',
            }}
          >
            <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: 'var(--amber)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700, paddingTop: 2 }}>
              Refused
            </div>
            {REJECTED.map((r) => (
              <div key={r.title} style={{ minWidth: 0 }}>
                <div className="deck-display" style={{ fontSize: TYPE.body, color: INK.primary, fontWeight: 600, lineHeight: 1.3 }}>
                  {r.title}
                </div>
                <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.45, marginTop: 2 }}>
                  {r.why}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Viz>
      <Footer kicker="Strategy" tagline="CL ∝ WT^0.75 · V ∝ WT^1.0 · adult AUCss as target language" source="Beat 4" />
    </SlideGrid>
  );
}
