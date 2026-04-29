import { SlideFrame } from "../components/SlideFrame";
import { HandComposedChart } from "../components/HandComposedChart";
import { FooterStrip } from "../components/FooterStrip";

/**
 * Slide 08 — Hand-Composed D3 Chart.
 *
 * Patterns: A1 · B1 · B5 (source) · B6 · C1 · C2 · C3 (delay table for axes/band/line/points)
 *           C6 (path-drawing reveal on the axes + median line) · C10
 *           D1 (hand-composed with D3)
 *
 * A pcVPC-style chart: 5–95% prediction band fades in, median line draws
 * itself (C6), observed dots cascade in (C2). Every element is JSX/SVG, not
 * a chart-library black box. Demonstrates D3 as math foundation, not as renderer.
 */
export default function D3ChartSlide() {
  return (
    <SlideFrame
      caseColor="amber"
      ornament="08"
      eyebrow="CHART · pcVPC · POPULATION FIT"
      headline={
        <>
          The model fits the cohort within the <em>5–95% prediction band</em>.
        </>
      }
      subhead="Hand-composed with D3 scales + React/SVG. Every axis tick, gridline, fill, and observed point is its own JSX element — independently animatable, independently styleable. Not a chart library."
      viz={<HandComposedChart delay={0.5} />}
      source="Synthetic data · 1-compartment first-order absorption · ka=1.5, ke=0.18, V=50"
      footer={<FooterStrip case_="Charts" unit="08 of 16" />}
    />
  );
}
