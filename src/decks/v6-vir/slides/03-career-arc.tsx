// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz } from '@/components/deck/SlideParts';
import { SmallCoffee, TallCoffee, Thermos, EspressoMachine, IVBag } from './03-career-arc/CaffeineIcons';

/**
 * Slide 03 · Career arc — "Five stops, one operating question"
 *
 * Professional timeline spanning 15+ years, from practicing clinician to
 * clinical pharmacology director.
 * Layout optimized to prevent bottom card overflow and fix text sizing.
 */

const EASE = [0.2, 0.7, 0.3, 1];
const SPINE_PATH = 'M 80 360 C 170 352, 205 325, 270 305 C 350 286, 392 276, 460 275 C 555 274, 595 225, 670 210 C 770 188, 812 160, 900 145';

const STOP_LAYOUT = [
  { x: 10, y: 72, width: 'clamp(9.25rem, 13vw, 14rem)', iconScale: 0.58, translateX: 0 },
  { x: 26.5, y: 61, width: 'clamp(10rem, 14vw, 15rem)', iconScale: 0.58, translateX: 0 },
  { x: 44.5, y: 55, width: 'clamp(10rem, 15vw, 15.75rem)', iconScale: 0.58, translateX: 0 },
  { x: 62, y: 42, width: 'clamp(10.5rem, 15.5vw, 16.5rem)', iconScale: 0.58, translateX: 0 },
  { x: 98.5, y: 29, width: 'clamp(10.5rem, 16.5vw, 16.75rem)', iconScale: 0.54, translateX: '-100%' },
];

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
    title: 'QP2 · Intern',
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
        Career arc · five stops · five cups
      </Eyebrow>

      <Headline delay={0.25} maxChars={60}>
        From espresso to IV drip,{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 700 }}>one question.</span>
      </Headline>

      <Subhead delay={0.45} maxChars={100} size="lead">
        How do we turn incomplete evidence into a defensible clinical pharmacology decision?
      </Subhead>

      <Viz>
        <div ref={ref} style={{ '--career-short-lift': 'max(0px, calc((900px - 100vh) * 0.35))', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {/* Main Timeline Area — shared stop anchors keep the cards, cups,
              and amber spine on the same responsive coordinate system. */}
          <div style={{ flex: 1, position: 'relative', marginTop: 'var(--space-2)', minHeight: 0, overflow: 'hidden' }}>

            {/* Ascending amber spine SVG behind the cards */}
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, transform: 'translateY(calc(-1 * var(--career-short-lift)))' }}
            >
              <motion.path
                d={SPINE_PATH}
                fill="none"
                stroke="var(--amber)"
                strokeWidth={2}
                strokeLinecap="round"
                opacity={0.2}
                strokeDasharray={1600}
                initial={{ strokeDashoffset: 1600 }}
                animate={go ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
              />
              <path
                d={SPINE_PATH}
                fill="none"
                stroke="var(--amber)"
                strokeWidth={8}
                strokeLinecap="round"
                opacity={0.05}
              />
            </svg>

            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              {STOPS.map((stop, i) => {
                const layout = STOP_LAYOUT[i];

                return (
                <motion.div 
                  key={i}
                  data-career-stop={stop.years}
                  initial={{ opacity: 0, x: layout.translateX ?? 0, y: 20 }}
                  animate={go ? { opacity: 1, x: layout.translateX ?? 0, y: 0 } : { opacity: 1, x: layout.translateX ?? 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (i * 0.2), ease: EASE }}
                  style={{ 
                    position: 'absolute',
                    left: `${layout.x}%`,
                    top: `calc(${layout.y}% - var(--career-short-lift))`,
                    width: layout.width,
                    maxWidth: 'calc(100% - var(--space-2))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 'clamp(var(--space-1), 1vh, var(--space-2))',
                  }}
                >
                  {/* Icon base sits on the amber spine; card top follows the
                      same anchor with a small responsive breathing gap. */}
                  <div style={{
                    filter: 'drop-shadow(0 6px 10px color-mix(in srgb, var(--bg) 35%, transparent))',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    transform: `translateX(-50%) translateY(-100%) scale(${layout.iconScale})`,
                    transformOrigin: 'bottom center',
                    pointerEvents: 'none',
                  }}>
                    <stop.Icon reduced={reduced} />
                  </div>

                  {/* Info Card */}
                  <div style={{
                    marginTop: 'clamp(0.45rem, 1.1vh, 0.85rem)',
                    background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid var(--cream-hairline)',
                    borderTop: `3px solid ${stop.color}`,
                    borderRadius: 'var(--radius-md)',
                    padding: 'clamp(0.6rem, 1.2vw, 1.1rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                  }}>
                    <div style={{ borderBottom: '1px solid var(--cream-hairline)', paddingBottom: 'var(--space-2)' }}>
                      <div className="deck-display" style={{ fontSize: 'var(--fs-slide-tagline)', color: stop.color, fontWeight: 700, lineHeight: 1.2 }}>
                        {stop.years}
                      </div>
                      <div className="deck-body" style={{ fontSize: 'var(--fs-slide-kicker)', color: 'var(--cream)', fontWeight: 600, lineHeight: 1.3, marginTop: 'var(--space-1)' }}>
                        {stop.title}
                      </div>
                    </div>
                    <ul style={{ 
                      margin: 0, 
                      padding: 0, 
                      paddingLeft: '1rem', 
                      color: 'var(--cream-muted)', 
                      fontSize: 'var(--fs-slide-eyebrow)', 
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
              flexWrap: 'wrap',                                 /* wrap on narrow viewports */
              gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderTop: '1px solid var(--cream-hairline)',
              paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
              flexShrink: 0,
            }}
          >
            {/* Impact Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: '1 1 18rem', maxWidth: 'min(35%, 28rem)', minWidth: '14rem' }}>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', letterSpacing: '0.1em' }}>
                IMPACT
              </div>
              <div className="deck-display" style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.4 }}>
                15+ programs · 8 submissions · 6 global health authorities · 20+ peer-reviewed publications · 3 invited international talks
              </div>
            </div>

            {/* Independent innovation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'flex-end', flex: '1 1 28rem', minWidth: 'min(100%, 22rem)' }}>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', letterSpacing: '0.1em' }}>
                INDEPENDENT INNOVATION — RESEARCH SYSTEMS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(12rem, 100%), 1fr))', gap: 'var(--space-2)', width: '100%', maxWidth: '44rem' }}>
                {[
                  { name: 'PharmAgent', desc: '13 agents · 151 tools\nmanuscript in prep · Case 3', color: 'var(--amber)', github: null },
                  { name: 'DeepPK', desc: 'Neural ODE + compartmental PK\nhybrid ML', color: 'var(--violet)', github: 'malekokour/DeepPK' },
                  { name: 'DosePredict', desc: 'Shiny app · PK-based dosing\nJ Clin Pharmacol', color: 'var(--cyan)', github: 'malekokour/DosePredict' }
                ].map(tool => (
                  <div key={tool.name} style={{ textAlign: 'left', border: `1px solid ${tool.color}`, borderRadius: 'var(--radius-sm)', padding: 'var(--space-3)', background: `color-mix(in srgb, ${tool.color} 8%, transparent)`, boxShadow: `0 4px 12px color-mix(in srgb, ${tool.color} 15%, transparent)` }}>
                    <div className="deck-display" style={{ fontSize: 'var(--fs-slide-eyebrow)', color: tool.color, fontWeight: 700 }}>{tool.name}</div>
                    <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream)', marginTop: 'var(--space-1)', lineHeight: 1.3, letterSpacing: '0.02em', whiteSpace: 'pre-wrap' }}>{tool.desc}</div>
                    {tool.github && (
                      <div style={{ marginTop: 'var(--space-1)', display: 'flex', alignItems: 'center', gap: '0.35em' }}>
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" style={{ color: 'var(--cream-muted)', flexShrink: 0 }}>
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-muted)', letterSpacing: '0.02em' }}>{tool.github.split('/')[1]}</span>
                      </div>
                    )}
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
