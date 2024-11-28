import { Form } from '@remix-run/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { WalletSet } from 'web3-circle-sdk';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';

interface NewWalletDialogProps {
  walletSet: WalletSet;
}

export function NewWalletDialog({ walletSet }: NewWalletDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> New Wallet
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Wallet</DialogTitle>
          <DialogDescription>
            Generate a new address with no previous history
          </DialogDescription>
        </DialogHeader>

        <Form
          method="post"
          onSubmit={() => {
            setOpen(false);
          }}
        >
          <div className="w-full max-w-md mt-6">
            <input type="hidden" name="walletSetId" value={walletSet.id} />
            <Input
              type="text"
              name="name"
              placeholder="Name for your new wallet"
              className="col-span-3"
            />
          </div>
          <Button type="submit" className="mt-6 w-full max-w-md">
            Create a New Wallet
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
