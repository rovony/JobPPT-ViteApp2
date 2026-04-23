import React from 'react';
import ClosingCard from '@/components/deck/patterns/ClosingCard';

export default function Slide07() {
  return (
    <ClosingCard
      eyebrow="Thank you"
      title={<>Build quietly.<br/>Ship with intent.</>}
      subtitle="We'll follow up with a written recap and access keys within the hour."
      contact="hello@the-product.co"
    />
  );
}