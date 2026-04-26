// @ts-nocheck
import React from 'react';
import TitleCard from '@/components/deck/patterns/TitleCard';

export default function Slide01() {
  return (
    <TitleCard
      eyebrow="Template · Blank"
      title={<>Your title<br/>goes here.</>}
      subtitle="A minimal starting point. Duplicate this deck, rename the folder, and start composing."
      meta="Deck Studio · starter"
    />
  );
}
