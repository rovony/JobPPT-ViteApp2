// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * ReasoningLoop — circular SVG showing plan → call → observe → re-plan
 * with two amber traveler dots tracing the path on a continuous loop.
 *
 * Each dot is positioned by parametric (cx,cy) keyframes computed on the
 * unit circle. A small "PHARMSTATE WRITES" counter to the right increments
 * each time a dot completes a full cycle.
 *
 * Used on cs4-06 (agent primitive) below the 3-card strip.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const NODES = [
  { angle: -Math.PI / 2, label: 'PLAN',     desc: 'classify · route' },
  { angle:  0,            label: 'CALL',     desc: 'tool invocation' },
  { angle:  Math.PI / 2,  label: 'OBSERVE',  desc: 'parse · validate' },
  { angle:  Math.PI,      label: 'RE-PLAN',  desc: 'fix · retry' },
];

const CX = 130;
const CY = 130;
const R = 78;

function pointOnCircle(theta) {
  return [CX + R * Math.cos(theta), CY + R * Math.sin(theta)];
}

export default function ReasoningLoop({ go = true, delay = 0 }) {
  const reduce = useReducedMotion();
  const motionGo = go && !reduce;

  /* PharmState write counter — increments once per loop. */
  const [writes, setWrites] = useState(0);

  useEffect(() => {
    if (!motionGo) return;
    const id = setInterval(() => setWrites((w) => w + 1), 3200);
    return () => clearInterval(id);
  }, [motionGo]);

  /* Build keyframe arrays for the two traveler dots — sample 32 points
     along the unit circle and compute (cx,cy). */
  const SAMPLES = 32;
  const sampleAngles = Array.from(
    { length: SAMPLES + 1 },
    (_, i) => -Math.PI / 2 + (i / SAMPLES) * 2 * Math.PI
  );
  const cxKeys = sampleAngles.map((t) => CX + R * Math.cos(t));
  const cyKeys = sampleAngles.map((t) => CY + R * Math.sin(t));

  /* Second traveler offset half a loop ahead. */
  const sampleAngles2 = sampleAngles.map(
    (_, i) => -Math.PI / 2 + (((i + SAMPLES / 2) % SAMPLES) / SAMPLES) * 2 * Math.PI
  );
  const cxKeys2 = sampleAngles2.map((t) => CX + R * Math.cos(t));
  const cyKeys2 = sampleAngles2.map((t) => CY + R * Math.sin(t));

  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 260px) minmax(0, 1fr)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-5)',
      }}
    >
      <svg
        viewBox="0 0 260 260"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', maxWidth: 260, display: 'block' }}
        aria-label="Reasoning loop — plan, call, observe, re-plan"
      >
        {/* Outer hairline circle (the loop track) */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
          strokeWidth={1}
        />
        {/* Direction-of-travel arrowheads, one per quadrant midpoint. */}
        {[0, 1, 2, 3].map((q) => {
          const tStart = -Math.PI / 2 + (q / 4) * 2 * Math.PI + Math.PI / 4;
          const tEnd = tStart + 0.04;
          const [ax, ay] = pointOnCircle(tStart);
          const [bx, by] = pointOnCircle(tEnd);
          const dx = bx - ax;
          const dy = by - ay;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len;
          const uy = dy / len;
          const px = -uy;
          const py = ux;
          const tipX = ax + ux * 6;
          const tipY = ay + uy * 6;
          const wingA = `${ax + px * 3} ${ay + py * 3}`;
          const wingB = `${ax - px * 3} ${ay - py * 3}`;
          return (
            <motion.polyline
              key={`arr${q}`}
              points={`${wingA} ${tipX} ${tipY} ${wingB}`}
              fill="none"
              stroke="var(--amber, #d4a373)"
              strokeWidth={1}
              strokeOpacity={0.5}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.5, ease: EASE, delay: delay + 0.4 + q * 0.1 }}
            />
          );
        })}

        {/* Four node circles + labels */}
        {NODES.map((n, i) => {
          const [x, y] = pointOnCircle(n.angle);
          const labelOffset = (() => {
            switch (n.label) {
              case 'PLAN':    return [0, -22];
              case 'CALL':    return [22, 4];
              case 'OBSERVE': return [0, 28];
              case 'RE-PLAN': return [-22, 4];
              default:        return [0, 0];
            }
          })();
          const lx = x + labelOffset[0];
          const ly = y + labelOffset[1];
          const ta =
            n.label === 'CALL' ? 'start' :
            n.label === 'RE-PLAN' ? 'end' :
            'middle';
          return (
            <g key={n.label}>
              <motion.circle
                cx={x}
                cy={y}
                r={6}
                fill="var(--bg, #1a1612)"
                stroke="var(--amber, #d4a373)"
                strokeWidth={1.5}
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.45, ease: EASE, delay: delay + 0.2 + i * 0.1 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
              <motion.text
                x={lx}
                y={ly}
                textAnchor={ta}
                fontFamily="var(--font-mono)"
                fontSize="11"
                letterSpacing="1.2"
                fill="var(--amber, #d4a373)"
                fontWeight={700}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: delay + 0.4 + i * 0.1 }}
              >
                {n.label}
              </motion.text>
              <motion.text
                x={lx}
                y={ly + 11}
                textAnchor={ta}
                fontFamily="var(--font-mono)"
                fontSize="7"
                letterSpacing="0.6"
                fill="var(--cream-faint, rgba(255,232,189,0.45))"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: delay + 0.55 + i * 0.1 }}
              >
                {n.desc}
              </motion.text>
            </g>
          );
        })}

        {/* Two traveler dots looping continuously */}
        {motionGo && (
          <>
            <motion.circle
              r={4}
              fill="var(--amber, #d4a373)"
              initial={{ cx: cxKeys[0], cy: cyKeys[0], opacity: 0 }}
              animate={{ cx: cxKeys, cy: cyKeys, opacity: 1 }}
              transition={{
                cx: { duration: 3.2, ease: 'linear', repeat: Infinity, delay: delay + 1.2 },
                cy: { duration: 3.2, ease: 'linear', repeat: Infinity, delay: delay + 1.2 },
                opacity: { duration: 0.4, delay: delay + 1.2 },
              }}
            />
            <motion.circle
              r={3}
              fill="var(--amber, #d4a373)"
              fillOpacity={0.55}
              initial={{ cx: cxKeys2[0], cy: cyKeys2[0], opacity: 0 }}
              animate={{ cx: cxKeys2, cy: cyKeys2, opacity: 0.55 }}
              transition={{
                cx: { duration: 3.2, ease: 'linear', repeat: Infinity, delay: delay + 1.4 },
                cy: { duration: 3.2, ease: 'linear', repeat: Infinity, delay: delay + 1.4 },
                opacity: { duration: 0.4, delay: delay + 1.4 },
              }}
            />
          </>
        )}

        {/* Center label */}
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="1.4"
          fill="var(--cream-faint, rgba(255,232,189,0.45))"
        >
          REASONING
        </text>
        <text
          x={CX}
          y={CY + 8}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="1.4"
          fill="var(--cream-faint, rgba(255,232,189,0.45))"
        >
          LOOP
        </text>
      </svg>

      {/* Right-side counter panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          minWidth: 0,
          maxWidth: 220,
        }}
      >
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--amber)',
            fontWeight: 800,
          }}
        >
          PharmState writes
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            border: '1px solid var(--cream-hairline)',
            borderLeft: '2px solid var(--amber)',
            background: 'color-mix(in srgb, var(--panel) 75%, transparent)',
          }}
        >
          <span
            className="deck-mono"
            style={{
              fontSize: 'clamp(1.4rem, min(2vw, 3.2vh), 2rem)',
              color: 'var(--amber)',
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.05em',
            }}
          >
            +{String(writes).padStart(3, '0')}
          </span>
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-pageno)',
              color: 'var(--cream-faint)',
              letterSpacing: '0.12em',
            }}
          >
            entries / loop
          </span>
        </div>
        <span
          className="deck-body"
          style={{
            fontSize: 'var(--fs-slide-tagline)',
            color: 'var(--cream-muted)',
            lineHeight: 1.45,
          }}
        >
          Each cycle commits a typed mutation to PharmState — observable,
          reversible, regulator-replayable.
        </span>
      </div>
    </div>
  );
}
