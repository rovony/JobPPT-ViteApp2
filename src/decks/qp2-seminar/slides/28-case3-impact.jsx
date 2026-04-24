import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 28 · CS3 Impact — 36% reduction · documented precedent · methodology travels.
 *
 * Three oversized numerals across the top echo Slide 13 (CS1 impact) but
 * lighter on motion — this is the value-extraction beat at the end of CS3.
 *
 *   −36%  Sample-size reduction (94 → 60), FDA AE-detection probability anchor
 *   3×    Three generalizable contributions (precedent · operations · science)
 *   2     Two frameworks converged on the same N — the integration claim
 *
 * Bottom — durable contribution callout (the precedent travels even after
 * the trial closed at N=42 on a sponsor portfolio decision).
 */

const NUMBERS = [
  {
    big: '−36%',
    title: 'Sample-size reduction',
    sub: 'anchored on FDA’s safety framework',
    rows: [
      '94 → 60 primary-endpoint evaluable',
      'FDA agreed via AE-detection probability ≥ 85%',
      'Optimal design briefed in parallel',
    ],
    accent: 'violet',
  },
  {
    big: '3×',
    title: 'Generalizable contributions',
    sub: 'bigger than one program',
    rows: [
      'Regulatory precedent · FDA Type A record of a 36% reduction',
      'Operational efficiency · per-patient information density up, footprint down',
      'Scientific generalizability · template for rare-population trials',
    ],
    accent: 'cream',
  },
  {
    big: '2',
    title: 'Frameworks converged on one N',
    sub: 'the integration claim',
    rows: [
      'Pharmacometrics · D-optimal design under informative prior',
      'Biostatistics · AE-detection probability ≥ 85%',
      'Two independent statistical paths · same N · enabled FDA agreement',
    ],
    accent: 'cream',
  },
];

export default function Slide28Case3Impact() {
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    arc: 0.55,
    n1: 1.10,
    n2: 1.55,
    n3: 2.00,
    rowsDelay: 2.40,
    durable: 3.40,
    source: 3.85,
  };

  const T = useTokens(['--violet', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  const beats = [D.n1, D.n2, D.n3];

  return (
    <SlideGrid dataCase="violet" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--violet)" delay={D.eyebrow}>CS3 · Impact</Eyebrow>
      <Headline delay={D.headline} maxChars={48}>
        A{' '}
        <span style={{ color: 'var(--violet)', fontStyle: 'italic', fontWeight: 700 }}>
          36% enrollment reduction
        </span>
        . A documented precedent. A methodology that travels.
      </Headline>

      <Viz>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: '1fr auto auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* Faint sweeping arc behind numerals */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1920 720"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <motion.path
              d="M 120,640
                 C 480,520 820,360 1240,280
                 C 1480,236 1680,254 1820,344"
              fill="none"
              stroke={tk('--violet')}
              strokeOpacity={0.10}
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={2800}
              initial={{ strokeDashoffset: 2800 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.4, ease, delay: D.arc }}
            />
          </svg>

          {/* Three numerals row */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-7)',
              alignItems: 'start',
              paddingTop: 'var(--space-3)',
            }}
          >
            {NUMBERS.map((n, i) => (
              <NumeralBlock
                key={n.big}
                n={n}
                delay={beats[i]}
                rowsDelay={D.rowsDelay + i * 0.14}
                ease={ease}
                overshoot={overshoot}
              />
            ))}
          </div>

          {/* Durable contribution callout */}
          <motion.div
            style={{
              padding: 'var(--space-4) var(--space-5)',
              borderRadius: 6,
              border: '1px solid var(--violet)',
              background: 'color-mix(in srgb, var(--violet) 9%, transparent)',
              position: 'relative',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: D.durable }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                color: 'var(--violet)',
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Durable contribution
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.86rem, 1vw, 1rem)',
                color: 'var(--cream)',
                lineHeight: 1.5,
              }}
            >
              The{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 700 }}>precedent is documented</span>.
              The methodology transfers. SPARK-ALL subsequently ended at N = 42 on a sponsor
              portfolio decision (Feb 2026) — independent of design quality or regulatory trajectory.{' '}
              <em style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>
                The FDA-agreed methodology is durable beyond any single program.
              </em>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Impact"
        tagline="Source · FDA Type A 21 Jul 2023 · NCT04817761 (status 9 Feb 2026)"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   NumeralBlock — one of three big-numeral cells
   ======================================================== */
function NumeralBlock({ n, delay, rowsDelay, ease, overshoot }) {
  const isViolet = n.accent === 'violet';
  const numColor = isViolet ? 'var(--violet)' : 'var(--cream)';
  /* The −36% numeral is the target of the cs3-pct-36 layoutId pair —
     it morphs in from the SampleSizeWaterfall callout on slide 26.
     Only this specific numeral carries the layoutId; the 3× and 2
     numerals stay on the standard scale-in entrance. */
  const layoutId = n.big === '−36%' ? 'cs3-pct-36' : undefined;
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto auto auto 1fr', rowGap: 10 }}>
      {/* Big numeral */}
      <motion.div
        layoutId={layoutId}
        className="deck-display"
        style={{
          fontSize: 'clamp(3.6rem, 6vw, 7.5rem)',
          fontWeight: 800,
          color: numColor,
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 0.92,
          fontStyle: isViolet ? 'italic' : 'normal',
        }}
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: overshoot, delay }}
      >
        {n.big}
      </motion.div>

      {/* Title */}
      <motion.div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.72rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: numColor,
          fontWeight: 700,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 0.4 }}
      >
        {n.title}
      </motion.div>

      {/* Sub */}
      <motion.div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.78rem, 0.92vw, 0.92rem)',
          color: 'var(--cream-muted)',
          fontStyle: 'italic',
          lineHeight: 1.35,
          paddingBottom: 8,
          borderBottom: '1px dashed var(--cream-hairline)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 0.55 }}
      >
        {n.sub}
      </motion.div>

      {/* Rows */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridAutoRows: 'min-content',
          rowGap: 6,
          alignContent: 'start',
        }}
      >
        {n.rows.map((r, i) => (
          <motion.li
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '14px 1fr',
              columnGap: 8,
              alignItems: 'baseline',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.74rem, 0.85vw, 0.86rem)',
              color: 'var(--cream)',
              lineHeight: 1.4,
            }}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease, delay: rowsDelay + i * 0.10 }}
          >
            <span
              aria-hidden
              style={{
                color: 'var(--violet)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
              }}
            >
              ›
            </span>
            <span>{r}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
