import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormErrorText } from '~/components/FormErrorText';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { ElementsSubmitHandler } from '~/lib/types';

export const newWalletSetSchema = z.object({
  name: z.string().nonempty('Name must not be empty'),
});

/**
 * Input data structure for the NewWalletSetForm component
 * @property name - The name of the wallet set (required, non-empty)
 */
export type NewWalletSetFormInput = z.infer<typeof newWalletSetSchema>;

export interface NewWalletSetFormProps {
  /**
   * Indicates if the form is currently submitting
   * When true, disables the submit button and shows a loading spinner
   * @default false
   */
  isSubmitting?: boolean;

  /**
   * Handler called when the form is submitted with valid data
   * @param data - The form data of type NewWalletSetFormInput
   */
  onSubmit: ElementsSubmitHandler<NewWalletSetFormInput>;

  /**
   * Optional error from the server to display below the form
   */
  serverError?: Error;
}

/**
 * A form component for creating a new wallet set
 *
 * Features:
 * - Input field for wallet set name
 * - Form validation using Zod
 * - Error handling for form fields and server errors
 * - Loading state during submission
 */
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
    resolver: zodResolver(newWalletSetSchema),
  });

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-8">
      <div>
        <Input
          type="text"
          placeholder="Name"
          isError={!!errors.name}
          {...register('name')}
        />
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
