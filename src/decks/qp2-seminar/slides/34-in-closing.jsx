import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 34 · In closing — Three things to take away.
 *
 * The penultimate slide. Compresses the entire seminar (cases →
 * breadth → record → leadership) into three editorial takeaways
 * the panel should remember on the elevator ride after the talk.
 *
 * Card 1 (Regulatory impact) lands on the receipts: 8 / 4 / 6.
 * Card 2 (Strategic breadth) lands on the scope: 7 therapeutic areas.
 * Card 3 (Leadership clarity) lands on the posture: strategic engine,
 * not service desk.
 *
 * Pull-quote at the bottom — the one Merck-facing sentence that
 * frames why this candidate, this seminar, this organization. The
 * quote is attributed to the seminar itself (Merck QP2-CMD ·
 * Candidate Seminar · April 2026) so it reads as the conclusion of
 * the talk, not an external citation.
 */

const TAKEAWAYS = [
  {
    num: '01',
    eyebrow: 'Regulatory impact',
    body: '8 submissions · 4 approved labels · 6 health authorities. The record speaks to an agency-first orientation — scientific rigor met the reviewers where they evaluated.',
    metric: '8 · 4 · 6',
    metricLabel: 'Submissions · Labels · Agencies',
    token: 'cyan',
  },
  {
    num: '02',
    eyebrow: 'Strategic breadth',
    body: 'Seven therapeutic areas, end-to-end from first-in-human to lifecycle management. No learning curve to absorb — a pipeline to accelerate.',
    metric: '7',
    metricLabel: 'Therapeutic areas · End-to-end',
    token: 'amber',
  },
  {
    num: '03',
    eyebrow: 'Leadership clarity',
    body: 'A posture that builds teams, influences cross-functional decisions, and positions quantitative pharmacology as the strategic engine of drug development — not its service desk.',
    metric: 'QP',
    metricLabel: 'Strategic engine · not service desk',
    token: 'coral',
  },
];

export default function Slide34InClosing() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    cards: 0.95,
    quote: 2.15,
    sig: 2.65,
    source: 2.80,
  };

  const T = useTokens([
    '--coral', '--amber', '--cyan', '--sage', '--violet',
    '--cream', '--cream-muted', '--cream-faint', '--cream-hairline',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={D.eyebrow}>Closing · Three takeaways</Eyebrow>
      <Headline delay={D.headline} maxChars={28}>
        In{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
          closing.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={60}>
        Three things to take away.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: '1fr auto auto',
            rowGap: 'var(--space-5)',
            minHeight: 0,
          }}
        >
          {/* ─── Three takeaway cards ─── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-4)',
              minHeight: 0,
            }}
          >
            {TAKEAWAYS.map((t, i) => (
              <TakeawayCard key={t.num} t={t} delay={D.cards + i * 0.16} tk={tk} />
            ))}
          </div>

          {/* ─── Pull-quote ─── */}
          <motion.figure
            style={{
              margin: 0,
              padding: 'var(--space-5) var(--space-5) var(--space-4) var(--space-5)',
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 35%, transparent)',
              textAlign: 'center',
              position: 'relative',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: D.quote }}
          >
            {/* Floating opening glyph */}
            <span
              aria-hidden
              className="deck-display"
              style={{
                position: 'absolute',
                top: 6,
                left: 'var(--space-5)',
                fontSize: 'clamp(2.6rem, 4vw, 4.6rem)',
                lineHeight: 1,
                color: 'color-mix(in srgb, var(--amber) 65%, transparent)',
                fontWeight: 700,
              }}
            >
              &ldquo;
            </span>

            <blockquote
              className="deck-display italic"
              style={{
                margin: 0,
                fontSize: 'clamp(1.05rem, 1.45vw, 1.55rem)',
                lineHeight: 1.45,
                color: 'var(--cream)',
                fontWeight: 400,
                maxWidth: '70ch',
                marginInline: 'auto',
              }}
            >
              That&apos;s the organization I know how to build —{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
                because I&apos;ve spent my career building the evidence
                that moves science into patients&apos; lives.
              </span>
            </blockquote>

            <figcaption
              className="deck-mono uppercase"
              style={{
                marginTop: 'var(--space-3)',
                fontSize: '0.66rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
            >
              Merck QP2-CMD · Candidate Seminar · April 2026
            </figcaption>
          </motion.figure>

          {/* ─── Author tag ─── */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.sig }}
          >
            <span
              className="deck-display"
              style={{
                fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)',
                color: 'var(--cream)',
                fontWeight: 600,
              }}
            >
              Malek Okour, Ph.D.
            </span>
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.72rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-muted)',
              }}
            >
              malekokour.com
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Closing · 34 of 35"
        source="Source · Seminar synthesis · CS1–CS3 + breadth + leadership"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   TakeawayCard — one of the three editorial takeaway cards
   ======================================================== */
function TakeawayCard({ t, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const color = tk(`--${t.token}`);
  return (
    <motion.div
      style={{
        padding: 'var(--space-4) var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `3px solid ${color}`,
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr auto',
        rowGap: 10,
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {/* Number + eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          className="deck-mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 32,
            height: 24,
            padding: '0 8px',
            borderRadius: 4,
            background: `color-mix(in srgb, ${color} 18%, transparent)`,
            color,
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.10em',
          }}
        >
          {t.num}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.68rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream)',
            fontWeight: 700,
          }}
        >
          {t.eyebrow}
        </span>
      </div>

      {/* Big inline metric */}
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.6rem, 2.2vw, 2.5rem)',
          color,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}
      >
        {t.metric}
      </div>

      {/* Body */}
      <div
        className="deck-display italic"
        style={{
          fontSize: 'clamp(0.84rem, 0.96vw, 1.0rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.5,
        }}
      >
        {t.body}
      </div>

      {/* Metric label */}
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.62rem',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
          paddingTop: 8,
          borderTop: '1px dashed var(--cream-hairline)',
        }}
      >
        {t.metricLabel}
      </div>
    </motion.div>
  );
}
