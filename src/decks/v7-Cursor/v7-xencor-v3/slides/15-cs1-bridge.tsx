/**
 * CS1 Beat 9 · Bridge — portable principle + Case 2 seam
 */
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.22, 0.7, 0.2, 1] as const;

const ITEMS = [
  {
    n: '01',
    t: 'What transfers is the architecture — not the fitted ambrisentan model.',
  },
  {
    n: '02',
    t: 'Pre-agree the threshold for the next action before the data answer.',
  },
  {
    n: '03',
    t: 'Adults build; children confirm — only when disease similarity is written down.',
  },
] as const;

export default function Cs1Bridge() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.06}>Case 01 · Close</Eyebrow>

      <GridSlot area="headline" as="h1" className="deck-display xc-hook self-center">
        Pre-agree the threshold for the next action
      </GridSlot>

      <Subhead delay={0.1} size="lead" maxChars={68}>
        What travels beyond pediatric PAH is the decision order — not the molecule.
      </Subhead>

      <Viz>
        <div className="cs1-bridge-viz">
          <div className="cs1-bridge-list">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.n}
                className="cs1-bridge-item"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.35,
                  delay: reduced ? 0 : 0.1 + i * 0.08,
                  ease: EASE,
                }}
              >
                <span className="cs1-bridge-item__n">{item.n}</span>
                <span className="cs1-bridge-item__t">{item.t}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="cs1-bridge-seam"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.4 }}
          >
            What Case 2 adds: remove the local anchor — ivosidenib approved in
            forty-two countries, with no data in the population the regulator asked about.
          </motion.p>
        </div>
      </Viz>

      <Footer kicker="CS1 · Bridge → India" tagline="" source="" />
    </SlideGrid>
  );
}
