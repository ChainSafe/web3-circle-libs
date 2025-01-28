import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import { Notification } from '@circle-libs/circle-react-elements';
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
  const [successOpen, setSuccessOpen] = useState(false);
  const [wallet, setWallet] = useState<Wallet>();
  const { createWallet, isLoading, error } = useCreateWallet();

  const onSubmit: SubmitHandler<NewWalletFormInput> = async ({
    walletSetId,
    name,
    blockchain,
    description,
  }) => {
    const wallet = await createWallet({
      walletSetId,
      name,
      blockchain,
      description,
    });

    if (!wallet) {
      return;
    }

    setWallet(wallet);
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
          />
        </DialogContent>
      </Dialog>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="min-w-[425px]">
          <Notification
            onClose={() => setSuccessOpen(false)}
            title="New Wallet Created"
            description={
              <div>
                Your wallet with the name{' '}
                <span className="text-gray-600">{wallet?.name}</span> was successfully
                created.
              </div>
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
