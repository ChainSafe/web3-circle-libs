import { useMemo } from 'react';
import { WalletSet } from 'web3-circle-sdk';

export interface WalletSetDetailsProps {
  walletSet: WalletSet;
  children?: React.ReactNode;
}

export function WalletSetDetails({ walletSet, children }: WalletSetDetailsProps) {
  const formattedCreateDate = useMemo(() => {
    return new Date(walletSet.createDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [walletSet]);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          Name: {walletSet.name ?? 'Unnamed Wallet Set'}
        </p>

        <p className="text-sm text-gray-500">Custody Type: {walletSet.custodyType}</p>

        <p className="text-sm text-gray-500">Created: {formattedCreateDate}</p>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
