// @ts-nocheck
import React, { useRef } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import Balancer from 'react-wrap-balancer';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function XarrowsBalancerShowcase() {
  return (
    <LibraryShowcase
      category="§5A · Presentation decks · annotation + typography"
      library="react-xarrows + react-wrap-balancer"
      npmInstall="npm install react-xarrows react-wrap-balancer"
      url="github.com/Eliav2/react-xarrows · github.com/shuding/react-wrap-balancer"
      headline={<>Leader lines + <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>balanced</span> headline wrapping.</>}
      subhead="Two utilities that punch above their weight. Xarrows draws SVG arrows between any two DOM nodes. Wrap-Balancer balances headlines so no line is an orphan."
      tone="var(--cyan)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Leader-line callouts (xarrows)" tone="var(--cyan)">
          <Xwrapper>
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
              <div id="callout-1" style={{ position: 'absolute', top: 8, left: 8, padding: '6px 10px', border: '1px solid var(--cyan)', borderRadius: 6, fontSize: 'var(--fs-slide-pageno)', background: 'color-mix(in srgb, var(--cyan) 10%, var(--panel))' }}>
                ETA receptor
              </div>
              <div id="diagram" style={{ width: 130, height: 80, border: '1.5px dashed var(--cream-faint)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream-faint)' }}>
                vessel
              </div>
              <div id="callout-2" style={{ position: 'absolute', bottom: 8, right: 8, padding: '6px 10px', border: '1px solid var(--coral)', borderRadius: 6, fontSize: 'var(--fs-slide-pageno)', background: 'color-mix(in srgb, var(--coral) 10%, var(--panel))' }}>
                Smooth muscle
              </div>
              <Xarrow start="callout-1" end="diagram" color="var(--cyan)" strokeWidth={1.5} headSize={5} />
              <Xarrow start="callout-2" end="diagram" color="var(--coral)" strokeWidth={1.5} headSize={5} />
            </div>
          </Xwrapper>
        </Frame>

        <Frame title="Variant B · Balanced headline wrap" tone="var(--amber)">
          <div style={{ width: '100%' }}>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--amber)', marginBottom: 8 }}>Without balancer</div>
            <div className="deck-display" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream-faint)', maxWidth: '24ch', lineHeight: 1.25 }}>
              When the pediatric trial cannot carry the dose, the model has to.
            </div>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--amber)', marginTop: 16, marginBottom: 8 }}>With balancer</div>
            <div className="deck-display" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', lineHeight: 1.25 }}>
              <Balancer>When the pediatric trial cannot carry the dose, the model has to.</Balancer>
            </div>
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
