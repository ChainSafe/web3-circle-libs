import { TokenIcon } from '@web3icons/react';

import { WalletTokenBalance } from '~/lib/types';

export interface TokenSelectItemProps {
  /** The balance details */
  balance: WalletTokenBalance;
}

/** A token balance for an on-chain account */
export function TokenSelectItem({ balance }: TokenSelectItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <TokenIcon
        symbol={balance.token.symbol.split('-')[0]}
        size={40}
        variant="branded"
        className="flex-shrink-0"
      />

      <div>
        <p className="text-base font-medium text-gray-900">
          {balance.amount} {balance.token.symbol}
        </p>
      </div>
    </div>
  );
}
