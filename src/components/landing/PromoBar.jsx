import { useState } from 'react';
import { X } from 'lucide-react';

export default function PromoBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="relative z-50 flex items-center justify-center gap-3 px-6 py-2.5 text-sm font-medium"
      style={{
        background: 'oklch(0.97 0.03 91)',
        borderBottom: '1px solid oklch(0.852 0.199 91.936 / 0.3)',
      }}
    >
      <span className="hidden sm:inline text-[oklch(0.3_0.05_57)] leading-snug text-center max-w-3xl">
        For the first time — a semi-autonomous job-application software that gives humans full flexibility to apply to any job, tailor documents in their own UI vibe, track and edit on their terms.{' '}
        <span className="font-700">It keeps you in the loop. It keeps the company in the loop. It produces exactly what you want.</span>
      </span>
      <span className="sm:hidden text-[oklch(0.3_0.05_57)]">Semi-autonomous job-application studio · Now in private beta</span>
      <span className="hidden sm:inline text-[oklch(0.5_0.05_57)] shrink-0">· Now in private beta · macOS desktop app</span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded text-[oklch(0.45_0.05_57)] hover:text-[oklch(0.25_0.05_57)] transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}