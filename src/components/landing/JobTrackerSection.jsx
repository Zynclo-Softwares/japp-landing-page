import { useEffect, useState } from 'react';

export default function JobTrackerSection() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const IMG_LIGHT = 'https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/f0486e669_image.png';
  const IMG_DARK = 'https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/02bac3435_image.png';

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 text-center">
          Smart job tracker
        </p>
        <h2
          className="font-black tracking-[-0.025em] text-center text-foreground mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: '1.1' }}
        >
          Not a spreadsheet.
          <br />
          A structured memory of every application.
        </h2>
        <p
          className="text-center text-foreground/60 max-w-lg mx-auto mb-14"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          Every entry, every artifact, every outcome — organized automatically.
        </p>

        <div className="flex justify-center">
          <img
            src={isDark ? IMG_DARK : IMG_LIGHT}
            alt="Job Tracker Dashboard"
            className="w-full rounded-2xl shadow-2xl"
            style={{ maxWidth: 860, objectFit: 'cover' }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}