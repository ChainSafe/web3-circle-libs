import { Plus } from 'lucide-react';
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

import { NewWalletSetForm } from './NewWalletSetForm';

interface NewWalletSetDialogProps {
  onSuccess?: () => void;
}

export function NewWalletSetDialog({ onSuccess }: NewWalletSetDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> New Wallet Set
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Wallet Set</DialogTitle>
          <DialogDescription>Generate a new wallet set</DialogDescription>
        </DialogHeader>

        <NewWalletSetForm
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
