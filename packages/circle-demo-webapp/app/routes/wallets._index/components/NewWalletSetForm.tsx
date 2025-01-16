import { LoaderCircle, Plus } from 'lucide-react';
import { FormEvent } from 'react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useCreateWalletSet } from '~/hooks/useCreateWalletSet';

interface NewWalletSetFormProps {
  onSuccess?: () => void;
}

export function NewWalletSetForm({ onSuccess }: NewWalletSetFormProps) {
  const { createWalletSet, isLoading, error } = useCreateWalletSet();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;

    const success = await createWalletSet({ name });

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
        <Input type="text" name="name" placeholder="Name" />
      </div>

      <Button type="submit" className="w-full">
        {isLoading ? <LoaderCircle className="animate-spin" /> : <Plus />}
        Create
      </Button>

      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
