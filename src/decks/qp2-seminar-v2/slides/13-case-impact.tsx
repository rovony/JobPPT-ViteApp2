// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 13 · CS1 Impact — "One model. Two regulators. The model became the evidence."
 *
 * V3 redesign (2026-04-24-conclusion-fix):
 * Direction A — Two-regulator convergence diagram + methodology ledger.
 *
 * Why this direction (vs the previous numerals layout ×2 / ~3% / 39):
 *   The numerals layout duplicated content from slides 11e/12 (weight-band
 *   match, n=39 cohort) and answered "what happened" instead of "why it
 *   matters." The convergence diagram makes a unique editorial argument
 *   that only this slide can make: TWO independent regulators looked at
 *   the SAME model and reached the SAME conclusion, on different days,
 *   in different jurisdictions. That convergence IS the impact.
 *
 *   The 4-beat methodology ledger below the convergence
 *   (1 MODEL · 2 JURISDICTIONS · 0 NEW PEDIATRIC TRIALS · M-IPE PRECEDENT)
 *   adds the practical leverage from direction D without inventing facts —
 *   each beat is grounded in deck-resident or label-public information.
 *
 * Regulatory facts used (NOT invented):
 *   • EMA pediatric Volibris label — Sep 2021  (already in deck via ApprovalTimeline)
 *   • PMDA pediatric Volibris label — Apr 2021 (already in deck via ApprovalTimeline)
 *   • "No new pediatric efficacy trial" — already in V2 slide 13 caption
 *   • M-IPE / ICH E11A framework — already cited on slide 11e closing
 *
 * No [verify] flags required for this implementation.
 *
 * Visual primitives:
 *   • Two end-cards (EMA · EU on left, PMDA · JP on right) — typography stacks
 *   • Horizontal axis between them with date ticks
 *   • Two diagonal converging arms inward to a coral hub at center
 *   • Hub: small circle + below-the-axis label "1 PopPK MODEL · ONE LABEL"
 *   • Below: hairline-bordered methodology ledger row (4 beats)
 *   • Bottom: italic verdict + ICH E11A meta line (matches CS1 results closing meta)
 */

export default function Slide13CaseImpact() {
  const ease = [0.2, 0.7, 0.3, 1];
  const reduce = useReducedMotion();
  const D = {
    chrome: 0.10, headline: 0.25, subhead: 0.55,
    cards: 0.80,        // EMA + PMDA cards fade in
    axis: 1.20,         // horizontal axis line draws
    arms: 1.60,         // converging arms draw inward
    hub: 2.50,          // hub mark scale-in (after arms arrive)
    hubLabel: 2.80,     // "1 PopPK MODEL" caption
    ledger: 3.20,       // 4-beat methodology row
    verdict: 3.70,      // italic closing verdict
    payoff: 4.05,       // footer source line
  };

  const T = useTokens(['--coral', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline', '--cream-dim', '--bg', '--panel']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={D.chrome}>
        CS1 · Impact — two regulators converged on one model
      </Eyebrow>
      <Headline delay={D.headline} maxChars={32}>
        One model. Two regulators.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
          No new pediatric trial — the model was the evidence.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={72}>
        EMA (Sep 2021) and PMDA (Apr 2021) accepted the{' '}
        <span style={{ color: 'var(--cream)', fontWeight: 600 }}>same PopPK extrapolation</span>{' '}
        as label-supporting evidence — independent agencies, identical conclusion.
      </Subhead>

      <Viz>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto auto',
            rowGap: 'var(--space-5)',
            width: '100%',
            height: '100%',
            minHeight: 0,
          }}
        >
          {/* ─── BAND 1 · convergence diagram (cards + axis + hub) ─── */}
          <ConvergenceDiagram tk={tk} D={D} ease={ease} reduce={reduce} />

          {/* ─── BAND 2 · methodology ledger (4 beats) ─── */}
          <motion.div
            style={{
              paddingTop: 'var(--space-3)',
              paddingBottom: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              columnGap: 'var(--space-6)',
              alignItems: 'start',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: D.ledger }}
          >
            <LedgerBeat n="1" label="PopPK model" meta="Okour et al. JCP 2023" accent />
            <LedgerBeat n="2" label="jurisdictions" meta="EU · Japan" />
            <LedgerBeat n="0" label="new pediatric efficacy trials" meta="Model = evidence" accent />
            <LedgerBeat
              n="M-IPE"
              numeralStyle={{ fontSize: 'var(--fs-card-hero-num)', letterSpacing: '-0.01em' }}
              label="precedent established"
              meta="ICH E11A framework"
            />
          </motion.div>

          {/* ─── BAND 3 · italic verdict + ICH E11A meta ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: D.verdict }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              columnGap: 'var(--space-8)',
              alignItems: 'end',
            }}
          >
            <p
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-card-title)',
                lineHeight: 'var(--lh-snug)',
                color: 'var(--cream)',
                fontWeight: 500,
                margin: 0,
              }}
            >
              When two independent agencies accept the{' '}
              <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 700 }}>
                same model on the same evidence
              </span>
              , the model has crossed from analysis to evidence.
            </p>
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-meta)',
                letterSpacing: '0.2em',
                color: 'var(--coral)',
                whiteSpace: 'nowrap',
              }}
            >
              ICH E11A · model-informed pediatric extrapolation
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Impact"
        source="Source · EMA + PMDA pediatric Volibris labels · 2021"
        delay={D.payoff}
      />
    </SlideGrid>
  );
}

/* ========================================================
   ConvergenceDiagram — pure SVG.

   Layout (1920×620 viewBox):
     • Left card group  · x = 100…560
     • Right card group · x = 1360…1820
     • Horizontal axis  · y = 280, x = 480 → 1440
     • Date ticks       · vertical hairlines below the agency labels
     • Arms             · two diagonal lines from axis ticks → hub
     • Hub              · circle at (960, 460), r=22
   ======================================================== */
function ConvergenceDiagram({ tk, D, ease, reduce }) {
  const W = 1920;
  const H = 620;
  // Axis y, hub center y, card baseline y
  const axisY = 280;
  const hubX = W / 2;
  const hubY = 460;
  // Inner ends of horizontal axis (ticks rise from these points to the cards above)
  const leftAxisX = 480;
  const rightAxisX = 1440;
  const leftCardX = 240;   // EMA card visual center on the typography side
  const rightCardX = 1680; // PMDA card visual center

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 0 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ─── Agency cards (typography in SVG <text>) ─── */}
        <AgencyCard
          tk={tk}
          align="left"
          cx={leftCardX}
          eyebrow="EUROPEAN MEDICINES AGENCY"
          jurisdiction="EU"
          date="SEP 2021"
          body="Pediatric Volibris label · EU SmPC"
          delay={D.cards}
          ease={ease}
          reduce={reduce}
        />
        <AgencyCard
          tk={tk}
          align="right"
          cx={rightCardX}
          eyebrow="PHARMACEUTICALS &amp; MEDICAL DEVICES AGENCY"
          jurisdiction="JP"
          date="APR 2021"
          body="Pediatric Volibris label · J-NDA"
          delay={D.cards + 0.10}
          ease={ease}
          reduce={reduce}
        />

        {/* ─── Horizontal axis (between the two cards) ─── */}
        <motion.line
          x1={leftAxisX} x2={rightAxisX} y1={axisY} y2={axisY}
          stroke={tk('--cream-hairline')} strokeWidth={1}
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : D.axis }}
          style={{ transformOrigin: `${leftAxisX}px ${axisY}px` }}
        />
        {/* Tick marks at the inner card edges (where the cards visually anchor) */}
        <motion.g
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.4, ease, delay: reduce ? 0 : D.axis + 0.5 }}
        >
          <line x1={leftAxisX} x2={leftAxisX} y1={axisY - 6} y2={axisY + 6} stroke={tk('--cream-faint')} strokeWidth={1} />
          <line x1={rightAxisX} x2={rightAxisX} y1={axisY - 6} y2={axisY + 6} stroke={tk('--cream-faint')} strokeWidth={1} />
        </motion.g>

        {/* ─── Converging arms (axis ends → hub) ─── */}
        <motion.path
          d={`M ${leftAxisX} ${axisY} L ${hubX} ${hubY}`}
          fill="none" stroke={tk('--coral')} strokeWidth={1.6} strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 0.9, ease, delay: reduce ? 0 : D.arms }}
        />
        <motion.path
          d={`M ${rightAxisX} ${axisY} L ${hubX} ${hubY}`}
          fill="none" stroke={tk('--coral')} strokeWidth={1.6} strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 0.9, ease, delay: reduce ? 0 : D.arms + 0.05 }}
        />

        {/* ─── Hub (coral mark at convergence point) ─── */}
        <motion.circle
          cx={hubX} cy={hubY} r={22}
          fill={tk('--coral')} fillOpacity={0.18}
          stroke={tk('--coral')} strokeWidth={1.8}
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : D.hub }}
          style={{ transformOrigin: `${hubX}px ${hubY}px`, transformBox: 'fill-box' }}
        />
        <motion.circle
          cx={hubX} cy={hubY} r={4}
          fill={tk('--coral')}
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.4, ease, delay: reduce ? 0 : D.hub + 0.15 }}
          style={{ transformOrigin: `${hubX}px ${hubY}px`, transformBox: 'fill-box' }}
        />

        {/* ─── Hub label (below hub) ─── */}
        <motion.g
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : D.hubLabel }}
        >
          <text
            x={hubX} y={hubY + 60}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize="34"
            fontWeight={700}
            letterSpacing="-0.02em"
            fill={tk('--cream')}
          >
            One PopPK model
          </text>
          <text
            x={hubX} y={hubY + 96}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="14"
            letterSpacing="0.22em"
            fill={tk('--coral')}
          >
            ↳ ONE PEDIATRIC LABEL
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

/* ========================================================
   AgencyCard — typography stack rendered as SVG <text>.

   Drawn as SVG (not HTML) so it scales identically to the
   convergence axis/arms across viewports without absolute
   positioning math. The eyebrow is a small mono uppercase line,
   the date is the hero (display tier), the body is muted prose.
   ======================================================== */
function AgencyCard({ tk, align, cx, eyebrow, jurisdiction, date, body, delay, ease, reduce }) {
  const anchor = align === 'right' ? 'end' : 'start';
  const x = align === 'right' ? cx + 200 : cx - 200;

  return (
    <motion.g
      initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: align === 'left' ? -16 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduce ? 0 : 0.7, ease, delay: reduce ? 0 : delay }}
    >
      {/* Hairline left/right rule — the visual "card edge" */}
      <line
        x1={x} x2={x}
        y1={50} y2={230}
        stroke={tk('--cream-hairline')} strokeWidth={1}
      />

      {/* Eyebrow — agency name (mono uppercase) */}
      <text
        x={align === 'right' ? x - 20 : x + 20}
        y={70}
        textAnchor={anchor}
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="0.22em"
        fill={tk('--cream-muted')}
      >
        {eyebrow}
      </text>

      {/* Jurisdiction tag — small coral chip */}
      <text
        x={align === 'right' ? x - 20 : x + 20}
        y={94}
        textAnchor={anchor}
        fontFamily="var(--font-mono)"
        fontSize="11"
        fontWeight={700}
        letterSpacing="0.22em"
        fill={tk('--coral')}
      >
        · {jurisdiction} ·
      </text>

      {/* Date — hero (display tier) */}
      <text
        x={align === 'right' ? x - 20 : x + 20}
        y={172}
        textAnchor={anchor}
        fontFamily="var(--font-display)"
        fontSize="56"
        fontWeight={700}
        letterSpacing="-0.02em"
        fill={tk('--cream')}
      >
        {date}
      </text>

      {/* Body — muted single-line prose */}
      <text
        x={align === 'right' ? x - 20 : x + 20}
        y={210}
        textAnchor={anchor}
        fontFamily="var(--font-body)"
        fontSize="16"
        fill={tk('--cream-muted')}
      >
        {body}
      </text>
    </motion.g>
  );
}

/* ========================================================
   LedgerBeat — one cell of the methodology row.

   Numeral on top (display tier), label below (body), meta in
   muted mono uppercase. Coral when accent=true so the eye picks
   "1 model" and "0 trials" as the editorial extremes of the row.
   ======================================================== */
function LedgerBeat({ n, label, meta, accent, numeralStyle }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-numeral)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: accent ? 'var(--coral)' : 'var(--cream)',
          fontWeight: 700,
          ...(numeralStyle || {}),
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.35,
        }}
      >
        {label}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-muted)',
        }}
      >
        {meta}
      </div>
    </div>
  );
}
