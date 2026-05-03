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

        <div className="mt-12 flex flex-col sm:flex-row justify-center items-stretch gap-4 max-w-xs sm:max-w-none mx-auto">
          {[
            { label: 'Autonomous mode', desc: 'Submit without interruption', icon: '⚡' },
            { label: 'Review mode', desc: 'Approve every step before it ships', icon: '👁' },
          ].map(({ label, desc, icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-border text-left"
              style={{
                background: 'var(--card)',
                boxShadow: '0 4px 20px -4px oklch(0.852 0.199 91.936 / 0.15), 0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <span className="text-lg leading-none">{icon}</span>
              <div>
                <p className="text-sm font-bold text-foreground whitespace-nowrap">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-2xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-6">
            Prompt steering
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Guided', desc: 'You pin specific items from your profile — "use Project X, Experience Y" — and the agent builds around exactly those.' },
              { label: 'Semi-guided', desc: 'You set rules like "include at least 1 project and 2 experiences." The agent picks the best matches from your profile to fit the role.' },
              { label: 'Yolo', desc: 'You hand the wheel over. The agent selects the strongest combination from everything in your profile — zero constraints, maximum relevance.' },
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