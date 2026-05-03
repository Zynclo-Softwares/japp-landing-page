export default function HITLSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-8">
          Human-in-the-loop, always
        </p>

        <blockquote
          className="font-black tracking-[-0.025em] text-foreground max-w-3xl mx-auto"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.1' }}
        >
          "The agent pauses.
          <br />
          You approve. You edit.
          <br />
          <span style={{ color: 'var(--primary)' }}>You ship."</span>
        </blockquote>

        <p
          className="text-foreground/50 mt-8 max-w-md mx-auto font-medium"
          style={{ fontSize: '17px', lineHeight: '1.6' }}
        >
          Autonomous when you want speed. Paused when you want control. Never out of your hands.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {[
            { label: 'Autonomous mode', desc: 'Submit without interruption' },
            { label: 'Review mode', desc: 'Approve every step before it ships' },
          ].map(({ label, desc }) => (
            <div key={label} className="text-center">
              <p className="text-sm font-bold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-2xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-6">
            Prompt steering
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Guided', desc: 'You set tone, keywords, and constraints. The agent follows your lead closely.' },
              { label: 'Semi-guided', desc: 'You give a direction. The agent fills in the rest with smart defaults.' },
              { label: 'Yolo', desc: 'You approve nothing upfront. The agent writes, tailors, and ships — fully autonomous.' },
            ].map(({ label, desc }) => (
              <div
                key={label}
                className="rounded-xl border border-border p-4 text-left"
                style={{ background: 'var(--card)' }}
              >
                <p className="text-sm font-black text-foreground mb-1.5" style={{ color: label === 'Yolo' ? 'var(--primary)' : undefined }}>{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}