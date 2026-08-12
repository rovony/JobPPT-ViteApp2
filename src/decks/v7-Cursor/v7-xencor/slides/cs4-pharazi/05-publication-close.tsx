// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import SlideFrame from '@/components/deck/SlideFrame';
import PaperBrowserFrame from './PaperBrowserFrame';

const EASE = [0.2, 0.7, 0.3, 1];
const URL = 'https://pharazi.ai';

const STATUS = [
  { label: 'Regulatory floor?', accent: 'Defined.', tone: 'cyan' },
  { label: 'Traceable workflow?', accent: 'Built.', tone: 'sage' },
  { label: 'Working system?', accent: 'Live.', tone: 'case' },
];

const ECOSYSTEM = [
  { label: 'Manuscript · CPT:PSP', state: 'in prep', tone: 'amber' },
  { label: 'pharazi.ai', state: 'framework home', tone: 'sage' },
  { label: 'clinpharm.ai', state: 'community', tone: 'coral' },
];

/**
 * CS4 close — paper-editorial publication + ecosystem.
 * Personal research honesty; solid type; capped entrance delays.
 */
export default function Cs3AiPublicationClose() {
  const reduced = useReducedMotion();
  const d = (ms) => (reduced ? 0 : Math.min(ms, 0.35));

  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="Case 04 · Publication + ecosystem"
      headline={
        <>
          Traceable acceleration —{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>live at pharazi.ai</span>
        </>
      }
      subhead="Personal research into an audit-ready clin pharm workflow — the reference architecture and working system, addressable in one place."
      footerKicker="Case 04 · Traceable acceleration"
      footerTagline="Fast is useful only when the evidence chain stays intact."
      footerSource="pharazi.ai · personal research · working system · April 2026"
    >
      <div className="grid grid-cols-12 gap-4 h-full px-2 pt-2 pb-2 min-h-0">
        <div className="col-span-7 flex flex-col gap-5 min-h-0 pr-2">
          <div
            className="inline-flex items-center gap-3 self-start px-3 py-2"
            style={{
              border: '1px solid var(--cream-hairline)',
              borderTop: '2px solid var(--case)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--panel)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--case)',
              }}
            />
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                letterSpacing: '0.06em',
                color: 'var(--case)',
              }}
            >
              MANUSCRIPT · CPT:PSP · IN PREP
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {STATUS.map((s) => (
              <StatusLine key={s.accent} {...s} />
            ))}
          </div>

          <h2
            className="deck-display mt-2"
            style={{
              margin: 0,
              fontSize: 'clamp(2rem, 3.6vw, 3.8rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
              fontWeight: 600,
              maxWidth: '24ch',
            }}
          >
            Same standard as the ADC case:{' '}
            <span className="italic" style={{ color: 'var(--case)' }}>no black boxes</span>{' '}
            at the decision point.
          </h2>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, delay: d(0.22), ease: EASE }}
            className="flex flex-wrap gap-2 mt-auto"
          >
            {ECOSYSTEM.map((e) => (
              <EcosystemChip key={e.label} {...e} />
            ))}
          </motion.div>
        </div>

        <div className="col-span-5 flex flex-col gap-3 min-h-0 relative">
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              letterSpacing: '0.06em',
              color: 'var(--cream-faint)',
            }}
          >
            LIVE · pharazi.ai
          </span>
          <div className="flex-1 min-h-0">
            <PaperBrowserFrame src={URL} title="Pharazi" mode="iframe" height="100%" />
          </div>

          <div
            className="absolute"
            style={{
              right: -8,
              bottom: -8,
              padding: 12,
              background: 'var(--panel)',
              border: '1px solid var(--cream-hairline)',
              borderTop: '2px solid var(--case)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.06))',
            }}
          >
            <QRCodeSVG
              value={URL}
              size={104}
              bgColor="transparent"
              fgColor="var(--cream)"
              level="Q"
              includeMargin={false}
            />
            <div
              className="deck-mono uppercase mt-2 text-center"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                letterSpacing: '0.06em',
                color: 'var(--case)',
              }}
            >
              SCAN · pharazi.ai
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function StatusLine({ label, accent, tone }) {
  const palette = {
    case: 'var(--case)',
    cyan: 'var(--cyan)',
    sage: 'var(--sage)',
  };
  return (
    <p
      className="deck-display"
      style={{
        margin: 0,
        fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)',
        lineHeight: 1.15,
        color: 'var(--cream-muted)',
        fontWeight: 500,
        letterSpacing: '-0.005em',
      }}
    >
      {label}{' '}
      <span className="italic" style={{ color: palette[tone] ?? palette.case }}>
        {accent}
      </span>
    </p>
  );
}

function EcosystemChip({ label, state, tone }) {
  const palette = {
    amber: 'var(--amber)',
    cyan: 'var(--cyan)',
    sage: 'var(--sage)',
    coral: 'var(--coral)',
  };
  const c = palette[tone] ?? palette.amber;
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5"
      style={{
        background: 'var(--panel)',
        border: '1px solid var(--cream-hairline)',
        borderTop: `2px solid ${c}`,
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
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          color: 'var(--cream)',
          letterSpacing: '0.06em',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          letterSpacing: '0.06em',
          color: c,
          fontWeight: 700,
        }}
      >
        · {state}
      </span>
    </div>
  );
}
