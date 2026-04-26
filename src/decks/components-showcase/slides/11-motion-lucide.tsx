// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Pill, Activity, FlaskConical, HeartPulse, Microscope, Beaker, Dna, Brain, FileText, Target, Scale, Clock } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

const ICONS = [
  { Icon: Pill, label: 'Pill' },
  { Icon: Activity, label: 'Activity' },
  { Icon: FlaskConical, label: 'FlaskConical' },
  { Icon: HeartPulse, label: 'HeartPulse' },
  { Icon: Microscope, label: 'Microscope' },
  { Icon: Beaker, label: 'Beaker' },
  { Icon: Dna, label: 'Dna' },
  { Icon: Brain, label: 'Brain' },
  { Icon: FileText, label: 'FileText' },
  { Icon: Target, label: 'Target' },
  { Icon: Scale, label: 'Scale' },
  { Icon: Clock, label: 'Clock' },
];

export default function MotionLucideShowcase() {
  const reduce = useReducedMotion();
  return (
    <LibraryShowcase
      category="§4 · Core stack"
      library="motion + lucide-react"
      npmInstall="npm install motion lucide-react"
      url="motion.dev · lucide.dev"
      headline={<>Animation primitive + <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>2000-icon</span> family.</>}
      subhead="Motion (formerly Framer Motion) is the deck's load-bearing animation engine. Lucide is the deck's only icon family — never mix icon packs."
      tone="var(--amber)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Stagger fade-in (motion)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Plan', 'Build', 'Test', 'Ship'].map((label, i) => (
              <motion.div
                key={label}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay: i * 0.15 }}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--cream-hairline)',
                  borderLeft: '3px solid var(--amber)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--fs-slide-tagline)',
                  background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
                }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </Frame>

        <Frame title="Variant B · Lucide pharma icon set" tone="var(--cyan)">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
            {ICONS.map(({ Icon, label }, i) => (
              <motion.div
                key={label}
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
              >
                <Icon size={24} color="var(--cyan)" strokeWidth={1.5} />
                <span className="deck-mono" style={{ fontSize: 'calc(var(--fs-slide-pageno) * 0.9)', color: 'var(--cream-faint)' }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </Frame>

        <Frame title="Variant C · whileHover micro-tilt" tone="var(--coral)">
          <motion.div
            whileHover={reduce ? {} : { rotateX: 6, rotateY: -6, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            style={{
              padding: 'var(--space-4)',
              border: '1.5px solid var(--coral)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--coral) 10%, var(--panel))',
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              perspective: 800,
            }}
          >
            <HeartPulse size={36} color="var(--coral)" />
            <div className="deck-display" style={{ fontSize: 'var(--fs-slide-tagline)', marginTop: 8, fontWeight: 700 }}>
              Hover me
            </div>
            <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', marginTop: 4 }}>
              Spring-physics 3D tilt
            </div>
          </motion.div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
