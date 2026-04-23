import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideFrame from '@/components/deck/SlideFrame';
import HighlightWord from '@/components/deck/patterns/HighlightWord';

/**
 * Slide 11b · CS1 Strategy — Three design decisions.
 * Migrated to SlideFrame. Three-column layout lives inside the viz cell.
 */
const DECISIONS = [
  {
    num: '01',
    label: 'Integrate',
    action: 'Adult + pediatric — together.',
    rationale: (
      <>
        Build <span style={{ color: 'var(--coral)', fontWeight: 600 }}>on</span> the adult evidence base — don't rebuild it. Adult data provides the statistical anchor; pediatric data refines the covariate effects.
      </>
    ),
    preanswer: '"Why not pediatric-only?" — 39 patients with sparse sampling would give unstable estimates.',
  },
  {
    num: '02',
    label: 'Constrain',
    action: 'Fix allometric exponents.',
    rationale: (
      <>
        CL on weight<sup>0.75</sup>, volumes on weight<sup>1.0</sup>, 70-kg reference{' '}
        (<span style={{ color: 'var(--coral)', fontWeight: 600 }}>Anderson &amp; Holford 2008</span>). Biology-driven, not data-driven.
      </>
    ),
    preanswer: '"Why fix allometry?" — estimating exponents from sparse pediatric data adds noise, not signal.',
  },
  {
    num: '03',
    label: 'Stay parsimonious',
    action: 'Body weight — only.',
    rationale: (
      <>
        <span style={{ color: 'var(--coral)', fontWeight: 600 }}>12 covariates tested</span> via full-covariate model (bilirubin, ALT, AST, ALP, GGT, CrCl, age, sex, race, ethnicity, dose group, dose on t<sub>lag</sub>). None retained at p &lt; 0.001.
      </>
    ),
    preanswer: '"What about other covariates?" — tested, none reached statistical or mechanistic significance.',
  },
];

export default function Slide11bCaseStrategy() {
  const T = useTokens(['--coral', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);
  const ease = [0.2, 0.7, 0.3, 1];

  const D = { col: [0.70, 1.10, 1.50], ribbon: 3.20 };

  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="Strategy — Three design decisions"
      headline={
        <>
          Three design decisions.{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            Each one a regulatory defense.
          </span>
        </>
      }
      headlineMaxChars={30}
      subhead={
        <>
          Before any code ran,{' '}
          <HighlightWord color="var(--coral)" delay={1.2}>the architecture had to survive review</HighlightWord>{' '}
          on its own terms.
        </>
      }
      subheadMaxChars={65}
      footerKicker="Case 01 · Strategy"
      footerTagline="Source · Okour et al. JCP 2023 · Anderson &amp; Holford 2008"
    >
      {/* Three columns + closing ribbon inside the viz cell */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          rowGap: 'var(--space-6)',
        }}
      >
        {/* 3 decision columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: 'var(--space-8)',
            alignItems: 'start',
            position: 'relative',
          }}
        >
          {/* Defense brackets — drawn via SVG in a coordinate space that matches the 3-col grid */}
          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%' }}
            aria-hidden
          >
            {[0, 100, 200].map((x, i) => (
              <g key={i}>
                <Bracket
                  d={`M ${x + 4},4 L ${x + 1},4 L ${x + 1},96 L ${x + 4},96`}
                  color={tk('--coral')}
                  delay={D.col[i] - 0.15}
                />
                <Bracket
                  d={`M ${x + 96},4 L ${x + 99},4 L ${x + 99},96 L ${x + 96},96`}
                  color={tk('--coral')}
                  delay={D.col[i] - 0.15}
                />
              </g>
            ))}
          </svg>

          {DECISIONS.map((d, i) => (
            <DecisionColumn key={d.num} decision={d} delay={D.col[i]} />
          ))}
        </div>

        {/* Closing ribbon */}
        <motion.div
          style={{ maxWidth: '60ch' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: D.ribbon }}
        >
          <div
            className="h-px mb-3"
            style={{ width: 120, background: 'var(--coral)', opacity: 0.7 }}
          />
          <div
            className="deck-display italic"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              lineHeight: 'var(--lh-snug)',
              color: 'var(--cream)',
              fontWeight: 500,
            }}
          >
            Each choice is a{' '}
            <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 700 }}>
              regulatory defense
            </span>{' '}
            before it's a statistical one.
          </div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}

/* ======================================================== */
function Bracket({ d, color, delay }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={0.4}
      opacity={0.38}
      pathLength={1}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.6, ease: [0.2, 0.7, 0.3, 1], delay }}
    />
  );
}

function DecisionColumn({ decision, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <div style={{ padding: 'var(--space-4) var(--space-5)', minWidth: 0 }}>
      <motion.div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--coral)',
          marginBottom: 'var(--space-3)',
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay }}
      >
        Decision {decision.num} · {decision.label}
      </motion.div>

      <motion.div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.4rem, min(2.2vw, 3.6vh), 2.4rem)',
          lineHeight: 'var(--lh-tight)',
          letterSpacing: 'var(--ls-display)',
          color: 'var(--cream)',
          fontWeight: 700,
          marginBottom: 'var(--space-4)',
        }}
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: delay + 0.15 }}
      >
        {decision.action}
      </motion.div>

      <motion.div
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          lineHeight: 'var(--lh-base)',
          color: 'var(--cream)',
          marginBottom: 'var(--space-4)',
          textTransform: 'none',
          letterSpacing: 0,
          fontFamily: 'var(--font-body)',
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 0.3 }}
      >
        {decision.rationale}
      </motion.div>

      <motion.div
        className="deck-display italic"
        style={{
          paddingLeft: 'var(--space-3)',
          borderLeft: '2px solid var(--coral)',
          fontSize: 'var(--fs-slide-kicker)',
          lineHeight: 'var(--lh-base)',
          color: 'var(--cream-muted)',
          fontFamily: 'var(--font-body)',
          textTransform: 'none',
          letterSpacing: 0,
          fontWeight: 400,
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 0.45 }}
      >
        <span
          className="deck-mono uppercase"
          style={{
            display: 'block',
            fontStyle: 'normal',
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--coral)',
            marginBottom: 'var(--space-1)',
          }}
        >
          Pre-answers
        </span>
        {decision.preanswer}
      </motion.div>
    </div>
  );
}