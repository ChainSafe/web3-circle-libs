export function shortenAddress(address: string): string {
  return `${String(address).slice(0, 6)}...${String(address).slice(-4)}`;
}

export function shortenHash(hash: string): string {
  return `${String(hash).slice(0, 10)}...${String(hash).slice(-10)}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
