import { useRef, useState, useEffect, useCallback } from 'react';
import { FileSearch, Building2, Mail, LayoutDashboard, Sparkles, ClipboardCheck, BriefcaseBusiness, UserCheck, Zap, FileText } from 'lucide-react';

const chips = [
  { icon: FileSearch,       label: 'JD Parser' },
  { icon: Building2,        label: 'Company Research' },
  { icon: Mail,             label: 'Cover Letter' },
  { icon: LayoutDashboard,  label: 'Job Tracker' },
  { icon: Sparkles,         label: 'AI Tailoring' },
  { icon: ClipboardCheck,   label: 'Form Filler' },
  { icon: BriefcaseBusiness,label: 'Role Fit Score' },
  { icon: UserCheck,        label: 'Human-in-Loop' },
  { icon: Zap,              label: '20× Faster' },
  { icon: FileText,         label: 'Resume Builder' },
];

// Base positions as fractions (0–1) of container width/height
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

const FLOAT_OFFSETS = [
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

const REPEL_RADIUS = 130;
const REPEL_STRENGTH = 60;

export default function HeroOrbit() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const startRef = useRef(performance.now());
  const [positions, setPositions] = useState(BASE_POS.map(p => ({ x: p.x, y: p.y })));

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const now = performance.now() - startRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    setPositions(BASE_POS.map((base, i) => {
      const { amp, dur, phase } = FLOAT_OFFSETS[i];
      const floatY = Math.sin((now + phase) / dur * Math.PI * 2) * amp;

      // Base pixel position
      let px = base.x * width;
      let py = base.y * height + floatY;

      // Repel from mouse
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_RADIUS && dist > 0) {
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
        px += (dx / dist) * force;
        py += (dy / dist) * force;
      }

      return { x: px / width, y: py / height };
    }));

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] lg:h-[480px] overflow-hidden cursor-none"
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Amber glow */}
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
          className="absolute pointer-events-none"
          style={{
            left: `${positions[i].x * 100}%`,
            top: `${positions[i].y * 100}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.08s linear, top 0.08s linear',
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
  );
}