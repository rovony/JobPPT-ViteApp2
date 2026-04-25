import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * Slide 16 · CS2 INTELLECTUAL FOUNDATION — somatic vs germline.
 *
 * Replaces the prior "42 countries · India empty" geography framing.
 * The new arc opens CS2 with the load-bearing intellectual claim:
 * the drug binds a SOMATIC mutation, so inherited ethnic variation
 * cannot modulate drug-target engagement. Everything that follows
 * (PopPK, six pillars, SEC reversal) rests on this foundation.
 *
 * Sources: Dang Nature 2009 (PMID 19935646) · Figueroa Cancer Cell
 * 2010 · OncoKB IDH1-R132 classification.
 *
 * Layout — two-panel split:
 *   LEFT  (mechanism):   normal IDH1 reaction → mutant neomorphic
 *                        reaction → ivosidenib blocker.
 *                        α-KG and 2-HG drawn as real skeletal SVG;
 *                        the C2 position differs by exactly one bond
 *                        (=O ketone vs —OH hydroxyl) — that single-bond
 *                        difference is the visual punchline.
 *   RIGHT (distinction): SOMATIC vs GERMLINE matrix + amber callout
 *                        ("ivosidenib binds the mutated protein —
 *                        same regardless of patient ethnicity").
 *
 * Note · cinematic chain: S15 plants `layoutId="india-cdsco"` IndiaSeed
 * for the CS2 hero. With this rewrite, S18 has no matching layoutId
 * target — the seed fades cleanly on transition. This is intentional;
 * the India anchor is no longer the CS2 visual through-line.
 *
 * Bounding-box audit · α-KG / 2-HG metabolite SVG (viewBox 0 0 240 90):
 *   Element       x-range    y-range    Notes
 *   C1 vertex     50         50         left COOH carbon
 *   C2 vertex     76         35         ketone (α-KG) / hydroxyl (2-HG)
 *   C3 vertex     102        50         methylene
 *   C4 vertex     128        35         methylene
 *   C5 vertex     154        50         right COOH carbon
 *   HO label L    14-26      48-56      left carboxyl hydroxyl
 *   OH label R    180-200    48-56      right carboxyl hydroxyl
 *   =O label C2   72-82      0-10       (α-KG only) ketone oxygen
 *   OH label C2   68-86      0-10       (2-HG only) hydroxyl
 *   =O label C1   46-56      78-88      left carboxyl oxygen
 *   =O label C5   150-160    78-88      right carboxyl oxygen
 * No element pairs overlap; bond lines all terminate ~3px before text labels.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function Slide16Case2Background() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="CS2 · The intellectual foundation"
      headline={
        <>
          Ivosidenib targets a{' '}
          <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
            somatic
          </span>{' '}
          mutation — inherited ethnic variation cannot modulate
          drug–target engagement.
        </>
      }
      headlineMaxChars={120}
      subhead="IDH1 R132 · neomorphic enzyme · 2-hydroxyglutarate · oncometabolite blocks myeloid differentiation."
      subheadMaxChars={110}
      footerKicker="Case 02 · Why local PK data could not modulate this drug's effect"
      footerSource="Source · Dang Nature 2009 (PMID 19935646) · Figueroa Cancer Cell 2010 · OncoKB IDH1-R132 classification"
    >
      <FoundationLayout />
    </SlideFrame>
  );
}

function FoundationLayout() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : undefined;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-4)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
          columnGap: 'var(--space-7)',
          minHeight: 0,
        }}
      >
        <MechanismPanel reducedMotion={reduced} initialOverride={initial} />
        <DistinctionPanel reducedMotion={reduced} initialOverride={initial} />
      </div>

      <BottomRibbon reducedMotion={reduced} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * LEFT PANEL — MECHANISM
 * Three rows (normal → mutant → consequence), with the metabolite
 * SVG diagrams in the middle row.
 * ──────────────────────────────────────────────────────────────── */

function MechanismPanel({ reducedMotion, initialOverride }) {
  return (
    <motion.div
      initial={initialOverride ?? { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        rowGap: 'var(--space-4)',
        padding: 'var(--space-4) var(--space-5)',
        borderLeft: '3px solid var(--cyan)',
        minHeight: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 'var(--space-3)' }}>
        <PanelEyebrow color="var(--cyan)">The mechanism</PanelEyebrow>

        {/* Row 1 · NORMAL: IDH1 catalyzes isocitrate → α-KG (citric acid cycle) */}
        <ReactionRow
          label="Normal"
          reactant="isocitrate"
          enzyme="IDH1"
          product="α-KG"
          cofactor="NADP⁺ → NADPH + CO₂"
          muted
        />
      </div>

      {/* Row 2 · MUTANT: R132 creates a neomorphic reaction α-KG → 2-HG */}
      <MutantReactionRow reducedMotion={reducedMotion} />

      {/* Row 3 · CONSEQUENCE: 2-HG inhibits TET2 → epigenetic block */}
      <ConsequenceLine />
    </motion.div>
  );
}

function PanelEyebrow({ color, children }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        fontSize: 'var(--fs-card-label)',
        letterSpacing: 'var(--ls-mono-wide)',
        color,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

function ReactionRow({ label, reactant, enzyme, product, productMolecule, cofactor, muted }) {
  const inkColor = muted ? 'var(--cream-muted)' : 'var(--cream)';
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-3)',
        alignItems: 'center',
        opacity: muted ? 0.85 : 1,
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          minWidth: 64,
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: inkColor,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontStyle: 'italic' }}>{reactant}</span>
        <ArrowOver enzyme={enzyme} />
        <span style={{ fontStyle: 'italic', fontWeight: 600 }}>{product}</span>
        {productMolecule && (
          <span style={{ display: 'inline-block', width: 96, marginLeft: 4 }}>
            {productMolecule}
          </span>
        )}
        {cofactor && (
          <span
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-card-meta)',
              color: 'var(--cream-muted)',
              opacity: 0.75,
              marginLeft: 'auto',
            }}
          >
            {cofactor}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Mutant reaction: emphasized row with both metabolite SVGs side-by-side
 *    and the ivosidenib blocker drawn as a perpendicular cyan bar. ── */
function MutantReactionRow({ reducedMotion }) {
  const initial = reducedMotion ? false : undefined;
  return (
    <motion.div
      initial={initial ?? { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-3)',
        alignItems: 'center',
        padding: 'var(--space-5) 0',
        borderTop: '1px solid var(--cream-hairline)',
        borderBottom: '1px solid var(--cream-hairline)',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream)',
          fontWeight: 800,
          minWidth: 64,
        }}
      >
        Mutant
      </span>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          columnGap: 'var(--space-3)',
          alignItems: 'center',
          rowGap: 4,
        }}
      >
        {/* Reactant α-KG with structure */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-card-body)',
              color: 'var(--cream)',
              fontStyle: 'italic',
              fontWeight: 600,
            }}
          >
            α-KG
          </span>
          <AlphaKG width={200} />
        </div>

        {/* Reaction arrow with enzyme + ivosidenib blocker stacked */}
        <ReactionArrowWithBlocker />

        {/* Product 2-HG with structure */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-card-body)',
              color: 'var(--cream)',
              fontStyle: 'italic',
              fontWeight: 600,
            }}
          >
            2-HG{' '}
            <span
              className="deck-mono"
              style={{ fontSize: 'var(--fs-card-meta)', color: 'var(--amber)', fontWeight: 700 }}
            >
              ↑↑
            </span>
          </span>
          <TwoHG width={200} />
        </div>
      </div>
    </motion.div>
  );
}

function ReactionArrowWithBlocker() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        position: 'relative',
        minWidth: 132,
      }}
    >
      {/* Enzyme label above */}
      <span
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-card-meta)',
          color: 'var(--cream)',
          fontWeight: 700,
          letterSpacing: 'var(--ls-mono-wide)',
        }}
      >
        IDH1<sup style={{ fontSize: '0.7em' }}>R132</sup>
      </span>
      {/* The arrow itself */}
      <svg viewBox="0 0 132 28" width={132} height={28} aria-hidden style={{ display: 'block' }}>
        <line x1="6" y1="14" x2="120" y2="14" stroke="currentColor" strokeWidth={1.6} style={{ color: 'var(--cream-muted)' }} />
        <polygon points="120,9 130,14 120,19" fill="currentColor" style={{ color: 'var(--cream-muted)' }} />
        {/* Ivosidenib blocker — perpendicular cyan bar across the arrow */}
        <line x1="66" y1="2" x2="66" y2="26" stroke="var(--cyan)" strokeWidth={3} strokeLinecap="round" />
        <line x1="60" y1="2" x2="60" y2="26" stroke="var(--cyan)" strokeWidth={3} strokeLinecap="round" />
      </svg>
      {/* Blocker label below */}
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          color: 'var(--cyan)',
          fontWeight: 800,
          letterSpacing: 'var(--ls-mono-wide)',
        }}
      >
        Ivosidenib blocks
      </span>
    </div>
  );
}

function ConsequenceLine() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-3)',
        alignItems: 'baseline',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          minWidth: 64,
        }}
      >
        Result
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
        }}
      >
        2-HG inhibits TET2 → epigenetic block → myeloid differentiation arrest.
      </span>
    </div>
  );
}

/* ── Reaction arrow with enzyme above (for normal/non-blocked rows) ── */
function ArrowOver({ enzyme }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        margin: '0 6px',
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-card-meta)',
          color: 'var(--cream-muted)',
          fontWeight: 700,
          letterSpacing: 'var(--ls-mono-wide)',
          lineHeight: 1,
        }}
      >
        {enzyme}
      </span>
      <svg viewBox="0 0 60 10" width={60} height={10} aria-hidden style={{ display: 'block' }}>
        <line x1="2" y1="5" x2="50" y2="5" stroke="currentColor" strokeWidth={1.4} style={{ color: 'var(--cream-muted)' }} />
        <polygon points="50,1 58,5 50,9" fill="currentColor" style={{ color: 'var(--cream-muted)' }} />
      </svg>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * METABOLITE SVGS · α-KG and 2-HG
 *
 * Both share the 5-carbon zigzag backbone (C1-C2-C3-C4-C5) with
 * carboxylic acids at C1 and C5. They differ ONLY at C2:
 *   α-KG  · C2 = ketone   (=O double-bonded)
 *   2-HG  · C2 = hydroxyl (—OH single-bonded)
 *
 * That one-bond difference is the entire mechanism story. C2 is
 * highlighted in cyan in both molecules so the audience's eye lands
 * on the difference automatically.
 * ──────────────────────────────────────────────────────────────── */

function AlphaKG({ width = 200 }) {
  return (
    <svg
      viewBox="0 0 240 90"
      width={width}
      role="img"
      aria-label="alpha-ketoglutarate skeletal structure"
      style={{ display: 'block', color: 'var(--cream)' }}
    >
      <Backbone />
      <CarboxylLeft />
      <CarboxylRight />
      {/* C2 ketone (=O up) — highlighted in cyan as the punchline */}
      <g style={{ color: 'var(--cyan)' }}>
        <line x1="76" y1="33" x2="76" y2="14" stroke="currentColor" strokeWidth={1.4} />
        <line x1="80" y1="33" x2="80" y2="16" stroke="currentColor" strokeWidth={1.4} />
        <text
          x="76"
          y="9"
          textAnchor="middle"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            fontWeight: 700,
            fill: 'currentColor',
          }}
        >
          O
        </text>
      </g>
    </svg>
  );
}

function TwoHG({ width = 200 }) {
  return (
    <svg
      viewBox="0 0 240 90"
      width={width}
      role="img"
      aria-label="2-hydroxyglutarate skeletal structure"
      style={{ display: 'block', color: 'var(--cream)' }}
    >
      <Backbone />
      <CarboxylLeft />
      <CarboxylRight />
      {/* C2 hydroxyl (—OH up) — highlighted in cyan, single bond */}
      <g style={{ color: 'var(--cyan)' }}>
        <line x1="76" y1="33" x2="76" y2="14" stroke="currentColor" strokeWidth={1.4} />
        <text
          x="76"
          y="9"
          textAnchor="middle"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            fontWeight: 700,
            fill: 'currentColor',
          }}
        >
          OH
        </text>
      </g>
    </svg>
  );
}

/* Shared backbone: C1-C2-C3-C4-C5 zigzag */
function Backbone() {
  return (
    <g stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
      <line x1="50" y1="50" x2="76" y2="35" />
      <line x1="76" y1="35" x2="102" y2="50" />
      <line x1="102" y1="50" x2="128" y2="35" />
      <line x1="128" y1="35" x2="154" y2="50" />
    </g>
  );
}

/* C1 carboxylic acid: HO— (left) and =O (down) */
function CarboxylLeft() {
  return (
    <g>
      <line x1="50" y1="50" x2="28" y2="50" stroke="currentColor" strokeWidth={1.4} />
      <text
        x="22"
        y="54"
        textAnchor="end"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 700,
          fill: 'currentColor',
        }}
      >
        HO
      </text>
      {/* =O double bond going down */}
      <line x1="50" y1="52" x2="50" y2="74" stroke="currentColor" strokeWidth={1.4} />
      <line x1="54" y1="52" x2="54" y2="72" stroke="currentColor" strokeWidth={1.4} />
      <text
        x="52"
        y="86"
        textAnchor="middle"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 700,
          fill: 'currentColor',
        }}
      >
        O
      </text>
    </g>
  );
}

/* C5 carboxylic acid: —OH (right) and =O (down) */
function CarboxylRight() {
  return (
    <g>
      <line x1="154" y1="50" x2="176" y2="50" stroke="currentColor" strokeWidth={1.4} />
      <text
        x="182"
        y="54"
        textAnchor="start"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 700,
          fill: 'currentColor',
        }}
      >
        OH
      </text>
      {/* =O double bond going down */}
      <line x1="154" y1="52" x2="154" y2="74" stroke="currentColor" strokeWidth={1.4} />
      <line x1="150" y1="52" x2="150" y2="72" stroke="currentColor" strokeWidth={1.4} />
      <text
        x="152"
        y="86"
        textAnchor="middle"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 700,
          fill: 'currentColor',
        }}
      >
        O
      </text>
    </g>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * RIGHT PANEL — SOMATIC vs GERMLINE distinction
 * ──────────────────────────────────────────────────────────────── */

function DistinctionPanel({ reducedMotion, initialOverride }) {
  return (
    <motion.div
      initial={initialOverride ?? { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.6 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        rowGap: 'var(--space-4)',
        padding: 'var(--space-4) var(--space-5)',
        borderLeft: '3px solid var(--cyan)',
        minHeight: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 'var(--space-3)' }}>
        <PanelEyebrow color="var(--cyan)">The distinction</PanelEyebrow>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 'var(--space-3)',
          }}
        >
          <DistinctionCard
            accent="var(--amber)"
            label="Somatic"
            tag="IDH1 R132 — the case"
            rows={[
              'Acquired in tumor cells',
              'Not present in normal tissue',
              'Same R132 lesion across patients',
              'OncoKB · somatic classification',
            ]}
            emphasized
          />
          <DistinctionCard
            accent="var(--cream-muted)"
            label="Germline"
            tag="What CDSCO worried about"
            rows={[
              'Inherited from parents',
              'Present in every cell',
              'Frequencies vary by ancestry',
              'CYP3A4, OATPs, HLAs — yes',
            ]}
          />
        </div>
      </div>

      <AmberCallout reducedMotion={reducedMotion} />
    </motion.div>
  );
}

function DistinctionCard({ accent, label, tag, rows, emphasized = false }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        rowGap: 'var(--space-2)',
        padding: 'var(--space-3)',
        borderLeft: `3px solid ${accent}`,
        background: emphasized ? 'rgba(244, 179, 130, 0.04)' : 'transparent',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: accent,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <span
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-card-meta)',
          color: 'var(--cream-muted)',
          opacity: 0.85,
        }}
      >
        {tag}
      </span>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridAutoRows: 'auto',
          rowGap: 4,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: emphasized ? 'var(--cream)' : 'var(--cream-muted)',
          lineHeight: 1.4,
        }}
      >
        {rows.map((row) => (
          <li key={row} style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
            <span style={{ color: accent, opacity: 0.7, fontSize: '0.85em' }}>·</span>
            <span>{row}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AmberCallout({ reducedMotion }) {
  const initial = reducedMotion ? false : undefined;
  return (
    <motion.div
      initial={initial ?? { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.85 }}
      style={{
        alignSelf: 'end',
        padding: 'var(--space-3) var(--space-4)',
        borderLeft: '3px solid var(--amber)',
        background: 'rgba(244, 179, 130, 0.06)',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber)',
          fontWeight: 700,
          display: 'block',
          marginBottom: 4,
        }}
      >
        The implication
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.4,
        }}
      >
        Ivosidenib binds the <em>mutated</em> protein inside the tumor.
        That protein structure is identical regardless of the patient's
        inherited background — so ethnic variation cannot modulate the
        drug-target interaction.
      </p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * BOTTOM RIBBON · the slide's load-bearing assertion
 * ──────────────────────────────────────────────────────────────── */

function BottomRibbon({ reducedMotion }) {
  const initial = reducedMotion ? false : undefined;
  return (
    <motion.div
      initial={initial ?? { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.4 }}
      style={{
        paddingTop: 'var(--space-3)',
        borderTop: '2px solid var(--cyan)',
      }}
    >
      <p
        className="deck-display"
        style={{
          margin: 0,
          fontSize: 'var(--fs-card-quote)',
          fontWeight: 600,
          color: 'var(--cream)',
          letterSpacing: '-0.005em',
          lineHeight: 1.3,
        }}
      >
        <span style={{ color: 'var(--cyan)', fontWeight: 800 }}>
          Drug target is somatic →
        </span>{' '}
        inherited ethnic variation is irrelevant to drug–target engagement.
      </p>
    </motion.div>
  );
}
