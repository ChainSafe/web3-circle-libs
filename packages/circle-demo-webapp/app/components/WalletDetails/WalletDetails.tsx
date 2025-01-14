import { AccountType } from '@circle-fin/developer-controlled-wallets';
import makeBlockie from 'ethereum-blockies-base64';
import { Copy } from 'lucide-react';
import { useMemo } from 'react';

import { ChainLabel } from '~/components/ChainLabel';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { shortenAddress } from '~/lib/format';
import { Wallet } from '~/lib/types';

export interface WalletDetailsProps {
  /** The wallet associated with the on-chain account */
  wallet: Wallet;
  /** Child components to associate with the wallet */
  children?: React.ReactNode;
  /** Copy the wallet address to the clipboard */
  onAddressCopy?: (address: string) => void;
}

const ACCOUNT_TYPE_TO_TEXT: Record<AccountType, string> = {
  SCA: 'Smart Contract',
  EOA: 'Externally Owned',
};

/** The details of an on-chain account */
export function WalletDetails({ wallet, onAddressCopy, children }: WalletDetailsProps) {
  const shortAddress = useMemo(() => shortenAddress(wallet.address), [wallet]);
  const walletImage = useMemo(() => makeBlockie(wallet.address), [wallet]);

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(wallet.address);
    if (typeof onAddressCopy === 'function') {
      onAddressCopy(wallet.address);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <img src={walletImage} alt="Wallet Avatar" className="w-16 h-16 rounded-full" />

      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-m font-medium text-foreground">{wallet.name}</span>
          {wallet.accountType === 'SCA' && (
            <Badge variant="secondary">
              {ACCOUNT_TYPE_TO_TEXT[wallet.accountType as AccountType]}
            </Badge>
          )}
        </div>

        <p className="flex items-center space-x-2 mb-1">
          <span className="text-sm text-foreground" title={wallet.address}>
            {shortAddress}
          </span>

          <Button onClick={copyToClipboard} variant="ghost" size="sm">
            <Copy size={16} strokeWidth={1} />
          </Button>
        </p>

        <ChainLabel blockchain={wallet.blockchain} />
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
