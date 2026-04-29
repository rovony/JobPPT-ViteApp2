// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 BACKUP · B16 · Model Diagnostics + Robustness
 *
 * V6 Type 2 — Methodology lane.
 *
 * Source · Okour et al. J Clin Pharmacol 2023 · Figures 2, S2; Data S1 ·
 * doi:10.1002/jcph.2199. All numerical claims verbatim.
 *
 * Defends "show me your diagnostics" / "is the fit any good?" with
 * pcVPC, 4-panel GOF, allometric perturbation, covariate stability,
 * Vp/F sensitivity, and the sparse-sampling schedule.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const cardStyle = {
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
};

const bodyStyle = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream-muted)',
  lineHeight: 1.5,
};

const monoSpan = {
  fontFamily: 'var(--font-mono)',
  color: 'var(--case)',
};

const cardData = [
  {
    title: 'pcVPC · 500 replicates (Figure 2)',
    body: (
      <>
        Observed <strong style={{ color: 'var(--cream)' }}>median and 5th/95th percentiles</strong> fall within
        simulated prediction intervals across the full dosing window.{' '}
        <strong style={{ color: 'var(--cream)' }}>No systematic bias.</strong> Model reproduces
        the central tendency and spread of the pediatric concentration data.
      </>
    ),
  },
  {
    title: 'Goodness-of-fit · 4 panels (Figure S2)',
    body: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
        {[
          ['OBS vs IPRED', 'on line of identity'],
          ['OBS vs PRED', 'scattered — no bias'],
          ['CWRES vs TIME', 'symmetric ~0 · no trend'],
          ['CWRES vs PRED', 'symmetric · no trend'],
        ].map(([label, body]) => (
          <div
            key={label}
            style={{
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-2) var(--space-3)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fs-slide-eyebrow)',
              color: 'var(--cream)',
            }}
          >
            <div style={{ color: 'var(--case)', letterSpacing: 'var(--ls-mono-wide)', marginBottom: 4 }}>
              {label}
            </div>
            <div style={{ color: 'var(--cream-muted)' }}>{body}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Vp/F sensitivity · Data S1',
    body: (
      <>
        Vp/F fixed at <span style={monoSpan}>8.51 · 81.3 · 180 L</span> across 5 body weights;
        both dose levels. Simulated AUC<sub>ss</sub> and C<sub>max,ss</sub>{' '}
        <strong style={{ color: 'var(--cream)' }}>did not meaningfully differ</strong> — Vp/F is
        near-inestimable from sparse data, but exposure predictions are robust to it.
        <div
          style={{
            marginTop: 'var(--space-2)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-slide-eyebrow)',
            color: 'var(--cream)',
            lineHeight: 1.5,
          }}
        >
          20 / 27.5 / 42.5 / 50 / 70 kg tested at all three Vp/F values · all ≈ equivalent in AUC<sub>ss</sub> &amp; C<sub>max,ss</sub>.
        </div>
      </>
    ),
  },
  {
    title: 'Allometric perturbation · Covariate stability',
    body: (
      <>
        <strong style={{ color: 'var(--cream)' }}>±10%</strong> perturbations on the fixed
        allometric exponents (<span style={monoSpan}>0.75, 1.0</span>) produced{' '}
        <strong style={{ color: 'var(--cream)' }}>no material change</strong> in derived AUC
        <sub>ss</sub> or C<sub>max</sub> across the pediatric weight range. Parameter estimates{' '}
        <strong style={{ color: 'var(--cream)' }}>stable</strong> across with/without each tested
        covariate.
      </>
    ),
  },
  {
    title: 'Sparse-sampling schedule (AMB112529)',
    body: (
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-slide-eyebrow)',
          color: 'var(--cream)',
          lineHeight: 1.7,
        }}
      >
        <span style={{ color: 'var(--case)' }}>WEEK 4</span> · trough<br />
        <span style={{ color: 'var(--case)' }}>WEEK 8</span> · 0.5–4 h post-dose<br />
        <span style={{ color: 'var(--case)' }}>WEEK 12</span> · trough<br />
        <span style={{ color: 'var(--case)' }}>WEEK 16</span> · 0.5–4 h post-dose<br />
        <span style={{ color: 'var(--case)' }}>WEEK 20</span> · 4–22 h post-dose<br />
        <span style={{ color: 'var(--case)' }}>WEEK 24</span> · 24 h (trough)
      </div>
    ),
  },
  {
    title: '"Twice-daily" Figure 2 artifact',
    body: (
      <>
        The apparent two-peak appearance in Figure 2 is a{' '}
        <strong style={{ color: 'var(--cream)' }}>sampling-schedule visualization artifact</strong>{' '}
        — one sample/visit plotted by planned post-dose time across six visits.{' '}
        <strong style={{ color: 'var(--cream)' }}>No evidence</strong> of delayed absorption or
        enterohepatic recirculation; under actual QD dosing the PK profile is monotonic.
      </>
    ),
  },
];

export default function Cs1BackupB16ModelDiagnostics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B16 · Methodology · Diagnostics + robustness</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Model adequacy confirmed —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          across every diagnostic.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        Exposure inference — not parameter inference — drove the regulatory conclusion. Both were robust.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
            gap: 'var(--space-3)',
            height: '100%',
          }}
        >
          {cardData.map((c, i) => (
            <motion.div
              key={c.title}
              style={cardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.55 + i * 0.08 }}
            >
              <div style={titleStyle}>{c.title}</div>
              <div style={bodyStyle}>{c.body}</div>
            </motion.div>
          ))}
        </div>
      </Viz>

      <Footer
        kicker="CS1 · Backup · Methodology"
        tagline="Diagnostics tell you the model is sound. Exposure tells you it's relevant."
        source="Source · Okour et al. J Clin Pharmacol 2023 · Figures 2, S2 · Data S1 · doi:10.1002/jcph.2199"
      />
    </SlideGrid>
  );
}
