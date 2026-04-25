import React from 'react';
import { motion, LayoutGroup } from 'framer-motion';

/**
 * PillarArchitecture — the T6 cinematic spine for CS2.
 *
 * v2 (Apr-26 audit pass — cards-actually-readable + framework named):
 *   • SEED was a 3×2 grid of empty 60×36 boxes that read as
 *     "placeholder containers staring at the audience" — replaced with
 *     a labeled seed: each box now carries its number + short tag at
 *     readable font sizes, so the audience reads "six pillars about
 *     to lock in" not "six empty rectangles".
 *   • FULL was a 3×2 grid of fixed 168×108 boxes inside a 1179×628
 *     canvas, leaving huge dead margins around each card. Replaced
 *     with a fluid 3×2 grid (auto rows / auto cols, gap scaled to
 *     space tokens) that fills the available area, with bigger pillar
 *     numerals + outcome lines so the architecture feels load-bearing
 *     instead of decorative.
 *   • Each PillarCard now carries an `outcome` line (one-sentence
 *     verdict per pillar) so the FULL grid is no longer just
 *     "category labels" — it tells what each pillar concluded.
 *   • All pillars carry stable layoutIds so the seed→full→hero6→hero15
 *     morph still works across slides 17 → 18 → 19 → 20.
 */

export const PILLARS = [
  {
    id: 1,
    name: 'Population PK',
    short: 'PopPK',
    tag: 'Jiang 2021 · race not significant',
    outcome: 'Race covariate dropped — no AUC effect',
  },
  {
    id: 2,
    name: 'Exposure–Response',
    short: 'E-R',
    tag: 'India ≈ Global · Δ 0.2 pp',
    outcome: 'Indian-population AUC ≈ pivotal AUC',
  },
  {
    id: 3,
    name: 'Intrinsic factors',
    short: 'Intrinsic',
    tag: 'Body-weight dominant',
    outcome: 'Hep/renal labeled · ethnicity not modifier',
  },
  {
    id: 4,
    name: 'Extrinsic factors',
    short: 'Extrinsic',
    tag: 'Food / DDI bounded',
    outcome: 'No ethnic-specific modifier identified',
  },
  {
    id: 5,
    name: 'Safety database',
    short: 'Safety',
    tag: '15,867 patients · 8 yr',
    outcome: 'Zero new safety signals · global cohort',
  },
  {
    id: 6,
    name: 'ICH E5(R1) Apx D',
    short: 'ICH E5 Apx D',
    tag: '9 of 9 criteria satisfied',
    outcome: 'Drug formally classified ethnically insensitive',
  },
];

export default function PillarArchitecture({
  stage = 'full',
  layoutGroupId = 'cs2-pillars',
  children,
  accent = 'var(--cyan)',
}) {
  return (
    <LayoutGroup id={layoutGroupId}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {stage === 'seed'   && <SeedGrid accent={accent} />}
        {stage === 'full'   && <FullGrid accent={accent} />}
        {stage === 'hero6'  && <Hero6Layout accent={accent}>{children}</Hero6Layout>}
        {stage === 'hero15' && <Hero15Layout accent={accent} />}
      </div>
    </LayoutGroup>
  );
}

/* ─── Stage: seed (slide 17 footer) ─────────────────────────────── */
/* No longer empty: each card carries its number + short tag at the
   slide's --fs-card-label floor, so the audience reads "six labeled
   pillars about to lock in" instead of "six placeholder boxes". */
function SeedGrid({ accent }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        gap: 'var(--space-3)',
        width: '100%',
        height: '100%',
        alignContent: 'stretch',
        justifyContent: 'stretch',
      }}
    >
      {PILLARS.map((p) => (
        <PillarCard key={p.id} pillar={p} accent={accent} variant="seed" fluid />
      ))}
    </div>
  );
}

/* ─── Stage: full (slide 18) ────────────────────────────────────── */
/* Fluid grid: cards fill the available area instead of sitting in fixed
   168×108 islands. Each card carries pillar number + name + tag +
   outcome — the architecture is the deliverable. */
function FullGrid({ accent }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
        gap: 'var(--space-4)',
        width: '100%',
        height: '100%',
      }}
    >
      {PILLARS.map((p) => (
        <PillarCard key={p.id} pillar={p} accent={accent} variant="full" fluid />
      ))}
    </div>
  );
}

/* ─── Stage: hero6 (slide 19) ───────────────────────────────────── */
function Hero6Layout({ accent, children }) {
  const others = PILLARS.filter((p) => p.id !== 6);
  const pillar6 = PILLARS[5];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 160px',
        columnGap: 'var(--space-5)',
        width: '100%',
        height: '100%',
        minHeight: 0,
      }}
    >
      <PillarCard
        pillar={pillar6}
        accent={accent}
        variant="hero"
        fluid
      >
        {children}
      </PillarCard>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(5, 1fr)',
          rowGap: 'var(--space-2)',
          alignContent: 'stretch',
          minHeight: 0,
        }}
      >
        {others.map((p) => (
          <PillarCard key={p.id} pillar={p} accent={accent} variant="margin" fluid />
        ))}
      </div>
    </div>
  );
}

/* ─── Stage: hero15 (slide 20) ──────────────────────────────────── */
function Hero15Layout({ accent }) {
  const chain = PILLARS.filter((p) => p.id !== 6);
  const pillar6 = PILLARS[5];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '140px minmax(0, 1fr)',
        columnGap: 'var(--space-5)',
        width: '100%',
        height: '100%',
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      <div style={{ minHeight: 0, display: 'flex', alignItems: 'center' }}>
        <PillarCard
          pillar={pillar6}
          accent={accent}
          variant="margin"
          fluid
        />
      </div>

      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          columnGap: 'var(--space-3)',
          alignItems: 'center',
          width: '100%',
          minHeight: 0,
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            right: '5%',
            height: 1,
            background: `linear-gradient(90deg, transparent, ${accent} 14%, ${accent} 86%, transparent)`,
            opacity: 0.45,
            zIndex: 0,
          }}
        />
        {chain.map((p) => (
          <div key={p.id} style={{ position: 'relative', zIndex: 1, minHeight: 0, height: '100%' }}>
            <PillarCard pillar={p} accent={accent} variant="chain" fluid />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PillarCard — the morphing element ─────────────────────────── */
function PillarCard({ pillar, accent, variant, children, fluid = false }) {
  const layoutId = `cs2-pillar-${pillar.id}`;
  const isHero = variant === 'hero';
  const isSeed = variant === 'seed';
  const isMargin = variant === 'margin';
  const isChain = variant === 'chain';
  const isFull = variant === 'full';

  const opacityWash = isMargin ? 0.55 : 1;
  const borderColor = isMargin
    ? 'color-mix(in srgb, var(--cream-hairline) 70%, transparent)'
    : accent;
  const borderWidth = isHero ? 2 : 1;

  const padding = isHero
    ? 'var(--space-5)'
    : isSeed
      ? 'var(--space-2) var(--space-3)'
      : isMargin
        ? 'var(--space-2) var(--space-3)'
        : 'var(--space-3) var(--space-4)';

  const numFs = isHero
    ? 'var(--fs-card-numeral)'
    : isFull
      ? 'var(--fs-card-title)'
      : isChain
        ? 'var(--fs-card-body)'
        : isMargin
          ? 'var(--fs-card-label)'
          : 'var(--fs-card-meta)'; // seed

  const nameFs = isHero
    ? 'var(--fs-card-title)'
    : isFull
      ? 'var(--fs-card-body)'
      : isChain
        ? 'var(--fs-card-label)'
        : isMargin
          ? 'var(--fs-card-meta)'
          : 'var(--fs-card-meta)'; // seed

  const nameText = isChain || isMargin || isSeed ? pillar.short : pillar.name;

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } }}
      style={{
        width: fluid ? '100%' : 'auto',
        height: fluid ? '100%' : 'auto',
        padding,
        border: `${borderWidth}px solid ${borderColor}`,
        borderLeft: `${isHero ? 4 : 3}px solid ${accent}`,
        background: isHero
          ? `linear-gradient(135deg, color-mix(in srgb, ${accent} 12%, transparent), color-mix(in srgb, var(--panel) 70%, transparent) 70%)`
          : `color-mix(in srgb, var(--panel) ${isMargin ? 50 : 65}%, transparent)`,
        opacity: opacityWash,
        display: 'flex',
        flexDirection: 'column',
        gap: isHero ? 'var(--space-3)' : isSeed ? 4 : 6,
        minHeight: 0,
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'flex-start',
      }}
    >
      {/* Header row — number + short/long name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: isHero ? 'var(--space-3)' : 8,
          minHeight: 0,
        }}
      >
        <span
          className="deck-display"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: numFs,
            fontWeight: 800,
            color: accent,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {String(pillar.id).padStart(2, '0')}
        </span>
        <span
          className="deck-display"
          style={{
            fontSize: nameFs,
            fontWeight: 700,
            color: 'var(--cream)',
            letterSpacing: '0.01em',
            lineHeight: 1.15,
            flex: 1,
            minWidth: 0,
          }}
        >
          {nameText}
        </span>
      </div>

      {/* Tag (one-line eyebrow under the name) — every variant carries it
          so no card ever reads "empty box". For seed/margin/chain the tag
          IS the only payload; for full it leads into the outcome line. */}
      {(isFull || isChain || isSeed || isMargin) && (
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: isSeed || isMargin ? 'var(--fs-card-meta)' : 'var(--fs-card-meta)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: accent,
            fontWeight: 700,
            lineHeight: 1.3,
            opacity: isMargin ? 0.7 : 0.85,
            wordBreak: 'break-word',
          }}
        >
          {pillar.tag}
        </div>
      )}

      {/* Outcome — packed flush below the tag so the four-piece header
          (numeral · name · tag · outcome) reads as a single editorial
          column. marginTop:auto + a borderTop hairline was tried and
          detached the outcome into a "broken-card footer" with a dead
          band in the middle — the flush stack carries hierarchy on
          its own through type weight + color. */}
      {isFull && (
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream-muted)',
            lineHeight: 1.35,
          }}
        >
          {pillar.outcome}
        </div>
      )}

      {/* Hero content (children — e.g. 9-criterion checklist) */}
      {isHero && children && (
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {children}
        </div>
      )}
    </motion.div>
  );
}
