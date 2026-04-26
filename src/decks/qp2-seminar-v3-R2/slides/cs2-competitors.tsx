// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS2 · IDH inhibitor landscape — history + competitors in one frame.
 *
 * Built 2026-04-26 in response to fixes-on-v6.md ask to include
 * competitors AND a separate history visual. This is the IDH-inhibitor
 * class horizon: IDH1 discovery → first-in-class approval → competitive
 * landscape today.
 *
 * Memory hook: "discovery → first → competition" — three eras on one timeline.
 *
 * Sources verified:
 *  - IDH1/IDH2 mutation discovery — Mardis et al. NEJM 2009; Yan NEJM 2009
 *  - ivosidenib FDA approval R/R AML — July 2018
 *  - enasidenib FDA approval R/R AML IDH2 — August 2017 (FIRST in class)
 *  - olutasidenib FDA approval R/R AML IDH1 — December 2022
 *  - vorasidenib FDA approval grade 2 IDH-mutant glioma — August 2024
 *  - ivosidenib + azacitidine ND AML IDH1 — May 2022
 *  - ivosidenib CCA — August 2021
 */

const TIMELINE_EVENTS = [
  // ERA 1: DISCOVERY
  { year: '2008-09', era: 'discovery', label: 'IDH1/IDH2 mutations discovered',
    detail: 'Mardis NEJM · Yan NEJM · 2HG identified', tone: 'var(--cream-faint)' },
  { year: '2010', era: 'discovery', label: 'Dang: 2-HG = oncometabolite',
    detail: 'Mechanism causally linked to AML', tone: 'var(--cream-faint)' },

  // ERA 2: FIRST APPROVALS (competitive race)
  { year: 'Aug 2017', era: 'firsts', label: 'enasidenib · IDH2 R/R AML',
    detail: 'First-in-class IDH2 inhibitor (Idhifa, Celgene/Agios)', tone: 'var(--coral)', badge: 'FDA' },
  { year: 'Jul 2018', era: 'firsts', label: 'ivosidenib · IDH1 R/R AML',
    detail: 'First-in-class IDH1 inhibitor (Tibsovo, Agios → Servier)', tone: 'var(--cyan)', badge: 'FDA · 1ST IDH1', highlight: true },
  { year: 'Aug 2021', era: 'firsts', label: 'ivosidenib · CCA',
    detail: 'IDH1+ cholangiocarcinoma — second indication', tone: 'var(--cyan)', badge: 'FDA' },

  // ERA 3: COMPETITIVE LANDSCAPE
  { year: 'May 2022', era: 'comp', label: 'ivosidenib + AZA · ND AML IDH1',
    detail: 'Front-line combination (AGILE trial)', tone: 'var(--cyan)', badge: 'FDA' },
  { year: 'Dec 2022', era: 'comp', label: 'olutasidenib · IDH1 R/R AML',
    detail: 'Second IDH1 entrant (Rezlidhia, Rigel)', tone: 'var(--coral)', badge: 'FDA' },
  { year: 'Aug 2024', era: 'comp', label: 'vorasidenib · IDH-mutant glioma',
    detail: 'CNS-penetrant pan-IDH (Voranigo, Servier · INDIGO)', tone: 'var(--violet)', badge: 'FDA' },
  { year: 'Dec 2024', era: 'comp', label: 'ivosidenib · CDSCO India',
    detail: 'Rule 101 waiver pathway · 1st-in-class for India', tone: 'var(--cyan)', badge: 'CDSCO', highlight: true },
];

const COMPETITORS = [
  { drug: 'enasidenib', target: 'IDH2', sponsor: 'Bristol-Myers Squibb', area: 'AML', tone: 'var(--coral)' },
  { drug: 'ivosidenib', target: 'IDH1', sponsor: 'Servier', area: 'AML · CCA', tone: 'var(--cyan)', hero: true },
  { drug: 'olutasidenib', target: 'IDH1', sponsor: 'Rigel', area: 'AML', tone: 'var(--coral)' },
  { drug: 'vorasidenib', target: 'IDH1/2', sponsor: 'Servier', area: 'Glioma', tone: 'var(--violet)' },
];

export default function CS2Competitors() {
  const reduce = useReducedMotion();
  const go = !reduce;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · IDH inhibitor landscape · history + competition</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Sixteen years from discovery to{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>first-in-class in India.</span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        IDH1/IDH2 mutations were named in 2008. The first FDA approval came nine years later. The CDSCO Rule-101 approval — sixteen years after the gene was named — was the first IDH-targeted therapy on the Indian market.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-3)', minHeight: 0,
        }}>
          {/* ── TIMELINE ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.6 }}
            style={{
              flex: '1 1 0%',
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
              overflow: 'hidden',
            }}
          >
            {/* Era column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', justifyContent: 'space-around' }}>
              <EraLabel era="DISCOVERY" detail="2008–2010" tone="var(--cream-faint)" />
              <EraLabel era="FIRSTS" detail="2017–2021" tone="var(--cream)" />
              <EraLabel era="LANDSCAPE" detail="2022–2024" tone="var(--cyan)" />
            </div>

            {/* Events column */}
            <div style={{
              display: 'grid',
              gridTemplateRows: 'repeat(9, 1fr)',
              gap: 4,
              minHeight: 0,
              overflow: 'hidden',
            }}>
              {TIMELINE_EVENTS.map((e, i) => (
                <TimelineRow key={e.year + e.label} e={e} delay={0.75 + i * 0.06} go={go} />
              ))}
            </div>
          </motion.div>

          {/* ── COMPETITOR CARD ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 1.5 }}
            style={{
              flexShrink: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(11rem, 100%), 1fr))',
              gap: 'var(--space-2)',
            }}
          >
            {COMPETITORS.map((c) => (
              <div key={c.drug} style={{
                padding: 'var(--space-2) var(--space-3)',
                border: c.hero
                  ? `1.5px solid ${c.tone}`
                  : `1px solid color-mix(in srgb, ${c.tone} 32%, transparent)`,
                borderLeft: `3px solid ${c.tone}`,
                background: c.hero
                  ? `color-mix(in srgb, ${c.tone} 12%, var(--panel))`
                  : `color-mix(in srgb, ${c.tone} 5%, var(--panel))`,
                borderRadius: 'var(--radius-md)',
                minWidth: 0,
              }}>
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: c.tone,
                  fontWeight: 700,
                }}>{c.target}</div>
                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  fontWeight: c.hero ? 700 : 600,
                  color: c.hero ? c.tone : 'var(--cream)',
                  marginTop: 2,
                }}>{c.drug}</div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: 'var(--cream)',
                  opacity: 0.7,
                  marginTop: 2,
                  lineHeight: 1.35,
                }}>{c.sponsor} · {c.area}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · IDH landscape"
        tagline="Discovery, firsts, competition — and India was the column that stayed empty until 2024."
        source="Sources · Mardis NEJM 2008 · Yan NEJM 2009 · FDA Orange Book · Servier press · CDSCO public record"
        delay={1.85}
      />
    </SlideGrid>
  );
}

function EraLabel({ era, detail, tone }) {
  return (
    <div style={{
      padding: 'var(--space-1) var(--space-2)',
      borderLeft: `2px solid ${tone}`,
    }}>
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: tone,
        fontWeight: 700,
      }}>{era}</div>
      <div className="deck-mono" style={{
        fontSize: 'calc(var(--fs-slide-pageno) * 0.85)',
        color: 'var(--cream)',
        opacity: 0.6,
      }}>{detail}</div>
    </div>
  );
}

function TimelineRow({ e, delay, go }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={go ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: EASE, delay }}
      style={{
        display: 'grid',
        gridTemplateColumns: '76px 14px 1fr auto',
        gap: 'var(--space-2)',
        alignItems: 'center',
        padding: '2px var(--space-2)',
        background: e.highlight
          ? `color-mix(in srgb, ${e.tone} 8%, transparent)`
          : 'transparent',
        borderRadius: 'var(--radius-sm)',
        borderLeft: e.highlight ? `2px solid ${e.tone}` : '2px solid transparent',
      }}
    >
      <span className="deck-mono" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: e.tone,
        fontWeight: e.highlight ? 700 : 500,
        whiteSpace: 'nowrap',
      }}>{e.year}</span>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: e.tone,
        opacity: e.highlight ? 1 : 0.6,
        margin: '0 auto',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span className="deck-display" style={{
          fontSize: 'var(--fs-slide-tagline)',
          color: e.highlight ? e.tone : 'var(--cream)',
          fontWeight: e.highlight ? 700 : 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{e.label}</span>
        <span className="deck-body" style={{
          fontSize: 'var(--fs-slide-pageno)',
          color: 'var(--cream)',
          opacity: 0.6,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{e.detail}</span>
      </div>
      {e.badge && (
        <span className="deck-mono uppercase" style={{
          fontSize: 'calc(var(--fs-slide-pageno) * 0.85)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: e.tone,
          padding: '2px 6px',
          border: `1px solid color-mix(in srgb, ${e.tone} 35%, transparent)`,
          borderRadius: 999,
          whiteSpace: 'nowrap',
          fontWeight: 700,
        }}>{e.badge}</span>
      )}
    </motion.div>
  );
}
