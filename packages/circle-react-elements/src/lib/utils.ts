import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isSolanaAddress = (value: string): boolean => {
  return /^[1-9A-HJ-NP-Za-km-z]{43,44}$/.test(value);
};

export const isEthAddress = (address: string): boolean => {
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

const chainIdExplorerMap: Record<string, string> = {
  SOL: 'https://explorer.solana.com',
  'SOL-DEVNET': 'https://explorer.solana.com',
  ETH: 'https://etherscan.io',
  'ETH-SEPOLIA': 'https://sepolia.etherscan.io',
  ARB: 'https://arbiscan.io',
  'ARB-SEPOLIA': 'https://sepolia.arbiscan.io',
  MATIC: 'https://polygonscan.com',
  'MATIC-AMOY': 'https://www.oklink.com/amoy',
  NEAR: 'https://explorer.near.org',
  'NEAR-TESTNET': 'https://explorer.testnet.near.org',
  EVM: '',
  'EVM-TESTNET': '',
  AVAX: 'https://cchain.explorer.avax.network',
  'AVAX-FUJI': 'https://cchain.explorer.avax-test.network',
  'UNI-SEPOLIA': 'https://unichain-sepolia.blockscout.com',
};

export const getExplorerUrl = (chain: string, txHash?: string): string => {
  const explorer = chainIdExplorerMap[chain];
  console.log('explorer', explorer, chain, txHash);
  if (!explorer) {
    return '';
  }
  return `${explorer}/tx/${txHash}`;
};
