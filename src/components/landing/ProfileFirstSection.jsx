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

export default function ProfileFirstSection() {
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
        <div className="relative max-w-3xl mx-auto">
          {/* SVG curved road */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 600 750"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.852 0.199 91.936)" stopOpacity="0" />
                <stop offset="10%" stopColor="oklch(0.852 0.199 91.936)" stopOpacity="0.7" />
                <stop offset="90%" stopColor="oklch(0.852 0.199 91.936)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="oklch(0.852 0.199 91.936)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Path snaking left→right→left→right→left across the 5 dot positions */}
            {/* Dots at x≈150 (left) and x≈450 (right), spaced ~150px vertically */}
            <path
              d="M 150 75 C 150 150, 450 100, 450 225 C 450 300, 150 250, 150 375 C 150 450, 450 400, 450 525 C 450 600, 150 550, 150 675"
              fill="none"
              stroke="url(#roadGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 5"
            />
          </svg>

          <div className="flex flex-col gap-0">
            {steps.map(({ num, title, desc, side }, idx) => (
              <div key={num} className="relative flex items-center min-h-[150px]">

                {/* Left slot */}
                <div className="w-[calc(50%-28px)] pr-6">
                  {side === 'left' && (
                    <StepCard num={num} title={title} desc={desc} align="right" />
                  )}
                </div>

                {/* Centre dot */}
                <div className="relative z-10 flex-shrink-0 w-14 flex justify-center">
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      background: 'var(--background)',
                      borderColor: 'oklch(0.852 0.199 91.936)',
                      boxShadow: '0 0 0 5px oklch(0.852 0.199 91.936 / 0.15)',
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.852 0.199 91.936)' }} />
                  </div>
                </div>

                {/* Right slot */}
                <div className="w-[calc(50%-28px)] pl-6">
                  {side === 'right' && (
                    <StepCard num={num} title={title} desc={desc} align="left" />
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

function StepCard({ num, title, desc, align }) {
  return (
    <div
      className={`inline-block rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[oklch(0.852_0.199_91.936_/_0.35)] w-full ${align === 'right' ? 'text-right' : 'text-left'}`}
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