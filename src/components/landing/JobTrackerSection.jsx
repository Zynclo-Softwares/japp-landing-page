export default function JobTrackerSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
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

        <div className="flex justify-center">
          <DashboardIllustration />
        </div>
      </div>
    </section>
  );
}

function DashboardIllustration() {
  const W = 860;
  const H = 480;
  const bg = '#111111';
  const card = '#1c1c1c';
  const border = '#2a2a2a';
  const amber = '#f59e0b';
  const blue = '#3b82f6';
  const green = '#22c55e';
  const textPrimary = '#f1f5f9';
  const textMuted = '#64748b';
  const textSub = '#94a3b8';

  // Donut arc helper
  const donut = (cx, cy, r, pct, stroke, strokeWidth) => {
    const circ = 2 * Math.PI * r;
    return (
      <>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={border} strokeWidth={strokeWidth} />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circ * pct} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </>
    );
  };

  const jobCards = [
    { col: 0, company: 'Anthropic', role: 'Staff Software Eng.', tags: ['LLM', 'Python'], date: 'Apr 28, 2026', color: amber },
    { col: 0, company: 'Figma', role: 'Product Engineer', tags: ['React', 'TypeScript'], date: 'Apr 27, 2026', color: amber },
    { col: 1, company: 'Vercel', role: 'Frontend Engineer', tags: ['Next.js', 'Edge'], date: 'Apr 26, 2026', color: blue },
    { col: 1, company: 'Linear', role: 'Product Eng.', tags: ['TypeScript', 'Design'], date: 'Apr 25, 2026', color: blue },
    { col: 2, company: 'Stripe', role: 'Backend Engineer', tags: ['Go', 'Distributed'], date: 'Apr 20, 2026', color: green },
  ];

  const cols = [
    { label: 'Applied', count: 2, color: amber, x: 12 },
    { label: 'Interview', count: 2, color: blue, x: 210 },
    { label: 'Offer', count: 1, color: green, x: 408 },
  ];

  const colW = 192;
  const cardH = 88;
  const cardGap = 8;

  // Bar chart data
  const bars = [
    { label: 'Apr', h: 52, color: blue },
    { label: 'May', h: 36, color: amber },
    { label: 'Jun', h: 16, color: green },
  ];

  // Sparkline points
  const spk = [0,2,1,4,3,7,5,10].map((v, i) => `${606 + i * 22},${448 - v * 3.5}`).join(' ');

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{ maxWidth: W, borderRadius: 20, display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width={W} height={H} rx="16" fill={bg} />

      {/* ── LEFT: stat cards row ── */}
      {[
        { label: 'APPLICATIONS', val: '10', sub: 'Last 30 days', delta: '+12.5%', color: amber, x: 12 },
        { label: 'INTERVIEWS', val: '5', sub: 'Out of 10 sent', delta: '+20%', color: blue, x: 212 },
        { label: 'OFFERS', val: '2', sub: 'First offer secured', delta: '+100%', color: green, x: 412 },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x} y={12} width={188} height={78} rx="12" fill={card} stroke={border} strokeWidth="1" />
          <text x={s.x + 12} y={30} fontSize="8" fontWeight="700" fill={textMuted} fontFamily="sans-serif" letterSpacing="0.08em">{s.label}</text>
          <text x={s.x + 12} y={55} fontSize="28" fontWeight="900" fill={textPrimary} fontFamily="sans-serif">{s.val}</text>
          <text x={s.x + 12} y={70} fontSize="8.5" fill={textMuted} fontFamily="sans-serif">{s.sub}</text>
          {/* delta badge */}
          <rect x={s.x + 148} y={20} width={34} height={16} rx="6" fill={s.color} opacity="0.15" />
          <text x={s.x + 165} y={31} fontSize="8" fontWeight="700" fill={s.color} fontFamily="sans-serif" textAnchor="middle">{s.delta}</text>
        </g>
      ))}

      {/* ── LEFT: pipeline label ── */}
      <text x={14} y={110} fontSize="11" fontWeight="800" fill={textPrimary} fontFamily="sans-serif">Pipeline</text>
      <text x={14} y={124} fontSize="8.5" fill={textMuted} fontFamily="sans-serif">Drag cards between columns to update their stage.</text>

      {/* ── Kanban columns ── */}
      {cols.map((col) => (
        <g key={col.label}>
          {/* Col bg */}
          <rect x={col.x} y={132} width={colW} height={H - 144} rx="12" fill={card} stroke={border} strokeWidth="1" />
          {/* Col header */}
          <circle cx={col.x + 14} cy={148} r="4" fill={col.color} />
          <text x={col.x + 24} y={152} fontSize="9.5" fontWeight="700" fill={col.color} fontFamily="sans-serif" letterSpacing="0.05em">{col.label.toUpperCase()}</text>
          <text x={col.x + colW - 20} y={152} fontSize="9.5" fontWeight="700" fill={textMuted} fontFamily="sans-serif">{col.count}</text>
        </g>
      ))}

      {/* Job cards */}
      {(() => {
        const colCounters = [0, 0, 0];
        return jobCards.map((c, i) => {
          const colDef = cols[c.col];
          const cardX = colDef.x + 8;
          const cardY = 164 + colCounters[c.col] * (cardH + cardGap);
          colCounters[c.col]++;
          return (
            <g key={i}>
              <rect x={cardX} y={cardY} width={colW - 16} height={cardH} rx="10" fill="#242424" stroke={border} strokeWidth="1" />
              {/* accent bar */}
              <rect x={cardX} y={cardY} width="3" height={cardH} rx="2" fill={c.color} />
              {/* company */}
              <text x={cardX + 12} y={cardY + 18} fontSize="10" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">{c.company}</text>
              {/* role */}
              <text x={cardX + 12} y={cardY + 31} fontSize="8.5" fill={textSub} fontFamily="sans-serif">{c.role}</text>
              {/* date */}
              <text x={cardX + 12} y={cardY + 46} fontSize="7.5" fill={textMuted} fontFamily="sans-serif">{c.date}</text>
              {/* tags */}
              {c.tags.map((tag, ti) => (
                <g key={tag}>
                  <rect x={cardX + 12 + ti * 54} y={cardY + 54} width={50} height={14} rx="5" fill="#333" />
                  <text x={cardX + 12 + ti * 54 + 25} y={cardY + 64} fontSize="7.5" fill={textSub} fontFamily="sans-serif" textAnchor="middle">{tag}</text>
                </g>
              ))}
            </g>
          );
        });
      })()}

      {/* ── RIGHT panel ── */}
      <rect x={614} y={12} width={234} height={H - 24} rx="14" fill={card} stroke={border} strokeWidth="1" />

      {/* Response rate donut */}
      <text x={628} y={32} fontSize="8" fontWeight="700" fill={textMuted} fontFamily="sans-serif" letterSpacing="0.08em">RESPONSE RATE</text>
      <text x={628} y={46} fontSize="10" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">Applications with activity</text>
      {donut(700, 112, 38, 0.5, amber, 10)}
      <text x={700} y={117} fontSize="16" fontWeight="900" fill={textPrimary} fontFamily="sans-serif" textAnchor="middle">50%</text>
      <text x={700} y={128} fontSize="7.5" fill={textMuted} fontFamily="sans-serif" textAnchor="middle">rate</text>
      {/* legend */}
      <circle cx={752} cy={100} r="4" fill={amber} />
      <text x={760} y={104} fontSize="8" fill={textSub} fontFamily="sans-serif">Responded  5 · 50%</text>
      <circle cx={752} cy={116} r="4" fill={border} stroke={textMuted} strokeWidth="1" />
      <text x={760} y={120} fontSize="8" fill={textSub} fontFamily="sans-serif">No response  5 · 50%</text>

      {/* Divider */}
      <line x1={628} y1={158} x2={834} y2={158} stroke={border} strokeWidth="1" />

      {/* Pipeline by month bar chart */}
      <text x={628} y={176} fontSize="8" fontWeight="700" fill={textMuted} fontFamily="sans-serif" letterSpacing="0.08em">PIPELINE BY MONTH</text>
      <text x={628} y={190} fontSize="10" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">April 2026</text>
      {bars.map((b, i) => (
        <g key={b.label}>
          <rect x={644 + i * 56} y={250 - b.h} width={36} height={b.h} rx="6" fill={b.color} opacity="0.85" />
          <text x={662 + i * 56} y={262} fontSize="8" fill={textMuted} fontFamily="sans-serif" textAnchor="middle">{b.label}</text>
        </g>
      ))}

      {/* Divider */}
      <line x1={628} y1={276} x2={834} y2={276} stroke={border} strokeWidth="1" />

      {/* Daily growth sparkline */}
      <text x={628} y={294} fontSize="8" fontWeight="700" fill={textMuted} fontFamily="sans-serif" letterSpacing="0.08em">DAILY GROWTH</text>
      <text x={628} y={308} fontSize="10" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">10 applications this month</text>
      <polyline points={spk} fill="none" stroke={amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* fill under sparkline */}
      <polyline points={`606,460 ${spk} 782,460`} fill={amber} opacity="0.07" stroke="none" />
      <text x={606} y={470} fontSize="7.5" fill={textMuted} fontFamily="sans-serif">Day 1</text>
      <text x={686} y={470} fontSize="7.5" fill={textMuted} fontFamily="sans-serif">Day 15</text>
      <text x={762} y={470} fontSize="7.5" fill={textMuted} fontFamily="sans-serif">Day 30</text>
    </svg>
  );
}