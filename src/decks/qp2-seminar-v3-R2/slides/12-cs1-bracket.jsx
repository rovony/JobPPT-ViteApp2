import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Slide 12 (slot) — V2-S8 · The framework · 5-node flow diagram.
 *
 * Redesigned per user spec: five architecture nodes connected by arrows,
 * showing the reasoning chain from adult data → exposure match.
 * Diagnostics (pcVPC, GOF, covariate plots) deferred to backup slides.
 *
 * Source: Okour M et al. J Clin Pharmacol 2023;63(5):593–603.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const NODES = [
  {
    id: '01',
    kicker: 'Adult PK dataset',
    hero: '380',
    heroUnit: 'participants',
    lines: ['6 studies pooled', '3,126 PK observations', 'Rich sampling → structural anchor'],
    isHero: true,
  },
  {
    id: '02',
    kicker: 'PopPK model',
    hero: '2-cmt',
    heroUnit: 'oral',
    lines: ['1st-order absorption + lag', 'CL ∝ WT⁰·⁷⁵  ·  V ∝ WT¹·⁰', 'Allometric exponents fixed'],
    isHero: false,
  },
  {
    id: '03',
    kicker: 'Pediatric simulation',
    hero: 'AUC',
    heroUnit: 'by weight band',
    lines: ['Model-predicted exposure', 'Dose selection for trial', 'Target: adult AUCss range'],
    isHero: false,
  },
  {
    id: '04',
    kicker: 'Trial PK confirmation',
    hero: '39',
    heroUnit: 'patients',
    lines: ['AMB112529 sparse PK', '211 observations', 'Ages 8 to <18 yr'],
    isHero: false,
  },
  {
    id: '05',
    kicker: 'Exposure match',
    hero: '−3%',
    heroUnit: 'low dose',
    lines: ['+0.3% high dose', 'AUCss vs adult target', 'Plateau E-R confirmed'],
    isHero: true,
  },
];

function FlowArrow({ direction = 'right', reduced, delay }) {
  const isDown = direction === 'down';
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--case)',
        fontSize: 'var(--fs-slide-lead)',
        fontWeight: 300,
        opacity: 0.6,
        ...(isDown ? {
          gridColumn: '3 / 4',
          justifySelf: 'center',
          padding: 'var(--space-1) 0',
        } : {
          padding: '0 var(--space-1)',
        }),
      }}
    >
      {isDown ? '↓' : '→'}
    </motion.div>
  );
}

function FlowNode({ node, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        border: node.isHero
          ? '1px solid color-mix(in srgb, var(--case) 40%, transparent)'
          : '1px solid var(--cream-hairline)',
        borderLeft: node.isHero ? '4px solid var(--case)' : undefined,
        borderRadius: 'var(--radius-lg)',
        background: node.isHero
          ? 'color-mix(in srgb, var(--case) 6%, transparent)'
          : 'color-mix(in srgb, var(--panel) 65%, transparent)',
        padding: 'clamp(var(--space-3), 1.4vw, var(--space-4))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        minWidth: 0,
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: node.isHero ? 'var(--case)' : 'var(--cream-faint)',
        fontWeight: 700,
      }}>
        {node.id} · {node.kicker}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
        <span className="deck-display" style={{
          fontSize: 'var(--fs-card-numeral)',
          color: node.isHero ? 'var(--case)' : 'var(--cream)',
          fontWeight: 700,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {node.hero}
        </span>
        <span className="deck-body" style={{
          fontSize: 'var(--fs-slide-subhead)',
          color: 'var(--cream-muted)',
        }}>
          {node.heroUnit}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {node.lines.map((line, i) => (
          <div key={i} className="deck-body" style={{
            fontSize: 'var(--fs-slide-subhead)',
            color: 'var(--cream)',
            opacity: 0.82,
            lineHeight: 1.35,
          }}>
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Cs1Bracket() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>
        Case 01 · The framework
      </Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Five steps from adult anchor to pediatric dose —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          the architecture, not the diagnostics.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={94} size="lead">
        Each node feeds the next. The model wasn&rsquo;t built on N=39 —
        it was confirmed by it.
      </Subhead>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          gridTemplateRows: 'auto auto auto',
          gap: 0,
          alignItems: 'center',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          height: '100%',
          alignContent: 'start',
        }}>
          {/* Row 1: nodes 1 → 2 → 3 */}
          <FlowNode node={NODES[0]} delay={0.80} reduced={reduced} />
          <FlowArrow reduced={reduced} delay={0.95} />
          <FlowNode node={NODES[1]} delay={1.00} reduced={reduced} />
          <FlowArrow reduced={reduced} delay={1.15} />
          <FlowNode node={NODES[2]} delay={1.20} reduced={reduced} />

          {/* Row 2: down-arrow from node 3 */}
          <div style={{ gridColumn: '1 / 3' }} />
          <div style={{ gridColumn: '3 / 4', display: 'flex', justifyContent: 'center' }}>
            <FlowArrow direction="down" reduced={reduced} delay={1.35} />
          </div>
          <div style={{ gridColumn: '4 / 6' }} />

          {/* Row 3: node 5 ← node 4 (right-aligned under node 3) */}
          <div />
          <div />
          <FlowNode node={NODES[3]} delay={1.45} reduced={reduced} />
          <FlowArrow reduced={reduced} delay={1.60} />
          <FlowNode node={NODES[4]} delay={1.65} reduced={reduced} />
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.00}
        kicker="12 · CS1 · FRAMEWORK"
        tagline="The architecture: anchor → model → simulate → confirm → match."
        source="Source · Okour M et al. J Clin Pharmacol 2023;63(5):593–603 · PMID 36579617"
      />
    </SlideGrid>
  );
}
