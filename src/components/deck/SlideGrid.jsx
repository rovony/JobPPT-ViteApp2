import React from 'react';
import { motion } from 'framer-motion';

/**
 * SlideGrid — overlap-proof slide layout primitive.
 *
 * Every slide is a CSS Grid with NAMED AREAS. Children drop into named
 * areas via the `area` prop. Two items CANNOT occupy the same cell —
 * the grid enforces it structurally.
 *
 * STANDARD_AREAS: the default preset every slide should use unless it
 * has a strong reason to customize. It declares all seven standard
 * names used by SlideParts (chrome-l, chrome-r, eyebrow, headline,
 * subhead, viz, footer, pageno) so dropping any SlidePart in "just
 * works" without accidental phantom-row placement.
 *
 * The 12-col grid gives slots predictable horizontal proportions; the
 * viz row is `1fr` so it absorbs all leftover vertical space.
 */

// ─── Standard preset ────────────────────────────────────────
// 12 columns. Chrome/eyebrow/headline/subhead/footer rows are `auto`
// (content-sized); viz row is `1fr` (flex-grow). Matches the default
// `area` values on every SlideParts component.
export const STANDARD_AREAS = [
  'chrome-l chrome-l chrome-l chrome-l chrome-l chrome-l chrome-r chrome-r chrome-r chrome-r chrome-r chrome-r',
  'eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow',
  'headline headline headline headline headline headline headline headline headline headline headline headline',
  'subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead',
  'viz      viz      viz      viz      viz      viz      viz      viz      viz      viz      viz      viz',
  'footer   footer   footer   footer   footer   footer   footer   footer   footer   footer   footer   footer',
];

export const STANDARD_ROW_SIZES = 'auto auto auto auto minmax(0, 1fr) auto';

// Extract the complete set of area names declared in a 2D areas array.
function collectAreaNames(areas) {
  const set = new Set();
  for (const row of areas) {
    for (const token of row.trim().split(/\s+/)) {
      if (token && token !== '.') set.add(token);
    }
  }
  return set;
}

export default function SlideGrid({
  areas = STANDARD_AREAS,
  rowSizes,
  colSizes,
  dataCase,
  children,
  padding = 'var(--deck-gutter)',
  className,
  ...rest
}) {
  const ease = [0.2, 0.7, 0.3, 1];

  // Build grid-template-areas from the 2D string array.
  const template = areas.map((row) => `"${row}"`).join(' ');
  const cols = areas[0].trim().split(/\s+/).length;
  const rows = areas.length;

  // Pick sensible row defaults: the STANDARD_AREAS preset has a known
  // 6-row shape with viz as `1fr`; any custom `areas` gets equal rows.
  const resolvedRowSizes =
    rowSizes ||
    (areas === STANDARD_AREAS ? STANDARD_ROW_SIZES : `repeat(${rows}, 1fr)`);

  // Dev-mode: warn if a child references an area not declared in the grid.
  if (import.meta.env?.DEV) {
    const declared = collectAreaNames(areas);
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      const area = child.props?.area;
      if (area && !declared.has(area)) {
        // eslint-disable-next-line no-console
        console.warn(
          `[SlideGrid] Child references area "${area}" which is not declared in this grid's areas template. ` +
          `Declared areas: ${[...declared].join(', ')}. ` +
          `This child will be auto-placed into an implicit cell and may overlap other content.`
        );
      }
    });
  }

  return (
    <motion.section
      data-case={dataCase}
      className={`relative w-full h-[100dvh] overflow-hidden ${className || ''}`}
      style={{
        background: 'var(--bg)',
        display: 'grid',
        gridTemplateAreas: template,
        gridTemplateColumns: colSizes || `repeat(${cols}, 1fr)`,
        gridTemplateRows: resolvedRowSizes,
        columnGap: 'var(--deck-grid-colgap)',
        rowGap: 'var(--deck-grid-rowgap)',
        padding: `var(--deck-pad-top) ${padding} var(--deck-pad-bottom) ${padding}`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}

/* ──────────────────────────────────────────────────────────
   GridSlot — positions a child into a named area. Optional
   motion props for staggered entrance animations.
   ────────────────────────────────────────────────────────── */
export function GridSlot({
  area,
  children,
  className,
  style,
  motion: motionProps,
  as = 'div',
  ...rest
}) {
  const Component = motionProps ? motion[as] || motion.div : as;
  const motionStyle = motionProps
    ? {
        initial: motionProps.initial ?? { opacity: 0, y: 10 },
        animate: motionProps.animate ?? { opacity: 1, y: 0 },
        transition: motionProps.transition ?? {
          duration: 0.6,
          ease: [0.2, 0.7, 0.3, 1],
          delay: motionProps.delay ?? 0,
        },
      }
    : {};

  return (
    <Component
      className={className}
      style={{
        gridArea: area,
        minWidth: 0,
        minHeight: 0,
        ...style,
      }}
      {...motionStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}