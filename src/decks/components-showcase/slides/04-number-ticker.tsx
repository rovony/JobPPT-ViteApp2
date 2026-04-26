// @ts-nocheck
import React from 'react';
import { NumberTicker } from '@/components/magicui/number-ticker';

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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  </div>
);

export default function NumberTickerShowcase() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden p-8" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-2)' }}>
        Component · NumberTicker · Magic UI
      </div>
      <h2 className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', lineHeight: 'var(--lh-tight)', fontWeight: 500, margin: 0, marginBottom: 'var(--space-5)' }}>
        Numbers that{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>land,</span> not flash.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))', gap: 'var(--space-4)', height: 'calc(100% - 180px)' }}>
        {/* Variant 1 — Hero stat */}
        <Frame title="Variant A — Hero stat with eyebrow">
          <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cyan)', letterSpacing: 'var(--ls-mono-wide)' }}>
            ETA selectivity ratio
          </div>
          <div className="deck-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, color: 'var(--cyan)', lineHeight: 1, marginTop: 8 }}>
            <NumberTicker value={4147} />
            <span style={{ fontSize: '0.5em', color: 'var(--cream)', opacity: 0.6 }}>:1</span>
          </div>
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.78, marginTop: 12, textAlign: 'center', maxWidth: '24ch' }}>
            Ambrisentan binds ETA <em>4000-fold</em> over ETB
          </div>
        </Frame>

        {/* Variant 2 — Three-up tile grid */}
        <Frame title="Variant B — Three-up tile grid">
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-end', justifyContent: 'space-around', width: '100%' }}>
            {[
              { label: '6MWD', value: 51, suffix: 'm', color: 'var(--cyan)' },
              { label: 'mPAP', value: 4.7, suffix: 'mmHg', color: 'var(--coral)', dec: 1 },
              { label: 'CI', value: 0.3, suffix: 'L/min/m²', color: 'var(--amber)', dec: 1 },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: s.color }}>{s.label}</div>
                <div className="deck-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: s.color, lineHeight: 1, marginTop: 6 }}>
                  +<NumberTicker value={s.value} decimalPlaces={s.dec || 0} />
                </div>
                <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)', opacity: 0.7, marginTop: 6 }}>{s.suffix}</div>
              </div>
            ))}
          </div>
        </Frame>

        {/* Variant 3 — Comparison ratio */}
        <Frame title="Variant C — Side-by-side comparison">
          <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'baseline' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="deck-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--coral)', lineHeight: 1 }}>
                <NumberTicker value={20} />
              </div>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--coral)', marginTop: 6 }}>Bosentan</div>
            </div>
            <div style={{ fontSize: '1.5rem', color: 'var(--cream-faint)' }}>·</div>
            <div style={{ textAlign: 'center' }}>
              <div className="deck-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--amber)', lineHeight: 1 }}>
                <NumberTicker value={50} />
              </div>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--amber)', marginTop: 6 }}>Macitentan</div>
            </div>
            <div style={{ fontSize: '1.5rem', color: 'var(--cream-faint)' }}>·</div>
            <div style={{ textAlign: 'center' }}>
              <div className="deck-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 700, color: 'var(--cyan)', lineHeight: 1 }}>
                &gt;<NumberTicker value={4000} />
              </div>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cyan)', marginTop: 6 }}>Ambrisentan</div>
            </div>
          </div>
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.78, marginTop: 16, textAlign: 'center', maxWidth: '36ch' }}>
            ETA-to-ETB selectivity ratio across class
          </div>
        </Frame>
      </div>
    </section>
  );
}
