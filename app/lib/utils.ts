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
