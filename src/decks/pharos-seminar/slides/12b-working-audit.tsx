import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import { EASE, SPRING } from '../motion';
import LiveAuditChain from '../components/LiveAuditChain';

/**
 * Slide 12b — Working system · QC + AUDIT (sage).
 *
 * A4 §3.1 second-beat. Same dashboard chrome as 12a but bottom row now
 * carries the COMPUTED NCA params (BL) and the LiveAuditChain visualization
 * (BR). Top row carries the same chat input + completed orchestration log
 * (last two lines flip from PENDING → PASS). Magic Move via shared
 * layoutIds: chat-input, orch-log, live-badge.
 */

const PROCESS_LOG_DONE = [
  '→ Complexity: MODERATE',
  '→ Routing: non_model_manager',
  '→ Delegating: nca_expert',
  '→ Tools: calculate_nca, plot_pk_profile, compute_t_half',
  '→ QC review: PASS · 3/3 vote',
  '→ Audit chain: anchored to sop.nca_v1_2',
];

const NCA_PARAMS = [
  { p: 'AUC₀₋₂₄', val: '184.3', unit: 'ng·h/mL' },
  { p: 'Cmax', val: '32.7', unit: 'ng/mL' },
  { p: 'Tmax', val: '1.5', unit: 'h' },
  { p: 't½', val: '6.8', unit: 'h' },
  { p: 'CL/F', val: '54.2', unit: 'L/h' },
  { p: 'Vd/F', val: '532', unit: 'L' },
];

export default function WorkingAuditSlide() {
  return (
    <SlideFrame
      dataCase="sage"
      eyebrow="WORKING SYSTEM · QC + AUDIT · DEPLOYED"
      headline={
        <>
          <span className="italic" style={{ color: 'var(--case)' }}>It runs.</span>{' '}
          The chain anchors. The numbers ship.
        </>
      }
      subhead="Vercel · Railway · Supabase · production deployment · April 2026"
      footerKicker="12b · MOVEMENT 3 · WORKING SYSTEM"
      footerTagline="Audit chain entries are real (org_id and user_id sanitized)."
      footerSource="Pharazi production deployment · accessed for this seminar · April 2026"
    >
      <div className="grid grid-cols-12 grid-rows-2 gap-3 h-full px-2 pt-2 pb-2 relative">
        {/* TL — chat input (Magic Move) */}
        <Quadrant area="col-span-6 row-span-1" label="USER INPUT · CHAT" delay={0.2}>
          <motion.div
            layoutId="chat-input"
            className="px-4 py-3 deck-body"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.95rem',
              color: 'var(--cream)',
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: 'var(--cream-faint)' }}>user@org · 14:02 · </span>
            "Run NCA on my dataset, 0–24h, linear-up/log-down. Stratify by formulation."
          </motion.div>
        </Quadrant>

        {/* TR — completed orchestration log (Magic Move) */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="ORCHESTRATION LOG · COMPLETE"
          delay={0.3}
          tone="case"
        >
          <motion.div
            layoutId="orch-log"
            className="px-4 py-3 deck-mono"
            style={{
              background: 'color-mix(in srgb, var(--bg) 90%, transparent)',
              border: '1px solid color-mix(in srgb, var(--case) 22%, transparent)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              lineHeight: 1.55,
              color: 'var(--cream)',
            }}
          >
            {PROCESS_LOG_DONE.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.07, ease: EASE.expoOut }}
              >
                <span style={{ color: i < 3 ? 'var(--case)' : 'var(--cream-muted)' }}>{line}</span>
              </motion.div>
            ))}
          </motion.div>
        </Quadrant>

        {/* BL — NCA result table (NEW reveal) */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="NCA PARAMETERS · COMPUTED"
          delay={0.6}
        >
          <div
            className="grid grid-cols-3 gap-2 p-3"
            style={{
              background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {NCA_PARAMS.map((p, i) => (
              <motion.div
                key={p.p}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.07, ease: EASE.expoOut }}
                className="flex flex-col gap-0.5 px-3 py-2"
                style={{
                  borderLeft: '2px solid color-mix(in srgb, var(--case) 50%, transparent)',
                }}
              >
                <span
                  className="deck-mono uppercase"
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--cream-faint)',
                  }}
                >
                  {p.p}
                </span>
                <span
                  className="deck-display"
                  style={{
                    fontSize: '1.4rem',
                    color: 'var(--cream)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {p.val}
                </span>
                <span
                  className="deck-mono"
                  style={{
                    fontSize: '0.6rem',
                    color: 'var(--case)',
                    letterSpacing: 'var(--ls-mono)',
                  }}
                >
                  {p.unit}
                </span>
              </motion.div>
            ))}
          </div>
        </Quadrant>

        {/* BR — LiveAuditChain (NEW reveal) */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="AUDIT CHAIN · VERIFY SWEEP"
          delay={0.8}
        >
          <div
            className="p-3 h-full"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <LiveAuditChain mode="verify" height={170} showCounter />
          </div>
        </Quadrant>

        {/* Floating LIVE badge — Magic Move from 12a */}
        <motion.div
          layoutId="live-badge"
          className="absolute top-3 right-3 deck-mono uppercase z-10 flex items-center gap-2 px-3 py-1.5"
          style={{
            background: 'color-mix(in srgb, var(--case) 18%, transparent)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid var(--case)',
            borderRadius: '999px',
            fontSize: '0.65rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case)',
            boxShadow: '0 0 24px color-mix(in srgb, var(--case) 35%, transparent)',
          }}
          transition={SPRING.cushiony}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 8,
              height: 8,
              background: 'var(--case)',
              borderRadius: '999px',
              display: 'inline-block',
              boxShadow: '0 0 8px var(--case)',
            }}
          />
          DEPLOYED · LIVE
        </motion.div>
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
