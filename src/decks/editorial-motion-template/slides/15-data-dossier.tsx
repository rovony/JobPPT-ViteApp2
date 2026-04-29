import { SlideFrame } from "../components/SlideFrame";
import { DataDossier } from "../components/DataDossier";
import { FooterStrip } from "../components/FooterStrip";

/**
 * Slide 15 — Embedded Micro-App / Data Dossier.
 *
 * Patterns: A1 · B1 · B6 · C1 · C7 (integer ticker for elapsed time) · C10
 *           E2 (embedded micro-app / Data Dossier framing — "visually prove rather than describe")
 *
 * Three-pane mini-app embedded as a slide: chat stream (left), tool-call
 * log (center), state inspector with audit chain (right). All driven by a
 * single 12-second timeline. Demonstrates the technique that powers
 * cs3-interactive-dossier in the source deck — the "interactive figure"
 * pattern that converts skepticism into belief.
 *
 * Uses Lucide-react icons throughout (CheckCircle2, Activity, Database, Hash, Cpu, MessageSquare).
 */
export default function DataDossierSlide() {
  return (
    <SlideFrame
      caseColor="emerald"
      ornament="15"
      eyebrow="SET-PIECE · DATA DOSSIER · WITNESSED WORKFLOW"
      headline={
        <>
          Don't <em>describe</em> the agent. <em>Show</em> it work.
        </>
      }
      subhead="Three panes wired to a single 12-second timeline: chat stream, tool-call log, state inspector with deterministic audit chain. The audience watches the system in front of them; that's worth more than any architecture diagram."
      viz={<DataDossier />}
      source="E2 · Embedded Micro-App · references/codex/02_Pattern-Catalog.md + 10_Addenda-and-Enhancements.md § B1 (Data Dossier framing)"
      footer={<FooterStrip case_="Set-pieces" unit="15 of 16" />}
    />
  );
}
