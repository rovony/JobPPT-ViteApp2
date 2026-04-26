// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';
import PillarArchitecture from './cs2-shared/PillarArchitecture';

/**
 * Slide 20 (manifest position) · CS2 PILLARS 1-5 — global concordance.
 *
 * Per cs2-design.md beat 6: "Pillars 1-5 promote to a horizontal chain
 * — each one a small artifact, ending in the typographic hero
 * 84.6% ≈ 84.4%. Pillar 6 demotes to a single icon-row marginalia.
 * The point: convergence of independent lines of evidence."
 *
 * Cinematic role:
 *   • T6 culmination beat 2 — PillarArchitecture stage="hero15" pulls
 *     pillars 1-5 into a horizontal chain at the top, demoting Pillar
 *     6 to a corner badge. The 84.6% / 84.4% typographic centerpiece
 *     dominates the lower half.
 */
export default function Slide18Case2Pillars15() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="CS2 · Pillars 1-5 — global concordance"
      headline={
        <>
          The clinical gap{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            disappears
          </span>{' '}
          on weight.
        </>
      }
      headlineMaxChars={36}
      subhead="A 5-fold AML-vs-CCA AUC gap collapses once dose is normalized to body weight — independent of ethnicity."
      subheadMaxChars={120}
      footerKicker="Case 02 · The convergence"
      footerSource="Source · TIBSOVO USPI popPK section · Jiang CTS 2021 (PMID 33369167) · oncologic exposure-response (PMID 36302156)"
    >
      <Pillars15Layout />
    </SlideFrame>
  );
}

function Pillars15Layout() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        rowGap: 'var(--space-4)',
        height: '100%',
        minHeight: 0,
      }}
    >
      <FrameworkRecallEyebrow />

      {/* Top — pillar architecture in horizontal-chain hero15 mode */}
      <div style={{ height: 220, minHeight: 0 }}>
        <PillarArchitecture stage="hero15" />
      </div>

      {/* Bottom — typographic 84.6% ≈ 84.4% centerpiece + bridging story */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
          columnGap: 'var(--space-6)',
          alignItems: 'center',
          minHeight: 0,
        }}
      >
        <ConcordanceHero />
        <BridgingPanel />
      </div>
    </div>
  );
}

function FrameworkRecallEyebrow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 0.3 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-4)',
        alignItems: 'baseline',
        paddingLeft: 'var(--space-3)',
        borderLeft: '3px solid var(--coral)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--coral)',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        Pillars 1 – 5 · global concordance
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.4,
        }}
      >
        Five independent lines of evidence converge on one classification — Pillar 06 (ICH E5 Apx D) seals it.
      </div>
    </motion.div>
  );
}

function ConcordanceHero() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.2, 0.7, 0.3, 1], delay: 1.2 }}
      style={{
        textAlign: 'center',
        padding: 'var(--space-5) var(--space-4)',
        position: 'relative',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cyan)',
          fontWeight: 700,
          marginBottom: 'var(--space-2)',
        }}
      >
        Pillar 4 · Bridging math · India ≈ Global
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        <PercentBlock value="84.6%" sub="Indian-population AUC₀–24h projection" tone="coral" />
        <span
          className="deck-display"
          style={{
            /* hero-num (5.5rem cap) — this glyph is the typographic
               connector between the slide's two payoff numerals; it
               must read at the same scale as them, not at standard
               card-numeral scale. */
            fontSize: 'var(--fs-card-hero-num)',
            color: 'var(--cream-muted)',
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          ≈
        </span>
        <PercentBlock value="84.4%" sub="Global pivotal-population AUC₀–24h" tone="cyan" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 2.0 }}
        style={{
          marginTop: 'var(--space-3)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-tagline)',
          fontWeight: 600,
          fontStyle: 'italic',
          color: 'var(--cream)',
          letterSpacing: '-0.005em',
          lineHeight: 1.3,
        }}
      >
        Δ ≈{' '}
        <span style={{ color: 'var(--cyan)', fontWeight: 800, fontStyle: 'normal' }}>0.2 percentage points</span>.
      </motion.div>
    </motion.div>
  );
}

function PercentBlock({ value, sub, tone }) {
  const color = tone === 'coral' ? 'var(--coral)' : 'var(--cyan)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 240 }}>
      <div
        className="deck-display"
        style={{
          /* hero-num (5.5rem cap) — 84.6% / 84.4% are the
             typographic centerpiece of the slide; standard
             card-numeral (3.8rem cap) renders too small to
             carry the convergence-to-pediatric-evidence payoff. */
          fontSize: 'var(--fs-card-hero-num)',
          fontWeight: 700,
          color,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
      <div
        className="deck-mono"
        style={{
          marginTop: 4,
          fontSize: 'var(--fs-slide-pageno)',
          color: 'var(--cream-muted)',
          textAlign: 'center',
          lineHeight: 1.25,
          letterSpacing: '0.02em',
        }}
      >
        {sub}
      </div>
    </div>
  );
}

/* ─── Bridging panel — five mini-evidence rows ─────────────────── */
const PILLAR_ROWS = [
  ['P1', 'PK linear · 200–1200 mg', 'AGILE'],
  ['P2', 'No genetic CYP3A4 ethnic gating', 'PharmGKB'],
  ['P3', 'PD plateau ≥ 500 mg', '2-HG'],
  ['P4', '5× AML/CCA gap → Δ 0.2pp', 'popPK'],
  ['P5', 'Flat E-R · 8 yr · 1,281 subj', 'Pillar 5'],
];

function BridgingPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: 1.6 }}
      style={{
        paddingLeft: 'var(--space-5)',
        paddingRight: 0,
        paddingTop: 'var(--space-3)',
        paddingBottom: 'var(--space-3)',
        borderLeft: '3px solid var(--coral)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--coral)',
          fontWeight: 700,
          marginBottom: 'var(--space-2)',
        }}
      >
        Five lines of evidence — converging
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {PILLAR_ROWS.map(([id, label, src], i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1], delay: 1.8 + i * 0.08 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              columnGap: 'var(--space-3)',
              alignItems: 'baseline',
              padding: '4px 0',
              borderBottom: i < 4 ? '1px dashed color-mix(in srgb, var(--cream-hairline) 70%, transparent)' : 'none',
            }}
          >
            <div
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cyan)',
                fontWeight: 700,
                width: 24,
              }}
            >
              {id}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-slide-kicker)',
                color: 'var(--cream)',
                lineHeight: 1.3,
              }}
            >
              {label}
            </div>
            <div
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cream-faint)',
                letterSpacing: '0.02em',
              }}
            >
              {src}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay: 2.6 }}
        style={{
          marginTop: 'var(--space-3)',
          paddingTop: 'var(--space-2)',
          borderTop: '1px solid var(--cream-hairline)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-kicker)',
          color: 'var(--cream)',
          fontStyle: 'italic',
        }}
      >
        Five independent lines{' '}
        <ArrowRight size={14} color="var(--coral)" strokeWidth={2.5} />{' '}
        <span style={{ fontWeight: 700, fontStyle: 'normal', color: 'var(--coral)' }}>
          one converging classification.
        </span>
      </motion.div>
    </motion.div>
  );
}
