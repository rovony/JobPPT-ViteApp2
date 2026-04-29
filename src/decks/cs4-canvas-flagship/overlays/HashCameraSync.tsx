// @ts-nocheck
/**
 * HashCameraSync — bidirectional sync between URL hash and cameraIndex.
 *
 * Hash format: `#cam-N` where N is 1..10.
 * Hash format for finale stages: `#cam-10-sN` where sN is 1..4.
 *
 * On mount: reads the hash and jumps to that camera if valid.
 * On cameraIndex change: writes the hash so deep-links work.
 *
 * Renders nothing.
 */

import { useEffect, useRef } from 'react';
import { useCanvasCamera } from '../canvas/CameraController';

const HASH_RE = /^#cam-(\d{1,2})(?:-s(\d))?$/;

function parseHash(hash: string): { camera: number; stage: number } | null {
  const m = hash.match(HASH_RE);
  if (!m) return null;
  const camera = parseInt(m[1], 10);
  const stage = m[2] ? parseInt(m[2], 10) : 1;
  if (camera < 1 || camera > 10) return null;
  if (stage < 1 || stage > 4) return null;
  return { camera, stage };
}

function formatHash(camera: number, stage: number): string {
  if (camera === 10 && stage > 1) return `#cam-10-s${stage}`;
  return `#cam-${camera}`;
}

export default function HashCameraSync() {
  const {
    cameraIndex,
    finaleStage,
    setCameraIndex,
    setFinaleStage,
  } = useCanvasCamera();
  const programmaticUpdateRef = useRef(false);

  // ── On mount + on hashchange: parse hash and apply to state ──────
  useEffect(() => {
    function applyFromHash() {
      const parsed = parseHash(window.location.hash);
      if (!parsed) return;
      programmaticUpdateRef.current = true;
      setCameraIndex(parsed.camera);
      if (parsed.camera === 10) setFinaleStage(parsed.stage);
      // Reset flag on next tick — by then the cameraIndex effect
      // below has run and skipped its hash-write.
      setTimeout(() => { programmaticUpdateRef.current = false; }, 0);
    }
    applyFromHash();
    window.addEventListener('hashchange', applyFromHash);
    return () => window.removeEventListener('hashchange', applyFromHash);
  }, [setCameraIndex, setFinaleStage]);

  // ── On state change: write hash ──────────────────────────────────
  useEffect(() => {
    if (programmaticUpdateRef.current) return;
    const desired = formatHash(cameraIndex, finaleStage);
    if (window.location.hash !== desired) {
      // Use replaceState so the back button doesn't accumulate history
      // for every camera move.
      const url = new URL(window.location.href);
      url.hash = desired;
      window.history.replaceState(null, '', url.toString());
    }
  }, [cameraIndex, finaleStage]);

  return null;
}
