import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import AmbientParticles from '../components/backgrounds/AmbientParticles';
import { EASE, SPRING } from '../motion';

/**
 * Slide 08 — Principle 2 · Structural privacy (cyan).
 *
 * 3-band privacy wall diagram (D4 Schematic):
 *   • Top band: LLM CONTEXT (cloud) — sanitized data only
 *   • Middle band: PRIVACY WALL (--case-cyan, hashed) — code-only utility
 *   • Bottom band: COMPUTATION ENGINE (local) — patient data in memory only
 *
 * Patterns used: A1 + B1 + D4 + B7 Glassmorphism on wall label +
 * C8 continuous hash-pattern motion (very subtle, only after entrance).
 */
export default function Principle2Slide() {
  return (
    <SlideFrame
      dataCase="cyan"
      footerKicker="08 · MOVEMENT 2 · PRINCIPLE 2"
      footerSource="21 CFR Part 11 · HIPAA §164.312 · GDPR Art. 32"
    >
      <AmbientParticles density={50} />

      <PrincipleTitleBlock
        counter="PRINCIPLE 2 OF 5 · PRIVACY"
        name="Structural Privacy"
        definition="Privacy is a property of the code, not a runtime policy. Raw data has no callable path to the LLM."
      />

      <div className="flex flex-col gap-3 flex-1 px-2 pb-2 min-h-0 relative">
        {/* TOP BAND — LLM context */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE.expoOut }}
          className="flex items-center justify-between px-8 py-5 relative overflow-hidden"
          style={{
            background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-md)',
            flex: '0 0 28%',
          }}
        >
          <div className="flex flex-col gap-2">
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.7rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
            >
              LLM CONTEXT · CLOUD
            </span>
            <span
              className="deck-display"
              style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                color: 'var(--cream)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              What the model sees
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-right">
            <ListItem ok label="Sanitized schema" delay={1.4} />
            <ListItem ok label="Aggregated results" delay={1.45} />
            <ListItem ok label="Parameter estimates" delay={1.5} />
            <ListItem ok label="Plot specifications" delay={1.55} />
            <ListItem cross label="NO raw patient data" delay={1.65} />
            <ListItem cross label="NO identifiable info" delay={1.7} />
          </div>
        </motion.div>

        {/* MIDDLE — privacy wall */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.6 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.85, ...SPRING.cushiony }}
          className="relative overflow-hidden"
          style={{
            background:
              'repeating-linear-gradient(45deg, color-mix(in srgb, var(--case) 22%, transparent), color-mix(in srgb, var(--case) 22%, transparent) 8px, transparent 8px, transparent 16px), color-mix(in srgb, var(--case) 12%, transparent)',
            border: '1px solid color-mix(in srgb, var(--case) 50%, transparent)',
            borderRadius: 'var(--radius-md)',
            flex: '0 0 18%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* C8 subtle hash slide */}
          <motion.div
            aria-hidden
            initial={{ backgroundPositionX: '0px' }}
            animate={{ backgroundPositionX: '120px' }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 16px, color-mix(in srgb, var(--case) 8%, transparent) 16px, color-mix(in srgb, var(--case) 8%, transparent) 32px)',
            }}
          />
          {/* B7 Glass label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: EASE.expoOut }}
            className="relative z-10 flex flex-col items-center gap-2 px-10 py-4"
            style={{
              background: 'color-mix(in srgb, var(--bg) 78%, transparent)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid color-mix(in srgb, var(--case) 35%, transparent)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.7rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
              }}
            >
              PRIVACY WALL · CODE-ONLY UTILITY
            </span>
            <span
              className="deck-display"
              style={{
                fontSize: 'clamp(1.4rem, 2vw, 1.9rem)',
                color: 'var(--cream)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              Schema Extractor · zero LLM calls
            </span>
          </motion.div>
        </motion.div>

        {/* BOTTOM — computation engine */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: EASE.expoOut }}
          className="flex items-center justify-between px-8 py-5 relative overflow-hidden"
          style={{
            background: 'color-mix(in srgb, var(--panel) 90%, transparent)',
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-md)',
            flex: '1 1 auto',
          }}
        >
          <div className="flex flex-col gap-2">
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.7rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
            >
              COMPUTATION ENGINE · LOCAL
            </span>
            <span
              className="deck-display"
              style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                color: 'var(--cream)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              Where the data lives
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-right">
            <ListItem ok label="Patient data in memory only" delay={1.85} />
            <ListItem ok label="R / Python on real data" delay={1.9} />
            <ListItem ok label="Sandboxed container" delay={1.95} />
            <ListItem ok label="AES-256 at rest" delay={2.0} />
          </div>
        </motion.div>
      </div>

      <WithWithoutPair
        withoutText="Data privacy depends on every agent following policy correctly, every time."
        withText="Data privacy is a property of the code. Cannot be violated by any agent."
        delay={3.0}
      />

      <TakeHomeStrip
        text="Privacy is a property of the code, not a runtime policy."
        subLine="21 CFR Part 11 + HIPAA §164.312 + GDPR Art. 32 — all satisfied structurally."
        caseColor="cyan"
        delay={3.4}
      />
    </SlideFrame>
  );
}

function ListItem({
  ok,
  cross,
  label,
  delay,
}: {
  ok?: boolean;
  cross?: boolean;
  label: string;
  delay: number;
}) {
  const sym = ok ? '✓' : cross ? '✗' : '•';
  const symColor = cross ? 'var(--coral)' : 'var(--case)';
  return (
    <motion.span
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE.expoOut }}
      className="deck-mono uppercase inline-flex items-center justify-end gap-2"
      style={{
        fontSize: '0.7rem',
        letterSpacing: 'var(--ls-mono)',
        color: 'var(--cream)',
      }}
    >
      <span style={{ color: symColor, fontSize: '0.85rem', fontWeight: 700 }}>{sym}</span>
      {label}
    </motion.span>
  );
}
