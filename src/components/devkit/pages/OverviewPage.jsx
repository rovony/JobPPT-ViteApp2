import React from 'react';
import { Link } from 'react-router-dom';
import { Type, Atom, Wand2, Palette, BarChart3, LayoutGrid, ArrowUpRight } from 'lucide-react';
import DevKitPageHeader from '../DevKitPageHeader';

const SECTIONS = [
  { to: '/dev/tokens',      label: 'Tokens',      icon: Palette,    desc: 'Colors · type scale · spacing · radii · shadows' },
  { to: '/dev/typography',  label: 'Typography',  icon: Type,       desc: 'Eyebrow · Headline · Subhead · Footer · TopRight' },
  { to: '/dev/scientific',  label: 'Scientific',  icon: Atom,       desc: 'Equation · InlineMath · PKCompartmentModel' },
  { to: '/dev/transitions', label: 'Transitions', icon: Wand2,      desc: 'fade · slide-* · canvas-cube · canvas-flip · canvas-depth' },
  { to: '/dev/viz',         label: 'Viz',         icon: BarChart3,  desc: 'PKCurve · TimelineTrack · AgencyStamp · SketchBox' },
  { to: '/dev/patterns',    label: 'Patterns',    icon: LayoutGrid, desc: 'TitleCard · QuoteCard · StatGrid · BulletList · ClosingCard' },
];

export default function OverviewPage() {
  return (
    <>
      <DevKitPageHeader
        eyebrow="Dev Kit"
        title="Component Catalog"
        description="Every reusable piece in the deck system — grouped by family, named so you can reference them directly when requesting slide work. Click any card to explore a family."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.to}
              to={s.to}
              style={{
                display: 'block',
                padding: 'var(--space-6)',
                border: '1px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--panel)',
                color: 'inherit',
                textDecoration: 'none',
                transition: 'border-color 180ms var(--ease-out), background 180ms var(--ease-out)',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--case, var(--amber))';
                e.currentTarget.style.background = 'var(--panel-elevated)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--cream-hairline)';
                e.currentTarget.style.background = 'var(--panel)';
              }}
            >
              <ArrowUpRight
                className="w-4 h-4"
                style={{
                  position: 'absolute',
                  top: 'var(--space-4)',
                  right: 'var(--space-4)',
                  color: 'var(--cream-faint)',
                }}
              />
              <Icon className="w-5 h-5" style={{ color: 'var(--case, var(--amber))', marginBottom: 'var(--space-3)' }} />
              <div
                className="deck-display"
                style={{ fontSize: '1.15rem', color: 'var(--cream)', fontWeight: 600, marginBottom: 'var(--space-2)' }}
              >
                {s.label}
              </div>
              <div
                className="deck-body"
                style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--cream-muted)', lineHeight: 1.5 }}
              >
                {s.desc}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}