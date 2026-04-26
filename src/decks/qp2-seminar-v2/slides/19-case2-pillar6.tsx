// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';
import PillarArchitecture from './cs2-shared/PillarArchitecture';

/**
 * Slide 19 (manifest position) · CS2 PILLAR 6 — ICH E5(R1) Appendix D.
 *
 * Per cs2-design.md beat 5: "ICH E5(R1) Appendix D — the 9-criterion
 * compound-property checklist used to argue ethnic insensitivity. All
 * 9 criteria checked. The other 5 pillars demote to icon-row marginalia
 * — they're still there, but Pillar 6 is the hero."
 *
 * Cinematic role:
 *   • T6 culmination beat 1 — PillarArchitecture stage="hero6" promotes
 *     Pillar 6 into the central column at hero scale; pillars 1-5
 *     shrink to a vertical icon column on the left margin.
 *   • Inside Pillar 6: a 9-criterion vertical checklist with PASS
 *     verdicts and one-line evidence.
 */
export default function Slide17Case2Pillar6() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="CS2 · Pillar 6 — ICH E5(R1) Appendix D"
      headline={
        <>
          The classification key.{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>
            Nine of nine criteria met.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead="The 9 compound-property attributes that ICH E5(R1) Appendix D defines for ethnic insensitivity. Each one passed."
      subheadMaxChars={120}
      footerKicker="Case 02 · The classification"
      footerSource="Source · ICH E5(R1) 1998 (Q&A 2006) Appendix D · TIBSOVO USPI integrated PK/PD section"
    >
      <Pillar6Layout />
    </SlideFrame>
  );
}

function Pillar6Layout() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        rowGap: 'var(--space-4)',
        height: '100%',
        minHeight: 0,
      }}
    >
      <SixVersusNineLegend />
      <div style={{ minHeight: 0 }}>
        <PillarArchitecture stage="hero6">
          <ChecklistContent />
        </PillarArchitecture>
      </div>
    </div>
  );
}

/* ─── 6 vs 9 clarity legend ─────────────────────────────────────────
 *  The deck previously left the audience asking: "what's 6, what's 9,
 *  why is the hero card numbered 06?" This legend names the framework
 *  shape unambiguously — six pillars in the architecture, nine
 *  criteria inside Pillar 6's checklist, and Pillar 06 is the one
 *  doing the formal classification work. */
function SixVersusNineLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 0.3 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto 1fr',
        columnGap: 'var(--space-4)',
        alignItems: 'baseline',
        paddingLeft: 'var(--space-3)',
        borderLeft: '3px solid var(--cyan)',
      }}
    >
      <LegendChip num="6" label="pillars (architecture)" />
      <LegendDivider />
      <LegendChip num="9" label="criteria (this checklist)" />
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
          fontStyle: 'italic',
        }}
      >
        Pillar 06 = the ICH E5(R1) Apx D classification — 9-criterion compound checklist.
      </div>
    </motion.div>
  );
}

function LegendChip({ num, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span
        className="deck-display"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cyan)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {num}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream)',
          fontWeight: 700,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function LegendDivider() {
  return (
    <span
      aria-hidden
      className="deck-mono"
      style={{
        fontSize: 'var(--fs-card-body)',
        color: 'var(--cream-faint)',
      }}
    >
      ·
    </span>
  );
}

const CRITERIA = [
  { label: 'Linear PK',                     evidence: 'AGILE · proportional 200–1200 mg' },
  { label: 'Wide therapeutic dose range',   evidence: '500 mg vs 1200 mg MTD · 2.4× margin' },
  { label: 'Flat PK/PD curve at therapeutic dose', evidence: '2-HG plateau ≥ 500 mg' },
  { label: 'Minimal metabolism',            evidence: 'Predominantly CYP3A4 · no genetic gating' },
  { label: 'High bioavailability',          evidence: 'F ≈ 0.83 (mass-balance/PBPK)' },
  { label: 'Low protein binding',           evidence: '≈ 92–98% bound · α-1-AGP only' },
  { label: 'Little potential for protein-binding interactions', evidence: 'Verified across DDI substrates' },
  { label: 'Low potential for drug–drug interactions', evidence: 'Itraconazole +169% · within bounds' },
  { label: 'Non-systemic mode of action',   evidence: 'Tumor-localized IDH1 R132 inhibition' },
];

function ChecklistContent() {
  // Renders inside the hero Pillar 6 panel (PillarArchitecture stage="hero6")
  // so we deliberately omit the outer card border/background/padding —
  // the hero pillar already provides them. We just lay out our own
  // header + grid + verdict at full width.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay: 0.4 }}
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        rowGap: 'var(--space-4)',
        minHeight: 0,
        height: '100%',
      }}
    >
      {/* Punchline (the "06 ICH E5(R1) Apx D" header is rendered by the
          hero pillar itself; we only contribute the explanatory line). */}
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-slide-headline-sm, 1.55rem)',
          fontWeight: 700,
          color: 'var(--cream)',
          letterSpacing: '-0.01em',
          lineHeight: 1.15,
        }}
      >
        A drug with a low likelihood of clinically significant ethnic differences.
      </div>

      {/* 9-criterion list */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 'var(--space-4)',
          rowGap: 'var(--space-2)',
          alignContent: 'start',
        }}
      >
        {CRITERIA.map((c, i) => (
          <CriterionRow key={c.label} index={i} {...c} />
        ))}
      </div>

      {/* Verdict footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: 1.6 }}
        style={{
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid color-mix(in srgb, var(--cyan) 35%, var(--cream-hairline))',
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-3)',
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-kicker)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cyan)',
            fontWeight: 700,
          }}
        >
          Verdict ·
        </div>
        <div
          className="deck-display"
          style={{
            fontSize: 'var(--fs-slide-subhead)',
            fontWeight: 700,
            color: 'var(--cream)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          9 / 9 criteria met → ICH E5(R1)-classified ethnically insensitive.
        </div>
      </motion.div>
    </motion.div>
  );
}

function CriterionRow({ index, label, evidence }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1], delay: 0.7 + index * 0.06 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-3)',
        alignItems: 'start',
        padding: '6px 0',
        borderBottom: '1px dashed color-mix(in srgb, var(--cream-hairline) 80%, transparent)',
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          background: 'color-mix(in srgb, var(--cyan) 18%, transparent)',
          border: '1.5px solid var(--cyan)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <Check size={14} color="var(--cyan)" strokeWidth={3} />
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-slide-body)',
            fontWeight: 600,
            color: 'var(--cream)',
            lineHeight: 1.25,
          }}
        >
          {label}
        </div>
        <div
          className="deck-mono"
          style={{
            fontSize: 'var(--fs-slide-pageno)',
            color: 'var(--cream-muted)',
            lineHeight: 1.3,
            marginTop: 2,
          }}
        >
          {evidence}
        </div>
      </div>
    </motion.div>
  );
}
