/**
 * cs4-flagship-v1 — anticipated Q&A per slide.
 *
 * Format: an array per slide id. Each entry has a `question` (the
 * panelist asks) and a `defense` (the candidate answers) plus
 * optional `escalation` for the deepest follow-up.
 *
 * Q&A authored only for slides where the visual invites a specific
 * line of attack. Other slides defer to S10's bracket bridge.
 */

interface QAEntry {
  question: string;
  defense: string;
  escalation?: string;
  // What slide / artifact to fall back to if the panel pushes harder
  fallback?: string;
}

const qa: Record<string, QAEntry[]> = {
  'cs4-divider': [
    {
      question: '"You said spreadsheets and scripts — surely your past employers had more than that?"',
      defense:
        'They had — and have — production NONMEM and Monolix workflows. The point is that the connective tissue between data extraction, NCA, PopPK, simulation, and audit lives mostly in analyst memory. PharmAgent makes that connective tissue explicit and inspectable.',
      escalation:
        'I am not claiming the field has no infrastructure. I am claiming the workflow LAYER has not been built as infrastructure — it has been built as a thousand bespoke scripts. M15 is now asking us to make it an asset.',
      fallback: 'S05 architecture diagram — see the explicit boundary between agents and tools.',
    },
  ],

  'cs4-hook-integration': [
    {
      question: '"Why three layers — why not just say data and decisions?"',
      defense:
        'Because the data layer and the decision layer are owned by different humans with different incentives. The workflow layer is what every clin pharm group has to BUILD — and historically rebuild — to bridge them. Naming it as a layer makes it a thing you can architect.',
      escalation:
        'In M15 vocabulary, the workflow layer is what governs Context of Use, Data Quality, and Model Qualification end to end. Without naming it, the regulator gets fragments.',
    },
    {
      question: '"How is this different from a Jupyter notebook plus a SOP?"',
      defense:
        'A notebook is a one-shot artifact owned by one analyst. The workflow layer I am proposing is a multi-agent system with a privacy boundary, a tool registry, and a cryptographic audit chain — those are S07 and S08. A notebook plus a SOP cannot produce a tamper-evident provenance trail across agents.',
    },
  ],

  'cs4-why-now-m15': [
    {
      question: '"Six pillars is your reading of M15 — is that the official structure?"',
      defense:
        'M15 itself uses a slightly different sectioning, but the six pillars on this slide map 1:1 to M15 sections 4, 5, 6, 7, 8, and 9. I chose the pillar labels to be readable for a non-regulatory audience without distorting the source structure. Citation is on the source line.',
      escalation:
        'If the panel prefers, I can show the M15 section heading next to each pillar — that is in the speaker reference deck, not on this slide because it would compete with the AI/ML emphasis we need for the next slide.',
      fallback: 'Reference deck slide 03b — pillar-to-section crosswalk.',
    },
    {
      question: '"You say you built PharmAgent backwards from M15 — is that not just retrofitting the language?"',
      defense:
        'Fair challenge. Two pieces of evidence that it is not retrofit: one, the privacy boundary on S07 was a design decision before M15 Step 2 was published — the data layer separation predates the regulatory text. Two, the cryptographic audit chain on S08 is implemented, not described — the hashes on S08 are sample data from the actual prototype.',
    },
  ],

  // S04–S10 Q&A authored in Group B / C / D / E.
  'cs4-what-is-agent':     [],
  'cs4-architecture':      [],
  'cs4-novelty':           [],
  'cs4-privacy-boundary':  [],
  'cs4-audit-chain':       [],
  'cs4-workflow-trace':    [],
  'cs4-bracket-bridge':    [],
};

export default qa;
