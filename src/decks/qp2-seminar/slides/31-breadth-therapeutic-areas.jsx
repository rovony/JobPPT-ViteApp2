import React from 'react';
import { motion } from 'framer-motion';
import { Star, Beaker } from 'lucide-react';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import ThemesConstellation from './closing-divider/ThemesConstellation';

/**
 * Slide 31 · Breadth — Pharmacometric leadership across six clinical
 * domains.
 *
 * The first content slide of Act IV. Whereas the case studies
 * (slides 5–29) demonstrated DEPTH on three programs, this slide
 * answers the implicit question — "is this the only thing he can do?"
 * — with a 6-card domain grid that anchors each domain to a published
 * artifact or named program.
 *
 * Two domains carry FLAGSHIP badges (Rare disease · ambrisentan = CS1;
 * Global regulatory · Tibsovo = CS2). One carries an ACTIVE RESEARCH
 * badge (AI/ML · DeepPK + PharmAgent). This makes the line from
 * "depth slides" to "breadth slide" explicit on the page.
 *
 * Cinematic continuity: the ThemesConstellation from slide 30 morphs
 * into a faint watermark behind the domain grid via the shared
 * layoutId="themes-constellation" — same pattern used for the lung,
 * India, and prior shared elements.
 */

const DOMAINS = [
  {
    key: 'cardiometabolic',
    domain: 'Cardiometabolic',
    /* Reassigned cyan -> sage. Cyan is reserved for CS2 (Tibsovo /
       global regulatory) and is used by global-regulatory below;
       letting cardiometabolic also carry cyan would create a same-
       color two-meaning conflict on this single 6-card breadth
       grid. Sage is the ink-accent and was previously unassigned
       here, so the swap restores the deck-wide rule that each
       case color carries exactly one semantic. */
    token: 'sage',
    program: 'DGAT1 inhibitor · GSK3008356',
    detail: 'PK/PD turnover model for triglycerides',
    cite: 'CPT 2019',
    badge: null,
  },
  {
    key: 'oncology',
    domain: 'Oncology',
    token: 'violet',
    program: 'BCL-2 inhibitor · S65487 · Adult ALL asparaginase',
    detail: 'Combination PK/PD at Servier · CS3 (SPARK-ALL)',
    cite: 'Internal · CS3',
    badge: null,
  },
  {
    key: 'rare-disease',
    domain: 'Rare disease',
    token: 'coral',
    program: 'Pediatric PAH · Ambrisentan',
    detail: 'EMA approval · pediatric extrapolation template (CS1)',
    cite: 'JCP 2023 · CS1',
    badge: 'flagship',
  },
  {
    key: 'antiviral',
    domain: 'Antiviral',
    token: 'sage',
    program: 'IV zanamivir · Dectova',
    detail: 'PopPK/PD in pediatrics',
    cite: 'CTS 2020',
    badge: null,
  },
  {
    key: 'global-regulatory',
    domain: 'Global regulatory',
    token: 'cyan',
    program: 'Tibsovo · India waiver pathway',
    detail: 'CDSCO rare-disease precedent · clin-pharm package (CS2)',
    cite: '2025 · CS2',
    badge: 'flagship',
  },
  {
    key: 'ai-ml',
    domain: 'AI / ML',
    token: 'amber',
    program: 'Neural ODE + multi-agent LLM',
    detail: 'DeepPK and PharmAgent — pharmacometric automation',
    cite: '2024 → present',
    badge: 'active',
  },
];

const STAT_TILES = [
  { value: '15+', label: 'Programs' },
  { value: '8',   label: 'Submissions' },
  { value: '4',   label: 'Approved labels' },
  { value: '6',   label: 'Agencies' },
  { value: '6',   label: 'Domains' },
];

export default function Slide31BreadthTherapeuticAreas() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    backdrop: 0.30,
    grid: 0.95,
    stats: 2.20,
    source: 2.80,
  };

  const T = useTokens([
    '--coral', '--amber', '--cyan', '--sage', '--violet',
    '--cream', '--cream-muted', '--cream-faint', '--cream-hairline',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={D.eyebrow}>Closing · Breadth · Six domains</Eyebrow>
      <Headline delay={D.headline} maxChars={48}>
        Pharmacometric leadership across{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
          six clinical domains.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        Dose, label, and strategy decisions across rare disease,
        oncology, cardiometabolic, antiviral, regulatory, and AI/ML.
      </Subhead>

      <Viz>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: '1fr auto',
            rowGap: 'var(--space-5)',
            minHeight: 0,
          }}
        >
          {/* Constellation context backdrop — morphs IN from slide 30
              hero illustration via shared layoutId. Pinned center-right
              behind the domain grid; mix-blend screen + low opacity
              keeps it readable through cards. Hidden under 1100px. */}
          <div
            aria-hidden
            className="closing-breadth-constellation-bg"
            style={{
              position: 'absolute',
              top: '46%',
              right: '-8%',
              transform: 'translateY(-50%)',
              zIndex: 0,
              opacity: 0.30,
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}
          >
            <ThemesConstellation
              layoutId="themes-constellation"
              variant="context"
            />
          </div>
          <style>{`
            @media (max-width: 1100px) {
              .closing-breadth-constellation-bg { display: none !important; }
            }
          `}</style>

          {/* 6-card grid 3×2 */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: 'var(--space-4)',
              minHeight: 0,
            }}
          >
            {DOMAINS.map((d, i) => (
              <DomainCard
                key={d.key}
                domain={d}
                delay={D.grid + i * 0.10}
                tk={tk}
              />
            ))}
          </div>

          {/* Bottom stat strip — 5 tiles */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 'var(--space-3)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--cream-hairline)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.stats }}
          >
            {STAT_TILES.map((s, i) => (
              <StatTile key={s.label} value={s.value} label={s.label} delay={D.stats + i * 0.07} />
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Closing · 31 of 35"
        source="Source · Peer-reviewed publications · CS1 · CS2 · CS3 · author's pharmacometrics record"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   DomainCard — one tile in the 3×2 breadth grid
   ======================================================== */
function DomainCard({ domain, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const color = tk(`--${domain.token}`);
  const isFlagship = domain.badge === 'flagship';
  const isActive = domain.badge === 'active';

  return (
    <motion.div
      style={{
        position: 'relative',
        padding: 'var(--space-4) var(--space-4) var(--space-3) var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `3px solid ${color}`,
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr auto',
        rowGap: 6,
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {/* Badge ribbon — top-right corner */}
      {(isFlagship || isActive) && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 8px',
            borderRadius: 4,
            background: isFlagship
              ? `color-mix(in srgb, ${color} 22%, transparent)`
              : 'color-mix(in srgb, var(--amber) 18%, transparent)',
            color: isFlagship ? color : 'var(--amber)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: '0.18em',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          {isFlagship ? <Star size={10} strokeWidth={2.5} /> : <Beaker size={10} strokeWidth={2.5} />}
          {isFlagship ? 'Flagship' : 'Active research'}
        </div>
      )}

      {/* Domain label */}
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 700,
          marginRight: isFlagship || isActive ? 100 : 0,
        }}
      >
        {domain.domain}
      </div>

      {/* Program */}
      <div
        style={{
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)',
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        {domain.program}
      </div>

      {/* Detail */}
      <div
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
        }}
      >
        {domain.detail}
      </div>

      {/* Cite chip */}
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono)',
          color,
          fontWeight: 700,
          paddingTop: 6,
          borderTop: '1px dashed var(--cream-hairline)',
        }}
      >
        {domain.cite}
      </div>
    </motion.div>
  );
}

/* ========================================================
   StatTile — one tile in the bottom 5-tile stat strip
   ======================================================== */
function StatTile({ value, label, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        textAlign: 'center',
        padding: 'var(--space-3) var(--space-2)',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-numeral)',
          color: 'var(--cream)',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}
