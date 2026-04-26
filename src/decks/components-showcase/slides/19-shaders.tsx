// @ts-nocheck
import React from 'react';
import { MeshGradient, GrainGradient, Waves } from '@paper-design/shaders-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function ShadersShowcase() {
  return (
    <LibraryShowcase
      category="§5A / §5B · WebGL backgrounds"
      library="@paper-design/shaders-react"
      npmInstall='npm install "@paper-design/shaders-react"'
      url="shaders.paper.design"
      headline={<>WebGL gradients that <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>look expensive</span> in one line.</>}
      subhead="Hand-tuned GLSL shaders shipped as React components — mesh gradients, grain, liquid, waves. Use for hero backgrounds and case-divider arrivals."
      tone="var(--amber)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)', flex: 1, minHeight: 0 }}>
        <Frame title="Mesh gradient" tone="var(--cyan)">
          <div style={{ width: '100%', height: '100%', minHeight: 220, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
            <MeshGradient
              colors={['#FFCB47', '#F4B382', '#74C7E1', '#1B1B1E']}
              speed={0.6}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Frame>
        <Frame title="Grain gradient" tone="var(--coral)">
          <div style={{ width: '100%', height: '100%', minHeight: 220, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
            <GrainGradient
              colors={['#F4B382', '#FFCB47', '#1B1B1E']}
              softness={0.85}
              speed={0.4}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Frame>
        <Frame title="Waves" tone="var(--violet)">
          <div style={{ width: '100%', height: '100%', minHeight: 220, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
            <Waves
              colors={['#A38BC4', '#74C7E1', '#1B1B1E']}
              speed={0.5}
              frequency={0.6}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
