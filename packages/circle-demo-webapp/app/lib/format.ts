export function shortenAddress(address: string | undefined): string {
  if (typeof address !== 'string') {
    return '';
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function shortenHash(hash: string | undefined): string {
  if (typeof hash !== 'string') {
    return '';
  }
  return `${hash.slice(0, 10)}...${hash.slice(-10)}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
