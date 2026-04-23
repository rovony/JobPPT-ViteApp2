import React from 'react';
import { Slider } from '@/components/ui/slider';
import { RotateCcw } from 'lucide-react';
import { DEFAULTS } from '@/lib/pk-math';

/**
 * PKSimControls — parameter sliders for the PK simulator.
 * Purely presentational; state lives in the parent page so the chart
 * and readouts stay in sync.
 *
 * Every slider is token-driven (no hardcoded colors). Layout uses
 * CSS grid so rows never overlap regardless of viewport size.
 */

const SLIDER_DEFS = [
  { key: 'dose', label: 'Dose',       unit: 'mg',   min: 10,   max: 500, step: 5,    help: 'Amount administered' },
  { key: 'ka',   label: 'Absorption', unit: '1/h',  min: 0.1,  max: 3,   step: 0.05, help: 'ka — oral absorption rate' },
  { key: 'CL',   label: 'Clearance',  unit: 'L/h',  min: 0.5,  max: 30,  step: 0.1,  help: 'CL — volume cleared per hour' },
  { key: 'V',    label: 'Volume',     unit: 'L',    min: 5,    max: 120, step: 1,    help: 'V — volume of distribution' },
  { key: 'tMax', label: 'Duration',   unit: 'h',    min: 6,    max: 72,  step: 1,    help: 'Simulation horizon' },
];

export default function PKSimControls({ params, onChange, onReset }) {
  return (
    <div
      className="flex flex-col"
      style={{
        padding: 'var(--space-6)',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--panel)',
        gap: 'var(--space-5)',
      }}
    >
      <header
        className="flex items-center justify-between"
        style={{ paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--cream-hairline)' }}
      >
        <div>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-nano)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case, var(--amber))',
            }}
          >
            Parameters
          </div>
          <div
            className="deck-display"
            style={{ fontSize: '1.1rem', color: 'var(--cream)', fontWeight: 600, marginTop: 2 }}
          >
            Adjust & observe
          </div>
        </div>
        <button
          onClick={onReset}
          className="deck-mono uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
          style={{
            borderColor: 'var(--cream-hairline)',
            color: 'var(--cream-muted)',
            fontSize: 'var(--fs-nano)',
            letterSpacing: 'var(--ls-mono)',
          }}
          aria-label="Reset parameters to defaults"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </header>

      <div className="flex flex-col" style={{ gap: 'var(--space-5)' }}>
        {SLIDER_DEFS.map((def) => (
          <SliderRow
            key={def.key}
            def={def}
            value={params[def.key]}
            onChange={(v) => onChange(def.key, v)}
          />
        ))}
      </div>
    </div>
  );
}

function SliderRow({ def, value, onChange }) {
  return (
    <div>
      {/* Label row — name + unit on the left, live value on the right */}
      <div className="flex items-baseline justify-between" style={{ marginBottom: 'var(--space-2)' }}>
        <div className="flex items-baseline gap-2 min-w-0">
          <span style={{ color: 'var(--cream)', fontSize: 'var(--fs-body-sm)', fontWeight: 500 }}>
            {def.label}
          </span>
          <span
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-nano)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-faint)',
              textTransform: 'uppercase',
            }}
          >
            {def.help}
          </span>
        </div>
        <div
          className="deck-mono tabular-nums shrink-0"
          style={{
            fontSize: 'var(--fs-body-sm)',
            color: 'var(--case, var(--amber))',
            fontWeight: 500,
          }}
        >
          {formatValue(value, def.step)}
          <span style={{ color: 'var(--cream-faint)', marginLeft: 4 }}>{def.unit}</span>
        </div>
      </div>

      <Slider
        value={[value]}
        min={def.min}
        max={def.max}
        step={def.step}
        onValueChange={([v]) => onChange(v)}
        aria-label={`${def.label} (${def.unit})`}
      />

      {/* Min / max endpoints for context */}
      <div className="flex items-center justify-between" style={{ marginTop: 'var(--space-1)' }}>
        <span className="deck-mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--cream-faint)' }}>
          {def.min}
        </span>
        <span className="deck-mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--cream-faint)' }}>
          {def.max}
        </span>
      </div>
    </div>
  );
}

function formatValue(v, step) {
  // Match decimal precision to the slider's step — no trailing noise.
  const decimals = step < 1 ? String(step).split('.')[1]?.length ?? 0 : 0;
  return Number(v).toFixed(decimals);
}

export { DEFAULTS };