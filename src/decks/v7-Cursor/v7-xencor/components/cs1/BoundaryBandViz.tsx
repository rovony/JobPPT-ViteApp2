/**
 * BoundaryBandViz — therapeutic band always visible; A/B accent by step.
 */
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.68, 0.28, 1] as const;

export default function BoundaryBandViz({ step = 0 }: { step?: number }) {
  const reduced = useReducedMotion();
  const accentA = step >= 1;
  const accentB = step >= 2;

  return (
    <svg
      viewBox="0 0 640 300"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-label="Adult therapeutic band with proceed versus redesign zones"
    >
      <defs>
        <linearGradient id="bandFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="var(--sage)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <line x1="80" y1="40" x2="80" y2="260" stroke="rgba(245,240,232,0.28)" strokeWidth="1.5" />
      <line x1="80" y1="260" x2="600" y2="260" stroke="rgba(245,240,232,0.28)" strokeWidth="1.5" />
      <text
        x="36"
        y="150"
        fill="var(--cream-muted)"
        fontSize="12"
        fontFamily="var(--font-mono)"
        transform="rotate(-90 36 150)"
        letterSpacing="0.12em"
      >
        AUCss
      </text>

      {/* Band — always */}
      <motion.rect
        x="100"
        y="95"
        width="460"
        height="90"
        rx="4"
        fill="url(#bandFill)"
        stroke="var(--sage)"
        strokeWidth="2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
      <text
        x="330"
        y="84"
        textAnchor="middle"
        fill="var(--sage)"
        fontSize="13"
        fontFamily="var(--font-mono)"
        letterSpacing="0.14em"
        fontWeight="700"
      >
        ADULT THERAPEUTIC BAND
      </text>

      {/* Action A — always drawn; step accents */}
      <motion.g
        initial={false}
        animate={{ opacity: accentA ? 1 : 0.55, scale: accentA ? 1.05 : 1 }}
        style={{ transformOrigin: '300px 140px' }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <circle cx="300" cy="140" r="20" fill="var(--sage)" />
        <text x="300" y="146" textAnchor="middle" fill="var(--ink)" fontSize="15" fontWeight="800" fontFamily="var(--font-mono)">
          A
        </text>
        <text x="300" y="188" textAnchor="middle" fill="var(--cream)" fontSize="15" fontFamily="var(--font-display)" fontWeight="600">
          Proceed · landed here
        </text>
        <text x="300" y="208" textAnchor="middle" fill="var(--cream-muted)" fontSize="12" fontFamily="var(--font-body)">
          Weight-based dose for the package
        </text>
      </motion.g>

      {/* Action B — always drawn dim; step 2 accents */}
      <motion.g initial={false} animate={{ opacity: accentB ? 1 : 0.4 }} transition={{ duration: 0.3, ease: EASE }}>
        <circle cx="520" cy="55" r="18" fill="none" stroke="var(--coral)" strokeWidth="2.2" />
        <text x="520" y="60" textAnchor="middle" fill="var(--coral)" fontSize="14" fontWeight="800" fontFamily="var(--font-mono)">
          B
        </text>
        <path d="M 520 74 L 520 95" stroke="var(--coral)" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="520" y="38" textAnchor="middle" fill="var(--coral)" fontSize="14" fontFamily="var(--font-display)" fontWeight="600">
          Redesign
        </text>
        <text x="330" y="282" textAnchor="middle" fill="var(--cream-muted)" fontSize="12" fontFamily="var(--font-body)">
          Systematic miss or unmanageable safety → change dose / refuse bridge
        </text>
      </motion.g>
    </svg>
  );
}
