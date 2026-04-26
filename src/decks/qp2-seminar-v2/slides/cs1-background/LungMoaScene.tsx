import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import LungsShared from './LungsShared';

/**
 * LungMoaScene — replaces the static disease/drug text cards on slide 06.
 *
 * Layout (3-col grid, 16:9 friendly):
 *   ┌──────────────┬──────────────────┬──────────────┐
 *   │ 01 PATHWAY   │                  │ 02 ANTAGONIST│
 *   │ Endothelin   │     LUNG HERO    │ Ambrisentan  │
 *   │ signaling    │  (layoutId       │              │
 *   │              │   morph from S05)│              │
 *   │ ┌──────────┐ │                  │ ┌──────────┐ │
 *   │ │ pathway  │ │                  │ │antagonist│ │
 *   │ │ puck     │ │                  │ │ puck     │ │
 *   │ │ (cycle)  │ │                  │ │ (cycle)  │ │
 *   │ └──────────┘ │                  │ └──────────┘ │
 *   │ ET-1 binds   │                  │ ETA blocked  │
 *   │ ETA → VC     │                  │ → dilation   │
 *   └──────────────┴──────────────────┴──────────────┘
 *
 * Each puck is a self-contained SVG cell that runs a synchronized 6 s
 * cycle (Δt ≈ 0 between pucks → split-screen of the same biology with
 * vs without antagonist):
 *
 *   t = 0.0–1.2 s   resting vessel · receptors empty
 *   t = 1.2–2.4 s   ligands travel in
 *   t = 2.4–4.8 s   bound state — pathway side: wall thickens; antagonist side: blockers shield receptors
 *   t = 4.8–6.0 s   release / loop
 *
 * Reduced-motion: pucks render their end-state, no looping.
 *
 * Why pucks instead of in-place-on-lung sprites: at 1280×720 the lung
 * vasculature renders too fine for receptor-level events to read at
 * presentation distance. Pucks zoom the action to ~180 px so the
 * audience can decode the mechanism in ≤ 3 seconds.
 */
export default function LungMoaScene({ delay = 1.7, reduce: reduceProp }) {
  const reduceHook = useReducedMotion();
  const reduce = reduceProp ?? reduceHook;

  return (
    <div
      className="cs1-moa-scene"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(220px, 0.85fr) minmax(0, 2.2fr) minmax(220px, 0.85fr)',
        columnGap: 'clamp(20px, 2vw, 48px)',
        alignItems: 'center',
        minHeight: 0,
      }}
    >
      <style>{`
        @media (max-width: 1100px) {
          .cs1-moa-scene {
            grid-template-columns: minmax(200px, 0.9fr) minmax(0, 1.8fr) minmax(200px, 0.9fr) !important;
            column-gap: var(--space-4) !important;
          }
        }
        @media (max-width: 900px) {
          .cs1-moa-scene {
            grid-template-columns: 1fr 1fr !important;
            column-gap: var(--space-4) !important;
          }
          .cs1-moa-scene .cs1-moa-lung { display: none !important; }
        }
        @media (max-width: 640px) {
          .cs1-moa-scene { grid-template-columns: 1fr !important; row-gap: var(--space-4) !important; }
        }
      `}</style>

      {/* LEFT — PATHWAY annotation column */}
      <AnnotationColumn
        side="left"
        eyebrow="01 · THE PATHWAY"
        title="Endothelin signaling"
        caption={
          <>
            ET-1 binds <CardHl>ET<sub>A</sub> receptors</CardHl> on pulmonary smooth muscle —
            drives vasoconstriction and progressive remodeling.
          </>
        }
        delay={delay}
      >
        <ReceptorPuck variant="pathway" reduce={reduce} delay={delay + 0.4} />
      </AnnotationColumn>

      {/* CENTER — LUNG HERO. Wrap in pointer-events:none so the absolute
          callout layers (none here yet, but reserved) don't snag clicks. */}
      <div
        className="cs1-moa-lung"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 0,
          minHeight: 0,
          pointerEvents: 'none',
        }}
      >
        <LungsShared layoutId="lung-lynch" variant="context" />
      </div>

      {/* RIGHT — ANTAGONIST annotation column */}
      <AnnotationColumn
        side="right"
        eyebrow="02 · THE ANTAGONIST"
        title="Ambrisentan"
        caption={
          <>
            Selective <CardHl>ET<sub>A</sub> receptor antagonist</CardHl> — blocks the upstream
            signal at the pulmonary endothelium. Once-daily oral.
          </>
        }
        delay={delay + 0.25}
      >
        <ReceptorPuck variant="antagonist" reduce={reduce} delay={delay + 0.65} />
      </AnnotationColumn>
    </div>
  );
}

/* ====================================================================
   AnnotationColumn — eyebrow / title / puck / caption stack.
   side controls text/puck alignment so the columns mirror across the
   lung. Body text is intentionally 32-ch capped; the puck is the
   information-dense element here.
   ==================================================================== */
function AnnotationColumn({ side, eyebrow, title, caption, delay, children }) {
  // Eyebrow + title align to the column's outer edge (mirrors across the
  // lung). Body caption stays left-aligned both sides for readability —
  // mirroring the body too forced the right column to read inside-out.
  const headAlign = side === 'left' ? 'flex-start' : 'flex-end';
  const headTextAlign = side === 'left' ? 'left' : 'right';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        alignItems: 'stretch',
        minWidth: 0,
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: '0.22em',
          color: 'var(--coral)',
          textAlign: headTextAlign,
          alignSelf: headAlign,
        }}
      >
        {eyebrow}
      </span>
      <h3
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-title)',
          lineHeight: 1.1,
          color: 'var(--cream)',
          fontWeight: 500,
          margin: 0,
          textAlign: headTextAlign,
        }}
      >
        {title}
      </h3>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {children}
      </div>
      <p
        style={{
          fontSize: 'var(--fs-body)',
          lineHeight: 'var(--lh-snug)',
          color: 'var(--cream-muted)',
          margin: 0,
          maxWidth: '34ch',
          alignSelf: headAlign,
          textAlign: 'left',
        }}
      >
        {caption}
      </p>
    </motion.div>
  );
}

/* CardHl — local micro highlight pill that mirrors CaseBodyCard's
   CardHighlight without pulling that whole component for two words. */
function CardHl({ children }) {
  return (
    <span
      style={{
        background: 'var(--coral-wash, rgba(251,146,60,0.16))',
        color: 'var(--cream)',
        fontWeight: 500,
        padding: '0 4px',
        borderRadius: 3,
      }}
    >
      {children}
    </span>
  );
}

/* ====================================================================
   ReceptorPuck — circular vessel cross-section with ligand-binding
   animation. Two variants share geometry; only the active sprites and
   wall-thickness behavior differ.

   Geometry (anatomical):
     SIZE                = 200 px viewBox
     outerR              = 86 px (vessel adventitia · constant)
     innerR (rest)       = 64 px (lumen radius at rest · 22 px wall)
     innerR (constricted)= 38 px (lumen radius at PAH · 48 px wall ≈ 73 % lumen-area drop)
     6 ETA receptors anchored to the rest inner-wall edge so they
     stay readable when the wall thickens.

   The lumen is rendered as a separate filled circle whose radius
   animates — that's what gives the audience the *visible* "narrowing"
   read. Wall mass is rendered as outer-fill minus lumen.
   ==================================================================== */
function ReceptorPuck({ variant, reduce, delay }) {
  const SIZE = 200;
  const cx = SIZE / 2;
  const cy = 96; // lift puck up so caption row has room
  const outerR = 86;
  const innerRest = 64;
  const innerConstricted = 38;

  const RECEPTOR_RING_R = innerRest + 4;
  const receptors = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    receptors.push({
      x: cx + Math.cos(angle) * RECEPTOR_RING_R,
      y: cy + Math.sin(angle) * RECEPTOR_RING_R,
      angle,
    });
  }

  const isPathway = variant === 'pathway';

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width="100%"
      height={SIZE}
      style={{ maxWidth: 220, maxHeight: 220, display: 'block' }}
      role="img"
      aria-label={
        isPathway
          ? 'Endothelin-1 binding ETA receptor causing vasoconstriction'
          : 'Ambrisentan blocking ETA receptor preserving dilation'
      }
    >
      <defs>
        <radialGradient id={`lumen-${variant}`} cx="50%" cy={`${(cy / SIZE) * 100}%`} r="42%">
          <stop offset="0%" stopColor="#0c0a09" stopOpacity={1} />
          <stop offset="100%" stopColor="#0c0a09" stopOpacity={0.92} />
        </radialGradient>
        <radialGradient id={`wall-${variant}`} cx="50%" cy={`${(cy / SIZE) * 100}%`} r="50%">
          <stop offset="0%"  stopColor="var(--coral)" stopOpacity={0.55} />
          <stop offset="60%" stopColor="var(--coral)" stopOpacity={0.40} />
          <stop offset="100%" stopColor="var(--coral)" stopOpacity={0.28} />
        </radialGradient>
      </defs>

      {/* ── Wall mass (radial coral wash) ──────────────────────────
          Rendered first so the lumen circle eats into it visually. */}
      <circle cx={cx} cy={cy} r={outerR} fill={`url(#wall-${variant})`} />

      {/* outer adventitia hairline */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="var(--coral)"
        strokeOpacity={0.7}
        strokeWidth={1.5}
      />

      {/* ── Lumen ──────────────────────────────────────────────────
          Pathway: radius oscillates rest → constricted (visible narrowing).
          Antagonist: stays at rest radius (vessel preserved). */}
      {isPathway ? (
        <motion.circle
          cx={cx}
          cy={cy}
          fill={`url(#lumen-${variant})`}
          stroke="var(--coral)"
          strokeOpacity={0.45}
          strokeWidth={1}
          initial={{ r: innerRest }}
          animate={
            reduce
              ? { r: innerConstricted }
              : { r: [innerRest, innerRest, innerConstricted, innerConstricted, innerRest] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 6,
                  delay,
                  times: [0, 0.25, 0.48, 0.85, 1],
                  repeat: Infinity,
                  ease: [0.2, 0.7, 0.3, 1],
                }
          }
        />
      ) : (
        <circle
          cx={cx}
          cy={cy}
          r={innerRest}
          fill={`url(#lumen-${variant})`}
          stroke="var(--coral)"
          strokeOpacity={0.45}
          strokeWidth={1}
        />
      )}

      {/* tick marks every 60° as endothelium texture */}
      {receptors.map((r, i) => (
        <line
          key={`tick-${i}`}
          x1={cx + Math.cos(r.angle) * (outerR - 2)}
          y1={cy + Math.sin(r.angle) * (outerR - 2)}
          x2={cx + Math.cos(r.angle) * (outerR + 4)}
          y2={cy + Math.sin(r.angle) * (outerR + 4)}
          stroke="var(--cream-hairline)"
          strokeWidth={1}
        />
      ))}

      {/* ── ETA receptors (always visible) ────────────────────── */}
      {receptors.map((r, i) => (
        <circle
          key={`eta-${i}`}
          cx={r.x}
          cy={r.y}
          r={4.5}
          fill="var(--cream)"
          fillOpacity={0.65}
          stroke="var(--coral)"
          strokeWidth={1}
        />
      ))}

      {isPathway ? (
        /* ── Pathway · ET-1 ligands travel in and bind ──────────── */
        receptors.map((r, i) => {
          const startX = cx + Math.cos(r.angle) * (outerR + 28);
          const startY = cy + Math.sin(r.angle) * (outerR + 28);
          return (
            <motion.circle
              key={`et-${i}`}
              r={3.8}
              fill="var(--coral)"
              initial={{ cx: startX, cy: startY, opacity: 0 }}
              animate={
                reduce
                  ? { cx: r.x, cy: r.y, opacity: 1 }
                  : {
                      cx: [startX, startX, r.x, r.x, startX],
                      cy: [startY, startY, r.y, r.y, startY],
                      opacity: [0, 0, 1, 1, 0],
                    }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 6,
                      delay: delay + i * 0.06,
                      times: [0, 0.2, 0.42, 0.85, 1],
                      repeat: Infinity,
                      ease: [0.34, 1.2, 0.64, 1],
                    }
              }
            />
          );
        })
      ) : (
        /* ── Antagonist · blockers occupy ETA receptors ─────────── */
        receptors.map((r, i) => (
          <motion.rect
            key={`amb-${i}`}
            x={r.x - 6.5}
            y={r.y - 6.5}
            width={13}
            height={13}
            rx={2.5}
            fill="var(--coral)"
            stroke="var(--cream)"
            strokeWidth={1}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              reduce
                ? { opacity: 0.95, scale: 1 }
                : {
                    opacity: [0, 0, 0.95, 0.95, 0.95],
                    scale: [0.4, 0.4, 1, 1, 1],
                  }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: 6,
                    delay: delay + 0.4 + i * 0.04,
                    times: [0, 0.18, 0.4, 0.95, 1],
                    repeat: Infinity,
                    ease: [0.34, 1.2, 0.64, 1],
                  }
            }
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))
      )}

      {/* ── Antagonist · ET-1 dots bounce off (rejected) ────────── */}
      {!isPathway &&
        [0, 1, 2].map((idx) => {
          const a = (idx / 3) * Math.PI * 2 + Math.PI / 6;
          const startX = cx + Math.cos(a) * (outerR + 32);
          const startY = cy + Math.sin(a) * (outerR + 32);
          const midX = cx + Math.cos(a) * (outerR + 14);
          const midY = cy + Math.sin(a) * (outerR + 14);
          return (
            <motion.circle
              key={`reject-${idx}`}
              r={3.2}
              fill="var(--cream-muted)"
              fillOpacity={0.7}
              initial={{ cx: startX, cy: startY, opacity: 0 }}
              animate={
                reduce
                  ? { cx: midX, cy: midY, opacity: 0.5 }
                  : {
                      cx: [startX, midX, startX, startX, startX],
                      cy: [startY, midY, startY, startY, startY],
                      opacity: [0, 0.7, 0, 0, 0],
                    }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 6,
                      delay: delay + 1.2 + idx * 0.55,
                      times: [0, 0.5, 1, 1, 1],
                      repeat: Infinity,
                      ease: 'easeOut',
                    }
              }
            />
          );
        })}

      {/* ── Caption row at the bottom of the puck ──────────────── */}
      <motion.text
        x={cx}
        y={SIZE - 18}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="0.18em"
        fill="var(--coral)"
        fontWeight={700}
        initial={{ opacity: 0 }}
        animate={
          reduce
            ? { opacity: 1 }
            : { opacity: [0, 0, 1, 1, 0] }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration: 6,
                delay,
                times: [0, 0.3, 0.5, 0.85, 1],
                repeat: Infinity,
                ease: [0.2, 0.7, 0.3, 1],
              }
        }
      >
        {isPathway ? 'VASOCONSTRICTION' : 'ETA BLOCKED · DILATED'}
      </motion.text>

      {/* sub-caption that stays on for context */}
      <text
        x={cx}
        y={SIZE - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="0.18em"
        fill="var(--cream-muted)"
      >
        {isPathway ? 'ET-1 + ETA' : 'AMBRISENTAN + ETA'}
      </text>
    </svg>
  );
}
