// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AmbientLungs, HeroNum, Split, AccentRule, Kicker, fadeIn, INK, TYPE, SPACE, STAGE } from '../_shared/cs1-ui';

/**
 * Beats 2–3 merged (story-flow spine #2):
 * data asymmetry + working vs competing hypothesis.
 */
export default function Cs1Reality() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <AmbientLungs opacity={0.04} />
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Data + hypothesis</Eyebrow>
      <Headline delay={STAGE.headline} maxChars={64}>
        Thirty-nine children could not answer efficacy —{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>but could answer exposure.</span>
      </Headline>
      <Subhead delay={STAGE.subhead}>Untrialable efficacy — not missing diligence. The hinge is disease similarity.</Subhead>
      <Viz>
        <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr)', gap: SPACE.gap, height: '100%', position: 'relative', zIndex: 1, minHeight: 0 }}>
          <motion.div
            {...fadeIn(reduced, STAGE.viz, 6)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
              gap: SPACE.gap,
              alignItems: 'end',
            }}
          >
            <div style={{ paddingBottom: 'var(--space-2)', borderBottom: `2px solid ${INK.primary}`, minWidth: 0 }}>
              <HeroNum value="380" label="Adults · 6 studies" detail="Structural exposure anchor" delay={0} reduced color={INK.primary} size={TYPE.hero} />
            </div>
            <div style={{ paddingBottom: 'var(--space-2)', borderBottom: `2px solid ${INK.accent}`, minWidth: 0 }}>
              <HeroNum value="39" label="Children · PK-evaluable" detail="Open-label · no placebo · sparse doses" delay={0} reduced size={TYPE.heroSm} />
            </div>
          </motion.div>

          <Split min="15rem">
            <motion.div
              {...fadeIn(reduced, STAGE.vizLate, 6)}
              style={{
                padding: SPACE.pad,
                borderRadius: 'var(--radius-md)',
                border: '1px solid color-mix(in srgb, var(--case) 28%, transparent)',
                background: 'color-mix(in srgb, var(--case) 8%, var(--panel))',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                minWidth: 0,
              }}
            >
              <AccentRule reduced delay={0} />
              <Kicker>Working</Kicker>
              <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 600, lineHeight: 1.3 }}>
                Exposure matching is decision-grade
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5 }}>
                Same disease frame — weight-aware adult exposure can carry the dose.
              </div>
            </motion.div>
            <motion.div
              {...fadeIn(reduced, STAGE.vizLate + 0.06, 6)}
              style={{
                padding: SPACE.pad,
                borderRadius: 'var(--radius-md)',
                border: '1px solid color-mix(in srgb, var(--amber) 32%, transparent)',
                background: 'color-mix(in srgb, var(--amber) 6%, var(--panel))',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                minWidth: 0,
              }}
            >
              <AccentRule reduced delay={0} color="var(--amber)" />
              <Kicker color="var(--amber)">Competing</Kicker>
              <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 600, lineHeight: 1.3 }}>
                The bridge is false comfort
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5 }}>
                Pediatric response differs — matched exposure ≠ matched benefit–risk.
              </div>
            </motion.div>
          </Split>
        </div>
      </Viz>
      <Footer kicker="Reality" tagline="Kill test later: predictive checks · weight · safety · adult-range consistency" source="Beats 2–3" />
    </SlideGrid>
  );
}
