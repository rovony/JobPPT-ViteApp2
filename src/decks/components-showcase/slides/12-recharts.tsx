// @ts-nocheck
import React from 'react';
import { AreaChart, Area, Line, LineChart, XAxis, YAxis, ResponsiveContainer, ReferenceArea, ReferenceLine, Tooltip, ComposedChart } from 'recharts';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

// Synthetic PK profile — concentration over time with 95% CI band
const PK = Array.from({ length: 49 }, (_, i) => {
  const t = i * 0.5;
  const c = 12 * Math.exp(-0.18 * t) + 0.4 * Math.sin(t * 0.7);
  const ci = c * 0.18;
  return {
    t,
    median: +c.toFixed(2),
    lo: +(c - ci).toFixed(2),
    hi: +(c + ci).toFixed(2),
    band: +(2 * ci).toFixed(2),
  };
});

// Exposure-response — sigmoidal Emax
const ER = Array.from({ length: 30 }, (_, i) => {
  const auc = 200 + i * 200;
  const eff = 100 * (auc ** 1.4) / ((1500 ** 1.4) + (auc ** 1.4));
  return { auc, response: +eff.toFixed(1) };
});

export default function RechartsShowcase() {
  return (
    <LibraryShowcase
      category="§5A · Presentation decks · charts"
      library="recharts"
      npmInstall="npm install recharts"
      url="recharts.org"
      headline={<>PK · PD · <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>exposure-response</span> in three lines.</>}
      subhead="Composable React chart primitives. The deck uses recharts for every concentration-time curve, exposure-response, and sparkline."
      tone="var(--cyan)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Concentration-time + 95% CI band" tone="var(--cyan)">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={PK} margin={{ top: 12, right: 16, bottom: 28, left: 12 }}>
              <defs>
                <linearGradient id="cyanBand" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.04" />
                </linearGradient>
              </defs>
              <Area dataKey="hi" stroke="none" fill="url(#cyanBand)" fillOpacity={1} stackId="a" baseValue="dataMin" />
              <Area dataKey="lo" stroke="none" fill="var(--bg)" fillOpacity={1} stackId="b" baseValue="dataMin" />
              <Line type="monotone" dataKey="median" stroke="var(--cyan)" strokeWidth={2.5} dot={false} />
              <XAxis dataKey="t" tick={{ fill: 'var(--cream-faint)', fontSize: 10 }} stroke="var(--cream-hairline)" label={{ value: 'time (h)', position: 'insideBottom', offset: -10, fill: 'var(--cream-faint)', fontSize: 10 }} />
              <YAxis tick={{ fill: 'var(--cream-faint)', fontSize: 10 }} stroke="var(--cream-hairline)" />
              <ReferenceLine y={2} stroke="var(--coral)" strokeDasharray="3 3" label={{ value: 'MEC', fill: 'var(--coral)', fontSize: 10, position: 'right' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Frame>

        <Frame title="Variant B · Sigmoidal exposure-response" tone="var(--amber)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ER} margin={{ top: 12, right: 16, bottom: 28, left: 12 }}>
              <ReferenceArea x1={1200} x2={2200} y1={0} y2={100} fill="var(--amber)" fillOpacity={0.08} />
              <Line type="monotone" dataKey="response" stroke="var(--amber)" strokeWidth={2.5} dot={false} />
              <XAxis dataKey="auc" tick={{ fill: 'var(--cream-faint)', fontSize: 10 }} stroke="var(--cream-hairline)" label={{ value: 'AUC₀-∞ (ng·h/mL)', position: 'insideBottom', offset: -10, fill: 'var(--cream-faint)', fontSize: 10 }} />
              <YAxis tick={{ fill: 'var(--cream-faint)', fontSize: 10 }} stroke="var(--cream-hairline)" label={{ value: '% Response', angle: -90, position: 'insideLeft', fill: 'var(--cream-faint)', fontSize: 10 }} />
            </LineChart>
          </ResponsiveContainer>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
