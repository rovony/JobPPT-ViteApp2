import React from 'react';
import StatGrid from '@/components/deck/patterns/StatGrid';

export default function Slide03() {
  return (
    <StatGrid
      eyebrow="The before picture"
      title="What we heard, over and over"
      stats={[
        { value: '47%', label: 'of a team\'s day is spent reconciling tools', note: 'Internal audit · n=118' },
        { value: '3.2', label: 'average context switches per decision', note: 'Mouse & tab tracking study' },
        { value: '11 min', label: 'to recover focus after interruption', note: 'Industry baseline' },
      ]}
    />
  );
}