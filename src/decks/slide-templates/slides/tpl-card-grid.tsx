// @ts-nocheck
/**
 * TEMPLATE: Card Grid (auto-reflow)
 *
 * USE FOR: 3–6 items with kicker label + body text + optional hero number.
 * Examples: pillars, frameworks, drug properties, agency comparisons.
 *
 * HOW TO ADAPT:
 * 1. Change dataCase to coral/cyan/violet
 * 2. Update ITEMS array with your content
 * 3. Adjust maxChars on Headline if your title is long
 * 4. Add/remove items — the grid auto-reflows
 * 5. For items with hero numbers, set the `hero` field
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const ITEMS = [
  {
    kicker: 'Item One · Context',
    hero: '380',
    heroUnit: 'participants',
    body: 'Description of the first item. Include key details, numbers stay verbatim.',
    accent: true,
  },
  {
    kicker: 'Item Two · Context',
    hero: null,
    body: 'Description of the second item. No hero number — body text fills the space.',
    accent: false,
  },
  {
    kicker: 'Item Three · Context',
    hero: '95%',
    heroUnit: 'confidence',
    body: 'Description of the third item with a hero stat.',
    accent: false,
  },
  {
    kicker: 'Item Four · Context',
    hero: null,
    body: 'Description of the fourth item. The grid will auto-reflow to 2 columns on narrow viewports.',
    accent: false,
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

export default function TplCardGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · Section Label</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        The assertion title goes here{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — with accent emphasis.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        One-line subtitle that sets up the content below.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
            gap: 'var(--space-3)',
            minWidth: 0,
            alignContent: 'start',
            paddingTop: 'var(--space-2)',
          }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.kicker}
              style={{
                ...panelStyle,
                ...(item.accent ? { borderLeft: '4px solid var(--case)' } : {}),
              }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: reduced ? 0 : 0.5,
                delay: reduced ? 0 : 0.6 + i * 0.15,
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
                {item.kicker}
              </div>

              {item.hero && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                  <span
                    className="deck-display"
                    style={{
                      fontSize: 'var(--fs-card-numeral)',
                      lineHeight: 1,
                      color: 'var(--case)',
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {item.hero}
                  </span>
                  {item.heroUnit && (
                    <span
                      className="deck-body"
                      style={{
                        fontSize: 'var(--fs-slide-subhead)',
                        color: 'var(--cream-muted)',
                      }}
                    >
                      {item.heroUnit}
                    </span>
                  )}
                </div>
              )}

              <div
                className="deck-body"
                style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream-muted)',
                  lineHeight: 1.55,
                }}
              >
                {item.body}
              </div>
            </motion.div>
          ))}
        </div>
      </Viz>

      <Footer
        kicker="01 · CARD GRID"
        tagline="Template pattern — adapt to your content."
        source="Source · Replace with actual citation"
      />
    </SlideGrid>
  );
}
