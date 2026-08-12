/**
 * Full-width bottom takeaway — no "Conclusion" label, no kicker.
 * Just a quiet full-bleed board so the line isn't cramped in the footer.
 */
export default function ConclusionBar({
  children,
  accent = 'var(--coral)',
}: {
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <aside
      style={{
        width: '100%',
        minWidth: 0,
        flexShrink: 0,
        padding: 'clamp(1.1rem, 2.2vh, 1.45rem) clamp(1.35rem, 2.6vw, 1.85rem)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `4px solid ${accent}`,
        background: 'var(--panel)',
      }}
    >
      <div
        className="deck-body"
        style={{
          margin: 0,
          fontSize: 'clamp(1.18rem, min(1.65vw, 2.55vh), 1.4rem)',
          lineHeight: 1.5,
          color: 'var(--cream)',
          fontWeight: 500,
          maxWidth: 'none',
        }}
      >
        {children}
      </div>
    </aside>
  );
}
