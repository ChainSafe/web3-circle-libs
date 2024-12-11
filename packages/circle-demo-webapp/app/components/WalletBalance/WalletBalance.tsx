import { TokenIcon } from '@web3icons/react';
import type { WalletTokenBalance } from 'web3-circle-sdk';

export interface WalletBalanceProps {
  balance: WalletTokenBalance;
}

export function WalletBalance({ balance }: WalletBalanceProps) {
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
        <p className="text-sm text-gray-500">{balance.token.name}</p>
      </div>
    </div>
  );
}
