// @ts-nocheck
/**
 * CS4 · working-system overview — local paper-editorial wrapper.
 * Destubbed from pharos-seminar 12a so Xencor polish does not mutate that deck.
 */
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.2, 0.7, 0.3, 1];

const PROCESS_LOG = [
  '→ Complexity: MODERATE',
  '→ Routing: non_model_manager',
  '→ Delegating: nca_expert',
  '→ Tools: calculate_nca, plot_pk_profile, compute_t_half',
  '→ QC review: PENDING',
  '→ Audit chain: ANCHORING…',
];

export default function Cs4WorkingOverview() {
  const reduced = useReducedMotion();
  const d = (ms) => (reduced ? 0 : Math.min(ms, 0.35));

  return (
    <SlideFrame
      dataCase="sage"
      eyebrow="Case 04 · Working system"
      headline={
        <>
          <span className="italic" style={{ color: 'var(--case)' }}>It runs.</span>{' '}
          The chat triggers the chain.
        </>
      }
      subhead="One sentence in. The orchestration log streams routing decisions — personal research, not a sponsor deployment."
      footerKicker="AI / Pharazi · working system"
      footerTagline="Personal research into audit-ready clin pharm workflows."
      footerSource="Pharazi working system · personal research · April 2026"
    >
      <div className="grid grid-cols-12 grid-rows-2 gap-3 h-full px-2 pt-2 pb-2 relative">
        <Quadrant area="col-span-6 row-span-1" label="USER INPUT · CHAT" delay={d(0.12)} reduced={reduced}>
          <div
            className="px-4 py-3 deck-body h-full"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--sage)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.95rem',
              color: 'var(--cream)',
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: 'var(--cream-faint)' }}>user@org · 14:02 · </span>
            &quot;Run NCA on my dataset, 0–24h, linear-up/log-down. Stratify by formulation.&quot;
          </div>
        </Quadrant>

        <Quadrant
          area="col-span-6 row-span-1"
          label="ORCHESTRATION LOG · LIVE"
          delay={d(0.18)}
          tone="case"
          reduced={reduced}
        >
          <div
            className="px-4 py-3 deck-mono h-full"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--case)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              lineHeight: 1.55,
              color: 'var(--cream)',
            }}
          >
            {PROCESS_LOG.map((line, i) => (
              <motion.div
                key={line}
                initial={reduced ? false : { opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reduced ? 0 : 0.3, delay: d(0.2 + i * 0.04), ease: EASE }}
              >
                <span
                  style={{
                    color: i < 3 ? 'var(--case)' : i < 4 ? 'var(--cream-muted)' : 'var(--cream-faint)',
                  }}
                >
                  {line}
                </span>
              </motion.div>
            ))}
          </div>
        </Quadrant>

        <Quadrant
          area="col-span-6 row-span-1"
          label="NCA PARAMETERS · PENDING"
          delay={d(0.24)}
          reduced={reduced}
        >
          <Placeholder text="COMPUTING NCA · LINEAR-UP/LOG-DOWN · 0–24h" />
        </Quadrant>

        <Quadrant
          area="col-span-6 row-span-1"
          label="AUDIT CHAIN · PENDING"
          delay={d(0.28)}
          reduced={reduced}
        >
          <Placeholder text="AUDIT CHAIN FORMING · NEXT BLOCK PENDING" />
        </Quadrant>

        <div
          className="absolute top-3 right-3 deck-mono uppercase z-10 flex items-center gap-2 px-3 py-1.5"
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--cream-hairline)',
            borderTop: '2px solid var(--case)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.65rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case)',
          }}
        >
          <span
            aria-hidden
            style={{
              width: 7,
              height: 7,
              background: 'var(--case)',
              borderRadius: '50%',
              display: 'inline-block',
            }}
          />
          WORKING SYSTEM · LIVE
        </div>
      </div>
    </SlideFrame>
  );
}

function Quadrant({ area, label, delay, tone, children, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, delay, ease: EASE }}
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

function Placeholder({ text }) {
  return (
    <div
      className="h-full flex items-center justify-center deck-mono uppercase"
      style={{
        background: 'var(--panel)',
        border: '1px dashed var(--cream-hairline)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.62rem',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--cream-faint)',
      }}
    >
      <span>{text}</span>
    </div>
  );
}
