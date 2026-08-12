// @ts-nocheck
import React from 'react';
import { BridgeBullets } from './BridgeSlide';
import { companyBridge } from './content';

export default function CompanyBridgeCaseMapping() {
  return (
    <BridgeBullets
      content={companyBridge.caseMapping}
      footerTagline="Same discipline across constraints — not a claim that the biology is identical."
      iconOffset={2}
    />
  );
}
