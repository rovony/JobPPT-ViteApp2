// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
      'Practicing clinician · Jordan',
      'PhD scholarship',
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
    ],
    color: 'var(--cyan)',
    Icon: TallCoffee,
  },
  {
    years: 'Summer 2014',
    title: 'QP2 · Intern',
    items: [
      'NLME simulation under uncertainty',
      'Trial design inputs',
    ],
    color: 'var(--violet)',
    Icon: Thermos,
  },
  {
    years: '2015–2022',
    title: 'GlaxoSmithKline · CPMS',
    items: [
      'Respiratory · PAH · HIV · Metabolic',
      'Ambrisentan · Trelegy · Anoro',
    ],
    color: 'var(--cyan)',
    Icon: EspressoMachine,
  },
  {
    years: '2022–Present',
    title: 'Servier Pharmaceuticals · Director',
    items: [
      'Oncology solid + hematologic',
      'Onivyde · Oncaspar · Tibsovo LCM',
    ],
    color: 'var(--amber)',
    Icon: IVBag,
  },
];

export default function CareerArc() {
  const reduced = useReducedMotion();
  const d = (ms) => (reduced ? 0 : Math.min(ms, 0.35));

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.06}>
        Career arc · five stops · five cups
      </Eyebrow>

      <Headline delay={0.12} maxChars={60}>
        From espresso to IV drip,{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 700 }}>one question.</span>
      </Headline>

      <Subhead delay={0.22} maxChars={100} size="lead">
        How do we turn incomplete evidence into a defensible clinical pharmacology decision?
      </Subhead>

      <Viz>
        <div style={{ '--career-short-lift': 'max(0px, calc((900px - 100vh) * 0.35))', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Main Timeline Area — shared stop anchors keep the cards, cups,
              and amber spine on the same responsive coordinate system. */}
          <div style={{ flex: 1, position: 'relative', marginTop: 'var(--space-3)', minHeight: 0, overflow: 'hidden' }}>

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
                opacity={0.22}
                strokeDasharray={1600}
                initial={reduced ? false : { strokeDashoffset: 1600 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: d(0.12) }}
              />
              <path
                d={SPINE_PATH}
                fill="none"
                stroke="var(--amber)"
                strokeWidth={6}
                strokeLinecap="round"
                opacity={0.04}
              />
            </svg>

            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              {STOPS.map((stop, i) => {
                const layout = STOP_LAYOUT[i];

                return (
                <motion.div 
                  key={i}
                  data-career-stop={stop.years}
                  initial={reduced ? false : { opacity: 0, x: layout.translateX ?? 0, y: 10 }}
                  animate={{ opacity: 1, x: layout.translateX ?? 0, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.35, delay: d(0.14 + i * 0.06), ease: EASE }}
                  style={{ 
                    position: 'absolute',
                    left: `${layout.x}%`,
                    top: `calc(${layout.y}% - var(--career-short-lift))`,
                    width: layout.width,
                    maxWidth: 'calc(100% - var(--space-2))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 'clamp(var(--space-2), 1.2vh, var(--space-3))',
                  }}
                >
                  {/* Icon sits on the amber spine — light drop only */}
                  <div style={{
                    filter: 'drop-shadow(0 2px 4px color-mix(in srgb, var(--bg) 18%, transparent))',
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

                  {/* Info Card — solid panel, top accent, no glass */}
                  <div style={{
                    marginTop: 'clamp(0.55rem, 1.3vh, 1rem)',
                    background: 'var(--panel)',
                    border: '1px solid var(--cream-hairline)',
                    borderTop: `3px solid ${stop.color}`,
                    borderRadius: 'var(--radius-md)',
                    padding: 'clamp(0.7rem, 1.3vw, 1.15rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <div style={{ borderBottom: '1px solid var(--cream-hairline)', paddingBottom: 'var(--space-2)' }}>
                      <div className="deck-display" style={{ fontSize: 'var(--fs-slide-tagline)', color: stop.color, fontWeight: 700, lineHeight: 1.2 }}>
                        {stop.years}
                      </div>
                      <div className="deck-body" style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', fontWeight: 600, lineHeight: 1.3, marginTop: 'var(--space-1)' }}>
                        {stop.title}
                      </div>
                    </div>
                    <ul style={{ 
                      margin: 0, 
                      padding: 0, 
                      paddingLeft: '1rem', 
                      color: 'var(--cream-muted)', 
                      fontSize: 'var(--fs-slide-subhead)', 
                      lineHeight: 1.45, 
                      fontFamily: 'var(--font-body)' 
                    }}>
                      {stop.items.map((item, j) => {
                        const parts = item.split(': ');
                        if (parts.length > 1) {
                          return (
                            <li key={j} style={{ marginBottom: 'var(--space-1)' }}>
                              <span style={{ color: stop.color, fontWeight: 600 }}>{parts[0]}: </span>
                              {parts[1]}
                            </li>
                          );
                        }
                        return <li key={j} style={{ marginBottom: 'var(--space-1)' }}>{item}</li>;
                      })}
                    </ul>
                  </div>
                </motion.div>
              )})}
            </div>
          </div>
        </div>
      </Viz>
    </SlideGrid>
  );
}
