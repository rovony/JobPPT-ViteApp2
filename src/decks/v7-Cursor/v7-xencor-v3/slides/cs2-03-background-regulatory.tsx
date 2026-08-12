// @ts-nocheck
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS3 · Regulatory background — Rule 101.
 *
 * Full 7.5s entry sequence.
 *
 * Key SVG pattern: use outer <g transform="translate(...)"> for positioning
 * and inner <motion.g> for animation, because framer-motion CSS transforms
 * override the SVG transform attribute otherwise.
 */

const EASE = [0.2, 0.7, 0.3, 1];
const POP = [0.34, 1.56, 0.64, 1];

const D = {
  start: 0.80,
  pivotLine: 1.10,
  pivotLabel: 1.40,
  beforeLabel: 1.60,
  beforeBase: 1.90,
  beforeStagger: 0.20,
  beforeFinal: 3.10,
  outcome: 3.30,
  afterLabel: 3.90,
  afterBase: 4.20,
  afterStagger: 0.25,
  afterFinal: 5.10,
  outcomePulse: 5.10,
  panels: 5.50,
  eligDots: 5.90,
  qualifiers: 6.40,
  amber: 6.80,
};

export default function CS2BackgroundRegulatory() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="Case 03 · Background — Regulatory Regime"
      headline={
        <>
          India's regulatory path got{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
            shorter
          </span>{' '}
          on 7&nbsp;August&nbsp;2024.
        </>
      }
      headlineMaxChars={52}
      subhead={
        <span style={{ fontStyle: 'italic' }}>
          Rule 101 created a Clin-Pharm-led waiver pathway. Ivosidenib qualified.
        </span>
      }
      subheadMaxChars={80}
      subheadSize="lead"
      footerKicker="Case 03 · Rule 101"
      footerSource="ClinRegs · DIA Global Forum · CDSCO public record"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          paddingTop: 'var(--space-4)',
          paddingBottom: 'var(--space-3)', // tightened 2026-04-26: bring amber band closer to footer per user feedback
          minHeight: 0,
        }}
      >
        <FlowchartSVG />
        <BottomPanels />
        <AmberBand />
      </div>
    </SlideFrame>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FLOWCHART — dual-path SVG with full cascade animation
   ══════════════════════════════════════════════════════════════════ */

const BEFORE_NODES = [
  { x: 210, w: 185, label: 'DEFAULT', text: 'Local clinical trial data' },
  { x: 425, w: 210, label: 'STUDY', text: 'PK/PD bridging · Indian pts' },
  { x: 660, w: 180, label: 'DURATION', text: '12–18 mo enrollment' },
  { x: 865, w: 160, label: 'REVIEW', text: 'CDSCO review' },
];

const AFTER_NODES = [
  { x: 210, w: 200, label: 'GATE', text: 'Rule 101 eligibility' },
  { x: 440, w: 230, label: 'DOSSIER', text: 'Clin Pharm dossier review' },
  { x: 700, w: 210, label: 'CONDITION', text: 'Phase 4 commitment' },
];

function FlowchartSVG() {
  const reduced = useReducedMotion();
  const r = reduced;

  const PATH_DUR = 0.2;
  const drawPath = (delay, dur = PATH_DUR) => ({
    initial: r ? { pathLength: 1 } : { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: dur, ease: EASE, delay },
  });
  // Arrowheads fade in just as the line finishes drawing — replaces SVG
  // markerEnd which renders at path's geometric end regardless of pathLength.
  const ARROW_FADE = 0.12;
  const arrowDelay = (pathDelay, dur = PATH_DUR) => pathDelay + dur - 0.02;

  return (
    <div style={{ flexShrink: 0 }}>
      <svg
        viewBox="0 0 1180 240"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Dual-path regulatory flowchart: before Rule 101 vs after"
      >

        {/* ── BEFORE row label ── */}
        <AnimFade delay={D.beforeLabel} reduced={r}>
          <text x="200" y="16"
            fontFamily="var(--font-mono)" fontSize="11"
            fill="var(--cream-faint)" letterSpacing="1.6" fontWeight="500">
            BEFORE — NDCTR 2019 · LOCAL-TRIAL DEFAULT
          </text>
        </AnimFade>

        {/* ── START node ── */}
        <g transform="translate(10, 87)">
          <AnimScale delay={D.start} reduced={r} cx={78} cy={30}>
            <rect x="0" y="0" width="155" height="60" rx="4"
              fill="var(--bg)" stroke="var(--cream-faint)" strokeWidth="1" />
            <text x="78" y="22" textAnchor="middle" fontFamily="var(--font-mono)"
              fill="var(--cream-muted)" fontSize="10" letterSpacing="1.6" fontWeight="600">START</text>
            <text x="78" y="42" textAnchor="middle" fontFamily="'Fraunces', Georgia, serif"
              fontSize="15" fill="var(--cream)" fontWeight="500">Indian MAA filed</text>
          </AnimScale>
        </g>

        {/* ── Pivot cyan hairline ── */}
        <motion.line
          x1="310" y1="88" x2="310" y2="148"
          stroke="var(--cyan)" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.5"
          {...drawPath(D.pivotLine, 0.5)}
        />

        {/* ── Pivot date label ── */}
        <g transform="translate(310, 118)">
          <AnimSlideY delay={D.pivotLabel} reduced={r}>
            <rect x="-92" y="-11" width="184" height="22" rx="3"
              fill="var(--bg)" stroke="var(--cyan)" strokeWidth="1" />
            <text x="0" y="4" textAnchor="middle" fontFamily="var(--font-mono)"
              fill="var(--cyan)" fontSize="10" letterSpacing="1.6" fontWeight="600">
              AUG 2024 · DCGI ORDER
            </text>
          </AnimSlideY>
        </g>

        {/* ── BEFORE path cascade ── */}

        {/* START → 1 arrow */}
        <motion.path {...drawPath(D.beforeBase)}
          d="M 165 102 Q 185 102 185 55 L 210 55" fill="none"
          stroke="var(--cream-faint)" strokeWidth="1" strokeDasharray="3 3" />
        <ArrowEnd x={210} y={55} color="var(--cream-faint)"
          delay={arrowDelay(D.beforeBase)} fade={ARROW_FADE} reduced={r} />

        {BEFORE_NODES.map((n, i) => {
          const nodeDelay = D.beforeBase + D.beforeStagger * i + 0.1;
          const nextX = i < BEFORE_NODES.length - 1 ? BEFORE_NODES[i + 1].x : null;
          const arrowPathDelay = D.beforeBase + D.beforeStagger * (i + 1);
          return (
            <React.Fragment key={n.label}>
              <FlowNode x={n.x} y={28} w={n.w} h={54} label={n.label} text={n.text}
                muted delay={nodeDelay} reduced={r} />
              {nextX && (
                <>
                  <motion.path {...drawPath(arrowPathDelay)}
                    d={`M ${n.x + n.w} 55 L ${nextX} 55`} fill="none"
                    stroke="var(--cream-faint)" strokeWidth="1" strokeDasharray="3 3" />
                  <ArrowEnd x={nextX} y={55} color="var(--cream-faint)"
                    delay={arrowDelay(arrowPathDelay)} fade={ARROW_FADE} reduced={r} />
                </>
              )}
            </React.Fragment>
          );
        })}

        {/* BEFORE → OUTCOME curve */}
        <motion.path {...drawPath(D.beforeFinal, 0.4)}
          d="M 1025 55 Q 1050 55 1050 102 L 1060 102" fill="none"
          stroke="var(--cream-faint)" strokeWidth="1" strokeDasharray="3 3" />
        <ArrowEnd x={1060} y={102} color="var(--cream-faint)"
          delay={arrowDelay(D.beforeFinal, 0.4)} fade={ARROW_FADE} reduced={r} />

        {/* ── OUTCOME node ── */}
        <g transform="translate(1060, 74)">
          <AnimScale delay={D.outcome} reduced={r} cx={58} cy={30}>
            <rect x="0" y="0" width="115" height="60" rx="4"
              fill="none" stroke="var(--cream)" strokeWidth="1.5" />
            <text x="58" y="26" textAnchor="middle" fontFamily="var(--font-mono)"
              fill="var(--cream-muted)" fontSize="10" letterSpacing="1.6" fontWeight="600">OUTCOME</text>
            <text x="58" y="46" textAnchor="middle" fontFamily="'Fraunces', Georgia, serif"
              fontSize="13" fill="var(--cream)" fontWeight="500">Indian approval</text>
          </AnimScale>
        </g>

        {/* ── OUTCOME pulse ring (fires on AFTER arrival) ── */}
        <g transform="translate(1060, 74)">
          <motion.rect
            x="-3" y="-3" width="121" height="66" rx="6"
            fill="none" stroke="var(--cyan)" strokeWidth="1.5"
            initial={r ? { opacity: 0 } : { opacity: 0, scale: 1 }}
            animate={r ? {} : { opacity: [0, 0.6, 0], scale: [1, 1.12, 1.18] }}
            transition={{ duration: 0.5, delay: D.outcomePulse, ease: EASE }}
            style={{ transformOrigin: '58px 30px' }}
          />
        </g>

        {/* ── AFTER row label ── */}
        <AnimFade delay={D.afterLabel} reduced={r}>
          <text x="200" y="232"
            fontFamily="var(--font-mono)" fontSize="11"
            fill="var(--cyan)" letterSpacing="1.6" fontWeight="500">
            AFTER — RULE 101 OPERATIONAL · DOSSIER-LED PATH
          </text>
        </AnimFade>

        {/* ── AFTER path ── */}
        <motion.path {...drawPath(D.afterBase - 0.1)}
          d="M 165 132 Q 185 132 185 180 L 210 180" fill="none"
          stroke="var(--cyan)" strokeWidth="1.5" />
        <ArrowEnd x={210} y={180} color="var(--cyan)"
          delay={arrowDelay(D.afterBase - 0.1)} fade={ARROW_FADE} reduced={r} />

        {AFTER_NODES.map((n, i) => {
          const nodeDelay = D.afterBase + D.afterStagger * i;
          const nextX = i < AFTER_NODES.length - 1 ? AFTER_NODES[i + 1].x : null;
          const arrowPathDelay = D.afterBase + D.afterStagger * (i + 1);
          return (
            <React.Fragment key={n.label}>
              <FlowNode x={n.x} y={153} w={n.w} h={54} label={n.label} text={n.text}
                cyan delay={nodeDelay} reduced={r} />
              {nextX && (
                <>
                  <motion.path {...drawPath(arrowPathDelay)}
                    d={`M ${n.x + n.w} 180 L ${nextX} 180`} fill="none"
                    stroke="var(--cyan)" strokeWidth="1.5" />
                  <ArrowEnd x={nextX} y={180} color="var(--cyan)"
                    delay={arrowDelay(arrowPathDelay)} fade={ARROW_FADE} reduced={r} />
                </>
              )}
            </React.Fragment>
          );
        })}

        {/* AFTER → OUTCOME curve */}
        <motion.path {...drawPath(D.afterFinal, 0.4)}
          d="M 910 180 Q 1050 180 1050 132 L 1060 132" fill="none"
          stroke="var(--cyan)" strokeWidth="1.5" />
        <ArrowEnd x={1060} y={132} color="var(--cyan)"
          delay={arrowDelay(D.afterFinal, 0.4)} fade={ARROW_FADE} reduced={r} />
      </svg>
    </div>
  );
}

/* SVG animation helpers — separate positioning from animation */
function AnimFade({ delay, reduced, children }) {
  return (
    <motion.g
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: EASE, delay }}
    >
      {children}
    </motion.g>
  );
}
function AnimScale({ delay, reduced, cx, cy, children }) {
  return (
    <motion.g
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE, delay }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {children}
    </motion.g>
  );
}
function AnimSlideY({ delay, reduced, children }) {
  return (
    <motion.g
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: EASE, delay }}
    >
      {children}
    </motion.g>
  );
}

/* Arrowhead polygon — fades in at `delay` (timed to land just as its
   line completes drawing). Replaces SVG markerEnd which renders at
   the path's geometric end regardless of pathLength animation. */
function ArrowEnd({ x, y, color, delay, fade, reduced }) {
  return (
    <motion.polygon
      points={`${x - 7},${y - 4} ${x},${y} ${x - 7},${y + 4}`}
      fill={color}
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: fade, ease: EASE, delay }}
    />
  );
}

function FlowNode({ x, y, w, h, label, text, muted, cyan, delay, reduced }) {
  const [hovered, setHovered] = useState(false);
  const fill = cyan ? 'color-mix(in srgb, var(--cyan) 8%, transparent)' : 'var(--bg)';
  const stroke = cyan ? 'color-mix(in srgb, var(--cyan) 22%, transparent)' : 'var(--cream-faint)';
  const labelColor = cyan ? 'var(--cyan)' : 'var(--cream-faint)';
  const textColor = muted ? 'var(--cream-muted)' : 'var(--cream)';
  const hoverFill = cyan ? 'color-mix(in srgb, var(--cyan) 14%, transparent)' : 'color-mix(in srgb, var(--bg) 60%, transparent)';
  const cx = w / 2;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.g
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: EASE, delay }}
        style={{ transformOrigin: `${cx}px ${h / 2}px`, cursor: 'default' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <rect x="0" y="0" width={w} height={h} rx="4"
          fill={hovered ? hoverFill : fill} stroke={stroke} strokeWidth="1"
          style={{ transition: 'fill 0.2s' }} />
        <text x={cx} y="20" textAnchor="middle" fontFamily="var(--font-mono)"
          fill={labelColor} fontSize="10" letterSpacing="1.6" fontWeight="600">{label}</text>
        <text x={cx} y="40" textAnchor="middle" fontFamily="'Fraunces', Georgia, serif"
          fontSize="14" fill={textColor} fontWeight="400">{text}</text>
      </motion.g>
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BOTTOM PANELS — Eligibility categories + Reference countries
   ══════════════════════════════════════════════════════════════════ */

const CATEGORIES = [
  { name: 'Orphan / rare disease', qualifies: true, tip: 'Fewer than 5 lakh persons in India' },
  { name: 'Gene / cell therapy', qualifies: false },
  { name: 'Pandemic', qualifies: false },
  { name: 'Defense', qualifies: false },
  { name: 'Sig. therapeutic advancement', qualifies: true, tip: 'First-in-class IDH1 inhibitor for AML' },
];

const AGENCIES = [
  { name: 'USA', abbr: 'FDA', used: true },
  { name: 'UK', abbr: 'MHRA', used: false },
  { name: 'EU', abbr: 'EMA', used: true },
  { name: 'Japan', abbr: 'PMDA', used: false },
  { name: 'Australia', abbr: 'TGA', used: false },
  { name: 'Canada', abbr: 'HC', used: false },
];

function BottomPanels() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: D.panels }}
      style={{
        display: 'grid',
        gridTemplateColumns: '7fr 5fr',
        gap: 'clamp(10px, 1.2vw, 20px)',
        flexShrink: 0,
      }}
    >
      {/* Left — Eligibility */}
      <div
        style={{
          border: '1px solid var(--cream-hairline)',
          borderRadius: 'var(--radius-lg)',
          background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
          padding: 'clamp(12px, 1.8vh, 22px) clamp(16px, 2vw, 28px)',
        }}
      >
        <div
          className="deck-mono uppercase xc-slide-eyebrow xc-cyan" style={{
            letterSpacing: 'var(--ls-mono-wide)',
            fontWeight: 700,
            marginBottom: 'var(--space-2)' }}
        >
          Rule 101 · 5 eligible categories
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(8px, 1vw, 20px)', alignItems: 'center' }}>
          {CATEGORIES.map((cat, i) => (
            <motion.span
              key={cat.name}
              title={cat.tip || undefined}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: EASE, delay: D.eligDots + i * 0.08 }}
                className={`xc-slide-subhead ${cat.qualifies ? 'xc-ink' : 'xc-muted'}`}
                style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(5px, 0.5vw, 10px)',
                fontWeight: cat.qualifies ? 600 : 400,
                cursor: cat.tip ? 'help' : 'default',
              }}
            >
              <EligDot qualifies={cat.qualifies} delay={D.eligDots + i * 0.08} reduced={reduced} />
              {cat.name}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="deck-mono xc-tagline xc-cyan"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: EASE, delay: D.qualifiers }}
          style={{
            marginTop: 'var(--space-2)',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}
        >
          ↳ IVOSIDENIB QUALIFIES ON 2 OF 5
        </motion.div>
      </div>

      {/* Right — Reference agencies */}
      <div
        style={{
          border: '1px solid color-mix(in srgb, var(--cyan) 22%, transparent)',
          borderRadius: 'var(--radius-lg)',
          background: 'color-mix(in srgb, var(--cyan) 6%, transparent)',
          padding: 'clamp(12px, 1.8vh, 22px) clamp(16px, 2vw, 28px)',
        }}
      >
        <div
          className="deck-mono uppercase xc-slide-eyebrow xc-cyan" style={{
            letterSpacing: 'var(--ls-mono-wide)',
            fontWeight: 700,
            marginBottom: 'var(--space-2)' }}
        >
          Rule 101 · 6 reference countries
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px, 0.8vw, 16px)' }}>
          {AGENCIES.map((a) => (
            <span
              key={a.abbr}
              className={`xc-slide-subhead ${a.used ? 'xc-ink' : 'xc-muted'}`}
              style={{
                fontWeight: a.used ? 600 : 400,
              }}
            >
              {a.name}{' '}
              <span
                className="deck-mono xc-tagline xc-muted"
              >
                ({a.abbr})
              </span>
            </span>
          ))}
        </div>
        <motion.div
          className="deck-mono xc-tagline xc-cyan"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: EASE, delay: D.qualifiers }}
          style={{
            marginTop: 'var(--space-2)',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}
        >
          ↳ IVOSIDENIB RELIED ON FDA + EMA
        </motion.div>
      </div>
    </motion.div>
  );
}

function EligDot({ qualifies, delay, reduced }) {
  return (
    <motion.span
      initial={reduced ? false : { scale: qualifies ? 0.6 : 1 }}
      animate={qualifies ? { scale: [0.6, 1.3, 1] } : { scale: 1 }}
      transition={qualifies
        ? { duration: 0.4, ease: POP, delay: delay + 0.15 }
        : { duration: 0.2, delay }}
      style={{
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: '50%',
        flexShrink: 0,
        background: qualifies ? 'var(--cyan)' : 'transparent',
        border: qualifies ? 'none' : '1.5px solid var(--cream-faint)',
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════
   AMBER BAND
   ══════════════════════════════════════════════════════════════════ */

function AmberBand() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: D.amber }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'color-mix(in srgb, var(--amber) 18%, transparent)'
          : 'color-mix(in srgb, var(--amber) 12%, transparent)',
        borderTop: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
        padding: 'clamp(10px, 1.4vh, 18px) clamp(14px, 2vw, 28px)',
        flexShrink: 0,
        transition: 'background 0.2s',
      }}
    >
      <p
        className="deck-display italic xc-tagline xc-ink" style={{
          margin: 0,
          lineHeight: 'var(--lh-base)',
          fontWeight: 400,
          textAlign: 'center' }}
      >
        <span aria-hidden style={{
          display: 'inline-block',
          transform: 'rotate(45deg)',
          width: 12, height: 12,
          background: 'var(--amber)',
          marginRight: 10,
          verticalAlign: 'middle',
        }} />
        The waiver is{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 500 }}>conditional, not categorical</span>
        {' '}— every Rule 101 approval carries a{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 500 }}>Phase 4 commitment</span>
        {' '}in lieu of pre-approval local data.
      </p>
    </motion.div>
  );
}
