import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Plus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormErrorText } from '../FormErrorText';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const formSchema = z.object({
  name: z.string().nonempty('Name must not be empty'),
});

export type NewWalletSetFormInput = z.infer<typeof formSchema>;

export interface NewWalletSetFormProps {
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<NewWalletSetFormInput>;
  serverError?: Error;
}

export function NewWalletSetForm({
  isSubmitting,
  onSubmit,
  serverError,
}: NewWalletSetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewWalletSetFormInput>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-8">
      <div>
        <Input type="text" placeholder="Name" error={errors.name} {...register('name')} />
        <FormErrorText message={errors.name?.message} />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="animate-spin" /> : <Plus />}
        Create
      </Button>

      <FormErrorText message={serverError?.message} />
    </form>
  );
}
