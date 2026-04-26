/**
 * TEMPLATE: Flow Diagram (node → arrow → node chain)
 *
 * USE FOR: Architecture, pipeline, reasoning chain, decision flow.
 * Examples: PopPK framework, regulatory pathway, study design flow.
 *
 * HOW TO ADAPT:
 * 1. Change dataCase to coral/cyan/violet
 * 2. Update NODES array with your content (id, kicker, hero, lines)
 * 3. Mark endpoint nodes with `isHero: true` for accent styling
 * 4. Adjust gap and direction if needed (vertical vs horizontal)
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const NODES = [
  {
    id: '01',
    kicker: 'Input Data',
    hero: '380',
    heroUnit: 'participants',
    lines: ['6 studies pooled', '3,126 observations'],
    isHero: true,
  },
  {
    id: '02',
    kicker: 'Model Build',
    hero: '2-cmt',
    heroUnit: 'oral',
    lines: ['1st-order absorption', 'Allometric scaling fixed'],
    isHero: false,
  },
  {
    id: '03',
    kicker: 'Simulation',
    hero: 'AUC',
    heroUnit: 'by weight',
    lines: ['Predicted pediatric exposure', 'Target: adult range'],
    isHero: false,
  },
  {
    id: '04',
    kicker: 'Confirmation',
    hero: '39',
    heroUnit: 'patients',
    lines: ['Sparse PK collected', 'Observed vs predicted'],
    isHero: false,
  },
  {
    id: '05',
    kicker: 'Outcome',
    hero: '−3%',
    heroUnit: 'delta',
    lines: ['vs adult target', 'Match confirmed'],
    isHero: true,
  },
];

const nodeStyle = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-3)',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-2)',
};

function FlowArrow({ reduced, delay }) {
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        alignSelf: 'center',
        width: 'var(--space-5)',
      }}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : delay, ease: EASE }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="var(--cream-faint)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default function TplFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · Architecture</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        The reasoning chain from input to outcome.
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minWidth: 0,
            paddingTop: 'var(--space-2)',
          }}
        >
          {NODES.map((node, i) => (
            <div key={node.id} style={{ display: 'contents' }}>
              <motion.div
                style={{
                  ...nodeStyle,
                  flex: '1 1 min(14rem, 100%)',
                  maxWidth: 'min(18rem, 100%)',
                  ...(node.isHero
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
                  delay: reduced ? 0 : 0.5 + i * 0.2,
                  ease: EASE,
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-card-label)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: node.isHero ? 'var(--case)' : 'var(--cream-faint)',
                    fontWeight: 700,
                  }}
                >
                  {node.id} · {node.kicker}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                  <span
                    className="deck-display"
                    style={{
                      fontSize: 'var(--fs-card-title)',
                      lineHeight: 1.1,
                      color: node.isHero ? 'var(--case)' : 'var(--cream)',
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {node.hero}
                  </span>
                  <span
                    className="deck-body"
                    style={{ fontSize: 'var(--fs-card-label)', color: 'var(--cream-muted)' }}
                  >
                    {node.heroUnit}
                  </span>
                </div>

                {node.lines.map((line) => (
                  <div
                    key={line}
                    className="deck-body"
                    style={{
                      fontSize: 'var(--fs-card-body)',
                      color: 'var(--cream-muted)',
                      lineHeight: 1.45,
                    }}
                  >
                    {line}
                  </div>
                ))}
              </motion.div>

              {i < NODES.length - 1 && (
                <FlowArrow reduced={reduced} delay={0.6 + i * 0.2} />
              )}
            </div>
          ))}
        </div>
      </Viz>

      <Footer
        kicker="01 · FLOW DIAGRAM"
        tagline="Template pattern — adapt nodes to your pipeline."
        source="Source · Replace with actual citation"
      />
    </SlideGrid>
  );
}
