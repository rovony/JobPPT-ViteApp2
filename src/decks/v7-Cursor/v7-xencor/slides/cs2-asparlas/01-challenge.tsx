// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import SwissBoard from '../../_shared/SwissBoard';

/**
 * CS2 · Challenge — SwissBoard quality bar (from CS1) + Asparlas numerals.
 */

const PANELS = [
  {
    id: 'decision',
    kicker: 'The decision',
    accent: 'var(--teal)',
    numeral: (
      <motion.span layoutId="cs3-n-94" style={{ display: 'inline-block' }}>
        94
      </motion.span>
    ),
    title: 'Endpoint-powered N was clean — and operationally undeliverable.',
    body: 'Same drug, same NSAA surrogate, same biology. The constraint was not scientific doubt; it was whether 94 adults could ever enroll on a usable timeline.',
    accentAt: 0,
  },
  {
    id: 'options',
    kicker: 'The options',
    accent: 'var(--amber)',
    numeral: '2018',
    title: 'Run 94 · redesign smaller · or shelve the adult path.',
    body: 'Pediatric label already carried FDA-validated NSAA ≥ 0.1 U/mL. Only one option kept the adult program alive: size the study on decision precision, not unaffordable endpoint power.',
    accentAt: 1,
  },
  {
    id: 'cost',
    kicker: 'Cost of being wrong',
    accent: 'var(--coral)',
    numeral: '~2028',
    title: 'No adult program on a usable timeline — or a design FDA will not accept.',
    body: 'SPARK-ALL projected enrollment under the unchanged design. Wrong call = years of delay, or a smaller study that cannot defend the next decision.',
    accentAt: 2,
  },
];

export default function Cs2AspChallenge() {
  return (
    <SlideGrid dataCase="teal" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow color="var(--teal)" delay={0.08}>
        CS2 · Setup + challenge
      </Eyebrow>
      <SolidHeadline delay={0.14} maxChars={50}>
        Approved in pediatrics.{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          Adults needed a smarter design.
        </span>
      </SolidHeadline>
      <Subhead delay={0.2} maxChars={120}>
        Calaspargase pegol (Asparlas) · adult Ph-negative ALL. Ninety-four was deliverable in the
        protocol and undeliverable in practice.
      </Subhead>

      <Viz>
        <SwissBoard
          panels={PANELS}
          conclusionAccent="var(--teal)"
          conclusion={
            <>
              Could a{' '}
              <span style={{ color: 'var(--teal)', fontWeight: 700 }}>smaller, smarter study</span>{' '}
              still be defensible to FDA? Pediatric PopPK was already label-supporting — the question
              was whether fewer adults and more model could still answer the same scientific question.
            </>
          }
        />
      </Viz>

      <Footer
        kicker="Case 02 · Challenge"
        tagline=""
        source="FDA label 761102 (Dec 2018) · NCT04817761 · SPARK-ALL · pediatric N = 124"
        delay={0.28}
      />
    </SlideGrid>
  );
}
