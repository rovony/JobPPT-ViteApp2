import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import { EASE, SPRING } from '../motion';

/**
 * Slide 12a — Working system · OVERVIEW (sage).
 *
 * A4 §3.1 Composed Dashboard, top row only. Splits the original 12 into
 * two beats so Magic Move 12a → 12b reveals the full dashboard.
 *
 *   TL: User chat input  · prompt + dataset reference
 *   TR: Orchestration log · live streaming routing decisions
 *   BL: NCA result table  · placeholder ("COMPUTING…" pulse) — populated in 12b
 *   BR: Audit chain       · placeholder ("AUDIT FORMING…" pulse)  — populated in 12b
 *
 * Pacing: 0.5s TL appears, 0.7s TR begins streaming (PROCESS_LOG cascades),
 * 1.5s LIVE badge spring-in. The bottom-row placeholders are present from
 * 1.1s with shimmer to telegraph "more to come" — no jarring layout shift
 * when 12b enters.
 */

const PROCESS_LOG = [
  '→ Complexity: MODERATE',
  '→ Routing: non_model_manager',
  '→ Delegating: nca_expert',
  '→ Tools: calculate_nca, plot_pk_profile, compute_t_half',
  '→ QC review: PENDING',
  '→ Audit chain: ANCHORING…',
];

export default function WorkingOverviewSlide() {
  return (
    <SlideFrame
      dataCase="sage"
      eyebrow="WORKING SYSTEM · USER INPUT + ORCHESTRATION"
      headline={
        <>
          <span className="italic" style={{ color: 'var(--case)' }}>It runs.</span>{' '}
          The chat triggers the chain.
        </>
      }
      subhead="One sentence in. The orchestration log streams routing decisions in real time."
      footerKicker="12a · MOVEMENT 3 · WORKING SYSTEM"
      footerTagline="The next slide reveals the computed result and audit chain."
      footerSource="Pharazi production deployment · accessed for this seminar · April 2026"
    >
      <div className="grid grid-cols-12 grid-rows-2 gap-3 h-full px-2 pt-2 pb-2 relative">
        {/* TL — User input */}
        <Quadrant area="col-span-6 row-span-1" label="USER INPUT · CHAT" delay={0.5}>
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

        {/* TR — Process log streaming */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="ORCHESTRATION LOG · LIVE"
          delay={0.7}
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
            {PROCESS_LOG.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.18, ease: EASE.expoOut }}
              >
                <span
                  style={{
                    color: i < 3 ? 'var(--case)' : i < 4 ? 'var(--cream-muted)' : 'var(--cream-faint)',
                  }}
                >
                  {line}
                </span>
                {i >= 4 && (
                  <motion.span
                    aria-hidden
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ marginLeft: 6, color: 'var(--cream-faint)' }}
                  >
                    ▌
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </Quadrant>

        {/* BL — NCA placeholder */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="NCA PARAMETERS · COMPUTING…"
          delay={1.1}
        >
          <Placeholder text="COMPUTING NCA · LINEAR-UP/LOG-DOWN · 0–24h" />
        </Quadrant>

        {/* BR — Audit placeholder */}
        <Quadrant
          area="col-span-6 row-span-1"
          label="AUDIT CHAIN · ANCHORING…"
          delay={1.3}
        >
          <Placeholder text="AUDIT CHAIN FORMING · NEXT BLOCK PENDING" />
        </Quadrant>

        {/* Floating LIVE badge — shared layoutId for Magic Move */}
        <motion.div
          layoutId="live-badge"
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, ...SPRING.cushiony }}
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

function Placeholder({ text }: { text: string }) {
  return (
    <div
      className="h-full flex items-center justify-center deck-mono uppercase relative overflow-hidden"
      style={{
        background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
        border: '1px dashed color-mix(in srgb, var(--cream) 16%, transparent)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.62rem',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--cream-faint)',
      }}
    >
      {/* Shimmer wash */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--case) 8%, transparent), transparent)',
        }}
      />
      <span className="relative z-[1]">{text}</span>
    </div>
  );
}
