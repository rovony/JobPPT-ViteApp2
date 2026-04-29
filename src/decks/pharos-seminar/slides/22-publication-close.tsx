// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import SlideFrame from '@/components/deck/SlideFrame';
import BrowserFrame from '../components/BrowserFrame';
import { EASE, SPRING } from '../motion';

/**
 * Slide 22 — Publication close · A4 60/40 split (amber).
 *
 * LEFT 60 :  manuscript header + 3 status lines stack + capstone italic
 *            line + ecosystem chip strip ("manuscript · github · package
 *            registry") with case-color rotation.
 * RIGHT 40 : BrowserFrame embedding https://pharazi.ai (live iframe with
 *            5s timeout → poster fallback). QR card slides up beneath the
 *            frame anchored bottom-right.
 *
 * Voice: third-person, work-as-subject. Vocabulary per A5 — "foundation"
 * replaces "substrate" in capstone line; "Pharazi" used as the brand
 * noun. Replaces the original 18-close.tsx (now archived); the close has
 * moved to slot 22 per Amendment 4.
 */

const URL = 'https://pharazi.ai';

const STATUS = [
  { label: 'Regulatory framework?',     accent: 'Exists.',   tone: 'cyan' },
  { label: 'Architectural foundation?', accent: 'Built.',    tone: 'sage' },
  { label: 'Working system?',           accent: 'Deployed.', tone: 'case' },
];

const ECOSYSTEM = [
  { label: 'Manuscript · CPT:PSP', state: 'in prep',        tone: 'amber'  },
  { label: 'github.com/pharazi',   state: 'live',           tone: 'cyan'   },
  { label: 'pharazi.ai',           state: 'framework home', tone: 'violet' },
  { label: 'clinpharm.ai',         state: 'community',      tone: 'coral'  },
  { label: 'R + Python pkgs',      state: 'roadmap',        tone: 'sage'   },
];

export default function PublicationCloseSlide() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="CLOSE · PUBLICATION + ECOSYSTEM"
      headline={
        <>
          Live at{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>pharazi.ai</span>
        </>
      }
      subhead="The reference architecture, the working system, the ecosystem — open and addressable."
      footerKicker="22 · CLOSE · PUBLICATION + ECOSYSTEM"
      footerTagline="The next chapter scales the foundation. Scan to visit."
      footerSource="pharazi.ai · live deployment · April 2026"
    >
      <div ref={ref} className="grid grid-cols-12 gap-4 h-full px-2 pt-2 pb-2 min-h-0">
        {/* LEFT 60 — manuscript + status + capstone */}
        <div className="col-span-7 flex flex-col gap-5 min-h-0 pr-2">
          {/* Manuscript header chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE.expoOut }}
            className="inline-flex items-center gap-3 self-start px-3 py-2"
            style={{
              border: '1px solid var(--case)',
              borderRadius: 'var(--radius-sm)',
              background: 'color-mix(in srgb, var(--case) 8%, transparent)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--case)',
                boxShadow: '0 0 6px var(--case)',
              }}
            />
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.62rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
              }}
            >
              MANUSCRIPT · CPT:PSP · IN PREP · APRIL 2026
            </span>
          </motion.div>

          {/* Three status lines */}
          <div className="flex flex-col gap-3">
            {STATUS.map((s, i) => (
              <StatusLine key={s.accent} delay={0.6 + i * 0.45} go={go} {...s} />
            ))}
          </div>

          {/* Capstone italic */}
          <div className="overflow-hidden pb-2 -mb-2 mt-2">
            <motion.h2
              className="deck-display"
              style={{
                margin: 0,
                fontSize: 'clamp(2.4rem, 4vw, 4.4rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: 'var(--cream)',
                fontWeight: 600,
                maxWidth: '22ch',
              }}
              initial={{ opacity: 0, y: '40%' }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: 2.4, ...SPRING.cushiony }}
            >
              The foundation{' '}
              <span className="italic" style={{ color: 'var(--case)' }}>holds.</span>{' '}
              The next chapter{' '}
              <span className="italic" style={{ color: 'var(--case)' }}>scales it.</span>
            </motion.h2>
          </div>

          {/* Ecosystem chip strip — case-color rotation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.6 }}
            className="flex flex-wrap gap-2 mt-auto"
          >
            {ECOSYSTEM.map((e, i) => (
              <EcosystemChip key={e.label} delay={3.7 + i * 0.08} {...e} />
            ))}
          </motion.div>
        </div>

        {/* RIGHT 40 — iframe + QR */}
        <div className="col-span-5 flex flex-col gap-3 min-h-0 relative">
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.6rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            LIVE · {URL.replace('https://', '')}
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={go ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE.expoOut }}
            className="flex-1 min-h-0"
          >
            <BrowserFrame src={URL} title="Pharazi" mode="iframe" height="100%" />
          </motion.div>

          {/* QR card overlay */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={go ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.2, ...SPRING.cushiony }}
            className="absolute"
            style={{
              right: -8,
              bottom: -8,
              padding: 12,
              background: 'var(--bg)',
              border: '1px solid var(--case)',
              borderRadius: 'var(--radius-sm)',
              boxShadow:
                '0 12px 36px rgba(0,0,0,0.45), 0 0 28px color-mix(in srgb, var(--case) 30%, transparent)',
            }}
          >
            <QRCodeSVG
              value={URL}
              size={104}
              bgColor="transparent"
              fgColor="var(--cream, #f5f5f4)"
              level="Q"
              includeMargin={false}
            />
            <div
              className="deck-mono uppercase mt-2 text-center"
              style={{
                fontSize: '0.55rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
              }}
            >
              SCAN · pharazi.ai
            </div>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  );
}

function StatusLine({
  label,
  accent,
  tone,
  delay,
  go,
}: {
  label: string;
  accent: string;
  tone: string;
  delay: number;
  go: boolean;
}) {
  const palette: Record<string, string> = {
    case: 'var(--case)',
    cyan: '#67e8f9',
    sage: '#86efac',
  };
  return (
    <div className="overflow-hidden pb-2 -mb-2">
      <motion.p
        className="deck-display"
        style={{
          margin: 0,
          fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
          lineHeight: 1.15,
          color: 'var(--cream-muted)',
          fontWeight: 500,
          letterSpacing: '-0.005em',
        }}
        initial={{ y: '110%', opacity: 0 }}
        animate={go ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay, ease: EASE.expoOut }}
      >
        {label}{' '}
        <span className="italic" style={{ color: palette[tone] ?? palette.case }}>
          {accent}
        </span>
      </motion.p>
    </div>
  );
}

function EcosystemChip({
  label,
  state,
  tone,
  delay,
}: {
  label: string;
  state: string;
  tone: string;
  delay: number;
}) {
  const palette: Record<string, string> = {
    amber: '#f5b042',
    cyan: '#67e8f9',
    sage: '#86efac',
    violet: '#c4b5fd',
    coral: '#fda4af',
  };
  const c = palette[tone] ?? palette.amber;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE.expoOut }}
      className="flex items-center gap-2 px-3 py-1.5"
      style={{
        background: `color-mix(in srgb, ${c} 12%, transparent)`,
        border: `1px solid ${c}`,
        borderRadius: 'var(--radius-sm)',
        boxShadow: `0 0 12px color-mix(in srgb, ${c} 25%, transparent)`,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: c,
          boxShadow: `0 0 5px ${c}`,
        }}
      />
      <span
        className="deck-mono"
        style={{
          fontSize: '0.7rem',
          color: 'var(--cream)',
          letterSpacing: '0.04em',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.55rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: c,
          fontWeight: 700,
        }}
      >
        · {state}
      </span>
    </motion.div>
  );
}
