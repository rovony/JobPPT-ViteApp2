import React from 'react';
import TwoColumn from '@/components/deck/patterns/TwoColumn';
import SketchBox from '@/components/deck/viz/SketchBox';

export default function Slide05() {
  return (
    <TwoColumn
      eyebrow="Live moment"
      title="Watch a decision collapse from twelve clicks to one."
      left={
        <div className="space-y-5">
          <p className="text-lg deck-ink-muted">
            The operator receives a flagged customer thread. Historically, this meant three dashboards,
            two spreadsheets, and a Slack DM.
          </p>
          <p className="text-lg deck-ink-muted">
            Now: context, precedent, and recommendation arrive together. The operator clicks once.
          </p>
        </div>
      }
      right={
        <SketchBox className="w-full aspect-[4/3]">
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="deck-mono text-[10px] deck-ink-subtle tracking-widest uppercase">Thread #4821</div>
              <div className="mt-2 text-deck-ink">Customer escalation · tier 2</div>
            </div>
            <div className="border-t deck-rule pt-4">
              <div className="deck-mono text-[10px] deck-ink-subtle uppercase tracking-widest">Recommended action</div>
              <div className="mt-1 text-deck-accent deck-display text-xl">Credit refund · approve</div>
            </div>
          </div>
        </SketchBox>
      }
    />
  );
}