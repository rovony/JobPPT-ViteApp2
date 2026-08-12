// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import CS2MoaCard from '../cs2-shared/CS2MoaCard';
import {
  PillarTextCard, PillarHeroNumber, PillarHeroItalic, PillarSub,
  PillarBody,
} from '../cs2-shared/CS2Pillars';

/**
 * CS3 Slide 7 · Six convergent pillars — the ICH E5(R1) framework, fully populated.
 *
 * v7-xencor trim: text-only pillar cards — mini-viz widgets removed for one idea per column.
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
const D = { p2: 0.12, p3: 0.16, p4: 0.20, p5: 0.24, band: 0.28 };

export default function CS2Pillars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  // Never leave content at opacity 0 when reduced motion is on.
  const go = inView || !!reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.08}>Case 03 · Architecture — Five convergent pillars</Eyebrow>

      <Headline delay={0.12} maxChars={68}>
        Five lines converge — across{' '}
        <span style={{ color: C.cyan, fontStyle: 'italic', fontWeight: 500 }}>
          PK, PD, intrinsic/extrinsic, regulatory, and mechanism.
        </span>
      </Headline>

      <Subhead delay={0.18} maxChars={54} size="lead">
        The ICH E5(R1) framework, fully populated.
      </Subhead>

      <Viz>
        <div ref={ref} style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          gap: 'clamp(1rem, 2vw, 1.65rem)',
          minHeight: 0, minWidth: 0,
        }}>
          {/* Six-pillar grid — auto-fit reflow on narrow viewports */}
          <div style={{
            flex: 1, minHeight: 0, minWidth: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gridTemplateRows: '1fr 1fr',
            gap: 'clamp(1rem, 2vw, 1.65rem)',
            alignItems: 'stretch',
          }}>
            {/* Pillar 01 · MOA — the morphing card from slide 6 */}
            <div style={{ display: 'flex', minWidth: 0, minHeight: 0 }}>
              <CS2MoaCard variant="lead" style={{ flex: 1 }} />
            </div>

            {/* Pillar 02 · PK Similarity */}
            <div style={{ display: 'flex', minHeight: 0, minWidth: 0 }}>
              <PillarTextCard delay={go ? D.p2 : 0} eyebrow="Pillar 02" name="PK Similarity">
                <PillarHeroNumber>n = 253</PillarHeroNumber>
                <PillarSub>race not significant</PillarSub>
                <PillarBody>Pooled PK n=253 · race not significant.</PillarBody>
              </PillarTextCard>
            </div>

            {/* Pillar 03 · ER Similarity */}
            <div style={{ display: 'flex', minHeight: 0, minWidth: 0 }}>
              <PillarTextCard delay={go ? D.p3 : 0} eyebrow="Pillar 03" name="ER Similarity">
                <PillarHeroItalic>
                  Flat<br />
                  <span style={{
                    fontSize: 'var(--fs-slide-subhead)', fontStyle: 'italic',
                    color: C.creamMuted, fontWeight: 400,
                  }}>across range</span>
                </PillarHeroItalic>
                <PillarBody>Flat E-R · wide TI · 500 mg QD.</PillarBody>
              </PillarTextCard>
            </div>

            {/* Pillar 04 · Intrinsic + extrinsic (merged) */}
            <div style={{ display: 'flex', minHeight: 0, minWidth: 0 }}>
              <PillarTextCard delay={go ? D.p4 : 0} eyebrow="Pillar 04" name="Intrinsic · Extrinsic">
                <PillarHeroItalic size="tag">No dose change</PillarHeroItalic>
                <PillarSub>demographics · food · DDIs</PillarSub>
                <PillarBody>Characterized in label — no India-specific adjustment.</PillarBody>
              </PillarTextCard>
            </div>

            {/* Pillar 05 · Global Reg */}
            <div style={{ display: 'flex', minHeight: 0, minWidth: 0 }}>
              <PillarTextCard delay={go ? D.p5 : 0} eyebrow="Pillar 05" name="Global Reg">
                <PillarHeroNumber>30+</PillarHeroNumber>
                <PillarSub>jurisdictions · 8 yrs</PillarSub>
                <PillarBody>30+ jurisdictions · 8 yrs PV · no ethnicity signal.</PillarBody>
              </PillarTextCard>
            </div>
          </div>

          {/* Full-width takeaway — solid panel, left accent (no CONCLUSION label) */}
          <motion.aside
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: EASE, delay: reduced ? 0 : D.band }}
            style={{
              width: '100%',
              flexShrink: 0,
              padding: 'clamp(0.85rem, 1.6vh, 1.15rem) clamp(1.1rem, 2vw, 1.5rem)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--cream-hairline)',
              borderLeft: `4px solid ${C.amber}`,
              background: 'var(--panel)',
            }}
          >
            <div className="deck-body" style={{
              margin: 0,
              fontSize: 'var(--fs-slide-subhead)',
              color: C.cream,
              lineHeight: 1.45,
              fontWeight: 500,
            }}>
              <span style={{ color: C.amber, fontWeight: 600 }}>No single pillar is sufficient.</span>{' '}
              Five lines converge — MOA through global regulatory record.
            </div>
          </motion.aside>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 0.32}
        kicker="Case 03 · Five convergent pillars · ICH E5(R1)"
        tagline=""
        source="Jiang CTS 2021 · Bolleddula CPT:PSP 2021 · Dang Cancer Cell 2009 · Tibsovo USPI · ICH E5(R1)"
      />
    </SlideGrid>
  );
}
