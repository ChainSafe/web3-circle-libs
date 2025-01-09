import { FilePenLine, LoaderCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';

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
import { useUpdateWallet } from '~/hooks/useUpdateWallet';
import { Wallet } from '~/lib/types';

interface EditWalletDialogProps {
  wallet: Wallet;
  onSuccess: () => void;
}

export function EditWalletDialog({ wallet, onSuccess }: EditWalletDialogProps) {
  const [open, setOpen] = useState(false);
  const { updateWallet, isLoading, error } = useUpdateWallet();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;

    await updateWallet({ id, name });

    if (!isLoading && !error) {
      setOpen(false);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <FilePenLine />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Wallet</DialogTitle>
          <DialogDescription>You can change the name of the wallet.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
          className="space-y-8"
        >
          <div className="w-full mt-4">
            <input type="hidden" name="id" value={wallet.id} />
            <Input
              type="text"
              name="name"
              placeholder="Wallet name"
              defaultValue={wallet.name}
            />
          </div>
          <Button type="submit" className="w-full">
            {isLoading && <LoaderCircle className="animate-spin" />}
            Update
          </Button>
          {error && <p className="text-red-500">{error.message}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
