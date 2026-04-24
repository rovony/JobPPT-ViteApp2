import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Linkedin } from 'lucide-react';

/**
 * Slide 35 · Thank you — Questions welcome.
 *
 * Minimal editorial closing card. Deliberately not on SlideGrid —
 * this slide is supposed to feel like a typographic full stop, not
 * another structured layout. Centered title, hairline, sub, and
 * author bloc; a single faint constellation watermark in the
 * background carries the visual through-line from slides 30 → 31
 * without inviting the eye to scan it.
 *
 * No footer page-no rail (we're at the end), no Source line — the
 * stage lives with the speaker now.
 */
export default function Slide35ThankYou() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome:    0.10,
    title:     0.40,
    rule:      1.00,
    sub:       1.20,
    name:      1.60,
    role:      1.85,
    contact:   2.10,
    watermark: 0.60,
  };

  return (
    <motion.section
      data-case="amber"
      className="relative w-full h-[100dvh]"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {/* ─── Faint watermark constellation ─── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'screen',
          opacity: 0.18,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 1.2, ease, delay: D.watermark }}
      >
        <svg
          viewBox="0 0 600 600"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: 'min(80vh, 70vw)',
            aspectRatio: '1 / 1',
          }}
        >
          {/* Inline minimal pentagon — same geometry as ThemesConstellation
              but stripped down: no labels, no halos, no animation. */}
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
            const x = 300 + 200 * Math.cos(angle);
            const y = 300 + 200 * Math.sin(angle);
            const tokens = ['amber', 'cyan', 'sage', 'violet', 'coral'];
            const color = `var(--${tokens[i]})`;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={26} fill={color} fillOpacity={0.15} />
                <circle cx={x} cy={y} r={9} fill={color} fillOpacity={0.45} />
              </g>
            );
          })}
          {(() => {
            const lines = [];
            for (let i = 0; i < 5; i += 1) {
              for (let j = i + 1; j < 5; j += 1) {
                const ai = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
                const aj = -Math.PI / 2 + (j * 2 * Math.PI) / 5;
                lines.push(
                  <line
                    key={`l-${i}-${j}`}
                    x1={300 + 200 * Math.cos(ai)}
                    y1={300 + 200 * Math.sin(ai)}
                    x2={300 + 200 * Math.cos(aj)}
                    y2={300 + 200 * Math.sin(aj)}
                    stroke="var(--cream-muted)"
                    strokeOpacity={0.35}
                    strokeWidth={0.8}
                  />,
                );
              }
            }
            return lines;
          })()}
        </svg>
      </motion.div>

      {/* ─── Top-left eyebrow ─── */}
      <motion.div
        className="absolute deck-mono uppercase"
        style={{
          top: '6vh',
          left: 'var(--deck-gutter)',
          fontSize: '0.72rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber)',
          fontWeight: 700,
        }}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease, delay: D.chrome }}
      >
        <span className="inline-block align-middle h-px w-10 mr-3" style={{ background: 'var(--amber)' }} />
        Questions welcome
      </motion.div>

      {/* ─── Top-right page-end marker ─── */}
      <motion.div
        className="absolute deck-mono uppercase"
        style={{
          top: '6vh',
          right: 'var(--deck-gutter)',
          fontSize: '0.66rem',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.chrome }}
      >
        End · 35 / 35
      </motion.div>

      {/* ─── Centered editorial bloc ─── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ padding: 'var(--space-6)', textAlign: 'center', zIndex: 2 }}
      >
        <motion.h1
          className="deck-display"
          style={{
            margin: 0,
            fontSize: 'clamp(4rem, 11vw, 12rem)',
            lineHeight: 'var(--lh-tight)',
            letterSpacing: 'var(--ls-display)',
            color: 'var(--cream)',
            fontWeight: 700,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: D.title }}
        >
          Thank{' '}
          <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
            you.
          </span>
        </motion.h1>

        <motion.div
          style={{
            height: 3,
            width: 'clamp(80px, 8vw, 140px)',
            background: 'var(--amber)',
            transformOrigin: 'center',
            margin: 'var(--space-4) 0 var(--space-3) 0',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease, delay: D.rule }}
        />

        <motion.p
          className="deck-display italic"
          style={{
            margin: 0,
            fontSize: 'clamp(1.05rem, 1.5vw, 1.6rem)',
            color: 'var(--cream-muted)',
            fontWeight: 400,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: D.sub }}
        >
          Questions welcome.
        </motion.p>
      </div>

      {/* ─── Author bloc · bottom-left ─── */}
      <motion.div
        className="absolute"
        style={{
          bottom: '8vh',
          left: 'var(--deck-gutter)',
          maxWidth: '40ch',
          zIndex: 3,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.name }}
      >
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(1.1rem, 1.4vw, 1.4rem)',
            color: 'var(--cream)',
            fontWeight: 700,
          }}
        >
          Malek Okour, Ph.D.
        </div>
        <motion.div
          className="deck-mono uppercase"
          style={{
            marginTop: 4,
            fontSize: '0.72rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-muted)',
            fontWeight: 600,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: D.role }}
        >
          Director · Clinical Pharmacology &amp; Pharmacometrics
        </motion.div>
      </motion.div>

      {/* ─── Contact links · bottom-right ─── */}
      <motion.div
        className="absolute"
        style={{
          bottom: '8vh',
          right: 'var(--deck-gutter)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
          zIndex: 3,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.contact }}
      >
        <ContactRow icon={Globe} label="malekokour.com" />
        <ContactRow icon={Linkedin} label="linkedin/in/malek-okour-73020520" />
      </motion.div>
    </motion.section>
  );
}

function ContactRow({ icon: Icon, label }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        color: 'var(--cream-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        letterSpacing: '0.05em',
      }}
    >
      <Icon size={14} strokeWidth={1.6} aria-hidden />
      <span>{label}</span>
    </div>
  );
}
