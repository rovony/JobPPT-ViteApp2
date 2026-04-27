// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 BACKUP · B20 · Full Story
 *
 * V6 Type 1 — Historical Context lane.
 *
 * Source · PAH-Reference-CompleteReport-v1.md §§5–8, 11, 13–14 ·
 * Beghetti et al. Br J Clin Pharmacol 2009 · Barst et al. Circulation
 * 2014 · Ivy et al. J Pediatr X 2020 · Okour et al. J Clin Pharmacol
 * 2023 · FDA Letairis label 2024 · Eur J Pediatr 2024 LTE.
 *
 * Purpose: one backup slide for the full hostile-Q&A story: adult anchor,
 * pediatric impossibility, safety / commercial constraints, and why a
 * defensible pediatric dose still emerged.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const STORY = [
  {
    n: '01',
    lane: 'Adult anchor',
    title: 'Mature adult dose',
    proof: '380 adults · 3,126 PK observations · 6 placebo-controlled studies',
    note: 'Exposure-response already characterized; pediatric work did not invent the therapeutic window.',
  },
  {
    n: '02',
    lane: 'Pediatric reality',
    title: 'Trial cannot carry it',
    proof: '39 PK-evaluable patients · open-label · PK + safety primary',
    note: 'Rare disease, ethical placebo limits, endpoint weakness, and sparse blood sampling define the study.',
  },
  {
    n: '03',
    lane: 'Field warning',
    title: 'Empirical dose escalation became unsafe',
    proof: 'STARTS-2 · high-vs-low mortality HR 3.95',
    note: 'Sildenafil did not create the architecture; it made dose-selection conservatism unavoidable.',
  },
  {
    n: '04',
    lane: 'Program headwinds',
    title: 'Three constraints hit the program',
    proof: 'Juvenile rat hold · formal 2019 termination · split US / EU rights',
    note: 'The package had to survive safety scrutiny, incomplete enrollment, and a filing geography problem.',
  },
  {
    n: '05',
    lane: 'Decision evidence',
    title: 'Exposure matching carried the label',
    proof: 'Low dose −3% · high dose +0.3% vs adult AUC',
    note: 'EMA and PMDA accepted the totality: adult efficacy, pediatric PK, safety, and LTE follow-up.',
  },
];

function StoryCard({ item, delay, go, reduced, emphasized }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        minHeight: 0,
        border: emphasized
          ? '1.5px solid var(--case)'
          : '1px solid var(--cream-hairline)',
        borderLeft: emphasized ? '4px solid var(--case)' : '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-lg)',
        background: emphasized
          ? 'linear-gradient(180deg, color-mix(in srgb, var(--case) 10%, transparent), color-mix(in srgb, var(--panel) 72%, transparent) 74%)'
          : 'color-mix(in srgb, var(--panel) 62%, transparent)',
        padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: emphasized ? 'var(--case)' : 'var(--cream-faint)',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {item.n} · {item.lane}
      </div>

      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)',
          fontWeight: 700,
          lineHeight: 1.16,
          letterSpacing: '-0.01em',
        }}
      >
        {item.title}
      </div>

      <div
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          color: emphasized ? 'var(--case)' : 'var(--cream)',
          lineHeight: 1.35,
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {item.proof}
      </div>

      <div
        className="deck-body"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          color: 'var(--cream-muted)',
          lineHeight: 1.48,
        }}
      >
        {item.note}
      </div>
    </motion.div>
  );
}

export default function Cs1BackupFullStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B20 · Historical context · Full story</Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        A defensible pediatric dose survived{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          four constraints.
        </span>
      </Headline>

      <Subhead delay={0.42}>
        Adult evidence supplied the anchor; pediatric evidence confirmed the bridge.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            height: '100%',
            minHeight: 0,
            minWidth: 0,
            paddingTop: 'var(--space-2)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(17rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              flex: '1 1 auto',
              minHeight: 0,
            }}
          >
            {STORY.map((item, i) => (
              <StoryCard
                key={item.n}
                item={item}
                delay={0.60 + i * 0.11}
                go={go}
                reduced={reduced}
                emphasized={item.n === '05'}
              />
            ))}
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.25, ease: EASE }}
            style={{
              border: '1px solid color-mix(in srgb, var(--case) 30%, transparent)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--case) 7%, transparent)',
              padding: 'var(--space-3) var(--space-5)',
              flex: '0 0 auto',
            }}
          >
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                color: 'var(--cream)',
                lineHeight: 1.5,
              }}
            >
              Memory hook:{' '}
              <span style={{ color: 'var(--case)', fontWeight: 700 }}>
                Anchor · Headwinds · Label.
              </span>{' '}
              The model did not replace clinical pharmacology; it made the clinical
              pharmacology decision defendable when the usual trial could not.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B20 · CS1 · FULL STORY"
        tagline="Adult anchor. Pediatric bridge. Regulatory decision."
        source="Source · PAH-Reference-CompleteReport-v1 · Beghetti 2009 · Barst 2014 · Ivy 2020 · Okour 2023 · FDA Letairis label 2024 · Eur J Pediatr 2024 LTE"
      />
    </SlideGrid>
  );
}
