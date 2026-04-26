import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS2 · Disease background — IDH1 mechanism + epidemiology.
 *
 * 4-column grid:
 *   ROW 1: MOA (cols 1–2) | AML card (col 3) | CCA card (col 4)
 *   ROW 2: R132 hotspot | Somatic | R/R AML OS | 2L+ CCA OS
 *   ROW 3: Anchor (cols 1–2) | Citations (cols 3–4)
 *
 * MOA panel preserves skeletal metabolite SVGs (α-KG, 2-HG)
 * and ivosidenib blocker arrow from v2 reference slide.
 *
 * {{VERIFY: 6–10% AML and ~13% CCA — R2R-02 §BG-1}}
 */

const EASE = [0.2, 0.7, 0.3, 1];
const D = {
  moa: 0.40,
  stat1: 0.60,
  stat2: 0.75,
  strip: 1.10,
  anchor: 1.50,
};

export default function CS2DiseaseBackground() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="Case 02 · Background — Disease"
      headline={
        <>
          IDH1-mutant cancers: small populations,{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>
            no targeted option before ivosidenib.
          </span>
        </>
      }
      headlineMaxChars={44}
      footerKicker="Case 02 · Disease"
      footerSource="Dang et al. Nature 2009 · Figueroa et al. Cancer Cell 2010"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gridTemplateRows: '1fr',
          columnGap: 'var(--space-4)',
          minHeight: 0,
        }}
      >
        {/* ═══ LEFT — MOA panel ═══ */}
        <MOAPanel />

        {/* ═══ RIGHT — 6 dashboard widgets (2 cols × 3 rows) ═══ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: 'var(--space-3)',
            minHeight: 0,
          }}
        >
          <StatCard
            number="6–10"
            unit="%"
            label="Acute myeloid leukemia"
            qualifier="IDH1-mutated prevalence across AML subtypes"
            meta="~20 K new AML/yr US · 1,200–2,000 IDH1+"
            delay={D.stat1}
          />
          <StatCard
            number="~13"
            unit="%"
            label="Cholangiocarcinoma"
            qualifier="of intrahepatic CCA harbor IDH1 mutations"
            meta="~8 K new CCA/yr US · ~1,000 IDH1+"
            delay={D.stat2}
          />
          <FactStrip />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MOA PANEL — cols 1–2
   Preserves skeletal metabolite SVGs from v2 reference.
   Normal → Mutant (with blocker) → Consequence
   ══════════════════════════════════════════════════════════════════ */

function MOAPanel() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: D.moa }}
      style={{
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'var(--space-4)',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <PanelKicker color="var(--cyan)">Mechanism — mutant IDH1 pathway</PanelKicker>

      <MutantReactionRow reduced={reduced} />

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: D.anchor }}
        style={{
          borderTop: '1px solid var(--cream-hairline)',
          paddingTop: 'var(--space-3)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.75rem, min(1vw, 1.5vh), 0.92rem)',
            color: 'var(--cream-muted)',
            lineHeight: 1.55,
          }}
        >
          Mutant IDH1 R132 gains a new enzymatic activity that converts α-KG
          to the oncometabolite 2-HG at 100× normal levels. 2-HG competitively
          inhibits TET2 and KDM histone demethylases, driving DNA and histone
          hypermethylation that blocks myeloid differentiation. Mechanism
          established 2009–2010; ivosidenib followed in 2018, reducing 2-HG
          by 98% and restoring the differentiation programme.
        </div>
        <span
          className="deck-mono"
          style={{
            display: 'block',
            marginTop: 'var(--space-2)',
            fontSize: 'clamp(0.6rem, min(0.8vw, 1.2vh), 0.75rem)',
            letterSpacing: '0.04em',
            color: 'var(--cream-faint)',
          }}
        >
          Dang 2009 · Figueroa 2010 · Xu 2011 · DiNardo 2018 · FDA label
        </span>
      </motion.div>
    </motion.div>
  );
}

function PanelKicker({ color, children }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        fontSize: 'clamp(0.65rem, min(1vw, 1.5vh), 0.9rem)',
        letterSpacing: 'var(--ls-mono-wide)',
        color,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

function ReactionRow({ label, reactant, enzyme, product, cofactor, muted }) {
  const inkColor = muted ? 'var(--cream-muted)' : 'var(--cream)';
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-3)',
        alignItems: 'center',
        opacity: muted ? 0.85 : 1,
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          minWidth: 56,
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: inkColor,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontStyle: 'italic' }}>{reactant}</span>
        <ArrowOver enzyme={enzyme} />
        <span style={{ fontStyle: 'italic', fontWeight: 600 }}>{product}</span>
        {cofactor && (
          <span
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-card-meta)',
              color: 'var(--cream-muted)',
              opacity: 0.75,
              marginLeft: 'auto',
            }}
          >
            {cofactor}
          </span>
        )}
      </div>
    </div>
  );
}

function ArrowOver({ enzyme }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        margin: '0 6px',
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-card-meta)',
          color: 'var(--cream-muted)',
          fontWeight: 700,
          letterSpacing: 'var(--ls-mono-wide)',
          lineHeight: 1,
        }}
      >
        {enzyme}
      </span>
      <svg viewBox="0 0 60 10" width={60} height={10} aria-hidden style={{ display: 'block' }}>
        <line x1="2" y1="5" x2="50" y2="5" stroke="currentColor" strokeWidth={1.4} style={{ color: 'var(--cream-muted)' }} />
        <polygon points="50,1 58,5 50,9" fill="currentColor" style={{ color: 'var(--cream-muted)' }} />
      </svg>
    </span>
  );
}

/* ── Mutant reaction — single SVG schematic with flowing particles ── */

const PARTICLE_R = 2.8;
const PARTICLE_EASE = 'linear';

const PARTICLES = {
  down: [
    { delay: 1.4, duration: 2.2 },
    { delay: 2.0, duration: 2.2 },
    { delay: 2.6, duration: 2.2 },
  ],
  blocked: [
    { delay: 1.7, duration: 1.6 },
    { delay: 2.3, duration: 1.6 },
  ],
};

function MutantReactionRow({ reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: D.moa + 0.3 }}
      style={{
        flex: '1 1 0%',
        minHeight: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <MutantPathwaySVG reduced={reduced} />
      </div>
    </motion.div>
  );
}

function MutantPathwaySVG({ reduced }) {
  return (
    <svg
      viewBox="0 0 380 620"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden
    >
      {/* ═══════════════════════════════════════════════════════════════
          5-STEP VERTICAL PATHWAY — IDH1 mutant mechanism
          ═══════════════════════════════════════════════════════════════ */}

      {/* ── STEP 1: Isocitrate box (TCA context, dimmed) ── */}
      <rect x="90" y="10" width="200" height="50" rx="8"
            fill="none" stroke="var(--cream-muted)" strokeWidth="1.2" opacity="0.5" />
      <text x="190" y="32" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="16" fontWeight="600" fill="var(--cream-muted)" opacity="0.6">
        Isocitrate
      </text>
      <text x="190" y="48" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.5" fill="var(--cream-faint)" opacity="0.5">
        TCA CYCLE
      </text>

      {/* Arrow 1: Isocitrate → α-KG (dimmed, normal pathway) */}
      <line x1="190" y1="62" x2="190" y2="92" stroke="var(--cream-muted)" strokeWidth="1.2" opacity="0.4" />
      <polygon points="186,90 190,100 194,90" fill="var(--cream-muted)" opacity="0.4" />
      <text x="210" y="82" textAnchor="start"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1" fill="var(--cream-faint)" opacity="0.5">
        WT IDH1
      </text>

      {/* ── STEP 2: α-KG compartment (central node) ── */}
      <circle cx="190" cy="130" r="40" fill="none" stroke="var(--cyan)" strokeWidth="2" />
      <text x="190" y="126" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="20" fontWeight="700" fill="var(--cream)">
        α-KG
      </text>
      <text x="190" y="146" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.2" fill="var(--cream-muted)">
        SUBSTRATE
      </text>

      {/* Arrow 2: α-KG → 2-HG (MUTANT pathway — main flow) */}
      <line x1="190" y1="172" x2="190" y2="230" stroke="var(--cyan)" strokeWidth="2" />
      <polygon points="185,228 190,240 195,228" fill="var(--cyan)" />

      {/* Enzyme label — right of arrow */}
      <text x="220" y="190" textAnchor="start"
            fontFamily="var(--font-mono)" fontSize="11" fontWeight="700"
            letterSpacing="0.06em" fill="var(--cream)">
        IDH1<tspan fontSize="8" dy="-3">R132</tspan>
      </text>
      <text x="220" y="206" textAnchor="start"
            fontFamily="var(--font-mono)" fontSize="9" fontWeight="600"
            letterSpacing="0.04em" fill="var(--cream-muted)">
        gain-of-function
      </text>

      {/* Blocker bars — ivosidenib */}
      <line x1="172" y1="204" x2="208" y2="204" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
      <line x1="172" y1="213" x2="208" y2="213" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
      <text x="168" y="200" textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="11" fontWeight="800"
            letterSpacing="0.08em" fill="var(--amber)">
        IVOSIDENIB
      </text>
      <text x="168" y="218" textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="10" fontWeight="700"
            letterSpacing="0.1em" fill="var(--amber)" opacity="0.8">
        BLOCKS
      </text>

      {/* ── STEP 3: 2-HG compartment (oncometabolite, dashed = pathological) ── */}
      <circle cx="190" cy="275" r="40" fill="none"
              stroke="var(--amber)" strokeWidth="2" strokeDasharray="5 4" />
      <text x="190" y="269" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="20" fontWeight="700" fill="var(--cream)">
        2-HG
      </text>
      <text x="190" y="287" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.2" fill="var(--amber)">
        ONCOMETABOLITE
      </text>
      <text x="190" y="300" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.5" fill="var(--cream-faint)">
        100× normal levels
      </text>

      {/* ── STEP 4: 2-HG inhibits TET2 + KDMs (branching arrows) ── */}

      {/* Left branch: → TET2 */}
      <line x1="155" y1="300" x2="85" y2="370" stroke="var(--amber)" strokeWidth="1.6" />
      <polygon points="80,367 83,377 90,370" fill="var(--amber)" />

      <rect x="15" y="375" width="140" height="65" rx="8"
            fill="var(--bg)" />
      <rect x="15" y="375" width="140" height="65" rx="8"
            fill="var(--amber)" fillOpacity="0.08"
            stroke="var(--amber)" strokeWidth="1" />
      <text x="85" y="395" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.5" fill="var(--amber)">
        INHIBITS TET2
      </text>
      <text x="85" y="412" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fill="var(--cream)">
        DNA demethylation
      </text>
      <text x="85" y="427" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fill="var(--cream)">
        blocked → hypermethylation
      </text>

      {/* Right branch: → KDMs */}
      <line x1="225" y1="300" x2="295" y2="370" stroke="var(--amber)" strokeWidth="1.6" />
      <polygon points="290,367 297,377 300,370" fill="var(--amber)" />

      <rect x="225" y="375" width="140" height="65" rx="8"
            fill="var(--bg)" />
      <rect x="225" y="375" width="140" height="65" rx="8"
            fill="var(--amber)" fillOpacity="0.08"
            stroke="var(--amber)" strokeWidth="1" />
      <text x="295" y="395" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.5" fill="var(--amber)">
        INHIBITS KDMs
      </text>
      <text x="295" y="412" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fill="var(--cream)">
        Histone demethylases
      </text>
      <text x="295" y="427" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fill="var(--cream)">
        blocked → histone marks
      </text>

      {/* ── STEP 5: Consequence — converging to blocked differentiation ── */}
      <line x1="85" y1="442" x2="140" y2="490" stroke="var(--cream-muted)" strokeWidth="1.2" />
      <line x1="295" y1="442" x2="240" y2="490" stroke="var(--cream-muted)" strokeWidth="1.2" />

      <rect x="55" y="490" width="270" height="60" rx="10"
            fill="var(--bg)" />
      <rect x="55" y="490" width="270" height="60" rx="10"
            fill="var(--amber)" fillOpacity="0.12"
            stroke="var(--amber)" strokeWidth="1.4" />
      <text x="190" y="514" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="var(--amber)">
        DIFFERENTIATION BLOCKED
      </text>
      <text x="190" y="535" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="11" fill="var(--cream)">
        Immature blast accumulation → AML / CCA
      </text>

      {/* ── FOOTER: Ivosidenib reversal chip ── */}
      <line x1="60" y1="565" x2="320" y2="565"
            stroke="var(--cream-faint)" strokeWidth="0.5" opacity="0.4" />
      <rect x="75" y="575" width="230" height="38" rx="6"
            fill="var(--bg)" />
      <rect x="75" y="575" width="230" height="38" rx="6"
            fill="var(--cyan)" fillOpacity="0.08"
            stroke="var(--cyan)" strokeWidth="1" />
      <text x="190" y="592" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.5" fill="var(--cyan)">
        IVOSIDENIB REVERSAL
      </text>
      <text x="190" y="606" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="9.5" fill="var(--cream)">
        ↓ 2-HG by 98% · restores differentiation
      </text>

      {/* ═══════════ Flowing particles ═══════════ */}

      {/* α-KG → 2-HG flow (cyan, down the main arrow) */}
      {!reduced && PARTICLES.down.map((p, i) => (
        <motion.circle
          key={`pd-${i}`}
          cx={190} r={PARTICLE_R} fill="var(--cyan)"
          initial={{ cy: 172, opacity: 0 }}
          animate={{
            cy: [172, 172, 232, 232],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: PARTICLE_EASE,
            times: [0, 0.08, 0.92, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* Blocked particles — hit blocker and fade (amber) */}
      {!reduced && PARTICLES.blocked.map((p, i) => (
        <motion.circle
          key={`pb-${i}`}
          cx={190} r={PARTICLE_R} fill="var(--amber)"
          initial={{ cy: 172, opacity: 0 }}
          animate={{
            cy: [172, 172, 200, 200],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: PARTICLE_EASE,
            times: [0, 0.1, 0.7, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* 2-HG → TET2 flow (amber, left branch) */}
      {!reduced && [
        { delay: 2.0, duration: 2.0 },
        { delay: 2.8, duration: 2.0 },
      ].map((p, i) => (
        <motion.circle
          key={`pt-${i}`}
          r={PARTICLE_R} fill="var(--amber)"
          initial={{ cx: 155, cy: 300, opacity: 0 }}
          animate={{
            cx: [155, 155, 85, 85],
            cy: [300, 300, 370, 370],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: PARTICLE_EASE,
            times: [0, 0.1, 0.85, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* 2-HG → KDM flow (amber, right branch) */}
      {!reduced && [
        { delay: 2.2, duration: 2.0 },
        { delay: 3.0, duration: 2.0 },
      ].map((p, i) => (
        <motion.circle
          key={`pk-${i}`}
          r={PARTICLE_R} fill="var(--amber)"
          initial={{ cx: 225, cy: 300, opacity: 0 }}
          animate={{
            cx: [225, 225, 295, 295],
            cy: [300, 300, 370, 370],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: PARTICLE_EASE,
            times: [0, 0.1, 0.85, 1],
            repeat: Infinity,
          }}
        />
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════
   METABOLITE SVGs — α-KG and 2-HG skeletal structures.
   Differ only at C2: ketone (=O) vs hydroxyl (—OH).
   C2 highlighted in cyan.
   ══════════════════════════════════════════════════════════════════ */

function AlphaKG({ width = 160 }) {
  return (
    <svg
      viewBox="0 0 240 90"
      width={width}
      role="img"
      aria-label="alpha-ketoglutarate skeletal structure"
      style={{ display: 'block', color: 'var(--cream)' }}
    >
      <Backbone />
      <CarboxylLeft />
      <CarboxylRight />
      <g style={{ color: 'var(--cyan)' }}>
        <line x1="76" y1="33" x2="76" y2="14" stroke="currentColor" strokeWidth={1.4} />
        <line x1="80" y1="33" x2="80" y2="16" stroke="currentColor" strokeWidth={1.4} />
        <text x="76" y="9" textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, fill: 'currentColor' }}>O</text>
      </g>
    </svg>
  );
}

function TwoHG({ width = 160 }) {
  return (
    <svg
      viewBox="0 0 240 90"
      width={width}
      role="img"
      aria-label="2-hydroxyglutarate skeletal structure"
      style={{ display: 'block', color: 'var(--cream)' }}
    >
      <Backbone />
      <CarboxylLeft />
      <CarboxylRight />
      <g style={{ color: 'var(--cyan)' }}>
        <line x1="76" y1="33" x2="76" y2="14" stroke="currentColor" strokeWidth={1.4} />
        <text x="76" y="9" textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, fill: 'currentColor' }}>OH</text>
      </g>
    </svg>
  );
}

function Backbone() {
  return (
    <g stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
      <line x1="50" y1="50" x2="76" y2="35" />
      <line x1="76" y1="35" x2="102" y2="50" />
      <line x1="102" y1="50" x2="128" y2="35" />
      <line x1="128" y1="35" x2="154" y2="50" />
    </g>
  );
}

function CarboxylLeft() {
  return (
    <g>
      <line x1="50" y1="50" x2="28" y2="50" stroke="currentColor" strokeWidth={1.4} />
      <text x="22" y="54" textAnchor="end" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, fill: 'currentColor' }}>HO</text>
      <line x1="50" y1="52" x2="50" y2="74" stroke="currentColor" strokeWidth={1.4} />
      <line x1="54" y1="52" x2="54" y2="72" stroke="currentColor" strokeWidth={1.4} />
      <text x="52" y="86" textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, fill: 'currentColor' }}>O</text>
    </g>
  );
}

function CarboxylRight() {
  return (
    <g>
      <line x1="154" y1="50" x2="176" y2="50" stroke="currentColor" strokeWidth={1.4} />
      <text x="182" y="54" textAnchor="start" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, fill: 'currentColor' }}>OH</text>
      <line x1="154" y1="52" x2="154" y2="74" stroke="currentColor" strokeWidth={1.4} />
      <line x1="150" y1="52" x2="150" y2="72" stroke="currentColor" strokeWidth={1.4} />
      <text x="152" y="86" textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, fill: 'currentColor' }}>O</text>
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════
   STAT CARD — big-numeral editorial register
   ══════════════════════════════════════════════════════════════════ */

function StatCard({ number, unit, label, qualifier, meta, delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      style={{
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      <div style={{
        flex: '1 1 0%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}>
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(3rem, min(6vw, 9vh), 5.5rem)',
            lineHeight: 0.9,
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.03em',
            color: 'var(--cream)',
          }}
        >
          {number}
          <span
            style={{
              fontSize: '0.38em',
              fontWeight: 500,
              color: 'var(--cyan)',
              marginLeft: '0.1em',
              verticalAlign: 'super',
            }}
          >
            {unit}
          </span>
        </div>

        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.75rem, min(1.2vw, 1.8vh), 1.05rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cyan)',
            fontWeight: 700,
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, min(1.3vw, 2vh), 1.2rem)',
            lineHeight: 1.45,
            color: 'var(--cream-muted)',
          }}
        >
          {qualifier}
        </div>
      </div>

      {meta && (
        <div
          className="deck-mono"
          style={{
            marginTop: 'var(--space-3)',
            paddingTop: 'var(--space-3)',
            borderTop: '1px solid var(--cream-hairline)',
            fontSize: 'clamp(0.72rem, min(1vw, 1.5vh), 0.92rem)',
            letterSpacing: '0.04em',
            color: 'var(--cream-faint)',
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          {meta}
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FACT STRIP — row 2, four 1×1 cells
   No borders. Mono eyebrow + serif fact + mono qualifier.
   Hairline dividers between cells.
   ══════════════════════════════════════════════════════════════════ */

const FACTS = [
  { eyebrow: 'R132 hotspot', fact: '~95%+', qualifier: 'of IDH1 mutations at codon R132. One mutation, one drug target.' },
  { eyebrow: 'Somatic', fact: 'Acquired', qualifier: 'in tumor, not inherited. Disease defined by the mutation.' },
  { eyebrow: 'R/R AML · pre-2018', fact: '3–9 mo', qualifier: 'Median OS. No targeted option.' },
  { eyebrow: '2L+ CCA · pre-2020', fact: '≈6 mo', qualifier: 'Median OS. No SOC.' },
];

function FactStrip() {
  const reduced = useReducedMotion();
  return (
    <>
      {FACTS.map((f, i) => (
        <motion.div
          key={f.eyebrow}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: D.strip + i * 0.08 }}
          style={{
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-lg)',
            background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
            padding: 'var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: 'clamp(0.75rem, min(1.2vw, 1.8vh), 1.05rem)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cyan)',
              fontWeight: 700,
            }}
          >
            {f.eyebrow}
          </span>
          <span
            className="deck-display"
            style={{
              fontSize: 'clamp(2.5rem, min(5vw, 7.5vh), 4.5rem)',
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--cream)',
              lineHeight: 1,
            }}
          >
            {f.fact}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, min(1.3vw, 2vh), 1.2rem)',
              color: 'var(--cream-muted)',
              lineHeight: 1.45,
            }}
          >
            {f.qualifier}
          </span>
        </motion.div>
      ))}
    </>
  );
}

/* AnchorRow content merged into MOAPanel */
