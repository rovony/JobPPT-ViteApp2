import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import HazardRatioTimeline from './hook/HazardRatioTimeline';

/**
 * Slide 02 · Cold-open hook · the Sildenafil trauma (v2 rebuild).
 *
 * Narrative pivot from v1's "19 years of silence / convergence" beat
 * to the STARTS-2 / FDA-2012 trauma that closed the pediatric PAH
 * trial-design space. The viz is a coral hazard-ratio fever curve
 * climbing from unity in 2007 to HR 3.95 by August 2012, with a
 * trial-closure wedge marking the post-warning years.
 *
 * Motion choreography (GSAP timeline · respects prefers-reduced-motion):
 *   ACT 1 — y-axis scale + unity reference line settle in
 *   ACT 2 — x-axis appears, year ticks fade in left → right
 *   ACT 3 — first two beats land on the unity line (2007, 2010)
 *   ACT 4 — the HR curve draws L→R across the climb (the moment)
 *   ACT 5 — apex stat (HR 3.95) lands with the marker pulse
 *   ACT 6 — Aug 2012 FDA beat lands, then the closure wedge slides in
 *
 * The whole timeline is paced so the climb feels DELIBERATE — not a
 * fast pop. The duration of the curve draw IS the danger reading.
 */
export default function Slide02Hook() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    const primeLine = (el) => {
      if (!el) return 0;
      const len = el.getTotalLength?.() || 0;
      el.setAttribute('stroke-dasharray', `${len} ${len}`);
      el.setAttribute('stroke-dashoffset', len);
      return len;
    };

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q1 = (s) => root.querySelector(s);

      const curve = q1('[data-el="hr-curve"]');
      const curveLen = primeLine(curve);

      // All entrance elements start invisible (opacity already 0 via
      // markup, but reset transforms for clean staggers).
      gsap.set('[data-el="hr-scale"]',     { opacity: 0, y: 4 });
      gsap.set('[data-el="unity-line"]',   { opacity: 0 });
      gsap.set('[data-el="x-axis"]',       { opacity: 0 });
      gsap.set('[data-el="year-tick"]',    { opacity: 0, y: 4 });
      gsap.set('[data-el="beat"]',         { opacity: 0, y: 6 });
      gsap.set('[data-el="apex-stat"]',    { opacity: 0, scale: 0.95, transformOrigin: 'left bottom' });
      gsap.set('[data-el="fda-beat"]',     { opacity: 0, y: 6 });
      gsap.set('[data-el="closed-wedge"]', { opacity: 0, x: 24 });

      const tl = gsap.timeline({
        delay: 0.9,
        defaults: { ease: 'power2.out' },
      });

      // ACT 1 — scale + unity line
      tl.to('[data-el="hr-scale"]',
        { opacity: 1, y: 0, duration: 0.6 }, 0);
      tl.to('[data-el="unity-line"]',
        { opacity: 1, duration: 0.5 }, 0.2);

      // ACT 2 — axis + year ticks
      tl.to('[data-el="x-axis"]',
        { opacity: 1, duration: 0.45 }, 0.5);
      tl.to('[data-el="year-tick"]',
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, 0.65);

      // ACT 3 — first two beats land on unity line
      tl.to('[data-el="beat"]',
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.18 }, 1.05);

      // ACT 4 — the climb. Slow, deliberate. Duration IS the danger.
      tl.set(curve, { opacity: 1 }, 1.85);
      tl.fromTo(curve,
        { strokeDashoffset: curveLen },
        { strokeDashoffset: 0, duration: 1.6, ease: 'power2.in' },
        1.85);

      // ACT 5 — apex stat lands at the top of the climb
      tl.to('[data-el="apex-stat"]',
        { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' }, 3.35);

      // ACT 6 — Aug 2012 FDA beat, then the closure wedge slides in
      tl.to('[data-el="fda-beat"]',
        { opacity: 1, y: 0, duration: 0.5 }, 3.7);
      tl.to('[data-el="closed-wedge"]',
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 4.0);

      // Idle — gentle pulse on the apex circle to keep the stat alive
      // through Q&A. Triangle (FDA marker) does not pulse — it should
      // read as a fixed historical event, not a recurring beat.
      const apexPulse = gsap.to('[data-el="apex-stat"] circle:nth-of-type(2)', {
        opacity: 0.85,
        scale: 1.08,
        transformOrigin: 'center',
        duration: 1.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 5.2,
      });

      return () => { tl.kill(); apexPulse.kill(); };
    });

    // Reduced-motion fallback: snap everything to its final state.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(root.querySelectorAll('[data-el]'), {
        opacity: 1, y: 0, x: 0, scale: 1,
      });
      const curve = root.querySelector('[data-el="hr-curve"]');
      if (curve) curve.setAttribute('stroke-dashoffset', '0');
    });

    return () => mm.revert();
  }, []);

  // Header beat timing — eyebrow + headline land before the viz starts
  // its 0.9s delayed timeline, so the audience reads the question
  // before the curve draws the answer.
  const D = { eyebrow: 0.15, headline: 0.30, subhead: 0.55, footer: 4.6 };

  return (
    <div ref={rootRef} className="w-full h-full">
      <SlideGrid
        dataCase="coral"
        areas={STANDARD_AREAS}
        // Push the header block lower so the headline + subhead don't
        // crowd the chrome row. Identical row sizing pattern to v1's
        // 02-hook so the typography rhythm matches the rest of the deck.
        rowSizes="minmax(var(--space-10), auto) auto auto auto minmax(0, 1fr) auto"
      >
        <Eyebrow color="var(--coral)" delay={D.eyebrow}>
          Cold open · The Sildenafil trauma
        </Eyebrow>

        <Headline delay={D.headline} maxChars={28}>
          {/* Rhetorical question — the assertion is implicit: a trial
              that increased mortality forecloses the next trial. The
              coral italic carries the sting on "increased mortality." */}
          <span style={{ display: 'inline-block', lineHeight: 1.05 }}>
            How do you dose a child when the last pediatric trial{' '}
            <span
              style={{
                color: 'var(--coral)',
                fontStyle: 'italic',
                fontWeight: 600,
              }}
            >
              increased mortality?
            </span>
          </span>
        </Headline>

        <Subhead delay={D.subhead} maxChars={92}>
          <span style={{ lineHeight: 1.35, display: 'inline-block', paddingTop: 'var(--space-4)' }}>
            STARTS-2 long-term extension · dose-dependent mortality signal in pediatric
            pulmonary arterial hypertension ·{' '}
            <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 600 }}>
              hazard ratio nearly four
            </span>
            .
          </span>
        </Subhead>

        <Viz>
          <HazardRatioTimeline />
        </Viz>

        <Footer
          delay={D.footer}
          kicker="02 · The trauma"
          tagline={
            <>
              When a trial is mathematically and ethically impossible —{' '}
              <em style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
                the model becomes the evidence.
              </em>
            </>
          }
          source="FDA Drug Safety Communication, 30 Aug 2012 · Barst et al., Circulation 2012;125:324–334 · STARTS-2 NCT00159913"
        />
      </SlideGrid>
    </div>
  );
}
