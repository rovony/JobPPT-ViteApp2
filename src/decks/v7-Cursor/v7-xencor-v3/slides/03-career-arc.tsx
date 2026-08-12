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
                  <div
                    className="xc-career-card"
                    style={{ borderTop: `3px solid ${stop.color}` }}
                  >
                    <div style={{ borderBottom: '1px solid var(--cream-hairline)', paddingBottom: 'var(--space-2)' }}>
                      <div className="xc-career-card__years" style={{ color: stop.color }}>
                        {stop.years}
                      </div>
                      <div className="xc-career-card__title">
                        {stop.title}
                      </div>
                    </div>
                    <ul className="xc-career-card__list">
                      {stop.items.map((item, j) => {
                        const parts = item.split(': ');
                        if (parts.length > 1) {
                          return (
                            <li key={j}>
                              <span style={{ color: stop.color, fontWeight: 600 }}>{parts[0]}: </span>
                              {parts[1]}
                            </li>
                          );
                        }
                        return <li key={j}>{item}</li>;
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
