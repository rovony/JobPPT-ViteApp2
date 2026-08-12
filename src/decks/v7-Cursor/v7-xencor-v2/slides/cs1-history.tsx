// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Target, Wind, Dna } from 'lucide-react';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS1 · PAH treatment history — three decades, four pathways.
 *
 * Redesigned to strict 2-column dossier layout.
 */

const TIMELINE_EVENTS = [
  // ERA 1: SUPPORTIVE
  { year: '~1990', era: 'supportive', label: 'Supportive care only',
    detail: 'O₂, anticoagulation, CCBs', tone: 'var(--cream-faint)', pathway: '—' },

  // ERA 2: FIRST-IN-CLASS PATHWAY DRUGS (1995–2007)
  { year: '1995', era: 'firsts', label: 'epoprostenol IV · Flolan',
    detail: 'First PAH-specific therapy', tone: 'var(--amber)', badge: 'PGI2' },
  { year: '2001', era: 'firsts', label: 'bosentan · Tracleer',
    detail: 'First oral PAH therapy', tone: 'var(--coral)', badge: 'ET' },
  { year: '2005', era: 'firsts', label: 'sildenafil · Revatio',
    detail: 'First PDE5i for PAH', tone: 'var(--violet)', badge: 'NO' },

  // ERA 3: SELECTIVE + ORAL EXPANSION (2007–2015) — THIS CASE
  { year: '2007', era: 'thiscase', label: 'ambrisentan · Letairis',
    detail: 'Selective ETA · oral once-daily', tone: 'var(--coral)', badge: 'ET · ★ THIS CASE', highlight: true },
  { year: '2013', era: 'thiscase', label: 'macitentan · Opsumit',
    detail: 'Tissue-targeted ERA', tone: 'var(--coral)', badge: 'ET' },
  { year: '2013', era: 'thiscase', label: 'riociguat · Adempas',
    detail: 'Soluble guanylate cyclase stimulator', tone: 'var(--violet)', badge: 'NO' },
  { year: '2015', era: 'thiscase', label: 'selexipag · Uptravi',
    detail: 'Oral non-prostanoid IP-receptor agonist', tone: 'var(--amber)', badge: 'PGI2' },

  // ERA 4: activin / TGF-beta axis (2024)
  { year: 'Mar 2024', era: 'merck', label: 'sotatercept · Winrevair',
    detail: 'Activin-signaling inhibitor', tone: 'var(--sage)', badge: 'ACTIVIN', highlight: true },
];

const PATHWAYS = [
  { name: 'Prostacyclin (PGI2)', firstYear: '1995', tone: 'var(--amber)', count: 5, drugs: 'epoprostenol · treprostinil · iloprost · selexipag · beraprost' },
  { name: 'NO · cGMP', firstYear: '2005', tone: 'var(--violet)', count: 3, drugs: 'sildenafil · tadalafil · riociguat' },
  { name: 'Endothelin / ERA', firstYear: '2001', tone: 'var(--coral)', count: 3, drugs: 'bosentan · ambrisentan · macitentan', hero: true },
  { name: 'Activin / TGF-β', firstYear: '2024', tone: 'var(--sage)', count: 1, drugs: 'sotatercept', merck: true },
];

export default function CS1History() {
  const reduce = useReducedMotion();
  const go = !reduce;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · PAH treatment history · three decades · four pathways</Eyebrow>

      <Headline delay={0.25} maxChars={50}>
        Four pathways, three decades —{' '}
        <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>sotatercept opened the fourth.</span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        PGI2 in 1995. ET in 2001. NO·cGMP in 2005. The fourth pathway — BMPR2 / activin — arrived in March 2024 with sotatercept.
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

            {/* Icon Legend (Variant B Style) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-3)',
              marginTop: 'var(--space-4)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--cream-hairline)',
            }}>
              {[
                { label: 'PGI2', subLabel: 'Prostacyclin', Icon: Activity, tone: 'var(--amber)' },
                { label: 'ET', subLabel: 'Endothelin', Icon: Target, tone: 'var(--coral)' },
                { label: 'NO', subLabel: 'Nitric Oxide', Icon: Wind, tone: 'var(--violet)' },
                { label: 'BMPR2', subLabel: 'Activin Axis', Icon: Dna, tone: 'var(--sage)' },
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

          {/* RIGHT COLUMN: The 4 Pathways (2x2 Grid) */}
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
              {PATHWAYS.map((p, i) => (
                <motion.div 
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={go ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, ease: EASE, delay: 1.2 + (i * 0.1) }}
                  style={{
                    padding: 'var(--space-6)',
                    border: (p.hero || p.merck)
                      ? `1.5px solid ${p.tone}`
                      : `1px solid color-mix(in srgb, ${p.tone} 30%, transparent)`,
                    borderLeft: `5px solid ${p.tone}`,
                    background: (p.hero || p.merck)
                      ? `color-mix(in srgb, ${p.tone} 15%, var(--bg))`
                      : `color-mix(in srgb, ${p.tone} 5%, var(--panel))`,
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                    boxShadow: (p.hero || p.merck) ? '0 4px 24px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  <div className="deck-mono uppercase" style={{
                    fontSize: '14px',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: p.tone,
                    fontWeight: 700,
                  }}>since {p.firstYear}</div>
                  
                  <div className="deck-display" style={{
                    fontSize: 'clamp(1.5rem, 2vw, 2.2rem)',
                    fontWeight: (p.hero || p.merck) ? 700 : 600,
                    color: (p.hero || p.merck) ? p.tone : 'var(--cream)',
                    lineHeight: 1.2,
                  }}>{p.name}</div>
                  
                  <div className="deck-body" style={{
                    fontSize: '16px',
                    color: 'var(--cream)',
                    opacity: 0.7,
                    lineHeight: 1.5,
                    marginTop: 'auto',
                  }}>{p.drugs}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </Viz>

      <Footer
        kicker="Case 01 · PAH treatment history"
        tagline="Four pathways. Three decades. The fourth column opened in 2024."
        source="Sources · FDA Orange Book · Letairis PI · Tracleer PI · Opsumit PI · Winrevair PI · Hoeper NEJM 2023"
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
        fontSize: '15px',
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
            fontSize: '22px',
            color: e.highlight ? e.tone : 'var(--cream)',
            fontWeight: e.highlight ? 700 : 500,
            lineHeight: 1.2,
            display: 'inline-block',
          }}
        >
          {e.label}
        </motion.span>
        <span className="deck-body" style={{
          fontSize: '15px',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
          marginTop: 4,
        }}>{e.detail}</span>
      </div>
      
      {e.badge && (
        <span className="deck-mono uppercase" style={{
          fontSize: '12px',
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
