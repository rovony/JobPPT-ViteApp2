// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * NoveltyCompareInline — four small editorial chart-glyphs, one per
 * cs4-12 novelty card. Each is a real SVG comparator, not an icon.
 *
 *   variant="hierarchy"  — horizontal dot-plot, x-axis "agents" 0..15.
 *                          Plots Apollo-AI ~5, QSP-Copilot ~5,
 *                          DruGagent ~7, PharmAgent 13. Last dot is
 *                          larger amber.
 *   variant="state"      — small "shared bus" diagram (4 agents ringing
 *                          a typed-state bus) over a faint "tangled mesh"
 *                          ghost in the background.
 *   variant="privacy"    — tiny SchemaExtractor wall echo, raw-row
 *                          arrow blocked with an × at the boundary.
 *   variant="audit"      — tiny chain with one link drawn broken (red
 *                          coral splay) — echoes S10 hashchain.
 *
 * Each renders ~140×80 viewBox. Mono caption below.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function NoveltyCompareInline({ variant, go = true, delay = 0.4 }) {
  if (variant === 'hierarchy') return <Hierarchy go={go} delay={delay} />;
  if (variant === 'state') return <StateBus go={go} delay={delay} />;
  if (variant === 'privacy') return <PrivacyEcho go={go} delay={delay} />;
  if (variant === 'audit') return <AuditChain go={go} delay={delay} />;
  return null;
}

/* ─── Card 1 · Hierarchy dot-plot ────────────────────────────── */
function Hierarchy({ go, delay }) {
  const reduce = useReducedMotion();
  const W = 200, H = 80;
  const m = { top: 16, right: 12, bottom: 22, left: 10 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const xMax = 15;
  const x = (v) => m.left + (v / xMax) * iw;
  const y = m.top + ih / 2;

  const POINTS = [
    { v: 5,  label: 'Apollo',  short: 'AP' },
    { v: 5,  label: 'QSP',     short: 'QC', off: 14 },
    { v: 7,  label: 'DruGa',   short: 'DG' },
    { v: 13, label: 'PharmAgent', short: 'PA', hero: true },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block' }}>
      {/* Axis */}
      <line
        x1={m.left}
        x2={m.left + iw}
        y1={y}
        y2={y}
        stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
        strokeWidth={1}
      />
      {[0, 5, 10, 15].map((t) => (
        <g key={t}>
          <line
            x1={x(t)}
            x2={x(t)}
            y1={y - 2}
            y2={y + 2}
            stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
          />
          <text
            x={x(t)}
            y={y + 14}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="7"
            fill="var(--cream-faint, rgba(255,232,189,0.45))"
          >
            {t}
          </text>
        </g>
      ))}

      {POINTS.map((p, i) => (
        <g key={p.label}>
          <motion.circle
            cx={x(p.v)}
            cy={y - (p.off || 0)}
            r={p.hero ? 6 : 3.5}
            fill={p.hero ? 'var(--amber, #d4a373)' : 'var(--cream-muted, rgba(255,232,189,0.65))'}
            stroke={p.hero ? 'var(--amber, #d4a373)' : 'none'}
            strokeWidth={p.hero ? 1.5 : 0}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: delay + i * 0.15 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <motion.text
            x={x(p.v)}
            y={y - (p.off || 0) - (p.hero ? 10 : 7)}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="7"
            letterSpacing="0.5"
            fill={p.hero ? 'var(--amber, #d4a373)' : 'var(--cream-faint, rgba(255,232,189,0.45))'}
            fontWeight={p.hero ? 700 : 400}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: delay + i * 0.15 + 0.2 }}
          >
            {p.short}
          </motion.text>
        </g>
      ))}

      <text
        x={W / 2}
        y={H - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="1"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        AGENTS PER SYSTEM
      </text>
    </svg>
  );
}

/* ─── Card 2 · Shared typed-state bus vs scratchpad mesh ─────── */
function StateBus({ go, delay }) {
  const reduce = useReducedMotion();
  const W = 200, H = 80;
  const cx = W / 2;
  const cy = H / 2 - 4;
  const r = 22;

  // 4 ringing agents
  const agents = [-Math.PI / 2, 0, Math.PI / 2, Math.PI].map((a) => [
    cx + (r + 14) * Math.cos(a),
    cy + (r + 14) * Math.sin(a),
  ]);

  // Tangled background mesh — 6 random connecting lines.
  const mesh = [
    [20, 14, 70, 60], [180, 18, 130, 56], [40, 56, 160, 18],
    [60, 14, 150, 60], [22, 38, 178, 38], [80, 14, 120, 60],
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block' }}>
      {/* Background tangled mesh — the OLD way */}
      {mesh.map((m, i) => (
        <motion.line
          key={`bg${i}`}
          x1={m[0]}
          y1={m[1]}
          x2={m[2]}
          y2={m[3]}
          stroke="var(--cream-faint, rgba(255,232,189,0.45))"
          strokeWidth={0.5}
          strokeOpacity={0.25}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: delay + i * 0.04 }}
        />
      ))}

      {/* Foreground typed-state bus */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.6}
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: delay + 0.4 }}
      />
      <text
        x={cx}
        y={cy + 3}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="1"
        fill="var(--amber, #d4a373)"
        fontWeight={700}
      >
        BUS
      </text>

      {agents.map(([ax, ay], i) => (
        <g key={`ag${i}`}>
          <motion.line
            x1={cx + r * Math.cos((-Math.PI / 2) + i * (Math.PI / 2))}
            y1={cy + r * Math.sin((-Math.PI / 2) + i * (Math.PI / 2))}
            x2={ax}
            y2={ay}
            stroke="var(--amber, #d4a373)"
            strokeWidth={1}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: delay + 0.7 + i * 0.07 }}
          />
          <motion.rect
            x={ax - 4}
            y={ay - 4}
            width={8}
            height={8}
            fill="var(--amber, #d4a373)"
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, ease: EASE, delay: delay + 0.85 + i * 0.07 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        </g>
      ))}

      <text
        x={W / 2}
        y={H - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="1"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        TYPED BUS · NOT MESH
      </text>
    </svg>
  );
}

/* ─── Card 3 · Privacy wall echo ─────────────────────────────── */
function PrivacyEcho({ go, delay }) {
  const reduce = useReducedMotion();
  const W = 200, H = 80;
  const wallX = W * 0.55;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block' }}>
      {/* Three left-side raw rows */}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={`r${i}`}
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: delay + i * 0.1 }}
        >
          <rect
            x={10}
            y={18 + i * 14}
            width={wallX - 26}
            height={10}
            fill="color-mix(in srgb, var(--cream-faint, #ffe8bd) 12%, transparent)"
            stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
            strokeWidth={0.6}
          />
          {/* Trailing arrow */}
          <line
            x1={wallX - 12}
            x2={wallX - 4}
            y1={23 + i * 14}
            y2={23 + i * 14}
            stroke="var(--cream-faint, rgba(255,232,189,0.45))"
            strokeWidth={0.6}
            strokeDasharray="2 2"
            opacity={0.6}
          />
        </motion.g>
      ))}

      {/* The wall */}
      <motion.line
        x1={wallX}
        x2={wallX}
        y1={4}
        y2={H - 22}
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.6}
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay }}
      />

      {/* × at the wall */}
      {[0, 1, 2].map((i) => {
        const cy = 23 + i * 14;
        return (
          <motion.g
            key={`x${i}`}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: EASE, delay: delay + 0.7 + i * 0.1 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <line x1={wallX - 3} y1={cy - 3} x2={wallX + 3} y2={cy + 3} stroke="var(--coral, #d96155)" strokeWidth={1.4} />
            <line x1={wallX - 3} y1={cy + 3} x2={wallX + 3} y2={cy - 3} stroke="var(--coral, #d96155)" strokeWidth={1.4} />
          </motion.g>
        );
      })}

      {/* Right-side metadata card */}
      <motion.g
        initial={reduce ? false : { opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: delay + 0.9 }}
      >
        <rect
          x={wallX + 10}
          y={20}
          width={W - wallX - 20}
          height={40}
          fill="color-mix(in srgb, var(--amber, #d4a373) 8%, transparent)"
          stroke="var(--amber, #d4a373)"
          strokeOpacity={0.85}
          strokeWidth={1}
        />
        <text
          x={wallX + 16}
          y={32}
          fontFamily="var(--font-mono)"
          fontSize="7"
          letterSpacing="0.6"
          fill="var(--amber, #d4a373)"
          fontWeight={700}
        >
          schema
        </text>
        <text
          x={wallX + 16}
          y={45}
          fontFamily="var(--font-mono)"
          fontSize="7"
          fill="var(--cream-muted, rgba(255,232,189,0.65))"
        >
          { '{id, dose, t}' }
        </text>
      </motion.g>

      <text
        x={W / 2}
        y={H - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="1"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        STRUCTURAL · NOT POLICY
      </text>
    </svg>
  );
}

/* ─── Card 4 · Hashchain with one broken link ────────────────── */
function AuditChain({ go, delay }) {
  const reduce = useReducedMotion();
  const W = 200, H = 80;
  const N = 5;
  const linkW = 26;
  const linkH = 14;
  const gap = 6;
  const totalW = N * linkW + (N - 1) * gap;
  const startX = (W - totalW) / 2;
  const y = H / 2 - linkH / 2 - 4;
  const brokenIdx = 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block' }}>
      {Array.from({ length: N }, (_, i) => {
        const x = startX + i * (linkW + gap);
        const broken = i === brokenIdx;
        if (broken) {
          // Broken link — split into two halves with coral splay between.
          return (
            <motion.g
              key={`link${i}`}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: delay + i * 0.12 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              <rect
                x={x}
                y={y - 2}
                width={(linkW - 6) / 2}
                height={linkH + 4}
                rx={3}
                fill="none"
                stroke="var(--coral, #d96155)"
                strokeWidth={1.2}
              />
              <rect
                x={x + (linkW + 6) / 2}
                y={y - 2}
                width={(linkW - 6) / 2}
                height={linkH + 4}
                rx={3}
                fill="none"
                stroke="var(--coral, #d96155)"
                strokeWidth={1.2}
              />
              {/* Splay */}
              <line
                x1={x + linkW / 2 - 2}
                x2={x + linkW / 2 + 2}
                y1={y - 5}
                y2={y + linkH + 5}
                stroke="var(--coral, #d96155)"
                strokeWidth={1.3}
              />
              <line
                x1={x + linkW / 2 + 2}
                x2={x + linkW / 2 - 2}
                y1={y - 5}
                y2={y + linkH + 5}
                stroke="var(--coral, #d96155)"
                strokeWidth={1.3}
              />
              <text
                x={x + linkW / 2}
                y={y + linkH + 18}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="6.5"
                letterSpacing="0.6"
                fill="var(--coral, #d96155)"
                fontWeight={700}
              >
                BROKEN
              </text>
            </motion.g>
          );
        }
        return (
          <motion.g
            key={`link${i}`}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: delay + i * 0.12 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <rect
              x={x}
              y={y}
              width={linkW}
              height={linkH}
              rx={3}
              fill="none"
              stroke="var(--amber, #d4a373)"
              strokeWidth={1.2}
            />
            <text
              x={x + linkW / 2}
              y={y + linkH / 2 + 3}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="6"
              fill="var(--amber, #d4a373)"
              fontWeight={700}
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              h{i}
            </text>
          </motion.g>
        );
      })}

      <text
        x={W / 2}
        y={H - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="1"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        TAMPER · OBSERVABLE
      </text>
    </svg>
  );
}
