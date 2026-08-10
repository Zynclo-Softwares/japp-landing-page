import { useState, useEffect } from 'react';
import { Sun, Moon, PlayCircle } from 'lucide-react';

const VIDEO_URL = 'https://youtu.be/kmzKrYFHxV8';

export default function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-[0_1px_0_0_var(--border)]'
          : 'bg-background/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Wordmark */}
        <a href="#" className="flex items-center gap-2 font-black text-lg tracking-tight text-foreground">
          <img
            src={theme === 'dark'
              ? "https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/d4d0bfd36_just-apply-icon.svg"
              : "https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/cb2b88d8e_just-apply-icon-knockout.svg"}
            alt="Just Apply logo"
            className="w-7 h-7 object-contain"
          />
          Just Apply
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-foreground/60">
          {['How it works', 'Features', 'Pricing'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-foreground transition-colors relative group"
            >
              {l}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-180 hover:opacity-90"
            style={{
              background: '#FF0000',
              color: '#fff',
              boxShadow: '0 4px 20px -4px oklch(0.55 0.24 27 / 0.45)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px -4px oklch(0.55 0.24 27 / 0.65)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px -4px oklch(0.55 0.24 27 / 0.45)'}
          >
            <PlayCircle size={15} /> Watch Preview
          </a>
        </div>
      </div>
    </nav>
  );
}