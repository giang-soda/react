export const basename = import.meta.env.VITE_BASE_URL || '/';

export const joinPaths = (paths: string[]): string => paths.join('/').replace(/\/\/+/g, '/');

export function stripBasename(pathname: string): string | null {
  if (basename === '/') {
    return pathname;
  }

  return pathname === '/' ? basename : joinPaths([basename, pathname]);
}
