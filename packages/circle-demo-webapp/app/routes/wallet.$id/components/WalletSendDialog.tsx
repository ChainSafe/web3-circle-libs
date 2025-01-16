import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

import {
  SendTransactionForm,
  SendTransactionFormProps,
} from '~/components/SendTransactionForm';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { WalletDetails } from '~/components/WalletDetails';
import { Wallet, WalletTokenBalance } from '~/lib/types';

export interface WalletSendDialogProps {
  wallet: Wallet;
  balances: WalletTokenBalance[];
  onSendTransaction: SendTransactionFormProps['onSendTransaction'];
  onGetTransaction: SendTransactionFormProps['onGetTransaction'];
  onConfirmed?: SendTransactionFormProps['onConfirmed'];
  onScreenAddress?: SendTransactionFormProps['onScreenAddress'];
}

export function WalletSendDialog(props: WalletSendDialogProps) {
  const { wallet, balances, onConfirmed, ...other } = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <ArrowUp /> Send
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[425px]">
        <div className="mb-4">
          <WalletDetails wallet={wallet} />
        </div>

        <DialogHeader>
          <DialogTitle>Send Transaction</DialogTitle>
          <DialogDescription>
            Send transaction to any blockchain address.
          </DialogDescription>
        </DialogHeader>

        <SendTransactionForm
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
    </Dialog>
  );
}
