import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * Slide 21 (manifest position) · CS2 RESPONSE — execution + leadership.
 *
 * Per cs2-design.md beat 7: "Indian regulatory timeline rendered as a
 * horizontal sequence (MAA → SEC1 → EO → SEC2 objection → 91-KB →
 * in-person presentation → favorable recommendation → approval).
 * 26 March 2025 — the leadership beat: a single in-person presentation
 * to the Subject Expert Committee."
 *
 * No shared cinematic anchors enter or exit here — this is the
 * stationary execution panel. The hero is the regulatory timeline
 * itself, with the 26-Mar leadership beat as the climactic node.
 */
export default function Slide19Case2Response() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="CS2 · The response — execution & leadership"
      headline={
        <>
          A single in-person SEC presentation —{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            27 March 2025.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead="Twelve months of regulatory choreography. Three subject expert committee passes. One favorable recommendation."
      subheadMaxChars={120}
      footerKicker="Case 02 · The execution"
      footerSource="Source · CDSCO 91-KB submission · 27 Mar 2025 SEC minutes · Servier India regulatory file"
    >
      <ResponseLayout />
    </SlideFrame>
  );
}

/* Compact 9-step timeline */
const STEPS = [
  { date: '27 Mar 2024', label: 'MAA filing',           detail: 'CDSCO Form 44 · 6 documents · NDCTR 2019' },
  { date: '23 May 2024', label: 'SEC #1',               detail: 'Pre-clinical & efficacy review' },
  { date: '23 Aug 2024', label: 'EO — additional data', detail: 'Examiner Office query batch 1' },
  { date: '10 Dec 2024', label: 'SEC #2 — objection',   detail: '"Conduct PK/PD study in Indian patients"', flag: 'turn' },
  { date: 'Dec — Jan',   label: 'Strategy reframe',     detail: 'Six-pillar mechanism-first response constructed' },
  { date: '14 Jan 2025', label: '91-KB submission',     detail: '600-page integrated PK/PD package · ICH E5(R1) classification' },
  { date: '27 Mar 2025', label: 'SEC #3 — in-person',   detail: 'Single live presentation · 6 pillars · 9/9 ICH E5 criteria', flag: 'climax' },
  { date: '4 Apr 2025',  label: 'Favorable recommendation', detail: 'SEC recommends conditional approval — no Indian PK study required' },
  { date: '14 May 2025', label: 'Marketing authorization', detail: 'CDSCO Tibsovo approval · India' },
];

function ResponseLayout() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-5)',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Timeline */}
      <div
        style={{
          position: 'relative',
          padding: 'var(--space-3) 0',
          display: 'grid',
          gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`,
          alignItems: 'stretch',
          minHeight: 0,
        }}
      >
        {/* Spine */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0.7, 0.3, 1], delay: 0.4 }}
          style={{
            position: 'absolute',
            left: '4%',
            right: '4%',
            top: '50%',
            height: 2,
            background: 'linear-gradient(90deg, var(--cyan), var(--coral))',
            opacity: 0.55,
            transform: 'translateY(-1px)',
          }}
        />
        {STEPS.map((s, i) => (
          <TimelineNode key={s.date + s.label} step={s} index={i} above={i % 2 === 0} total={STEPS.length} />
        ))}
      </div>

      {/* Bottom — leadership beat callout */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: 1.6 + STEPS.length * 0.08 }}
        style={{
          padding: 'var(--space-4) var(--space-5)',
          border: '1.5px solid var(--coral)',
          borderLeft: '4px solid var(--coral)',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--coral) 14%, transparent), color-mix(in srgb, var(--panel) 70%, transparent) 70%)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          columnGap: 'var(--space-4)',
          alignItems: 'center',
        }}
      >
        <div
          className="deck-display"
          style={{
            fontSize: 'var(--fs-card-numeral)',
            fontWeight: 700,
            color: 'var(--coral)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
          }}
        >
          27 / 03
        </div>
        <div>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--coral)',
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            The leadership beat — 27 March 2025
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-slide-body)',
              color: 'var(--cream)',
              lineHeight: 1.4,
            }}
          >
            A single in-person SEC presentation — six converging pillars, ICH E5(R1) Appendix D 9 / 9, integrated PK/PD package. The committee accepted the architecture and recommended conditional approval without requiring a duplicative Indian PK study.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Single timeline node */
function TimelineNode({ step, index, above, total }) {
  const delay = 0.6 + index * 0.12;
  const tone = step.flag === 'climax' ? 'var(--coral)' : step.flag === 'turn' ? 'var(--amber, #d8a634)' : 'var(--cyan)';
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {above && <NodeCard step={step} index={index} delay={delay + 0.2} tone={tone} placement="above" total={total} />}

      {/* Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.3, 1], delay }}
        style={{
          width: step.flag ? 18 : 12,
          height: step.flag ? 18 : 12,
          borderRadius: '50%',
          background: tone,
          boxShadow: step.flag ? `0 0 0 4px color-mix(in srgb, ${tone} 28%, transparent)` : 'none',
          border: step.flag === 'climax' ? '2px solid var(--cream)' : 'none',
          zIndex: 2,
        }}
      />

      {!above && <NodeCard step={step} index={index} delay={delay + 0.2} tone={tone} placement="below" total={total} />}
    </div>
  );
}

function NodeCard({ step, delay, tone, placement }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: placement === 'above' ? 6 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay }}
      style={{
        position: 'absolute',
        [placement === 'above' ? 'bottom' : 'top']: 'calc(50% + 16px)',
        width: '92%',
        padding: '6px 8px',
        textAlign: 'center',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: tone,
          fontWeight: 700,
          marginBottom: 2,
        }}
      >
        {step.date}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-kicker)',
          fontWeight: 700,
          color: 'var(--cream)',
          lineHeight: 1.2,
          marginBottom: 2,
        }}
      >
        {step.label}
      </div>
      <div
        className="deck-mono"
        style={{
          fontSize: 'calc(var(--fs-slide-pageno) * 0.92)',
          color: 'var(--cream-muted)',
          lineHeight: 1.3,
        }}
      >
        {step.detail}
      </div>
    </motion.div>
  );
}
