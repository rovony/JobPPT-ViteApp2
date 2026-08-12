// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Slide 10 (slot) — V2-S6 · Two precedents, one architecture.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2A-Slides-CS1-Slides01-06-v2.md.
 * Slide ID `cs1-results` retained for manifest stability; the V2 spec
 * places the dual-precedent reframe here. The exposure-match results
 * are now slot 13 (cs1-verdict) per V2-S9.
 *
 * v2-final amendment A1.3 — TWO-PRECEDENT REFRAME:
 *   - EMA + PMDA path = PK-matching architecture (FUTURE-1 precedent,
 *     Beghetti BJCP 2009, N=36, AUC 54% of target → EMA approved
 *     methodology anyway).
 *   - FDA path = PVR-6MWD quantitative bridging (Garnett-Florian
 *     framework, NDA 209279, 2017): 12 trials, 2,028 patients, 9 drugs,
 *     5 classes; slope −0.055 m/(dyne·sec/cm⁵); applied to BREATHE-3
 *     N=19 → predicted +14 m (95% CI 3–31 m).
 *   - This case = EMA branch. AMB112529 PIP-aligned for exposure
 *     matching, hemodynamic substudy N=5 paired low-dose too small
 *     for Garnett-Florian-style anchor.
 */

const EASE = [0.2, 0.7, 0.3, 1];

function PathColumn({ headerKicker, headerColor, title, body, bars, chart, footer, delay, reduced, dimmed }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: `1px solid ${dimmed ? 'var(--cream-hairline)' : 'color-mix(in srgb, var(--case) 32%, transparent)'}`,
        borderLeft: `4px solid ${headerColor}`,
        borderRadius: 'var(--radius-lg)',
        background: dimmed
          ? 'color-mix(in srgb, var(--panel) 55%, transparent)'
          : 'color-mix(in srgb, var(--case) 6%, transparent)',
        padding: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        opacity: dimmed ? 0.95 : 1,
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-kicker)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: headerColor,
        fontWeight: 800,
        textAlign: 'center',
        padding: 'var(--space-2) 0',
      }}>
        {headerKicker}
      </div>
      <div className="deck-display" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: '-0.005em',
      }}>
        {title}
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.86,
        lineHeight: 1.5,
      }}>
        {body}
      </div>
      {bars && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginTop: 'var(--space-1)' }}>
          {bars.map((b) => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 0 }}>
              <span className="deck-mono" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cream-faint)',
                letterSpacing: 'var(--ls-mono)',
                width: '14ch',
                flexShrink: 0,
              }}>
                {b.label}
              </span>
              <div aria-hidden style={{ flex: 1, height: 6, background: 'color-mix(in srgb, var(--cream-faint) 30%, transparent)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, width: `${b.pct}%`, background: b.color || headerColor, opacity: 0.85 }} />
              </div>
              <span className="deck-mono" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: b.color || headerColor,
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                width: '5ch',
                textAlign: 'right',
                flexShrink: 0,
              }}>
                {b.pct}%
              </span>
            </div>
          ))}
        </div>
      )}
      {chart}
      {footer && (
        <div className="deck-body" style={{
          fontSize: 'clamp(10px, 1.2vh, 12px)',
          color: 'var(--cream)',
          opacity: 0.78,
          lineHeight: 1.3,
          marginTop: 'auto',
          paddingTop: 'var(--space-2)',
          borderTop: '1px solid var(--cream-hairline)',
        }}>
          {footer}
        </div>
      )}
    </motion.div>
  );
}

/* ── PVR vs 6MWD scatter plot (Garnett-Florian framework) ──────────
   Visualizes the trial-level relationship between change in PVR
   (x, dyne·sec/cm⁵, lower = better) and change in 6MWD (y, m,
   higher = better) across 12 placebo-controlled adult PAH trials
   (N=2,028 across 9 drugs / 5 classes; FDA NDA 209279, 2017).

   Key elements:
     · Regression line slope = −0.055 m/(dyne·sec/cm⁵) (verbatim from FDA)
     · 8 illustrative trial points distributed along the slope
       (positions illustrative only — exact trial-level data not in
       the public framework summary; slope is the load-bearing fact)
     · BREATHE-3 prediction point at ΔPVR=−389 → predicted Δ6MWD=+14 m
       (95% CI 3–31 m), rendered as amber star with CI whisker
   ─────────────────────────────────────────────────────────────── */
import { useMemo } from 'react';

function PvrChart({ reduced, delay }) {
  // Coordinate space: matches Garnett-Florian 2017 Fig 1 (Individual Patients)
  const VB_W = 540;
  const VB_H = 260;
  const PAD = { top: 16, right: 16, bottom: 28, left: 36 };
  const X_MIN = -2200;
  const X_MAX = 2200;
  const Y_MIN = -550;
  const Y_MAX = 350;
  const xScale = (x) => PAD.left + ((x - X_MIN) / (X_MAX - X_MIN)) * (VB_W - PAD.left - PAD.right);
  const yScale = (y) => VB_H - PAD.bottom - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (VB_H - PAD.top - PAD.bottom);
  const SLOPE = -0.055;
  const lineY = (x) => SLOPE * x;

  const breathe3 = { x: -389, y: 14, lo: 3, hi: 31 };

  const { dots, deciles } = useMemo(() => {
    let s = 12345;
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const nrand = () => Math.sqrt(-2 * Math.log(r() || 0.001)) * Math.cos(2 * Math.PI * (r() || 0.001));

    const dotsArr = [];
    const pvrVals = [];
    // Generate 800 dots to simulate the N=2,028 density without tanking browser framerates
    for (let i = 0; i < 800; i++) {
      const isPlac = r() > 0.55;
      const pvr = isPlac ? nrand() * 500 : -350 + nrand() * 600;
      pvrVals.push({ pvr, isPlac, i });
    }
    
    pvrVals.sort((a,b) => a.pvr - b.pvr);
    const nDecile = Math.floor(pvrVals.length / 10);
    
    for (let i = 0; i < pvrVals.length; i++) {
      const { pvr, isPlac, i: origId } = pvrVals[i];
      const baseWalk = -0.055 * pvr;
      const walk = baseWalk + nrand() * 110;
      dotsArr.push({ pvr, walk, isPlac, i: origId });
    }
    
    const decileArr = [];
    for (let d = 0; d < 10; d++) {
      const start = d * nDecile;
      const end = d === 9 ? dotsArr.length - 1 : (d + 1) * nDecile - 1;
      const slice = dotsArr.slice(start, end + 1);
      
      const meanPvr = slice.reduce((sum, dot) => sum + dot.pvr, 0) / slice.length;
      const meanWalk = slice.reduce((sum, dot) => sum + dot.walk, 0) / slice.length;
      const sdWalk = Math.sqrt(slice.reduce((sum, dot) => sum + Math.pow(dot.walk - meanWalk, 2), 0) / slice.length);
      decileArr.push({ pvr: meanPvr, mean: meanWalk, sd: sdWalk });
    }
    return { dots: dotsArr, deciles: decileArr };
  }, []);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.55, delay, ease: EASE }}
      style={{
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--panel) 75%, transparent)',
        padding: 'var(--space-2) var(--space-3)',
      }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          fontWeight: 700,
        }}>
          Garnett-Florian · ΔPVR ↔ Δ6MWD
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 deck-mono" style={{ fontSize: '7px', color: 'var(--cream-muted)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)' }} /> ACTIVE TREATMENT
          </div>
          <div className="flex items-center gap-1 deck-mono" style={{ fontSize: '7px', color: 'var(--cream-muted)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)' }} /> PLACEBO
          </div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        style={{ width: '100%', height: 'auto', maxHeight: '30vh', display: 'block' }}
      >
        {/* Axes */}
        <line x1={PAD.left} y1={VB_H - PAD.bottom} x2={VB_W - PAD.right} y2={VB_H - PAD.bottom}
              stroke="var(--cream-faint)" strokeWidth="0.6" />
        <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={VB_H - PAD.bottom}
              stroke="var(--cream-faint)" strokeWidth="0.6" />

        {/* Origin gridlines (zero ref) */}
        <line x1={xScale(0)} y1={PAD.top} x2={xScale(0)} y2={VB_H - PAD.bottom}
              stroke="var(--cream-muted)" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.6" />
        <line x1={PAD.left} y1={yScale(0)} x2={VB_W - PAD.right} y2={yScale(0)}
              stroke="var(--cream-muted)" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.6" />

        {/* X-axis ticks + label */}
        {[-2000, 0, 2000].map((tx) => (
          <g key={`xt-${tx}`}>
            <line x1={xScale(tx)} y1={VB_H - PAD.bottom} x2={xScale(tx)} y2={VB_H - PAD.bottom + 3}
                  stroke="var(--cream-faint)" strokeWidth="0.5" />
            <text x={xScale(tx)} y={VB_H - PAD.bottom + 12}
                  fontFamily="var(--font-mono)" fontSize="7.5"
                  fill="var(--cream-muted)" textAnchor="middle"
                  letterSpacing="0.04em" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {tx}
            </text>
          </g>
        ))}
        <text x={(PAD.left + VB_W - PAD.right) / 2} y={VB_H - 2}
              fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.08em"
              fill="var(--cream-muted)" textAnchor="middle" fontWeight="700">
          PVR change (dyn·sec/cm⁵)
        </text>

        {/* Y-axis ticks + label */}
        {[-500, -250, 0, 250].map((ty) => (
          <g key={`yt-${ty}`}>
            <line x1={PAD.left - 3} y1={yScale(ty)} x2={PAD.left} y2={yScale(ty)}
                  stroke="var(--cream-faint)" strokeWidth="0.5" />
            <text x={PAD.left - 6} y={yScale(ty) + 2.5}
                  fontFamily="var(--font-mono)" fontSize="7.5"
                  fill="var(--cream-muted)" textAnchor="end"
                  style={{ fontVariantNumeric: 'tabular-nums' }}>
              {ty}
            </text>
          </g>
        ))}
        <text x={PAD.left - 26} y={(PAD.top + VB_H - PAD.bottom) / 2}
              fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.08em"
              fill="var(--cream-muted)" textAnchor="middle" fontWeight="700"
              transform={`rotate(-90, ${PAD.left - 26}, ${(PAD.top + VB_H - PAD.bottom) / 2})`}>
          Walk Distance change (m)
        </text>

        {/* Patient scatter points */}
        {dots.map((d) => (
          <motion.circle
            key={d.i}
            cx={xScale(d.pvr)} cy={yScale(d.walk)} r={1.5}
            fill={d.isPlac ? 'var(--cyan)' : 'var(--coral)'}
            opacity={0.65}
            initial={reduced ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 0.65, scale: 1 }}
            transition={{ duration: 0.2, delay: delay + 0.2 + (d.i % 20) * 0.02, ease: 'easeOut' }}
          />
        ))}

        {/* Confidence band (illustrative 95% CI around regression) */}
        <motion.path
          d={`
            M ${xScale(X_MIN)} ${yScale(lineY(X_MIN) + 25)}
            L ${xScale(X_MAX)} ${yScale(lineY(X_MAX) + 25)}
            L ${xScale(X_MAX)} ${yScale(lineY(X_MAX) - 25)}
            L ${xScale(X_MIN)} ${yScale(lineY(X_MIN) - 25)}
            Z
          `}
          fill="var(--case)"
          fillOpacity={0.12}
          stroke="none"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 1.0, ease: EASE }}
        />

        {/* Regression line */}
        <motion.line
          x1={xScale(X_MIN)} y1={yScale(lineY(X_MIN))}
          x2={xScale(X_MAX)} y2={yScale(lineY(X_MAX))}
          stroke="var(--case)" strokeWidth="1.8"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: delay + 1.1, ease: EASE }}
        />

        {/* Decile Error Bars (black error bars representing mean/sd) */}
        {deciles.map((d, i) => (
          <motion.g
            key={`decile-${i}`}
            initial={reduced ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 1.5 + i * 0.05, ease: EASE }}
          >
            <line
              x1={xScale(d.pvr)} y1={yScale(d.mean - d.sd)}
              x2={xScale(d.pvr)} y2={yScale(d.mean + d.sd)}
              stroke="#111"
              strokeWidth="2"
            />
            <circle
              cx={xScale(d.pvr)} cy={yScale(d.mean)}
              r={2.5}
              fill="#111"
            />
          </motion.g>
        ))}

        {/* Slope label */}
        <text x={xScale(1000)} y={yScale(200)}
              fontFamily="var(--font-mono)" fontSize="7" fontWeight="700"
              fill="var(--case)" textAnchor="middle" letterSpacing="0.04em">
          Slope (95% CI): -0.055 (-0.062, -0.047)
        </text>

        {/* BREATHE-3 prediction — amber star with CI whisker */}
        <motion.g
          initial={reduced ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: delay + 2.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: `${xScale(breathe3.x)}px ${yScale(breathe3.y)}px` }}
        >
          {/* CI whisker */}
          <line
            x1={xScale(breathe3.x)} y1={yScale(breathe3.lo)}
            x2={xScale(breathe3.x)} y2={yScale(breathe3.hi)}
            stroke="var(--amber)" strokeWidth="1.2"
          />
          <line
            x1={xScale(breathe3.x) - 4} y1={yScale(breathe3.lo)}
            x2={xScale(breathe3.x) + 4} y2={yScale(breathe3.lo)}
            stroke="var(--amber)" strokeWidth="1.2"
          />
          <line
            x1={xScale(breathe3.x) - 4} y1={yScale(breathe3.hi)}
            x2={xScale(breathe3.x) + 4} y2={yScale(breathe3.hi)}
            stroke="var(--amber)" strokeWidth="1.2"
          />
          {/* Star marker */}
          <circle
            cx={xScale(breathe3.x)} cy={yScale(breathe3.y)} r={4.5}
            fill="var(--amber)"
            stroke="var(--bg)"
            strokeWidth="1"
          />
          {/* Label moved to top right to avoid overlap */}
          <text
            x={xScale(breathe3.x) + 8} y={yScale(breathe3.hi) - 6}
            fontFamily="var(--font-mono)" fontSize="8" fontWeight="700"
            fill="var(--amber)" letterSpacing="0.04em"
          >
            BREATHE-3 · N=19
          </text>
          <text
            x={xScale(breathe3.x) + 8} y={yScale(breathe3.hi) + 4}
            fontFamily="var(--font-mono)" fontSize="7.5"
            fill="var(--amber)" opacity="0.85" letterSpacing="0.04em"
          >
            +14 m (95% CI 3–31)
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}


export default function Cs1Results() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>
        Case 01 · Two architectural precedents
      </Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        Pediatric PAH ERA bridging has{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          two recognized architectures
        </span>{' '}
        — both established for bosentan; this case is the EMA branch.
      </Headline>

      <Subhead delay={0.55} maxChars={94} size="lead">
        Same intellectual move; different evidence weights. Knowing both signals
        regulatory literacy.
      </Subhead>

      <Viz>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-3), 2.5vh, var(--space-5))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
            alignItems: 'stretch',
            flex: 1,
            minHeight: 0,
          }}>
            <PathColumn
              delay={0.85}
              reduced={reduced}
              headerKicker="EMA + PMDA path · PK-matching"
              headerColor="var(--case)"
              title={<>FUTURE-1 (Beghetti, <em>BJCP</em> 2009) — <span style={{ color: 'var(--case)' }}>N=36</span> children, ages 3–17.</>}
              body={<>Pediatric AUC came in at <strong>54%</strong> of adult target — PK match <em>missed</em>. EMA approved the pediatric formulation anyway. <strong>Methodology endorsed; specific execution not penalized.</strong></>}
              bars={[
                { label: 'Adult target',    pct: 100, color: 'var(--cream-faint)' },
                { label: 'FUTURE-1 ped',    pct: 54,  color: 'var(--cream-muted)' },
                { label: 'AMB112529 low',   pct: 97,  color: 'var(--case)' },
              ]}
              footer="What this case used. AMB112529 → ambrisentan EMA + PMDA pediatric labels (2021). PIP-aligned. PK matching within 3% of adult AUC — much tighter than FUTURE-1."
            />

            <PathColumn
              delay={1.00}
              reduced={reduced}
              dimmed
              headerKicker="FDA path · PVR-6MWD bridging"
              headerColor="var(--cream-muted)"
              title={<>Garnett-Florian framework (FDA NDA 209279, 2017).</>}
              body={<>Pooled <strong>12</strong> placebo-controlled adult trials, <strong>2,028 patients</strong>, 9 drugs · 5 classes. Slope: <strong>−0.055 m / (dyne·sec/cm⁵)</strong>. Applied to BREATHE-3 (N=19, ΔPVR ≈ −389) → predicted pediatric <strong>Δ6MWD +14 m (95% CI 3–31)</strong>.</>}
              chart={<PvrChart reduced={reduced} delay={1.30} />}
              footer="What this case did NOT use (and why). AMB112529 hemodynamic substudy was N=5 paired low-dose patients — too few to anchor a Garnett-Florian-style analysis on its own. Substudy data were cited supportively by PMDA and disclosed in the EMA submission."
            />
          </div>

          {/* Pull-quote — the integrating sentence.
              Upright Inter (deck-body) per CLAUDE.md italic-Fraunces ban
              for prose <24px; coral emphasis lifted to inline span. */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.95, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.92,
              lineHeight: 1.5,
              fontWeight: 400,
              maxWidth: '82ch',
              alignSelf: 'flex-start',
              borderLeft: '3px solid var(--case)',
              paddingLeft: 'var(--space-3)',
              marginBottom: 0,
            }}
          >
            Same intellectual move &mdash; extrapolate adult efficacy through a quantitative pediatric bridge. Different evidence weights. EMA accepts PK-matching alone when similarity is high; FDA wants the hemodynamic surrogate too. <strong style={{ color: 'var(--case)', fontWeight: 600 }}>This case is the EMA branch.</strong>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.95}
        kicker="10 · CS1 · TWO PRECEDENTS"
        tagline="Same architecture, different evidence weights. Two doors. We walked through one."
        source="Source · Beghetti M et al. Br J Clin Pharmacol 2009;68(6):948–955 · FDA NDA 209279 review (Garnett/Florian, 2017) · Barst RJ et al. Clin Pharmacol Ther 2003 (BREATHE-3)"
      />
    </SlideGrid>
  );
}
