import { useRef, useEffect, useState } from 'react';

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

function StepCard({ num, title, desc, align, cardRef }) {
  return (
    <div
      ref={cardRef}
      className={`rounded-2xl border border-border p-6 lg:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[oklch(0.852_0.199_91.936_/_0.35)] relative z-10 ${align === 'right' ? 'text-right' : 'text-left'}`}
      style={{
        background: 'var(--card)',
        boxShadow: '0 2px 16px -4px oklch(0.852 0.199 91.936 / 0.1)',
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
    </div>
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

        // Exit from center-bottom of current card
        const x1 = cur.midX;
        const y1 = cur.bottom;

        // Enter at center-top of next card
        const x2 = nxt.midX;
        const y2 = nxt.top;

        // Smooth vertical S-curve between center-bottom and center-top
        const midY = (y1 + y2) / 2;
        const cp1x = x1;
        const cp1y = midY;
        const cp2x = x2;
        const cp2y = midY;

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

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* SVG road — behind cards */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            style={{ top: 0, left: 0 }}
          >
            {pathD && (
              <>
                {/* Road outer glow */}
                <path d={pathD} fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="64" strokeLinecap="round" strokeLinejoin="round" opacity="0.07" />
                {/* Road shoulder */}
                <path d={pathD} fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round" opacity="0.13" />
                {/* Road surface */}
                <path d={pathD} fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" opacity="0.20" />
                {/* Centre dashed line */}
                <path d={pathD} fill="none" stroke="oklch(0.852 0.199 91.936)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="22 14" opacity="0.9" />
              </>
            )}
          </svg>

          <div className="flex flex-col gap-6">
            {steps.map(({ num, title, desc, side }, idx) => (
              <div key={num} className="flex">
                <div className="w-1/2 pr-4">
                  {side === 'left' && (
                    <StepCard num={num} title={title} desc={desc} align="right" cardRef={el => cardRefs.current[idx] = el} />
                  )}
                </div>
                <div className="w-1/2 pl-4">
                  {side === 'right' && (
                    <StepCard num={num} title={title} desc={desc} align="left" cardRef={el => cardRefs.current[idx] = el} />
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