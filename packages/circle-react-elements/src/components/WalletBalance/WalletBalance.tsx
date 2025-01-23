import type { Balance } from '@circle-fin/developer-controlled-wallets';
import { TokenIcon } from '@web3icons/react';

import { Amount } from '~/components/Amount';

export interface WalletBalanceProps {
  /**
   * The Balance object returned from Circle's API.
   */
  balance: Balance;
}

/**
 * Displays a detailed wallet balance with token information and amount.
 * Shows a branded token icon, token name, symbol, and formatted balance amount.
 */
export function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <div className="flex items-center justify-between space-x-8">
      <div className="flex items-center space-x-2">
        <TokenIcon
          symbol={balance.token.symbol?.split('-')[0] ?? ''}
          size={40}
          variant="branded"
          className="flex-shrink-0"
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
