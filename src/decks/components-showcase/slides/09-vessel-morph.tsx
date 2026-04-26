// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/** Two SVG path states for a blood-vessel cross-section. */
const NARROW_PATH = 'M 40 80 Q 200 50, 360 80 L 360 100 Q 200 70, 40 100 Z M 40 220 Q 200 250, 360 220 L 360 200 Q 200 230, 40 200 Z';
const WIDE_PATH   = 'M 40 40 Q 200 20, 360 40 L 360 100 Q 200 80, 40 100 Z M 40 260 Q 200 280, 360 260 L 360 200 Q 200 220, 40 200 Z';

const VesselMorph: React.FC<{ open: boolean; tone: string }> = ({ open, tone }) => {
  return (
    <svg viewBox="0 0 400 300" style={{ width: '100%', height: 'auto' }}>
      {/* Vessel walls */}
      <motion.path
        d={open ? WIDE_PATH : NARROW_PATH}
        animate={{ d: open ? WIDE_PATH : NARROW_PATH }}
        transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
        fill={tone}
        fillOpacity={0.18}
        stroke={tone}
        strokeWidth={1.5}
      />
      {/* Centerline arrows for "narrow" / "open" feel */}
      <motion.line
        x1="60" x2="340" y1="150" y2="150"
        stroke={tone}
        strokeWidth={1}
        strokeDasharray="4 6"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0.5 : 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      {/* RBCs to suggest flow */}
      {[80, 140, 200, 260, 320].map((cx, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={150}
          r={open ? 10 : 6}
          fill={tone}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85, cx: [cx, cx + 80, cx] }}
          transition={{ duration: 4, ease: 'linear', delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </svg>
  );
};

const Frame: React.FC<{ title: string; children: React.ReactNode; tone: string }> = ({ title, children, tone }) => (
  <div style={{
    border: `1.5px solid ${tone}`,
    borderLeft: `4px solid ${tone}`,
    background: `color-mix(in srgb, ${tone} 6%, var(--panel))`,
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-5)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  }}>
    <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: tone }}>
      {title}
    </div>
    {children}
  </div>
);

export default function VesselMorphShowcase() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden p-8" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-2)' }}>
        Component · framer-motion path morph (no library)
      </div>
      <h2 className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', lineHeight: 'var(--lh-tight)', fontWeight: 500, margin: 0, marginBottom: 'var(--space-5)' }}>
        The mechanism payoff:{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>narrow → open.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', height: 'calc(100% - 180px)' }}>
        <Frame title="DISEASE — UNTREATED · ET-1 active" tone="var(--coral)">
          <VesselMorph open={false} tone="var(--coral)" />
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.78, lineHeight: 1.5 }}>
            Vasoconstriction · narrow lumen · low cardiac output
          </div>
        </Frame>
        <Frame title="TREATED — AMBRISENTAN · ETA blocked" tone="var(--cyan)">
          <VesselMorph open={true} tone="var(--cyan)" />
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.78, lineHeight: 1.5 }}>
            Vasodilation · open lumen · ETB-mediated NO preserved
          </div>
        </Frame>
      </div>
      <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', textAlign: 'center', marginTop: 12 }}>
        Single SVG, two path states, framer-motion <code>animate=&#123;d&#125;</code>. No library beyond what you have.
      </div>
    </section>
  );
}
