import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const panelStyle = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-3) var(--space-4)',
  minWidth: 0,
};

const labelStyle = {
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
};

const bodyStyle = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream)',
  lineHeight: 1.55,
};

const mutedStyle = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream-muted)',
  lineHeight: 1.55,
};

const statStyle = {
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 600,
  color: 'var(--cream)',
};

export default function Cs1BackupStartsDetail() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B1 · STARTS-1 / STARTS-2</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        The safety signal that shaped the discipline{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — and its resolution.
        </span>
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            height: '100%',
            minHeight: 0,
            minWidth: 0,
            paddingTop: 'var(--space-2)',
          }}
        >
          {/* Top row: STARTS-1 + STARTS-2 side by side */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              flex: '1 1 auto',
              minHeight: 0,
            }}
          >
            {/* STARTS-1 */}
            <motion.div
              style={panelStyle}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6, ease: EASE }}
            >
              <div className="deck-mono uppercase" style={labelStyle}>
                STARTS-1 · Barst 2012
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="deck-body" style={bodyStyle}>
                  <span style={statStyle}>N = 235</span> · sildenafil TID × 16 wks in pediatric PAH
                </div>
                <div className="deck-body" style={bodyStyle}>
                  Primary endpoint: peak VO₂ change · <span style={statStyle}>p = 0.056</span> (missed)
                </div>
                <div className="deck-body" style={mutedStyle}>
                  Weight-banded TID dosing: low / medium / high arms
                </div>
                <div className="deck-body" style={mutedStyle}>
                  6MWD improved in older subgroup; younger subgroup showed no signal
                </div>
              </div>
            </motion.div>

            {/* STARTS-2 */}
            <motion.div
              style={panelStyle}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.8, ease: EASE }}
            >
              <div className="deck-mono uppercase" style={labelStyle}>
                STARTS-2 · Barst 2014 (LTE)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="deck-body" style={bodyStyle}>
                  Mortality signal: <span style={statStyle}>HR 3.95</span> high- vs low-dose
                </div>
                <div className="deck-body" style={bodyStyle}>
                  <span style={statStyle}>37 deaths</span> during long-term extension
                </div>
                <div className="deck-body" style={{ ...mutedStyle, color: 'var(--case)' }}>
                  Confounders flagged: sicker patients up-titrated to high dose;
                  disease progression, not drug causation
                </div>
                <div className="deck-body" style={mutedStyle}>
                  FDA: sildenafil label added pediatric warning (2012), later revised
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom strip: AFFILIATE resolution */}
          <motion.div
            style={{
              ...panelStyle,
              borderLeft: '4px solid var(--case)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.1, ease: EASE }}
          >
            <div className="deck-mono uppercase" style={labelStyle}>
              Resolution · AFFILIATE 2024
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              <div className="deck-body" style={bodyStyle}>
                Hoeper et al. Circulation 2024 · <span style={statStyle}>N = 385</span>
              </div>
              <div className="deck-body" style={bodyStyle}>
                <span style={statStyle}>80 mg TID non-inferior to 5 mg TID</span> (primary endpoint)
              </div>
              <div className="deck-body" style={mutedStyle}>
                FDA sildenafil pediatric approval · 2023 (post-AFFILIATE data)
              </div>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B1 · CS1 · STARTS DETAIL"
        source="Source · Barst et al. Circulation 2012 + 2014 · Hoeper et al. Circulation 2024"
      />
    </SlideGrid>
  );
}
