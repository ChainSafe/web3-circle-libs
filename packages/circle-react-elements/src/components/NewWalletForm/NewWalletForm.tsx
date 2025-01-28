import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Plus } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ChainSelect, TestChainSelect } from '../ChainSelect';
import { FormErrorText } from '../FormErrorText';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  walletSetId: z.string(),
  name: z.string().nonempty('Name must not be empty'),
  description: z.string().optional(),
  blockchain: z.string().nonempty('Blockchain must be selected'),
});

/**
 * Input data structure for the NewWalletForm component
 * @property walletSetId - The ID of the wallet set to create the wallet in
 * @property name - The name of the wallet (required, non-empty)
 * @property description - Optional description for the wallet
 * @property blockchain - The selected blockchain network (required)
 */
export type NewWalletFormInput = z.infer<typeof formSchema>;

export interface NewWalletFormProps {
  /**
   * The ID of the wallet set to create the wallet in
   */
  walletSetId: string;

  /**
   * Indicates if the form is currently submitting
   * When true, disables the submit button and shows a loading spinner
   * @default false
   */
  isSubmitting?: boolean;

  /**
   * Handler called when the form is submitted with valid data
   * @param data - The form data of type NewWalletFormInput
   */
  onSubmit: SubmitHandler<NewWalletFormInput>;

  /**
   * Optional error from the server to display below the form
   */
  serverError?: Error;

  /**
   * When true, displays TestChainSelect for test networks.
   * When false, displays ChainSelect for mainnet networks.
   * @default false
   */
  isTestnet?: boolean;
}

/**
 * A form component for creating a new wallet in a wallet set
 *
 * Features:
 * - Input fields for wallet name and optional description
 * - Blockchain network selection (mainnet or testnet based on isTestnet prop)
 * - Form validation using Zod
 * - Error handling for form fields and server errors
 * - Loading state during submission
 */
export function NewWalletForm({
  walletSetId,
  isSubmitting,
  onSubmit,
  serverError,
  isTestnet = false,
}: NewWalletFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
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
          <Controller
            name="blockchain"
            control={control}
            render={({ field }) => {
              const ChainSelectComponent = isTestnet ? TestChainSelect : ChainSelect;

              return (
                <ChainSelectComponent
                  onValueChange={field.onChange}
                  error={errors.blockchain}
                />
              );
            }}
          />

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
