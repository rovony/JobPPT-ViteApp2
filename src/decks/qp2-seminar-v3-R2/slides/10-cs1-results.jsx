import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Slide 10 (slot) — V2-S6 · Two precedents, one architecture.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2A-Slides-CS1-Slides01-06-v2.md.
 * Slide ID `cs1-results` retained for manifest stability; the V2 spec
 * places the dual-precedent reframe here. The exposure-match results
 * are now slot 13 (cs1-verdict) per V2-S9.
 *
 * v2-final amendment A1.3 — TWO-PRECEDENT REFRAME:
 *   - EMA + PMDA path = PK-matching architecture (FUTURE-1 precedent,
 *     Beghetti BJCP 2009, N=36, AUC 54% of target → EMA approved
 *     methodology anyway).
 *   - FDA path = PVR-6MWD quantitative bridging (Garnett-Florian
 *     framework, NDA 209279, 2017): 12 trials, 2,028 patients, 9 drugs,
 *     5 classes; slope −0.055 m/(dyne·sec/cm⁵); applied to BREATHE-3
 *     N=19 → predicted +14 m (95% CI 3–31 m).
 *   - This case = EMA branch. AMB112529 PIP-aligned for exposure
 *     matching, hemodynamic substudy N=5 paired low-dose too small
 *     for Garnett-Florian-style anchor.
 */

const EASE = [0.2, 0.7, 0.3, 1];

function PathColumn({ headerKicker, headerColor, title, body, bars, footer, delay, reduced, dimmed }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: `1px solid ${dimmed ? 'var(--cream-hairline)' : 'color-mix(in srgb, var(--coral) 32%, transparent)'}`,
        borderLeft: `4px solid ${headerColor}`,
        borderRadius: 'var(--radius-lg)',
        background: dimmed
          ? 'color-mix(in srgb, var(--panel) 55%, transparent)'
          : 'color-mix(in srgb, var(--coral) 6%, transparent)',
        padding: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        opacity: dimmed ? 0.92 : 1,
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-kicker)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: headerColor,
        fontWeight: 700,
      }}>
        {headerKicker}
      </div>
      <div className="deck-display" style={{
        fontSize: 'clamp(1.1rem, 1.95vw, 1.55rem)',
        color: 'var(--cream)',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.005em',
      }}>
        {title}
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.86,
        lineHeight: 1.5,
      }}>
        {body}
      </div>
      {bars && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginTop: 'var(--space-1)' }}>
          {bars.map((b) => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 0 }}>
              <span className="deck-mono" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cream-faint)',
                letterSpacing: 'var(--ls-mono)',
                width: '14ch',
                flexShrink: 0,
              }}>
                {b.label}
              </span>
              <div aria-hidden style={{ flex: 1, height: 6, background: 'color-mix(in srgb, var(--cream-faint) 30%, transparent)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, width: `${b.pct}%`, background: b.color || headerColor, opacity: 0.85 }} />
              </div>
              <span className="deck-mono" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: b.color || headerColor,
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                width: '5ch',
                textAlign: 'right',
                flexShrink: 0,
              }}>
                {b.pct}%
              </span>
            </div>
          ))}
        </div>
      )}
      {footer && (
        <div className="deck-body" style={{
          fontSize: 'var(--fs-slide-pageno)',
          color: 'var(--cream)',
          opacity: 0.78,
          lineHeight: 1.45,
          fontStyle: 'italic',
          marginTop: 'auto',
          paddingTop: 'var(--space-2)',
          borderTop: '1px solid var(--cream-hairline)',
        }}>
          {footer}
        </div>
      )}
    </motion.div>
  );
}

export default function Cs1Results() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Two architectural precedents
      </Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        Pediatric PAH ERA bridging has{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 600 }}>
          two recognized architectures
        </span>{' '}
        — both established for bosentan; this case is the EMA branch.
      </Headline>

      <Subhead delay={0.55} maxChars={94} size="lead">
        Same intellectual move; different evidence weights. Knowing both signals
        regulatory literacy.
      </Subhead>

      <Viz>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-3), 2.5vh, var(--space-5))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          height: '100%',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
            alignItems: 'stretch',
          }}>
            <PathColumn
              delay={0.85}
              reduced={reduced}
              headerKicker="EMA + PMDA path · PK-matching"
              headerColor="var(--coral)"
              title={<>FUTURE-1 (Beghetti, <em>BJCP</em> 2009) — <span style={{ color: 'var(--coral)' }}>N=36</span> children, ages 3–17.</>}
              body={<>Pediatric AUC came in at <strong>54%</strong> of adult target — PK match <em>missed</em>. EMA approved the pediatric formulation anyway. <strong>Methodology endorsed; specific execution not penalized.</strong></>}
              bars={[
                { label: 'Adult target',    pct: 100, color: 'var(--cream-faint)' },
                { label: 'FUTURE-1 ped',    pct: 54,  color: 'var(--cream-muted)' },
                { label: 'AMB112529 low',   pct: 97,  color: 'var(--coral)' },
              ]}
              footer="What this case used. AMB112529 → ambrisentan EMA + PMDA pediatric labels (2021). PIP-aligned. PK matching within 3% of adult AUC — much tighter than FUTURE-1."
            />

            <PathColumn
              delay={1.00}
              reduced={reduced}
              dimmed
              headerKicker="FDA path · PVR-6MWD bridging"
              headerColor="var(--cream-muted)"
              title={<>Garnett-Florian framework (FDA NDA 209279, 2017).</>}
              body={<>Pooled <strong>12</strong> placebo-controlled adult trials, <strong>2,028 patients</strong>, 9 drugs across 5 classes. Slope: <strong>−0.055 m / (dyne·sec/cm⁵)</strong>. Applied to BREATHE-3 (N=19, ΔPVR ≈ −389 dyne·sec/cm⁵) → predicted pediatric Δ6MWD <strong>+14 m (95% CI 3–31 m)</strong> → bridging accepted.</>}
              footer="What this case did NOT use (and why). AMB112529 hemodynamic substudy was N=5 paired low-dose patients — too few to anchor a Garnett-Florian-style analysis on its own. Substudy data were cited supportively by PMDA and disclosed in the EMA submission."
            />
          </div>

          {/* Pull-quote — the integrating sentence */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.50, ease: EASE }}
            className="deck-display italic"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--coral)',
              opacity: 0.95,
              lineHeight: 1.5,
              fontWeight: 500,
              maxWidth: '78ch',
              alignSelf: 'flex-start',
              borderLeft: '3px solid var(--coral)',
              paddingLeft: 'var(--space-3)',
            }}
          >
            Same intellectual move &mdash; extrapolate adult efficacy through a quantitative pediatric bridge. Different evidence weights. EMA accepts PK-matching alone when similarity is high; FDA wants the hemodynamic surrogate too. <strong>This case is the EMA branch.</strong>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.95}
        kicker="10 · CS1 · TWO PRECEDENTS"
        tagline="Same architecture, different evidence weights. Two doors. We walked through one."
        source="Source · Beghetti M et al. Br J Clin Pharmacol 2009;68(6):948–955 · FDA NDA 209279 review (Garnett/Florian, 2017) · Barst RJ et al. Clin Pharmacol Ther 2003 (BREATHE-3)"
      />
    </SlideGrid>
  );
}
