import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import { QP2_THEMES } from '../themes';
import ApprovalTimeline from '@/components/deck/patterns/ApprovalTimeline';

/**
 * Slide 12 · CS1 Impact — "Same data. Same model. Two regulators approved."
 *
 * Asymmetric editorial hero:
 *   • Faint coral arc (SVG, low opacity) sweeps behind three oversized numerals
 *   • ×2 (coral, dominant left) · ~3% (amber, upper-right, tilted -4°) · 39 (cream, lower-right)
 *   • Each number count-ups in sync with its pop-in
 *   • Inline typographic theme meta bottom-left (01·02·03 active)
 *
 * Regulator attribution: EMA (Sep 2021) + PMDA (Apr 2021) — NOT FDA/HC.
 *
 * Motion:
 *   1. Arc stroke-dashoffset draws in (1.5s)
 *   2. Numbers stagger-pop at 1.5s / 2.0s / 2.5s
 *   3. Count-ups run 900ms synced to each pop
 *   4. Captions fade 0.6s after their parent settles
 *
 * Type-scale exemption (Phase D-tail / Apr 2026 audit):
 *   The three hero numerals (×2, ~3%, 39) use inline `clamp()` at
 *   the display tier (5–20rem range), NOT the card type scale
 *   (--fs-card-* tops out at --fs-card-hero-num ≈ 5.5rem). These
 *   are full-canvas focal points on a CS impact slide — a tier
 *   above any card-grid context. Introducing --fs-display-hero
 *   tokens for an n=1 consumer would over-engineer; the inline
 *   clamps are the correct level of abstraction here. If a future
 *   slide adopts the same display scale, promote to tokens then.
 */
const ACTIVE_THEME_NUMS = ['01', '02', '03'];

export default function Slide12() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10, headline: 0.25,
    arc: 0.4,
    n1: 1.5, n1Caption: 2.1,
    n2: 2.0, n2Caption: 2.6,
    n3: 2.5, n3Caption: 3.1,
    themes: 3.4,
  };

  const T = useTokens(['--coral', '--amber', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline', '--cream-dim']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={D.chrome}>Case 01 · Impact · Regulatory outcome</Eyebrow>
      <Headline delay={D.headline} maxChars={32}>
        Same data. Same model.
        <br />
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
          Two independent regulators
        </span>{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 700 }}>approved</span>.
      </Headline>

      <Viz>
        {/* Vertical band layout — three numerals + captions sit in the
            top band; the regulatory timeline + theme meta sit in the
            bottom band. The two bands never overlap, regardless of
            viewport height. */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto auto',
            rowGap: 'var(--space-4)',
            width: '100%',
            height: '100%',
            minHeight: 0,
          }}
        >
          {/* ─── BAND 1 · three hero numerals + captions ─── */}
          <div style={{ position: 'relative', minHeight: 0 }}>
            {/* Faint coral arc threading through the numerals */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1920 540"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              <motion.path
                d="M 100,500 C 460,420 760,260 1180,200 C 1420,160 1640,200 1820,300"
                fill="none"
                stroke={tk('--coral')}
                strokeOpacity={0.1}
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray={3000}
                initial={{ strokeDashoffset: 3000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease, delay: D.arc }}
              />
            </svg>

            {/* Three-column inline grid for the numerals so each one owns
                its column and captions never collide. */}
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1fr)',
                columnGap: 'var(--space-6)',
                alignItems: 'start',
                height: '100%',
                minHeight: 0,
              }}
            >
              {/* ×2 — dominant, left column */}
              <motion.div
                style={{ minWidth: 0 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: D.n1 }}
              >
                <div className="deck-display" style={{ display: 'flex', alignItems: 'baseline', lineHeight: 'var(--lh-tight)' }}>
                  <span
                    className="deck-display"
                    style={{
                      fontSize: 'clamp(3.5rem, 6.5vw, 7rem)',
                      fontWeight: 600,
                      color: 'var(--cream-muted)',
                      marginRight: '0.1em',
                      transform: 'translateY(-0.08em)',
                    }}
                  >
                    ×
                  </span>
                  <CountUpDigit
                    target={2}
                    delay={D.n1}
                    duration={0.9}
                    style={{
                      fontSize: 'clamp(6rem, 11vw, 12rem)',
                      fontWeight: 700,
                      color: 'var(--coral)',
                      letterSpacing: '-0.02em',
                    }}
                  />
                </div>
                <Caption
                  delay={D.n1Caption}
                  lead="EMA + PMDA — same PopPK-driven label."
                  meta="European Medicines Agency (Sep 2021) and PMDA (Apr 2021) each accepted the modeling-based pediatric dose on the same underlying evidence."
                />
              </motion.div>

              {/* ~3% — middle column */}
              <motion.div
                style={{ minWidth: 0 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: D.n2 }}
              >
                <div className="deck-display" style={{ display: 'flex', alignItems: 'baseline', lineHeight: 'var(--lh-tight)' }}>
                  <span
                    className="deck-display"
                    style={{
                      fontSize: 'clamp(2.5rem, 4.5vw, 5rem)',
                      fontWeight: 500,
                      color: 'var(--cream-muted)',
                      marginRight: '0.05em',
                    }}
                  >
                    ~
                  </span>
                  <CountUpDigit
                    target={3}
                    delay={D.n2}
                    duration={0.9}
                    style={{
                      fontSize: 'clamp(4rem, 8vw, 8.5rem)',
                      fontWeight: 700,
                      color: 'var(--amber)',
                      letterSpacing: '-0.02em',
                    }}
                  />
                  <span
                    className="deck-display"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 4.5rem)',
                      fontWeight: 600,
                      color: 'var(--coral)',
                      marginLeft: '0.04em',
                    }}
                  >
                    %
                  </span>
                </div>
                <Caption
                  delay={D.n2Caption}
                  lead="Weight-band dosing within 3% of adult exposure."
                  meta={
                    <>
                      Three weight bands (≥50 kg → 10 mg · ≥35 to &lt;50 kg → 7.5 mg · ≥20 to &lt;35 kg → 5 mg) deliver matched adult AUC
                      <sub>ss</sub>.
                    </>
                  }
                />
              </motion.div>

              {/* 39 — right column */}
              <motion.div
                style={{ minWidth: 0 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: D.n3 }}
              >
                <div className="deck-display" style={{ display: 'flex', alignItems: 'baseline', lineHeight: 'var(--lh-tight)' }}>
                  <CountUpDigit
                    target={39}
                    delay={D.n3}
                    duration={0.9}
                    style={{
                      fontSize: 'clamp(4rem, 8vw, 8.5rem)',
                      fontWeight: 700,
                      color: 'var(--cream)',
                      letterSpacing: '-0.02em',
                    }}
                  />
                </div>
                <Caption
                  delay={D.n3Caption}
                  lead="Thirty-nine pediatric subjects carried the label."
                  meta="No new pediatric efficacy trial required — the model was the evidence the agencies accepted."
                />
              </motion.div>
            </div>
          </div>

          {/* ─── BAND 2 · regulatory approval timeline ─── */}
          <motion.div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: D.themes + 0.1 }}
          >
            <ApprovalTimeline variant="closed" delay={D.themes + 0.3} />
          </motion.div>

          {/* ─── BAND 3 · inline theme meta ─── */}
          <motion.div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: D.themes }}
          >
            <span style={{ color: 'var(--cream-faint)' }}>Themes exercised</span>
            {ACTIVE_THEME_NUMS.map((num, i) => {
              const theme = QP2_THEMES.find((t) => t.num === num);
              if (!theme) return null;
              return (
                <React.Fragment key={num}>
                  {i > 0 && <span style={{ color: 'var(--cream-dim)' }}>·</span>}
                  <span style={{ color: 'var(--cream)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--coral)', fontWeight: 700 }}>{theme.num}</span>
                    <span style={{ color: 'var(--cream)' }}>{theme.glyph}</span>
                  </span>
                </React.Fragment>
              );
            })}
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Impact"
        source="Source · CS1 Reading Pt. 3 · Okour et al. JCP 2023 · EMA + PMDA labels (2021)"
        delay={D.themes + 0.3}
      />
    </SlideGrid>
  );
}

/* ========================================================
   CountUpDigit — animates 0 → target, synced to parent pop.
   ======================================================== */
function CountUpDigit({ target, delay = 0, duration = 0.9, style }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      delay,
      ease: [0.2, 0.7, 0.3, 1],
    });
    return controls.stop;
  }, [count, target, duration, delay]);

  return (
    <motion.span className="deck-display tabular-nums" style={style}>
      {rounded}
    </motion.span>
  );
}

/* ========================================================
   Caption — lead line + muted meta. Fades in on delay.
   ======================================================== */
function Caption({ lead, meta, delay }) {
  return (
    <motion.div
      className="deck-display italic"
      style={{
        marginTop: '16pt',
        textAlign: 'left',
        fontSize: 'var(--fs-card-title)',
        lineHeight: 'var(--lh-base)',
        color: 'var(--cream)',
        fontWeight: 500,
        maxWidth: '100%',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay }}
    >
      {lead}
      <span
        className="deck-body"
        style={{
          display: 'block',
          marginTop: '6pt',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        {meta}
      </span>
    </motion.div>
  );
}