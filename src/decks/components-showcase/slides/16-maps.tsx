// @ts-nocheck
import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import Flag from 'react-world-flags';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

const APPROVED = ['USA', 'CAN', 'GBR', 'FRA', 'DEU', 'JPN', 'IND'];
const PIPELINE = ['BRA', 'AUS', 'CHN', 'MEX'];

export default function MapsShowcase() {
  return (
    <LibraryShowcase
      category="§5A · Presentation decks · maps"
      library="react-simple-maps + react-world-flags"
      npmInstall="npm install react-simple-maps react-world-flags"
      url="react-simple-maps.io"
      headline={<>Approval geography + <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>flag badges</span> for global rollouts.</>}
      subhead="Lightweight SVG maps with topojson + per-country fills. Pair with react-world-flags for compact country callouts."
      tone="var(--cyan)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Approval-status world map" tone="var(--cyan)">
          <div style={{ flex: 1, minHeight: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 90 }} style={{ width: '100%', height: '100%' }}>
              <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const id3 = geo.id; // numeric ISO
                    // Map numeric ISO to A3 by name (simpler proxy: use name match)
                    const name = geo.properties.name;
                    const a3Map = { 'United States of America': 'USA', 'Canada': 'CAN', 'United Kingdom': 'GBR', 'France': 'FRA', 'Germany': 'DEU', 'Japan': 'JPN', 'India': 'IND', 'Brazil': 'BRA', 'Australia': 'AUS', 'China': 'CHN', 'Mexico': 'MEX' };
                    const a3 = a3Map[name];
                    const fill = APPROVED.includes(a3) ? 'var(--cyan)' : PIPELINE.includes(a3) ? 'var(--amber)' : 'var(--cream-ghost)';
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        stroke="var(--cream-hairline)"
                        strokeWidth={0.4}
                        style={{ default: { outline: 'none' }, hover: { outline: 'none', fill: 'var(--coral)' } }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)', fontSize: 'var(--fs-slide-pageno)' }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--cyan)', marginRight: 6, verticalAlign: 'middle' }} />Approved</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--amber)', marginRight: 6, verticalAlign: 'middle' }} />Pipeline</span>
          </div>
        </Frame>

        <Frame title="Variant B · Flag badge stack" tone="var(--amber)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '100%' }}>
            {[
              { code: 'US', label: 'USA · 2018', tone: 'var(--cyan)' },
              { code: 'EU', label: 'EMA · 2021', tone: 'var(--cyan)' },
              { code: 'JP', label: 'PMDA · 2021', tone: 'var(--cyan)' },
              { code: 'IN', label: 'CDSCO · 2024', tone: 'var(--amber)' },
              { code: 'BR', label: 'Pipeline', tone: 'var(--cream-faint)' },
            ].map((c) => (
              <div key={c.code} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, border: '1px solid var(--cream-hairline)', borderLeft: `3px solid ${c.tone}`, borderRadius: 6 }}>
                <Flag code={c.code} style={{ width: 28, height: 18, objectFit: 'cover', borderRadius: 2 }} />
                <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: c.tone, fontWeight: 700 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
