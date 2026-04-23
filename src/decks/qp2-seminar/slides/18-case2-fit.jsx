import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import RatioTrack from './cs2-fit/RatioTrack';
import PdDotStrip from './cs2-fit/PdDotStrip';

/**
 * Slide 18 · CS2 Results #1 — "Weight explains the gap. Ethnicity doesn't."
 *
 * Layout:
 *   • Eyebrow + headline + subhead
 *   • Ratio panel (left ~68%): two stacked ratio tracks (AUC, Cmax) showing
 *     absolute → weight-normalized shift with animated markers.
 *   • Caveat panel (right ~32%): "Asian ≠ South Asian" honesty card.
 *   • PD strip (full width bottom): 2-HG inhibition big-numbers +
 *     dot plot + caption.
 */
export default function Slide18Case2Fit() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.60,
    ratioCard: 0.80,
    rowIn: 1.00,
    rowAbs: 1.40,
    rowNorm: 2.60,
    caveat: 3.30,
    pd: 3.60,
    source: 4.20,
  };

  const T = useTokens(['--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cyan)" delay={D.eyebrow}>CS2 · Fit</Eyebrow>
      <Headline delay={D.headline} maxChars={34}>
        Weight explains the gap.{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>
          Ethnicity doesn't.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={95}>
        AGILE (AG120-C-009) Cycle 1 Day 1 PK — absolute vs weight-normalized. The apparent AUC ratio of
        0.84 lands at 0.97 after per-kg normalization.
      </Subhead>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: '1fr auto', rowGap: 'var(--space-4)', minHeight: 0 }}>
      {/* Main grid: ratio panel + caveat */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 340px',
          gap: 'var(--space-6)',
          minHeight: 0,
        }}
      >
        {/* LEFT — ratio panel */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '18px 22px',
            border: '1px solid var(--cream-hairline)',
            borderLeft: '3px solid var(--cyan)',
            borderRadius: 8,
            background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
            minWidth: 0,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: D.ratioCard }}
        >
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.62rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cyan)',
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Asian : Non-Asian exposure ratio · bioequivalence window 0.80–1.25
          </div>

          <div style={{ flex: 1, display: 'grid', gridTemplateRows: '1fr 1fr', minHeight: 0, gap: 4 }}>
            <RatioTrack
              name="AUC₀₋₄"
              sub="AREA UNDER CURVE · h·ng/mL"
              abs={0.84}
              norm={0.97}
              delayIn={D.rowIn}
              delayAbs={D.rowAbs}
              delayNorm={D.rowNorm}
              tk={tk}
            />
            <RatioTrack
              name="Cmax"
              sub="PEAK CONCENTRATION · ng/mL"
              abs={0.97}
              norm={1.10}
              delayIn={D.rowIn + 0.15}
              delayAbs={D.rowAbs + 0.15}
              delayNorm={D.rowNorm + 0.15}
              tk={tk}
            />
          </div>

          {/* Footer tag */}
          <div
            className="deck-display italic"
            style={{
              marginTop: 8,
              fontSize: 'clamp(0.78rem, 0.9vw, 0.95rem)',
              lineHeight: 1.35,
              color: 'var(--cream-muted)',
              fontWeight: 400,
            }}
          >
            Absolute Cmax sits near unity; the{' '}
            <strong style={{ color: 'var(--cyan)', fontStyle: 'normal', fontWeight: 700 }}>
              per-kg direction reverses
            </strong>{' '}
            — the visual proof that body weight, not ethnicity, drove the gap.
          </div>
        </motion.div>

        {/* RIGHT — caveat panel */}
        <motion.aside
          style={{
            padding: '20px 22px',
            background: 'color-mix(in srgb, var(--bg) 72%, transparent)',
            borderLeft: '2px solid var(--cyan)',
            borderRadius: 4,
            backdropFilter: 'blur(6px)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: D.caveat }}
        >
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.22em',
              color: 'var(--cyan)',
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            One honest caveat
          </div>
          <h3
            className="deck-display"
            style={{
              fontSize: 'clamp(1.1rem, 1.4vw, 1.55rem)',
              lineHeight: 1.2,
              color: 'var(--cream)',
              fontWeight: 600,
              marginBottom: 12,
              letterSpacing: 'var(--ls-headline)',
            }}
          >
            "Asian"{' '}
            <em style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>≠</em>{' '}
            "South Asian"
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.78rem, 0.88vw, 0.94rem)',
              lineHeight: 1.45,
              color: 'var(--cream-muted)',
            }}
          >
            "Asian" in the AG120 program means{' '}
            <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>Japan, Taiwan, Korea</strong>.{' '}
            <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>No Indian subjects</strong> were
            enrolled. The argument is that South Asian patients would not differ from the East Asian
            subgroup — <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>not</strong> that Indian
            data already existed. This is why the case does not rest on one subgroup alone.
          </p>
        </motion.aside>
      </div>

      {/* PD strip */}
      <motion.div
        style={{
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--cream-hairline)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.pd }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            color: 'var(--cream-muted)',
            marginBottom: 10,
          }}
        >
          Pharmacodynamic readout ·{' '}
          <strong style={{ color: 'var(--cyan)', fontWeight: 700 }}>2-HG inhibition</strong> · AGILE C1D15
          · Asian N=6 · Non-Asian N=36
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px minmax(0, 1fr) 260px',
            alignItems: 'center',
            gap: 28,
          }}
        >
          {/* Big num pair */}
          <div
            className="deck-display"
            style={{
              fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
              color: 'var(--cream)',
              display: 'flex',
              alignItems: 'baseline',
              gap: 10,
            }}
          >
            <span style={{ color: 'var(--cyan)' }}>84.6%</span>
            <span
              style={{
                color: 'var(--cream-faint)',
                fontWeight: 400,
                fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
              }}
            >
              vs
            </span>
            <span>84.4%</span>
          </div>

          {/* Dot plot */}
          <div style={{ height: 56 }}>
            <PdDotStrip tk={tk} delay={D.pd + 0.2} />
          </div>

          {/* Caption */}
          <div
            className="deck-display italic"
            style={{
              fontSize: 'clamp(0.78rem, 0.92vw, 0.98rem)',
              lineHeight: 1.3,
              color: 'var(--cream-muted)',
              fontWeight: 500,
            }}
          >
            Near-identical inhibition of the oncometabolite —{' '}
            <strong style={{ fontStyle: 'normal', color: 'var(--cream)', fontWeight: 600 }}>
              direct mechanistic readout
            </strong>
            , not a surrogate.
          </div>
        </div>
      </motion.div>

        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Fit"
        tagline="Source · AG120-C-009 PKPD Table 14 · AGILE PK"
        delay={D.source}
      />
    </SlideGrid>
  );
}