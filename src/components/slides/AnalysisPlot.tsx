import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ComposedChart,
  ScatterChart,
  Line,
  Area,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import {
  PCVPC_DATA,
  EXPOSURE_MATCH_DATA,
  EXPOSURE_RESPONSE_DATA,
  type ExposureMatchPoint,
} from './analysis-plot-data';

/**
 * AnalysisPlot (reference / Recharts variant).
 *
 * Status: EXPORTED BUT NOT YET USED IN THE DECK.
 *
 * Built to satisfy friend's Prompt 3 (2026-04-23): a variant-driven
 * Recharts plot frame with a shared layoutId so slides 10-12 can
 * morph position/size while their chart contents crossfade.
 *
 * The LIVE deck's slides 11d/11e/11f already use the real-data custom
 * SVG charts wrapped in src/components/deck/patterns/AnalysisPlot.jsx.
 * This Recharts version is kept as a reference/swap candidate — if we
 * later decide to replace the custom SVG with Recharts, this component
 * already encodes the chart shapes and palette expectations.
 *
 * Palette:
 *   adult   → var(--cyan, #7DD3FC)
 *   peds    → var(--coral, #FB923C)
 *   axis    → var(--cream-hairline)
 *   tick    → var(--cream-faint) mono 11px
 *
 * Motion:
 *   Outer <motion.div layoutId> enables the shared-element morph.
 *   Reduced-motion bypass drops the wrapper.
 */

export interface AnalysisPlotProps {
  variant: 'pcvpc' | 'exposure-match' | 'exposure-response';
  layoutId?: string;
  className?: string;
}

const AXIS_TICK = {
  fill: 'var(--cream-faint, rgba(215,212,204,0.38))',
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
} as const;

const AXIS_LINE = {
  stroke: 'var(--cream-hairline, rgba(215,212,204,0.14))',
  strokeWidth: 1,
} as const;

const LAYOUT_TRANSITION = { duration: 1.0, ease: [0.4, 0, 0.2, 1] };

export default function AnalysisPlot({
  variant,
  layoutId = 'analysis-plot',
  className,
}: AnalysisPlotProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={{ width: '100%', height: '100%' }}>
        {renderChart(variant)}
      </div>
    );
  }

  // Outer motion.div holds the layoutId frame (morphs position/size across slides).
  // Inner AnimatePresence mode="wait" key={variant} crossfades the chart contents
  // so switching variants feels like contents evolving inside a locked frame.
  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: LAYOUT_TRANSITION }}
      className={className}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={variant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          {renderChart(variant)}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function renderChart(variant: AnalysisPlotProps['variant']) {
  switch (variant) {
    case 'pcvpc':
      return <PcVpcLines />;
    case 'exposure-match':
      return <ExposureMatchScatter />;
    case 'exposure-response':
      return <ExposureResponseFlat />;
    default:
      return null;
  }
}

/* -------------------- pcVPC -------------------- */
/* LineChart-equivalent with Area for 90% PI + Line for median.
   ComposedChart is used so Area + Line coexist on the same frame. */
function PcVpcLines() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={PCVPC_DATA}
        margin={{ top: 24, right: 24, left: 8, bottom: 32 }}
      >
        <CartesianGrid stroke="var(--cream-hairline, rgba(215,212,204,0.14))" strokeDasharray="2 6" />
        <XAxis
          dataKey="t"
          type="number"
          domain={[0, 24]}
          ticks={[0, 4, 8, 12, 16, 20, 24]}
          tick={AXIS_TICK}
          axisLine={AXIS_LINE}
          tickLine={AXIS_LINE}
          label={{ value: 'time · hr', position: 'insideBottom', offset: -18, style: AXIS_TICK as React.CSSProperties }}
        />
        <YAxis
          tick={AXIS_TICK}
          axisLine={AXIS_LINE}
          tickLine={AXIS_LINE}
          label={{ value: 'concentration · ng/mL', angle: -90, position: 'insideLeft', style: AXIS_TICK as React.CSSProperties }}
        />
        {/* 90% PI ribbon via stacked Areas (piLow baseline + piHigh - piLow band) */}
        <Area
          type="monotone"
          dataKey="piHigh"
          stroke="none"
          fill="var(--coral, #FB923C)"
          fillOpacity={0.14}
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="piLow"
          stroke="none"
          fill="var(--bg, #1B1B1E)"
          fillOpacity={1}
          isAnimationActive={false}
        />
        {/* Median line */}
        <Line
          type="monotone"
          dataKey="median"
          stroke="var(--coral, #FB923C)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

/* -------------------- exposure-match -------------------- */
/* ScatterChart with two series: adult cyan (~100) + peds coral (~40). */
function ExposureMatchScatter() {
  const adult = EXPOSURE_MATCH_DATA.filter((d: ExposureMatchPoint) => d.population === 'adult');
  const peds = EXPOSURE_MATCH_DATA.filter((d: ExposureMatchPoint) => d.population === 'pediatric');

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 24, right: 24, left: 8, bottom: 32 }}>
        <CartesianGrid stroke="var(--cream-hairline, rgba(215,212,204,0.14))" strokeDasharray="2 6" />
        <XAxis
          type="number"
          dataKey="weight"
          domain={[15, 125]}
          tick={AXIS_TICK}
          axisLine={AXIS_LINE}
          tickLine={AXIS_LINE}
          label={{ value: 'weight · kg', position: 'insideBottom', offset: -18, style: AXIS_TICK as React.CSSProperties }}
        />
        <YAxis
          type="number"
          dataKey="AUCss"
          domain={[0, 10]}
          tick={AXIS_TICK}
          axisLine={AXIS_LINE}
          tickLine={AXIS_LINE}
          label={{ value: 'AUCss · μg·h/mL', angle: -90, position: 'insideLeft', style: AXIS_TICK as React.CSSProperties }}
        />
        <Scatter name="adult" data={adult} fill="var(--cyan, #7DD3FC)" fillOpacity={0.55} />
        <Scatter name="peds" data={peds} fill="var(--coral, #FB923C)" fillOpacity={0.85} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

/* -------------------- exposure-response -------------------- */
/* LineChart with a flat regression line + 95% CI band (ComposedChart). */
function ExposureResponseFlat() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={EXPOSURE_RESPONSE_DATA}
        margin={{ top: 24, right: 24, left: 8, bottom: 32 }}
      >
        <CartesianGrid stroke="var(--cream-hairline, rgba(215,212,204,0.14))" strokeDasharray="2 6" />
        <XAxis
          dataKey="AUCss"
          type="number"
          domain={[2, 10]}
          tick={AXIS_TICK}
          axisLine={AXIS_LINE}
          tickLine={AXIS_LINE}
          label={{ value: 'AUCss · μg·h/mL', position: 'insideBottom', offset: -18, style: AXIS_TICK as React.CSSProperties }}
        />
        <YAxis
          tick={AXIS_TICK}
          axisLine={AXIS_LINE}
          tickLine={AXIS_LINE}
          label={{ value: 'Δ 6MWD · m', angle: -90, position: 'insideLeft', style: AXIS_TICK as React.CSSProperties }}
        />
        {/* 95% CI band via stacked Areas */}
        <Area
          type="monotone"
          dataKey="ciHigh"
          stroke="none"
          fill="var(--coral, #FB923C)"
          fillOpacity={0.14}
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="ciLow"
          stroke="none"
          fill="var(--bg, #1B1B1E)"
          fillOpacity={1}
          isAnimationActive={false}
        />
        {/* Regression line (near-flat) */}
        <Line
          type="linear"
          dataKey="delta6MWD"
          stroke="var(--coral, #FB923C)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        {/* Zero-effect reference */}
        <ReferenceLine y={0} stroke="var(--cream-hairline, rgba(215,212,204,0.14))" strokeDasharray="3 3" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
