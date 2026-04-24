# CompartmentSchematic — pre-redesign snapshot (horizontal 720×200)

**Archived:** 2026-04-24
**File:** `src/decks/qp2-seminar/slides/cs1-build/CompartmentSchematic.jsx`
**Why archived:** User asked to "reorg and make it bigger to make use of the
space as there is big space below it" — the prior 720×200 (3.6:1) horizontal
layout sat squished at the top of its 417×417-ish panel slot, leaving the
bottom ~60% of the container empty. The redesigned schematic uses a square-ish
600×480 viewBox so it fills the available column height naturally.

Layout that lived in the prior version:
- DOSE rect (x=18–118, y=68–132)
- Ka·t-lag arrow (x=120–211, y=100)
- Vc/F circle (cx=265, cy=100, r=54)
- Q/F upper-forward arrow (x=322–432, y=86) + Q/F lower-reverse (x=432→322, y=114)
- Vp/F circle (cx=490, cy=100, r=54, dashed)
- CL/F down arrow (x=265, y=154→186)
- Allometry chip on the right (translate(560, 57), 148×86, "ALLOMETRY · FIXED" / "CL,Q ∝ WT^0.75" / "Vc,Vp ∝ WT^1.0" / "70-KG REFERENCE")
- Particle animations on Ka (3), Q-forward (2), Q-reverse (2), CL (2)

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const EASE = 'linear';
const PARTICLE_R = 3;

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

      {/* ── Q/F exchange ── */}
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

      {/* ── Allometric chip on right ── */}
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

      {/* ═══ Flowing particles ═══ */}
      {P.ka.map((p, i) => (
        <motion.circle key={`ka-${i}`}
          cy={100} r={PARTICLE_R} fill={coral}
          initial={{ cx: 120, opacity: 0 }}
          animate={{ cx: [120, 120, 212, 212], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.1, 0.9, 1], repeat: Infinity }} />
      ))}
      {P.qFwd.map((p, i) => (
        <motion.circle key={`qf-${i}`}
          cy={86} r={PARTICLE_R} fill={coral}
          initial={{ cx: 322, opacity: 0 }}
          animate={{ cx: [322, 322, 432, 432], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.15, 0.85, 1], repeat: Infinity }} />
      ))}
      {P.qRev.map((p, i) => (
        <motion.circle key={`qr-${i}`}
          cy={114} r={PARTICLE_R} fill={coral}
          initial={{ cx: 432, opacity: 0 }}
          animate={{ cx: [432, 432, 322, 322], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.15, 0.85, 1], repeat: Infinity }} />
      ))}
      {P.cl.map((p, i) => (
        <motion.circle key={`cl-${i}`}
          cx={265} r={PARTICLE_R} fill={coral}
          initial={{ cy: 154, opacity: 0 }}
          animate={{ cy: [154, 154, 186, 186], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: EASE,
            times: [0, 0.15, 0.85, 1], repeat: Infinity }} />
      ))}
    </svg>
  );
}
```

## Restoration

To revert: copy the function above back over the redesigned `CompartmentSchematic` in `src/decks/qp2-seminar/slides/cs1-build/CompartmentSchematic.jsx`.
