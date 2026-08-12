// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AmbientLungs, Split, fadeIn, INK, TYPE, SPACE, STAGE } from '../_shared/cs1-ui';

const ACTIONS = [
  { n: '01', title: 'Force efficacy', body: 'Rescue a powered pediatric trial' },
  { n: '02', title: 'Accept the bridge', body: 'Defend dose via exposure matching', chosen: true },
  { n: '03', title: 'Abandon path', body: 'Leave the pediatric label gap open' },
];

/** Beat 1 — decision + stakes (story-flow spine #1) */
export default function Cs1Decision() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <AmbientLungs opacity={0.045} />
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Decision</Eyebrow>
      <Headline delay={STAGE.headline} maxChars={66}>
        The decision was a pediatric dose label{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>without a carrying efficacy trial.</span>
      </Headline>
      <Subhead delay={STAGE.subhead}>
        After Phase IIb stopped, could an exposure-matched bridge still support a regulator-accepted dose?
      </Subhead>
      <Viz>
        <Split min="18rem" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeIn(reduced, STAGE.viz, 8)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', justifyContent: 'center', minWidth: 0 }}>
            {ACTIONS.map((a) => (
              <div
                key={a.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2.25rem minmax(0, 1fr)',
                  gap: SPACE.gap,
                  alignItems: 'center',
                  padding: `${SPACE.pad} calc(${SPACE.pad} * 0.85)`,
                  borderRadius: 'var(--radius-md)',
                  border: a.chosen ? '1px solid color-mix(in srgb, var(--case) 40%, transparent)' : '1px solid transparent',
                  background: a.chosen ? 'color-mix(in srgb, var(--case) 10%, transparent)' : 'transparent',
                }}
              >
                <div className="deck-mono" style={{ fontSize: TYPE.label, color: a.chosen ? INK.accent : INK.meta, fontWeight: 700 }}>
                  {a.n}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 600, lineHeight: 1.25, display: 'flex', gap: '0.55rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
                    <span>{a.title}</span>
                    {a.chosen && (
                      <span className="deck-mono uppercase" style={{ fontSize: '0.75em', color: INK.accent, letterSpacing: '0.06em', fontWeight: 700 }}>
                        Chosen
                      </span>
                    )}
                  </div>
                  <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, marginTop: 2, lineHeight: 1.5 }}>
                    {a.body}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.aside
            {...fadeIn(reduced, STAGE.vizLate, 8)}
            style={{
              borderLeft: '2px solid var(--amber)',
              padding: SPACE.padLg,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 'var(--space-3)',
              background: 'color-mix(in srgb, var(--amber) 6%, transparent)',
              minWidth: 0,
            }}
          >
            <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: 'var(--amber)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
              If wrong
            </div>
            <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, lineHeight: 1.55, maxWidth: '34ch' }}>
              Under-treat progressive rare disease — or expose children without a defendable bridge.
            </div>
          </motion.aside>
        </Split>
      </Viz>
      <Footer kicker="Decision" tagline="Dose / label defendability when efficacy cannot carry" source="AMB112529 · pediatric PAH" />
    </SlideGrid>
  );
}
