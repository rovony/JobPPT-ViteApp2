type Props = {
  case_?: string;
  unit?: string;
};

/**
 * B6 — Footer Strip.
 * Persistent across slides; provides orientation breadcrumbs.
 */
export function FooterStrip({ case_, unit }: Props) {
  return (
    <>
      <div className="footer-strip__left">
        <span>Pattern Showcase</span>
        {case_ && (
          <>
            <span className="footer-strip__sep">·</span>
            <span>{case_}</span>
          </>
        )}
        {unit && (
          <>
            <span className="footer-strip__sep">·</span>
            <span>{unit}</span>
          </>
        )}
      </div>
      <div className="footer-strip__right">
        <span>zaj-design</span>
      </div>
    </>
  );
}
