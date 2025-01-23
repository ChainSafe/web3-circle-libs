import { TestChainSelect } from '@circle-libs/circle-react-elements';
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEvent } from 'react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useCreateWallet } from '~/hooks/useCreateWallet';

interface NewWalletFormProps {
  walletSetId: string;
  onSuccess?: () => void;
}

export function NewWalletForm({ walletSetId, onSuccess }: NewWalletFormProps) {
  const { createWallet, isLoading, error } = useCreateWallet();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const blockchain = formData.get('blockchain') as string;

    const success = await createWallet({ walletSetId, name, description, blockchain });

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
      <div className="space-y-4">
        <input type="hidden" name="walletSetId" value={walletSetId} />

        <Input type="text" name="name" placeholder="Enter wallet name" />

        <Textarea
          name="description"
          placeholder="Enter description (optional)"
          className="min-h-[100px]"
        />

        <TestChainSelect name="blockchain" />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <LoaderCircle className="animate-spin" /> : <Plus />}
        Create Wallet
      </Button>

      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
