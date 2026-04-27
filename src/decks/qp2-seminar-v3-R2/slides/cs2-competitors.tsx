// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { Target } from 'lucide-react';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS2 · IDH inhibitor landscape — history + competitors in one frame.
 *
 * Built 2026-04-26 in response to fixes-on-v6.md ask to include
 * competitors AND a separate history visual. This is the IDH-inhibitor
 * class horizon: IDH1 discovery → first-in-class approval → competitive
 * landscape today.
 *
 * Redesigned 2026-04-27 to mirror the 2-column dossier layout from cs1-history.
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
    detail: 'Second IDH1 entrant (Rezlidhia, Rigel)', tone: 'var(--cyan)', badge: 'FDA' },
  { year: 'Aug 2024', era: 'comp', label: 'vorasidenib · IDH-mutant glioma',
    detail: 'CNS-penetrant pan-IDH (Voranigo, Servier · INDIGO)', tone: 'var(--violet)', badge: 'FDA' },
  { year: 'Dec 2024', era: 'comp', label: 'ivosidenib · CDSCO India',
    detail: 'Rule 101 waiver pathway · 1st-in-class for India', tone: 'var(--cyan)', badge: 'CDSCO', highlight: true },
];

const COMPETITORS = [
  { drug: 'enasidenib', target: 'IDH2', sponsor: 'Bristol-Myers Squibb', area: 'AML', tone: 'var(--coral)' },
  { drug: 'ivosidenib', target: 'IDH1', sponsor: 'Servier', area: 'AML · CCA', tone: 'var(--cyan)', hero: true },
  { drug: 'olutasidenib', target: 'IDH1', sponsor: 'Rigel', area: 'AML', tone: 'var(--cyan)' },
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
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.1fr',
          gap: 'var(--space-10)',
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
          
          {/* LEFT COLUMN: Timeline Dossier */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-5)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              gap: 'var(--space-2)',
              height: 'fit-content',
            }}
          >
            {/* Timeline Events */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
              marginTop: 'var(--space-2)',
            }}>
              {TIMELINE_EVENTS.map((e, i) => (
                <TimelineRow key={e.year + e.label} e={e} delay={0.75 + i * 0.06} go={go} />
              ))}
            </div>

            {/* Color Legend Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--space-8)',
              alignItems: 'center',
              marginTop: 'var(--space-2)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid color-mix(in srgb, var(--cream-hairline) 20%, transparent)',
            }}>
              {[
                { label: 'IDH2', subLabel: 'Target', Icon: Target, tone: 'var(--coral)' },
                { label: 'IDH1', subLabel: 'Target', Icon: Target, tone: 'var(--cyan)' },
                { label: 'IDH1/2', subLabel: 'Pan-mutant', Icon: Target, tone: 'var(--violet)' },
              ].map(({ label, subLabel, Icon, tone }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={go ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <Icon size={16} color={tone} strokeWidth={2} />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span className="deck-mono" style={{ fontSize: '11px', color: tone, fontWeight: 700 }}>{label}</span>
                    <span className="deck-body" style={{ fontSize: '11px', color: 'var(--cream-muted)' }}>{subLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Competitors (2x2 Grid) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={go ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 1.0 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-6)',
                width: '100%',
              }}
            >
              {COMPETITORS.map((c, i) => (
                <motion.div 
                  key={c.drug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={go ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, ease: EASE, delay: 1.2 + (i * 0.1) }}
                  style={{
                    padding: 'var(--space-6)',
                    border: c.hero
                      ? `1.5px solid ${c.tone}`
                      : `1px solid color-mix(in srgb, ${c.tone} 30%, transparent)`,
                    borderLeft: `5px solid ${c.tone}`,
                    background: c.hero
                      ? `color-mix(in srgb, ${c.tone} 15%, var(--bg))`
                      : `color-mix(in srgb, ${c.tone} 5%, var(--panel))`,
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                    boxShadow: c.hero ? '0 4px 24px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  <div className="deck-mono uppercase" style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: c.tone,
                    fontWeight: 700,
                  }}>{c.target}</div>
                  
                  <div className="deck-display" style={{
                    fontSize: 'clamp(1.5rem, 2vw, 2.2rem)',
                    fontWeight: c.hero ? 700 : 600,
                    color: c.hero ? c.tone : 'var(--cream)',
                    lineHeight: 1.2,
                  }}>{c.drug}</div>
                  
                  <div className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream)',
                    opacity: 0.7,
                    lineHeight: 1.5,
                    marginTop: 'auto',
                  }}>{c.sponsor} · {c.area}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

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

function TimelineRow({ e, delay, go }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={go ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: EASE, delay }}
      style={{
        display: 'grid',
        gridTemplateColumns: '6rem 12px 1fr auto',
        gap: 'var(--space-4)',
        alignItems: 'start',
        padding: 'var(--space-3) var(--space-4)',
        margin: '0 calc(-1 * var(--space-4))',
        borderRadius: 'var(--radius-md)',
        background: `linear-gradient(90deg, color-mix(in srgb, ${e.tone} 12%, transparent) 0%, transparent 100%)`,
        borderBottom: '1px solid color-mix(in srgb, var(--cream-hairline) 20%, transparent)',
      }}
    >
      <span className="deck-mono" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: e.tone,
        fontWeight: e.highlight ? 700 : 500,
        paddingTop: 4,
      }}>{e.year}</span>
      
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%', paddingTop: 8 }}>
        <span style={{
          width: 10, height: 10, borderRadius: '50%',
          background: e.tone,
          opacity: e.highlight ? 1 : 0.6,
        }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <motion.span 
          layoutId={`history-row-${e.label.split(' ')[0].toLowerCase()}`}
          transition={{ layout: { duration: 1.2, ease: "easeInOut" } }}
          className="deck-display" 
          style={{
            fontSize: 'var(--fs-slide-subhead)',
            color: e.highlight ? e.tone : 'var(--cream)',
            fontWeight: e.highlight ? 700 : 500,
            lineHeight: 1.2,
            display: 'inline-block',
          }}
        >
          {e.label}
        </motion.span>
        <span className="deck-body" style={{
          fontSize: 'var(--fs-slide-pageno)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
          marginTop: 4,
        }}>{e.detail}</span>
      </div>
      
      {e.badge && (
        <span className="deck-mono uppercase" style={{
          fontSize: 'calc(var(--fs-slide-pageno) * 0.85)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: e.tone,
          padding: '4px 8px',
          border: `1px solid color-mix(in srgb, ${e.tone} 35%, transparent)`,
          borderRadius: 4,
          fontWeight: 700,
          marginTop: 2,
        }}>{e.badge}</span>
      )}
    </motion.div>
  );
}
