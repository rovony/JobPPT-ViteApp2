// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz } from '@/components/deck/SlideParts';
import { SmallCoffee, TallCoffee, Thermos, EspressoMachine, IVBag } from './03-career-arc/CaffeineIcons';

/**
 * Slide 04 · Career arc — "Five stops, one operating question"
 *
 * Professional timeline spanning 15+ years, from practicing clinician to
 * clinical pharmacology director. Layout CSS lives in xencor-deck.css
 * (.xc-career* / .xc-career-card*). Stop anchors stay in sync with SPINE_PATH.
 */

const EASE = [0.2, 0.7, 0.3, 1];
/* BOUNDING-BOX AUDIT — FitStage 1920×1080
 * Stop cards occupy x≈10–96% and y≈23–59% of the stage.
 * Adjacent cards retain >3rem horizontal clearance at their widest clamps.
 * The final stop anchors rightward so its card and IV icon stay inside chrome.
 */
/* viewBox 0 0 1000 500 — y/500 ≈ STOP_LAYOUT.y% (cards + icons clear stage edges) */
const SPINE_PATH =
  'M 80 295 C 170 280, 205 260, 270 250 C 350 235, 392 220, 460 210 C 555 195, 595 175, 670 160 C 770 142, 812 125, 900 115';

const STOP_LAYOUT = [
  { x: 10, y: 59, width: 'clamp(8.5rem, 12vw, 13rem)', iconScale: 0.5, translateX: 0 },
  { x: 26.5, y: 50, width: 'clamp(9rem, 12.5vw, 13.5rem)', iconScale: 0.5, translateX: 0 },
  { x: 44.5, y: 42, width: 'clamp(9rem, 13vw, 14rem)', iconScale: 0.5, translateX: 0 },
  { x: 62, y: 32, width: 'clamp(9.5rem, 13.5vw, 14.5rem)', iconScale: 0.48, translateX: 0 },
  { x: 96, y: 23, width: 'clamp(9.5rem, 14vw, 15rem)', iconScale: 0.42, translateX: '-100%' },
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
        Five stops,{' '}
        <span className="xc-career-em">one operating question.</span>
      </Headline>

      <Subhead delay={0.45} maxChars={100} size="lead">
        How do we turn incomplete evidence into a defensible clinical pharmacology decision?
      </Subhead>

      <Viz className="xc-min0">
        <div ref={ref} className="xc-career xc-min0">
          <div className="xc-career__stage xc-min0">
            <svg
              className="xc-career__spine"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              aria-hidden
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

            <div className="xc-career__stops xc-min0">
              {STOPS.map((stop, i) => {
                const layout = STOP_LAYOUT[i];

                return (
                  <motion.div
                    key={i}
                    data-career-stop={stop.years}
                    className="xc-career__stop"
                    initial={{ opacity: 0, x: layout.translateX ?? 0, y: 20 }}
                    animate={
                      go
                        ? { opacity: 1, x: layout.translateX ?? 0, y: 0 }
                        : { opacity: 1, x: layout.translateX ?? 0, y: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.55 + i * 0.1, ease: EASE }}
                    style={{
                      '--career-x': `${layout.x}%`,
                      '--career-y': `${layout.y}%`,
                      '--career-w': layout.width,
                      '--career-icon-scale': layout.iconScale,
                      '--career-accent': stop.color,
                    }}
                  >
                    <div className="xc-career__icon">
                      <stop.Icon reduced={reduced} />
                    </div>

                    <div className="xc-career-card">
                      <div className="xc-career-card__head">
                        <div className="xc-career-card__years">{stop.years}</div>
                        <div className="xc-career-card__title">{stop.title}</div>
                      </div>
                      <ul className="xc-career-card__list">
                        {stop.items.map((item, j) => {
                          const parts = item.split(': ');
                          if (parts.length > 1) {
                            return (
                              <li key={j}>
                                <span className="xc-career-card__em">{parts[0]}: </span>
                                {parts[1]}
                              </li>
                            );
                          }
                          return <li key={j}>{item}</li>;
                        })}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Viz>
    </SlideGrid>
  );
}
