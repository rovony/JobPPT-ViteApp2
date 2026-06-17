// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcModel() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · model architecture"
      headline={<>The base model had to separate <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>platform biology</span> from study noise.</>}
      subhead="For an ADC, a good population PK model is not just a clearance estimate. It is the operating scaffold for assay interpretation, patient variability, and dose-regimen simulation."
      cards={[
        { label: 'Structure', title: 'Use the simplest model that preserves biology.', body: 'A parsimonious model is acceptable only if it still carries the analyte relationships needed for decisions.', icon: ADC_ICONS.network },
        { label: 'Covariates', title: 'Ask which covariates are decision-bearing.', body: 'Body size, albumin, tumor burden, target markers, and organ function should be tested with clinical intent.', icon: ADC_ICONS.users },
        { label: 'Diagnostics', title: 'Read diagnostics by analyte.', body: 'Aggregate fit can hide analyte-specific misspecification that matters for safety or efficacy.', icon: ADC_ICONS.radar },
        { label: 'Simulation', title: 'Run dose scenarios through the decision metric.', body: 'The target is a recommendation, not a beautiful parameter table.', icon: ADC_ICONS.target },
      ]}
      flow={['Build the analyte scaffold.', 'Test covariates with decision value.', 'Diagnose by species.', 'Simulate regimens against the target.']}
      footerKicker="ADC · PopPK"
      footerTagline="Model architecture is the bridge between assays and dosing."
    />
  );
}
