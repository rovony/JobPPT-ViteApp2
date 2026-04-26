// @ts-nocheck
/**
 * TEMPLATE: Stacked List (vertical numbered cards)
 *
 * USE FOR: Reasons, evidence items, Q&A defense points, requirements.
 * Examples: 5 reasons 6MWD fails, 4 regulatory gaps, 3 DDI considerations.
 *
 * HOW TO ADAPT:
 * 1. Change dataCase to coral/cyan/violet
 * 2. Update ITEMS array with your content
 * 3. Items with `accent: true` get the case-color accent rail
 * 4. Optional: add a bottom callout by setting CALLOUT_TEXT
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const ITEMS = [
  { num: '01', title: 'First reason or point', body: 'Supporting detail with verbatim numbers — 380 participants across 6 studies.', accent: false },
  { num: '02', title: 'Second reason or point', body: 'Additional supporting detail. Include study IDs and dates exactly as sourced.', accent: false },
  { num: '03', title: 'Third reason or point', body: 'The most important point. This one gets the accent rail to draw attention.', accent: true },
  { num: '04', title: 'Fourth reason or point', body: 'Closing detail that rounds out the argument.', accent: false },
];

const CALLOUT_TEXT = 'The summary statement that ties all items together — this is the slide\'s thesis, restated.';

const panelStyle = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-3) var(--space-4)',
  minWidth: 0,
  position: 'relative',
};

export default function TplStackedList() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · Evidence</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        The assertion title that these items support.
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            minWidth: 0,
            height: '100%',
            paddingTop: 'var(--space-2)',
          }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.num}
              style={{
                ...panelStyle,
                ...(item.accent ? { borderLeft: '4px solid var(--case)' } : {}),
              }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: reduced ? 0 : 0.45,
                delay: reduced ? 0 : 0.5 + i * 0.12,
                ease: EASE,
              }}
            >
              {!item.accent && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: 'var(--case)',
                    borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
                    opacity: 0.3,
                  }}
                />
              )}

              <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'baseline' }}>
                <span
                  className="deck-mono"
                  style={{
                    fontSize: 'var(--fs-card-numeral)',
                    color: item.accent ? 'var(--case)' : 'var(--cream-faint)',
                    fontWeight: 700,
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item.num}
                </span>

                <div style={{ minWidth: 0 }}>
                  <div
                    className="deck-display"
                    style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream)',
                      fontWeight: 600,
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="deck-body"
                    style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream-muted)',
                      lineHeight: 1.45,
                    }}
                  >
                    {item.body}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {CALLOUT_TEXT && (
            <motion.div
              style={{
                padding: 'var(--space-3) var(--space-5)',
                background: 'color-mix(in srgb, var(--case) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--case) 35%, transparent)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                marginTop: 'auto',
                flex: '0 0 auto',
              }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: reduced ? 0 : 0.5,
                delay: reduced ? 0 : 0.5 + ITEMS.length * 0.12 + 0.2,
                ease: EASE,
              }}
            >
              <span
                className="deck-display"
                style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  color: 'var(--case)',
                  fontWeight: 600,
                  fontStyle: 'italic',
                }}
              >
                {CALLOUT_TEXT}
              </span>
            </motion.div>
          )}
        </div>
      </Viz>

      <Footer
        kicker="01 · STACKED LIST"
        source="Source · Replace with actual citation"
      />
    </SlideGrid>
  );
}
