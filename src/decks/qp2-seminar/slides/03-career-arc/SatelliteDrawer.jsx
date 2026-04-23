import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { getSatelliteDetail } from './satelliteDetails';

/**
 * SatelliteDrawer — side sheet that displays detailed project experience,
 * technical achievements, and metrics for a clicked satellite node.
 *
 * Styling stays inside the deck's token system (--cream, --case, --panel…).
 */
export default function SatelliteDrawer({ open, onOpenChange, selection, hub }) {
  const detail = selection ? getSatelliteDetail(selection.hubKey, selection.label) : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto border-l"
        style={{
          background: 'var(--panel)',
          borderColor: 'var(--cream-hairline)',
          color: 'var(--cream)',
        }}
      >
        {detail && selection && hub ? (
          <>
            <SheetHeader className="space-y-3 text-left">
              <div
                className="deck-mono uppercase flex items-center gap-2"
                style={{
                  fontSize: 'var(--fs-slide-kicker)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: hub.hero ? 'var(--coral)' : 'var(--amber)',
                }}
              >
                <span
                  className="inline-block h-px w-8"
                  style={{ background: hub.hero ? 'var(--coral)' : 'var(--amber)' }}
                />
                {hub.name} · {detail.period}
              </div>
              <SheetTitle
                className="deck-display"
                style={{
                  fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                  lineHeight: 'var(--lh-snug)',
                  letterSpacing: 'var(--ls-headline)',
                  color: 'var(--cream)',
                  fontWeight: 600,
                }}
              >
                {selection.label}
              </SheetTitle>
              <SheetDescription
                className="deck-display italic"
                style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  lineHeight: 'var(--lh-base)',
                  color: 'var(--cream-muted)',
                  fontWeight: 400,
                }}
              >
                {detail.summary}
              </SheetDescription>
            </SheetHeader>

            {detail.metrics?.length > 0 && (
              <section className="mt-6">
                <SectionLabel>Metrics</SectionLabel>
                <div
                  className="grid mt-3"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(detail.metrics.length, 2)}, minmax(0, 1fr))`,
                    gap: 'var(--space-3)',
                  }}
                >
                  {detail.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-deck-md"
                      style={{
                        border: '1px solid var(--cream-hairline)',
                        background: 'var(--cream-ghost)',
                        padding: 'var(--space-4)',
                      }}
                    >
                      <div
                        className="deck-display"
                        style={{
                          fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          color: hub.hero ? 'var(--coral)' : 'var(--amber)',
                          lineHeight: 1,
                        }}
                      >
                        {m.value}
                      </div>
                      <div
                        className="deck-mono uppercase mt-2"
                        style={{
                          fontSize: '0.62rem',
                          letterSpacing: 'var(--ls-mono)',
                          color: 'var(--cream-muted)',
                        }}
                      >
                        {m.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {detail.achievements?.length > 0 && (
              <section className="mt-6">
                <SectionLabel>Key achievements</SectionLabel>
                <ul className="mt-3 space-y-3">
                  {detail.achievements.map((a, i) => (
                    <li
                      key={i}
                      className="flex gap-3"
                      style={{
                        fontSize: 'var(--fs-slide-tagline)',
                        lineHeight: 'var(--lh-base)',
                        color: 'var(--cream)',
                      }}
                    >
                      <span
                        className="shrink-0 mt-2"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 999,
                          background: hub.hero ? 'var(--coral)' : 'var(--amber)',
                        }}
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-kicker)',
              color: 'var(--cream-muted)',
              letterSpacing: 'var(--ls-mono)',
            }}
          >
            No details available.
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        fontSize: '0.62rem',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--cream-faint)',
        paddingBottom: 'var(--space-2)',
        borderBottom: '1px solid var(--cream-hairline)',
      }}
    >
      {children}
    </div>
  );
}