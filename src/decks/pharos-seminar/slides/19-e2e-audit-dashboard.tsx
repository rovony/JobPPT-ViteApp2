import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import LiveAuditChain from '../components/LiveAuditChain';
import { EASE } from '../motion';

/**
 * Slide 19 — A4 Composed Scientific Dashboard · End-to-end audit lineage.
 *
 * Demonstrates that ONE patient sample → ONE clinical observation →
 * ONE regulatory paragraph is hash-linked through the entire foundation.
 * Four quadrants:
 *
 *   TL: PROVENANCE TREE · 4-level cascade from raw lab → curated dataset
 *       → analysis result → regulatory text, each stamped with its hash
 *   TR: LiveAuditChain · the canonical chain visualization, in verify mode,
 *       showing the same root anchored across all four levels
 *   BL: TRACEABILITY MATRIX · 5 regulatory claims × audit-chain blocks,
 *       each cell either ✓ (anchored) or with the anchoring block id
 *   BR: REGRESSION ALERT PANEL · 3 historical traces + 0 unresolved
 *       deviations + 1 pending inspector reply
 *
 * Case color: cyan (audit-discipline register).
 * Voice: third-person, work-as-subject, A5 vocabulary ("foundation").
 */

const PROV = [
  { tier: 'L1', label: 'RAW LAB SAMPLE',         hash: '0x4a91d3…', delay: 0.5 },
  { tier: 'L2', label: 'CURATED DATASET',        hash: '0xb207fa…', delay: 0.7 },
  { tier: 'L3', label: 'POPPK ANALYSIS RESULT',  hash: '0xf38c2e…', delay: 0.9 },
  { tier: 'L4', label: 'REGULATORY TEXT BLOCK',  hash: '0xd14e80…', delay: 1.1 },
];

const CLAIMS = [
  { claim: 'COVARIATE INCLUSION',     blocks: ['L2', 'L3'] },
  { claim: 'EXPOSURE TARGET HIT',     blocks: ['L3', 'L4'] },
  { claim: 'QC INDEPENDENCE · 3/3',   blocks: ['L3'] },
  { claim: 'M15 CREDIBILITY GRADE',   blocks: ['L3', 'L4'] },
  { claim: 'PMR LANGUAGE COMPLIANCE', blocks: ['L4'] },
];

const ALERTS = [
  { kind: 'HISTORICAL TRACE', count: 3, tone: 'cream' },
  { kind: 'UNRESOLVED DEVIATION', count: 0, tone: 'case' },
  { kind: 'PENDING INSPECTOR REPLY', count: 1, tone: 'amber' },
];

export default function E2EAuditDashboardSlide() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrow="DOMAIN 5 OF 5 · END-TO-END AUDIT LINEAGE"
      headline={
        <>
          One sample. One number. One regulatory paragraph.{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>One chain.</span>
        </>
      }
      subhead="Provenance is structural, not procedural. Every claim resolves to a verifiable root hash."
      footerKicker="19 · MOVEMENT 3 · END-TO-END AUDIT"
      footerTagline="Inspectors can verify a number to its raw lab sample without leaving the chain."
      footerSource="Reference workflow · cross-domain audit lineage · April 2026"
    >
      <div className="grid grid-cols-12 grid-rows-2 gap-3 h-full px-2 pt-2 pb-2">
        {/* TL — Provenance tree */}
        <Quadrant area="col-span-6 row-span-1" label="PROVENANCE TREE · 4 TIERS" delay={0.4}>
          <div
            className="h-full p-3 flex flex-col gap-2 relative"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {/* Connecting rail */}
            <div
              aria-hidden
              className="absolute"
              style={{
                left: 28,
                top: 32,
                bottom: 32,
                width: 1,
                background:
                  'linear-gradient(to bottom, color-mix(in srgb, var(--case) 50%, transparent), color-mix(in srgb, var(--case) 18%, transparent))',
              }}
            />
            {PROV.map((p, i) => (
              <motion.div
                key={p.tier}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: p.delay, ease: EASE.expoOut }}
                className="flex items-center gap-3 relative z-[1]"
              >
                <div
                  className="flex items-center justify-center deck-mono uppercase"
                  style={{
                    width: 28,
                    height: 28,
                    background:
                      'color-mix(in srgb, var(--case) 28%, transparent)',
                    border: '1px solid var(--case)',
                    borderRadius: '50%',
                    fontSize: '0.6rem',
                    color: 'var(--case)',
                    boxShadow: '0 0 12px color-mix(in srgb, var(--case) 50%, transparent)',
                    letterSpacing: 0,
                    fontWeight: 700,
                  }}
                >
                  {p.tier}
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <span
                    className="deck-display"
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--cream)',
                      fontWeight: 500,
                    }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="deck-mono"
                    style={{
                      fontSize: '0.62rem',
                      color: 'var(--cream-faint)',
                      letterSpacing: 'var(--ls-mono)',
                    }}
                  >
                    ⛓ {p.hash}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Quadrant>

        {/* TR — LiveAuditChain */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="LIVE AUDIT CHAIN · VERIFY SWEEP"
          delay={0.6}
          tone="case"
        >
          <div
            className="h-full p-3 flex items-center justify-center"
            style={{
              background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <LiveAuditChain mode="verify" height={170} showCounter />
          </div>
        </Quadrant>

        {/* BL — Traceability matrix */}
        <Quadrant area="col-span-6 row-span-1" label="TRACEABILITY MATRIX · CLAIMS × BLOCKS" delay={1.0}>
          <div
            className="h-full p-3"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <table className="w-full deck-mono" style={{ fontSize: '0.65rem', color: 'var(--cream)' }}>
              <thead>
                <tr style={{ color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono-wide)' }}>
                  <th className="text-left pb-1 uppercase">Claim</th>
                  <th className="text-center pb-1 uppercase">L1</th>
                  <th className="text-center pb-1 uppercase">L2</th>
                  <th className="text-center pb-1 uppercase">L3</th>
                  <th className="text-center pb-1 uppercase">L4</th>
                </tr>
              </thead>
              <tbody>
                {CLAIMS.map((c, i) => (
                  <motion.tr
                    key={c.claim}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.06, ease: EASE.expoOut }}
                    style={{ borderTop: '1px solid color-mix(in srgb, var(--cream) 6%, transparent)' }}
                  >
                    <td
                      className="py-1.5 uppercase"
                      style={{ color: 'var(--cream)', letterSpacing: '0.04em', fontSize: '0.62rem' }}
                    >
                      {c.claim}
                    </td>
                    {(['L1', 'L2', 'L3', 'L4'] as const).map((tier) => (
                      <td key={tier} className="py-1.5 text-center">
                        {c.blocks.includes(tier) ? (
                          <span style={{ color: 'var(--case)', fontWeight: 700 }}>✓</span>
                        ) : (
                          <span style={{ color: 'color-mix(in srgb, var(--cream) 18%, transparent)' }}>·</span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Quadrant>

        {/* BR — Alert panel */}
        <Quadrant area="col-span-6 row-span-1" label="REGRESSION + INSPECTOR ALERTS" delay={1.2}>
          <div
            className="h-full p-3 flex flex-col gap-2"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {ALERTS.map((a, i) => (
              <motion.div
                key={a.kind}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.1, ease: EASE.expoOut }}
                className="flex items-center justify-between"
                style={{
                  borderLeft: `3px solid ${
                    a.tone === 'case'
                      ? 'var(--case)'
                      : a.tone === 'amber'
                      ? '#f5b042'
                      : 'var(--cream-hairline)'
                  }`,
                  background:
                    a.tone === 'case'
                      ? 'color-mix(in srgb, var(--case) 8%, transparent)'
                      : a.tone === 'amber'
                      ? 'color-mix(in srgb, #f5b042 8%, transparent)'
                      : 'color-mix(in srgb, var(--cream) 4%, transparent)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px',
                }}
              >
                <span
                  className="deck-mono uppercase"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--cream)',
                  }}
                >
                  {a.kind}
                </span>
                <span
                  className="deck-display"
                  style={{
                    fontSize: '1.6rem',
                    color:
                      a.tone === 'case'
                        ? 'var(--case)'
                        : a.tone === 'amber'
                        ? '#f5b042'
                        : 'var(--cream)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {a.count}
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
