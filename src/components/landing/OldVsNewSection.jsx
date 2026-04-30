import ImagePlaceholder from './ImagePlaceholder';

const IMG2_PROMPT =
  'Split-screen illustration. Left half: tangled mess of arrows looping between a job-post browser tab, a ChatGPT window, a Google Doc, an ATS-checker, a downloads folder, and an upload dialog — drawn in scratchy hand-drawn ink on aged paper, slightly chaotic, labeled "the old way" in a tired serif. Right half: one single clean amber-glowing window labeled "Just Apply" sitting on a polished walnut desk, surrounded by negative space. Visual contrast between chaos and calm. 21:9.';

const oldSteps = [
  'Open the job post',
  'Paste JD into ChatGPT',
  'Paste output into Google Docs',
  '"Make it ATS-friendly"',
  'Re-format the whole thing',
  'Download as PDF',
  'Upload to the ATS portal',
  'Repeat 40 more times',
];

export default function OldVsNewSection() {
  return (
    <section className="py-24 lg:py-32" id="features">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Eyebrow */}
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 text-center">
          The copy-paste dance is over
        </p>

        <h2
          className="font-black tracking-[-0.03em] text-center text-foreground mb-4"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: '1.05' }}
        >
          You weren't lazy.
          <br />
          The workflow was broken.
        </h2>
        <p
          className="text-center text-foreground/60 max-w-xl mx-auto mb-16"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          Open the JD. Paste into ChatGPT. Paste back into Docs. "Make it ATS-friendly." Re-format.
          Download. Upload. Repeat 40 times. We collapsed all of it into one window.
        </p>

        {/* IMG-2 — full-width centerpiece (the viral screenshot moment) */}
        <ImagePlaceholder
          id="IMG-2"
          prompt={IMG2_PROMPT}
          tall
          className="mb-10"
        />

        {/* Split comparison — below the image */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Old way */}
          <div className="relative rounded-3xl border border-border p-8 lg:p-10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
                backgroundSize: '20px 20px',
              }}
            />
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-6">
              The old way
            </p>
            <div className="space-y-2">
              {oldSteps.map((step, i) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span
                    className="text-sm text-foreground/60 font-medium leading-snug"
                    style={{
                      textDecoration: i > 3 ? 'line-through' : 'none',
                      opacity: i > 3 ? 0.35 : 0.7,
                    }}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-xs text-muted-foreground font-medium">
              ≈ 45–90 min per application
            </div>
          </div>

          {/* New way */}
          <div
            className="relative rounded-3xl border p-8 lg:p-10 overflow-hidden"
            style={{
              borderColor: 'oklch(0.852 0.199 91.936 / 0.3)',
              background: 'oklch(0.852 0.199 91.936 / 0.04)',
            }}
          >
            <p
              className="text-[11px] font-bold tracking-[0.12em] uppercase mb-6"
              style={{ color: 'var(--primary)' }}
            >
              Just Apply
            </p>

            <div className="space-y-4">
              {[
                { step: '1', label: 'Drop any job post URL', sub: 'From anywhere on the internet' },
                { step: '2', label: 'Agent researches the company', sub: 'Site, news, team, JD — all of it' },
                { step: '3', label: 'Tailored bundle delivered', sub: 'Resume + cover in your template' },
              ].map(({ step, label, sub }) => (
                <div key={step} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center"
                    style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                  >
                    {step}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-snug">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pull stats */}
            <div
              className="mt-8 pt-6 border-t flex items-center gap-6"
              style={{ borderColor: 'oklch(0.852 0.199 91.936 / 0.2)' }}
            >
              {[
                ['20×', 'faster'],
                ['0', 'tabs open'],
                ['1', 'window'],
              ].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p
                    className="text-3xl font-black tracking-[-0.03em]"
                    style={{ color: 'var(--primary)' }}
                  >
                    {num}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}