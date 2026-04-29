// @ts-nocheck
/**
 * Zone E — Camera 6 · Novelty · Adjacent systems
 *
 * Will host the comparison matrix (5 rows × 5 columns):
 *   System · Org · Scope · Agents · Shared state · Audit
 *   Apollo-AI · QSP-Copilot · PEARL · pyDarwin · PharmAgent
 *
 * PharmAgent row uses sage weight contrast — calibrated, not biased.
 * D zone (architecture) ghosts to 20% at the left edge as a visual
 * cross-reference handled by camera framing, not by E's content.
 */

import React from 'react';
import ZonePlaceholder from './_ZonePlaceholder';

export default function ZoneENovelty() {
  return (
    <ZonePlaceholder
      zoneId="E"
      cameraIndex={6}
      title="Novelty · Adjacent systems"
      subtitle="Apollo-AI · QSP-Copilot · PEARL · pyDarwin · PharmAgent"
    />
  );
}
