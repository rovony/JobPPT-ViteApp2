// @ts-nocheck
import React, { useId, useMemo } from 'react';
import Flag from 'react-world-flags';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';
import WorldMapSvg from '../assets/world-map.svg?react';

/**
 * Approval-status world map.
 *
 * Migrated 2026-05-06 from `react-simple-maps` to the deck's
 * canonical inline-SVG pattern (mirrors RegulatoryMap.tsx in
 * qp2-seminar-v3-R2). Reasons for the swap:
 *   - react-simple-maps is unmaintained (last release pre-d3-color
 *     ReDoS advisory; npm audit only proposes a v3→v1 downgrade)
 *   - the deck already ships a Robinson-projection world-map.svg
 *     keyed by ISO 3166 A3 country classes
 *   - inline-SVG approach has zero runtime deps and theme-aware fills
 */

const APPROVED = ['USA', 'CAN', 'GBR', 'FRA', 'DEU', 'JPN', 'IND'];
const PIPELINE = ['BRA', 'AUS', 'CHN', 'MEX'];

export default function MapsShowcase() {
  const uid = useId().replace(/[:]/g, '');
  const scope = `showcase-map-${uid}`;

  const approvedSelector = useMemo(
    () => APPROVED.map((iso) => `.${scope} svg .${iso}`).join(',\n      '),
    [scope],
  );
  const pipelineSelector = useMemo(
    () => PIPELINE.map((iso) => `.${scope} svg .${iso}`).join(',\n      '),
    [scope],
  );

  const css = `
    .${scope} { width: 100%; height: 100%; }
    .${scope} svg { display: block; width: 100%; height: 100%; }
    .${scope} svg .water { fill: transparent !important; stroke: none !important; }
    .${scope} svg .country {
      fill: var(--cream-ghost) !important;
      stroke: var(--cream-hairline) !important;
      stroke-width: 0.08 !important;
      transition: fill 600ms ease;
    }
    ${approvedSelector} {
      fill: var(--cyan) !important;
      fill-opacity: 0.88 !important;
    }
    ${pipelineSelector} {
      fill: var(--amber) !important;
      fill-opacity: 0.88 !important;
    }
    .${scope} svg circle { display: none !important; }
    .${scope} svg title, .${scope} svg desc { display: none; }
  `;

  return (
    <LibraryShowcase
      category="§5A · Presentation decks · maps"
      library="inline world-map.svg + react-world-flags"
      npmInstall="(no install — uses deck's bundled world-map.svg asset)"
      url="naturalearthdata.com (Robinson-projection source)"
      headline={<>Approval geography + <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>flag badges</span> for global rollouts.</>}
      subhead="Lightweight inline SVG with ISO 3166 A3 country classes. Zero runtime deps. Pair with react-world-flags for compact country callouts."
      tone="var(--cyan)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Approval-status world map" tone="var(--cyan)">
          <div className={scope} style={{ flex: 1, minHeight: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <style>{css}</style>
            <WorldMapSvg />
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
