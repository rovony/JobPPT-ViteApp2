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

/* Copy trimmed 2026-05-06 — each card now lets one field own one job:
 *   eyebrow + timestamps → data
 *   headline             → the assertion
 *   body                 → unique context (not a restatement of headline)
 *   outcome              → payoff
 * Prior versions had headline + body restating the same beat twice. */
const DISRUPTIONS = [
  {
    n: '01',
    label: 'TRIAL',
    headline: 'Enrollment stopped before efficacy could close.',
    timestamps: <>Hold 2013–2017 · termination 2019 · <span style={{ color: 'var(--coral)', fontWeight: 600 }}>39 / 66</span> evaluable</>,
    body: <>Pediatric dataset became confirmatory.</>,
    outcome: <>Dose rationale: <span style={{ color: 'var(--coral)', fontWeight: 600 }}>adult anchor + pediatric PK</span>.</>,
  },
  {
    n: '02',
    label: 'REGULATORY',
    headline: 'Pediatric dosing was under caution.',
    timestamps: <>Review 2017–2021</>,
    body: <>Empirical escalation was hard to defend.</>,
    outcome: <>Exposure matching was the <span style={{ color: 'var(--coral)', fontWeight: 600 }}>cleaner lane</span>.</>,
  },
  {
    n: '03',
    label: 'FILING',
    headline: 'Label outcomes followed filing geography.',
    timestamps: <>EMA + PMDA proceeded</>,
    body: <>Submissions diverged; labels diverged.</>,
    outcome: <>Public outcome: <span style={{ color: 'var(--coral)', fontWeight: 600 }}>EMA + PMDA pediatric approvals</span>.</>,
  },
];

function DisruptionCard({ d, delay, reduced, step }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduced ? {} : { y: -4, boxShadow: '0 12px 32px color-mix(in srgb, var(--coral) 12%, transparent)' }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        marginTop: step,
        border: '1px solid color-mix(in srgb, var(--coral) 30%, transparent)',
        borderLeft: '4px solid var(--case)',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--coral) 10%, var(--panel)), color-mix(in srgb, var(--panel) 78%, transparent))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: 'clamp(var(--space-4), 1.8vw, var(--space-5))',
        display: 'grid',
        gridTemplateRows: 'auto auto auto minmax(0, 1fr) auto',
        gap: 'clamp(var(--space-2), 1.1vw, var(--space-3))',
        minHeight: 'clamp(13.5rem, 28vh, 17.5rem)',
        boxShadow: 'inset 0 1px 0 color-mix(in srgb, var(--cream) 8%, transparent)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <span className="deck-mono" style={{
          display: 'inline-grid',
          placeItems: 'center',
          width: 'clamp(2.15rem, 3vw, 2.8rem)',
          aspectRatio: '1',
          border: '1px solid color-mix(in srgb, var(--case) 42%, transparent)',
          borderRadius: '999px',
          background: 'color-mix(in srgb, var(--case) 10%, transparent)',
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case)',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {d.n}
        </span>
        <span className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case)',
          fontWeight: 800,
        }}>
          {d.label}
        </span>
      </div>
      <div className="deck-display" style={{
        fontSize: 'var(--fs-slide-name)',
        color: 'var(--cream)',
        fontWeight: 700,
        lineHeight: 1.12,
        letterSpacing: 'var(--ls-display)',
      }}>
        {d.headline}
      </div>
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        color: 'color-mix(in srgb, var(--case) 88%, transparent)',
        letterSpacing: '0.08em',
        lineHeight: 1.35,
        fontVariantNumeric: 'tabular-nums',
        textTransform: 'uppercase',
      }}>
        {d.timestamps}
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.9,
        lineHeight: 1.38,
        alignSelf: 'start',
      }}>
        {d.body}
      </div>
      <div style={{
        borderTop: '1px solid color-mix(in srgb, var(--case) 24%, transparent)',
        background: 'color-mix(in srgb, var(--case) 9%, transparent)',
        borderRadius: 'var(--radius-md)',
        padding: 'clamp(var(--space-2), 1vw, var(--space-3))',
      }}>
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 800,
          marginBottom: 'var(--space-1)',
        }}>
          So what
        </div>
        <div className="deck-body" style={{
          fontSize: 'var(--fs-slide-subhead)',
          color: 'var(--cream)',
          opacity: 0.98,
          lineHeight: 1.35,
        }}>
          {d.outcome}
        </div>
      </div>
    </motion.div>
  );
}

export default function Cs1Outcome() {
  const reduced = useReducedMotion();
  const steps = ['0rem', 'clamp(2rem, 6vh, 4rem)', 'clamp(4rem, 12vh, 7rem)'];
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
          gap: 'clamp(var(--space-4), 2.4vw, var(--space-6))',
          paddingTop: 'clamp(var(--space-2), 1.2vh, var(--space-3))',
          paddingBottom: 'clamp(var(--space-6), 10vh, var(--space-12, 6rem))',
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}>
          {DISRUPTIONS.map((d, i) => (
            <DisruptionCard key={d.n} d={d} delay={0.85 + i * 0.18} reduced={reduced} step={steps[i]} />
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
