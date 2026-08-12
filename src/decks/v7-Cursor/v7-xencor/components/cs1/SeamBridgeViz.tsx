/**
 * SeamBridgeViz — cliffs always visible; bridges accent by step.
 */
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.68, 0.28, 1] as const;

export default function SeamBridgeViz({ step = 0 }: { step?: number }) {
  const reduced = useReducedMotion();
  const showInterp = step >= 1;
  const showTransport = step >= 2;

  return (
    <svg
      viewBox="0 0 720 280"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-label="Interpolation bridge versus transport across a void"
    >
      {/* Ground */}
      <line x1="20" y1="200" x2="700" y2="200" stroke="rgba(245,240,232,0.2)" strokeWidth="1.5" />

      {/* Adult cliff */}
      <path
        d="M 20 200 L 20 70 L 170 70 L 170 200 Z"
        fill="rgba(245,240,232,0.12)"
        stroke="var(--cream-muted)"
        strokeWidth="1.6"
      />
      <text x="95" y="130" textAnchor="middle" fill="var(--cream)" fontSize="16" fontFamily="var(--font-display)" fontWeight="600">
        Adult
      </text>
      <text x="95" y="152" textAnchor="middle" fill="var(--cream-muted)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.1em">
        ANCHOR
      </text>

      {/* Pediatric cliff */}
      <path
        d="M 270 200 L 270 100 L 390 100 L 390 200 Z"
        fill="rgba(232,93,58,0.16)"
        stroke="var(--coral)"
        strokeWidth="1.8"
      />
      <text x="330" y="145" textAnchor="middle" fill="var(--cream)" fontSize="16" fontFamily="var(--font-display)" fontWeight="600">
        Pediatric
      </text>
      <text x="330" y="167" textAnchor="middle" fill="var(--coral)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        N=39 PK
      </text>

      {/* India cliff */}
      <path
        d="M 550 200 L 550 80 L 700 80 L 700 200 Z"
        fill="rgba(80,200,200,0.14)"
        stroke="var(--cyan)"
        strokeWidth="1.8"
      />
      <text x="625" y="130" textAnchor="middle" fill="var(--cream)" fontSize="16" fontFamily="var(--font-display)" fontWeight="600">
        India
      </text>
      <text x="625" y="152" textAnchor="middle" fill="var(--cyan)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        NO LOCAL PK
      </text>

      {/* Ghost interpolation — always faintly present */}
      <path
        d="M 170 90 C 210 50, 240 50, 270 105"
        fill="none"
        stroke="var(--coral)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={showInterp ? 0 : 0.35}
      />

      {/* Active interpolation */}
      <motion.path
        d="M 170 90 C 210 50, 240 50, 270 105"
        fill="none"
        stroke="var(--coral)"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: showInterp ? 1 : 0, opacity: showInterp ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
      />
      <motion.text
        x="220"
        y="42"
        textAnchor="middle"
        fill="var(--coral)"
        fontSize="13"
        fontFamily="var(--font-mono)"
        letterSpacing="0.12em"
        fontWeight="700"
        initial={false}
        animate={{ opacity: showInterp ? 1 : 0.25 }}
      >
        THIS CASE · INTERPOLATION
      </motion.text>

      {/* Gap hatching — always mild */}
      <g opacity={showTransport ? 0.55 : 0.2}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={410 + i * 22} y1="200" x2={430 + i * 22} y2="115" stroke="var(--cream-faint)" strokeWidth="1.2" />
        ))}
      </g>

      <motion.path
        d="M 390 120 C 460 35, 520 35, 550 100"
        fill="none"
        stroke="var(--amber)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="9 7"
        initial={false}
        animate={{ pathLength: showTransport ? 1 : 0, opacity: showTransport ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
      />
      <motion.text
        x="470"
        y="32"
        textAnchor="middle"
        fill="var(--amber)"
        fontSize="13"
        fontFamily="var(--font-mono)"
        letterSpacing="0.12em"
        fontWeight="700"
        initial={false}
        animate={{ opacity: showTransport ? 1 : 0.25 }}
      >
        NEXT · TRANSPORT
      </motion.text>
      <motion.text
        x="360"
        y="248"
        textAnchor="middle"
        fill="var(--cream-muted)"
        fontSize="14"
        fontFamily="var(--font-body)"
        initial={false}
        animate={{ opacity: showTransport ? 1 : 0.4 }}
      >
        Same craft. Harder claim. No anchor on the far side.
      </motion.text>
    </svg>
  );
}
