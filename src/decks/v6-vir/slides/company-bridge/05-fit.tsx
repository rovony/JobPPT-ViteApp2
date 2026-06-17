// @ts-nocheck
import React from 'react';
import { BridgeBullets } from './BridgeSlide';
import { companyBridge } from './content';

export default function CompanyBridgeFit() {
  return (
    <BridgeBullets
      content={companyBridge.fit}
      footerTagline="Senior contribution: own the dose-defense function and grow the people around it."
      iconOffset={4}
    />
  );
}
