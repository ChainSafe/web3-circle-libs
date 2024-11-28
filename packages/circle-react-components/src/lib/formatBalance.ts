/**
 * Formats a balance as ETH
 *
 * TODO: this should be configurable, available inside the useCircleSdk hook
 * and available in all components that handle balances
 *
 * */
export function formatBalance(balance: bigint) {
  return `$${balance.toString()}`;
}
