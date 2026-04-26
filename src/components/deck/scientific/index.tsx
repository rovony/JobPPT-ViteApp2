/**
 * Scientific slide primitives — barrel export.
 *
 * Global components for rendering scientific content inside slides:
 *   · Equation, InlineMath  — KaTeX-rendered formulas, deck-themed
 *   · PKCompartmentModel    — React Flow PK compartment diagram
 *
 * Usage in a slide:
 *   import { Equation, InlineMath, PKCompartmentModel } from '@/components/deck/scientific';
 */
export { default as Equation, InlineMath } from './Equation';
export { default as PKCompartmentModel } from './PKCompartmentModel';