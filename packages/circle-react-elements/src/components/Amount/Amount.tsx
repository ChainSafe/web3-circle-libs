import type { Balance } from '@circle-fin/developer-controlled-wallets';

export interface AmountProps {
  /** The balance details */
  balance: Balance;
}

/** Renders token balance with USD currency format for USDC */
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
