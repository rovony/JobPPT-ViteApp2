// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import rough from 'roughjs/bundled/rough.esm.js';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function D3RoughShowcase() {
  const d3Ref = useRef<SVGSVGElement>(null);
  const roughRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!d3Ref.current) return;
    const data = d3.range(20).map((d) => ({ x: d, y: 50 + 30 * Math.sin(d * 0.8) + (Math.random() - 0.5) * 10 }));
    const svg = d3.select(d3Ref.current);
    svg.selectAll('*').remove();
    const w = 360, h = 200, m = { top: 12, right: 16, bottom: 24, left: 32 };
    const x = d3.scaleLinear().domain([0, 19]).range([m.left, w - m.right]);
    const y = d3.scaleLinear().domain([0, 100]).range([h - m.bottom, m.top]);
    const line = d3.line<any>().x((d) => x(d.x)).y((d) => y(d.y)).curve(d3.curveMonotoneX);
    svg.attr('viewBox', `0 0 ${w} ${h}`).attr('width', '100%').attr('height', h);
    svg.append('g').attr('transform', `translate(0,${h - m.bottom})`).call(d3.axisBottom(x).ticks(5)).attr('color', 'var(--cream-faint)');
    svg.append('g').attr('transform', `translate(${m.left},0)`).call(d3.axisLeft(y).ticks(5)).attr('color', 'var(--cream-faint)');
    svg.append('path').datum(data).attr('fill', 'none').attr('stroke', 'var(--coral)').attr('stroke-width', 2).attr('d', line);
    svg.selectAll('circle').data(data).enter().append('circle').attr('cx', (d) => x(d.x)).attr('cy', (d) => y(d.y)).attr('r', 3).attr('fill', 'var(--coral)');
  }, []);

  useEffect(() => {
    if (!roughRef.current) return;
    while (roughRef.current.firstChild) roughRef.current.removeChild(roughRef.current.firstChild);
    const rc = rough.svg(roughRef.current);
    roughRef.current.appendChild(rc.rectangle(20, 20, 200, 80, { fill: '#FFCB47', fillStyle: 'hachure', hachureGap: 5, stroke: '#1B1B1E', strokeWidth: 2 }));
    roughRef.current.appendChild(rc.circle(280, 60, 70, { fill: '#74C7E1', fillStyle: 'cross-hatch', stroke: '#1B1B1E', strokeWidth: 2 }));
    roughRef.current.appendChild(rc.line(20, 140, 320, 140, { stroke: '#1B1B1E', strokeWidth: 2.5, roughness: 1.6 }));
    roughRef.current.appendChild(rc.path('M 30 170 Q 100 130 170 170 T 320 170', { stroke: '#F4B382', strokeWidth: 2.5, roughness: 1.5 }));
  }, []);

  return (
    <LibraryShowcase
      category="§6 · Custom viz primitives"
      library="d3 + roughjs"
      npmInstall="npm install d3 roughjs"
      url="d3js.org · roughjs.com"
      headline={<>Raw D3 axes + <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>hand-drawn</span> SVG when polish hurts.</>}
      subhead="D3 is the lower level — use when Recharts can't express the chart. Rough.js renders SVG/Canvas in a sketchy hand-drawn style — useful for explainer visuals."
      tone="var(--amber)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · D3 line chart (raw)" tone="var(--coral)">
          <svg ref={d3Ref} style={{ width: '100%' }} />
        </Frame>
        <Frame title="Variant B · roughjs hand-drawn" tone="var(--amber)">
          <svg ref={roughRef} viewBox="0 0 360 200" style={{ width: '100%', maxHeight: 220 }} />
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
