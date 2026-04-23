import React, { useEffect, useRef, useState } from 'react';

/**
 * LaserOverlay — draws an active laser dot + fading ink strokes on top
 * of the slide stage. Coordinates come in as NORMALIZED values (0..1)
 * relative to the stage's bounding box, so presenter and audience
 * windows render identically regardless of their physical size.
 *
 * Controlled purely by props:
 *   pointer: { x, y, visible } | null         — live laser dot (normalized)
 *   strokes: Array<Stroke>                    — finished/active ink strokes
 *   activeStroke: Stroke | null               — currently-drawing stroke
 *   color: string                             — CSS color token
 *
 * Stroke shape: { id, color, points: [{x,y}], startedAt }
 *
 * Strokes fade after STROKE_FADE_MS (6s) so the slide doesn't accumulate
 * clutter. The overlay is always pointer-events:none so it never blocks
 * underlying slide interactions.
 */

const STROKE_FADE_MS = 6000;  // time-to-live for ink strokes
const STROKE_FADE_START = 4000; // start fading after this many ms

export default function LaserOverlay({ pointer, strokes = [], activeStroke, color = 'var(--coral)' }) {
  const hostRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [, force] = useState(0);

  // Measure own bounding box so we can convert normalized → px.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Tick while any stroke is still fading so opacity stays animated.
  useEffect(() => {
    if (strokes.length === 0 && !activeStroke) return;
    const id = setInterval(() => force((n) => n + 1), 80);
    return () => clearInterval(id);
  }, [strokes.length, activeStroke]);

  const now = Date.now();

  const pathFromPoints = (pts) => {
    if (!pts || pts.length === 0) return '';
    const p0 = pts[0];
    let d = `M ${p0.x * size.w} ${p0.y * size.h}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${pts[i].x * size.w} ${pts[i].y * size.h}`;
    }
    return d;
  };

  const strokeOpacity = (s) => {
    const age = now - (s.startedAt || now);
    if (age < STROKE_FADE_START) return 0.85;
    if (age > STROKE_FADE_MS) return 0;
    return 0.85 * (1 - (age - STROKE_FADE_START) / (STROKE_FADE_MS - STROKE_FADE_START));
  };

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="absolute inset-0"
      style={{ pointerEvents: 'none', zIndex: 35 /* below chrome (40), above slide */ }}
    >
      <svg
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${Math.max(1, size.w)} ${Math.max(1, size.h)}`}
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
      >
        {strokes.map((s) => {
          const op = strokeOpacity(s);
          if (op <= 0) return null;
          return (
            <path
              key={s.id}
              d={pathFromPoints(s.points)}
              fill="none"
              stroke={s.color || color}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={op}
              style={{
                filter: `drop-shadow(0 0 6px ${s.color || color})`,
              }}
            />
          );
        })}
        {activeStroke && (
          <path
            d={pathFromPoints(activeStroke.points)}
            fill="none"
            stroke={activeStroke.color || color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
            style={{ filter: `drop-shadow(0 0 8px ${activeStroke.color || color})` }}
          />
        )}
      </svg>

      {pointer?.visible && (
        <div
          style={{
            position: 'absolute',
            left: pointer.x * size.w,
            top: pointer.y * size.h,
            transform: 'translate(-50%, -50%)',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 14px 4px ${color}, 0 0 28px 8px ${color}`,
            opacity: 0.95,
            transition: 'left 40ms linear, top 40ms linear',
          }}
        />
      )}
    </div>
  );
}