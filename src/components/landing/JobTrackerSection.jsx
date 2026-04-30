export default function JobTrackerSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 text-center">
          Smart job tracker
        </p>
        <h2
          className="font-black tracking-[-0.025em] text-center text-foreground mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: '1.1' }}
        >
          Not a spreadsheet.
          <br />
          A structured memory of every application.
        </h2>
        <p
          className="text-center text-foreground/60 max-w-lg mx-auto mb-14"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          Every entry, every artifact, every outcome — organized automatically.
        </p>

        {/* Illustration */}
        <div className="flex justify-center">
          <TrackerIllustration />
        </div>
      </div>
    </section>
  );
}

function TrackerIllustration() {
  const cols = [
    { label: 'Saved', color: '#94a3b8', cards: [] },
    {
      label: 'Applied',
      color: '#f59e0b',
      cards: [
        { company: 'Anthropic', role: 'Staff SWE', tags: ['LLM', 'Python'], version: 'v3', dot: '#f59e0b' },
        { company: 'Linear', role: 'Product Eng', tags: ['TypeScript', 'Design'], version: 'v4', dot: '#f59e0b' },
      ],
    },
    {
      label: 'Interviewing',
      color: '#3b82f6',
      cards: [
        { company: 'Vercel', role: 'Frontend Eng', tags: ['React', 'Next.js'], version: 'v2', dot: '#3b82f6' },
      ],
    },
    {
      label: 'Offer',
      color: '#22c55e',
      cards: [],
    },
  ];

  const cardW = 148;
  const cardH = 80;
  const colW = 168;
  const colGap = 16;
  const paddingX = 24;
  const paddingTop = 52;
  const colHeaderH = 28;
  const rowGap = 10;

  const totalW = paddingX * 2 + cols.length * colW + (cols.length - 1) * colGap;
  const maxCards = Math.max(...cols.map((c) => c.cards.length));
  const totalH = paddingTop + colHeaderH + 8 + maxCards * (cardH + rowGap) + 40;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${totalW} ${totalH}`}
      style={{ maxWidth: totalW, borderRadius: 20, overflow: 'visible' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Window chrome */}
      <rect width={totalW} height={totalH} rx="16" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
      <rect width={totalW} height="38" rx="16" fill="var(--muted)" />
      <rect y="22" width={totalW} height="16" fill="var(--muted)" />
      <circle cx="18" cy="19" r="5" fill="#f87171" opacity="0.7" />
      <circle cx="32" cy="19" r="5" fill="#fbbf24" opacity="0.7" />
      <circle cx="46" cy="19" r="5" fill="#4ade80" opacity="0.7" />
      <text x="60" y="23" fontSize="9" fill="var(--muted-foreground)" fontFamily="sans-serif" opacity="0.7">Job Tracker · Just Apply</text>

      {cols.map((col, ci) => {
        const x = paddingX + ci * (colW + colGap);
        const labelY = paddingTop + 16;
        const firstCardY = paddingTop + colHeaderH + 8;

        return (
          <g key={col.label}>
            {/* Col header dot + label */}
            <circle cx={x + 6} cy={labelY - 4} r="4" fill={col.color} opacity="0.85" />
            <text x={x + 16} y={labelY} fontSize="9.5" fontWeight="700" fill={col.color} fontFamily="sans-serif" opacity="0.9" letterSpacing="0.06em">
              {col.label.toUpperCase()}
            </text>

            {col.cards.length === 0 && (
              <rect
                x={x}
                y={firstCardY}
                width={cardW}
                height={cardH}
                rx="10"
                fill="none"
                stroke="var(--border)"
                strokeDasharray="5 4"
                opacity="0.5"
              />
            )}

            {col.cards.map((card, ri) => {
              const cy2 = firstCardY + ri * (cardH + rowGap);
              return (
                <g key={card.company}>
                  <rect x={x} y={cy2} width={cardW} height={cardH} rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
                  {/* Status dot */}
                  <circle cx={x + cardW - 12} cy={cy2 + 14} r="4" fill={card.dot} opacity="0.8" />
                  {/* Company */}
                  <text x={x + 10} y={cy2 + 16} fontSize="10" fontWeight="700" fill="var(--foreground)" fontFamily="sans-serif">{card.company}</text>
                  {/* Role */}
                  <text x={x + 10} y={cy2 + 28} fontSize="8.5" fill="var(--muted-foreground)" fontFamily="sans-serif" opacity="0.8">{card.role}</text>
                  {/* Tags */}
                  {card.tags.map((tag, ti) => (
                    <g key={tag}>
                      <rect x={x + 10 + ti * 52} y={cy2 + 36} width={48} height={14} rx="4" fill="var(--muted)" />
                      <text x={x + 10 + ti * 52 + 24} y={cy2 + 46} fontSize="7.5" fill="var(--muted-foreground)" fontFamily="sans-serif" textAnchor="middle">{tag}</text>
                    </g>
                  ))}
                  {/* Version badge */}
                  <text x={x + 10} y={cy2 + 70} fontSize="8" fill="var(--muted-foreground)" fontFamily="sans-serif" opacity="0.6">· {card.version}</text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Sparkline in bottom-right */}
      <polyline
        points={`${totalW - 80},${totalH - 18} ${totalW - 66},${totalH - 28} ${totalW - 52},${totalH - 22} ${totalW - 38},${totalH - 34} ${totalW - 24},${totalH - 26}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <text x={totalW - 90} y={totalH - 14} fontSize="8" fill="var(--muted-foreground)" fontFamily="sans-serif" opacity="0.5">response rate</text>
    </svg>
  );
}