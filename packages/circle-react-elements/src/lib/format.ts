/**
 * Format a number to a human-readable format.
 * @param address
 * @returns The formatted address.
 */
export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Shorten a hash string.
 * @param hash The hash to shorten.
 * @returns The shortened hash.
 */
export function shortenHash(hash: string): string {
  return `${hash.slice(0, 10)}...${hash.slice(-10)}`;
}

/**
 * Format a date string to a human-readable format.
 * @param date The date string to format.
 * @returns The formatted date string.
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
