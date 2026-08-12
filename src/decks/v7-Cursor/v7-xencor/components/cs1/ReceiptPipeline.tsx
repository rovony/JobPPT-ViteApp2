/**
 * ReceiptPipeline — full evidence chain always visible; agencies accent later.
 */
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.68, 0.28, 1] as const;

const NODES = [
  { id: 'adult', hero: '380', sub: 'adults', accentAt: 1 },
  { id: 'poppk', hero: '2-cmt', sub: 'PopPK', accentAt: 1 },
  { id: 'ped', hero: '39', sub: 'children', accentAt: 1 },
  { id: 'match', hero: '−3%', sub: 'low dose', accentAt: 2, heroTone: true },
];

const AGENCIES = [
  { name: 'EMA', win: true, x: 140 },
  { name: 'PMDA', win: true, x: 320 },
  { name: 'FDA', win: false, x: 500 },
];

export default function ReceiptPipeline({ step = 0 }: { step?: number }) {
  const reduced = useReducedMotion();
  const showPins = step >= 3;

  return (
    <svg
      viewBox="0 0 640 300"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-label="Evidence receipt pipeline and agency outcomes"
    >
      <line x1="70" y1="90" x2="570" y2="90" stroke="rgba(245,240,232,0.3)" strokeWidth="2.5" />

      {NODES.map((n, i) => {
        const x = 70 + i * 160;
        const hot = step >= n.accentAt;
        const color = n.heroTone ? 'var(--coral)' : 'var(--cream)';
        return (
          <motion.g
            key={n.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: reduced ? 0 : i * 0.06, ease: EASE }}
          >
            <circle
              cx={x}
              cy="90"
              r={n.heroTone ? 32 : 26}
              fill="var(--bg)"
              stroke={color}
              strokeWidth={hot ? (n.heroTone ? 3 : 2.2) : 1.5}
            />
            <text
              x={x}
              y="96"
              textAnchor="middle"
              fill={color}
              fontSize={n.heroTone ? 17 : 14}
              fontWeight="700"
              fontFamily="var(--font-display)"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {n.hero}
            </text>
            <text
              x={x}
              y="142"
              textAnchor="middle"
              fill="var(--cream-muted)"
              fontSize="12"
              fontFamily="var(--font-mono)"
              letterSpacing="0.08em"
            >
              {n.sub.toUpperCase()}
            </text>
          </motion.g>
        );
      })}

      {/* Agency row — always reserved; bright when showPins */}
      {AGENCIES.map((a, i) => {
        const color = a.win ? 'var(--sage)' : 'var(--amber)';
        return (
          <motion.g
            key={a.name}
            initial={false}
            animate={{ opacity: showPins ? 1 : 0.28 }}
            transition={{ duration: 0.3, delay: reduced ? 0 : 0.05 + i * 0.05 }}
          >
            <line x1={a.x} y1="168" x2={a.x} y2="208" stroke={color} strokeWidth="1.8" />
            <circle cx={a.x} cy="220" r="9" fill={color} />
            <text x={a.x} y="250" textAnchor="middle" fill="var(--cream)" fontSize="17" fontWeight="700" fontFamily="var(--font-display)">
              {a.name}
            </text>
            <text
              x={a.x}
              y="272"
              textAnchor="middle"
              fill={color}
              fontSize="11"
              fontFamily="var(--font-mono)"
              letterSpacing="0.1em"
              fontWeight="700"
            >
              {a.win ? 'ACCEPTED' : 'GAP REMAINS'}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
