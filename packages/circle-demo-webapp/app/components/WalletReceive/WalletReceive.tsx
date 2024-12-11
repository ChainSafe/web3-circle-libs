import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import type { Wallet } from 'web3-circle-sdk';

import { ChainLabel } from '~/components/ChainLabel';
import { Button } from '~/components/ui/button';

export interface WalletReceiveProps {
  wallet: Wallet;
}

export function WalletReceive({ wallet }: WalletReceiveProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {wallet.name ?? 'Unnamed Wallet'}
      </h2>

      <div>
        <QRCodeCanvas value={wallet.address} size={128} />
      </div>

      {/* display blockachain name, use shadcn components */}
      <ChainLabel blockchain={wallet.blockchain} />

      <div className="mt-6 w-full">
        <p className="text-sm font-medium text-gray-700 mb-2">Wallet Address</p>
        <div className="flex items-center w-full bg-gray-100 rounded-md p-2">
          <span className="text-sm text-gray-800 flex-1">{wallet.address}</span>
          <Button onClick={copyToClipboard} variant="outline" size="sm">
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>
    </div>
  );
}
