import { Balance } from '@circle-fin/developer-controlled-wallets';
import { TokenIcon } from '@web3icons/react';

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
 * - Handles split token symbols (e.g., "USDC-ETH" displays USDC icon)
 * - Fixed icon size of 24px for visual consistency
 * - Consistent styling with muted text and icon alignment
 */
export function TokenSelectItem({ balance }: TokenSelectItemProps) {
  return (
    <div className="flex items-center space-x-2 pr-4">
      <TokenIcon
        symbol={balance.token.symbol?.split('-')[0] ?? ''}
        size={24}
        variant="branded"
        className="flex-shrink-0"
      />
      <div className="text-sm text-muted-foreground">
        {balance.amount} {balance.token.symbol}
      </div>
    </div>
  );
}
