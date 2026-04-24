import React from 'react';
import { motion } from 'framer-motion';

/**
 * CompartmentSchematic — 2-compartment · 1st-order absorption · tlag.
 *
 * Animated flows:
 *   • Ka:   Dose → Vc        (x: 120 → 212)
 *   • Q+:   Vc  → Vp upper   (x: 322 → 432)
 *   • Q−:   Vp  → Vc lower   (x: 432 → 322)
 *   • CL/F: Vc  → out        (y: 154 → 186)
 *
 * Particles are motion.circle elements animating cx/cy directly —
 * robust across browsers, no transform-box / fill-box fragility.
 */

const EASE = 'linear';
const PARTICLE_R = 3;

// Particle schedule — offsets (seconds) along a given flow's lifetime.
// Each entry stages the infinite loop so the channel feels continuous.
const P = {
  ka: [
    { delay: 1.3, duration: 2.6 },
    { delay: 2.0, duration: 2.6 },
    { delay: 2.7, duration: 2.6 },
  ],
  qFwd: [
    { delay: 1.5, duration: 2.4 },
    { delay: 2.1, duration: 2.4 },
  ],
  qRev: [
    { delay: 1.8, duration: 2.4 },
    { delay: 2.4, duration: 2.4 },
  ],
  cl: [
    { delay: 1.6, duration: 2.0 },
    { delay: 2.2, duration: 2.0 },
  ],
};

export default function CompartmentSchematic({ tk }) {
  const coral = tk('--coral');
  const cream = tk('--cream');
  const creamMuted = tk('--cream-muted');
  const creamFaint = tk('--cream-faint');

  return (
    <svg viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet"
         className="w-full" style={{ height: 200 }} aria-hidden>
      {/* ── Dose site ── */}
      <rect x="18" y="68" width="100" height="64" rx="8"
            fill="none" stroke={creamMuted} strokeWidth="1.5" />
      <text x="68" y="95" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="12" fill={cream}>DOSE</text>
      <text x="68" y="115" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.5" fill={creamFaint}>ORAL</text>

      {/* ── Ka arrow ── */}
      <line x1="120" y1="100" x2="211" y2="100" stroke={coral} strokeWidth="1.6" />
      <polygon points="213,100 204,95 204,105" fill={coral} />
      <text x="160" y="91" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="10" fill={coral}>Ka · t-lag</text>

      {/* ── Central compartment ── */}
      <circle cx="265" cy="100" r="54" fill="none" stroke={coral} strokeWidth="2" />
      <text x="265" y="98" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="22" fontWeight="600" fill={cream}>
        Vc/F
      </text>
      <text x="265" y="124" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill={creamMuted}>CENTRAL</text>

      {/* ── Q/F exchange (upper →, lower ←) ── */}
      <line x1="322" y1="86" x2="430" y2="86" stroke={coral} strokeWidth="1.4" />
      <polygon points="432,86 423,81 423,91" fill={coral} />
      <line x1="432" y1="114" x2="324" y2="114" stroke={coral} strokeWidth="1.4" />
      <polygon points="322,114 331,109 331,119" fill={coral} />
      <text x="377" y="78" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="10" fill={coral}>Q/F</text>

      {/* ── Peripheral compartment ── */}
      <circle cx="490" cy="100" r="54" fill="none" stroke={coral} strokeWidth="2" strokeDasharray="4 4" />
      <text x="490" y="98" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="22" fontWeight="600" fill={cream}>
        Vp/F
      </text>
      <text x="490" y="124" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill={creamMuted}>PERIPHERAL</text>

      {/* ── Elimination ── */}
      <line x1="265" y1="154" x2="265" y2="186" stroke={coral} strokeWidth="1.6" />
      <polygon points="265,188 260,179 270,179" fill={coral} />
      <text x="290" y="182" textAnchor="start"
            fontFamily="var(--font-mono)" fontSize="10" fill={coral}>CL/F</text>

      {/* ── Allometric chip ── adds 70-kg reference inside the box so
          panelists see it alongside the exponents instead of buried in
          the slide footer (V3.8.3 user ask). Box height grew 70 → 86 to
          accommodate the new line. */}
      <g transform="translate(560 57)">
        <rect x="0" y="0" width="148" height="86" rx="6"
              fill={coral} fillOpacity={0.08} stroke={coral} strokeWidth="1" />
        <text x="74" y="18" textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.5" fill={coral}>
          ALLOMETRY · FIXED
        </text>
        <text x="74" y="38" textAnchor="middle"
              fontFamily="var(--font-display)" fontSize="12" fill={cream}>CL, Q  ∝  WT^0.75</text>
        <text x="74" y="56" textAnchor="middle"
              fontFamily="var(--font-display)" fontSize="12" fill={cream}>Vc, Vp  ∝  WT^1.0</text>
        <text x="74" y="75" textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.2" fill={coral} opacity={0.9}>
          70-KG REFERENCE
        </text>
      </g>

      {/* ═══════════ Flowing particles ═══════════ */}

      {/* Ka: Dose → Vc (cx: 120 → 212) */}
      {P.ka.map((p, i) => (
        <motion.circle
          key={`ka-${i}`}
          cy={100} r={PARTICLE_R} fill={coral}
          initial={{ cx: 120, opacity: 0 }}
          animate={{
            cx: [120, 120, 212, 212],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* Q/F forward: Vc → Vp upper (cx: 322 → 432, y=86) */}
      {P.qFwd.map((p, i) => (
        <motion.circle
          key={`qf-${i}`}
          cy={86} r={PARTICLE_R} fill={coral}
          initial={{ cx: 322, opacity: 0 }}
          animate={{
            cx: [322, 322, 432, 432],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.15, 0.85, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* Q/F reverse: Vp → Vc lower (cx: 432 → 322, y=114) */}
      {P.qRev.map((p, i) => (
        <motion.circle
          key={`qr-${i}`}
          cy={114} r={PARTICLE_R} fill={coral}
          initial={{ cx: 432, opacity: 0 }}
          animate={{
            cx: [432, 432, 322, 322],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.15, 0.85, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* CL/F elimination: Vc → out (cy: 154 → 186, x=265) */}
      {P.cl.map((p, i) => (
        <motion.circle
          key={`cl-${i}`}
          cx={265} r={PARTICLE_R} fill={coral}
          initial={{ cy: 154, opacity: 0 }}
          animate={{
            cy: [154, 154, 186, 186],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.15, 0.85, 1],
            repeat: Infinity,
          }}
        />
      ))}
    </svg>
  );
}