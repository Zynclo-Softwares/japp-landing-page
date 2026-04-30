const trackerCards = [
  {
    company: 'Anthropic',
    role: 'Staff Software Engineer',
    status: 'Applied',
    meta: 'applied 3h ago · v3',
    mustHaves: ['LLM fine-tuning', 'Python', 'Distributed systems'],
    color: 'orange',
  },
  {
    company: 'Vercel',
    role: 'Senior Frontend Engineer',
    status: 'Interviewing',
    meta: 'applied 2d ago · v2',
    mustHaves: ['React', 'Next.js', 'TypeScript'],
    color: 'blue',
  },
  {
    company: 'Linear',
    role: 'Product Engineer',
    status: 'Applied',
    meta: 'applied 5d ago · v4',
    mustHaves: ['Product sense', 'TypeScript', 'Design systems'],
    color: 'purple',
  },
];

const statusColor = {
  Applied: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400',
  Interviewing: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400',
  Offer: 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400',
};

export default function JobTrackerSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 text-center">
          Smart job tracker
        </p>
        <h2
          className="font-black tracking-[-0.025em] text-center text-foreground mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: '1.1' }}
        >
          Not a spreadsheet.
          <br />
          A structured memory of every application.
        </h2>
        <p
          className="text-center text-foreground/60 max-w-lg mx-auto mb-12"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          Every entry, every artifact, every outcome — organized automatically.
        </p>

        {/* Tracker mock */}
        <div
          className="rounded-3xl border border-border overflow-hidden"
          style={{ background: 'var(--card)' }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/50">
            <div className="w-3 h-3 rounded-full bg-red-400/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <div className="w-3 h-3 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs text-muted-foreground font-medium">Job Tracker · Just Apply</span>
          </div>

          {/* Columns — desktop kanban */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Saved', 'Applied', 'Interviewing'].map((col) => (
              <div key={col}>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">{col}</p>
                <div className="space-y-3">
                  {trackerCards
                    .filter((c) => c.status === col || (col === 'Saved' && false))
                    .map((card) => (
                      <div
                        key={card.company}
                        className="rounded-xl border border-border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[oklch(0.852_0.199_91.936_/_0.3)]"
                        style={{ background: 'var(--background)' }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-bold text-foreground">{card.company}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{card.role}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[card.status]}`}>
                            {card.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {card.mustHaves.map((tag) => (
                            <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium">{card.meta}</p>
                      </div>
                    ))}
                  {col === 'Saved' && (
                    <div className="rounded-xl border border-dashed border-border p-4 text-center">
                      <p className="text-xs text-muted-foreground">Drop a JD here</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMG-7 placeholder */}
        <div className="mt-4 rounded-xl border border-border bg-muted/50 flex items-center justify-center h-16 text-muted-foreground text-xs font-medium">
          IMG-7 · Full kanban dashboard mockup
        </div>

        {/* Feature bullets as type */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {[
            { title: 'AI auto-marks applied jobs', desc: 'When the agent submits, the tracker updates automatically.' },
            { title: 'Structured JD storage', desc: 'Paste a 4-page JD → stored as role, must-haves, comp, stack, location.' },
            { title: 'Linked artifacts', desc: 'Every entry links to the exact resume + cover version it produced.' },
            { title: 'Response analytics', desc: 'Response rate, top-matched keywords, weekly application velocity.' },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-3">
              <div className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />
              <div>
                <p className="text-sm font-bold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}