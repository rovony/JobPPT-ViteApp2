import React from 'react';
import { motion } from 'framer-motion';

/**
 * WorkflowStepsList — Preserved 6-step workflow list extracted from slide 11c.
 *
 * Originally rendered inline in 11c-case-build.jsx as the right-column
 * workflow narrative (coral spine + number-dot rows + step title / detail).
 * Preserved 2026-04-24 when 11c's right column was redesigned to use the
 * compact 6-node flowchart diagram (see DecisionGate.jsx). Kept as a named
 * reusable component so it can be composed into other slides that need
 * verbose sequential narratives.
 *
 * Props:
 *   · steps        Array<{ num, title, detail, hero? }> — rendered top-down
 *   · baseDelay    seconds — delay before the first row fades in
 *   · gap          seconds — stagger between rows
 *   · spineDelay   seconds — delay before the vertical coral spine draws in
 *   · accentColor  CSS color — coral by default, override per case study
 *
 * Hero rule: if `step.hero === true`, the row gets
 *   · filled coral dot with inverted text
 *   · pulsing halo ring (2.4s infinite, 0.8s repeatDelay)
 *   · larger title + colored title (accent) + lighter detail color
 * Used to spotlight the "pivotal" step (in 11c it was Step 02 — the
 * pcVPC gate).
 */

export default function WorkflowStepsList({
  steps,
  baseDelay = 0,
  gap = 0.15,
  spineDelay = 0,
  accentColor = 'var(--coral)',
}) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <div className="relative pl-14">
      <motion.div
        className="absolute"
        style={{
          left: 19, top: 12, bottom: 12, width: 2,
          background: accentColor, opacity: 0.35,
          transformOrigin: 'top center',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, ease, delay: spineDelay }}
      />
      {steps.map((s, i) => (
        <StepRow
          key={s.num}
          step={s}
          delay={baseDelay + i * gap}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
}

function StepRow({ step, delay, accentColor }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const hero = step.hero;
  return (
    <motion.div
      className="relative pb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <div
        className="absolute flex items-center justify-center deck-mono"
        style={{
          left: -56, top: -2, width: 40, height: 40, borderRadius: '50%',
          background: hero ? accentColor : 'var(--bg)',
          border: `2px solid ${accentColor}`,
          color: hero ? 'var(--bg)' : accentColor,
          fontWeight: 700, fontSize: 'var(--fs-card-body)',
        }}
      >
        {step.num}
      </div>

      {hero && (
        <motion.div
          className="absolute rounded-full"
          style={{
            left: -56, top: -2, width: 40, height: 40,
            border: `2px solid ${accentColor}`, pointerEvents: 'none',
          }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 0.6, 0], scale: [1, 1.8, 2] }}
          transition={{
            duration: 2.4,
            ease: 'easeOut',
            delay: delay + 0.6,
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
        />
      )}

      <div
        className="deck-display"
        style={{
          fontSize: hero ? 'var(--fs-slide-subhead)' : 'var(--fs-slide-tagline)',
          lineHeight: 1.15,
          color: hero ? accentColor : 'var(--cream)',
          fontWeight: hero ? 700 : 600,
          letterSpacing: 'var(--ls-headline)',
        }}
      >
        {step.title}
      </div>
      <div
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          lineHeight: 1.4,
          color: hero ? 'var(--cream)' : 'var(--cream-muted)',
          marginTop: 'var(--space-1)',
          textTransform: 'none',
          letterSpacing: 0,
          fontFamily: 'var(--font-body)',
        }}
      >
        {step.detail}
      </div>
    </motion.div>
  );
}
