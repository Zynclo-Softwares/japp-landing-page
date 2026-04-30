import ImagePlaceholder from './ImagePlaceholder';

const IMG5_PROMPT =
  'A loose collage of browser window chrome (Safari and Arc style) showing fragments of LinkedIn, Lever, Greenhouse, Workday, Wellfound, and a quirky Notion job page — all floating against a deep amber-to-graphite radial gradient. A single glowing amber cursor arrow hovers in the center, connected to each window with thin glowing threads. Editorial, not screenshot-literal. 16:9.';

const boards = [
  'LinkedIn',
  'Wellfound',
  'Lever',
  'Greenhouse',
  'Workday',
  'That weird Notion page some founder posted on Twitter',
];

export default function ApplyAnywhereSection() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
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
              className="px-4 py-2 rounded-full border border-border text-sm font-semibold text-foreground/70 transition-all duration-200 hover:text-foreground"
              style={{ background: 'var(--card)' }}
            >
              {board}
            </span>
          ))}
        </div>

        {/* IMG-5 — full-width band */}
        <ImagePlaceholder id="IMG-5" prompt={IMG5_PROMPT} tall />
      </div>
    </section>
  );
}