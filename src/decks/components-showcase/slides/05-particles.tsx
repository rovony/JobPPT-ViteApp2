// @ts-nocheck
import React from 'react';
import { Particles } from '@/components/magicui/particles';

const Frame: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{
    border: '1px solid var(--cream-hairline)',
    background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minHeight: 0,
  }}>
    <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-3)' }}>
      {title}
    </div>
    <div style={{ flex: 1, position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg)' }}>
      {children}
    </div>
  </div>
);

export default function ParticlesShowcase() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden p-8" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-2)' }}>
        Component · Particles · Magic UI
      </div>
      <h2 className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', lineHeight: 'var(--lh-tight)', fontWeight: 500, margin: 0, marginBottom: 'var(--space-5)' }}>
        Particle field for{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>molecular atmosphere.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', height: 'calc(100% - 180px)' }}>
        <Frame title="Variant A — Sparse atmospheric (60 particles, cyan)">
          <Particles className="absolute inset-0" quantity={60} color="#7dd3fc" ease={80} size={0.8} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', pointerEvents: 'none' }}>
            <div className="deck-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 600, color: 'var(--cream)' }}>ET-1</div>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)', opacity: 0.6, marginTop: 6 }}>endothelin</div>
          </div>
        </Frame>

        <Frame title="Variant B — Dense receptor cloud (240 particles, coral)">
          <Particles className="absolute inset-0" quantity={240} color="#ff8c6b" ease={50} size={0.5} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', pointerEvents: 'none' }}>
            <div className="deck-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 600, color: 'var(--cream)' }}>ETA active</div>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)', opacity: 0.6, marginTop: 6 }}>ligand-saturated</div>
          </div>
        </Frame>
      </div>
      <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', textAlign: 'center', marginTop: 12 }}>
        Hover over each panel — particles repel from cursor with magnetism. Pair with a centered illustration.
      </div>
    </section>
  );
}
