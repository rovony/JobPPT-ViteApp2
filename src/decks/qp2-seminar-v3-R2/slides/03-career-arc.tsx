// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 03 · Career arc — "Three-card half-page" design.
 *
 * Redesigned 2026-04-26 per user direction: replace the SVG spine-and-
 * satellite network with 3 elegant half-page cards inspired by the
 * components-showcase html-to-image slide's card layout.
 *
 * Prior version (SVG network) backed up at:
 *   _backup/03-career-arc.pre-card-redesign-2026-04-26.tsx
 *
 * Card grouping rationale — 5 career hubs compressed to 3 narrative arcs:
 *   Card 1 · CLINICAL FOUNDATION — Jordan BDS + clinical license
 *   Card 2 · QUANTITATIVE FORMATION — Minnesota PhD + Merck QP2 intern
 *   Card 3 · INDUSTRY LEADERSHIP — GSK 7yr (Manager) + Servier (Director)
 *
 * Cards fill the Viz area and end at the footer line. Each card follows
 * the deck's HeroTile-pattern: left accent rail, subtle gradient bg,
 * hairline border, case-color tint. The third card is the "hero" (coral
 * accent, slightly brighter) to draw the eye to current role.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const CARDS = [
  {
    number: '01',
    kicker: 'CLINICAL FOUNDATION',
    title: 'Jordan',
    years: '2004 – 2010',
    color: 'var(--amber)',
    items: [
      'Doctor of Dental Surgery (BDS)',
      'Clinical license — bedside dosing decisions',
      'Patient-facing pharmacology instinct',
    ],
  },
  {
    number: '02',
    kicker: 'QUANTITATIVE FORMATION',
    title: 'Minnesota + Merck',
    years: '2012 – 2015',
    color: 'var(--amber)',
    items: [
      'PhD — Experimental & Clinical Pharmacology',
      'NLME · population modeling · EHC dissertation',
      'Merck QP2 intern — NLME simulation for trial design',
      '3 research awards · ECP Fellowship',
    ],
  },
  {
    number: '03',
    kicker: 'INDUSTRY LEADERSHIP',
    title: 'GSK → Servier',
    years: '2015 – present',
    color: 'var(--coral)',
    hero: true,
    items: [
      'GSK · 5 TAs · 4 approvals during tenure',
      'Ambrisentan pediatric — 5 agencies',
      'Servier · Director · Oncology solid + heme',
      '3 approvals · Ivosidenib India CDSCO',
      'PharmAgent — AI/ML workflow platform',
    ],
  },
];

export default function CareerArc() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const go = isInView && !prefersReduced;

  const fade = (delay) => ({
    initial: { opacity: 0, y: 12 },
    animate: go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.10}>
        The lens I bring to the cases
      </Eyebrow>

      <Headline delay={0.25} maxChars={34}>
        Five stops,{' '}
        <span style={{ color: 'var(--cream)', fontStyle: 'normal', fontWeight: 700 }}>
          one question.
        </span>
      </Headline>

      <Subhead delay={0.45} maxChars={100} size="lead">
        Clinic to leadership, through quantitative pharmacology.
      </Subhead>

      <Viz ref={ref}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
            gap: 'var(--space-5)',
            height: '100%',
            alignContent: 'stretch',
            alignItems: 'stretch',
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.number}
              {...fade(0.7 + i * 0.18)}
              style={{
                position: 'relative',
                border: `1.5px solid ${card.hero
                  ? 'color-mix(in srgb, var(--coral) 50%, transparent)'
                  : 'var(--cream-hairline)'}`,
                borderLeft: `4px solid ${card.color}`,
                borderRadius: 'var(--radius-lg)',
                background: card.hero
                  ? `linear-gradient(180deg,
                      color-mix(in srgb, var(--coral) 10%, transparent),
                      color-mix(in srgb, var(--panel) 75%, transparent) 60%)`
                  : 'color-mix(in srgb, var(--panel) 60%, transparent)',
                padding: 'clamp(var(--space-4), 3vh, var(--space-6)) var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                overflow: 'hidden',
                minHeight: 0,
                minWidth: 0,
              }}
            >
              {/* Number + kicker row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div
                  className="deck-display"
                  style={{
                    fontSize: 'var(--fs-slide-headline)',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: card.color,
                    opacity: 0.22,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {card.number}
                </div>
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-slide-eyebrow)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: card.color,
                  }}
                >
                  {card.kicker}
                </div>
              </div>

              {/* Title + years */}
              <div>
                <div
                  className="deck-display"
                  style={{
                    fontSize: 'var(--fs-slide-lead)',
                    fontWeight: 600,
                    color: card.hero ? 'var(--coral)' : 'var(--cream)',
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </div>
                <div
                  className="deck-mono"
                  style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    color: 'var(--cream-faint)',
                    letterSpacing: '0.06em',
                    marginTop: 'var(--space-1)',
                  }}
                >
                  {card.years}
                </div>
              </div>

              {/* Hairline separator */}
              <div
                aria-hidden
                style={{
                  width: 'clamp(48px, 40%, 80px)',
                  height: 'var(--stroke-hair)',
                  background: card.hero
                    ? 'color-mix(in srgb, var(--coral) 40%, transparent)'
                    : 'var(--cream-hairline)',
                }}
              />

              {/* Achievement items */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(6px, 1.2vh, 12px)',
                  flex: 1,
                  minHeight: 0,
                  justifyContent: 'flex-start',
                }}
              >
                {card.items.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -6 }}
                    animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.9 + i * 0.18 + j * 0.06 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-2)',
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        width: 6,
                        height: 1,
                        background: card.color,
                        opacity: card.hero ? 0.6 : 0.35,
                        marginTop: '0.65em',
                        flexShrink: 0,
                      }}
                    />
                    <div
                      className="deck-body"
                      style={{
                        fontSize: 'var(--fs-slide-subhead)',
                        color: card.hero ? 'var(--cream)' : 'var(--cream-muted)',
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Viz>

      <Footer
        delay={2.0}
        kicker="Four countries · three sponsors · one discipline"
        tagline={
          <>
            The question hasn&apos;t changed —{' '}
            <em style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
              what dose, for whom, why?
            </em>
          </>
        }
      />
    </SlideGrid>
  );
}
