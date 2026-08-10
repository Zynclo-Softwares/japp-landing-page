import { useEffect, useState } from 'react';
import { DOWNLOADS_ENDPOINT } from '../../lib/downloads.js';

/**
 * Fetches the public installer index once per mount.
 *
 * Returns `{ version, assets, loading, error }` where `assets` is keyed by
 * os ("macos" | "windows" | "linux"). A missing key means that platform
 * genuinely has no installer in the latest release (the backend skips
 * rather than 500s mid-rollout), so callers should disable that button
 * instead of assuming all three always exist.
 */
export default function useLatestRelease() {
  const [state, setState] = useState({
    version: null,
    assets: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Guard against setting state after unmount (StrictMode double-invokes
    // effects in dev, and the fetch can outlive a fast navigation).
    let alive = true;

    fetch(DOWNLOADS_ENDPOINT, { headers: { Accept: 'application/json' } })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!alive) return;
        const assets = {};
        for (const asset of data.assets || []) assets[asset.os] = asset;
        setState({ version: data.version || null, assets, loading: false, error: null });
      })
      .catch((err) => {
        if (!alive) return;
        setState({ version: null, assets: {}, loading: false, error: err });
      });

    return () => {
      alive = false;
    };
  }, []);

  return state;
}
