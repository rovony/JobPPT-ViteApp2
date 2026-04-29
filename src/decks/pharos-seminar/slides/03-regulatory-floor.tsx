import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import FaintWorldMap from '../components/backgrounds/FaintWorldMap';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';
import { EASE } from '../motion';

/**
 * Slide 03 — "The regulatory floor is set"
 *
 * Patterns: A1 + B1 + 3-col timeline (D5-style fact register) +
 * C7 IntegerTicker on the day numbers + C2 staggered cascade per column +
 * B3 Hairline rules between columns.
 */
type Pillar = {
  agency: string;
  date: { day: number; monthYear: string };
  metric?: { value: number; label: string };
  scope: string;
  desc: string;
};

const PILLARS: Pillar[] = [
  {
    agency: 'FDA · DRAFT GUIDANCE',
    date: { day: 6, monthYear: 'Jan 2025' },
    metric: { value: 7, label: 'STEP RISK FRAMEWORK' },
    scope: 'AI in regulatory submissions',
    desc: 'Risk-based credibility framework establishing how AI/ML evidence is reviewed.',
  },
  {
    agency: 'FDA · EMA JOINT PRINCIPLES',
    date: { day: 14, monthYear: 'Jan 2026' },
    metric: { value: 10, label: 'GUIDING PRINCIPLES' },
    scope: 'Cross-jurisdictional · binding',
    desc: 'Underpins every future AI guidance in the U.S. and EU.',
  },
  {
    agency: 'ICH · M15',
    date: { day: 29, monthYear: 'Jan 2026' },
    metric: { value: 4, label: 'STEP 4 ADOPTION' },
    scope: 'EU effective 23 Jul 2026',
    desc: 'AI/ML covered alongside PopPK, PBPK, and QSP as legitimate MIDD methodologies.',
  },
];

export default function RegulatoryFloorSlide() {
  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="FORCING FUNCTION · REGULATORY"
      headline={
        <>
          The regulatory floor is{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>set</span>
        </>
      }
      subhead="Three guidances. Three jurisdictions. An eighteen-month enforcement window."
      footerKicker="03 · MOVEMENT 1 · VISION"
      footerTagline="Compliance is no longer optional infrastructure."
      footerSource="Source · ICH database · FDA.gov · EMA.europa.eu · accessed Apr 2026"
    >
      <FaintWorldMap opacity={0.04} highlightOpacity={0.08} cascade />

      <div className="grid grid-cols-3 gap-0 h-full px-2 pt-4 pb-6 relative z-10">
        {PILLARS.map((p, i) => (
          <PillarColumn key={p.agency} pillar={p} index={i} isLast={i === PILLARS.length - 1} />
        ))}
      </div>

      <TakeHomeStrip
        text="Three regulators. Three jurisdictions. Eighteen-month enforcement window."
        caseColor="amber"
        delay={2.8}
      />
    </SlideFrame>
  );
}

function PillarColumn({
  pillar,
  index,
  isLast,
}: {
  pillar: Pillar;
  index: number;
  isLast: boolean;
}) {
  const baseDelay = 0.65 + index * 0.2;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: baseDelay, ease: EASE.expoOut }}
      className="relative flex flex-col gap-6 px-8 py-4"
      style={{
        borderRight: isLast ? 'none' : '1px solid var(--cream-hairline)',
      }}
    >
      {/* B3 Hairline rule under the agency badge */}
      <div className="flex flex-col gap-3">
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.7rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case)',
          }}
        >
          {pillar.agency}
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: baseDelay + 0.2, ease: EASE.expoOut }}
          className="origin-left h-px"
          style={{ background: 'var(--case)', width: '48px' }}
        />
      </div>

      {/* Big day number with ticker */}
      <div className="flex items-baseline gap-3">
        <div
          className="deck-display leading-none"
          style={{
            fontSize: 'clamp(4.5rem, 7vw, 7rem)',
            color: 'var(--cream)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
          }}
        >
          <IntegerTicker from={0} to={pillar.date.day} duration={1.2} delay={baseDelay + 0.1} />
        </div>
        <div className="flex flex-col gap-1">
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.7rem',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-muted)',
            }}
          >
            {pillar.date.monthYear}
          </span>
        </div>
      </div>

      {/* Stat pill */}
      {pillar.metric && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: baseDelay + 0.4 }}
          className="inline-flex items-center gap-3 self-start px-4 py-2"
          style={{
            background: 'color-mix(in srgb, var(--case) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--case) 22%, transparent)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <span
            className="deck-display"
            style={{
              fontSize: '1.5rem',
              color: 'var(--case)',
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            <IntegerTicker
              from={0}
              to={pillar.metric.value}
              duration={1.0}
              delay={baseDelay + 0.5}
            />
          </span>
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.62rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
              lineHeight: 1.2,
            }}
          >
            {pillar.metric.label}
          </span>
        </motion.div>
      )}

      {/* Scope label */}
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.7rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
        }}
      >
        {pillar.scope}
      </div>

      {/* Description */}
      <p
        className="deck-body"
        style={{
          margin: 0,
          fontSize: '1.05rem',
          lineHeight: 1.55,
          color: 'var(--cream)',
          maxWidth: '36ch',
        }}
      >
        {pillar.desc}
      </p>
    </motion.div>
  );
}
