import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * SparsePKChart — conceptual contrast between adult dense sampling and
 * pediatric sparse sampling. Adult dots form a clean concentration curve;
 * pediatric dots are few and widely spaced. Deterministic PRNG.
 *
 * Not pretending to be the actual AMB112529 dataset — it's a visual cue
 * that says "we had rich adult data and very sparse pediatric data."
 */
export default function SparsePKChart({ tk, delay = 0 }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const W = 360, H = 180;
  const m = { t: 14, r: 12, b: 34, l: 40 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;

  const curve = (t) => 80 + 420 * Math.exp(-0.08 * t) * (1 - Math.exp(-0.9 * t));

  const { adult, pedi } = useMemo(() => {
    let s = 4242;
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const nrand = () => {
      let u = 0, v = 0;
      while (!u) u = r();
      while (!v) v = r();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    const adult = [];
    for (let i = 0; i < 42; i++) {
      const t = 0.5 + r() * 23;
      const c = Math.max(10, curve(t) * (1 + nrand() * 0.22));
      adult.push({ t, c });
    }
    const pediTimes = [0.8, 2.4, 6.2, 12.4, 22.8];
    const pedi = pediTimes.map((t) => ({
      t, c: Math.max(10, curve(t) * (0.55 + nrand() * 0.1)),
    }));
    return { adult, pedi };
  }, []);

  const x = (t) => m.l + (t / 24) * iw;
  const y = (c) => m.t + (1 - Math.min(c, 560) / 560) * ih;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* Grid */}
      {[0, 6, 12, 18, 24].map((t) => (
        <line key={t} x1={x(t)} x2={x(t)} y1={m.t} y2={m.t + ih}
              stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.22} />
      ))}
      {[0, 200, 400, 560].map((c) => (
        <line key={c} x1={m.l} x2={m.l + iw} y1={y(c)} y2={y(c)}
              stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.3} />
      ))}

      {/* Adult dense dots — blue */}
      {adult.map((d, i) => (
        <motion.circle
          key={`a${i}`}
          cx={x(d.t)} cy={y(d.c)} r={2.6}
          fill={tk('--cyan')} fillOpacity={0.75}
          initial={{ opacity: 0 }} animate={{ opacity: 0.85 }}
          transition={{ duration: 0.2, delay: delay + (i % 15) * 0.018 + Math.floor(i / 15) * 0.08 }}
        />
      ))}

      {/* Pediatric sparse dots — coral, larger */}
      {pedi.map((d, i) => (
        <motion.circle
          key={`p${i}`}
          cx={x(d.t)} cy={y(d.c)} r={4.4}
          fill={tk('--coral')}
          initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: delay + 1.0 + i * 0.14 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}

      {/* Axes */}
      <text x={m.l - 6} y={y(560) + 3} textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="8.5" fill={tk('--cream-muted')}>Conc.</text>
      {[0, 6, 12, 18, 24].map((t) => (
        <text key={t} x={x(t)} y={m.t + ih + 12} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="8.5" fill={tk('--cream-muted')}>{t}</text>
      ))}
      <text x={m.l + iw / 2} y={H - 4} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="0.18em"
            fill={tk('--cream-faint')}>TIME (H)</text>

      {/* Legend */}
      <circle cx={m.l + 6} cy={m.t + 8} r={3} fill={tk('--cyan')} fillOpacity={0.75} />
      <text x={m.l + 14} y={m.t + 11}
            fontFamily="var(--font-mono)" fontSize="8.5" fill={tk('--cream-muted')}>
        Adult (dense)
      </text>
      <circle cx={m.l + 100} cy={m.t + 8} r={3} fill={tk('--coral')} />
      <text x={m.l + 108} y={m.t + 11}
            fontFamily="var(--font-mono)" fontSize="8.5" fill={tk('--cream-muted')}>
        Pediatric (sparse)
      </text>
    </svg>
  );
}