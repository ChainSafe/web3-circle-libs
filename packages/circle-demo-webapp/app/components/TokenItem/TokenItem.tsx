import { TokenIcon } from '@web3icons/react';

import { Token } from '~/lib/types';

export interface TokenItemProps {
  /** The balance details */
  token: Token;
}

/** A token balance for an on-chain account */
export function TokenItem({ token }: TokenItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <TokenIcon
        symbol={token.symbol.split('-')[0]}
        size={24}
        variant="branded"
        className="flex-shrink-0"
      />
      <div className="text-sm text-muted-foreground">{token.symbol}</div>
    </div>
  );
}
