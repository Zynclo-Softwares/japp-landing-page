import { FileSearch, Building2, Mail, LayoutDashboard, Sparkles, ClipboardCheck, BriefcaseBusiness, UserCheck, Zap, FileText } from 'lucide-react';

const chips = [
  { icon: FileSearch, label: 'JD Parser' },
  { icon: Building2, label: 'Company Research' },
  { icon: Mail, label: 'Cover Letter' },
  { icon: LayoutDashboard, label: 'Job Tracker' },
  { icon: Sparkles, label: 'AI Tailoring' },
  { icon: ClipboardCheck, label: 'Form Filler' },
  { icon: BriefcaseBusiness, label: 'Role Fit Score' },
  { icon: UserCheck, label: 'Human-in-Loop' },
  { icon: Zap, label: '20× Faster' },
  { icon: FileText, label: 'Resume Builder' },
];

// Fixed positions (left%, top%) spread across the container — kept away from edges
const positions = [
  { left: 20, top: 10 },
  { left: 55, top: 8  },
  { left: 68, top: 25 },
  { left: 70, top: 55 },
  { left: 55, top: 76 },
  { left: 28, top: 82 },
  { left: 12, top: 62 },
  { left: 14, top: 36 },
  { left: 40, top: 48 },
  { left: 42, top: 22 },
];

// Gentle float animations — alternate direction/duration per chip
const floatStyles = [
  { animation: 'floatA 5s ease-in-out infinite' },
  { animation: 'floatB 6s ease-in-out infinite' },
  { animation: 'floatA 7s ease-in-out infinite', animationDelay: '-2s' },
  { animation: 'floatB 5.5s ease-in-out infinite', animationDelay: '-1s' },
  { animation: 'floatA 6.5s ease-in-out infinite', animationDelay: '-3s' },
  { animation: 'floatB 7s ease-in-out infinite', animationDelay: '-0.5s' },
  { animation: 'floatA 5s ease-in-out infinite', animationDelay: '-4s' },
  { animation: 'floatB 6s ease-in-out infinite', animationDelay: '-2.5s' },
  { animation: 'floatA 7.5s ease-in-out infinite', animationDelay: '-1.5s' },
  { animation: 'floatB 5.5s ease-in-out infinite', animationDelay: '-3.5s' },
];

export default function HeroOrbit() {
  return (
    <>
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50%       { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50%       { transform: translate(-50%, -50%) translateY(8px); }
        }
      `}</style>

      <div
        className="relative w-full h-[420px] lg:h-[480px] overflow-hidden"
        aria-hidden="true"
      >
        {/* Amber glow blob */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, oklch(0.852 0.199 91.936 / 0.30) 0%, transparent 70%)',
            animation: 'pulse_glow 6s ease-in-out infinite',
            filter: 'blur(50px)',
          }}
        />

        {/* Floating chips */}
        {chips.map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className="absolute"
            style={{
              left: `${positions[i].left}%`,
              top: `${positions[i].top}%`,
              ...floatStyles[i],
            }}
          >
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-foreground whitespace-nowrap"
              style={{
                background: 'var(--card)',
                boxShadow: '0 2px 14px -2px oklch(0.852 0.199 91.936 / 0.18)',
              }}
            >
              <Icon size={12} style={{ color: 'var(--primary)' }} />
              {label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}