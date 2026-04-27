// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS2 Architecture · v2 — rebuilt 2026-04-26 to match the v2 deck's
 * "case-build" panel-card pattern (`qp2-seminar-v2/slides/09-case-build`).
 *
 * Structural rules absorbed from that reference:
 *   - 2-col grid `2fr 3fr` (NOT auto-fit) — predictable two-column read
 *   - `gridTemplateRows: minmax(0, 1fr)` — prevents grid blowout when
 *     a column's intrinsic content is taller than the viz cell
 *   - Outer wrapper `position: absolute; inset: 0` — fills viz cell
 *   - Every content zone wrapped in a PANEL CARD (1px hairline border
 *     + panel-mix 55-70% bg + radius-lg + padding) — no free-floating
 *     elements against the slide background
 *   - Each card opens with a deck-mono uppercase KICKER (cyan accent)
 *     and may carry a small italic SUBTITLE kicker below
 *   - Diagrams fill cards via `flex: 1; min-height: 0` + nested
 *     `position: absolute; inset: 0` so the SVG/HTML composite scales
 *     without dragging the card taller than its grid cell
 *   - Animation delays 0.6–1.5s range (measured, not cinematic)
 *
 * Layout:
 *   LEFT (2fr) — two stacked panel cards
 *     · "Where the mutation lives" — cell-strip schematic + counterfactual
 *     · "IDH-inhibitor landscape" — vertical competitor stack
 *   RIGHT (3fr) — one large panel card
 *     · "Inside the tumor cell" — disease cascade with drug intervention
 *       and color-flip to drug state
 *
 * Sources: Dang Cancer Cell 2009 · Figueroa Cancer Cell 2010 · FDA
 * Drugs@FDA (4 competitor approval dates verified 2026-04-26).
 */

const C = {
  cyan: 'var(--cyan)',
  amber: 'var(--amber)',
  cream: 'var(--cream)',
  creamMuted: 'var(--cream-muted)',
  creamFaint: 'var(--cream-faint)',
  panel: 'var(--panel)',
  hairline: 'var(--cream-hairline)',
};

const EASE = [0.2, 0.7, 0.3, 1];

export default function CS2ArchitectureV2() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  const D = {
    cellCard: 0.7,
    competitorCard: 0.9,
    cascadeCard: 1.0,
    diseaseNodes: 1.4,    // base; nodes stagger from here
    intervention: 2.6,
    drugStateFlip: 3.0,
  };

  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="Case 02 · Architecture — one frame, full mechanism"
      headline={
        <>
          The mutation is{' '}
          <span style={{ color: C.cyan, fontStyle: 'italic', fontWeight: 700 }}>somatic</span>.
          The drug{' '}
          <span style={{ color: C.cyan, fontStyle: 'italic', fontWeight: 700 }}>binds</span> it.
          The cascade{' '}
          <span style={{ color: C.cyan, fontStyle: 'italic', fontWeight: 700 }}>reverses</span>.
        </>
      }
      headlineMaxChars={70}
      subhead="Three claims, one canvas — and four IDH-inhibitor competitors for context."
      subheadMaxChars={110}
      footerKicker="Case 02 · MOA — one frame"
      footerSource="Dang Cancer Cell 2009 · Figueroa Cancer Cell 2010 · FDA Drugs@FDA · ICH E5(R1)"
    >
      {/* Outer wrapper: position absolute fills the viz cell exactly,
          gridTemplateRows: minmax(0, 1fr) prevents content-based row growth. */}
      <div
        ref={ref}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gridTemplateRows: 'minmax(0, 1fr)',
          columnGap: 'var(--space-6)',
          minHeight: 0,
        }}
      >
        {/* ─── LEFT COLUMN — 2 stacked panel cards ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-4)',
          minWidth: 0, minHeight: 0,
          height: '100%',
          overflow: 'hidden',
        }}>
          <CellLandscapeCard go={go} reduced={reduced} delay={D.cellCard} />
          <CompetitorCard go={go} reduced={reduced} delay={D.competitorCard} />
        </div>

        {/* ─── RIGHT COLUMN — 1 big cascade card ─── */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          minWidth: 0, minHeight: 0,
          height: '100%',
          overflow: 'hidden',
        }}>
          <CascadeCard
            go={go} reduced={reduced}
            delay={D.cascadeCard}
            diseaseStart={D.diseaseNodes}
            interventionAt={D.intervention}
            drugFlipAt={D.drugStateFlip}
          />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * CARD 1 (LEFT TOP) — Where the mutation lives
 * Cell strip + counterfactual. Establishes "tumor cell only" inside
 * a contained panel card with proper kicker + subtitle + body.
 * ═══════════════════════════════════════════════════════════════════ */
function CellLandscapeCard({ go, reduced, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE, delay: reduced ? 0 : delay }}
      style={{
        border: `1px solid ${C.hairline}`,
        background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4) var(--space-5)',
        display: 'flex', flexDirection: 'column',
        gap: 'var(--space-3)',
        minWidth: 0, minHeight: 0,
        flexShrink: 0,
      }}
    >
      {/* Card kicker */}
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-kicker)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: C.cyan,
      }}>
        Where the mutation lives
      </div>

      {/* Subtitle — italic mono, dense detail */}
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-body)',
        letterSpacing: '0.06em',
        color: C.creamFaint,
        fontStyle: 'italic',
        marginTop: 'calc(-1 * var(--space-2))',
      }}>
        Somatic IDH1 R132 · tumor tissue only · not in germline DNA
      </div>

      {/* Cell strip — 3 cells, middle highlighted as TUMOR */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: 'var(--space-2)',
        padding: 'var(--space-2) 0',
      }}>
        {[0, 1, 2].map((i) => (
          <CellGlyph key={i} idx={i} />
        ))}
      </div>

      {/* Counterfactual line */}
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-body)',
        letterSpacing: '0.06em',
        color: C.creamFaint,
        lineHeight: 1.4,
      }}>
        If germline → all 3 cells marked → drug response would track ancestry.{' '}
        <span style={{ color: C.cyan, fontWeight: 600, fontStyle: 'normal' }}>
          Not this case.
        </span>
      </div>
    </motion.div>
  );
}

function CellGlyph({ idx }) {
  const isTumor = idx === 1;
  return (
    <div style={{
      flex: '1 1 0', minWidth: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '4px',
    }}>
      <svg viewBox="0 0 50 50" width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', maxWidth: '3.5rem' }}>
        <rect
          x={3} y={3} width={44} height={44} rx={20}
          style={{
            fill: isTumor
              ? 'color-mix(in srgb, var(--cyan) 14%, transparent)'
              : 'color-mix(in srgb, var(--panel) 80%, transparent)',
            stroke: isTumor ? C.cyan : C.creamFaint,
            strokeWidth: isTumor ? 1.5 : 1,
          }}
        />
        <circle
          cx={25} cy={25} r={11}
          style={{
            fill: 'color-mix(in srgb, var(--bg) 60%, transparent)',
            stroke: isTumor ? C.cyan : C.creamFaint,
            strokeWidth: 1,
          }}
        />
        {isTumor && <circle cx={25} cy={25} r={3} style={{ fill: C.cyan }} />}
      </svg>
      <span className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-body)',
        letterSpacing: '0.1em',
        color: isTumor ? C.cyan : C.creamFaint,
        fontWeight: 600,
      }}>
        {isTumor ? 'Tumor' : 'WT'}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * CARD 2 (LEFT BOTTOM) — IDH-inhibitor competitor landscape
 * Vertical stack of 4 mini-rows. Same visual grammar as the right
 * card; ivosidenib gets the cyan accent rail, others read as context.
 * ═══════════════════════════════════════════════════════════════════ */
const COMPETITORS = [
  { drug: 'Ivosidenib',    target: 'IDH1',   indication: 'AML · CCA',      approval: 'FDA 2018',     note: 'India 2025 — this case', isThisCase: true },
  { drug: 'Enasidenib',    target: 'IDH2',   indication: 'AML R/R',        approval: 'FDA 2017',     note: 'first-in-class IDH',     isThisCase: false },
  { drug: 'Olutasidenib',  target: 'IDH1',   indication: 'AML R/R',        approval: 'FDA 2022',     note: '2nd IDH1 entrant',       isThisCase: false },
  { drug: 'Vorasidenib',   target: 'IDH1/2', indication: 'Grade 2 glioma', approval: 'FDA Aug 2024', note: 'brain-penetrant',        isThisCase: false },
];

function CompetitorCard({ go, reduced, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE, delay: reduced ? 0 : delay }}
      style={{
        border: `1px solid ${C.hairline}`,
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4) var(--space-5)',
        flex: '1 1 0', minHeight: 0, minWidth: 0,
        display: 'flex', flexDirection: 'column',
        gap: 'var(--space-2)',
        overflow: 'hidden',
      }}
    >
      {/* Card kicker */}
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-kicker)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: C.cyan,
        flexShrink: 0,
      }}>
        IDH-inhibitor landscape
      </div>

      {/* Subtitle — public-source receipt */}
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-body)',
        letterSpacing: '0.06em',
        color: C.creamFaint,
        fontStyle: 'italic',
        flexShrink: 0,
      }}>
        Public approvals · FDA Drugs@FDA verified 2026
      </div>

      {/* Stack — 4 mini-rows */}
      <div style={{
        flex: 1, minHeight: 0,
        display: 'flex', flexDirection: 'column',
        gap: 'var(--space-1)',
        marginTop: 'var(--space-1)',
      }}>
        {COMPETITORS.map((c) => {
          const accent = c.isThisCase ? C.cyan : C.creamFaint;
          return (
            <div key={c.drug} style={{
              borderLeft: `3px solid ${accent}`,
              paddingLeft: 'var(--space-3)',
              paddingTop: '4px', paddingBottom: '4px',
              minWidth: 0,
            }}>
              <div style={{
                display: 'flex', alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 'var(--space-2)',
              }}>
                <span className="deck-display" style={{
                  fontStyle: 'italic',
                  fontSize: 'var(--fs-slide-subhead)',
                  fontWeight: 600,
                  color: c.isThisCase ? C.cyan : C.cream,
                  lineHeight: 1.1,
                }}>
                  {c.drug}
                </span>
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-body)',
                  letterSpacing: '0.06em',
                  color: accent,
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {c.target}
                </span>
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-slide-body)',
                color: C.creamMuted,
                lineHeight: 1.3,
              }}>
                {c.indication} · {c.approval} ·{' '}
                <span style={{
                  color: c.isThisCase ? C.cyan : C.creamFaint,
                  fontStyle: 'italic',
                }}>
                  {c.note}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 * CARD 3 (RIGHT) — Inside the tumor cell
 * Disease cascade → drug intervention → drug cascade. Big card,
 * fills the right column. Diagram uses absolute-inset containment
 * pattern from cs1-build/CompartmentSchematic.
 * ═══════════════════════════════════════════════════════════════════ */
const CASCADE_NODES = [
  { id: 'src',  diseaseTop: 'Source',     diseaseMain: 'IDH1 R132',           drugTop: 'Source + drug',   drugMain: 'IDH1 R132 + ivosidenib' },
  { id: 'meta', diseaseTop: 'Neomorphic', diseaseMain: '↑ 2-HG · ↓ α-KG',     drugTop: 'Restored',        drugMain: 'α-KG production' },
  { id: 'enz',  diseaseTop: 'Enzymes',    diseaseMain: 'TET2 · JmjC inhibited', drugTop: 'Enzymes',       drugMain: 'TET2 · JmjC active' },
  { id: 'phen', diseaseTop: 'Phenotype',  diseaseMain: 'blocked differentiation', drugTop: 'Phenotype', drugMain: 'differentiation resumes' },
];

function CascadeCard({ go, reduced, delay, diseaseStart, interventionAt, drugFlipAt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE, delay: reduced ? 0 : delay }}
      style={{
        border: `1px solid color-mix(in srgb, var(--cyan) 28%, transparent)`,
        background: 'color-mix(in srgb, var(--cyan) 5%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4) var(--space-5)',
        flex: '1 1 0', minHeight: 0, minWidth: 0,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Card kicker */}
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-kicker)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: C.cyan,
        marginBottom: 'var(--space-1)',
        flexShrink: 0,
      }}>
        Inside the tumor cell — cascade flips on drug binding
      </div>

      {/* Subtitle — receipt-style mono */}
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-body)',
        letterSpacing: '0.06em',
        color: C.creamFaint,
        fontStyle: 'italic',
        marginBottom: 'var(--space-3)',
        flexShrink: 0,
      }}>
        Disease state → ivosidenib intervenes → drug state ·{' '}
        <span style={{ color: C.cyan, fontStyle: 'normal', fontWeight: 600 }}>
          differentiation resumes
        </span>
      </div>

      {/* Cascade body — intrinsically sized flex layout */}
      <div style={{ 
        flex: 1, minHeight: 0, minWidth: 0, 
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-evenly',
        gap: 'clamp(var(--space-4), 3vh, var(--space-6))',
        paddingTop: 'var(--space-4)',
      }}>
          {/* DISEASE row */}
          <CascadeRow
            stateLabel="Disease state"
            phase="disease"
            go={go} reduced={reduced}
            baseDelay={diseaseStart}
            flipAt={drugFlipAt}
          />

          {/* Drug intervention bar */}
          <DrugInterventionBar go={go} reduced={reduced} delay={interventionAt} />

          {/* DRUG row (renders post-flip via state swap inside CascadeRow) */}
          <CascadeRow
            stateLabel="Drug state"
            phase="drug"
            go={go} reduced={reduced}
            baseDelay={drugFlipAt + 0.2}
            flipAt={drugFlipAt}
          />
      </div>

      {/* Card footer mono — public-source receipt */}
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-body)',
        letterSpacing: '0.06em',
        color: C.creamFaint,
        lineHeight: 1.3,
        marginTop: 'var(--space-3)',
        flexShrink: 0,
      }}>
        Mechanism · Dang 2009 · TET2/JmjC inhibition · Figueroa 2010 · α-KG displacement
      </div>
    </motion.div>
  );
}

/* CascadeRow — one row of 4 nodes, all rendered for the given phase
 * (disease or drug). Fades in starting at baseDelay; for the disease row
 * we additionally fade it out a bit when drugFlipAt fires so the drug
 * row reads as the "current state". */
function CascadeRow({ stateLabel, phase, go, reduced, baseDelay, flipAt }) {
  const isDrug = phase === 'drug';
  const accent = isDrug ? C.cyan : C.creamFaint;

  // Disease row dims at flipAt; drug row reveals at flipAt.
  const opacityAnim = isDrug
    ? { opacity: [0, 0, 1] }
    : { opacity: [0, 1, 0.45] };
  const opacityTimes = isDrug ? [0, 0.95, 1] : [0, 0.55, 1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={go ? opacityAnim : { opacity: 1 }}
      transition={{
        duration: reduced ? 0 : (isDrug ? 0.6 : 2.2),
        ease: EASE,
        delay: reduced ? 0 : (isDrug ? flipAt : baseDelay),
        times: opacityTimes,
      }}
      style={{
        display: 'flex', flexDirection: 'column',
        gap: 'var(--space-2)',
        minWidth: 0,
      }}
    >
      {/* Row label */}
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-subhead)',
        letterSpacing: '0.14em',
        color: accent,
        fontWeight: 700,
      }}>
        {stateLabel}
      </div>

      {/* 4-node row with connectors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 'var(--space-1)',
        alignItems: 'stretch',
      }}>
        {CASCADE_NODES.map((n, i) => {
          const top = isDrug ? n.drugTop : n.diseaseTop;
          const main = isDrug ? n.drugMain : n.diseaseMain;
          const isTerminal = i === CASCADE_NODES.length - 1;
          return (
            <div key={n.id} style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
              <div style={{
                flex: 1, minWidth: 0,
                padding: 'var(--space-2) var(--space-3)',
                background: isDrug
                  ? 'color-mix(in srgb, var(--cyan) 14%, transparent)'
                  : C.panel,
                border: isDrug
                  ? `1px solid color-mix(in srgb, var(--cyan) 45%, transparent)`
                  : `1px solid ${C.creamFaint}`,
                borderRadius: 'var(--radius-sm)',
                display: 'flex', flexDirection: 'column',
                gap: '2px',
              }}>
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-body)',
                  letterSpacing: '0.1em',
                  color: accent,
                  fontWeight: 600,
                }}>
                  {top}
                </div>
                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  fontStyle: isTerminal ? 'italic' : 'normal',
                  color: isTerminal && isDrug ? C.cyan : C.cream,
                  lineHeight: 1.25,
                  fontWeight: 500,
                }}>
                  {main}
                </div>
              </div>

              {/* Connector arrow (omit after last node) */}
              {i < CASCADE_NODES.length - 1 && (
                <svg width="14" height="10" viewBox="0 0 14 10" style={{ flex: '0 0 auto', marginLeft: 2, marginRight: 2 }}>
                  <path
                    d="M 1 5 L 12 5 M 9 2 L 12 5 L 9 8"
                    fill="none"
                    stroke={accent}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* DrugInterventionBar — full-width pill row that animates in between
 * the disease and drug cascade rows. Reads as "ivosidenib enters; this
 * is the moment the cascade flips." */
function DrugInterventionBar({ go, reduced, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={go ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: EASE, delay: reduced ? 0 : delay }}
      style={{
        display: 'flex', alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-4)',
        border: `1px solid color-mix(in srgb, var(--cyan) 45%, transparent)`,
        background: 'color-mix(in srgb, var(--cyan) 12%, transparent)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      {/* Pill icon — capsule glyph */}
      <svg width="40" height="14" viewBox="0 0 40 14" style={{ flex: '0 0 auto' }} aria-hidden>
        <rect x={1} y={1} width={38} height={12} rx={6}
          style={{ fill: 'color-mix(in srgb, var(--cyan) 22%, transparent)', stroke: C.cyan, strokeWidth: 1 }} />
        <line x1={20} y1={1} x2={20} y2={13} style={{ stroke: C.cyan, strokeWidth: 1 }} />
      </svg>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-subhead)',
          letterSpacing: '0.14em',
          color: C.cyan,
          fontWeight: 700,
        }}>
          Ivosidenib intervenes · 500 mg QD
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-body)',
          color: C.creamMuted,
          lineHeight: 1.3,
        }}>
          binds mutant IDH1 active site · α-KG production restored · cascade resumes
        </div>
      </div>

      {/* Right arrow indicator — cascade flips this way */}
      <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden style={{ flex: '0 0 auto' }}>
        <path d="M 2 7 L 14 7 M 11 3 L 14 7 L 11 11" fill="none" stroke={C.cyan} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}
