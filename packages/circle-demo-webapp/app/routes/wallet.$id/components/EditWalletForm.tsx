import { LoaderCircle } from 'lucide-react';
import { FormEvent } from 'react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useUpdateWallet } from '~/hooks/useUpdateWallet';
import { Wallet } from '~/lib/types';

interface EditWalletFormProps {
  wallet: Wallet;
  onSuccess: () => void;
}

export function EditWalletForm({ wallet, onSuccess }: EditWalletFormProps) {
  const { updateWallet, isLoading, error } = useUpdateWallet();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;

    const success = await updateWallet({ id, name });

    if (!success) {
      return;
    }

    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  };

  return (
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
  );
}