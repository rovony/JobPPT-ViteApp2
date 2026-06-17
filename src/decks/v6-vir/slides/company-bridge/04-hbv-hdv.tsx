// @ts-nocheck
import React from 'react';
import { BridgeBullets } from './BridgeSlide';
import { companyBridge } from './content';

export default function CompanyBridgeHbvHdv() {
  return (
    <BridgeBullets
      content={companyBridge.hbv}
      footerTagline="This is breadth with humility: real HBV/antiviral touchpoints, no HDV overclaim."
      iconOffset={3}
    />
  );
}
