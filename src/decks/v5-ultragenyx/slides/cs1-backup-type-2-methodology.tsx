// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

/**
 * CS1 BACKUP · TYPE 2 · METHODOLOGY
 *
 * V6 framework type 1 (most-probed lane for a Clinical Pharmacology
 * panel). Defends "how did you calculate that?" / "show me the model."
 * Mix of trial-design rationale (dosing, endpoint), extrapolation
 * defense (allometry, Bayesian borrowing), and PopPK-craft slides
 * (parameters, diagnostics, covariate, exposure-match).
 */
export default function Cs1BackupTypeMethodology() {
  return (
    <BackupTypeDivider
      caseToken="coral"
      typeNumber="2"
      typeName="Methodology"
      description="The model-informed scaffolding that turned no-trial-feasible into label-defendable: dosing scheme, allometric extrapolation, endpoint defense, Bayesian borrowing, and the PopPK fit + covariate work that anchored exposure-matching."
      probeQuote="Walk me through the PopPK model — parameters, diagnostics, and how you justified the 3% AUC match."
      slides={[
        { code: 'B3', title: 'Dosing scheme · 3 × 2 weight × dose matrix' },
        { code: 'B5', title: 'Allometric scaling defense' },
        { code: 'B6', title: '6MWD endpoint validity' },
        { code: 'B14', title: 'Bayesian borrowing framework' },
        { code: 'B15', title: 'PopPK parameter table + 95% CIs' },
        { code: 'B16', title: 'Model diagnostics · pcVPC + GOF' },
        { code: 'B17', title: 'Covariate analysis · weight + age stability' },
        { code: 'B18', title: 'Exposure matching · pediatric vs adult AUCss' },
      ]}
    />
  );
}
