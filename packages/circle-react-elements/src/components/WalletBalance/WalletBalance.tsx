import type { Balance } from '@circle-fin/developer-controlled-wallets';
import { TokenIcon } from '@web3icons/react';

import { Amount } from '~/components/Amount';

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
 * - Handles split token symbols (e.g., "USDC-ETH" displays USDC icon)
 * - Large 40px icon size for better visibility
 * - Responsive layout with space between token info and amount
 * - Consistent text styles with design system:
 *   - Medium weight for token name
 *   - Muted color for token symbol
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
