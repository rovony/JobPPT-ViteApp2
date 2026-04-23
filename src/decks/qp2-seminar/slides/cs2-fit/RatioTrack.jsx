import React from 'react';
import { motion } from 'framer-motion';

/**
 * RatioTrack — one horizontal ratio scale row for slide 18.
 *
 * Shows a single PK parameter (AUC or Cmax) on a 0.6 → 1.2 ratio axis with:
 *   • 0.80–1.25 bioequivalence band shaded
 *   • Null (ratio = 1.00) marker at center
 *   • Phantom ring at the ABSOLUTE ratio (faint, dashed) — the "memory" dot
 *   • Cyan dashed trail from absolute → weight-normalized
 *   • Live cyan marker that animates 1.00 → abs → norm with the badge value
 *     swapping at each phase
 *
 * The visual claim: the marker starts at 1.00, drifts out to `abs`, then
 * snaps back toward 1.00 under `norm` — proving weight (not ethnicity)
 * explained the gap.
 */
export default function RatioTrack({
  name,
  sub,
  abs,
  norm,
  delayIn = 0.6,
  delayAbs = 1.0,
  delayNorm = 2.2,
  tk,
}) {
  const W = 900, H = 130;
  const padL = 230, padR = 70;
  const refX = (r) => padL + (W - padL - padR) * ((r - 0.6) / (1.2 - 0.6));
  const y = 70;

  const ease = [0.2, 0.7, 0.3, 1];
  const ticks = [0.6, 0.8, 1.0, 1.2];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%' }}
      aria-label={`${name} · absolute ${abs} → weight-normalized ${norm}`}
    >
      {/* Row label */}
      <text
        x={padL - 16} y={y + 4} textAnchor="end"
        fontFamily="var(--font-display)" fontWeight="700"
        fontSize="22" fill={tk('--cream')}
        letterSpacing="-0.02em"
      >
        {name}
      </text>
      <text
        x={padL - 16} y={y + 22} textAnchor="end"
        fontFamily="var(--font-mono)" fontSize="8"
        letterSpacing="0.18em" fill={tk('--cream-faint')}
      >
        {sub}
      </text>

      {/* Bioequivalence band (0.80–1.25) */}
      <rect
        x={refX(0.80)} y={y - 28}
        width={refX(1.2) - refX(0.80)} height={56}
        fill={tk('--cyan')} opacity={0.08}
      />

      {/* Spine */}
      <line
        x1={padL} x2={W - padR} y1={y} y2={y}
        stroke={tk('--cream-hairline')} strokeWidth={1}
      />

      {/* Axis ticks */}
      {ticks.map((t) => {
        const tx = refX(t);
        return (
          <g key={t}>
            <line
              x1={tx} x2={tx}
              y1={y + 20} y2={y + 26}
              stroke={tk('--cream-faint')} strokeWidth={1} opacity={0.5}
            />
            <text
              x={tx} y={y + 40} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="9"
              letterSpacing="0.1em" fill={tk('--cream-faint')}
            >
              {t.toFixed(2)}
            </text>
          </g>
        );
      })}

      {/* Null reference 1.00 */}
      <line
        x1={refX(1.0)} x2={refX(1.0)}
        y1={y - 28} y2={y + 18}
        stroke={tk('--cream-muted')} strokeWidth={1}
        strokeDasharray="3 5" opacity={0.55}
      />
      <text
        x={refX(1.0)} y={y - 32} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="7.5"
        letterSpacing="0.22em" fill={tk('--cream-faint')}
      >
        1.00
      </text>

      {/* Phantom ring at absolute (appears after shift) */}
      <motion.circle
        cx={refX(abs)} cy={y} r={9}
        fill="none" stroke={tk('--cream-faint')} strokeWidth={1.2}
        strokeDasharray="2 3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delayNorm - 0.2 }}
      />
      <motion.text
        x={refX(abs)} y={y - 16} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="8"
        letterSpacing="0.14em" fill={tk('--cream-faint')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delayNorm - 0.2 }}
      >
        ABS {abs.toFixed(2)}
      </motion.text>

      {/* Trail: absolute → normalized */}
      <motion.line
        x1={refX(abs)} y1={y}
        y2={y}
        stroke={tk('--cyan')} strokeWidth={2}
        strokeLinecap="round" opacity={0.5}
        strokeDasharray="3 3"
        initial={{ x2: refX(abs) }}
        animate={{ x2: refX(norm) }}
        transition={{ duration: 1.0, ease, delay: delayNorm }}
      />

      {/* Live cyan marker: 1.00 → abs → norm */}
      <motion.circle
        cy={y} r={12}
        fill={tk('--cyan')} stroke="var(--bg)" strokeWidth={3}
        initial={{ cx: refX(1.0), opacity: 0 }}
        animate={{
          cx: [refX(1.0), refX(1.0), refX(abs), refX(abs), refX(norm)],
          opacity: [0, 1, 1, 1, 1],
        }}
        transition={{
          duration: 3.2,
          ease,
          delay: delayIn,
          times: [0, 0.12, 0.42, 0.62, 1],
        }}
      />

      {/* Badge text inside marker — swaps 1.00 → abs → norm */}
      <BadgeText
        y={y + 5}
        abs={abs}
        norm={norm}
        delayIn={delayIn}
        delayAbs={delayAbs}
        delayNorm={delayNorm}
        refX={refX}
        tk={tk}
      />

      {/* /kg label at final position */}
      <motion.text
        x={refX(norm)} y={y + 58} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="9"
        letterSpacing="0.18em" fill={tk('--cyan')}
        fontWeight={700}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delayNorm + 0.9 }}
      >
        /KG  {norm.toFixed(2)}
      </motion.text>
    </svg>
  );
}

function BadgeText({ y, abs, norm, delayIn, delayAbs, delayNorm, refX, tk }) {
  const [label, setLabel] = React.useState('1.00');
  const [x, setX] = React.useState(refX(1.0));

  React.useEffect(() => {
    const t1 = setTimeout(() => { setLabel(abs.toFixed(2)); setX(refX(abs)); }, delayAbs * 1000 + 450);
    const t2 = setTimeout(() => { setLabel(norm.toFixed(2)); setX(refX(norm)); }, delayNorm * 1000 + 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [abs, norm, delayAbs, delayNorm, refX]);

  return (
    <motion.text
      x={x} y={y} textAnchor="middle"
      fontFamily="var(--font-display)" fontWeight={700}
      fontSize="14" fill="var(--bg)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: delayIn + 0.1 }}
      style={{ pointerEvents: 'none' }}
    >
      {label}
    </motion.text>
  );
}