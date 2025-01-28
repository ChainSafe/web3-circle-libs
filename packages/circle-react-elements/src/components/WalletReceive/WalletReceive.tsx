import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import { Copy } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';

import { ChainLabel } from '../ChainLabel';

/**
 * Props for the WalletReceive component
 */
export interface WalletReceiveProps {
  /**
   * The wallet data from Circle's API
   * Used to display the wallet's address and blockchain network
   */
  wallet: Wallet;
}

/**
 * Displays wallet receiving information in a user-friendly format
 *
 * Features:
 * - Generates QR code for easy address sharing
 * - Shows full wallet address with appropriate text wrapping
 * - Displays blockchain network with icon
 * - Copy address button with feedback:
 *   - Changes text to "Copied!" for 2 seconds
 *   - Uses clipboard API for copying
 * - Dark mode support:
 *   - White QR code background in dark mode
 *   - Border styling adjustments
 * - Centered layout with consistent spacing
 * - Responsive design that works on mobile
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
