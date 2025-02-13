import {
  EditWalletSetForm,
  EditWalletSetFormInput,
  ElementsSubmitHandler,
  ElementsWalletSet,
} from '@circle-libs/react-elements';
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
import { useUpdateWalletSet } from '~/hooks/useUpdateWalletSet';

interface EditWalletSetDialogProps {
  walletSet: ElementsWalletSet;
  onSuccess?: () => void;
}

export function EditWalletSetDialog({ walletSet, onSuccess }: EditWalletSetDialogProps) {
  const [open, setOpen] = useState(false);
  const { updateWalletSet, isLoading, error } = useUpdateWalletSet();

  const onSubmit: ElementsSubmitHandler<EditWalletSetFormInput> = async ({
    id,
    name,
  }) => {
    const success = await updateWalletSet({
      id,
      name,
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
          defaultValues={walletSet}
          isSubmitting={isLoading}
          onSubmit={onSubmit}
          serverError={error}
        />
      </DialogContent>
    </Dialog>
  );
}
