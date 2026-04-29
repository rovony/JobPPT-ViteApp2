// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * WallClockTicker — large monospaced MM:SS counter with a progress arc.
 *
 * Ticks from 00:00 to a configurable target (default 04:32) over
 * `realDurationMs` of wall-clock time using requestAnimationFrame so
 * the count is smooth. A surrounding SVG arc tracks the same
 * progress (0 → 2π).
 *
 * Used on cs4-11 — the right-rail wall-clock that proves the swimlane
 * runs end-to-end in under five minutes.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function WallClockTicker({
  go = true,
  delay = 0,
  targetSeconds = 272,         // 04:32
  realDurationMs = 7000,
}) {
  const reduce = useReducedMotion();
  const [seconds, setSeconds] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!go || reduce) {
      setSeconds(targetSeconds);
      return;
    }
    const startDelay = delay * 1000;
    const t0 = setTimeout(() => {
      const tick = (ts) => {
        if (!startRef.current) startRef.current = ts;
        const elapsed = ts - startRef.current;
        const p = Math.min(elapsed / realDurationMs, 1);
        setSeconds(Math.floor(p * targetSeconds));
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setSeconds(targetSeconds);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, startDelay);
    return () => {
      clearTimeout(t0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [go, reduce, delay, targetSeconds, realDurationMs]);

  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  const text = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;

  // SVG arc geometry
  const SIZE = 200;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const r = 84;
  const circ = 2 * Math.PI * r;
  const progress = seconds / targetSeconds;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-2)',
      }}
    >
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          {/* Outer hairline ring */}
          <circle
            cx={cx}
            cy={cy}
            r={r + 6}
            fill="none"
            stroke="var(--cream-hairline, rgba(255,232,189,0.15))"
            strokeWidth={1}
          />
          {/* Track ring */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
            strokeWidth={3}
          />
          {/* Progress arc — drawn from 12 o'clock clockwise. */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--amber, #d4a373)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - progress)}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          {/* Quarter-tick marks (00 / 15 / 30 / 45 sec equivalents). */}
          {[0, 1, 2, 3].map((q) => {
            const a = -Math.PI / 2 + (q / 4) * 2 * Math.PI;
            const x1 = cx + (r + 8) * Math.cos(a);
            const y1 = cy + (r + 8) * Math.sin(a);
            const x2 = cx + (r + 12) * Math.cos(a);
            const y2 = cy + (r + 12) * Math.sin(a);
            return (
              <line
                key={q}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--cream-faint, rgba(255,232,189,0.45))"
                strokeWidth={1}
              />
            );
          })}
        </svg>

        {/* MM:SS centered */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            pointerEvents: 'none',
          }}
        >
          <span
            className="deck-mono"
            style={{
              fontSize: 'clamp(2.2rem, min(3.4vw, 5.8vh), 3.6rem)',
              fontWeight: 700,
              color: 'var(--amber)',
              letterSpacing: '0.04em',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}
          >
            {text}
          </span>
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: 'clamp(0.55rem, min(0.7vw, 1.15vh), 0.75rem)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
              fontWeight: 700,
            }}
          >
            wall-clock
          </span>
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.78rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--amber)',
            fontWeight: 800,
          }}
        >
          target ↑ 5:00
        </span>
        <span
          className="deck-body"
          style={{
            fontSize: 'var(--fs-slide-tagline)',
            color: 'var(--cream-muted)',
            textAlign: 'center',
            lineHeight: 1.45,
            maxWidth: 220,
          }}
        >
          Dataset → sealed report under five minutes — same lanes, same hashes, same numbers.
        </span>
      </div>
    </div>
  );
}
