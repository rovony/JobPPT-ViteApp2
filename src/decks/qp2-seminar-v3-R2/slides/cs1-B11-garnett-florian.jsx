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
  minHeight: 0,
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

const BLOCKS = [
  {
    label: 'Step 1 · Adult PVR–6MWD regression',
    lines: [
      { text: '12 trials · 2,028 patients · 9 drugs · 5 classes', stat: true },
      { text: 'Slope: −0.055 m per dyne·sec/cm⁵' },
      { text: '~49% of treatment effect explained by PVR change' },
    ],
  },
  {
    label: 'Step 2 · Pediatric PVR data',
    lines: [
      { text: 'BREATHE-3: N = 19', stat: true },
      { text: 'ΔPVR ≈ −389 dyne·sec/cm⁵ (bosentan)' },
      { text: 'Largest pediatric hemodynamic dataset available' },
    ],
  },
  {
    label: 'Step 3 · Stochastic simulation',
    lines: [
      { text: '500 simulated datasets', stat: true },
      { text: 'Based on ΔPVR mapped through adult regression' },
      { text: 'Monte Carlo propagation of uncertainty' },
    ],
  },
  {
    label: 'Step 4 · Predicted pediatric 6MWD',
    lines: [
      { text: '+14 m (95% CI: 3–31 m)', stat: true },
      { text: 'CI excludes zero → bridging accepted', accent: true },
      { text: 'Directionally consistent with adult ERA effect' },
    ],
  },
];

export default function Cs1BackupB11GarnettFlorian() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B11 · FDA framework</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Garnett-Florian: PVR → 6MWD bridging{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — FDA's parallel architecture.
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
          {/* Four-block pipeline */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(14rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              flex: '0 0 auto',
            }}
          >
            {BLOCKS.map((block, i) => (
              <motion.div
                key={block.label}
                style={panelStyle}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6 + i * 0.15, ease: EASE }}
              >
                <div className="deck-mono uppercase" style={labelStyle}>
                  {block.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  {block.lines.map((line, j) => (
                    <div
                      key={j}
                      className="deck-body"
                      style={line.accent ? { ...bodyStyle, color: 'var(--case)', fontWeight: 600 } : line.stat ? { ...bodyStyle, ...statStyle } : mutedStyle}
                    >
                      {line.text}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connectors between blocks — arrows rendered via Unicode for simplicity */}

          {/* Key facts panel */}
          <motion.div
            style={{
              ...panelStyle,
              borderLeft: '4px solid var(--case)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.3, ease: EASE }}
          >
            <div className="deck-mono uppercase" style={labelStyle}>
              Key facts · NDA 209279 (2017 bosentan pediatric)
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              <div className="deck-body" style={bodyStyle}>
                Built by <span style={statStyle}>Garnett &amp; Florian (FDA OCP)</span> —
                clin-pharm carried the day
              </div>
              <div className="deck-body" style={bodyStyle}>
                Clinical reviewer recommended against;{' '}
                <span style={statStyle}>CVDAC voted 7-6</span>
              </div>
              <div className="deck-body" style={mutedStyle}>
                First PVR→6MWD pharmacometric bridge accepted by FDA for pediatric PAH
              </div>
            </div>
          </motion.div>

          {/* AMB112529 annotation */}
          <motion.div
            style={{
              ...panelStyle,
              background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.6, ease: EASE }}
          >
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream-muted)',
                lineHeight: 1.55,
                fontStyle: 'italic',
              }}
            >
              AMB112529 collected hemodynamic data in n=5 only — too few for
              Garnett-Florian on its own. EMA accepted PK matching alone.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B11 · CS1 · GARNETT-FLORIAN"
        source="Source · FDA NDA 209279 review 2017 · Garnett & Florian, FDA OCP"
      />
    </SlideGrid>
  );
}
