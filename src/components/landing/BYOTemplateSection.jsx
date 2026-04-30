import ImagePlaceholder from './ImagePlaceholder';

const IMG3_PROMPT =
  'A grid of six wildly different resume layouts floating in mid-air — one brutalist black-and-white, one pastel editorial magazine style, one ultra-minimal Swiss grid, one playful zine-style with stickers, one terminal/monospace dark theme, one classic serif. All show the same person\'s content, perfectly typeset. They tilt slightly toward the viewer. Warm amber rim light. Background: soft cream paper texture. Caption-free. 4:3.';

const templateStyles = [
  { label: 'Brutalist', bg: '#0d0d0d', text: '#fff', accent: '#f5b400' },
  { label: 'Editorial', bg: '#fdf6ec', text: '#1a1a1a', accent: '#e05a2b' },
  { label: 'Swiss Grid', bg: '#fff', text: '#0d0d0d', accent: '#0d0d0d' },
  { label: 'Zine', bg: '#f0e6ff', text: '#1a0030', accent: '#7c3aed' },
  { label: 'Terminal', bg: '#0a1628', text: '#4ade80', accent: '#22c55e' },
  { label: 'Classic Serif', bg: '#fafaf8', text: '#1c1917', accent: '#78716c' },
];

function TemplateMiniCard({ label, bg, text, accent }) {
  return (
    <div
      className="flex-shrink-0 w-40 h-52 rounded-xl overflow-hidden border border-border/50 p-3 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{ background: bg }}
    >
      <div className="h-2.5 rounded-full w-3/4" style={{ background: accent, opacity: 0.9 }} />
      <div className="h-1.5 rounded-full w-1/2" style={{ background: text, opacity: 0.3 }} />
      <div className="h-px w-full my-1" style={{ background: text, opacity: 0.15 }} />
      {[80, 65, 75, 55, 70, 60].map((w, i) => (
        <div key={i} className="h-1 rounded-full" style={{ background: text, opacity: 0.2, width: `${w}%` }} />
      ))}
      <div className="mt-auto text-[8px] font-bold" style={{ color: text, opacity: 0.5 }}>
        {label}
      </div>
    </div>
  );
}

export default function BYOTemplateSection() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden" id="features">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Copy */}
          <div className="lg:pt-8">
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-6">
              The thing no other tool does
            </p>

            {/* Manifesto — display weight, H1-level size */}
            <h2
              className="font-black tracking-[-0.035em] text-foreground mb-8"
              style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', lineHeight: '0.97' }}
            >
              Every other tool
              <br />
              gives you 12 templates.
              <br />
              <span style={{ color: 'var(--primary)' }}>We give you infinity.</span>
            </h2>

            <p
              className="text-foreground/60 mb-8 max-w-md"
              style={{ fontSize: '17px', lineHeight: '1.6' }}
            >
              Drop in any HTML/CSS/Tailwind layout — brutalist, editorial, monospace, your own
              design system. We fill it with polished, tailored content.{' '}
              <strong className="text-foreground font-semibold">Your vibe. Our content.</strong>{' '}
              Same artistic taste, every application.
            </p>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold text-foreground/70"
              style={{
                borderColor: 'oklch(0.852 0.199 91.936 / 0.3)',
                background: 'oklch(0.852 0.199 91.936 / 0.06)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)' }} />
              HTML · CSS · Tailwind · Any layout
            </div>
          </div>

          {/* Template grid + IMG-3 placeholder */}
          <div>
            {/* Desktop: 3-col grid */}
            <div className="hidden lg:grid grid-cols-3 gap-3 mb-4">
              {templateStyles.map((t) => (
                <TemplateMiniCard key={t.label} {...t} />
              ))}
            </div>

            {/* Mobile: scroll rail */}
            <div className="lg:hidden mb-4">
              <p className="text-xs text-muted-foreground text-center mb-3">← swipe templates →</p>
              <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                {templateStyles.map((t) => (
                  <div key={t.label} className="snap-start">
                    <TemplateMiniCard {...t} />
                  </div>
                ))}
              </div>
            </div>

            {/* IMG-3 placeholder */}
            <ImagePlaceholder id="IMG-3" prompt={IMG3_PROMPT} />
          </div>
        </div>
      </div>
    </section>
  );
}