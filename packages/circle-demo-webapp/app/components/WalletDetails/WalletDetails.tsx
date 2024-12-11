import makeBlockie from 'ethereum-blockies-base64';
import { useMemo } from 'react';
import type { Wallet } from 'web3-circle-sdk';

import { ChainLabel } from '~/components/ChainLabel';

export interface WalletDetailsProps {
  wallet: Wallet;
  children?: React.ReactNode;
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletDetails({ wallet, children }: WalletDetailsProps) {
  const shortAddress = useMemo(() => shortenAddress(wallet.address), [wallet]);
  const walletImage = useMemo(() => makeBlockie(wallet.address), [wallet]);

  return (
    <div className="flex items-center space-x-4">
      <img src={walletImage} alt="Wallet Avatar" className="w-16 h-16 rounded-full" />

      <div className="flex-1">
        <p className="text-m font-medium text-gray-900">
          {wallet.name || 'Unnamed Wallet'}
        </p>

        <p className="text-sm text-gray-900 mb-1" title={wallet.address}>
          {shortAddress}
        </p>

        <ChainLabel blockchain={wallet.blockchain} />
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
