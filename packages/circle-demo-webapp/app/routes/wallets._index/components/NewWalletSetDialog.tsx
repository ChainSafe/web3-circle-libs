import { Plus } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { NewWalletSetForm, NewWalletSetFormInput } from '~/components/NewWalletSetForm';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { useCreateWalletSet } from '~/hooks/useCreateWalletSet';

interface NewWalletSetDialogProps {
  onSuccess?: () => void;
}

export function NewWalletSetDialog({ onSuccess }: NewWalletSetDialogProps) {
  const [open, setOpen] = useState(false);

  const { createWalletSet, isLoading, error } = useCreateWalletSet();

  const onSubmit: SubmitHandler<NewWalletSetFormInput> = async ({ name }) => {
    const success = await createWalletSet({ name });

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
          <Plus /> New Wallet Set
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Wallet Set</DialogTitle>
          <DialogDescription>Generate a new wallet set</DialogDescription>
        </DialogHeader>

        <NewWalletSetForm
          isSubmitting={isLoading}
          onSubmit={onSubmit}
          serverError={error}
        />
      </DialogContent>
    </Dialog>
  );
}
