import React from 'react';
import { motion, LayoutGroup } from 'framer-motion';

/**
 * PillarArchitecture — the T6 cinematic spine for CS2.
 *
 * Renders the six ICH E5(R1) pillars at four different "stages" that
 * morph into each other across slides 17 → 18 → 19 → 20:
 *
 *   stage="seed"   (slide 17 · turn): tiny 2×3 grid at the bottom of
 *     the slide. Pillars present but unlabeled, still abstract. Just
 *     enough geometry that they're recognizable when they grow on 18.
 *
 *   stage="full"   (slide 18 · strategy): full 2×3 grid, each pillar
 *     labeled with its number and name. None hero. Equal weight. The
 *     architecture is now legible.
 *
 *   stage="hero6"  (slide 19 · pillar 6 hero): pillar 6 (ICH E5 Apx D)
 *     enlarged and centered (~60% of canvas). Other 5 pillars demoted
 *     to a vertical strip on the right margin. Pillar 6 carries the
 *     9-criterion checklist as children.
 *
 *   stage="hero15" (slide 20 · pillars 1-5 hero): pillars 1-5 arranged
 *     as a horizontal chain across the middle. Pillar 6 demoted to the
 *     left margin (small, labeled, muted).
 *
 * Each pillar shares a stable layoutId so framer-motion morphs the
 * positions and sizes between slides. This is the deck's deepest
 * cinematic move — the architecture itself transforms in front of
 * the viewer.
 *
 * Children (when stage="hero6") are rendered inside the pillar 6
 * panel — caller passes the 9-criterion checklist as JSX.
 */

export const PILLARS = [
  { id: 1, name: 'Population PK',       short: 'PopPK',         tag: 'Jiang 2021 · race not significant' },
  { id: 2, name: 'Exposure–Response',   short: 'E-R',           tag: '84.6% ≈ 84.4% · ClarIDHy 1.13–1.15' },
  { id: 3, name: 'Intrinsic factors',   short: 'Intrinsic',     tag: 'Body weight dominant · hep/renal labeled' },
  { id: 4, name: 'Extrinsic factors',   short: 'Extrinsic',     tag: 'Food / DDI · no ethnic modifier' },
  { id: 5, name: 'Safety database',     short: 'Safety',        tag: '15,867 patients · 8 yr · zero new signals' },
  { id: 6, name: 'ICH E5(R1) Apx D',    short: 'ICH E5 Apx D',  tag: '9 of 9 criteria satisfied' },
];

// font* fields are CSS font-size values (token strings) or 0 to mean "hide".
// SEED keeps a raw 8px numeral — below the --fs-card-meta floor (~9.6px) so
// it can't be expressed by a fluid card token without growing.
const SEED_DIMS = { w: 60, h: 36, gap: 4, fontTag: 0, fontName: 0, fontNum: 8 };
const FULL_DIMS = {
  w: 168, h: 108, gap: 18,
  fontTag:  'var(--fs-card-meta)',
  fontName: 'var(--fs-card-body)',
  fontNum:  'var(--fs-card-title)',
};
const MARGIN_DIMS = {
  w: 116, h: 60, gap: 10,
  fontTag: 0,
  fontName: 'var(--fs-card-meta)',
  fontNum:  'var(--fs-card-label)',
};
const CHAIN_DIMS = {
  w: 152, h: 110, gap: 12,
  fontTag:  'var(--fs-card-meta)',
  fontName: 'var(--fs-card-label)',
  fontNum:  'var(--fs-card-body)',
};

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
function SeedGrid({ accent }) {
  const dims = SEED_DIMS;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: dims.gap,
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {PILLARS.map((p) => (
        <PillarCard key={p.id} pillar={p} dims={dims} accent={accent} variant="seed" />
      ))}
    </div>
  );
}

/* ─── Stage: full (slide 18) ────────────────────────────────────── */
function FullGrid({ accent }) {
  const dims = FULL_DIMS;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: dims.gap,
        width: '100%',
        height: '100%',
        alignContent: 'center',
      }}
    >
      {PILLARS.map((p) => (
        <PillarCard key={p.id} pillar={p} dims={dims} accent={accent} variant="full" />
      ))}
    </div>
  );
}

/* ─── Stage: hero6 (slide 19) ───────────────────────────────────── */
function Hero6Layout({ accent, children }) {
  const dims = MARGIN_DIMS;
  const others = PILLARS.filter((p) => p.id !== 6);
  const pillar6 = PILLARS[5];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 140px',
        columnGap: 'var(--space-5)',
        width: '100%',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* HERO — pillar 6 */}
      <PillarCard
        pillar={pillar6}
        accent={accent}
        variant="hero"
        dims={{ w: '100%', h: '100%', fontTag: 0, fontName: 'var(--fs-card-title)', fontNum: 'var(--fs-card-numeral)' }}
      >
        {children}
      </PillarCard>

      {/* MARGIN — other 5 stacked */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(5, 1fr)`,
          rowGap: dims.gap,
          alignContent: 'stretch',
          minHeight: 0,
        }}
      >
        {others.map((p) => (
          <PillarCard key={p.id} pillar={p} dims={dims} accent={accent} variant="margin" />
        ))}
      </div>
    </div>
  );
}

/* ─── Stage: hero15 (slide 20) ──────────────────────────────────── */
function Hero15Layout({ accent }) {
  const dims = CHAIN_DIMS;
  const marginDims = MARGIN_DIMS;
  const chain = PILLARS.filter((p) => p.id !== 6);
  const pillar6 = PILLARS[5];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '120px minmax(0, 1fr)',
        columnGap: 'var(--space-5)',
        width: '100%',
        height: '100%',
        minHeight: 0,
        alignItems: 'center',
      }}
    >
      {/* MARGIN — pillar 6 demoted */}
      <div style={{ minHeight: 0 }}>
        <PillarCard
          pillar={pillar6}
          dims={{ ...marginDims, w: '100%', h: 96 }}
          accent={accent}
          variant="margin"
        />
      </div>

      {/* CHAIN — pillars 1-5 with connecting lines */}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          columnGap: dims.gap,
          alignItems: 'center',
          width: '100%',
          minHeight: 0,
        }}
      >
        {/* Connector line behind the cards */}
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
          <div key={p.id} style={{ position: 'relative', zIndex: 1, minHeight: 0 }}>
            <PillarCard pillar={p} dims={dims} accent={accent} variant="chain" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PillarCard — the morphing element ─────────────────────────── */
function PillarCard({ pillar, dims, accent, variant, children }) {
  const layoutId = `cs2-pillar-${pillar.id}`;
  const isHero = variant === 'hero';
  const isSeed = variant === 'seed';
  const isMargin = variant === 'margin';
  const isChain = variant === 'chain';

  const opacityWash = isMargin ? 0.5 : 1;
  const borderWidth = isHero ? 2 : 1;
  const borderColor = isMargin
    ? 'color-mix(in srgb, var(--cream-hairline) 70%, transparent)'
    : accent;

  const padding = isHero
    ? 'var(--space-6)'
    : isSeed
      ? '4px 6px'
      : isMargin
        ? '8px 10px'
        : 'var(--space-3) var(--space-4)';

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } }}
      style={{
        width: typeof dims.w === 'number' ? dims.w : dims.w,
        height: typeof dims.h === 'number' ? dims.h : dims.h,
        padding,
        border: `${borderWidth}px solid ${borderColor}`,
        borderLeft: `${isHero ? 4 : 3}px solid ${accent}`,
        borderRadius: 'var(--radius-md)',
        background: isHero
          ? `linear-gradient(135deg, color-mix(in srgb, ${accent} 12%, transparent), color-mix(in srgb, var(--panel) 70%, transparent) 70%)`
          : `color-mix(in srgb, var(--panel) ${isMargin ? 50 : 65}%, transparent)`,
        opacity: opacityWash,
        display: 'flex',
        flexDirection: 'column',
        gap: isHero ? 'var(--space-3)' : 4,
        minHeight: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top row — number + short name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: isHero ? 'var(--space-3)' : 6,
          minHeight: 0,
        }}
      >
        <span
          className="deck-display"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: dims.fontNum || 12,
            fontWeight: 800,
            color: accent,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {String(pillar.id).padStart(2, '0')}
        </span>
        {!isSeed && Boolean(dims.fontName) && (
          <span
            className="deck-display"
            style={{
              fontSize: dims.fontName,
              fontWeight: 700,
              color: 'var(--cream)',
              letterSpacing: '0.01em',
              lineHeight: 1.15,
              flex: 1,
              minWidth: 0,
            }}
          >
            {isChain || isMargin ? pillar.short : pillar.name}
          </span>
        )}
      </div>

      {/* Tag line — Boolean() guards prevent React from rendering the
          numeric `0` value when fontTag is explicitly disabled (the
          classic JS short-circuit-returns-falsy-value trap). */}
      {!isSeed && !isMargin && !isHero && Boolean(dims.fontTag) && (
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: dims.fontTag,
            color: 'var(--cream-muted)',
            lineHeight: 1.3,
            letterSpacing: 0,
            textTransform: 'none',
          }}
        >
          {pillar.tag}
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
