// @ts-nocheck
import React from 'react';
import { BridgeBullets } from './BridgeSlide';
import { companyBridge } from './content';

export default function CompanyBridgeOncologyApproach() {
  return (
    <BridgeBullets
      content={companyBridge.oncologyApproach}
      footerTagline="The approach is not more modeling; it is linking assay, exposure metric, dose, and OBD."
      iconOffset={1}
    />
  );
}
