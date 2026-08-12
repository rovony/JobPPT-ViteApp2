// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import TitleLayout from '@/components/deck/layouts/TitleLayout';
import XencorWordmark from '../components/XencorWordmark';
import DecisionStepFlow from '../components/DecisionStepFlow';

/**
 * 02-hook-A — Throughline: decisions, not models. (~75 sec)
 *
 * Chrome: OPEN · 02 + Xencor wordmark (TitleLayout).
 * Body: thesis + subtitle + 4-step DecisionStepFlow
 * (Define → Challenge → Test → Act).
 *
 * Theme: --cream / --panel / case accents (light + dark via deck-root).
 */

export default function HookATrialNotAnswer({ deck }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const go = isInView && !prefersReduced;

  const fade = (delay) => ({
    initial: { opacity: 0 },
    animate: go ? { opacity: 1 } : { opacity: 1 },
    transition: { duration: 0.55, delay, ease: [0.2, 0.7, 0.3, 1] },
  });

  return (
    <TitleLayout deck={deck}>
      {/* slide purpose: throughline hook · duration: 75 sec · prev: title · next: roadmap */}
      <div
        ref={ref}
        className="relative h-full w-full"
        style={{ overflow: 'hidden' }}
      >
        <div
          className="absolute z-[2] pointer-events-none"
          style={{
            top: 'calc(var(--deck-pad-top) + var(--space-3))',
            right: 'calc(var(--deck-gutter) + var(--space-3))',
          }}
        >
          <XencorWordmark
            layoutId="xencor-wordmark"
            persistent
            go={go}
            color="var(--cream-muted)"
            width="clamp(220px, 22vw, 360px)"
            restOpacity={0.82}
          />
        </div>

        {/* Chapter mark */}
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0 }}
          {...fade(0.1)}
        >
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: '0.08em',
              color: 'var(--cream-muted)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            OPEN · 02
          </div>
          <div
            aria-hidden
            style={{
              width: 64,
              height: 'var(--stroke-hair)',
              background: 'var(--cream-faint)',
              marginTop: 'var(--space-2)',
            }}
          />
        </motion.div>

        {/* Thesis band — lifted so the 4-step flow sits cleanly below */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(18%, 22%, 26%)',
            left: 'clamp(var(--space-4), 10%, 10%)',
            right: 'clamp(var(--space-4), 8%, 10%)',
            bottom: 'clamp(var(--space-6), 6%, 8%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 'clamp(var(--space-5), 3.5vh, var(--space-8))',
          }}
        >
          <div>
            <motion.h1
              className="deck-display"
              style={{
                fontSize: 'clamp(1.85rem, min(3.4vw, 5.2vh), 3.05rem)',
                lineHeight: 1.12,
                fontWeight: 'var(--fw-display-md)',
                color: 'var(--cream)',
                letterSpacing: '-0.015em',
                margin: 0,
                maxWidth: '22ch',
              }}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 0.7, 0.2, 1] }}
            >
              My work has been a sequence of{' '}
              <em
                style={{
                  color: 'var(--amber)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                decisions
              </em>
              , not a sequence of models
            </motion.h1>

            <motion.p
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-lead)',
                color: 'color-mix(in srgb, var(--amber) 78%, var(--cream))',
                lineHeight: 1.4,
                margin: 0,
                marginTop: 'var(--space-4)',
                maxWidth: '40ch',
              }}
              {...fade(0.55)}
            >
              The method changed every time. The order did not.
            </motion.p>
          </div>

          <motion.div {...fade(0.85)} style={{ width: '100%' }}>
            <DecisionStepFlow go={go} />
          </motion.div>

          {/* Placeholder for unfinished “and below …” content from user */}
          <div
            aria-hidden
            data-placeholder="below-flow"
            style={{
              minHeight: 0,
              flex: '0 0 auto',
            }}
          />
        </div>
      </div>
    </TitleLayout>
  );
}
