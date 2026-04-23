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
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 0 }}>
      {/* ─── Arc SVG — ties the three numbers together ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 720"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <motion.path
          d="M 180,820
             C 520,720 780,420 1200,300
             C 1420,240 1620,260 1780,360
             C 1840,420 1780,560 1600,660
             C 1460,720 1360,740 1220,760"
          fill="none"
          stroke={tk('--coral')}
          strokeOpacity={0.1}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={3200}
          initial={{ strokeDashoffset: 3200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, ease, delay: D.arc }}
        />
      </svg>

      {/* ─── ×2  (dominant, left) ───────────────── */}
      <motion.div
        className="absolute"
        style={{ top: '28%', left: 0, maxWidth: '540px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: D.n1 }}
      >
        <div className="deck-display flex items-baseline" style={{ lineHeight: 'var(--lh-tight)' }}>
          <span
            className="deck-display"
            style={{
              fontSize: 'clamp(5rem, 10vw, 11rem)',
              fontWeight: 600,
              color: 'var(--cream-muted)',
              marginRight: '0.1em',
              transform: 'translateY(-0.08em)',
              display: 'inline-block',
            }}
          >
            ×
          </span>
          <CountUpDigit
            target={2}
            delay={D.n1}
            duration={0.9}
            style={{
              fontSize: 'clamp(9rem, 18vw, 20rem)',
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
          marginLeft="18px"
        />
      </motion.div>

      {/* ─── ~3% (amber, upper-right, tilted -4°) ── */}
      <motion.div
        className="absolute"
        style={{
          top: 0,
          right: '4%',
          maxWidth: '440px',
          textAlign: 'right',
          transformOrigin: 'right center',
        }}
        initial={{ opacity: 0, y: 12, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.7, ease, delay: D.n2 }}
      >
        <div className="deck-display flex items-baseline justify-end" style={{ lineHeight: 'var(--lh-tight)' }}>
          <span
            className="deck-display"
            style={{
              fontSize: 'clamp(3.5rem, 7vw, 7.5rem)',
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
              fontSize: 'clamp(5.5rem, 12vw, 13rem)',
              fontWeight: 700,
              color: 'var(--amber)',
              letterSpacing: '-0.02em',
            }}
          />
          <span
            className="deck-display"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 6rem)',
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
              Three tiers (≥35 kg → 10 mg · 20–&lt;35 kg → 7.5 mg · 10–&lt;20 kg → 5 mg) deliver matched AUC
              <sub>ss</sub>.
            </>
          }
          align="right"
        />
      </motion.div>

      {/* ─── 39 (cream, lower-right) ─────────────── */}
      <motion.div
        className="absolute"
        style={{
          bottom: '8%',
          right: '8%',
          maxWidth: '420px',
          textAlign: 'right',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: D.n3 }}
      >
        <div className="deck-display flex items-baseline justify-end" style={{ lineHeight: 'var(--lh-tight)' }}>
          <CountUpDigit
            target={39}
            delay={D.n3}
            duration={0.9}
            style={{
              fontSize: 'clamp(5rem, 10vw, 11rem)',
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
          align="right"
        />
      </motion.div>

      {/* ─── Approval timeline (closed-up) ───
          Shared layoutId with slide 11. When user navigates 11→13,
          framer-motion morphs the timeline: the dashed pediatric silence
          (2007→2021) fills in with solid coral, the "19 YEARS" amber
          silence label morphs into "PMDA APR 2021 · EMA SEP 2021".
          Editorial payoff of the case. */}
      <motion.div
        className="absolute"
        style={{
          left: 0,
          right: 0,
          bottom: 60,
          padding: 'var(--space-3) var(--space-4)',
          borderTop: '1px solid var(--cream-hairline)',
          borderBottom: '1px solid var(--cream-hairline)',
          background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: D.themes + 0.1 }}
      >
        <ApprovalTimeline state="closed-up" compact delay={D.themes + 0.3} />
      </motion.div>

      {/* ─── Inline theme meta (bottom-left) ─── */}
      <motion.div
        className="absolute deck-mono uppercase"
        style={{
          left: 0,
          bottom: 0,
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
        tagline="Source · CS1 Reading Pt. 3 · Okour et al. JCP 2023 · EMA + PMDA labels (2021)"
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
function Caption({ lead, meta, delay, align = 'left', marginLeft }) {
  return (
    <motion.div
      className="deck-display italic"
      style={{
        marginTop: '20pt',
        marginLeft: align === 'right' ? 'auto' : marginLeft,
        textAlign: align,
        fontSize: 'clamp(0.9rem, 1.1vw, 1.2rem)',
        lineHeight: 'var(--lh-base)',
        color: 'var(--cream)',
        fontWeight: 500,
        maxWidth: align === 'right' ? '420px' : '520px',
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
          fontSize: 'clamp(0.7rem, 0.82vw, 0.88rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        {meta}
      </span>
    </motion.div>
  );
}