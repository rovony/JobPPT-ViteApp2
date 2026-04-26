import React, { useEffect, useRef, useState } from 'react';
import { makeChannel, subscribe } from '@/lib/presenter-sync';
import LaserOverlay from './LaserOverlay';

/**
 * LaserListener — audience-side receiver. Subscribes to laser/ink
 * broadcast messages and renders the same overlay the presenter sees,
 * so pointer + ink are pixel-mirrored across both windows.
 *
 * Only mounted on the audience tab (?audience=1); presenter's own tab
 * renders its overlay via LaserController directly.
 */
export default function LaserListener({ deckId }) {
  const [pointer, setPointer] = useState(null);
  const [strokes, setStrokes] = useState([]);
  const [activeStroke, setActiveStroke] = useState(null);
  const [color, setColor] = useState('var(--coral)');
  const activeIdRef = useRef(null);

  useEffect(() => {
    const channel = makeChannel();
    const unsub = subscribe(channel, deckId, (msg) => {
      switch (msg?.type) {
        case 'pointer':
          if (msg.color) setColor(msg.color);
          setPointer(msg.visible ? { x: msg.x, y: msg.y, visible: true } : null);
          break;
        case 'laser-stroke-start':
          activeIdRef.current = msg.stroke.id;
          setActiveStroke({ ...msg.stroke, points: [...msg.stroke.points] });
          break;
        case 'laser-stroke-point':
          setActiveStroke((prev) => {
            if (!prev || prev.id !== msg.id) return prev;
            return { ...prev, points: [...prev.points, msg.point] };
          });
          break;
        case 'laser-stroke-end':
          setActiveStroke((prev) => {
            if (prev && prev.id === msg.id) {
              setStrokes((s) => [...s, prev]);
              return null;
            }
            return prev;
          });
          break;
        case 'laser-clear':
          setStrokes([]);
          setActiveStroke(null);
          break;
        default:
          break;
      }
    });
    return () => { unsub(); channel?.close?.(); };
  }, [deckId]);

  // Auto-expire strokes locally too
  useEffect(() => {
    if (strokes.length === 0) return;
    const id = setInterval(() => {
      const cutoff = Date.now() - 6000;
      setStrokes((arr) => arr.filter((s) => s.startedAt > cutoff));
    }, 500);
    return () => clearInterval(id);
  }, [strokes.length]);

  return <LaserOverlay pointer={pointer} strokes={strokes} activeStroke={activeStroke} color={color} />;
}