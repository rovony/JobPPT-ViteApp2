// @ts-nocheck
import React from 'react';
import Slide from '../Slide';
import Reveal from '../Reveal';

export default function TwoColumn({ title, eyebrow, left, right, ratio = '1fr 1fr' }) {
  return (
    <Slide title={title} eyebrow={eyebrow}>
      <div
        className="grid gap-10 lg:gap-16 items-start"
        style={{ gridTemplateColumns: `minmax(0, ${ratio.split(' ')[0]}) minmax(0, ${ratio.split(' ')[1]})` }}
      >
        <Reveal><div>{left}</div></Reveal>
        <Reveal><div>{right}</div></Reveal>
      </div>
    </Slide>
  );
}
