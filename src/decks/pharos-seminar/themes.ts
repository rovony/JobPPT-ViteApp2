/**
 * Pharos seminar — chapter color rotation per zaj-design movement spec.
 *
 *   M0 Preamble (1–2.5)             amber
 *   M1 Vision (3–6)                 amber
 *   M2 Architecture (7,10)          amber
 *   M2 Architecture (8,9)           cyan      (privacy + audit)
 *   M2 KILLER (11)                  violet    (orthogonal layering)
 *   M3 Marker (11.5)                violet    (continuity into M3)
 *   M3 Working system (12a, 12b)    sage      (live deployment)
 *   M3 Components (13–17)           sage / violet / cyan / amber / coral
 *                                   — each component card threads back
 *                                     to its Movement-2 principle
 *   M3 Dashboards (18, 19)          violet, cyan
 *   Synthesis (20, 21)              sage      (whole-foundation register)
 *   Publication close (22)          amber
 *   Closing recap (22.5)            amber
 *   Q&A (23)                        amber
 *
 * Per Amendment 2: Movement 3 is a 5-card component tour (NCA, Data
 * Flow, Audit Chain, PopPK Dashboard, Marketplace SOP) — not a "fit at
 * COMPANY" arc. Per Amendment 4: dashboards 18/19 + synthesis pair
 * 20/21 added; publication close moved to slot 22.
 */
export type ChapterCase = 'amber' | 'cyan' | 'sage' | 'violet' | 'coral';

export const CHAPTER_FOR: Record<string, ChapterCase> = {
  '01-title':                  'amber',
  '02-hook':                   'amber',
  '02-5-agenda':               'amber',
  '03-regulatory-floor':       'amber',
  '04-market-moving':          'amber',
  '05-gap':                    'amber',
  '06-transition':             'amber',
  '07-principle1':             'amber',
  '08-principle2':             'cyan',
  '09-principle3':             'cyan',
  '10-principle4':             'amber',
  '11-principle5':             'violet',
  '12-5-m3-begins':            'violet',
  '12a-working-overview':      'sage',
  '12b-working-audit':         'sage',
  '13-component-nca':          'sage',         // links to working-system + clinical math
  '14-component-dataflow':     'violet',       // links to P5 orthogonal layering
  '15-component-audit':        'cyan',         // links to P3 cryptographic audit
  '16-poppk-dashboard':        'amber',        // PopPK domain register (clin pharm)
  '17-component-sop':          'coral',        // links to P4 SOPs as versioned plans
  '18-regulatory-dashboard':   'violet',       // regulatory affairs register
  '19-e2e-audit-dashboard':    'cyan',         // audit-discipline register
  '20-synthesis-dossier':      'sage',         // whole-foundation synthesis
  '21-synthesis-trace':        'sage',         // cinematic synthesis
  '22-publication-close':      'amber',
  '22-5-closing-recap':        'amber',
  '23-qa':                     'amber',
};

/** Token-driven color resolver for inline SVG / motion fills. */
export const themeVar = (key: ChapterCase) => `var(--${key})`;

/** Generic editorial constants used across the deck. */
export const PHAROS_FRAMEWORK_NAME = 'Pharazi'; // locked per GROUP-1 spec
export const PHAROS_DECK_LABEL = 'PHAROS · SEMINAR'; // chrome label across slides
