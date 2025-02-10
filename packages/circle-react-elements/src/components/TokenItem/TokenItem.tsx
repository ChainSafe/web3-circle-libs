import type { Token } from '@circle-fin/developer-controlled-wallets';

import { LazyTokenIcon } from '../LazyTokenIcon';

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
 */
export function TokenItem({ token }: TokenItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <LazyTokenIcon
        symbol={token?.symbol?.split('-')[0] ?? ''}
        size={24}
        variant="branded"
        className="shrink-0"
      />
      <div className="text-sm text-muted-foreground">{token.symbol}</div>
    </div>
  );
}
