const boards = [
  'LinkedIn', 'Wellfound', 'Lever', 'Greenhouse', 'Workday', 'That weird Notion page some founder posted on Twitter',
];

export default function ApplyAnywhereSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4">
          Apply anywhere on the internet
        </p>
        <h2
          className="font-black tracking-[-0.03em] text-foreground mb-6"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: '1.05' }}
        >
          No job-board lock-in.
          <br />
          No API limits.
        </h2>
        <p
          className="text-foreground/60 max-w-xl mx-auto mb-12"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          If a human can apply, Just Apply can apply.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {boards.map((board) => (
            <span
              key={board}
              className="px-4 py-2 rounded-full border border-border text-sm font-semibold text-foreground/70 hover:border-[oklch(0.852_0.199_91.936_/_0.4)] hover:text-foreground transition-all duration-200"
              style={{ background: 'var(--card)' }}
            >
              {board}
            </span>
          ))}
        </div>

        {/* IMG-5 placeholder */}
        <div className="rounded-3xl border border-border bg-muted/50 flex items-center justify-center h-72 text-muted-foreground text-sm font-medium">
          IMG-5 · Browser collage — apply anywhere on the internet
        </div>
      </div>
    </section>
  );
}