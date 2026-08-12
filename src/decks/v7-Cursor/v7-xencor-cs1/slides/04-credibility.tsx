// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { HeroNum, ExposureBand, Split, fadeIn, INK, TYPE, SPACE, STAGE } from '../_shared/cs1-ui';

const KILLS = [
  { title: 'Systematic miss', result: 'Did not appear after weight scaling', ok: true },
  { title: 'Allometry flips band', result: 'Fixed exponents preferred to hunting', ok: true },
  { title: 'Safety at match', result: 'No exposure-driven kill signal', ok: true },
  { title: 'Disease similarity', result: 'Named hinge — still open', ok: false },
];

/** Beat 5 — concordance + falsification (story-flow spine #4) */
export default function Cs1Credibility() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Credibility</Eyebrow>
      <Headline delay={STAGE.headline} maxChars={64}>
        Concordance with the adult band — and{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>what would have killed confidence.</span>
      </Headline>
      <Subhead delay={STAGE.subhead}>Every number answers the dose. Kill criteria before goodness-of-fit galleries.</Subhead>
      <Viz>
        <Split min="17rem" style={{ alignItems: 'center' }}>
          <motion.div {...fadeIn(reduced, STAGE.viz, 8)} style={{ display: 'flex', flexDirection: 'column', gap: SPACE.gap, minWidth: 0 }}>
            <HeroNum
              value="−3%"
              label="Low-dose AUCss vs adults"
              detail="High dose ≈ +0.3% · both in band"
              delay={0}
              reduced
              size={TYPE.hero}
            />
            <ExposureBand reduced delay={0} pediatricPct={48} />
          </motion.div>

          <motion.div
            {...fadeIn(reduced, STAGE.vizLate, 8)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 9.5rem), 1fr))',
              gap: 'var(--space-2)',
              minWidth: 0,
              alignContent: 'center',
            }}
          >
            {KILLS.map((k) => (
              <div
                key={k.title}
                style={{
                  padding: SPACE.pad,
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${k.ok ? INK.hairline : 'color-mix(in srgb, var(--amber) 40%, transparent)'}`,
                  borderTop: `2px solid ${k.ok ? 'var(--sage)' : 'var(--amber)'}`,
                  background: INK.panel,
                  minWidth: 0,
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: TYPE.label,
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: k.ok ? 'var(--sage)' : 'var(--amber)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {k.ok ? 'Survived' : 'Hinge'}
                </div>
                <div className="deck-display" style={{ fontSize: TYPE.body, color: INK.primary, fontWeight: 600, lineHeight: 1.3 }}>
                  {k.title}
                </div>
                <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.45, marginTop: 4 }}>
                  {k.result}
                </div>
              </div>
            ))}
          </motion.div>
        </Split>
      </Viz>
      <Footer kicker="Credibility" tagline="Adult band usable · null E-R ≠ no dose rationale" source="Beat 5 · Okour et al. JCP 2023" />
    </SlideGrid>
  );
}
