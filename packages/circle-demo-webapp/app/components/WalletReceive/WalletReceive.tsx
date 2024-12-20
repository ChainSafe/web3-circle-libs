import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';

import { ChainLabel } from '~/components/ChainLabel';
import { Button } from '~/components/ui/button';
import { Wallet } from '~/lib/types';

export interface WalletReceiveProps {
  /** The wallet */
  wallet: Wallet;
}

/**
 * Helpers for obtaining a wallet's on-chain address:
 * a QR code that encodes the address and elements for viewing the address and copying it to the clipboard
 */
export function WalletReceive({ wallet }: WalletReceiveProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        {wallet.name ?? 'Unnamed Wallet'}
      </h2>

      <div className="mb-2">
        <ChainLabel blockchain={wallet.blockchain} />
      </div>

      <p className="text-sm text-orange-600 text-center">
        Assets can only be sent within the same network
      </p>

      <div className="m-6">
        <QRCodeCanvas value={wallet.address} size={160} />
      </div>

      <div className="w-full bg-secondary rounded-md p-2 mb-4 text-center">
        <p className="text-sm text-muted-foreground">{wallet.address}</p>
      </div>

      <div className="w-full text-center">
        <Button onClick={copyToClipboard} variant="outline" size="sm">
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}
