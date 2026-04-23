import React from 'react';
import TitleCard from '@/components/deck/patterns/TitleCard';

export default function Slide01() {
  return (
    <TitleCard
      eyebrow="Product Launch · 2026"
      title={<>Quietly,<br/>the product<br/>got smarter.</>}
      subtitle="An invitation to see what we've been building — and where it's going next."
      meta="Keynote · 25 minutes"
    />
  );
}