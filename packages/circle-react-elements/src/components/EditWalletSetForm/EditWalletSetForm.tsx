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

/**
 * Input data structure for the EditWalletSetForm component
 * @property id - The ID of the wallet set to edit
 * @property name - The name of the wallet set
 */
export type EditWalletSetFormInput = z.infer<typeof formSchema>;

export interface EditWalletSetFormProps {
  /**
   * Initial values for the form fields, populated from the existing wallet set
   */
  defaultValues: ElementsWalletSet;

  /**
   * Indicates if the form is currently submitting
   * When true, disables the submit button and shows a loading spinner
   * @default false
   */
  isSubmitting?: boolean;

  /**
   * Handler called when the form is submitted with valid data
   * @param data - The form data of type EditWalletSetFormInput
   */
  onSubmit: SubmitHandler<EditWalletSetFormInput>;

  /**
   * Optional error from the server to display below the form
   */
  serverError?: Error;
}

/**
 * A form component for editing an existing wallet set
 *
 * Features:
 * - Input field for wallet set name
 * - Form validation using Zod
 * - Error handling for form fields and server errors
 * - Loading state during submission
 */
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
            isError={!!errors.name}
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
