import React from 'react';
// Vite default SVG import returns a URL to the bundled asset. Rendered as
// an <img> so the file ships as a separate network resource (browser-cacheable,
// no inline payload). The Lynch / Jaffe anatomical colors (pinks/greys) are
// intentional and do NOT theme — they carry the editorial/anatomical quality
// we want. Attribution lives in the lungs.svg header.
import lungsSvgUrl from './lungs.svg';

/**
 * LungsDiagram — editorial anatomical lungs illustration
 * (Patrick J. Lynch / C. Carl Jaffe, CC BY 3.0).
 *
 * Source of truth is the sibling lungs.svg. Swap that file to change the
 * artwork; this component auto-reflects on next build.
 */
export default function LungsDiagram({
  alt = 'Anatomical illustration of lungs (Patrick J. Lynch / C. Carl Jaffe, CC BY 3.0)',
}) {
  return (
    <img
      src={lungsSvgUrl}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
}
