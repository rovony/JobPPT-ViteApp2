// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 BACKUP · B2 · Simulated Primary Endpoint
 *
 * V6 Type 2 — Methodology lane.
 *
 * Source · Rylaze (JZP-458) FDA approval June 2021 · Calaspargase
 * pegol (Asparlas) FDA approval 20 Dec 2018 · O'Connor et al.
 * ANZCHOG 2024.
 *
 * Critical correction preserved verbatim: in CS3 this endpoint was
 * proposed as prospective primary. FDA DEFERRED — did not reject —
 * requiring additional PopPK data before accepting simulation-based
 * efficacy as primary.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const cardStyle = {
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
};
const precedentCard = {
  ...cardStyle,
  borderLeft: '3px solid var(--case)',
  background: 'color-mix(in srgb, var(--case) 6%, transparent)',
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
const monoSpan = { fontFamily: 'var(--font-mono)', color: 'var(--case)' };
const hot = { color: 'var(--case)', fontWeight: 700 };

export default function Cs3BackupB2SimulatedEndpoint() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B2 · Methodology · Simulated primary endpoint</Eyebrow>

      <Headline delay={0.25} maxChars={70}>
        <span style={monoSpan}>NPAA ≥ 0.1 U/mL</span> — mechanism-anchored,{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>FDA-precedented</span>, PopPK-derived.
      </Headline>

      <Subhead delay={0.40}>
        The endpoint architecture · why 0.1 U/mL · simulation specification · Rylaze precedent.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateRows: '1fr auto',
            gap: 'var(--space-3)',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(22rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              minHeight: 0,
            }}
          >
            {/* Left col: endpoint, why 0.1, simulation */}
            <motion.div
              style={cardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
            >
              <div style={titleStyle}>Endpoint</div>
              <div style={bodyStyle}>
                Primary: proportion of adult patients achieving{' '}
                <strong style={hot}>Nadir Plasma Asparaginase Activity (NPAA) ≥ 0.1 U/mL</strong>{' '}
                at the post-consolidation timepoint.
              </div>

              <div style={{ ...titleStyle, marginTop: 'var(--space-3)' }}>Why 0.1 U/mL</div>
              <ul style={{ ...bodyStyle, paddingLeft: 'var(--space-4)', margin: 0 }}>
                <li>Mechanism · asparagine depletion is the therapeutic MOA</li>
                <li>Threshold · below NPAA ~0.1 U/mL, asparagine reappears in plasma; target engagement compromised</li>
                <li>Validation · threshold convergent across asparaginase preparations (O'Connor et al. ANZCHOG 2024)</li>
                <li>Chemistry, not anatomy — no biological reason adult lymphoblasts differ from pediatric</li>
              </ul>

              <div style={{ ...titleStyle, marginTop: 'var(--space-3)' }}>Simulation specification</div>
              <ul style={{ ...bodyStyle, paddingLeft: 'var(--space-4)', margin: 0 }}>
                <li>Virtual adult population · <span style={monoSpan}>2,000 – 10,000</span> patients</li>
                <li>Simulated from final pooled pediatric + adult PopPK model</li>
                <li>Covariate distribution matched to adult target enrollment</li>
                <li>IIV and residual variability included</li>
                <li>
                  Success criterion ·{' '}
                  <strong style={hot}>lower 95% CI bound on proportion ≥ 85%</strong>{' '}
                  <span style={{ color: 'var(--cream-faint)' }}>(CSP v5, relaxed from ≥ 90% post-FDA Type A alignment)</span>
                </li>
              </ul>
            </motion.div>

            {/* Right col: Rylaze precedent + defensibility */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <motion.div
                style={precedentCard}
                initial={{ opacity: 0, y: 10 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.70 }}
              >
                <div style={titleStyle}>Rylaze (JZP-458) · 2021 FDA approval</div>
                <div style={{ ...bodyStyle, color: 'var(--cream)' }}>
                  FDA approved recombinant crisantaspase (<strong style={hot}>Rylaze / JZP-458</strong>)
                  in <span style={monoSpan}>2021</span> with a model-based primary endpoint framework
                  built on PopPK simulation of NPAA achievement.{' '}
                  <strong style={hot}>FDA itself ran confirmatory simulations</strong> during review —{' '}
                  <span style={monoSpan}>93.6% [92.6–94.6%]</span> for 25 mg/m² Q48H×7, from 2,000
                  virtual patients. Established the specific methodological precedent for the
                  calaspargase pegol adult ALL approach.
                </div>
              </motion.div>

              <motion.div
                style={cardStyle}
                initial={{ opacity: 0, y: 10 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.85 }}
              >
                <div style={titleStyle}>What makes the approach defensible</div>
                <ol style={{ ...bodyStyle, paddingLeft: 'var(--space-4)', margin: 0, fontStyle: 'italic' }}>
                  <li>Mechanistically validated surrogate (asparagine depletion = MOA)</li>
                  <li>FDA-validated threshold (since 2018 calaspargase pediatric label)</li>
                  <li>Informative prior PopPK carries the adult-pediatric bridging</li>
                  <li>Simulation framework reproducible and auditable</li>
                </ol>
              </motion.div>
            </div>
          </div>

          {/* Critical correction band */}
          <motion.div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream-muted)',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 1.00 }}
          >
            <strong style={{ color: 'var(--cream)', fontStyle: 'normal', fontWeight: 700 }}>
              Critical correction:
            </strong>{' '}
            in CS3 this endpoint was proposed as prospective primary. FDA{' '}
            <strong style={{ color: 'var(--cream)', fontStyle: 'normal' }}>deferred — did not reject</strong>{' '}
            — requiring additional PopPK data before accepting simulation-based efficacy as primary.
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CS3 · Backup · Methodology"
        tagline="Mechanism-anchored. FDA-precedented. PopPK-derived."
        source="Source · Rylaze FDA approval Jun 2021 · Asparlas FDA approval 20 Dec 2018 · O'Connor ANZCHOG 2024"
      />
    </SlideGrid>
  );
}
