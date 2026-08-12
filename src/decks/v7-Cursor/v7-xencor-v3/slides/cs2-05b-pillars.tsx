// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import CS2MoaCard from './cs2-shared/CS2MoaCard';
import {
  PillarTextCard, PillarHeroNumber, PillarHeroItalic, PillarSub,
  PillarBody,
} from './cs2-shared/CS2Pillars';

/**
 * CS3 · Six convergent pillars — ICH E5(R1) framework + Phase 4 gap closer.
 * Rejected alternative: Rule 101 alone. Convergence is the case.
 */

const EASE = [0.2, 0.7, 0.3, 1];

/* One group entrance — avoid 150ms micro-stagger cascade */
const D = { pillars: 0.35, reject: 0.7, band: 0.85 };

export default function CS2Pillars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;
  const delay = (d) => (reduced || !go ? 0 : d);

  return (
    <SlideGrid dataCase="2" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.08}>Case 02 · Quantitative strategy</Eyebrow>

      <Headline delay={0.18} maxChars={62}>
        Six converging lines of evidence —{' '}
        <span className="xc-em xc-cyan">no single pillar wins alone</span>
      </Headline>

      <Subhead delay={0.28} maxChars={72} size="lead">
        Mechanism · PK · E-R · factors · global experience · Phase 4 commitment.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 1.6vh, var(--space-4))',
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <motion.div
            className="cs3-pillar-grid"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: delay(D.pillars) }}
          >
            <div>
              <CS2MoaCard variant="lead" style={{ flex: 1 }} />
            </div>

            <div>
              <PillarTextCard delay={0} eyebrow="Pillar 02" name="PK Similarity">
                <PillarHeroNumber>n = 253</PillarHeroNumber>
                <PillarSub>race not significant</PillarSub>
                <PillarBody>Pooled PopPK · race not a significant covariate.</PillarBody>
              </PillarTextCard>
            </div>

            <div>
              <PillarTextCard delay={0} eyebrow="Pillar 03" name="Exposure–response">
                <PillarHeroItalic>
                  Flat<br />
                  <span className="xc-slide-subhead xc-muted" style={{ fontStyle: 'italic', fontWeight: 400 }}>
                    across range
                  </span>
                </PillarHeroItalic>
                <PillarBody>Flat E-R at 500 mg QD — modest exposure shifts would not move efficacy.</PillarBody>
              </PillarTextCard>
            </div>

            <div>
              <PillarTextCard delay={0} eyebrow="Pillar 04" name="Intrinsic · Extrinsic">
                <PillarHeroItalic>No dose change</PillarHeroItalic>
                <PillarSub>demographics · food · DDIs</PillarSub>
                <PillarBody>Fully characterized · PBPK-supported DDI labeling.</PillarBody>
              </PillarTextCard>
            </div>

            <div>
              <PillarTextCard delay={0} eyebrow="Pillar 05" name="Global Reg">
                <PillarHeroNumber>30+</PillarHeroNumber>
                <PillarSub>jurisdictions</PillarSub>
                <PillarBody>Global regulatory experience spanning 30+ jurisdictions in the dossier.</PillarBody>
              </PillarTextCard>
            </div>

            <div>
              <PillarTextCard delay={0} eyebrow="Pillar 06" name="Phase 4 commitment">
                <PillarHeroItalic>Named gap</PillarHeroItalic>
                <PillarSub>upfront · residual PK</PillarSub>
                <PillarBody>Phase 4 PK commitment bounds what pre-approval inference cannot close.</PillarBody>
              </PillarTextCard>
            </div>
          </motion.div>

          <motion.div
            className="cs3-reject-row"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: delay(D.reject) }}
          >
            <div className="cs3-reject-card cs3-reject-card--warn">
              <div className="cs3-reject-card__kick">Rejected alternative</div>
              <p>
                Cite <strong>Rule 101 alone</strong>. It opens the door; it does not answer the
                scientific question. Substituting procedure for pharmacology would have been the
                fast, losing move.
              </p>
            </div>
            <div className="cs3-reject-card cs3-reject-card--note">
              <div className="cs3-reject-card__kick">Working hypothesis</div>
              <p>
                Ethnic sensitivity here is a <strong>tumor-biology</strong> question — IDH1 is
                somatic — so global PK/E-R generalizes. Germline would have made ethnicity the axis.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: delay(D.band) }}
            style={{
              padding: 'clamp(10px, 1.4vh, 14px) clamp(16px, 2vw, 28px)',
              background: 'color-mix(in srgb, var(--amber) 14%, transparent)',
              borderTop: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
              borderBottom: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                transform: 'rotate(45deg)',
                width: 12,
                height: 12,
                background: 'var(--amber)',
                flex: '0 0 auto',
              }}
            />
            <div
              className="deck-display xc-slide-subhead"
              style={{ fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.35, textAlign: 'center' }}
            >
              <span style={{ color: 'var(--amber)', fontWeight: 500 }}>No single pillar wins alone.</span>{' '}
              Convergence is the case.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.1}
        kicker="Case 02 · Six convergent pillars · ICH E5(R1)"
        tagline=""
        source="Jiang CTS 2021 · Bolleddula CPT:PSP 2021 · Dang Cancer Cell 2009 · Tibsovo USPI · ICH E5(R1)"
      />
    </SlideGrid>
  );
}
