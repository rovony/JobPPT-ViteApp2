import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideFrame from '@/components/deck/SlideFrame';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import { IntegrateViz, ConstrainViz, ParsimonyViz } from './cs1-strategy/DecisionVisuals';

/**
 * Slide 11b · CS1 Strategy — Three design decisions.
 * Migrated to SlideFrame. Three-column layout lives inside the viz cell.
 */
// `Viz` component reference resolved at render time — delay offset is
// applied inside DecisionColumn so each chart starts shortly after the
// pre-answer fades in.
const DECISIONS = [
  {
    num: '01',
    label: 'Anchor',
    action: 'Build on the adult structural model.',
    rationale: (
      <>
        Build <span style={{ color: 'var(--coral)', fontWeight: 600 }}>on</span> the adult evidence base — don't rebuild it. Adult data provides the statistical anchor; pediatric data refines the covariate effects.
      </>
    ),
    preanswer: '"Why not pediatric-only?" — 39 patients with sparse sampling would give unstable estimates.',
    Viz: IntegrateViz,
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
    Viz: ConstrainViz,
  },
  {
    num: '03',
    label: 'Stay parsimonious',
    action: 'Test covariates.',
    rationale: (
      <>
        <span style={{ color: 'var(--coral)', fontWeight: 600 }}>12 covariates tested</span> via full-covariate model (bilirubin, ALT, AST, ALP, GGT, CrCl, age, sex, race, ethnicity, dose group, dose on t<sub>lag</sub>). None retained at p &lt; 0.001.
      </>
    ),
    preanswer: '"What about other covariates?" — tested, none reached statistical or mechanistic significance.',
    Viz: ParsimonyViz,
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
      footerTagline="Source · Okour et al. JCP 2023 · Anderson & Holford 2008"
    >
      {/* Three columns + closing ribbon inside the viz cell.
          Padding-bottom on the viz container pushes the ribbon up off
          the SlideFrame footer — earlier layout had the ribbon bleeding
          visually into the "Case 01 · Strategy" source line below. */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          rowGap: 'var(--space-4)',
          paddingBottom: 'var(--space-3)',
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

        {/* Closing ribbon — styled to match slide 7 (case-challenge)
            FocalQuestion: amber-tinted panel + small rotated-square
            (diamond) anchor on the left. Visually rhymes the "question
            at challenge" with the "answer at strategy" beats. */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-2) var(--space-4)',
            background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
            borderRadius: 'var(--radius-md)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: D.ribbon }}
        >
          {/* Amber diamond anchor (rotated square, same visual language
              as SpineDiamond on slide 7). Static — only appears when
              the ribbon is visible. */}
          <motion.div
            aria-hidden
            style={{
              flexShrink: 0,
              transform: 'rotate(45deg)',
              width: 14,
              height: 14,
              background: 'var(--amber)',
              boxShadow: '0 0 12px color-mix(in srgb, var(--amber) 60%, transparent)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: D.ribbon }}
          />

          <motion.div
            className="deck-display italic"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              fontWeight: 400,
              // no token match — consider adding one
              lineHeight: 1.35,
              color: 'var(--cream)',
              flex: 1,
              // no token match — consider adding one
              letterSpacing: '-0.005em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.ribbon + 0.2 }}
          >
            Each choice is a{' '}
            <motion.span
              style={{ fontStyle: 'italic', fontWeight: 500 }}
              initial={{ color: 'var(--cream)' }}
              animate={{ color: 'var(--amber)' }}
              transition={{ duration: 0.3, delay: D.ribbon + 0.8 }}
            >
              regulatory defense
            </motion.span>{' '}
            before it's a statistical one.
          </motion.div>
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
  const Viz = decision.Viz;
  return (
    <div style={{ padding: 'var(--space-4) var(--space-5)', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
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

      {/* Action title — reserves 2 lines of height across all 3 columns
          so the rationale / chart blocks below align horizontally even
          though "Body weight — only." fits on one line while
          "Adult + pediatric — together." wraps to two. */}
      <motion.div
        className="deck-display"
        style={{
          // no token match — consider adding one
          fontSize: 'clamp(1.4rem, min(2.2vw, 3.6vh), 2.4rem)',
          lineHeight: 'var(--lh-tight)',
          letterSpacing: 'var(--ls-display)',
          color: 'var(--cream)',
          fontWeight: 700,
          marginBottom: 'var(--space-4)',
          minHeight: 'calc(var(--lh-tight) * 2em)',
          display: 'flex',
          alignItems: 'flex-start',
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

      {/* Pre-answers block removed 2026-04-24 per user ask — the chart
          below now carries the "defense" role visually, and removing the
          italic box frees vertical space so charts can be taller and
          more legible. */}

      {/* Decision-specific visualization — fades in after rationale.
          marginTop:auto pushes it to the column's bottom so all three
          charts align on a shared baseline across columns regardless of
          how many lines the rationale wraps into. */}
      {Viz && (
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)' }}>
          <Viz delay={delay + 0.4} />
        </div>
      )}
    </div>
  );
}