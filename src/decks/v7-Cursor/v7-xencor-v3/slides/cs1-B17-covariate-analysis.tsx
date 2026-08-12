// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Covariate Strategy — Three design decisions
 *
 * Three editorial-quality animated SVG visualizations, one per column.
 * Each uses the Bloomberg/Economist register from zaj-editorial-motion.
 */
const ED = [0.22, 1, 0.36, 1];
const DATA = [0.16, 1, 0.3, 1];

const COV_LABELS = ['BILI', 'ALT', 'AST', 'ALP', 'GGT', 'CrCl', 'AGE', 'SEX', 'RACE', 'ETH', 'DOSE', 'TLAG'];

const noteTitle = {
  letterSpacing: 'var(--ls-mono-wide)',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
};
const noteBody = {
  lineHeight: 1.55,
};

const COV_ROWS_CL = [
  'Bilirubin', 'ALT', 'AST', 'Alkaline phosphatase', 'GGT',
  'Creatinine clearance', 'Age', 'Sex', 'Race (White / E. Asian / Other)',
  'Ethnicity', 'Dose group (categorical)',
];
const COV_ROWS_VC = ['Bilirubin', 'Alkaline phosphatase', 'Creatinine clearance'];
const COV_ROWS_TLAG = ['Dose (low / high)'];
const cellHead = {
  letterSpacing: 'var(--ls-mono-wide)',
  padding: 'var(--space-2) var(--space-3)',
  textAlign: 'left', borderBottom: '1px solid var(--cream-hairline)', fontWeight: 700,
};
const sectRow = {
  letterSpacing: 'var(--ls-mono-wide)',
  padding: 'var(--space-2) var(--space-3)',
  borderBottom: '1px solid color-mix(in srgb, var(--case) 28%, transparent)',
  background: 'color-mix(in srgb, var(--case) 6%, transparent)', fontWeight: 700,
};
const cellLabel = {
  padding: 'var(--space-2) var(--space-3)',
  borderBottom: '1px solid var(--cream-hairline)',
};
const cellOut = {
  ...cellLabel,
  letterSpacing: 'var(--ls-mono-wide)',
};

/* ─── DECISION 01 — ANCHOR ─── */
function AnchorViz({ delay = 0 }) {
  const r = useReducedMotion();
  const adultDots = [];
  for (let i = 0; i < 48; i++) {
    adultDots.push([26 + (i % 8) * 28, 60 + Math.floor(i / 8) * 18 + (i % 3) * 4]);
  }
  const pediDots = [
    [108, 292], [140, 298], [172, 288], [204, 296],
    [120, 310], [156, 316], [188, 306], [164, 322],
  ];

  return (
    <motion.svg
      className="cs1-cov-viz-svg"
      viewBox="0 0 280 440"
      preserveAspectRatio="xMidYMid meet"
      initial={r ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: ED, delay }}
    >

      {/* Adult cluster — dense cyan field */}
      {adultDots.map(([x, y], i) => (
        <motion.circle key={`a${i}`} cx={x} cy={y} r={4}
          fill="var(--cyan, #7EC8C6)" opacity={0.7}
          initial={r ? false : { scale: 0 }} animate={{ scale: 1 }}
          transition={{ duration: 0.3, ease: ED, delay: delay + 0.3 + i * 0.012 }} />
      ))}
      <text x={140} y={182} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14"
        letterSpacing="1.5" fill="var(--cyan, #7EC8C6)" fontWeight={600}>380 ADULTS</text>
      <text x={140} y={196} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
        letterSpacing="0.4" fill="var(--cream-muted)">3,337 observations · structural anchor</text>

      {/* Divider */}
      <line x1={30} x2={250} y1={218} y2={218} stroke="var(--cream-hairline)" strokeWidth={1} opacity={0.5} />

      {/* Arrow down */}
      <motion.g initial={r ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ED, delay: delay + 1.0 }}>
        <line x1={140} y1={224} x2={140} y2={260} stroke="var(--case)" strokeWidth={2} />
        <polygon points="133,256 147,256 140,268" fill="var(--case)" />
      </motion.g>

      {/* Pediatric cluster — sparse coral */}
      {pediDots.map(([x, y], i) => (
        <motion.circle key={`p${i}`} cx={x} cy={y} r={5.5}
          fill="var(--coral)" opacity={0.85}
          initial={r ? false : { scale: 0 }} animate={{ scale: 1 }}
          transition={{ duration: 0.35, ease: ED, delay: delay + 1.2 + i * 0.06 }} />
      ))}
      <text x={140} y={348} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14"
        letterSpacing="1.5" fill="var(--coral)" fontWeight={600}>39 PEDIATRIC</text>
      <text x={140} y={362} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
        letterSpacing="0.4" fill="var(--cream-muted)">sparse sampling · refit, not rebuild</text>

      {/* Outcome card */}
      <motion.g initial={r ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ED, delay: delay + 1.8 }}>
        <rect x={40} y={384} width={200} height={42} rx={6}
          fill="color-mix(in srgb, var(--case) 10%, var(--panel))"
          stroke="var(--case)" strokeWidth={1.5} />
        <text x={140} y={404} textAnchor="middle" fontFamily="var(--font-display)" fontSize="14"
          fill="var(--cream)" fontWeight={600}>N = 419 combined</text>
        <text x={140} y={418} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12"
          letterSpacing="0.8" fill="var(--case)">ANCHORED</text>
      </motion.g>
    </motion.svg>
  );
}

/* ─── DECISION 02 — CONSTRAIN ─── */
function ConstrainViz({ delay = 0 }) {
  const r = useReducedMotion();
  const ANCHOR_X = 230, ANCHOR_Y = 120;
  const FAN_LEFT = 50;
  const slopes = [0.30, 0.45, 0.60, 0.75, 0.90, 1.05, 1.20];

  return (
    <motion.svg
      className="cs1-cov-viz-svg"
      viewBox="0 0 280 440"
      preserveAspectRatio="xMidYMid meet"
      initial={r ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: ED, delay }}
    >

      {/* Section label — BAD */}
      <text x={20} y={30} fontFamily="var(--font-mono)" fontSize="15"
        letterSpacing="1" fill="var(--cream)" fontWeight={700}>ESTIMATED · N=39</text>

      {/* Slope fan — 7 wobbly candidates */}
      {slopes.map((s, i) => {
        const dy = (s - 0.75) * 120;
        const isCenter = s === 0.75;
        return r ? (
          <line key={`fan${i}`} x1={FAN_LEFT} y1={ANCHOR_Y + dy}
            x2={ANCHOR_X} y2={ANCHOR_Y}
            stroke="var(--coral)" strokeWidth={isCenter ? 2 : 1}
            opacity={isCenter ? 0.8 : 0.4}
            strokeDasharray={isCenter ? undefined : '4 4'} />
        ) : (
          <motion.line key={`fan${i}`} x1={FAN_LEFT} y1={ANCHOR_Y + dy}
            x2={ANCHOR_X} y2={ANCHOR_Y}
            stroke="var(--coral)" strokeWidth={isCenter ? 2 : 1}
            strokeDasharray={isCenter ? undefined : '4 4'}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: isCenter ? 0.8 : 0.4 }}
            transition={{ duration: 0.5, delay: delay + 0.3 + i * 0.12, ease: ED }} />
        );
      })}

      {/* 70kg anchor */}
      <circle cx={ANCHOR_X} cy={ANCHOR_Y} r={4} fill="var(--coral)" stroke="var(--bg)" strokeWidth={1.5} />
      <text x={ANCHOR_X + 8} y={ANCHOR_Y + 4} fontFamily="var(--font-mono)" fontSize="12"
        fill="var(--cream-muted)">70 KG</text>

      {/* Question mark */}
      <motion.text x={70} y={55} fontFamily="var(--font-mono)" fontSize="22"
        fill="var(--coral)" opacity={0.6} fontWeight={700}
        initial={r ? false : { opacity: 0, scale: 1.3 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 0.4, ease: ED, delay: delay + 1.2 }}>
        WT<tspan fontSize="14" dy="-6">?</tspan>
      </motion.text>

      <text x={140} y={178} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15"
        letterSpacing="0.4" fill="var(--cream-muted)" fontWeight={500}>exponents wobble · data-driven · unstable</text>

      {/* Divider */}
      <line x1={20} x2={260} y1={198} y2={198} stroke="var(--cream-hairline)" strokeWidth={1} opacity={0.5} />

      {/* Section label — GOOD */}
      <text x={20} y={224} fontFamily="var(--font-mono)" fontSize="15"
        letterSpacing="1" fill="var(--cream)" fontWeight={700}>FIXED · BIOLOGY-DRIVEN</text>

      {/* CL equation — big, clean */}
      <motion.g initial={r ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: ED, delay: delay + 1.5 }}>
        <rect x={20} y={238} width={116} height={68} rx={6}
          fill="color-mix(in srgb, var(--case) 8%, var(--bp-paper2, var(--panel)))"
          stroke="color-mix(in srgb, var(--case) 55%, var(--bp-hair, var(--cream-hairline)))"
          strokeWidth={1.5} />
        <text x={78} y={262} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
          letterSpacing="1" fill="var(--case)" fontWeight={600}>CL · Q</text>
        <text x={78} y={290} textAnchor="middle" fontFamily="var(--font-display)" fontSize="22"
          fill="var(--cream)" fontWeight={600}>WT<tspan fontSize="14" dy="-8">0.75</tspan></text>
      </motion.g>

      {/* V equation */}
      <motion.g initial={r ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: ED, delay: delay + 1.7 }}>
        <rect x={148} y={238} width={116} height={68} rx={6}
          fill="color-mix(in srgb, var(--case) 8%, var(--bp-paper2, var(--panel)))"
          stroke="color-mix(in srgb, var(--case) 55%, var(--bp-hair, var(--cream-hairline)))"
          strokeWidth={1.5} />
        <text x={206} y={262} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
          letterSpacing="1" fill="var(--case)" fontWeight={600}>Vc · Vp</text>
        <text x={206} y={290} textAnchor="middle" fontFamily="var(--font-display)" fontSize="22"
          fill="var(--cream)" fontWeight={600}>WT<tspan fontSize="14" dy="-8">1.0</tspan></text>
      </motion.g>

      {/* Citation */}
      <text x={140} y={332} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12"
        letterSpacing="0.4" fill="var(--cream-muted)">Anderson-Holford 2008 · ICH E11A default</text>

      {/* Outcome card */}
      <motion.g initial={r ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ED, delay: delay + 2.1 }}>
        <rect x={40} y={354} width={200} height={42} rx={6}
          fill="color-mix(in srgb, var(--case) 10%, var(--panel))"
          stroke="var(--case)" strokeWidth={1.5} />
        <text x={140} y={374} textAnchor="middle" fontFamily="var(--font-display)" fontSize="14"
          fill="var(--cream)" fontWeight={600}>Biology, not data</text>
        <text x={140} y={388} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12"
          letterSpacing="0.8" fill="var(--case)">LOCKED</text>
      </motion.g>
    </motion.svg>
  );
}

/* ─── DECISION 03 — STAY PARSIMONIOUS ─── */
function ParsimonyViz({ delay = 0 }) {
  const r = useReducedMotion();
  const cols = 4, rows = 3;
  const gridX = 18, gridY = 50, cellW = 62, cellH = 34;

  return (
    <motion.svg
      className="cs1-cov-viz-svg"
      viewBox="0 0 280 440"
      preserveAspectRatio="xMidYMid meet"
      initial={r ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: ED, delay }}
    >

      {/* Header */}
      <text x={20} y={28} fontFamily="var(--font-mono)" fontSize="15"
        letterSpacing="1" fill="var(--cream)" fontWeight={700}>12 TESTED</text>
      <text x={260} y={28} textAnchor="end" fontFamily="var(--font-mono)" fontSize="15"
        letterSpacing="1" fill="var(--coral)" fontWeight={700}>0 RETAINED</text>

      {/* Covariate chip grid with animated X stamps */}
      {COV_LABELS.map((label, i) => {
        const row = Math.floor(i / cols), col = i % cols;
        const cx = gridX + col * cellW + cellW / 2;
        const cy = gridY + row * cellH + cellH / 2;
        const w = cellW - 6, h = cellH - 6;
        const x0 = cx - w / 2 + 3, y0 = cy - h / 2 + 3;
        const x1 = cx + w / 2 - 3, y1 = cy + h / 2 - 3;
        const sd = i * 0.12;

        return (
          <g key={label}>
            <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={3}
              fill="color-mix(in srgb, var(--panel) 55%, transparent)"
              stroke="var(--bp-hair, var(--cream-hairline))" strokeWidth={1.25} opacity={0.95} />
            <text x={cx} y={cy + 3} textAnchor="middle" fontFamily="var(--font-mono)"
              fontSize="12" letterSpacing="0.5" fill="var(--cream-muted)" opacity={0.8}>{label}</text>
            {r ? (
              <>
                <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--coral)" strokeWidth={1.5} strokeLinecap="round" opacity={0.8} />
                <line x1={x0} y1={y1} x2={x1} y2={y0} stroke="var(--coral)" strokeWidth={1.5} strokeLinecap="round" opacity={0.8} />
              </>
            ) : (
              <>
                <motion.line x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--coral)" strokeWidth={1.5} strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.25, delay: delay + 0.5 + sd, ease: ED }} />
                <motion.line x1={x0} y1={y1} x2={x1} y2={y0} stroke="var(--coral)" strokeWidth={1.5} strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.25, delay: delay + 0.6 + sd, ease: ED }} />
              </>
            )}
          </g>
        );
      })}

      {/* Threshold line */}
      <motion.g initial={r ? false : { opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: ED, delay: delay + 2.2 }}>
        <line x1={16} x2={264} y1={172} y2={172} stroke="var(--amber)" strokeWidth={1.5} strokeDasharray="6 4" />
        <text x={268} y={176} fontFamily="var(--font-mono)" fontSize="12"
          letterSpacing="0.6" fill="var(--amber)" fontWeight={600}>ΔOFV {'>'} 10.83</text>
      </motion.g>

      {/* Type-I error explanation */}
      <motion.g initial={r ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ED, delay: delay + 2.5 }}>
        <text x={140} y={206} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
          letterSpacing="0.4" fill="var(--cream-muted)">Forward at α=0.05 with 12 covariates →</text>
        <text x={140} y={234} textAnchor="middle" fontFamily="var(--font-display)" fontSize="36"
          fill="var(--coral)" fontWeight={700}>46%</text>
        <text x={140} y={252} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
          letterSpacing="0.8" fill="var(--coral)">FALSE-POSITIVE RISK</text>
        <text x={140} y={268} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12"
          letterSpacing="0.4" fill="var(--cream-muted)">1 − (1−0.05)¹² ≈ 0.46</text>
      </motion.g>

      {/* Divider */}
      <line x1={40} x2={240} y1={288} y2={288} stroke="var(--cream-hairline)" strokeWidth={1} opacity={0.4} />

      {/* The defense */}
      <motion.g initial={r ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ED, delay: delay + 3.0 }}>
        <text x={140} y={310} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14"
          letterSpacing="0.8" fill="var(--cream)" fontWeight={600}>FULL MODEL · BACKWARD DELETION</text>
        <text x={140} y={340} textAnchor="middle" fontFamily="var(--font-display)" fontSize="28"
          fill="var(--amber)" fontWeight={700}>p {'<'} 0.001</text>
        <text x={140} y={360} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13"
          letterSpacing="0.4" fill="var(--cream-muted)">χ² · df=1 · ΔOFV {'>'} 10.83</text>
      </motion.g>

      {/* Outcome card */}
      <motion.g initial={r ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ED, delay: delay + 3.4 }}>
        <rect x={40} y={384} width={200} height={42} rx={6}
          fill="color-mix(in srgb, var(--case) 10%, var(--panel))"
          stroke="var(--case)" strokeWidth={1.5} />
        <text x={140} y={404} textAnchor="middle" fontFamily="var(--font-display)" fontSize="14"
          fill="var(--cream)" fontWeight={600}>Weight only</text>
        <text x={140} y={418} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12"
          letterSpacing="0.8" fill="var(--case)">FILTERED</text>
      </motion.g>
    </motion.svg>
  );
}

function LiveCovariateStrategy({ reduced }) {
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · Covariate strategy</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        Three design decisions. Each one a{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          regulatory defense.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        A covariate screen designed to reject attractive but fragile explanations.
      </Subhead>

      <Viz>
        <div className="cs1-cov-grid">
          {[
            { num: '01', label: 'Anchor', action: 'Build on the adult model.', Viz: AnchorViz },
            { num: '02', label: 'Constrain', action: 'Fix allometric exponents.', Viz: ConstrainViz },
            { num: '03', label: 'Stay parsimonious', action: 'Test covariates — retain none.', Viz: ParsimonyViz },
          ].map((d, i) => {
            const delay = 0.50 + i * 0.20;
            const V = d.Viz;
            return (
              <motion.article
                key={d.num}
                className="cs1-cov-card"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: ED, delay }}
              >
                <div className="cs1-cov-card__head">
                  <div className="deck-mono uppercase xc-slide-eyebrow xc-case cs1-cov-card__eyebrow">
                    Decision {d.num} · {d.label}
                  </div>
                  <div className="deck-display xc-name xc-ink cs1-cov-card__action">
                    {d.action}
                  </div>
                </div>
                <div className="cs1-cov-card__viz">
                  <V delay={delay + 0.15} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Covariate Strategy"
        tagline="The model gets smaller because the defense gets harder."
        source="Source · Okour et al. J Clin Pharmacol 2023 · doi:10.1002/jcph.2199"
      />
    </SlideGrid>
  );
}

export default function Cs1BackupB17CovariateAnalysis({ live = false } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  if (live) return <LiveCovariateStrategy go={go} reduced={reduced} />;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>
        {live ? 'Case 01 · Covariate strategy' : 'Backup B17 · Methodology · Covariate analysis'}
      </Eyebrow>

      <Headline delay={0.25} maxChars={60}>
        Covariates tested — none retained.{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          Parsimony, not omission.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        Final covariate model = base model with allometric body-weight scaling only.
      </Subhead>

      <Viz>
        <div ref={ref} className="cs1-cov-backup">
          {/* Left · covariate table */}
          <motion.div
            className="cs1-cov-panel cs1-cov-panel--table"
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: ED, delay: 0.55 }}
          >
            <div className="deck-mono uppercase xc-slide-eyebrow xc-case" style={noteTitle}>Covariates tested · outcomes</div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th className="deck-mono uppercase xc-slide-eyebrow xc-faint" style={cellHead}>Covariate</th>
                  <th className="deck-mono uppercase xc-slide-eyebrow xc-faint" style={cellHead}>Parameter</th>
                  <th className="deck-mono uppercase xc-slide-eyebrow xc-faint" style={cellHead}>Outcome</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={3} className="deck-mono uppercase xc-slide-eyebrow xc-case" style={sectRow}>Tested on CL/F</td></tr>
                {COV_ROWS_CL.map((c) => (
                  <tr key={c}>
                    <td className="xc-slide-subhead xc-ink" style={cellLabel}>{c}</td>
                    <td className="deck-mono xc-slide-subhead xc-ink" style={cellLabel}>CL/F</td>
                    <td className="deck-mono uppercase xc-slide-eyebrow xc-muted" style={cellOut}>Not significant</td>
                  </tr>
                ))}
                <tr><td colSpan={3} className="deck-mono uppercase xc-slide-eyebrow xc-case" style={sectRow}>Tested on Vc/F</td></tr>
                {COV_ROWS_VC.map((c) => (
                  <tr key={c}>
                    <td className="xc-slide-subhead xc-ink" style={cellLabel}>{c}</td>
                    <td className="deck-mono xc-slide-subhead xc-ink" style={cellLabel}>Vc/F</td>
                    <td className="deck-mono uppercase xc-slide-eyebrow xc-muted" style={cellOut}>Not significant</td>
                  </tr>
                ))}
                <tr><td colSpan={3} className="deck-mono uppercase xc-slide-eyebrow xc-case" style={sectRow}>Tested on t_lag</td></tr>
                {COV_ROWS_TLAG.map((c) => (
                  <tr key={c}>
                    <td className="xc-slide-subhead xc-ink" style={cellLabel}>{c}</td>
                    <td className="deck-mono xc-slide-subhead xc-ink" style={cellLabel}>t_lag</td>
                    <td className="deck-mono uppercase xc-slide-eyebrow xc-muted" style={cellOut}>Not significant</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Right · methodology + parsimony notes */}
          <div className="cs1-cov-backup__notes">
            <motion.div
              className="cs1-cov-panel cs1-cov-panel--accent"
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: ED, delay: 0.70 }}
            >
              <div className="deck-mono uppercase xc-slide-eyebrow xc-case" style={noteTitle}>Method</div>
              <div className="xc-slide-subhead xc-muted" style={noteBody}>
                <strong className="xc-ink">Full-model approach</strong> with{' '}
                <strong className="xc-ink">backward deletion</strong> — all
                covariates entered simultaneously, then removed one at a time.<br />
                Retention threshold: <span className="xc-mono xc-case">ΔOFV {'>'} 10.83</span> (χ², df=1,{' '}
                <strong className="xc-ink">p {'<'} 0.001</strong>).<br />
                <strong className="xc-ink">Why p {'<'} 0.001?</strong> Stringent
                threshold controls{' '}
                <strong className="xc-ink">type-I error inflation</strong> and{' '}
                <strong className="xc-ink">winner's-curse</strong> effects in a
                39-patient dataset.
              </div>
            </motion.div>

            <motion.div
              className="cs1-cov-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: ED, delay: 0.85 }}
            >
              <div className="deck-mono uppercase xc-slide-eyebrow xc-case" style={noteTitle}>Why parsimony strengthens the model</div>
              <div className="xc-slide-subhead xc-muted" style={noteBody}>
                In a <strong className="xc-ink">39-patient</strong> pediatric dataset
                where <strong className="xc-ink">body weight dominates</strong>{' '}
                between-subject variability, allometric scaling absorbs variance that would
                otherwise be attributed to age, organ function, or demographics. Retaining weak
                covariates would have{' '}
                <strong className="xc-ink">added parameter uncertainty without improving exposure inference.</strong>
              </div>
            </motion.div>

            <motion.div
              className="cs1-cov-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: ED, delay: 1.00 }}
            >
              <div className="deck-mono uppercase xc-slide-eyebrow xc-case" style={noteTitle}>Age range supports this</div>
              <div className="xc-slide-subhead xc-muted" style={noteBody}>
                Enrolled <strong className="xc-ink">ages 8–17</strong>. Metabolic
                pathway maturation:
                <ul style={{ margin: 'var(--space-2) 0 0 var(--space-4)', padding: 0 }}>
                  <li>UGT1A9, UGT2B7 — near-adult activity by <strong className="xc-ink">~2–3 years</strong></li>
                  <li>CYP3A4 — adult activity by <strong className="xc-ink">~1 year</strong></li>
                </ul>
                All metabolic pathways at or near adult maturity in this age band →{' '}
                <strong style={{ color: 'var(--cream)' }}>weight-based allometric scaling is mechanistically sufficient.</strong>
              </div>
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        kicker={live ? 'Case 01 · Covariate Strategy' : 'CS1 · Backup · Methodology'}
        tagline={live ? 'Full model first. Stringent deletion. Parsimony as evidence.' : "The covariates that didn't make the cut — and why that's the right answer."}
        source="Source · Okour et al. J Clin Pharmacol 2023 · doi:10.1002/jcph.2199"
      />
    </SlideGrid>
  );
}
