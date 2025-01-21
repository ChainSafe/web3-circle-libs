import type { Balance } from '@circle-fin/developer-controlled-wallets';
import { TokenIcon } from '@web3icons/react';

export interface WalletBalanceProps {
  /** The balance details */
  balance: Balance;
}

/** A token balance for an on-chain account */
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
        <p className="text-base font-semibold text-foreground">{balance.amount}</p>
      </div>
    </div>
  );
}
