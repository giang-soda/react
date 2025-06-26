import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TITLE_SUFFIX_NAME } from '~/constans';

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
  return [{ title: `${title}${TITLE_SUFFIX_NAME}` }, ...options];
}
