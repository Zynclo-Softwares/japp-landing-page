/**
 * Latest-release download helpers.
 *
 * The JustApply repo is private, so GitHub's own release URLs 404 for the
 * public. Instead the backend exposes an open index at
 * `/api/downloads/latest` and 307-redirects each asset request to a
 * short-lived presigned URL minted at click time — which is why we link
 * to the backend path rather than caching a direct binary URL here.
 */

export const DOWNLOAD_API_BASE = 'https://just-apply-app.zynclo.com';
export const DOWNLOADS_ENDPOINT = `${DOWNLOAD_API_BASE}/api/downloads/latest`;

/** Display order + labels. The API keys assets by these same `os` values. */
export const OS_META = {
  macos: { label: 'macOS', note: 'Apple Silicon' },
  windows: { label: 'Windows', note: '64-bit' },
  linux: { label: 'Linux', note: 'AppImage' },
};

export const OS_ORDER = ['macos', 'windows', 'linux'];

/**
 * Best-effort guess at the visitor's OS so we can emphasise one button.
 * Only ever used for styling — every button stays clickable, because a
 * wrong guess must never block someone from getting the right installer.
 */
export function detectOS() {
  if (typeof navigator === 'undefined') return null;
  const ua = `${navigator.userAgent || ''} ${navigator.platform || ''}`.toLowerCase();
  // Order matters: iOS/Android UAs also contain "mac"/"linux".
  if (/android/.test(ua)) return null;
  if (/iphone|ipad|ipod/.test(ua)) return null;
  if (/win/.test(ua)) return 'windows';
  if (/mac/.test(ua)) return 'macos';
  if (/linux|x11/.test(ua)) return 'linux';
  return null;
}

/** Human-readable size for the button subtitle (e.g. "178 MB"). */
export function formatSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return null;
  return `${Math.round(bytes / 1_000_000)} MB`;
}

/** Absolute URL for an asset entry returned by the index. */
export function assetHref(asset) {
  return `${DOWNLOAD_API_BASE}${asset.url}`;
}
