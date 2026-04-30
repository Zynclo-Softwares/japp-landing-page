const IMG2_URL = 'https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/6bb39593b_image.png';
const CARD_URL = 'https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/1d8435744_image.png';

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

        {/* Full image with floating card overlay on the right */}
        <div className="relative rounded-3xl overflow-visible">
          <img
            src={IMG2_URL}
            alt="The old way vs Just Apply"
            className="w-full object-cover rounded-3xl"
            style={{ maxHeight: '520px', objectPosition: 'center' }}
          />
          {/* Floating "Just Apply" card — oversized, breaks out top/bottom for 3D effect */}
          <div
            className="absolute"
            style={{
              top: '-18%',
              bottom: '-18%',
              right: '2%',
              width: '52%',
              transform: 'perspective(900px) rotateY(-4deg) rotateX(2deg)',
              boxShadow: '-32px 0 80px -8px oklch(0 0 0 / 0.5), 0 40px 80px -12px oklch(0 0 0 / 0.4)',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <img
              src={CARD_URL}
              alt="Just Apply card"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}