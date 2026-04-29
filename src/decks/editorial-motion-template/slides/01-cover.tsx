import { SlideFrame } from "../components/SlideFrame";
import { FooterStrip } from "../components/FooterStrip";

/**
 * Slide 01 — Cover (A2 Title-Card variant).
 *
 * Patterns: A1 (frame) · A2 (title variant) · B1 (header stack) · B2 (italic accent)
 *           B6 (footer) · C1 (custom easing) · C2 (cascade) · C3 (delay table)
 *           C10 (reduced-motion fallback)
 */
export default function CoverSlide() {
  return (
    <SlideFrame
      variant="title"
      caseColor="cyan"
      ornament="01"
      ornamentSide="left"
      eyebrow="ZAJ-DESIGN · COMPLETE PATTERN SHOWCASE"
      headline={
        <>
          Sixteen slides. <em>Every</em> named pattern.
          <br />
          One runnable starter.
        </>
      }
      subhead="A demonstration of editorial-motion design — every named pattern in the catalog (A1–A5, B1–B8, C1–C10, D1–D5, E1–E3), every addendum (FLIP, Newspaper Reveal, Spring physics, CSS Scroll-Driven Animations, Data Dossier), and the complete tooling stack (Framer Motion, D3, Lucide, native browser APIs). Use arrow keys to navigate."
      footer={<FooterStrip case_="Cover" unit="01 of 16" />}
    />
  );
}
