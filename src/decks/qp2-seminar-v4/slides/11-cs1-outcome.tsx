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
 * The three disruptions card pattern mirrors the panel-card recipe in
 * merck-deck CLAUDE.md "Best-in-Class Slide Design" §1153.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const DISRUPTIONS = [
  {
    n: '01',
    label: 'TRIAL',
    headline: 'Enrollment stopped before a clean efficacy answer.',
    timestamps: <>Hold 2013–2017 · formal termination 2019 · <span style={{ color: 'var(--coral)', fontWeight: 600 }}>39 / 66</span> evaluable</>,
    body: <>A nonclinical signal paused enrollment; the pediatric dataset became confirmatory.</>,
    outcome: <>Dose rationale: <span style={{ color: 'var(--coral)', fontWeight: 600 }}>adult anchor + pediatric PK</span>.</>,
  },
  {
    n: '02',
    label: 'REGULATORY',
    headline: 'Pediatric dosing was under caution.',
    timestamps: <>Review window 2017–2021</>,
    body: <>Prior PAH experience made empirical dose escalation hard to defend.</>,
    outcome: <>Exposure matching was the <span style={{ color: 'var(--coral)', fontWeight: 600 }}>cleaner lane</span>.</>,
  },
  {
    n: '03',
    label: 'FILING',
    headline: 'Label outcomes followed filing geography.',
    timestamps: <>EMA + PMDA proceeded</>,
    body: <>Different submissions produced different labels.</>,
    outcome: <>Public outcome: <span style={{ color: 'var(--coral)', fontWeight: 600 }}>EMA + PMDA pediatric approvals</span>.</>,
  },
];

function DisruptionCard({ d, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduced ? {} : { y: -4, boxShadow: '0 12px 32px color-mix(in srgb, var(--coral) 12%, transparent)' }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: '1px solid color-mix(in srgb, var(--coral) 30%, transparent)',
        borderLeft: '4px solid var(--case)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--coral) 5%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
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
        color: 'color-mix(in srgb, var(--case) 85%, transparent)',
        letterSpacing: 'var(--ls-mono)',
        lineHeight: 1.45,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {d.timestamps}
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.9,
        lineHeight: 1.5,
      }}>
        {d.body}
      </div>
      <div aria-hidden style={{
        height: 'var(--stroke-hair)',
        width: 'clamp(40px, 6vw, 64px)',
        background: 'var(--case)',
        opacity: 0.5,
        marginTop: 'var(--space-2)',
        marginBottom: 'var(--space-1)',
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
        opacity: 0.96,
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
        AMB112529 survived three disruptions —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          the dose bridge still held.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        Trial interruption, regulatory caution, and filing geography all pointed
        away from a conventional pediatric efficacy trial.
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
        tagline="The slide is the constraint set; the next slide is the bridge."
        source="Source · Ivy DD et al. J Pediatr 2021 · Okour M et al. J Clin Pharmacol 2023 · Hoeper M et al. Circulation 2024 (AFFILIATE)"
      />
    </SlideGrid>
  );
}
