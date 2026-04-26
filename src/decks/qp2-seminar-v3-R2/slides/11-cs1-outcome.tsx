// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 11 (slot) — V2-S7 · Three disruptions · the trial that wasn't.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2B-Slides-CS1-Slides07-11-v2.md.
 * Slide ID `cs1-outcome` retained for manifest stability; the V2 spec
 * places the THREE-DISRUPTIONS dramatic core here, with the clinical
 * outcome numbers (7/38 LTE deaths etc.) folded into slide 14
 * (cs1-lesson) outcome+E11A and surfaced via Q&A backup B7.
 *
 * v2-final amendments:
 *   - A3.3 Trial dates precision: First patient enrolled Jan 4, 2011.
 *     Last patient visit Nov 12, 2013. Hold lifted 2017. CHMP submission
 *     Nov 2017. Trial formally terminated Feb 11, 2019.
 *   - A3.4 Two deaths characterization: both PAH-disease-related,
 *     neither attributed to ambrisentan. (1) fatal pneumonia low-dose;
 *     (2) acute decompensated cardiac failure during LTE high-dose.
 *
 * The three disruptions card pattern mirrors the panel-card recipe in
 * merck-deck CLAUDE.md "Best-in-Class Slide Design" §1153.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const DISRUPTIONS = [
  {
    n: '01',
    label: 'TRIAL',
    headline: 'A juvenile rat finding halted enrollment.',
    timestamps: 'First patient · Jan 4, 2011 → last visit · Nov 12, 2013 → hold 2013–2017 → CHMP submission Nov 2017 → formal termination · Feb 11, 2019',
    body: 'Brain-weight reduction (3–8%) in postnatal-day-7 rats · mechanism-specific to early-postnatal laryngeal anatomy · exposure margin 1.8–7× human pediatric AUC at 10 mg.',
    outcome: '39 patients evaluable (planned: 66). Two deaths across trial + LTE — fatal pneumonia (low-dose) and acute decompensated cardiac failure (high-dose, LTE). Both PAH-disease-related. Neither attributed to ambrisentan.',
  },
  {
    n: '02',
    label: 'REGULATORY',
    headline: 'The pediatric PAH regulatory bar was elevated.',
    timestamps: '2014 STARTS-2 publication · review window 2017–2021 · resolved by AFFILIATE 2024',
    body: 'Sildenafil pediatric mortality association · HR 3.95 (since attributed to confounding per AFFILIATE 2024 — 80 mg non-inferior to 5 mg adult survival).',
    outcome: 'Field operating under maximum caution on pediatric dose selection during the review window.',
  },
  {
    n: '03',
    label: 'COMMERCIAL',
    headline: 'Split commercial rights constrained the submission geography.',
    timestamps: 'Day-One split — separate sponsors, separate filing decisions',
    body: 'GSK held EU/ROW (Volibris) · Gilead held US (Letairis) — different sponsors. Letairis went generic 2022.',
    outcome: 'EMA + PMDA filings proceeded. The US commercial decision was Gilead\'s.',
  },
];

function DisruptionCard({ d, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: '1px solid var(--cream-hairline)',
        borderLeft: '4px solid var(--case)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
        padding: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <span className="deck-mono" style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case)',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {d.n}
        </span>
        <span className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case)',
          fontWeight: 700,
        }}>
          · {d.label}
        </span>
      </div>
      <div className="deck-display" style={{
        fontSize: 'var(--fs-slide-name)',
        color: 'var(--cream)',
        fontWeight: 600,
        lineHeight: 1.22,
        letterSpacing: '-0.005em',
      }}>
        {d.headline}
      </div>
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: 'var(--case)',
        opacity: 0.85,
        letterSpacing: 'var(--ls-mono)',
        lineHeight: 1.45,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {d.timestamps}
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.84,
        lineHeight: 1.5,
      }}>
        {d.body}
      </div>
      <div aria-hidden style={{
        height: 'var(--stroke-hair)',
        width: 'clamp(40px, 6vw, 64px)',
        background: 'var(--case)',
        opacity: 0.5,
        marginTop: 'var(--space-1)',
      }} />
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--cream-faint)',
        fontWeight: 700,
      }}>
        Outcome
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.92,
        lineHeight: 1.5,
      }}>
        {d.outcome}
      </div>
    </motion.div>
  );
}

export default function Cs1Outcome() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* V2-S7 lung-anchor treatment · stress · background presence
          with tension. Sized larger than ambient (variant CSS opacity
          0.14 tissue / 0.55 detail / 0.38 stroke) — meant to feel
          like a strained organ behind the disruption cards. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '52%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(22rem, 36vw, 32rem)',
          opacity: 0.22,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lungs
          layoutId="cs1-lung"
          variant="stress"
        />
      </div>

      <Eyebrow delay={0.10}>
        Case 01 · The program under stress
      </Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        AMB112529 absorbed three simultaneous disruptions —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          and the framework had to hold.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        Any one of these would have killed a traditional efficacy trial. The
        framework absorbed all three.
      </Subhead>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
          gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          alignItems: 'stretch',
        }}>
          {DISRUPTIONS.map((d, i) => (
            <DisruptionCard key={d.n} d={d} delay={0.85 + i * 0.18} reduced={reduced} />
          ))}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.95}
        kicker="11 · CS1 · DISRUPTIONS"
        tagline="Any one would have killed a traditional efficacy trial. The framework absorbed all three."
        source="Source · Ivy DD et al. J Pediatr X 2020 · Okour M et al. J Clin Pharmacol 2023 · Hoeper M et al. Circulation 2024 (AFFILIATE)"
      />
    </SlideGrid>
  );
}
