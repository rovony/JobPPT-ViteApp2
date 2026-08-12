import React from 'react';
import { motion } from 'framer-motion';

/**
 * CS2 Pillars (slide 7) — supporting cards 02–06.
 *
 * Design language matches the cs2-disease-background StatCard:
 * - 1px cream-hairline border + panel-mix 70% background
 * - Large weight-700 hero numerals with -0.03em tracking, tabular-nums
 * - Cyan mono uppercase section labels with --ls-mono-wide
 * - Inter body in cream-muted at lineHeight 1.45
 * - Mono meta in cream-faint separated by hairline border-top
 *
 * Six cards on one row → numerals tuned to a smaller floor than the
 * standard --fs-card-numeral so they fit ~178px-wide cells without
 * truncation.
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

/* Pillar text card shell — isolates typography */
export function PillarTextCard({ delay = 0, eyebrow, name, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        border: `1px solid ${C.hairline}`,
        background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        display: 'flex', flexDirection: 'column',
        minWidth: 0, flex: 1.1,
      }}
    >
      {/* Pillar number — high-contrast against the active theme. */}
      <div className="deck-mono uppercase xc-pillar-eyebrow">{eyebrow}</div>

      {/* Pillar name — the cyan section label, matches StatCard's `label` */}
      <div className="deck-mono uppercase xc-pillar-name">{name}</div>

      {children}
    </motion.div>
  );
}

/* Pillar viz card shell — isolates SVG graphics */
export function PillarVizCard({ delay = 0, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        border: `1px solid ${C.hairline}`,
        background: 'color-mix(in srgb, var(--panel) 35%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minWidth: 0, flex: 1, minHeight: 0,
      }}
    >
      {children}
    </motion.div>
  );
}

/* Hero numeral — large display, weight 700, tabular nums.
 * Smaller floor than --fs-card-numeral so 6-across fits at 1280. */
export function PillarHeroNumber({ children }) {
  return (
    <div className="deck-display xc-pillar-num">{children}</div>
  );
}

/* Hero italic phrase — Fraunces italic 500 in cyan. */
export function PillarHeroItalic({ children }) {
  return (
    <div className="deck-display xc-pillar-italic">{children}</div>
  );
}

/* Sub-hero qualifier — Fraunces italic small, cream-muted. */
export function PillarSub({ children }) {
  return (
    <div className="deck-display xc-pillar-sub">{children}</div>
  );
}

/* Mini-viz wrapper — adjusted for isolated card rendering */
export function PillarVizWrap({ children }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}

/* Body prose — Inter, cream-muted, lineHeight 1.45. */
export function PillarBody({ children }) {
  return (
    <div className="xc-pillar-body">{children}</div>
  );
}

/* Citation — mono, cream-faint, separated by hairline border-top. */
export function PillarCite({ children }) {
  return (
    <div className="deck-mono xc-pillar-cite">{children}</div>
  );
}

/* ============================================================
 * MINI-VIZES — five dashboard widgets, one per pillar
 * ============================================================ */

/* Pillar 02 · PK Similarity — three race-stratified Cmax bands. */
export function PkSimilarityViz() {
  return (
    <svg viewBox="0 0 140 64" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <line x1="6" y1="58" x2="134" y2="58" style={{ stroke: C.creamFaint, strokeWidth: 0.5 }} />
      <text x="6" y="9" fontSize="7" letterSpacing="0.5" style={{ fill: C.creamFaint, fontFamily: 'var(--font-mono)' }}>CMAX · POOLED</text>

      <rect x="22" y="18" width="100" height="6" rx="3" style={{ fill: 'color-mix(in srgb, var(--cream) 18%, transparent)' }} />
      <line x1="48" y1="21" x2="98" y2="21" style={{ stroke: C.creamMuted, strokeWidth: 0.7 }} />
      <circle cx="72" cy="21" r="2.5" style={{ fill: C.creamMuted }} />
      <text x="0" y="24" fontSize="6.5" style={{ fill: C.creamMuted, fontFamily: 'var(--font-mono)' }}>W</text>

      <rect x="20" y="30" width="98" height="6" rx="3" style={{ fill: 'color-mix(in srgb, var(--cyan) 22%, transparent)' }} />
      <line x1="46" y1="33" x2="98" y2="33" style={{ stroke: C.cyan, strokeWidth: 0.7 }} />
      <circle cx="71" cy="33" r="2.5" style={{ fill: C.cyan }} />
      <text x="0" y="36" fontSize="6.5" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>A</text>

      <rect x="24" y="42" width="102" height="6" rx="3" style={{ fill: 'color-mix(in srgb, var(--cream) 18%, transparent)' }} />
      <line x1="50" y1="45" x2="100" y2="45" style={{ stroke: C.creamMuted, strokeWidth: 0.7 }} />
      <circle cx="74" cy="45" r="2.5" style={{ fill: C.creamMuted }} />
      <text x="0" y="48" fontSize="6.5" style={{ fill: C.creamMuted, fontFamily: 'var(--font-mono)' }}>B</text>

      <text x="70" y="56" textAnchor="middle" fontSize="6.5" letterSpacing="0.5" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>OVERLAP</text>
    </svg>
  );
}

/* Pillar 03 · ER Similarity — flat dashed line + scatter dots. */
export function ErSimilarityViz() {
  return (
    <svg viewBox="0 0 140 64" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <line x1="14" y1="54" x2="130" y2="54" style={{ stroke: C.creamFaint, strokeWidth: 0.5 }} />
      <line x1="14" y1="8" x2="14" y2="54" style={{ stroke: C.creamFaint, strokeWidth: 0.5 }} />
      <text x="14" y="62" fontSize="6" letterSpacing="0.5" style={{ fill: C.creamFaint, fontFamily: 'var(--font-mono)' }}>EXPOSURE →</text>
      <text x="0" y="13" fontSize="6" letterSpacing="0.5" style={{ fill: C.creamFaint, fontFamily: 'var(--font-mono)' }}>RESP</text>

      <line x1="14" y1="28" x2="130" y2="28" strokeDasharray="2 2" style={{ stroke: C.cyan, strokeWidth: 1.5 }} />
      <text x="105" y="24" fontSize="6" letterSpacing="0.5" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>FLAT</text>

      {[28, 40, 52, 64, 76, 88, 100, 112, 124].map((cx, i) => (
        <circle key={cx} cx={cx} cy={i % 2 === 0 ? 30 : 27} r="1.5" style={{ fill: C.creamMuted }} />
      ))}
    </svg>
  );
}

/* Pillar 04 · Intrinsic — 4 status chips. */
export function IntrinsicViz() {
  const chips = [
    { x: 2, y: 6, label: 'Renal' },
    { x: 74, y: 6, label: 'Hepatic' },
    { x: 2, y: 34, label: 'Age' },
    { x: 74, y: 34, label: 'Sex' },
  ];
  return (
    <svg viewBox="0 0 140 64" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      {chips.map((c) => (
        <g key={c.label}>
          <rect x={c.x} y={c.y} width="64" height="22" rx="2"
            style={{ fill: 'color-mix(in srgb, var(--cyan) 8%, transparent)', stroke: 'color-mix(in srgb, var(--cyan) 25%, transparent)', strokeWidth: 0.7 }} />
          <text x={c.x + 6} y={c.y + 14} fontSize="8" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>✓</text>
          <text x={c.x + 16} y={c.y + 14} fontSize="9" style={{ fill: C.cream, fontFamily: 'var(--font-display)' }}>{c.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* Pillar 05 · Extrinsic — handled-factor checklist. */
export function ExtrinsicViz() {
  const factors = [
    { label: 'FOOD', x: 10, y: 10 },
    { label: 'DDI', x: 76, y: 10 },
    { label: 'COMED', x: 10, y: 36 },
    { label: 'LIFE', x: 76, y: 36 },
  ];

  return (
    <svg viewBox="0 0 140 64" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      {factors.map((factor) => (
        <g key={factor.label}>
          <rect x={factor.x} y={factor.y} width="54" height="18" rx="3"
            style={{ fill: 'color-mix(in srgb, var(--cyan) 9%, transparent)', stroke: 'color-mix(in srgb, var(--cyan) 28%, transparent)', strokeWidth: 0.7 }} />
          <circle cx={factor.x + 9} cy={factor.y + 9} r="3.3" style={{ fill: C.cyan }} />
          <path d={`M ${factor.x + 7.3} ${factor.y + 8.9} L ${factor.x + 8.8} ${factor.y + 10.6} L ${factor.x + 12.0} ${factor.y + 6.9}`}
            fill="none" stroke="var(--panel)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <text x={factor.x + 18} y={factor.y + 12} fontSize="7.2" letterSpacing="0.55" style={{ fill: C.cream, fontFamily: 'var(--font-mono)' }}>{factor.label}</text>
        </g>
      ))}
      <line x1="10" y1="32" x2="130" y2="32" strokeDasharray="2 3" style={{ stroke: C.creamFaint, strokeWidth: 0.5 }} />
      <text x="70" y="60" textAnchor="middle" fontSize="6.8" letterSpacing="0.5" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>CHARACTERIZED · MANAGED</text>
    </svg>
  );
}

/* Pillar 06 · Global Reg — 5 named cyan dots + 25 dim dots. */
export function GlobalRegViz() {
  const lead = [
    { cx: 20, cy: 22, label: 'FDA' },
    { cx: 46, cy: 18, label: 'EMA' },
    { cx: 72, cy: 20, label: 'MHRA' },
    { cx: 100, cy: 18, label: 'PMDA' },
    { cx: 124, cy: 22, label: 'TGA' },
  ];
  const dims = [
    [14, 38], [22, 42], [32, 36], [42, 44], [50, 38], [60, 42], [68, 36],
    [76, 44], [86, 38], [94, 42], [104, 36], [114, 44], [124, 38],
    [14, 52], [24, 56], [36, 50], [48, 56], [58, 52], [68, 56], [80, 52],
    [92, 56], [104, 52], [116, 56], [126, 52],
  ];
  return (
    <svg viewBox="0 0 140 64" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      {lead.map((d) => (
        <g key={d.label}>
          <circle cx={d.cx} cy={d.cy} r="3" style={{ fill: C.cyan }} />
          <text x={d.cx - 6} y={d.cy - 8} fontSize="5.5" letterSpacing="0.3" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>{d.label}</text>
        </g>
      ))}
      {dims.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" style={{ fill: C.creamMuted }} />
      ))}
    </svg>
  );
}
