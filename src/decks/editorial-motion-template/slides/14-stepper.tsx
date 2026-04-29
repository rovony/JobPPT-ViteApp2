import { SlideFrame } from "../components/SlideFrame";
import { CinematicStepper } from "../components/CinematicStepper";
import { FooterStrip } from "../components/FooterStrip";

/**
 * Slide 14 — Cinematic Stepper (E1 set-piece).
 *
 * Patterns: A1 · B1 · B6 · C1 · C7 (integer ticker on the time display) · C10
 *           E1 (timed-scene state machine — every visual computes from `time`)
 *           Addenda § B3 (cinematic stepper / speaker-cadence sync framing)
 *
 * Press Play to advance through 24-second timeline. State machine drives all
 * visual elements (active step indicator, caption, progress bar) from a single
 * `elapsed` variable. Press Pause to freeze; Reset returns to t=0.
 */
export default function StepperSlide() {
  return (
    <SlideFrame
      caseColor="amber"
      ornament="14"
      eyebrow="SET-PIECE · TIMED SCENE · NARRATION-ALIGNED"
      headline={
        <>
          A <em>cinematic stepper</em>: four beats, twenty-four seconds, one scripted story.
        </>
      }
      subhead="Press Play. The state machine inside computes every visual from a single time variable: which step is active, which caption shows, where the progress bar sits. The beats are scripted to align with a presenter's narration cadence."
      viz={
        <CinematicStepper
          duration={24}
          steps={[
            {
              label: "T+0",
              at: 0,
              caption:
                "Step 1 — Discovery. We mapped the existing pathway and counted handoffs. Twelve checkpoints, four agencies, three forms each. Median time: 47 days.",
            },
            {
              label: "T+6",
              at: 6,
              caption:
                "Step 2 — Diagnosis. Three handoffs accounted for 80% of the delay: state review, CDSCO review, and the post-CDSCO ethics gate. Each was a queue, not a decision.",
            },
            {
              label: "T+13",
              at: 13,
              caption:
                "Step 3 — Reform. Rule 101 (gazetted 2017) collapsed the three queues into a single intake with a 30-day CDSCO clock and parallel ethics review. The state-level review was retired.",
            },
            {
              label: "T+19",
              at: 19,
              caption:
                "Step 4 — Outcome. End-to-end time fell from 47 days to 7. Same four teams, half the meetings, twice the throughput. The pathway is now a precedent for ASEAN regulators.",
            },
          ]}
        />
      }
      source="Internal pilot, Q3 2024 · synthetic timing data"
      footer={<FooterStrip case_="Set-pieces" unit="14 of 16" />}
    />
  );
}
