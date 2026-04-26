// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

// Inline minimal Lottie animation (a pulsing circle) — keeps the showcase
// self-contained; in production you'd import a designed JSON or .lottie file.
const pulseAnimation = {
  v: '5.7.0', fr: 30, ip: 0, op: 90, w: 200, h: 200, nm: 'Pulse', ddd: 0, assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: 'Circle', sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [80] }, { t: 45, s: [40] }, { t: 90, s: [80] }] },
        r: { a: 0, k: 0 }, p: { a: 0, k: [100, 100] },
        a: { a: 0, k: [0, 0] },
        s: { a: 1, k: [{ t: 0, s: [60, 60] }, { t: 45, s: [120, 120] }, { t: 90, s: [60, 60] }] },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] }, nm: 'Ellipse Path' },
            { ty: 'fl', c: { a: 0, k: [1, 0.65, 0, 1] }, o: { a: 0, k: 100 }, nm: 'Fill' },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0, op: 90, st: 0, bm: 0,
    },
  ],
};

export default function LottieShowcase() {
  return (
    <LibraryShowcase
      category="§5A · Presentation decks · animation"
      library="lottie-react + dotlottie-react"
      npmInstall="npm install lottie-react @lottiefiles/dotlottie-react"
      url="lottiefiles.com"
      headline={<>Hand-animated <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>vector illustrations</span> — no broken lines.</>}
      subhead="Lottie ships designer-grade After Effects animations as JSON. Better than SVG path animation when motion is the message."
      tone="var(--amber)"
      noteBelow="In production: import a designed .json or .lottie file from LottieFiles · here a synthetic pulse demonstrates the playback runtime"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Inline JSON loop" tone="var(--amber)">
          <div style={{ width: 220, height: 220 }}>
            <Lottie animationData={pulseAnimation} loop autoplay />
          </div>
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', marginTop: 'var(--space-2)', textAlign: 'center', maxWidth: '32ch' }}>
            One JSON file · loops natively · no GIF banding
          </div>
        </Frame>
        <Frame title="Variant B · Why over GIF" tone="var(--cyan)">
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', lineHeight: 1.6 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><span style={{ color: 'var(--cyan)', fontWeight: 700 }}>10–100×</span> smaller than GIF</li>
              <li><span style={{ color: 'var(--cyan)', fontWeight: 700 }}>Vector</span> — sharp at every DPI</li>
              <li><span style={{ color: 'var(--cyan)', fontWeight: 700 }}>Programmatic</span> — pause / scrub / change colors at runtime</li>
              <li><span style={{ color: 'var(--cyan)', fontWeight: 700 }}>Designer-friendly</span> — bodymovin in After Effects exports JSON</li>
            </ul>
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
