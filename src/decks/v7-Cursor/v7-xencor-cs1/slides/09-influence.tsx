// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { fadeIn, INK, TYPE } from '../_shared/cs1-ui';

const MOVES = [
  { who: 'Clinical', move: 'Stopped treating “no powered efficacy” as a dead end' },
  { who: 'Regulatory', move: 'Accepted exposure matching as primary dose language' },
  { who: 'Quantitative', move: 'Owned kill criteria and uncertainty we would not hide' },
];

export default function Cs1Influence() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.12}>Case 01 · Influence</Eyebrow>
      <Headline delay={0.22} maxChars={64}>
        The model did not just fit —{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>it moved the program’s decision frame.</span>
      </Headline>
      <Subhead delay={0.3}>Influence = who changed their next action.</Subhead>
      <Viz>
        <motion.div {...fadeIn(reduced, 0.4, 8)} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
          {MOVES.map((m, i) => (
            <div
              key={m.who}
              style={{
                display: 'grid',
                gridTemplateColumns: '10rem 1fr',
                gap: 'var(--space-5)',
                alignItems: 'center',
                padding: 'var(--space-5) 0',
                borderBottom: i < MOVES.length - 1 ? `1px solid ${INK.hairline}` : 'none',
              }}
            >
              <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: INK.accent, letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
                {m.who}
              </div>
              <div className="deck-body" style={{ fontSize: 'clamp(1.1rem, 1.9vw, 1.4rem)', color: INK.primary, fontWeight: 500, lineHeight: 1.4 }}>
                {m.move}
              </div>
            </div>
          ))}
        </motion.div>
      </Viz>
      <Footer kicker="Leadership" tagline="Quantitative work earns trust when partners change what they do next" source="Cross-functional decision frame" />
    </SlideGrid>
  );
}
