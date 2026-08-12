import React from 'react';
import TitleLayout from '@/components/deck/layouts/TitleLayout';
import BodyLayout from '@/components/deck/layouts/BodyLayout';

/**
 * _StubSlide — parametric placeholder used to scaffold V5 deck slots.
 *
 * One file, many slots: the manifest enumerates 34 stub entries that all
 * point at this component but pass different `eyebrow` / `headline` /
 * `caseColor` / `layout` / `slideKey` props. When real content for a
 * slot lands, replace the manifest's `component` reference for that
 * entry with the new file — no other surgery needed.
 *
 * Design intent of the stub:
 *   • Render the slide-id prominently so the user can see chrome
 *     (footer text, NN/TT numbering, eyebrow, case-color cascade) at scale.
 *   • Show case-color via `data-case` wrapper so coral/cyan/violet
 *     subtree cascade is verified for every CS1/CS2/CS3 slot.
 *   • Use the layout system end-to-end (TitleLayout or BodyLayout) so
 *     standard chrome inherits exactly as it will in real slides.
 *
 * NO custom styling, NO bespoke composition — that's deliberate. Stubs
 * are scaffolding, not slide design.
 */
export default function StubSlide({
  deck,
  layout = 'body',
  eyebrow,
  headline,
  caseColor,
  slideKey = '—',
  note,
}) {
  const Wrapper = layout === 'title' ? TitleLayout : BodyLayout;

  const inner = (
    <div className="h-full flex flex-col items-center justify-center text-center gap-4">
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}
      >
        Stub · placeholder content
      </div>

      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-slide-display)',
          lineHeight: 1.1,
          fontWeight: 500,
          color: 'var(--case, var(--cream))',
          letterSpacing: 'var(--ls-headline)',
        }}
      >
        {slideKey}
      </div>

      {note && (
        <div
          className="deck-body"
          style={{
            fontSize: 'var(--fs-slide-lead)',
            lineHeight: 1.45,
            color: 'var(--cream-muted)',
            maxWidth: '52ch',
          }}
        >
          {note}
        </div>
      )}

      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-tight)',
          color: 'var(--cream-faint)',
          marginTop: 'var(--stack-md)',
        }}
      >
        {layout === 'title' ? 'TitleLayout' : 'BodyLayout'}
        {caseColor ? ` · case=${caseColor}` : ''}
      </div>
    </div>
  );

  return (
    <Wrapper deck={deck} eyebrow={eyebrow ?? undefined} headline={headline ?? undefined}>
      {caseColor ? <div data-case={caseColor} className="h-full">{inner}</div> : inner}
    </Wrapper>
  );
}
