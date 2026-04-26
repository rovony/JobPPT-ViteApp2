import React from 'react';
import { Monitor, Maximize, Presentation, MonitorPlay } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ModeSwitcher — PowerPoint-style view mode picker.
 *
 *   Normal      — default view with chrome
 *   Slide Show  — true browser fullscreen, slide only
 *   Presenter   — current+next slide, notes, timer
 *   Dual screen — opens audience fullscreen tab, this tab becomes presenter
 */
export default function ModeSwitcher({ mode, onNormal, onSlideShow, onPresenter, onDualScreen }) {
  const items = [
    { key: 'normal',    icon: Monitor,      label: 'Normal',       onClick: onNormal,     title: 'Normal view' },
    { key: 'slideshow', icon: Maximize,     label: 'Slide Show',   onClick: onSlideShow,  title: 'Fullscreen slide show · F' },
    { key: 'presenter', icon: Presentation, label: 'Presenter',    onClick: onPresenter,  title: 'Presenter view · P' },
    { key: 'dual',      icon: MonitorPlay,  label: 'Dual screen',  onClick: onDualScreen, title: 'Open audience on a second screen' },
  ];

  return (
    <div
      className="flex items-center gap-0.5 p-0.5 rounded-full border backdrop-blur"
      style={{
        borderColor: 'var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
      }}
    >
      {items.map((it) => {
        const Icon = it.icon;
        const active = mode === it.key;
        return (
          <button
            key={it.key}
            onClick={it.onClick}
            title={it.title}
            aria-label={it.title}
            className={cn(
              'h-8 px-3 rounded-full flex items-center gap-1.5 deck-mono uppercase transition-colors',
              active ? 'text-[color:var(--bg)]' : 'text-[color:var(--cream-muted)] hover:text-[color:var(--cream)]'
            )}
            style={{
              background: active ? 'var(--case, var(--amber))' : 'transparent',
              fontSize: '0.62rem',
              letterSpacing: 'var(--ls-mono)',
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}