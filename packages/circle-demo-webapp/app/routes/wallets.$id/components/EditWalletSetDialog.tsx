import { useFetcher } from '@remix-run/react';
import { FilePenLine, LoaderCircle } from 'lucide-react';
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
import { Input } from '~/components/ui/input';
import { WalletSet } from '~/lib/types';

interface EditWalletSetDialogProps {
  walletSet: WalletSet;
}

export function EditWalletSetDialog({ walletSet }: EditWalletSetDialogProps) {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <FilePenLine /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Wallet Set</DialogTitle>
          <DialogDescription>Edit wallet set</DialogDescription>
        </DialogHeader>

        <fetcher.Form
          method="post"
          action="/api/updateWalletSet"
          onSubmit={() => {
            setOpen(false);
          }}
        >
          <div className="w-full max-w-md mt-6">
            <input type="hidden" name="id" value={walletSet.id} />
            <Input
              type="text"
              name="name"
              placeholder="Name"
              className="col-span-3"
              defaultValue={walletSet.name}
            />
          </div>
          <Button type="submit" className="mt-6 w-full max-w-md">
            {fetcher.state === 'submitting' && <LoaderCircle className="animate-spin" />}
            Update
          </Button>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
