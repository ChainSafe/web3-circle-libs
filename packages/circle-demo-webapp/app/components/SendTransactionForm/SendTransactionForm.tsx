import {
  Balance,
  CreateTransactionInput,
} from '@circle-fin/developer-controlled-wallets';
import {
  Transaction,
  Wallet,
} from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';
import { TokenSelect } from '@circle-libs/circle-react-elements';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { ComplianceEngineText } from '~/components/ComplianceEngineText';
import { FormErrorText } from '~/components/FormErrorText';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { FeeLevel } from '~/lib/constants';
import { CircleError, ErrorResponse } from '~/lib/responses';
import { isAddress, isNumber } from '~/lib/utils';

export interface ScreenAddressResult {
  result: 'APPROVED' | 'DENIED';
}

export interface SendTransactionFormProps {
  /** The wallet */
  wallet: Wallet;
  balances: Balance[];
  onSendTransaction: (data: CreateTransactionInput) => Promise<Transaction | CircleError>;
  onScreenAddress?: (address: string) => Promise<ScreenAddressResult>;
  onSent?: (data: Transaction) => void;
}

// @todo: use constant exported from sdk
const isTransactionPending = (tx: Transaction) =>
  Boolean(tx?.state && !['CONFIRMED', 'CONFIRMED'].includes(tx?.state));

const formSchema = z.object({
  destinationAddress: z.string().refine(isAddress, 'Address is not valid'),
  amount: z.string().refine(isNumber, 'Amount is not valid'),
  tokenId: z.string(),
  note: z.string().optional(),
});

type IFormInput = z.infer<typeof formSchema>;

export function SendTransactionForm({
  wallet,
  balances,
  onSendTransaction,
  onSent,
  onScreenAddress,
}: SendTransactionFormProps) {
  const [screeningAddressResult, setScreeningAddressResult] = useState<
    'APPROVED' | 'DENIED'
  >();
  const [requestError, setRequestError] = useState<string>('');
  const [transactionData, setTransactionData] = useState({} as Transaction);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await onSendTransaction({
      destinationAddress: data.destinationAddress,
      amounts: [data.amount],
      tokenId: data.tokenId,
      walletId: wallet.id,
      refId: data.note,
      fee: {
        type: 'level',
        config: {
          feeLevel: FeeLevel.Medium,
        },
      },
    } as CreateTransactionInput);

    if ((res as unknown as ErrorResponse)?.error) {
      setRequestError((res as unknown as ErrorResponse).error);
      return;
    }

    const tx = res as Transaction;
    setTransactionData({ state: tx.state } as Transaction);
    if (typeof onSent === 'function') {
      onSent(tx);
    }
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    if (typeof onScreenAddress === 'function') {
      if (isAddress(address)) {
        onScreenAddress(address)
          .then((res: ScreenAddressResult) => {
            setScreeningAddressResult(res.result);
          })
          .catch(console.error);
      } else {
        setScreeningAddressResult('DENIED');
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <div>
        <Input
          placeholder="Recipient Address"
          error={errors.destinationAddress}
          {...register('destinationAddress')}
          onChange={onChangeAddress}
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
          defaultValue={balances.find((b) => b.token.symbol === 'USDC')?.token.id ?? ''}
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

      <Button
        type="submit"
        className="w-full"
        disabled={isTransactionPending(transactionData)}
      >
        {isTransactionPending(transactionData) && (
          <LoaderCircle className="animate-spin" />
        )}
        Send
      </Button>

      <FormErrorText message={requestError} />
    </form>
  );
}
