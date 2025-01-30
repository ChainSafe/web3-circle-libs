import { Balance } from '@circle-fin/developer-controlled-wallets';
import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { FormErrorText } from '~/components/FormErrorText';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { isAddress, isNumber } from '~/lib/utils';

import { ComplianceStatus } from '../ComplianceStatus';
import { TokenSelect } from '../TokenSelect';

/**
 * Helper function to find USDC token ID in balances array
 * Used when defaultToUsdc prop is true to pre-select USDC
 */
function findTokenSelectDefaultValue(balances: Balance[]): string | undefined {
  const usdcToken = balances.find((balance) => balance.token.symbol === 'USDC');
  return usdcToken?.token.id;
}

const formSchema = z.object({
  destinationAddress: z.string().refine(isAddress, 'Address is not valid'),
  amount: z.string().refine(isNumber, 'Amount is not valid'),
  tokenId: z.string(),
  note: z.string().optional(),
});

/**
 * Input data structure for the SendTransactionForm component
 * @property destinationAddress - The recipient's wallet address (must be valid)
 * @property amount - The transaction amount (must be a valid number)
 * @property tokenId - The ID of the token to send
 * @property note - Optional note to attach to the transaction
 */
export type SendTransactionFormInput = z.infer<typeof formSchema>;

export interface SendTransactionFormProps {
  /**
   * The wallet from which to send the transaction
   */
  wallet: Wallet;

  /**
   * List of token balances available in the wallet
   */
  balances: Balance[];

  /**
   * Handler called when the form is submitted with valid data
   * @param data - The form data of type SendTransactionFormInput
   */
  onSubmit: SubmitHandler<SendTransactionFormInput>;

  /**
   * Indicates if the form is currently submitting
   * When true, disables the submit button and shows a loading spinner
   * @default false
   */
  isSubmitting?: boolean;

  /**
   * Optional error from the server to display below the form
   */
  serverError?: Error;

  /**
   * Optional handler called when a valid address is entered
   * Used for compliance screening of the recipient address
   */
  onChangeAddress?: (address: string) => void;

  /**
   * Optional result of compliance screening for the recipient address
   */
  screeningAddressResult?: 'APPROVED' | 'DENIED';
}

/**
 * A form component for sending tokens from a wallet to another address
 *
 * Features:
 * - Input fields for recipient address, amount, and optional note
 * - Token selection with balance display
 * - Form validation using Zod including address format checking
 * - Compliance screening integration for recipient addresses
 * - Error handling for form fields and server errors
 * - Loading state during submission
 */
export function SendTransactionForm({
  balances,
  onSubmit,
  isSubmitting,
  serverError,
  onChangeAddress,
  screeningAddressResult,
}: SendTransactionFormProps) {
  const defaultTokenIdValue = useMemo(
    () => findTokenSelectDefaultValue(balances),
    [balances],
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendTransactionFormInput>({
    resolver: zodResolver(formSchema),
  });

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    if (typeof onChangeAddress === 'function') {
      if (isAddress(address)) {
        onChangeAddress(address);
      }
    }
  };

  return (
    <form className="space-y-4 min-w-64" onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <div>
        <Input
          placeholder="Recipient Address"
          error={errors.destinationAddress}
          {...register('destinationAddress')}
          onChange={handleChangeAddress}
        />
        {screeningAddressResult !== undefined ? (
          <ComplianceStatus result={screeningAddressResult === 'APPROVED'} />
        ) : (
          <FormErrorText message={errors.destinationAddress?.message} />
        )}
      </div>

      <div>
        <Controller
          name="tokenId"
          control={control}
          defaultValue={defaultTokenIdValue}
          render={({ field }) => (
            <TokenSelect
              balances={balances}
              onValueChange={field.onChange}
              error={errors.tokenId}
              defaultValue={defaultTokenIdValue}
            />
          )}
        />
        <FormErrorText message={errors.tokenId?.message} />
      </div>

      <div>
        <Input placeholder="Amount" error={errors.amount} {...register('amount')} />
        <FormErrorText message={errors.amount?.message} />
      </div>

      <div>
        <Textarea
          placeholder="Note (optional)"
          className="min-h-[100px]"
          {...register('note')}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <LoaderCircle className="animate-spin" />}
        Send
      </Button>

      <FormErrorText message={serverError?.message} />
    </form>
  );
}
