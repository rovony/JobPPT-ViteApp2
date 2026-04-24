import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 25 · CS3 Strategy — Two innovations stacked.
 *
 * The CS3 strategy is two FDA-precedented methods combined for the first
 * time in adult oncology:
 *   #1 Optimal design — D-optimality + Fisher Information; size on
 *      PK precision rather than endpoint power.
 *   #2 PopPK-simulated primary — simulate the NPAA endpoint across
 *      virtual patients drawn from the fitted PopPK; observe model, not
 *      patient outcomes.
 *
 * Each card is half the slide: bold headline, "Anchor" line, structured
 * 4-row evidence list, FDA-precedent footer. A connecting "stack" ribbon
 * underneath ties them together.
 */

const MOVES = [
  {
    n: '01',
    title: 'Optimal design',
    headline: 'Anchor to PK precision — not endpoint power.',
    method: 'Fisher Information Matrix · D-optimality',
    rows: [
      ['Prior', 'Pediatric PopPK · N = 124 (AALL07P4 + DFCI 11-001)'],
      ['Augmentation', 'Adult data augments — does not re-derive'],
      ['Target', 'Detect ±20% CL difference adult vs pediatric'],
      ['Question', 'How many adults to confirm PK similarity?'],
    ],
    precedent: 'Mentré · Bornkamp · Pinheiro · 2007–2020',
  },
  {
    n: '02',
    title: 'PopPK-simulated primary',
    headline: 'Simulate the primary endpoint — don’t observe it.',
    method: 'NPAA across 2 000–10 000 virtual patients · pooled PopPK',
    rows: [
      ['Endpoint', 'NPAA ≥ 0.1 U/mL · same FDA threshold'],
      ['Criterion', 'Lower 95% CI for target achievement ≥ 85% (CSP v5)'],
      ['Evidence', 'Model-based, not observation-based'],
      ['Validation', 'Data validates the model · model answers the question'],
    ],
    precedent: 'Rylaze (adult, 2021) · Asparlas (pediatric, 2018) · FDA-run sims at review',
  },
];

export default function Slide25Case3Strategy() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    cardLabel: 0.95,
    cards: 1.10,
    ribbon: 2.45,
    source: 2.85,
  };

  const T = useTokens(['--violet', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="violet" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--violet)" delay={D.eyebrow}>CS3 · Strategy</Eyebrow>
      <Headline delay={D.headline} maxChars={48}>
        Two innovations,{' '}
        <span style={{ color: 'var(--violet)', fontStyle: 'italic', fontWeight: 700 }}>
          individually precedented
        </span>{' '}
        — stacked for adult oncology.
      </Headline>
      <Subhead delay={D.subhead} maxChars={110}>
        Each move is{' '}
        <span style={{ color: 'var(--violet)', fontWeight: 600 }}>FDA-precedented on its own</span>.
        Combined here for the first time in this clinical context.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          <motion.div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.7rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.cardLabel }}
          >
            Two moves · stacked for the first time in adult oncology
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-7)',
              minHeight: 0,
            }}
          >
            {MOVES.map((m, i) => (
              <MoveCard key={m.n} move={m} delay={D.cards + i * 0.25} />
            ))}
          </div>

          {/* Bottom ribbon — the stack */}
          <motion.div
            style={{
              padding: 'var(--space-3) var(--space-5)',
              borderRadius: 4,
              border: '1px dashed var(--violet)',
              background: 'color-mix(in srgb, var(--violet) 8%, transparent)',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.ribbon }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                color: 'var(--violet)',
                fontWeight: 700,
                marginRight: 12,
              }}
            >
              The stack
            </span>
            <span
              className="deck-display"
              style={{
                fontSize: 'clamp(0.95rem, 1.15vw, 1.2rem)',
                color: 'var(--cream)',
                fontWeight: 500,
                letterSpacing: 'var(--ls-headline)',
              }}
            >
              PK-precision sample size{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 700 }}>+</span>{' '}
              model-simulated primary endpoint —{' '}
              <em style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>
                two precedents, first combined for adult oncology.
              </em>
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Strategy"
        tagline="Source · PopED workflow (Tessier / Riglet, Paris) · Mentré et al."
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   MoveCard — one of the two stacked-innovation cards
   ======================================================== */
function MoveCard({ move, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        position: 'relative',
        padding: '24px 26px 22px 26px',
        borderRadius: 8,
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--violet)',
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        display: 'grid',
        gridTemplateRows: 'auto auto auto 1fr auto',
        rowGap: 12,
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease, delay }}
    >
      {/* Header: numbered chip + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: '2px solid var(--violet)',
            background: 'color-mix(in srgb, var(--violet) 12%, transparent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            fontWeight: 700,
            color: 'var(--violet)',
            letterSpacing: '0.04em',
          }}
        >
          {move.n}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.68rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--violet)',
            fontWeight: 700,
          }}
        >
          Move #{move.n.replace(/^0/, '')} · {move.title}
        </span>
      </div>

      {/* Headline */}
      <div
        className="deck-display italic"
        style={{
          fontSize: 'clamp(0.98rem, 1.2vw, 1.25rem)',
          fontWeight: 500,
          color: 'var(--cream)',
          lineHeight: 1.25,
          letterSpacing: 'var(--ls-headline)',
        }}
      >
        {move.headline}
      </div>

      {/* Method line */}
      <div
        className="deck-mono"
        style={{
          fontSize: '0.74rem',
          letterSpacing: '0.06em',
          color: 'var(--cream-muted)',
          paddingBottom: 8,
          borderBottom: '1px dashed var(--cream-hairline)',
        }}
      >
        {move.method}
      </div>

      {/* Rows */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridAutoRows: 'min-content',
          rowGap: 8,
          alignContent: 'start',
        }}
      >
        {move.rows.map(([k, v]) => (
          <li
            key={k}
            style={{
              display: 'grid',
              gridTemplateColumns: '110px 1fr',
              columnGap: 10,
              alignItems: 'baseline',
            }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                color: 'var(--cream-faint)',
                fontWeight: 700,
              }}
            >
              {k}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.78rem, 0.88vw, 0.92rem)',
                color: 'var(--cream)',
                lineHeight: 1.4,
              }}
            >
              {v}
            </span>
          </li>
        ))}
      </ul>

      {/* FDA precedent footer */}
      <div
        style={{
          marginTop: 6,
          paddingTop: 8,
          borderTop: '1px solid var(--cream-hairline)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          columnGap: 10,
          alignItems: 'center',
        }}
      >
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.22em',
            color: 'var(--violet)',
            fontWeight: 700,
          }}
        >
          FDA precedent
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.74rem, 0.85vw, 0.86rem)',
            color: 'var(--cream-muted)',
            lineHeight: 1.4,
          }}
        >
          {move.precedent}
        </span>
      </div>
    </motion.div>
  );
}
