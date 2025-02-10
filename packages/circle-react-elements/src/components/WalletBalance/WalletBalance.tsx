import type { Balance } from '@circle-fin/developer-controlled-wallets';

import { Amount } from '~/components/Amount';
import { LazyTokenIcon } from '~/components/LazyTokenIcon';

/**
 * Props for the WalletBalance component
 */
export interface WalletBalanceProps {
  /**
   * The Balance object returned from Circle's API
   * Contains token details (name, symbol) and balance amount
   */
  balance: Balance;
}

/**
 * Displays a detailed wallet balance with token information and amount
 *
 * Features:
 * - Shows branded token icon using web3icons library
 * - Displays token name and symbol
 * - Shows formatted balance amount using Amount component
 */
export function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <div className="flex items-center justify-between space-x-8">
      <div className="flex items-center space-x-2">
        <LazyTokenIcon
          symbol={balance.token.symbol?.split('-')[0] ?? ''}
          size={40}
          variant="branded"
          className="shrink-0"
        />

        <div className="flex flex-col">
          <p className="text-base font-medium text-foreground">{balance.token.name}</p>
          <p className="text-sm text-muted-foreground">{balance.token.symbol}</p>
        </div>
      </div>

      <div className="text-right">
        <Amount balance={balance} />
      </div>
    </div>
  );
}
