import {
  EditWalletForm,
  EditWalletFormInput,
  ElementsSubmitHandler,
} from '@chainsafe/react-elements';
import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
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
import { useUpdateWallet } from '~/hooks/useUpdateWallet';

interface EditWalletDialogProps {
  wallet: Wallet;
  onSuccess?: () => void;
}

export function EditWalletDialog({ wallet, onSuccess }: EditWalletDialogProps) {
  const [open, setOpen] = useState(false);
  const { updateWallet, isLoading, error } = useUpdateWallet();

  const onSubmit: ElementsSubmitHandler<EditWalletFormInput> = async ({
    id,
    name,
    refId,
  }) => {
    const success = await updateWallet({
      id,
      name,
      description: refId,
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
          <DialogTitle>Edit Wallet</DialogTitle>
          <DialogDescription>
            You can change the name and description of the wallet.
          </DialogDescription>
        </DialogHeader>

        <EditWalletForm
          defaultValues={wallet}
          isSubmitting={isLoading}
          onSubmit={onSubmit}
          serverError={error}
        />
      </DialogContent>
    </Dialog>
  );
}
