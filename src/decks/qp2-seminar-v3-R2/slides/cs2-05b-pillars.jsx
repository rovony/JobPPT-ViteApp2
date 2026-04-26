import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import CS2MoaCard from './cs2-shared/CS2MoaCard';
import {
  Pillar, PillarHeroNumber, PillarHeroItalic, PillarSub,
  PillarVizWrap, PillarBody, PillarCite,
  PkSimilarityViz, ErSimilarityViz, IntrinsicViz, ExtrinsicViz, GlobalRegViz,
} from './cs2-shared/CS2Pillars';

/**
 * CS2 Slide 7 · Six convergent pillars — the ICH E5(R1) framework, fully populated.
 *
 * The MOA card (col 1) morphs in from slide 6 via shared layoutId.
 * Pillars 02–06 cascade in to its right with staggered entrance.
 * Each pillar carries a dashboard mini-viz widget in its middle band.
 */

const C = {
  cyan: 'var(--cyan)',
  amber: 'var(--amber)',
  cream: 'var(--cream)',
  creamMuted: 'var(--cream-muted)',
  creamFaint: 'var(--cream-faint)',
  hairline: 'var(--cream-hairline)',
};

const EASE = [0.2, 0.7, 0.3, 1];

/* Cascade delay schedule per spec — MOA already on screen via layoutId,
 * supporting pillars enter at 150ms increments after the morph settles. */
const D = { p2: 0.70, p3: 0.85, p4: 1.00, p5: 1.15, p6: 1.30, band: 1.55 };

export default function CS2Pillars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Architecture — Six convergent pillars</Eyebrow>

      <Headline delay={0.25} maxChars={68}>
        Six lines converge — across{' '}
        <span style={{ color: C.cyan, fontStyle: 'italic', fontWeight: 500 }}>
          PK, PD, intrinsic, extrinsic, regulatory, and mechanism.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={54} size="lead">
        The ICH E5(R1) framework, fully populated.
      </Subhead>

      <Viz>
        <div ref={ref} style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
          minHeight: 0, minWidth: 0,
        }}>
          {/* Six-pillar grid — auto-fit reflow on narrow viewports */}
          <div style={{
            flex: 1, minHeight: 0, minWidth: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(8rem, 100%), 1fr))',
            gap: 'clamp(8px, 1.1vw, 14px)',
            alignItems: 'stretch',
          }}>
            {/* Pillar 01 · MOA — the morphing card from slide 6 */}
            <div style={{ display: 'flex', minWidth: 0 }}>
              <CS2MoaCard variant="lead" style={{ flex: 1 }} />
            </div>

            {/* Pillar 02 · PK Similarity */}
            <Pillar delay={go ? D.p2 : 0} eyebrow="Pillar 02" name="PK Similarity">
              <PillarHeroNumber>n = 253</PillarHeroNumber>
              <PillarSub>race not significant</PillarSub>
              <PillarVizWrap><PkSimilarityViz /></PillarVizWrap>
              <PillarBody>
                Pooled phase 1 + AGILE PK data, n=253. Linear PK confirmed across ethnic groups.
              </PillarBody>
              <PillarCite>Jiang et al.<br />CTS 2021</PillarCite>
            </Pillar>

            {/* Pillar 03 · ER Similarity */}
            <Pillar delay={go ? D.p3 : 0} eyebrow="Pillar 03" name="ER Similarity">
              <PillarHeroItalic>
                Flat<br />
                <span style={{
                  fontSize: 'var(--fs-slide-subhead)', fontStyle: 'italic',
                  color: C.creamMuted, fontWeight: 400,
                }}>across range</span>
              </PillarHeroItalic>
              <PillarVizWrap><ErSimilarityViz /></PillarVizWrap>
              <PillarBody>
                No exposure-AE or exposure-efficacy relationship. Wide TI · 500 mg QD covers range.
              </PillarBody>
              <PillarCite>Phase 1 + AGILE pivotal</PillarCite>
            </Pillar>

            {/* Pillar 04 · Intrinsic */}
            <Pillar delay={go ? D.p4 : 0} eyebrow="Pillar 04" name="Intrinsic">
              <PillarHeroItalic size="tag">No impact</PillarHeroItalic>
              <PillarSub>organ fn · age · sex</PillarSub>
              <PillarVizWrap><IntrinsicViz /></PillarVizWrap>
              <PillarBody>
                No demographic dose adjustment. CYP polymorphism characterized in DDI program.
              </PillarBody>
              <PillarCite>Tibsovo USPI · EMA EPAR</PillarCite>
            </Pillar>

            {/* Pillar 05 · Extrinsic */}
            <Pillar delay={go ? D.p5 : 0} eyebrow="Pillar 05" name="Extrinsic">
              <PillarHeroNumber>0.18</PillarHeroNumber>
              <PillarSub>midazolam AUC ratio</PillarSub>
              <PillarVizWrap><ExtrinsicViz /></PillarVizWrap>
              <PillarBody>
                PBPK-supported DDI label. CYP3A4 perpetrator + victim · all scenarios labeled.
              </PillarBody>
              <PillarCite>Xu et al.<br />CPT:PSP 2021</PillarCite>
            </Pillar>

            {/* Pillar 06 · Global Reg */}
            <Pillar delay={go ? D.p6 : 0} eyebrow="Pillar 06" name="Global Reg">
              <PillarHeroNumber>30+</PillarHeroNumber>
              <PillarSub>jurisdictions · 8 yrs</PillarSub>
              <PillarVizWrap><GlobalRegViz /></PillarVizWrap>
              <PillarBody>
                Multi-agency PV · 8 yrs surveillance · no ethnicity-specific signals.
              </PillarBody>
              <PillarCite>FDA Orange Book<br />EMA EPAR · multi-agency</PillarCite>
            </Pillar>
          </div>

          {/* Amber message band */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE, delay: reduced ? 0 : D.band }}
            style={{
              padding: 'clamp(10px, 1.6vh, 14px) clamp(16px, 2.2vw, 28px)',
              background: 'color-mix(in srgb, var(--amber) 14%, transparent)',
              borderTop: `1px solid color-mix(in srgb, var(--amber) 42%, transparent)`,
              borderBottom: `1px solid color-mix(in srgb, var(--amber) 42%, transparent)`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            <span style={{ color: C.amber, fontWeight: 600 }}>▌</span>
            <div className="deck-display" style={{
              fontStyle: 'italic', fontSize: 'var(--fs-slide-tagline)', color: C.cream, lineHeight: 1.4,
            }}>
              <span style={{ color: C.amber, fontWeight: 500 }}>No single pillar is sufficient.</span>{' '}
              Convergence across all six is the case.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.0}
        kicker="Case 02 · Six convergent pillars · ICH E5(R1)"
        tagline=""
        source="Jiang CTS 2021 · Xu CPT:PSP 2021 · Dang Cancer Cell 2009 · Tibsovo USPI · ICH E5(R1)"
      />
    </SlideGrid>
  );
}
