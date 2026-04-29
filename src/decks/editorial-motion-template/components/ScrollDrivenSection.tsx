import { type ReactNode } from "react";

type Block = {
  eyebrow: string;
  body: ReactNode;
};

type Props = {
  blocks: Block[];
};

/**
 * Addenda § A5 — CSS Scroll-Driven Animations.
 *
 * Uses the native `animation-timeline: view()` API (no JS, no library). Each
 * block fades and translates as it enters the viewport, driven entirely by
 * scroll position on the compositor thread.
 *
 * Browser support: Chromium 115+ (Chrome, Edge, Brave, Arc). Falls back to
 * static layout in Firefox / Safari via @supports — see components.css.
 *
 * Note: this section has its own scroll container so the demo works inside a
 * full-viewport-height slide (the slide doesn't itself scroll).
 */
export function ScrollDrivenSection({ blocks }: Props) {
  return (
    <div className="sds">
      <div className="sds__viewport">
        {blocks.map((block, i) => (
          <section key={i} className="sds__block">
            <span className="sds__eyebrow">{block.eyebrow}</span>
            <div className="sds__body">{block.body}</div>
          </section>
        ))}
      </div>
      <p className="sds__hint">Scroll inside the panel ↑ to see the effect.</p>
    </div>
  );
}
