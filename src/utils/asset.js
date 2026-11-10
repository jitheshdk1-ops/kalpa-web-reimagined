/**
 * Helper to resolve static asset URLs respecting Vite's base path
 * Works in both local dev (base: '/') and GitHub Pages deployment (base: '/<repo>/')
 */
export const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
};
