import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideFrame from '@/components/deck/SlideFrame';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import CompartmentSchematic from './cs1-build/CompartmentSchematic';
import DecisionGate from './cs1-build/DecisionGate';

/**
 * Slide 11c · CS1 Build — Integrated PopPK workflow.
 * Migrated to SlideFrame. Two-column viz: left = dataset + schematic,
 * right = compact 6-node flowchart (see cs1-build/DecisionGate.jsx).
 *
 * The previous verbose step list (StepRow + coral spine) was extracted
 * to cs1-build/WorkflowStepsList.jsx for potential reuse on other
 * slides. The old DecisionGate mini-diagram was folded into the new
 * flowchart (which now spans the full right column).
 */

export default function Slide11cCaseBuild() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    dataset: 0.70, schematic: 1.10,
    rcTitle: 0.80, spine: 1.00,
    stepBase: 1.30, stepGap: 0.15,
  };

  const T = useTokens(['--coral', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="Build — Sequential, not one-shot"
      headline={
        <>
          Adult foundation first.{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            Then pediatric inference.
          </span>
        </>
      }
      headlineMaxChars={30}
      subhead={
        <>
          Six sequential steps —{' '}
          <HighlightWord color="var(--coral)" delay={1.2}>each one set up the next.</HighlightWord>{' '}
          No one-shot analysis.
        </>
      }
      subheadMaxChars={60}
      footerKicker="Case 01 · The build"
      footerSource="Source · Okour et al. JCP 2023 · Data S1 · Study AMB112529 (NCT01332331)"
    >
      {/* Two-column viz: left (40%) dataset + schematic · right (60%) workflow */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          columnGap: 'var(--space-8)',
          minHeight: 0,
        }}
      >
        {/* ─── LEFT column ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', minWidth: 0 }}>
          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.dataset }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-kicker)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--coral)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Dataset — integrated adult + pediatric
            </div>
            <div className="grid grid-cols-2 gap-5">
              <DatasetCell
                label="Adult foundation"
                value="380"
                meta={<>patients · 7 studies · 3,126 obs<br />rich sampling → structural anchor</>}
                accent
              />
              <DatasetCell
                label="Pediatric · AMB112529"
                value="39"
                meta={<>patients · 211 obs · sparse sampling<br />enrolled 8–16 yr (protocol 8 to &lt;18)</>}
              />
            </div>
          </motion.div>

          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.schematic }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-kicker)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--coral)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Two-compartment · 1st-order absorption · t-lag
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
              <CompartmentSchematic tk={tk} />
            </div>

            <div
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: '0.08em',
                color: 'var(--cream-faint)',
                lineHeight: 1.4,
                marginTop: 'var(--space-2)',
              }}
            >
              NONMEM 7.4.1 · IMPMAP · BLOCK(6) OMEGA · 1,000 IS samples · BLQ ≈ 3% via Beal M3
            </div>
          </motion.div>
        </div>

        {/* ─── RIGHT column — compact 6-node flowchart ─── */}
        <div
          style={{
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <motion.div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-kicker)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--coral)',
              marginBottom: 'var(--space-1)',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.rcTitle }}
          >
            Workflow — 6 sequential steps
          </motion.div>

          {/* Subtitle kicker — prefaces the flowchart with the outcome
              ("pcVPC passed"), so a glance tells the panelist which branch
              was the one taken before they scan the full diagram. */}
          <motion.div
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: '0.08em',
              color: 'var(--cream-faint)',
              fontStyle: 'italic',
              marginBottom: 'var(--space-4)',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.rcTitle + 0.15 }}
          >
            pcVPC passed · linear path from build to submission
          </motion.div>

          {/* Flowchart fills the column — each node + its description
              fades in together, arrows draw between (see DecisionGate). */}
          <DecisionGate />
        </div>
      </div>
    </SlideFrame>
  );
}

function DatasetCell({ label, value, meta, accent }) {
  return (
    <div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
      >
        {label}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-numeral)',
          lineHeight: 1,
          color: accent ? 'var(--coral)' : 'var(--cream)',
          fontWeight: 700,
          marginTop: 'var(--space-1)',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          lineHeight: 1.35,
          color: 'var(--cream-muted)',
          marginTop: 'var(--space-2)',
          textTransform: 'none',
          letterSpacing: 0,
          fontFamily: 'var(--font-body)',
        }}
      >
        {meta}
      </div>
    </div>
  );
}
