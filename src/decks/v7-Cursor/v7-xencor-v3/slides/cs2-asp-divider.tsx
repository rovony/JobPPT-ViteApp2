import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import LymphocyteCruk from '../assets/cs3/lymphocyte-cruk.svg?react';

/**
 * Case Study 03 (presentation position) · Calaspargase pegol (Asparlas).
 * File id stays cs2-asp-* — design case, not dose case.
 *
 * Inbound seam from India: interpolation → transport → design.
 */
export default function Cs2AspDivider() {
  const reduce = useReducedMotion();
  return (
    <CaseHeroDivider
      caseToken="3"
      caseNumber="03"
      totalCases={4}
      kicker="CASE STUDY 03 · SAMPLE-LIMITED"
      title="Calaspargase pegol"
      subtitle="The trial that could not enrol"
      tagline="Interpolation → transport → design. Here the deliverable is the design itself — not the model output."
      meta={[
        ['Compound', 'Calaspargase pegol (Asparlas)'],
        ['Population', 'Adult Ph-negative ALL'],
        ['Agency', 'FDA · Type A · 21 Jul 2023'],
        ['Outcome', 'N = 60 agreed (94 → 60 · −36%)'],
      ]}
      verdict="DESIGN CASE"
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
        <LymphocyteCruk
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'relative', zIndex: 1, display: 'block' }}
        />
      </motion.div>

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
        <span className="xc-card-label" style={{ color: 'var(--xc-case-3)' }}>
          Lymphocyte · cell of origin
        </span>
        <span className="bp-card-meta xc-ink-muted">
          The lymphoblast clone in adult Ph-negative ALL
        </span>
      </motion.div>
    </div>
  );
}
