// @ts-nocheck
import React, { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import WithWithoutPair from '@/components/deck/WithWithoutPair';
import SubstrateMap, { type ComponentId } from './SubstrateMap';
import { EASE } from '../motion';

/**
 * ComponentCard — shared layout for the Movement-3 component tour
 * (Amendment 2). Wraps SlideFrame, places the bespoke SVG animation
 * in the left 70% of the viz area, the SubstrateMap in the right 30%,
 * and a per-card Take-Home strip at the bottom of the viz.
 *
 * The five card slides (13–17) each pass:
 *   - dataCase  ('sage' | 'violet' | 'cyan' | 'cyan' | 'amber')
 *   - componentNumber (1–5)
 *   - domainEyebrow ("CLINICAL PHARMACOLOGY" / "ORCHESTRATION" / etc.)
 *   - headline + headlineAccent (italic word)
 *   - subhead
 *   - takeHomeText
 *   - activeId — which cell glows in the SubstrateMap
 *   - children — the bespoke SVG animation (left 70%)
 *
 * Total entrance choreography is bounded to ≤ 2.6s so the speaker can
 * step into the slide and start narrating immediately. Reduced-motion
 * fallback: opacity-only entrances for all chrome; SVG hero pauses at
 * its final state (handled per-slide).
 */

type Props = {
  dataCase: 'sage' | 'violet' | 'cyan' | 'amber' | 'coral';
  componentNumber: 1 | 2 | 3 | 4 | 5;
  domainEyebrow: string;
  headline: ReactNode;
  subhead: string;
  takeHomeText: string;
  activeId: ComponentId;
  footerKicker?: string;
  footerSource?: string;
  /** Optional A3 §3.3 With/Without pair — renders below the 70/30 grid. */
  withoutText?: string;
  withText?: string;
  children: ReactNode;
};

export default function ComponentCard({
  dataCase,
  componentNumber,
  domainEyebrow,
  headline,
  subhead,
  takeHomeText,
  activeId,
  footerKicker,
  footerSource,
  withoutText,
  withText,
  children,
}: Props) {
  const reduced = useReducedMotion();
  const eyebrow = `COMPONENT ${componentNumber} / 5 · ${domainEyebrow}`;
  const kicker =
    footerKicker ?? `${String(12 + componentNumber).padStart(2, '0')} · COMPONENT ${componentNumber} OF 5`;

  return (
    <SlideFrame
      dataCase={dataCase}
      eyebrow={eyebrow}
      headline={headline}
      subhead={subhead}
      footerKicker={kicker}
      footerTagline="The foundation is composed of named components."
      footerSource={footerSource}
    >
      {/* Viz area: 70/30 split + bottom take-home strip */}
      <div className="grid grid-cols-12 gap-6 h-full" style={{ minHeight: 0 }}>
        {/* LEFT — bespoke SVG animation */}
        <div
          className="col-span-8 relative flex flex-col"
          style={{ minHeight: 0 }}
        >
          <motion.div
            className="relative flex-1"
            style={{ minHeight: 0 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: reduced ? 0 : 0.55,
              ease: EASE.expoOut,
            }}
          >
            {children}
          </motion.div>

          {/* TAKE-HOME STRIP */}
          <motion.div
            className="mt-4"
            style={{
              padding: '14px 20px',
              borderRadius: '0 8px 8px 0',
              borderLeft: '4px solid var(--case)',
              borderTop: '1px solid color-mix(in srgb, var(--cream) 8%, transparent)',
              borderRight: '1px solid color-mix(in srgb, var(--cream) 8%, transparent)',
              borderBottom: '1px solid color-mix(in srgb, var(--cream) 8%, transparent)',
              background:
                'linear-gradient(90deg, color-mix(in srgb, var(--case) 8%, transparent) 0%, color-mix(in srgb, var(--panel) 28%, transparent) 100%)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: reduced ? 0 : 1.9,
              ease: EASE.expoOut,
            }}
            aria-label={`Take-home: ${takeHomeText}`}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: '0.62rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
                marginBottom: 4,
              }}
            >
              TAKE HOME
            </div>
            <div
              className="deck-display"
              style={{
                fontSize: 'clamp(0.95rem, 1.25vw, 1.2rem)',
                lineHeight: 1.3,
                color: 'var(--cream)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              {takeHomeText}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Substrate Map mini-diagram */}
        <div
          className="col-span-4 relative"
          style={{
            minHeight: 0,
            paddingLeft: 20,
            borderLeft: '1px solid color-mix(in srgb, var(--cream) 6%, transparent)',
          }}
        >
          <SubstrateMap activeId={activeId} delayBase={0.7} />
        </div>
      </div>

      {withoutText && withText ? (
        <WithWithoutPair
          withoutText={withoutText}
          withText={withText}
          delay={2.4}
        />
      ) : null}
    </SlideFrame>
  );
}
