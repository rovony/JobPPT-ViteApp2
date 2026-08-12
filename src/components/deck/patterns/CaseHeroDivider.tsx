// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { eyebrowBadgeStyle } from '@/components/deck/SlideParts';
import './CaseHeroDivider.css';

/**
 * CaseHeroDivider — large typographic divider for light-editorial paper.
 *
 * Layout (1920×1080 authoring):
 *   • Left column: CASE STUDY nn kicker · giant compound title ·
 *     case-color hairline · subhead · taglines
 *   • Right column: illustration slot (lung · India · etc.)
 *   • Bottom stack: CaseLedger (meta grid) · source + case counter
 *     (one flow so wrapped ledger values never collide with source)
 *
 * Paper look: solid bg, hairlines, short entrance delays. Critical type
 * is never gated behind opacity-0 / inView — titles stay readable at rest.
 *
 * Type sizes prefer deck tokens (`--fs-case-*` / `--fs-slide-*`) via
 * `.xc-case-*` classes (v7-xencor-v3 `xencor-deck.css`).
 *
 * Props:
 *   caseToken    — 'coral' | 'cyan' | 'violet' | 'amber' | 'sage'
 *   caseNumber   — '01' | '02' | '03'
 *   totalCases   — total case count (for 'nn · NN' corner chrome)
 *   kicker       — "CASE STUDY 02"
 *   title        — giant compound name (e.g. "Ivosidenib")
 *   subtitle     — one-line subtitle under the hairline
 *   tagline      — bottom italic summary line
 *   meta         — inline meta chips [[label, value], …] (optional)
 *   verdict      — "APPROVED" / status word (optional)
 *   illustration — React node rendered in the right column
 *   source       — bottom-left small source line
 */
export default function CaseHeroDivider({
  caseToken = 'coral',
  caseNumber = '01',
  totalCases = 3,
  kicker,
  title,
  subtitle,
  tagline,
  meta = [],
  verdict,
  illustration,
  source,
}: any) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const d = (ms) => (reduce ? 0 : ms);
  const D = {
    chrome: d(0.06),
    kicker: d(0.08),
    title: d(0.12),
    rule: d(0.16),
    subtitle: d(0.2),
    illustration: d(0.14),
    tagline: d(0.26),
    meta: d(0.3),
    source: d(0.32),
  };

  const totalLabel = String(totalCases).padStart(2, '0');
  const hasLedger = meta.length > 0 || verdict;

  // The section MUST mount opaque. The slide-level fade is owned by
  // SlideTransition. Do not add section-level initial/exit opacity.
  return (
    <motion.section
      data-case={caseToken}
      className="xc-case-hero relative w-full h-[100dvh]"
      style={{ background: 'var(--bg)' }}
    >
      {/* Corner chrome */}
      <motion.div
        className="xc-case-hero__chrome absolute top-[6vh] right-[var(--deck-gutter)] deck-mono uppercase"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.35, ease, delay: D.chrome }}
      >
        Case Study {caseNumber} · {caseNumber} of {totalLabel}
      </motion.div>

      {/* ═══════════ LEFT · Type column ═══════════ */}
      <motion.div
        layoutId={`case-card-${caseToken}`}
        className="xc-case-hero__type absolute"
        style={{
          top: 'clamp(96px, 14vh, 200px)',
          left: 'var(--deck-gutter)',
          width: 'clamp(620px, 58%, 1100px)',
          zIndex: 2,
        }}
      >
        <motion.div
          className="xc-case-hero__kicker deck-mono uppercase"
          style={{
            color: 'var(--case)',
            ...eyebrowBadgeStyle('var(--case)'),
          }}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease, delay: D.kicker }}
        >
          {kicker || `CASE STUDY ${caseNumber}`}
        </motion.div>

        <h1 className="xc-case-hero__title deck-display">
          {title}
        </h1>

        <motion.div
          layoutId={`case-marker-${caseToken}`}
          className="xc-case-hero__rule"
          style={{
            background: 'var(--case)',
            transformOrigin: 'left center',
          }}
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0 : 0.45, ease, delay: D.rule }}
        />

        {subtitle && (
          <div className="xc-case-hero__subtitle deck-display">
            {subtitle}
          </div>
        )}

        {tagline && (
          <motion.p
            className="xc-case-hero__tagline deck-display italic"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.35, ease, delay: D.tagline }}
          >
            {tagline}
          </motion.p>
        )}
      </motion.div>

      {/* ═══════════ RIGHT · Illustration column ═══════════ */}
      <motion.div
        className="xc-case-hero__illust absolute"
        style={{
          top: '12vh',
          right: 'clamp(2rem, 5vw, 7rem)',
          bottom: 'var(--fs-case-illust-clearance, clamp(14rem, 28vh, 20rem))',
          width: 'clamp(320px, 34%, 620px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.4, ease, delay: D.illustration }}
      >
        {illustration}
      </motion.div>

      {/* ═══════════ BOTTOM · Ledger + source (stacked — no overlap) ═══════════ */}
      <motion.div
        className="xc-case-hero__foot absolute"
        style={{
          bottom: 'var(--deck-pad-bottom)',
          left: 'var(--deck-gutter)',
          right: 'var(--deck-gutter)',
          zIndex: 3,
        }}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.35, ease, delay: reduce ? 0 : D.meta }}
      >
        {hasLedger && (
          <CaseLedger meta={meta} verdict={verdict} />
        )}

        <div className="xc-case-hero__source-row">
          {source ? (
            <span className="xc-case-hero__source deck-display italic">
              {source}
            </span>
          ) : (
            <span />
          )}
          <CaseCounter current={caseNumber} total={totalLabel} />
        </div>
      </motion.div>
    </motion.section>
  );
}

function CaseCounter({ current, total }) {
  return (
    <span className="xc-case-counter deck-mono uppercase" aria-label={`Case ${current} of ${total}`}>
      <span className="xc-case-counter__n">{current}</span>
      <span className="xc-case-counter__sep" aria-hidden>
        ·
      </span>
      <span className="xc-case-counter__n">{total}</span>
    </span>
  );
}

function CaseLedger({ meta, verdict }) {
  const cells = [
    ...meta.map(([label, value]) => ({ label, value, kind: 'data' })),
    ...(verdict ? [{ label: 'Verdict', value: verdict, kind: 'verdict' }] : []),
  ];

  return (
    <div className="xc-case-ledger">
      <div className="xc-case-ledger__axis" />

      <div
        className="xc-case-ledger__grid"
        style={{
          gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell) => {
          const isVerdict = cell.kind === 'verdict';
          return (
            <div
              key={cell.label}
              className={[
                'xc-case-ledger__cell',
                isVerdict ? 'xc-case-ledger__cell--verdict' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span
                aria-hidden
                className={[
                  'xc-case-ledger__tick',
                  isVerdict ? 'xc-case-ledger__tick--filled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
              <span className="xc-case-ledger__label deck-mono uppercase">
                {cell.label}
              </span>
              <span
                className={[
                  'xc-case-ledger__value',
                  isVerdict ? 'xc-case-ledger__value--verdict deck-mono' : 'deck-display',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {cell.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
