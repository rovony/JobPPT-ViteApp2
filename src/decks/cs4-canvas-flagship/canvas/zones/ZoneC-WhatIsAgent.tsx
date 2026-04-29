// @ts-nocheck
/**
 * Zone C — Camera 4 · What an agent is — and isn't
 *
 * Will host two side-by-side panels:
 *   • LEFT  ("IS")    — LLM badge + tool-call diagram → carries layoutId="cs4-llm-badge"
 *   • RIGHT ("ISN'T") — strikethrough on "LLM does the math itself"
 *
 * The LEFT-panel LLM badge is the morph anchor for C5 (it physically
 * becomes the L0 Supervisor node).
 */

import React from 'react';
import ZonePlaceholder from './_ZonePlaceholder';

export default function ZoneCWhatIsAgent() {
  return (
    <ZonePlaceholder
      zoneId="C"
      cameraIndex={4}
      title="What an agent is — and isn't"
      subtitle="LLM that calls validated tools · NOT an LLM that does the math itself"
    />
  );
}
