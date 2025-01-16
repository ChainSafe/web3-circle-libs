import { FilePenLine } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Wallet } from '~/lib/types';

import { EditWalletForm } from './EditWalletForm';

interface EditWalletDialogProps {
  wallet: Wallet;
  onSuccess?: () => void;
}

export function EditWalletDialog({ wallet, onSuccess }: EditWalletDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <FilePenLine />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Wallet</DialogTitle>
          <DialogDescription>You can change the name of the wallet.</DialogDescription>
        </DialogHeader>

        <EditWalletForm
          wallet={wallet}
          onSuccess={() => {
            setOpen(false);
            if (typeof onSuccess === 'function') {
              onSuccess();
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
