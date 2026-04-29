/**
 * Seminar configuration.
 *
 * Per Amendment 2: the deck no longer reframes itself for the audience's
 * institution ("fit at COMPANY" framing was dropped). The substrate is
 * the subject; the audience can map applicability themselves. Only
 * delivery-day chrome (date) lives here now.
 */
export const seminarConfig = {
  date: 'April 2026',
};

export type SeminarConfig = typeof seminarConfig;
