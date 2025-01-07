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

export type ValidInputTypes = Uint8Array | bigint | string | number | boolean;
export const isUint8Array = (data: ValidInputTypes): data is Uint8Array =>
  data instanceof Uint8Array ||
  data?.constructor?.name === 'Uint8Array' ||
  data?.constructor?.name === 'Buffer';

export function uint8ArrayToHexString(uint8Array: Uint8Array): string {
  let hexString = '0x';
  for (const e of uint8Array) {
    const hex = e.toString(16);
    hexString += hex.length === 1 ? `0${hex}` : hex;
  }
  return hexString;
}

export const isHexStrict = (hex: ValidInputTypes) =>
  typeof hex === 'string' && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);

export const isAddress = (value: string): boolean => {
  if (typeof value !== 'string' && !isUint8Array(value)) {
    return false;
  }

  let valueToCheck: string;

  if (isUint8Array(value)) {
    valueToCheck = uint8ArrayToHexString(value);
  } else if (typeof value === 'string' && !isHexStrict(value)) {
    valueToCheck = value.toLowerCase().startsWith('0x') ? value : `0x${value}`;
  } else {
    valueToCheck = value;
  }

  // check if it has the basic requirements of an address
  if (!/^(0x)?[0-9a-f]{40}$/i.test(valueToCheck)) {
    return false;
  }
  // If it's ALL lowercase or ALL upppercase
  if (
    /^(0x|0X)?[0-9a-f]{40}$/.test(valueToCheck) ||
    /^(0x|0X)?[0-9A-F]{40}$/.test(valueToCheck)
  ) {
    return true;
    // Otherwise check each case
  }
  return true;
};

/**
 * Determines whether the given value is a floating-point number.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a float, `false` otherwise.
 */
export const isNumber = (value: string): boolean => {
  // If the value is a string, attempt to parse it to a number
  if (typeof value === 'string') {
    // Trim the string to remove leading and trailing whitespace
    const trimmedValue = value.trim();

    // Regular expression to match valid numeric formats (integer and float)
    const numberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

    if (!numberRegex.test(trimmedValue)) {
      return false;
    }

    const parsedNumber = Number(trimmedValue);
    return Number.isFinite(parsedNumber);
  }

  // For all other types, return false
  return false;
};
