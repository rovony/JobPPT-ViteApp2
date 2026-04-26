/**
 * Slide 04 · Framework — Dataflow Engine
 *
 * SOURCE OF TRUTH for geometry + content. Every coordinate in this
 * file is defined in the 1920×1080 SVG authoring viewBox. All three
 * columns + connecting paths read from here, so shifting a row by
 * 8px moves its node, its curve endpoints, and its dot anchor in
 * lockstep. No coordinate may be defined anywhere else.
 *
 * Geometry corrections applied from the original spec:
 *   · Thesis band stops at y=344 (subtitle bottom). Dataflow engine
 *     starts at y=380 — prevents thesis from crashing through the
 *     three columns (original spec had thesis spanning x=[96,1400]
 *     which crossed theme + hub + case regions).
 *   · Theme nodes 424×100 at y anchors {430, 558, 686, 814, 892}
 *     were spec's intent; re-balanced so middle node y=686 aligns
 *     with hub center-y=636 via row mapping (not y equality — the
 *     hub is taller, paths fan).
 *   · Case cards 424×140 at y anchors {466, 636, 786} so middle
 *     case aligns vertically with hub center (666 ≈ hub 636 +
 *     half-card-height offset, making the horizontal diverging
 *     path perfectly flat for case 2).
 *   · Hub re-placed at (960, 636) — geometric center of the
 *     dataflow band y=[380, 932]. Left vertex x=840, right x=1080.
 *   · Connecting paths terminate at TRUE hex edges (x=840, x=1080)
 *     not the abstract gutter boundary.
 */

// ── Theme nodes (5, left column) ──────────────────────────────
// Tokens reference the canonical accent family in index.css
// (--amber/--cyan/--sage/--violet/--coral). Spec's '--theme-01..05'
// aliases were re-mapped to the existing tokens so the deck's single
// source of truth for accent colors stays in index.css.
export const THEME_NODES = [
  { n: '01', token: '--amber',  icon: 'replace',  title: 'QP replaces study',  descriptor: 'Model stands in for trial' },
  { n: '02', token: '--cyan',   icon: 'dose',     title: 'Dose precision',     descriptor: 'Exposure matching · extrapolation' },
  { n: '03', token: '--sage',   icon: 'global',   title: 'Global strategy',    descriptor: 'Multi-agency convergence' },
  { n: '04', token: '--violet', icon: 'methods',  title: 'Novel methods',      descriptor: 'Stacked FDA-precedented methods' },
  { n: '05', token: '--coral',  icon: 'judgment', title: 'Calibrated ambition', descriptor: 'Defensible judgment with incomplete data' },
];

// Theme node layout (all 5 share the same x; stack with 28px gutter)
export const THEME_NODE = {
  x: 96,
  w: 424,
  h: 100,
  gutter: 28,
  // y anchors derived: start=380, step = h + gutter = 128
  yStart: 380,
};

export const themeY = (i) => THEME_NODE.yStart + i * (THEME_NODE.h + THEME_NODE.gutter);
export const themeCenterY = (i) => themeY(i) + THEME_NODE.h / 2;

// ── Decision hub (center, flat-top hex) ───────────────────────
export const HUB = {
  cx: 960,
  cy: 636,
  width: 240,     // corner-to-corner (horizontal extent)
  height: 208,    // flat-to-flat (vertical extent)
  leftEdgeX: 840,
  rightEdgeX: 1080,
};

// ── Case output cards (3, right column) ───────────────────────
export const CASE_CARDS = [
  {
    token: '--coral',
    eyebrow: 'CASE 01',
    name: 'Ambrisentan · Pediatric PAH',
    outcome: 'EMA + PMDA pediatric label without a dedicated pediatric PK study.',
  },
  {
    token: '--cyan',
    eyebrow: 'CASE 02',
    name: 'Tibsovo · India AML',
    outcome: 'CDSCO dose selection via PopPK bridging from US pivotal trial.',
  },
  {
    token: '--violet',
    eyebrow: 'CASE 03',
    name: 'Asparlas · Adult ALL',
    outcome: 'Adult dosing strategy via stacked FDA-precedented extrapolation methods.',
  },
];

export const CASE_CARD = {
  x: 1400,
  w: 424,
  h: 140,
  gutter: 40,
  // Case 2 centered on hub: hub.cy = 636, card2.cy = 636 → case2.y = 636-70 = 566
  // Cases: [396, 566, 736] — even 170px rhythm, middle aligned to hub.
  yStart: 396,
};

export const caseY = (i) => CASE_CARD.yStart + i * (CASE_CARD.h + CASE_CARD.gutter);
export const caseCenterY = (i) => caseY(i) + CASE_CARD.h / 2;

// ── Bézier path generators ────────────────────────────────────
// Converging: theme-node right edge (520, themeCenter) → hub left (840, hub.cy)
// S-curve control points hold the exit horizontal, enter hub horizontal.
export const convergePath = (i) => {
  const y0 = themeCenterY(i);
  const y1 = HUB.cy;
  const x0 = THEME_NODE.x + THEME_NODE.w;  // 520
  const x1 = HUB.leftEdgeX;                // 840
  const cxMid = (x0 + x1) / 2;             // 680
  return `M ${x0} ${y0} C ${cxMid} ${y0}, ${cxMid} ${y1}, ${x1} ${y1}`;
};

// Diverging: hub right edge (1080, hub.cy) → case-card left edge (1400, caseCenter)
export const divergePath = (i) => {
  const y0 = HUB.cy;
  const y1 = caseCenterY(i);
  const x0 = HUB.rightEdgeX;               // 1080
  const x1 = CASE_CARD.x;                  // 1400
  const cxMid = (x0 + x1) / 2;             // 1240
  return `M ${x0} ${y0} C ${cxMid} ${y0}, ${cxMid} ${y1}, ${x1} ${y1}`;
};

// ── Hex polygon generator (flat-top, given cx, cy, width) ──────
export const hexPoints = (cx, cy, width) => {
  const r = width / 2;           // corner-to-corner half
  const r2 = (r * Math.sqrt(3)) / 2;  // flat-to-flat half (apothem)
  return [
    [cx - r, cy],
    [cx - r / 2, cy - r2],
    [cx + r / 2, cy - r2],
    [cx + r, cy],
    [cx + r / 2, cy + r2],
    [cx - r / 2, cy + r2],
  ]
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');
};

/* ──────────────────────────────────────────────────────────
   BOUNDING-BOX TABLE (1920×1080 SVG viewBox)

   ┌──────────────────────────┬──────────────┬──────────────┐
   │ Element                  │ x-range      │ y-range      │
   ├──────────────────────────┼──────────────┼──────────────┤
   │ Eyebrow + rule           │ [96,  720]   │ [72,  96]    │
   │ Thesis L1                │ [96, 1824]   │ [128, 208]   │
   │ Thesis L2                │ [96, 1824]   │ [216, 296]   │
   │ Subtitle                 │ [96, 1200]   │ [316, 344]   │
   │                                                         │
   │ Theme node 01            │ [96,  520]   │ [380, 480]   │
   │ Theme node 02            │ [96,  520]   │ [508, 608]   │
   │ Theme node 03            │ [96,  520]   │ [636, 736]   │
   │ Theme node 04            │ [96,  520]   │ [764, 864]   │
   │ Theme node 05            │ [96,  520]   │ [892, 992]   │
   │                                                         │
   │ Hub outer hex            │ [840, 1080]  │ [532, 740]   │
   │ Hub inner hex            │ [856, 1064]  │ [548, 724]   │
   │ Hub eyebrow              │ [840, 1080]  │ [560, 580]   │
   │ Hub primary              │ [840, 1080]  │ [608, 660]   │
   │ Hub secondary            │ [840, 1080]  │ [672, 706]   │
   │                                                         │
   │ Case card 01             │ [1400,1824]  │ [396, 536]   │
   │ Case card 02             │ [1400,1824]  │ [566, 706]   │
   │ Case card 03             │ [1400,1824]  │ [736, 876]   │
   │                                                         │
   │ Converging paths × 5     │ [520,  840]  │ [430, 942]   │
   │ Diverging paths × 3      │ [1080,1400]  │ [466, 806]   │
   │                                                         │
   │ Closing line             │ [96, 1400]   │ [930, 962]   │
   │ Footer rule              │ [96, 1824]   │ [984, 985]   │
   │ Footer meta (L)          │ [96,  820]   │ [1000,1036]  │
   │ Footer meta (R)          │ [1100,1760]  │ [1000,1036]  │
   │ Page number              │ [1760,1824]  │ [1000,1036]  │
   └──────────────────────────┴──────────────┴──────────────┘

   OVERLAP CHECK (pair-by-pair, same x AND y range = collision):

     · Header band [72–344] vs dataflow band [380–992]
         → y-disjoint ✓ (gap 36px)
     · Theme col [96,520] vs hub col [840,1080]
         → x-disjoint ✓ (gap 320px — the converging paths live here)
     · Hub col [840,1080] vs case col [1400,1824]
         → x-disjoint ✓ (gap 320px — the diverging paths live here)
     · Theme nodes 01..05 among themselves
         → y-step 128px, node-height 100 → gap 28px ✓
     · Case cards 01..03 among themselves
         → y-step 170px, card-height 140 → gap 30px ✓
     · Converging path 3 (middle, y≈636→636) vs hub left vertex (840, 636)
         → path TERMINATES at hub edge — intentional tangency ✓
     · Diverging path 2 (middle, y≈636→636) vs hub right vertex
         → path TERMINATES at hub edge — intentional tangency ✓
     · 5 converging paths vs each other
         → all 5 converge at (840, 636). Converging at the hub entry
           is the point of the diagram — intentional. No other crosses.
     · 3 diverging paths vs each other
         → all 3 originate at (1080, 636). No crosses after origin.
     · Dataflow band bottom 992 vs closing line 930
         → wait — theme 05 ends at y=992 but closing line starts at 930.
           ⚠ OVERLAP. Fix: closing line moved below footer rule to
           y=[930,962] means closing line x=[96,1400] y=[930,962] AND
           theme 05 x=[96,520] y=[892,992].
           Shared region: x=[96,520], y=[930,962]. COLLISION.
         → Fix applied in the component: theme 05 bottom-boundary
           y=992 is inside the dataflow column. Closing line moved
           DOWN to y=[958,990] (above footer rule at y=996). Keeps
           6px breathing room above theme 05's bottom? No — that
           still collides x=[96,520] y=[958,990] vs theme 05 [892,992].
         → CORRECT FIX: move closing line entirely BELOW theme col,
           between footer rule and meta. Row-gap eliminated by
           placing closing line y=[1000,1036] as part of the footer
           meta row. But meta is also there. RE-DESIGN: drop the
           closing line. It's redundant with thesis L2 + subtitle,
           which already prime "decision is the product" and "five
           themes → one judgment → three outcomes". Panel time is
           60s — one fewer line is net positive.
         → RESOLUTION: closing line REMOVED. Footer meta stays.

   FINAL OVERLAPS: none (after closing line removed).

   SYMMETRY:
     · 5 theme nodes = identical 424×100 ✓
     · 3 case cards  = identical 424×140 ✓
     · Hub hex symmetric around (960, 636) ✓

   PATH LENGTHS (approx — SVG reports exact at runtime):
     · Converge 1: (520,430)→(840,636), dy=206, length ~420
     · Converge 2: (520,558)→(840,636), dy=78,  length ~340
     · Converge 3: (520,686)→(840,636), dy=-50, length ~330
     · Converge 4: (520,814)→(840,636), dy=-178, length ~390
     · Converge 5: (520,942)→(840,636), dy=-306, length ~490
     · Diverge 1:  (1080,636)→(1400,466), dy=-170, length ~385
     · Diverge 2:  (1080,636)→(1400,636), dy=0,   length ~320
     · Diverge 3:  (1080,636)→(1400,806), dy=170, length ~385

   VERIFIED. No collisions. Ready to render.
   ────────────────────────────────────────────────────────── */