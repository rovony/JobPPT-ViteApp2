// Speaker notes per slide id. Keep concise — these are component demos.
const notes: Record<string, string> = {
  intro: `## Spoken
Components showcase deck. Each slide demos a Magic UI / framer-motion pattern with multiple design variants. Pick what works, copy into a real slide.`,
  'beam-pathway': `## Spoken
AnimatedBeam — three variants. Linear pathway (A→B→C), hub-and-spoke, bidirectional curves. Use for receptor → downstream-effect connections, signal pathways, regulatory cascades.`,
  'border-beam': `## Spoken
BorderBeam — three variants on different surfaces: card, button, stat tile. Use to highlight a "moment of binding" or a focused element.`,
  ticker: `## Spoken
NumberTicker — three layouts. Hero stat, comparison ratio, three-up tile grid. Replaces your current IntegerTicker with smoother spring motion.`,
  particles: `## Spoken
Particles — interactive canvas backdrop. Two density variants. Use sparingly — sparse for atmospheric backgrounds, dense for "molecular cloud" mechanism slides.`,
  'magic-card': `## Spoken
MagicCard — three card vocabularies. Hover spotlight, tinted-with-gradient, accent-rail. Picks a single style; do not mix in one deck.`,
  bento: `## Spoken
BentoGrid — three layouts. Classic 3-up, asymmetric 1+4, quadrant 2x2. Use for taxonomy slides like "three pathways drive PAH".`,
  smiles: `## Spoken
smiles-drawer — already in your stack. Renders 2D chemical structures from SMILES strings. Two variants: single hero, side-by-side comparison.`,
  vessel: `## Spoken
Vessel narrow→wide morph using framer-motion path interpolation. No external library. The mechanism payoff that the current cs1-mechanism slide is missing.`,
  combined: `## Spoken
Combined demo — what the actual cs1-mechanism slide could look like with these primitives composed together.`,
};

export default notes;
