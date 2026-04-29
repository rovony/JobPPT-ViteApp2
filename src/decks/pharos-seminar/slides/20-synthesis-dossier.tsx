import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import LiveAuditChain from '../components/LiveAuditChain';
import { EASE, SPRING } from '../motion';

/**
 * Slide 20 — Synthesis · INTERACTIVE DOSSIER (sage).
 *
 * Inspired by qp2-seminar-v4 cs3-06b-interactive-dossier but rebuilt with
 * Pharos vocabulary, better UI/UX, and ALL five components in one view.
 * Three panes:
 *
 *   LEFT (nav rail)  : 5 component chips (Hierarchy · Privacy Wall · NCA
 *                      · Audit Chain · Marketplace SOP) with active dot
 *                      and case-color rotation per selection.
 *   CENTER (detail)  : Selected component's deep dive — narrative + key
 *                      metric tile + mini-viz; smooth crossfade on switch.
 *   RIGHT (audit rail): LiveAuditChain in static mode showing the same
 *                      root anchor across all selections + status counters.
 *
 * Keyboard: ← / → step components. Auto-advances every ~6s if no input.
 * Reduced-motion: shows all five summaries stacked statically, no auto.
 *
 * Per Amendment 2: third-person voice, work-as-subject. Per Amendment 5:
 * vocabulary uses "foundation" / "Pharazi" / "framework" — never "platform".
 */

type CaseColor = 'amber' | 'cyan' | 'sage' | 'violet' | 'coral';

type Component = {
  id: string;
  num: string;
  title: string;
  tag: string;
  caseColor: CaseColor;
  metric: { value: string; unit: string; label: string };
  narrative: string;
  withoutText: string;
  withText: string;
};

const COMPONENTS: Component[] = [
  {
    id: 'hierarchy',
    num: '01',
    title: 'Centralized Hierarchy',
    tag: 'NON-MODEL MANAGER · ROUTER',
    caseColor: 'amber',
    metric: { value: '3.2s', unit: 'AVG', label: 'ROUTING DECISION' },
    narrative:
      'A single router examines complexity, intent, and data shape. It hands off to the correct domain expert (NCA, PopPK, PKPD). No agent talks directly to another agent. This is how the chain stays auditable.',
    withoutText: 'Free-form A2A · routing drift · no QC handoff vote',
    withText: 'Single router · structural · 3-of-3 vote at every gate',
  },
  {
    id: 'privacy',
    num: '02',
    title: 'Privacy Wall',
    tag: 'STRUCTURAL FIREWALL · SCHEMA-ONLY',
    caseColor: 'cyan',
    metric: { value: '0', unit: 'BYTES', label: 'PHI TO LLM' },
    narrative:
      'PHI never crosses the language model boundary. Schemas (column types, units, ranges) cross. Hashes return. This is the only privacy guarantee that survives a hostile LLM provider.',
    withoutText: 'PHI in prompt logs · BAA gymnastics · vendor lock',
    withText: 'Schema in · hash out · provider-neutral by construction',
  },
  {
    id: 'nca',
    num: '03',
    title: 'NCA Computation',
    tag: 'DETERMINISTIC TOOL · LINEAR-UP/LOG-DOWN',
    caseColor: 'sage',
    metric: { value: '6/6', unit: 'PARAMS', label: 'COMPUTED' },
    narrative:
      'AUC, Cmax, Tmax, t½, CL/F, Vd/F — all six NCA params via deterministic numerical routine, never via LLM hallucination. The LLM picks the method. The tool runs the math. The chain anchors both.',
    withoutText: 'LLM math · drift on rerun · no version pin',
    withText: 'Tool runs math · deterministic · pinned to sop.nca_v1_2',
  },
  {
    id: 'audit',
    num: '04',
    title: 'Audit Chain',
    tag: 'CRYPTOGRAPHIC LINEAGE · SHA-256',
    caseColor: 'violet',
    metric: { value: '100%', unit: 'BLOCKS', label: 'VERIFY: TRUE' },
    narrative:
      'Every state write, every tool call, every QC vote, every report emit gets a hash. The chain links them. An inspector verifies a number to its raw lab sample without leaving the chain.',
    withoutText: 'Logs · grep-only · timestamps trustless',
    withText: 'Hash chain · structurally tamper-evident · M15-aligned',
  },
  {
    id: 'sop',
    num: '05',
    title: 'Marketplace SOP',
    tag: 'VERSIONED PLANS · SOP REGISTRY',
    caseColor: 'coral',
    metric: { value: '47', unit: 'SOPs', label: 'REGISTERED' },
    narrative:
      'Every analytical plan is a versioned, signed SOP. Adding a new domain expert means registering its SOPs against the registry — never rebuilding the foundation. Forty-seven SOPs span NCA, PopPK, PKPD, E-R, and QC.',
    withoutText: 'Tribal SOPs · email PDFs · no diff history',
    withText: 'Git-style registry · signed · diff-able across versions',
  },
];

export default function SynthesisDossierSlide() {
  const [active, setActive] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  const cur = COMPONENTS[active];

  // Auto-advance every 6s while not interacted
  React.useEffect(() => {
    if (reduced || !inView || !autoAdvance) return;
    const t = window.setTimeout(() => {
      setActive((i) => (i + 1) % COMPONENTS.length);
    }, 6000);
    return () => window.clearTimeout(t);
  }, [active, autoAdvance, reduced, inView]);

  // Keyboard nav
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight' || e.code === 'Space') {
        e.preventDefault();
        setAutoAdvance(false);
        setActive((i) => (i + 1) % COMPONENTS.length);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setAutoAdvance(false);
        setActive((i) => (i - 1 + COMPONENTS.length) % COMPONENTS.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <SlideFrame
      dataCase={cur.caseColor}
      eyebrow="SYNTHESIS · INTERACTIVE DOSSIER · ALL 5 COMPONENTS"
      headline={
        <>
          The foundation,{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>composed.</span>
        </>
      }
      subhead="One router. One firewall. One chain. One registry. Five components — all anchored to the same root."
      footerKicker="20 · MOVEMENT 3 · SYNTHESIS DOSSIER"
      footerTagline="Use ← / → to step. Auto-advances every 6 s. The audit chain stays still."
      footerSource="Pharazi reference architecture · interactive build · April 2026"
    >
      <div ref={ref} className="grid grid-cols-12 gap-3 h-full px-2 pt-2 pb-2 min-h-0">
        {/* LEFT — Nav rail */}
        <div className="col-span-3 flex flex-col gap-2 min-h-0">
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.6rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            COMPONENTS · {String(active + 1).padStart(2, '0')} / 05
          </span>
          <div className="flex-1 min-h-0 flex flex-col gap-1.5">
            {COMPONENTS.map((c, i) => (
              <NavChip
                key={c.id}
                num={c.num}
                title={c.title}
                tag={c.tag}
                active={i === active}
                onClick={() => {
                  setAutoAdvance(false);
                  setActive(i);
                }}
                delay={0.3 + i * 0.06}
              />
            ))}
          </div>
        </div>

        {/* CENTER — Detail pane */}
        <div className="col-span-6 flex flex-col gap-2 min-h-0">
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.6rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case)',
            }}
          >
            DETAIL · {cur.tag}
          </span>
          <div
            className="flex-1 min-h-0 p-5 flex flex-col gap-4 relative overflow-hidden"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE.expoOut }}
                className="flex flex-col gap-4 h-full"
              >
                {/* Title row */}
                <div className="flex items-baseline justify-between">
                  <h2
                    className="deck-display"
                    style={{
                      margin: 0,
                      fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                      color: 'var(--cream)',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.05,
                    }}
                  >
                    <span style={{ color: 'var(--case)' }}>{cur.num}</span>{' '}
                    <span className="italic">{cur.title}</span>
                  </h2>
                </div>

                {/* Metric tile */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex flex-col items-center justify-center px-5 py-3"
                    style={{
                      background:
                        'color-mix(in srgb, var(--case) 14%, transparent)',
                      border: '1px solid var(--case)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow:
                        '0 0 24px color-mix(in srgb, var(--case) 28%, transparent)',
                      minWidth: 130,
                    }}
                  >
                    <span
                      className="deck-display"
                      style={{
                        fontSize: '2.2rem',
                        color: 'var(--case)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                      }}
                    >
                      {cur.metric.value}
                    </span>
                    <span
                      className="deck-mono uppercase"
                      style={{
                        fontSize: '0.55rem',
                        letterSpacing: 'var(--ls-mono-wide)',
                        color: 'var(--case)',
                      }}
                    >
                      {cur.metric.unit}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span
                      className="deck-mono uppercase"
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: 'var(--ls-mono-wide)',
                        color: 'var(--cream-faint)',
                      }}
                    >
                      {cur.metric.label}
                    </span>
                    <span
                      className="deck-body"
                      style={{
                        fontSize: '0.95rem',
                        color: 'var(--cream)',
                        lineHeight: 1.4,
                      }}
                    >
                      {cur.narrative}
                    </span>
                  </div>
                </div>

                {/* With/Without strip */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <WithoutCard text={cur.withoutText} />
                  <WithCard text={cur.withText} caseColor={cur.caseColor} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — Audit + status rail */}
        <div className="col-span-3 flex flex-col gap-2 min-h-0">
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.6rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            ANCHOR · ROOT HASH
          </span>
          <div
            className="flex flex-col gap-2 p-3 min-h-0"
            style={{
              background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <LiveAuditChain mode="static" height={120} showCounter={false} />
            <div className="flex flex-col gap-1.5 mt-2 pt-3" style={{ borderTop: '1px solid var(--cream-hairline)' }}>
              <StatusRow label="ROOT" value="0x4f3a8e91" tone="case" />
              <StatusRow label="LINKS" value="5 / 5 verified" tone="cream" />
              <StatusRow label="DRIFT" value="0 detected" tone="cream" />
              <StatusRow label="M15" value="aligned" tone="case" />
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function NavChip({
  num,
  title,
  tag,
  active,
  onClick,
  delay,
}: {
  num: string;
  title: string;
  tag: string;
  active: boolean;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE.expoOut }}
      onClick={onClick}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      className="text-left flex items-center gap-3 px-3 py-2.5 transition-colors"
      style={{
        background: active
          ? 'color-mix(in srgb, var(--case) 14%, transparent)'
          : 'color-mix(in srgb, var(--cream) 3%, transparent)',
        border: active ? '1px solid var(--case)' : '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        boxShadow: active
          ? '0 0 18px color-mix(in srgb, var(--case) 28%, transparent)'
          : 'none',
      }}
    >
      <motion.span
        animate={{
          scale: active ? [1, 1.4, 1] : 1,
        }}
        transition={{
          duration: 1.6,
          repeat: active ? Infinity : 0,
          ease: 'easeInOut',
        }}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: active ? 'var(--case)' : 'color-mix(in srgb, var(--cream) 22%, transparent)',
          boxShadow: active ? '0 0 8px var(--case)' : 'none',
        }}
      />
      <span
        className="deck-mono"
        style={{
          fontSize: '0.7rem',
          color: active ? 'var(--case)' : 'var(--cream-faint)',
          fontWeight: 700,
        }}
      >
        {num}
      </span>
      <div className="flex flex-col gap-0 min-w-0 flex-1">
        <span
          className="deck-display truncate"
          style={{
            fontSize: '0.85rem',
            color: 'var(--cream)',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            lineHeight: 1.15,
          }}
        >
          {title}
        </span>
        <span
          className="deck-mono uppercase truncate"
          style={{
            fontSize: '0.52rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
          }}
        >
          {tag}
        </span>
      </div>
    </motion.button>
  );
}

function WithoutCard({ text }: { text: string }) {
  return (
    <div
      className="px-3 py-2.5 flex flex-col gap-1"
      style={{
        background: 'color-mix(in srgb, var(--cream) 4%, transparent)',
        border: '1px solid color-mix(in srgb, var(--cream) 12%, transparent)',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.55rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}
      >
        WITHOUT FOUNDATION
      </span>
      <span
        className="deck-body"
        style={{
          fontSize: '0.78rem',
          color: 'var(--cream-muted)',
          lineHeight: 1.35,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function WithCard({ text, caseColor }: { text: string; caseColor: CaseColor }) {
  return (
    <div
      className="px-3 py-2.5 flex flex-col gap-1"
      style={{
        background: 'color-mix(in srgb, var(--case) 10%, transparent)',
        border: '1px solid var(--case)',
        borderRadius: 'var(--radius-sm)',
        boxShadow: '0 0 16px color-mix(in srgb, var(--case) 22%, transparent)',
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
        WITH PHARAZI
      </span>
      <span
        className="deck-body"
        style={{
          fontSize: '0.78rem',
          color: 'var(--cream)',
          lineHeight: 1.35,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function StatusRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'case' | 'cream';
}) {
  return (
    <div className="flex items-center justify-between deck-mono">
      <span
        className="uppercase"
        style={{
          fontSize: '0.55rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '0.7rem',
          color: tone === 'case' ? 'var(--case)' : 'var(--cream)',
          letterSpacing: 'var(--ls-mono)',
          fontWeight: tone === 'case' ? 700 : 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}
