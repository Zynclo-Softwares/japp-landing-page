const IMG_LIGHT = 'https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/12c80f467_image.png';
const IMG_DARK = 'https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/97083b349_image.png';

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
          Download. Upload. Repeat 40 times. We collapsed all of it — no copy-pasting, no URL hunting. Just point and apply.
        </p>

        {/* Single combined image — switches with theme */}
        <img
          src={IMG_LIGHT}
          alt="The old way vs Just Apply"
          className="w-full rounded-3xl dark:hidden"
        />
        <img
          src={IMG_DARK}
          alt="The old way vs Just Apply"
          className="w-full rounded-3xl hidden dark:block"
        />
      </div>
    </section>
  );
}