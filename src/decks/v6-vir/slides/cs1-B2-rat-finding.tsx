// @ts-nocheck
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

const rowStyle = {
  display: 'flex',
  gap: 'var(--space-2)',
  alignItems: 'baseline',
  fontSize: 'var(--fs-slide-subhead)',
  lineHeight: 1.55,
};

const bulletStyle = {
  color: 'var(--case)',
  flexShrink: 0,
  fontWeight: 700,
};

export default function Cs1BackupRatFinding() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B2 · Safety</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Juvenile rat finding{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — mechanism-specific, age-window-limited, margin-defended.
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
          {/* Top row: Finding + Human relevance */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              flex: '1 1 auto',
              minHeight: 0,
            }}
          >
            {/* Finding panel */}
            <motion.div
              style={panelStyle}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6, ease: EASE }}
            >
              <div className="deck-mono uppercase" style={labelStyle}>
                The finding
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Row>
                  <span style={{ fontWeight: 600, color: 'var(--cream)' }}>3–8% brain weight decrease</span>{' '}
                  <span style={{ color: 'var(--cream-muted)' }}>at 20 mg/kg/day</span>
                </Row>
                <Row>
                  <span style={{ color: 'var(--cream)' }}>Postnatal day 7 (PND7)</span>{' '}
                  <span style={{ color: 'var(--cream-muted)' }}>· dose-dependent · window-specific</span>
                </Row>
                <div style={{ borderTop: '1px solid var(--cream-hairline)', paddingTop: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                  <div className="deck-mono uppercase" style={{ ...labelStyle, fontSize: 'var(--fs-slide-pageno)', marginBottom: 'var(--space-1)' }}>
                    Mechanism
                  </div>
                  <Row>
                    <span style={{ color: 'var(--cream)' }}>
                      Sustained hypoxemia from laryngeal-anatomy interaction
                    </span>
                  </Row>
                  <Row>
                    <span style={{ color: 'var(--cream-muted)' }}>
                      Edema × soft PND7 larynx → airway narrows → intermittent hypoxia
                    </span>
                  </Row>
                  <Row>
                    <span style={{ color: 'var(--cream-muted)' }}>
                      Reversible ~10 days off-dose
                    </span>
                  </Row>
                </div>
              </div>
            </motion.div>

            {/* Human relevance panel */}
            <motion.div
              style={panelStyle}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.85, ease: EASE }}
            >
              <div className="deck-mono uppercase" style={labelStyle}>
                Human relevance assessment
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Row>
                  <span style={{ color: 'var(--cream)' }}>At-risk window:</span>{' '}
                  <span style={{ fontWeight: 600, color: 'var(--cream)' }}>0–3 years</span>
                </Row>
                <Row>
                  <span style={{ color: 'var(--cream)' }}>Trial population:</span>{' '}
                  <span style={{ fontWeight: 600, color: 'var(--cream)' }}>ages 8+</span>{' '}
                  <span style={{ color: 'var(--cream-muted)' }}>· past critical window</span>
                </Row>
                <Row>
                  <span style={{ color: 'var(--cream)' }}>Exposure margin:</span>{' '}
                  <span style={{ fontWeight: 600, color: 'var(--cream)' }}>1.8–7× human AUC</span>{' '}
                  <span style={{ color: 'var(--cream-muted)' }}>at 10 mg</span>
                </Row>
                <div style={{ borderTop: '1px solid var(--cream-hairline)', paddingTop: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                  <div className="deck-mono uppercase" style={{ ...labelStyle, fontSize: 'var(--fs-slide-pageno)', marginBottom: 'var(--space-1)' }}>
                    Conclusion · 0–&lt;3 yr waiver; 8–&lt;18 yr studied
                  </div>
                  <Row>
                    <span style={{ color: 'var(--cream-muted)' }}>
                      EMA PIP: formal waiver below 6 yrs (endpoint feasibility + safety margin)
                    </span>
                  </Row>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom strip: LTE safety confirmation */}
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
              Long-term extension · 3.5-year safety
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              <div className="deck-body" style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', lineHeight: 1.55 }}>
                <span style={{ fontWeight: 600 }}>No novel safety signals</span> · LTE 3.5 years
              </div>
              <div className="deck-body" style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', lineHeight: 1.55 }}>
                <span style={{ fontWeight: 600 }}>7 / 38 deaths</span> · none attributed to drug (disease progression)
              </div>
              <div className="deck-body" style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)', lineHeight: 1.55 }}>
                6MWD improvement maintained: +17% from baseline
              </div>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B2 · CS1 · JUVENILE RAT FINDING"
        source="Source · Laffan et al. · FDA Letairis label · Eur J Pediatr 2024 (LTE)"
      />
    </SlideGrid>
  );
}

function Row({ children }) {
  return (
    <div style={rowStyle}>
      <span style={bulletStyle}>·</span>
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );
}
