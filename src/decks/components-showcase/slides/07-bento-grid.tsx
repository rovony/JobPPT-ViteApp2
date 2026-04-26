// @ts-nocheck
import React from 'react';

const Cell: React.FC<{
  kicker: string;
  title: string;
  body: string;
  tone: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
}> = ({ kicker, title, body, tone, style, size = 'md' }) => {
  const titleSize = size === 'lg' ? 'clamp(1.6rem, 3vw, 2.4rem)' : size === 'sm' ? 'clamp(1.05rem, 1.6vw, 1.3rem)' : 'clamp(1.2rem, 2vw, 1.6rem)';
  return (
    <div
      style={{
        position: 'relative',
        border: `1px solid var(--cream-hairline)`,
        borderLeft: `4px solid ${tone}`,
        background: `color-mix(in srgb, ${tone} 6%, var(--panel))`,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4) var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', letterSpacing: 'var(--ls-mono-wide)', color: tone }}>{kicker}</div>
      <div className="deck-display" style={{ fontSize: titleSize, fontWeight: 600, color: 'var(--cream)', lineHeight: 1.15 }}>{title}</div>
      <div className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.78, lineHeight: 1.5 }}>{body}</div>
    </div>
  );
};

const SubFrame: React.FC<{ title: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ title, children, style }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minHeight: 0, ...style }}>
    <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)' }}>{title}</div>
    {children}
  </div>
);

export default function BentoGridShowcase() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden p-8" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-2)' }}>
        Component · BentoGrid · pure CSS
      </div>
      <h2 className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', lineHeight: 'var(--lh-tight)', fontWeight: 500, margin: 0, marginBottom: 'var(--space-4)' }}>
        Three taxonomy layouts.{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>Same data, different reading order.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))', gap: 'var(--space-4)', height: 'calc(100% - 160px)' }}>
        {/* A — Classic 3-up */}
        <SubFrame title="Variant A — Classic 3-up">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-3)', flex: 1 }}>
            <Cell tone="var(--coral)" kicker="Pathway 01" title="Endothelin" body="ET-1 overactive · ERAs · 2007" />
            <Cell tone="var(--cyan)" kicker="Pathway 02" title="NO / cGMP" body="↓ NO underactive · PDE5i · 2005" />
            <Cell tone="var(--sage)" kicker="Pathway 03" title="Prostacyclin" body="↓ PGI₂ underactive · IP agonist · 1995" />
          </div>
        </SubFrame>

        {/* B — Asymmetric 1+4 */}
        <SubFrame title="Variant B — Asymmetric (1 hero + 4 small)">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1.5fr 1fr 1fr', gap: 'var(--space-3)', flex: 1 }}>
            <Cell tone="var(--coral)" size="lg" kicker="Hero" title="Endothelin" body="The pathway ambrisentan blocks selectively" style={{ gridColumn: '1 / -1' }} />
            <Cell tone="var(--cyan)" size="sm" kicker="ETA" title=">4000:1" body="Selectivity ratio" />
            <Cell tone="var(--amber)" size="sm" kicker="ETB" title="preserved" body="NO mediator intact" />
            <Cell tone="var(--sage)" size="sm" kicker="FDA" title="2007" body="Letairis approval" />
            <Cell tone="var(--violet)" size="sm" kicker="Class" title="3 ERAs" body="Bos · Mac · Amb" />
          </div>
        </SubFrame>

        {/* C — Quadrant 2x2 */}
        <SubFrame title="Variant C — Quadrant 2×2">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 'var(--space-3)', flex: 1 }}>
            <Cell tone="var(--coral)" size="md" kicker="Disease" title="ET-1 ↑" body="Untreated PAH" />
            <Cell tone="var(--amber)" size="md" kicker="Drug" title="AMB binds" body="ETA blocked" />
            <Cell tone="var(--cyan)" size="md" kicker="Outcome" title="Vessel ↑" body="Vasodilation" />
            <Cell tone="var(--sage)" size="md" kicker="Spared" title="ETB ✓" body="NO pathway preserved" />
          </div>
        </SubFrame>
      </div>
    </section>
  );
}
