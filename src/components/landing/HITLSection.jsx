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

        <div className="mt-12 flex justify-center gap-8">
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
      </div>
    </section>
  );
}