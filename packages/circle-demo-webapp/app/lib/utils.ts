import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}
