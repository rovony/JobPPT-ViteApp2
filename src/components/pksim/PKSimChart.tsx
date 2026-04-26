import React, { useMemo } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceDot, ReferenceLine,
} from 'recharts';
import { simulateConcentration, deriveMetrics } from '@/lib/pk-math';

/**
 * PKSimChart — real-time Recharts concentration-time curve + metric tiles.
 * Pure function of props.params — recomputes on every slider tick.
 *
 * Token-driven: stroke colors + grid hairlines read from CSS vars, so
 * the chart flips correctly with light/dark mode.
 */
export default function PKSimChart({ params }) {
  const { data, metrics } = useMemo(() => ({
    data: simulateConcentration(params),
    metrics: deriveMetrics(params),
  }), [params]);

  return (
    <div className="flex flex-col" style={{ gap: 'var(--space-5)' }}>
      {/* Chart panel */}
      <div
        style={{
          padding: 'var(--space-6)',
          border: '1px solid var(--cream-hairline)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--panel)',
        }}
      >
        <div className="flex items-baseline justify-between" style={{ marginBottom: 'var(--space-4)' }}>
          <div>
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-nano)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case, var(--amber))',
              }}
            >
              Concentration-Time Profile
            </div>
            <div
              className="deck-display"
              style={{ fontSize: '1.1rem', color: 'var(--cream)', fontWeight: 600, marginTop: 2 }}
            >
              1-compartment oral · single dose
            </div>
          </div>
          <div
            className="deck-mono"
            style={{ fontSize: 'var(--fs-nano)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
          >
            {data.length} points · live
          </div>
        </div>

        <div style={{ width: '100%', height: 380 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 24 }}>
              <CartesianGrid stroke="var(--cream-hairline)" strokeDasharray="3 3" />
              <XAxis
                dataKey="t"
                type="number"
                domain={[0, params.tMax]}
                tickFormatter={(v) => `${v.toFixed(0)}h`}
                stroke="var(--cream-faint)"
                tick={{ fill: 'var(--cream-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                label={{
                  value: 'Time (hours)',
                  position: 'insideBottom',
                  offset: -12,
                  fill: 'var(--cream-faint)',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.18em',
                }}
              />
              <YAxis
                stroke="var(--cream-faint)"
                tick={{ fill: 'var(--cream-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                label={{
                  value: 'C (mg/L)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 16,
                  fill: 'var(--cream-faint)',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.18em',
                }}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--panel-elevated)',
                  border: '1px solid var(--cream-hairline)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--cream)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                }}
                labelFormatter={(t) => `t = ${Number(t).toFixed(2)} h`}
                formatter={(v) => [`${Number(v).toFixed(3)} mg/L`, 'Concentration']}
              />
              <ReferenceLine
                x={metrics.tMax}
                stroke="var(--case, var(--amber))"
                strokeDasharray="4 4"
                opacity={0.55}
              />
              <Line
                type="monotone"
                dataKey="c"
                stroke="var(--case, var(--amber))"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
              <ReferenceDot
                x={metrics.tMax}
                y={metrics.cMax}
                r={5}
                fill="var(--case, var(--amber))"
                stroke="var(--bg)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metric tiles — grid so they never wrap into overlap */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        <MetricTile label="Cmax"  value={metrics.cMax.toFixed(2)}  unit="mg/L" />
        <MetricTile label="Tmax"  value={metrics.tMax.toFixed(2)}  unit="h" />
        <MetricTile label="AUC∞"  value={metrics.auc.toFixed(1)}   unit="mg·h/L" />
        <MetricTile label="t½"    value={metrics.tHalf.toFixed(2)} unit="h" />
        <MetricTile label="ke"    value={metrics.ke.toFixed(3)}    unit="1/h" />
      </div>
    </div>
  );
}

function MetricTile({ label, value, unit }) {
  return (
    <div
      style={{
        padding: 'var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--panel)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-nano)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          marginBottom: 'var(--space-2)',
        }}
      >
        {label}
      </div>
      <div
        className="deck-display tabular-nums"
        style={{ fontSize: '1.5rem', color: 'var(--cream)', fontWeight: 600, lineHeight: 1 }}
      >
        {value}
      </div>
      <div
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-nano)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
          marginTop: 'var(--space-1)',
        }}
      >
        {unit}
      </div>
    </div>
  );
}