import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sparkles, Type, Atom, Wand2, Palette, BarChart3, LayoutGrid, Home, Package,
} from 'lucide-react';

/**
 * DevKitSidebar — left navigation for the /dev catalog.
 *
 * Each link points to a sub-page that showcases a family of components.
 * Keep this list in sync with the nested routes registered in App.jsx.
 */
const SECTIONS = [
  { to: '/dev',                label: 'Overview',    icon: Sparkles   },
  { to: '/dev/tokens',         label: 'Tokens',      icon: Palette    },
  { to: '/dev/typography',     label: 'Typography',  icon: Type       },
  { to: '/dev/scientific',     label: 'Scientific',  icon: Atom       },
  { to: '/dev/transitions',    label: 'Transitions', icon: Wand2      },
  { to: '/dev/viz',            label: 'Viz',         icon: BarChart3  },
  { to: '/dev/patterns',       label: 'Patterns',    icon: LayoutGrid },
  { to: '/dev/libraries',      label: 'Libraries',   icon: Package    },
];

export default function DevKitSidebar() {
  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        borderRight: '1px solid var(--cream-hairline)',
        background: 'var(--panel)',
        padding: 'var(--space-6) var(--space-4)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <NavLink
        to="/"
        className="deck-mono uppercase"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          marginBottom: 'var(--space-6)',
          padding: 'var(--space-2)',
          textDecoration: 'none',
        }}
      >
        <Home className="w-3.5 h-3.5" /> Home
      </NavLink>

      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-nano)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case, var(--amber))',
          marginBottom: 'var(--space-3)',
          padding: '0 var(--space-2)',
        }}
      >
        Dev Kit · Components
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.to === '/dev'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--fs-body-sm)',
                color: isActive ? 'var(--cream)' : 'var(--cream-muted)',
                background: isActive ? 'var(--panel-elevated)' : 'transparent',
                textDecoration: 'none',
                transition: 'background 160ms var(--ease-out), color 160ms var(--ease-out)',
                borderLeft: isActive
                  ? '2px solid var(--case, var(--amber))'
                  : '2px solid transparent',
              })}
            >
              <Icon className="w-3.5 h-3.5" />
              {s.label}
            </NavLink>
          );
        })}
      </nav>

      <div
        className="deck-mono"
        style={{
          marginTop: 'var(--space-8)',
          padding: 'var(--space-3)',
          fontSize: 'var(--fs-nano)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
          borderTop: '1px solid var(--cream-hairline)',
          paddingTop: 'var(--space-4)',
          lineHeight: 1.5,
        }}
      >
        Reference components by name when requesting slide work.
      </div>
    </aside>
  );
}