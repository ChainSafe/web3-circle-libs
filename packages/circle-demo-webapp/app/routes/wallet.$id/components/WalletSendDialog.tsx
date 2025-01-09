import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { WalletSend, WalletSendProps } from '~/components/WalletSend';
import { Wallet, WalletTokenBalance } from '~/lib/types';

export interface WalletSendDialogProps {
  wallet: Wallet;
  balances: WalletTokenBalance[];
  onSendTransaction: WalletSendProps['onSendTransaction'];
  onGetTransaction: WalletSendProps['onGetTransaction'];
  onConfirmed?: WalletSendProps['onConfirmed'];
  onScreenAddress?: WalletSendProps['onScreenAddress'];
}

export function WalletSendDialog(props: WalletSendDialogProps) {
  const { wallet, balances, onConfirmed, ...other } = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ArrowUp /> Send
        </Button>
      </DialogTrigger>

      {open && (
        <DialogContent className="sm:max-w-[600px]">
          <WalletSend
            wallet={wallet}
            balances={balances}
            {...other}
            onConfirmed={async (tx) => {
              setOpen(false);
              if (typeof onConfirmed === 'function') {
                await onConfirmed(tx);
              }
            }}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}
