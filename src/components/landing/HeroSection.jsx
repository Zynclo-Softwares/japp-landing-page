import { useState } from 'react';
import HeroOrbit from './HeroOrbit';
import WaitlistModal from './WaitlistModal';
import { PlayCircle } from 'lucide-react';

const VIDEO_URL = 'https://youtu.be/YRgo4OErGXw';

export default function HeroSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section className="relative overflow-hidden flex flex-col justify-center py-10 pb-16 lg:py-32" style={{ minHeight: '80vh' }} id="how-it-works">
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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 -mt-20">

        {/* ── Mobile / Tablet ── */}
        <div className="flex flex-col lg:hidden">
          <p className="text-[10px] font-bold tracking-[0.10em] uppercase text-muted-foreground mb-1.5">
            The semi-autonomous apply studio
          </p>
          <span
            className="self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide uppercase mb-4"
            style={{ background: 'oklch(0.852 0.199 91.936 / 0.15)', color: 'var(--primary)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--primary)' }} />
            Now in private beta
          </span>
          <h1
            className="font-black leading-[0.88] tracking-[-0.04em] mb-6 text-foreground"
            style={{ fontSize: 'clamp(52px, 16vw, 80px)' }}
          >
            Apply to
            <br />
            anything.
            <br />
            <span style={{ color: 'var(--primary)' }}>In your vibe.</span>
            <br />
            At <span style={{ color: 'var(--primary)' }}>20×</span>
            <br />
            the speed.
          </h1>
          <p className="text-foreground/70 mb-5 text-sm leading-relaxed max-w-sm">
            You build the profile once. Just Apply researches the company, writes a tailored
            resume + cover letter in your own template, fills the form, and tracks every shot —
            with you in the loop.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setWaitlistOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                boxShadow: '0 10px 40px -10px oklch(0.852 0.199 91.936 / 0.45)',
              }}
            >
              Join the Preview
            </button>
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 hover:opacity-90"
              style={{ background: '#FF0000', color: '#fff' }}
            >
              <PlayCircle size={16} /> Watch Preview
            </a>
          </div>

        </div>

        {/* ── Desktop: original two-column grid ── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-2">
              The semi-autonomous apply studio
            </p>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase mb-6"
              style={{ background: 'oklch(0.852 0.199 91.936 / 0.15)', color: 'var(--primary)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--primary)' }} />
              Now in private beta
            </span>
            <h1
              className="font-black leading-[0.95] tracking-[-0.035em] mb-6 text-foreground"
              style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}
            >
              Apply to anything.
              <br />
              <span style={{ color: 'var(--primary)' }}>In your vibe.</span>
              <br />
              At <span style={{ color: 'var(--primary)' }}>20×</span> the speed.
            </h1>
            <p
              className="text-foreground/70 mb-10 max-w-lg"
              style={{ fontSize: '18px', lineHeight: '1.5', letterSpacing: '-0.005em' }}
            >
              You build the profile once. Just Apply researches the company, writes a tailored
              resume + cover letter in your own template, fills the form, and tracks every shot —
              with you in the loop.
            </p>
            <div className="flex gap-3 mb-10 flex-wrap">
              <button
                onClick={() => setWaitlistOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold transition-all duration-180 active:scale-95"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  boxShadow: '0 10px 40px -10px oklch(0.852 0.199 91.936 / 0.45)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 18px 60px -12px oklch(0.852 0.199 91.936 / 0.65)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 10px 40px -10px oklch(0.852 0.199 91.936 / 0.45)'}
              >
                Join the Preview
              </button>
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold transition-all duration-180 active:scale-95 hover:opacity-90"
                style={{ background: '#FF0000', color: '#fff' }}
              >
                <PlayCircle size={18} /> Watch Preview
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <HeroOrbit />
          </div>
        </div>

      </div>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  );
}