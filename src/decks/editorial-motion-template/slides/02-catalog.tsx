import { SlideFrame } from "../components/SlideFrame";
import { CatalogVisualization } from "../components/CatalogVisualization";
import { FooterStrip } from "../components/FooterStrip";

/**
 * Slide 02 — The Library / Pattern Catalog.
 * Lists every pattern this deck demonstrates, by family, on one page.
 * Patterns demonstrated: A1 · B1 · B2 (italic accent) · B3 (hairlines) · C2 (cascade) · C3 (delay) · B5 · B6.
 */
export default function CatalogSlide() {
  return (
    <SlideFrame
      caseColor="cyan"
      ornament="02"
      eyebrow="THE LIBRARY · 5 FAMILIES, 31 PATTERNS"
      headline={
        <>
          Every pattern this deck demonstrates, on <em>one</em> page.
        </>
      }
      subhead="A · scaffolds. B · editorial register. C · motion. D · data + diagrams. E · cinematic set-pieces. The slides that follow walk through them in order, with the addenda woven in."
      viz={<CatalogVisualization delay={0.6} />}
      source="zaj-design Pattern Catalog v1 · 02_Pattern-Catalog.md + 10_Addenda-and-Enhancements.md"
      footer={<FooterStrip case_="Catalog" unit="02 of 16" />}
    />
  );
}
