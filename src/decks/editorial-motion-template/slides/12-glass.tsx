import { SlideFrame } from "../components/SlideFrame";
import { GlassCallout } from "../components/GlassCallout";
import { FooterStrip } from "../components/FooterStrip";
import { HandComposedChart } from "../components/HandComposedChart";

/**
 * Slide 12 — Glassmorphism callout floating over a busy chart.
 *
 * Patterns: A1 · B1 · B6 · B7 (glass) · B7+B8 (glass--live = glass + emerald glow)
 *           C1 · C10
 *
 * Two glass callouts overlaid on the D3 chart from slide 08. Sparingly used
 * (cap two per slide). Demonstrates that glass works over visually busy
 * content without obscuring it — the chart shows through, dimmed.
 */
export default function GlassSlide() {
  return (
    <SlideFrame
      caseColor="cyan"
      ornament="12"
      eyebrow="ANNOTATION · OVERLAY MATERIAL"
      headline={
        <>
          <em>Glass</em> annotates without obscuring.
        </>
      }
      subhead="Translucent fill, 20px backdrop blur, hairline border. The 'live' variant adds a 2px accent border-top + emerald glow (B7 + B8 combo). Cap usage at 1–2 panels per surface."
      viz={
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            maxWidth: 880,
          }}
        >
          <HandComposedChart
            delay={0.4}
            width={880}
            height={340}
            margin={{ top: 16, right: 24, bottom: 36, left: 48 }}
          />
          <GlassCallout
            variant="live"
            delay={1.6}
            style={{
              position: "absolute",
              top: "12%",
              right: "5%",
              maxWidth: 240,
            }}
          >
            <strong>Inflection</strong>
            <p>Median Cmax at t≈1.4h. Within 5–95% PI for n=412.</p>
          </GlassCallout>
          <GlassCallout
            variant="default"
            delay={2.0}
            style={{
              position: "absolute",
              bottom: "16%",
              left: "8%",
              maxWidth: 220,
            }}
          >
            <strong>Tail</strong>
            <p>Terminal half-life: 6.4h. Linear elimination throughout the observed range.</p>
          </GlassCallout>
        </div>
      }
      source="Same dataset as slide 08 · 1-compartment first-order absorption"
      footer={<FooterStrip case_="Materials" unit="12 of 16" />}
    />
  );
}
