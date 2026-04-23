import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/lib/ThemeContext';
import PKSimControls from '@/components/pksim/PKSimControls';
import PKSimChart from '@/components/pksim/PKSimChart';
import { DEFAULTS } from '@/lib/pk-math';

/**
 * PKSim — interactive pharmacokinetic simulator.
 *
 * 1-compartment oral model. Sliders for Dose, ka, CL, V, Duration
 * drive a live Recharts concentration-time curve and derived metrics
 * (Cmax, Tmax, AUC, t½, ke).
 *
 * All styling is token-driven and responsive via CSS grid — no
 * overlaps regardless of viewport. Light/dark theme is respected.
 */
export default function PKSim() {
  const { mode, toggle } = useTheme();
  const [params, setParams] = useState(DEFAULTS);

  const update = useCallback(
    (key, value) => setParams((prev) => ({ ...prev, [key]: value })),
    [],
  );
  const reset = useCallback(() => setParams(DEFAULTS), []);

  return (
    <div data-deck-theme="clinical" className="deck-root">
      <div
        style={{
          maxWidth: 'var(--deck-max-w)',
          margin: '0 auto',
          padding:
            'clamp(2rem, 5vh, 4rem) var(--deck-gutter) clamp(3rem, 6vh, 5rem)',
        }}
      >
        {/* ─── Header ───────────────────────────────────────────── */}
        <header
          className="flex items-start justify-between flex-wrap"
          style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-12)' }}
        >
          <div style={{ minWidth: 0, flex: '1 1 320px' }}>
            <Link
              to="/"
              className="deck-mono uppercase inline-flex items-center gap-1.5 transition-colors hover:text-[var(--cream)]"
              style={{
                fontSize: 'var(--fs-nano)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <ArrowLeft className="w-3 h-3" /> Back to studio
            </Link>

            <div
              className="deck-mono uppercase flex items-center gap-2"
              style={{
                fontSize: 'var(--fs-nano)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case, var(--amber))',
                marginBottom: 'var(--space-3)',
              }}
            >
              <FlaskConical className="w-3 h-3" /> Interactive Lab
            </div>
            <h1
              className="deck-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'var(--cream)',
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: 'var(--ls-display)',
                margin: 0,
              }}
            >
              PK Simulator
            </h1>
            <p
              className="deck-body"
              style={{
                fontSize: 'var(--fs-body-lg)',
                color: 'var(--cream-muted)',
                lineHeight: 1.5,
                marginTop: 'var(--space-4)',
                maxWidth: '60ch',
              }}
            >
              Adjust dose, absorption, clearance, and volume. The
              concentration–time curve and derived metrics update in
              real time.
            </p>
          </div>

          <ThemeToggle mode={mode} onToggle={toggle} />
        </header>

        {/* ─── Main layout ──────────────────────────────────────────
             Grid: controls column + chart column on desktop,
             stacked on narrow viewports. Grid guarantees zero overlap. */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'var(--space-8)',
          }}
          className="pk-sim-layout"
        >
          <PKSimControls params={params} onChange={update} onReset={reset} />
          <PKSimChart params={params} />
        </div>

        {/* ─── Footer note ─────────────────────────────────────── */}
        <footer
          className="deck-mono uppercase"
          style={{
            marginTop: 'var(--space-12)',
            paddingTop: 'var(--space-5)',
            borderTop: '1px solid var(--cream-hairline)',
            fontSize: 'var(--fs-nano)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            justifyContent: 'space-between',
          }}
        >
          <span>Model · Bateman (1-compartment oral, F = 1)</span>
          <span>C(t) = F·D·ka / V(ka − ke) · [exp(−ke·t) − exp(−ka·t)]</span>
        </footer>
      </div>

      {/* Responsive 2-column layout at md+ — scoped to this page so we
          don't pollute global styles. Grid keeps the two panels from
          ever overlapping regardless of slider value lengths. */}
      <style>{`
        @media (min-width: 900px) {
          .pk-sim-layout {
            grid-template-columns: minmax(320px, 400px) minmax(0, 1fr) !important;
            align-items: start;
          }
        }
      `}</style>
    </div>
  );
}