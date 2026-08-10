import { Download, Loader2 } from 'lucide-react';
import useLatestRelease from './useLatestRelease.js';
import { OS_ORDER, OS_META, assetHref, detectOS, formatSize } from '../../lib/downloads.js';

/**
 * Three always-current install buttons (macOS / Windows / Linux).
 *
 * Each `href` points at the backend, which 307s to a freshly-signed URL,
 * so these links never go stale and never need updating per release.
 * The visitor's own OS is emphasised, but all three stay clickable —
 * people download for other machines all the time.
 *
 * `tone`:
 *   "light" — for dark/neutral page backgrounds (hero)
 *   "dark"  — for the amber gradient band (final CTA)
 */
export default function DownloadButtons({ tone = 'light', size = 'md', className = '' }) {
  const { version, assets, loading, error } = useLatestRelease();
  const currentOS = detectOS();

  const pad = size === 'lg' ? 'px-6 py-4' : 'px-5 py-3.5';
  const text = size === 'lg' ? 'text-base' : 'text-sm';

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${tone === 'dark' ? 'text-white/70' : 'text-foreground/60'} ${className}`}>
        <Loader2 size={16} className="animate-spin" />
        <span className="text-sm font-medium">Fetching the latest build…</span>
      </div>
    );
  }

  // Never leave the visitor at a dead end: if the index is unreachable we
  // say so plainly rather than rendering buttons that go nowhere.
  if (error || OS_ORDER.every((os) => !assets[os])) {
    return (
      <p className={`text-sm font-medium ${tone === 'dark' ? 'text-white/70' : 'text-foreground/60'} ${className}`}>
        Downloads are temporarily unavailable — please try again shortly.
      </p>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2.5">
        {OS_ORDER.map((os) => {
          const asset = assets[os];
          if (!asset) return null;

          const isPrimary = currentOS ? os === currentOS : os === 'macos';
          const meta = OS_META[os];
          const sizeLabel = formatSize(asset.size);

          const primaryStyle =
            tone === 'dark'
              ? { background: 'oklch(0.145 0 0)', color: 'oklch(0.985 0 0)', boxShadow: '0 8px 32px -4px oklch(0 0 0 / 0.4)' }
              : {
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  boxShadow: '0 10px 40px -10px oklch(0.852 0.199 91.936 / 0.45)',
                };
          const secondaryStyle =
            tone === 'dark'
              ? { background: 'oklch(1 0 0 / 0.15)', color: '#fff', border: '1px solid oklch(1 0 0 / 0.35)' }
              : { background: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)' };

          return (
            <a
              key={os}
              href={assetHref(asset)}
              // The backend redirects to a download-disposition URL, so no
              // `download` attr and no target="_blank" — a new tab would
              // flash and close on navigation.
              className={`inline-flex items-center gap-2.5 ${pad} rounded-xl ${text} font-bold transition-all duration-180 active:scale-95 hover:opacity-90`}
              style={isPrimary ? primaryStyle : secondaryStyle}
            >
              <Download size={size === 'lg' ? 18 : 16} />
              <span className="flex flex-col items-start leading-tight">
                <span>{meta.label}</span>
                <span className="font-medium opacity-70 text-[11px]">
                  {meta.note}
                  {sizeLabel ? ` · ${sizeLabel}` : ''}
                </span>
              </span>
            </a>
          );
        })}
      </div>
      {version ? (
        <p className={`mt-3 text-[12px] font-medium ${tone === 'dark' ? 'text-white/60' : 'text-muted-foreground'}`}>
          Version {version} · free to install
        </p>
      ) : null}
    </div>
  );
}
