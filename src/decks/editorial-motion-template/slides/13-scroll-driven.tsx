import { SlideFrame } from "../components/SlideFrame";
import { ScrollDrivenSection } from "../components/ScrollDrivenSection";
import { FooterStrip } from "../components/FooterStrip";

/**
 * Slide 13 — CSS Scroll-Driven Animations (native, no JS).
 *
 * Patterns: A1 · B1 · B6 · C1 · C10
 *           Addenda § A5 (CSS Scroll-Driven Animations — animation-timeline: view())
 *
 * Each block in the inner scroll-viewport fades + translates in as it enters
 * via native browser API. Zero JavaScript animation library. Falls back to
 * static layout in browsers without animation-timeline support (Firefox,
 * Safari < 18). Honors prefers-reduced-motion via the @supports + @media block.
 */
export default function ScrollDrivenSlide() {
  return (
    <SlideFrame
      caseColor="emerald"
      ornament="13"
      eyebrow="NATIVE BROWSER · NO LIBRARY"
      headline={
        <>
          The browser does the math. <em>You write CSS.</em>
        </>
      }
      subhead="A 2024-era browser feature: animation-timeline: view(). Scroll position drives the animation directly, on the compositor thread, at 60fps even on weak devices. No scrollama, no Framer Motion, no JS event handlers."
      viz={
        <ScrollDrivenSection
          blocks={[
            {
              eyebrow: "BLOCK 01",
              body: "First block. As you scroll, watch how this fades and translates without any JavaScript animation handler firing.",
            },
            {
              eyebrow: "BLOCK 02",
              body: "Second block. Each block has its own animation-timeline: view() — its progress is bound to its own viewport position.",
            },
            {
              eyebrow: "BLOCK 03",
              body: "Third block. Same effect. The browser interpolates opacity and transform on the compositor — far cheaper than JS-driven animation.",
            },
            {
              eyebrow: "BLOCK 04",
              body: "Fourth block. In Firefox or Safari < 18, the @supports fallback shows static text. In Chromium 115+, the effect kicks in.",
            },
            {
              eyebrow: "BLOCK 05",
              body: "Fifth and last block. When the user enables prefers-reduced-motion, all of this collapses to a static layout — the contract from C10.",
            },
          ]}
        />
      }
      source="Bramus Van Damme · scroll-driven-animations.style · Chromium 115+"
      footer={<FooterStrip case_="Native APIs" unit="13 of 16" />}
    />
  );
}
