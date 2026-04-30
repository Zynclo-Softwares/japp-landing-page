import { useState } from 'react';

export default function Footer() {
  const [easterEgg, setEasterEgg] = useState(false);

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Wordmark */}
          <div className="flex items-center gap-2 font-black text-base tracking-tight text-foreground">
            <img
              src="https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/bfb560be2_logo.png"
              alt="Just Apply logo"
              className="w-6 h-6 rounded-md object-cover"
            />
            Just Apply
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-medium">
            {['Privacy', 'Terms', 'Changelog', 'Contact'].map((l) => (
              <a key={l} href="#" className="hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>

          {/* Build badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">
              v0.1.0 · Private Beta
            </span>
            {/* Easter egg dot */}
            <button
              onClick={() => setEasterEgg(!easterEgg)}
              className="w-2 h-2 rounded-full transition-all duration-200 hover:scale-150 focus-visible:ring-2"
              style={{ background: easterEgg ? 'var(--primary)' : 'oklch(var(--border))' }}
              aria-label="Toggle dev info"
              title="..."
            />
          </div>
        </div>

        {/* Easter egg panel */}
        {easterEgg && (
          <div
            className="mt-4 p-4 rounded-xl border border-border text-xs font-mono text-muted-foreground"
            style={{ background: 'oklch(var(--muted))' }}
          >
            <p>build: <span style={{ color: 'var(--primary)' }}>a3f2b1c</span></p>
            <p>env: production</p>
            <p>uptime: just getting started</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Just Apply. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with crewAI · Electron · FastAPI
          </p>
        </div>
      </div>
    </footer>
  );
}