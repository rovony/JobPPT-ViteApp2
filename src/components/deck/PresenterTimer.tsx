import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, EyeOff } from 'lucide-react';

/**
 * PresenterTimer — elapsed time since Play was pressed.
 * Auto-starts on mount so you don't need a click.
 */
export default function PresenterTimer({ onHide }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const startRef = useRef(Date.now());
  const baseRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    startRef.current = Date.now();
    const iv = setInterval(() => {
      setElapsed(baseRef.current + (Date.now() - startRef.current));
    }, 250);
    return () => clearInterval(iv);
  }, [running]);

  const toggle = () => {
    if (running) {
      baseRef.current = baseRef.current + (Date.now() - startRef.current);
      setRunning(false);
    } else {
      setRunning(true);
    }
  };

  const reset = () => {
    baseRef.current = 0;
    startRef.current = Date.now();
    setElapsed(0);
  };

  const mm = Math.floor(elapsed / 60000);
  const ss = Math.floor((elapsed % 60000) / 1000);

  return (
    <div className="flex items-center gap-3">
      <div className="deck-mono text-4xl tabular-nums" style={{ color: 'var(--cream)' }}>
        {String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}
      </div>
      <div className="flex gap-1">
        <button
          onClick={toggle}
          aria-label={running ? 'Pause timer' : 'Resume timer'}
          className="h-8 w-8 rounded-full flex items-center justify-center border transition-colors"
          style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)' }}
        >
          {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={reset}
          aria-label="Reset timer"
          className="h-8 w-8 rounded-full flex items-center justify-center border transition-colors"
          style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)' }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        {onHide && (
          <button
            onClick={onHide}
            aria-label="Hide timer"
            title="Hide timer"
            className="h-8 w-8 rounded-full flex items-center justify-center border transition-colors"
            style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)' }}
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}