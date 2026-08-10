import ImagePlaceholder from './ImagePlaceholder';
import DownloadButtons from './DownloadButtons.jsx';

const IMG9_PROMPT =
  'Full-bleed abstract background: a soft amber-to-deep-bronze radial gradient with a faint topographic line pattern overlay. Slight film grain. No subjects. Used as a hero band behind white headline text. 21:9.';

export default function FinalCTASection() {
  return (
    <section className="relative py-40 overflow-hidden" id="download">
      {/* Amber gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, oklch(0.852 0.199 91.936) 0%, oklch(0.7 0.18 75) 50%, oklch(0.5 0.14 55) 100%)',
        }}
      />
      {/* Topographic overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M0 50 Q25 25 50 50 T100 50' fill='none' stroke='white' stroke-width='1'/%3E%3Cpath d='M0 70 Q25 45 50 70 T100 70' fill='none' stroke='white' stroke-width='1'/%3E%3Cpath d='M0 30 Q25 5 50 30 T100 30' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 100px',
        }}
      />

      {/* IMG-9 prompt label — top-left corner */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-medium px-2 py-1 rounded bg-black/20 text-white/60 font-mono">
          IMG-9 · Full-bleed background · {IMG9_PROMPT.slice(0, 60)}…
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2
          className="font-black text-white tracking-[-0.035em] mb-6"
          style={{
            fontSize: 'clamp(44px, 7vw, 88px)',
            lineHeight: '0.95',
            textShadow: '0 2px 20px oklch(0 0 0 / 0.2)',
          }}
        >
          Stop applying.
          <br />
          Start landing.
        </h2>
        <p
          className="text-white/80 mb-10 font-medium max-w-md mx-auto"
          style={{ fontSize: '20px', lineHeight: '1.5' }}
        >
          Download Just Apply and run your first application in minutes.
        </p>

        <DownloadButtons tone="dark" size="lg" className="flex flex-col items-center" />

        <p className="text-white/50 text-sm font-medium mt-4">
          No credit card · Free to install
        </p>
      </div>
    </section>
  );
}