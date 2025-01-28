import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ErrorResponse } from '~/lib/responses';

// className helpers
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// api requests
export async function callFetch<ReturnType, OptionsType = object>(
  url: string,
  body: OptionsType,
): Promise<ReturnType> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (res.status !== 200) {
    const errorData = (await res.json()) as ErrorResponse;
    throw new Error(errorData.error);
  }
  return (await res.json()) as ReturnType;
}

export async function callGetFetch<ReturnType>(
  url: string,
  query: URLSearchParams | Record<string, string>,
): Promise<ReturnType> {
  const res = await fetch(`${url}?${new URLSearchParams(query)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status !== 200) {
    const errorData = (await res.json()) as ErrorResponse;
    throw new Error(errorData.error);
  }
  return (await res.json()) as ReturnType;
}

// validation
export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}
