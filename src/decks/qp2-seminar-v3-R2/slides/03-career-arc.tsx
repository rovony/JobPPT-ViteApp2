// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz } from '@/components/deck/SlideParts';
import { SmallCoffee, TallCoffee, Thermos, EspressoMachine, IVBag } from './03-career-arc/CaffeineIcons';

/**
 * Slide 03 · Career arc — "A Career in Caffeine"
 *
 * Redesigned to feature a dose-escalation timeline spanning 15 years,
 * from dental surgery (small coffee) to clinical pharmacology director (IV PK drip).
 * Layout optimized to prevent bottom card overflow and fix text sizing.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const STOPS = [
  {
    years: '2004–2010',
    title: 'Dental Surgery (BDS) · JUST',
    items: [
      'Practicing clinician · Jordan License',
      'PhD Scholarship',
      'Patient-level intuition',
    ],
    color: 'var(--coral)',
    Icon: SmallCoffee,
  },
  {
    years: '2012–2015',
    title: 'PhD Clin Pharm · U. Minnesota',
    items: [
      'EHC modeling dissertation',
      'ECP Fellowship',
      '3 research awards',
    ],
    color: 'var(--cyan)',
    Icon: TallCoffee,
  },
  {
    years: 'Summer 2014',
    title: 'Merck · QP2 · Intern',
    items: [
      'NLME simulation under uncertainty',
      'Trial design inputs (sample size, dose range, endpoints)',
    ],
    color: 'var(--violet)',
    Icon: Thermos,
  },
  {
    years: '2015–2022',
    title: 'GlaxoSmithKline · CPMS',
    items: [
      'TA: Respiratory · PAH · HIV · Metabolic',
      'Approvals: Trelegy · Anoro · Dectova · Ambrisentan',
      'Top 10% GSK Award · 10+ Awards · HBV patent',
    ],
    color: 'var(--cyan)',
    Icon: EspressoMachine,
  },
  {
    years: '2022–Present',
    title: 'Servier Pharmaceuticals · Director',
    items: [
      'TA: Oncology (solid + hematologic)',
      'Approvals: Onivyde · Oncaspar · Tibsovo LCM',
      'CP lead · Cross-functional influence',
    ],
    color: 'var(--amber)',
    Icon: IVBag,
  },
];

export default function CareerArc() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = isInView && !reduced;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.10}>
        A Career in Caffeine
      </Eyebrow>

      <Headline delay={0.25} maxChars={60}>
        Fifteen-Year <span style={{ color: 'var(--amber)', fontWeight: 700 }}>Dose-Escalation</span> Study
      </Headline>

      <Subhead delay={0.45} maxChars={100} size="lead">
        n = 1 · self-administered · no ethics committee approval
      </Subhead>

      <Viz>
        <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Main Timeline Area */}
          <div style={{ flex: 1, position: 'relative', marginTop: 'var(--space-2)', minHeight: 0, display: 'flex' }}>
            
            {/* The 5 Stops positioned in an alignment-bottom flex grid for staircase effect */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: 'clamp(var(--space-2), 1vw, var(--space-3))', 
              height: '100%', 
              width: '100%', 
              alignItems: 'end',
              paddingBottom: '1rem',
            }}>
              {STOPS.map((stop, i) => {
                // Staircase effect goes UP from left to right
                const mb = `${i * 3}vh`;

                return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (i * 0.2), ease: EASE }}
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    marginBottom: mb,
                    gap: 'var(--space-3)',
                  }}
                >
                  {/* Icon on top of the card */}
                  <div style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.3))', display: 'flex', justifyContent: 'center' }}>
                    <stop.Icon reduced={reduced} />
                  </div>

                  {/* Info Card underneath the cup */}
                  <div style={{
                    background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid var(--cream-hairline)',
                    borderTop: `3px solid ${stop.color}`,
                    borderRadius: 'var(--radius-md)',
                    padding: 'clamp(0.5rem, 1vw, 1rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                  }}>
                    <div style={{ borderBottom: '1px solid var(--cream-hairline)', paddingBottom: 'var(--space-2)' }}>
                      <div className="deck-display" style={{ fontSize: 'var(--fs-slide-tagline)', color: stop.color, fontWeight: 700, lineHeight: 1.2 }}>
                        {stop.years}
                      </div>
                      <div className="deck-body" style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: 'var(--cream)', fontWeight: 600, lineHeight: 1.3, marginTop: 4 }}>
                        {stop.title}
                      </div>
                    </div>
                    <ul style={{ 
                      margin: 0, 
                      padding: 0, 
                      paddingLeft: '1rem', 
                      color: 'var(--cream-muted)', 
                      fontSize: 'clamp(11px, 1.1vw, 13px)', 
                      lineHeight: 1.4, 
                      fontFamily: 'var(--font-body)' 
                    }}>
                      {stop.items.map((item, j) => {
                        const parts = item.split(': ');
                        if (parts.length > 1) {
                          return (
                            <li key={j} style={{ marginBottom: 4 }}>
                              <span style={{ color: stop.color, fontWeight: 600 }}>{parts[0]}: </span>
                              {parts[1]}
                            </li>
                          );
                        }
                        return <li key={j} style={{ marginBottom: 4 }}>{item}</li>;
                      })}
                    </ul>
                  </div>
                </motion.div>
              )})}
            </div>
          </div>

          {/* Footer Impact Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0, ease: EASE }}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              borderTop: '1px solid var(--cream-hairline)', 
              paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
              flexShrink: 0,
            }}
          >
            {/* Impact Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', maxWidth: '35%' }}>
              <div className="deck-mono uppercase" style={{ fontSize: '10px', color: 'var(--cream-faint)', letterSpacing: '0.1em' }}>
                — IMPACT
              </div>
              <div className="deck-display" style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.4 }}>
                15+ programs · 8 submissions · 6 global health authorities · 20+ peer-reviewed publications · 3 invited international talks
              </div>
            </div>

            {/* Open Source Tools */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'flex-end', flex: 1 }}>
              <div className="deck-mono uppercase" style={{ fontSize: '10px', color: 'var(--cream-faint)', letterSpacing: '0.1em' }}>
                INDEPENDENT INNOVATION — OPEN-SOURCE TOOLS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', width: '100%', maxWidth: '36rem' }}>
                {[
                  { name: 'PharmAgent', desc: '13 agents · 151 tools\nend-to-end QP', color: 'var(--amber)' },
                  { name: 'DeepPK', desc: 'Neural ODE + compartmental PK\nhybrid ML', color: 'var(--violet)' },
                  { name: 'DosePredict', desc: 'PK dose prediction\nJ Clin Pharmacol, 2020', color: 'var(--cyan)' }
                ].map(tool => (
                  <div key={tool.name} style={{ textAlign: 'left', border: `1px solid ${tool.color}`, borderRadius: 'var(--radius-sm)', padding: 'var(--space-2)', background: `color-mix(in srgb, ${tool.color} 8%, transparent)`, boxShadow: `0 4px 12px color-mix(in srgb, ${tool.color} 15%, transparent)` }}>
                    <div className="deck-display" style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: tool.color, fontWeight: 700 }}>{tool.name}</div>
                    <div className="deck-mono" style={{ fontSize: '9px', color: 'var(--cream)', marginTop: 4, lineHeight: 1.3, letterSpacing: '0.02em', whiteSpace: 'pre-wrap' }}>{tool.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Viz>
    </SlideGrid>
  );
}
