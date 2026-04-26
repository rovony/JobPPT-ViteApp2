// @ts-nocheck
import React from 'react';
import { MagicCard } from '@/components/magicui/magic-card';

export default function MagicCardShowcase() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden p-8" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-2)' }}>
        Component · MagicCard · Magic UI
      </div>
      <h2 className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', lineHeight: 'var(--lh-tight)', fontWeight: 500, margin: 0, marginBottom: 'var(--space-5)' }}>
        Three card vocabularies.{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>Pick one.</span>
      </h2>
      <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', marginBottom: 'var(--space-4)' }}>
        Hover any card — gradient follows the cursor.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))', gap: 'var(--space-4)', height: 'calc(100% - 220px)' }}>
        {/* Variant A — Editorial / glass */}
        <MagicCard className="rounded-2xl" gradientFrom="var(--cyan)" gradientTo="var(--amber)" gradientColor="#1a3a5e">
          <div style={{ padding: 'var(--space-6)', minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cyan)', letterSpacing: 'var(--ls-mono-wide)' }}>Variant A · Editorial glass</div>
              <h3 className="deck-display" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)', fontWeight: 600, marginTop: 12, color: 'var(--cream)' }}>Endothelin pathway</h3>
              <p className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.78, lineHeight: 1.5, marginTop: 12 }}>
                ET-1 vasoconstriction · SMC proliferation · NO-pathway antagonism
              </p>
            </div>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--amber)' }}>2007 · 1st FDA</div>
          </div>
        </MagicCard>

        {/* Variant B — Tinted / coral */}
        <MagicCard className="rounded-2xl" gradientFrom="var(--coral)" gradientTo="var(--amber)" gradientColor="#3a1a1f">
          <div style={{ padding: 'var(--space-6)', minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--coral)', letterSpacing: 'var(--ls-mono-wide)' }}>Variant B · Tinted accent</div>
              <h3 className="deck-display" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)', fontWeight: 600, marginTop: 12, color: 'var(--cream)' }}>NO / cGMP pathway</h3>
              <p className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.78, lineHeight: 1.5, marginTop: 12 }}>
                Sildenafil · Tadalafil · Riociguat · sGC stimulation
              </p>
            </div>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--coral)' }}>2005 · 1st FDA</div>
          </div>
        </MagicCard>

        {/* Variant C — Sage / classic */}
        <MagicCard className="rounded-2xl" gradientFrom="var(--sage)" gradientTo="var(--cyan)" gradientColor="#1a2e2a">
          <div style={{ padding: 'var(--space-6)', minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--sage)', letterSpacing: 'var(--ls-mono-wide)' }}>Variant C · Classic</div>
              <h3 className="deck-display" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)', fontWeight: 600, marginTop: 12, color: 'var(--cream)' }}>Prostacyclin pathway</h3>
              <p className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.78, lineHeight: 1.5, marginTop: 12 }}>
                Epoprostenol · Treprostinil · Selexipag · IP agonism
              </p>
            </div>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--sage)' }}>1995 · 1st FDA</div>
          </div>
        </MagicCard>
      </div>
    </section>
  );
}
