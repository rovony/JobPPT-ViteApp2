# `ConstrainViz` — fixed-only side-by-side (snapshot before X/✓ split)

Snapshot date: **2026-04-24**
Source file: `src/decks/qp2-seminar/slides/cs1-strategy/DecisionVisuals.jsx`
Replaces: previous side-by-side CL/V design with arrow sprites that only showed the FIXED Anderson-Holford state.
Replaced by: vertical `✗ ESTIMATED` (top, wobbly slope fan) over `✓ FIXED · BIOLOGY-DRIVEN` (bottom, preserved side-by-side CL/V) split — matches the X/✓ pattern of `IntegrateViz`.

## Why archived

User ask 2026-04-24:

> can we visual have similar to left graph that x and checkmark — that x is visual to show if we estimate from small size that might not be correct

Slide 08's DECISION 01 (IntegrateViz) shows both states (✗ pediatric-only unstable / ✓ integrated stable). DECISION 02 (this component) only showed the GOOD "fixed" state — no contrast for "what if we estimated exponents on N=39 instead of fixing them per Anderson-Holford?" The notes call this out explicitly:

> ==Biology-driven, not data-driven== · estimating exponents on N=39 didn't improve fit

The replacement adds the missing X case (a fan of wobbly slope candidates) so the educational beat ("constrain because data-driven on N=39 is unstable") reads visually, not just in the body text below the chart.

The two-chart side-by-side CL/Q + Vc/Vp design is preserved verbatim in the BOTTOM panel of the replacement — only the framing changes (added ✗ overlay above + glyphs + labels).

## Component (verbatim from DecisionVisuals.jsx)

```jsx
/* ============================================================
   DECISION 02 — CONSTRAIN (two side-by-side log-log charts)

   LEFT chart  (x 4–146)  : CL · Q vs WT, slope 0.75 (solid coral).
                            Arrow sprites travel up-slope, play twice
                            then stop. "70 KG · ADULT" leader callout.
   DIVIDER                 : vertical hairline at x=150.
   RIGHT chart (x 154–296) : Vc · Vp vs WT, slope 1.0 (solid coral).
                            One arrow sprite up-slope, plays twice
                            then stops.
   Shared top kicker       : "ALLOMETRY · FIXED"
   Shared bottom citation  : Anderson & Holford, 2008
   Each chart uses its own xLog/yLog closure scoped to its margins.

   Bounding-box audit (VB 300×260):
     Element               x-range    y-range   Notes
     Top kicker            60–240     10–20     centered across both
     LEFT chart plot area  32–138     32–212    m.l=28, m.t=28
     LEFT label "CL · Q"   32–138     26–34     above chart
     LEFT equation         38–100     44–56     inside chart top-left
     LEFT 70-KG callout    56–138     40–55     leader to (70kg, 7) pt
     LEFT axis title       36–146     224–234
     Divider               150–150    28–212    vertical hairline
     RIGHT chart plot area 182–288    32–212    m.l=28, m.t=28
     RIGHT label "Vc · Vp" 182–288    26–34
     RIGHT equation        188–250    44–56
     RIGHT axis title      186–296    224–234
     Citation              160–296    252–256   bottom-right
   ============================================================ */
export function ConstrainViz({ delay = 0 }) {
  const reduce = useReducedMotion();

  // Shared top + bottom zones
  const TOP_KICKER_Y = 16;
  const CHART_TOP = 28;
  const CHART_BOT = 212;
  const AXIS_LABEL_Y = 230;

  // Chart panel bounds
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

        {/* Per-chart label above plot */}
        <text x={x0 + S.m.l + S.iw / 2} y={CHART_TOP - 4} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize={8}
          letterSpacing={0.8}
          fill="var(--coral)" fontWeight={600}>{cfg.title}</text>

        {/* Equation inside plot top-left */}
        <text
          x={x0 + S.m.l + 4} y={CHART_TOP + 12}
          fontFamily="var(--font-mono)" fontSize={8.5}
          letterSpacing={0.3}
          fill="var(--cream)"
        >
          {cfg.eqnPrefix}
          <tspan fontSize={6.5} dy={-2.5}>{cfg.eqnExp}</tspan>
        </text>
      </g>
    );
  };

  return (
    <Frame delay={delay} label="Allometric scaling fixed: clearance slope 0.75, volumes slope 1.0">
      {/* Top kicker — spans both charts */}
      <text x={VB_W / 2} y={TOP_KICKER_Y} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={8}
        letterSpacing={1.4}
        fill="var(--cream-faint)">ALLOMETRY · FIXED</text>

      {/* LEFT chart — CL · Q, slope 0.75 */}
      {renderChart(L, {
        key: 'left',
        fn: clFn,
        title: 'CL · Q',
        eqnPrefix: '∝ WT',
        eqnExp: '0.75',
        arrows: [
          { delay: 0.0, duration: 4.0 },
          { delay: 1.3, duration: 4.0 },
          { delay: 2.6, duration: 4.0 },
        ],
      })}

      {/* 70-KG callout — leader line from the adult reference point
          up-and-left to a cream-faint leader with coral label. Scoped
          to the LEFT chart only (the CL reference is the hero of the
          slide). */}
      {(() => {
        const ax = L.xLog(70);
        const ay = L.yLog(clFn(70));
        const lx = ax - 18;
        const ly = ay - 26;
        return (
          <g>
            <line x1={ax} y1={ay - 4} x2={lx + 2} y2={ly + 2}
              stroke="var(--cream-faint)" strokeWidth={0.6} opacity={0.8} />
            <text x={lx} y={ly} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize={7.5}
              letterSpacing={0.6}
              fill="var(--coral)" fontWeight={600}>70 KG · ADULT</text>
          </g>
        );
      })()}

      {/* Vertical divider hairline between the two charts */}
      <line x1={DIVIDER_X} x2={DIVIDER_X} y1={CHART_TOP} y2={CHART_BOT}
        stroke="var(--cream-hairline)" strokeWidth={0.8} opacity={0.6} />

      {/* RIGHT chart — Vc · Vp, slope 1.0.
          Arrow schedule matches the LEFT chart (3 staggered sprites on
          a 4s cadence) so both charts animate symmetrically — user ask
          was to keep the existing CL treatment verbatim and just edit
          the slope/labels for V. */}
      {renderChart(R, {
        key: 'right',
        fn: vFn,
        title: 'Vc · Vp',
        eqnPrefix: '∝ WT',
        eqnExp: '1.0',
        arrows: [
          { delay: 0.0, duration: 4.0 },
          { delay: 1.3, duration: 4.0 },
          { delay: 2.6, duration: 4.0 },
        ],
      })}

      {/* 70-KG callout — placed BELOW the anchor on the RIGHT chart.
          On V chart the anchor dot sits near the top-right of the
          plot (V=30 L at 70kg lands in the upper band), so placing
          the label above like on the CL chart crashes it into the
          equation text. Routing the leader DOWN-LEFT puts the label
          in clean empty space below the slope. */}
      {(() => {
        const ax = R.xLog(70);
        const ay = R.yLog(vFn(70));
        const lx = ax - 18;
        const ly = ay + 22;
        return (
          <g>
            <line x1={ax} y1={ay + 4} x2={lx + 2} y2={ly - 4}
              stroke="var(--cream-faint)" strokeWidth={0.6} opacity={0.8} />
            <text x={lx} y={ly} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize={7.5}
              letterSpacing={0.6}
              fill="var(--coral)" fontWeight={600}>70 KG · ADULT</text>
          </g>
        );
      })()}

      {/* Shared citation */}
      <text x={VB_W - 4} y={VB_H - 4} textAnchor="end"
        fontFamily="var(--font-mono)" fontSize={7}
        fill="var(--cream-faint)"
        opacity={0.7}>Anderson & Holford, 2008</text>
    </Frame>
  );
}
```

## Restoring

If a future redesign wants to revert to the fixed-only side-by-side, copy the function body above back into `DecisionVisuals.jsx` (replacing the X/✓ split version). No other files reference `ConstrainViz`'s internals — the export name is stable.
