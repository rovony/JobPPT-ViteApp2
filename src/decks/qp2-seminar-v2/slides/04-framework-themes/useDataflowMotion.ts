// @ts-nocheck
import { useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { THEME_NODES, CASE_CARDS } from './data';

gsap.registerPlugin(MotionPathPlugin);

/**
 * useDataflowMotion — choreographs the slide 04 entrance arc and the
 * idle tracer-dot loop inside the DataflowEngine SVG.
 *
 * Why GSAP (not framer-motion):
 *   · SplitText / DrawSVG are paid plugins, so we use GSAP's
 *     built-in stroke-dash technique (same result, no plugin).
 *   · MotionPath is the only clean way to animate SVG circles along
 *     arbitrary Bézier curves across browsers. Framer-motion's
 *     motion-path binding requires a CSS offset-path, which doesn't
 *     accept inline SVG <path> elements.
 *
 * Timeline beats (matches spec, re-anchored to our geometry):
 *   0.00 substrate fade (handled by SlideTransition, not here)
 *   2.40 theme nodes sweep (5 × 320ms, stagger 250ms) — ends 3.72
 *   3.90 converging paths draw (5 × 400ms, stagger 60ms) — ends 4.54
 *   4.50 hub reveals — ends ~5.00
 *   5.00 diverging paths draw (3 × 400ms, stagger 120ms) — ends 5.64
 *   5.60 case cards reveal (3 × 400ms, stagger 200ms) — ends 6.40
 *   6.80 IDLE: 8 tracer dots loop, 3s phase-shift between converging
 *        and diverging = continuous throughput.
 *
 * reduced-motion: skip GSAP entirely; caller sets final state via CSS.
 */
export function useDataflowMotion(svgRef, { reduced = false, enabled = true } = {}) {
  useEffect(() => {
    if (!enabled || reduced) return undefined;
    const svg = svgRef?.current;
    if (!svg) return undefined;

    const q = (sel) => svg.querySelector(sel);
    const qa = (sel) => Array.from(svg.querySelectorAll(sel));

    // ── Helper: animate a stroked element by dash-offset (DrawSVG replacement) ──
    const drawStroke = (target, duration) => {
      const el = typeof target === 'string' ? q(target) : target;
      if (!el) return null;
      const len = el.getTotalLength ? el.getTotalLength() : 1000;
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      return gsap.to(el, { strokeDashoffset: 0, duration, ease: 'power2.out' });
    };

    // ── Set initial state ──────────────────────────────────────────────
    // We zero ONLY the top-level groups. Children are animated via
    // fromTo which sets its own initial values, so zeroing them here
    // + then re-setting the group would fight (SVG opacity multiplies
    // through the tree and leaves children stuck invisible).
    gsap.set(qa('[data-el="hub"] > *'), { opacity: 0 });
    // Theme/case top-level groups start hidden; fromTo reveals their children.
    THEME_NODES.forEach((_, i) => {
      gsap.set(q(`[data-el="theme-${i}"]`), { opacity: 0 });
    });
    CASE_CARDS.forEach((_, i) => {
      gsap.set(q(`[data-el="case-${i}"]`), { opacity: 0 });
    });
    gsap.set(qa('[data-el^="tracer-"]'), { opacity: 0 });

    // Prepare all paths with strokeDashoffset = full length so they're invisible.
    qa('[data-el^="converge-"], [data-el^="diverge-"]').forEach((p) => {
      if (p.getTotalLength) {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      }
    });

    // ── Master timeline ────────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Theme nodes (5 × 320ms envelope, 250ms stagger) ─────────────
    tl.addLabel('themes', 2.4);
    THEME_NODES.forEach((_, i) => {
      const tStart = 2.4 + i * 0.25;
      tl.fromTo(
        q(`[data-el="theme-num-${i}"]`),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.24 },
        tStart + 0.04
      );
      tl.fromTo(
        q(`[data-el="theme-hex-${i}"]`),
        { opacity: 0, scale: 0, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)' },
        tStart + 0.08
      );
      tl.fromTo(
        q(`[data-el="theme-title-${i}"]`),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.22 },
        tStart + 0.14
      );
      tl.fromTo(
        q(`[data-el="theme-desc-${i}"]`),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.22 },
        tStart + 0.18
      );
      // Make the theme group itself visible so children opacity sticks
      tl.set(q(`[data-el="theme-${i}"]`), { opacity: 1 }, tStart);
    });

    // Converging paths draw ───────────────────────────────────────
    tl.addLabel('converge', 3.9);
    THEME_NODES.forEach((_, i) => {
      const p = q(`[data-el="converge-${i}"]`);
      if (!p || !p.getTotalLength) return;
      tl.to(p, { strokeDashoffset: 0, duration: 0.4 }, 3.9 + i * 0.06);
    });

    // Hub reveals ────────────────────────────────────────────────
    tl.addLabel('hub', 4.5);
    const hubOuter = q('[data-el="hub-outer"]');
    const hubInner = q('[data-el="hub-inner"]');
    if (hubOuter?.getTotalLength) {
      const lo = hubOuter.getTotalLength();
      gsap.set(hubOuter, { strokeDasharray: lo, strokeDashoffset: lo, opacity: 1 });
      tl.to(hubOuter, { strokeDashoffset: 0, duration: 0.36 }, 4.5);
    }
    if (hubInner?.getTotalLength) {
      const li = hubInner.getTotalLength();
      gsap.set(hubInner, { strokeDasharray: li, strokeDashoffset: li, opacity: 1 });
      tl.to(hubInner, { strokeDashoffset: 0, duration: 0.36 }, 4.55);
    }
    tl.fromTo(
      q('[data-el="hub-primary"]'),
      { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, 4.8
    );

    // Diverging paths draw ───────────────────────────────────────
    tl.addLabel('diverge', 5.0);
    CASE_CARDS.forEach((_, i) => {
      const p = q(`[data-el="diverge-${i}"]`);
      if (!p || !p.getTotalLength) return;
      tl.to(p, { strokeDashoffset: 0, duration: 0.4 }, 5.0 + i * 0.12);
    });

    // Case cards reveal ──────────────────────────────────────────
    tl.addLabel('cases', 5.6);
    CASE_CARDS.forEach((_, i) => {
      const tStart = 5.6 + i * 0.2;
      tl.set(q(`[data-el="case-${i}"]`), { opacity: 1 }, tStart);
      // rule draws via dashoffset
      const rule = q(`[data-el="case-rule-${i}"]`);
      if (rule?.getTotalLength) {
        const len = rule.getTotalLength();
        gsap.set(rule, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(rule, { strokeDashoffset: 0, duration: 0.24 }, tStart);
      }
      tl.fromTo(
        q(`[data-el="case-eyebrow-${i}"]`),
        { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22 }, tStart + 0.05
      );
      tl.fromTo(
        q(`[data-el="case-name-${i}"]`),
        { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.26 }, tStart + 0.10
      );
      tl.fromTo(
        q(`[data-el="case-outcome-${i}"]`),
        { opacity: 0 }, { opacity: 1, duration: 0.26 }, tStart + 0.18
      );
      tl.fromTo(
        q(`[data-el="case-chev-${i}"]`),
        { opacity: 0 }, { opacity: 0.4, duration: 0.18 }, tStart + 0.24
      );
    });

    // ── Idle tracer loops (after entrance) ─────────────────────────
    // Collect MotionPath tweens so we can kill them on cleanup.
    const tracerTweens = [];

    tl.call(() => {
      // Reveal tracer dots
      gsap.to(qa('[data-el^="tracer-"]'), { opacity: 1, duration: 0.4 });

      // Converging dots — 6s loop, staggered start offsets 0, 0.2…
      THEME_NODES.forEach((_, i) => {
        const dot = q(`[data-el="tracer-c-${i}"]`);
        const path = q(`[data-el="converge-${i}"]`);
        if (!dot || !path) return;
        const tween = gsap.to(dot, {
          duration: 6,
          ease: 'none',
          repeat: -1,
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
        });
        tween.progress(i * 0.2);
        tracerTweens.push(tween);
      });

      // Diverging dots — 6s loop, phase-shifted 3s so they're mid-
      // journey when converging dots arrive at hub. Creates the
      // continuous-throughput sensation.
      CASE_CARDS.forEach((_, i) => {
        const dot = q(`[data-el="tracer-d-${i}"]`);
        const path = q(`[data-el="diverge-${i}"]`);
        if (!dot || !path) return;
        const tween = gsap.to(dot, {
          duration: 6,
          ease: 'none',
          repeat: -1,
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
        });
        // Phase-shift: start 3s ahead (0.5) + per-dot offset
        tween.progress(0.5 + i * 0.17);
        tracerTweens.push(tween);
      });
    });

    return () => {
      tl.kill();
      tracerTweens.forEach((t) => t.kill());
    };
  }, [svgRef, reduced, enabled]);
}
