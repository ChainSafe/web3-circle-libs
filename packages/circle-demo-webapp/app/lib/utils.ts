import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

export async function callFetch<ReturnType extends object>(
  url: string,
  body: object,
): Promise<ReturnType> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return (await res.json()) as ReturnType;
}
