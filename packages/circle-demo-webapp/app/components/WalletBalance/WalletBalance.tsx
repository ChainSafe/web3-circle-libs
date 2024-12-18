import { TokenIcon } from '@web3icons/react';

import { WalletTokenBalance } from '~/lib/types';

export interface WalletBalanceProps {
  /** The balance details */
  balance: WalletTokenBalance;
  isShowBlockchainName?: boolean;
}

/** A token balance for an on-chain account */
export function WalletBalance({
  balance,
  isShowBlockchainName = true,
}: WalletBalanceProps) {
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
        {isShowBlockchainName && (
          <p className="text-sm text-gray-500">{balance.token.name}</p>
        )}
      </div>
    </div>
  );
}
