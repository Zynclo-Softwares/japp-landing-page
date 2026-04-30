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
  const H = 520;
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

  // Bar chart data
  const bars = [
    { label: 'Apr', h: 52, color: blue },
    { label: 'May', h: 36, color: amber },
    { label: 'Jun', h: 16, color: green },
  ];

  // Sparkline
  const spkPts = [0,2,1,4,3,7,5,10];
  const spk = spkPts.map((v, i) => `${622 + i * 24},${460 - v * 3.8}`).join(' ');
  const spkFill = `622,468 ${spk} ${622 + (spkPts.length-1)*24},468`;

  // Compact cards for Interview + Offer cols
  const compactCards = [
    { col: 1, company: 'Vercel', role: 'Frontend Engineer', tags: ['Next.js', 'Edge'], date: 'Apr 26', color: blue },
    { col: 1, company: 'Linear', role: 'Product Eng.', tags: ['TypeScript', 'Design'], date: 'Apr 25', color: blue },
    { col: 2, company: 'Stripe', role: 'Backend Engineer', tags: ['Go', 'Distributed'], date: 'Apr 20', color: green },
  ];

  const colDefs = [
    { label: 'Applied', count: 2, color: amber, x: 12 },
    { label: 'Interview', count: 2, color: blue, x: 218 },
    { label: 'Offer', count: 1, color: green, x: 424 },
  ];
  const colW = 196;
  const compactH = 76;
  const cardGap = 8;

  // Expanded card (first in Applied)
  const expX = 12 + 8;
  const expY = 172;
  const expW = colW - 16;
  const expH = 296;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{ maxWidth: W, borderRadius: 20, display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width={W} height={H} rx="16" fill={bg} />

      {/* ── Stat cards row ── */}
      {[
        { label: 'APPLICATIONS', val: '10', sub: 'Last 30 days', delta: '+12.5%', color: amber, x: 12 },
        { label: 'INTERVIEWS', val: '5', sub: 'Out of 10 sent', delta: '+20%', color: blue, x: 218 },
        { label: 'OFFERS', val: '2', sub: 'First offer secured', delta: '+100%', color: green, x: 424 },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x} y={12} width={192} height={76} rx="12" fill={card} stroke={border} strokeWidth="1" />
          <text x={s.x + 12} y={30} fontSize="7.5" fontWeight="700" fill={textMuted} fontFamily="sans-serif" letterSpacing="0.08em">{s.label}</text>
          <text x={s.x + 12} y={56} fontSize="26" fontWeight="900" fill={textPrimary} fontFamily="sans-serif">{s.val}</text>
          <text x={s.x + 12} y={70} fontSize="8" fill={textMuted} fontFamily="sans-serif">{s.sub}</text>
          <rect x={s.x + 148} y={20} width={38} height={16} rx="6" fill={s.color} opacity="0.15" />
          <text x={s.x + 167} y={31} fontSize="8" fontWeight="700" fill={s.color} fontFamily="sans-serif" textAnchor="middle">{s.delta}</text>
        </g>
      ))}

      {/* Pipeline label */}
      <text x={14} y={108} fontSize="11" fontWeight="800" fill={textPrimary} fontFamily="sans-serif">Pipeline</text>
      <text x={14} y={122} fontSize="8" fill={textMuted} fontFamily="sans-serif">Drag cards between columns to update their stage.</text>

      {/* Column backgrounds */}
      {colDefs.map((col) => (
        <g key={col.label}>
          <rect x={col.x} y={130} width={colW} height={H - 142} rx="12" fill={card} stroke={border} strokeWidth="1" />
          <circle cx={col.x + 14} cy={148} r="4" fill={col.color} />
          <text x={col.x + 24} y={152} fontSize="9" fontWeight="700" fill={col.color} fontFamily="sans-serif" letterSpacing="0.05em">{col.label.toUpperCase()}</text>
          <text x={col.x + colW - 22} y={152} fontSize="9" fontWeight="700" fill={textMuted} fontFamily="sans-serif">{col.count}</text>
        </g>
      ))}

      {/* ── EXPANDED card (Anthropic, Applied col) ── */}
      <rect x={expX} y={expY} width={expW} height={expH} rx="10" fill="#202020" stroke={border} strokeWidth="1" />
      {/* amber left bar */}
      <rect x={expX} y={expY} width="3" height={expH} rx="2" fill={amber} />

      {/* Avatar */}
      <rect x={expX + 12} y={expY + 14} width={32} height={32} rx="8" fill="#2e2e2e" />
      <text x={expX + 28} y={expY + 35} fontSize="9" fontWeight="700" fill={textSub} fontFamily="sans-serif" textAnchor="middle">AN</text>

      {/* Company + role */}
      <text x={expX + 52} y={expY + 27} fontSize="10.5" fontWeight="800" fill={textPrimary} fontFamily="sans-serif">Anthropic</text>
      <text x={expX + 52} y={expY + 40} fontSize="8.5" fill={textSub} fontFamily="sans-serif">Staff Software Eng.</text>

      {/* Meta row */}
      <text x={expX + 12} y={expY + 66} fontSize="8" fill={textMuted} fontFamily="sans-serif">📅 Apr 28, 2026  ·  📍 Remote</text>
      <text x={expX + 12} y={expY + 80} fontSize="8" fill={textMuted} fontFamily="sans-serif">💰 $180k – $240k / yr</text>

      {/* Tags */}
      {['LLM', 'Python', 'Distributed'].map((tag, ti) => (
        <g key={tag}>
          <rect x={expX + 12 + ti * 52} y={expY + 90} width={48} height={15} rx="6" fill="#2e2e2e" />
          <text x={expX + 12 + ti * 52 + 24} y={expY + 101} fontSize="7.5" fill={textSub} fontFamily="sans-serif" textAnchor="middle">{tag}</text>
        </g>
      ))}

      {/* Requirements header */}
      <text x={expX + 12} y={expY + 126} fontSize="9" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">Requirements</text>
      <rect x={expX + 90} y={expY + 116} width={18} height={14} rx="5" fill="#2e2e2e" />
      <text x={expX + 99} y={expY + 126} fontSize="8" fill={textSub} fontFamily="sans-serif" textAnchor="middle">3</text>
      {/* caret */}
      <text x={expW - 4} y={expY + 126} fontSize="9" fill={textMuted} fontFamily="sans-serif" textAnchor="end">∧</text>

      {/* Divider */}
      <line x1={expX + 10} y1={expY + 134} x2={expX + expW - 10} y2={expY + 134} stroke={border} strokeWidth="1" />

      {/* Requirement bullets */}
      {[
        "Bachelor's in CS or related field",
        "LLM fine-tuning & RLHF experience",
        "Python, PyTorch or JAX",
      ].map((req, ri) => (
        <g key={ri}>
          <circle cx={expX + 18} cy={expY + 152 + ri * 26} r="3" fill={amber} />
          <text x={expX + 28} y={expY + 156 + ri * 26} fontSize="8" fill={textSub} fontFamily="sans-serif">{req}</text>
        </g>
      ))}

      {/* Source */}
      <text x={expX + 12} y={expY + 234} fontSize="8" fill={textMuted} fontFamily="sans-serif">Source · <tspan fontWeight="700" fill={textSub}>LinkedIn</tspan></text>

      {/* Artifact buttons */}
      {['Job link', 'Resume', 'Cover'].map((btn, bi) => (
        <g key={btn}>
          <rect
            x={expX + 12 + (bi % 2) * 80}
            y={expY + 244 + Math.floor(bi / 2) * 26}
            width={72} height={20} rx="8"
            fill="#2a2a2a" stroke={border} strokeWidth="1"
          />
          <text
            x={expX + 12 + (bi % 2) * 80 + 36}
            y={expY + 258 + Math.floor(bi / 2) * 26}
            fontSize="8" fill={textSub} fontFamily="sans-serif" textAnchor="middle"
          >{btn} ⧉</text>
        </g>
      ))}

      {/* Second compact card in Applied */}
      {(() => {
        const cx2 = 12 + 8;
        const cy2 = expY + expH + cardGap;
        const cw = colW - 16;
        return (
          <g>
            <rect x={cx2} y={cy2} width={cw} height={compactH} rx="10" fill="#202020" stroke={border} strokeWidth="1" />
            <rect x={cx2} y={cy2} width="3" height={compactH} rx="2" fill={amber} />
            <text x={cx2 + 12} y={cy2 + 18} fontSize="10" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">Figma</text>
            <text x={cx2 + 12} y={cy2 + 31} fontSize="8.5" fill={textSub} fontFamily="sans-serif">Product Engineer</text>
            <text x={cx2 + 12} y={cy2 + 44} fontSize="7.5" fill={textMuted} fontFamily="sans-serif">Apr 27, 2026</text>
            {['React', 'TypeScript'].map((tag, ti) => (
              <g key={tag}>
                <rect x={cx2 + 12 + ti * 54} y={cy2 + 52} width={50} height={14} rx="5" fill="#2e2e2e" />
                <text x={cx2 + 12 + ti * 54 + 25} y={cy2 + 62} fontSize="7.5" fill={textSub} fontFamily="sans-serif" textAnchor="middle">{tag}</text>
              </g>
            ))}
          </g>
        );
      })()}

      {/* Compact cards for Interview + Offer */}
      {(() => {
        const counters = [0, 0, 0];
        return compactCards.map((c, i) => {
          const colDef = colDefs[c.col];
          const cardX = colDef.x + 8;
          const cardY = 162 + counters[c.col] * (compactH + cardGap);
          counters[c.col]++;
          return (
            <g key={i}>
              <rect x={cardX} y={cardY} width={colW - 16} height={compactH} rx="10" fill="#202020" stroke={border} strokeWidth="1" />
              <rect x={cardX} y={cardY} width="3" height={compactH} rx="2" fill={c.color} />
              <text x={cardX + 12} y={cardY + 18} fontSize="10" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">{c.company}</text>
              <text x={cardX + 12} y={cardY + 31} fontSize="8.5" fill={textSub} fontFamily="sans-serif">{c.role}</text>
              <text x={cardX + 12} y={cardY + 44} fontSize="7.5" fill={textMuted} fontFamily="sans-serif">{c.date}</text>
              {c.tags.map((tag, ti) => (
                <g key={tag}>
                  <rect x={cardX + 12 + ti * 54} y={cardY + 52} width={50} height={14} rx="5" fill="#2e2e2e" />
                  <text x={cardX + 12 + ti * 54 + 25} y={cardY + 62} fontSize="7.5" fill={textSub} fontFamily="sans-serif" textAnchor="middle">{tag}</text>
                </g>
              ))}
            </g>
          );
        });
      })()}

      {/* ── RIGHT panel ── */}
      <rect x={630} y={12} width={218} height={H - 24} rx="14" fill={card} stroke={border} strokeWidth="1" />

      {/* Response rate donut */}
      <text x={644} y={32} fontSize="7.5" fontWeight="700" fill={textMuted} fontFamily="sans-serif" letterSpacing="0.08em">RESPONSE RATE</text>
      <text x={644} y={46} fontSize="9.5" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">Applications with activity</text>
      {donut(693, 110, 36, 0.5, amber, 9)}
      <text x={693} y={115} fontSize="15" fontWeight="900" fill={textPrimary} fontFamily="sans-serif" textAnchor="middle">50%</text>
      <text x={693} y={126} fontSize="7" fill={textMuted} fontFamily="sans-serif" textAnchor="middle">rate</text>
      <circle cx={738} cy={98} r="4" fill={amber} />
      <text x={746} y={102} fontSize="7.5" fill={textSub} fontFamily="sans-serif">Responded  50%</text>
      <circle cx={738} cy={112} r="4" fill={border} stroke={textMuted} strokeWidth="1" />
      <text x={746} y={116} fontSize="7.5" fill={textSub} fontFamily="sans-serif">No response  50%</text>

      <line x1={644} y1={152} x2={834} y2={152} stroke={border} strokeWidth="1" />

      {/* Bar chart */}
      <text x={644} y={170} fontSize="7.5" fontWeight="700" fill={textMuted} fontFamily="sans-serif" letterSpacing="0.08em">PIPELINE BY MONTH</text>
      <text x={644} y={184} fontSize="9.5" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">April 2026</text>
      {bars.map((b, i) => (
        <g key={b.label}>
          <rect x={656 + i * 52} y={244 - b.h} width={34} height={b.h} rx="6" fill={b.color} opacity="0.85" />
          <text x={673 + i * 52} y={256} fontSize="7.5" fill={textMuted} fontFamily="sans-serif" textAnchor="middle">{b.label}</text>
        </g>
      ))}

      <line x1={644} y1={268} x2={834} y2={268} stroke={border} strokeWidth="1" />

      {/* Sparkline */}
      <text x={644} y={286} fontSize="7.5" fontWeight="700" fill={textMuted} fontFamily="sans-serif" letterSpacing="0.08em">DAILY GROWTH</text>
      <text x={644} y={300} fontSize="9.5" fontWeight="700" fill={textPrimary} fontFamily="sans-serif">10 applications this month</text>
      <polygon points={spkFill} fill={amber} opacity="0.08" />
      <polyline points={spk} fill="none" stroke={amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x={622} y={478} fontSize="7.5" fill={textMuted} fontFamily="sans-serif">Day 1</text>
      <text x={698} y={478} fontSize="7.5" fill={textMuted} fontFamily="sans-serif">Day 15</text>
      <text x={768} y={478} fontSize="7.5" fill={textMuted} fontFamily="sans-serif">Day 30</text>
    </svg>
  );
}