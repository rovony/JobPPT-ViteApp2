// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS1 · PAH treatment history — three decades, four pathways, Merck arrives.
 *
 * Built 2026-04-26 in response to fixes-on-v6.md ask: "history doesn't need
 * to be in same visual ... so no just enhance current flow ... have history
 * in different viz". The 07b-cs1-mechanism slide already shows ERA selectivity
 * (ambrisentan vs bosentan vs macitentan) inline. THIS slide is the temporal
 * arc: from supportive-only care through prostacyclin / NO·cGMP / ETA — and
 * lands on sotatercept (Merck/Acceleron, 2024) as the BMPR2-pathway entrant.
 *
 * Memory hook: "PGI2 → NO → ET → BMPR2 — and Merck owns the fourth column."
 *
 * Sources verified (FDA Orange Book + drug PI labels):
 *  - epoprostenol (Flolan) FDA 1995 — first PAH-specific therapy
 *  - bosentan (Tracleer) FDA 2001 — first oral, dual ETA/ETB
 *  - sildenafil (Revatio) FDA 2005 — first PDE5i for PAH
 *  - ambrisentan (Letairis) FDA 2007 — selective ETA, oral once-daily
 *  - tadalafil (Adcirca) FDA 2009
 *  - macitentan (Opsumit) FDA 2013, riociguat (Adempas) FDA 2013
 *  - selexipag (Uptravi) FDA 2015 — oral non-prostanoid IP agonist
 *  - sotatercept (Winrevair) FDA Mar 2024 — Merck, activin signaling inhibitor (BMPR2 axis)
 */

const TIMELINE_EVENTS = [
  // ERA 1: SUPPORTIVE
  { year: '~1990', era: 'supportive', label: 'Supportive care only',
    detail: 'O₂, anticoagulation, CCBs (vasoreactive subset)', tone: 'var(--cream-faint)', pathway: '—' },

  // ERA 2: FIRST-IN-CLASS PATHWAY DRUGS (1995–2007)
  { year: '1995', era: 'firsts', label: 'epoprostenol IV · Flolan',
    detail: 'First PAH-specific therapy · prostacyclin pathway', tone: 'var(--amber)', badge: 'PGI2' },
  { year: '2001', era: 'firsts', label: 'bosentan · Tracleer',
    detail: 'First oral PAH therapy · dual ETA/ETB blocker', tone: 'var(--cream)', badge: 'ET' },
  { year: '2005', era: 'firsts', label: 'sildenafil · Revatio',
    detail: 'First PDE5i for PAH · NO·cGMP pathway', tone: 'var(--violet)', badge: 'NO' },

  // ERA 3: SELECTIVE + ORAL EXPANSION (2007–2015) — THIS CASE
  { year: '2007', era: 'thiscase', label: 'ambrisentan · Letairis',
    detail: 'Selective ETA · oral once-daily · Gilead', tone: 'var(--coral)', badge: 'ET · ★ THIS CASE', highlight: true },
  { year: '2013', era: 'thiscase', label: 'macitentan · Opsumit',
    detail: 'Tissue-targeted ERA · Actelion → Janssen', tone: 'var(--cream)', badge: 'ET' },
  { year: '2013', era: 'thiscase', label: 'riociguat · Adempas',
    detail: 'Soluble guanylate cyclase stimulator · Bayer', tone: 'var(--violet)', badge: 'NO' },
  { year: '2015', era: 'thiscase', label: 'selexipag · Uptravi',
    detail: 'Oral non-prostanoid IP-receptor agonist · Actelion', tone: 'var(--amber)', badge: 'PGI2' },

  // ERA 4: MERCK ARRIVES — BMPR2 / activin axis (2024)
  { year: 'Mar 2024', era: 'merck', label: 'sotatercept · Winrevair',
    detail: 'Activin-signaling inhibitor · BMPR2 axis · Merck', tone: 'var(--sage)', badge: 'BMPR2 · MERCK', highlight: true },
];

const PATHWAYS = [
  { name: 'Prostacyclin (PGI2)', firstYear: '1995', tone: 'var(--amber)', count: 5, drugs: 'epoprostenol · treprostinil · iloprost · selexipag · beraprost' },
  { name: 'NO · cGMP', firstYear: '2005', tone: 'var(--violet)', count: 3, drugs: 'sildenafil · tadalafil · riociguat' },
  { name: 'Endothelin (ETA)', firstYear: '2001', tone: 'var(--coral)', count: 3, drugs: 'bosentan · ambrisentan · macitentan', hero: true },
  { name: 'BMPR2 / Activin', firstYear: '2024', tone: 'var(--sage)', count: 1, drugs: 'sotatercept (Merck)', merck: true },
];

export default function CS1History() {
  const reduce = useReducedMotion();
  const go = !reduce;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · PAH treatment history · three decades · four pathways</Eyebrow>

      <Headline delay={0.25} maxChars={50}>
        Four pathways, three decades —{' '}
        <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>Merck owns the fourth.</span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        PGI2 in 1995. ET in 2001. NO·cGMP in 2005. The fourth pathway — BMPR2 / activin — arrived in March 2024 with sotatercept.
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
              gridTemplateColumns: '128px 1fr',
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
              <EraLabel era="SUPPORTIVE" detail="pre-1995" tone="var(--cream-faint)" />
              <EraLabel era="FIRSTS" detail="1995–2005" tone="var(--cream)" />
              <EraLabel era="EXPANSION" detail="2007–2015" tone="var(--coral)" />
              <EraLabel era="MERCK ERA" detail="2024" tone="var(--sage)" />
            </div>

            {/* Events column */}
            <div style={{
              display: 'grid',
              gridTemplateRows: 'repeat(9, minmax(0, 1fr))',
              gap: 4,
              minHeight: 0,
              overflow: 'hidden',
            }}>
              {TIMELINE_EVENTS.map((e, i) => (
                <TimelineRow key={e.year + e.label} e={e} delay={0.75 + i * 0.06} go={go} />
              ))}
            </div>
          </motion.div>

          {/* ── PATHWAY CARD ROW (4 PAH pathways) ── */}
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
            {PATHWAYS.map((p) => (
              <div key={p.name} style={{
                padding: 'var(--space-2) var(--space-3)',
                border: (p.hero || p.merck)
                  ? `1.5px solid ${p.tone}`
                  : `1px solid color-mix(in srgb, ${p.tone} 32%, transparent)`,
                borderLeft: `3px solid ${p.tone}`,
                background: (p.hero || p.merck)
                  ? `color-mix(in srgb, ${p.tone} 12%, var(--panel))`
                  : `color-mix(in srgb, ${p.tone} 5%, var(--panel))`,
                borderRadius: 'var(--radius-md)',
                minWidth: 0,
              }}>
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: p.tone,
                  fontWeight: 700,
                }}>since {p.firstYear} · {p.count} {p.count === 1 ? 'drug' : 'drugs'}</div>
                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  fontWeight: (p.hero || p.merck) ? 700 : 600,
                  color: (p.hero || p.merck) ? p.tone : 'var(--cream)',
                  marginTop: 2,
                }}>{p.name}</div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: 'var(--cream)',
                  opacity: 0.7,
                  marginTop: 2,
                  lineHeight: 1.35,
                }}>{p.drugs}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 01 · PAH treatment history"
        tagline="Four pathways. Three decades. The fourth column is Merck's."
        source="Sources · FDA Orange Book · Letairis PI · Tracleer PI · Opsumit PI · Winrevair PI · Humbert NEJM 2023"
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
