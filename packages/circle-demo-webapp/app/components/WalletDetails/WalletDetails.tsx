import makeBlockie from 'ethereum-blockies-base64';
import { useMemo } from 'react';

import { ChainLabel } from '~/components/ChainLabel';
import { shortenAddress } from '~/lib/format';
import { Wallet } from '~/lib/types';

export interface WalletDetailsProps {
  /** The wallet associated with the on-chain account */
  wallet: Wallet;
  /** Child components to associate with the wallet */
  children?: React.ReactNode;
}

/** The details of an on-chain account */
export function WalletDetails({ wallet, children }: WalletDetailsProps) {
  const shortAddress = useMemo(() => shortenAddress(wallet.address), [wallet]);
  const walletImage = useMemo(() => makeBlockie(wallet.address), [wallet]);

  return (
    <div className="flex items-center space-x-4">
      <img src={walletImage} alt="Wallet Avatar" className="w-16 h-16 rounded-full" />

      <div className="flex-1">
        <p className="text-m font-medium text-foreground">
          {wallet.name || 'Unnamed Wallet'}
        </p>

        <p className="text-sm text-foreground mb-1" title={wallet.address}>
          {shortAddress}
        </p>

        <ChainLabel blockchain={wallet.blockchain} />
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
