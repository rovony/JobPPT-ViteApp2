// @ts-nocheck
/**
 * Zone H — Camera 9 · Workflow in action · CINEMATIC 4
 *
 * Co-located with Zone D (same ZONE_BOUNDS coords). At C9, the camera
 * is back at Zone D's frame; this overlay paints ON TOP of the
 * architecture diagram with:
 *
 *   • A particle that traces the workflow path: Analyst → L0 → Data
 *     → NCA → PopPK → (covariate, vpc) → review-gate amber pulse
 *     back to Analyst → Analyst approves → Review → L0 (audit) → done
 *
 *   • Glow rings on each node as the particle arrives
 *
 *   • Bucket-light cascade on the PharmState bus (Dataset → NCA →
 *     Modeling → QC → Audit) as referenced steps fire
 *
 *   • Amber backward pulse on the review-gate edge (PopPK → Analyst)
 *     to signal review fired
 *
 *   • Footer caption: "4–8 weeks → hours · traceability stronger than
 *     the prior pipeline"
 *
 * Driven by C9_TRACE_STEPS in data.ts. A `currentStep` state advances
 * over time when active. Editorial restraint — the particle is small,
 * sage by default, amber for the review-gate step. No celebration.
 */

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ZONE_BOUNDS, C9_TRACE_STEPS } from '../../data';
import { EASE_EDITORIAL, DUR } from '../../themes';
import { useCanvasCamera } from '../CameraController';
import { ARCH_POS, centerOf, BUCKET_BY_ID } from '../architecturePositions';

const Z = ZONE_BOUNDS.H;

// Map trace-step `from`/`to` ids → ARCH_POS keys.
const ID_TO_POS: Record<string, keyof typeof ARCH_POS> = {
  analyst: 'analyst',
  l0: 'l0',
  l1Data: 'l1Data',
  l1Nca: 'l1Nca',
  l1PopPK: 'l1PopPK',
  l1Sim: 'l1Sim',
  l1Review: 'l1Review',
  l2Cov: 'l2Cov',
  l2Vpc: 'l2Vpc',
  l2Design: 'l2Design',
};

function posOf(id: string): { cx: number; cy: number } | null {
  const key = ID_TO_POS[id];
  if (!key) return null;
  return centerOf(ARCH_POS[key]);
}

export default function ZoneHWorkflowOverlay() {
  const { cameraIndex } = useCanvasCamera();
  const reduce = useReducedMotion();
  const active = cameraIndex === 9;
  const [stepIndex, setStepIndex] = useState(-1);

  // Run the trace timeline when at C9.
  useEffect(() => {
    if (!active) {
      setStepIndex(-1);
      return;
    }
    const timers: number[] = [];
    let cumul = 800; // initial delay so the camera arrives first
    setStepIndex(-1);
    timers.push(window.setTimeout(() => setStepIndex(0), cumul));
    C9_TRACE_STEPS.forEach((step, i) => {
      cumul += step.durationS * 1000;
      timers.push(window.setTimeout(() => setStepIndex(i + 1), cumul));
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [active]);

  if (!active) return null;

  // Compute lit nodes + buckets from steps fired so far.
  const stepsFired = C9_TRACE_STEPS.slice(0, Math.max(0, stepIndex + 1));
  const litNodes = new Set<string>();
  const litBuckets = new Set<string>();
  stepsFired.forEach((s) => {
    litNodes.add(s.to);
    if (s.bucketLit) litBuckets.add(s.bucketLit);
  });

  // The current "in-flight" step for the moving particle.
  const liveStep = stepIndex >= 0 && stepIndex < C9_TRACE_STEPS.length
    ? C9_TRACE_STEPS[stepIndex]
    : null;
  const liveFrom = liveStep ? posOf(liveStep.from) : null;
  const liveTo   = liveStep ? posOf(liveStep.to)   : null;

  return (
    <div
      data-zone="H"
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
        pointerEvents: 'none',
        zIndex: 3,
      }}
    >
      {/* Top eyebrow callout */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.standard, delay: 0.2, ease: EASE_EDITORIAL }}
        style={{
          position: 'absolute',
          top: -110,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 13,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--case, #7BAE7F)',
        }}
      >
        Workflow in action · Analyst asks, agents respond
      </motion.div>

      {/* Glow rings on lit architecture nodes */}
      {Array.from(litNodes).map((nodeId) => {
        const key = ID_TO_POS[nodeId];
        if (!key) return null;
        const pos = ARCH_POS[key];
        return (
          <motion.div
            key={`glow-${nodeId}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.standard, ease: EASE_EDITORIAL }}
            style={{
              position: 'absolute',
              left: pos.x - 8,
              top: pos.y - 8,
              width: pos.w + 16,
              height: pos.h + 16,
              borderRadius: 12,
              boxShadow: '0 0 0 2px var(--case, #7BAE7F), 0 0 32px color-mix(in srgb, var(--case, #7BAE7F) 50%, transparent)',
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Bucket lights on the PharmState bus */}
      {Array.from(litBuckets).map((bucketId) => {
        const key = BUCKET_BY_ID[bucketId];
        if (!key) return null;
        const pos = ARCH_POS[key];
        return (
          <motion.div
            key={`bucket-${bucketId}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.standard, ease: EASE_EDITORIAL }}
            style={{
              position: 'absolute',
              left: pos.x - 6,
              top: pos.y - 6,
              width: pos.w + 12,
              height: pos.h + 12,
              borderRadius: 8,
              boxShadow: '0 0 0 1.5px var(--case, #7BAE7F), 0 0 28px color-mix(in srgb, var(--case, #7BAE7F) 60%, transparent)',
              background: 'color-mix(in srgb, var(--case, #7BAE7F) 14%, transparent)',
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* The moving particle — animates from liveFrom to liveTo */}
      <AnimatePresence>
        {liveFrom && liveTo && (
          <motion.div
            key={`particle-${stepIndex}`}
            initial={{ left: liveFrom.cx - 8, top: liveFrom.cy - 8, opacity: 0, scale: 0.6 }}
            animate={{
              left: liveTo.cx - 8,
              top:  liveTo.cy - 8,
              opacity: 1,
              scale: liveStep?.amber ? 1.4 : 1.1,
            }}
            exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.2 } }}
            transition={{
              duration: liveStep?.durationS ?? 0.6,
              ease: liveStep?.amber ? 'easeInOut' : EASE_EDITORIAL,
            }}
            style={{
              position: 'absolute',
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: liveStep?.amber ? 'var(--alert, #E8B547)' : 'var(--case, #7BAE7F)',
              boxShadow: liveStep?.amber
                ? '0 0 24px var(--alert, #E8B547), 0 0 6px var(--alert, #E8B547)'
                : '0 0 18px var(--case, #7BAE7F), 0 0 4px var(--case, #7BAE7F)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Step caption — bottom of zone */}
      <AnimatePresence mode="wait">
        {liveStep && (
          <motion.div
            key={`caption-${stepIndex}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
            style={{
              position: 'absolute',
              bottom: -90,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 13,
              letterSpacing: '0.10em',
              color: liveStep.amber ? 'var(--alert, #E8B547)' : 'var(--case, #7BAE7F)',
            }}
          >
            {liveStep.amber ? '↩ review gate fires · diagnostic flagged' : `${liveStep.from}  →  ${liveStep.to}`}
            {liveStep.bucketLit && (
              <span style={{ marginLeft: 16, color: 'color-mix(in srgb, var(--cream, #F5F0E8) 60%, transparent)' }}>
                · bucket lit: {liveStep.bucketLit}
              </span>
            )}
          </motion.div>
        )}

        {!liveStep && stepIndex >= C9_TRACE_STEPS.length && (
          <motion.div
            key="completion"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
            style={{
              position: 'absolute',
              bottom: -110,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: '"Source Serif Pro", serif',
              fontSize: 22,
              fontStyle: 'italic',
              color: 'var(--cream, #F5F0E8)',
            }}
          >
            4 – 8 weeks{' '}
            <span style={{ color: 'var(--case, #7BAE7F)' }}>→</span>{' '}
            hours · traceability stronger than the prior pipeline
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
