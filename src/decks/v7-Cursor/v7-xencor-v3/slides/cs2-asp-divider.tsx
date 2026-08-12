import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import LymphocyteCruk from '../assets/cs3/lymphocyte-cruk.svg?react';

/**
 * Case Study 02 · Calaspargase pegol (Asparlas) · Adult Ph-neg ALL.
 *
 * Why a CRUK lymphocyte (not the bone-marrow CRUK file used by CS2):
 *   ALL is acute LYMPHOblastic leukaemia — the malignant clone is a
 *   lymphocyte that has stalled at the lymphoblast stage. The cell IS
 *   the indication. CS2 (Tibsovo / AML+CCA) already owns the bone-marrow
 *   diagram from the same CRUK family; reusing it for CS2 in a different
 *   tint would read as "we recoloured the same picture" rather than as
 *   two distinct cases. Cell-level imagery for CS2 keeps the visual
 *   vocabulary contiguous (CRUK biomedical line work) without copy.
 *
 * Why the cell, not a methodology glyph (D-optimal info matrix /
 * informative-prior rings) at the divider:
 *   The divider's job is to anchor the indication emotionally before we
 *   talk about design. The methodology lives on slide 27 (case3-fit)
 *   where it earns its keep as the rationale for N=60. Putting the
 *   methodology twice — once as divider hero, once as fit backdrop —
 *   diluted both. So the rings are now slide-27-only.
 *
 * Color · violet (Novel Methods family — CS2 finally lights up Theme 04).
 * The lymphocyte diagram already renders in a soft lavender/cyan palette
 * (lavender · cyan · pale lilac) that sits inside the CS2 case family,
 * so the SVG is mounted at its native colours; the illustration slot
 * provides only a soft violet halo behind it for canvas anchoring.
 */
export default function Cs2AspDivider() {
  const reduce = useReducedMotion();
  return (
    <CaseHeroDivider
      caseToken="3"
      caseNumber="02"
      totalCases={4}
      kicker="CASE STUDY 02"
      title="Calaspargase pegol"
      subtitle="A smaller, smarter trial in adult Ph-negative ALL"
      tagline="A pharmacometrics-anchored design — and an FDA-agreed 36% enrollment reduction in a rare adult oncology population."
      meta={[
        ['Compound', 'Calaspargase pegol (Asparlas)'],
        ['Population', 'Adult Ph-negative ALL'],
        ['Agency', 'FDA · Type A · 21 Jul 2023'],
        ['Outcome', 'N = 60 agreed (94 → 60 · −36%)'],
      ]}
      verdict="N=60 AGREED"
      illustration={<LymphocyteHero reduced={reduce} />}
      source="FDA Type A meeting · 21 Jul 2023 · NCT04817761 (SPARK-ALL) · Lymphocyte diagram © Cancer Research UK / Wikimedia · CC BY-SA 4.0"
    />
  );
}

function LymphocyteHero({ reduced }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <div
      style={{
        position: 'relative',
        // Width is the smaller of the slot width and a height-driven cap
        // so the square-ish lymphocyte never collides with the case
        // ledger at the bottom — critical at 1366×768 where the slot
        // is only ~538px tall.
        width: 'min(100%, clamp(260px, 46vh, 420px))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(8px, 1.2vh, 16px)',
      }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease, delay: 0.55 }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '283 / 279',
          color: 'var(--xc-case-3)',
        }}
        aria-label="Diagram of a lymphocyte — the cell that becomes a malignant lymphoblast in adult Ph-negative acute lymphoblastic leukaemia"
        role="img"
      >
        {/* Soft violet halo · sells the "cell of origin" warmth and
            gives the line drawing a luminous backdrop on dark canvas. */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-6%',
            background:
              'radial-gradient(ellipse at center, color-mix(in srgb, var(--xc-case-3) 22%, transparent) 0%, transparent 68%)',
            filter: 'blur(18px)',
            zIndex: 0,
          }}
        />
        {/* The original CRUK file embedded a small "Lymphocyte" label
            (Helvetica, dark gray fill) at the bottom-left of the diagram.
            That has been removed in our local copy so the slide caption
            below owns the typography. The XML license comment in the
            SVG file documents this as a CC-BY-SA derivative. */}
        <LymphocyteCruk
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'relative', zIndex: 1, display: 'block' }}
        />
      </motion.div>

      {/* Labelled caption beneath the cell. The kicker grounds the
          biology ("LYMPHOCYTE · CELL OF ORIGIN"); the secondary line
          carries the precise indication (Adult Ph-neg ALL) so the
          divider does not need a body paragraph to explain the visual. */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 1.6 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          textAlign: 'center',
        }}
      >
        <span
          className="xc-card-label"
          style={{ color: 'var(--xc-case-3)' }}
        >
          Lymphocyte · cell of origin
        </span>
        <span className="bp-card-meta xc-ink-muted">
          The lymphoblast clone in adult Ph-negative ALL
        </span>
      </motion.div>
    </div>
  );
}
