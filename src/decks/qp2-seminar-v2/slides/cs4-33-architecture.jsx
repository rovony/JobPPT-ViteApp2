import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import ArchitectureSvg from './cs4-shared/architecture.svg?react';

/**
 * CS4 · S33 ARCHITECTURE — three-level hierarchy, centralized topology.
 *
 * Layout: ~60/40 split — diagram (imported SVG) on left, three
 * justification chips (Why centralized · Why three levels · Why
 * heterogeneous-centralized) on right. Bottom assertion ribbon.
 *
 * The SVG is pre-built (Gamma source), re-colored to deck tokens via
 * sed sweep (#FFE14D → var(--sage), etc.) so it inherits the slide's
 * color discipline without manual JSX construction of the diagram.
 *
 * Per Kim et al. 2025 metrics: independent multi-agent systems amplify
 * errors 17.2× vs centralized's 4.4×. Topology choice = empirical, not
 * aesthetic.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const CHIPS = [
  {
    label: 'Why centralized',
    body:
      'Independent multi-agent: 17.2× error amplification. Centralized: 4.4× — Kim et al. 2025 (180 controlled experiments).',
  },
  {
    label: 'Why three levels',
    body:
      'L0 + L1 alone is the obvious start. Adding L2 specialists (PopPK, PKPD, E–R) materially improves output quality at deep modeling tasks.',
  },
  {
    label: 'Why heterogeneous-centralized',
    body:
      'Anthropic models perform best with small orchestrator + strong workers. Sonnet routes; Opus reasons. Matches the empirically optimal vendor profile.',
  },
];

export default function Slide33Cs4Architecture() {
  return (
    <SlideFrame
      dataCase="sage"
      eyebrowColor="var(--sage)"
      eyebrow="CS4 · The architecture — centralized · Kim et al. 2025"
      headline={
        <>
          A three-level hierarchy with centralized topology —{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 700 }}>
            chosen to satisfy the published scaling laws.
          </span>
        </>
      }
      headlineMaxChars={140}
      subhead="1 supervisor · 10 domain agents · 3 modeling specialists · 1 typed shared bus (PharmState · 34 fields · per-agent write access)."
      subheadMaxChars={140}
      footerKicker="Case 04 · Architecture"
      footerSource="Source · Kim et al., Towards a Science of Scaling Agent Systems, arXiv:2512.08296 (Dec 2025)"
    >
      <ArchitectureLayout />
    </SlideFrame>
  );
}

function ArchitectureLayout() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : undefined;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-4)',
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)',
          columnGap: 'var(--space-5)',
          minHeight: 0,
        }}
      >
        {/* LEFT — diagram */}
        <motion.div
          initial={initial ?? { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          style={{
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-3)',
          }}
        >
          <ArchitectureSvg
            style={{ width: '100%', height: '100%', maxHeight: 540 }}
            preserveAspectRatio="xMidYMid meet"
            aria-label="PharmAgent architecture · three-level hierarchy with PharmState typed shared bus"
          />
        </motion.div>

        {/* RIGHT — three justification chips */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            minHeight: 0,
          }}
        >
          {CHIPS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={initial ?? { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.65 + i * 0.15 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                padding: 'var(--space-3) var(--space-4)',
                borderLeft: '3px solid var(--sage)',
                background: 'rgba(107, 142, 115, 0.05)',
              }}
            >
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--sage)',
                  fontWeight: 800,
                }}
              >
                {c.label}
              </span>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-card-body)',
                  color: 'var(--cream)',
                  lineHeight: 1.4,
                }}
              >
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom assertion */}
      <motion.div
        initial={initial ?? { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 1.3 }}
        style={{
          paddingTop: 'var(--space-3)',
          borderTop: '2px solid var(--sage)',
        }}
      >
        <p
          className="deck-display"
          style={{
            margin: 0,
            fontSize: 'var(--fs-card-quote)',
            fontWeight: 600,
            color: 'var(--cream)',
            lineHeight: 1.3,
            textAlign: 'center',
          }}
        >
          Topology choice is not aesthetic.{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 700 }}>
            Wrong topology is the difference between a working scientific tool and 17× error amplification.
          </span>
        </p>
      </motion.div>
    </div>
  );
}
