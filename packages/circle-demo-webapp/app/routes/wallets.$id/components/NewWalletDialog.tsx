import { Form } from '@remix-run/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { TestChainSelect } from '~/components/TestChainSelect';
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
import { Textarea } from '~/components/ui/textarea';

interface NewWalletDialogProps {
  walletSetId: string;
}

export function NewWalletDialog({ walletSetId }: NewWalletDialogProps) {
  const [open, setOpen] = useState(false);

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

        <Form
          method="post"
          onSubmit={() => {
            setOpen(false);
          }}
        >
          <div className="space-y-4">
            <input type="hidden" name="walletSetId" value={walletSetId} />

            <Input
              type="text"
              name="name"
              placeholder="Enter wallet name"
              className="w-full"
            />

            <Textarea
              name="description"
              placeholder="Enter description (optional)"
              className="w-full min-h-[100px]"
            />

            <TestChainSelect name="blockchain" />

            <Button type="submit" className="w-full">
              Create Wallet
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
