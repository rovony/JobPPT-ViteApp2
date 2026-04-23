import React from 'react';
import Slide from '@/components/deck/Slide';
import Reveal from '@/components/deck/Reveal';
import TimelineTrack from '@/components/deck/viz/TimelineTrack';

export default function Slide06() {
  return (
    <Slide eyebrow="What's next" title="The next four quarters">
      <Reveal>
        <TimelineTrack
          milestones={[
            { sub: 'Q1', label: 'Shared canvas GA' },
            { sub: 'Q2', label: 'Memory graph beta' },
            { sub: 'Q3', label: 'Open extensions' },
            { sub: 'Q4', label: 'Cross-workspace agents' },
          ]}
        />
      </Reveal>
      <Reveal>
        <p className="max-w-3xl text-lg deck-ink-muted">
          We'll ship in small, legible steps. Each release should make the last one feel inevitable.
        </p>
      </Reveal>
    </Slide>
  );
}