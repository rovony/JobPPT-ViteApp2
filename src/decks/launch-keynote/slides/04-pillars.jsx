import React from 'react';
import BulletList from '@/components/deck/patterns/BulletList';

export default function Slide04() {
  return (
    <BulletList
      eyebrow="What changed"
      title="Three quiet rewrites"
      bullets={[
        { text: 'One surface, not twelve', note: 'Inbox, board, and editor share a single canvas.' },
        { text: 'Suggestions, not screens', note: 'The system proposes — you approve or reshape.' },
        { text: 'Memory that respects you', note: 'Context carries forward; nothing leaks across teams.' },
      ]}
    />
  );
}