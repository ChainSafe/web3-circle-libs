import { TokenIcon } from '@web3icons/react';

import { WalletTokenBalance } from '~/lib/types';

export interface TokenSelectItemProps {
  /** The balance details */
  balance: WalletTokenBalance;
}

/** A token balance for an on-chain account */
export function TokenSelectItem({ balance }: TokenSelectItemProps) {
  return (
    <div className="flex items-center space-x-2 pr-4">
      <TokenIcon
        symbol={balance.token.symbol.split('-')[0]}
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
