// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 15 (slot) — V2-S11 · Three takeaways + bridge to CS2.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2B-Slides-CS1-Slides07-11-v2.md.
 * V2 spec consolidates "what this case teaches" (was slide 14) + the
 * CS2 bridge (was slide 15) into a single closing slot. The previous
 * three-lessons content has been retained but reframed per V2 takeaway
 * structure (methodology · architecture · robustness).
 *
 * v2-final amendment in takeaway 02: dual-architecture call-out
 * (FUTURE-1 EMA vs Garnett-Florian FDA) — surfacing both branches in
 * the closing summary signals regulatory literacy.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const TAKEAWAYS = [
  {
    n: '01',
    label: 'METHODOLOGY',
    headline: 'Exposure matching is the methodology.',
    body: <>Where similarity is high, PK matching alone supports the dose. ICH E11A (Dec 2024) codified this as the extrapolation continuum &mdash; <strong>the framework prefigured the standard by four years.</strong></>,
  },
  {
    n: '02',
    label: 'ARCHITECTURE',
    headline: 'Inheritance is the framework\'s strength.',
    body: <>Structural model from the adult anchor; pediatric data confirms adequacy. <strong>39 patients cannot build a model — 39 patients can confirm one.</strong> EMA accepts PK-matching alone; FDA pairs it with a PVR-6MWD bridge (Garnett-Florian).</>,
  },
  {
    n: '03',
    label: 'DELIVERABLE',
    headline: 'Weight-banded dosing — not just a model.',
    body: <>The framework\'s output was a <strong>label</strong>, not a paper: 8–17 years, three weight bands, two dose levels (2.5–10 mg QD). EMA + PMDA accepted; the model became evidence.</>,
  },
];

function TakeawayCard({ t, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
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
        height: '100%',
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-kicker)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--case)',
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {t.n} · {t.label}
      </div>
      <div className="deck-display" style={{
        fontSize: 'var(--fs-card-quote)',
        color: 'var(--cream)',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.005em',
      }}>
        {t.headline}
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.86,
        lineHeight: 1.5,
        marginTop: 'var(--space-1)',
      }}>
        {t.body}
      </div>
    </motion.div>
  );
}

export default function Cs1Bridge() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* V2-S11 lung-anchor treatment · exit · opening size, parked
          to the right, ready to leave. The CS1 visual subject takes
          its bow on the right side — closing the coral chapter as
          the bridge ribbon hands off to CS2 (cyan/oncology). The
          shared layoutId chain ends here for CS1. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 'clamp(var(--space-4), 5vw, var(--space-7))',
          top: '52%',
          transform: 'translateY(-50%)',
          width: 'clamp(220px, 22vw, 380px)',
          opacity: 0.28,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lungs
          layoutId="cs1-lung"
          variant="exit"
        />
      </div>

      <Eyebrow delay={0.10}>
        Case 01 · What the case teaches
      </Eyebrow>

      <Headline delay={0.25} maxChars={68}>
        When the trial cannot deliver the dose,{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          the model delivers the label.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        Three takeaways that travel beyond ambrisentan and beyond pediatric PAH.
      </Subhead>

      <Viz>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-3), 2.5vh, var(--space-5))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          height: '100%',
        }}>
          {/* Three takeaway cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(17rem, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
            alignItems: 'stretch',
          }}>
            {TAKEAWAYS.map((t, i) => (
              <TakeawayCard key={t.n} t={t} delay={0.85 + i * 0.15} reduced={reduced} />
            ))}
          </div>

          {/* Bridge ribbon to CS2 — amber rotate-45 + pointer */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 1.55, ease: EASE }}
            style={{
              alignSelf: 'center',
              maxWidth: 'clamp(28rem, 80vw, 64rem)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <motion.div
              aria-hidden
              style={{
                flexShrink: 0,
                transform: 'rotate(45deg)',
                width: 'clamp(0.875rem, 1.4vw, 1.25rem)',
                height: 'clamp(0.875rem, 1.4vw, 1.25rem)',
                background: 'var(--amber)',
              }}
              initial={reduced ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1.75, ease: [0.34, 1.56, 0.64, 1] }}
            />
            <div className="deck-display italic" style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.92,
              lineHeight: 1.5,
              fontWeight: 500,
              flex: 1,
            }}>
              From a <strong style={{ color: 'var(--case)', fontStyle: 'normal' }}>rare pediatric pulmonary disease</strong> to a{' '}
              <motion.span
                initial={reduced ? false : { color: 'var(--cream)' }}
                animate={{ color: 'var(--cyan)' }}
                transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 2.55 }}
                style={{ fontWeight: 600, fontStyle: 'normal' }}
              >
                regulatory bridging waiver in oncology
              </motion.span>{' '}— the next case takes the same intellectual move into a different therapeutic area.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.20}
        kicker="15 · CS1 CLOSES · CS2 OPENS"
        tagline="The framework absorbed all three. Case 02 — the regulatory bridge."
      />
    </SlideGrid>
  );
}
