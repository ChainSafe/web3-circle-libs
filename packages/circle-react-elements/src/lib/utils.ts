import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines the given class names into a single class name.
 * @param inputs - The class names to combine.
 * @returns The combined class name.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Determines whether the given value is a valid Solana address.
 * @param value - The value to check.
 * @returns `true` if the value is a valid Solana address, `false` otherwise.
 */
export const isSolanaAddress = (value: string): boolean => {
  return /^[1-9A-HJ-NP-Za-km-z]{43,44}$/.test(value);
};

/**
 * Determines whether the given value is a valid Ethereum address.
 * @param address - The value to check.
 * @returns `true` if the value is a valid Ethereum address, `false` otherwise.
 */
export const isEthAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Determines whether the given value is a valid address.
 * @param value - The value to check.
 * @returns `true` if the value is a valid address, `false` otherwise.
 */
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

/**
 * Get the explorer URL for the given chain and transaction hash.
 * @param chain The chain to get the explorer URL for.
 * @param txHash The transaction hash.
 * @returns The explorer URL.
 */
export const getExplorerUrl = (chain: string, txHash?: string): string => {
  const explorer = chainIdExplorerMap[chain];
  if (!explorer) {
    return '';
  }
  return `${explorer}/tx/${txHash}`;
};
