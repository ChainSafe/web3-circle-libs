import type { Token } from '@circle-fin/developer-controlled-wallets';
import { TokenIcon } from '@web3icons/react';

/**
 * Props for the TokenItem component
 */
export interface TokenItemProps {
  /**
   * Token details from Circle's API
   * Used to display the token symbol and appropriate icon
   */
  token: Token;
}

/**
 * Displays a token with its icon and symbol
 *
 * Features:
 * - Shows branded token icons using web3icons library
 * - Handles split token symbols (e.g., "USDC-ETH" displays USDC icon)
 * - Consistent styling with muted text and icon alignment
 * - Fixed icon size of 24px for visual consistency
 */
export function TokenItem({ token }: TokenItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <TokenIcon
        symbol={token?.symbol?.split('-')[0] ?? ''}
        size={24}
        variant="branded"
        className="shrink-0"
      />
      <div className="text-sm text-muted-foreground">{token.symbol}</div>
    </div>
  );
}
