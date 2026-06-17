// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Headline } from '@/components/deck/SlideParts';
import { useDeck } from '@/lib/deck-store';
import React from 'react';

const EASE = [0.2, 0.7, 0.3, 1];

const RECEIPTS = [
  { id: '01', kicker: 'Adult anchor', hero: '380', unit: 'adults', lines: ['6 studies', '3,126 PK observations'] },
  { id: '02', kicker: 'PopPK bridge', hero: '2-cmt', unit: 'oral', lines: ['absorption + lag', 'CL ∝ WT^0.75 · V ∝ WT^1.0'] },
  { id: '03', kicker: 'Simulation', hero: 'AUC', unit: 'by weight', lines: ['Predict pediatric exposure', 'Target: adult AUCss range'] },
  { id: '04', kicker: 'Trial PK', hero: '39', unit: 'children', lines: ['211 sparse PK observations', 'ages 8 to <18 years'] },
  { id: '05', kicker: 'Exposure match', hero: '−3%', unit: 'low dose', lines: ['+0.3% high dose', 'within adult AUCss range'], isHero: true },
];

export default function Cs1Bracket() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid
      dataCase="coral"
      areas={STANDARD_AREAS}
      rowSizes="auto auto auto auto minmax(31rem, 1fr) auto"
    >
      <StaticEyebrow>Case 01 · Framework and exposure match</StaticEyebrow>

      <Headline delay={0.25} maxChars={62}>
        The dose was defended by{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          exposure matching, not a repeat efficacy trial.
        </span>
      </Headline>

      <StaticSubhead>
        Adult anchor → prespecified PopPK bridge → pediatric exposure confirmation.
      </StaticSubhead>

      <div style={{ gridArea: 'viz', width: '100%', height: '100%', minHeight: 0, minWidth: 0 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'auto minmax(0, 1fr)',
            height: '100%',
            gap: 'var(--space-4)',
            paddingTop: 'var(--space-1)',
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(11rem, 100%), 1fr))',
              gap: 'var(--space-3)',
            }}
          >
            {RECEIPTS.map((item) => (
              <ReceiptCard key={item.id} item={item} />
            ))}
          </div>

          <div
            style={{
              minHeight: 0,
              overflow: 'hidden',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--panel) 56%, transparent)',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-4)',
            }}
          >
            <div style={{
              display: 'flex',
              gap: 'clamp(var(--space-8), 8vw, var(--space-12, 6rem))',
              alignItems: 'baseline',
            }}>
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.85, ease: EASE }}
                style={{ textAlign: 'center' }}
              >
                <div className="deck-display" style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: 'var(--case)',
                  fontWeight: 700,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '-0.02em',
                }}>
                  −3%
                </div>
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  color: 'var(--cream-faint)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  marginTop: 'var(--space-2)',
                  fontWeight: 700,
                }}>
                  Low dose
                </div>
                <div className="deck-mono" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  color: 'var(--cream-muted)',
                  letterSpacing: 'var(--ls-mono)',
                  marginTop: 'var(--space-1)',
                }}>
                  AUCss 4.82 vs 4.98 μg·h/mL
                </div>
              </motion.div>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 1.10, ease: EASE }}
                style={{ textAlign: 'center' }}
              >
                <div className="deck-display" style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: 'var(--case)',
                  fontWeight: 700,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '-0.02em',
                }}>
                  +0.3%
                </div>
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  color: 'var(--cream-faint)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  marginTop: 'var(--space-2)',
                  fontWeight: 700,
                }}>
                  High dose
                </div>
                <div className="deck-mono" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  color: 'var(--cream-muted)',
                  letterSpacing: 'var(--ls-mono)',
                  marginTop: 'var(--space-1)',
                }}>
                  AUCss 9.15 vs 9.12 μg·h/mL
                </div>
              </motion.div>
            </div>

            <DensityCurve reduced={reduced} />

            <div className="deck-mono" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              color: 'var(--cream-faint)',
              letterSpacing: 'var(--ls-mono)',
              textAlign: 'center',
              opacity: 0.75,
            }}>
              Illustrative AUCss densities · means per Okour 2023 · not extracted figure
            </div>
          </div>
        </div>
      </div>

      <StaticFooter
        kicker="12 · CS1 · FRAMEWORK & MATCH"
        tagline="Adult anchor → PopPK bridge → pediatric exposure match."
        source="Source · Okour M et al. J Clin Pharmacol 2023;63(5):593–603 · PMID 36579617"
      />
    </SlideGrid>
  );
}

function DensityCurve({ reduced }) {
  const w = 500;
  const h = 160;
  const cx = w / 2;

  const adultPath = buildDensityPath(cx - 4, 72, w, h);
  const pedPath = buildDensityPath(cx + 2, 68, w, h);

  return (
    <motion.svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: '100%', maxWidth: '36rem', height: 'auto', minHeight: 0 }}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 1.60, ease: EASE }}
    >
      <motion.path
        d={adultPath}
        fill="none"
        stroke="var(--cream-faint, #6b6560)"
        strokeWidth="2"
        opacity="0.5"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 1.70, ease: EASE }}
      />
      <motion.path
        d={adultPath}
        fill="color-mix(in srgb, var(--cream-faint, #6b6560) 8%, transparent)"
        stroke="none"
        opacity="0.3"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 2.20, ease: EASE }}
      />

      <motion.path
        d={pedPath}
        fill="none"
        stroke="var(--case, #e07a5f)"
        strokeWidth="2.5"
        opacity="0.85"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 1.90, ease: EASE }}
      />
      <motion.path
        d={pedPath}
        fill="color-mix(in srgb, var(--case, #e07a5f) 12%, transparent)"
        stroke="none"
        opacity="0.4"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 2.40, ease: EASE }}
      />

      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 2.60, ease: EASE }}
      >
        <line x1="20" y1={h - 18} x2="40" y2={h - 18} stroke="var(--cream-faint, #6b6560)" strokeWidth="2" opacity="0.5" />
        <text x="46" y={h - 14} fill="var(--cream-faint, #6b6560)" style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>ADULT</text>
        <line x1="110" y1={h - 18} x2="130" y2={h - 18} stroke="var(--case, #e07a5f)" strokeWidth="2.5" opacity="0.85" />
        <text x="136" y={h - 14} fill="var(--case, #e07a5f)" style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>PEDIATRIC</text>
      </motion.g>
    </motion.svg>
  );
}

function buildDensityPath(center, spread, w, h) {
  const pts = [];
  const steps = 80;
  const baseline = h - 30;
  const peakH = h * 0.72;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = 30 + t * (w - 60);
    const dx = (x - center) / spread;
    const y = baseline - peakH * Math.exp(-0.5 * dx * dx);
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(' ');
}

function StaticEyebrow({ children }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        gridArea: 'eyebrow',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        alignSelf: 'end',
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        fontWeight: 600,
        color: 'var(--case)',
      }}
    >
      <span style={{ width: 'clamp(2rem, 5vw, 3rem)', height: '1px', background: 'var(--case)' }} />
      {children}
    </div>
  );
}

function StaticSubhead({ children }) {
  return (
    <p
      className="deck-display italic"
      style={{
        gridArea: 'subhead',
        fontSize: 'clamp(1rem, min(1.5vw, 2.5vh), 1.5rem)',
        lineHeight: 'var(--lh-snug)',
        color: 'var(--cream-muted)',
        fontWeight: 400,
        maxWidth: '96ch',
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function StaticFooter({ kicker, tagline, source }) {
  const { index, total } = useDeck();
  return (
    <div
      style={{
        gridArea: 'footer',
        alignSelf: 'end',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-6)' }}>
        <span className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-kicker)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}>
          {kicker}
        </span>
        <span className="deck-display italic" style={{ flex: 1, textAlign: 'right', fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream-muted)', fontWeight: 500 }}>
          {tagline}
        </span>
        <span className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
      <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)', lineHeight: 1.45 }}>
        {source}
      </span>
    </div>
  );
}

function ReceiptCard({ item }) {
  return (
    <div
      style={{
        position: 'relative',
        minWidth: 0,
        overflow: 'hidden',
        border: item.isHero ? '1px solid color-mix(in srgb, var(--case) 40%, transparent)' : '1px solid var(--cream-hairline)',
        borderTop: item.isHero ? '3px solid var(--case)' : '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-lg)',
        background: item.isHero
          ? 'linear-gradient(180deg, color-mix(in srgb, var(--case) 10%, transparent), color-mix(in srgb, var(--panel) 48%, transparent))'
          : 'color-mix(in srgb, var(--panel) 65%, transparent)',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 'var(--space-2)',
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: item.isHero ? 'var(--case)' : 'var(--cream-faint)',
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}>
        {item.id} · {item.kicker}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
        <span className="deck-display" style={{
          fontSize: item.isHero ? 'var(--fs-slide-display)' : 'var(--fs-slide-headline)',
          color: item.isHero ? 'var(--case)' : 'var(--cream)',
          fontWeight: 700,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {item.hero}
        </span>
        <span className="deck-body" style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)' }}>
          {item.unit}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {item.lines.map((line) => (
          <div key={line} className="deck-body" style={{
            fontSize: 'var(--fs-slide-subhead)',
            color: 'var(--cream)',
            opacity: 0.82,
            lineHeight: 1.3,
          }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
