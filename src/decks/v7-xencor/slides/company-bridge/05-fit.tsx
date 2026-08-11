// @ts-nocheck
import React from 'react';
import { BridgeBullets } from './BridgeSlide';
import { companyBridge } from './content';

export default function CompanyBridgeFit() {
  return (
    <BridgeBullets
      content={companyBridge.fit}
      footerTagline="Listen first — name open questions before proposing models or org design."
      iconOffset={4}
    />
  );
}
