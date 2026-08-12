// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AmbientLungs, AccentRule, Kicker, Split, fadeIn, INK, TYPE, SPACE, STAGE } from '../_shared/cs1-ui';

/** Beat 9 — lesson + India seam (story-flow spine #7 + Transition out) */
export default function Cs1Lesson() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <AmbientLungs variant="exit" opacity={0.045} />
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Lesson · transfer</Eyebrow>
      <Headline delay={STAGE.headline} maxChars={64}>
        When the trial cannot answer,{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>make the exposure target the decision language.</span>
      </Headline>
      <Subhead delay={STAGE.subhead}>
        Transferable principle: define the evidence threshold for the next action when a clean efficacy experiment is unavailable.
      </Subhead>
      <Viz>
        <Split min="16rem" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            {...fadeIn(reduced, STAGE.viz, 8)}
            style={{
              padding: SPACE.padLg,
              borderRadius: 'var(--radius-md)',
              border: '1px solid color-mix(in srgb, var(--case) 28%, transparent)',
              background: 'color-mix(in srgb, var(--case) 9%, var(--panel))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 'var(--space-3)',
              minWidth: 0,
            }}
          >
            <AccentRule reduced delay={0} />
            <Kicker>What transfers to Xencor</Kicker>
            <div className="deck-body" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 500, lineHeight: 1.45, maxWidth: '34ch' }}>
              Not “pediatric PAH = T-cell engager.” The craft is choosing step-up, schedule, or expansion under sparse or ethically constrained learning.
            </div>
          </motion.div>

          <motion.div
            {...fadeIn(reduced, STAGE.vizLate, 8)}
            style={{
              padding: SPACE.padLg,
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${INK.hairline}`,
              background: INK.panel,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              minWidth: 0,
            }}
          >
            <Kicker color="var(--amber)">Seam → India</Kicker>
            <div>
              <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: INK.accent, letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700, marginBottom: 4 }}>
                This case · interpolation
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, lineHeight: 1.5 }}>
                Same drug, adjacent population — adult anchor visible to the regulator.
              </div>
            </div>
            <div aria-hidden style={{ height: 1, background: INK.hairline }} />
            <div>
              <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: 'var(--amber)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700, marginBottom: 4 }}>
                Next · transport
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5 }}>
                No local data at all — can a clin-pharm dossier do the job a local trial normally does?
              </div>
            </div>
          </motion.div>
        </Split>
      </Viz>
      <Footer kicker="Close" tagline="Interpolation → transport. Same craft, harder claim." source="Beat 9 · story-flow Transition out" />
    </SlideGrid>
  );
}
