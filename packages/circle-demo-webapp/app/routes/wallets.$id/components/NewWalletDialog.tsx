import { NewWalletForm, NewWalletFormInput } from '@circle-libs/circle-react-elements';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { useCreateWallet } from '~/hooks/useCreateWallet';

interface NewWalletDialogProps {
  walletSetId: string;
  onSuccess?: () => void;
}

export function NewWalletDialog({ walletSetId, onSuccess }: NewWalletDialogProps) {
  const [open, setOpen] = useState(false);
  const { createWallet, isLoading, error } = useCreateWallet();

  const onSubmit: SubmitHandler<NewWalletFormInput> = async ({
    walletSetId,
    name,
    blockchain,
    description,
  }) => {
    const success = await createWallet({
      walletSetId,
      name,
      blockchain,
      description,
    });

    if (!success) {
      return;
    }

    setOpen(false);
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  };

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
          isSubmitting={isLoading}
          onSubmit={onSubmit}
          serverError={error}
          isTestnet
        />
      </DialogContent>
    </Dialog>
  );
}
