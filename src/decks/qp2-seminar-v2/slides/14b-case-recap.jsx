import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideFrame from '@/components/deck/SlideFrame';
import HighlightWord from '@/components/deck/patterns/HighlightWord';

/**
 * Slide 14b · CS1 Framework Recap (V3 D5 insert · 2026-04-25).
 *
 * Closes Case Study 01 by mapping back to the framework themes
 * introduced on S04 (Slide 04 · Framework — five recurring judgments).
 * This case exercised four of the five themes — theme 04 (Novel
 * methods · stacked FDA-precedented techniques) is reserved for CS3
 * (Asparlas), keeping the framework slide's "five judgments → three
 * outcomes" promise honest.
 *
 * Per V3 spec (S16 · Framework Recap):
 *   1. QP Replaces Study  — The model became the evidence
 *   2. Dose Precision     — Exposure matching via allometry
 *   3. Global Strategy    — EMA/PMDA approval · FDA commercial reality
 *   5. Judgment           — Defending the parsimonious weight-only model
 *
 * Color tokens mirror S04 exactly so the recap feels like a payoff,
 * not a reintroduction.
 */

const RECAP_THEMES = [
  {
    n: '01',
    token: '--amber',
    title: 'QP replaces study',
    payoff: 'The model became the evidence.',
    proof: <>One PopPK model + sparse-PK trial substituted for a Phase 3 efficacy trial that was <strong>ethically and operationally impossible</strong> to run.</>,
  },
  {
    n: '02',
    token: '--cyan',
    title: 'Dose precision',
    payoff: 'Exposure matching via allometry.',
    proof: <>Weight-based pediatric dosing produced AUC<sub>ss</sub> + C<sub>max</sub> values <strong>entirely inside the adult therapeutic envelope</strong> across the 8 to &lt; 18 yr range.</>,
  },
  {
    n: '03',
    token: '--sage',
    title: 'Global strategy',
    payoff: 'EMA + PMDA convergence — against the FDA commercial reality.',
    proof: <>Two regulators accepted PopPK as primary efficacy evidence in 2021. The US (Letairis) carried no pediatric label — a <strong>commercial decision, not a methodological one</strong>.</>,
  },
  {
    n: '05',
    token: '--coral',
    title: 'Calibrated ambition',
    payoff: 'Defending the parsimonious weight-only model.',
    proof: <>Twelve covariates tested · only body weight retained. The case for the model rested on the <strong>discipline of what was excluded</strong>, not the cleverness of what was kept.</>,
  },
];

export default function Slide14bCaseRecap() {
  const T = useTokens(['--amber', '--cyan', '--sage', '--coral', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);
  const ease = [0.2, 0.7, 0.3, 1];

  const D = {
    grid: [0.70, 0.85, 1.00, 1.15],
    ribbon: 1.85,
  };

  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="CS1 · Recap — four themes exercised in one case"
      headline={
        <>
          Four of the five framework themes —{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            exercised in one case.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead={
        <>
          Looking back, the model-informed pediatric extrapolation{' '}
          <HighlightWord color="var(--coral)" delay={1.2}>did the work the framework promised it would</HighlightWord>{' '}
          — not as four separate moves, but as one integrated argument.
        </>
      }
      subheadMaxChars={75}
      footerKicker="Case 01 · Framework recap"
      footerSource="Source · Slide 04 framework themes · CS1 narrative arc"
    >
      <style>{`
        @media (max-width: 1499px) {
          .s14b-recap-grid { row-gap: var(--space-3) !important; column-gap: var(--space-4) !important; }
          .s14b-recap-card { padding: var(--space-3) var(--space-4) !important; }
          .s14b-recap-ribbon { padding: 6px var(--space-3) !important; }
        }
      `}</style>

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
        {/* 2 × 2 theme recap grid */}
        <div
          className="s14b-recap-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            columnGap: 'var(--space-6)',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {RECAP_THEMES.map((t, i) => (
            <RecapCard key={t.n} theme={t} delay={D.grid[i]} tk={tk} />
          ))}
        </div>

        {/* Closing ribbon — bridges to CS2 / CS3 */}
        <motion.div
          className="s14b-recap-ribbon"
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
          <motion.div
            aria-hidden
            style={{
              flexShrink: 0,
              transform: 'rotate(45deg)',
              width: 14,
              height: 14,
              background: 'var(--amber)',
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
              lineHeight: 1.35,
              color: 'var(--cream)',
              flex: 1,
              letterSpacing: '-0.005em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.ribbon + 0.2 }}
          >
            Same model-becomes-evidence logic — different drug, different agency.{' '}
            <motion.span
              style={{ fontStyle: 'italic', fontWeight: 500 }}
              initial={{ color: 'var(--cream)' }}
              animate={{ color: 'var(--amber)' }}
              transition={{ duration: 0.3, delay: D.ribbon + 0.8 }}
            >
              Next: a regulatory waiver in India.
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}

/* ============================================================ */
function RecapCard({ theme, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const accent = tk(theme.token);

  return (
    <motion.div
      className="s14b-recap-card"
      style={{
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4) var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        position: 'relative',
        minHeight: 0,
        minWidth: 0,
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {/* Left accent rail — theme color */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: accent,
          borderTopLeftRadius: 'var(--radius-lg)',
          borderBottomLeftRadius: 'var(--radius-lg)',
        }}
      />

      {/* Eyebrow row — theme number + title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-2)',
        }}
      >
        <span
          className="deck-mono"
          style={{
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: accent,
            fontWeight: 600,
          }}
        >
          THEME {theme.n}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-kicker)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
          }}
        >
          {theme.title}
        </span>
      </div>

      {/* Payoff line — short, italic, accent-colored */}
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-title)',
          fontWeight: 600,
          fontStyle: 'italic',
          color: accent,
          lineHeight: 1.2,
          letterSpacing: '-0.005em',
        }}
      >
        {theme.payoff}
      </div>

      {/* Proof body — receipts */}
      <div
        style={{
          fontSize: 'var(--fs-slide-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.5,
          marginTop: 'var(--space-1)',
        }}
      >
        {theme.proof}
      </div>
    </motion.div>
  );
}
