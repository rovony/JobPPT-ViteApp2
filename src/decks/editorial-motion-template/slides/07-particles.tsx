import { SlideFrame } from "../components/SlideFrame";
import { ContinuousLoopParticles } from "../components/ContinuousLoopParticles";
import { FooterStrip } from "../components/FooterStrip";

/**
 * Slide 07 — Continuous-Loop Particles flowing through a pathway.
 *
 * Patterns: A1 · B1 · B6 · C1 · C8 (continuous particles) · C9 (pulsing terminal)
 *           C10 (particles freeze in static positions on reduced-motion)
 *
 * Particles flow from the left node (substrate) along an SVG path through
 * an "enzyme" mid-point, ending at the right node (product). The terminus
 * pulses with an emerald halo. On reduced-motion, particles render statically
 * along the path (six fixed dots) so the diagram still reads as "this flows."
 */
export default function ParticlesSlide() {
  return (
    <SlideFrame
      caseColor="cyan"
      ornament="07"
      eyebrow="MECHANISM · IDH1 PATHWAY · MUTANT ALLELE"
      headline={
        <>
          Substrate flows in. Inhibitor binds. Product accumulates <em>downstream</em>.
        </>
      }
      subhead="A C8 continuous-particle loop. Six particles, durations 4–7s, randomized stagger. The terminus pulses (C9) to mark where the story lands."
      viz={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-5)",
            width: "100%",
          }}
        >
          <ContinuousLoopParticles
            pathD="M 60 100 Q 200 30 320 100 T 560 100"
            viewBox="0 0 620 200"
            width={620}
            height={200}
            particleCount={6}
            durationRange={[4, 7]}
            origin={{ x: 60, y: 100, label: "α-KG" }}
            terminus={{ x: 560, y: 100, label: "2-HG" }}
          />
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--ink-muted)",
              textAlign: "center",
            }}
          >
            CSS offset-path animation · GPU-accelerated · 60fps even on weak devices
          </div>
        </div>
      }
      source="Mechanism after Dang et al., Nature 2009 · illustrative simplification"
      footer={<FooterStrip case_="Schematics" unit="07 of 16" />}
    />
  );
}
