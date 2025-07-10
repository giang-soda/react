import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEnumValue<T extends Record<string, string | number>>(
  enumObj: T,
  value: string | number
): value is T[keyof T] {
  return Object.values(enumObj).includes(value);
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function metaCommon(title: string, options: Record<string, string>[] = []) {
  return [{ title: `${title} | Soda` }, ...options];
}

export function metaAdmin(title: string, options: Record<string, string>[] = []) {
  return [{ title: `${title} | Soda Admin` }, ...options];
}

export const isSiteAdmin = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.location.pathname.split('/').includes('admin');
};
