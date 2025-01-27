import { Balance } from '@circle-fin/developer-controlled-wallets';
import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { FormErrorText } from '~/components/FormErrorText';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { isAddress, isNumber } from '~/lib/utils';

import { ComplianceEngineText } from '../ComplianceEngineText';
import { TokenSelect } from '../TokenSelect';

export interface SendTransactionFormProps {
  /** The wallet */
  wallet: Wallet;
  balances: Balance[];
  onSubmit: SubmitHandler<SendTransactionFormInput>;
  isSubmitting?: boolean;
  serverError?: Error;
  onChangeAddress?: (address: string) => void;
  screeningAddressResult?: 'APPROVED' | 'DENIED';
}

const formSchema = z.object({
  destinationAddress: z.string().refine(isAddress, 'Address is not valid'),
  amount: z.string().refine(isNumber, 'Amount is not valid'),
  tokenId: z.string(),
  note: z.string().optional(),
});
export type SendTransactionFormInput = z.infer<typeof formSchema>;

export function SendTransactionForm({
  balances,
  onSubmit,
  isSubmitting,
  serverError,
  onChangeAddress,
  screeningAddressResult,
}: SendTransactionFormProps) {
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
          <ComplianceEngineText result={screeningAddressResult === 'APPROVED'} />
        ) : (
          <FormErrorText message={errors.destinationAddress?.message} />
        )}
      </div>

      <div>
        <Controller
          name="tokenId"
          control={control}
          render={({ field }) => (
            <TokenSelect
              balances={balances}
              onValueChange={field.onChange}
              error={errors.tokenId}
              defaultToUsdc
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
