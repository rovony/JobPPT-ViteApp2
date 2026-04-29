// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';

/**
 * M15Anchor — top regulatory anchor band for CS4 · S4 · Why now.
 *
 * Layout: full-width amber mono uppercase band with hairline rules above
 * and below. Two anchored phrases ("Step 4 adopted 29 Jan 2026" and "EU
 * effective 23 Jul 2026"); the digits in each date use IntegerTicker so
 * the slide's reveal feels like a regulatory clock landing.
 *
 * The component is presentational only — slide owns timing.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function M15Anchor({ go = true, delay = 0.6 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        width: '100%',
        padding: 'clamp(var(--space-3), 1.6vh, var(--space-5)) clamp(var(--space-4), 2vw, var(--space-7))',
        borderTop: '1px solid color-mix(in srgb, var(--amber) 60%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--amber) 60%, transparent)',
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--amber) 10%, transparent), color-mix(in srgb, var(--panel) 70%, transparent))',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
        alignItems: 'baseline',
        justifyContent: 'center',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          color: 'var(--amber)',
          fontSize: 'clamp(0.85rem, min(1.15vw, 1.85vh), 1.3rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 800,
        }}
      >
        ICH M15
      </span>
      <Sep />
      <span
        className="deck-mono uppercase"
        style={{
          color: 'var(--cream)',
          fontSize: 'clamp(0.78rem, min(1.05vw, 1.7vh), 1.15rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        Step 4 adopted{' '}
        <IntegerTicker from={0} to={29} duration={0.8} delay={delay + 0.4} go={go} /> Jan{' '}
        <IntegerTicker from={2020} to={2026} duration={0.9} delay={delay + 0.55} go={go} />
      </span>
      <Sep />
      <span
        className="deck-mono uppercase"
        style={{
          color: 'var(--cream)',
          fontSize: 'clamp(0.78rem, min(1.05vw, 1.7vh), 1.15rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        EU effective{' '}
        <IntegerTicker from={0} to={23} duration={0.8} delay={delay + 0.75} go={go} /> Jul{' '}
        <IntegerTicker from={2020} to={2026} duration={0.9} delay={delay + 0.9} go={go} />
      </span>
    </motion.div>
  );
}

function Sep() {
  return (
    <span
      aria-hidden
      className="deck-mono"
      style={{
        color: 'color-mix(in srgb, var(--amber) 70%, transparent)',
        fontSize: 'clamp(0.78rem, min(1.05vw, 1.7vh), 1.15rem)',
        opacity: 0.85,
      }}
    >
      ·
    </span>
  );
}
