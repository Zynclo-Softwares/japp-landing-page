import { motion } from 'framer-motion';

const boards = [
  'LinkedIn',
  'Wellfound',
  'Lever',
  'Greenhouse',
  'Workday',
  'That weird Notion page some founder posted on Twitter',
];

// Dot positions on the globe (cx, cy as % of 400x400 viewBox)
const globeDots = [
  { x: 200, y: 200 }, // center
  { x: 120, y: 140 }, { x: 280, y: 130 }, { x: 310, y: 200 },
  { x: 260, y: 270 }, { x: 140, y: 260 }, { x: 90,  y: 200 },
  { x: 200, y: 110 }, { x: 200, y: 290 },
  { x: 160, y: 175 }, { x: 240, y: 175 }, { x: 170, y: 235 }, { x: 230, y: 235 },
];

// Nodes orbiting around globe
const orbitNodes = [
  { label: 'LinkedIn',   angle: 0,   r: 170 },
  { label: 'Greenhouse', angle: 60,  r: 175 },
  { label: 'Lever',      angle: 120, r: 168 },
  { label: 'Workday',    angle: 180, r: 172 },
  { label: 'Wellfound',  angle: 240, r: 170 },
  { label: 'Notion job', angle: 300, r: 173 },
];

function toXY(angle, r, cx = 200, cy = 200) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function GlobeIllustration() {
  return (
    <div className="relative w-full flex items-center justify-center py-4">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, oklch(0.852 0.199 91.936 / 0.13) 0%, transparent 65%)' }}
      />
      <svg viewBox="0 0 400 400" className="w-full max-w-lg" style={{ overflow: 'visible' }}>
        {/* Globe base */}
        <defs>
          <radialGradient id="globeGrad" cx="42%" cy="38%" r="60%">
            <stop offset="0%" stopColor="oklch(0.852 0.199 91.936)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0.852 0.199 91.936)" stopOpacity="0.04" />
          </radialGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.852 0.199 91.936)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.852 0.199 91.936)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Globe circle */}
        <circle cx="200" cy="200" r="95" fill="url(#globeGrad)" stroke="oklch(0.852 0.199 91.936)" strokeWidth="1" strokeOpacity="0.3" />

        {/* Latitude lines */}
        {[-40, -15, 10, 35, 60].map((offset, i) => (
          <ellipse key={i} cx="200" cy={200 + offset} rx="95" ry={Math.abs(offset) < 20 ? 28 : Math.abs(offset) < 40 ? 18 : 8}
            fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="0.6" strokeOpacity="0.2" />
        ))}
        {/* Longitude lines */}
        {[0, 30, 60, 90, 120, 150].map((angle, i) => (
          <ellipse key={i} cx="200" cy="200" rx={Math.abs(Math.cos(angle * Math.PI / 180)) * 95 + 4} ry="95"
            fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="0.6" strokeOpacity="0.15"
            transform={`rotate(${angle} 200 200)`} />
        ))}

        {/* Connection lines from center to orbit nodes */}
        {orbitNodes.map((node, i) => {
          const pos = toXY(node.angle, node.r);
          const edgePos = toXY(node.angle, 96);
          return (
            <motion.line key={i}
              x1={edgePos.x} y1={edgePos.y} x2={pos.x} y2={pos.y}
              stroke="oklch(0.852 0.199 91.936)" strokeWidth="1" strokeOpacity="0.4"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
            />
          );
        })}

        {/* Pulsing dots on globe */}
        {globeDots.map((dot, i) => (
          <motion.circle key={i} cx={dot.x} cy={dot.y} r="2.5"
            fill="oklch(0.852 0.199 91.936)"
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 2 + (i % 3) * 0.5, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Center cursor dot */}
        <motion.circle cx="200" cy="200" r="10" fill="url(#glowGrad)"
          animate={{ r: [10, 14, 10], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="200" cy="200" r="4" fill="oklch(0.852 0.199 91.936)" />

        {/* Orbit node chips */}
        {orbitNodes.map((node, i) => {
          const pos = toXY(node.angle, node.r);
          const isLeft = pos.x < 200;
          return (
            <motion.g key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
            >
              <motion.g
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                <rect
                  x={isLeft ? pos.x - 62 : pos.x - 6}
                  y={pos.y - 12}
                  width={68} height={24} rx={12}
                  fill="var(--card)" stroke="oklch(0.852 0.199 91.936)" strokeWidth="1" strokeOpacity="0.4"
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.10))' }}
                />
                <text
                  x={isLeft ? pos.x - 28 : pos.x + 28}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fontSize="8" fontWeight="700"
                  fill="oklch(0.852 0.199 91.936)"
                  fontFamily="Nunito Sans, sans-serif"
                >
                  {node.label}
                </text>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

export default function ApplyAnywhereSection() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4">
          Apply anywhere on the internet
        </p>
        <h2
          className="font-black tracking-[-0.03em] text-foreground mb-6"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: '1.05' }}
        >
          No job-board lock-in.
          <br />
          No API limits.
        </h2>
        <p
          className="text-foreground/60 max-w-xl mx-auto mb-12"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          If a human can apply, Just Apply can apply.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {boards.map((board) => (
            <span
              key={board}
              className="px-4 py-2 rounded-full border border-border text-sm font-semibold text-foreground/70 transition-all duration-200 hover:text-foreground"
              style={{ background: 'var(--card)' }}
            >
              {board}
            </span>
          ))}
        </div>

        <GlobeIllustration />
      </div>
    </section>
  );
}