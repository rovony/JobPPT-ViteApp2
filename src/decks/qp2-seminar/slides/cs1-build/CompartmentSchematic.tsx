import React from 'react';
import { motion } from 'framer-motion';

/**
 * CompartmentSchematic — 2-compartment · 1st-order absorption · tlag.
 *
 * Square 600×480 viewBox so the figure fills the column slot on slide 09
 * (previously 720×200, which left the bottom ~60% of the panel empty).
 *
 * Layout
 * ──────
 *   y= 20–280  schematic
 *      DOSE rect  (x=30–160, y=140–220)
 *      Ka·t-lag → Vc/F (cx=300, r=65, cy=180)
 *      Q/F ⇌ Vp/F (cx=525, r=65, cy=180, dashed)
 *      CL/F ↓ from Vc bottom (x=300, y=247→290)
 *   y=325       divider hairline
 *   y=345–465  allometry chip (full-width, 540×120)
 *
 * Particle animations:
 *   • Ka:   Dose → Vc        (cx: 162 → 230)
 *   • Q+:   Vc  → Vp upper   (cx: 370 → 460, y=164)
 *   • Q−:   Vp  → Vc lower   (cx: 460 → 370, y=196)
 *   • CL/F: Vc  → out        (cy: 247 → 290, x=300)
 *
 * Particles are motion.circle elements animating cx/cy directly —
 * robust across browsers, no transform-box / fill-box fragility.
 */

const EASE = 'linear';
const PARTICLE_R = 3.2;

// Particle schedule — offsets (seconds) along each flow's lifetime.
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
    <svg
      viewBox="0 90 600 390"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden
    >
      {/* ═════════════════ SCHEMATIC (top section) ═════════════════ */}

      {/* ── Dose site ── */}
      <rect x="30" y="140" width="130" height="80" rx="8"
            fill="none" stroke={creamMuted} strokeWidth="1.6" />
      <text x="95" y="178" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="14" fill={cream}>DOSE</text>
      <text x="95" y="200" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill={creamFaint}>ORAL</text>

      {/* ── Ka · t-lag arrow (Dose → Vc) ── */}
      <line x1="162" y1="180" x2="230" y2="180" stroke={coral} strokeWidth="1.8" />
      <polygon points="232,180 222,175 222,185" fill={coral} />
      <text x="196" y="170" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="11" fill={coral}>Ka · t-lag</text>

      {/* ── Central compartment (Vc/F) ── */}
      <circle cx="300" cy="180" r="65" fill="none" stroke={coral} strokeWidth="2.2" />
      <text x="300" y="178" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="28" fontWeight="600" fill={cream}>
        Vc/F
      </text>
      <text x="300" y="204" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.2" fill={creamMuted}>CENTRAL</text>

      {/* ── Q/F exchange (upper →, lower ←) ── */}
      <line x1="370" y1="164" x2="458" y2="164" stroke={coral} strokeWidth="1.6" />
      <polygon points="460,164 451,159 451,169" fill={coral} />
      <line x1="460" y1="196" x2="372" y2="196" stroke={coral} strokeWidth="1.6" />
      <polygon points="370,196 379,191 379,201" fill={coral} />
      <text x="415" y="156" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="11" fill={coral}>Q/F</text>

      {/* ── Peripheral compartment (Vp/F) ── */}
      <circle cx="525" cy="180" r="65" fill="none" stroke={coral} strokeWidth="2.2" strokeDasharray="5 5" />
      <text x="525" y="178" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="28" fontWeight="600" fill={cream}>
        Vp/F
      </text>
      <text x="525" y="204" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.2" fill={creamMuted}>PERIPHERAL</text>

      {/* ── Elimination (CL/F) ── */}
      <line x1="300" y1="247" x2="300" y2="290" stroke={coral} strokeWidth="1.8" />
      <polygon points="300,292 295,283 305,283" fill={coral} />
      <text x="316" y="275" textAnchor="start"
            fontFamily="var(--font-mono)" fontSize="11" fill={coral}>CL/F</text>

      {/* ── Divider between schematic and allometry chip ── */}
      <line x1="30" y1="325" x2="570" y2="325"
            stroke={creamFaint} strokeWidth="0.6" opacity={0.45} />

      {/* ═════════════════ ALLOMETRY chip (bottom section) ═════════════════
          Two-layer fill: opaque panel-coloured back blocks any slide-footer
          bleed-through (the parent panel sits at 55% opacity over the deck
          background so footer text would otherwise leak through the chip),
          then the coral tint overlay on top. */}
      <rect x="30" y="345" width="540" height="120" rx="10"
            fill="var(--panel)" />
      <rect x="30" y="345" width="540" height="120" rx="10"
            fill={coral} fillOpacity={0.10} stroke={coral} strokeWidth="1.2" />

      <text x="300" y="372" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2" fill={coral}>
        ALLOMETRY · FIXED
      </text>

      {/* Two columns of allometric exponents — bigger, breathing room */}
      <text x="180" y="416" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="20" fill={cream}>
        CL, Q  ∝  WT
        <tspan dy="-7" fontSize="14" fill={cream}>0.75</tspan>
      </text>
      <text x="420" y="416" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="20" fill={cream}>
        Vc, Vp  ∝  WT
        <tspan dy="-7" fontSize="14" fill={cream}>1.0</tspan>
      </text>

      <text x="300" y="450" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5"
            fill={coral} opacity={0.85}>
        70-KG REFERENCE  ·  Anderson–Holford 2008  ·  ICH E11A 2025 default
      </text>

      {/* ═══════════════════ Flowing particles ═══════════════════ */}

      {/* Ka: Dose → Vc (cx: 162 → 230, cy=180) */}
      {P.ka.map((p, i) => (
        <motion.circle
          key={`ka-${i}`}
          cy={180} r={PARTICLE_R} fill={coral}
          initial={{ cx: 162, opacity: 0 }}
          animate={{
            cx: [162, 162, 230, 230],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* Q/F forward: Vc → Vp upper (cx: 370 → 460, y=164) */}
      {P.qFwd.map((p, i) => (
        <motion.circle
          key={`qf-${i}`}
          cy={164} r={PARTICLE_R} fill={coral}
          initial={{ cx: 370, opacity: 0 }}
          animate={{
            cx: [370, 370, 460, 460],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.15, 0.85, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* Q/F reverse: Vp → Vc lower (cx: 460 → 370, y=196) */}
      {P.qRev.map((p, i) => (
        <motion.circle
          key={`qr-${i}`}
          cy={196} r={PARTICLE_R} fill={coral}
          initial={{ cx: 460, opacity: 0 }}
          animate={{
            cx: [460, 460, 370, 370],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.15, 0.85, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* CL/F elimination: Vc → out (cy: 247 → 290, x=300) */}
      {P.cl.map((p, i) => (
        <motion.circle
          key={`cl-${i}`}
          cx={300} r={PARTICLE_R} fill={coral}
          initial={{ cy: 247, opacity: 0 }}
          animate={{
            cy: [247, 247, 290, 290],
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
