// @ts-nocheck
/**
 * TEMPLATE: Timeline (horizontal checkpoint markers)
 *
 * USE FOR: Regulatory milestones, study progression, approval history.
 * Examples: IND → Phase 1 → Phase 2 → NDA → Approval flow.
 *
 * Reference: CaseHeroDivider CaseLedger pattern (checkpoint dots on axis)
 *
 * HOW TO ADAPT:
 * 1. Change dataCase to coral/cyan/violet
 * 2. Update EVENTS array with your milestones
 * 3. Mark the final/verdict event with `isVerdict: true`
 * 4. Adjust the card content below the timeline as needed
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const EVENTS = [
  { label: 'IND Filed', value: 'Jan 2015', isVerdict: false },
  { label: 'Phase 1', value: '2015–2016', isVerdict: false },
  { label: 'Phase 2', value: '2017–2018', isVerdict: false },
  { label: 'NDA Submission', value: 'Q3 2019', isVerdict: false },
  { label: 'Approval', value: 'Jul 2020', isVerdict: true },
];

const DETAIL_CARDS = [
  {
    kicker: 'Key Decision Point',
    body: 'Model-based bridging replaced the confirmatory trial. The PopPK model predicted pediatric exposure within ±3% of adult target.',
  },
  {
    kicker: 'Regulatory Outcome',
    body: 'FDA granted approval based on extrapolation of efficacy. No separate pediatric efficacy trial was required.',
  },
];

const panelStyle = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-3) var(--space-4)',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-2)',
};

export default function TplTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · Timeline</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        From model build to regulatory approval in five years.
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            minWidth: 0,
            paddingTop: 'var(--space-3)',
          }}
        >
          {/* Timeline axis + events */}
          <motion.div
            style={{
              position: 'relative',
              paddingBottom: 'var(--space-2)',
            }}
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.5, ease: EASE }}
          >
            {/* Hairline axis */}
            <div
              style={{
                height: 1,
                background: 'var(--cream-hairline)',
                width: '100%',
                position: 'absolute',
                top: 5,
                left: 0,
              }}
            />

            {/* Event grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${EVENTS.length}, 1fr)`,
                gap: 'var(--space-2)',
                paddingTop: 'var(--space-5)',
              }}
            >
              {EVENTS.map((evt, i) => (
                <motion.div
                  key={evt.label}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: evt.isVerdict ? 'flex-end' : 'flex-start',
                    textAlign: evt.isVerdict ? 'right' : 'left',
                    gap: 'var(--space-1)',
                    minWidth: 0,
                  }}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: reduced ? 0 : 0.4,
                    delay: reduced ? 0 : 0.6 + i * 0.12,
                    ease: EASE,
                  }}
                >
                  {/* Checkpoint dot */}
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: 'calc(-1 * var(--space-5) + 1px)',
                      ...(evt.isVerdict ? { right: 0 } : { left: 0 }),
                      width: 10,
                      height: 10,
                      boxSizing: 'border-box',
                      border: '2px solid var(--case)',
                      background: evt.isVerdict ? 'var(--case)' : 'var(--bg)',
                    }}
                  />

                  {/* Label */}
                  <span
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-card-label)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: evt.isVerdict ? 'var(--case)' : 'var(--cream-faint)',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {evt.label}
                  </span>

                  {/* Value */}
                  <span
                    className="deck-display"
                    style={{
                      fontSize: 'var(--fs-card-title)',
                      lineHeight: 1.15,
                      color: evt.isVerdict ? 'var(--case)' : 'var(--cream)',
                      fontWeight: evt.isVerdict ? 700 : 500,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {evt.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Detail cards below timeline */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              alignContent: 'start',
            }}
          >
            {DETAIL_CARDS.map((card, i) => (
              <motion.div
                key={card.kicker}
                style={panelStyle}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced ? 0 : 1.2 + i * 0.18,
                  ease: EASE,
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-slide-eyebrow)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--case)',
                    fontWeight: 700,
                  }}
                >
                  {card.kicker}
                </div>
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream-muted)',
                    lineHeight: 1.55,
                  }}
                >
                  {card.body}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        kicker="01 · TIMELINE"
        tagline="Template — horizontal milestone timeline."
        source="Source · Replace with actual citation"
      />
    </SlideGrid>
  );
}
