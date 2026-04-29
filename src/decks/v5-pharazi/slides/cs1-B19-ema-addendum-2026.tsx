// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 BACKUP · B19 · EMA Pediatric PAH Addendum (March 2026)
 *
 * V6 Type 5 — Regulatory Precedent lane.
 *
 * Source · EMA CHMP/60723/2026 (draft, 19 March 2026) · ICH E11A
 * (adopted Jan 2025) · ICH M15 (current draft / in-force) ·
 * Okour et al. JCP 2023.
 *
 * Defends the framework-mapping claim: the 2023 ambrisentan
 * methodology MAPS ONTO what the 2026 addendum now formalizes.
 * Hard linguistic rule preserved from source: "maps onto" — never
 * "influenced" or "shaped" or "contributed to."
 */
const EASE = [0.2, 0.7, 0.3, 1];

const noteCardStyle = {
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
};
const noteCardLeft = { ...noteCardStyle, borderLeft: '3px solid var(--case)' };
const noteCardRight = { ...noteCardStyle, borderLeft: '3px solid var(--cream-hairline)' };

const titleStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
};

const subTitleDisplay = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--fs-slide-subhead)',
  fontWeight: 700,
  color: 'var(--cream)',
  marginBottom: 'var(--space-3)',
  lineHeight: 1.2,
};

const quoteStyle = {
  borderLeft: '2px solid var(--case)',
  padding: 'var(--space-2) var(--space-3)',
  marginBottom: 'var(--space-3)',
  background: 'color-mix(in srgb, var(--case) 6%, transparent)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-slide-subhead)',
  fontStyle: 'italic',
  color: 'var(--cream)',
  lineHeight: 1.5,
};

const quoteCite = {
  display: 'block',
  marginTop: 'var(--space-2)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--cream-muted)',
  fontStyle: 'normal',
  textTransform: 'uppercase',
};

const ichStamp = {
  flex: 1,
  padding: 'var(--space-2) var(--space-3)',
  border: '1px solid var(--case)',
  borderRadius: 'var(--radius-md)',
  background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
  minWidth: 0,
};

export default function Cs1BackupB19EmaAddendum2026() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B19 · Regulatory Precedent · EMA addendum March 2026</Eyebrow>

      <Headline delay={0.25} maxChars={80}>
        The EMA addendum now{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>formalizes</span>{' '}
        what the 2023 ambrisentan approach demonstrated.
      </Headline>

      <Subhead delay={0.40}>
        Draft CHMP/60723/2026 · adopted 19 March 2026 · methodology published 2023 → framework codified 2026.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateRows: '1fr auto',
            gap: 'var(--space-4)',
            height: '100%',
          }}
        >
          {/* Two-column body */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(22rem, 100%), 1fr))',
              gap: 'var(--space-4)',
              minHeight: 0,
            }}
          >
            {/* Left · verbatim addendum quotes */}
            <motion.div
              style={noteCardLeft}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
            >
              <div style={titleStyle}>Addendum · §4.1.1.1.1 · verbatim excerpts</div>
              <div style={subTitleDisplay}>What the addendum actually says.</div>

              <div style={quoteStyle}>
                "Extrapolation of evidence on pharmacokinetics (PK), efficacy and safety,
                generated in adult patients, is an{' '}
                <strong style={{ color: 'var(--case)', fontStyle: 'normal' }}>important element</strong> of
                the development programme in paediatric patients with PAH."
                <span style={quoteCite}>CHMP/60723/2026 · §4.1.1.1.1</span>
              </div>

              <div style={quoteStyle}>
                "Matching exposure that falls into the exposure range of adults or combination
                of{' '}
                <strong style={{ color: 'var(--case)', fontStyle: 'normal' }}>exposure matching with PK/PD</strong>{' '}
                is an important element contributing to extrapolation based on{' '}
                <strong style={{ color: 'var(--case)', fontStyle: 'normal' }}>exposure-response (E-R)</strong>."
                <span style={quoteCite}>CHMP/60723/2026 · §4.1.1.1.1</span>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                <div style={ichStamp}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--fs-slide-eyebrow)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: 'var(--case)',
                      fontWeight: 700,
                    }}
                  >
                    ICH E11A
                  </div>
                  <div style={{ fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream)', lineHeight: 1.4, marginTop: 4 }}>
                    <strong>Pediatric extrapolation framework.</strong> Defines extrapolation concept and plan.
                    <span style={{ display: 'block', marginTop: 4, fontFamily: 'var(--font-mono)', color: 'var(--cream-faint)' }}>
                      Adopted Jan 2025
                    </span>
                  </div>
                </div>
                <div style={ichStamp}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--fs-slide-eyebrow)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: 'var(--case)',
                      fontWeight: 700,
                    }}
                  >
                    ICH M15
                  </div>
                  <div style={{ fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream)', lineHeight: 1.4, marginTop: 4 }}>
                    <strong>Model-informed drug development.</strong> MIDD methodology standards for regulatory submissions.
                    <span style={{ display: 'block', marginTop: 4, fontFamily: 'var(--font-mono)', color: 'var(--cream-faint)' }}>
                      Current draft / in-force
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right · open problems + where this goes */}
            <motion.div
              style={noteCardRight}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.70 }}
            >
              <div style={{ ...titleStyle, color: 'var(--cream-muted)' }}>Where bridging work is still needed</div>
              <div style={subTitleDisplay}>The open problems the addendum flags.</div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--case)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 700,
                }}
              >
                Not yet validated for extrapolation
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  ['01', <><strong style={{ color: 'var(--cream)' }}>NT-proBNP</strong> — not yet validated as a bridging biomarker for pediatric PAH extrapolation. Adult-to-pediatric mapping remains an open regulatory question.</>],
                  ['02', <><strong style={{ color: 'var(--cream)' }}>Echocardiography-derived endpoints</strong> — not yet validated for extrapolation. Reproducibility and pediatric-specific reference ranges are needed.</>],
                  ['03', <><strong style={{ color: 'var(--cream)' }}>Pediatric-specific risk scores</strong> — adult REVEAL-style composite scores have not been validated in pediatric populations; pediatric-specific scoring is an acknowledged gap.</>],
                ].map(([n, body]) => (
                  <li
                    key={n}
                    style={{
                      padding: 'var(--space-2) 0',
                      borderBottom: '1px dashed var(--cream-hairline)',
                      display: 'grid',
                      gridTemplateColumns: '24px 1fr',
                      gap: 'var(--space-2)',
                      alignItems: 'baseline',
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream)',
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--case)', fontWeight: 700 }}>{n}</span>
                    <span>{body}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--cream-hairline)',
                  borderRadius: 'var(--radius-md)',
                  background: 'color-mix(in srgb, var(--panel) 75%, transparent)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--fs-slide-eyebrow)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--case)',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-2)',
                    fontWeight: 700,
                  }}
                >
                  Where this work goes next
                </div>
                <div style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', lineHeight: 1.5 }}>
                  These are exactly the kinds of questions model-informed frameworks — PopPK/PD,
                  exposure-response, biomarker qualification — are built to answer. The open
                  problems <strong style={{ color: 'var(--cream)' }}>are</strong> the next
                  generation of pediatric extrapolation work.
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom mapping band — the honest claim */}
          <motion.div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 1.00 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                padding: 'var(--space-2) var(--space-3)',
                border: '1px solid var(--case)',
                borderRadius: '9999px',
                background: 'color-mix(in srgb, var(--case) 8%, transparent)',
                fontWeight: 700,
              }}
            >
              The honest claim
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', lineHeight: 1.45 }}>
              Our 2023 methodology{' '}
              <em style={{ color: 'var(--case)', fontWeight: 600 }}>maps onto</em>{' '}
              what the 2026 addendum now formally recommends.{' '}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-muted)' }}>
                (not "influenced" · not "shaped" · not "contributed to" — maps onto.)
              </span>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CS1 · Backup · Regulatory Precedent"
        tagline="Methodology published 2023 → framework codified 2026."
        source="Source · EMA CHMP/60723/2026 (draft, 19 Mar 2026) · ICH E11A (Jan 2025) · ICH M15 · Okour et al. JCP 2023"
      />
    </SlideGrid>
  );
}
