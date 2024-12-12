import { ArrowDown } from 'lucide-react';
import { useState } from 'react';
import { Wallet } from 'web3-circle-sdk';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { WalletAddressHelpers } from '~/components/WalletAddressHelpers';

interface WalletAddressDialogProps {
  wallet: Wallet;
}

export function WalletAddressDialog({ wallet }: WalletAddressDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ArrowDown /> Address
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <WalletAddressHelpers wallet={wallet} />
      </DialogContent>
    </Dialog>
  );
}
