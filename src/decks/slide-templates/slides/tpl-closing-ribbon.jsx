/**
 * TEMPLATE: Closing Ribbon (verdict/summary with animated diamond)
 *
 * USE FOR: Final slide of a case study section, verdict statement,
 * "the takeaway" closure. The ribbon uses POP-animated diamond and
 * delayed color-shift for theatrical impact.
 *
 * Reference: v2/08b-case-trial-design.jsx (closing ribbon pattern)
 *
 * HOW TO ADAPT:
 * 1. Change dataCase to coral/cyan/violet
 * 2. Update VERDICT and SUBTEXT with your conclusion
 * 3. Update SUMMARY_CARDS with supporting points
 * 4. The ribbon always uses the case color with POP animation
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];
const POP = [0.34, 1.56, 0.64, 1];

const VERDICT = 'Exposure match confirmed';
const SUBTEXT = 'The model-based dose bridges adult efficacy to the pediatric population within ±3% of target AUCss.';

const SUMMARY_CARDS = [
  {
    kicker: 'Evidence Pillar 1',
    value: '−3%',
    detail: 'Low dose AUC vs adult reference (2.5 mg ≤35 kg)',
    primary: true,
  },
  {
    kicker: 'Evidence Pillar 2',
    value: '+0.3%',
    detail: 'High dose AUC vs adult reference (5 mg >35 kg)',
    primary: true,
  },
  {
    kicker: 'Evidence Pillar 3',
    value: '39',
    detail: 'Pediatric patients confirmed the model prediction',
    primary: false,
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
  textAlign: 'center',
  alignItems: 'center',
};

export default function TplClosingRibbon() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · Verdict</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        The verdict that closes the case.
      </Headline>

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
          {/* Summary cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(14rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              alignContent: 'start',
            }}
          >
            {SUMMARY_CARDS.map((card, i) => (
              <motion.div
                key={card.kicker}
                style={{
                  ...panelStyle,
                  ...(card.primary
                    ? {
                        borderLeft: '4px solid var(--case)',
                        background: 'color-mix(in srgb, var(--case) 8%, var(--bg))',
                      }
                    : {}),
                }}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced ? 0 : 0.6 + i * 0.18,
                  ease: EASE,
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-card-label)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: card.primary ? 'var(--case)' : 'var(--cream-faint)',
                    fontWeight: 700,
                  }}
                >
                  {card.kicker}
                </div>
                <div
                  className="deck-display"
                  style={{
                    fontSize: card.primary ? 'var(--fs-card-hero-num)' : 'var(--fs-card-numeral)',
                    lineHeight: 1,
                    color: card.primary ? 'var(--case)' : 'var(--cream)',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {card.value}
                </div>
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-card-body)',
                    color: 'var(--cream-muted)',
                    lineHeight: 1.45,
                  }}
                >
                  {card.detail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing ribbon — diamond + verdict + italic bridge */}
          <motion.div
            style={{
              marginTop: 'auto',
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--case) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--case) 35%, transparent)',
              borderRadius: 'var(--radius-lg)',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 1.5,
              ease: EASE,
            }}
          >
            {/* Animated diamond */}
            <motion.div
              style={{
                width: 10,
                height: 10,
                background: 'var(--case)',
                transform: 'rotate(45deg)',
              }}
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : undefined}
              transition={{
                duration: reduced ? 0 : 0.35,
                delay: reduced ? 0 : 1.6,
                ease: POP,
              }}
            />

            {/* Verdict text */}
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
                fontWeight: 700,
              }}
              initial={reduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : 1.7,
                ease: EASE,
              }}
            >
              {VERDICT}
            </motion.div>

            {/* Bridge text with delayed color-shift */}
            <motion.div
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                textAlign: 'center',
                maxWidth: '52ch',
                lineHeight: 1.4,
                fontWeight: 400,
              }}
              initial={reduced ? false : { opacity: 0, color: 'var(--cream-muted)' }}
              animate={
                inView
                  ? { opacity: 1, color: 'var(--case)' }
                  : undefined
              }
              transition={{
                opacity: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.8, ease: EASE },
                color: { duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 2.2, ease: EASE },
              }}
            >
              {SUBTEXT}
            </motion.div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="01 · CLOSING RIBBON"
        source="Source · Replace with actual citation"
      />
    </SlideGrid>
  );
}
