import {
  NewWalletSetForm,
  NewWalletSetFormInput,
  Notification,
} from '@circle-libs/circle-react-elements';
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
import { useCreateWalletSet } from '~/hooks/useCreateWalletSet';
import { ElementsWalletSet } from '~/lib/types';

interface NewWalletSetDialogProps {
  onSuccess?: () => void;
}

export function NewWalletSetDialog({ onSuccess }: NewWalletSetDialogProps) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [walletSet, setWalletSet] = useState<ElementsWalletSet>();
  const { createWalletSet, isLoading, error } = useCreateWalletSet();

  const onSubmit: SubmitHandler<NewWalletSetFormInput> = async ({ name }) => {
    const walletSet = await createWalletSet({ name });

    if (!walletSet) {
      return;
    }

    setWalletSet(walletSet);
    setOpen(false);
    setSuccessOpen(true);

    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  };

  return (
    <>
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

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="min-w-[425px]">
          <Notification
            onClose={() => setSuccessOpen(false)}
            title="New Wallet Set Created"
            description={
              <div>
                Your wallet set with the name{' '}
                <span className="text-gray-600">{walletSet?.name}</span> was successfully
                created.
              </div>
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
