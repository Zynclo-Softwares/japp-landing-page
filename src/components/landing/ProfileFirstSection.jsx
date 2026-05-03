import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

function StepCard({ num, title, desc, align, cardRef, floatDelay = 0 }) {
  return (
    <motion.div
      ref={cardRef}
      className={`rounded-2xl border border-border p-6 lg:p-8 relative z-10 ${align === 'right' ? 'text-right' : 'text-left'}`}
      style={{
        background: 'var(--card)',
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}
      animate={{
        y: [0, -8, 0],
        rotateX: [0, 2, 0],
        rotateZ: align === 'right' ? [0, -1, 0] : [0, 1, 0],
        boxShadow: [
          '0 4px 20px -4px oklch(0.852 0.199 91.936 / 0.12), 0 2px 8px -2px rgba(0,0,0,0.06)',
          '0 18px 40px -8px oklch(0.852 0.199 91.936 / 0.22), 0 8px 24px -4px rgba(0,0,0,0.10)',
          '0 4px 20px -4px oklch(0.852 0.199 91.936 / 0.12), 0 2px 8px -2px rgba(0,0,0,0.06)',
        ],
      }}
      transition={{
        duration: 4,
        delay: floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        y: -12,
        rotateX: 3,
        boxShadow: '0 24px 50px -8px oklch(0.852 0.199 91.936 / 0.30), 0 10px 28px -4px rgba(0,0,0,0.12)',
        borderColor: 'oklch(0.852 0.199 91.936 / 0.4)',
        transition: { duration: 0.3 },
      }}
    >
      <span
        className="text-4xl font-black tracking-[-0.03em] block mb-2"
        style={{ color: 'oklch(0.852 0.199 91.936)' }}
      >
        {num}
      </span>
      <h3
        className="font-bold text-foreground mb-1.5"
        style={{ fontSize: '17px', lineHeight: '1.25', letterSpacing: '-0.015em' }}
      >
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function ProfileFirstSection() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [pathD, setPathD] = useState('');

  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();

      const points = cardRefs.current.map((el, i) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const side = steps[i].side;
        return {
          exitX: side === 'left' ? r.right - cRect.left : r.left - cRect.left,
          exitY: (r.top + r.bottom) / 2 - cRect.top,
          entryX: side === 'left' ? r.right - cRect.left : r.left - cRect.left,
          entryY: r.top - cRect.top + 30,
          side,
          left: r.left - cRect.left,
          right: r.right - cRect.left,
          top: r.top - cRect.top,
          bottom: r.bottom - cRect.top,
          midX: r.left - cRect.left + r.width / 2,
          midY: (r.top + r.bottom) / 2 - cRect.top,
        };
      });

      if (points.some(p => !p)) return;

      let d = '';
      for (let i = 0; i < points.length - 1; i++) {
        const cur = points[i];
        const nxt = points[i + 1];

        // Exit from right-center of left card, or left-center of right card
        const x1 = cur.side === 'left' ? cur.right : cur.left;
        const y1 = cur.midY;

        // Enter at top-center of next card
        const x2 = nxt.midX;
        const y2 = nxt.top;

        // cp1: leave horizontally (tangent matches card side edge)
        const hOut = cur.side === 'left' ? 120 : -120;
        const cp1x = x1 + hOut;
        const cp1y = y1;
        // cp2: arrive vertically from above (tangent matches card top edge)
        const cp2x = x2;
        const cp2y = y2 - 120;

        d += `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2} `;
      }

      setPathD(d);
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return (
    <section className="py-24 lg:py-32 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 text-center">
          Step one, and only one
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
          className="text-center text-foreground/60 max-w-lg mx-auto mb-20"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          Five steps — then every application runs on autopilot.
        </p>

        {/* ── Mobile only: stacked cards, no path ── */}
        <div className="sm:hidden relative max-w-sm mx-auto">
          <div className="flex flex-col gap-4">
            {steps.map(({ num, title, desc }, idx) => (
              <StepCard key={num} num={num} title={title} desc={desc} align="left" floatDelay={idx * 0.7} cardRef={el => cardRefs.current[idx] = el} />
            ))}
          </div>
        </div>

        {/* ── Tablet + Desktop: original zigzag layout ── */}
        <div ref={containerRef} className="hidden sm:block relative max-w-3xl mx-auto">
          {/* SVG road — behind cards */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            style={{ top: 0, left: 0 }}
          >
            {pathD && (
              <>
                <path d={pathD} fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="64" strokeLinecap="butt" strokeLinejoin="round" opacity="0.07" />
                <path d={pathD} fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="48" strokeLinecap="butt" strokeLinejoin="round" opacity="0.13" />
                <path d={pathD} fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="36" strokeLinecap="butt" strokeLinejoin="round" opacity="0.20" />
                <path d={pathD} fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="2.5" strokeLinecap="butt" strokeDasharray="22 14" opacity="0.9" />
              </>
            )}
          </svg>

          <div className="flex flex-col gap-6">
            {steps.map(({ num, title, desc, side }, idx) => (
              <div key={num} className="flex">
                <div className="w-1/2 pr-4">
                  {side === 'left' && (
                    <StepCard num={num} title={title} desc={desc} align="right" floatDelay={idx * 0.7} cardRef={el => cardRefs.current[idx] = el} />
                  )}
                </div>
                <div className="w-1/2 pl-4">
                  {side === 'right' && (
                    <StepCard num={num} title={title} desc={desc} align="left" floatDelay={idx * 0.7} cardRef={el => cardRefs.current[idx] = el} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}