// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import SmilesDrawer from 'smiles-drawer';

const SmilesCanvas: React.FC<{ smiles: string; width?: number; height?: number; theme?: string }> = ({
  smiles,
  width = 380,
  height = 240,
  theme = 'dark',
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const drawer = new SmilesDrawer.Drawer({
      width,
      height,
      bondThickness: 1.0,
      bondLength: 22,
      shortBondLength: 0.85,
      atomVisualization: 'default',
      experimental: false,
      themes: {
        dark: {
          C: '#f5f0e8', O: '#ff6b5a', N: '#7dd3fc', F: '#a8e0a3',
          CL: '#a8e0a3', BR: '#e1b06f', I: '#bf90ff', P: '#e1b06f',
          S: '#f5d04c', B: '#ff9c7d', SI: '#bdb6a3',
          H: '#bdb6a3', BACKGROUND: 'transparent',
        },
      },
    });
    SmilesDrawer.parse(smiles, (tree: any) => {
      drawer.draw(tree, ref.current!, theme);
    });
  }, [smiles, width, height, theme]);
  return <canvas ref={ref} width={width} height={height} style={{ display: 'block' }} />;
};

export default function SmilesShowcase() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden p-8" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-2)' }}>
        Component · smiles-drawer (already in stack)
      </div>
      <h2 className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', lineHeight: 'var(--lh-tight)', fontWeight: 500, margin: 0, marginBottom: 'var(--space-5)' }}>
        Render real chemistry from{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>SMILES strings.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-5)', height: 'calc(100% - 180px)' }}>
        {/* Variant A — Single hero molecule */}
        <div style={{ border: '1px solid var(--cream-hairline)', background: 'color-mix(in srgb, var(--panel) 60%, transparent)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column' }}>
          <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-3)' }}>
            Variant A — Hero molecule
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SmilesCanvas smiles="COc1ccc(cc1)c1nc(nc(c1)c1ccc(cc1)C)OCC(C)(C)O" width={360} height={260} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
            <div className="deck-display" style={{ fontSize: 'var(--fs-slide-subhead)', fontWeight: 600, color: 'var(--cream)' }}>Ambrisentan</div>
            <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', marginTop: 4 }}>C₂₂H₂₂N₂O₄ · ETA &gt;4000:1</div>
          </div>
        </div>

        {/* Variant B — Side-by-side ERA class */}
        <div style={{ border: '1px solid var(--cream-hairline)', background: 'color-mix(in srgb, var(--panel) 60%, transparent)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column' }}>
          <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-3)' }}>
            Variant B — ERA class comparison
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
            {[
              { name: 'Bosentan', smiles: 'COc1ccccc1Oc1c(NS(=O)(=O)c2ccc(cc2)C(C)(C)C)nc(nc1OCCO)c1ncccn1', sel: '20:1', tone: 'var(--coral)' },
              { name: 'Macitentan', smiles: 'CCCNS(=O)(=O)c1ncc(nc1OCCOc1ncc(cn1)Br)c1ccc(cc1)Br', sel: '50:1', tone: 'var(--amber)' },
              { name: 'Ambrisentan', smiles: 'COc1ccc(cc1)c1nc(nc(c1)c1ccc(cc1)C)OCC(C)(C)O', sel: '>4000:1', tone: 'var(--cyan)' },
            ].map((m) => (
              <div key={m.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-3)', background: `color-mix(in srgb, ${m.tone} 6%, transparent)`, border: `1px solid color-mix(in srgb, ${m.tone} 30%, transparent)`, borderRadius: 'var(--radius-md)' }}>
                <SmilesCanvas smiles={m.smiles} width={200} height={140} />
                <div className="deck-display" style={{ fontSize: 'var(--fs-slide-subhead)', fontWeight: 600, color: m.tone, marginTop: 8 }}>{m.name}</div>
                <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: m.tone, opacity: 0.85, marginTop: 4, letterSpacing: 'var(--ls-mono-wide)' }}>{m.sel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
