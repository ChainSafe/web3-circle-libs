import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormErrorText } from '../FormErrorText';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  id: z.string(),
  name: z.string().nonempty('Name must not be empty'),
  refId: z.string().optional(),
});

export type EditWalletFormInput = z.infer<typeof formSchema>;

export interface EditWalletFormProps {
  defaultValues: Wallet;
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<EditWalletFormInput>;
  serverError?: Error;
}

export function EditWalletForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  serverError,
}: EditWalletFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditWalletFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-8">
      <div className="space-y-4">
        {defaultValues.id && <input type="hidden" {...register('id')} />}
        <div>
          <Input
            type="text"
            placeholder="Wallet name"
            error={errors.name}
            {...register('name')}
          />
          <FormErrorText message={errors.name?.message} />
        </div>

        <div>
          <Textarea
            placeholder="Enter description (optional)"
            className="min-h-[100px]"
            error={errors.refId}
            {...register('refId')}
          />
          <FormErrorText message={errors.refId?.message} />
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
