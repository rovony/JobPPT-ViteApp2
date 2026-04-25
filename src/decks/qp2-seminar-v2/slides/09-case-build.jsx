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
      eyebrow="CS1 · Build — sequential PopPK with fixed allometry"
      headline={
        <>
          Allometric scaling adequately described ambrisentan{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            disposition in children.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead={
        <>
          Adult foundation first, then pediatric inference —{' '}
          <HighlightWord color="var(--coral)" delay={1.2}>each step set up the next.</HighlightWord>{' '}
          Body weight emerged as the sole significant covariate.
        </>
      }
      subheadMaxChars={70}
      footerKicker="Case 01 · The build"
      footerSource="Source · Okour et al. JCP 2023 · Data S1 · Study AMB112529 (NCT01332331) · Anderson & Holford 2008"
    >
      {/* Two-column viz: left (40%) dataset + schematic · right (60%) workflow.
          Three sizing guards keep the (now square-ish) schematic locked inside
          the viz cell — at 1920×1080 *and* the cramped 1366×768 fallback:
            1. Outer wrapper is `position: absolute; inset: 0` so its size is
               dictated by the Viz GridSlot (not by content).
            2. Outer wrapper uses `gridTemplateRows: minmax(0, 1fr)` — plain
               `1fr` lets CSS Grid fall back to max-content sizing when the
               left column's intrinsic content (dataset card + tall SVG panel)
               exceeds the available space, which silently grew the column to
               ~548px inside a 465px viz cell at 1366×768.
            3. The left column is `display: flex` with `min-height: 0` and
               `overflow: hidden`, and the schematic panel uses `flex: 1 1 0`
               so it absorbs only the leftover height after the dataset card. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gridTemplateRows: 'minmax(0, 1fr)',
          columnGap: 'var(--space-8)',
          minHeight: 0,
        }}
      >
        {/* ─── LEFT column ─── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            minWidth: 0,
            minHeight: 0,
            height: '100%',
            overflow: 'hidden',
          }}
        >
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
              padding: 'var(--space-4) var(--space-5)',
              flex: '1 1 0',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
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
                flexShrink: 0,
              }}
            >
              Two-comp · 1st-order absorption · t-lag · CL∝WT⁰·⁷⁵ · V∝WT¹·⁰
            </div>

            <div style={{ flex: 1, minHeight: 0, minWidth: 0, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <CompartmentSchematic tk={tk} />
              </div>
            </div>

            <div
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: '0.06em',
                color: 'var(--cream-faint)',
                lineHeight: 1.3,
                marginTop: 'var(--space-2)',
                flexShrink: 0,
              }}
            >
              NONMEM 7.4.1 · IMPMAP · BLOCK(6) OMEGA · 1,000 IS · BLQ ≈ 3% (Beal M3)
            </div>
          </motion.div>
        </div>

        {/* ─── RIGHT column — workflow card (mirrors left schematic panel) ───
            The flowchart sits inside a panel card so it reads as a peer
            artefact to the dataset card + schematic panel on the left,
            not as a free-floating diagram against the slide background.
            Same border / radius / panel-mix bg / padding tokens as the
            schematic panel above. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            minHeight: 0,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-5)',
              flex: '1 1 0',
              minHeight: 0,
              minWidth: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.rcTitle - 0.1 }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-kicker)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--coral)',
                marginBottom: 'var(--space-1)',
                flexShrink: 0,
              }}
            >
              Workflow — 6 sequential steps
            </div>

            {/* Subtitle kicker — prefaces the flowchart with the outcome
                AND now carries the pcVPC validation receipt absorbed from
                the dropped fit-slide (D3 fold · 2026-04-25). The receipt
                reads as a quiet certificate, not a hero claim — the
                downstream exposure-match slide is the actual narrative
                proof that the model is usable for dosing. */}
            <div
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: '0.08em',
                color: 'var(--cream-faint)',
                fontStyle: 'italic',
                marginBottom: 'var(--space-3)',
                flexShrink: 0,
              }}
            >
              pcVPC passed · 500 replicates · N = 39 · 211 obs ·{' '}
              <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 600 }}>
                no systematic bias
              </span>
            </div>

            {/* Flowchart fills the remaining card height — same containment
                pattern as the CompartmentSchematic panel on the left:
                flex:1 outer + position:absolute inner so the SVG/HTML
                composite scales without dragging the card taller than
                its grid cell. */}
            <div style={{ flex: 1, minHeight: 0, minWidth: 0, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DecisionGate />
              </div>
            </div>
          </motion.div>
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
