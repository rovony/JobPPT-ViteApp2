import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import { EASE, SPRING } from '../motion';

/**
 * Slide 11 — KILLER · Principle 5 · Orthogonal capability layering (violet).
 *
 * E1 Cinematic Stepper · 3-phase additive reveal:
 *   Phase 1 → 5 expert boxes pointing into the SHARED INFRASTRUCTURE band
 *   Phase 2 → 4 NEW boxes (with "NEW" badge + violet glow) ADDED above
 *   Phase 3 → 4 MORE boxes ADDED — shared band never changes
 * Final → "THE SHARED LAYER NEVER CHANGES." overlay.
 *
 * Auto-advance with stage timing, plus keyboard 'Space' / 'ArrowRight' to
 * step manually. Reduced-motion: all 3 phases shown statically.
 */

const SHARED = [
  'Schema Extractor',
  'Audit Chain',
  'QC Debate',
  'Manager Review',
  'Reg RAG',
  'Report Gen',
  'HITL Gate',
  'State Bus',
];

const PHASE1 = ['NCA', 'PopPK', 'PKPD', 'E-R', 'QC'];
const PHASE2 = ['Signal Detection', 'Biomarker', 'MIPD', 'Pharmacogenomics'];
const PHASE3 = ['Trial Design', 'RWE', 'Reg-Author', 'Lifecycle'];

export default function Principle5KillerSlide() {
  const [phase, setPhase] = useState(1);

  // auto-advance up to phase 4 (overlay)
  useEffect(() => {
    if (phase >= 4) return;
    const timing = phase === 1 ? 2200 : phase === 2 ? 1800 : 1600;
    const t = window.setTimeout(() => setPhase((p) => Math.min(p + 1, 4)), timing);
    return () => window.clearTimeout(t);
  }, [phase]);

  // keyboard manual advance
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowRight') {
        e.preventDefault();
        setPhase((p) => Math.min(p + 1, 4));
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setPhase((p) => Math.max(p - 1, 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <SlideFrame
      dataCase="violet"
      eyebrow="PRINCIPLE 5 OF 5 · SCALABILITY · KILLER SLIDE"
      headline={
        <>
          We don't scale by rebuilding. We scale by{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>registering</span>.
        </>
      }
      subhead="Same hierarchy. Same privacy firewall. Same audit chain. Additive only — across every domain."
      footerKicker="11 · MOVEMENT 2 · KILLER SLIDE"
      footerTagline="Build infrastructure once. Multiply experts."
      footerSource="Architectural pattern · derived from microservices/microkernel literature · applied to pharma multi-agent"
    >
      <div className="relative h-full w-full px-2 pt-2 pb-2 flex flex-col gap-3">
        {/* Phase indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((p) => (
              <PhasePill key={p} active={phase >= p} num={p} />
            ))}
          </div>
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.65rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            ← / SPACE → to advance
          </span>
        </div>

        {/* Phase 3 row — top */}
        <ExpertRow
          label="PHASE 3 · Trial design + lifecycle"
          experts={PHASE3}
          visible={phase >= 3}
          tone="case"
          newBadge
        />

        {/* Phase 2 row — middle */}
        <ExpertRow
          label="PHASE 2 · Pharmacovigilance + precision"
          experts={PHASE2}
          visible={phase >= 2}
          tone="case"
          newBadge
        />

        {/* Phase 1 row — anchor */}
        <ExpertRow
          label="PHASE 1 · Clinical pharmacology + pharmacometrics"
          experts={PHASE1}
          visible
          tone="cream"
        />

        {/* Shared infrastructure band */}
        <div className="relative">
          {/* Connecting hairlines from rows above into the band */}
          <SharedBand />
        </div>

        {/* Final overlay */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE.expoOut }}
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{
                background:
                  'radial-gradient(ellipse 70% 50% at 50% 50%, color-mix(in srgb, var(--bg) 92%, transparent), color-mix(in srgb, var(--bg) 70%, transparent) 70%, transparent)',
              }}
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.h2
                  className="deck-display"
                  style={{
                    margin: 0,
                    fontSize: 'clamp(2.5rem, 4.4vw, 4.8rem)',
                    color: 'var(--cream)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                  }}
                  initial={{ y: '40%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE.expoOut }}
                >
                  The shared layer{' '}
                  <span className="italic" style={{ color: 'var(--case)' }}>never changes.</span>
                </motion.h2>
                <motion.p
                  className="deck-mono uppercase"
                  style={{
                    margin: 0,
                    fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--cream-muted)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Only the domain experts multiply.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideFrame>
  );
}

function PhasePill({ active, num }: { active: boolean; num: number }) {
  return (
    <motion.div
      initial={false}
      animate={{
        background: active
          ? 'color-mix(in srgb, var(--case) 22%, transparent)'
          : 'color-mix(in srgb, var(--cream) 4%, transparent)',
        borderColor: active
          ? 'var(--case)'
          : 'color-mix(in srgb, var(--cream) 12%, transparent)',
        color: active ? 'var(--case)' : 'var(--cream-faint)',
      }}
      transition={{ duration: 0.3 }}
      className="deck-mono uppercase px-3 py-1"
      style={{
        border: '1px solid',
        borderRadius: '999px',
        fontSize: '0.65rem',
        letterSpacing: 'var(--ls-mono-wide)',
      }}
    >
      Phase {num}
    </motion.div>
  );
}

function ExpertRow({
  label,
  experts,
  visible,
  tone,
  newBadge,
}: {
  label: string;
  experts: string[];
  visible: boolean;
  tone: 'cream' | 'case';
  newBadge?: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE.expoOut }}
          className="flex flex-col gap-2"
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
          <div className="flex flex-wrap gap-2">
            {experts.map((e, i) => (
              <ExpertBox key={e} name={e} index={i} tone={tone} newBadge={newBadge} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ExpertBox({
  name,
  index,
  tone,
  newBadge,
}: {
  name: string;
  index: number;
  tone: 'cream' | 'case';
  newBadge?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.07, ...(tone === 'case' ? SPRING.cushiony : { duration: 0.5, ease: EASE.expoOut }) }}
      className="relative px-4 py-2.5 deck-mono uppercase"
      style={{
        fontSize: '0.7rem',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--cream)',
        background:
          tone === 'case'
            ? 'color-mix(in srgb, var(--case) 14%, transparent)'
            : 'color-mix(in srgb, var(--cream) 5%, transparent)',
        border: tone === 'case'
          ? '1px solid var(--case)'
          : '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-sm)',
        boxShadow:
          tone === 'case'
            ? '0 0 22px color-mix(in srgb, var(--case) 30%, transparent)'
            : 'none',
      }}
    >
      {name}
      {newBadge && (
        <span
          className="absolute -top-1 -right-1 deck-mono uppercase"
          style={{
            fontSize: '0.5rem',
            letterSpacing: '0.12em',
            background: 'var(--case)',
            color: 'var(--bg)',
            padding: '2px 5px',
            borderRadius: '999px',
            fontWeight: 700,
          }}
        >
          NEW
        </span>
      )}
    </motion.div>
  );
}

function SharedBand() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.6 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: EASE.expoOut }}
      className="relative px-5 py-4 flex flex-col gap-2 overflow-hidden"
      style={{
        background:
          'linear-gradient(90deg, color-mix(in srgb, var(--case) 16%, transparent), color-mix(in srgb, var(--case) 8%, transparent))',
        border: '1px solid var(--case)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 0 60px color-mix(in srgb, var(--case) 25%, transparent)',
      }}
    >
      {/* B8 pulsing glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--case) 35%, transparent), transparent 70%)',
        }}
      />
      <span
        className="deck-mono uppercase relative z-[1]"
        style={{
          fontSize: '0.65rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case)',
        }}
      >
        SHARED INFRASTRUCTURE · BUILT ONCE
      </span>
      <div className="flex flex-wrap gap-x-6 gap-y-1.5 relative z-[1]">
        {SHARED.map((s) => (
          <span
            key={s}
            className="deck-display"
            style={{
              fontSize: '0.95rem',
              color: 'var(--cream)',
              fontWeight: 500,
              letterSpacing: '-0.005em',
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
