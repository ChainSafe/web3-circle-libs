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

/**
 * Input data structure for the EditWalletForm component
 * @property id - The ID of the wallet to edit
 * @property name - The name of the wallet (required, non-empty)
 * @property refId - Optional reference ID for the wallet
 */
export type EditWalletFormInput = z.infer<typeof formSchema>;

export interface EditWalletFormProps {
  /**
   * Initial values for the form fields, populated from the existing wallet
   */
  defaultValues: Wallet;

  /**
   * Indicates if the form is currently submitting
   * When true, disables the submit button and shows a loading spinner
   * @default false
   */
  isSubmitting?: boolean;

  /**
   * Handler called when the form is submitted with valid data
   * @param data - The form data of type EditWalletFormInput
   */
  onSubmit: SubmitHandler<EditWalletFormInput>;

  /**
   * Optional error from the server to display below the form
   */
  serverError?: Error;
}

/**
 * A form component for editing an existing wallet
 *
 * Features:
 * - Input fields for wallet name and optional reference ID
 * - Form validation using Zod
 * - Error handling for form fields and server errors
 * - Loading state during submission
 */
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
            isError={!!errors.name}
            {...register('name')}
          />
          <FormErrorText message={errors.name?.message} />
        </div>

        <div>
          <Textarea
            placeholder="Enter description (optional)"
            className="min-h-[100px]"
            isError={!!errors.refId}
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
