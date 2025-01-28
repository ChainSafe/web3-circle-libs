import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import { Notification } from '@circle-libs/circle-react-elements';
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
  const [successOpen, setSuccessOpen] = useState(false);
  const [wallet, setWallet] = useState<Wallet>();

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
            onSuccess={(w) => {
              setWallet(w);
              setSuccessOpen(true);
              setOpen(false);
              if (typeof onSuccess === 'function') {
                onSuccess();
              }
            }}
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
