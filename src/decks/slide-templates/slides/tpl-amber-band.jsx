/**
 * TEMPLATE: Amber Band (card grid + full-width conclusion band)
 *
 * USE FOR: Slides where the bottom conclusion is the slide's thesis restatement.
 * The amber band is a full-width callout with center-aligned text, distinct
 * from the "accent callout card" (which has a left rail and left-aligned text).
 *
 * Reference: v3-R2/cs2-02-background-disease.jsx (amber band pattern)
 *
 * HOW TO ADAPT:
 * 1. Change dataCase to coral/cyan/violet
 * 2. Update ITEMS array with your card content
 * 3. Update AMBER_TEXT with your conclusion statement
 * 4. The amber band uses amber tokens regardless of dataCase
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const ITEMS = [
  {
    kicker: 'Pillar A',
    body: 'First key finding or pillar of the argument.',
    accent: true,
  },
  {
    kicker: 'Pillar B',
    body: 'Second key finding. Include verbatim numbers where applicable.',
    accent: false,
  },
  {
    kicker: 'Pillar C',
    body: 'Third key finding that completes the triad.',
    accent: false,
  },
];

const AMBER_TEXT = 'The conclusion statement that ties everything together — center-aligned, amber-tinted, full width.';

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

export default function TplAmberBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Evidence</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        The assertion that needs an amber-band conclusion.
      </Headline>

      <Subhead delay={0.40}>
        Three pillars of evidence, then the verdict.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            height: '100%',
            minWidth: 0,
            paddingTop: 'var(--space-2)',
          }}
        >
          {/* Card row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              alignContent: 'start',
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

          {/* Amber band — full-width conclusion */}
          <motion.div
            style={{
              marginTop: 'auto',
              flex: '0 0 auto',
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--amber) 12%, transparent)',
              border: '1px solid color-mix(in srgb, var(--amber) 40%, transparent)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 0.6 + ITEMS.length * 0.15 + 0.2,
              ease: EASE,
            }}
          >
            <span
              className="deck-display"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                color: 'var(--amber)',
                fontWeight: 600,
                fontStyle: 'italic',
              }}
            >
              {AMBER_TEXT}
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="02 · AMBER BAND"
        tagline="Template — amber conclusion band."
        source="Source · Replace with actual citation"
      />
    </SlideGrid>
  );
}
