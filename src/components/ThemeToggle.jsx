import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Presentational theme toggle. The parent owns the mode and supplies
 * the handler — this lets the same button serve the global app theme
 * AND a per-deck override without duplicating logic.
 *
 * Props:
 *   mode      — 'light' | 'dark'
 *   onToggle  — handler
 *   size      — 'sm' (chrome) | 'md' (default) — compact vs page-level
 *   label     — overrides aria-label
 */
export default function ThemeToggle({ mode, onToggle, size = 'md', label, className }) {
  const isLight = mode === 'light';
  const aria = label || (isLight ? 'Switch to dark mode' : 'Switch to light mode');
  const Icon = isLight ? Moon : Sun;

  const sizeCls = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  const iconCls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={aria}
      title={aria}
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        'border transition-colors duration-deck-fast ease-deck-out',
        'focus:outline-none focus-visible:ring-2',
        sizeCls,
        className,
      )}
      style={{
        background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
        borderColor: 'var(--cream-hairline)',
        color: 'var(--cream)',
      }}
    >
      <Icon className={iconCls} />
    </button>
  );
}