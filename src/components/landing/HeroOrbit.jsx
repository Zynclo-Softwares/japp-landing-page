import { useRef, useEffect } from 'react';
import { FileSearch, Building2, Mail, LayoutDashboard, Sparkles, ClipboardCheck, BriefcaseBusiness, UserCheck, Zap, FileText } from 'lucide-react';
import { createRoot } from 'react-dom/client';

const chips = [
  { icon: FileSearch,        label: 'JD Parser' },
  { icon: Building2,         label: 'Company Research' },
  { icon: Mail,              label: 'Cover Letter' },
  { icon: LayoutDashboard,   label: 'Job Tracker' },
  { icon: Sparkles,          label: 'AI Tailoring' },
  { icon: ClipboardCheck,    label: 'Form Filler' },
  { icon: BriefcaseBusiness, label: 'Role Fit Score' },
  { icon: UserCheck,         label: 'Human-in-Loop' },
  { icon: Zap,               label: '20× Faster' },
  { icon: FileText,          label: 'Resume Builder' },
];

// Only the 5 most important chips shown on mobile/tablet, positioned on the right
const mobileChips = [
  { icon: Zap,               label: '20× Faster',       top: '10%' },
  { icon: Sparkles,          label: 'AI Tailoring',      top: '27%' },
  { icon: Mail,              label: 'Cover Letter',      top: '44%' },
  { icon: Building2,         label: 'Company Research',  top: '61%' },
  { icon: FileText,          label: 'Resume Builder',    top: '78%' },
];

const BASE_POS = [
  { x: 0.20, y: 0.10 },
  { x: 0.55, y: 0.08 },
  { x: 0.68, y: 0.25 },
  { x: 0.70, y: 0.55 },
  { x: 0.55, y: 0.76 },
  { x: 0.28, y: 0.82 },
  { x: 0.12, y: 0.62 },
  { x: 0.14, y: 0.36 },
  { x: 0.40, y: 0.48 },
  { x: 0.42, y: 0.22 },
];

const FLOAT = [
  { amp: 10, dur: 5000, phase: 0 },
  { amp: 8,  dur: 6000, phase: 1000 },
  { amp: 10, dur: 7000, phase: 2000 },
  { amp: 9,  dur: 5500, phase: 500 },
  { amp: 8,  dur: 6500, phase: 3000 },
  { amp: 10, dur: 7000, phase: 500 },
  { amp: 9,  dur: 5000, phase: 4000 },
  { amp: 8,  dur: 6000, phase: 2500 },
  { amp: 10, dur: 7500, phase: 1500 },
  { amp: 9,  dur: 5500, phase: 3500 },
];

const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 90;
const SPRING = 0.08;
const DAMPING = 0.75;

function ChipEl({ icon: Icon, label }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-foreground whitespace-nowrap select-none"
      style={{
        background: 'var(--card)',
        boxShadow: '0 2px 14px -2px oklch(0.852 0.199 91.936 / 0.18)',
      }}
    >
      <Icon size={12} style={{ color: 'var(--primary)' }} />
      {label}
    </div>
  );
}

export default function HeroOrbit({ mobileOnly = false }) {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const state = useRef(chips.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 })));
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(null);
  const start = useRef(performance.now());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Init positions
    const { width, height } = container.getBoundingClientRect();
    chips.forEach((_, i) => {
      state.current[i].x = BASE_POS[i].x * width;
      state.current[i].y = BASE_POS[i].y * height;
    });

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave, { passive: true });

    const loop = () => {
      const { width, height } = container.getBoundingClientRect();
      const now = performance.now() - start.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      chips.forEach((_, i) => {
        const s = state.current[i];
        const f = FLOAT[i];
        const floatY = Math.sin((now + f.phase) / f.dur * Math.PI * 2) * f.amp;

        const targetX = BASE_POS[i].x * width;
        const targetY = BASE_POS[i].y * height + floatY;

        // Repel force
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let rx = 0, ry = 0;
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          rx = (dx / dist) * force;
          ry = (dy / dist) * force;
        }

        // Spring toward target + repel
        s.vx = (s.vx + (targetX + rx - s.x) * SPRING) * DAMPING;
        s.vy = (s.vy + (targetY + ry - s.y) * SPRING) * DAMPING;
        s.x += s.vx;
        s.y += s.vy;

        const el = nodeRefs.current[i];
        if (el) el.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%)`;
      });

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf.current);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Mobile-only chips (rendered by HeroSection inline) */}
      {mobileOnly ? (
        <div className="flex flex-col items-end gap-3" aria-hidden="true">
          {mobileChips.map(({ icon: Icon, label }) => (
            <ChipEl key={label} icon={Icon} label={label} />
          ))}
        </div>
      ) : (
        /* Desktop: full animated canvas */
        <div
          ref={containerRef}
          className="relative w-full h-[420px] lg:h-[480px] overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, oklch(0.852 0.199 91.936 / 0.28) 0%, transparent 70%)',
              animation: 'pulse_glow 6s ease-in-out infinite',
              filter: 'blur(50px)',
            }}
          />
          {chips.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              ref={el => nodeRefs.current[i] = el}
              className="absolute top-0 left-0 pointer-events-none will-change-transform"
            >
              <ChipEl icon={Icon} label={label} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}