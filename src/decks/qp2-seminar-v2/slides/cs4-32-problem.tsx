// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS4 · S32 THE PROBLEM — fragmented pharmacometric workflows.
 *
 * Top: 6-stage horizontal workflow strip (Data → EDA/NCA → PopPK →
 *      Diagnostics → Sim → Report).
 * Mid: 3-number band — 5–10 tools · 4–8 weeks · 0 shared state.
 *      The 0 is the punchline — visually loudest.
 * Bottom: integration-overhead assertion.
 *
 * Pre-empts CW "Why is this needed?" by showing the bottleneck before
 * the solution. The science isn't slow — the integration overhead is.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const STAGES = [
  { num: '01', name: 'Data Assembly', tools: 'SAS · R · Python', duration: '1–2 weeks' },
  { num: '02', name: 'EDA & NCA', tools: 'R (PKNCA) · WinNonlin', duration: '2–4 days' },
  { num: '03', name: 'PopPK / PD', tools: 'NONMEM · Monolix · nlmixr2', duration: '2–4 weeks' },
  { num: '04', name: 'Diagnostics', tools: 'PsN · xpose · vpc', duration: '3–5 days' },
  { num: '05', name: 'Sim & Dose Opt', tools: 'mrgsolve · PopED · SimulX', duration: '2–3 days' },
  { num: '06', name: 'Report & TFLs', tools: 'Word · R Markdown', duration: '1–2 weeks' },
];

const NUMBERS = [
  { value: '5–10', label: 'specialized software tools' },
  { value: '4–8 wk', label: 'typical end-to-end timeline' },
  { value: '0', label: 'shared state between tools', emphasized: true },
];

export default function Slide32Cs4Problem() {
  return (
    <SlideFrame
      dataCase="sage"
      eyebrowColor="var(--sage)"
      eyebrow="CS4 · The problem — fragmented workflows"
      headline={
        <>
          Pharmacometric workflows are 80 % scaffolding and 20 % science.{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 700 }}>
            The pharmacometrician is the integration layer.
          </span>
        </>
      }
      headlineMaxChars={140}
      subhead="Six tool-disconnected stages from raw data to regulatory deliverable — five-to-ten specialized software packages, zero shared state."
      subheadMaxChars={140}
      footerKicker="Case 04 · The problem"
      footerSource="Source · Industry-typical estimates · standard pharmacometric software stack"
    >
      <ProblemLayout />
    </SlideFrame>
  );
}

function ProblemLayout() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : undefined;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        rowGap: 'var(--space-5)',
        minHeight: 0,
      }}
    >
      {/* Six-stage workflow strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          columnGap: 'var(--space-2)',
        }}
      >
        {STAGES.map((s, i) => (
          <motion.div
            key={s.num}
            initial={initial ?? { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.4 + i * 0.08 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              padding: 'var(--space-3)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
            }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--sage)',
                fontWeight: 800,
              }}
            >
              {s.num}
            </span>
            <span
              className="deck-display"
              style={{
                fontSize: 'var(--fs-card-title)',
                fontWeight: 700,
                color: 'var(--cream)',
                lineHeight: 1.2,
              }}
            >
              {s.name}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-card-meta)',
                color: 'var(--cream)',
                lineHeight: 1.4,
              }}
            >
              {s.tools}
            </span>
            <span
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-card-meta)',
                color: 'var(--cream-muted)',
                fontStyle: 'italic',
                marginTop: 'auto',
                paddingTop: 6,
                borderTop: '1px solid var(--cream-hairline)',
              }}
            >
              {s.duration}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Three-number band */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          columnGap: 'var(--space-6)',
          alignItems: 'center',
          paddingTop: 'var(--space-3)',
          paddingBottom: 'var(--space-3)',
          borderTop: '1px solid var(--cream-hairline)',
          borderBottom: '1px solid var(--cream-hairline)',
        }}
      >
        {NUMBERS.map((n, i) => (
          <motion.div
            key={n.value}
            initial={initial ?? { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.95 + i * 0.15 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span
              className="deck-display"
              style={{
                fontSize: n.emphasized ? 'calc(var(--fs-stat-number) * 1.35)' : 'var(--fs-stat-number)',
                fontWeight: 800,
                color: 'var(--sage)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {n.value}
            </span>
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-meta)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-muted)',
                textAlign: 'center',
              }}
            >
              {n.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom assertion */}
      <motion.div
        initial={initial ?? { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 1.5 }}
        style={{ textAlign: 'center' }}
      >
        <p
          className="deck-display italic"
          style={{
            margin: 0,
            fontSize: 'var(--fs-card-quote)',
            fontWeight: 500,
            color: 'var(--cream)',
            lineHeight: 1.35,
          }}
        >
          The pharmacometrician carries data, results, and plots between disconnected tools{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'normal', fontWeight: 700 }}>by hand</span>.
          Reproducibility lives in someone's notebook, not the platform.
        </p>
      </motion.div>
    </div>
  );
}
