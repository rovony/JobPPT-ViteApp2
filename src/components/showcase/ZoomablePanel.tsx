import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

interface ZoomablePanelProps {
  id: string;
  label: string;
  metadata?: string;
  isZoomed: boolean;
  onZoom: (id: string) => void;
  children: React.ReactNode;
}

export function ZoomablePanel({ id, label, metadata, isZoomed, onZoom, children }: ZoomablePanelProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) onZoom(id);
    };
    if (isZoomed) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isZoomed, id, onZoom]);

  return (
    <motion.div 
      layoutId={`zoomable-panel-${id}`}
      onClick={() => onZoom(id)}
      className={`
        relative border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] 
        backdrop-blur-md p-4 flex flex-col cursor-pointer overflow-hidden
        ${isZoomed ? 'fixed inset-12 z-50 shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-[color:var(--bg)]' : 'h-full shadow-lg hover:border-[color:var(--case)] transition-colors'}
      `}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="flex justify-between items-center mb-4 border-b border-[color:var(--cream-hairline)] pb-2">
        <div className="deck-mono text-xs uppercase tracking-widest text-[color:var(--case)]">{label}</div>
        {metadata && <div className="deck-mono text-[10px] text-[color:var(--cream-muted)]">{metadata}</div>}
      </div>
      <div className="flex-1 relative min-h-0 flex flex-col">
         {children}
      </div>
      {!isZoomed && (
         <div className="absolute bottom-2 right-3 deck-mono text-[9px] text-[color:var(--cream-muted)] uppercase tracking-widest opacity-0 hover:opacity-100 transition-opacity">
            Click to zoom
         </div>
      )}
      {isZoomed && (
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 deck-mono text-xs text-[color:var(--cream-muted)] uppercase tracking-widest bg-[color:var(--bg-elevated)] px-4 py-2 rounded-full shadow-lg">
            Esc to close
         </div>
      )}
    </motion.div>
  );
}
