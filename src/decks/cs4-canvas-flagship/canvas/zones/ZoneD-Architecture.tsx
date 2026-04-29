// @ts-nocheck
/**
 * Zone D — Camera 5 · Architecture (load-bearing)
 *
 * Top-to-bottom inside the 2400×1400 zone box:
 *
 *   Top header band (above the diagram, in the surrounding gutter):
 *     13 / 151 / 76 NumberTicker cascade with labels
 *
 *   Architecture diagram:
 *     [Analyst]   ←── bidirectional review-gate ──→  [L0 Supervisor]
 *                            ↓                  ↓
 *     [Data] [NCA] [PopPK] [Simulation] [Review]   (5 L1 Managers)
 *                    ↓
 *     [Cov] [VPC] [Design]   (3 L2 Specialists under PopPK)
 *
 *   PharmState bus (bottom band):
 *     [Context] [Dataset] [NCA] [Modeling] [QC] [Audit]
 *
 * Cinematic 1 timeline — fires when cameraIndex === 5:
 *   0.0–0.5s:  numbers cascade
 *   0.5–1.0s:  Analyst icon glides into top position (morphs from Zone A)
 *   1.0–1.5s:  L0 Supervisor appears (morphs from Zone C LLM badge)
 *   1.5–2.5s:  L1 nodes fade in left-to-right (200ms stagger)
 *   2.5–3.0s:  L2 nodes fade in (under PopPK)
 *   3.0–3.5s:  arrows draw on (L0→L1, PopPK→L2)
 *   3.5–4.0s:  PharmState bus + buckets fade in
 *   4.0–4.5s:  Analyst↔L0 bidirectional arrow pulses once (review-gate)
 *
 * IP firewall:
 *   - bucket NAMES shown ✓
 *   - 34 individual field names HIDDEN ✓
 *   - hash chain mechanism shown later (Camera 8) ✓
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ZONE_BOUNDS, ARCHITECTURE, AGENTS, PHARMSTATE_BUCKETS } from '../../data';
import { EASE_EDITORIAL, DUR, CANVAS_LAYOUT_IDS } from '../../themes';
import { useCanvasCamera } from '../CameraController';
import { ARCH_POS, centerOf, bottomOf, topOf } from '../architecturePositions';
import NumberTicker from '../../primitives/NumberTicker';
import LLMBadge from '../../primitives/LLMBadge';
import AgentNode from '../../primitives/AgentNode';
import PharmStateBucket from '../../primitives/PharmStateBucket';
import AnalystIcon from '../../primitives/AnalystIcon';

const Z = ZONE_BOUNDS.D;

/** Lookup a tier-1 agent by id from the AGENTS constant. */
function agentBy(id: string) {
  return AGENTS.find((a) => a.id === id);
}

export default function ZoneDArchitecture() {
  const { cameraIndex } = useCanvasCamera();
  const reduce = useReducedMotion();
  // Zone D is "active" at C5 (architecture build) AND C9 (workflow trace).
  // Architecture content stays mounted at C9 so the workflow overlay
  // (Zone H) can light bucket nodes on top.
  const active = cameraIndex === 5 || cameraIndex === 9;
  const buildC5 = cameraIndex === 5;

  // The L0 Supervisor (LLM badge morph target) is rendered when
  // cameraIndex >= 5; before that, Zone C has the badge.
  const showL0 = cameraIndex >= 5;
  // The Analyst lives here from C5 onwards (morphed from Zone A
  // where it was at C2). Hidden at C3, C4 (Zone A also hidden).
  const showAnalystHere = cameraIndex >= 5 && !(cameraIndex === 10);

  // Edge layout — convert ARCH_POS to absolute zone coords (already are)
  const arrowsToL1 = [
    ARCH_POS.l1Data, ARCH_POS.l1Nca, ARCH_POS.l1PopPK,
    ARCH_POS.l1Sim, ARCH_POS.l1Review,
  ];
  const l2Nodes = [ARCH_POS.l2Cov, ARCH_POS.l2Vpc, ARCH_POS.l2Design];
  const bucketNodes = [
    ARCH_POS.bContext, ARCH_POS.bDataset, ARCH_POS.bNca,
    ARCH_POS.bModeling, ARCH_POS.bQc, ARCH_POS.bAudit,
  ];

  return (
    <div
      data-zone="D"
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
      }}
    >
      {/* ── Number cascade — top header band, sits above the diagram ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: active ? 1 : 0.25, y: 0 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: buildC5 ? 0.1 : 0 }}
        style={{
          position: 'absolute',
          left: 0,
          top: -180,
          width: Z.width,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'baseline',
          padding: '0 200px',
        }}
      >
        {[
          { value: ARCHITECTURE.agents,    label: 'agents',    delay: 0.2 },
          { value: ARCHITECTURE.tools,     label: 'tools',     delay: 0.45 },
          { value: ARCHITECTURE.templates, label: 'templates', delay: 0.7 },
        ].map((stat, i) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <NumberTicker
              from={0}
              to={stat.value}
              duration={1.5}
              delay={stat.delay}
              go={buildC5}
              fontSize={108}
              style={{ display: 'block', lineHeight: 1.0, marginBottom: 12 }}
            />
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 14,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, var(--cream, #F5F0E8) 65%, transparent)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── SVG: arrows + connectors ─────────────────────────────────── */}
      <svg
        aria-hidden
        width={Z.width}
        height={Z.height}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        <defs>
          <marker
            id="cs4-arrow-sage"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--case, #7BAE7F)" opacity="0.7" />
          </marker>
        </defs>

        {/* Analyst ↔ L0 (bidirectional review-gate) */}
        <motion.line
          x1={centerOf(ARCH_POS.analyst).cx}
          y1={ARCH_POS.analyst.y + ARCH_POS.analyst.h - 16}
          x2={centerOf(ARCH_POS.l0).cx}
          y2={ARCH_POS.l0.y + 4}
          stroke="var(--case, #7BAE7F)"
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.55"
          markerStart="url(#cs4-arrow-sage)"
          markerEnd="url(#cs4-arrow-sage)"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: showL0 ? 0.55 : 0 }}
          transition={{ duration: 0.6, delay: buildC5 ? 4.0 : 0, ease: EASE_EDITORIAL }}
        />

        {/* L0 → each L1 */}
        {arrowsToL1.map((target, i) => (
          <motion.line
            key={`l0-l1-${i}`}
            x1={bottomOf(ARCH_POS.l0).cx}
            y1={bottomOf(ARCH_POS.l0).cy}
            x2={topOf(target).cx}
            y2={topOf(target).cy - 4}
            stroke="var(--case, #7BAE7F)"
            strokeWidth="1.5"
            opacity="0.5"
            markerEnd="url(#cs4-arrow-sage)"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: showL0 ? 0.5 : 0 }}
            transition={{ duration: 0.5, delay: buildC5 ? 3.0 + i * 0.08 : 0, ease: EASE_EDITORIAL }}
          />
        ))}

        {/* PopPK → each L2 */}
        {l2Nodes.map((target, i) => (
          <motion.line
            key={`poppk-l2-${i}`}
            x1={bottomOf(ARCH_POS.l1PopPK).cx}
            y1={bottomOf(ARCH_POS.l1PopPK).cy}
            x2={topOf(target).cx}
            y2={topOf(target).cy - 4}
            stroke="var(--case, #7BAE7F)"
            strokeWidth="1"
            opacity="0.4"
            markerEnd="url(#cs4-arrow-sage)"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: showL0 ? 0.4 : 0 }}
            transition={{ duration: 0.4, delay: buildC5 ? 3.4 + i * 0.06 : 0, ease: EASE_EDITORIAL }}
          />
        ))}

        {/* Connector strip from L1/L2 row to PharmState bus */}
        {arrowsToL1.map((node, i) => (
          <motion.line
            key={`bus-l1-${i}`}
            x1={bottomOf(node).cx}
            y1={bottomOf(node).cy + 4}
            x2={bottomOf(node).cx}
            y2={ARCH_POS.bContext.y - 6}
            stroke="var(--case, #7BAE7F)"
            strokeWidth="1"
            strokeDasharray="3 4"
            opacity="0.3"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: showL0 ? 0.3 : 0 }}
            transition={{ duration: 0.4, delay: buildC5 ? 3.7 + i * 0.04 : 0, ease: EASE_EDITORIAL }}
          />
        ))}

        {/* Horizontal sage hairline — the bus itself */}
        <motion.line
          x1={ARCH_POS.bContext.x}
          y1={ARCH_POS.bContext.y - 14}
          x2={ARCH_POS.bAudit.x + ARCH_POS.bAudit.w}
          y2={ARCH_POS.bContext.y - 14}
          stroke="var(--case, #7BAE7F)"
          strokeWidth="2"
          opacity="0.45"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1, opacity: showL0 ? 0.45 : 0 }}
          transition={{ duration: 0.6, delay: buildC5 ? 3.6 : 0, ease: EASE_EDITORIAL }}
        />
      </svg>

      {/* ── Analyst at top — morph target from Zone A ────────────────── */}
      {showAnalystHere && (
        <div
          style={{
            position: 'absolute',
            left: ARCH_POS.analyst.x,
            top: ARCH_POS.analyst.y,
            width: ARCH_POS.analyst.w,
            height: ARCH_POS.analyst.h,
          }}
        >
          <AnalystIcon variant="tier1" size={ARCH_POS.analyst.w} opacity={0.85} />
        </div>
      )}

      {/* Analyst label */}
      {showAnalystHere && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.standard, delay: buildC5 ? 1.2 : 0 }}
          style={{
            position: 'absolute',
            left: ARCH_POS.analyst.x + ARCH_POS.analyst.w + 16,
            top: ARCH_POS.analyst.y + ARCH_POS.analyst.h / 2 - 16,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--rose, #C4847A)',
          }}
        >
          analyst<br />
          <span style={{ color: 'color-mix(in srgb, var(--cream, #F5F0E8) 50%, transparent)', fontSize: 10 }}>
            review gate
          </span>
        </motion.div>
      )}

      {/* ── L0 Supervisor — morph from Zone C LLM badge ───────────────── */}
      {showL0 && (
        <div
          style={{
            position: 'absolute',
            left: ARCH_POS.l0.x,
            top: ARCH_POS.l0.y,
            width: ARCH_POS.l0.w,
            height: ARCH_POS.l0.h,
          }}
        >
          <LLMBadge variant="l0" />
        </div>
      )}

      {/* ── L1 Managers ──────────────────────────────────────────────── */}
      {showL0 && (
        <>
          {[
            { id: 'data',   pos: ARCH_POS.l1Data,   layoutId: CANVAS_LAYOUT_IDS.l1Data,   delay: 1.5 },
            { id: 'nca',    pos: ARCH_POS.l1Nca,    layoutId: CANVAS_LAYOUT_IDS.l1Nca,    delay: 1.7 },
            { id: 'poppk',  pos: ARCH_POS.l1PopPK,  layoutId: CANVAS_LAYOUT_IDS.l1PopPK,  delay: 1.9 },
            { id: 'sim',    pos: ARCH_POS.l1Sim,    layoutId: CANVAS_LAYOUT_IDS.l1Sim,    delay: 2.1 },
            { id: 'review', pos: ARCH_POS.l1Review, layoutId: CANVAS_LAYOUT_IDS.l1Review, delay: 2.3 },
          ].map((spec) => {
            const ag = agentBy(spec.id);
            return (
              <div
                key={spec.id}
                data-arch-node={spec.id}
                style={{
                  position: 'absolute',
                  left: spec.pos.x,
                  top: spec.pos.y,
                  width: spec.pos.w,
                  height: spec.pos.h,
                }}
              >
                <AgentNode
                  tier="L1"
                  name={ag?.name ?? spec.id}
                  role={ag?.role ?? ''}
                  layoutId={spec.layoutId}
                  delay={buildC5 ? spec.delay : 0}
                  go={buildC5}
                />
              </div>
            );
          })}
        </>
      )}

      {/* ── L2 Specialists ──────────────────────────────────────────── */}
      {showL0 && (
        <>
          {[
            { id: 'cov',    pos: ARCH_POS.l2Cov,    layoutId: CANVAS_LAYOUT_IDS.l2Cov,    delay: 2.5 },
            { id: 'vpc',    pos: ARCH_POS.l2Vpc,    layoutId: CANVAS_LAYOUT_IDS.l2Vpc,    delay: 2.65 },
            { id: 'design', pos: ARCH_POS.l2Design, layoutId: CANVAS_LAYOUT_IDS.l2Design, delay: 2.8 },
          ].map((spec) => {
            const ag = agentBy(spec.id);
            return (
              <div
                key={spec.id}
                data-arch-node={spec.id}
                style={{
                  position: 'absolute',
                  left: spec.pos.x,
                  top: spec.pos.y,
                  width: spec.pos.w,
                  height: spec.pos.h,
                }}
              >
                <AgentNode
                  tier="L2"
                  name={ag?.name ?? spec.id}
                  role={ag?.role ?? ''}
                  layoutId={spec.layoutId}
                  delay={buildC5 ? spec.delay : 0}
                  go={buildC5}
                />
              </div>
            );
          })}
        </>
      )}

      {/* ── PharmState bus — 6 buckets ─────────────────────────────── */}
      {showL0 && (
        <>
          {[
            { id: 'context',  pos: ARCH_POS.bContext,  delay: 3.7 },
            { id: 'dataset',  pos: ARCH_POS.bDataset,  delay: 3.78 },
            { id: 'nca',      pos: ARCH_POS.bNca,      delay: 3.86 },
            { id: 'modeling', pos: ARCH_POS.bModeling, delay: 3.94 },
            { id: 'qc',       pos: ARCH_POS.bQc,       delay: 4.02 },
            { id: 'audit',    pos: ARCH_POS.bAudit,    delay: 4.10 },
          ].map((spec) => {
            const bucket = PHARMSTATE_BUCKETS.find((b) => b.id === spec.id);
            return (
              <div
                key={spec.id}
                data-bucket={spec.id}
                style={{
                  position: 'absolute',
                  left: spec.pos.x,
                  top: spec.pos.y,
                  width: spec.pos.w,
                  height: spec.pos.h,
                }}
              >
                <PharmStateBucket
                  label={bucket?.label ?? spec.id}
                  delay={buildC5 ? spec.delay : 0}
                  go={buildC5}
                />
              </div>
            );
          })}
        </>
      )}

      {/* ── PharmState bus label ─────────────────────────────────────── */}
      {showL0 && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: active ? 1 : 0.4 }}
          transition={{ duration: DUR.standard, delay: buildC5 ? 4.3 : 0, ease: EASE_EDITORIAL }}
          style={{
            position: 'absolute',
            left: 0,
            top: ARCH_POS.bContext.y + ARCH_POS.bContext.h + 14,
            width: Z.width,
            textAlign: 'center',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'color-mix(in srgb, var(--case, #7BAE7F) 75%, transparent)',
          }}
        >
          PharmState · typed shared bus · {ARCHITECTURE.buckets} buckets
          <span style={{ marginLeft: 16, color: 'color-mix(in srgb, var(--cream, #F5F0E8) 35%, transparent)' }}>
            {ARCHITECTURE.fields} typed fields · internal
          </span>
        </motion.div>
      )}

      {/* Disclosure footer */}
      {showL0 && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: active ? 0.55 : 0.15 }}
          transition={{ duration: DUR.standard, delay: buildC5 ? 4.5 : 0 }}
          style={{
            position: 'absolute',
            right: 0,
            bottom: -56,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.06em',
            color: 'color-mix(in srgb, var(--cream, #F5F0E8) 55%, transparent)',
          }}
        >
          {ARCHITECTURE.disclosure} · grounded in Kim et al. (2025) arXiv:2512.08296
        </motion.div>
      )}
    </div>
  );
}
