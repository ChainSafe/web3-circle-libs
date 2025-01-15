import { Form } from '@remix-run/react';
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
import { Input } from '~/components/ui/input';

export function NewWalletSetDialog() {
  const [open, setOpen] = useState(false);

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

        <Form
          method="post"
          onSubmit={() => {
            setOpen(false);
          }}
        >
          <div className="w-full max-w-md mt-6">
            <Input type="text" name="name" placeholder="Name" className="col-span-3" />
          </div>
          <Button type="submit" className="mt-6 w-full max-w-md">
            Create
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
