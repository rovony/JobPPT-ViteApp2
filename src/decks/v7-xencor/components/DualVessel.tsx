// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * DualVessel — side-by-side vessel cross-sections showing
 * pathophysiology (no drug) vs ambrisentan MOA.
 *
 * 2026-04-26 — built for cs1-mechanism per user direction:
 *   "duplicate it one without drugs one with to show pathopyshoklogy
 *    and MOA of drugs, and maybe have vessel like structure, and
 *    color code for things like NO, etc and try to make it easy to
 *    understand and powerfull"
 *
 * Visual grammar:
 *   Two longitudinal vessel "tubes" rendered as horizontal bands
 *   with thickened walls (smooth muscle) framing a lumen. Molecules
 *   inside the lumen represent ET-1 (coral) / NO (cyan) / ambrisentan
 *   (amber). Receptors (ETA, ETB) sit on the inner wall surface.
 *
 *   LEFT — PAH (untreated) — narrow lumen, ET-1 active on ETA + ETB,
 *   vasoconstriction + proliferation arrows pointing inward.
 *
 *   RIGHT — ambrisentan-treated — wider lumen, amber blockers on ETA,
 *   ETB preserved with NO release, vasodilation arrows outward.
 *
 *   Color legend (color-coded per mediator class):
 *     ET-1         · var(--case) coral · vasoconstrictor
 *     NO           · var(--cyan)         · vasodilator
 *     Ambrisentan  · var(--amber)        · ETA blocker
 *
 *   Animations:
 *     · Vessel walls fade in (delay 0.0s)
 *     · Mediator molecules pulse-flow inside lumen (loop)
 *     · Right-side blockers slide in at delay 0.6s
 *     · Lumen-width difference visible from t=0
 *
 *   Pre-empts probes (per memory feedback_visuals_anticipate_probes):
 *     · "what does ETA do?" → constriction arrows on left
 *     · "why is ETB sparing important?" → NO release on right
 *     · "what's the selectivity ratio?" → footer caption
 *     · "what's different from bosentan?" → footer caption
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function DualVessel({ delay = 0 }) {
  const reduced = useReducedMotion();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'stretch',
      columnGap: 0,
      minHeight: 0,
    }}>
      {/* LEFT — PAH state */}
      <VesselPanel
        side="left"
        stateLabel="Disease — untreated PAH"
        stateColor="var(--case)"
        delay={delay}
        reduced={reduced}
      />

      {/* CENTER — divider + arrow */}
      <Divider reduced={reduced} delay={delay + 0.4} />

      {/* RIGHT — ambrisentan-treated */}
      <VesselPanel
        side="right"
        stateLabel="Treated — ambrisentan"
        stateColor="var(--amber)"
        delay={delay + 0.2}
        reduced={reduced}
      />
    </div>
  );
}

/* ── Vessel panel — one of the two tubes ─────────────────────── */
function VesselPanel({ side, stateLabel, stateColor, delay, reduced }) {
  const isLeft = side === 'left';
  // Lumen width: narrow on PAH (constricted), wider on ambrisentan
  const lumenHeight = isLeft ? 26 : 56;
  const wallHeight = isLeft ? 32 : 17;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: isLeft ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        minWidth: 0,
        padding: '0 var(--space-2)',
      }}
    >
      {/* State label */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        gap: 'var(--space-2)',
      }}>
        <span aria-hidden style={{
          width: 8, height: 8, borderRadius: '50%',
          background: stateColor,
          display: 'inline-block',
          flexShrink: 0,
        }} />
        <span className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: stateColor,
          fontWeight: 700,
        }}>
          {stateLabel}
        </span>
      </div>

      {/* Vessel SVG */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <svg
          viewBox="0 0 200 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
          style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
        >
          {/* Top wall — smooth muscle band */}
          <rect
            x="6" y={50 - lumenHeight/2 - wallHeight}
            width="188" height={wallHeight}
            fill={isLeft
              ? 'color-mix(in srgb, var(--case) 32%, var(--bg))'
              : 'color-mix(in srgb, var(--sage) 22%, var(--bg))'}
            stroke={isLeft ? 'var(--case)' : 'var(--sage)'}
            strokeWidth="0.6"
            opacity="0.75"
          />
          {/* Endothelium hairline (top) */}
          <line
            x1="6" y1={50 - lumenHeight/2}
            x2="194" y2={50 - lumenHeight/2}
            stroke="var(--cream-muted)"
            strokeWidth="0.4"
            opacity="0.6"
          />
          {/* Bottom wall */}
          <rect
            x="6" y={50 + lumenHeight/2}
            width="188" height={wallHeight}
            fill={isLeft
              ? 'color-mix(in srgb, var(--case) 32%, var(--bg))'
              : 'color-mix(in srgb, var(--sage) 22%, var(--bg))'}
            stroke={isLeft ? 'var(--case)' : 'var(--sage)'}
            strokeWidth="0.6"
            opacity="0.75"
          />
          {/* Endothelium hairline (bottom) */}
          <line
            x1="6" y1={50 + lumenHeight/2}
            x2="194" y2={50 + lumenHeight/2}
            stroke="var(--cream-muted)"
            strokeWidth="0.4"
            opacity="0.6"
          />

          {/* PAH side: ET-1 molecules + ETA active + vasoconstriction */}
          {isLeft && <PahContent reduced={reduced} delay={delay} />}
          {/* Ambrisentan side: blockers + ETB + NO release */}
          {!isLeft && <TreatedContent reduced={reduced} delay={delay} />}

          {/* Lumen-width annotation arrows (visible always) */}
          <LumenAnnotation
            isLeft={isLeft}
            lumenHeight={lumenHeight}
          />
        </svg>
      </div>

      {/* Effects strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        gap: 'var(--space-2)',
        flexWrap: 'wrap',
      }}>
        {(isLeft
          ? [
              { icon: '↑', text: 'Vasoconstriction', color: 'var(--case)' },
              { icon: '↑', text: 'SMC proliferation', color: 'var(--case)' },
            ]
          : [
              { icon: '↓', text: 'Vasoconstriction', color: 'var(--sage)' },
              { icon: '↓', text: 'Proliferation', color: 'var(--sage)' },
              { icon: 'NO', text: 'preserved', color: 'var(--cyan)' },
            ]
        ).map((e, i) => (
          <span key={i} className="deck-mono" style={{
            fontSize: 'var(--fs-slide-pageno)',
            color: 'var(--cream)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 8px',
            border: `1px solid color-mix(in srgb, ${e.color} 36%, transparent)`,
            borderRadius: 'var(--radius-sm)',
            background: `color-mix(in srgb, ${e.color} 8%, transparent)`,
          }}>
            <span style={{ color: e.color, fontWeight: 800 }}>{e.icon}</span>
            {e.text}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── PAH side content (ET-1 binding ETA, no drug) ────────────── */
function PahContent({ reduced, delay }) {
  // ET-1 dots in lumen (coral), ETA receptors active (left wall), ETB also bound
  const ET1_DOTS = [
    { cx: 30, cy: 50, d: 0.0 },
    { cx: 60, cy: 46, d: 0.3 },
    { cx: 90, cy: 52, d: 0.6 },
    { cx: 120, cy: 48, d: 0.9 },
    { cx: 150, cy: 51, d: 1.2 },
    { cx: 175, cy: 47, d: 1.5 },
  ];

  return (
    <g>
      {/* ET-1 molecules in lumen — coral pulsing dots */}
      {ET1_DOTS.map((d, i) => (
        <motion.circle
          key={`et-${i}`}
          cx={d.cx} cy={d.cy} r={2.2}
          fill="var(--case)"
          initial={reduced ? { opacity: 0.85 } : { opacity: 0 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={reduced ? { duration: 0 } : {
            duration: 2.5,
            delay: delay + d.d,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ETA receptor on top wall — active binding */}
      <Receptor x={50} y={36} type="ETA" active />
      <Receptor x={130} y={36} type="ETA" active />
      {/* ETB receptor on bottom wall — also bound (less selective state) */}
      <Receptor x={90} y={64} type="ETB" active dim />

      {/* Vasoconstriction arrows pointing inward */}
      <ConstrictArrow x={20} y1={32} y2={42} />
      <ConstrictArrow x={20} y1={68} y2={58} dir="up" />
      <ConstrictArrow x={180} y1={32} y2={42} />
      <ConstrictArrow x={180} y1={68} y2={58} dir="up" />

      {/* ET-1 label */}
      <text x={100} y={18}
        fontFamily="var(--font-mono)" fontSize="6" letterSpacing="1"
        fontWeight="700" fill="var(--case)" textAnchor="middle">
        ET-1 ACTIVE
      </text>
    </g>
  );
}

/* ── Treated side content (ambrisentan blocking ETA, ETB preserved) ── */
function TreatedContent({ reduced, delay }) {
  // Fewer ET-1 dots (some still around) + ambrisentan blockers + NO dots from ETB
  const NO_DOTS = [
    { cx: 35, cy: 45, d: 0.2 },
    { cx: 70, cy: 55, d: 0.5 },
    { cx: 105, cy: 47, d: 0.8 },
    { cx: 140, cy: 53, d: 1.1 },
    { cx: 170, cy: 49, d: 1.4 },
  ];
  const ET1_DOTS = [
    { cx: 50, cy: 50, d: 0 },
    { cx: 120, cy: 48, d: 0.4 },
  ];

  return (
    <g>
      {/* Few residual ET-1 — coral, dimmer */}
      {ET1_DOTS.map((d, i) => (
        <motion.circle
          key={`et-${i}`}
          cx={d.cx} cy={d.cy} r={1.8}
          fill="var(--case)"
          fillOpacity={0.45}
          initial={reduced ? { opacity: 0.45 } : { opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={reduced ? { duration: 0 } : {
            duration: 2.5,
            delay: delay + d.d,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Ambrisentan blockers on ETA receptors — amber pills */}
      <Blocker x={50} y={36} delay={delay + 0.6} reduced={reduced} />
      <Blocker x={130} y={36} delay={delay + 0.75} reduced={reduced} />

      {/* ETA receptor — BLOCKED state (faded) */}
      <Receptor x={50} y={36} type="ETA" blocked />
      <Receptor x={130} y={36} type="ETA" blocked />

      {/* ETB receptor — PRESERVED, releasing NO */}
      <Receptor x={90} y={64} type="ETB" active />

      {/* NO dots flowing from ETB into lumen — cyan */}
      {NO_DOTS.map((d, i) => (
        <motion.circle
          key={`no-${i}`}
          cx={d.cx} cy={d.cy} r={1.8}
          fill="var(--cyan)"
          initial={reduced ? { opacity: 0.85 } : { opacity: 0 }}
          animate={{ opacity: [0.5, 0.95, 0.5] }}
          transition={reduced ? { duration: 0 } : {
            duration: 2.2,
            delay: delay + d.d,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Vasodilation arrows pointing outward */}
      <ConstrictArrow x={20} y1={42} y2={32} dir="up" tone="sage" />
      <ConstrictArrow x={20} y1={58} y2={68} tone="sage" />
      <ConstrictArrow x={180} y1={42} y2={32} dir="up" tone="sage" />
      <ConstrictArrow x={180} y1={58} y2={68} tone="sage" />

      {/* Labels */}
      <text x={100} y={18}
        fontFamily="var(--font-mono)" fontSize="6" letterSpacing="1"
        fontWeight="700" fill="var(--amber)" textAnchor="middle">
        ETA BLOCKED · ETB PRESERVED
      </text>
    </g>
  );
}

/* ── Receptor symbol — small notch on the wall ─────────────────── */
function Receptor({ x, y, type, active, blocked, dim }) {
  const color = type === 'ETA' ? 'var(--case)' : 'var(--cyan)';
  const opacity = blocked ? 0.35 : (dim ? 0.55 : 0.85);
  return (
    <g opacity={opacity}>
      {/* Receptor cup */}
      <path
        d={`M ${x-3.5} ${y-2} L ${x-3.5} ${y+2} L ${x-1} ${y+4} L ${x+1} ${y+4} L ${x+3.5} ${y+2} L ${x+3.5} ${y-2}`}
        fill={color}
        fillOpacity={active && !blocked ? 0.55 : 0.25}
        stroke={color}
        strokeWidth="0.5"
      />
      <text
        x={x} y={y - 4}
        fontFamily="var(--font-mono)" fontSize="3.2" letterSpacing="0.2"
        fontWeight="800" fill={color} textAnchor="middle"
      >
        {type}
      </text>
    </g>
  );
}

/* ── Blocker pill — ambrisentan on ETA ─────────────────────────── */
function Blocker({ x, y, delay, reduced }) {
  return (
    <motion.g
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <rect
        x={x - 4.5} y={y - 4} width="9" height="4.5" rx="2"
        fill="var(--amber)"
        stroke="var(--amber)"
        strokeWidth="0.4"
      />
      <text
        x={x} y={y - 6}
        fontFamily="var(--font-mono)" fontSize="3"
        fontWeight="800" fill="var(--amber)" textAnchor="middle"
      >
        AMB
      </text>
    </motion.g>
  );
}

/* ── Constriction / dilation arrows ─────────────────────────────── */
function ConstrictArrow({ x, y1, y2, dir = 'down', tone = 'case' }) {
  const color = tone === 'sage' ? 'var(--sage)' : 'var(--case)';
  const arrowY = dir === 'up' ? y2 + 1.5 : y2 - 1.5;
  const arrowOffsetSign = dir === 'up' ? 1 : -1;
  return (
    <g opacity={0.7}>
      <line x1={x} y1={y1} x2={x} y2={y2}
        stroke={color} strokeWidth="0.6" />
      <polygon
        points={`${x-1.5},${arrowY} ${x+1.5},${arrowY} ${x},${y2 + arrowOffsetSign * 0}`}
        fill={color}
      />
    </g>
  );
}

/* ── Lumen-width visual indicator on the right edge ─────────────── */
function LumenAnnotation({ isLeft, lumenHeight }) {
  const x = isLeft ? 197 : 3;
  const y1 = 50 - lumenHeight/2;
  const y2 = 50 + lumenHeight/2;
  return (
    <g opacity={0.55}>
      <line x1={x} y1={y1} x2={x} y2={y2}
        stroke="var(--cream-muted)" strokeWidth="0.4" />
      <text
        x={isLeft ? x - 1 : x + 1}
        y={50 + 1}
        fontFamily="var(--font-mono)" fontSize="3.5"
        fontWeight="700"
        fill={isLeft ? 'var(--case)' : 'var(--sage)'}
        textAnchor={isLeft ? 'end' : 'start'}
        letterSpacing="0.1"
      >
        {isLeft ? 'NARROW' : 'OPEN'}
      </text>
    </g>
  );
}

/* ── Center divider with arrow ─────────────────────────────────── */
function Divider({ reduced, delay }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: '0 var(--space-2)',
        position: 'relative',
      }}
    >
      <div aria-hidden style={{
        width: 1,
        flex: 1,
        background: 'linear-gradient(180deg, transparent 0%, var(--cream-hairline) 30%, var(--cream-hairline) 70%, transparent 100%)',
      }} />
      <div className="deck-mono uppercase" style={{
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--cream-faint)',
        fontWeight: 700,
        padding: '8px 0',
      }}>
        + ambrisentan →
      </div>
      <div aria-hidden style={{
        width: 1,
        flex: 1,
        background: 'linear-gradient(180deg, transparent 0%, var(--cream-hairline) 30%, var(--cream-hairline) 70%, transparent 100%)',
      }} />
    </motion.div>
  );
}
