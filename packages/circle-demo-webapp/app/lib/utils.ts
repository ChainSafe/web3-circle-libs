import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Blockchain } from '~/lib/constants';

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

export const isHexStrict = (hex: ValidInputTypes) =>
  typeof hex === 'string' && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);

export const isAddress = (value: string): boolean => {
  let valueToCheck: string;

  if (!isHexStrict(value)) {
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

export const chainIdExplorerMap: Record<string, string> = {
  [Blockchain.Sol]: 'https://explorer.solana.com',
  [Blockchain.SolDevnet]: 'https://explorer.solana.com',
  [Blockchain.Eth]: 'https://etherscan.io',
  [Blockchain.EthSepolia]: 'https://sepolia.etherscan.io',
  [Blockchain.Arb]: 'https://arbiscan.io',
  [Blockchain.ArbSepolia]: 'https://sepolia.arbiscan.io',
  [Blockchain.Matic]: 'https://polygonscan.com',
  [Blockchain.MaticAmoy]: 'https://www.oklink.com/amoy',
  [Blockchain.Near]: 'https://explorer.near.org',
  [Blockchain.NearTestnet]: 'https://explorer.testnet.near.org',
  [Blockchain.Evm]: '',
  [Blockchain.EvmTestnet]: '',
  [Blockchain.Avax]: 'https://cchain.explorer.avax.network',
  [Blockchain.AvaxFuji]: 'https://cchain.explorer.avax-test.network',
};

export const getExplorerUrl = (chain: string, txHash?: string): string => {
  const explorer = chainIdExplorerMap[chain];
  if (!explorer) {
    return '';
  }
  return `${explorer}/tx/${txHash}`;
};
