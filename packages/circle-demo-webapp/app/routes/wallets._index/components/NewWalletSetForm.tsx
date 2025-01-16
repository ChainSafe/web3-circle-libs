import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Plus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormErrorText } from '~/components/FormErrorText';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useCreateWalletSet } from '~/hooks/useCreateWalletSet';

const formSchema = z.object({
  name: z.string().nonempty('Name must not be empty'),
});

type FormInput = z.infer<typeof formSchema>;

interface NewWalletSetFormProps {
  onSuccess?: () => void;
}

export function NewWalletSetForm({ onSuccess }: NewWalletSetFormProps) {
  const { createWalletSet, isLoading, error: serverError } = useCreateWalletSet();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormInput> = async ({ name }) => {
    const success = await createWalletSet({ name });

    if (!success) {
      return;
    }

    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-8">
      <div className="mt-4">
        <Input type="text" placeholder="Name" error={errors.name} {...register('name')} />
        <FormErrorText message={errors.name?.message} />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <LoaderCircle className="animate-spin" /> : <Plus />}
        Create
      </Button>

      <FormErrorText message={serverError?.message} />
    </form>
  );
}
