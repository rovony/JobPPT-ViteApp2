/** Refused paths — always visible (struck); step only brightens. */
import { motion, useReducedMotion } from 'framer-motion';

const ITEMS = [
  { label: 'Rescue efficacy', x: 100 },
  { label: 'Overfit covariates', x: 280 },
  { label: 'Crisp E-R claim', x: 460 },
];

export default function RefusedGlyphs({ step = 0, showAt = 2 }: { step?: number; showAt?: number }) {
  const reduced = useReducedMotion();
  const hot = step >= showAt;

  return (
    <svg
      viewBox="0 0 560 72"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '4.75rem', display: 'block' }}
      aria-hidden
    >
      <text
        x="0"
        y="18"
        fill="var(--amber)"
        fontSize="11"
        fontFamily="var(--font-mono)"
        letterSpacing="0.14em"
        fontWeight="700"
        opacity={hot ? 1 : 0.55}
      >
        REFUSED
      </text>
      {ITEMS.map((it, i) => (
        <motion.g
          key={it.label}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: hot ? 1 : 0.45 }}
          transition={{ duration: 0.28, delay: reduced ? 0 : i * 0.05 }}
        >
          <text
            x={it.x}
            y="48"
            textAnchor="middle"
            fill="var(--cream)"
            fontSize="14"
            fontFamily="var(--font-display)"
            fontWeight="600"
          >
            {it.label}
          </text>
          <line x1={it.x - 72} y1="42" x2={it.x + 72} y2="42" stroke="var(--amber)" strokeWidth="1.8" />
        </motion.g>
      ))}
    </svg>
  );
}
