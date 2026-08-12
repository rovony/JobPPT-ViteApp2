// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { fadeIn, INK, TYPE } from '../../_shared/deck-ui';

const REJECTED = [
  { title: 'Rescue a classical efficacy trial', why: 'Ethics and feasibility already failed.' },
  { title: 'Over-parameterize covariates on N≈39', why: 'False precision on sparse pediatric data.' },
  { title: 'Claim a crisp pediatric E-R', why: 'Dose range too narrow to identify honestly.' },
];

export default function Cs1Rejected() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.12}>Case 01 · Rejected alternatives</Eyebrow>
      <Headline delay={0.22} maxChars={62}>
        What we did not do — and{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>why each path failed the decision.</span>
      </Headline>
      <Subhead delay={0.3}>Credibility starts with the paths you refuse.</Subhead>
      <Viz>
        <motion.div {...fadeIn(reduced, 0.4, 8)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', height: '100%', justifyContent: 'center' }}>
          {REJECTED.map((r) => (
            <div
              key={r.title}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(14rem, 1.1fr) 1.2fr',
                gap: 'var(--space-4)',
                alignItems: 'center',
                padding: 'var(--space-4) var(--space-5)',
                borderLeft: '3px solid var(--amber)',
                background: INK.panel,
              }}
            >
              <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 600, lineHeight: 1.3 }}>
                {r.title}
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5 }}>
                {r.why}
              </div>
            </div>
          ))}
          <div className="deck-body" style={{ marginTop: 'var(--space-2)', fontSize: TYPE.body, color: INK.accent, fontWeight: 600, fontStyle: 'italic', lineHeight: 1.45 }}>
            Chosen instead: exposure matching with named uncertainty.
          </div>
        </motion.div>
      </Viz>
      <Footer kicker="Filter" tagline="Refuse false precision before claiming the bridge" source="Playbook §13" />
    </SlideGrid>
  );
}
