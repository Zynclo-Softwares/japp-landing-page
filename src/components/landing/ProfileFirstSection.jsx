const steps = [
  {
    num: '01',
    title: 'Build your profile once.',
    desc: 'Roles, projects, links, voice. The agent owns the rest.',
    side: 'left',
  },
  {
    num: '02',
    title: 'See a job. Just say apply.',
    desc: 'The agent sees your screen. No URL, no copy-pasting — just tell it what you want.',
    side: 'right',
  },
  {
    num: '03',
    title: 'Get a tailored bundle.',
    desc: 'Resume + cover, in your template, ready to submit. Tailored to the company and role.',
    side: 'left',
  },
  {
    num: '04',
    title: 'Browser agent applies for you.',
    desc: 'An autonomous browser agent navigates the job site, fills every form field, and submits — no clicks needed from you.',
    side: 'right',
  },
  {
    num: '05',
    title: 'Application auto-logged to your tracker.',
    desc: 'The job is instantly added to your tracker with links to the job URL, the generated resume, and cover letter — so you always know what got you the interview.',
    side: 'left',
  },
];

// Road path: wide S-curves sweeping left→right→left...
// ViewBox: 0 0 800 1100
// Stop points (cx, cy) for each step node on the road
const STOPS = [
  { cx: 180, cy: 100 },
  { cx: 620, cy: 280 },
  { cx: 180, cy: 460 },
  { cx: 620, cy: 640 },
  { cx: 180, cy: 820 },
];

// The road centerline as a smooth cubic bezier through all stops
const ROAD_PATH =
  `M 180 100
   C 180 180, 620 200, 620 280
   C 620 360, 180 380, 180 460
   C 180 540, 620 560, 620 640
   C 620 720, 180 740, 180 820`;

const AMBER = 'oklch(0.852 0.199 91.936)';
const AMBER_HEX = '#F5C518';

export default function ProfileFirstSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 text-center">
          How it works
        </p>
        <h2
          className="font-black tracking-[-0.025em] text-center text-foreground mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: '1.1' }}
        >
          You focus on your profile.
          <br />
          We handle the rest.
        </h2>
        <p
          className="text-center text-foreground/60 max-w-lg mx-auto mb-16"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          Five steps — then every application runs on autopilot.
        </p>

        {/* Roadmap SVG + cards overlay */}
        <div className="relative w-full max-w-2xl mx-auto" style={{ minHeight: '900px' }}>
          {/* SVG Road */}
          <svg
            viewBox="0 0 800 920"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ top: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={AMBER_HEX} stopOpacity="0.15" />
                <stop offset="40%" stopColor={AMBER_HEX} stopOpacity="0.55" />
                <stop offset="60%" stopColor={AMBER_HEX} stopOpacity="0.55" />
                <stop offset="100%" stopColor={AMBER_HEX} stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Road outer glow */}
            <path
              d={ROAD_PATH}
              fill="none"
              stroke={AMBER_HEX}
              strokeWidth="52"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.08"
            />
            {/* Road surface */}
            <path
              d={ROAD_PATH}
              fill="none"
              stroke={AMBER_HEX}
              strokeWidth="38"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.22"
            />
            {/* Road inner (lighter tarmac) */}
            <path
              d={ROAD_PATH}
              fill="none"
              stroke={AMBER_HEX}
              strokeWidth="26"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.18"
            />
            {/* Centre dashed line */}
            <path
              d={ROAD_PATH}
              fill="none"
              stroke={AMBER_HEX}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="22 14"
              opacity="0.8"
            />

            {/* Stop dots on road */}
            {STOPS.map(({ cx, cy }, i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="20" fill="var(--card)" stroke={AMBER_HEX} strokeWidth="3" />
                <text
                  x={cx} y={cy + 6}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="900"
                  fill={AMBER_HEX}
                  fontFamily="Nunito Sans, sans-serif"
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
              </g>
            ))}
          </svg>

          {/* Cards positioned beside each stop */}
          {steps.map(({ num, title, desc, side }, i) => {
            const { cx, cy } = STOPS[i];
            // Convert SVG coords to % of viewBox (800 x 920)
            const xPct = (cx / 800) * 100;
            const yPct = (cy / 920) * 100;

            const isLeft = side === 'left';

            return (
              <div
                key={num}
                className="absolute"
                style={{
                  top: `${yPct}%`,
                  // Left cards: anchor right edge near the dot; Right cards: anchor left edge
                  ...(isLeft
                    ? { right: `${100 - xPct + 6}%`, left: '0' }
                    : { left: `${xPct + 6}%`, right: '0' }),
                  transform: 'translateY(-50%)',
                }}
              >
                <div
                  className="rounded-2xl border border-border p-5 transition-all duration-200 hover:border-[oklch(0.852_0.199_91.936_/_0.4)] relative z-10"
                  style={{
                    background: 'var(--card)',
                    boxShadow: '0 4px 24px -6px oklch(0.852 0.199 91.936 / 0.12)',
                    textAlign: isLeft ? 'right' : 'left',
                  }}
                >
                  <h3
                    className="font-bold text-foreground mb-1"
                    style={{ fontSize: '15px', lineHeight: '1.3', letterSpacing: '-0.01em' }}
                  >
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}