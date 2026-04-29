import React, { useState, useEffect } from 'react';
import { rehearsalQAs } from '@/decks/pharazi-seminar/content';

interface RehearsalOverlayProps {
  slideId: string;
}

export default function RehearsalOverlay({ slideId }: RehearsalOverlayProps) {
  const [isRehearsal, setIsRehearsal] = useState(false);

  useEffect(() => {
    // Check URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'rehearsal') {
      setIsRehearsal(true);
    }

    // Toggle via keyboard 'r'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        setIsRehearsal(prev => {
          const next = !prev;
          // Update URL without reload
          const url = new URL(window.location.href);
          if (next) {
            url.searchParams.set('mode', 'rehearsal');
          } else {
            url.searchParams.delete('mode');
          }
          window.history.replaceState({}, '', url);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isRehearsal) return null;

  const qas = rehearsalQAs[slideId];
  if (!qas || qas.length === 0) return null;

  return (
    <div className="absolute bottom-6 right-6 z-50 w-[320px] bg-[color:var(--bg-deep)]/85 border border-[color:var(--case-coral)]/60 rounded-md p-3 pointer-events-none">
      <div className="deck-mono text-[10px] text-[color:var(--case-coral)] uppercase tracking-widest mb-3">
        REHEARSAL · TOP 3 ANTICIPATED PROBES
      </div>
      
      <div className="flex flex-col gap-3">
        {qas.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="flex items-start gap-2">
              <span className="text-[color:var(--case-coral)] font-mono text-xs font-bold leading-snug">Q</span>
              <span className="deck-display text-xs text-[color:var(--cream)] leading-snug">{item.q}</span>
            </div>
            <div className="deck-mono text-[10px] text-[color:var(--ink-secondary)] mt-1 ml-4">
              → {item.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
