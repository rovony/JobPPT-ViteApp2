import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideFrame from '@/components/deck/SlideFrame';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import SparsePKChart from './cs1-challenge/SparsePKChart';

/**
 * Slide 08b · CS1 Trial design — AMB112529 (V3 D2 insert · 2026-04-25).
 *
 * Sits between CS1 Strategy (S08) and CS1 Build (S09). Replaces the
 * data-constraint card that used to live as Card 03 on S07 — that card
 * was reshuffled here so S07 reads as a clean "rarity + ethics + silence
 * + focal question" beat (V3-faithful), and the trial design gets the
 * room it needs to land its own four facts (population, design, sampling,
 * endpoints) before the model-build slide opens.
 *
 * Design idiom mirrors S08 (case-strategy):
 *   • SlideFrame · coral case · single viz cell
 *   • LEFT (5/12 cols)  — 2x2 protocol spec grid (population · design ·
 *                          sampling · endpoints) inside a single panel card
 *   • RIGHT (7/12 cols) — sparse-PK chart card (re-uses SparsePKChart)
 *                         with a one-line caption that pivots into S09
 *   • Closing ribbon (full width) — amber diamond + italic line: by
 *     design, this trial would never carry efficacy on its own.
 *
 * Numbers are sourced from the AMB112529 protocol (NCT01332331) and
 * Okour et al. JCP 2023, both already cited elsewhere in CS1.
 */

const SPECS = [
  {
    num: '01',
    label: 'Population',
    value: '41 enrolled',
    sub: <>39 PK-evaluable · ages <strong>8 → &lt; 18&nbsp;yr</strong> · multi-center</>,
  },
  {
    num: '02',
    label: 'Design',
    value: 'Open-label · 24 wk',
    sub: <>Phase 2 · two weight-tiered dose arms · randomized</>,
  },
  {
    num: '03',
    label: 'Sampling',
    value: 'Sparse PK',
    sub: <>~5 samples per patient · <strong>211 obs</strong> across 24 weeks</>,
  },
  {
    num: '04',
    label: 'Endpoints',
    value: 'Safety · PK',
    sub: <>Secondary: 6MWD, time to clinical worsening — <strong>not powered for efficacy</strong></>,
  },
];

export default function Slide08bCaseTrialDesign() {
  const T = useTokens(['--coral', '--amber', '--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);
  const ease = [0.2, 0.7, 0.3, 1];

  const D = {
    leftCard: 0.70,
    spec: [0.95, 1.10, 1.25, 1.40],
    rightCard: 0.85,
    chart: 1.15,
    caption: 1.65,
    ribbon: 2.20,
  };

  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="CS1 · Trial design — AMB112529 · the only pediatric dataset"
      headline={
        <>
          One open-label trial · 41 children ·{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            sparse-PK by design.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead={
        <>
          The trial wasn't built to prove efficacy — it was built to{' '}
          <HighlightWord color="var(--coral)" delay={1.2}>feed the model</HighlightWord>{' '}
          that would. Population, sampling, and endpoints all pre-committed to that role.
        </>
      }
      subheadMaxChars={75}
      footerKicker="Case 01 · Trial design"
      footerSource="Source · NCT01332331 (Prot_001) · Okour et al. JCP 2023 · EMA Volibris SmPC"
    >
      {/* Local 1366px tightening so the spec grid + sparse-PK chart +
          ribbon all stay inside the viz cell on the cramped fallback. */}
      <style>{`
        @media (max-width: 1499px) {
          .s08b-trial-viz { row-gap: var(--space-2) !important; }
          .s08b-trial-viz > div:first-of-type { padding: var(--space-4) !important; }
          .s08b-trial-viz .s08b-spec-cell { padding: var(--space-2) var(--space-3) !important; }
          .s08b-trial-ribbon { padding: 6px var(--space-3) !important; }
        }
      `}</style>

      <div
        className="s08b-trial-viz"
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          rowGap: 'var(--space-4)',
          paddingBottom: 'var(--space-3)',
        }}
      >
        {/* TOP — two columns: left protocol panel + right sparse-PK panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 7fr',
            columnGap: 'var(--space-6)',
            minHeight: 0,
            minWidth: 0,
          }}
        >
          {/* ─── LEFT · protocol spec card ─── */}
          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              minHeight: 0,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.leftCard }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-kicker)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--coral)',
                marginBottom: 'var(--space-2)',
                flexShrink: 0,
              }}
            >
              AMB112529 — Protocol at a glance
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 'var(--space-3)',
                flex: 1,
                minHeight: 0,
              }}
            >
              {SPECS.map((s, i) => (
                <SpecCell key={s.num} spec={s} delay={D.spec[i]} tk={tk} />
              ))}
            </div>

            {/* Footer note — anchors the panel + carries the why-this-trial
                framing so the cards above don't have to do narrative work. */}
            <div
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: '0.06em',
                color: 'var(--cream-faint)',
                lineHeight: 1.4,
                marginTop: 'var(--space-2)',
                fontStyle: 'italic',
                flexShrink: 0,
              }}
            >
              Phase 2 PIP commitment · designed to feed PopPK · not powered for efficacy
            </div>
          </motion.div>

          {/* ─── RIGHT · sparse-PK contrast chart ─── */}
          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-5)',
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              rowGap: 'var(--space-3)',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.rightCard }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-kicker)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--coral)',
              }}
            >
              Sampling density — adult vs pediatric
            </div>

            {/* Chart area — let aspect ratio decide height; the panel
                wraps at the right size and the caption sits below. */}
            <div
              style={{
                position: 'relative',
                minHeight: 0,
                minWidth: 0,
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <div style={{ width: '100%', maxWidth: '100%', alignSelf: 'center' }}>
                <SparsePKChart tk={tk} delay={D.chart} />
              </div>
            </div>

            <motion.div
              style={{
                fontSize: 'var(--fs-slide-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.45,
                fontStyle: 'italic',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.caption }}
            >
              Adults · ~3,126 observations · rich profiles per patient.{' '}
              <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 600 }}>
                Pediatric · 211 obs · ~5 per patient.
              </span>{' '}
              Same drug — different evidentiary geometry.
            </motion.div>
          </motion.div>
        </div>

        {/* CLOSING RIBBON — amber diamond + italic line, mirrors S08 */}
        <motion.div
          className="s08b-trial-ribbon"
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
            By design, this trial would never carry the label on its own —{' '}
            <motion.span
              style={{ fontStyle: 'italic', fontWeight: 500 }}
              initial={{ color: 'var(--cream)' }}
              animate={{ color: 'var(--amber)' }}
              transition={{ duration: 0.3, delay: D.ribbon + 0.8 }}
            >
              the model would have to.
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}

/* ============================================================ */
/* Single spec cell — number + label + value + sub.            */
function SpecCell({ spec, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];

  return (
    <motion.div
      className="s08b-spec-cell"
      style={{
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4) var(--space-4)',
        display: 'grid',
        gridTemplateRows: 'auto auto auto',
        rowGap: 'var(--space-2)',
        alignContent: 'space-between',
        minHeight: 0,
        minWidth: 0,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease, delay }}
    >
      {/* Row 1 — number + label */}
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
            color: 'var(--coral)',
            fontWeight: 600,
          }}
        >
          {spec.num}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-kicker)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
          }}
        >
          {spec.label}
        </span>
      </div>

      {/* Row 2 — headline value (the hero phrase) */}
      <div
        style={{
          fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
          fontWeight: 600,
          color: 'var(--cream)',
          lineHeight: 1.15,
          letterSpacing: '-0.005em',
        }}
      >
        {spec.value}
      </div>

      {/* Row 3 — supporting detail */}
      <div
        style={{
          fontSize: 'var(--fs-slide-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        {spec.sub}
      </div>
    </motion.div>
  );
}
