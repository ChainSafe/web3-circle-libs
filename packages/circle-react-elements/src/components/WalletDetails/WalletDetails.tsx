import { AccountType } from '@circle-fin/developer-controlled-wallets';
import makeBlockie from 'ethereum-blockies-base64';
import { Check, Copy } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { shortenAddress } from '~/lib/format';
import { ElementsWallet } from '~/lib/types';

import { ChainLabel } from '../ChainLabel';

/**
 * Props for the WalletDetails component
 */
export interface WalletDetailsProps {
  /**
   * The wallet data from Circle's API
   * Contains wallet details like name, address, blockchain, and account type
   */
  wallet: ElementsWallet;

  /**
   * Optional child components to render in the wallet details card
   * Useful for adding custom buttons or additional information
   */
  children?: React.ReactNode;

  /**
   * Optional callback when wallet address is copied
   * @param address - The full wallet address that was copied
   */
  onAddressCopy?: (address: string) => void;
}

/**
 * Mapping of Circle account types to display text
 * SCA = Smart Contract Account
 * EOA = Externally Owned Account
 */
const ACCOUNT_TYPE_TO_TEXT: Record<AccountType, string> = {
  SCA: 'SCA',
  EOA: 'EOA',
};

/**
 * Displays detailed information about a wallet
 *
 * Features:
 * - Generates unique wallet avatar using ethereum-blockies
 * - Shows wallet name and type (SCA/EOA badge)
 * - Displays shortened wallet address with copy button
 * - Shows blockchain network with icon
 * - Supports custom child components for extensibility
 * - Full address available in tooltip
 */
export function WalletDetails({ wallet, onAddressCopy, children }: WalletDetailsProps) {
  const shortAddress = useMemo(() => shortenAddress(wallet.address), [wallet]);
  const walletImage = useMemo(() => makeBlockie(wallet.address), [wallet]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(wallet.address);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds

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
            {copied ? (
              <Check size={16} strokeWidth={1} />
            ) : (
              <Copy size={16} strokeWidth={1} />
            )}
          </Button>
        </p>

        <ChainLabel blockchain={wallet.blockchain} />
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
