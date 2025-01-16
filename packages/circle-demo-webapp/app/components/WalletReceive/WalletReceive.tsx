import { Copy } from 'lucide-react';
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
    <div className="flex flex-col items-center">
      <div className="p-6 rounded-2xl mb-6 dark:bg-foreground border border-gray-400 dark:border-0">
        <QRCodeCanvas value={wallet.address} size={160} />
      </div>

      <p className="text-2xl font-medium break-all text-center mb-2">{wallet.address}</p>

      <div className="mb-8">
        <ChainLabel blockchain={wallet.blockchain} />
      </div>

      <div className="text-center">
        <Button onClick={copyToClipboard}>
          <Copy /> {copied ? 'Copied!' : 'Copy Address'}
        </Button>
      </div>
    </div>
  );
}
