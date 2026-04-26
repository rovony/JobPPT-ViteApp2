import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 13 (slot) — V2-S9 · Exposure match · the result.
 *
 * Redesigned per user spec: hero −3% / +0.3% numbers at large coral type,
 * plus a single overlay density plot showing adult (gray) vs pediatric
 * (coral) AUC distributions — the visual overlap IS the argument.
 *
 * Detailed proactive disclosures (Cmax, 35-<50 kg subgroup, hemodynamic
 * substudy) deferred to backup slides.
 *
 * Source: Okour M et al. J Clin Pharmacol 2023;63(5):593–603.
 */

const EASE = [0.2, 0.7, 0.3, 1];

function DensityCurve({ reduced }) {
  const w = 500;
  const h = 200;
  const cx = w / 2;

  const adultPath = buildDensityPath(cx - 4, 72, w, h);
  const pedPath = buildDensityPath(cx + 2, 68, w, h);

  return (
    <motion.svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: '100%', maxWidth: '42rem', height: 'auto' }}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 1.60, ease: EASE }}
    >
      <motion.path
        d={adultPath}
        fill="none"
        stroke="var(--cream-faint, #6b6560)"
        strokeWidth="2"
        opacity="0.5"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 1.70, ease: EASE }}
      />
      <motion.path
        d={adultPath}
        fill="color-mix(in srgb, var(--cream-faint, #6b6560) 8%, transparent)"
        stroke="none"
        opacity="0.3"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 2.20, ease: EASE }}
      />

      <motion.path
        d={pedPath}
        fill="none"
        stroke="var(--case, #e07a5f)"
        strokeWidth="2.5"
        opacity="0.85"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 1.90, ease: EASE }}
      />
      <motion.path
        d={pedPath}
        fill="color-mix(in srgb, var(--case, #e07a5f) 12%, transparent)"
        stroke="none"
        opacity="0.4"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 2.40, ease: EASE }}
      />

      {/* Legend */}
      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 2.60, ease: EASE }}
      >
        <line x1="20" y1={h - 18} x2="40" y2={h - 18}
          stroke="var(--cream-faint, #6b6560)" strokeWidth="2" opacity="0.5" />
        <text x="46" y={h - 14}
          fill="var(--cream-faint, #6b6560)"
          style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
          ADULT
        </text>
        <line x1="110" y1={h - 18} x2="130" y2={h - 18}
          stroke="var(--case, #e07a5f)" strokeWidth="2.5" opacity="0.85" />
        <text x="136" y={h - 14}
          fill="var(--case, #e07a5f)"
          style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
          PEDIATRIC
        </text>
      </motion.g>
    </motion.svg>
  );
}

function buildDensityPath(center, spread, w, h) {
  const pts = [];
  const steps = 80;
  const baseline = h - 30;
  const peakH = h * 0.72;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = 30 + t * (w - 60);
    const dx = (x - center) / spread;
    const y = baseline - peakH * Math.exp(-0.5 * dx * dx);
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return pts.join(' ');
}

export default function Cs1Verdict() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 'clamp(var(--space-3), 3vw, var(--space-5))',
          top: 'clamp(var(--space-2), 2vh, var(--space-4))',
          width: 'clamp(8rem, 14vw, 12rem)',
          opacity: 0.55,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lungs layoutId="cs1-lung" variant="signature" />
      </div>

      <Eyebrow delay={0.10}>
        Case 01 · The exposure match
      </Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Pediatric AUC matched adult exposure —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 700 }}>
          the curves overlap.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={94} size="lead">
        The visual says it: same drug, same exposure, different population.
        Dose range sits on the E-R plateau.
      </Subhead>

      <Viz>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 'clamp(var(--space-5), 4vh, var(--space-8))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
        }}>
          {/* Hero numbers */}
          <div style={{
            display: 'flex',
            gap: 'clamp(var(--space-8), 8vw, var(--space-12, 6rem))',
            alignItems: 'baseline',
          }}>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.85, ease: EASE }}
              style={{ textAlign: 'center' }}
            >
              <div className="deck-display" style={{
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                color: 'var(--case)',
                fontWeight: 700,
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}>
                −3%
              </div>
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-kicker)',
                color: 'var(--cream-faint)',
                letterSpacing: 'var(--ls-mono-wide)',
                marginTop: 'var(--space-2)',
                fontWeight: 700,
              }}>
                Low dose
              </div>
              <div className="deck-mono" style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                color: 'var(--cream-muted)',
                letterSpacing: 'var(--ls-mono)',
                marginTop: 'var(--space-1)',
              }}>
                AUCss 4.82 vs 4.98 μg·h/mL
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 1.10, ease: EASE }}
              style={{ textAlign: 'center' }}
            >
              <div className="deck-display" style={{
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                color: 'var(--case)',
                fontWeight: 700,
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}>
                +0.3%
              </div>
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-kicker)',
                color: 'var(--cream-faint)',
                letterSpacing: 'var(--ls-mono-wide)',
                marginTop: 'var(--space-2)',
                fontWeight: 700,
              }}>
                High dose
              </div>
              <div className="deck-mono" style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                color: 'var(--cream-muted)',
                letterSpacing: 'var(--ls-mono)',
                marginTop: 'var(--space-1)',
              }}>
                AUCss 9.15 vs 9.12 μg·h/mL
              </div>
            </motion.div>
          </div>

          {/* Density overlay plot */}
          <DensityCurve reduced={reduced} />

          {/* Micro source line */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 2.80, ease: EASE }}
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              color: 'var(--cream-faint)',
              letterSpacing: 'var(--ls-mono)',
              textAlign: 'center',
              opacity: 0.6,
            }}
          >
            Pediatric vs adult AUCss · geometric mean · Okour 2023
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 3.00}
        kicker="13 · CS1 · EXPOSURE MATCH"
        tagline="3% on the low dose. 0.3% on the high dose. The curves overlap."
        source="Source · Okour M et al. J Clin Pharmacol 2023;63(5):593–603 · PMID 36579617"
      />
    </SlideGrid>
  );
}
