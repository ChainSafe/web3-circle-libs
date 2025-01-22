import type { Balance } from '@circle-fin/developer-controlled-wallets';

export interface AmountProps {
  /**
   * The Balance object returned from Circle's API.
   */
  balance: Balance;
}

/**
 * Displays a token balance with appropriate formatting.
 *
 * For USDC tokens, displays the amount in USD currency format (e.g. $1,234.56).
 * For other tokens, displays the raw amount as provided.
 */
export function Amount({ balance }: AmountProps) {
  const formattedAmount =
    balance.token.symbol === 'USDC'
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(parseFloat(balance.amount))
      : balance.amount;

  return (
    <span className="text-base font-semibold text-foreground">{formattedAmount}</span>
  );
}
