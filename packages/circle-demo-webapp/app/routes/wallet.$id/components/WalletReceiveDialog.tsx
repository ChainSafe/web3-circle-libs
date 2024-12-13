import { ArrowDown } from 'lucide-react';
import { useState } from 'react';
import { Wallet } from 'web3-circle-sdk';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { WalletReceive } from '~/components/WalletReceive';

interface WalletReceiveDialogProps {
  wallet: Wallet;
}

export function WalletReceiveDialog({ wallet }: WalletReceiveDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ArrowDown /> Receive
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <WalletReceive wallet={wallet} />
      </DialogContent>
    </Dialog>
  );
}
