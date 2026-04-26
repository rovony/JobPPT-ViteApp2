import React from 'react';

/**
 * AgencyStamp — pseudo passport-stamp SVG. Used on the "four agencies" hook
 * to signal approved vs. no-submission with an editorial aesthetic.
 *
 * Props:
 *  - agency: short name (e.g. "EMA")
 *  - verdict: short verdict (e.g. "APPROVED", "NO FILING")
 *  - date: subhead
 *  - status: 'approved' | 'ghost'
 *  - tilt: degrees
 */
export default function AgencyStamp({
  agency,
  verdict,
  date,
  status = 'approved',
  tilt = 0,
  size = 160,
}) {
  const approved = status === 'approved';
  const color = approved ? 'hsl(var(--deck-accent))' : 'hsl(var(--deck-ink-subtle))';
  const opacity = approved ? 1 : 0.55;
  const arcId = `arc-${agency}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${tilt}deg)`,
        opacity,
        filter: approved ? 'drop-shadow(var(--shadow-md))' : 'none',
      }}
    >
      <svg viewBox="0 0 180 180" width={size} height={size}>
        <defs>
          <path id={arcId} d="M 42,90 A 48,48 0 0 1 138,90" />
        </defs>
        <circle cx="90" cy="90" r="78" fill="none" stroke={color} strokeWidth="2.2" />
        <circle
          cx="90" cy="90" r="62"
          fill="none" stroke={color} strokeWidth="0.9"
          opacity="0.55"
          strokeDasharray={approved ? undefined : '3 5'}
        />
        <text
          fill={color}
          fontFamily="var(--deck-font-mono)"
          fontSize="8" letterSpacing="0.12em" fontWeight="700"
        >
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            {agency}
          </textPath>
        </text>
        <rect x="22" y="94" width="136" height="20" fill={color} opacity={approved ? 0.16 : 0.08} />
        <text
          x="90" y="107" textAnchor="middle"
          fill={color} fontFamily="var(--deck-font-mono)"
          fontSize="10" letterSpacing="0.24em" fontWeight="700"
        >
          {verdict}
        </text>
        {date && (
          <text
            x="90" y="130" textAnchor="middle"
            fill="hsl(var(--deck-ink-muted))" fontFamily="var(--deck-font-mono)"
            fontSize="7.5" letterSpacing="0.2em"
          >
            {date}
          </text>
        )}
      </svg>
    </div>
  );
}