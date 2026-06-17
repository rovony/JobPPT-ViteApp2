// @ts-nocheck
import React from 'react';
import { BridgeBullets } from './BridgeSlide';
import { companyBridge } from './content';

export default function CompanyBridgeCaseMapping() {
  return (
    <BridgeBullets
      content={companyBridge.caseMapping}
      footerTagline="The four cases are not a CV recap; they are the operating model for this pipeline."
      iconOffset={2}
    />
  );
}
