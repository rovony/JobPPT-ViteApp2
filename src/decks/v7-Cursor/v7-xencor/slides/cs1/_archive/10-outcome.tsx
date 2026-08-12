// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AccentRule, fadeIn, INK, TYPE } from '../../_shared/deck-ui';

const AGENCIES = [
  { name: 'EMA', status: 'Accepted', note: 'Pediatric dose via exposure bridge', win: true },
  { name: 'PMDA', status: 'Accepted', note: 'Same exposure language in Japan', win: true },
  { name: 'FDA', status: 'Gap remains', note: 'U.S. path did not close — name it', win: false },
];

export default function Cs1Outcome() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.12}>Case 01 · Outcome</Eyebrow>
      <Headline delay={0.22} maxChars={64}>
        EMA and PMDA accepted the exposure bridge;{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 500 }}>FDA remains an honest gap.</span>
      </Headline>
      <Subhead delay={0.3}>Win where the package landed — without rewriting the agency that did not.</Subhead>
      <Viz>
        <motion.div {...fadeIn(reduced, 0.4, 8)} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--space-3)', height: '100%', alignItems: 'stretch' }}>
          {AGENCIES.map((a) => (
            <div
              key={a.name}
              style={{
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${a.win ? 'color-mix(in srgb, var(--sage) 35%, transparent)' : 'color-mix(in srgb, var(--amber) 40%, transparent)'}`,
                background: a.win ? 'color-mix(in srgb, var(--sage) 7%, var(--panel))' : 'color-mix(in srgb, var(--amber) 7%, var(--panel))',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              <AccentRule reduced delay={0} color={a.win ? 'var(--sage)' : 'var(--amber)'} />
              <div className="deck-display" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', color: INK.primary, fontWeight: 700, letterSpacing: '-0.02em' }}>
                {a.name}
              </div>
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: TYPE.label,
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: a.win ? 'var(--sage)' : 'var(--amber)',
                  fontWeight: 700,
                }}
              >
                {a.status}
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5, marginTop: 'auto' }}>
                {a.note}
              </div>
            </div>
          ))}
        </motion.div>
      </Viz>
      <Footer kicker="Outcome" tagline="Credibility includes the agencies that did not say yes" source="Pediatric labeling path · exposure package" />
    </SlideGrid>
  );
}
