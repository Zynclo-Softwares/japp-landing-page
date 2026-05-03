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
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Guided', desc: 'You pin specific items from your profile — "use Project X, Experience Y" — and the agent builds around exactly those.' },
              { label: 'Semi-guided', desc: 'You set rules like "include at least 1 project and 2 experiences." The agent picks the best matches from your profile to fit the role.' },
              { label: 'Yolo', desc: 'You hand the wheel over. The agent selects the strongest combination from everything in your profile — zero constraints, maximum relevance.' },
            ].map(({ label, desc }, i) => (
              <div
                key={label}
                className="rounded-2xl border border-border p-5 text-left relative overflow-hidden"
                style={{
                  background: 'var(--card)',
                  boxShadow: '0 4px 24px -4px oklch(0.852 0.199 91.936 / 0.12), 0 1px 4px rgba(0,0,0,0.05)',
                  transform: i === 0 ? 'rotate(-1deg)' : i === 1 ? 'rotate(0.5deg)' : 'rotate(-0.5deg)',
                }}
              >
                {/* Decorative blob */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
                  style={{ background: label === 'Yolo' ? 'oklch(0.852 0.199 91.936 / 0.18)' : 'oklch(0.852 0.199 91.936 / 0.07)', filter: 'blur(12px)' }}
                />
                <p className="text-sm font-black mb-2" style={{ color: label === 'Yolo' ? 'var(--primary)' : 'var(--foreground)' }}>{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}