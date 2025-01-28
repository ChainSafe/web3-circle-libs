import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ElementsWalletSet } from '~/lib/types';

import { FormErrorText } from '../FormErrorText';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const formSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type EditWalletSetFormInput = z.infer<typeof formSchema>;

export interface EditWalletSetFormProps {
  defaultValues: ElementsWalletSet;
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<EditWalletSetFormInput>;
  serverError?: Error;
}

export function EditWalletSetForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  serverError,
}: EditWalletSetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditWalletSetFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-8">
      <div className="mt-4">
        <input type="hidden" {...register('id')} />
        <div>
          <Input
            type="text"
            placeholder="Name"
            error={errors.name}
            {...register('name')}
          />
          <FormErrorText message={errors.name?.message} />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <LoaderCircle className="animate-spin" />}
        Update
      </Button>

      <FormErrorText message={serverError?.message} />
    </form>
  );
}
