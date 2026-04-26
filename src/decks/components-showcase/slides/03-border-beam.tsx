// @ts-nocheck
import React from 'react';
import { BorderBeam } from '@/components/magicui/border-beam';

const Frame: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{
    border: '1px solid var(--cream-hairline)',
    background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
  }}>
    <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-4)' }}>
      {title}
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  </div>
);

export default function BorderBeamShowcase() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden p-8" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-2)' }}>
        Component · BorderBeam · Magic UI
      </div>
      <h2 className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', lineHeight: 'var(--lh-tight)', fontWeight: 500, margin: 0, marginBottom: 'var(--space-5)' }}>
        A traveling border highlights{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>the moment of binding.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))', gap: 'var(--space-4)', height: 'calc(100% - 180px)' }}>
        {/* Variant 1 — Card */}
        <Frame title="Variant A — Hero card">
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', background: 'color-mix(in srgb, var(--panel) 90%, transparent)', border: '1px solid var(--cream-hairline)', overflow: 'hidden', minWidth: 220 }}>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cyan)', marginBottom: 8 }}>AMB · binding</div>
            <div className="deck-display" style={{ fontSize: 'var(--fs-card-numeral)', fontWeight: 700, color: 'var(--cyan)', lineHeight: 1 }}>
              ETA
            </div>
            <div className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.78, marginTop: 8 }}>
              Selectivity &gt;4000:1
            </div>
            <BorderBeam size={120} duration={6} colorFrom="var(--amber)" colorTo="var(--cyan)" />
          </div>
        </Frame>

        {/* Variant 2 — Pill button */}
        <Frame title="Variant B — Pill button">
          <button style={{ position: 'relative', borderRadius: 999, padding: '12px 28px', background: 'var(--panel)', border: '1px solid var(--cream-hairline)', color: 'var(--cream)', fontSize: 'var(--fs-slide-tagline)', overflow: 'hidden', cursor: 'pointer' }}>
            <span style={{ position: 'relative', zIndex: 2, fontWeight: 600 }}>AMB blocks ETA</span>
            <BorderBeam size={70} duration={4} colorFrom="var(--amber)" colorTo="var(--coral)" />
          </button>
        </Frame>

        {/* Variant 3 — Stat tile */}
        <Frame title="Variant C — Stat tile">
          <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', padding: 'var(--space-4) var(--space-5)', background: 'color-mix(in srgb, var(--coral) 10%, var(--panel))', border: '1.5px solid var(--coral)', borderLeftWidth: 4, overflow: 'hidden', minWidth: 200 }}>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--coral)', marginBottom: 6 }}>FDA · 1ST</div>
            <div className="deck-display" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1 }}>2007</div>
            <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)', opacity: 0.7, marginTop: 6 }}>Endothelin pathway approval</div>
            <BorderBeam size={100} duration={8} colorFrom="var(--coral)" colorTo="var(--amber)" />
          </div>
        </Frame>
      </div>
    </section>
  );
}
