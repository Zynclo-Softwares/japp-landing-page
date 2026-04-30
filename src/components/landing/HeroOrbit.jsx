import { FileSearch, Building2, Mail, LayoutDashboard } from 'lucide-react';

const chips = [
  { icon: FileSearch, label: 'JD Parser', delay: '0s', angle: 0 },
  { icon: Building2, label: 'Company Research', delay: '-15s', angle: 90 },
  { icon: Mail, label: 'Cover Letter', delay: '-30s', angle: 180 },
  { icon: LayoutDashboard, label: 'Job Tracker', delay: '-45s', angle: 270 },
];

export default function HeroOrbit() {
  return (
    <div className="relative flex items-center justify-center w-full h-[420px] lg:h-[480px]" aria-hidden="true">
      {/* Amber glow blob */}
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.852 0.199 91.936 / 0.35) 0%, transparent 70%)',
          animation: 'pulse_glow 6s ease-in-out infinite',
          filter: 'blur(40px)',
        }}
      />

      {/* Center card */}
      <div
        className="relative z-10 w-52 rounded-2xl p-5 border border-border"
        style={{
          background: 'var(--card)',
          boxShadow: '0 8px 40px -8px oklch(0.852 0.199 91.936 / 0.3), 0 1px 0 0 var(--border)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            J
          </div>
          <span className="text-xs font-bold text-foreground">Tailored Resume</span>
        </div>
        <div className="space-y-1.5">
          {['Software Engineer · Anthropic', 'Experience', 'Skills', 'Projects'].map((line, i) => (
            <div
              key={line}
              className="h-2 rounded-full"
              style={{
                background: i === 0 ? 'var(--primary)' : 'oklch(var(--muted))',
                width: i === 0 ? '100%' : `${70 - i * 10}%`,
                opacity: i === 0 ? 1 : 0.6,
              }}
            />
          ))}
          <div className="mt-3 space-y-1">
            {[85, 65, 75, 55].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-border" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-medium">v3 · Full bundle</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            Ready
          </span>
        </div>
      </div>

      {/* Orbiting chips — desktop */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden">
        {chips.map(({ icon: Icon, label, delay, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 32 * Math.cos(rad);
          const y = 50 + 30 * Math.sin(rad);
          return (
            <div
              key={label}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                animation: `orbit 60s linear infinite`,
                animationDelay: delay,
              }}
            >
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-foreground whitespace-nowrap"
                style={{
                  background: 'var(--card)',
                  boxShadow: '0 2px 12px -2px oklch(0.852 0.199 91.936 / 0.15)',
                  animation: `orbit 60s linear infinite reverse`,
                  animationDelay: delay,
                }}
              >
                <Icon size={12} style={{ color: 'var(--primary)' }} />
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Static chip grid — mobile */}
      <div className="lg:hidden absolute bottom-4 left-0 right-0 grid grid-cols-2 gap-2 px-4">
        {chips.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-semibold text-foreground"
            style={{ background: 'var(--card)' }}
          >
            <Icon size={12} style={{ color: 'var(--primary)' }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}