import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * DecisionVisuals — three small 300×260 diagrams, one per decision column
 * on slide 08 (Strategy — Three design decisions).
 *
 * Shared conventions:
 *   · Deterministic inline SVG · no data dependency · no external libs
 *   · viewBox 300×260 (portrait-leaning so charts anchor column bottoms)
 *   · width: 100% · preserveAspectRatio="xMidYMid meet" — never stretches
 *   · All colors come from CSS custom properties so theme tokens drive
 *     palette (--coral, --cyan, --cream, --cream-faint, --cream-hairline)
 *   · Entrance animation respects prefers-reduced-motion
 *   · Animation idiom mirrors slide 09 (CompartmentSchematic): continuous
 *     looping sprite particles built from motion.circle with cx/cy
 *     keyframe arrays + `repeat: Infinity` + staggered delays. Static
 *     layout elements (dots, axes, chips, labels) render unchanged; the
 *     particles overlay them as visual flow.
 *
 * Each export is pure — no useEffect, no DOM reads — so it renders the
 * same on SSR and CSR (matters when exporting to PDF via html-to-image).
 */

const VB_W = 300;
const VB_H = 260;

// Shared slide-09-style cubic for the Frame's one-time mount fade.
const ease = [0.2, 0.7, 0.3, 1];
// Sprite particles use linear ease like CompartmentSchematic so the
// motion reads as steady flow rather than easing start/stop.
const SPRITE_EASE = 'linear';

function Frame({ delay = 0, children, label }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', display: 'block', margin: '0 auto' }}
      role="img"
      aria-label={label}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.svg>
  );
}

/* ============================================================
   DECISION 01 — ANCHOR (before/after comparison)
   Note: exported as `IntegrateViz` for backwards-compatibility
   with the slide 11b import — the decision verb changed from
   "Integrate" to "Anchor" (adult model anchors pediatric refit;
   datasets were NOT pooled in a single NONMEM run), but the
   component export name is preserved to avoid a cross-file
   rename. In-chart "NO INTEGRATION" / "INTEGRATED" captions
   describe the combined evidence package (N=419 total) — that
   usage remains correct.
   TOP panel  (y≈20–108):  "NO INTEGRATION" — only 8 sparse
                            pediatric coral dots, ✗ glyph at left.
   DIVIDER     (y=108):    hairline x=20→280
   BOTTOM panel (y≈120–252): "INTEGRATED" — adult (left) + merged
                            (center) + pediatric (right) clusters,
                            ✓ glyph at left, sprite streams flowing
                            adult→center and pediatric→center.

   Bounding-box audit (VB 300×260):
     Element                    x-range     y-range     Notes
     TOP ✗ glyph                 23–37       53–67      coral strokes
     TOP pedi cluster            132–168     48–76      8 dots around (150,60)
     TOP label                   90–210      88–98      mono coral
     TOP sub-caption             90–210      99–108     cream-faint
     Divider hairline            20–280      108–108    cream-hairline
     BOT ✓ glyph                 22–40       168–182    coral strokes
     BOT adult cluster           40–84       160–200    60 dots around (70,175)
     BOT merged pool             122–176     159–192    14 dots around (150,175)
     BOT pedi cluster            222–258     161–201    8 dots around (240,175)
     BOT label                   90–210      236–244    mono coral
     BOT sub-caption             70–230      246–252    cream-faint
   ============================================================ */
export function IntegrateViz({ delay = 0 }) {
  const reduce = useReducedMotion();

  // ─── TOP PANEL — "NO INTEGRATION": pediatric only, 8 sparse dots
  // centered around (150, 60). Same 8-point pattern as the bottom
  // panel's right cluster but translated to center x=150, y=60.
  const topPediPts = [
    [132, 48], [158, 54], [144, 60], [168, 62],
    [136, 68], [154, 70], [162, 74], [142, 74],
  ];

  // ─── BOTTOM PANEL — "INTEGRATED"
  // Adult cluster — 60 dots around (70, 175). All y-values shifted
  // to the lower band so the cluster lives in y ≈ 160–200 (original
  // layout was y=100–158; rows compressed and shifted by roughly
  // −45 to fit the new compressed band).
  const adultPts = [
    // Row 1 (y≈160–166)
    [42, 166], [48, 162], [54, 164], [60, 160], [66, 164], [72, 162], [78, 166], [84, 164],
    // Row 2 (y≈168–172)
    [40, 171], [46, 169], [52, 172], [58, 168], [64, 171], [70, 169], [76, 172], [82, 169],
    // Row 3 (y≈174–178)
    [42, 177], [48, 175], [54, 178], [60, 174], [66, 177], [72, 175], [78, 178], [84, 177],
    // Row 4 (y≈180–184)
    [40, 183], [46, 181], [52, 184], [58, 180], [64, 183], [70, 181], [76, 184], [82, 181],
    // Row 5 (y≈186–190)
    [42, 189], [48, 187], [54, 190], [60, 186], [66, 189], [72, 187], [78, 190], [84, 189],
    // Row 6 (y≈192–198) — bottom edge
    [44, 196], [50, 194], [56, 198], [62, 192], [68, 196], [74, 194], [80, 198],
    // Jitter fill
    [50, 167], [58, 165], [68, 167], [78, 167],
    [50, 173], [66, 173], [74, 173],
    [56, 181], [70, 185],
    [62, 193], [76, 193],
  ];
  // Pediatric cluster — 8 dots around (240, 175)
  const pediPts = [
    [222, 161], [248, 167], [234, 173], [258, 179],
    [226, 185], [244, 191], [252, 197], [232, 201],
  ];
  // Merged center pool — 14 dots around (150, 175)
  const mergedPts = [
    [132, 161], [148, 159], [164, 163],
    [126, 170], [142, 167], [160, 168], [176, 172],
    [122, 177], [140, 175], [158, 178], [174, 181],
    [134, 188], [152, 190], [168, 192],
  ];

  // Sprite lanes shifted to the new compressed bottom band.
  // Adult → center (8 cyan, y ∈ 167–189)
  const adultSprites = [
    { y: 167, delay: 0.0, duration: 3.0 },
    { y: 173, delay: 0.4, duration: 3.0 },
    { y: 178, delay: 0.8, duration: 3.0 },
    { y: 183, delay: 1.2, duration: 3.0 },
    { y: 189, delay: 1.6, duration: 3.0 },
    { y: 170, delay: 2.0, duration: 3.0 },
    { y: 181, delay: 2.4, duration: 3.0 },
    { y: 187, delay: 2.8, duration: 3.0 },
  ];
  // Pediatric → center (5 coral, y ∈ 170–190)
  const pediSprites = [
    { y: 170, delay: 0.2, duration: 3.2 },
    { y: 178, delay: 0.9, duration: 3.2 },
    { y: 184, delay: 1.6, duration: 3.2 },
    { y: 190, delay: 2.3, duration: 3.2 },
    { y: 175, delay: 2.9, duration: 3.2 },
  ];

  return (
    <Frame delay={delay} label="Before and after: pediatric alone versus integrated adult + pediatric PopPK dataset">
      {/* ═══════════════════════════════════════════════════════════
          TOP PANEL — NO INTEGRATION (pediatric alone, unstable)
          y-range ≈ 20–108
         ═══════════════════════════════════════════════════════════ */}
      {/* ✗ glyph — moved left to (14, 60) so it doesn't touch the
          sparse pediatric cluster anchored at x=222+ on the top panel
          (and keeps visual alignment with the ✓ glyph below). */}
      <line x1={7} y1={53} x2={21} y2={67}
        stroke="var(--coral)" strokeWidth={2} strokeLinecap="round" opacity={0.9} />
      <line x1={7} y1={67} x2={21} y2={53}
        stroke="var(--coral)" strokeWidth={2} strokeLinecap="round" opacity={0.9} />

      {/* Sparse pediatric cluster (8 coral dots) */}
      {topPediPts.map(([x, y], i) => (
        <circle key={`tp${i}`} cx={x} cy={y} r={3.2}
          fill="var(--coral)" opacity={0.9} />
      ))}

      {/* Top label + sub-caption */}
      <text x={150} y={94} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={8.5}
        letterSpacing={0.8}
        fill="var(--coral)" fontWeight={600}>NO INTEGRATION · N=39</text>
      <text x={150} y={104} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={7}
        letterSpacing={0.6}
        fill="var(--cream-faint)">pediatric alone · unstable estimates</text>

      {/* ═══════════════════════════════════════════════════════════
          DIVIDER — hairline at y=108
         ═══════════════════════════════════════════════════════════ */}
      <line x1={20} x2={280} y1={108} y2={108}
        stroke="var(--cream-hairline)" strokeWidth={1} opacity={0.6} />

      {/* ═══════════════════════════════════════════════════════════
          BOTTOM PANEL — INTEGRATED
          y-range ≈ 120–252
         ═══════════════════════════════════════════════════════════ */}
      {/* ✓ glyph — moved left to (14, 175) so the check doesn't touch
          the adult cluster's leftmost dots at x=40-42. */}
      <line x1={6} y1={175} x2={12} y2={182}
        stroke="var(--coral)" strokeWidth={2.2} strokeLinecap="round" opacity={0.95} />
      <line x1={12} y1={182} x2={24} y2={168}
        stroke="var(--coral)" strokeWidth={2.2} strokeLinecap="round" opacity={0.95} />

      {/* Adult cluster (cyan, dense) */}
      {adultPts.map(([x, y], i) => (
        <circle key={`a${i}`} cx={x} cy={y} r={2.4}
          fill="var(--cyan, #7EC8C6)" opacity={0.85} />
      ))}

      {/* Pediatric cluster (coral, sparse) */}
      {pediPts.map(([x, y], i) => (
        <circle key={`p${i}`} cx={x} cy={y} r={3.2}
          fill="var(--coral)" opacity={0.9} />
      ))}

      {/* Merged center pool */}
      {mergedPts.map(([x, y], i) => (
        <circle key={`m${i}`} cx={x} cy={y} r={2.8}
          fill={i % 3 === 0 ? 'var(--coral)' : 'var(--cyan, #7EC8C6)'}
          opacity={0.9} />
      ))}
      <ellipse cx={150} cy={175} rx={32} ry={22}
        fill="none" stroke="var(--coral)" strokeWidth={1} opacity={0.35}
        strokeDasharray="4 4" />

      {/* ═══ Flowing particle sprites — adult → merged center ═══ */}
      {!reduce && adultSprites.map((s, i) => (
        <motion.circle
          key={`a-sprite-${i}`}
          cy={s.y} r={2.2} fill="var(--cyan, #7EC8C6)"
          initial={{ cx: 70, opacity: 0 }}
          animate={{
            cx: [70, 70, 150, 150],
            opacity: [0, 0.95, 0.95, 0],
          }}
          transition={{
            duration: s.duration, delay: s.delay, ease: SPRITE_EASE,
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* ═══ Flowing particle sprites — pediatric → merged center ═══ */}
      {!reduce && pediSprites.map((s, i) => (
        <motion.circle
          key={`p-sprite-${i}`}
          cy={s.y} r={2.6} fill="var(--coral)"
          initial={{ cx: 240, opacity: 0 }}
          animate={{
            cx: [240, 240, 150, 150],
            opacity: [0, 0.95, 0.95, 0],
          }}
          transition={{
            duration: s.duration, delay: s.delay, ease: SPRITE_EASE,
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* Bottom label + sub-caption */}
      <text x={150} y={240} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={9}
        letterSpacing={0.8}
        fill="var(--coral)" fontWeight={600}>INTEGRATED · N=419</text>
      <text x={150} y={251} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={7}
        letterSpacing={0.6}
        fill="var(--cream-faint)">3,337 obs · structural + covariate</text>
    </Frame>
  );
}

/* ============================================================
   DECISION 02 — CONSTRAIN (X/✓ vertical split, mirrors IntegrateViz)

   Re-architected 2026-04-24: previous design only showed the ✓ FIXED
   state (side-by-side CL/V Anderson-Holford slopes). User asked for
   the same X/✓ contrast IntegrateViz uses so the educational beat
   ("biology-driven, not data-driven · estimating exponents on N=39
   didn't improve fit") reads visually, not just from body text.
   Pre-redesign snapshot lives in:
     _archive/2026-04-24-ConstrainViz-fixed-only.md

   TOP panel (y≈20–104) — ✗ ESTIMATED · WOBBLES
     · Single full-width "slope fan" — 7 thin candidate slope lines
       diverging from a 70-kg anchor on the right, fanning LEFT toward
       small body weights (where pediatric data is sparsest, hence
       most ambiguous). Slopes range 0.30–1.20 around the biology
       value 0.75 — what an N=39 exponent estimate could plausibly
       return. No axes — the fan IS the message.
   DIVIDER (y=108)         : hairline x=20→280, identical to IntegrateViz
   BOTTOM panel (y≈120–252) — ✓ FIXED · BIOLOGY-DRIVEN
     · Preserved side-by-side log-log charts (CL · Q slope 0.75 ·
       Vc · Vp slope 1.0) — compressed vertically from the original
       (was y=28–212, now y=132–222) to fit the bottom half. All
       scientific values, anchors, callouts, sprites preserved.

   Bounding-box audit (VB 300×260):
     Element                   x-range    y-range    Notes
     ✗ glyph (top)             7–21       50–64      coral strokes
     Slope fan anchor          228–232    58–62      ref dot at right
     Slope fan lines           60–230     30–90      7 thin lines
     "WT^?" hover label        96–116     46–55      cream-faint mono
     TOP caption               90–210     94–104     coral mono
     Divider hairline          20–280     108–108    cream-hairline
     ✓ glyph (bottom)          6–24       175–189    coral strokes
     LEFT chart plot area      32–138     132–218    m.l=28, m.t=132
     LEFT label "CL · Q"       32–138     128–134    above plot
     LEFT 70-KG callout        56–138     140–158    leader to anchor
     LEFT axis title           36–146     230–238    BODY WEIGHT · KG
     Mid divider               150–150    132–218    vertical hairline
     RIGHT chart plot area     182–288    132–218    m.l=28, m.t=132
     RIGHT label "Vc · Vp"     182–288    128–134
     RIGHT 70-KG callout       192–272    158–176
     RIGHT axis title          186–296    230–238
     BOTTOM caption            70–230     244–252    coral mono
     Citation                  160–296    258–262    bottom-right
   ============================================================ */
export function ConstrainViz({ delay = 0 }) {
  const reduce = useReducedMotion();

  /* ─── TOP PANEL geometry (y 20–105) ─────────────────────────
     The fan visualises "exponent estimated from N=39 sparse
     pediatric data could land anywhere between ~0.3 and ~1.3";
     biology (Anderson-Holford) says 0.75. Centered on 0.75 so
     the central line reads as "what we ended up forcing".     */
  const FAN_ANCHOR_X = 230;     // 70-kg reference pivot (right)
  const FAN_ANCHOR_Y = 60;      // vertical midline of top panel
  const FAN_LEFT_X = 60;        // small-weight end of fan (left)
  const FAN_SPAN_X = FAN_ANCHOR_X - FAN_LEFT_X; // 170px
  // 7 candidate slopes, centered on 0.75 (the biology value the
  // BOTTOM panel locks down). y-deflection at the LEFT end = how
  // far that candidate diverges from the central 0.75 line.
  //
  // Physics: y(w) = anchor · (w/70)^slope. At w<70 (left of anchor)
  // a HIGHER slope drives y SMALLER (steeper drop going left). In
  // SVG, smaller y-value-on-the-chart means LARGER y-pixel (downward),
  // so higher slope → larger +pixel deflection → lower on screen.
  // Hence (slope − 0.75) directly, no negation. Visual scale: each
  // unit of slope difference produces ~80px of deflection at the
  // left end → wide visible fan that reads as "this is unstable".
  const FAN_SLOPES = [0.30, 0.45, 0.60, 0.75, 0.90, 1.05, 1.20];
  const FAN_DEFLECT = (slope) => (slope - 0.75) * 80;

  /* ─── BOTTOM PANEL geometry (y 120–252) ────────────────────
     Same architecture as the original ConstrainViz (preserved
     verbatim in /_archive/2026-04-24-ConstrainViz-fixed-only.md)
     but vertically compressed: chart_top moved 28→132, chart_bot
     moved 212→218 → plot area 184px → 86px tall. All scientific
     values (CLREF=7 L/h, VREF=30 L, slopes 0.75/1.0, ref weights,
     wxRange, yRanges) unchanged.                              */
  const CHART_TOP = 132;
  const CHART_BOT = 218;
  const AXIS_LABEL_Y = 236;

  // Chart panel bounds — same as original
  const LEFT_X0 = 4;
  const LEFT_X1 = 146;
  const RIGHT_X0 = 154;
  const RIGHT_X1 = 296;
  const DIVIDER_X = 150;

  // Per-chart log-log scales. Weight domain is SHARED so both charts
  // read on the same x-axis; y-domain is PER-CHART because CL and V
  // have different physical ranges (CL ≈ 0.6–10 L/h; Vc ≈ 1–45 L in
  // the weight band shown). Using one shared y-range caused the V
  // line to either clip above the top (if VREF was realistic) or dive
  // below the bottom (if VREF was shrunk to fit). Per-chart ranges
  // keep each line inside its plot area and both are scientifically
  // accurate: published ambrisentan adult Vc ≈ 25–35 L (Okour 2023,
  // Ivy 2020) and CL ≈ 6–9 L/h. User ask 2026-04-24:
  // "volume chart is messy — maybe end on axis not go all the way down"
  // and "verify charts are accurate scientifically".
  const wxRange = [3, 100];
  const clYRange = [0.3, 20];  // CL · L/h
  const vYRange  = [1, 60];    // Vc · L

  const makeScales = (x0, x1, cyRange) => {
    const m = { t: CHART_TOP, r: 8, b: VB_H - CHART_BOT, l: 28 };
    const panelW = x1 - x0;
    const iw = panelW - m.l - m.r;
    const ih = CHART_BOT - CHART_TOP;
    const xLog = (w) => x0 + m.l + ((Math.log10(w) - Math.log10(wxRange[0])) /
      (Math.log10(wxRange[1]) - Math.log10(wxRange[0]))) * iw;
    const yLog = (v) => CHART_TOP + ih - ((Math.log10(v) - Math.log10(cyRange[0])) /
      (Math.log10(cyRange[1]) - Math.log10(cyRange[0]))) * ih;
    return { m, iw, ih, xLog, yLog, x0, x1, cyRange };
  };

  const L = makeScales(LEFT_X0, LEFT_X1, clYRange);
  const R = makeScales(RIGHT_X0, RIGHT_X1, vYRange);

  // Reference weights + anchor shared across both charts
  const refWeights = [3, 15, 45, 70];
  const anchorW = 70;

  // LEFT chart — CL / Q slope 0.75 through (70 kg, 7 L/h)
  // Scientific basis: Anderson & Holford 2008; Okour et al. JCP 2023
  // report ambrisentan adult CL ≈ 6.7 L/h for a typical 70-kg patient.
  const CLREF = 7;
  const clFn = (w) => CLREF * Math.pow(w / 70, 0.75);

  // RIGHT chart — Vc / Vp slope 1.0 through (70 kg, 30 L).
  // Scientific basis: ambrisentan adult Vc ≈ 25–35 L in Okour 2023;
  // volumes scale linearly with body weight (slope 1.0) so this line
  // sweeps 1.3 L (3 kg neonate) → 43 L (100 kg adult), entirely
  // inside the per-chart y-range [1, 60] → no clipping below the
  // x-axis.
  const VREF = 30;
  const vFn = (w) => VREF * Math.pow(w / 70, 1.0);

  // Chart-scoped renderer: grid + axis + slope + refs + arrow sprites
  const renderChart = (S, cfg) => {
    const { xLog, yLog, ih, x0 } = S;
    const lineWeights = [3, 100];
    const [wa, wb] = lineWeights;
    const x0px = xLog(wa);
    const x1px = xLog(wb);
    const y0px = yLog(cfg.fn(wa));
    const y1px = yLog(cfg.fn(wb));
    const angleDeg = Math.atan2(y1px - y0px, x1px - x0px) * 180 / Math.PI;
    const arrowPoints = '-4,-4 -4,4 6,0';

    return (
      <g key={cfg.key}>
        {/* Grid — vertical */}
        {[3, 10, 30, 100].map((w) => (
          <line key={`${cfg.key}-vx${w}`}
            x1={xLog(w)} x2={xLog(w)} y1={CHART_TOP} y2={CHART_TOP + ih}
            stroke="var(--cream-hairline)" strokeWidth={0.5} opacity={0.35} />
        ))}
        {/* Grid — horizontal */}
        {[0.5, 1, 3, 10].map((v) => (
          <line key={`${cfg.key}-hy${v}`}
            x1={x0 + S.m.l} x2={x0 + S.m.l + S.iw} y1={yLog(v)} y2={yLog(v)}
            stroke="var(--cream-hairline)" strokeWidth={0.5} opacity={0.35} />
        ))}
        {/* Axis lines */}
        <line x1={x0 + S.m.l} x2={x0 + S.m.l + S.iw} y1={CHART_TOP + ih} y2={CHART_TOP + ih}
          stroke="var(--cream-faint)" strokeWidth={0.8} />
        <line x1={x0 + S.m.l} x2={x0 + S.m.l} y1={CHART_TOP} y2={CHART_TOP + ih}
          stroke="var(--cream-faint)" strokeWidth={0.8} />

        {/* Slope line */}
        <line
          x1={x0px} y1={y0px} x2={x1px} y2={y1px}
          stroke="var(--coral)" strokeWidth={2.2} strokeLinecap="round"
        />

        {/* Reference points */}
        {refWeights.map((w) => {
          const cx = xLog(w);
          const cy = yLog(cfg.fn(w));
          const isAnchor = w === anchorW;
          return (
            <circle key={`${cfg.key}-ref-${w}`} cx={cx} cy={cy} r={isAnchor ? 4 : 3}
              fill="var(--coral)" stroke="var(--bg)"
              strokeWidth={isAnchor ? 1.5 : 1} />
          );
        })}

        {/* Arrow sprites — travel along slope, play twice then stop */}
        {!reduce && cfg.arrows.map((a, i) => (
          <motion.g
            key={`${cfg.key}-arrow-${i}`}
            initial={{ x: x0px, y: y0px, rotate: angleDeg, opacity: 0 }}
            animate={{
              x: [x0px, x1px],
              y: [y0px, y1px],
              rotate: angleDeg,
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: a.duration, delay: a.delay, ease: SPRITE_EASE,
              times: [0, 0.12, 0.5, 0.85, 1],
              repeat: 1,
            }}
            style={{ transformBox: 'fill-box' }}
          >
            <polygon points={arrowPoints}
              fill="var(--coral)"
              stroke="var(--bg)" strokeWidth={0.6} />
          </motion.g>
        ))}

        {/* Axis tick labels */}
        {[3, 10, 30, 100].map((w) => (
          <text key={`${cfg.key}-tx${w}`} x={xLog(w)} y={CHART_TOP + ih + 10} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize={7} fill="var(--cream-faint)">{w}</text>
        ))}

        {/* Per-chart axis title (BODY WEIGHT · KG) */}
        <text x={x0 + S.m.l + S.iw / 2} y={AXIS_LABEL_Y} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize={7}
          letterSpacing={1}
          fill="var(--cream-faint)">BODY WEIGHT · KG</text>

        {/* Per-chart label above plot — includes the slope equation
            (e.g. "CL · Q  ∝ WT^0.75"). The equation used to render
            INSIDE the plot top-left, but the compressed BOTTOM panel
            put the in-plot equation underneath the "70 KG · ADULT"
            leader callout. Folding the equation into the title row
            (above the plot) frees the plot interior for the slope +
            anchor + leader without conflict. */}
        <text x={x0 + S.m.l + S.iw / 2} y={CHART_TOP - 4} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize={8}
          letterSpacing={0.8}
          fill="var(--coral)" fontWeight={600}>
          {cfg.title}
          <tspan fill="var(--cream-faint)">  ·  </tspan>
          <tspan fill="var(--cream)">{cfg.eqnPrefix}</tspan>
          <tspan fill="var(--cream)" fontSize={6.5} dy={-2.5}>{cfg.eqnExp}</tspan>
        </text>
      </g>
    );
  };

  return (
    <Frame delay={delay} label="Allometric exponents: estimating from N=39 wobbles versus fixing at Anderson-Holford 0.75 and 1.0 yields stable scaling">
      {/* ═══════════════════════════════════════════════════════════
          TOP PANEL — ✗ ESTIMATED · WOBBLES (slope fan)
          y-range ≈ 20–105 · mirrors IntegrateViz top panel structure
         ═══════════════════════════════════════════════════════════ */}

      {/* ✗ glyph — same x position (7→21) and stroke style as
          IntegrateViz top panel so the two slides' bad-case markers
          read as identical visual chips. */}
      <line x1={7} y1={50} x2={21} y2={64}
        stroke="var(--coral)" strokeWidth={2} strokeLinecap="round" opacity={0.9} />
      <line x1={7} y1={64} x2={21} y2={50}
        stroke="var(--coral)" strokeWidth={2} strokeLinecap="round" opacity={0.9} />

      {/* "WT^?" hover label — reinforces "exponent unknown" before
          the fan animation starts. Placed top-left of the fan so it
          doesn't crash into the diverging line endpoints. */}
      <text x={70} y={32}
        fontFamily="var(--font-mono)" fontSize={8.5}
        letterSpacing={0.3}
        fill="var(--cream-faint)">∝ WT<tspan fontSize={6.5} dy={-2.5}>?</tspan></text>

      {/* Slope fan — 7 thin coral candidate slopes diverging from
          the 70-kg anchor on the right. Each slope draws (pathLength
          0→1) on a stagger so the visual reads as "fits being tried
          one after another, none agreeing". After all 7 finish, they
          remain visible — the persistent fan IS the message.

          Reduced-motion: render statically with the same stroke
          opacity (no draw-on cascade), still legible as a fan. */}
      {FAN_SLOPES.map((slope, i) => {
        const dy = FAN_DEFLECT(slope);
        const x1 = FAN_LEFT_X;
        const y1 = FAN_ANCHOR_Y + dy;
        const isCenter = slope === 0.75;
        const strokeOp = isCenter ? 0.7 : 0.55;
        // Center line (the actual biology value 0.75) gets slightly
        // stronger emphasis so the fan "centers" visually on what
        // the bottom panel will lock down.
        const drawDelay = i * 0.18;
        return reduce ? (
          <line key={`fan-${i}`}
            x1={x1} y1={y1} x2={FAN_ANCHOR_X} y2={FAN_ANCHOR_Y}
            stroke="var(--coral)" strokeWidth={isCenter ? 1.4 : 1}
            strokeLinecap="round" opacity={strokeOp}
            strokeDasharray={isCenter ? null : '3 3'} />
        ) : (
          <motion.line key={`fan-${i}`}
            x1={x1} y1={y1} x2={FAN_ANCHOR_X} y2={FAN_ANCHOR_Y}
            stroke="var(--coral)" strokeWidth={isCenter ? 1.4 : 1}
            strokeLinecap="round"
            strokeDasharray={isCenter ? null : '3 3'}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: strokeOp }}
            transition={{ duration: 0.5, delay: drawDelay, ease }} />
        );
      })}

      {/* 70-kg anchor dot — every candidate fit is forced through
          this point (the adult reference). It's the ONE thing the
          data agrees on; the slope around it is what wobbles. */}
      <circle cx={FAN_ANCHOR_X} cy={FAN_ANCHOR_Y} r={3.2}
        fill="var(--coral)" stroke="var(--bg)" strokeWidth={1} />
      <text x={FAN_ANCHOR_X + 7} y={FAN_ANCHOR_Y + 3}
        fontFamily="var(--font-mono)" fontSize={7}
        letterSpacing={0.5}
        fill="var(--cream-faint)">70 KG</text>

      {/* Top label + sub-caption — same typography as IntegrateViz
          top panel ("NO INTEGRATION · N=39" / "pediatric alone ·
          unstable estimates") so the X chip on Slide 08 reads as a
          consistent visual idiom across decisions. */}
      <text x={150} y={94} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={8.5}
        letterSpacing={0.8}
        fill="var(--coral)" fontWeight={600}>ESTIMATED · N=39</text>
      <text x={150} y={104} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={7}
        letterSpacing={0.6}
        fill="var(--cream-faint)">exponents wobble · data-driven · unstable</text>

      {/* ═══════════════════════════════════════════════════════════
          DIVIDER — hairline at y=108 (identical to IntegrateViz)
         ═══════════════════════════════════════════════════════════ */}
      <line x1={20} x2={280} y1={108} y2={108}
        stroke="var(--cream-hairline)" strokeWidth={1} opacity={0.6} />

      {/* ═══════════════════════════════════════════════════════════
          BOTTOM PANEL — ✓ FIXED · BIOLOGY-DRIVEN
          y-range ≈ 120–252 · preserved CL/V side-by-side, compressed
         ═══════════════════════════════════════════════════════════ */}

      {/* ✓ glyph — same x position and stroke style as IntegrateViz
          bottom panel so the good-case marker reads as identical. */}
      <line x1={6} y1={175} x2={12} y2={182}
        stroke="var(--coral)" strokeWidth={2.2} strokeLinecap="round" opacity={0.95} />
      <line x1={12} y1={182} x2={24} y2={168}
        stroke="var(--coral)" strokeWidth={2.2} strokeLinecap="round" opacity={0.95} />

      {/* LEFT chart — CL · Q, slope 0.75.
          70-kg callout dropped from the compressed BOTTOM panel — the
          anchor dot (larger, white stroke) is still visually distinct
          inside the chart, and the TOP-panel fan already labels the
          70-kg pivot explicitly. The original full-height chart used
          a leader callout ("70 KG · ADULT"), preserved in archive. */}
      {renderChart(L, {
        key: 'left',
        fn: clFn,
        title: 'CL · Q',
        eqnPrefix: '∝ WT',
        eqnExp: '0.75',
        arrows: [
          { delay: 0.0, duration: 4.0 },
          { delay: 1.3, duration: 4.0 },
        ],
      })}

      {/* Vertical divider hairline between the two BOTTOM charts.
          Note: this is INSIDE the bottom panel only — it does NOT
          cross the y=108 horizontal divider. */}
      <line x1={DIVIDER_X} x2={DIVIDER_X} y1={CHART_TOP} y2={CHART_BOT}
        stroke="var(--cream-hairline)" strokeWidth={0.8} opacity={0.6} />

      {/* RIGHT chart — Vc · Vp, slope 1.0. Same callout-removal
          rationale as LEFT chart above. */}
      {renderChart(R, {
        key: 'right',
        fn: vFn,
        title: 'Vc · Vp',
        eqnPrefix: '∝ WT',
        eqnExp: '1.0',
        arrows: [
          { delay: 0.0, duration: 4.0 },
          { delay: 1.3, duration: 4.0 },
        ],
      })}

      {/* Bottom label + sub-caption — mirrors IntegrateViz bottom
          panel ("INTEGRATED · N=419" / "3,337 obs · structural +
          covariate"). Citation lives in the sub-caption now (was a
          standalone line in the original; folded in here to keep the
          bottom-panel chrome lean). */}
      <text x={150} y={246} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={9}
        letterSpacing={0.8}
        fill="var(--coral)" fontWeight={600}>FIXED · BIOLOGY-DRIVEN</text>
      <text x={150} y={257} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={7}
        letterSpacing={0.6}
        fill="var(--cream-faint)">Anderson-Holford 2008 · ICH E11A 2025 default</text>
    </Frame>
  );
}

/* ============================================================
   DECISION 03 — STAY PARSIMONIOUS
   12 covariate chips in 3×4 grid with static strike-through.
   Continuous particle sprites fly IN from the left edge toward
   a chip center, then fade (the chip rejects them) — visualises
   "covariates tested and rejected" as a steady rhythm.
   ============================================================ */
export function ParsimonyViz({ delay = 0 }) {
  const reduce = useReducedMotion();

  const covariates = [
    { abbr: 'BILI',  full: 'Bilirubin' },
    { abbr: 'ALT',   full: 'Alanine aminotransferase' },
    { abbr: 'AST',   full: 'Aspartate aminotransferase' },
    { abbr: 'ALP',   full: 'Alkaline phosphatase' },
    { abbr: 'GGT',   full: 'Gamma-glutamyl transferase' },
    { abbr: 'CrCl',  full: 'Creatinine clearance' },
    { abbr: 'AGE',   full: 'Age' },
    { abbr: 'SEX',   full: 'Sex' },
    { abbr: 'RACE',  full: 'Race' },
    { abbr: 'ETH',   full: 'Ethnicity' },
    { abbr: 'DOSE',  full: 'Dose group' },
    { abbr: 'T-LAG', full: 'Dose on absorption lag' },
  ];

  const cols = 4;
  const rows = 3;
  const padX = 20;
  const padTop = 28;
  const padBot = 46;
  const gridW = VB_W - padX * 2;
  const gridH = VB_H - padTop - padBot;
  const cellW = gridW / cols;
  const cellH = gridH / rows;

  // Pick 8 chip centers as sprite targets (covers every row, varied cols).
  const chipCenters = [0, 2, 5, 6, 8, 10, 3, 11].map((idx) => {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    return {
      cx: padX + c * cellW + cellW / 2,
      cy: padTop + r * cellH + cellH / 2,
    };
  });

  // 8 sprites, one per target chip, staggered so ~2 are in flight at once.
  const chipSprites = chipCenters.map((p, i) => ({
    targetX: p.cx,
    targetY: p.cy,
    delay: i * 0.45,
    duration: 3.2,
  }));

  return (
    <Frame delay={delay} label="Twelve covariates tested, none retained at p less than 0.001">
      {/* Header kickers */}
      <text x={padX} y={16}
        fontFamily="var(--font-mono)" fontSize={8.5}
        letterSpacing={1.2}
        fill="var(--cream-faint)">12 TESTED</text>
      <text x={VB_W - padX} y={16} textAnchor="end"
        fontFamily="var(--font-mono)" fontSize={8.5}
        letterSpacing={1.2}
        fill="var(--coral)" fontWeight={600}>0 RETAINED</text>

      {/* Covariate chips — box + label static; REJECTION CROSS (×) is
          the animated sprite. Each chip's cross consists of two
          diagonal strokes that draw pathLength 0→1 on a stagger, hold
          briefly, then reset. The cascade sweeps through all 12 chips
          like a rejection ledger being stamped in real time.
          User ask 2026-04-24: "sprite-like cross each of the boxes,
          not dots moving." */}
      {covariates.map((cov, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const cx = padX + c * cellW + cellW / 2;
        const cy = padTop + r * cellH + cellH / 2;
        const chipW = cellW - 6;
        const chipH = cellH - 8;
        const inset = 3;
        // Cross stroke endpoints (two diagonals forming an ×).
        const x0 = cx - chipW / 2 + inset;
        const y0 = cy - chipH / 2 + inset;
        const x1 = cx + chipW / 2 - inset;
        const y1 = cy + chipH / 2 - inset;

        // One-shot staggered stamp — chips get "rejected" sequentially
        // 1→12 in a fast cascade, then the strikes REMAIN drawn. No
        // looping (user ask: limit ambient animations on slide 8 to
        // avoid distraction). Each chip's stroke takes 0.35s to draw
        // after its stagger delay.
        const strokeDelay = i * 0.18;

        const strikeTransition = {
          duration: 0.35,
          delay: strokeDelay,
          ease: ease,
        };
        // pathLength 0 → 1 (drawn once), opacity 0 → 0.85. No fade,
        // no repeat — the cross is a permanent rejection mark.
        const strikeAnimate = {
          pathLength: 1,
          opacity: 0.85,
        };

        return (
          <g key={cov.abbr}>
            <rect
              x={cx - chipW / 2} y={cy - chipH / 2}
              width={chipW} height={chipH}
              rx={3}
              fill="none"
              stroke="var(--cream-hairline)" strokeWidth={0.8}
              opacity={0.7}
            />
            <text x={cx} y={cy + 3} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize={9}
              letterSpacing={0.8}
              fill="var(--cream-faint)"
              opacity={0.85}>{cov.abbr}</text>
            {/* First diagonal of the × (TL → BR) */}
            {reduce ? (
              <line x1={x0} y1={y0} x2={x1} y2={y1}
                stroke="var(--coral)" strokeWidth={1.5}
                strokeLinecap="round" opacity={0.85} />
            ) : (
              <motion.line
                x1={x0} y1={y0} x2={x1} y2={y1}
                stroke="var(--coral)" strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={strikeAnimate}
                transition={strikeTransition}
              />
            )}
            {/* Second diagonal of the × (BL → TR) */}
            {reduce ? (
              <line x1={x0} y1={y1} x2={x1} y2={y0}
                stroke="var(--coral)" strokeWidth={1.5}
                strokeLinecap="round" opacity={0.85} />
            ) : (
              <motion.line
                x1={x0} y1={y1} x2={x1} y2={y0}
                stroke="var(--coral)" strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={strikeAnimate}
                transition={{ ...strikeTransition, delay: strokeDelay + 0.12 }}
              />
            )}
          </g>
        );
      })}

      {/* Footer */}
      <text x={VB_W / 2} y={VB_H - 22} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={8.5}
        letterSpacing={1.2}
        fill="var(--cream-faint)">NONE RETAINED</text>
      <text x={VB_W / 2} y={VB_H - 8} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={7.5}
        letterSpacing={1.2}
        fill="var(--coral)"
        fontWeight={600}>p &lt; 0.001 · BODY WEIGHT ONLY</text>
    </Frame>
  );
}
