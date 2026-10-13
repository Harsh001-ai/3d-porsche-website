/**
 * Resolves static public asset URLs according to Vite's configured base URL.
 * Ensures seamless operation both locally and on hosted environments (e.g., GitHub Pages).
 */
export function getAssetPath(path) {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
