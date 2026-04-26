import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Slide 14 (slot) — V2-S10 · Regulatory outcome + ICH E11A.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2B-Slides-CS1-Slides07-11-v2.md.
 * Slide ID `cs1-lesson` retained for manifest stability; the V2 spec
 * places the regulatory outcome + framework-codification beat here,
 * with the three takeaways moved to slide 15 (cs1-bridge).
 *
 * v2-final amendments:
 *   - A1.5 PMDA approval = March 23, 2021 (specific date verified via
 *     GSK Japan press release; Japanese label cites AMB112529
 *     hemodynamic substudy).
 *   - A2.5 FDA honesty caveat moved on-slide (was Q&A only). Letairis
 *     label states verbatim: "safety and effectiveness in pediatric
 *     patients have not been established." As of 2026, ambrisentan
 *     still has no formal FDA pediatric indication.
 *   - A3.5 LTE specifics: 38/41 enrolled, 21 aged out at 18, 7 deaths
 *     none attributed to ambrisentan. Eur J Pediatr 2024.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const PINS = [
  {
    n: '01',
    agency: 'EMA',
    date: '2021',
    body: 'Pediatric Volibris · 8–17 years · 3 weight bands × 2 dose levels (2.5–10 mg QD)',
    accent: 'var(--coral)',
  },
  {
    n: '02',
    agency: 'PMDA',
    date: 'March 23, 2021',
    body: 'Same exposure-matching framework · Japanese label cites AMB112529 hemodynamic substudy',
    accent: 'var(--coral)',
  },
  {
    n: '03',
    agency: 'ICH E11A',
    date: 'December 2024',
    body: 'Extrapolation continuum codified · where similarity is high → exposure matching alone is sufficient',
    accent: 'var(--amber)',
  },
];

function PinCard({ pin, delay, reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: '1px solid var(--cream-hairline)',
        borderLeft: `4px solid ${pin.accent}`,
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
        padding: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: pin.accent,
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
      }}>
        Pin {pin.n}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div className="deck-display" style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          color: 'var(--cream)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-0.015em',
        }}>
          {pin.agency}
        </div>
        <div className="deck-mono" style={{
          fontSize: 'var(--fs-slide-subhead)',
          color: pin.accent,
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {pin.date}
        </div>
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.86,
        lineHeight: 1.45,
      }}>
        {pin.body}
      </div>
    </motion.div>
  );
}

export default function Cs1Lesson() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Outcome + codification
      </Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        EMA and PMDA approved pediatric ambrisentan in 2021.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 600 }}>
          ICH E11A codified the framework in 2024.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        The framework the case demonstrated has since become the codified standard
        for pediatric extrapolation.
      </Subhead>

      <Viz>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-3), 2.5vh, var(--space-5))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          height: '100%',
        }}>
          {/* Three regulatory pins */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(17rem, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
          }}>
            {PINS.map((p, i) => (
              <PinCard key={p.n} pin={p} delay={0.85 + i * 0.15} reduced={reduced} />
            ))}
          </div>

          {/* Closing annotation — the methodological insight */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.50, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.92,
              lineHeight: 1.55,
              maxWidth: '70ch',
              alignSelf: 'flex-start',
            }}
          >
            Same architecture is the working template for current pediatric PAH programs &mdash;{' '}
            <span style={{ fontWeight: 600, color: 'var(--coral)' }}>adult efficacy as anchor</span>,{' '}
            <span style={{ fontWeight: 600, color: 'var(--coral)' }}>pediatric PK as bridge</span>,{' '}
            <span style={{ fontWeight: 600, color: 'var(--coral)' }}>totality of evidence</span> for submission. The methodological insight travels.
          </motion.div>

          {/* FDA honesty caveat — A2.5 v2-final amendment, on-slide proactive disclosure */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.80, ease: EASE }}
            style={{
              border: '1px dashed color-mix(in srgb, var(--cream-faint) 60%, transparent)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
              padding: 'clamp(var(--space-2), 1.4vw, var(--space-3)) clamp(var(--space-3), 1.6vw, var(--space-4))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
            }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
              fontWeight: 700,
            }}>
              Note on FDA · proactive disclosure
            </div>
            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream)',
              opacity: 0.82,
              lineHeight: 1.5,
            }}>
              Never received the package &mdash; split-rights commercial outcome, not a regulatory rejection. Letairis label states verbatim that <em>safety and effectiveness in pediatric patients have not been established</em>. As of 2026, ambrisentan still has no formal FDA pediatric indication.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.10}
        kicker="14 · CS1 · OUTCOME + E11A"
        tagline="The framework prefigured the codification — by four years."
        source="Source · GSK Japan press release 2021-03-23 · ICH E11A Step 4 (Dec 2024) · Eur J Pediatr 2024 LTE paper · Letairis label 2024"
      />
    </SlideGrid>
  );
}
