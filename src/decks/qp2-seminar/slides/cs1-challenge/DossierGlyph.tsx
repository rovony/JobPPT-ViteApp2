import React from 'react';
import { motion } from 'framer-motion';

/**
 * DossierGlyph — small (44×44) neon-coral stroke mark anchored in the
 * top-right corner of each dossier card. Three variants:
 *
 *   'disease'    — stylized lungs + heart (PAH)
 *   'drug'       — hex molecule + bond (ambrisentan)
 *   'constraint' — trial timeline + sparse dots (AMB112529, N=39)
 *
 * Props:
 *   variant — 'disease' | 'drug' | 'constraint'
 *   delay   — motion delay (draw-in after card settles)
 *   stroke  — CSS color (default var(--coral))
 *   size    — pixel side (default 44)
 */
export default function DossierGlyph({
  variant,
  delay = 0,
  stroke = 'var(--coral)',
  size = 44,
}) {
  const ease = [0.2, 0.7, 0.3, 1];
  const common = {
    fill: 'none',
    stroke,
    strokeWidth: 1.3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    vectorEffect: 'non-scaling-stroke',
  };

  return (
    <motion.svg
      viewBox="0 0 44 44"
      width={size}
      height={size}
      aria-hidden
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease, delay }}
      style={{ flex: '0 0 auto' }}
    >
      {variant === 'disease' && <Disease common={common} delay={delay} />}
      {variant === 'drug' && <Drug common={common} delay={delay} />}
      {variant === 'constraint' && <Constraint common={common} delay={delay} />}
    </motion.svg>
  );
}

/* ========================================================
   Disease — lungs + heart silhouette
   ======================================================== */
function Disease({ common, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <g>
      {/* Left lung */}
      <AnimatedPath
        d="M 20 10 C 14 12 8 18 7 26 C 6 32 9 36 13 36 C 17 36 20 33 20 28 Z"
        common={common} delay={delay + 0.1} duration={0.9}
      />
      {/* Right lung */}
      <AnimatedPath
        d="M 24 10 C 30 12 36 18 37 26 C 38 32 35 36 31 36 C 27 36 24 33 24 28 Z"
        common={common} delay={delay + 0.25} duration={0.9}
      />
      {/* Trachea */}
      <AnimatedPath d="M 22 6 L 22 14" common={common} delay={delay + 0.0} duration={0.4} />
      {/* Heart — small, between lungs */}
      <AnimatedPath
        d="M 18 20 C 18 17 21 16 22 19 C 23 16 26 17 26 20 C 26 23 22 26 22 26 C 22 26 18 23 18 20 Z"
        common={{ ...common, strokeWidth: 1.1 }}
        delay={delay + 0.5} duration={0.7}
      />
    </g>
  );
}

/* ========================================================
   Drug — benzene hex + tail bond (molecule shorthand)
   ======================================================== */
function Drug({ common, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  // Regular hexagon, centered on (18, 22), r=8
  const hex = (() => {
    const cx = 18, cy = 22, r = 8;
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return 'M ' + pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L ') + ' Z';
  })();

  return (
    <g>
      {/* Hex ring */}
      <AnimatedPath d={hex} common={common} delay={delay + 0.1} duration={1.0} />
      {/* Inner double-bond hint */}
      <AnimatedPath d="M 14 18 L 22 18" common={{ ...common, strokeWidth: 1 }} delay={delay + 0.7} duration={0.5} />
      {/* Bond to substituent */}
      <AnimatedPath d="M 26 22 L 34 22" common={common} delay={delay + 0.4} duration={0.6} />
      {/* Terminal dot (NH / O stand-in) */}
      <motion.circle
        cx={36} cy={22} r={2.2}
        fill={common.stroke} stroke="none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: delay + 1.0 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </g>
  );
}

/* ========================================================
   Constraint — trial timeline with sparse sample dots
   ======================================================== */
function Constraint({ common, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const dots = [10, 16, 24, 32]; // x-positions
  return (
    <g>
      {/* Horizontal axis */}
      <AnimatedPath d="M 6 28 L 38 28" common={common} delay={delay + 0.1} duration={0.7} />
      {/* Tick caps */}
      <AnimatedPath d="M 6 25 L 6 31" common={{ ...common, strokeWidth: 1 }} delay={delay + 0.5} duration={0.3} />
      <AnimatedPath d="M 38 25 L 38 31" common={{ ...common, strokeWidth: 1 }} delay={delay + 0.55} duration={0.3} />
      {/* Tiny N label rule on top */}
      <AnimatedPath d="M 12 14 L 32 14" common={{ ...common, strokeWidth: 0.9 }} delay={delay + 0.4} duration={0.6} />
      {/* Sparse sample dots */}
      {dots.map((x, i) => (
        <motion.circle
          key={x}
          cx={x} cy={28} r={1.8}
          fill={common.stroke} stroke="none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: [0.34, 1.56, 0.64, 1],
            delay: delay + 0.8 + i * 0.12,
          }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
      {/* Drop-line from N to one dot to suggest sampling */}
      <AnimatedPath d="M 22 16 L 22 26" common={{ ...common, strokeWidth: 0.9, strokeDasharray: '2 2' }} delay={delay + 0.9} duration={0.4} />
    </g>
  );
}

/* ========================================================
   AnimatedPath — draws stroke via pathLength
   ======================================================== */
function AnimatedPath({ d, common, delay, duration = 0.8 }) {
  return (
    <motion.path
      d={d}
      {...common}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration, ease: [0.2, 0.7, 0.3, 1], delay },
        opacity: { duration: 0.25, delay },
      }}
    />
  );
}