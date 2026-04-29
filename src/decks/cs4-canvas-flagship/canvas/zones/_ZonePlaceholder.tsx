// @ts-nocheck
/**
 * _ZonePlaceholder — internal helper used by skeleton zones B..I.
 *
 * Renders a centered placard inside a faint sage outline so we can
 * SEE that the camera framed the right zone during Group 1 development.
 * Will be replaced one-by-one with real zone implementations in
 * Group 2+. Underscore-prefixed so it's clearly an internal helper.
 */

import React from 'react';
import { ZONE_BOUNDS } from '../../data';

interface Props {
  zoneId: keyof typeof ZONE_BOUNDS;
  cameraIndex: number;
  title: string;
  subtitle?: string;
}

export default function ZonePlaceholder({
  zoneId,
  cameraIndex,
  title,
  subtitle,
}: Props) {
  const Z = ZONE_BOUNDS[zoneId];
  return (
    <div
      data-zone={zoneId}
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
        contentVisibility: 'auto',
        contain: 'paint layout',
        // Faint sage outline so it's obvious in dev when the camera
        // is framing the right zone. Hidden in print/export.
        border: '1px dashed color-mix(in srgb, var(--case, #7BAE7F) 30%, transparent)',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 64,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 14,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--case, #7BAE7F)',
          marginBottom: 24,
        }}
      >
        Camera {cameraIndex} · Zone {zoneId}
      </div>
      <div
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 600,
          fontSize: 64,
          lineHeight: 1.1,
          color: 'var(--cream, #F5F0E8)',
          maxWidth: '20ch',
          marginBottom: subtitle ? 24 : 0,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: 22,
            color: 'color-mix(in srgb, var(--cream, #F5F0E8) 65%, transparent)',
            maxWidth: '52ch',
            lineHeight: 1.45,
          }}
        >
          {subtitle}
        </div>
      )}
      <div
        style={{
          marginTop: 48,
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 12,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 35%, transparent)',
        }}
      >
        skeleton · Group 2 fills this in
      </div>
    </div>
  );
}
