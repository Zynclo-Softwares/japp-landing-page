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
        // exit point: bottom-right of left card, bottom-left of right card
        // entry point: top of next card (centered or slight offset)
        return {
          exitX: side === 'left' ? r.right - cRect.left : r.left - cRect.left,
          exitY: r.bottom - cRect.top - r.height * 0.3,
          entryX: side === 'left' ? r.right - cRect.left : r.left - cRect.left,
          entryY: r.top - cRect.top + r.height * 0.3,
          centerX: r.left - cRect.left + r.width / 2,
          topY: r.top - cRect.top,
          bottomY: r.bottom - cRect.top,
          side,
          left: r.left - cRect.left,
          right: r.right - cRect.left,
          width: r.width,
        };
      });

      if (points.some(p => !p)) return;

      // Build path: from exit of card[i] to entry of card[i+1]
      let d = '';
      for (let i = 0; i < points.length - 1; i++) {
        const cur = points[i];
        const nxt = points[i + 1];

        // exit: right edge of left card (mid-height), or left edge of right card
        const x1 = cur.side === 'left' ? cur.right : cur.left;
        const y1 = (cur.topY + cur.bottomY) / 2;

        // entry: top of next card (horizontally centered-ish)
        const x2 = nxt.side === 'left' ? nxt.left + nxt.width * 0.7 : nxt.left + nxt.width * 0.3;
        const y2 = nxt.topY;

        // control points for smooth S-curve
        const midY = (y1 + y2) / 2;
        const cp1x = x1 + (cur.side === 'left' ? 60 : -60);
        const cp1y = midY - 20;
        const cp2x = x2 + (nxt.side === 'left' ? 60 : -60);
        const cp2y = midY + 20;

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

        {/* Roadmap */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto">

          {/* SVG path layer — behind cards (z-0) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            style={{ top: 0, left: 0 }}
          >
            {pathD && (
              <>
                {/* Road shadow/border */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="oklch(0.852 0.199 91.936 / 0.15)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Road surface */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="oklch(0.852 0.199 91.936 / 0.35)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Centre line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="oklch(0.852 0.199 91.936 / 0.9)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="18 10"
                />
              </>
            )}
          </svg>

          <div className="flex flex-col gap-6">
            {steps.map(({ num, title, desc, side }, idx) => (
              <div key={num} className="flex">
                {/* Left half */}
                <div className="w-1/2 pr-4">
                  {side === 'left' && (
                    <StepCard
                      num={num} title={title} desc={desc} align="right"
                      cardRef={el => cardRefs.current[idx] = el}
                    />
                  )}
                </div>
                {/* Right half */}
                <div className="w-1/2 pl-4">
                  {side === 'right' && (
                    <StepCard
                      num={num} title={title} desc={desc} align="left"
                      cardRef={el => cardRefs.current[idx] = el}
                    />
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