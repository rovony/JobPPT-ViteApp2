import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * Vertical connector with arrowhead. Stroke draw-in when `animate` + `go` are true.
 */
export default function MechanismArrow({
  direction = 'down',
  /** Whether this arrow should play its draw (caller gates with `go`) */
  animate: playDraw = true,
  go = true,
  delay = 0,
  duration = 0.4,
  className = '',
  style = {},
}) {
  const rawId = useId().replace(/:/g, '');
  const reduced = useReducedMotion();
  const shouldDraw = playDraw && go && !reduced;

  // down: line + chevron at bottom; pathLength animates 0 → 1
  const d =
    direction === 'down'
      ? 'M 12 2 L 12 24 M 7 20 L 12 28 L 17 20'
      : 'M 12 30 L 12 6 M 7 10 L 12 2 L 17 10';

  return (
    <motion.svg
      className={className}
      width="24"
      height="32"
      viewBox="0 0 24 32"
      style={{ display: 'block', flexShrink: 0, ...style }}
      aria-hidden
    >
      <defs>
        <clipPath id={`${rawId}-arrow-clip`}>
          <rect x="0" y="0" width="24" height="32" />
        </clipPath>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke="var(--cyan)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${rawId}-arrow-clip)`}
        initial={shouldDraw ? { pathLength: 0, opacity: 0.9 } : { pathLength: 1, opacity: 1 }}
        animate={shouldDraw ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration, delay, ease: EASE }, opacity: { duration: 0.2, delay } }}
      />
    </motion.svg>
  );
}
