import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 17 · CS2 · The Build — six pillars converging into one waiver package.
 *
 * Structure:
 *   1. Eyebrow + headline + subhead
 *   2. 3×2 pillar grid (numbered circle badge + title + 3 evidence rows)
 *   3. Convergence band: 6 → 1 → CDSCO (with dates)
 *   4. Synthesis line: prose left + "0 new patients" hero numeral right
 *
 * No d3 / orbits / pulses — pure structured cards for legibility.
 */

const PILLARS = [
  {
    n: 1,
    title: 'Population PK',
    items: [
      <><b>Jiang CTS 2021</b> · N = 253 pooled popPK</>,
      <><b>Yue EJCP 2024</b> · Chinese R/R AML</>,
      <>Race not a significant covariate</>,
    ],
  },
  {
    n: 2,
    title: 'Exposure–Response',
    items: [
      <><b>ClarIDHy</b> (AG120-C-005) · N = 187</>,
      <><b>AGILE</b> (AG120-C-009) · ND-AML</>,
      <>E–R conserved across subgroups</>,
    ],
  },
  {
    n: 3,
    title: 'Intrinsic Factors',
    items: [
      <>Bayesian 9-covariate · Servier internal</>,
      <>Dedicated <b>hepatic + renal</b> studies</>,
      <>PharmGKB DME polymorphisms</>,
    ],
  },
  {
    n: 4,
    title: 'Extrinsic Factors',
    items: [
      <><b>CYP3A4 DDI</b> program</>,
      <>Strong inhibitor: +56 % AUC · +47 % C<sub>max</sub></>,
      <>Label dose-reduction → 250 mg QD</>,
    ],
  },
  {
    n: 5,
    title: 'Safety Database',
    items: [
      <><b>PSUR Nov 2024</b> · 15,867 pts global</>,
      <>1,281 CT subjects · 42+ countries</>,
      <>FDA MAUDE · EMA · PMDA</>,
    ],
  },
  {
    n: 6,
    title: 'Mechanism of Action',
    items: [
      <><b>Dang Nature 2009</b> · IDH1 R132 somatic</>,
      <><b>Figueroa Cancer Cell 2010</b> · 2-HG</>,
      <>ICH E5 App D · 9 of 9 criteria</>,
    ],
  },
];

export default function Slide17Case2Build() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.60,
    pillarBase: 0.80,
    converge: 1.50,
    synthesis: 1.90,
    source: 2.20,
  };

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cyan)" delay={D.eyebrow}>CS2 · The Build</Eyebrow>
      <Headline delay={D.headline} maxChars={36}>
        The evidence was{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>
          assembled
        </span>{' '}
        — not generated.
      </Headline>
      <Subhead delay={D.subhead} maxChars={110}>
        Four pivotal trials · a decade of peer-reviewed ivosidenib literature · multi-agency
        post-marketing surveillance. Six streams convergent on one waiver package.
      </Subhead>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: '1fr auto auto', rowGap: 'var(--space-4)', minHeight: 0 }}>
      {/* ═══════════ 3×2 PILLAR GRID ═══════════ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
          gap: 'var(--space-4)',
          minHeight: 0,
        }}
      >
        {PILLARS.map((p, i) => (
          <PillarCard key={p.n} p={p} delay={D.pillarBase + i * 0.08} />
        ))}
      </div>

      {/* ═══════════ Convergence band ═══════════ */}
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          alignItems: 'center',
          columnGap: 'var(--space-6)',
          padding: 'var(--space-3) var(--space-8)',
          border: '1px solid var(--cream-hairline)',
          borderRadius: 'var(--radius-md)',
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--cyan) 4%, transparent), color-mix(in srgb, var(--cyan) 14%, transparent) 50%, color-mix(in srgb, var(--cyan) 4%, transparent))',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.converge }}
      >
        <ConvergeCell label="Evidence streams" value="6" sub="independent pillars" />
        <ConvergeArrow />
        <ConvergeCell label="Integrated package" value="1" sub="cross-referenced waiver dossier" />
        <ConvergeArrow />
        <ConvergeCell label="Submitted" value="CDSCO" sub="14 May 2025" valueSmall />
      </motion.div>

      {/* ═══════════ Synthesis line ═══════════ */}
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          columnGap: 'var(--space-8)',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--cream-hairline)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.synthesis }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.82rem, 0.95vw, 1.02rem)',
            lineHeight: 1.42,
            color: 'var(--cream)',
            maxWidth: '80ch',
          }}
        >
          <span style={{ color: 'var(--cream-muted)' }}>
            Four pivotal Phase 1–3 trials · a decade of peer-reviewed ivosidenib literature · FDA MAUDE ·
            EMA EudraVigilance · PMDA surveillance. Assembled as a complete six-pillar package —{' '}
          </span>
          <strong style={{ color: 'var(--cream)', fontWeight: 700 }}>
            with zero new Indian patients enrolled before approval.
          </strong>
        </div>

        <div style={{ textAlign: 'right', lineHeight: 1 }}>
          <div
            className="deck-display"
            style={{
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              fontWeight: 800,
              color: 'var(--cyan)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            0
          </div>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              color: 'var(--cream-muted)',
              marginTop: 2,
            }}
          >
            new patients
          </div>
        </div>
      </motion.div>

        </div>
      </Viz>

      <Footer
        kicker="Case 02 · The build"
        tagline="Source · CS2 Reading Pts 1–3 · CDSCO MA 14 May 2025"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   PillarCard — numbered circle badge (top-left) + title +
   3 evidence rows with dashed separators and a leading dot.
   ======================================================== */
function PillarCard({ p, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        position: 'relative',
        padding: '14px 18px 14px 70px',
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--cyan)',
        borderRadius: 8,
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {/* Numbered circle badge */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 16,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid var(--cyan)',
          background: 'color-mix(in srgb, var(--cyan) 10%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: 'var(--cyan)',
        }}
      >
        {p.n}
      </div>

      {/* Title */}
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(0.95rem, 1.1vw, 1.2rem)',
          fontWeight: 700,
          color: 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1.15,
          marginBottom: 6,
        }}
      >
        {p.title}
      </div>

      {/* Evidence list */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {p.items.map((it, j) => (
          <li
            key={j}
            style={{
              position: 'relative',
              padding: '4px 0 4px 14px',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.72rem, 0.82vw, 0.86rem)',
              lineHeight: 1.35,
              color: 'var(--cream-muted)',
              borderBottom: j === p.items.length - 1 ? 'none' : '1px dashed var(--cream-ghost)',
            }}
          >
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: 2,
                top: 4,
                color: 'var(--cyan)',
                fontWeight: 700,
              }}
            >
              ·
            </span>
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ========================================================
   Convergence band cell
   ======================================================== */
function ConvergeCell({ label, value, sub, valueSmall }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          color: 'var(--cream-muted)',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: valueSmall ? 'clamp(1.1rem, 1.6vw, 1.8rem)' : 'clamp(1.8rem, 2.8vw, 3rem)',
          fontWeight: 700,
          color: 'var(--cyan)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        className="deck-display italic"
        style={{
          fontSize: 'clamp(0.72rem, 0.85vw, 0.92rem)',
          color: 'var(--cream)',
          marginTop: 4,
          fontWeight: 400,
        }}
      >
        {sub}
      </div>
    </div>
  );
}

function ConvergeArrow() {
  return (
    <div
      className="deck-display"
      style={{
        fontSize: 'clamp(1.4rem, 2.2vw, 2.4rem)',
        color: 'var(--cyan)',
        opacity: 0.7,
        fontWeight: 600,
      }}
    >
      →
    </div>
  );
}