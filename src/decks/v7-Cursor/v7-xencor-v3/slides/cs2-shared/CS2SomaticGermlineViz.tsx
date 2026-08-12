// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * CS2 Somatic-vs-Germline visual — vertical stack of two panels showing
 * the mechanistic distinction the architecture slide rests on.
 *
 *   GERMLINE (counterfactual): mutation in every cell, ancestry-tracking.
 *     Visual: 3-cell row, ALL three cells carry a red dot in the nucleus.
 *     Caption: "every cell · inherited · drug response tracks ancestry"
 *
 *   SOMATIC IDH1 R132 (THIS CASE): mutation in tumor cell only,
 *     ancestry-independent. Visual: 3-cell row, only the MIDDLE (tumor)
 *     cell carries the dot; flanking cells are wild-type.
 *     Caption: "tumor cell only · acquired · drug response identical
 *     across populations"
 *
 * This preempts the predictable panel probe:
 *   "Why doesn't ethnicity matter for ivosidenib in India?"
 *   → because the drug binds a target that only exists in tumor cells.
 *      Germline ancestry can't gate it.
 *
 * Public-source mechanism: Dang et al., Cancer Cell 2009; Figueroa et al.,
 * Cancer Cell 2010. The somatic-vs-germline framing is standard onco-
 * pharm vocabulary — not a Servier-internal claim.
 */

const C = {
  cyan: 'var(--cyan)',
  cream: 'var(--cream)',
  creamMuted: 'var(--cream-muted)',
  creamFaint: 'var(--cream-faint)',
  panel: 'var(--panel)',
  hairline: 'var(--cream-hairline)',
};

export default function CS2SomaticGermlineViz({ delay = 0.85 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay }}
      style={{
        flex: '1 1 22rem',
        minWidth: 0, minHeight: 0,
        display: 'flex', flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      {/* Section header — names what the audience is about to read */}
      <div className="deck-mono uppercase xc-slide-eyebrow" style={{
        letterSpacing: 'var(--ls-mono-wide)',
        color: C.cyan, fontWeight: 700 }}>
        Why ethnic-independent
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        gap: 'var(--space-3)', minHeight: 0,
      }}>
        <CellRowPanel variant="germline" />
        <CellRowPanel variant="somatic" />
      </div>
    </motion.div>
  );
}

function CellRowPanel({ variant }) {
  const isSomatic = variant === 'somatic';
  return (
    <div style={{
      flex: 1, minHeight: 0,
      display: 'flex', flexDirection: 'column',
      gap: 'var(--space-2)',
      padding: 'var(--space-3) var(--space-4)',
      background: isSomatic
        ? 'color-mix(in srgb, var(--cyan) 9%, transparent)'
        : 'color-mix(in srgb, var(--panel) 70%, transparent)',
      border: isSomatic
        ? '1px solid color-mix(in srgb, var(--cyan) 28%, transparent)'
        : `1px dashed ${C.creamFaint}`,
      borderRadius: 'var(--radius-lg)',
      opacity: isSomatic ? 1 : 0.85,
    }}>
      {/* Panel header row — kicker + status badge */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        gap: 'var(--space-3)',
      }}>
        <span className="deck-mono uppercase xc-slide-eyebrow" style={{
          letterSpacing: 'var(--ls-mono-wide)',
          color: isSomatic ? C.cyan : C.creamFaint,
          fontWeight: 700 }}>
          {isSomatic ? 'Somatic · this case' : 'If germline · counterfactual'}
        </span>
        <span className="deck-display xc-slide-subhead" style={{
          fontStyle: 'italic',
          color: isSomatic ? C.cyan : C.creamFaint,
          fontWeight: 600 }}>
          {isSomatic ? 'IDH1 R132' : 'e.g. CYP2C19 *2'}
        </span>
      </div>

      {/* Cell-row schematic + caption — flex row, schematic left, caption right */}
      <div style={{
        flex: 1, minHeight: 0,
        display: 'flex', alignItems: 'center',
        gap: 'var(--space-4)',
      }}>
        <div style={{ flex: '0 0 clamp(8rem, 22%, 12rem)', minWidth: 0 }}>
          <CellRow variant={variant} />
        </div>

        <div style={{ flex: 1, minWidth: 0,
          display: 'flex', flexDirection: 'column', gap: 'var(--space-1)',
        }}>
          <div className={`xc-slide-subhead ${isSomatic ? 'xc-ink' : 'xc-muted'}`} style={{
            lineHeight: 1.45,
          }}>
            {isSomatic
              ? <><span className="xc-cyan" style={{ fontWeight: 600 }}>Tumor cell only.</span> Acquired during tumorigenesis, not in germline DNA.</>
              : <>Inherited variant present in every cell — frequency varies by ancestry.</>}
          </div>
          <div className="xc-meta" style={{
            letterSpacing: 'var(--ls-mono-wide)',
            color: isSomatic ? C.cyan : C.creamFaint,
            fontWeight: 600,
            lineHeight: 1.3 }}>
            {isSomatic
              ? '↳ Drug-target identical across populations'
              : '↳ Drug response would track ancestry'}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 3-cell row.
 * - Germline panel: all 3 cells carry the mutation marker (red-orange dot).
 * - Somatic panel: only the middle cell carries the marker (cyan dot,
 *   tumor cell highlighted with cyan stroke).
 * Cell visual: rounded rectangle = cytoplasm, inner circle = nucleus,
 * dot inside nucleus = mutation locus.
 */
function CellRow({ variant }) {
  const isSomatic = variant === 'somatic';
  /* BOUNDING-BOX AUDIT (viewBox 180×60)
   * Element            x-range    y-range
   * Cell 1 (cyto)       2-44        4-50
   * Cell 1 (nucl)      14-32       16-38
   * Cell 2 (cyto)      66-108       4-50
   * Cell 2 (nucl)      78-96       16-38
   * Cell 3 (cyto)     130-172       4-50
   * Cell 3 (nucl)     142-160      16-38
   * Mutation dots: 6×6 inside each nucleus center
   * gap between cells: 22px, fits hairline gap on narrow viewports
   */
  return (
    <svg viewBox="0 0 180 60" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      {[0, 1, 2].map((i) => {
        const cx = 23 + i * 64;        // cell center x
        const isMutated = isSomatic ? i === 1 : true;
        const isTumorCell = isSomatic && i === 1;
        return (
          <g key={i}>
            {/* Cytoplasm — rounded rect */}
            <rect
              x={cx - 21} y={4} width={42} height={46} rx={20}
              style={{
                fill: isTumorCell
                  ? 'color-mix(in srgb, var(--cyan) 14%, transparent)'
                  : 'color-mix(in srgb, var(--panel) 80%, transparent)',
                stroke: isTumorCell ? C.cyan : C.creamFaint,
                strokeWidth: isTumorCell ? 1.5 : 1,
              }}
            />
            {/* Nucleus — inner circle */}
            <circle
              cx={cx} cy={27} r={11}
              style={{
                fill: 'color-mix(in srgb, var(--bg) 60%, transparent)',
                stroke: isTumorCell ? C.cyan : C.creamFaint,
                strokeWidth: 1,
              }}
            />
            {/* Mutation locus — small dot. Germline dots use cream-faint
                (neutral) to read as "muted / not the operative pathway";
                somatic dot is cyan to read as "this is the case." */}
            {isMutated && (
              <circle
                cx={cx} cy={27} r={3}
                style={{
                  fill: isSomatic ? C.cyan : C.creamFaint,
                }}
              />
            )}
            {/* Cell label */}
            <text
              x={cx} y={56}
              textAnchor="middle"
              className="xc-svg-meta"
              letterSpacing="0.4"
              style={{
                fill: isTumorCell ? C.cyan : (isMutated && !isSomatic ? C.creamFaint : C.creamFaint),
              }}
            >
              {isTumorCell ? 'TUMOR' : (isSomatic ? 'WT' : 'mut')}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
