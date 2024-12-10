/**
 * Formats a balance as ETH
 * */
export function formatBalance(balance: bigint) {
  return `$${balance.toString()}`;
}
