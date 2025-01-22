import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Blockchain } from '~/lib/constants';
import { ErrorResponse } from '~/lib/responses';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

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

export const isSolanaAddress = (value: string): boolean => {
  return /^[1-9A-HJ-NP-Za-km-z]{43,44}$/.test(value);
};

const isEthAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const isAddress = (value: string): boolean => {
  return isSolanaAddress(value) || isEthAddress(value);
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
