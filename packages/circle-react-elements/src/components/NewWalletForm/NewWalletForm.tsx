import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Plus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormErrorText } from '../FormErrorText';
import { TestChainSelect } from '../TestChainSelect';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  walletSetId: z.string(),
  name: z.string().nonempty('Name must not be empty'),
  description: z.string().optional(),
  blockchain: z.string().nonempty('Blockchain must be selected'),
});

export type NewWalletFormInput = z.infer<typeof formSchema>;

export interface NewWalletFormProps {
  walletSetId: string;
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<NewWalletFormInput>;
  serverError?: Error;
}

export function NewWalletForm({
  walletSetId,
  isSubmitting,
  onSubmit,
  serverError,
}: NewWalletFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewWalletFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletSetId,
    },
  });

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-8">
      <div className="space-y-4">
        <input type="hidden" {...register('walletSetId')} />

        <div>
          <Input
            type="text"
            placeholder="Enter wallet name"
            error={errors.name}
            {...register('name')}
          />
          <FormErrorText message={errors.name?.message} />
        </div>

        <div>
          <Textarea
            placeholder="Enter description (optional)"
            className="min-h-[100px]"
            {...register('description')}
          />
          <FormErrorText message={errors.description?.message} />
        </div>

        <div>
          <TestChainSelect {...register('blockchain')} />
          <FormErrorText message={errors.blockchain?.message} />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="animate-spin" /> : <Plus />}
        Create Wallet
      </Button>

      <FormErrorText message={serverError?.message} />
    </form>
  );
}
