// Slide transition presets.
//
// Each preset is a framer-motion variant set: { initial, animate, exit } plus
// a `transition` object. Slides pick a preset via their manifest entry:
//
//   { id: 'hook', title: '…', component: SlideHook, transition: 'slide-left' }
//
// The 3D family uses COMPOSITE transforms (translateZ + rotate + scale) and
// SPRING physics (framer-motion's built-in spring type) — that combination is
// what separates "PowerPoint cube transition" from "physical object moving
// through space." Single-axis rotations on a linear ease feel mechanical;
// compositing depth travel + a spring tail lands with weight.
//
// Per-preset `transformOrigin` is set so cubes hinge on an edge (left/right)
// and flips hinge on top/bottom — not on slide-center. `backfaceVisibility:
// hidden` on the moving layer (applied in SlideTransition) prevents the
// rotated panel's reverse face from flashing through during the rotation.

const EASE = [0.2, 0.7, 0.3, 1];
const D = 0.45;

// Flat "card" transitions — slide-to-side feel without 3D rotation.
// Shorter duration + stiff ease so advancing slides feels instantaneous
// while still reading as "cards moving through the canvas".
const CARD_EASE = [0.32, 0.72, 0.28, 1];
const CARD_D = 0.32;

// Spring config tuned per preset family. Stiffness ↑ = snappier; damping ↑ =
// less overshoot; mass ↑ = more inertia. Three configs cover the family:
//   · gentle — wide pans, no overshoot wanted (otherwise content jitters)
//   · medium — flips and pushes; a small overshoot sells the "weight"
//   · firm   — hero depth changes; brisk arrival, calm settle
const SPRING_GENTLE = { type: 'spring', stiffness: 110, damping: 24, mass: 1.1 };
const SPRING_MEDIUM = { type: 'spring', stiffness: 130, damping: 20, mass: 1.2 };
const SPRING_FIRM   = { type: 'spring', stiffness: 150, damping: 22, mass: 1.0 };

export const SLIDE_TRANSITIONS = {
  // Default — simple cross-fade. Used when a slide doesn't specify one.
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
    transition: { duration: D, ease: EASE },
  },

  // Card — flat, fast card-to-card experience. Next slide slides in from
  // the right, current slides out to the left. No depth, no rotation.
  // This is the deck's new default — feels like flipping physical cards.
  card: {
    initial: { opacity: 0, x: '8%' },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: '-8%' },
    transition: { duration: CARD_D, ease: CARD_EASE },
  },

  // Horizontal slide — next slide pushes in from the right.
  'slide-left': {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -60 },
    transition: { duration: D, ease: EASE },
  },
  'slide-right': {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: 60 },
    transition: { duration: D, ease: EASE },
  },

  // Vertical slide — good for "act break" moments.
  'slide-up': {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -40 },
    transition: { duration: D, ease: EASE },
  },
  'slide-down': {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: 40 },
    transition: { duration: D, ease: EASE },
  },

  // Zoom — emphasis for hero / divider slides.
  'zoom-in': {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 1.04 },
    transition: { duration: D, ease: EASE },
  },
  'zoom-out': {
    initial: { opacity: 0, scale: 1.06 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.96 },
    transition: { duration: D, ease: EASE },
  },

  // No motion — snap cut.
  none: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit:    { opacity: 1 },
    transition: { duration: 0 },
  },

  // ─────────────────────────────────────────────────────────────
  // 3D CANVAS FAMILY — composite transforms + spring physics.
  // Slides feel like pages floating in a multidimensional canvas
  // because every preset combines depth (translateZ) with rotation
  // and the springs give the motion physical weight.
  // ─────────────────────────────────────────────────────────────

  // Canvas pan — sideways travel through the canvas, with depth recede +
  // gentle yaw. The exiting slide drops back into space and rotates away;
  // the incoming slide swings in from the opposite side at the same depth.
  // Gentle spring (no overshoot) — keeps text from jittering on long lines.
  'canvas-pan': {
    initial: { opacity: 0, x: '60%',  z: -500, rotateY: 18,  scale: 0.9 },
    animate: { opacity: 1, x: 0,      z: 0,    rotateY: 0,   scale: 1 },
    exit:    { opacity: 0, x: '-60%', z: -500, rotateY: -18, scale: 0.9 },
    transition: SPRING_GENTLE,
  },

  // Canvas cube — full cube-face rotation. Hinges on the LEADING EDGE
  // (right edge of exit, left edge of enter) so it reads as a real cube
  // turning, not a card spinning around its center. translateZ pulls
  // the rotation off-axis to reveal the cube's interior depth.
  'canvas-cube': {
    initial: {
      opacity: 0,
      rotateY: 90,
      z: -960,
      transformOrigin: 'left center',
    },
    animate: {
      opacity: 1,
      rotateY: 0,
      z: 0,
      transformOrigin: 'left center',
    },
    exit: {
      opacity: 0,
      rotateY: -90,
      z: -960,
      transformOrigin: 'right center',
    },
    transition: SPRING_MEDIUM,
  },

  // Canvas flip — vertical card flip, hinging on the TOP edge so the
  // slide feels like a page being turned forward. Backface hidden via
  // SlideTransition prevents the reverse face from flashing.
  'canvas-flip': {
    initial: {
      opacity: 0,
      rotateX: -110,
      z: -300,
      transformOrigin: 'center top',
    },
    animate: {
      opacity: 1,
      rotateX: 0,
      z: 0,
      transformOrigin: 'center top',
    },
    exit: {
      opacity: 0,
      rotateX: 110,
      z: -300,
      transformOrigin: 'center bottom',
    },
    transition: SPRING_MEDIUM,
  },

  // Canvas depth — slide pushes through space toward viewer; next slide
  // emerges from far depth. Composite of translateZ + scale + a tiny
  // rotateX so it doesn't read as a flat zoom. Firm spring lands the
  // hero arrival with authority.
  'canvas-depth': {
    initial: { opacity: 0, z: -800, scale: 0.85, rotateX: 6 },
    animate: { opacity: 1, z: 0,    scale: 1,    rotateX: 0 },
    exit:    { opacity: 0, z: 600,  scale: 1.15, rotateX: -6 },
    transition: SPRING_FIRM,
  },
};

// 3D presets need a perspective container to render correctly.
// SlideTransition reads this set to decide whether to apply perspective.
export const THREE_D_PRESETS = new Set([
  'canvas-pan', 'canvas-cube', 'canvas-flip', 'canvas-depth',
]);

export const DEFAULT_TRANSITION = 'fade';

/**
 * Resolve a slide's `transition` field to a framer-motion variant set.
 * Accepts a preset name (string) or a full custom object.
 */
export function resolveTransition(value) {
  if (!value) return SLIDE_TRANSITIONS[DEFAULT_TRANSITION];
  if (typeof value === 'string') {
    return SLIDE_TRANSITIONS[value] || SLIDE_TRANSITIONS[DEFAULT_TRANSITION];
  }
  // Custom object — caller supplied their own variants.
  return value;
}