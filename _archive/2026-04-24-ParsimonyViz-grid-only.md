# ParsimonyViz — pre-redesign snapshot (grid-only, no FWER risk panel)

**Archived:** 2026-04-24
**File:** `src/decks/qp2-seminar/slides/cs1-strategy/DecisionVisuals.jsx`
**Why archived:** User asked for the X/✓ vertical-split visual idiom (mirroring
IntegrateViz/ConstrainViz) so Decision 03 communicates **why** p<0.001 was
chosen — i.e. that doing forward inclusion at α=0.05 per covariate inflates
the family-wise type-I-error rate to `1 - (1-0.05)^12 ≈ 46%`. The prior
visual showed only the ✓ outcome (12 chips × strikes, "0 RETAINED") without
the contrast.

The redesigned `ParsimonyViz` adds a TOP panel (✗ FORWARD INCLUSION · α=0.05
PER COV) showing the cumulative FWER inflation as a 100-segment risk bar
(46 of 100 hypothetical analyses produce ≥1 false positive), and compresses
the chip grid into a BOTTOM panel (✓ FULL MODEL · α=0.001).

This file preserves the original visual verbatim. To restore: copy the
function below back over the new `ParsimonyViz` definition in
`DecisionVisuals.jsx`.

```jsx
/* ============================================================
   DECISION 03 — STAY PARSIMONIOUS
   12 covariate chips in 3×4 grid with static strike-through.
   Continuous particle sprites fly IN from the left edge toward
   a chip center, then fade (the chip rejects them) — visualises
   "covariates tested and rejected" as a steady rhythm.
   ============================================================ */
export function ParsimonyViz({ delay = 0 }) {
  const reduce = useReducedMotion();

  const covariates = [
    { abbr: 'BILI',  full: 'Bilirubin' },
    { abbr: 'ALT',   full: 'Alanine aminotransferase' },
    { abbr: 'AST',   full: 'Aspartate aminotransferase' },
    { abbr: 'ALP',   full: 'Alkaline phosphatase' },
    { abbr: 'GGT',   full: 'Gamma-glutamyl transferase' },
    { abbr: 'CrCl',  full: 'Creatinine clearance' },
    { abbr: 'AGE',   full: 'Age' },
    { abbr: 'SEX',   full: 'Sex' },
    { abbr: 'RACE',  full: 'Race' },
    { abbr: 'ETH',   full: 'Ethnicity' },
    { abbr: 'DOSE',  full: 'Dose group' },
    { abbr: 'T-LAG', full: 'Dose on absorption lag' },
  ];

  const cols = 4;
  const rows = 3;
  const padX = 20;
  const padTop = 28;
  const padBot = 46;
  const gridW = VB_W - padX * 2;
  const gridH = VB_H - padTop - padBot;
  const cellW = gridW / cols;
  const cellH = gridH / rows;

  // Pick 8 chip centers as sprite targets (covers every row, varied cols).
  const chipCenters = [0, 2, 5, 6, 8, 10, 3, 11].map((idx) => {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    return {
      cx: padX + c * cellW + cellW / 2,
      cy: padTop + r * cellH + cellH / 2,
    };
  });

  // 8 sprites, one per target chip, staggered so ~2 are in flight at once.
  const chipSprites = chipCenters.map((p, i) => ({
    targetX: p.cx,
    targetY: p.cy,
    delay: i * 0.45,
    duration: 3.2,
  }));

  return (
    <Frame delay={delay} label="Twelve covariates tested, none retained at p less than 0.001">
      {/* Header kickers */}
      <text x={padX} y={16}
        fontFamily="var(--font-mono)" fontSize={8.5}
        letterSpacing={1.2}
        fill="var(--cream-faint)">12 TESTED</text>
      <text x={VB_W - padX} y={16} textAnchor="end"
        fontFamily="var(--font-mono)" fontSize={8.5}
        letterSpacing={1.2}
        fill="var(--coral)" fontWeight={600}>0 RETAINED</text>

      {/* Covariate chips — box + label static; REJECTION CROSS (×) is
          the animated sprite. Each chip's cross consists of two
          diagonal strokes that draw pathLength 0→1 on a stagger, hold
          briefly, then reset. The cascade sweeps through all 12 chips
          like a rejection ledger being stamped in real time.
          User ask 2026-04-24: "sprite-like cross each of the boxes,
          not dots moving." */}
      {covariates.map((cov, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const cx = padX + c * cellW + cellW / 2;
        const cy = padTop + r * cellH + cellH / 2;
        const chipW = cellW - 6;
        const chipH = cellH - 8;
        const inset = 3;
        // Cross stroke endpoints (two diagonals forming an ×).
        const x0 = cx - chipW / 2 + inset;
        const y0 = cy - chipH / 2 + inset;
        const x1 = cx + chipW / 2 - inset;
        const y1 = cy + chipH / 2 - inset;

        // One-shot staggered stamp — chips get "rejected" sequentially
        // 1→12 in a fast cascade, then the strikes REMAIN drawn. No
        // looping (user ask: limit ambient animations on slide 8 to
        // avoid distraction). Each chip's stroke takes 0.35s to draw
        // after its stagger delay.
        const strokeDelay = i * 0.18;

        const strikeTransition = {
          duration: 0.35,
          delay: strokeDelay,
          ease: ease,
        };
        // pathLength 0 → 1 (drawn once), opacity 0 → 0.85. No fade,
        // no repeat — the cross is a permanent rejection mark.
        const strikeAnimate = {
          pathLength: 1,
          opacity: 0.85,
        };

        return (
          <g key={cov.abbr}>
            <rect
              x={cx - chipW / 2} y={cy - chipH / 2}
              width={chipW} height={chipH}
              rx={3}
              fill="none"
              stroke="var(--cream-hairline)" strokeWidth={0.8}
              opacity={0.7}
            />
            <text x={cx} y={cy + 3} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize={9}
              letterSpacing={0.8}
              fill="var(--cream-faint)"
              opacity={0.85}>{cov.abbr}</text>
            {/* First diagonal of the × (TL → BR) */}
            {reduce ? (
              <line x1={x0} y1={y0} x2={x1} y2={y1}
                stroke="var(--coral)" strokeWidth={1.5}
                strokeLinecap="round" opacity={0.85} />
            ) : (
              <motion.line
                x1={x0} y1={y0} x2={x1} y2={y1}
                stroke="var(--coral)" strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={strikeAnimate}
                transition={strikeTransition}
              />
            )}
            {/* Second diagonal of the × (BL → TR) */}
            {reduce ? (
              <line x1={x0} y1={y1} x2={x1} y2={y0}
                stroke="var(--coral)" strokeWidth={1.5}
                strokeLinecap="round" opacity={0.85} />
            ) : (
              <motion.line
                x1={x0} y1={y1} x2={x1} y2={y0}
                stroke="var(--coral)" strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={strikeAnimate}
                transition={{ ...strikeTransition, delay: strokeDelay + 0.12 }}
              />
            )}
          </g>
        );
      })}

      {/* Footer */}
      <text x={VB_W / 2} y={VB_H - 22} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={8.5}
        letterSpacing={1.2}
        fill="var(--cream-faint)">NONE RETAINED</text>
      <text x={VB_W / 2} y={VB_H - 8} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={7.5}
        letterSpacing={1.2}
        fill="var(--coral)"
        fontWeight={600}>p &lt; 0.001 · BODY WEIGHT ONLY</text>
    </Frame>
  );
}
```

## Restoration

```bash
# To restore the grid-only version, replace the redesigned
# `ParsimonyViz` in DecisionVisuals.jsx with the function above.
```
