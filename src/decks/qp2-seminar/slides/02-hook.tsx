// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import ConvergenceTimeline from './hook/ConvergenceTimeline';

/**
 * Slide 02 · "Convergence Timeline" (redesign).
 *
 * Narrative: 19 years of pediatric label silence — resolved in 2021 by
 * two top-tier regulators approving on the SAME PopPK model. Rendered
 * as a calm, single-axis timeline (silence → event → resolution).
 *
 * GSAP choreography is deliberately quiet: no overshoot, no scale pops.
 * Every element either fades in place or draws along its length. The
 * silent line is the rhythm — its slow L→R draw IS the 19-year point.
 *
 * Respects prefers-reduced-motion via gsap.matchMedia.
 */
export default function Slide02Hook() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    // Helper: set an element's stroke-dasharray to its length so we can
    // reveal it via strokeDashoffset without using a plugin.
    const primeLine = (el) => {
      if (!el) return 0;
      const len = el.getTotalLength?.() || 0;
      el.setAttribute('stroke-dasharray', `${len} ${len}`);
      el.setAttribute('stroke-dashoffset', len);
      return len;
    };

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q1 = (s) => root.querySelector(s);

      const silent = q1('[data-el="silent-line"]');
      const resolved = q1('[data-el="resolved-line"]');
      const spine = q1('[data-el="event-spine"]');

      const silentLen = primeLine(silent);
      const resolvedLen = primeLine(resolved);
      const spineLen = primeLine(spine);

      // Initial hidden states — per-selector so transforms stay clean.
      gsap.set('[data-el="silence-caption"]', { opacity: 0, y: 6 });
      gsap.set('[data-el="event-legend"]', { opacity: 0, y: -4 });
      gsap.set('[data-el="row-ema"]', { opacity: 0, y: -6 });
      gsap.set('[data-el="row-pmda"]', { opacity: 0, y: 6 });
      gsap.set('[data-el="axis-node"]', { opacity: 0 });
      gsap.set('[data-el="resolved-caption"]', { opacity: 0, y: 4 });
      gsap.set('[data-el="resolved-arrow"]', { opacity: 0 });
      gsap.set('[data-el="year-bracket"]', { opacity: 0 });
      gsap.set('[data-el="year-tick"]', { opacity: 0 });

      const tl = gsap.timeline({ delay: 1.0, defaults: { ease: 'power2.out' } });

      // ACT 1 — year axis appears (ticks + labels)
      tl.to('[data-el="year-tick"]', { opacity: 1, duration: 0.5, stagger: 0.05 }, 0);

      // ACT 2 — the silence draws L→R (slow · duration IS the point)
      tl.set(silent, { opacity: 1 }, 0.3);
      tl.fromTo(silent,
        { strokeDashoffset: silentLen },
        { strokeDashoffset: 0, duration: 2.0, ease: 'none' },
        0.3);

      // Silence caption fades in mid-draw
      tl.to('[data-el="silence-caption"]',
        { opacity: 1, y: 0, duration: 0.6 }, 1.0);

      // 19-year bracket surfaces near end of silence draw
      tl.to('[data-el="year-bracket"]',
        { opacity: 1, duration: 0.5 }, 1.8);

      // ACT 3 — the 2021 event. Axis node lands, spine rises, rows settle.
      tl.to('[data-el="axis-node"]',
        { opacity: 1, duration: 0.35 }, 2.4);

      tl.set(spine, { opacity: 1 }, 2.5);
      tl.fromTo(spine,
        { strokeDashoffset: spineLen },
        { strokeDashoffset: 0, duration: 0.5 },
        2.5);

      tl.to('[data-el="event-legend"]',
        { opacity: 1, y: 0, duration: 0.5 }, 2.7);

      tl.to('[data-el="row-ema"]',
        { opacity: 1, y: 0, duration: 0.5 }, 2.85);

      tl.to('[data-el="row-pmda"]',
        { opacity: 1, y: 0, duration: 0.5 }, 2.95);

      // ACT 4 — resolution. Line draws rightward, caption lands.
      tl.set(resolved, { opacity: 0.9 }, 3.4);
      tl.fromTo(resolved,
        { strokeDashoffset: resolvedLen },
        { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut' },
        3.4);

      tl.to('[data-el="resolved-arrow"]',
        { opacity: 0.9, duration: 0.4 }, 4.1);

      tl.to('[data-el="resolved-caption"]',
        { opacity: 1, y: 0, duration: 0.5 }, 3.8);

      // ACT 5 — gentle idle wiggle on event rows + axis node pulse.
      // Starts after everything has landed; loops forever, yoyo.
      const wiggle = gsap.to('[data-el="row-ema"], [data-el="row-pmda"]', {
        y: '+=3',
        rotate: 0.35,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4, yoyo: true },
        delay: 5.2,
      });
      const nodePulse = gsap.to('[data-el="axis-node"]', {
        scale: 1.18,
        transformOrigin: 'center',
        duration: 1.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 5.2,
      });

      return () => { tl.kill(); wiggle.kill(); nodePulse.kill(); };
    });

    // Reduced-motion fallback: snap everything to final state.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(root.querySelectorAll('[data-el]'), { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  const D = { eyebrow: 0.15, headline: 0.30, subhead: 0.60, footer: 2.80 };

  return (
    <div ref={rootRef} className="w-full h-full">
      <SlideGrid
        dataCase="amber"
        areas={STANDARD_AREAS}
        // Push the header block lower: give chrome row extra height, and
        // let subhead row breathe with explicit min so the viz doesn't
        // greedily consume all slack into the top.
        rowSizes="minmax(var(--space-10), auto) auto auto auto minmax(0, 1fr) auto"
      >
        <Eyebrow color="var(--coral)" delay={D.eyebrow}>
          Silence · 2007 → 2021 · Convergence
        </Eyebrow>

        <Headline delay={D.headline} maxChars={24}>
          {/* lineHeight bumped 0.95 → 1.05 — at 1.35em scale, italic
              descenders on "years," and "unchanged." were extending
              below the line box and crashing into the Subhead. 1.05
              gives ~10% baseline-to-descender room without visibly
              loosening the headline rhythm. */}
          <span style={{ fontSize: '1.35em', display: 'inline-block', lineHeight: 1.05 }}>
            <span
              style={{
                color: 'var(--coral)',
                fontWeight: 700,
                fontFeatureSettings: '"tnum"',
                letterSpacing: '-0.04em',
                marginRight: '0.14em',
              }}
            >
              19
            </span>
            years,{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 450 }}>unchanged.</span>
          </span>
        </Headline>

        <Subhead delay={D.subhead} maxChars={88}>
          {/* paddingTop bumped space-4 → space-6 so the subhead block
              clears the headline's descender band even on viewports
              where the row layout collapses tight. Belt-and-braces
              with the headline's loosened lineHeight above. */}
          <span style={{ lineHeight: 1.35, display: 'inline-block', paddingTop: 'var(--space-6)' }}>
            Nineteen years of children with pulmonary arterial hypertension{' '}
            <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 600 }}>
              treated off-label — or not treated at all
            </span>
            , because no one had translated the adult evidence into a pediatric dose.
          </span>
        </Subhead>

        <Viz>
          <ConvergenceTimeline />
        </Viz>

        <Footer
          kicker="02 · The convergence"
          tagline={
            <>
              One PopPK model.{' '}
              <em style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
                Two of the world's most rigorous regulators.
              </em>{' '}
              27 EU countries + Japan under one pediatric label.
            </>
          }
          delay={D.footer}
        />
      </SlideGrid>
    </div>
  );
}
