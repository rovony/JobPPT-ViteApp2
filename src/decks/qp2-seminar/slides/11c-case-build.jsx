import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideFrame from '@/components/deck/SlideFrame';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import CompartmentSchematic from './cs1-build/CompartmentSchematic';

/**
 * Slide 11c · CS1 Build — Integrated PopPK workflow.
 * Migrated to SlideFrame. Two-column viz: left = dataset + schematic,
 * right = 6-step sequential workflow.
 */
const STEPS = [
  { num: '01', title: 'Build adult PopPK foundation',        detail: '258 adults · 7 studies · rich PK — structural anchor.' },
  { num: '02', title: 'pcVPC: adult model → pediatric data', detail: 'BEFORE fitting anything pediatric — qualify the adult model against pediatric observations.', hero: true },
  { num: '03', title: 'Fit pediatric · inherit structure',   detail: 'Let the sparse pediatric data speak only to parameters it can inform.' },
  { num: '04', title: 'Compare steady-state exposure',       detail: <>Pediatric vs adult AUC<sub>ss</sub> &amp; C<sub>max,ss</sub> at weight-based doses.</> },
  { num: '05', title: 'Evaluate exposure–response',          detail: <>Efficacy (Δ6MWD) and safety (AE incidence) against AUC<sub>ss</sub>.</> },
  { num: '06', title: 'Package for submission',              detail: 'Integrated report to EMA + PMDA (FDA & HC not in scope — rights held elsewhere).' },
];

export default function Slide11cCaseBuild() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    dataset: 0.70, schematic: 1.10,
    rcTitle: 0.80, spine: 1.00,
    stepBase: 1.30, stepGap: 0.15,
  };

  const T = useTokens(['--coral', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="Build — Sequential, not one-shot"
      headline={
        <>
          Adult foundation first.{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            Then pediatric inference.
          </span>
        </>
      }
      headlineMaxChars={30}
      subhead={
        <>
          Six sequential steps —{' '}
          <HighlightWord color="var(--coral)" delay={1.2}>each one set up the next.</HighlightWord>{' '}
          No one-shot analysis.
        </>
      }
      subheadMaxChars={60}
      footerKicker="Case 01 · The build"
      footerTagline="Source · Okour et al. JCP 2023 · Study AMB112529 (PACES-1)"
    >
      {/* Two-column viz: left (40%) dataset + schematic · right (60%) workflow */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          columnGap: 'var(--space-8)',
          minHeight: 0,
        }}
      >
        {/* ─── LEFT column ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', minWidth: 0 }}>
          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.dataset }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-kicker)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--coral)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Dataset — integrated adult + pediatric
            </div>
            <div className="grid grid-cols-2 gap-5">
              <DatasetCell
                label="Adult foundation"
                value="258"
                meta={<>patients · 7 studies · rich sampling<br />→ structural-parameter anchor</>}
                accent
              />
              <DatasetCell
                label="Pediatric · AMB112529"
                value="39"
                meta={<>211 observations · sparse sampling<br />enrolled 8–16 yr (protocol 8 to &lt;18)</>}
              />
            </div>
          </motion.div>

          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.schematic }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-kicker)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--coral)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Two-compartment · 1st-order absorption · t-lag
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
              <CompartmentSchematic tk={tk} />
            </div>

            <div
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: '0.08em',
                color: 'var(--cream-faint)',
                lineHeight: 1.4,
                marginTop: 'var(--space-2)',
              }}
            >
              NONMEM 7.4.1 · IS-EM / IMPMAP · BLOCK(6) OMEGA · 1,000 IS samples · BLQ ≈ 3% via Beal M3 · 70-kg reference
            </div>
          </motion.div>
        </div>

        {/* ─── RIGHT column ─── */}
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <motion.div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-kicker)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--coral)',
              marginBottom: 'var(--space-4)',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.rcTitle }}
          >
            Workflow — 6 sequential steps
          </motion.div>

          <div className="relative pl-14">
            <motion.div
              className="absolute"
              style={{
                left: 19, top: 12, bottom: 12, width: 2,
                background: 'var(--coral)', opacity: 0.35,
                transformOrigin: 'top center',
              }}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.6, ease, delay: D.spine }}
            />
            {STEPS.map((s, i) => (
              <StepRow key={s.num} step={s} delay={D.stepBase + i * D.stepGap} />
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function DatasetCell({ label, value, meta, accent }) {
  return (
    <div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
      >
        {label}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(2rem, min(3vw, 5vh), 2.6rem)',
          lineHeight: 1,
          color: accent ? 'var(--coral)' : 'var(--cream)',
          fontWeight: 700,
          marginTop: 'var(--space-1)',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          lineHeight: 1.35,
          color: 'var(--cream-muted)',
          marginTop: 'var(--space-2)',
          textTransform: 'none',
          letterSpacing: 0,
          fontFamily: 'var(--font-body)',
        }}
      >
        {meta}
      </div>
    </div>
  );
}

function StepRow({ step, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const hero = step.hero;
  return (
    <motion.div
      className="relative pb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <div
        className="absolute flex items-center justify-center deck-mono"
        style={{
          left: -56, top: -2, width: 40, height: 40, borderRadius: '50%',
          background: hero ? 'var(--coral)' : 'var(--bg)',
          border: '2px solid var(--coral)',
          color: hero ? 'var(--bg)' : 'var(--coral)',
          fontWeight: 700, fontSize: '0.85rem',
        }}
      >
        {step.num}
      </div>

      {hero && (
        <motion.div
          className="absolute rounded-full"
          style={{
            left: -56, top: -2, width: 40, height: 40,
            border: '2px solid var(--coral)', pointerEvents: 'none',
          }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 0.6, 0], scale: [1, 1.8, 2] }}
          transition={{ duration: 2.4, ease: 'easeOut', delay: delay + 0.6, repeat: Infinity, repeatDelay: 0.8 }}
        />
      )}

      <div
        className="deck-display"
        style={{
          fontSize: hero ? 'var(--fs-slide-subhead)' : 'var(--fs-slide-tagline)',
          lineHeight: 1.15,
          color: hero ? 'var(--coral)' : 'var(--cream)',
          fontWeight: hero ? 700 : 600,
          letterSpacing: 'var(--ls-headline)',
        }}
      >
        {step.title}
      </div>
      <div
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          lineHeight: 1.4,
          color: hero ? 'var(--cream)' : 'var(--cream-muted)',
          marginTop: 'var(--space-1)',
          textTransform: 'none',
          letterSpacing: 0,
          fontFamily: 'var(--font-body)',
        }}
      >
        {step.detail}
      </div>
    </motion.div>
  );
}