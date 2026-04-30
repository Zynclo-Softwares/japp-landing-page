const steps = [
  {
    num: '01',
    title: 'Build your profile once.',
    desc: 'Roles, projects, links, voice. The agent owns the rest.',
  },
  {
    num: '02',
    title: 'Drop any job post.',
    desc: 'A URL, a JD paste, or a Notion page — doesn\'t matter where it lives.',
  },
  {
    num: '03',
    title: 'Get a tailored bundle.',
    desc: 'Resume + cover, in your template, ready to submit. Or let us submit.',
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
          className="text-center text-foreground/60 max-w-lg mx-auto mb-16"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          Three steps. Then you're done building. We handle every application from here.
        </p>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {steps.map(({ num, title, desc }) => (
            <div
              key={num}
              className="rounded-2xl border border-border p-8 lg:p-10 transition-all duration-200 hover:-translate-y-1 hover:border-[oklch(0.852_0.199_91.936_/_0.3)]"
              style={{
                background: 'var(--card)',
                boxShadow: 'inset 0 1px 0 0 oklch(1 0 0 / 0.04)',
              }}
            >
              <span
                className="text-5xl font-black tracking-[-0.03em] block mb-4"
                style={{ color: 'oklch(0.852 0.199 91.936 / 0.25)' }}
              >
                {num}
              </span>
              <h3
                className="font-bold text-foreground mb-2"
                style={{ fontSize: '20px', lineHeight: '1.25', letterSpacing: '-0.015em' }}
              >
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}