// @ts-nocheck
import React from 'react';
import { BridgeBullets } from './BridgeSlide';
import { companyBridge } from './content';

export default function CompanyBridgeOncologyProblem() {
  return (
    <BridgeBullets
      content={companyBridge.oncologyProblem}
      footerTagline="Start with the measurement problem before naming any model."
      iconOffset={0}
    />
  );
}
