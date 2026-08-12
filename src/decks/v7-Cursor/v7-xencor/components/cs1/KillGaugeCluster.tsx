/**
 * KillGaugeCluster — four gauges always labeled; steps fill rings + stamp PASS/HINGE.
 */
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.68, 0.28, 1] as const;

const GAUGES = [
  { id: 'miss', label: 'Systematic miss', ok: true, at: 2 },
  { id: 'allo', label: 'Allometry flip', ok: true, at: 2 },
  { id: 'safe', label: 'Safety at match', ok: true, at: 3 },
  { id: 'hinge', label: 'Disease similarity', ok: false, at: 3 },
];

function Gauge({
  cx,
  cy,
  label,
  ok,
  show,
  delay,
  reduced,
}: {
  cx: number;
  cy: number;
  label: string;
  ok: boolean;
  show: boolean;
  delay: number;
  reduced: boolean | null;
}) {
  const color = ok ? 'var(--sage)' : 'var(--amber)';
  const r = 48;
  const circ = 2 * Math.PI * r;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="rgba(245,240,232,0.04)" stroke="rgba(245,240,232,0.22)" strokeWidth="7" />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={circ}
        transform={`rotate(-90 ${cx} ${cy})`}
        initial={false}
        animate={{
          strokeDashoffset: show ? (ok ? circ * 0.1 : circ * 0.42) : circ * 0.85,
          opacity: show ? 1 : 0.45,
        }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
      />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fill={show ? color : 'var(--cream-muted)'}
        fontSize="12"
        fontFamily="var(--font-mono)"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        {show ? (ok ? 'PASS' : 'HINGE') : '—'}
      </text>
      <text
        x={cx}
        y={cy + 66}
        textAnchor="middle"
        fill="var(--cream)"
        fontSize="13"
        fontFamily="var(--font-display)"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );
}

export default function KillGaugeCluster({ step = 0 }: { step?: number }) {
  const reduced = useReducedMotion();
  const positions = [
    [90, 78],
    [250, 78],
    [90, 210],
    [250, 210],
  ];

  return (
    <svg
      viewBox="0 0 340 290"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-label="Kill-test gauges"
    >
      <text
        x="170"
        y="22"
        textAnchor="middle"
        fill="var(--cream-faint)"
        fontSize="11"
        fontFamily="var(--font-mono)"
        letterSpacing="0.16em"
        fontWeight="700"
      >
        KILL TESTS
      </text>
      {GAUGES.map((g, i) => (
        <Gauge
          key={g.id}
          cx={positions[i][0]}
          cy={positions[i][1]}
          label={g.label}
          ok={g.ok}
          show={step >= g.at}
          delay={i * 0.06}
          reduced={reduced}
        />
      ))}
    </svg>
  );
}
