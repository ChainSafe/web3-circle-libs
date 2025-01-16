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

import { NewWalletForm } from './NewWalletForm';

interface NewWalletDialogProps {
  walletSetId: string;
  onSuccess?: () => void;
}

export function NewWalletDialog({ walletSetId, onSuccess }: NewWalletDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> New Wallet
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Wallet</DialogTitle>
          <DialogDescription>
            Generate a new address with no previous history on selected blockchain
          </DialogDescription>
        </DialogHeader>

        <NewWalletForm
          walletSetId={walletSetId}
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
