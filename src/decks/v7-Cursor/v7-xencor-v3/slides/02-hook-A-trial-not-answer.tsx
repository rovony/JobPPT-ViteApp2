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
 * Body: flow column (not absolute %) — thesis + DecisionStepFlow.
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
      <div ref={ref} className="relative h-full w-full xc-min0 xc-clip-none">
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

        <div className="xc-hook-body">
          <motion.div className="shrink-0" {...fade(0.1)}>
            <div
              className="xc-tag"
              style={{
                color: 'var(--cream-muted)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.08em',
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

          <div className="xc-min0" style={{ flex: '0 1 auto' }}>
            <motion.h1
              className="xc-hook"
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 0.7, 0.2, 1] }}
            >
              My work has been a sequence of{' '}
              <em className="xc-em" style={{ fontStyle: 'italic', fontWeight: 500 }}>
                decisions
              </em>
              , not a sequence of models
            </motion.h1>

            <motion.p
              className="xc-lead"
              style={{
                marginTop: 'var(--space-4)',
              }}
              {...fade(0.55)}
            >
              The method changed every time. The order did not.
            </motion.p>
          </div>

          <motion.div
            className="xc-stack-fill__grow xc-min0"
            style={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}
            {...fade(0.85)}
          >
            <DecisionStepFlow go={go} style={{ width: '100%', alignSelf: 'flex-end' }} />
          </motion.div>
        </div>
      </div>
    </TitleLayout>
  );
}
