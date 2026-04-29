// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * HashScroller — bottom strip of monospace SHA-256 hash strings
 * scrolling R→L at low opacity. Per A1 §5 row "Audit": 4% opacity,
 * looping.
 *
 * Reduced-motion: shows a single static row with no scroll.
 */

type Props = {
  opacity?: number;
  rows?: number;
  durationS?: number;
  bottomPx?: number;
};

const HASHES = [
  '0x4f8a3c91d7e2b5a8',
  '0x9c1d7b3e6f0a2c44',
  '0x71ba2f4d8c0e1a93',
  '0x3e0a8b5c2d4f7916',
  '0xa44f1d6e7b3c0289',
  '0x5d2c9f3e1a8b6047',
  '0x82e1c4d09a6f5b73',
  '0x1f6b85d3920c4eaa',
  '0xb04d1c7e9a3f628c',
  '0x7c93a05f1e8b2d46',
];

export default function HashScroller({
  opacity = 0.04,
  rows = 2,
  durationS = 60,
  bottomPx = 24,
}: Props) {
  const reduced = useReducedMotion();
  const stream = [...HASHES, ...HASHES, ...HASHES].join('     ');

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        bottom: bottomPx,
        left: 0,
        right: 0,
        pointerEvents: 'none',
        opacity,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {reduced ? (
            <span
              className="deck-mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                color: 'var(--cream)',
              }}
            >
              {stream}
            </span>
          ) : (
            <motion.span
              className="deck-mono"
              style={{
                display: 'inline-block',
                fontSize: 11,
                letterSpacing: '0.16em',
                color: 'var(--cream)',
              }}
              animate={{ x: ['0%', '-33.33%'] }}
              transition={{
                duration: durationS,
                repeat: Infinity,
                ease: 'linear',
                delay: rowIdx * (durationS / 6),
              }}
            >
              {stream}
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}
