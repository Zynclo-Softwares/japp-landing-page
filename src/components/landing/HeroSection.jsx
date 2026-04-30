import HeroOrbit from './HeroOrbit';
import ImagePlaceholder from './ImagePlaceholder';

const IMG1_PROMPT =
  'A single floating glass-morphism card in 3/4 perspective, showing a tailored resume document. Around it, four smaller satellite cards orbit gently: a JD parser, a company-research dossier, a cover letter, and a job-tracker row. Soft amber glow underneath, like a lamp on a dark wooden desk. Background is deep graphite (#0d0d0d) with a faint grid. No people. Render style: clean 3D, matte materials, subtle subsurface scattering on the amber light, slight depth-of-field blur on the satellites. 16:9, ultra-detailed, marketing hero quality.';

const trustItems = [
  'Agent sees your screen — no URL needed',
  'Bring your own template',
  'Bring your own model',
  'Human-in-the-loop, always',
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" id="how-it-works">
      {/* Amber mesh blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.12]"
          style={{ background: 'var(--primary)', filter: 'blur(120px)' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.10]"
          style={{ background: 'var(--primary)', filter: 'blur(120px)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-6">
              The semi-autonomous apply studio · macOS beta
            </p>

            <h1
              className="font-black leading-[0.95] tracking-[-0.035em] mb-6 text-foreground"
              style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}
            >
              Apply to anything.
              <br />
              <span style={{ color: 'var(--primary)' }}>In your vibe.</span>
              <br />
              At 20× the speed.
            </h1>

            <p
              className="text-foreground/70 mb-10 max-w-lg"
              style={{ fontSize: '18px', lineHeight: '1.5', letterSpacing: '-0.005em' }}
            >
              You build the profile once. Just Apply researches the company, writes a tailored
              resume + cover letter in your own template, fills the form, and tracks every shot —
              with you in the loop.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold transition-all duration-180 active:scale-95"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  boxShadow: '0 10px 40px -10px oklch(0.852 0.199 91.936 / 0.45)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 18px 60px -12px oklch(0.852 0.199 91.936 / 0.65)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 10px 40px -10px oklch(0.852 0.199 91.936 / 0.45)'}
              >
                Download for Mac — Free beta
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold border border-border hover:bg-muted hover:border-foreground/20 transition-all duration-200 text-foreground"
              >
                See it in 90 seconds →
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/50 font-medium">
              {trustItems.map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {item}
                  {i < trustItems.length - 1 && (
                    <span aria-hidden className="text-foreground/25">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Orbit visual + IMG-1 placeholder below on desktop */}
          <div className="flex flex-col items-center justify-center gap-4">
            <HeroOrbit />
            <ImagePlaceholder id="IMG-1" prompt={IMG1_PROMPT} className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}