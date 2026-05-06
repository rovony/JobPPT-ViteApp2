// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * 04 · Roadmap — "Three cases, three regulators, one discipline."
 *
 * MIN-DESIGN PASS. Text-forward 3-column case agenda. Sets the
 * coral / cyan / violet case-color cascade preview so the audience
 * recognizes each color when its case opens.
 *
 * v3-R2 case set (REVISED 2026-04-25):
 *   CS1 — Ambrisentan · pediatric PAH                    · coral
 *   CS2 — Ivosidenib · India CDSCO regulatory waiver      · cyan
 *   CS3 — AI/ML pharmacometric tools (PharmAgent et al.)  · sage
 *
 * Note: CS3 was Calaspargase in v1/v2; replaced for v3-R2 with the
 * personal AI/ML research projects (PharmAgent / DeepPK / reproducible tooling).
 * Per zaj-slides confidentiality rule: AI tools framed as personal
 * research projects demonstrating capability — NOT as products for
 * transfer to a new employer.
 *
 * Forward note for v2 design pass: this slide is a candidate for
 * lifting v2's framework-themes DataflowEngine SVG (5 inputs → 1
 * decision → 3 outcomes). For now the 3-card grid carries the work.
 */

const CASES = [
  {
    n: '01',
    token: 'coral',
    drug: 'Ambrisentan',
    indication: 'Pediatric PAH',
    setting: 'EMA · PMDA · 2021',
    proves: 'Exposure matching as the regulatory bridge when an efficacy trial cannot be run.',
  },
  {
    n: '02',
    token: 'violet',
    drug: 'AI / ML',
    indication: 'The Pharazi Foundation',
    setting: 'Personal research · 2024 –',
    proves: 'Architecture judgment for privacy-safe, audit-ready clinical pharmacology workflows.',
  },
  {
    n: '03',
    token: 'cyan',
    drug: 'Ivosidenib',
    indication: 'India · CDSCO',
    setting: 'Rule 101 waiver · 2025',
    proves: 'A global Clin Pharm dossier can stand in for a local trial under reference-agency reliance.',
  },
];

const CHALLENGES = [
  { label: 'Pediatric', color: 'var(--coral)' },
  { label: 'Methodological', color: 'var(--violet)' },
  { label: 'Geographic', color: 'var(--cyan)' },
];

const ROADMAP_AREAS = [
  'chrome-l chrome-l chrome-l chrome-l chrome-l chrome-l chrome-r chrome-r chrome-r chrome-r chrome-r chrome-r',
  'eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow',
  'headline headline headline headline headline headline headline headline headline headline headline headline',
  'subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead',
  'viz      viz      viz      viz      viz      viz      viz      viz      viz      viz      viz      viz',
  'conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion',
  'footer   footer   footer   footer   footer   footer   footer   footer   footer   footer   footer   footer',
];

const CONCLUSION_RIBBON_STYLE = {
  width: '100%',
  border: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
  borderRadius: 'var(--radius-md)',
  background:
    'linear-gradient(90deg, color-mix(in srgb, var(--amber) 18%, transparent), color-mix(in srgb, var(--amber) 7%, transparent))',
  padding: 'var(--space-3) var(--space-5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--space-4)',
  flexWrap: 'wrap',
};

const CHALLENGE_ROW_STYLE = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  flexWrap: 'wrap',
};

const CHALLENGE_LABEL_STYLE = {
  fontSize: 'var(--fs-slide-eyebrow)',
  color: 'var(--cream-faint)',
  letterSpacing: '0.1em',
};

const CONCLUSION_TEXT_STYLE = {
  fontSize: 'var(--fs-slide-tagline)',
  color: 'var(--cream)',
  lineHeight: 1.25,
  flex: '1 1 16rem',
  minWidth: 0,
};

export default function Roadmap({ deck }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid
      dataCase="amber"
      areas={ROADMAP_AREAS}
      rowSizes="auto auto auto auto minmax(0, 1fr) auto auto"
    >
      <Eyebrow color="var(--amber)" delay={0.10}>
        Roadmap · the next 35 minutes
      </Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Three cases. Three challenges.{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 500 }}>
          One discipline at the center.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={88} size="lead">
        Each case is a different drug and a different kind of challenge — pediatric,
        geographic, methodological. Quantitative pharmacology is what they share.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'clamp(var(--space-4), 3vh, var(--space-8))',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'grid',
              /* auto-fit + minmax keeps 3-up on desktop, reflows to 1-up
                 on portrait phone — per CLAUDE.md "Layout responsiveness". */
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
              gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
            }}
          >
            {CASES.map((c, i) => {
              const accent = `var(--${c.token})`;
              return (
                <motion.div
                  key={c.n}
                  layoutId={`case-card-${c.token}`}
                  /* Per CLAUDE.md card vocabulary "B. HeroTile":
                     1.5px border in case color, 4px left accent rail,
                     gradient case-tint background, color-mix in srgb. */
                  style={{
                    position: 'relative',
                    minWidth: 0,
                    border: `1.5px solid ${accent}`,
                    borderLeft: `4px solid ${accent}`,
                    borderRadius: 'var(--radius-md)',
                    background: `linear-gradient(180deg,
                      color-mix(in srgb, ${accent} 12%, transparent),
                      color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
                    padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.85 + i * 0.15,
                    ease: [0.2, 0.7, 0.3, 1],
                  }}
                >
                  {/* Case number — large mono, accent-colored */}
                  <div
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-slide-name)',
                      color: accent,
                      letterSpacing: '0.08em',
                      fontVariantNumeric: 'tabular-nums',
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    CASE {c.n}
                  </div>

                  {/* Drug name — display, larger */}
                  <div
                    className="deck-display"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                      color: 'var(--cream)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.015em',
                      fontWeight: 600,
                    }}
                  >
                    {c.drug}
                  </div>

                  {/* Indication */}
                  <div
                    className="deck-body"
                    style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream)',
                      opacity: 0.88,
                      lineHeight: 1.35,
                    }}
                  >
                    {c.indication}
                  </div>

                  {/* Setting / regulator / year — mono */}
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-slide-eyebrow)',
                      color: 'var(--cream-muted)',
                      letterSpacing: '0.1em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {c.setting}
                  </div>

                  {/* Hairline divider */}
                  <div
                    aria-hidden
                    style={{
                      width: '100%',
                      height: 'var(--stroke-hair)',
                      background: 'var(--cream-hairline)',
                      marginTop: 'var(--space-1)',
                    }}
                  />

                  {/* What this case proves — body */}
                  <div
                    className="deck-body"
                    style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream-muted)',
                      lineHeight: 1.45,
                      flex: 1,
                    }}
                  >
                    {c.proves}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Viz>

      <GridSlot
        area="conclusion"
        motion={{
          initial: { opacity: 0, y: 10 },
          animate: go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
          delay: reduced ? 0 : 1.45,
        }}
        style={CONCLUSION_RIBBON_STYLE}
      >
        <div style={CHALLENGE_ROW_STYLE}>
          <span
            className="deck-mono uppercase"
            style={CHALLENGE_LABEL_STYLE}
          >
            Three challenges
          </span>
          {CHALLENGES.map((challenge) => (
            <span
              key={challenge.label}
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: challenge.color,
                fontWeight: 700,
                padding: 'var(--space-1) var(--space-3)',
                borderRadius: '999px',
                border: `1px solid color-mix(in srgb, ${challenge.color} 44%, transparent)`,
                background: `color-mix(in srgb, ${challenge.color} 12%, transparent)`,
              }}
            >
              {challenge.label}
            </span>
          ))}
        </div>
        <div
          className="deck-display"
          style={CONCLUSION_TEXT_STYLE}
        >
          One discipline carrying the decision in each case.
        </div>
      </GridSlot>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Roadmap · ~10-12 min per case · ~5 min cross-case + Q&A"
        tagline="About ten minutes per case, then synthesis and questions."
      />
    </SlideGrid>
  );
}
