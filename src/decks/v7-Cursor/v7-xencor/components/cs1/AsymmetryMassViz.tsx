/**
 * AsymmetryMassViz — 380 vs 39 always drawn at full mass.
 * Steps only add hypothesis overlays (never invent the bars from void).
 */
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.68, 0.28, 1] as const;

export default function AsymmetryMassViz({ step = 0 }: { step?: number }) {
  const reduced = useReducedMotion();
  const showWorking = step >= 2;
  const showCompeting = step >= 3;
  const massAccent = step >= 1;

  return (
    <svg
      viewBox="0 0 720 340"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-label="380 adults versus 39 children evidence asymmetry"
    >
      <defs>
        <linearGradient id="adultFill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--cream)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--cream)" stopOpacity="0.52" />
        </linearGradient>
        <linearGradient id="pedFill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--coral)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--coral)" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <line x1="40" y1="250" x2="680" y2="250" stroke="rgba(245,240,232,0.28)" strokeWidth="1.5" />

      {/* Adult mass — always full */}
      <motion.rect
        x="60"
        y="70"
        width="320"
        height="180"
        rx="6"
        fill="url(#adultFill)"
        stroke={massAccent ? 'var(--cream)' : 'var(--cream-muted)'}
        strokeWidth={massAccent ? 2 : 1.4}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      />
      <text
        x="220"
        y="155"
        textAnchor="middle"
        fill="var(--cream)"
        fontSize="64"
        fontWeight="700"
        fontFamily="var(--font-display)"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        380
      </text>
      <text
        x="220"
        y="185"
        textAnchor="middle"
        fill="var(--cream-muted)"
        fontSize="13"
        fontFamily="var(--font-mono)"
        letterSpacing="0.12em"
      >
        ADULTS · EXPOSURE ANCHOR
      </text>

      {/* Pediatric spike — always full */}
      <motion.rect
        x="480"
        y="150"
        width="140"
        height="100"
        rx="6"
        fill="url(#pedFill)"
        stroke="var(--coral)"
        strokeWidth={massAccent ? 2.4 : 1.8}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: reduced ? 0 : 0.1, ease: EASE }}
      />
      <text
        x="550"
        y="200"
        textAnchor="middle"
        fill="var(--cream)"
        fontSize="48"
        fontWeight="700"
        fontFamily="var(--font-display)"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        39
      </text>
      <text
        x="550"
        y="222"
        textAnchor="middle"
        fill="var(--coral)"
        fontSize="12"
        fontFamily="var(--font-mono)"
        letterSpacing="0.1em"
      >
        CHILDREN · PK ONLY
      </text>

      {/* Ratio callout — always */}
      <text
        x="400"
        y="280"
        textAnchor="middle"
        fill="var(--cream-faint)"
        fontSize="12"
        fontFamily="var(--font-mono)"
        letterSpacing="0.1em"
      >
        ~10∶1  ·  EFFICACY UNTRIALABLE · EXPOSURE DECISION-GRADE
      </text>

      {/* Working bridge */}
      <motion.path
        d="M 380 160 C 430 120, 470 120, 480 170"
        fill="none"
        stroke="var(--coral)"
        strokeWidth="2.8"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: showWorking ? 1 : 0, opacity: showWorking ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      />
      <motion.text
        x="430"
        y="100"
        textAnchor="middle"
        fill="var(--coral)"
        fontSize="13"
        fontFamily="var(--font-display)"
        fontWeight="600"
        initial={false}
        animate={{ opacity: showWorking ? 1 : 0 }}
      >
        Working · exposure can carry
      </motion.text>

      {/* Competing crack */}
      <motion.path
        d="M 400 200 L 420 175 L 445 205 L 470 165 L 495 195"
        fill="none"
        stroke="var(--amber)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: showCompeting ? 1 : 0, opacity: showCompeting ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
      <motion.text
        x="450"
        y="305"
        textAnchor="middle"
        fill="var(--amber)"
        fontSize="13"
        fontFamily="var(--font-display)"
        fontWeight="600"
        initial={false}
        animate={{ opacity: showCompeting ? 1 : 0 }}
      >
        Competing · matched exposure ≠ matched benefit–risk · HINGE: disease similarity
      </motion.text>
    </svg>
  );
}
