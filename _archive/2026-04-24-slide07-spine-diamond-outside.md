# Slide 07 · CS1 Challenge — `SpineDiamond` (OUTSIDE pattern) snapshot

Snapshot date: **2026-04-24**
Source file: `src/decks/qp2-seminar/slides/07-case-challenge.jsx`
Replaced by: inline `◆` marker inside the `FocalQuestion` ribbon (matches slide 08 convention).

## Why archived

The "outside" diamond — placed in spine column 1 at `gridRow: 5`, beneath the focal question card in column 2 — was visually orphaned because `SpineLine` only spans rows 1–3. The diamond floated alone in column 1 with no spine line above it connecting it to the dot sequence (01, 02, 03). The replacement (inline diamond inside the focal ribbon) is consistent with slide 08's `Closing ribbon` and reads as one editorial unit.

Kept here so the prior pattern is recoverable if a future spine design extends the line all the way down to a terminal diamond marker.

## Component (verbatim from slide 07)

```jsx
function SpineDiamond({ row, delay }) {
  const reduce = useReducedMotion();
  // Framer Motion animates `scale` via transform, which would clobber
  // a rotate(45deg) on the same element. Rotated wrapper stays static;
  // only the inner child animates.
  return (
    <div
      aria-hidden
      className="cs1-diamond"
      style={{
        gridColumn: 1,
        gridRow: row,
        alignSelf: 'center',
        justifySelf: 'center',
        transform: 'rotate(45deg)',
        width: 14,
        height: 14,
        zIndex: 1,
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--amber)',
          /* boxShadow removed (Brief §10 — no decorative glows). */
        }}
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduce ? 0 : 0.4,
          ease: [0.34, 1.56, 0.64, 1],
          delay: reduce ? 0 : delay,
        }}
      />
    </div>
  );
}
```

## Placement (verbatim)

```jsx
<SpineDot number="03" row={3} delay={2.3} />
<SpineDiamond row={5} delay={3.0} />
```

And the focal cell sat in column 2 of the same row:

```jsx
{/* Focal question — col 2 of row 5 (diamond sits in col 1) */}
<div className="cs1-focal" style={{ gridColumn: 2, gridRow: 5 }}>
  <FocalQuestion />
</div>
```

## Mobile-fallback CSS that hid it (also removed)

```css
.cs1-challenge-stack .cs1-diamond { display: none !important; }
```
