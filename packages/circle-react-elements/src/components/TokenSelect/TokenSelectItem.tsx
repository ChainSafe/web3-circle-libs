import { Balance } from '@circle-fin/developer-controlled-wallets';

import { LazyTokenIcon } from '../LazyTokenIcon';

/**
 * Props for the TokenSelectItem component
 */
export interface TokenSelectItemProps {
  /**
   * The Balance object returned from Circle's API
   * Contains token details and current balance amount
   */
  balance: Balance;
}

/**
 * Displays a token balance item in the TokenSelect dropdown
 *
 * Features:
 * - Shows branded token icon using web3icons library
 * - Displays token amount and symbol
 */
export function TokenSelectItem({ balance }: TokenSelectItemProps) {
  return (
    <div className="flex items-center space-x-2 pr-4">
      <LazyTokenIcon
        symbol={balance.token.symbol?.split('-')[0] ?? ''}
        size={24}
        variant="branded"
        className="shrink-0"
      />
      <div className="text-sm text-muted-foreground">
        {balance.token.symbol === 'USDC' ? `$${balance.amount}` : balance.amount}{' '}
        {balance.token.symbol}
      </div>
    </div>
  );
}
