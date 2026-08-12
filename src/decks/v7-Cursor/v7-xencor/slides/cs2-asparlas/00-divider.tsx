import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import LymphocyteCruk from '../../assets/cs3/lymphocyte-cruk.svg?react';

/**
 * Case Study 02 · Calaspargase pegol (Asparlas) · Adult Ph-neg ALL.
 * Presented third in the interview order (Case 03 of 4 on the divider chrome).
 *
 * Light-editorial: soft paper wash (no blur halo), delays ≤0.35s, solid caption.
 */
export default function Cs2AspDivider() {
  const reduce = useReducedMotion();
  return (
    <CaseHeroDivider
      caseToken="teal"
      caseNumber="03"
      totalCases={4}
      kicker="CASE STUDY 03 · PRESENTED THIRD"
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
        width: 'min(100%, clamp(260px, 46vh, 420px))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(8px, 1.2vh, 16px)',
      }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease, delay: reduced ? 0 : 0.12 }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '283 / 279',
          color: 'var(--teal)',
        }}
        aria-label="Diagram of a lymphocyte — the cell that becomes a malignant lymphoblast in adult Ph-negative acute lymphoblastic leukaemia"
        role="img"
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-4%',
            background:
              'radial-gradient(ellipse at center, color-mix(in srgb, var(--teal) 8%, transparent) 0%, transparent 72%)',
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          textAlign: 'center',
        }}
      >
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--teal)',
            fontWeight: 700,
          }}
        >
          Lymphocyte · cell of origin
        </span>
        <span
          style={{
            fontSize: 'var(--fs-card-meta)',
            color: 'var(--cream-muted)',
            letterSpacing: '0.02em',
            fontFamily: 'var(--font-body)',
          }}
        >
          The lymphoblast clone in adult Ph-negative ALL
        </span>
      </div>
    </div>
  );
}
