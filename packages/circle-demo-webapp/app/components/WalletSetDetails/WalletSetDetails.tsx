import { WalletSet } from 'web3-circle-sdk';

import { formatDate } from '~/lib/format';

export interface WalletSetDetailsProps {
  walletSet: WalletSet;
  children?: React.ReactNode;
}

export function WalletSetDetails({ walletSet, children }: WalletSetDetailsProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          Name: {walletSet.name ?? 'Unnamed Wallet Set'}
        </p>

        <p className="text-sm text-gray-500">Custody Type: {walletSet.custodyType}</p>

        <p className="text-sm text-gray-500">
          Created: {formatDate(walletSet.createDate)}
        </p>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
