// @ts-nocheck
/**
 * CS4 · PopPK review surface — local paper-editorial wrapper.
 * Destubbed from pharos-seminar 16 so Xencor polish does not mutate that deck.
 */
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.2, 0.7, 0.3, 1];

const COVARIATES = [
  { name: 'BWT',   ka: '–', cl: '✓', vd: '✓', q: '–', t12: '–' },
  { name: 'AGE',   ka: '–', cl: '✓', vd: '–', q: '–', t12: '–' },
  { name: 'eGFR',  ka: '–', cl: '✓', vd: '–', q: '–', t12: '–' },
  { name: 'SEX',   ka: '–', cl: '–', vd: '–', q: '–', t12: '–' },
  { name: 'CYP3A', ka: '–', cl: '✓', vd: '–', q: '–', t12: '–' },
  { name: 'PPI',   ka: '✓', cl: '–', vd: '–', q: '–', t12: '–' },
];

const SIM_BARS = [
  { dose: '50 mg',  delta: -42, target: false },
  { dose: '75 mg',  delta: -18, target: false },
  { dose: '100 mg', delta:   0, target: true  },
  { dose: '125 mg', delta: +22, target: false },
  { dose: '150 mg', delta: +48, target: false },
];

const AUDIT = [
  { ts: '15:11:02', action: 'COVARIATE FIT',   hash: '0x91ac3e…' },
  { ts: '15:11:18', action: 'GOF GENERATE',    hash: '0x4f2b08…' },
  { ts: '15:11:34', action: 'QC VOTE · 3/3',   hash: '0xd7e012…', highlight: true },
  { ts: '15:11:51', action: 'REPORT EMIT',     hash: '0xa8c194…' },
];

export default function Cs4PoppkDashboard() {
  const reduced = useReducedMotion();
  const d = (ms) => (reduced ? 0 : Math.min(ms, 0.35));

  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="Case 04 · PopPK domain"
      headline={
        <>
          PopPK inherits the{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>same foundation.</span>
        </>
      }
      subhead="Covariate strategy → simulation → diagnostics → audit. Same review chrome — personal research workflow."
      footerKicker="AI / Pharazi · PopPK"
      footerTagline="Same chrome. Same audit chain. Same QC vote. New domain."
      footerSource="Reference workflow · personal research · April 2026"
    >
      <div className="grid grid-cols-12 grid-rows-2 gap-3 h-full px-2 pt-2 pb-2">
        <Quadrant area="col-span-6 row-span-1" label="COVARIATE STRATEGY · INCLUSION MATRIX" delay={d(0.1)} reduced={reduced}>
          <div
            className="h-full p-3 overflow-auto"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--case)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <table className="w-full deck-mono" style={{ fontSize: '0.7rem', color: 'var(--cream)' }}>
              <thead>
                <tr style={{ color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono-wide)' }}>
                  <th className="text-left pb-1 uppercase">Cov</th>
                  <th className="text-center pb-1 uppercase">ka</th>
                  <th className="text-center pb-1 uppercase">CL</th>
                  <th className="text-center pb-1 uppercase">Vd</th>
                  <th className="text-center pb-1 uppercase">Q</th>
                  <th className="text-center pb-1 uppercase">t½</th>
                </tr>
              </thead>
              <tbody>
                {COVARIATES.map((c) => (
                  <tr
                    key={c.name}
                    style={{ borderTop: '1px solid var(--cream-hairline)' }}
                  >
                    <td className="py-1.5 uppercase" style={{ color: 'var(--case)', letterSpacing: '0.06em' }}>
                      {c.name}
                    </td>
                    <Cell v={c.ka} />
                    <Cell v={c.cl} />
                    <Cell v={c.vd} />
                    <Cell v={c.q} />
                    <Cell v={c.t12} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Quadrant>

        <Quadrant area="col-span-6 row-span-1" label="GOF DIAGNOSTICS · QC: PASS" delay={d(0.16)} tone="case" reduced={reduced}>
          <div
            className="h-full p-3 grid grid-cols-2 grid-rows-2 gap-2"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--case)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {['DV vs PRED', 'DV vs IPRED', 'CWRES vs TIME', 'CWRES vs IPRED'].map((label, i) => (
              <div
                key={label}
                className="relative flex flex-col"
                style={{
                  border: '1px solid var(--cream-hairline)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 8px',
                  background: 'var(--bg)',
                }}
              >
                <span
                  className="deck-mono uppercase"
                  style={{
                    fontSize: '0.55rem',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--cream-faint)',
                  }}
                >
                  {label}
                </span>
                <MiniGOF index={i} reduced={reduced} />
              </div>
            ))}
          </div>
        </Quadrant>

        <Quadrant area="col-span-6 row-span-1" label="DOSE-EXPOSURE WATERFALL · n=200 SIMULATED" delay={d(0.22)} reduced={reduced}>
          <div
            className="h-full p-3"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--case)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <div className="h-full flex items-end justify-between gap-2 relative">
              <div
                aria-hidden
                className="absolute left-0 right-0"
                style={{
                  top: '50%',
                  height: 1,
                  borderTop: '1px dashed var(--case)',
                  opacity: 0.55,
                }}
              />
              {SIM_BARS.map((b, i) => (
                <motion.div
                  key={b.dose}
                  initial={reduced ? false : { scaleY: 0.2 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: reduced ? 0 : 0.4, delay: d(0.2 + i * 0.04), ease: EASE }}
                  className="flex flex-col items-center justify-end relative"
                  style={{ width: '14%', height: '100%', transformOrigin: '50% 50%' }}
                >
                  <div className="absolute inset-x-0 top-1/2 flex flex-col" style={{ alignItems: 'stretch' }}>
                    <div
                      style={{
                        height: b.delta < 0 ? `${Math.abs(b.delta) * 1.2}px` : 0,
                        background: b.target
                          ? 'var(--case)'
                          : 'color-mix(in srgb, var(--cream) 22%, transparent)',
                      }}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-1/2">
                    <div
                      style={{
                        height: b.delta > 0 ? `${Math.abs(b.delta) * 1.2}px` : 0,
                        background: b.target
                          ? 'var(--case)'
                          : 'color-mix(in srgb, var(--cream) 22%, transparent)',
                      }}
                    />
                  </div>
                  <span
                    className="deck-mono uppercase mt-2"
                    style={{
                      fontSize: '0.55rem',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: b.target ? 'var(--case)' : 'var(--cream-faint)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {b.dose}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Quadrant>

        <Quadrant area="col-span-6 row-span-1" label="AUDIT TRAIL · ANCHORED TO sop.poppk_v2_3" delay={d(0.28)} reduced={reduced}>
          <div
            className="h-full p-3 flex flex-col gap-1.5"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--case)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {AUDIT.map((e) => (
              <div
                key={e.ts}
                className="flex items-center justify-between deck-mono"
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--cream)',
                  background: e.highlight
                    ? 'color-mix(in srgb, var(--case) 8%, var(--panel))'
                    : 'var(--bg)',
                  border: e.highlight
                    ? '1px solid color-mix(in srgb, var(--case) 35%, var(--cream-hairline))'
                    : '1px solid var(--cream-hairline)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 8px',
                }}
              >
                <span style={{ color: 'var(--cream-faint)' }}>{e.ts}</span>
                <span
                  className="uppercase"
                  style={{ letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case)' }}
                >
                  {e.action}
                </span>
                <span style={{ color: 'var(--cream)' }}>{e.hash}</span>
              </div>
            ))}
          </div>
        </Quadrant>
      </div>
    </SlideFrame>
  );
}

function Quadrant({ area, label, delay, tone, children, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, delay, ease: EASE }}
      className={`${area} flex flex-col gap-2 min-h-0`}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.6rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: tone === 'case' ? 'var(--case)' : 'var(--cream-faint)',
        }}
      >
        {label}
      </span>
      <div className="flex-1 min-h-0">{children}</div>
    </motion.div>
  );
}

function Cell({ v }) {
  const on = v === '✓';
  return (
    <td
      className="py-1.5 text-center"
      style={{
        color: on ? 'var(--case)' : 'var(--cream-faint)',
        fontWeight: on ? 700 : 400,
      }}
    >
      {v}
    </td>
  );
}

function MiniGOF({ index, reduced }) {
  const points = React.useMemo(() => {
    const seed = index * 7 + 3;
    return Array.from({ length: 36 }, (_, i) => {
      const x = (i / 35) * 100;
      const noise = Math.sin(seed + i * 0.7) * 12 + Math.cos(seed * 1.3 + i * 0.5) * 6;
      const y = 50 + noise + (index === 2 || index === 3 ? Math.sin(i * 0.9) * 4 : 0);
      return { x, y };
    });
  }, [index]);

  return (
    <svg
      viewBox="0 0 100 100"
      className="flex-1 w-full h-full mt-1"
      preserveAspectRatio="none"
    >
      <line
        x1={0}
        y1={50}
        x2={100}
        y2={50}
        stroke="color-mix(in srgb, var(--case) 40%, transparent)"
        strokeWidth={0.4}
        strokeDasharray="2 2"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={1.2}
          fill="var(--case)"
          opacity={reduced ? 0.7 : 0.7}
        />
      ))}
    </svg>
  );
}
