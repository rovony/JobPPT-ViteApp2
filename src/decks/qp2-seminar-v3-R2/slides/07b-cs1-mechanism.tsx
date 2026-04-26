// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import DualVessel from '../components/DualVessel';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 07b — Mechanism · endothelin pathway · ambrisentan MOA.
 *
 * 2026-04-26 user pass — full rebuild per direction:
 *   "duplicate it one without drugs one with to show pathopyshoklogy
 *    and MOA of drugs, vessel like structure, color code for things
 *    like NO, etc, easy to understand and powerful"
 *   + "right cards too wide for the content"
 *   + memory feedback_visuals_anticipate_probes — visual must answer
 *     foreseeable Q&A probes on its face AND serve as memory aid for
 *     MOA / pathophysiology, include competitors.
 *
 * Layout (top to bottom):
 *   1. Dual-vessel hero (60% of viz) — left tube = PAH untreated
 *      (constricted, ET-1 active on ETA, vasoconstriction); right tube
 *      = ambrisentan-treated (open lumen, ETA blocked by amber AMB
 *      pills, ETB preserved with NO release in cyan). Color-coded
 *      mediators: ET-1 = coral, NO = cyan, ambrisentan = amber.
 *   2. ERA selectivity strip — 3 ERAs compared: ambrisentan
 *      (>4000:1 ETA) | macitentan (50:1 ETA) | bosentan (≈1:20 dual).
 *      Pre-empts "what about other ERAs?" probe.
 *   3. 3-pathway summary band (bottom 35%) — Endothelin (THIS CASE) /
 *      NO·cGMP / Prostacyclin. Compact horizontal cards (was vertical
 *      "too wide for content" per user). Includes drug classes +
 *      first-FDA-approval years.
 *
 * Probes the visual answers on its face (Malek won't have to recall):
 *   · Mechanism of PAH at vessel level (constriction + proliferation)
 *   · MOA of ambrisentan (ETA blockade, ETB preserved)
 *   · Why ETA selectivity matters (NO release via ETB → vasodilation)
 *   · Selectivity ratio (>4000:1) vs competitors (bosentan, macitentan)
 *   · Competitor landscape across all 3 PAH pathways
 *   · Approval years (1995 PGI2 → 2005 NO/cGMP → 2007 ET)
 *
 * Sources: ESC/ERS 2022 PAH guideline · Letairis (ambrisentan) PI ·
 * Tracleer (bosentan) PI · Opsumit (macitentan) PI · Humbert NEJM 2023.
 */

const EASE = [0.2, 0.7, 0.3, 1];
const D = {
  vessel: 0.45,
  selectivity: 1.20,
  band1: 1.50,
  band2: 1.65,
  band3: 1.80,
};

const ERA_SELECTIVITY = [
  {
    name: 'Ambrisentan',
    isThisCase: true,
    ratio: '>4000:1',
    type: 'ETA-selective',
    year: '2007',
    drug: 'Letairis',
  },
  {
    name: 'Macitentan',
    ratio: '≈50:1',
    type: 'ETA-preferring',
    year: '2013',
    drug: 'Opsumit',
  },
  {
    name: 'Bosentan',
    ratio: '≈20:1',
    type: 'Dual ETA / ETB',
    year: '2001',
    drug: 'Tracleer',
  },
];

const PATHWAYS = [
  {
    n: '01',
    name: 'Endothelin',
    isThisCase: true,
    state: '↑ ET-1 OVERACTIVE',
    drugClass: 'ERAs',
    drugs: 'Ambrisentan · Bosentan · Macitentan',
    year: '2007',
    delay: 'band1',
  },
  {
    n: '02',
    name: 'NO / cGMP',
    state: '↓ NO UNDERACTIVE',
    drugClass: 'PDE5i · sGC stim.',
    drugs: 'Sildenafil · Tadalafil · Riociguat',
    year: '2005',
    delay: 'band2',
  },
  {
    n: '03',
    name: 'Prostacyclin',
    state: '↓ PGI2 UNDERACTIVE',
    drugClass: 'Prostanoids · IP agonist',
    drugs: 'Epoprostenol · Treprostinil · Selexipag',
    year: '1995',
    delay: 'band3',
  },
];

export default function Cs1Mechanism() {
  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--case)"
      eyebrow="Case 01 · Mechanism — endothelin pathway"
      headline={
        <>
          Three pathways drive PAH.{' '}
          <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 700 }}>
            Ambrisentan blocks one — selectively.
          </span>
        </>
      }
      headlineMaxChars={56}
      footerKicker="07b · CS1 · Mechanism"
      footerSource="Sources · ESC/ERS 2022 · Letairis PI · Tracleer PI · Opsumit PI · Humbert NEJM 2023"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateRows: 'minmax(0, 1.45fr) auto auto',
          rowGap: 'var(--space-3)',
          minHeight: 0,
        }}
      >
        {/* Ambient cs1-lung — preserves layoutId morph chain into slide 08.
            Slim opacity so the dual-vessel diagram stays the focal element. */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(18rem, 32vw, 28rem)',
            opacity: 0.07,
            pointerEvents: 'none',
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lungs layoutId="cs1-lung" variant="foundation" />
        </div>

        {/* ROW 1 — Dual-vessel hero */}
        <div style={{ position: 'relative', zIndex: 1, minHeight: 0 }}>
          <DualVessel delay={D.vessel} />
        </div>

        {/* ROW 2 — ERA selectivity strip */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SelectivityStrip />
        </div>

        {/* ROW 3 — 3-pathway compact band */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <PathwayBand />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SELECTIVITY STRIP
   3 ERAs side-by-side — visualizes why ambrisentan is the right tool
   and pre-empts "what about other ERAs?" / "why selective?" probes.
   ══════════════════════════════════════════════════════════════════ */
function SelectivityStrip() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: D.selectivity, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center',
        columnGap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-3)',
        border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
        background: 'color-mix(in srgb, var(--amber) 5%, transparent)',
        borderRadius: 'var(--radius-md)',
        minWidth: 0,
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--amber)',
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}>
        ETA selectivity ·
      </div>

      <div style={{
        display: 'flex',
        gap: 'var(--space-3)',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        {ERA_SELECTIVITY.map((era) => (
          <div key={era.name} style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 6,
            padding: '2px 10px',
            border: era.isThisCase
              ? '1px solid color-mix(in srgb, var(--case) 50%, transparent)'
              : '1px solid var(--cream-hairline)',
            background: era.isThisCase
              ? 'color-mix(in srgb, var(--case) 12%, transparent)'
              : 'transparent',
            borderRadius: 'var(--radius-sm)',
          }}>
            <span className="deck-display" style={{
              fontSize: 'var(--fs-slide-subhead)',
              fontWeight: era.isThisCase ? 700 : 500,
              color: era.isThisCase ? 'var(--case)' : 'var(--cream)',
            }}>
              {era.name}
            </span>
            <span className="deck-mono" style={{
              fontSize: 'var(--fs-slide-pageno)',
              color: era.isThisCase ? 'var(--case)' : 'var(--cream-muted)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.04em',
              fontWeight: 700,
            }}>
              {era.ratio}
            </span>
            <span className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-pageno)',
              color: 'var(--cream-faint)',
              letterSpacing: 'var(--ls-mono-wide)',
            }}>
              {era.type}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PATHWAY BAND
   3 compact horizontal cards — Endothelin (THIS CASE) / NO·cGMP / PGI2.
   Pre-empts "what other PAH drugs exist?" / "approval years?" probes.
   ══════════════════════════════════════════════════════════════════ */
function PathwayBand() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(14rem, 100%), 1fr))',
      gap: 'var(--space-3)',
      minWidth: 0,
    }}>
      {PATHWAYS.map((p) => (
        <PathwayCardCompact key={p.n} {...p} delay={D[p.delay]} />
      ))}
    </div>
  );
}

function PathwayCardCompact({
  n, name, isThisCase, state, drugClass, drugs, year, delay,
}) {
  const reduced = useReducedMotion();
  const accent = isThisCase ? 'var(--case)' : 'var(--cream-muted)';

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        columnGap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-3)',
        border: isThisCase
          ? '1px solid color-mix(in srgb, var(--case) 36%, transparent)'
          : '1px solid var(--cream-hairline)',
        borderLeft: `3px solid ${accent}`,
        background: isThisCase
          ? 'color-mix(in srgb, var(--case) 8%, transparent)'
          : 'color-mix(in srgb, var(--panel) 65%, transparent)',
        borderRadius: 'var(--radius-md)',
        minWidth: 0,
      }}
    >
      {/* Number + name + state */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: accent,
          fontWeight: 700,
        }}>
          {isThisCase ? '★ ' : ''}Pathway {n}
        </div>
        <div className="deck-display" style={{
          fontSize: 'var(--fs-slide-subhead)',
          fontWeight: 600,
          color: 'var(--cream)',
          lineHeight: 1.15,
          whiteSpace: 'nowrap',
        }}>
          {name}
        </div>
      </div>

      {/* Class + drugs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 600,
        }}>
          {drugClass} · {state}
        </div>
        <div className="deck-body" style={{
          fontSize: 'var(--fs-slide-pageno)',
          color: 'var(--cream)',
          opacity: 0.86,
          lineHeight: 1.3,
        }}>
          {drugs}
        </div>
      </div>

      {/* Year */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div className="deck-display" style={{
          fontSize: 'clamp(1.2rem, min(2.4vw, 3.5vh), 1.8rem)',
          color: accent,
          fontWeight: 700,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {year}
        </div>
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          color: 'var(--cream-faint)',
          letterSpacing: 'var(--ls-mono-wide)',
          marginTop: 1,
        }}>
          1st FDA
        </div>
      </div>
    </motion.div>
  );
}
