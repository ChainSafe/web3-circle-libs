import {
  CreateTransactionInput,
  GetTransactionInput,
} from '@circle-fin/developer-controlled-wallets';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { FormErrorText } from '~/components/FormErrorText';
import { TokenSelect } from '~/components/TokenSelect';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { FeeLevel } from '~/lib/constants';
import { CircleError } from '~/lib/responses';
import { Transaction, Wallet, WalletTokenBalance } from '~/lib/types';
import { isAddress, isNumber } from '~/lib/utils';

export interface WalletSendProps {
  /** The wallet */
  wallet: Wallet;
  balances: WalletTokenBalance[];
  onSendTransaction: (data: CreateTransactionInput) => Promise<Transaction | CircleError>;
  onGetTransaction: (data: GetTransactionInput) => Promise<{ transaction: Transaction }>;
  onConfirmed?: (data: Transaction) => Promise<void>;
}

// @todo: use constant exported from sdk
const isTransactionPending = (tx: Transaction) =>
  Boolean(tx?.state && !['CONFIRMED', 'CONFIRMED'].includes(tx?.state));

interface IFormInput {
  destinationAddress: string;
  amount: string;
  tokenId: string;
  note: string;
}

const formSchema = z.object({
  destinationAddress: z.string().refine(isAddress, 'Address is not valid'),
  amount: z.string().refine(isNumber, 'Amount is not valid'),
  tokenId: z.string(),
  note: z.string().optional(),
});

/**
 * Helpers for obtaining a wallet's on-chain address:
 * a QR code that encodes the address and elements for viewing the address and copying it to the clipboard
 */
export function WalletSend({
  wallet,
  balances,
  onSendTransaction,
  onGetTransaction,
  onConfirmed,
}: WalletSendProps) {
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
    if ((res as CircleError).error) {
      setRequestError((res as CircleError).error.message);
      return;
    }
    const tx = res as Transaction;

    setTransactionData({ state: tx.state } as Transaction);
    if (tx.id) {
      const interval = setInterval(() => {
        const run = async () => {
          const { transaction } = await onGetTransaction({ id: tx.id });
          setTransactionData(transaction);
          if (transaction && !isTransactionPending(transaction)) {
            clearInterval(interval);
            if (typeof onConfirmed === 'function') {
              await onConfirmed(transaction);
            }
          }
        };
        run().catch(console.error);
      }, 1000);
    }
  };

  return (
    <div className="items-center w-full">
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-ful mt-6">
          <Input
            placeholder="Recipient Address"
            className="col-span-3"
            {...register('destinationAddress')}
          />
          <FormErrorText value={errors.destinationAddress?.message} />
        </div>
        <div className="mt-6">
          <Controller
            name="tokenId"
            control={control}
            render={({ field }) => (
              <TokenSelect balances={balances} onValueChange={field.onChange} />
            )}
          />
          <FormErrorText value={errors.tokenId?.message} />
        </div>
        <div className="mt-6">
          <Input placeholder="Amount" className="col-span-3" {...register('amount')} />
          <FormErrorText value={errors.amount?.message} />
        </div>
        <div className="mt-6">
          <Textarea
            placeholder="Note(optional)"
            className="col-span-3 min-h-[100px]"
            {...register('note')}
          />
        </div>
        <Button
          type="submit"
          className="mt-6 w-full"
          disabled={isTransactionPending(transactionData)}
        >
          {isTransactionPending(transactionData) && (
            <LoaderCircle className="animate-spin" />
          )}
          Send
        </Button>
        <FormErrorText value={requestError} />
      </form>
    </div>
  );
}
