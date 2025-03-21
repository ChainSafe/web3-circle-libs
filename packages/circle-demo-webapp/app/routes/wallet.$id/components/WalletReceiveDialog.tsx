import { WalletReceive } from '@chainsafe/react-elements';
import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import { ArrowDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';

interface WalletReceiveDialogProps {
  wallet: Wallet;
}

export function WalletReceiveDialog({ wallet }: WalletReceiveDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowDown /> Receive
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[325px] py-10">
        <WalletReceive wallet={wallet} />
      </DialogContent>
    </Dialog>
  );
}
