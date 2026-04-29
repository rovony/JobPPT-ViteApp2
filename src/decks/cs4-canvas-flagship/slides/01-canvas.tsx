// @ts-nocheck
/**
 * 01-canvas — the lone manifest entry for the CS4 continuous-canvas deck.
 *
 * Thin wrapper. Imports CS4ContinuousCanvas and renders it. Lives
 * here because manifest.ts conventionally imports slide components
 * from `./slides/NN-name`.
 */

import React from 'react';
import CS4ContinuousCanvas from '../canvas/CS4ContinuousCanvas';

export default function CS4CanvasSlide() {
  return <CS4ContinuousCanvas />;
}
