// @ts-nocheck
/**
 * Zone F — Camera 7 · Privacy by architecture · CINEMATIC 2
 *
 * Will host (left column → boundary → right column):
 *   • LEFT  : Patient data table (247 subjects, SUBJID/TIME/DV/AMT)
 *   • CENTER: Vertical dashed sage SchemaExtractor boundary
 *   • RIGHT : 6 metadata fields (n_subjects, n_observations, blq_rate,
 *             dose_levels, units, schema_hash)
 *
 * GSAP timeline drives the particle: launch → decelerate → DISSOLVE
 * AT the boundary. Editorial restraint — no celebration glow.
 */

import React from 'react';
import ZonePlaceholder from './_ZonePlaceholder';

export default function ZoneFPrivacy() {
  return (
    <ZonePlaceholder
      zoneId="F"
      cameraIndex={7}
      title="Privacy by architecture, not by policy"
      subtitle="patient data · LOCAL ONLY  →  metadata only · CROSSES BOUNDARY"
    />
  );
}
