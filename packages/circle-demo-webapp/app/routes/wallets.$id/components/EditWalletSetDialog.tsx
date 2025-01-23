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
import { ElementsWalletSet } from '~/lib/types';

import { EditWalletSetForm } from './EditWalletSetForm';

interface EditWalletSetDialogProps {
  walletSet: ElementsWalletSet;
  onSuccess?: () => void;
}

export function EditWalletSetDialog({ walletSet, onSuccess }: EditWalletSetDialogProps) {
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
          <DialogTitle>Edit Wallet Set</DialogTitle>
          <DialogDescription>
            You can change the name of the wallet set.
          </DialogDescription>
        </DialogHeader>

        <EditWalletSetForm
          walletSet={walletSet}
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
