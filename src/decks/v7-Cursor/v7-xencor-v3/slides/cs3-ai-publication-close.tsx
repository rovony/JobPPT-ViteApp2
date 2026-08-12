// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import SlideFrame from '@/components/deck/SlideFrame';
import BrowserFrame from '../../../pharos-seminar/components/BrowserFrame';

const EASE = [0.2, 0.7, 0.3, 1];
const SPRING = { type: 'spring', stiffness: 120, damping: 18 };
const URL = 'https://pharazi.ai';

const STATUS = [
  { label: 'Regulatory floor?', accent: 'Defined.', tone: 'cyan' },
  { label: 'Traceable workflow?', accent: 'Built.', tone: 'sage' },
  { label: 'Working system?', accent: 'Live at pharazi.ai.', tone: 'case' },
];

const ECOSYSTEM = [
  { label: 'Manuscript · CPT:PSP', state: 'in prep', tone: 'amber' },
  { label: 'pharazi.ai', state: 'framework home', tone: 'violet' },
  { label: 'clinpharm.ai', state: 'community', tone: 'coral' },
];

/**
 * CS4 close — bounded outcome + honesty reprise + transfer line.
 */
export default function Cs3AiPublicationClose() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideFrame
      dataCase="4"
      eyebrow="Case 04 · Outcome + transfer"
      headline={
        <>
          Traceable acceleration —{' '}
          <span className="italic" style={{ color: 'var(--xc-case-accent)' }}>
            auditability before autonomy
          </span>
        </>
      }
      subhead="Floor defined · workflow built · system inspectable. Personal research — no sponsor deployment claim."
      footerKicker="Case 04 · Traceable acceleration"
      footerTagline="Same discipline as Case 01: no black boxes at the decision point."
      footerSource="pharazi.ai · clinpharm.ai · manuscript in preparation"
      delays={{ footer: 2.6 }}
    >
      <div
        ref={ref}
        className="grid grid-cols-12 gap-4 h-full px-2 pt-2 xc-min0 xc-chrome-clear"
      >
        <div className="col-span-7 flex flex-col gap-4 pr-2 xc-min0">
          <motion.div
            className="cs4-honesty"
            initial={{ opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
          >
            <span className="cs4-honesty__kick">Honesty</span>
            <span className="cs4-honesty__body">
              Personal research. <b>No sponsor deployment. No validated-system claim. Not production-ready.</b>
            </span>
          </motion.div>

          <div className="flex flex-col gap-2.5">
            {STATUS.map((s, i) => (
              <StatusLine key={s.accent} delay={0.55 + i * 0.28} go={go} {...s} />
            ))}
          </div>

          <div className="xc-min0 xc-clip-none pb-1 mt-1">
            <motion.h2
              className="xc-h2 xc-ink"
              style={{ fontWeight: 600, maxWidth: '28ch' }}
              initial={{ opacity: 0, y: '28%' }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: 1.55, ...SPRING }}
            >
              Transfer:{' '}
              <span className="italic" style={{ color: 'var(--xc-case-accent)' }}>
                set the review standard before the function scales AI use
              </span>
              — not after.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className="flex flex-wrap gap-2 mt-auto"
          >
            {ECOSYSTEM.map((e, i) => (
              <EcosystemChip key={e.label} delay={2.1 + i * 0.08} {...e} />
            ))}
          </motion.div>
        </div>

        <div className="col-span-5 flex flex-col gap-3 xc-min0">
          <span className="xc-tagline-mono xc-ink-faint">INSPECTABLE · pharazi.ai</span>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={go ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.7, ease: EASE }}
            className="flex-1 min-h-0"
          >
            <BrowserFrame src={URL} title="Pharazi" mode="iframe" height="100%" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={go ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.35, ...SPRING }}
            className="self-end shrink-0"
            style={{
              padding: 12,
              background: 'var(--bg)',
              border: '1px solid var(--xc-case-accent)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <QRCodeSVG
              value={URL}
              size={96}
              bgColor="transparent"
              fgColor="var(--bp-ink)"
              level="Q"
              includeMargin={false}
            />
            <div
              className="xc-tagline-mono mt-2 text-center"
              style={{ color: 'var(--xc-case-accent)' }}
            >
              SCAN · pharazi.ai
            </div>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  );
}

function StatusLine({ label, accent, tone, delay, go }) {
  const palette = {
    case: 'var(--xc-case-accent)',
    cyan: 'var(--bp-cyan)',
    sage: 'var(--xc-case-accent)',
  };
  return (
    <div className="xc-min0 xc-clip-none pb-1">
      <motion.p
        className="xc-subtitle xc-ink-muted"
        style={{
          margin: 0,
          lineHeight: 1.15,
          fontWeight: 500,
          letterSpacing: '-0.005em',
        }}
        initial={{ y: '110%', opacity: 0 }}
        animate={go ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay, ease: EASE }}
      >
        {label}{' '}
        <span className="italic" style={{ color: palette[tone] ?? palette.case }}>
          {accent}
        </span>
      </motion.p>
    </div>
  );
}

function EcosystemChip({ label, state, tone, delay }) {
  const palette = {
    amber: 'var(--amber)',
    cyan: 'var(--bp-cyan)',
    violet: 'var(--violet, var(--xc-case-accent))',
    coral: 'var(--coral)',
  };
  const c = palette[tone] ?? palette.amber;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className="flex items-center gap-2 px-3 py-1.5"
      style={{
        background: `color-mix(in srgb, ${c} 12%, transparent)`,
        border: `1px solid ${c}`,
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <span
        aria-hidden
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: c,
        }}
      />
      <span
        className="xc-tagline xc-mono xc-ink"
        style={{ letterSpacing: '0.04em', fontWeight: 500 }}
      >
        {label}
      </span>
      <span className="xc-tagline-mono" style={{ color: c }}>
        · {state}
      </span>
    </motion.div>
  );
}
