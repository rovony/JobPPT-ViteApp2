import { SlideFrame } from "../components/SlideFrame";
import { BeforeAfterFlow } from "../components/BeforeAfterFlow";
import { FooterStrip } from "../components/FooterStrip";

/**
 * Slide 06 — Choreographed Before/After Flowchart.
 *
 * Patterns: A1 · B1 · B6 · C1 · C2 (cascade per row) · C3 (delay table)
 *           C6 (path-drawing reveal on every arrow) · C9 (pulsing terminal node)
 *           C10 · D3 (proper before/after variant)
 *
 * Two stacked rows. BEFORE reveals 0–3s; "REFORM" pivot label fades at 3.3s;
 * AFTER reveals 3.5–5.5s; emerald terminal pulse from 5.5s.
 */
export default function BeforeAfterSlide() {
  return (
    <SlideFrame
      caseColor="emerald"
      ornament="06"
      eyebrow="REGULATORY REFORM · INDIA · 2017 RULE 101"
      headline={
        <>
          Twelve checkpoints became <em>three</em>.
        </>
      }
      subhead="Watch the BEFORE pathway draw itself, then the pivot, then the AFTER. Bottlenecks pulse red on the way in. The outcome node pulses emerald when the reform lands."
      viz={
        <BeforeAfterFlow
          delay={0.6}
          beforeDuration={3}
          pauseDuration={0.7}
          beforeSteps={[
            { label: "INTAKE", detail: "12 forms" },
            { label: "STATE", detail: "review" },
            { label: "CDSCO", detail: "review", bottleneck: true },
            { label: "EC", detail: "ethics" },
            { label: "TRIAL", detail: "delayed", bottleneck: true },
          ]}
          afterSteps={[
            { label: "INTAKE", detail: "1 form" },
            { label: "CDSCO", detail: "30 days" },
            { label: "TRIAL", detail: "approved", terminal: true },
          ]}
        />
      }
      source="Government of India · CDSCO Rule 101, gazetted 2017"
      footer={<FooterStrip case_="Schematics" unit="06 of 16" />}
    />
  );
}
