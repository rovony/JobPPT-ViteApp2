import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import { EASE } from '../motion';

/**
 * Slide 18 — A4 Composed Scientific Dashboard · Regulatory readiness.
 *
 * Demonstrates that the same Pharazi foundation maps directly to the
 * regulatory deliverables a sponsor must produce. Four quadrants:
 *
 *   TL: ICH M15 ALIGNMENT MATRIX · 8 model-credibility expectations,
 *       each cross-referenced to a foundation component
 *   TR: REGULATORY PACKAGE STATUS · MAA / NDA artifact list with state
 *       chips (Drafted / In QC / Issued)
 *   BL: AGENCY ENGAGEMENT TIMELINE · scientific advice, BfArM, EMA, FDA
 *       milestones across an 18-month horizon
 *   BR: SUBMISSION DOSSIER MAP · CTD-style stack of M2/M3/M5 references
 *       with hash-anchor linkage to the audit chain
 *
 * Case color: violet (regulatory-affairs register).
 */

const M15 = [
  { req: 'CONTEXT OF USE',          comp: 'SOP versioning' },
  { req: 'MODEL DEVELOPMENT',       comp: 'Hierarchy + QC' },
  { req: 'CALIBRATION + EVIDENCE',  comp: 'GoF + bootstrap' },
  { req: 'CREDIBILITY GRADE',       comp: 'QC vote · 3/3' },
  { req: 'DATA PROVENANCE',         comp: 'Audit chain' },
  { req: 'INDEPENDENCE OF REVIEW',  comp: 'Multi-LLM debate' },
  { req: 'REPRODUCIBILITY',         comp: 'SOP marketplace' },
  { req: 'FAIR-PRINCIPLES',         comp: 'Schema extractor' },
];

const ARTIFACTS = [
  { name: 'POPPK ANALYSIS REPORT',   state: 'ISSUED',   tone: 'case' },
  { name: 'COVARIATE STRATEGY MEMO', state: 'IN QC',    tone: 'amber' },
  { name: 'EXPOSURE-RESPONSE BRIEF', state: 'DRAFTED',  tone: 'cream' },
  { name: 'MODEL CREDIBILITY DECK',  state: 'DRAFTED',  tone: 'cream' },
  { name: 'M5.3.4.2 PMR TEXT',       state: 'IN QC',    tone: 'amber' },
];

const TIMELINE = [
  { month: 'M0',  event: 'KICK-OFF',       agency: '—'    },
  { month: 'M3',  event: 'PRE-IND',        agency: 'FDA'  },
  { month: 'M6',  event: 'SCI ADVICE',     agency: 'EMA'  },
  { month: 'M10', event: 'TYPE-C',         agency: 'FDA'  },
  { month: 'M14', event: 'M15 BRIEFING',   agency: 'EMA'  },
  { month: 'M18', event: 'NDA SUBMISSION', agency: 'FDA'  },
];

const CTD = [
  { module: 'M2.7', title: 'CLINICAL SUMMARY',  hash: '0x4a91…' },
  { module: 'M3.2', title: 'NONCLIN PHARMA',     hash: '0xb207…' },
  { module: 'M5.3', title: 'CSR + ANALYSES',     hash: '0xf38c…' },
];

export default function RegulatoryDashboardSlide() {
  return (
    <SlideFrame
      dataCase="violet"
      eyebrow="DOMAIN 4 OF 5 · REGULATORY READINESS"
      headline={
        <>
          The same chain anchors{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>regulatory text.</span>
        </>
      }
      subhead="ICH M15 expectations · CTD modules · agency engagement — all derive from the foundation."
      footerKicker="18 · MOVEMENT 3 · REGULATORY DOMAIN"
      footerTagline="Every artifact carries an audit-chain hash. Every credibility claim is anchored."
      footerSource="Reference workflow · ICH M15 (2024) · April 2026"
    >
      <div className="grid grid-cols-12 grid-rows-2 gap-3 h-full px-2 pt-2 pb-2">
        {/* TL — M15 alignment matrix */}
        <Quadrant area="col-span-6 row-span-1" label="ICH M15 · ALIGNMENT MATRIX" delay={0.4}>
          <div
            className="h-full p-3 overflow-auto"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <div className="grid grid-cols-2 gap-1.5">
              {M15.map((m, i) => (
                <motion.div
                  key={m.req}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.05, ease: EASE.expoOut }}
                  className="flex flex-col gap-0.5"
                  style={{
                    border: '1px solid color-mix(in srgb, var(--case) 18%, transparent)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px 8px',
                    background: 'color-mix(in srgb, var(--case) 5%, transparent)',
                  }}
                >
                  <span
                    className="deck-mono uppercase"
                    style={{
                      fontSize: '0.55rem',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: 'var(--case)',
                    }}
                  >
                    {m.req}
                  </span>
                  <span
                    className="deck-body"
                    style={{ fontSize: '0.7rem', color: 'var(--cream)', lineHeight: 1.2 }}
                  >
                    → {m.comp}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Quadrant>

        {/* TR — Regulatory package status */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="REGULATORY PACKAGE · ARTIFACT STATUS"
          delay={0.6}
          tone="case"
        >
          <div
            className="h-full p-3 flex flex-col gap-1.5"
            style={{
              background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {ARTIFACTS.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.07, ease: EASE.expoOut }}
                className="flex items-center justify-between deck-mono uppercase"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--cream)',
                  borderBottom: '1px solid color-mix(in srgb, var(--cream) 6%, transparent)',
                  paddingBottom: 4,
                }}
              >
                <span>{a.name}</span>
                <StatusChip tone={a.tone}>{a.state}</StatusChip>
              </motion.div>
            ))}
          </div>
        </Quadrant>

        {/* BL — Agency engagement timeline */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="AGENCY ENGAGEMENT · 18-MONTH ARC"
          delay={1.0}
        >
          <div
            className="h-full p-4 relative"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {/* Timeline rail */}
            <div className="absolute left-4 right-4" style={{ top: '50%', height: 1, background: 'var(--cream-hairline)' }} />
            <div className="grid grid-cols-6 gap-2 h-full">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.month}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.08, ease: EASE.expoOut }}
                  className="flex flex-col items-center justify-between"
                >
                  <span
                    className="deck-mono uppercase text-center"
                    style={{
                      fontSize: '0.55rem',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: 'var(--cream-faint)',
                    }}
                  >
                    {t.event}
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.4 + i * 0.08 }}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: t.agency === 'FDA' ? 'var(--case)' : 'var(--cream)',
                      border: '2px solid var(--bg)',
                      boxShadow:
                        t.agency === 'FDA'
                          ? '0 0 12px color-mix(in srgb, var(--case) 60%, transparent)'
                          : 'none',
                    }}
                  />
                  <div className="flex flex-col items-center gap-0.5">
                    <span
                      className="deck-display"
                      style={{
                        fontSize: '0.95rem',
                        color: 'var(--cream)',
                        fontWeight: 600,
                      }}
                    >
                      {t.month}
                    </span>
                    <span
                      className="deck-mono uppercase"
                      style={{
                        fontSize: '0.55rem',
                        letterSpacing: 'var(--ls-mono-wide)',
                        color: t.agency === 'FDA' ? 'var(--case)' : 'var(--cream-faint)',
                      }}
                    >
                      {t.agency}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Quadrant>

        {/* BR — CTD dossier map */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="SUBMISSION DOSSIER · CTD STACK"
          delay={1.2}
        >
          <div
            className="h-full p-3 flex flex-col gap-2"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {CTD.map((m, i) => (
              <motion.div
                key={m.module}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.1, ease: EASE.expoOut }}
                className="flex items-center justify-between"
                style={{
                  borderLeft: '3px solid var(--case)',
                  background: 'color-mix(in srgb, var(--case) 6%, transparent)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 10px',
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span
                    className="deck-mono uppercase"
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: 'var(--case)',
                    }}
                  >
                    Module {m.module}
                  </span>
                  <span
                    className="deck-display"
                    style={{ fontSize: '0.85rem', color: 'var(--cream)', fontWeight: 500 }}
                  >
                    {m.title}
                  </span>
                </div>
                <span
                  className="deck-mono"
                  style={{
                    fontSize: '0.65rem',
                    color: 'var(--cream)',
                    letterSpacing: 'var(--ls-mono)',
                  }}
                >
                  ⛓ {m.hash}
                </span>
              </motion.div>
            ))}
          </div>
        </Quadrant>
      </div>
    </SlideFrame>
  );
}

function Quadrant({
  area,
  label,
  delay,
  tone,
  children,
}: {
  area: string;
  label: string;
  delay: number;
  tone?: 'case' | 'cream';
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE.expoOut }}
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

function StatusChip({ tone, children }: { tone: string; children: React.ReactNode }) {
  const palette: Record<string, { bg: string; fg: string; border: string }> = {
    case: {
      bg: 'color-mix(in srgb, var(--case) 22%, transparent)',
      fg: 'var(--case)',
      border: 'var(--case)',
    },
    amber: {
      bg: 'color-mix(in srgb, #f5b042 18%, transparent)',
      fg: '#f5b042',
      border: '#f5b042',
    },
    cream: {
      bg: 'color-mix(in srgb, var(--cream) 6%, transparent)',
      fg: 'var(--cream-muted)',
      border: 'var(--cream-hairline)',
    },
  };
  const p = palette[tone] ?? palette.cream;
  return (
    <span
      style={{
        background: p.bg,
        color: p.fg,
        border: `1px solid ${p.border}`,
        borderRadius: '999px',
        padding: '2px 8px',
        fontSize: '0.55rem',
        letterSpacing: 'var(--ls-mono-wide)',
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}
