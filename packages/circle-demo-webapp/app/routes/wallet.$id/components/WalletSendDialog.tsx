import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { WalletSend } from '~/components/WalletSend';
import { Transaction, Wallet, WalletTokenBalance } from '~/lib/types';

interface WalletSendDialogProps {
  wallet: Wallet;
  balances: WalletTokenBalance[];
  transactionData?: Transaction;
}

export function WalletSendDialog({
  wallet,
  balances,
  transactionData,
}: WalletSendDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ArrowUp /> Send
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <WalletSend
          wallet={wallet}
          balances={balances}
          transactionData={transactionData}
        />
      </DialogContent>
    </Dialog>
  );
}
