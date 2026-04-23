import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MousePointer2, Pencil, Eraser, X } from 'lucide-react';
import { makeChannel, broadcast, subscribe } from '@/lib/presenter-sync';
import LaserOverlay from './LaserOverlay';

/**
 * LaserController — presenter-side laser pointer + drawing tool.
 *
 * - Mounts on top of the presenter's own slide stage (stageRef).
 * - Captures pointer movement and broadcasts NORMALIZED coords (0..1)
 *   to the audience tab via BroadcastChannel. The audience window
 *   subscribes separately (see LaserListener) and renders the same
 *   overlay, so both tabs stay pixel-perfect in sync.
 *
 * Modes:
 *   'off'     — no capture, overlay idle
 *   'laser'   — glowing dot follows cursor
 *   'draw'    — ink strokes (mouse down → up)
 *
 * Keyboard: L toggles laser, D toggles draw, C clears strokes, Esc = off.
 */

const COLORS = [
  { key: 'coral',  value: 'var(--coral)' },
  { key: 'amber',  value: 'var(--amber)' },
  { key: 'cyan',   value: 'var(--cyan)' },
  { key: 'violet', value: 'var(--violet)' },
];

export default function LaserController({ stageRef, deckId }) {
  const [mode, setMode] = useState('off');
  const [color, setColor] = useState(COLORS[0].value);
  const [pointer, setPointer] = useState(null);
  const [strokes, setStrokes] = useState([]);
  const [activeStroke, setActiveStroke] = useState(null);

  const channelRef = useRef(null);
  const lastSendRef = useRef(0);
  const drawingRef = useRef(false);

  // Open broadcast channel
  useEffect(() => {
    channelRef.current = makeChannel();
    return () => channelRef.current?.close?.();
  }, []);

  // Send helper — light rate-limit (~60fps max) so we don't flood the channel.
  const send = useCallback((payload) => {
    const now = performance.now();
    if (payload.type === 'pointer' && now - lastSendRef.current < 16) return;
    lastSendRef.current = now;
    broadcast(channelRef.current, deckId, payload);
  }, [deckId]);

  // Normalize a mouse event to (0..1) coords within the stage.
  const normalize = useCallback((e) => {
    const stage = stageRef?.current;
    if (!stage) return null;
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return null;
    return { x, y };
  }, [stageRef]);

  // Clear strokes (locally + broadcast)
  const clearStrokes = useCallback(() => {
    setStrokes([]);
    setActiveStroke(null);
    send({ type: 'laser-clear' });
  }, [send]);

  // Attach stage-level pointer listeners when mode is active
  useEffect(() => {
    const stage = stageRef?.current;
    if (!stage || mode === 'off') {
      setPointer(null);
      return;
    }

    const onMove = (e) => {
      const p = normalize(e);
      if (!p) {
        setPointer((prev) => (prev ? { ...prev, visible: false } : null));
        send({ type: 'pointer', visible: false });
        return;
      }
      setPointer({ x: p.x, y: p.y, visible: true });
      send({ type: 'pointer', x: p.x, y: p.y, visible: true, color });

      if (mode === 'draw' && drawingRef.current) {
        setActiveStroke((prev) => {
          if (!prev) return prev;
          const next = { ...prev, points: [...prev.points, p] };
          send({ type: 'laser-stroke-point', id: prev.id, point: p });
          return next;
        });
      }
    };

    const onDown = (e) => {
      if (mode !== 'draw') return;
      const p = normalize(e);
      if (!p) return;
      const id = `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      drawingRef.current = true;
      const stroke = { id, color, points: [p], startedAt: Date.now() };
      setActiveStroke(stroke);
      send({ type: 'laser-stroke-start', stroke });
    };

    const onUp = () => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      setActiveStroke((prev) => {
        if (prev) {
          setStrokes((s) => [...s, prev]);
          send({ type: 'laser-stroke-end', id: prev.id });
        }
        return null;
      });
    };

    const onLeave = () => {
      setPointer((prev) => (prev ? { ...prev, visible: false } : null));
      send({ type: 'pointer', visible: false });
    };

    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    stage.addEventListener('mouseleave', onLeave);

    // Draw mode → crosshair cursor; laser mode → keep default so the user still knows where the OS cursor is
    const prevCursor = stage.style.cursor;
    if (mode === 'draw') stage.style.cursor = 'crosshair';

    return () => {
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      stage.removeEventListener('mouseleave', onLeave);
      stage.style.cursor = prevCursor;
    };
  }, [mode, stageRef, normalize, send, color]);

  // Auto-expire strokes in local state too (so presenter sees them fade)
  useEffect(() => {
    if (strokes.length === 0) return;
    const id = setInterval(() => {
      const cutoff = Date.now() - 6000;
      setStrokes((arr) => arr.filter((s) => s.startedAt > cutoff));
    }, 500);
    return () => clearInterval(id);
  }, [strokes.length]);

  // Hide pointer after idle (presenter moved cursor off-stage or stopped broadcasting)
  useEffect(() => {
    if (!pointer?.visible) return;
    const t = setTimeout(() => {
      setPointer((p) => (p ? { ...p, visible: false } : p));
      send({ type: 'pointer', visible: false });
    }, 3000);
    return () => clearTimeout(t);
  }, [pointer, send]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
      const k = e.key.toLowerCase();
      if (k === 'l') { e.preventDefault(); setMode((m) => (m === 'laser' ? 'off' : 'laser')); }
      else if (k === 'd') { e.preventDefault(); setMode((m) => (m === 'draw' ? 'off' : 'draw')); }
      else if (k === 'c' && mode !== 'off') { e.preventDefault(); clearStrokes(); }
      else if (e.key === 'Escape' && mode !== 'off') { e.preventDefault(); setMode('off'); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, clearStrokes]);

  // Broadcast "off" message so audience clears its pointer when presenter disables
  useEffect(() => {
    if (mode === 'off') send({ type: 'pointer', visible: false });
  }, [mode, send]);

  return (
    <>
      {/* Presenter's own overlay (same visuals as audience) */}
      {mode !== 'off' && (
        <LaserOverlay pointer={pointer} strokes={strokes} activeStroke={activeStroke} color={color} />
      )}

      {/* Compact floating toolbar — bottom-left so it doesn't collide with nav chrome */}
      <div
        className="fixed bottom-3 left-3 md:bottom-5 md:left-5 z-deck-chrome flex items-center gap-1 p-1 rounded-full border backdrop-blur"
        style={{
          background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
          borderColor: 'var(--cream-hairline)',
        }}
      >
        <ToolBtn
          active={mode === 'laser'}
          onClick={() => setMode((m) => (m === 'laser' ? 'off' : 'laser'))}
          label="Laser pointer · L"
          icon={MousePointer2}
        />
        <ToolBtn
          active={mode === 'draw'}
          onClick={() => setMode((m) => (m === 'draw' ? 'off' : 'draw'))}
          label="Draw · D"
          icon={Pencil}
        />
        <span aria-hidden style={{ width: 1, height: 20, background: 'var(--cream-hairline)', margin: '0 var(--space-1)' }} />
        {COLORS.map((c) => (
          <button
            key={c.key}
            onClick={() => setColor(c.value)}
            aria-label={`Color: ${c.key}`}
            className="h-6 w-6 rounded-full transition-transform focus:outline-none focus-visible:ring-2"
            style={{
              background: c.value,
              border: color === c.value ? '2px solid var(--cream)' : '2px solid transparent',
              transform: color === c.value ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        ))}
        <span aria-hidden style={{ width: 1, height: 20, background: 'var(--cream-hairline)', margin: '0 var(--space-1)' }} />
        <ToolBtn
          onClick={clearStrokes}
          label="Clear ink · C"
          icon={Eraser}
          disabled={strokes.length === 0 && !activeStroke}
        />
        {mode !== 'off' && (
          <ToolBtn
            onClick={() => setMode('off')}
            label="Turn off · Esc"
            icon={X}
          />
        )}
      </div>
    </>
  );
}

function ToolBtn({ active, onClick, label, icon: Icon, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={!!active}
      className="inline-flex items-center justify-center h-8 w-8 rounded-full transition-colors disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-deck-accent"
      style={{
        background: active ? 'var(--case, var(--amber))' : 'transparent',
        color: active ? 'var(--bg)' : 'var(--cream-muted)',
      }}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}