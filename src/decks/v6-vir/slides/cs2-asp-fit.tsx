// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import RseStabilityCurve from './cs3-fit/RseStabilityCurve';

/**
 * Slide 27 · CS2 Fit — Sixty adults anchor a model that already knows
 * most of the answer.
 *
 * 2026-04-24 redesign (Agent D · CS2 cluster fix):
 *   • Removed the floating concentric-circle backdrop. It was a
 *     layoutId="cs3-prior-anchor" partner for slide 23's hero
 *     InformativePriorViz, but slide 23 now mounts the lymphocyte
 *     hero — so the morph never resolved and the circle just sat
 *     behind the RSE chart as visual noise (the user's "circle behind
 *     what" question). The "prior anchor" meaning has been re-housed
 *     INSIDE evidence-block 01 as a small inline glyph (≤120px tall),
 *     which is what the user asked for ("create visuals" on the
 *     evidence blocks).
 *   • Dropped rounded card chrome from EvidenceBlock + the bottom
 *     ribbon (zaj-slides v2.1 / craft-bans-and-borders). Square corners
 *     and hairline borders only.
 *   • Added small inline glyphs to each evidence block:
 *       01 · PriorAnchorGlyph — concentric N=124 outer / N=60 inner
 *       02 · SensitivityGlyph — three plateau dots over a tiny curve
 *
 * Two-column structured body (~55/45):
 *   • LEFT — Two numbered evidence blocks with inline glyphs
 *   • RIGHT — RSE stability curve (the inverted-direction bug in
 *     RseStabilityCurve was fixed in the same patch)
 *
 * Bottom ribbon — the headline-restated payoff.
 */

const ANCHOR_BULLETS = [
  'N = 124 pooled pediatric PopPK · saturable distribution · combined linear/non-linear elimination',
  '~16-day half-life · BSA / age / sex covariate structure',
  'FDA-reviewed · label-supporting (Asparlas pediatric, 2018)',
  'Adult Part 1 external VPC vs pediatric-model predictions: no structural failure',
];

const SENSITIVITY_BULLETS = [
  'Cohort-1:Cohort-2 enrollment ratio varied across scenarios → conclusion stable',
  '%RSE of key PopPK parameters not sensitive to adult N above ≈ 50–60',
  'Bootstrap replicates · pcVPC on pooled data → predictive performance unchanged',
];

export default function Cs2AspFit() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    leftLabel: 0.95,
    block01: 1.10,
    block02: 1.95,
    rightLabel: 1.10,
    curve: 1.30,
    ribbon: 3.20,
    source: 2.80,
  };

  const T = useTokens(['--teal', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="teal" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--teal)" delay={D.eyebrow}>CS2 · Fit</Eyebrow>
      <Headline delay={D.headline} maxChars={56}>
        Sixty adults anchor a model that{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          already knows
        </span>{' '}
        most of the answer.
      </Headline>
      <Subhead delay={D.subhead} maxChars={130}>
        At N = 60 the model is{' '}
        <span style={{ color: 'var(--teal)', fontWeight: 600 }}>
          as precise as at N = 94
        </span>{' '}
        for the parameters that drive dose decisions — because the information lives in the
        pediatric prior, not the adult sample alone.
      </Subhead>

      <Viz>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 1fr',
              gap: 'var(--space-7)',
              minHeight: 0,
            }}
          >
            {/* LEFT — Two evidence blocks */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr 1fr',
                rowGap: 'var(--space-3)',
                minHeight: 0,
              }}
            >
              <motion.div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--cream-muted)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: D.leftLabel }}
              >
                Why N = 60 is enough · two evidence blocks
              </motion.div>

              <EvidenceBlock
                n="01"
                label="The pediatric anchor"
                tag="The adult data test the model — they don’t rebuild it."
                bullets={ANCHOR_BULLETS}
                glyph={<PriorAnchorGlyph />}
                delay={D.block01}
              />
              <EvidenceBlock
                n="02"
                label="Sensitivity analysis (illustrative)"
                tag="Three independent tests — all say sixty is enough."
                bullets={SENSITIVITY_BULLETS}
                glyph={<SensitivityGlyph />}
                delay={D.block02}
                small
              />
            </div>

            {/* RIGHT — RSE stability curve (hairline panel · zaj-slides v2.1)
                Square corners — rounded card chrome is banned. */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                rowGap: 'var(--space-3)',
                minHeight: 0,
                border: '1px solid var(--cream-hairline)',
                borderRadius: 0,
                padding: 'var(--space-3)',
              }}
            >
              <motion.div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--teal)',
                  fontWeight: 700,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: D.rightLabel }}
              >
                Parameter %RSE vs adult sample size · plateau beyond N ≈ 50–60
              </motion.div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 0,
                }}
              >
                <RseStabilityCurve delay={D.curve} />
              </div>
            </div>
          </div>

          {/* Bottom ribbon — borderless hairline-only band, square
              corners. Was a rounded violet-tinted card. */}
          <motion.div
            style={{
              padding: 'var(--space-3) 0 0 0',
              borderTop: '1px solid var(--cream-hairline)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: '8px 18px',
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: D.ribbon }}
          >
            <span
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-card-title)',
                color: 'var(--cream)',
                fontWeight: 500,
                letterSpacing: 'var(--ls-headline)',
                textAlign: 'center',
              }}
            >
              The smaller sample size doesn’t weaken the science — it{' '}
              <span style={{ color: 'var(--teal)', fontWeight: 700, fontStyle: 'normal' }}>
                clarifies where the scientific evidence actually lives
              </span>
              .
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Fit"
        source="Source · Pediatric PopPK (AALL07P4 + DFCI 11-001) · Asparlas label · sensitivity illustrative"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   EvidenceBlock — numbered chip + label/tag + bullets + inline
   glyph (≤120px tall, slotted to the right of the bullets).
   Square corners, hairline border, no decorative chrome.
   ======================================================== */
function EvidenceBlock({ n, label, tag, bullets, glyph, delay, small }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: '14px 18px 14px 16px',
        borderRadius: 0,
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--teal)',
        background: 'transparent',
        display: 'grid',
        // Two columns: text body (1fr) + glyph slot (auto, ≤120px).
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        columnGap: 'var(--space-4)',
        alignItems: 'center',
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto auto auto',
          rowGap: 8,
          minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 0,
              border: '1.5px solid var(--teal)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fs-card-label)',
              fontWeight: 700,
              color: 'var(--teal)',
            }}
          >
            {n}
          </span>
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-card-label)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--teal)',
              fontWeight: 700,
            }}
          >
            {label}
          </span>
        </div>
        <div
          className="deck-display italic"
          style={{
            fontSize: small ? 'var(--fs-card-body)' : 'var(--fs-card-title)',
            color: 'var(--cream)',
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          {tag}
        </div>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridAutoRows: 'min-content',
            rowGap: 4,
            alignContent: 'start',
          }}
        >
          {bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '14px 1fr',
                columnGap: 8,
                alignItems: 'baseline',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-card-body)',
                lineHeight: 1.4,
                color: 'var(--cream-muted)',
              }}
            >
              <span
                aria-hidden
                style={{
                  color: 'var(--teal)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                }}
              >
                ›
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      {glyph && (
        <div
          aria-hidden
          style={{
            width: 'clamp(96px, 9vw, 140px)',
            height: 'clamp(96px, 9vw, 140px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--teal)',
          }}
        >
          {glyph}
        </div>
      )}
    </motion.div>
  );
}

/* ========================================================
   PriorAnchorGlyph — small concentric-circles glyph showing the
   pediatric prior (outer dashed ring · N=124) wrapping the adult
   anchor sample (inner filled disc · N=60). This is the meaning
   the floating watermark used to carry, now relocated inline so
   it reads as evidence not background noise.
   ======================================================== */
function PriorAnchorGlyph() {
  return (
    <svg
      viewBox="0 0 120 120"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <radialGradient id="cs3-prior-glyph-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="currentColor" stopOpacity={0.22} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.04} />
        </radialGradient>
        <radialGradient id="cs3-anchor-glyph-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="currentColor" stopOpacity={0.92} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.55} />
        </radialGradient>
      </defs>
      <circle cx={60} cy={60} r={56} fill="none" stroke="currentColor" strokeWidth={0.6} strokeDasharray="2 4" opacity={0.45} />
      <circle cx={60} cy={60} r={46} fill="url(#cs3-prior-glyph-fill)" stroke="currentColor" strokeWidth={1.4} strokeDasharray="5 4" />
      <circle cx={60} cy={60} r={20} fill="url(#cs3-anchor-glyph-fill)" stroke="currentColor" strokeWidth={1.6} />
      <text x={60} y={63} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9} fontWeight={700} fill="var(--bg)" letterSpacing="0.04em">
        60
      </text>
      <text x={60} y={14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={7.5} fontWeight={700} fill="currentColor" letterSpacing="0.18em" opacity={0.8}>
        N = 124
      </text>
    </svg>
  );
}

/* ========================================================
   SensitivityGlyph — tiny plateau curve with three marker dots,
   echoing the larger RSE curve on the right. The three dots are
   the three independent tests called out in the bullets.
   ======================================================== */
function SensitivityGlyph() {
  // Plot area inside 120×120 viewBox
  const x0 = 12, x1 = 108, y0 = 22, y1 = 96;
  const ns = [0, 0.25, 0.5, 0.75, 1];
  const yHigh = y0 + 6;
  const yPlateau = y1 - 8;
  const points = ns.map((t, i) => {
    const decay = Math.exp(-3.4 * t);
    const x = x0 + t * (x1 - x0);
    const y = yPlateau - decay * (yPlateau - yHigh);
    return { x, y, i };
  });
  const path = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cx1 = prev.x + (p.x - prev.x) / 2;
      const cx2 = prev.x + (p.x - prev.x) / 2;
      return `C ${cx1} ${prev.y}, ${cx2} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(' ');
  return (
    <svg
      viewBox="0 0 120 120"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <line x1={x0} y1={y1} x2={x1} y2={y1} stroke="currentColor" strokeWidth={0.6} opacity={0.4} />
      <rect
        x={x0 + 0.55 * (x1 - x0)}
        y={y0}
        width={0.45 * (x1 - x0)}
        height={y1 - y0}
        fill="currentColor"
        opacity={0.08}
      />
      <path d={path} fill="none" stroke="currentColor" strokeWidth={1.6} />
      {/* Three test markers on the plateau side of the curve */}
      {[0.6, 0.78, 0.95].map((t, i) => {
        const decay = Math.exp(-3.4 * t);
        const x = x0 + t * (x1 - x0);
        const y = yPlateau - decay * (yPlateau - yHigh);
        return <circle key={i} cx={x} cy={y} r={3.4} fill="currentColor" stroke="var(--bg)" strokeWidth={1.2} />;
      })}
      <text x={(x0 + x1) / 2} y={y1 + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={7.5} fontWeight={700} letterSpacing="0.18em" fill="currentColor" opacity={0.75}>
        PLATEAU · 3 TESTS
      </text>
    </svg>
  );
}
