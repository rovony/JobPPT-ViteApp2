// @ts-nocheck
/**
 * Zone H — Camera 9 · Workflow in action · CINEMATIC 4
 *
 * Co-located with Zone D (architecture). Renders ON TOP at C9 with:
 *   • Particle trace through agents (Analyst → L0 → Data → NCA → PopPK)
 *   • Bucket-light cascade (Dataset → NCA → Modeling)
 *   • Amber backward pulse to Analyst (review-gate fires)
 *   • Diagnostic panel slides in
 *   • Sage approval checkmark
 *   • Forward completion pulse (QC + Audit)
 *   • Footer: "4–8 weeks → hours, with traceability stronger than the
 *     prior pipeline"
 *
 * Hidden when not at C9 (handled inside this component, not by
 * unmounting — keeping the DOM consistent for layoutIds).
 */

import React from 'react';
import { useCanvasCamera } from '../CameraController';
import ZonePlaceholder from './_ZonePlaceholder';

export default function ZoneHWorkflowOverlay() {
  const { cameraIndex } = useCanvasCamera();

  // The overlay only paints when the workflow trace is the focus.
  // Underlying Zone D continues to render its architecture content.
  if (cameraIndex !== 9) return null;

  return (
    <ZonePlaceholder
      zoneId="H"
      cameraIndex={9}
      title="Workflow in action"
      subtitle="Analyst → L0 → Data → NCA → PopPK · review-gate fires · approve · QC · Audit"
    />
  );
}
